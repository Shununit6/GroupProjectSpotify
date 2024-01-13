from flask import Blueprint
from flask_login import login_required, current_user
from app.models import db, Album

album_routes = Blueprint('albums', __name__)

### Get all Albums
### Require Authentication: false
### `GET /api/albums`
@album_routes.route('/')
def get_albums():
    """
    Query for all albums
    """
    albums = Album.query.all()
    return {'albums': [album.to_dict() for album in albums]}

### Get all Albums created by the Current User
###  Require Authentication: true
###  `GET /api/albums/current`
@album_routes.route('/current')
@login_required
def get_current_albums():
    """
    Query for all the albums that are created by the Current User.
    """
    current_albums = Album.query.filter(Album.user_id == current_user.id)
    return {'albums': [album.to_dict() for album in current_albums]}

# Get details of an album from an id
# Require Authentication: false
# GET /api/albums/:albumid
@album_routes.route('/<int:albumid>')
def get_albums_by_id(albumid):
    """
    Query for the details of an album specified by its id.
    """
    album = Album.query.get(albumid)
    return album.to_dict()
