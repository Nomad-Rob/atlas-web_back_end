// Task 6 - Creating a job creator
import kue from 'kue';

const queue = kue.createQueue();

// jobData is an object that contains the phone number and message
const jobData = {
  phoneNumber: 1234567890,
  message: 'Testing out our job queue system',
}

const job = queue.create('push_notification_code', jobData).save((err) => {
  if (!err) console.log(`Notification job created: ${job.id}`);
});

job.on('complete', () => {
  console.log('Notification job completed');
});

job.on('failed', () => {
  console.log('Notification job failed');
});
