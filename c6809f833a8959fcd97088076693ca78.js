// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }
      
      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module;

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module() {
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({9:[function(require,module,exports) {
var global = (1,eval)("this");
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.Portfolio = factory();
})(this, function () {
  'use strict';

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var cssClasses = {
    SLIDER: 'pf-slider',
    ITEM: 'pf-item',
    NAVIGATION_BUTTON_LEFT: 'pf-navigation-button-left',
    NAVIGATION_BUTTON_RIGHT: 'pf-navigation-button-right',
    PLACEHOLDER_ITEM: 'pf-placeholder-item'
  };

  var Portfolio = function () {
    function Portfolio(portfolioEl) {
      var _this = this;

      _classCallCheck(this, Portfolio);

      this.portfolioEl = portfolioEl;
      this.slider = portfolioEl.querySelector('.' + cssClasses.SLIDER);

      this.sliderWidth;
      this.didSliderMove = false;
      this.placeholderItem;

      this.loadImages(4).then(function (imagesList) {
        if (_this.getNextImages().length) {
          _this.slider.appendChild(_this.getPlaceholderItem());
        }
        _this.portfolioEl.classList.add('is-ready');

        _this.onScroll();
      });

      this.addNavigationButton('left');
      this.addNavigationButton('right');

      this.attachEvents();
    }

    _createClass(Portfolio, [{
      key: 'loadImages',
      value: function loadImages(size) {
        var _this2 = this;

        return new Promise(function (resolve) {
          var imagesLoaded = 0;
          var imagesList = _this2.getNextImages(size);
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = imagesList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var image = _step.value;

              image.onload = function () {
                imagesLoaded++;
                if (imagesLoaded === imagesList.length) {
                  var _iteratorNormalCompletion2 = true;
                  var _didIteratorError2 = false;
                  var _iteratorError2 = undefined;

                  try {
                    for (var _iterator2 = imagesList[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                      var _image = _step2.value;

                      _image.parentElement.classList.add('is-loaded');
                    }
                  } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                  } finally {
                    try {
                      if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                      }
                    } finally {
                      if (_didIteratorError2) {
                        throw _iteratorError2;
                      }
                    }
                  }

                  resolve(imagesList);
                }
              };

              image.setAttribute('src', image.getAttribute('data-src'));
              image.removeAttribute('data-src');
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        });
      }
    }, {
      key: 'addNavigationButton',
      value: function addNavigationButton(navigationDirection) {
        var _this3 = this;

        var className = navigationDirection === 'left' ? cssClasses.NAVIGATION_BUTTON_LEFT : cssClasses.NAVIGATION_BUTTON_RIGHT;
        var ariaLabel = navigationDirection === 'left' ? 'See previous images' : 'See more images';
        var navigationButtonTemplate = '\n      <div role="button" tabindex="0" aria-label="' + ariaLabel + '"\n          class="' + className + '">\n      </div>\n      ';
        var navigationButton = document.createElement('div');
        this.portfolioEl.appendChild(navigationButton);
        navigationButton.outerHTML = navigationButtonTemplate;

        this.portfolioEl.querySelector('.' + className).addEventListener('click', function () {
          if (navigationDirection === 'left') {
            _this3.slideToLeft();
          } else {
            _this3.slideToRight();
          }
        });
      }
    }, {
      key: 'getPlaceholderItem',
      value: function getPlaceholderItem() {
        var placeholderItem = document.createElement('div');
        placeholderItem.classList.add(cssClasses.PLACEHOLDER_ITEM);
        this.placeholderItem = placeholderItem;

        return placeholderItem;
      }
    }, {
      key: 'getNextImages',
      value: function getNextImages(size) {
        var images = this.portfolioEl.querySelectorAll('.' + cssClasses.ITEM + ' > img[data-src]');

        if (size === undefined) {
          return Array.from(images);
        } else {
          return Array.from(images).splice(0, size);
        }
      }
    }, {
      key: 'attachEvents',
      value: function attachEvents() {
        var _this4 = this;

        ['mousedown', 'touchstart'].forEach(function (eventName) {
          _this4.slider.addEventListener(eventName, function (event) {}, { passive: true });
        });

        this.slider.addEventListener('touchmove', function (event) {
          _this4.didSliderMove = true;
        }, { passive: true });

        ['mouseup', 'touchend'].forEach(function (eventName) {
          _this4.slider.addEventListener(eventName, function (event) {
            // Scroll to clicked / touched item.
            if (!_this4.didSliderMove) {
              setTimeout(function () {
                return _this4.scrollTo(event.target.closest('.' + cssClasses.ITEM), 50);
              });
              _this4.didSliderMove = false;
              return;
            }
          }, { passive: true });
        });

        this.slider.addEventListener('scroll', function () {
          return requestAnimationFrame(function () {
            return _this4.onScroll();
          });
        });
      }
    }, {
      key: 'onScroll',
      value: function onScroll() {
        var _this5 = this;

        var sliderScrollLeft = this.slider.scrollLeft;
        var sliderScrollWidth = this.slider.scrollWidth;
        var sliderWidth = this.slider.getBoundingClientRect().width;
        this.portfolioEl.classList.toggle('at-left-edge', sliderScrollLeft === 0);
        this.portfolioEl.classList.toggle('at-right-edge', sliderScrollLeft === sliderScrollWidth - sliderWidth);

        if (this.isItTimeToFetch()) {
          if (this.fetchRequestPending) return;
          this.fetchRequestPending = this.fetchNextImages();

          this.fetchRequestPending.then(function () {
            _this5.fetchRequestPending = null;
          });
        }
      }

      /**
       * Returns true if scroll is moved till half of the slider scroll amount.
       */

    }, {
      key: 'isItTimeToFetch',
      value: function isItTimeToFetch() {
        var sliderWidth = this.slider.getBoundingClientRect().width;
        var scrollRemaining = this.slider.scrollWidth - this.slider.scrollLeft - sliderWidth;

        if (scrollRemaining <= sliderWidth) {
          return true;
        }

        return false;
      }
    }, {
      key: 'isPlaceholderItemVisible',
      value: function isPlaceholderItemVisible() {
        return this.placeholderItem.getBoundingClientRect().x <= window.outerWidth;
      }
    }, {
      key: 'fetchNextImages',
      value: function fetchNextImages() {
        var _this6 = this;

        return this.loadImages(6).then(function () {
          if (_this6.getNextImages(1).length === 0) {
            _this6.slider.removeChild(_this6.placeholderItem);
            _this6.placeholderItem = null;
          }
        });
      }
    }, {
      key: 'slideToLeft',
      value: function slideToLeft() {
        this.scrollTo(this.slider.scrollLeft - this.slider.getBoundingClientRect().width);
      }
    }, {
      key: 'slideToRight',
      value: function slideToRight() {
        this.scrollTo(this.slider.scrollLeft + this.slider.getBoundingClientRect().width);
      }
    }, {
      key: 'scrollTo',
      value: function scrollTo(destination) {
        var _this7 = this;

        if (!destination) return;

        var scrollStart = this.slider.scrollLeft;
        var maxScroll = this.slider.scrollWidth - this.slider.getBoundingClientRect().width;
        var scrollDestinatiom = void 0;
        if (typeof destination === 'number') {
          scrollDestinatiom = destination;
        } else {
          scrollDestinatiom = Math.min(destination.offsetLeft, maxScroll);
        }
        var delta = scrollDestinatiom - scrollStart;
        if (delta === 0) return;

        var startTime = new Date().getTime();
        var sliderWidth = this.slider.scrollWidth;
        var SPEED = 1; // time = distance/speed
        var duration = Math.abs(delta / SPEED);

        var animate = function animate() {
          var currentTime = new Date().getTime() - startTime;
          var easeValue = Math.ceil(_this7.ease(currentTime, scrollStart, delta, duration));
          _this7.slider.scrollLeft = easeValue;

          if (delta > 0 && easeValue >= scrollDestinatiom || delta < 0 && easeValue <= scrollDestinatiom) return;
          requestAnimationFrame(animate);
        };

        animate();
      }
    }, {
      key: 'easeInOutCubic',
      value: function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      }
    }, {
      key: 'ease',
      value: function ease(currentTime, startValue, delta, duration) {
        var easingMultiplier = this.easeInOutCubic(currentTime / duration);
        return delta * easingMultiplier + startValue;
      }
    }]);

    return Portfolio;
  }();

  return Portfolio;
});
},{}],8:[function(require,module,exports) {
"use strict";

var _portfolioUmd = require("../../dist/portfolio.umd.js");

var _portfolioUmd2 = _interopRequireDefault(_portfolioUmd);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _portfolioUmd2.default(document.querySelector('.my-image-gallery'));
},{"../../dist/portfolio.umd.js":9}]},{},[8])