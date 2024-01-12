from .db import db

playlist_songs = db.Table(
    "playlist_songs",  # Table name
    db.Column('song_id', db.Integer, db.ForeignKey("songs.id"), nullable=False, primary_key=True),
    db.Column('playlist_id', db.Integer, db.ForeignKey('playlists.id'), nullable=False, primary_key=True)
)
