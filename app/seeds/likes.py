from app.models import db, Like, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo artist, you can add other albums here if you want
def seed_likes():
    firstlike = Like(
        user_id = 1,
        song_id = 2)
    secondlike = Like(
        user_id = 1,
        song_id = 3)
    thirdlike = Like(
        user_id = 2,
        song_id = 1)
    fourthlike = Like(
        user_id = 3,
        song_id = 2)
    fifthlike = Like(
        user_id = 3,
        song_id = 3)
    sixthlike = Like(
        user_id = 1,
        song_id = 6)
    db.session.add(firstlike)
    db.session.add(secondlike)
    db.session.add(thirdlike)
    db.session.add(fourthlike)
    db.session.add(fifthlike)
    db.session.add(sixthlike)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the likes table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM likes"))

    db.session.commit()
