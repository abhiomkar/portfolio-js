#!/bin/bash
rm -rf portfoliojs
mkdir -p portfoliojs
mkdir -p portfoliojs/js
mkdir -p portfoliojs/css

cp index.html portfoliojs
cp js/portfolio.min.js portfoliojs/js/
cp css/bootstrap.min.css portfoliojs/css/

zip -r $1 portfoliojs
rm -rf portfoliojs/
echo "Release: $1"
