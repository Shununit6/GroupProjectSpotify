from .db import db, environment, SCHEMA
from sqlalchemy import func
from .album_songs import album_songs
from .playlist_songs import playlist_songs

class Song(db.Model):
  __tablename__ = 'songs'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer,db.ForeignKey('users.id'),nullable=False )
  artist_id = db.Column(db.Integer, db.ForeignKey('artists.id'), nullable=False)
  title = db.Column(db.String(255), nullable=False)
  lyrics = db.Column(db.String(2000), nullable=False)
  url = db.Column(db.String(255), nullable=False)
  duration = db.Column(db.Integer, nullable=False)
  likes = db.Column(db.Integer, nullable=True)
  release_date = db.Column(db.Date(),nullable=False)
  created_at = db.Column(db.DateTime, default=func.now())
  updated_at = db.Column(db.DateTime, default=func.now(), onupdate=func.now())

  user = db.relationship('User', back_populates='songs')
  artist = db.relationship('Artist', back_populates='songs')
  likes = db.relationship('Like', back_populates = 'songs')

  albums = db.relationship(
    "Album",
    secondary=album_songs,
    back_populates = 'songs'
  )

  playlists = db.relationship(
    "Playlist",
    secondary=playlist_songs,
    back_populates = 'songs'
  )
