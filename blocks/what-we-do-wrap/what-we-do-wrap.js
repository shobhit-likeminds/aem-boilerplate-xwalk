import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, descriptionRow, ...itemRows] = [...block.children];

  // Section Header
  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center');

  const heading = document.createElement('h2');
  moveInstrumentation(headingRow.firstElementChild, heading);
  heading.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
  heading.textContent = headingRow.firstElementChild.textContent.trim();
  sectionHeader.append(heading);

  const description = document.createElement('p');
  moveInstrumentation(descriptionRow.firstElementChild, description);
  description.classList.add('aos-init', 'aos-animate');
  description.innerHTML = descriptionRow.firstElementChild.innerHTML;
  sectionHeader.append(description);

  const headerContainer = document.createElement('div');
  headerContainer.classList.add('container');
  headerContainer.append(sectionHeader);

  // Business Verticals (Desktop)
  const ourBusinessVerticals = document.createElement('div');
  ourBusinessVerticals.classList.add('our-business-verticals');

  const desktopContainer = document.createElement('div');
  desktopContainer.classList.add('container', 'd-lg-block', 'd-none');
  const desktopRow = document.createElement('div');
  desktopRow.classList.add('row', 'row-cols-lg-3', 'row-cols-1', 'g-3');

  itemRows.forEach((row) => {
    const cells = [...row.children];
    const imageCell = cells.find(cell => cell.querySelector('picture'));
    const titleCell = cells.find(cell => !cell.querySelector('picture') && !cell.querySelector('a'));
    const linkCell = cells.find(cell => cell.querySelector('a'));
    // Assuming linkLabelCell is the cell containing the text content for aria-label,
    // which might be the same as linkCell's text content if no separate cell is provided.
    // For robustness, we'll use the text content of the link cell itself if a separate label cell isn't clear.
    // Based on the EDS structure, linkLabel is a separate text field, so it should be the last cell.
    const linkLabelCell = cells[cells.length - 1];


    const col = document.createElement('div');
    moveInstrumentation(row, col);
    col.classList.add('col', 'aos-init', 'aos-animate');

    const wrap = document.createElement('div');
    wrap.classList.add('wrap');

    const imageDiv = document.createElement('div');
    imageDiv.classList.add('image');
    if (imageCell) {
      const picture = imageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '376' }]);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          imageDiv.append(optimizedPic);
        }
      }
    }
    wrap.append(imageDiv);

    const titleDiv = document.createElement('div');
    titleDiv.classList.add('title');
    if (titleCell) {
      moveInstrumentation(titleCell, titleDiv);
      titleDiv.innerHTML = titleCell.innerHTML; // Title might contain an image/icon
    }
    wrap.append(titleDiv);

    const linkEl = document.createElement('a');
    if (linkCell) {
      const foundLink = linkCell.querySelector('a');
      if (foundLink) {
        linkEl.href = foundLink.href;
        linkEl.classList.add('stretched-link');
        // Use linkLabelCell's text content for aria-label if it exists, otherwise fallback to link text
        linkEl.setAttribute('aria-label', linkLabelCell ? linkLabelCell.textContent.trim() : foundLink.textContent.trim());
        moveInstrumentation(linkCell, linkEl);
      }
    }
    wrap.append(linkEl);
    col.append(wrap);
    desktopRow.append(col);
  });
  desktopContainer.append(desktopRow);
  ourBusinessVerticals.append(desktopContainer);

  // Mobile Slider
  const mobileContainer = document.createElement('div');
  mobileContainer.classList.add('container', 'd-lg-none', 'd-block', 'aos-init', 'aos-animate');
  mobileContainer.setAttribute('data-aos', 'fade-up');
  mobileContainer.setAttribute('data-aos-offset', '100');
  mobileContainer.setAttribute('data-aos-duration', '650');
  mobileContainer.setAttribute('data-aos-easing', 'ease-in-out');

  const mobileSlider = document.createElement('div');
  mobileSlider.classList.add('mobile-slider');
  mobileSlider.setAttribute('data-flickity', '{ "wrapAround": false, "lazyLoad": true, "pageDots": true, "prevNextButtons": false, "imagesLoaded": true, "cellAlign": "left", "adaptiveHeight": true }');

  // Group items into slides of 3 for mobile
  const slides = [];
  for (let i = 0; i < itemRows.length; i += 3) {
    slides.push(itemRows.slice(i, i + 3));
  }

  slides.forEach((slideItems, slideIndex) => {
    const slideDiv = document.createElement('div');
    slideDiv.classList.add('slides');
    if (slideIndex === 0) slideDiv.classList.add('is-selected');

    const slideRow = document.createElement('div');
    slideRow.classList.add('row', 'row-cols-1', 'gy-3');

    slideItems.forEach((row) => {
      const cells = [...row.children];
      const imageCell = cells.find(cell => cell.querySelector('picture'));
      const titleCell = cells.find(cell => !cell.querySelector('picture') && !cell.querySelector('a'));
      const linkCell = cells.find(cell => cell.querySelector('a'));
      const linkLabelCell = cells[cells.length - 1];

      const col = document.createElement('div');
      col.classList.add('col');

      const wrap = document.createElement('div');
      wrap.classList.add('wrap');

      const imageDiv = document.createElement('div');
      imageDiv.classList.add('image');
      if (imageCell) {
        const picture = imageCell.querySelector('picture');
        if (picture) {
          const img = picture.querySelector('img');
          if (img) {
            const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '376' }]);
            moveInstrumentation(img, optimizedPic.querySelector('img'));
            imageDiv.append(optimizedPic);
          }
        }
      }
      wrap.append(imageDiv);

      const titleDiv = document.createElement('div');
      titleDiv.classList.add('title');
      if (titleCell) {
        moveInstrumentation(titleCell, titleDiv);
        titleDiv.innerHTML = titleCell.innerHTML;
      }
      wrap.append(titleDiv);

      const linkEl = document.createElement('a');
      if (linkCell) {
        const foundLink = linkCell.querySelector('a');
        if (foundLink) {
          linkEl.href = foundLink.href;
          linkEl.classList.add('stretched-link');
          linkEl.setAttribute('aria-label', linkLabelCell ? linkLabelCell.textContent.trim() : foundLink.textContent.trim());
          moveInstrumentation(linkCell, linkEl);
        }
      }
      wrap.append(linkEl);
      col.append(wrap);
      slideRow.append(col);
    });
    slideDiv.append(slideRow);
    mobileSlider.append(slideDiv);
  });

  mobileContainer.append(mobileSlider);
  ourBusinessVerticals.append(mobileContainer);

  block.textContent = '';
  block.append(headerContainer, ourBusinessVerticals);
}
