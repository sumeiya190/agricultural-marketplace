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
* Created a React profile interface to view and edit first name, last name, email, and phone number.
* Added styling for the profile page.
* Connected the profile form to the Flask `PUT /profile/<user_id>` endpoint.
* Successfully tested profile updates through the website.
* Verified that updated profile information persists after refreshing and logging in again.
* Installed and configured Flask-JWT-Extended for token-based authentication.
* Updated the login endpoint to generate and return a JWT access token after successful authentication.
* Protected profile retrieval and update endpoints with JWT authentication.
* Added ownership checks to ensure users can only view and update their own profiles.
* Successfully tested profile updates using a valid access token.
* Confirmed that attempts to update or view another user's profile are rejected with a `403 Forbidden` response.

## **15. Produce Listing and Image Upload**

* Implemented a backend endpoint for farmers to list produce.
* Added validation to ensure only valid farmer accounts can create produce listings.
* Added validation for required product information, quantity, price, location, and farmer ID.
* Added support for uploading produce images.
* Added unique filenames for uploaded images to prevent filename conflicts.
* Stored produce listing information in the SQLite database.
* Successfully tested produce listing through Postman.
* Successfully tested produce image upload through Postman.
* Connected the React List Produce form to the Flask backend.
* Successfully submitted produce listings through the actual website.
* Confirmed that submitted listings are saved and can be retrieved from the database.

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

## **17. Produce Listing Management**

* Implemented a backend endpoint to retrieve all produce listings belonging to a farmer.
* Created the React Manage Listings page.
* Connected the Manage Listings page to the Flask backend.
* Successfully displayed saved produce listings on the website.
* Implemented a backend endpoint to update existing produce listings.
* Added an Edit form to the Manage Listings page.
* Connected the Edit form to the backend update endpoint.
* Successfully tested editing a produce listing through the website.
* Implemented a backend endpoint to delete produce listings.
* Added a Remove button and confirmation prompt to the Manage Listings page.
* Connected the Remove button to the backend delete endpoint.
* Successfully tested deleting a produce listing through the website.
* Added success and error messages for listing operations.

## **18. Produce Image Display**

* Added an image-upload field to the React List Produce form.
* Configured the Flask backend to serve uploaded images.
* Implemented image filename storage in the Product database model.
* Displayed uploaded produce images on the Manage Listings page.
* Confirmed that uploaded images load correctly in the browser.

## **19. Order Management**

* Created an `Order` database model to store order information, including order date, quantity, total amount, status, buyer ID, and product ID.
* Created the orders table in the SQLite database.
* Implemented a backend endpoint to allow buyers to place orders.
* Added validation for buyer ID, product ID, and order quantity.
* Added checks to ensure that the buyer has a valid Buyer account.
* Added checks to ensure that the requested product exists and is available.
* Added validation to prevent orders exceeding the available product quantity.
* Implemented automatic calculation of the order's total amount.
* Set new orders to a default status of Pending.
* Successfully tested placing orders through Postman.
* Implemented a backend endpoint for farmers to retrieve orders associated with their produce listings.
* Successfully tested retrieving farmer orders through Postman.
* Implemented a backend endpoint for farmers to confirm or reject pending orders.
* Added validation to ensure that only pending orders can be updated.
* Added checks to ensure that an order belongs to the farmer attempting to update it.
* Successfully tested confirming and rejecting orders through the backend.
* Created the React View Orders page.
* Connected the View Orders page to the Flask backend.
* Displayed order details, including order ID, product name, buyer ID, quantity, total amount, and status.
* Added Confirm and Reject buttons for pending orders.
* Connected the Confirm and Reject buttons to the backend order-status update endpoint.
* Displayed updated order statuses on the website after successful updates.
* Tested viewing orders and updating order statuses through the frontend.

## **20. Current Development Status**

| Feature | Status |
|---|---|
| User registration and validation | Implemented and tested |
| User login | Implemented and tested |
| User profile retrieval and updates | Implemented and tested through the website and Postman; JWT authentication and ownership checks verified |
| Home page and basic navigation | Implemented |
| Farmer Dashboard | Implemented |
| List Produce form | Implemented and tested |
| Manage Listings | Implemented and tested |
| Edit and delete produce listings | Implemented and tested |
| Upload and display produce images | Implemented and tested |
| Order placement backend | Implemented and tested through Postman |
| Farmer order retrieval backend | Implemented and tested through Postman |
| Confirm and Reject order backend | Implemented and tested |
| View Orders frontend | Implemented and tested |
| Buyer Dashboard | Not yet implemented |
| Buyer-facing produce search | Not yet implemented |
| Search by location and radius | Not yet implemented |
| Calculate distance to nearby farmers | Not yet implemented |
| Display nearby farmers | Not yet implemented |
| Buyer-facing order interface | Not yet implemented |
| Farmer analytics | Not yet implemented |

## **21. Next Development Task**

**Next task: Implement and strengthen buyer-facing marketplace features.**

Planned tasks:

1. Implement the Buyer Dashboard.
2. Develop buyer-facing produce search and browsing.
3. Implement search by location and radius.
4. Calculate distances to nearby farmers.
5. Display nearby farmers and their produce.
6. Implement a buyer-facing order interface.

**Important development note:** The produce listing update and delete endpoints should verify that the authenticated farmer owns the listing. Other protected endpoints should also enforce authentication and ownership checks where appropriate.