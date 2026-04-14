import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, ...storyRows] = [...block.children];

  // Section wrapper
  const section = document.createElement('section');
  section.classList.add('section', 'grey-bg', 'latest-stories', 'home-stories');
  moveInstrumentation(block, section);

  // Section header
  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center');
  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
  moveInstrumentation(headingRow.firstElementChild, heading);
  heading.textContent = headingRow.firstElementChild.textContent.trim();
  sectionHeader.append(heading);
  section.append(sectionHeader);

  // Stories container
  const container = document.createElement('div');
  container.classList.add('container', 'aos-init', 'aos-animate');
  const flickityWrap = document.createElement('div');
  flickityWrap.classList.add('flickity-slider-mobile-wrap', 'grid-layout');
  flickityWrap.setAttribute('data-flickity', '{ "wrapAround": false, "lazyLoad": true, "pageDots": true, "prevNextButtons": false, "imagesLoaded": true, "cellAlign": "left", "watchCSS": true, "adaptiveHeight": true }');
  const slidesContainer = document.createElement('div');
  slidesContainer.classList.add('slides');

  storyRows.forEach((row) => {
    const cells = [...row.children];

    // Use content detection instead of index access for robustness
    const imageCell = cells.find(cell => cell.querySelector('picture'));
    const categoryCell = cells.find(cell => !cell.querySelector('picture') && !cell.querySelector('a') && cell.textContent.trim().length > 0); // Assuming category is first text cell without picture/link
    const textCell = cells.find((cell, i) => i > cells.indexOf(categoryCell) && !cell.querySelector('picture') && !cell.querySelector('a') && cell.textContent.trim().length > 0); // Assuming text is after category
    const linkCell = cells.find(cell => cell.querySelector('a'));
    const linkLabelCell = cells.find((cell, i) => i > cells.indexOf(linkCell) && !cell.querySelector('picture') && !cell.querySelector('a') && cell.textContent.trim().length > 0); // Assuming linkLabel is after link
    const dateCell = cells.find((cell, i) => i > cells.indexOf(linkLabelCell) && !cell.querySelector('picture') && !cell.querySelector('a') && cell.textContent.trim().length > 0); // Assuming date is last text cell

    const slide = document.createElement('div');
    slide.classList.add('slide'); // Corrected class name from 'slides' to 'slide'

    const wrap = document.createElement('div');
    wrap.classList.add('wrap');

    // Image
    if (imageCell) {
      const imageWrap = document.createElement('div');
      imageWrap.classList.add('image-wrap');
      const picture = imageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          imageWrap.append(optimizedPic);
          const newImg = optimizedPic.querySelector('img');
          newImg.classList.add('thumb-img', 'img-fluid');
          // Copy data attributes from original HTML if they exist
          if (img.dataset.imgHorizontal) {
            newImg.dataset.imgHorizontal = img.dataset.imgHorizontal;
          }
          if (img.dataset.imgVertical) {
            newImg.dataset.imgVertical = img.dataset.imgVertical;
          }
        }
      }
      wrap.append(imageWrap);
    }

    // Content wrap
    const contentWrap = document.createElement('div');
    contentWrap.classList.add('content-wrap');

    // Category
    if (categoryCell) {
      const category = document.createElement('div');
      category.classList.add('category');
      moveInstrumentation(categoryCell, category);
      category.textContent = categoryCell.textContent.trim();
      contentWrap.append(category);
    }

    // Text
    if (textCell) {
      const text = document.createElement('div');
      text.classList.add('text');
      moveInstrumentation(textCell, text);
      text.textContent = textCell.textContent.trim();
      contentWrap.append(text);
    }

    // Link
    if (linkCell && linkLabelCell) {
      const link = document.createElement('a');
      link.classList.add('btn', 'btn-link');
      const foundLink = linkCell.querySelector('a');
      if (foundLink) {
        link.href = foundLink.href;
      }
      moveInstrumentation(linkLabelCell, link);
      link.textContent = linkLabelCell.textContent.trim();
      contentWrap.append(link);
    }

    // Date
    if (dateCell) {
      const date = document.createElement('div');
      date.classList.add('date');
      moveInstrumentation(dateCell, date);
      const time = document.createElement('time');
      time.textContent = dateCell.textContent.trim();
      try {
        const d = new Date(dateCell.textContent.trim());
        if (!isNaN(d)) {
          time.setAttribute('datetime', d.toISOString());
        }
      } catch (e) {
        // ignore
      }
      date.append(time);
      contentWrap.append(date);
    }

    wrap.append(contentWrap);
    slide.append(wrap);
    slidesContainer.append(slide);
    moveInstrumentation(row, slide);
  });

  flickityWrap.append(slidesContainer);
  container.append(flickityWrap);
  section.append(container);

  block.textContent = '';
  block.append(section);
}
