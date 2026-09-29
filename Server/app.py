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
    
    if not re.fullmatch(r"07\d{8}", phone_number):
        return jsonify({"message": "Phone number must start with 07 and be 10 digits long."}), 400
    
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

if __name__ == "__main__":
    app.run(debug=True)