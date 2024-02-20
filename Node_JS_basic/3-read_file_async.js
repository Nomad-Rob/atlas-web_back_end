// Task 3 - Using db, create function countStudents in 3-read_file_async.js

const fs = require('fs').promises;

async function countStudents(path) {
  try {
    const data = await fs.readFile(path, 'utf8');
    const students = data.split('\n').slice(1); // Directly omit header
    const studentsByField = {};

    students.forEach((student) => {
      const [firstName,, , field] = student.split(',');
      if (field) { // Ensure field is not undefined due to empty lines or malformed data
        studentsByField[field] = studentsByField[field] || [];
        studentsByField[field].push(firstName);
      }
    });

    const totalStudents = students.length;
    console.log(`Number of students: ${totalStudents}`);

    Object.entries(studentsByField).forEach(([field, names]) => {
      console.log(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
    });

    return { totalStudents, studentsByField };
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
