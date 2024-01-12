from .db import db, environment, SCHEMA
from sqlalchemy import func

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


  # def to_dict(self):
  #   return {
  #     'id': self.id,
  #     'user_id': self.user_id,
  #     # 'artist_id': self.artist_id,
  #     'title': self.title,
  #     'lyrics': self.lyrics,
  #     'url': self.url,
  #     'duration': self.duration,
  #     'likes': self.likes,
  #     'created_at': self.created_at,
  #     'updated_at': self.updated_at
  #   }
