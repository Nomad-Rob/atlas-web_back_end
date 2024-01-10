#!/usr/bin/env python3

"""Replicate code from the previous task
Implement a get_hyper method that takes the same arguments (and defaults)
as get_page and returns a dictionary containing the following key-value pairs:
page_size: the length of the returned dataset page
page: the current page number
data: the dataset page (equivalent to return from previous task)
next_page: number of the next page, None if no next page
prev_page: number of the previous page, None if no previous page
total_pages: the total number of pages in the dataset as an integer
Make sure to reuse get_page in your implementation.
you can use the math module if necessary"""

import csv
import math
from typing import List, Tuple


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """Return a tuple of size two containing a start index and an end index
    corresponding to the range of indexes to return in a list for those
    particular pagination parameters."""
    start = (page - 1) * page_size
    end = page * page_size
    return (start, end)


class Server:
    """Server class to paginate a database of popular baby names."""
    DATAFILE = "Popular_Baby_Names.csv"

    def __init__(self):
        """Initialize instance."""
        self.__dataset = None

    @property
    def dataset(self) -> List[List]:
        """Getter for dataset."""
        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """Return a list of lists of rows from dataset."""
        assert isinstance(page, int) and page > 0
        assert isinstance(page_size, int) and page_size > 0
        self.__dataset = []
        with open(self.DATAFILE, 'r') as f:
            reader = csv.reader(f)
            for row in reader:
                self.__dataset.append(row)
        indexes = index_range(page, page_size)
        return self.__dataset[indexes[0]:indexes[1]]

    def get_hyper(self, page: int = 1, page_size: int = 10) -> dict:
        """Return a dictionary with pagination info"""
        data = self.get_page(page, page_size)
        total_pages = math.ceil(len(self.__dataset) / page_size)
        return {
            'page_size': len(data),
            'page': page,
            'data': data,
            'next_page': page + 1 if page + 1 < total_pages else None,
            'prev_page': page - 1 if page > 1 else None,
            'total_pages': total_pages
        }
