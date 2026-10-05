from database import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    phone_number = db.Column(db.String(20),unique=True, nullable=False)
    role = db.Column(db.String(20), nullable=False)

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)
    image = db.Column(db.String(255), nullable=True)
    location = db.Column(db.String(150), nullable=False)
    date_listed = db.Column(db.Date, nullable=False)
    status = db.Column(db.String(20), nullable=False)
    farmer_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)