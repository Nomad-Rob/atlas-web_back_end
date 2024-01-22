#!/usr/bin/env python3

"""Need to update this documentation"""

from api.v1.auth.auth import Auth
from base64 import b64decode
from typing import TypeVar
from models.user import User
import binascii


class BasicAuth(Auth):
    """ BasicAuth class. """

    def extract_base64_authorization_header(self,
                                            authorization_header:
                                                str) -> str:
        """
        Extracts the Base64 part of the Authorization header
        for Basic Authentication.
        """
        if authorization_header is None or \
                type(authorization_header) is not str:
            return None
        if authorization_header.startswith('Basic '):
            return authorization_header[6:]
        return None

    def decode_base64_authorization_header(
        self, base64_authorization_header: str
    ) -> str:
        """
        Decodes the Base64 value of the Authorization header.
        """
        import base64
        if base64_authorization_header is None or \
                type(base64_authorization_header) is not str:
            return None
        try:
            return base64.b64decode(
                base64_authorization_header.encode('utf-8')).decode('utf-8')
        except Exception:
            return None

    def extract_user_credentials(
        self, decoded_base64_authorization_header: str
    ) -> (str, str):
        """
        Extracts user email and password from the Base64 value of the
        Authorization header.
        """
        if decoded_base64_authorization_header is None \
                or type(decoded_base64_authorization_header) != str \
                or not re.search(':', decoded_base64_authorization_header):
            return None, None
        return tuple(re.split(':', decoded_base64_authorization_header))

    def user_object_from_credentials(
            self, user_email: str, user_pwd: str) -> TypeVar('User'):
        """ Returns the User instance based on email and password """
        if (user_email is None or type(user_email) is not str or
                user_pwd is None or type(user_pwd) is not str):
            return None

        try:
            # Try fetching users with provided email
            users = User.search({'email': user_email})

            # Check if any user was found with that email
            if not users:
                return None

            # Assuming the email is unique and we get a single user
            user = users[0]

            # Verify password for fetched user
            if not user.is_valid_password(user_pwd):
                return None
        except Exception:
            return None

        return user

    def current_user(self, request=None) -> TypeVar('User'):
        """
        Overloads Auth and retrieves the User instance for a request.
        """
        auth_header = self.authorization_header(request)
        auth_header = self.extract_base64_authorization_header(auth_header)
        auth_header = self.decode_base64_authorization_header(auth_header)
        user_credentials = self.extract_user_credentials(auth_header)
        user_email, user_pwd = user_credentials
        return self.user_object_from_credentials(user_email, user_pwd)
