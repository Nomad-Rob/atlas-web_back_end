#!/usr/bin/env python3

"""Redis exercise"""
import redis
import uuid
from typing import Union, Callable
from functools import wraps


def count_calls(method: Callable) -> Callable:
    """Decorator that counts how many times a function is called"""
    @wraps(method)
    def wrapper(self, *args, **kwargs):
        """Wrapper function"""
        self._redis.incr(method.__qualname__)
        return method(self, *args, **kwargs)
    return wrapper


def call_history(method: Callable) -> Callable:
    """Decorator that stores the history of inputs and outputs for a function"""
    @wraps(method)
    def wrapper(self, *args, **kwargs):
        """Wrapper function"""
        input = str(args)
        self._redis.rpush(f"{method.__qualname__}:inputs", input)

        output = method(self, *args, **kwargs)
        self._redis.rpush(f"{method.__qualname__}:outputs", output)

        return output
    return wrapper


def replay(method: Callable) -> None:
    """Display the history of calls of a particular function"""
    r = redis.Redis()
    method_name = method.__qualname__
    count = r.get(method_name).decode('utf-8')
    print(f"{method_name} was called {count} times:")

    inputs = r.lrange(f"{method_name}:inputs", 0, -1)
    outputs = r.lrange(f"{method_name}:outputs", 0, -1)

    for i, o in zip(inputs, outputs):
        print(f"{method_name}(*{i.decode('utf-8')}) -> {o.decode('utf-8')}")


class Cache:
    """Cache class"""
    def __init__(self):
        """Constructor"""
        self._redis = redis.Redis()
        self._redis.flushdb()

    @count_calls
    @call_history
    def store(self, data: Union[str, bytes, int, float]) -> str:
        """Store data in cache"""
        key = str(uuid.uuid4())
        self._redis.set(key, data)
        return key

    def get(self, key: str, fn: Callable = None) -> Union[str, bytes, int, float]:
        """Get data from cache"""
        data = self._redis.get(key)
        if fn:
            return fn(data)
        return data

    def get_str(self, data: bytes) -> str:
        """Convert bytes to str"""
        return data.decode('utf-8')

    def get_int(self, data: bytes) -> int:
        """Convert bytes to int"""
        return int.from_bytes(data, byteorder='big')
