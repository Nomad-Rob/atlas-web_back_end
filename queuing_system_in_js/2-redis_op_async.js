// Task 3 - use prmisify to avoid callback hell

import redis from 'redis';
import { promisify } from 'util';

const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);

client.on('ready', () => {
    console.log('Redis client connected to the server')
});

client.on('error', (err) => {
    console.log(`Redis client not connected to the server: ${err.message}`)
});

client.on('ready', () => {
  console.log('Redis client connected to the server')
});

client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err.message}`)
});

function setNewSchool(schoolName, value) {
  client.set(schoolName, value, redis.print);
}

const displaySchoolValue = async (schoolName) => {
  const value = await getAsync(schoolName);
  console.log(value);
}

// Using functions
displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
