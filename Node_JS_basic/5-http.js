// Task 5 - create a small HTTP server using the http module

const http = require('http');
const countStudents = require('./3-read_file_async');

const databasePath = process.argv[2]; // Improve readability

const app = http.createServer(async (req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    try {
      const responseText = await countStudents(databasePath);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(`This is the list of our students\n${responseText}`);
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain' }); // Indicate server error
      res.end(`This is the list of our students\n${error.message}`);
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' }); // Handle not found
    res.end();
  }
});

app.listen(1245);

module.exports = app;
