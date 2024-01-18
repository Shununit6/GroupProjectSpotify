from .db import db, environment, SCHEMA
from sqlalchemy import func

class Artist(db.Model):
  __tablename__ = 'artists'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(255),nullable=False )
  created_at = db.Column(db.DateTime, default=func.now())
  updated_at = db.Column(db.DateTime, default=func.now(), onupdate=func.now())

  songs = db.relationship('Song', back_populates='artist')

  def to_dict(self):
    return {
        'id': self.id,
        'name': self.name,
        'created_at': self.created_at,
        'updated_at': self.updated_at,
        'songs':[song.to_dict() for song in self.songs]
    }
