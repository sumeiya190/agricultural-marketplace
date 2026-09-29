1. Project Structure
- Created the main project folder: agricultural-marketplace
- Created separate folders for: 
    - client - frontend
    - server - backend

2. Backend Environment
-  Set up a Python virtual environment inside the server folder.
- Installed the required backend packages:
    - Flask
    - Flask-CORS
    - Flask-SQLAlchemy
    - python-dotenv

3. Flask Backend
- Created the Flask application in app.py
- Configured Flask to run on: http://127.0.0.1:5000
- Added a home route to confirm that the API is running.
- Added CORS support to allow communication between the React frontend and Flask backend.

4. Database Setup
- Configured SQLite as the development database.
- Created the database: agricultural_marketplace.db
- Connected the database to Flask using Flask-SQLAlchemy.

5. User Model
- Created the User database model with the following attributes:
| Attribute    | Purpose                    |
| ------------ | -------------------------- |
| ID           | Unique user identifier     |
| First Name   | User's first name          |
| Last Name    | User's last name           |
| Email        | User's email address       |
| Password     | User's account password    |
| Phone Number | User's Kenyan phone number |
| Role         | Farmer or Buyer            |

6. User Registration API
- Implemented a POST /register endpoint that:
    - Receives user registration data as JSON.
    - Checks that all required fields are provided.
    - Checks whether the email already exists.
    - Checks whether the phone number already exists.
    - Creates a new user record.
    - Saves the user to the SQLite database.
    - Returns an appropriate response to the client.

7. Input Validation
- Added validation for:
    - Phone number:
        - Must contain exactly 10 digits.
        - Must begin with 07.
        - Example accepted format: 0722123456
    - Email
        - Must follow a basic valid email structure.
        - Examples:
            - user@gmail.com
            - user@yahoo.com
8. APi Testing
- Tested the registration endpoint using Postman.
- Tests completed:
| Test                     | Result        |
| ------------------------ | ------------- |
| Valid registration       | ✅ Passed      |
| Invalid phone number     | ✅ Rejected    |
| Invalid email address    | ✅ Rejected    |
| User saved to database   | ✅ Confirmed   |
| Duplicate email checking | ✅ Implemented |

9. Database verification
- Confirmed that successfully registered users are stored in the SQLite database and can be viewed using a database viewer.

Current Status
Completed: Backend registration foundation and validation

Next development task: Connect the React registration form to the Flask /register API so that registration through the actual website saves users to the database.
