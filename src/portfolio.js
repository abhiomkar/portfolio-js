import './portfolio.scss';

class Portfolio {
  constructor(portfolioEl) {
    this.portfolioEl = portfolioEl;
    this.slider = portfolioEl.querySelector('.slider');

    this.sliderWidth;
    this.didSliderMove = false;
    this.placeholderItem;

    this.loadImages(4).then((imagesList) => {
      if (this.getNextImages().length) {
        this.slider.appendChild(this.getPlaceholderItem());
      }
      this.portfolioEl.classList.add('is-ready');

      this.onScroll();
    });

    this.addNavigationButton('left');
    this.addNavigationButton('right');

    this.attachEvents();
  }

  loadImages(size) {
    return new Promise((resolve) => {
      let imagesLoaded = 0;
      const imagesList = this.getNextImages(size);
      for (const image of imagesList) {
        image.onload = () => {
          imagesLoaded++;
          if (imagesLoaded === imagesList.length) {
            for (const image of imagesList) {
              image.parentElement.classList.add('is-loaded');
            }

            resolve(imagesList);
          }
        };

        image.setAttribute('src', image.getAttribute('data-src'));
        image.removeAttribute('data-src');
      }
    });
  }

  addNavigationButton(navigationDirection) {
    const className =
      navigationDirection === 'left'
        ? 'navigation-button-left'
        : 'navigation-button-right';
    const ariaLabel =
      navigationDirection === 'left'
        ? 'See previous images'
        : 'See more images';
    const navigationButtonTemplate = `
      <div role="button" tabindex="0" aria-label="${ariaLabel}"
          class="${className}">
      </div>
      `;
    const navigationButton = document.createElement('div');
    this.portfolioEl.appendChild(navigationButton);
    navigationButton.outerHTML = navigationButtonTemplate;

    this.portfolioEl
      .querySelector(`.${className}`)
      .addEventListener('click', () => {
        if (navigationDirection === 'left') {
          this.slideToLeft();
        } else {
          this.slideToRight();
        }
      });
  }

  getPlaceholderItem() {
    const placeholderItem = document.createElement('div');
    placeholderItem.classList.add('placeholder-item');
    this.placeholderItem = placeholderItem;

    return placeholderItem;
  }

  getNextImages(size) {
    const images = this.portfolioEl.querySelectorAll('.item > img[data-src]');

    if (size === undefined) {
      return Array.from(images);
    } else {
      return Array.from(images).splice(0, size);
    }
  }

  attachEvents() {
    ['mousedown', 'touchstart'].forEach((eventName) => {
      this.slider.addEventListener(eventName, (event) => {}, {passive: true});
    });

    this.slider.addEventListener(
      'touchmove',
      (event) => {
        this.didSliderMove = true;
      },
      {passive: true},
    );

    ['mouseup', 'touchend'].forEach((eventName) => {
      this.slider.addEventListener(
        eventName,
        (event) => {
          // Scroll to clicked / touched item.
          if (!this.didSliderMove) {
            setTimeout(() => this.scrollTo(event.target.closest('.item'), 50));
            this.didSliderMove = false;
            return;
          }
        },
        {passive: true},
      );
    });

    this.slider.addEventListener('scroll', () =>
      requestAnimationFrame(() => this.onScroll()),
    );
  }

  onScroll() {
    const sliderScrollLeft = this.slider.scrollLeft;
    const sliderScrollWidth = this.slider.scrollWidth;
    const sliderWidth = this.slider.getBoundingClientRect().width;
    this.portfolioEl.classList.toggle('at-left-edge', sliderScrollLeft === 0);
    this.portfolioEl.classList.toggle(
      'at-right-edge',
      sliderScrollLeft === sliderScrollWidth - sliderWidth,
    );

    if (this.isItTimeToFetch()) {
      if (this.fetchRequestPending) return;
      this.fetchRequestPending = this.fetchNextImages();

      this.fetchRequestPending.then(() => {
        this.fetchRequestPending = null;
      });
    }
  }

  /**
   * Returns true if scroll is moved till half of the slider scroll amount.
   */
  isItTimeToFetch() {
    const sliderWidth = this.slider.getBoundingClientRect().width;
    const scrollRemaining =
      this.slider.scrollWidth - this.slider.scrollLeft - sliderWidth;

    if (scrollRemaining <= sliderWidth) {
      return true;
    }

    return false;
  }

  isPlaceholderItemVisible() {
    return this.placeholderItem.getBoundingClientRect().x <= window.outerWidth;
  }

  fetchNextImages() {
    return this.loadImages(6).then(() => {
      if (this.getNextImages(1).length === 0) {
        this.slider.removeChild(this.placeholderItem);
        this.placeholderItem = null;
      }
    });
  }

  slideToLeft() {
    this.scrollTo(
      this.slider.scrollLeft - this.slider.getBoundingClientRect().width,
    );
  }

  slideToRight() {
    this.scrollTo(
      this.slider.scrollLeft + this.slider.getBoundingClientRect().width,
    );
  }

  scrollTo(destination) {
    if (!destination) return;

    const scrollStart = this.slider.scrollLeft;
    const maxScroll =
      this.slider.scrollWidth - this.slider.getBoundingClientRect().width;
    let scrollDestinatiom;
    if (typeof destination === 'number') {
      scrollDestinatiom = destination;
    } else {
      scrollDestinatiom = Math.min(destination.offsetLeft, maxScroll);
    }
    const delta = scrollDestinatiom - scrollStart;
    if (delta === 0) return;

    const startTime = new Date().getTime();
    const sliderWidth = this.slider.scrollWidth;
    const SPEED = 1; // time = distance/speed
    const duration = Math.abs(delta / SPEED);

    const animate = () => {
      const currentTime = new Date().getTime() - startTime;
      const easeValue = Math.ceil(
        this.ease(currentTime, scrollStart, delta, duration),
      );
      this.slider.scrollLeft = easeValue;

      if (
        (delta > 0 && easeValue >= scrollDestinatiom) ||
        (delta < 0 && easeValue <= scrollDestinatiom)
      )
        return;
      requestAnimationFrame(animate);
    };

    animate();
  }

  easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  }

  ease(currentTime, startValue, delta, duration) {
    const easingMultiplier = this.easeInOutCubic(currentTime / duration);
    return delta * easingMultiplier + startValue;
  }
}

export default Portfolio;
