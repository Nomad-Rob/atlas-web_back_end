#!/usr/bin/env python3

""" Task 12 - Provides some stats about Nginx logs stored in MongoDB """

from pymongo import MongoClient

def main():
    # Connect to the MongoDB database
    client = MongoClient('mongodb://localhost:27017/')
    db = client.logs
    nginx_collection = db.nginx

    # Count total number of logs
    total_logs = nginx_collection.count_documents({})

    # Count logs by method
    methods = ["GET", "POST", "PUT", "PATCH", "DELETE"]
    method_counts = {method: nginx_collection.count_documents({"method": method}) for method in methods}

    # Count logs with method=GET and path=/status
    status_checks = nginx_collection.count_documents({"method": "GET", "path": "/status"})

    # Display results
    print(f"{total_logs} logs")
    print("Methods:")
    for method in methods:
        print(f"    method {method}: {method_counts[method]}")
    print(f"{status_checks} status check")

if __name__ == "__main__":
    main()
