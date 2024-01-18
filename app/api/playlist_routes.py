from flask import Blueprint, jsonify, render_template
from flask_login import login_required, current_user
from app.models import User, Playlist, Song, db


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

#Add a song to one of the current user's playlists
@playlist_routes.route('/<int:playlist_id>/songs/<int:song_id>', methods = ['POST'])
@login_required
def add_song_to_playlist(song_id, playlist_id):

  song = Song.query.get(song_id)
  playlist = Playlist.query.get(playlist_id)

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

    if playlist:
      # Check if the song is in the playlist
      if current_user.id == playlist.user_id:
        playlist.remove()
        db.session.commit()
        return jsonify({'message': 'Playlist Deleted successfully'})
    else:
        return jsonify({'error': 'Playlist not found'}), 404
