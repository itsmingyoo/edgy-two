from flask import Blueprint
from flask_login import login_required, current_user
from app.models.products import favorites
from pprint import pprint
from app.models.db import db
from app.models.user import User
from app.models.products import Product
from itertools import groupby

# prefix='/api/favorites'
favorites_routes = Blueprint("favorites", __name__)


# Get Current User's Favorite Items
@favorites_routes.route("/current")
@login_required
def get_current_favorites():
    # grab current user's id
    curr_user_id = current_user.id

    # query for user info
    user = User.query.get(curr_user_id)

    # if user has favorite products, then execute this code
    if user.products:
        # filter each product into a dictionary and exclude the key "updatedAt"
        user_favorites = [
            {k: v for k, v in product.to_dict().items() if k != "updatedAt"}
            for product in user.products
        ]

        # grab sellerId from each product
        vendorId = {
            product["sellerId"] for product in user_favorites if "sellerId" in product
        }

        # use sellerId to query for their user info
        vendor_user_info = User.query.filter(User.id.in_(vendorId)).all()

        # dictionary each vendor by userId: user_data in order to grab their info
        vendor = {user.id: user.to_dict() for user in vendor_user_info}
        # print(user.to_dict())
        # group the products by sellerId into a dictionary
        grouped_products = {}
        for product in user_favorites:
            seller_id = product.get("sellerId")
            # print(isinstance(seller_id, int))
            if seller_id in vendor:
                grouped_products.setdefault(seller_id, []).append(product)

        # pprint(grouped_products)

        # !! FORMATTING OF THE DATA
        # this will be our return data and we will formulate how it will look
        user_favorites_and_seller_data = {
            # "User": {
            #     "id": user.id,
            #     "first_name": user.first_name,
            #     "last_name": user.last_name,
            #     "username": user.username,
            #     "email": user.email,
            # }
        }

        # grouped_products is a dictionary of key: value pairs
        # seller_id: products
        for seller_id, products in grouped_products.items():
            user_data = vendor[seller_id]
            for product in products:
                # [productId]: {matching product, vendor's info}
                user_favorites_and_seller_data[product.get("id")] = {
                    "id": product.get("id"),
                    "item_name": product.get("item_name"),
                    "price": product.get("price"),
                    "description": product.get("description"),
                    "preview_imageURL": product.get("preview_imageURL"),
                    "category": product.get("category"),
                    "sellerId": product.get("sellerId"),
                    "Seller": {
                        "id": user_data["id"],
                        "first_name": user_data["first_name"],
                        "last_name": user_data["last_name"],
                        "username": user_data["username"],
                    },
                }
        return {"Favorites": user_favorites_and_seller_data, "User": user.to_dict()}
    return {"message": "Favorites couldn't be found"}


# Delete Favorite
@favorites_routes.route("/<int:productId>", methods=["DELETE"])
@login_required
def del_favorite_by_id(productId):
    user_id = current_user.id

    # this is the delete condition that will execute if true
    delete_condition = favorites.delete().where(
        (favorites.c.userId == user_id) & (favorites.c.productId == productId)
    )
    res = db.session.execute(delete_condition)
    db.session.commit()

    # This checks if any row was affected
    if res.rowcount > 0:
        return {"message": f"Favorite item with ID {productId} deleted successfully."}
    else:
        return {
            "error": f"Favorite item with ID {productId} not found for the user."
        }, 404
