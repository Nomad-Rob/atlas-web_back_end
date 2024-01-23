#!/usr/bin/env python3

"""Session authentication handles all routes for the Session authentication"""

from api.v1.auth.auth import Auth
from models.user import User
from flask import request, jsonify, abort, make_response

@app.route('/auth_session/login', methods=['POST'], strict_slashes=False)

def login():
    """ POST /api/v1/auth_session/login
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
    if not user:
        return jsonify({"error": "no user found for this email"}), 404
    for u in user:
        if not u.is_valid_password(password):
            return jsonify({"error": "wrong password"}), 401
        from api.v1.app import auth
        session_id = auth.create_session(u.id)
        response = make_response(u.to_json())
        response.set_cookie(os.getenv('SESSION_NAME'), session_id)
        return response
  