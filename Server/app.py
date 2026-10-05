import re
from flask import Flask, request, jsonify
from flask_cors import CORS
from database import db
from models import User

app = Flask(__name__)
CORS(app)

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

if __name__ == "__main__":
    app.run(debug=True)