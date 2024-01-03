#!/usr/bin/env python3

"""From the previous file, import wait_random into 2-measure_runtime.py.
Create a measure_time function with integers n and max_delay as arguments
that measures the total execution time for wait_random(n, max_delay), and
returns total_time / n. Your function should return a float."""


import asyncio
import time
from typing import List
wait_random = __import__('0-basic_async_syntax').wait_random


def measure_time(n: int, max_delay: int) -> float:
    """Return average time"""
    start = time.perf_counter()
    asyncio.run(wait_n(n, max_delay))
    end = time.perf_counter()
    return (end - start) / n
