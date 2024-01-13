from app.models import db, Album, environment, SCHEMA
from sqlalchemy.sql import text

# Adds a demo album, you can add other albums here if you want
def seed_albums():
    firstalbum = Album(
        user_id=3,
        title='The Album',
        release_date='May 12, 2023',
        url='https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        copyright='© 2023 Jonas Brothers Recording, Limited Liability Company, under exclusive license to Republic Records, a division of UMG Recordings, Inc.'
    )
    secondalbum = Album(
        user_id=1,
        title='In a Safe Place',
        release_date='June 22, 2004',
        url='https://images.pexels.com/photos/4487521/pexels-photo-4487521.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        copyright='© 2004 Sub Pop Records'
    )
    thirdalbum = Album(
        user_id=2,
        title='Lemonade',
        release_date='April 23, 2016',
        url='https://images.pexels.com/photos/5582639/pexels-photo-5582639.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        copyright='℗ 2019 Parkwood Entertainment LLC, under exclusive license to Columbia Records, a Division of Sony Music Entertainment'
    )

    db.session.add(firstalbum)
    db.session.add(secondalbum)
    db.session.add(thirdalbum)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the albums table. SQLAlchemy doesn't
# have a built-in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_albums():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.albums RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM albums"))

    db.session.commit()
