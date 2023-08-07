from .db import db, environment, SCHEMA
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

from .products import favorites


class User(db.Model, UserMixin):
    __tablename__ = "users"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)

    # assoc needed for favorites join table
    products = db.relationship("Product", secondary=favorites, back_populates="user")

    review = db.relationship(
        "Review", back_populates="user", cascade="all, delete-orphan"
    )
    item = db.relationship(
        "CartItem", back_populates="user", cascade="all, delete-orphan"
    )

    # one to many, one side
    product = db.relationship(
        "Product", back_populates="user", cascade="all, delete-orphan"
    )

    # this is for the favorites = db.Table()
    # product_favorites = db.relationship(
    #     "Product", secondary="favorites", back_populates="user_favorites"
    # )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
        }
