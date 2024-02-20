const fs = require('fs').promises;

async function countStudents(path) {
  try {
    // Attempt to read the file asynchronously
    const data = await fs.readFile(path, 'utf8');

    // Split the file content by newline and filter out any empty lines
    const lines = data.split('\n').filter(line => line.trim());

    // Check if there's at least one line (excluding the header)
    if (lines.length < 2) {
      throw new Error('No students found in the database');
    }

    // Remove the header row
    const students = lines.slice(1);

    const studentsByField = {};
    let totalStudents = 0;

    students.forEach(student => {
      // Split each line by comma to extract student details
      const [firstName,, , field] = student.split(',');
      // Increment total students count
      totalStudents++;

      // Initialize the field array if it doesn't exist, then push the student's first name
      if (!studentsByField[field]) {
        studentsByField[field] = [];
      }
      studentsByField[field].push(firstName);
    });

    console.log(`Number of students: ${totalStudents}`);
    Object.entries(studentsByField).forEach(([field, names]) => {
      console.log(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
    });

    // Optionally return the results for further processing
    return { totalStudents, studentsByField };
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
