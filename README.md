# Portfolio.js

Tiny JavaScript carousel library with horizontal scrolling and all the goodness.

- Lazy-load images on scroll
- Scroll animation on item click
- Responsiveness
- Very fast & easy to setup
- Vanilla JavaScript (No jQuery dependency)

Install
-------

Directly refer it in your HTML

    <!-- Styles for Portfolio library -->
    <link rel="stylesheet" href="https://unpkg.com/portfolio-js@latest/dist/portfolio.css" />
    
    <!-- Include Portfolio library -->
    <script src="https://unpkg.com/portfolio-js@latest/dist/portfolio.umd.js"></script>

If you're using bundlers like Webpack, Rollup.js or Parcel.js

    npm install --save portfolio-js
    
Usage
-----

**HTML**

    <div class="pf-carousel my-image-gallery">
      <div class="pf-slider">
        <div class="pf-item">
          <img class="pf-item-image" data-src="https://example.com/thor.png" />
          <div class="pf-item-description">
            Photo by Jane Foster
          </div>
        </div>
        <div class="pf-item">
          <img class="pf-item-image" data-src="https://example.com/hulk_12.png" />
          <div class="pf-item-description">
            Photo by Betty Ross on Unsplash
          </div>
        </div>  
        <!-- Add more images -->
      </div>
    </div>

**JavaScript**

Once the assets are included as mentioned in install section you can activate Portfolio like this:

    new Portfolio('.my-image-gallery');

**JavaScript (w/ Bundler)**

    import 'portfolio-js/dist/portfolio.css';
    import Portfolio from 'portfolio-js';

    new Portfolio('.my-image-gallery');

Author
------
Abhinay Omkar
