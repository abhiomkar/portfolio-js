#!/bin/bash
find js/ -type f -exec uglifyjs -nc -o '{}'.min '{}' \;
cat js/*min > js/portfolio.min.js
rm js/*min
