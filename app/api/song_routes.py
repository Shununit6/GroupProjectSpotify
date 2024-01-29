from flask import Blueprint, redirect, jsonify, request
from ..config import Config
from flask_login import login_required, current_user
# from ..forms.create_edit_song_form import CreateEditSongForm
from ..models import db, Song, Like, Artist
from flask_migrate import Migrate
from datetime import datetime

from ..forms.song_submission_form import SongForm
from ..forms.song_edit_form import SongEditForm
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
    song = Song.query.filter_by(id=song_id).first()
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

    if not form.validate_on_submit():
        print("We are here")
        print(form.errors)
        return jsonify({"error": "Form validation failed", "details": form.errors}), 400

    data = form.data

    if "artist_name" not in data or "title" not in data:
        return jsonify({"error": "Invalid form data"}), 400

    song = data["song_file"]
    song.filename = get_unique_filename(song.filename)

    upload = upload_file_to_s3(song)

    if "url" not in upload:
        return jsonify({"error": "S3 upload failed", "details": upload.get("error", "Unknown error")}), 500

    song_url = upload['url']

    # Check and add artist
    artist = Artist.query.filter_by(name=data['artist_name']).first()

    if not artist:
        new_artist = Artist(name=data['artist_name'])
        db.session.add(new_artist)
        db.session.commit()

    artist = Artist.query.filter_by(name=data['artist_name']).one()

    release_date = data.get('release_date') or datetime.utcnow()

    new_song = Song(
        user_id=current_user.id,
        artist_id=artist.id,
        title=data['title'],
        lyrics=data['lyrics'],
        url=data['url'],
        duration=data['duration'],
        release_date=release_date,
        song_file=song_url
    )

    print(new_song)

    db.session.add(new_song)
    db.session.commit()

    return jsonify(new_song.to_dict())

# Edit a Song - PUT /api/songs/:songId
@song_routes.route("/<int:song_id>/edit", methods=["PUT"])
@login_required
def update_song(song_id):
    current_song = Song.query.filter_by(id=song_id).first()
    form = SongEditForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if not form.validate_on_submit():
        print("Form validation failed")
        print(form.errors)
        return jsonify({"error": "Form validation failed", "details": form.errors}), 400

    data = form.data

    if "artist_name" not in data or "title" not in data:
        return jsonify({"error": "Invalid form data"}), 400

    song = Song.query.get(song_id)

    if not song:
        return jsonify({"error": "Song not found"}), 404

    # Update song attributes
    song.title = data['title']
    song.lyrics = data['lyrics']
    song.url = data['url']
    song.duration = data['duration']

    # Update artist
    artist = Artist.query.filter_by(name=data['artist_name']).first()

    if not artist:
        new_artist = Artist(name=data['artist_name'])
        db.session.add(new_artist)
        db.session.commit()

    artist = Artist.query.filter_by(name=data['artist_name']).one()
    song.artist_id = artist.id

    # Update release date
    release_date = data.get('release_date') or datetime.utcnow()
    song.release_date = release_date

    # Check if a new song file is provided
    if data['song_file'] != None:
        new_song_file = data['song_file']
        print("-------------------This is new_song_file:",new_song_file)
        print("-------------------This is data:", data)
        new_song_file.filename = get_unique_filename(new_song_file.filename)
        upload = upload_file_to_s3(new_song_file)

        if "url" not in upload:
            return jsonify({"error": "S3 upload failed", "details": upload.get("error", "Unknown error")}), 500

        song.song_file = upload['url']

    db.session.commit()

    return jsonify({"message": "Song updated successfully", "song": song.to_dict()})


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
