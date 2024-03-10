from .db import db, add_prefix_for_prod, environment,SCHEMA
from datetime import datetime

album_songs = db.Table(
    "album_songs",  # Table name
    db.Column('song_id', db.Integer, db.ForeignKey(add_prefix_for_prod("songs.id")), nullable=False, primary_key=True),
    db.Column('album_id', db.Integer, db.ForeignKey(add_prefix_for_prod('albums.id')), nullable=False, primary_key=True),
    db.Column('created_at', db.DateTime, default=datetime.now, nullable=False, primary_key=False),
    db.Column('updated_at', db.DateTime, default=datetime.now, onupdate=datetime.now, nullable=False, primary_key=False)
)

if environment == "production":
    album_songs.schema = SCHEMA
