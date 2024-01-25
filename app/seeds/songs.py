from app.models import db, Song, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo song, you can add other albums here if you want
def seed_songs():
    firstsong = Song(
        user_id= 1,
        artist_id = 6,
        title = 'Just the Way You Are',
        lyrics = """Oh, her eyes, her eyes
        Make the stars look like they're not shining
        Her hair, her hair
        Falls perfectly without her trying
        She's so beautiful
        And I tell her every day
        Yeah, I know, I know
        When I compliment her, she won't believe me
        And it's so, it's so
        Sad to think that she don't see what I see
        But every time she asks me, "Do I look okay?"
        I say
        When I see your face
        There's not a thing that I would change
        'Cause you're amazing
        Just the way you are
        And when you smile
        The whole world stops and stares for a while
        'Cause girl, you're amazing
        Just the way you are
        Yeah
        Her lips, her lips
        I could kiss them all day if she'd let me
        Her laugh, her laugh
        She hates, but I think it's so sexy
        She's so beautiful
        And I tell her every day
        Oh, you know, you know, you know
        I'd never ask you to change
        If perfect's what you're searching for
        Then just stay the same
        So don't even bother asking if you look okay
        You know, I'll say
        When I see your face
        There's not a thing that I would change
        'Cause you're amazing
        Just the way you are
        And when you smile
        The whole world stops and stares for a while
        'Cause girl, you're amazing
        Just the way you are
        The way you are
        The way you are
        Girl, you're amazing
        Just the way you are
        When I see your face
        There's not a thing that I would change
        'Cause you're amazing
        Just the way you are
        And when you smile
        The whole world stops and stares for a while
        'Cause girl, you're amazing
        Just the way you are
        Yeah""",
        url = 'https://i.pinimg.com/736x/29/1d/7d/291d7da2542699b4fe0b8b02ff688b76.jpg',
        song_file = 'https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3',
        duration = 220,
        release_date = 'October 5, 2010')
    secondsong = Song(
        user_id= 3,
        artist_id = 4,
        title = 'Just the Way You Are',
        lyrics = "Hmm. We don't know the lyrics for this one.",
        url = 'https://i.pinimg.com/736x/29/1d/7d/291d7da2542699b4fe0b8b02ff688b76.jpg',
        song_file = 'https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3',
        duration = 230,
        release_date = 'November 13, 2015')
    thirdsong = Song(
        user_id= 2,
        artist_id = 2,
        title = 'Sugar',
        lyrics = "Hmm. We don't know the lyrics for this one.",
        url = 'https://i.pinimg.com/736x/29/1d/7d/291d7da2542699b4fe0b8b02ff688b76.jpg',
        song_file = 'https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3',
        duration = 235,
        release_date = 'September 2, 2014')
    fourthsong = Song(
        user_id= 1,
        artist_id = 1,
        title = 'Just the Way You Are',
        lyrics = "Hmm. We don't know the lyrics for this one.",
        url = 'https://i.pinimg.com/736x/29/1d/7d/291d7da2542699b4fe0b8b02ff688b76.jpg',
        song_file = 'https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3',
        duration = 230,
        release_date = 'November 13, 2015')
    fifthsong = Song(
        user_id= 3,
        artist_id = 3,
        title = 'Just the Way You Are',
        lyrics = "Hmm. We don't know the lyrics for this one.",
        url = 'https://i.pinimg.com/736x/29/1d/7d/291d7da2542699b4fe0b8b02ff688b76.jpg',
        song_file = 'https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3',
        duration = 230,
        release_date = 'November 13, 2015')
    sixthsong = Song(
        user_id= 2,
        artist_id = 5,
        title = 'Just the Way You Are',
        lyrics = "Hmm. We don't know the lyrics for this one.",
        url = 'https://i.pinimg.com/736x/29/1d/7d/291d7da2542699b4fe0b8b02ff688b76.jpg',
        song_file = 'https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3',
        duration = 230,
        release_date = 'November 13, 2015')
    seventhsong = Song(
        user_id= 1,
        artist_id = 5,
        title = 'Just the Way You Are',
        lyrics = "Hmm. We don't know the lyrics for this one.",
        url = 'https://i.pinimg.com/736x/29/1d/7d/291d7da2542699b4fe0b8b02ff688b76.jpg',
        song_file = 'https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3',
        duration = 230,
        release_date = 'November 13, 2015')
    eighthsong = Song(
        user_id= 2,
        artist_id = 5,
        title = 'Just the Way You Are',
        lyrics = "Hmm. We don't know the lyrics for this one.",
        url = 'https://i.pinimg.com/736x/29/1d/7d/291d7da2542699b4fe0b8b02ff688b76.jpg',
        song_file = 'https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3',
        duration = 230,
        release_date = 'November 13, 2015')
    ninthsong = Song(
        user_id= 3,
        artist_id = 5,
        title = 'Just the Way You Are',
        lyrics = "Hmm. We don't know the lyrics for this one.",
        url = 'https://i.pinimg.com/736x/29/1d/7d/291d7da2542699b4fe0b8b02ff688b76.jpg',
        song_file = 'https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3',
        duration = 230,
        release_date = 'November 13, 2015')
    tenthsong = Song(
        user_id= 2,
        artist_id = 5,
        title = 'Just the Way You Are',
        lyrics = "Hmm. We don't know the lyrics for this one.",
        url = 'https://i.pinimg.com/736x/29/1d/7d/291d7da2542699b4fe0b8b02ff688b76.jpg',
        song_file = 'https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3',
        duration = 230,
        release_date = 'November 13, 2015')
    db.session.add(firstsong)
    db.session.add(secondsong)
    db.session.add(thirdsong)
    db.session.add(fourthsong)
    db.session.add(fifthsong)
    db.session.add(sixthsong)
    db.session.add(seventhsong)
    db.session.add(eighthsong)
    db.session.add(ninthsong)
    db.session.add(tenthsong)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the songs table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM songs"))

    db.session.commit()
