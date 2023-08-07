from app.models import db, environment, SCHEMA, Product, ProductImage
from sqlalchemy.sql import text


def seed_product_images(products):
    product_images = [
        {
            # "id": 1,
            "productId": 1,
            "product_imageURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Desktop_computer_clipart_-_Yellow_theme.svg/1280px-Desktop_computer_clipart_-_Yellow_theme.svg.png",
        },
        {
            # "id": 2,
            "productId": 2,
            "product_imageURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/M2_Macbook_Air_Starlight_model.jpg/1024px-M2_Macbook_Air_Starlight_model.jpg",
        },
        {
            # "id": 3,
            "productId": 3,
            "product_imageURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Logitech-usb-speakers.jpg/1024px-Logitech-usb-speakers.jpg",
        },
        {
            # "id": 4,
            "productId": 4,
            "product_imageURL": "https://upload.wikimedia.org/wikipedia/commons/3/36/Large_bonfire.jpg",
        },
    ]

    for product_image in product_images:
        each_image = ProductImage(**product_image)
        print(each_image)
        db.session.add(each_image)
        db.session.commit()
    return product_images


# Uses a raw SQL query to TRUNCATE or DELETE the products table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_product_images():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.product_images RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM product_images"))

    db.session.commit()
