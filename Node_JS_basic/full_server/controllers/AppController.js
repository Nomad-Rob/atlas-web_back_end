// 8.2 Created a class named AppController that will be used to manage the server

class AppController {
  static getHomepage(req, res) {
    res.status(200).send('Hello Holberton School!');
  }
}

module.exports = AppController;
