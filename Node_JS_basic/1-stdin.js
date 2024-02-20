// Task 1 - Creat a program named 1-stdin.js that exes through command line

console.log("Welcome to Holberton School, what is your name?");

process.stdin.on('data', (data) => {
  process.stdout.write(`Your name is: ${data}`);
});

process.stdin.on('end', () => {
  console.log('This important software is now closing');
});
