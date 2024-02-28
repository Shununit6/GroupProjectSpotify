from app.models import db, Artist, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo artist, you can add other albums here if you want
def seed_artists():
    firstartist = Artist(
        name='Charlie Puth')
    secondartist = Artist(
        name='Maroon 5')
    thirdartist = Artist(
        name='Joel Adams')
    fourthartist = Artist(
        name='One Direction')
    fifthartist = Artist(
        name='Ed Sheeran')
    sixthartist = Artist(
        name='Bruno Mars')
    seventhartist = Artist(
        name='The Weeknd')
    eighthartist = Artist(
        name='Ariana Grande')
    ninthartist = Artist(
        name='Dua Lipa')
    tenthartist = Artist(
        name="Drake")
    eleventhartist = Artist(
        name="BLACKPINK")

    db.session.add(firstartist)
    db.session.add(secondartist)
    db.session.add(thirdartist)
    db.session.add(fourthartist)
    db.session.add(fifthartist)
    db.session.add(sixthartist)
    db.session.add(seventhartist)
    db.session.add(eighthartist)
    db.session.add(ninthartist)
    db.session.add(tenthartist)
    db.session.add(eleventhartist)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the artists table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_artists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.artists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM artists"))

    db.session.commit()
