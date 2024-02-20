// 8.4 Write the routes
// Import controllers to handle requests for different routes.
import AppController from '../controllers/AppController';
import StudentsController from '../controllers/StudentsController';

// Import the Express framework to create a router for handling HTTP requests.
const express = require('express');

// Create a new router instance to define routes for the application.
const router = express.Router();

// Define a route for the homepage. When a GET request is made to the root path,
// the getHomepage method of AppController is called to handle the request.
router.get('/', AppController.getHomepage);

// Define a route for fetching all students. When a GET request is made to '/students',
// the getAllStudents method of StudentsController is called to return all students' data.
router.get('/students', StudentsController.getAllStudents);

// Define a route for fetching students by their major. When a GET request is made to '/students/:major',
// the getAllStudentsByMajor method of StudentsController is used.
// This allows for filtering students based on the major specified in the URL parameter.
router.get('/students/:major', StudentsController.getAllStudentsByMajor);

// Export the router to be mounted by the main application. This modular approach allows for
// cleaner management of routes and separates the routing logic from the rest of the application.
module.exports = router;
