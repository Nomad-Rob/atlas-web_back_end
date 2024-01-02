#!/usr/bin/env python3

"""Annotate the below function’s parameters and return value with the
appropriate types"""


from typing import Iterable, Sequence, Tuple, List


def element_length(lst: Iterable[Sequence]) -> List[Tuple[Sequence, int]]:
    """Return list of tuples, one containing a string and an int."""
    return [(i, len(i)) for i in lst]
