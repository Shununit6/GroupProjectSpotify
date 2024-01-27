from .db import db, add_prefix_for_prod, SCHEMA, environment

class Playlist_Song(db.Model):
    __tablename__ = 'playlist_songs'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    song_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("songs.id")), nullable=False, primary_key=True),
    playlist_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('playlists.id')), nullable=False, primary_key=True)


    def to_dict(self):
        return {
            'song_id': self.song_id,
            'playlist_id': self.playlist_id,
        }
