from flask import Blueprint, request, jsonify
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

    return jsonify({'albums': [album.to_dict() for album in albums]})

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
    return jsonify({'albums': [album.to_dict() for album in current_albums]})

# Get details of an album from an id
# Require Authentication: false
# GET /api/albums/:albumid
@album_routes.route('/<int:albumId>')
def get_albums_by_id(albumId):
    """
    Query for the details of an album specified by its id.
    """
    album = Album.query.get(albumId)
    return jsonify(album.to_dict())

# Create an album
# Creates and returns a new album.
# Require Authentication: true
# POST /api/albums
@album_routes.route('/', methods=['POST'])
@login_required
def post_album():
    """
    Creates and returns a new album.
    """
    payload = request.get_json()
    new_album = Album(user_id=current_user.id,title = payload['title'], release_date = payload['release_date'], url = payload['url'], copyright = payload['copyright'])
    db.session.add(new_album)
    db.session.commit()
    return jsonify(new_album.to_dict())

# Edit an Album
# Updates and returns an existing album.
# Require Authentication: true
# Require proper authorization: Album must be created by the current user
# PUT /api/albums/:albumId
@album_routes.route('/<int:albumId>', methods=['PUT'])
@login_required
def edit_album(albumId):
    albumbyid = Album.query.get(albumId)
    if not albumbyid:
        return {'errors': f"Album {albumId} does not exist."}, 400
    # checks if album is created by the current user
    if albumbyid.user_id != current_user.id:
        return {'errors': f"Album {albumId} must be created by the current user."}, 401
    payload= request.get_json()
    albumbyid.title=payload['title']
    albumbyid.release_date=payload['release_date']
    albumbyid.url=payload['url']
    albumbyid.copyright=payload['copyright']
    db.session.commit()
    return jsonify(albumbyid.to_dict())


# Delete an album
# Deletes an existing album: A logged in user may delete one of their own Albums, removing it from the list of visible Albums without causing a refresh/redirect.
# Require Authentication: true
# Require proper authorization: Album must be created by the current user
# DELETE /api/albums/:id
@album_routes.route('/<int:albumId>', methods=['DELETE'])
@login_required
def delete_album(albumId):
    albumbyid = Album.query.get(albumId)
    if not albumbyid:
        return {'errors': f"Album {id} does not exist."}, 400
    # checks if album is created by the current user
    if albumbyid.user_id != current_user.id:
        return {'errors': f"Album{id} must be created by the current user."}, 401
    db.session.delete(albumbyid)
    db.session.commit()
    return {'message': 'Delete successful.'}
