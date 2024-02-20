// Task 7 - Create a small express app that is more complex

const express = require('express');
const fs = require('fs');

const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to Holberton School!');
});

app.get('/students', (req, res) => {
  const databasePath = process.argv[2];
  if (!databasePath) {
    res.status(500).send('Welcome to the student list\nUnable to load the database');
    return;
  }

  fs.readFile(databasePath, 'utf-8', (error, content) => {
    if (error) {
      res.status(500).send('Welcome to the student list\nUnable to access the database');
      return;
    }

    const students = content.trim().split('\n').slice(1); // Remove header and trim
    const summary = {
      CS: [],
      SWE: [],
    };

    students.forEach((student) => {
      const [name, , , major] = student.split(',');
      if (summary[major]) summary[major].push(name);
    });

    let response = 'Welcome to the student list\n';
    response += `Total students: ${students.length}\n`;
    response += `Computer Science: ${summary.CS.length}. List: ${summary.CS.join(', ')}\n`;
    response += `Software Engineering: ${summary.SWE.length}. List: ${summary.SWE.join(', ')}`;

    res.send(response);
  });
});

app.listen(1245, () => console.log('Server is running on port 1245'));

module.exports = app;
