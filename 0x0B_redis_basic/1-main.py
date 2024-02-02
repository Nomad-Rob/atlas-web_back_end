#!/usr/bin/env python3
"""
Main file
"""

import unittest
from exercise import Cache

class TestCache(unittest.TestCase):
    def setUp(self):
        self.cache = Cache()

    def test_store_string(self):
        data = "hello"
        key = self.cache.store(data)
        result = self.cache.get(key)
        self.assertEqual(result, data.encode('utf-8'))

    def test_store_bytes(self):
        data = b"world"
        key = self.cache.store(data)
        result = self.cache.get(key)
        self.assertEqual(result, data)

    def test_store_int(self):
        data = 42
        key = self.cache.store(data)
        result = self.cache.get(key)
        self.assertEqual(result, str(data).encode('utf-8'))

    def test_store_float(self):
        data = 3.14
        key = self.cache.store(data)
        result = self.cache.get(key)
        self.assertEqual(result, str(data).encode('utf-8'))

    def test_get_str(self):
        data = "hello"
        key = self.cache.store(data)
        result = self.cache.get_str(key)
        self.assertEqual(result, data)

    def test_get_int(self):
        data = 42
        key = self.cache.store(data)
        result = self.cache.get_int(key)
        self.assertEqual(result, data)

    def test_get_custom_conversion(self):
        data = "world"
        key = self.cache.store(data)
        result = self.cache.get(key, fn=lambda d: d.decode("utf-8"))
        self.assertEqual(result, data)

if __name__ == '__main__':
    unittest.main()
