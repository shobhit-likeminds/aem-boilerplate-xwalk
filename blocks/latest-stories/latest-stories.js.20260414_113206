import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center');

  // BlockJson indicates 'heading' is the first root field
  const headingWrapper = children[0];
  const heading = document.createElement('h2');
  moveInstrumentation(headingWrapper, heading);
  heading.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
  heading.setAttribute('data-aos', 'fade-up');
  heading.setAttribute('data-aos-offset', '100');
  heading.setAttribute('data-aos-duration', '650');
  heading.setAttribute('data-aos-easing', 'ease-in-out');
  heading.textContent = headingWrapper.textContent.trim();
  sectionHeader.append(heading);

  const container = document.createElement('div');
  container.classList.add('container', 'aos-init', 'aos-animate');
  container.setAttribute('data-aos', 'fade-up');
  container.setAttribute('data-aos-offset', '100');
  container.setAttribute('data-aos-duration', '650');
  container.setAttribute('data-aos-easing', 'ease-in-out');

  const flickitySliderWrap = document.createElement('div');
  flickitySliderWrap.classList.add('flickity-slider-mobile-wrap', 'grid-layout');
  flickitySliderWrap.setAttribute('data-flickity', '{ "wrapAround": false, "lazyLoad": true, "pageDots": true, "prevNextButtons": false, "imagesLoaded": true, "cellAlign": "left", "watchCSS": true, "adaptiveHeight": true }');

  const slidesContainer = document.createElement('div');
  slidesContainer.classList.add('slides'); // This is the container for all slides

  // Iterate over story item rows, starting from the second child of the block
  children.slice(1).forEach((row) => {
    const cells = [...row.children];

    // Content detection for cells based on BlockJson and HTML structure
    const imageCell = cells.find(cell => cell.querySelector('picture') || cell.querySelector('img.thumb-img'));
    const categoryCell = cells.find(cell => !cell.querySelector('picture') && !cell.querySelector('img.thumb-img') && !cell.querySelector('a') && cell.textContent.trim().toLowerCase() === 'farm'); // More specific detection if needed
    const textCell = cells.find(cell => !cell.querySelector('picture') && !cell.querySelector('img.thumb-img') && !cell.querySelector('a') && cell.textContent.trim().length > 10 && !cell.querySelector('time')); // Heuristic for text
    const ctaLinkCell = cells.find(cell => cell.querySelector('a') && cell.querySelector('a').href.includes('mahindra.com/news-room'));
    const ctaLinkLabelCell = cells.find(cell => cell.querySelector('a') && cell.querySelector('a').textContent.trim().toLowerCase() === 'read more');
    const dateCell = cells.find(cell => cell.querySelector('time'));

    const slide = document.createElement('div');
    moveInstrumentation(row, slide);
    slide.classList.add('slides'); // Each individual slide also has the 'slides' class

    const wrap = document.createElement('div');
    wrap.classList.add('wrap');

    const imageWrap = document.createElement('div');
    imageWrap.classList.add('image-wrap');
    const picture = imageCell?.querySelector('picture');
    const imgElement = imageCell?.querySelector('img.thumb-img'); // Also check for direct img
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      imageWrap.append(optimizedPic);
    } else if (imgElement) {
        // If it's a direct img, optimize it
        const optimizedPic = createOptimizedPicture(imgElement.src, imgElement.alt, false, [{ width: '750' }]);
        moveInstrumentation(imgElement, optimizedPic.querySelector('img'));
        imageWrap.append(optimizedPic);
    }
    wrap.append(imageWrap);

    const contentWrap = document.createElement('div');
    contentWrap.classList.add('content-wrap');

    if (categoryCell) {
      const category = document.createElement('div');
      category.classList.add('category');
      category.textContent = categoryCell.textContent.trim();
      contentWrap.append(category);
    }

    if (textCell) {
      const text = document.createElement('div');
      text.classList.add('text');
      text.textContent = textCell.textContent.trim();
      contentWrap.append(text);
    }

    if (ctaLinkCell && ctaLinkLabelCell) {
      const ctaLink = document.createElement('a');
      ctaLink.classList.add('btn', 'btn-link');
      const originalCtaLink = ctaLinkCell.querySelector('a');
      if (originalCtaLink) {
        ctaLink.href = originalCtaLink.href;
      }
      ctaLink.textContent = ctaLinkLabelCell.textContent.trim();
      moveInstrumentation(ctaLinkCell, ctaLink);
      contentWrap.append(ctaLink);
    }

    if (dateCell) {
      const date = document.createElement('div');
      date.classList.add('date');
      const time = document.createElement('time');
      // Assuming date cell contains a valid datetime string or a <time> element
      const originalTime = dateCell.querySelector('time');
      if (originalTime) {
        time.setAttribute('datetime', originalTime.getAttribute('datetime'));
        time.textContent = originalTime.textContent.trim();
      } else {
        time.setAttribute('datetime', dateCell.textContent.trim());
        time.textContent = dateCell.textContent.trim();
      }
      date.append(time);
      contentWrap.append(date);
    }

    wrap.append(contentWrap);
    slide.append(wrap);
    slidesContainer.append(slide);
  });

  flickitySliderWrap.append(slidesContainer);
  container.append(flickitySliderWrap);

  block.textContent = '';
  block.classList.add('section', 'grey-bg', 'latest-stories', 'home-stories');
  block.append(sectionHeader, container);
}
