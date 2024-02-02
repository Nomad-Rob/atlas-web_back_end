## Resources :books:
Read or watch:
* [Flask-Babel](https://python-babel.github.io/flask-babel/)
* [Flask i18n tutorial](https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-xiii-i18n-and-l10n)
* [pytz](https://sourceforge.net/projects/pytz/)

---

## Learning Objectives :bulb:

- Learn how to parametrize Flask templates to display different languages
- Learn how to infer the correct locale based on URL parameters, user settings or request headers
- Learn how to localize timestamps

---

## Requirements :heavy_check_mark::clipboard:
### Python Scripts
- All your files will be interpreted/compiled on Ubuntu 18.04 LTS using python3 (version 3.7)
- All your files should end with a new line
- A `README.md` file, at the root of the folder of the project, is mandatory
- Your code should use the pycodestyle style (version 2.5)
- The first line of all your files should be exactly `#!/usr/bin/env python3`
- All your `*.py` files should be executable
- All your modules should have a documentation (`python3 -c 'print(__import__("my_module").__doc__)'`)
- All your classes should have a documentation (`python3 -c 'print(__import__("my_module").MyClass.__doc__)'`)
- All your functions and methods should have a documentation (`python3 -c 'print(__import__("my_module").my_function.__doc__)' and python3 -c 'print(__import__("my_module").MyClass.my_function.__doc__)'`)
- A documentation is not a simple word, it’s a real sentence explaining what’s the purpose of the module, class or method (the length of it will be verified)
- All your functions and coroutines must be type-annotated.

---

## Tasks :white_check_mark::memo:

### [0. Basic Flask app](./0-app.py)
First you will setup a basic Flask app in `0-app.py`. Create a single / route and an `index.html` template that simply outputs “Welcome to Holberton” as page title (`<title>`) and “Hello world” as header (`<h1>`).


### [1. Basic Babel setup](./1-app.py)
Install the Babel Flask extension:
```sh
$ pip3 install flask_babel
```
Then instantiate the `Babel` object in your app. Store it in a module-level variable named `babel`.

In order to configure available languages in our app, you will create a `Config` class that has a `LANGUAGES` class attribute equal to `["en", "fr"]`.

Use `Config` to set Babel’s default locale (`"en"`) and timezone (`"UTC"`).

Use that class as config for your Flask app.


### [2. Get locale from request](./2-app.py)
Create a `get_locale` function with the `babel.localeselector` decorator. Use `request.accept_languages` to determine the best match with our supported languages.


### [3. Parametrize templates](./3-app.py)
Use the `_` or `gettext` function to parametrize your templates. Use the message IDs `home_title` and `home_header`.

Create a `babel.cfg` file containing
```sh
[python: **.py]
[jinja2: **/templates/**.html]
extensions=jinja2.ext.autoescape,jinja2.ext.with_
```
Then initialize your translations with
```sh
$ pybabel extract -F babel.cfg -o messages.pot .
```
and your two dictionaries with
```sh
$ pybabel init -i messages.pot -d translations -l en
$ pybabel init -i messages.pot -d translations -l fr
```
Then edit files `translations/[en|fr]/LC_MESSAGES/messages.po` to provide the correct value for each message ID for each language. Use the following translations:
<table>
  <tbody>
    <tr>
      <th>msgid</th>
      <th>English</th>
      <th>French</th>
    </tr>
    <tr>
      <td>
        <code>home_title</code>
      </td>
      <td>
        <code>"Welcome to Holberton"</code>
      </td>
      <td>
        <code>"Bienvenue chez Holberton"</code>
      </td>
    </tr>
    <tr>
      <td>
        <code>home_header</code>
      </td>
      <td>
        <code>"Hello World"</code>
      </td>
      <td>
        <code>"Bonjour monde!"</code>
      </td>
    </tr>
  </tbody>
</table>

Then compile your dictionaries with
```sh
$ pybabel compile -d translations
```
Reload the home page of your app and make sure that the correct messages show up.


### [4. Force locale with URL parameter](./4-app.py)
In this task, you will implement a way to force a particular locale by passing the `locale=fr` parameter to your app’s URLs.

In your `get_locale` function, detect if the incoming request contains `locale` argument and ifs value is a supported locale, return it. If not or if the parameter is not present, resort to the previous default behavior.

Now you should be able to test different translations by visiting `http://127.0.0.1:5000?locale=[fr|en]`.

**Visiting `http://127.0.0.1:5000/?locale=fr` should display this level 1 heading:**
![image](https://github.com/FosterClark48/holbertonschool-web_back_end/assets/105602291/8b0714af-3aa0-457f-8e6f-66802b52f516)


### [5. Mock logging in](./5-app.py)
Creating a user login system is outside the scope of this project. To emulate a similar behavior, copy the following user table in 5-app.py.
```sh
users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}
```
This will mock a database user table. Logging in will be mocked by passing `login_as` URL parameter containing the user ID to log in as.

Define a `get_user` function that returns a user dictionary or `None` if the ID cannot be found or if `login_as` was not passed.

Define a `before_request` function and use the `app.before_request` decorator to make it be executed before all other functions. `before_request` should use `get_user` to find a user if any, and set it as a global on `flask.g.user`.

In your HTML template, if a user is logged in, in a paragraph tag, display a welcome message otherwise display a default message as shown in the table below.
<table>
  <tbody>
    <tr>
      <th>msgid</th>
      <th>English</th>
      <th>French</th>
    </tr>
    <tr>
      <td>
        <code>logged_in_as</code>
      </td>
      <td>
        <code>"You are logged in as %(username)s."</code>
      </td>
      <td>
        <code>"Vous êtes connecté en tant que %(username)s."</code>
      </td>
    </tr>
    <tr>
      <td>
        <code>not_logged_in</code>
      </td>
      <td>
        <code>"You are not logged in."</code>
      </td>
      <td>
        <code>"Vous n'êtes pas connecté."</code>
      </td>
    </tr>
  </tbody>
</table>

**Visiting `http://127.0.0.1:5000/` in your browser should display this:**

![image](https://github.com/FosterClark48/holbertonschool-web_back_end/assets/105602291/00ec3110-2c14-4c8f-9849-5267fd074d6c)

**Visiting `http://127.0.0.1:5000/?login_as=2` in your browser should display this:**
![image](https://github.com/FosterClark48/holbertonschool-web_back_end/assets/105602291/4e884474-20a4-46a1-b0ab-e1960eb08185)


### [6. Use user locale](./6-app.py)
Change your `get_locale` function to use a user’s preferred local if it is supported.

The order of priority should be

  1. Locale from URL parameters
  2. Locale from user settings
  3. Locale from request header
  4. Default locale

Test by logging in as different users

![image](https://github.com/FosterClark48/holbertonschool-web_back_end/assets/105602291/f56240ef-08a0-4b31-b26f-a208a0132f33)


### [7. Infer appropriate time zone](./7-app.py)
Define a `get_timezone` function and use the `babel.timezoneselector` decorator.

The logic should be the same as `get_locale`:

  1. Find `timezone` parameter in URL parameters
  2. Find time zone from user settings
  3. Default to UTC

Before returning a URL-provided or user time zone, you must validate that it is a valid time zone. To that, use `pytz.timezone` and catch the `pytz.exceptions.UnknownTimeZoneError` exception.
