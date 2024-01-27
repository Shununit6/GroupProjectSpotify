from .db import db, add_prefix_for_prod, environment, SCHEMA

playlist_songs = db.Table(
    "playlist_songs",  # Table name
    db.Column('song_id', db.Integer, db.ForeignKey(add_prefix_for_prod("songs.id")), nullable=False, primary_key=True),
    db.Column('playlist_id', db.Integer, db.ForeignKey(add_prefix_for_prod('playlists.id')), nullable=False, primary_key=True)
)

if environment == "production":
    playlist_songs.schema = SCHEMA
