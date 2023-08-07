from .db import db, environment, SCHEMA, add_prefix_for_prod
from .reviews import Review


# Many-to-Many Relationship between Users & Products
favorites = db.Table(
    "favorites",
    db.Model.metadata,
    db.Column(
        "userId", db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True
    ),
    db.Column(
        "productId", db.ForeignKey(add_prefix_for_prod("products.id")), primary_key=True
    ),
)
if environment == "production":
    favorites.schema = SCHEMA


class Product(db.Model):
    __tablename__ = "products"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    item_name = db.Column(db.String(255))
    price = db.Column(db.Numeric(precision=10, scale=2), nullable=False)
    category = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    preview_imageURL = db.Column(db.Text, nullable=False)
    sellerId = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    createdAt = db.Column(db.DateTime, default=db.func.now())
    updatedAt = db.Column(db.DateTime, default=db.func.now())

    # One-to-Many Relationship with Product and ProductImage
    # This relationship states that Product will be listening to the class ProductImage
    image = db.relationship(
        "ProductImage", back_populates="product", cascade="all, delete-orphan"
    )

    # join table relationship
    user = db.relationship("User", secondary=favorites, back_populates="products")

    # one to many, many side
    review = db.relationship(
        "Review", back_populates="product", cascade="all, delete-orphan"
    )
    seller = db.relationship("User", back_populates="product")

    # one to many, one side
    item = db.relationship(
        "CartItem", back_populates="product", cascade="all, delete-orphan"
    )

    # this is for the favorites = db.Table()
    # user_favorites = db.relationship(
    #     "User", secondary="favorites", back_populates="product_favorites"
    # )

    def to_dict(self):
        return {
            "id": self.id,
            "item_name": self.item_name,
            "price": self.price,
            "category": self.category,
            "description": self.description,
            "quantity": self.quantity,
            "preview_imageURL": self.preview_imageURL,
            "sellerId": self.sellerId,
            "createdAt": self.createdAt,
            "updatedAt": self.updatedAt,
        }


class ProductImage(db.Model):
    __tablename__ = "product_images"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    # other columns
    productId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")))
    product_imageURL = db.Column(db.Text, nullable=True)

    # One-to-Many Relationship with Product and ProductImage
    # This relationship states that ProductImage will be listening to the class Product
    product = db.relationship("Product", back_populates="image")

    def to_dict(self):
        return {
            "id": self.id,
            "productId": self.productId,
            "product_imageURL": self.product_imageURL,
        }


class CartItem(db.Model):
    __tablename__ = "cart_items"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    productId = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")), nullable=False
    )
    userId = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )

    product = db.relationship("Product", back_populates="item")
    user = db.relationship("User", back_populates="item")

    def to_dict(self):
        return {
            "id": self.id,
            "productId": self.productId,
            "userId": self.userId,
        }
