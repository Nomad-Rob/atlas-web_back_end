// 8.5 Creating a small expresss server

import express from 'express';

// Import the router module that defines the application's routes.
// This modular approach keeps routing logic separate and organized.
const routes = require('./routes/index');

// Initialize a new Express application. This instance will be used
// to set up middleware and routes, and to listen for incoming requests.
const app = express();

// Use the routes defined in the 'routes' module. The 'app.use' method
// registers the imported routes as middleware, enabling the app to respond
// to requests matching those routes.
app.use(routes);

// Start the application server on port 1245, listening for incoming requests.
// This port number can be changed to any other available port as needed.
app.listen(1245);

// Export the app instance for potential use in other files, such as for testing.
// This makes it easier to import the app in test suites or when integrating
// with other services.
export default app;
