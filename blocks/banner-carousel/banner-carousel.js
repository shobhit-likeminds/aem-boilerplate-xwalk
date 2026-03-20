import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselId = 'carouselExampleSlidesOnly';
  block.id = carouselId;
  block.classList.add('banner-carousel', 'banner-carousel-slide'); // Corrected class name

  const carouselIndicators = document.createElement('ol');
  carouselIndicators.classList.add('banner-carousel-indicators');

  const carouselInner = document.createElement('div');
  carouselInner.classList.add('banner-carousel-inner');

  [...block.children].forEach((row, index) => {
    const item = document.createElement('div');
    moveInstrumentation(row, item);
    item.classList.add('banner-carousel-item');
    if (index === 0) {
      item.classList.add('banner-carousel-active'); // Corrected class name
    }

    const indicator = document.createElement('li');
    indicator.setAttribute('data-target', `#${carouselId}`);
    indicator.setAttribute('data-slide-to', index.toString());
    if (index === 0) {
      indicator.classList.add('banner-carousel-active'); // Corrected class name
    }
    carouselIndicators.append(indicator);

    // Add event listener for indicator to switch slides
    indicator.addEventListener('click', (e) => {
      e.preventDefault();
      const slideToIndex = parseInt(e.target.getAttribute('data-slide-to'), 10);
      const currentActiveItem = block.querySelector('.banner-carousel-item.banner-carousel-active');
      const currentActiveIndicator = carouselIndicators.querySelector('.banner-carousel-active');

      if (currentActiveItem) {
        currentActiveItem.classList.remove('banner-carousel-active');
      }
      if (currentActiveIndicator) {
        currentActiveIndicator.classList.remove('banner-carousel-active');
      }

      const newActiveItem = carouselInner.children[slideToIndex];
      const newActiveIndicator = carouselIndicators.children[slideToIndex];

      if (newActiveItem) {
        newActiveItem.classList.add('banner-carousel-active');
      }
      if (newActiveIndicator) {
        newActiveIndicator.classList.add('banner-carousel-active');
      }
    });

    // Cells are: desktopImage, mobileImage, heading, description, ctaLink, ctaText
    // BlockJson has 6 fields. The JS must read exactly 6 cells.
    const cells = [...row.children];
    if (cells.length !== 6) {
      console.warn(`Expected 6 cells per row for banner-carousel, but found ${cells.length}.`);
    }

    const desktopImageCell = cells[0];
    const mobileImageCell = cells[1];
    const headingCell = cells[2];
    const descriptionCell = cells[3];
    const ctaLinkCell = cells[4];
    // ctaTextCell is cells[5] but not directly used for content, only for ctaLink's text if needed.

    if (desktopImageCell) {
      const picture = desktopImageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt, index === 0, [{ width: '1200' }]);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          optimizedPic.classList.add('banner-carousel-d-none', 'banner-carousel-d-sm-block', 'banner-carousel-w-100', 'banner-carousel-desktop-image'); // Corrected class names
          item.append(optimizedPic);
        }
      }
    }

    if (mobileImageCell) {
      const picture = mobileImageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt, index === 0, [{ width: '750' }]);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          optimizedPic.classList.add('banner-carousel-d-block', 'banner-carousel-d-sm-none', 'banner-carousel-w-100', 'banner-carousel-mobile-image'); // Corrected class names
          item.append(optimizedPic);
        }
      }
    }

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('banner-carousel-content-wrapper', 'banner-carousel-position-absolute'); // Corrected class names

    if (headingCell) {
      const heading = headingCell.querySelector('h1, h2, h3, h4, h5, h6');
      if (heading) {
        moveInstrumentation(headingCell, heading);
        heading.classList.add('banner-carousel-koi-carousel-heading', 'banner-carousel-text-sm-left'); // Corrected class names
        contentWrapper.append(heading);
      }
    }

    if (descriptionCell) {
      const description = document.createElement('div');
      moveInstrumentation(descriptionCell, description);
      description.classList.add('banner-carousel-koi-carousel-description'); // Corrected class name
      // Move all children from descriptionCell to description
      while (descriptionCell.firstChild) {
        description.append(descriptionCell.firstChild);
      }
      contentWrapper.append(description);
    }

    if (ctaLinkCell) {
      const foundLink = ctaLinkCell.querySelector('a');
      if (foundLink) {
        const cta = document.createElement('a');
        moveInstrumentation(ctaLinkCell, cta);
        cta.href = foundLink.href;
        cta.textContent = foundLink.textContent;
        cta.classList.add('banner-carousel-koi-carousel-cta', 'banner-carousel-btn', 'banner-carousel-btn-primary', 'banner-carousel-btn-start-now'); // Corrected class names
        if (foundLink.target) cta.target = foundLink.target;
        if (foundLink.getAttribute('data-bg-color')) {
          cta.style.backgroundColor = foundLink.getAttribute('data-bg-color');
        }
        contentWrapper.append(cta);
      }
    }

    if (contentWrapper.children.length > 0) {
      item.append(contentWrapper);
    }

    carouselInner.append(item);
  });

  block.textContent = '';
  block.append(carouselIndicators, carouselInner);

  const prevButton = document.createElement('a');
  prevButton.classList.add('banner-carousel-control-prev');
  prevButton.href = `#${carouselId}`;
  prevButton.setAttribute('role', 'button');
  prevButton.addEventListener('click', (e) => {
    e.preventDefault();
    const activeItem = block.querySelector('.banner-carousel-item.banner-carousel-active'); // Corrected class name
    let prevItem = activeItem.previousElementSibling;
    if (!prevItem || !prevItem.classList.contains('banner-carousel-item')) {
      prevItem = carouselInner.lastElementChild;
    }
    if (prevItem) {
      activeItem.classList.remove('banner-carousel-active'); // Corrected class name
      prevItem.classList.add('banner-carousel-active'); // Corrected class name
      const activeIndicator = carouselIndicators.querySelector('.banner-carousel-active'); // Corrected class name
      const prevIndicator = activeIndicator.previousElementSibling;
      if (prevIndicator) {
        activeIndicator.classList.remove('banner-carousel-active'); // Corrected class name
        prevIndicator.classList.add('banner-carousel-active'); // Corrected class name
      } else {
        activeIndicator.classList.remove('banner-carousel-active'); // Corrected class name
        carouselIndicators.lastElementChild.classList.add('banner-carousel-active'); // Corrected class name
      }
    }
  });

  const prevIcon = document.createElement('span');
  prevIcon.classList.add('banner-carousel-control-prev-icon');
  prevIcon.setAttribute('aria-hidden', 'true');
  const prevSrOnly = document.createElement('span');
  prevSrOnly.classList.add('banner-carousel-sr-only'); // Corrected class name
  prevSrOnly.textContent = 'Previous';
  prevButton.append(prevIcon, prevSrOnly);

  const nextButton = document.createElement('a');
  nextButton.classList.add('banner-carousel-control-next');
  nextButton.href = `#${carouselId}`;
  nextButton.setAttribute('role', 'button');
  nextButton.addEventListener('click', (e) => {
    e.preventDefault();
    const activeItem = block.querySelector('.banner-carousel-item.banner-carousel-active'); // Corrected class name
    let nextItem = activeItem.nextElementSibling;
    if (!nextItem || !nextItem.classList.contains('banner-carousel-item')) {
      nextItem = carouselInner.firstElementChild;
    }
    if (nextItem) {
      activeItem.classList.remove('banner-carousel-active'); // Corrected class name
      nextItem.classList.add('banner-carousel-active'); // Corrected class name
      const activeIndicator = carouselIndicators.querySelector('.banner-carousel-active'); // Corrected class name
      const nextIndicator = activeIndicator.nextElementSibling;
      if (nextIndicator) {
        activeIndicator.classList.remove('banner-carousel-active'); // Corrected class name
        nextIndicator.classList.add('banner-carousel-active'); // Corrected class name
      } else {
        activeIndicator.classList.remove('banner-carousel-active'); // Corrected class name
        carouselIndicators.firstElementChild.classList.add('banner-carousel-active'); // Corrected class name
      }
    }
  });

  const nextIcon = document.createElement('span');
  nextIcon.classList.add('banner-carousel-control-next-icon');
  nextIcon.setAttribute('aria-hidden', 'true');
  const nextSrOnly = document.createElement('span');
  nextSrOnly.classList.add('banner-carousel-sr-only'); // Corrected class name
  nextSrOnly.textContent = 'Next';
  nextButton.append(nextIcon, nextSrOnly);

  const navWrapper = document.createElement('div');
  navWrapper.classList.add('banner-carousel-next-carousel-btn'); // Corrected class name
  navWrapper.append(prevButton, nextButton);
  block.append(navWrapper);

  // Image optimization
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
