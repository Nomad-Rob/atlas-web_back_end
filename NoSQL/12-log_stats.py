#!/usr/bin/env python3

""" Task 12 - Provides some stats about Nginx logs stored in MongoDB """

from pymongo import MongoClient

def main():
    """ function that provides some stats about Nginx logs stored in MongoDB"""
    # Connect to the MongoDB database
    client = MongoClient('mongodb://127.0.0.1:27017')
    db = client['logs']
    collection = db['nginx']

    total_logs = collection.count_documents({})

    print(f"{total_logs} logs")
    print('Methods:')

    methods = ["GET", "POST", "PUT", "PATCH", "DELETE"]
    for method in methods:
        count = collection.count_documents({"method": method})
        print(f"\tmethod {method}: {count}")

    specific_stats = collection.count_documents({"method": "GET", "path": "/status"})
    print(f"{specific_stats} status check")


if __name__ == "__main__":
    main()
