from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Like

like_routes = Blueprint('likes', __name__)

# Get all Likes
# Require Authentication: false
# GET /api/songs/:id/likes
@like_routes.route('<int:id>/likes')
def get_likes(id):
    """
    Query for all the likes of a song by song_id.
    """
    likes = Like.query.filter_by(song_id=id)
    # numoflikes = likes.count()

    return jsonify({'likes': [likes.to_dict() for like in likes]})

# Like or unlike a song
# A logged in user can like or unlike a song with visible confirmation without causing a refresh/redirect.
# POST /api/songs/:id/likes
# DELETE /api/songs/:id/likes
@like_routes.route('<int:id>/likes', methods=['POST', 'DELETE'])
@login_required
def post_like(id):
    """
    Creates and returns a new like.
    """
    likebysongid = Like.query.filter_by(song_id=id)
    likesongcurrentuser = likebysongid.query.filter_by(user_id=current_user.id)
    if likesongcurrentuser and request.method == 'POST':
        return "POST"
    elif not likesongcurrentuser and request.method == 'DELETE':
        return "DELETE"
    # payload = request.get_json()
    # new_album = Album(user_id=current_user.id,title = payload['title'], release_date = payload['release_date'], url = payload['url'], copyright = payload['copyright'])
    # db.session.add(new_album)
    # db.session.commit()
    # return jsonify(new_album.to_dict())

# # Delete an album
# # Deletes an existing album: A logged in user may delete one of their own Albums, removing it from the list of visible Albums without causing a refresh/redirect.
# # Require Authentication: true
# # Require proper authorization: Album must be created by the current user
# # DELETE /api/albums/:id
# @album_routes.route('/<int:albumId>', methods=['DELETE'])
# @login_required
# def delete_album(albumId):
#     albumbyid = Album.query.get(albumId)
#     if not albumbyid:
#         return {'errors': f"Album {id} does not exist."}, 400
#     # checks if album is created by the current user
#     if albumbyid.user_id != current_user.id:
#         return {'errors': f"Album{id} must be created by the current user."}, 401
#     db.session.delete(albumbyid)
#     db.session.commit()
#     return {'message': 'Delete successful.'}
