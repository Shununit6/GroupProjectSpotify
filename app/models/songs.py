from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import func
from .album_songs import album_songs
from .playlist_songs import playlist_songs

class Song(db.Model):
  __tablename__ = 'songs'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod('users.id')),nullable=False )
  artist_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('artists.id')), nullable=False)
  title = db.Column(db.String(255), nullable=False)
  lyrics = db.Column(db.String(2000), nullable=False)
  url = db.Column(db.String(255), nullable=False)
  duration = db.Column(db.Integer, nullable=False)
  release_date = db.Column(db.String(255),nullable=False)
  created_at = db.Column(db.DateTime, default=func.now())
  updated_at = db.Column(db.DateTime, default=func.now(), onupdate=func.now())

  user = db.relationship('User', back_populates='songs')
  artist = db.relationship('Artist', back_populates='songs')
  like = db.relationship('Like', back_populates = 'songs')

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

  def to_dict(self):
    return {
        'id': self.id,
        'user_id': self.user_id,
        'artist_id': self.artist_id,
        'title': self.title,
        'lyrics': self.lyrics,
        'url': self.url,
        'duration': self.duration,
        'release_date': self.release_date,
        'created_at': self.created_at.strftime('%Y-%m-%d %H:%M:%S'),
        'updated_at': self.updated_at.strftime('%Y-%m-%d %H:%M:%S'),
        'user': self.user.to_dict(),
        # 'artist': self.artist.to_dict(),
        # 'like': [like.to_dict() for like in self.like],
        # 'albums': [album.to_dict() for album in self.albums],
        # 'playlists': [playlist.to_dict() for playlist in self.playlists],
    }
