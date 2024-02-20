// Task 7 - Create a small express app that is more complex

const express = require('express');
const fs = require('fs');

// Create server and listen on port 1245
const app = express();

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  let response = ('This is the list of our students\n');

  return new Promise((resolve, reject) => {
    const path = process.argv[2];
    if (path === undefined) {
      reject(new Error('Cannot load the database'));
      res.status(500).send('This is the list of our students\nCannot load the database');
      return;
    }

    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        res.status(500).send('This is the list of our students\nCannot load the database');
        return;
      }

      // Log the number of students
      const rows = data.split('\n');
      const rowCount = rows.length - 2;
      response += (`Number of students: ${rowCount}\n`);

      // Log number of students in cs
      let csStudents = 0;
      const csStudentsList = [];
      for (const row of rows) {
        const fields = row.split(',');
        if (fields[3] === 'CS') {
          csStudents += 1;
          const csStudentsName = fields[0];
          csStudentsList.push(csStudentsName);
        }
      }
      response += (`Number of students in CS: ${csStudents}. List: ${csStudentsList.join(', ')}\n`);

      // Log number of students in swe
      let sweStudents = 0;
      const sweStudentsList = [];
      for (const row of rows) {
        const fields = row.split(',');
        if (fields[3] === 'SWE') {
          sweStudents += 1;
          const sweStudentsName = fields[0];
          sweStudentsList.push(sweStudentsName);
        }
      }
      response += (`Number of students in SWE: ${sweStudents}. List: ${sweStudentsList.join(', ')}`);
      res.send(response);
      resolve();
    });
  });
});

app.listen(1245);

module.exports = app;
