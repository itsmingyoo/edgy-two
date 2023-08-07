from flask_wtf import FlaskForm
from wtforms import (
    StringField,
    SubmitField,
    IntegerField,
    SelectField,
    BooleanField,
    DateField,
    TextAreaField,
    FloatField,
)
from wtforms.validators import DataRequired


class NewProduct(FlaskForm):
    item_name = StringField("Item name", validators=[DataRequired()])
    price = FloatField("Price", validators=[DataRequired()])
    category = StringField("Category", validators=[DataRequired()])
    description = TextAreaField("Description", validators=[DataRequired()])
    quantity = IntegerField("Quantity", validators=[DataRequired()])
    preview_imageURL = StringField("Preview Image", validators=[DataRequired()])
    submit = SubmitField("Submit")
