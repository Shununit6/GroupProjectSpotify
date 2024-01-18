from flask import Blueprint, jsonify, render_template
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
