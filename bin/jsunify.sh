#!/bin/bash
find js/ -type f -exec uglifyjs -nc -o '{}'.min '{}' \;
cat js/*min > js/script.js
rm js/*min
