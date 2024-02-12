#!/usr/bin/env python3

""" Task 11 - Function that returns a list of school having a specifi topic"""


def schools_by_topic(mongo_collection, topic):
    """Function that returns a list of school having a specifi topic"""
    return mongo_collection.find({"topics": topic})
