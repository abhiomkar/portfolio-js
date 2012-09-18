#!/bin/bash
rm -rf portfoliojs
mkdir -p portfoliojs
mkdir -p portfoliojs/js
mkdir -p portfoliojs/css

sed -e '/sedd_start/,/sedd_stop/ d' -e '/sed_del/ d' index.html portfoliojs/index.html
cp js/portfolio.min.js portfoliojs/js/
cp css/bootstrap.min.css portfoliojs/css/

zip -r $1 portfoliojs
rm -rf portfoliojs/
echo "Release: $1"
