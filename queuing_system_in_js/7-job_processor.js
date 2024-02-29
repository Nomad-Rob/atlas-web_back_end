// Task 9 - Track progress and errors with Kue: create a job processor

import kue from 'kue';

const queue = kue.createQueue();

// Array containing blacklisted phone numbers
const blacklistedNumbers = ['4153518780', '4153518781'];

// Function to send notifications
function sendNotification(phoneNumber, message, job, done) {
  job.progress(0, 100);
  
  if (blacklistedNumbers.includes(phoneNumber)) {
    return done(new Error(`Phone number ${phoneNumber} is blacklisted`));
  }

  job.progress(50, 100);
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
  
  // Simulate completion of job
  done();
}

// Queue to process 'push_notification_code_2' jobs, 2 at a time
queue.process('push_notification_code_2', 2, (job, done) => {
  const { phoneNumber, message } = job.data;
  sendNotification(phoneNumber, message, job, done);
});
