from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Product, User, Review, ProductImage, db, CartItem
from app.models.products import favorites
from app.forms import NewProduct, NewProductImage, NewReview
from sqlalchemy import insert
from pprint import pprint
import traceback

products_routes = Blueprint("products", __name__)


# prefix /products
def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


@products_routes.route("/")
def get_products():
    dictToPass = {}
    products = Product.query.all()
    products = [p.to_dict() for p in products]
    dictToPass["Products"] = products

    for product in products:
        reviews = Review.query.filter(Review.productId == product["id"])
        reviews = [review.to_dict() for review in reviews]
        seller = User.query.get(product["sellerId"])
        seller = seller.to_dict()
        product["Reviews"] = reviews
        product["Seller"] = seller

    return dictToPass


# @login.user_loader
@products_routes.route("/current")
@login_required
def user_products():
    # grabs current user instance and turns it into a dic that keys into id
    userId = current_user.to_dict()["id"]
    user_products = Product.query.filter(Product.sellerId == userId).all()
    return {"Products": [p.to_dict() for p in user_products]}


@products_routes.route("/<int:id>")
def product_details(id):
    product = Product.query.get(id)
    if not product:
        return {"message": "Product couldn't be found"}
    product = product.to_dict()
    reviews = Review.query.filter(Review.productId == id).all()
    reviews = [r.to_dict() for r in reviews]
    sellerId = product["sellerId"]
    seller = User.query.get(sellerId).to_dict()
    product_images = ProductImage.query.filter(ProductImage.productId == id).all()
    product_images = [i.to_dict() for i in product_images]
    product["Reviews"] = reviews
    product["Seller"] = seller
    product["ProductImages"] = product_images
    # pprint(product["Reviews"])
    return product


@products_routes.route("/new", methods=["POST"])
@login_required
def create_product():
    try:
        form = NewProduct()
        print("ROUTE IS HIT!!! THIS IS FORM.DATA")
        pprint(form.data)

        # Flask-WTF and WTForms by default require a CSRF_TOKEN because these packages are meant to handle CSRF protection therefore your code will break if it does not have these two lines of code: the request csrf token from cookies and validate_on_submit
        # on the other hand, if you remove these two lines of code, it will work locally, just not on production
        form["csrf_token"].data = request.cookies["csrf_token"]
        if form.validate_on_submit():
            new_product = Product(
                item_name=form.data["item_name"],
                price=form.data["price"],
                category=form.data["category"],
                description=form.data["description"],
                quantity=form.data["quantity"],
                preview_imageURL=form.data["preview_imageURL"],
                sellerId=current_user.to_dict()["id"],
            )
            print("THIS IS TO DICT USER ID", current_user.to_dict()["id"])
            print("new_product after validation")
            pprint(new_product.to_dict())
            db.session.add(new_product)
            db.session.commit()

            # Attach Reviews and Seller information to match Chris' getAllProducts reducer - this is to properly create one and attach all necessary information for each single page to load
            seller = current_user.to_dict()
            new_product = new_product.to_dict()
            return_product = jsonify(new_product, seller)
            print(
                "this is return jsonified",
                return_product,
            )
            print("this is the type jsonified", type(return_product))
            return jsonify({"New_Product": new_product, "Seller": seller})
    except Exception as e:
        error_message = str(e)
        traceback_str = traceback.format_exc()
        print("THIS IS THE FORM ERRORS", form.errors)
        print("Error:", error_message)
        print("Traceback:", traceback_str)
        return jsonify(error=error_message, traceback=traceback_str), 500
        return "Bad Data"


@products_routes.route("/<int:id>/images", methods=["POST"])
@login_required
def add_images(id):
    form = ProductForm()
    # if form.validate_on_submit():
    new_product_image = Product(
        productId=id,
        product_imageURL=form.data["product_imageURL"],
        sellerId=current_user.to_dict()["id"],
    )
    db.session.add(new_product_image)
    db.session.commit()
    return new_product_image.to_dict()
    # return "Bad data"


@products_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_product(id):
    product = Product.query.get(id)
    if not product:
        return {"message": "Product couldn't be found"}
    db.session.delete(product)
    db.session.commit()
    return {"message": "Successfully deleted"}


# get all reviews by product id
@products_routes.route("/<int:id>/reviews")
def get_reviews(id):
    reviews = Review.query.filter(Review.productId == id).all()
    if not reviews:
        return {"message": "Product couldn't be found"}
    revs = []
    for r in reviews:
        r = r.to_dict()
        user = User.query.get(r["userId"]).to_dict()
        r["User"] = {
            "id": user["id"],
            "first_name": user["first_name"],
            "last_name": user["last_name"],
        }
        revs.append(r)

    return {"Reviews": revs}


@products_routes.route("/<int:id>/reviews", methods=["POST"])
@login_required
def create_review(id):
    try:
        form = NewReview()
        product = Product.query.get(id)
        if not product:
            return {"message": "Product couldn't be found"}

        # ! changed this to have wtf forms validations, was working before without it and have front end validations so not suer needed if breaking live site

        form["csrf_token"].data = request.cookies["csrf_token"]
        if form.validate_on_submit():
            new_review = Review(
                stars=form.data["stars"],
                review=form.data["review"],
                userId=current_user.to_dict()["id"],
                productId=id,
            )

            db.session.add(new_review)
            db.session.commit()

            return new_review.to_dict()
    except Exception as e:
        error_message = str(e)
        traceback_str = traceback.format_exc()
        print("THIS IS THE FORM ERRORS", form.errors)
        print("Error:", error_message)
        print("Traceback:", traceback_str)
        return jsonify(error=error_message, traceback=traceback_str), 500


# POST - Favorite a Product
@products_routes.route("/<int:productId>", methods=["POST"])
@login_required
def post_favorite_item(productId):
    user_id = current_user.id
    product_exists = Product.query.get(productId)
    user = User.query.get(user_id)
    seller = User.query.get(product_exists.sellerId)

    # print(product_exists.to_dict())

    # ! Edge Case for Postman
    existing_favorite = (
        db.session.query(favorites)
        .filter((favorites.c.userId == user_id) & (favorites.c.productId == productId))
        .first()
    )
    if existing_favorite:
        return {"message": "You have already favorited this product."}

    # check if the user owns the product (userId = sellerId)
    if product_exists and user_id == product_exists.sellerId:
        return {"message": "You may not favorite your own product."}

    # print("this is the product_exists", product_exists)
    if product_exists and product_exists.sellerId != user_id:
        add_user_favorite = insert(favorites).values(
            userId=user_id, productId=productId
        )
        db.session.execute(add_user_favorite)
        db.session.commit()
        # Not returning a 'message' here bc we need user/product data for the frontend
        return {
            "Product": product_exists.to_dict(),
            "User": user.to_dict(),
            "Seller": seller.to_dict(),
        }
    else:
        return {"message": "Item couldn't be found"}


# POST: add item to cart
@products_routes.route("/<int:productId>/add_to_cart", methods=["POST"])
@login_required
def post_cart_items(productId):
    # print("value going into post_cart_items: productId", productId)
    print(productId)
    user_id = current_user.id
    # print('what is current user id', user_id)
    product_exists = Product.query.get(productId)
    # print('what is product exists s/p Product.query.get(productId)', product_exists)
    user = User.query.get(user_id)
    # print('what is user s/p User.query.get(user_id)', user)
    seller = User.query.get(product_exists.sellerId)
    # print('what is seller s/p User.query.get(product)exists.sellerId', seller)

    # Edge Cases
    # 1- checking if item is already in our cart
    existing_cart_item = (
        db.session.query(CartItem)
        .filter((CartItem.userId == user_id) & (CartItem.productId == productId))
        .first()
    )

    if existing_cart_item:
        return {"message": "You have already added this product to your cart."}

    # print ("existing_cart_item this is value", existing_cart_item)

    # 2- checking if the user owns the product (userId = sellerId)
    if product_exists and user_id == product_exists.sellerId:
        return {"message": "You may not add your own product to cart."}

    # if doesn't fall into any of the edge cases above, add item to cart!
    if product_exists and product_exists.sellerId != user_id:
        add_item_to_cart = insert(CartItem).values(userId=user_id, productId=productId)
        db.session.execute(add_item_to_cart)
        db.session.commit()
        product_to_return = {
            "CartItem": add_item_to_cart.to_dict(),
            "Product": product_exists,
        }
        # UPDATE API FOR THE RETURN, NO MSG
        # print("ADD TO CART", add_to_cart.to_dict())
        return product_to_return
    else:
        # print("this dont work")
        return {"message": "Item couldn't be found"}


@products_routes.route("/search", methods=["GET"])
def search_products():
    # grabs user input from search bar
    searchQuery = request.args.get("result")
    # query those products
    filtered_products = Product.query.filter(
        Product.item_name.ilike(f"%{str(searchQuery)}%")
    ).all()

    searchQuery_list = []
    if "," in searchQuery:
        searchQuery_list = searchQuery.split(",")

    filtered_products_list = []
    for s in searchQuery_list:
        filtered_products_list.extend(
            Product.query.filter(Product.item_name.ilike(f"%{str(s)}%")).all()
        )

    filtered_products = []

    if len(filtered_products_list) == 0:
        filtered_products = Product.query.filter(
            Product.item_name.ilike(f"%{str(searchQuery)}%")
        ).all()

    products = []

    if filtered_products:
        products = [product.to_dict() for product in filtered_products]
    # pprint(products)

    if filtered_products_list:
        products = [product.to_dict() for product in filtered_products_list]

    print(products)
    for product in products:
        reviews = Review.query.filter(Review.productId == product["id"])
        reviews = [review.to_dict() for review in reviews]
        seller = User.query.get(product["sellerId"])
        seller = seller.to_dict()
        product["Reviews"] = reviews
        product["Seller"] = seller

    return {"Products": products}
