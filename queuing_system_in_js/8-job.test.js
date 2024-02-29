// Task 11 - Writing the test for job creation

import chai from 'chai';
import kue from 'kue';
import createPushNotificationsJobs from './8-job.js';

const expect = chai.expect;

describe('createPushNotificationsJobs', () => {
  let queue;

  before(() => {
    // Enter the test mode
    queue = kue.createQueue();
    queue.testMode.enter();
  });

  after(() => {
    // Clear the test mode
    queue.testMode.clear();
    queue.testMode.exit();
  });

  it('should display an error message if jobs is not an array', () => {
    expect(() => createPushNotificationsJobs({}, queue)).to.throw(Error, 'Jobs is not an array');
  });

  it('should create two new jobs to the queue', () => {
    const jobs = [
      { phoneNumber: '123', message: 'Test message one' },
      { phoneNumber: '456', message: 'Test message two' }
    ];

    createPushNotificationsJobs(jobs, queue);

    expect(queue.testMode.jobs.length).to.equal(2);
    expect(queue.testMode.jobs[0].type).to.equal('push_notification_code_3');
    expect(queue.testMode.jobs[0].data).to.deep.equal(jobs[0]);
    expect(queue.testMode.jobs[1].data).to.deep.equal(jobs[1]);

    queue.testMode.clear();
  });
});
