#!/bin/bash
# minify portfoliojs
uglifyjs -o js/portfolio.min.js js/portfolio.js && \

cat js/portfolio.min.js js/jquery.easing.1.3.min.js js/jquery.scrollTo-1.4.3.1-min.js js/jquery.imagesloaded.min.js js/jquery.touchSwipe.min.js js/spin.min.js > js/portfolio.pack.min.js && \

echo "Created: js/portfolio.pack.min.js"
