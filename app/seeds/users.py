from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username="Demo",
        email="demo@aa.io",
        password="password",
        first_name="demo1",
        last_name="work1",
    )
    marnie = User(
        username="marnie",
        email="marnie@aa.io",
        password="password",
        first_name="demo2",
        last_name="work2",
    )
    bobbie = User(
        username="bobbie",
        email="bobbie@aa.io",
        password="password",
        first_name="demo3",
        last_name="work3",
    )
    chris = User(
        username="Chris",
        email="chris@aa.io",
        password="password",
        first_name="Chris",
        last_name="demoT",
    )
    minh = User(
        username="Minh",
        email="minh@aa.io",
        password="password",
        first_name="Minh",
        last_name="demoT",
    )
    jenny = User(
        username="Jenny",
        email="jenny@aa.io",
        password="password",
        first_name="Jenny",
        last_name="demoL",
    )
    thandi = User(
        username="Thandi",
        email="thandi@aa.io",
        password="password",
        first_name="Thandi",
        last_name="demoM",
    )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(chris)
    db.session.add(minh)
    db.session.add(jenny)
    db.session.add(thandi)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
