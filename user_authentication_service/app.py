#!/usr/bin/env python3

"""Flask app"""

from flask import Flask, jsonify, request, abort, redirect
from auth import Auth

app = Flask(__name__)
AUTH = Auth()


@app.route('/', methods=['GET'], strict_slashes=False)
def hello_world() -> str:
    """ GET /
    Return:
      - the status of the API
    """
    return jsonify({"message": "Bienvenue"})
