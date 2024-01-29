#!/bin/bash

# Loop from 1 to 20 to create empty main.js files with numbered prefixes.
for i in {0..7}; do
  touch "${i}-index.html"
done
