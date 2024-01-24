#!/usr/bin/env python3

"""Auth class to interact with the authentication database."""

import bcrypt
from db import DB
from user import Base, User
from sqlalchemy.orm.exc import NoResultFound
import uuid


def _hash_password(password: str) -> bytes:
    '''Returns a hashed version of passed in pwd'''
    hashed_password = bcrypt.hashpw(password.encode('utf-8'),
                                    bcrypt.gensalt())
    return hashed_password


def _generate_uuid() -> str:
    '''Returns a string representation of a new uuid'''
    return str(uuid.uuid4())


class Auth():
    """Auth class to interact with the authentication database.
    """

    def __init__(self):
        self._db = DB()

    def register_user(self, email: str,
                      password: str) -> User:
        '''Returns user object after creating
        user, if they already exits then raises
        a ValueError'''
        try:
            already_exist = self._db.find_user_by(email=email)
            if already_exist:
                raise ValueError(f'User {email} already exists')
        except NoResultFound:
            hashed_password = _hash_password(password)
            user = self._db.add_user(email, hashed_password)
            return user

    def valid_login(self, email: str, password: str) -> bool:
        '''Returns true if email and pwd match'''
        try:
            user = self._db.find_user_by(email=email)
            if bcrypt.checkpw(password.encode('utf-8'),
                              user.hashed_password):
                return True
            else:
                return False
        except NoResultFound:
            return False
