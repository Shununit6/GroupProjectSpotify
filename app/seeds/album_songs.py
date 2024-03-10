from app.models import db, Song, Album, album_songs, environment, SCHEMA
from sqlalchemy.sql import text
from sqlalchemy import insert


# Adds a demo album_song, you can add other album_songs here if you want
def seed_album_songs():

    songone = Song.query.get(1)
    songtwo = Song.query.get(2)
    songthree = Song.query.get(3)

    albumone = Album.query.get(1)
    albumtwo = Album.query.get(2)
    albumthree = Album.query.get(3)

    albumone.songs.append(songone)
    albumtwo.songs.append(songtwo)
    albumthree.songs.append(songthree)

    db.session.add(albumone)
    db.session.add(albumtwo)
    db.session.add(albumthree)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the user_families table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_album_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.album_songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM album_songs"))

    db.session.commit()
