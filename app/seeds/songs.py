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
        url = 'https://i.scdn.co/image/ab67616d0000b273f6b55ca93bd33211227b502b',
        song_file = 'https://docs.google.com/file/d/0B4fLDaUBzyc2R01jcUJFSDc4LU0/view?pli=1&resourcekey=0-INmwv42T-j4FQwJnvasvVg',
        duration = 220,
        release_date = 'October 5, 2010')
    secondsong = Song(
        user_id= 3,
        artist_id = 4,
        title = 'What Makes You Beautiful',
        lyrics = "Hmm. We don't know the lyrics for this one.",
        url = 'https://i.scdn.co/image/ab67616d00001e024a5584795dc73860653a9a3e',
        song_file = 'https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3',
        duration = 199,
        release_date = 'May 25, 2012')
    thirdsong = Song(
        user_id= 2,
        artist_id = 2,
        title = 'Sugar',
        lyrics = "Hmm. We don't know the lyrics for this one.",
        url = 'https://i.scdn.co/image/ab67616d0000b273442b53773d50e1b5369bb16c',
        song_file = 'https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3',
        duration = 235,
        release_date = 'September 2, 2014')
    fourthsong = Song(
        user_id= 1,
        artist_id = 1,
        title = 'One Call Away',
        lyrics = "Looks like we don't have the lyrics for this song.",
        url = 'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/7e/05/fd/7e05fd3e-597b-db52-5d87-3ed146d2e2bb/mzm.omtrmqdi.jpg/600x600bf-60.jpg',
        song_file = 'https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3',
        duration = 194,
        release_date = 'January 29, 2016')
    fifthsong = Song(
        user_id= 3,
        artist_id = 3,
        title = "Please Don't Go",
        lyrics = """Nobody ever knows
        Nobody ever sees
        I left my soul
        Back then, no I'm too weak
        Most nights I pray for you to come home
        Praying to the Lord
        Praying for my soul
        Now please don't go
        Most nights I hardly sleep when I'm alone
        Now please don't go, oh no
        I think of you whenever I'm alone
        So please don't go
        ♪
        'Cause I don't ever wanna know
        Don't ever want to see things change
        'Cause when I'm living on my own
        I wanna take it back and start again
        Most nights I pray for you to come home
        I'm praying to the Lord
        Praying for my soul
        Now please don't go
        Most nights I hardly sleep
        When I'm alone
        Now please don't go, oh no
        I think of you whenever I'm alone
        So please don't go
        I sent so many messages
        You don't reply
        Gotta figure out, what am I missing babe?
        Singing now, oh oh oh
        And I need you now, I need your love, oh
        ♪
        Now please don't go
        I said well, most nights I hardly sleep
        When I'm alone
        Now please don't go, oh no
        I think of you whenever I'm alone
        So please don't
        Please don't go
        So please
        Please don't go, oh no
        Please don't go, oh no
        I think of you whenever I'm alone
        So please don't go""",
        # url = 'data:image/jpeg;base64,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',
        url = 'https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96',
        song_file = 'https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3',
        duration = 210,
        release_date = 'November 6, 2015')
    sixthsong = Song(
        user_id= 2,
        artist_id = 5,
        title = 'Perfect',
        lyrics = "You'll have to guess the lyrics for this one.",
        url = 'https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96',
        song_file = 'https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3',
        duration = 263,
        release_date = 'March 3, 2017')
    seventhsong = Song(
        user_id= 1,
        artist_id = 10,
        title = 'In My Feelings',
        lyrics = "Hmm. We don't know the lyrics for this one.",
        url = 'https://i.scdn.co/image/ab67616d0000b273c185e37be2a06b5c6f2dc704',
        song_file = 'https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3',
        duration = 217,
        release_date = 'June 29, 2018')
    eighthsong = Song(
        user_id= 2,
        artist_id = 7,
        title = 'Starboy',
        lyrics = """I'm tryna put you in the worst mood, ah
        P1 cleaner than your church shoes, ah
        Milli' point two just to hurt you, ah
        All red Lamb' just to tease you, ah
        None of these toys on lease too, ah
        Made your whole year in a week too, yeah
        Main bitch outta your league too, ah
        Side bitch out of your league too, ah
        House so empty, need a centerpiece
        20 racks a table, cut from ebony
        Cut that ivory into skinny pieces
        Then she clean it with her face, man, I love my baby, ah
        You talking money, need a hearing aid
        You talking 'bout me, I don't see the shade
        Switch up my style, I take any lane
        I switch up my cup, I kill any pain
        Look what you've done
        I'm a motherfucking starboy
        Look what you've done
        I'm a motherfucking starboy
        Every day a nigga try to test me, ah
        Every day a nigga try to end me, ah
        Pull off in that Roadster SV, ah
        Pockets overweight, getting hefty, ah
        Coming for the king, that's a far cry, I
        I come alive in the fall time, I
        The competition, I don't really listen
        I'm in the blue Mulsanne bumping New Edition
        House so empty, need a centerpiece
        20 racks a table, cut from ebony
        Cut that ivory into skinny pieces
        Then she clean it with her face, man, I love my baby, ah
        You talking money, need a hearing aid
        You talking 'bout me, I don't see the shade
        Switch up my style, I take any lane
        I switch up my cup, I kill any pain
        Look what you've done
        ♪
        I'm a motherfucking starboy
        Look what you've done
        I'm a motherfucking starboy
        Let a nigga brag Pitt
        Legend of the fall, took the year like a bandit
        Bought mama a crib and a brand-new wagon
        Now she hit the grocery shop looking lavish
        Star Trek roof in that Wraith of Khan
        Girls get loose when they hear this song
        A hundred on the dash, get me close to God
        We don't pray for love, we just pray for cars
        House so empty, need a centerpiece
        20 racks a table, cut from ebony
        Cut that ivory into skinny pieces
        Then she clean it with her face, man, I love my baby, ah
        You talking money, need a hearing aid
        You talking 'bout me, I don't see the shade
        Switch up my style, I take any lane
        I switch up my cup, I kill any pain
        ♪
        Look what you've done
        I'm a motherfucking starboy
        Look what you've done
        I'm a motherfucking starboy
        Look what you've done
        I'm a motherfucking starboy
        Look what you've done
        I'm a motherfucking starboy""",
        url = 'https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7bc452',
        song_file = 'https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3',
        duration = 230,
        release_date = 'November 25, 2016')
    ninthsong = Song(
        user_id= 3,
        artist_id = 8,
        title = '7 Rings',
        lyrics = "You'll have to guess the lyrics for this one.",
        url = 'https://i.scdn.co/image/ab67616d0000b27356ac7b86e090f307e218e9c8',
        song_file = 'https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3',
        duration = 178,
        release_date = 'Febuary 8, 2019')
    tenthsong = Song(
        user_id= 2,
        artist_id = 9,
        title = "Don't Start Now",
        lyrics = """If you don't wanna see me
        Did a full 180, crazy
        Thinking 'bout the way I was
        Did the heartbreak change me? Maybe
        But look at where I ended up
        I'm all good, already
        So moved on, it's scary
        I'm not where you left me at all, so
        If you don't wanna see me dancing with somebody
        If you wanna believe that anything could stop me
        Don't show up, don't come out
        Don't start caring about me now
        Walk away, you know how
        Don't start caring about me now
        Aren't you the guy who tried to
        Hurt me with the word "goodbye"?
        Though it took some time to survive you
        I'm better on the other side
        I'm all good already
        So moved on, it's scary
        I'm not where you left me at all, so
        If you don't wanna see me dancing with somebody
        If you wanna believe that anything could stop me
        (Don't, don't, don't)
        Don't show up, don't come out
        Don't start caring about me now
        Walk away, you know how
        Don't start caring about me now ('bout me now, 'bout me)
        Up, up
        Don't come out, out, out
        Don't show up, up, up
        Don't start now (oh)
        Up, up
        Don't come out, out
        I'm not where you left me at all, so
        If you don't wanna see me dancing with somebody
        If you wanna believe that anything could stop me
        Don't show up (don't show up)
        Don't come out (don't come out)
        Don't start caring about me now ('bout me now)
        Walk away (walk away)
        You know how (you know how)
        Don't start caring about me now (so)
        Up, up
        Don't come out, out, out
        Don't show up, up, up
        Walk away, walk away (so)
        Up, up
        Don't come out, out, out
        Don't show up, up, up
        Walk away, walk away, oh""",
        url = 'https://i.scdn.co/image/ab67616d0000b2734bc66095f8a70bc4e6593f4f',
        song_file = 'https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3',
        duration = 183,
        release_date = 'March 27, 2020')
    eleventhsong = Song(
        user_id= 3,
        artist_id = 11,
        title = 'How You Like That',
        lyrics = """BLACKPINK in your area
        보란 듯이 무너졌어
        바닥을 뚫고 저 지하까지
        옷 끝자락 잡겠다고
        저 높이 두 손을 뻗어 봐도
        다시 캄캄한 이곳에 light up the sky
        네 두 눈을 보며, I'll kiss you goodbye
        실컷 비웃어라 꼴 좋으니까
        이제 너희, 하나, 둘, 셋
        Ha, how you like that?
        You gon' like that, that-that-that-that, that-that-that-that
        How you like that? (Bada-bing, bada-boom-boom-boom)
        How you like that, that-that-that-that, that-that-that-that?
        Now look at you, now look at me, look at you, now look at me
        Look at you, now look at me, how you like that?
        Now look at you, now look at me, look at you, now look at me
        Look at you, now look at me, how you like that?
        Your girl need it all and that's a hunnid
        백 개 중에 백, 내 몫을 원해
        Karma come and get some
        딱하지만 어쩔 수 없잖아
        What's up? I'm right back (right back)
        방아쇠를 cock back (cock back)
        Plain Jane get hijacked, don't like me?
        Then tell me how you like that, like that
        더 캄캄한 이곳에 shine like the stars
        그 미소를 띠며, I'll kiss you goodbye
        실컷 비웃어라 꼴 좋으니까
        이제 너희, 하나, 둘, 셋
        Ha, how you like that?
        You gon' like that, that-that-that-that, that-that-that-that
        How you like that? (Bada-bing, bada-boom-boom-boom)
        How you like that, that-that-that-that, that-that-that-that?
        Now look at you, now look at me, look at you, now look at me
        Look at you, now look at me, how you like that?
        Now look at you, now look at me, look at you, now look at me
        Look at you, now look at me, how you like that?
        날개 잃은 채로 추락했던 날
        어두운 나날 속에 갇혀 있던 날
        그때쯤에 넌 날 끝내야 했어
        Look up in the sky, it's a bird, it's a plane
        Yeah-eh-eh-eh
        Bring out your boss, bitch
        Yeah-eh-eh-eh
        BLACKPINK!
        뚜뚜뚜뚜두두, 뚜뚜뚜뚜두두 (how you like that?)
        뚜뚜뚜뚜두두, 뚜뚜뚜뚜두두두 (you gon' like that)
        뚜뚜뚜뚜두두, 뚜뚜뚜뚜두두 (how you like that?)
        뚜뚜뚜뚜두두, 뚜뚜뚜뚜두두두""",
        url = 'https://i.scdn.co/image/ab67616d0000b2737dd8f95320e8ef08aa121dfe',
        song_file = 'https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3',
        duration = 182,
        release_date = 'October 2, 2020')
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
    db.session.add(eleventhsong)
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
