// Task 5 - Node Redis Client Publisher and Subscriber

import redis from 'redis';

const client = redis.createClient();

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err.message}`);
});

// Setting up subscribe to a channel
client.subscribe('holberton school channel');

// Listening for messages
client.on('message', (channel, message) => {
  if (channel === 'holberton school channel') {
    console.log(message);
  }
  
  // Unsubscribe from the channel when kill server
  if (message === 'KILL_SERVER') {
    client.unsubscribe();
    client.quit();
  }
});
