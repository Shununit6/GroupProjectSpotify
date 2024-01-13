from app.models import db, Playlist, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo playlist, you can add other albums here if you want
def seed_playlists():
    firstplaylist = Playlist(
        user_id=2,
        title='Best Pop Songs of 2023',
        url='https://images.unsplash.com/photo-1516900448138-898720b936c7?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description='Our editorial picks for the best pop songs of 2023! #SpotifyWrapped')
    secondplaylist = Playlist(
        user_id=1,
        title='New Music',
        url='https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=2512&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description='New music from loved artists')
    thirdplaylist = Playlist(
        user_id=3,
        title='Hit Rewind',
        url='https://images.unsplash.com/photo-1546521677-b3a9b11bee6f?q=80&w=2570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description='Listen to all the tracks you have been missing')

    db.session.add(firstplaylist)
    db.session.add(secondplaylist)
    db.session.add(thirdplaylist)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the playlists table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_playlists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.playlists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM playlists"))

    db.session.commit()
