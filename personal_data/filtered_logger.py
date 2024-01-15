#!/usr/bin/env python3

"""Implement a main function that takes no arguments and returns nothing.

The function will obtain a database connection using get_db and retrieve
all rows in the users table and display each row under a filtered format
like this:"""

from typing import List
import logging
import re
import os
import mysql.connector

PII_FIELDS = ("name", "email", "phone", "ssn", "password")


def filter_datum(fields: List[str], redaction: str,
                 message: str, separator: str) -> str:
    """returns the log message obfuscated"""
    for field in fields:
        message = re.sub(f"{field}=.*?{separator}",
                         f"{field}={redaction}{separator}", message)
    return message


class RedactingFormatter(logging.Formatter):
    """ Redacting Formatter class """

    REDACTION = "***"
    FORMAT = "[HOLBERTON] %(name)s %(levelname)s %(asctime)-15s: %(message)s"
    SEPARATOR = ";"

    def __init__(self, fields: List[str]):
        """ Constructor """
        super(RedactingFormatter, self).__init__(self.FORMAT)
        self.fields = fields

    def format(self, record: logging.LogRecord) -> str:
        """ Filter values in incoming log records """
        original_message = record.getMessage()
        redacted_message = filter_datum(
            self.fields,
            self.REDACTION,
            original_message,
            self.SEPARATOR)
        record.msg = redacted_message
        return super().format(record)


def get_logger() -> logging.Logger:
    """returns a logging.Logger object"""
    logger = logging.getLogger("user_data")
    logger.setLevel(logging.INFO)
    logger.propagate = False
    handler = logging.StreamHandler()
    formatter = RedactingFormatter(list(PII_FIELDS))
    handler.setFormatter(formatter)
    logger.addHandler(handler)
    return logger


def get_db() -> mysql.connector.connection.MySQLConnection:
    """Connects to the MySQL database and returns a connection object."""

    return mysql.connector.connect(
        user=os.getenv('PERSONAL_DATA_DB_USERNAME', 'root'),
        password=os.getenv('PERSONAL_DATA_DB_PASSWORD', ''),
        host=os.getenv('PERSONAL_DATA_DB_HOST', 'localhost'),
        database=os.getenv('PERSONAL_DATA_DB_NAME')
    )
    
    
def main():
    """read and filter data from database"""
    logger = get_logger()
    db = get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM users;")
    for row in rows:
        dict_row = {
            'name': row[0],
            'email': row[1],
            'phone': row[2],
            'ssn': row[3],
            'password': row[4],
            'ip': row[5],
            'last_login': row[6],
            'user_agent': row[7]
        }
        
        message = '; '.join([f'{key}={value}' for key, value in dict_row.items()])
        logger.info(message)
        
    cursor.close()
    db.close()
    
if __name__ == '__main__':
    main()
