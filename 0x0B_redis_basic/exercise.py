#!/usr/bin/env python3

"""Redis exercise"""
import redis
import uuid
from typing import Union, Callable
from functools import wraps


def count_calls(method: Callable[..., Union[str, bytes, int, float]])-> Callable[..., Union[str, bytes, int, float]]:
    """Decorator function that counts how many times a function is called"""
    @wraps(method)
    def wrapper(self, *args, **kwargs):
        """Wrapper function"""
        self._redis.incr(method.__qualname__)
        return method(self, *args, **kwargs)
    return wrapper


class Cache:
    """Cache class"""
    def __init__(self):
        """Constructor method"""
        self._redis = redis.Redis()
        self._redis.flushdb()

    @count_calls
    def store(self, data: Union[str, bytes, int, float]) -> str:
        """Store method that takes a data argument and returns a key"""
        key = str(uuid.uuid4())
        self._redis.set(key, data)
        return key

    def get(self, key: str, fn: Callable = None) -> Union[str, bytes, int, float]:
        """Get method that takes a key string and an optional callable"""
        data = self._redis.get(key)
        if fn:
            return fn(data)
        return data

    def get_str(self, data: bytes) -> str:
        """Convert bytes to string method"""
        return data.decode('utf-8')

    def get_int(self, data: bytes) -> int:
        """Convert bytes to int method"""
        return int.from_bytes(data, byteorder='big')
