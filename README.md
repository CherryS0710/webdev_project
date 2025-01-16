The **Bulletin Board** project is a web application designed to manage and display records for different departments. It allows users to add, view, and search for Different department records.
The application features a responsive table with pagination and a modal popup for detailed view of each record.

## Features

- Add new records with fields: `username`, `email`, `topic`, and `details`.
- Display records in a paginated table.
- Search functionality to find specific records.
- Responsive design with hover effects and smooth transitions.

## Technologies Used

- HTML, CSS, and JavaScript for front-end development.
- Node.js and Express.js for back-end development.
- MongoDB Atlas and Mongoose for database management.

## Setup Instructions 

1. .env file(Add to backend folder for full functioning)
- MONGODB_URI=<your_mongodb_connection_string>
- JWT_SECRET=your_secure_secret_key
- BASE_URL=http://localhost:5001

2. Install dependencies:
```bash
npm install
npm start
```

3. Set up the MongoDB database:
- Ensure MongoDB is installed and running.
- Create a new MongoDB database for the project.
