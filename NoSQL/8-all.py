#!/usr/bin/env python3
""" Task 8. All documents in a collection"""


def list_all(mongo_collection):
    """Function that lists all documents in a collection"""
    return mongo_collection.find()
 