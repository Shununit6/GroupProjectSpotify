from flask import Blueprint, jsonify, render_template, request
from flask_login import login_required, current_user
from app.models import User, Playlist, Song, db
from ..forms.create_edit_playlist_form import CreateEditPlaylistForm
import logging


playlist_routes = Blueprint('playlists', __name__)


# Get all Playlists
@playlist_routes.route('/')
def get_playlists():

  playlists = Playlist.query.all()

  return jsonify({'playlists': [playlist.to_dict() for playlist in playlists]})


#Get all Playlists created by the Current User
@playlist_routes.route('/current')
@login_required
def get_playlists_current_user():
  playlists = Playlist.query.filter_by(user_id = current_user.id).all()
  return jsonify({'playlists': [playlist.to_dict() for playlist in playlists]})

#Get details of a playlist by ID
@playlist_routes.route('/<int:playlist_id>', methods=['GET'])
def get_playlist_details(playlist_id):
  playlist = Playlist.query.get(playlist_id)

  if playlist:
      return jsonify(playlist.to_dict())
  else:
      return jsonify({'error': 'Playlist not found'}), 404

# Create a Playlist
@playlist_routes.route('/', methods=['POST'])
@login_required
def create_playlist():
    try:
        form = CreateEditPlaylistForm()
        form['csrf_token'].data = request.cookies['csrf_token']

        if form.validate_on_submit():
            new_playlist = Playlist(
                user_id=current_user.id,
                title=form.data['title'],
                url=form.data['url'],
                description=form.data['description']
            )

            db.session.add(new_playlist)
            db.session.commit()

            return jsonify(new_playlist.to_dict()), 201  # HTTP status code for Created
        else:
            # If form validation fails, return error messages
            errors = {field: form.errors[field][0] for field in form.errors}
            print(form.errors)
            return jsonify({"errors": errors}), 400  # HTTP status code for Bad Request

    except Exception as e:
        # Log the error for debugging purposes using the logging module
        logging.error(f"Error creating playlist: {e}")

        # Return a generic error message to the client
        return jsonify({"error": "Internal Server Error"}), 500  # HTTP status code for Internal Server Error


@playlist_routes.route('/<int:playlistId>/edit', methods=['PUT'])
@login_required
def edit_playlist(playlistId):
    playlist = Playlist.query.get(playlistId)
    if not playlist:
        return {'errors': f"Playlist {playlistId} does not exist."}, 400
    # checks if playlist is created by the current user
    if playlist.user_id != current_user.id:
        return {'errors': f"Playlist {playlistId} must be created by the current user."}, 401
    payload= request.get_json()
    playlist.title=payload['title']
    playlist.url=payload['url']
    playlist.description=payload['description']
    db.session.commit()
    return jsonify(playlist.to_dict())

#Add a song to one of the current user's playlists
@playlist_routes.route('/<int:playlist_id>/songs/<int:song_id>', methods = ['POST'])
@login_required
def add_song_to_playlist(song_id, playlist_id):

  song = Song.query.get(song_id)
  playlist = Playlist.query.get(playlist_id)
  if playlist.user_id != current_user.id:
    return jsonify({'message': 'You are not authorized'})
  if song and playlist:

    if song in playlist.songs:
      return jsonify({'message': 'Song is already in the playlist'})

    playlist.songs.append(song)
    db.session.commit()

    return jsonify({'message': 'Song added to playlist successfully'})

  return jsonify({'error':'Song or playlist not found'}), 404



#Delete a song from one of the current users playlists
@playlist_routes.route('/<int:playlist_id>/songs/<int:song_id>', methods=['DELETE'])
@login_required
def remove_song_from_playlist(playlist_id, song_id):
    playlist = Playlist.query.get(playlist_id)
    song = Song.query.get(song_id)
    if playlist.user_id != current_user.id:
      return jsonify({'message': 'You are not authorized'})
    if playlist.user_id != current_user.id:
      return jsonify({'message': 'You are not authorized'})

    if song and playlist:
        # Check if the song is in the playlist
        if song in playlist.songs:
            playlist.songs.remove(song)
            db.session.commit()
            return jsonify({'message': 'Song removed from playlist successfully'})
        else:
            return jsonify({'error': 'Song is not in the playlist'}), 400
    else:
        return jsonify({'error': 'Playlist or song not found'}), 404

#Delete a playlist
@playlist_routes.route('/<int:playlist_id>/', methods=['DELETE'])
@login_required
def remove_playlist(playlist_id):
    playlist = Playlist.query.get(playlist_id)
    if playlist.user_id != current_user.id:
      return jsonify({'message': 'You are not authorized'})

    if playlist:
      # Check if the song is in the playlist
      if current_user.id == playlist.user_id:
        db.session.delete(playlist)
        db.session.commit()
        return jsonify({'message': 'Playlist Deleted successfully'})
    else:
        return jsonify({'error': 'Playlist not found'}), 404
