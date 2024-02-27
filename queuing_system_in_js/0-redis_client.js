// Task 1 - Write a script that connect to redis server runnong on your machine
// It will log to the console when the connection is established

import redis from 'redis';
const client = redis.createClient();

client.on('ready', () => {
    console.log('Redis client connected to the server')
});

client.on('error', (err) => {
    console.log(`Redis client not connected to the server: ${err.message}`)
});
