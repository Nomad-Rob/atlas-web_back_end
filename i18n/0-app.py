#!/usr/bin/env python3

"""Setting up basic Flask app"""
from flask import Flask, render_template, request, g


app = Flask(__name__)


@app.route('/', methods=['GET'], strict_slashes=False)
def index():
    """GET method for index.html"""
    return render_template('0-index.html')


if __name__ == "__main__":
    app.run()
