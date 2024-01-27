from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Playlist, Song, db, Artist


artist_routes = Blueprint('artists', __name__)

# Get all Artists
@artist_routes.route('/')
def get_artists():

  artists = Artist.query.all()

  return jsonify({'artists': [artist.to_dict() for artist in artists]})


#Get details of a artist by ID
@artist_routes.route('/<int:artist_id>', methods=['GET'])
def get_artist_details(artist_id):
  artist = Artist.query.get(artist_id)

  if artist:
      return jsonify(artist.to_dict())
  else:
      return jsonify({'error': 'Artist not found'}), 404

#Greate an artist
@artist_routes.route('/', methods=['POST'])
@login_required
def post_artist():
    """
    Creates and returns a new artist.
    """
    payload = request.get_json()
    new_artist = Artist(name = payload['name'])
    db.session.add(new_artist)
    db.session.commit()
    return jsonify(new_artist.to_dict())

#Edit an artist
@artist_routes.route('/<int:artistId>', methods=['PUT'])
@login_required
def edit_artist(artistId):
    artistbyid = Artist.query.get(artistId)
    editsong = Song.query.filter(Song.user_id==current_user.id and Song.artist_id==artistId).first()
    if not artistbyid:
        return {'errors': f"Artist {artistId} does not exist."}, 400
    # checks if artist is created by the current user
    if not editsong:
        return {'errors': f"Artist {artistId} must be created by the current user."}, 401
    payload= request.get_json()
    artistbyid.name=payload['name']
    db.session.commit()
    return jsonify(artistbyid.to_dict())
