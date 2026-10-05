import re
import os
import uuid
from datetime import datetime
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS
from database import db
from models import User, Product

app = Flask(__name__)
CORS(app)

app.config["UPLOAD_FOLDER"] = os.path.join(os.getcwd(), "uploads")

# Database configuration
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///agricultural_marketplace.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Connect database to Flask
db.init_app(app)

@app.route("/")
def home():
    return "Agricultural Marketplace API is running!"

@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    
    first_name = data.get("first_name")
    last_name = data.get("last_name")
    email = data.get("email")
    password = data.get("password")
    phone_number = data.get("phone_number")
    role = data.get("role")

    if not all([first_name, last_name, email, password, phone_number, role]):
        return jsonify({"message": "All fields are required."}), 400

    if (
        len(password) < 8 
        or not re.search(r"[A-Z]", password) 
        or not re.search(r"[a-z]", password) 
        or not re.search(r"\d", password) 
        or not re.search(r"[!@#$%^&*(),.?\":{}|<>]", password)
        ):
        return jsonify({
            "message": "Password must be at least 8 characters long and contain an uppercase letter, lowercase letter, number, and special character."
        }), 400

    if not re.fullmatch(r"07\d{8}|01\d{8}", phone_number):
        return jsonify({"message": "Phone number must start with 07 or 01 and be 10 digits long."}), 400
    
    if not re.fullmatch(r"[^@]+@[^@]+\.[^@]+", email):
        return jsonify({"message": "Please enter a valid email address."}), 400
    
    existing_user = User.query.filter_by(email=email).first()

    if existing_user:
        return jsonify({"message": "Email already exists."}), 400
    
    existing_phone = User.query.filter_by(phone_number=phone_number).first()
    
    if existing_phone:
        return jsonify({"message": "Phone number already exists."}), 400
    
    new_user = User(
        first_name=first_name,
        last_name=last_name,
        email=email,
        password=password,
        phone_number=phone_number,
        role=role
    )

    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User registered successfully!"}), 201

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"message": "Email and password are required."}), 400

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({"message": "Invalid email or password."}), 401

    if user.password != password:
        return jsonify({"message": "Invalid email or password."}), 401

    return jsonify({
        "message": "Login successful!",
        "user": {
            "id": user.id,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "role": user.role
        }
    }), 200

@app.route("/profile/<int:user_id>", methods=["GET"])
def get_profile(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({"message": "User not found."}), 404

    return jsonify({
        "id": user.id,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "email": user.email,
        "phone_number": user.phone_number,
        "role": user.role
    }), 200

@app.route("/profile/<int:user_id>", methods=["PUT"])
def update_profile(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({"message": "User not found."}), 404

    data = request.get_json()

    first_name = data.get("first_name")
    last_name = data.get("last_name")
    email = data.get("email")
    phone_number = data.get("phone_number")

    if not all([first_name, last_name, email, phone_number]):
        return jsonify({"message": "All profile fields are required."}), 400

    if not re.fullmatch(r"(07|01)\d{8}", phone_number):
        return jsonify({
            "message": "Phone number must start with 07 or 01 and be 10 digits long."
        }), 400

    if not re.fullmatch(r"[^@\s]+@[^@\s]+\.[^@\s]+", email):
        return jsonify({"message": "Please enter a valid email address."}), 400

    existing_email = User.query.filter(
        User.email == email,
        User.id != user_id
    ).first()

    if existing_email:
        return jsonify({"message": "Email already exists."}), 400

    existing_phone = User.query.filter(
        User.phone_number == phone_number,
        User.id != user_id
    ).first()

    if existing_phone:
        return jsonify({"message": "Phone number already exists."}), 400

    user.first_name = first_name
    user.last_name = last_name
    user.email = email
    user.phone_number = phone_number

    db.session.commit()

    return jsonify({
        "message": "Profile updated successfully!"
    }), 200

@app.route("/products", methods=["POST"])
def add_product():
    product_name = request.form.get("product_name")
    description = request.form.get("description")
    quantity = request.form.get("quantity")
    price = request.form.get("price")
    location = request.form.get("location")
    farmer_id = request.form.get("farmer_id")
    image = request.files.get("image")

    if not all([product_name, description, quantity, price, location, farmer_id]):
        return jsonify({
            "message": "All product fields are required."
        }), 400

    farmer = User.query.filter_by(id=farmer_id, role="Farmer").first()

    if not farmer:
        return jsonify({
            "message": "Valid farmer account is required."
        }), 400

    try:
        quantity = int(quantity)
        price = float(price)
        farmer_id = int(farmer_id)
    except ValueError:
        return jsonify({
            "message": "Quantity, price, and farmer ID must be valid numbers."
        }), 400

    image_filename = None

    if image:
        image_filename = secure_filename(image.filename)
        file_extension = os.path.splitext(image_filename)[1]
        image_filename = f"{uuid.uuid4()}{file_extension}"

        image.save(os.path.join(app.config["UPLOAD_FOLDER"], image_filename))

    new_product = Product(
        product_name=product_name,
        description=description,
        quantity=quantity,
        price=price,
        image=image_filename,
        location=location,
        date_listed=datetime.utcnow().date(),
        status="Available",
        farmer_id=farmer_id
    )

    db.session.add(new_product)
    db.session.commit()

    return jsonify({
        "message": "Produce listed successfully!",
        "product": {
            "id": new_product.id,
            "product_name": new_product.product_name,
            "description": new_product.description,
            "quantity": new_product.quantity,
            "price": new_product.price,
            "image": new_product.image,
            "location": new_product.location,
            "date_listed": new_product.date_listed.isoformat(),
            "status": new_product.status,
            "farmer_id": new_product.farmer_id
        }
    }), 201

if __name__ == "__main__":
    app.run(debug=True)