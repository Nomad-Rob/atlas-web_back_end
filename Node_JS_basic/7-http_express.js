// Task 7 - Create a small express app that is more complex

// Import the necessary modules
const express = require('express');
const fs = require('fs');

// Initialize an Express application
const app = express();

// Define a GET route for the root URL ('/')
app.get('/', (req, res) => {
  // Send a greeting message as the response
  res.send('Hello Holberton School!');
});

// Define a GET route for '/students' URL
app.get('/students', (req, res) => {
  // Prepare the initial part of the response message
  let response = 'This is the list of our students\n';

  // Return a new promise to handle asynchronous file reading
  return new Promise((resolve, reject) => {
    // Get the path of the database file from command line arguments
    const path = process.argv[2];
    // Check if the database file path is provided
    if (path === undefined) {
      // If not, reject the promise and send an error response
      reject(new Error('Cannot load the database'));
      res.status(500).send('This is the list of our students\nCannot load the database');
      return;
    }

    // Read the content of the database file asynchronously
    fs.readFile(path, 'utf-8', (err, data) => {
      // Check if there was an error reading the file
      if (err) {
        // If so, reject the promise and send an error response
        reject(new Error('Cannot load the database'));
        res.status(500).send('This is the list of our students\nCannot load the database');
        return;
      }

      // Split the file content by new lines to process each student
      const rows = data.split('\n');
      // Calculate the total number of students (excluding the header and any trailing empty line)
      const rowCount = rows.length - 2;
      // Append the total number of students to the response
      response += `Number of students: ${rowCount}\n`;

      // Initialize counters and lists for students in different majors
      let csStudents = 0;
      const csStudentsList = [];
      let sweStudents = 0;
      const sweStudentsList = [];

      // Iterate over each row to count and list students by major
      for (const row of rows) {
        const fields = row.split(',');
        if (fields[3] === 'CS') {
          csStudents += 1;
          csStudentsList.push(fields[0]); // Add the student's name to the CS list
        } else if (fields[3] === 'SWE') {
          sweStudents += 1;
          sweStudentsList.push(fields[0]); // Add the student's name to the SWE list
        }
      }

      // Append the details of CS and SWE students to the response
      response += `Number of students in CS: ${csStudents}. List: ${csStudentsList.join(', ')}\n`;
      response += `Number of students in SWE: ${sweStudents}. List: ${sweStudentsList.join(', ')}`;
      // Send the final response
      res.send(response);
      // Resolve the promise (though it's mainly for the sake of the promise structure here)
      resolve();
    });
  });
});

// Start listening on port 1245
app.listen(1245);

// Export the app for potential use elsewhere or testing
module.exports = app;
