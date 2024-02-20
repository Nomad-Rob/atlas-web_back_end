// Task 5 - create a small HTTP server using the http module

const http = require('http');
const fs = require('fs');

const app = http.createServer((req, res) => {
  if (req.url === '/') {
    res.write('Hello Holberton School!');
    res.end();
  } else if (req.url === '/students') {
    const path = process.argv[2];
    if (!path) {
      res.write('Cannot load the database');
      res.end();
      return;
    }

    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        res.write('Cannot load the database');
        res.end();
        return;
      }

      const rows = data.split('\n').filter((row) => row); // Remove empty lines
      // Assuming the first row is headers and should be skipped
      const students = rows.slice(1);
      const csStudentsList = [];
      const sweStudentsList = [];

      students.forEach((row) => {
        const [name, , , field] = row.split(',');
        if (field === 'CS') csStudentsList.push(name);
        if (field === 'SWE') sweStudentsList.push(name);
      });

      const responseText = `This is the list of our students\nNumber of students: ${students.length}\n`
        + `Number of students in CS: ${csStudentsList.length}. List: ${csStudentsList.join(', ')}\n`
        + `Number of students in SWE: ${sweStudentsList.length}. List: ${sweStudentsList.join(', ')}`;
      res.write(responseText);
      res.end();
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

app.listen(1245);
module.exports = app;
