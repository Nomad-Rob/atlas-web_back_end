#!/usr/bin/env python3

""" Task 12 - Provides some stats about Nginx logs stored in MongoDB """

from pymongo import MongoClient


def log_stats(mongo_collection):
    """Function that returns the number of documents in a collection"""
    return mongo_collection.count_documents({}), mongo_collection.count_documents({"method": "GET"}), mongo_collection.count_documents({"method": "POST"}), mongo_collection.count_documents({"path": "/status"})
  
