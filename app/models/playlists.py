from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .playlist_songs import playlist_songs

class Playlist(db.Model):
    __tablename__ = 'playlists'

    if environment == "production":
      __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    title = db.Column(db.String(50), nullable=False)
    url = db.Column(db.String)
    description = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    user = db.relationship('User', back_populates='playlists')

    songs = db.relationship(
    "Song",
    secondary=playlist_songs,
    back_populates = 'playlists'
    )