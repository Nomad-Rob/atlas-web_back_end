#!/usr/bin/env python3

"""Task 6"""
from flask import Flask, render_template, request, g
from flask_babel import Babel, _


app = Flask(__name__)
babel = Babel(app)


class Config:
    """Config class for Babel"""
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app.config.from_object(Config)


@app.before_request
def before_request():
    """Get user from request"""
    g.user = get_user()


users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


def get_user():
    """Get user from request"""
    try:
        return users.get(int(request.args.get('login_as')))
    except Exception:
        return None


@app.route('/', methods=['GET'], strict_slashes=False)
def index():
    """GET method for index.html"""
    return render_template('6-index.html')


@babel.localeselector
def get_locale():
    """Figure out best match for users locale and lang
    priortiy in the following order: URL parameter, user setting,
    request header, and default config"""
    locale = request.args.get('locale')
    if locale and locale in app.config['LANGUAGES']:
        return locale
    if g.user:
        user_locale = g.user.get('locale')
        if user_locale and user_locale in app.config['LANGUAGES']:
            return user_locale
    header_locale = request.accept_languages.best_match(
      app.config['LANGUAGES'])
    if header_locale:
        return header_locale
    return app.config['BABEL_DEFAULT_LOCALE']


@babel.timezoneselector
def get_timezone():
    """Get timezone from user with logic being same as get_locale"""
    timezone = request.args.get('timezone')
    if timezone and timezone in pytz.all_timezones:
        return timezone
    if g.user:
        user_timezone = g.user.get('timezone')
        if user_timezone and user_timezone in pytz.all_timezones:
            return user_timezone
    return app.config['BABEL_DEFAULT_TIMEZONE']


if __name__ == "__main__":
    app.run()
