from flask import Blueprint, jsonify, render_template
from flask_login import login_required, current_user
from app.models import User, Playlist, Song


playlist_routes = Blueprint('playlists', __name__)

#Not sure about this route
@playlist_routes.route('/')
def index():
    return render_template("playlists.html")

# Get all Playlists
@playlist_routes.route('/playlists')
def get_playlists():
  playlists = Playlist.query.all()
  return render_template('playlists.html', playlists = playlists)

#Get all Playlists created by the Current User
@playlist_routes.route('/playlists/current')
@login_required
def get_playlists_current_user():
  playlists = Playlist.query.filter_by(user_id = current_user.id).all()
  return render_template('playlists.html', playlists = playlists)

#Add a song to one of the current user's playlists
@playlist_routes.route('/playlists/<int:playlist_id>/songs', methods = ['POST'])
@login_required
def add_song_to_playlist();

  playlists = playlists = Playlist.query.filter_by(Playlist.id = playlistId)
