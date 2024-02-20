// Task 5 - create a small HTTP server using the http module
// Import required modules
const http = require('http');
const fs = require('fs');

// Create an HTTP server
const app = http.createServer((req, res) => {
  // Check if the request URL is the root '/'
  if (req.url === '/') {
    // Send a greeting message to the client
    res.write('Hello Holberton School!');
    res.end(); // End the response
  }

  // Check if the request URL is '/students'
  if (req.url === '/students') {
    // Initial message indicating the beginning of the student list
    res.write('This is the list of our students\n');

    // Attempt to read the database file asynchronously
    return new Promise((resolve, reject) => {
      // Obtain the path to the database file from the command line arguments
      const path = process.argv[2];
      // Check if the database path was provided
      if (path === undefined) {
        // If not, reject the promise and send an error message to the client
        reject(new Error('Cannot load the database'));
        res.write('Cannot load the database');
        res.end();
        return;
      }

      // Read the database file content
      fs.readFile(path, 'utf-8', (err, data) => {
        // Handle file reading errors
        if (err) {
          reject(new Error('Cannot load the database'));
          res.write('Cannot load the database');
          res.end();
          return;
        }

        // Split the file content into rows
        const rows = data.split('\n');
        // Calculate the number of students (excluding the header and any empty trailing line)
        const rowCount = rows.length - 2;
        // Output the total number of students
        res.write(`Number of students: ${rowCount}\n`);

        // Initialize counters and lists for students in CS and SWE
        let csStudents = 0;
        const csStudentsList = [];
        let sweStudents = 0;
        const sweStudentsList = [];

        // Iterate over each row to classify students by their field of study
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

        // Output the number of CS students and their names
        res.write(`Number of students in CS: ${csStudents}. List: ${csStudentsList.join(', ')}\n`);
        // Output the number of SWE students and their names
        res.write(`Number of students in SWE: ${sweStudents}. List: ${sweStudentsList.join(', ')}`);
        res.end(); // End the response
        resolve(); // Resolve the promise (though it's not being used for async control here)
      });
    });
  }
});

// Make the server listen on port 1245
app.listen(1245);

// Export the app for potential use in other modules or testing
module.exports = app;
