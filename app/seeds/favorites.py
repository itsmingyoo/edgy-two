from app.models import db, environment, SCHEMA, Product, User
from app.models.products import favorites
from sqlalchemy.sql import text


def seed_favorites():
    seed_data = [
        {"userId": 4, "productId": 1},
        {"userId": 4, "productId": 2},
        {"userId": 4, "productId": 4},
        {"userId": 5, "productId": 2},
        {"userId": 5, "productId": 3},
        {"userId": 5, "productId": 4},
        {"userId": 5, "productId": 19},
        {"userId": 5, "productId": 30},
        {"userId": 5, "productId": 33},
        {"userId": 6, "productId": 1},
        {"userId": 6, "productId": 3},
        {"userId": 6, "productId": 4},
        {"userId": 7, "productId": 1},
        {"userId": 7, "productId": 2},
        {"userId": 7, "productId": 3},
        # Add more rows as needed
    ]

    with db.engine.connect() as connection:
        for favorite in seed_data:
            each_favorite = favorites.insert().values(**favorite)
            connection.execute(each_favorite)
        return seed_data


# Uses a raw SQL query to TRUNCATE or DELETE the products table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.


def undo_favorites():
    if environment == "production":
        with db.session() as session:
            session.execute(
                f"TRUNCATE table {SCHEMA}.favorites RESTART IDENTITY CASCADE;"
            )
    else:
        with db.session() as session:
            session.execute(text("DELETE FROM products"))

    # Commit the changes (if any) to the database.
    # This is outside the 'with' blocks as we don't need to commit separately for each block.
    db.session.commit()
