from .db import db, add_prefix_for_prod, SCHEMA, environment

class Album_Song(db.Model):
    __tablename__ = 'album_songs'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    song_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("songs.id")), nullable=False, primary_key=True),
    album_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('albums.id')), nullable=False, primary_key=True)


    def to_dict(self):
        return {
            'song_id': self.song_id,
            'album_id': self.album_id,
        }
