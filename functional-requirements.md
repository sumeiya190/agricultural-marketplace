## Functional Requirements

The Agricultural Marketplace shall provide the following functional requirements:

### FR1: User Registration

The system shall allow users to create an account by providing their first name, last name, email address, phone number, password, and user role.

### FR2: User Login

The system shall allow registered users to log in using their email address and password.

### FR3: User Profile Management

The system shall allow registered users to view and update their profile information.

### FR4: Role Management

The system shall distinguish between Farmer and Buyer accounts and provide functionality appropriate to each role.

### FR5: List Produce

The system shall allow farmers to create produce listings by providing the produce name, description, quantity, price, and location.

### FR6: Manage Produce Listings

The system shall allow farmers to view, edit, and remove their produce listings.

### FR7: View Orders

The system shall allow farmers to view orders placed for their produce.

### FR8: Update Order Status

The system shall allow farmers to update the status of orders, including confirming, rejecting, or completing an order.

### FR9: View Analytics

The system shall provide farmers with marketplace analytics, including total listings, total orders, popular produce, and average produce prices.

### FR10: Search for Produce

The system shall allow buyers to search for a specific type of produce.

### FR11: Specify Location

The system shall allow buyers to provide or select their location when searching for produce.

### FR12: Specify Search Radius

The system shall allow buyers to specify the distance or search radius within which they want to find farmers.

### FR13: Find Nearby Farmers

The system shall identify farmers offering the requested produce within the buyer's specified search radius.

### FR14: Calculate Distance

The system shall obtain location coordinates and calculate the distance between the buyer and relevant farmers.

### FR15: Display Nearby Produce

The system shall display matching farmers and relevant produce information, including produce name, price, available quantity, location, and distance from the buyer.

### FR16: Handle No Search Results

The system shall inform the buyer when no matching farmers are found within the selected radius and allow the buyer to perform another search using a wider radius or a different location.

### FR17: View Produce Details

The system shall allow buyers to view detailed information about a selected produce listing.

### FR18: Place an Order

The system shall allow buyers to select a produce listing, specify the required quantity, and place an order.

### FR19: View Buyer Orders

The system shall allow buyers to view their submitted orders and their current order statuses.

## **Future UI Improvements and Design Tasks**

### **1. Farmer Dashboard Layout**
- [ ] Display the welcome message on the left side of the top row.
- [ ] Display the Logout button on the right side of the same row.
- [ ] Center the “Farmer Dashboard” heading.
- [ ] Position the dashboard management options below the heading.
- [ ] Improve spacing, sizing, and alignment to make better use of the available screen space.
- [ ] Make the dashboard responsive and visually balanced on expanded and smaller screens.

### **2. Navigation Improvements**
- [ ] Add a consistent navigation bar to the main pages.
- [ ] Allow users to navigate between relevant sections without returning to the dashboard each time.
- [ ] Keep navigation links consistent across the Farmer Dashboard, List Produce, Manage Listings, Orders, and Analytics pages.

### **3. Visual Design Polish**
- [ ] Improve the overall appearance of the dashboard and management pages.
- [ ] Standardize button sizes, headings, spacing, and form layouts.
- [ ] Review whether relevant produce images or other visual elements would improve the interface without making it cluttered.

### **4. Profile Update Interface**
- [ ] Add a frontend interface that allows users to view and update their profile information.
- [ ] Connect the profile update form to the existing profile update API.
- [ ] Allow users to update their own profile details without using Postman or directly accessing the backend.
- [ ] Test the complete profile update process from the frontend to the database.