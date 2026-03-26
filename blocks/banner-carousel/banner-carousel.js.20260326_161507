import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  section.id = 'heroCarousel';
  section.classList.add(
    'carousel',
    'slide',
    'views-element-container',
    'block',
    'block-views',
    'block-views-blockour-brands-banner-slick-block-2',
    'clearfix',
  );
  section.setAttribute('data-ride', 'carousel');

  const formGroup = document.createElement('div');
  formGroup.classList.add('form-group');
  section.append(formGroup);

  const carouselInner = document.createElement('div');
  carouselInner.classList.add('carousel-inner');
  formGroup.append(carouselInner);

  const indicators = document.createElement('ol');
  indicators.classList.add('carousel-indicators');

  [...block.children].forEach((row, index) => {
    const carouselItem = document.createElement('div');
    carouselItem.classList.add(
      'carousel-item',
      'position-relative',
      'view-our-brands-banner-slick',
      // 'heroCarousel-0', // This class is dynamic, not static like heroCarousel-0
    );
    if (index === 0) {
      carouselItem.classList.add('active');
    }
    moveInstrumentation(row, carouselItem);

    const imageBox = document.createElement('div');
    imageBox.classList.add('image-box');
    carouselItem.append(imageBox);

    const bannerContentBox = document.createElement('div');
    bannerContentBox.classList.add('banner-content-box', 'align-Left');
    carouselItem.append(bannerContentBox);

    // BlockJson defines 4 fields: image, title, subtitle, cta
    // The JS should read exactly 4 cells per row in order.
    const cells = [...row.children];

    // Cell 0: Image
    const imageCell = cells[0];
    if (imageCell) {
      const picture = imageCell.querySelector('picture');
      const img = picture ? picture.querySelector('img') : null;
      if (img) {
        const newImg = document.createElement('img');
        newImg.src = img.src;
        newImg.alt = img.alt;
        newImg.classList.add('img-responsive');
        moveInstrumentation(imageCell, newImg);
        imageBox.append(newImg);
      }
    }

    // Cell 1: Title
    const titleCell = cells[1];
    if (titleCell) {
      const title = titleCell.querySelector('h3') || document.createElement('h3');
      if (!title.textContent && titleCell.textContent.trim()) {
        title.textContent = titleCell.textContent.trim();
      }
      title.classList.add('title');
      moveInstrumentation(titleCell, title);
      bannerContentBox.append(title);
    }

    // Cell 2: Subtitle
    const subtitleCell = cells[2];
    if (subtitleCell) {
      const subtitle = subtitleCell.querySelector('h4') || document.createElement('h4');
      if (!subtitle.textContent && subtitleCell.textContent.trim()) {
        // If it's a <p> tag, extract its content
        const pTag = subtitleCell.querySelector('p');
        if (pTag) {
          subtitle.innerHTML = pTag.innerHTML;
        } else {
          subtitle.textContent = subtitleCell.textContent.trim();
        }
      }
      subtitle.classList.add('sub_title');
      moveInstrumentation(subtitleCell, subtitle);
      bannerContentBox.append(subtitle);
    }

    // Cell 3: CTA
    const ctaCell = cells[3];
    if (ctaCell) {
      const link = ctaCell.querySelector('a');
      if (link) {
        const readMoreDiv = document.createElement('div');
        readMoreDiv.classList.add('read-more');
        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.textContent = link.textContent;
        moveInstrumentation(ctaCell, newLink);
        readMoreDiv.append(newLink);
        bannerContentBox.append(readMoreDiv);
      }
    }

    carouselInner.append(carouselItem);

    const indicator = document.createElement('li');
    indicator.setAttribute('data-target', '#heroCarousel');
    indicator.setAttribute('data-slide-to', index);
    if (index === 0) {
      indicator.classList.add('active');
    }
    indicators.append(indicator);
  });

  carouselInner.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  // Add carousel controls and indicators
  formGroup.prepend(indicators); // Indicators should be before carousel-inner

  const prevControl = document.createElement('a');
  prevControl.classList.add('carousel-control-prev');
  prevControl.href = '#heroCarousel';
  prevControl.setAttribute('role', 'button');
  prevControl.setAttribute('data-slide', 'prev');
  prevControl.innerHTML = '<span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span>';
  formGroup.append(prevControl);

  const nextControl = document.createElement('a');
  nextControl.classList.add('carousel-control-next');
  nextControl.href = '#heroCarousel';
  nextControl.setAttribute('role', 'button');
  nextControl.setAttribute('data-slide', 'next');
  nextControl.innerHTML = '<span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span>';
  formGroup.append(nextControl);

  block.textContent = '';
  block.append(section);

  // Add event listeners for carousel controls (if not handled by Bootstrap JS, which EDS doesn't use)
  // This is a basic implementation, a full carousel would need more logic.
  const carouselControls = section.querySelectorAll('[data-slide]');
  carouselControls.forEach((control) => {
    control.addEventListener('click', (e) => {
      e.preventDefault();
      const targetCarousel = document.getElementById(control.getAttribute('href').substring(1));
      if (!targetCarousel) return;

      const items = [...targetCarousel.querySelectorAll('.carousel-item')];
      const activeItem = targetCarousel.querySelector('.carousel-item.active');
      let activeIndex = items.indexOf(activeItem);

      if (control.getAttribute('data-slide') === 'next') {
        activeIndex = (activeIndex + 1) % items.length;
      } else if (control.getAttribute('data-slide') === 'prev') {
        activeIndex = (activeIndex - 1 + items.length) % items.length;
      } else if (control.getAttribute('data-slide-to')) { // For indicators
        activeIndex = parseInt(control.getAttribute('data-slide-to'), 10);
      }

      items.forEach((item, idx) => {
        item.classList.remove('active');
        indicators.children[idx].classList.remove('active');
      });
      items[activeIndex].classList.add('active');
      indicators.children[activeIndex].classList.add('active');
    });
  });
}
