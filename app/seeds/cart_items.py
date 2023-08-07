from app.models import db, environment, SCHEMA, Product, User, CartItem
from sqlalchemy.sql import text


# Adds a product, you can add other products here if you want
def seed_cart_items(users, products):
    cart_items = [
        {
            # "id": 1,
            "productId": 1,
            "userId": 4,
        },
        {
            # "id": 2,
            "productId": 2,
            "userId": 4,
        },
        {
            # "id": 3,
            "productId": 3,
            "userId": 5,
        },
        {
            # "id": 4,
            "productId": 4,
            "userId": 5,
        },
        {
            # "id": 5,
            "productId": 1,
            "userId": 7,
        },
        {
            # "id": 6,
            "productId": 2,
            "userId": 7,
        },
        {
            # "id": 7,
            "productId": 3,
            "userId": 6,
        },
        {
            # "id": 8,
            "productId": 4,
            "userId": 6,
        },
        {
            # "id": 9,
            "productId": 1,
            "userId": 6,
        },
        {
            # "id": 10,
            "productId": 2,
            "userId": 5,
        },
    ]

    for item in cart_items:
        each_item = CartItem(**item)
        print(each_item)
        db.session.add(each_item)
        db.session.commit()
    return cart_items


# Uses a raw SQL query to TRUNCATE or DELETE the products table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_cart_items():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.cart_items RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM cart_items"))

    db.session.commit()
