from .db import db, add_prefix_for_prod, environment, SCHEMA
from datetime import datetime

playlist_songs = db.Table(
    "playlist_songs",  # Table name
    db.Column('song_id', db.Integer, db.ForeignKey(add_prefix_for_prod("songs.id")), nullable=False, primary_key=True),
    db.Column('playlist_id', db.Integer, db.ForeignKey(add_prefix_for_prod('playlists.id')), nullable=False, primary_key=True),
    db.Column('created_at', db.DateTime, default=datetime.now, nullable=False, primary_key=False),
    db.Column('updated_at', db.DateTime, default=datetime.now, onupdate=datetime.now, nullable=False, primary_key=False)
)

if environment == "production":
    playlist_songs.schema = SCHEMA
