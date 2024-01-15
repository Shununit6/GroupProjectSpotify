from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Like

like_routes = Blueprint('likes', __name__)

# Get all Likes
# Require Authentication: false
# GET /api/songs/:id/likes
@like_routes.route('/<int:id>/likes')
def get_likes(id):
    """
    Query for all the likes of a song by song_id.
    """
    likes = Like.query.filter(Like.song_id==id)

    #return number of likes of a sond by id
    # numoflikes = likes.count()
    # return jsonify(numoflikes)
    return jsonify({'likes': [like.to_dict() for like in likes]})

# Like or unlike a song
# A logged in user can like or unlike a song with visible confirmation without causing a refresh/redirect.
# POST /api/songs/:id/likes
# DELETE /api/songs/:id/likes
@like_routes.route('/<int:id>/likes', methods=['POST', 'DELETE'])
@login_required
def post_like(id):
    """
    Creates and returns a new like.
    """
    likebycurrent = Like.query.filter(Like.song_id==id).filter(Like.user_id==current_user.get_id())
    if likebycurrent.count() == 0 and (request.method == 'POST' or request.method == 'DELETE'):
        new_like = Like(user_id=current_user.id,song_id=id)
        db.session.add(new_like)
        db.session.commit()
        return jsonify(new_like.to_dict())
    elif likebycurrent.count() == 1 and (request.method == 'DELETE' or request.method == 'POST'):
        db.session.delete(likebycurrent.one())
        db.session.commit()
        return {'message': 'Delete successful.'}
    else:
        return "no action"
