// Task 3 - Using db, create function countStudents in 3-read_file_async.js

const fs = require('fs').promises;

async function countStudents(path) {
  try {
    const data = await fs.readFile(path, 'utf8');
    // Split the data into lines and filter out any empty lines
    // Then, slice from the 1st index to skip the header
    const lines = data.split('\n').filter((line) => line.trim()).slice(1);

    let totalStudents = 0;
    const studentsByField = {};

    for (const student of lines) { // Use filtered 'lines' directly
      const fields = student.split(',');
      if (fields.length === 4) {
        const field = fields[3];
        totalStudents += 1;
        if (!studentsByField[field]) {
          studentsByField[field] = [];
        }
        studentsByField[field].push(fields[0]);
      }
    }

    console.log(`Number of students: ${totalStudents}`);
    for (const field in studentsByField) {
      if (Object.prototype.hasOwnProperty.call(studentsByField, field)) {
        console.log(`Number of students in ${field}: ${studentsByField[field].length}. List: ${studentsByField[field].join(', ')}`);
      }
    }

    return {
      totalStudents,
      studentsByField,
    };
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
