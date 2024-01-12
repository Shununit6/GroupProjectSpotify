from .db import db

album_songs = db.Table(
    "album_songs",  # Table name
    db.Column('song_id', db.Integer, db.ForeignKey("songs.id"), nullable=False, primary_key=True),
    db.Column('album_id', db.Integer, db.ForeignKey('albums.id'), nullable=False, primary_key=True)
)
