from flask.cli import AppGroup
from .users import seed_users, undo_users
from .products import seed_products, undo_products
from .product_images import seed_product_images, undo_product_images
from .reviews import seed_reviews, undo_reviews
from .cart_items import seed_cart_items, undo_cart_items
from .favorites import seed_favorites, undo_favorites

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup("seed")


# Creates the `flask seed all` command
@seed_commands.command("all")
def seed():
    if environment == "production":
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_favorites()
        undo_product_images()
        undo_cart_items()
        undo_reviews()
        undo_products()
        undo_users()
    users = seed_users()
    products = seed_products(users)
    seed_reviews(users, products)
    seed_cart_items(users, products)
    seed_product_images(products)
    seed_favorites()

    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command("undo")
def undo():
    undo_favorites()
    undo_product_images()
    undo_cart_items()
    undo_reviews()
    undo_products()
    undo_users()
    # Add other undo functions here
