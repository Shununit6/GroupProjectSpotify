from .db import db, add_prefix_for_prod

album_songs = db.Table(
    "album_songs",  # Table name
    db.Column('song_id', db.Integer, db.ForeignKey(add_prefix_for_prod("songs.id")), nullable=False, primary_key=True),
    db.Column('album_id', db.Integer, db.ForeignKey(add_prefix_for_prod('albums.id')), nullable=False, primary_key=True)
)
