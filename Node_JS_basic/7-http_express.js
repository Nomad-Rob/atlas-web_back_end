// Task 7 - Create a small express app that is more complex

const express = require('express');
const fs = require('fs');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  const path = process.argv[2];
  if (path === undefined) {
    res.send('Cannot load the database');
    return;
  }

  fs.readFile(path, 'utf-8', (err, data) => {
    if (err) {
      res.send('Cannot load the database');
      return;
    }

    const rows = data.trim().split('\n');
    const students = rows.slice(1);

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

app.get('/students/:major', (req, res) => {
  const path = process.argv[2];
  if (path === undefined) {
    res.send('Cannot load the database');
    return;
  }

  fs.readFile(path, 'utf-8', (err, data) => {
    if (err) {
      res.send('Cannot load the database');
      return;
    }

    const rows = data.trim().split('\n');
    const students = rows.slice(1);

    const studentsList = [];

    students.forEach((row) => {
      const [name, , , field] = row.split(',');
      if (field === req.params.major) studentsList.push(name);
    });

    res.send(`List: ${studentsList.join(', ')}`);
  });
});

app.listen(1245);

module.exports = app;
