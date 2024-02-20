// 8.3 Create a class named StudentsController that will be
// used to manage the students resource

import readDatabase from '../utils';

// StudentsController class to handle student-related operations.
class StudentsController {
  // Retrieves and sends a list of all students along with their counts in CS and SWE majors.
  static getAllStudents(req, res) {
    // Read the database using the provided path in process.argv[2].
    readDatabase(process.argv[2])
      .then((data) => {
        // Upon successful database read, send a 200 response with the student counts and names in CS and SWE.
        res.status(200).send(`This is the list of our students
Number of students in CS: ${data.CS.length}. List: ${data.CS.join(', ')}
Number of students in SWE: ${data.SWE.length}. List: ${data.SWE.join(', ')}`);
      })
      .catch(() => {
        // If there's an error reading the database, send a 500 response.
        res.status(500).send('Cannot load the database');
      });
  }

  // Retrieves and sends a list of all students filtered by a specific major (CS or SWE).
  static getAllStudentsByMajor(req, res) {
    // Read the database using the provided path in process.argv[2].
    readDatabase(process.argv[2])
      .then((data) => {
        // Check the requested major and send a list of students in that major.
        if (req.params.major === 'CS') {
          res.status(200).send(`List: ${data.CS.join(', ')}`);
        } else if (req.params.major === 'SWE') {
          res.status(200).send(`List: ${data.SWE.join(', ')}`);
        } else {
          // If the major is not CS or SWE, send a 500 response indicating the error.
          res.status(500).send('Major parameter must be CS or SWE');
        }
      })
      .catch(() => {
        // If there's an error reading the database, send a 500 response.
        res.status(500).send('Cannot load the database');
      });
  }
}

// Export the StudentsController class for use in other files.
module.exports = StudentsController;
