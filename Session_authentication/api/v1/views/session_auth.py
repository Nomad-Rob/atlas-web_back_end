#!/usr/bin/env python3

"""Session authentication handles all routes for the Session authentication"""

from models.user import User
from flask import request, jsonify, abort, make_response
from api.v1.views import app_views
import os


@app.route('/auth_session/login', methods=['POST'], strict_slashes=False)
def login() -> str:
    """ POST /auth_session/login
    Return:
      - User object JSON represented
    """
    email = request.form.get('email')
    if not email:
        return jsonify({"error": "email missing"}), 400
    password = request.form.get('password')
    if not password:
        return jsonify({"error": "password missing"}), 400
    try:
        user = User.search({'email': email})
    except Exception:
        return jsonify({"error": "no user found for this email"}), 404
    if not user or not user[0].is_valid_password(password):
        return jsonify({"error": "wrong password"}), 401
    from api.v1.app import auth
    session_id = auth.create_session(user[0].id)
    cookie_name = os.getenv('SESSION_NAME')
    response = make_response(user[0].to_json())
    response.set_cookie(cookie_name, session_id)
    return response
