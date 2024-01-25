from flask import Blueprint, redirect, jsonify, request
from ..config import Config
from flask_login import login_required, current_user
from ..forms.create_edit_song_form import CreateEditSongForm
from ..models import db, Song, Like, Artist
from flask_migrate import Migrate

from ..forms.song_submission_form import SongForm
from .aws_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3

song_routes = Blueprint("songs", __name__)

# Get all Songs - GET /api/songs
@song_routes.route("/", methods=["GET"])
def get_all_songs():
    songs = Song.query.all()
    return jsonify({'songs': [song.to_dict() for song in songs]})

# Get MY Songs - GET /api/songs/current
@song_routes.route("/current", methods=["GET"])
@login_required
def get_my_songs():
    songs = Song.query.filter_by(user_id=current_user.id).all()
    return jsonify({'songs': [song.to_dict() for song in songs]})

# Get Song Details - GET /api/songs/:songId
@song_routes.route("/<int:song_id>", methods=["GET"])
def get_song_details(song_id):
    song = Song.query.filter_by(id=song_id).one()
    print("this is song:", song)
    return jsonify(song.to_dict())

# @song_routes.route("/new", methods=["GET"])
# @login_required
# def get_create_song_form():
#     form = CreateEditSongForm()
#     return render_template('create_edit_song_form.html', form=form)

# Create a Song - POST /api/songs
@song_routes.route("/new", methods=["POST"])
@login_required
def create_song():
    form = SongForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        song = form.data["song"]
        song.filename = get_unique_filename(song.filename)
        upload = upload_file_to_s3(song)
        print(upload)

        if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message (and we printed it above)
            return jsonify({"error": "url upload failed"}), 500
        song_url = upload['url']
        data = form.data
        # check and add artist
        artist = Artist.query.filter_by(name=data['artist_name']).first()
        if not artist:
            new_artist = Artist(name=data['artist_name'])
            db.session.add(new_artist)
            db.session.commit()
        artist = Artist.query.filter_by(name=data['artist_name']).one()
        new_song = Song(user_id=current_user.id,
                        artist_id=artist.id,
                        title=data['title'],
                        lyrics=data['lyrics'],
                        url=data['url'],
                        duration=data['duration'],
                        release_date=data['release_date'],
                        song_file=song_url),
        db.session.add(new_song)
        db.session.commit()
        return jsonify(new_song.to_dict())
    if form.errors:
        return form.errors

# Edit a Song - PUT /api/songs/:songId
@song_routes.route("/<int:songId>", methods=["PUT"])
@login_required
def edit_song(songId):
    song = Song.query.filter_by(id=songId).one()
    if current_user.id != song.user_id:
        return 'Forbidden'
    form = CreateEditSongForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        # check and add artist
        artist = Artist.query.filter_by(name=data['artist_name']).first()
        if not artist:
            new_artist = Artist(name=data['artist_name'])
            db.session.add(new_artist)
            db.session.commit()
        artist = Artist.query.filter_by(name=data['artist_name']).one()
        song.artist_id = artist.id
        song.title = data['title']
        song.lyrics = data['lyrics']
        song.url = data['url']
        song.duration = data['duration']
        song.release_date = data['release_date']
        db.session.commit()
        return jsonify(song.to_dict())
    if form.errors:
        return form.errors

# Delete a Song - DELETE /api/songs/:songId
@song_routes.route("/<int:songId>", methods=["DELETE"])
@login_required
def delete_song(songId):
    song = Song.query.filter_by(id=songId).one()
    if current_user.id != song.user_id:
        return jsonify({"error": "Forbidden"}), 403
    db.session.delete(song)
    db.session.commit()
    return jsonify({"message": "Song deleted"})
