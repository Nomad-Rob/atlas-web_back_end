#!/usr/bin/env python3
"""Encrypting the password"""
import bcrypt


def hash_password(password: str) -> bytes:
    """returns a salted, hased password in a byte string"""
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed
  
def is_valid(hashed_password: bytes, password: str) -> bool:
    """Check if password is valid"""
    return bcrypt.checkpw(password.encode('utf-8'), hashed_password)
