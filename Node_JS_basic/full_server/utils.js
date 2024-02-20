// Task 8.1 create a function named readDatabase

const fs = require('fs').promises;

/**
 * Asynchronously reads and processes a database file to organize students by their field of study.
 *
 * @param {string} filePath - The path to the file containing the database of students.
 * @returns {Promise<Object>}
 */
async function readDatabase(filePath) {
  try {
    // Read the file at the given filePath with UTF-8 encoding.
    const data = await fs.readFile(filePath, 'utf8');
    // Trim whitespace from the data and split it into lines.
    const lines = data.trim().split('\n');
    // Ignore the header line and gather the student data lines.
    const students = lines.slice(1);

    // Initialize an object to hold students categorized by their field of study.
    const studentsByField = {};

    // Process each student line to organize by field.
    students.forEach((studentLine) => {
      // Destructure the student line to extract the first name and field of study.
      // Assuming the format is: firstName, lastName, age, field
      const [firstName, , , field] = studentLine.split(',');
      if (field) {
        // If the field does not exist in the object, initialize it.
        if (!studentsByField[field]) {
          studentsByField[field] = [];
        }
        // Add the student's first name to the appropriate field category.
        studentsByField[field].push(firstName);
      }
    });

    // Successfully resolve the promise with the categorized students.
    return Promise.resolve(studentsByField);
  } catch (error) {
    // In case of any errors, reject the promise with a custom error message.
    return Promise.reject(new Error('Cannot load the database'));
  }
}

// Export the readDatabase function for use in other parts of the application.
export default readDatabase;
