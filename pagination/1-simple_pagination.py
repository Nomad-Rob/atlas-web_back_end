#!/usr/bin/env python3

"""Copy index_range from the previous file into the present file.
Implement a method named get_page that takes two integer arguments
page with default value 1 and page_size with default value 10.
You have to use this CSV file (same as the one presented at the top
of the project) Use assert to verify that both arguments are integers
greater than 0. Use index_range to find the correct indexes to paginate
the dataset correctly and return the appropriate page of the dataset
(i.e. the correct list of rows). If the input arguments are out of range
for the dataset, an empty list should be returned."""


import csv
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
