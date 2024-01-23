#!/usr/bin/env python3

"""Session authentication will be created here"""

from api.v1.auth.auth import Auth
from models.user import User


class SessionAuth(Auth):
    """ SessionAuth class. """
    pass
    user_id_by_session_id = {}

    def create_session(self, user_id: str = None) -> str:
        """ Creates a Session ID for a user_id """
        from uuid import uuid4
        if user_id is None or type(user_id) is not str:
            return None
        session_id = str(uuid4())
        SessionAuth.user_id_by_session_id[session_id] = user_id
        return session_id

    def user_id_for_session_id(self, session_id: str = None) -> str:
        """ Returns a User ID based on a Session ID """
        if session_id is None or type(session_id) is not str:
            return None
        return SessionAuth.user_id_by_session_id.get(session_id)
    
    def current_user(self, request=None):
        """ Returns a User instance based on a cookie value """
        cookie = self.session_cookie(request)
        user_id = self.user_id_for_session_id(cookie)
        return User.get(user_id)
