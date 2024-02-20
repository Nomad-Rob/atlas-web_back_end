// Task 5 - create a small HTTP server using the http module
// Import required modules
const http = require('http');
const fs = require('fs');

// Create an HTTP server
const app = http.createServer((req, res) => {
  if (req.url === '/') {
    // Send a greeting message to the client
    res.write('Hello Holberton School!');
    res.end();
  } else if (req.url === '/students') {
    // Initial message indicating the beginning of the student list
    res.write('This is the list of our students\n');

    const path = process.argv[2];
    if (path === undefined) {
      // Send an error message to the client if the database path is not provided
      res.write('Cannot load the database');
      res.end();
      return; // Ensure no further processing if path is undefined
    }

    // Read the database file content
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        // Send an error message to the client if reading the file fails
        res.write('Cannot load the database');
        res.end();
        return; // Ensure no further processing if an error occurs
      }

      const rows = data.trim().split('\n'); // Trim to remove any trailing newline and split
      const students = rows.slice(1); // Exclude the header row

      const csStudentsList = []; const
        sweStudentsList = [];

      students.forEach((row) => {
        const [name, , , field] = row.split(',');
        if (field === 'CS') csStudentsList.push(name);
        if (field === 'SWE') sweStudentsList.push(name);
      });

      // Output the number of students, CS students, and their names
      res.write(`Number of students: ${students.length}\n`);
      res.write(`Number of students in CS: ${csStudentsList.length}. List: ${csStudentsList.join(', ')}\n`);
      // Output the number of SWE students and their names
      res.write(`Number of students in SWE: ${sweStudentsList.length}. List: ${sweStudentsList.join(', ')}`);
      res.end(); // End the response
    });
  } else {
    // Handle unknown routes
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Resource not found');
  }
});

// Make the server listen on port 1245
app.listen(1245);

// Export the app for potential use in other modules or testing
module.exports = app;
