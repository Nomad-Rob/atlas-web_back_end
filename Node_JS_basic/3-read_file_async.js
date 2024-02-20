// Task 3 - Using db, create function countStudents in 3-read_file_async.js

const fs = require('fs').promises;

async function countStudents(path) {
  try {
    const data = await fs.readFile(path, 'utf8');
    const lines = data.split('\n');
    const header = lines.slice(1);

    let totalStudents = 0;
    const studentsByField = {};

    for (const student of header) {
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
    console.log(studentsByField);

    return {
      totalStudents,
      studentsByField,
    };
  } catch (error) {
    console.error(error);
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
