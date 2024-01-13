from flask import Blueprint, render_template, redirect, url_for
from ..config import Config
from flask_login import login_required, current_user
# from ..forms import CreateEditSongForm -- NEED TO CREATE 'create_edit_song_form'
from ..models import db, Song, Like
from flask_migrate import Migrate

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)
migrate = Migrate(app, db)

bp = Blueprint("songs", __name__, url_prefix='/api/songs')

# Get all Songs - GET /api/songs
@bp.route("/", methods=["GET"])
def get_all_songs():
    songs = Song.query.all()
    return {'songs': [song.to_dict() for song in songs]}

# Get MY Songs - GET /api/songs/current
@bp.route("/current", methods=["GET"])
@login_required
def get_my_songs():
    songs = Song.query.filter_by(user_id=current_user.id).all()
    return {'songs': [song.to_dict() for song in songs]}

# Get Song Details - GET /api/songs/:songId
@bp.route("/<int:songId>", methods=["GET"])
def get_song_details(songId):
    song = Song.query.filter_by(id=songId).one()
    return song.to_dict()

# @bp.route("/new", methods=["GET"])
# @login_required
# def get_create_song_form():
#     form = CreateEditSongForm()
#     return render_template('create_edit_song_form.html', form=form)

# Create a Song - POST /api/songs
@bp.route("/new", methods=["POST"])
@login_required
def create_song():
    form = CreateEditSongForm()
    if form.validate_on_submit():
        data = form.data
        new_song = Song(user_id=data['user_id'],
                        artist_id=data['artist_id'],
                        title=data['title'],
                        lyrics=data['lyrics'],
                        url=type=data['url'],
                        duration=data['duration'],
                        release_date=data['release_date'])
        db.session.add(new_song)
        db.session.commit()
        return redirect('/')
    if form.errors:
        return form.errors

# Edit a Song - PUT /api/songs/:songId
@bp.route("/<int:songId>", methods=["PUT"])
@login_required
def edit_song(songId):
    song = Song.query.filter_by(id=songId).one()
    if current_user.id != song.user_id:
        return 'Forbidden'
    form = CreateEditSongForm()
    if form.validate_on_submit():
        data = form.data
        new_song = Song(user_id=data['user_id'],
                        artist_id=data['artist_id'],
                        title=data['title'],
                        lyrics=data['lyrics'],
                        url=type=data['url'],
                        duration=data['duration'],
                        release_date=data['release_date'])
        db.session.add(new_song)
        db.session.commit()
        return redirect('/songId')
    if form.errors:
        return form.errors

# Delete a Song - DELETE /api/songs/:songId
@bp.route("/<int:songId>", methods=["DELETE"])
@login_required
def delete_song(songId):
    song = Song.query.filter_by(id=songId).one()
    db.session.delete(song)
    db.session.commit()
    return redirect('/')
