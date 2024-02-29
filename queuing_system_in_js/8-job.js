// Task 10 - Writing the job creation function

import kue from 'kue';

const queue = kue.createQueue();

// Function to create a job
function createPushNotificationsJobs(jobs, queue) {
  // Check if jobs is not an array
  if (!Array.isArray(jobs)) {
    throw new Error('Jobs is not an array');
  }

  jobs.forEach((jobData) => {
    // Create a job in the queue 'push_notification_code_3' with jobData
    const job = queue.create('push_notification_code_3', jobData)
      .save((err) => {
        if (!err) console.log(`Notification job created: ${job.id}`);
      })
      .on('complete', () => {
        console.log(`Notification job ${job.id} completed`);
      })
      .on('failed', (errorMessage) => {
        console.log(`Notification job ${job.id} failed: ${errorMessage}`);
      })
      .on('progress', (progress) => {
        console.log(`Notification job ${job.id} ${progress}% complete`);
      });
  });
}

export default createPushNotificationsJobs;
