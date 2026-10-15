import re
import os
import uuid
from datetime import datetime
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
from database import db
from models import User, Product, Order


app = Flask(__name__)
CORS(app)

app.config["UPLOAD_FOLDER"] = os.path.join(os.getcwd(), "uploads")
os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)
@app.route("/uploads/<filename>")
def uploaded_file(filename):
    from flask import send_from_directory

    return send_from_directory(app.config["UPLOAD_FOLDER"], filename)

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
        password=generate_password_hash(password),
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

    if not check_password_hash(user.password, password):
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

@app.route("/products/<int:farmer_id>", methods=["GET"])
def get_farmer_products(farmer_id):
    farmer = User.query.filter_by(
        id=farmer_id,
        role="Farmer"
    ).first()

    if not farmer:
        return jsonify({
            "message": "Valid farmer account is required."
        }), 404

    products = Product.query.filter_by(
        farmer_id=farmer_id
    ).all()

    return jsonify({
        "products": [
            {
                "id": product.id,
                "product_name": product.product_name,
                "description": product.description,
                "quantity": product.quantity,
                "price": product.price,
                "image": product.image,
                "location": product.location,
                "date_listed": product.date_listed.isoformat(),
                "status": product.status
            }
            for product in products
        ]
    }), 200

@app.route("/products/<int:product_id>", methods=["PUT"])
def update_product(product_id):
    product = Product.query.get(product_id)

    if not product:
        return jsonify({
            "message": "Produce listing not found."
        }), 404

    data = request.get_json()

    if not data:
        return jsonify({
            "message": "Product information is required."
        }), 400

    product_name = data.get("product_name")
    description = data.get("description")
    quantity = data.get("quantity")
    price = data.get("price")
    location = data.get("location")

    if not all([
        product_name, description, quantity is not None,
        price is not None, location
    ]):
        return jsonify({
            "message": "All product fields are required."
        }), 400

    try:
        quantity = int(quantity)
        price = float(price)

        if quantity <= 0 or price <= 0:
            raise ValueError
    except (ValueError, TypeError):
        return jsonify({
            "message": "Quantity and price must be positive numbers."
        }), 400

    product.product_name = product_name
    product.description = description
    product.quantity = quantity
    product.price = price
    product.location = location

    db.session.commit()

    return jsonify({
        "message": "Produce listing updated successfully.",
        "product": {
            "id": product.id,
            "product_name": product.product_name,
            "description": product.description,
            "quantity": product.quantity,
            "price": product.price,
            "location": product.location,
            "status": product.status
        }
    }), 200

@app.route("/products/<int:product_id>", methods=["DELETE"])
def delete_product(product_id):
    product = Product.query.get(product_id)

    if not product:
        return jsonify({
            "message": "Produce listing not found."
        }), 404

    db.session.delete(product)
    db.session.commit()

    return jsonify({
        "message": "Produce listing removed successfully."
    }), 200


@app.route("/orders", methods=["POST"])
def place_order():
    data = request.get_json()

    if not data:
        return jsonify({"message": "Order details are required."}), 400

    buyer_id = data.get("buyer_id")
    product_id = data.get("product_id")
    quantity = data.get("quantity")

    if buyer_id is None or product_id is None or quantity is None:
        return jsonify({
            "message": "Buyer ID, product ID, and quantity are required."
        }), 400

    try:
        buyer_id = int(buyer_id)
        product_id = int(product_id)
        quantity = int(quantity)
    except (ValueError, TypeError):
        return jsonify({"message": "IDs and quantity must be valid numbers."}), 400

    if quantity <= 0:
        return jsonify({"message": "Quantity must be greater than zero."}), 400

    buyer = User.query.filter_by(
        id=buyer_id,
        role="Buyer"
    ).first()

    if not buyer:
        return jsonify({"message": "A valid buyer account is required."}), 404

    product = Product.query.get(product_id)

    if not product:
        return jsonify({"message": "Product not found."}), 404

    if product.status != "Available":
        return jsonify({"message": "This product is not available."}), 400

    if quantity > product.quantity:
        return jsonify({
            "message": "Requested quantity exceeds available stock."
        }), 400

    order = Order(
        order_date=datetime.utcnow().date(),
        quantity=quantity,
        total_amount=quantity * product.price,
        status="Pending",
        buyer_id=buyer_id,
        product_id=product_id
    )

    db.session.add(order)
    db.session.commit()

    return jsonify({
        "message": "Order placed successfully.",
        "order": {
            "id": order.id,
            "order_date": order.order_date.isoformat(),
            "product_id": order.product_id,
            "quantity": order.quantity,
            "total_amount": order.total_amount,
            "status": order.status
        }
    }), 201

@app.route("/farmer/<int:farmer_id>/orders", methods=["GET"])
def get_farmer_orders(farmer_id):
    farmer = User.query.filter_by(
        id=farmer_id,
        role="Farmer"
    ).first()

    if not farmer:
        return jsonify({"message": "Valid farmer account is required."}), 404

    orders = (
        Order.query
        .join(Product, Order.product_id == Product.id)
        .filter(Product.farmer_id == farmer_id)
        .all()
    )

    return jsonify({
        "orders": [
            {
                "id": order.id,
                "order_date": order.order_date.isoformat(),
                "product_id": order.product_id,
                "product_name": Product.query.get(order.product_id).product_name,
                "buyer_id": order.buyer_id,
                "quantity": order.quantity,
                "total_amount": order.total_amount,
                "status": order.status
            }
            for order in orders
        ]
    }), 200

@app.route("/orders/<int:order_id>/status", methods=["PUT"])
def update_order_status(order_id):
    data = request.get_json()

    if not data or not data.get("status") or not data.get("farmer_id"):
        return jsonify({
            "message": "Farmer ID and order status are required."
        }), 400

    farmer_id = data.get("farmer_id")
    new_status = data.get("status")

    if new_status not in ["Confirmed", "Rejected"]:
        return jsonify({
            "message": "Status must be Confirmed or Rejected."
        }), 400

    farmer = User.query.filter_by(
        id=farmer_id,
        role="Farmer"
    ).first()

    if not farmer:
        return jsonify({"message": "Valid farmer account is required."}), 404

    order = (
        Order.query
        .join(Product, Order.product_id == Product.id)
        .filter(
            Order.id == order_id,
            Product.farmer_id == farmer_id
        )
        .first()
    )

    if not order:
        return jsonify({
            "message": "Order not found for this farmer."
        }), 404

    if order.status != "Pending":
        return jsonify({
            "message": "Only pending orders can be updated."
        }), 400

    order.status = new_status
    db.session.commit()

    return jsonify({
        "message": "Order status updated successfully.",
        "order_id": order.id,
        "status": order.status
    }), 200

with app.app_context():
    db.create_all()
if __name__ == "__main__":
    app.run(debug=True)