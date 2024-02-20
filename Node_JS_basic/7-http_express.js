// Task 7 - Create a small express app that is more complex

const express = require('express');
const fs = require('fs');

const app = express();

// Root endpoint sends a greeting message
app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

// Endpoint to list all students from the database
app.get('/students', (req, res) => {
  const path = process.argv[2];
  if (path === undefined) {
    // Respond with 500 status code if the database path is not provided
    res.status(500).send('Cannot load the database');
    return;
  }

  fs.readFile(path, 'utf-8', (err, data) => {
    if (err) {
      // Respond with 500 status code if there is an error reading the file
      res.status(500).send('Cannot load the database');
      return;
    }

    const rows = data.trim().split('\n');
    const students = rows.slice(1); // Exclude the header row

    const csStudentsList = [];
    const sweStudentsList = [];

    students.forEach((row) => {
      const [name, , , field] = row.split(',');
      if (field === 'CS') csStudentsList.push(name);
      if (field === 'SWE') sweStudentsList.push(name);
    });

    res.send(`Number of students: ${students.length}\nNumber of students in CS: ${csStudentsList.length}. List: ${csStudentsList.join(', ')}\nNumber of students in SWE: ${sweStudentsList.length}. List: ${sweStudentsList.join(', ')}`);
  });
});

// Endpoint to list students from a specific major
app.get('/students/:major', (req, res) => {
  const path = process.argv[2];
  if (path === undefined) {
    // Respond with 500 status code if the database path is not provided
    res.status(500).send('Cannot load the database');
    return;
  }

  fs.readFile(path, 'utf-8', (err, data) => {
    if (err) {
      // Respond with 500 status code if there is an error reading the file
      res.status(500).send('Cannot load the database');
      return;
    }

    const rows = data.trim().split('\n');
    const students = rows.slice(1); // Exclude the header row

    const major = req.params.major.toUpperCase();
    const studentsList = students.filter((row) => {
      const [, , , field] = row.split(',');
      return field.toUpperCase() === major;
    }).map((row) => row.split(',')[0]);

    if (studentsList.length > 0) {
      res.send(`List: ${studentsList.join(', ')}`);
    } else {
      // Respond with 404 status code if no students found for the major
      res.status(404).send('No students found for the given major');
    }
  });
});

// Start the server on port 1245
app.listen(1245);

module.exports = app;
