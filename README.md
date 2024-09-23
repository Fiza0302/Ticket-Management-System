# Ticket Management System

A simple Ticket Management System built using Node.js, Express.js, MongoDB, and EJS. This application allows users to create, view, update, and delete tickets.

## Features
- Create, view, update, and delete listings (tickets).
- Custom error handling using `ExpressError` and `wrapAsync`.
- Data validation using `Joi`.
- Uses EJS templates for rendering views.

## Technologies Used
- **Node.js**: Backend framework.
- **Express.js**: Web framework for handling routes and requests.
- **MongoDB**: Database to store listing data.
- **EJS**: Templating engine for dynamic views.
- **Joi**: Data validation.
- **Mongoose**: ORM for MongoDB.
- **Method-Override**: To allow PUT and DELETE requests in forms.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/ticket-management.git

cd ticket-management   //Navigate to the project directory:

npm install    //Install the required dependencies:

mongod        //Ensure MongoDB is running and start the server:
nodemon app.js   // to start the server

http://localhost:4040/listing Access the application in your browser:


Project Structure:
.
├── models
│   └── listing.js          # Mongoose schema for listings
├── public
│   └── styles.css          # Static assets (CSS, images, etc.)
├── utils
│   ├── ExpressError.js     # Custom error class
│   └── wrapAsync.js        # Async error handling utility
├── views
│   ├── listings
│   │   ├── index.ejs       # Listing index page
│   │   ├── new.ejs         # New listing form
│   │   ├── show.ejs        # Show listing details
│   │   └── update.ejs      # Edit listing form
│   └── error.ejs           # Error handling page
├── schema.js               # Joi schema for data validation
├── app.js                  # Main server file
└── README.md               # Project documentation

Routes
GET /listing: Displays all listings.
GET /listing/new: Displays form to create a new listing.
POST /listing: Creates a new listing (with validation).
GET /listing/
: Displays a single listing based on ID.
GET /listing/
/edit: Displays form to edit a listing.
PUT /listing/
: Updates a listing based on ID (with validation).
DELETE /listing/
: Deletes a listing.
Error Handling
Custom error pages for handling various errors.
Validation errors are caught and displayed to the user.
All unknown routes return a 404 error.



