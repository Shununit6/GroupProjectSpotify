from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .album_songs import album_songs


class Album(db.Model):
    __tablename__ = 'albums'

    if environment == "production":
       __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    title = db.Column(db.String(50), nullable=False)
    release_date = db.Column(db.String(255), nullable=False)
    url = db.Column(db.String)
    copyright = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)


    user = db.relationship('User', back_populates='albums')

    songs = db.relationship(
    "Song",
    secondary=album_songs,
    back_populates = 'albums'
    )

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'release_date': self.release_date,
            'url': self.url,
            'copyright': self.copyright,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'songs':[song.to_dict() for song in self.songs]
        }
