#!/usr/bin/env python3

"""Redis exercise"""
import redis
import uuid
from typing import Union


class Cache:
    """Cache class"""
    def __init__(self):
        """Constructor method"""
        self._redis = redis.Redis()
        self._redis.flushdb()

    def store(self, data: Union[str, bytes, int, float]) -> str:
        """Store method that takes a data argument and returns a key"""
        key = str(uuid.uuid4())
        self._redis.set(key, data)
        return key
  