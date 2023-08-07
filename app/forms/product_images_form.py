from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField, SelectField, BooleanField, DateField
from wtforms.validators import DataRequired

class NewProductImage(FlaskForm):
    product_imageURL = StringField("Product Image", validators=[DataRequired()])
    submit = SubmitField('Submit')
