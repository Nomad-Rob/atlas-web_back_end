#!/usr/bin/env python3

"""Auth class to interact with the authentication database."""

from db import DB
from user import User
from sqlalchemy.exc import InvalidRequestError
from sqlalchemy.orm.exc import NoResultFound
from uuid import uuid4
from typing import Union


def _hash_password(password: str) -> str:
    """Returns a salted hash of the input password."""
    import bcrypt
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt())
