# Project Progress

## 1. Project Structure

* Created the main project folder: `agricultural-marketplace`
* Created separate folders for:

  * `Client` - frontend
  * `Server` - backend

## 2. Backend Environment

* Set up a Python virtual environment inside the `Server` folder.
* Installed the required backend packages:

  * Flask
  * Flask-CORS
  * Flask-SQLAlchemy
  * python-dotenv

## 3. Flask Backend

* Created the Flask application in `app.py`.
* Configured Flask to run on: `http://127.0.0.1:5000`
* Added a home route to confirm that the API is running.
* Added CORS support to allow communication between the React frontend and Flask backend.

## 4. Database Setup

* Configured SQLite as the development database.
* Created the database: `agricultural_marketplace.db`
* Connected the database to Flask using Flask-SQLAlchemy.

## 5. User Model

* Created the `User` database model with the following attributes:

| Attribute    | Purpose                    |
| ------------ | -------------------------- |
| ID           | Unique user identifier     |
| First Name   | User's first name          |
| Last Name    | User's last name           |
| Email        | User's email address       |
| Password     | User's account password    |
| Phone Number | User's Kenyan phone number |
| Role         | Farmer or Buyer            |

## 6. User Registration API

* Implemented a `POST /register` endpoint that:

  * Receives user registration data as JSON.
  * Checks that all required fields are provided.
  * Checks whether the email already exists.
  * Checks whether the phone number already exists.
  * Creates a new user record.
  * Saves the user to the SQLite database.
  * Returns an appropriate response to the client.

## 7. Input Validation

* Added validation for:

  * **Phone number:**

    * Must contain exactly 10 digits.
    * Must begin with `07` or `01`.
    * Examples of accepted formats:

      * `0722123456`
      * `0112345678`
  * **Email:**

    * Must follow a basic valid email structure.
    * Examples:

      * `user@gmail.com`
      * `user@yahoo.com`
  * Added password strength validation:
    * Must contain at least 8 characters.
    * Must contain at least one uppercase letter.
    * Must contain at least one lowercase letter.
    * Must contain at least one number.
    * Must contain at least one special character.
  * Tested password validation through the React registration form.
  * Confirmed weak passwords are rejected and strong passwords are accepted.

## 8. API Testing

* Tested the registration endpoint using Postman.
* Tests completed:

| Test                      | Result        |
| ------------------------- | ------------- |
| Valid registration        | ✅ Passed      |
| Invalid phone number      | ✅ Rejected    |
| Invalid email address     | ✅ Rejected    |
| User saved to database    | ✅ Confirmed   |
| Duplicate email checking  | ✅ Implemented |
| Duplicate phone checking  | ✅ Implemented |
| `01XXXXXXXX` phone format | ✅ Passed      |

## 9. Database Verification

* Confirmed that successfully registered users are stored in the SQLite database.
* Verified registered users using a database viewer.

## 10. React Frontend Registration

* Created the React registration form according to the project wireframe.
* Added fields for:

  * First Name
  * Last Name
  * Email
  * Phone Number
  * Password
  * Role
* Added basic form validation using required fields and appropriate input types.
* Styled the registration page to match the project wireframe.

## 11. Frontend-to-Backend Integration

* Connected the React registration form to the Flask `POST /register` API.
* Configured the React frontend to send registration data as JSON.
* Added handling for successful and unsuccessful registration responses.
* Successfully tested registration through the actual website.
* Confirmed that users registered through the website are saved to the SQLite database.

## **12. User Login API**

* Implemented a `POST /login` endpoint that:

  * Receives the user's email and password as JSON.
  * Checks that both email and password are provided.
  * Searches for the user using the provided email.
  * Verifies the provided password.
  * Returns an appropriate response for successful or unsuccessful login.
  * Returns basic user information after a successful login.

## **13. React Frontend Login**

* Created a separate React login page according to the project wireframe.
* Added fields for:

  * Email
  * Password
* Added basic form validation using required fields and appropriate input types.
* Connected the React login form to the Flask `POST /login` API.
* Configured the React frontend to send login data as JSON.
* Added handling for successful and unsuccessful login responses.
* Successfully tested login through the actual website.
* Confirmed that valid login credentials return a successful login response.
* Confirmed that incorrect login credentials are rejected.

## **14. User Profile Management**

* Implemented a `GET /profile/<user_id>` endpoint to retrieve user profile information.
* Implemented a `PUT /profile/<user_id>` endpoint to update user profile information.
* Added validation for required profile fields.
* Added email format validation.
* Added Kenyan phone number format validation.
* Added checks to prevent duplicate email addresses.
* Added checks to prevent duplicate phone numbers.
* Confirmed that passwords are not returned when retrieving profile information.
* Successfully tested profile retrieval using Postman.
* Successfully tested profile updates using Postman.

## **15. Produce Listing**

* Implemented a backend endpoint for farmers to list produce.
* Added validation to ensure only valid farmer accounts can create produce listings.
* Added validation for required product information, quantity, price, location, and farmer ID.
* Added support for uploading produce images.
* Added unique filenames for uploaded images to prevent filename conflicts.
* Stored produce listing information in the database.
* Successfully tested produce listing through Postman.
* Successfully tested produce image upload.

## **16. Home Page and Navigation**

* Implemented a public Home page describing the Agricultural Marketplace.
* Added Home, About, and How It Works sections.
* Added navigation links for Login and Register.
* Added Login and Register navigation back to the Home page.
* Added a Farmer Dashboard with marketplace management options.
* Added navigation from the Farmer Dashboard to the List Produce page.
* Added a Back link from the List Produce page to the Farmer Dashboard.
* Added a Logout link to the Farmer Dashboard that returns the user to the Home page.
* Separated page-specific CSS files for the React pages.

**Completed:** Backend registration, input validation, password-strength validation, database verification, React registration interface, frontend-to-backend registration integration, backend login, login API testing, React login interface, frontend-to-backend login integration, user profile management, produce listing functionality, produce image upload, Home page, Farmer Dashboard, and basic page navigation.

**Next development task:** Implement produce listing management.