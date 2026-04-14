import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  // Header
  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center', 'pb-3');

  // Use content detection for header elements
  const headingWrapper = children.find(row => row.querySelector('h1, h2, h3, h4, h5, h6'));
  const descriptionWrapper = children.find(row => row.querySelector('p') && row !== headingWrapper);

  if (headingWrapper) {
    const h2 = document.createElement('h2');
    h2.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
    h2.setAttribute('data-aos-easing', 'ease-in-out');
    h2.setAttribute('data-aos', 'fade-up');
    h2.setAttribute('data-aos-delay', '200');
    moveInstrumentation(headingWrapper, h2);
    h2.innerHTML = headingWrapper.firstElementChild.innerHTML;
    sectionHeader.append(h2);
  }

  if (descriptionWrapper) {
    const p = document.createElement('p');
    p.classList.add('aos-init', 'aos-animate');
    p.setAttribute('data-aos', 'fade-up');
    p.setAttribute('data-aos-offset', '100');
    p.setAttribute('data-aos-duration', '650');
    p.setAttribute('data-aos-easing', 'ease-in-out');
    moveInstrumentation(descriptionWrapper, p);
    p.innerHTML = descriptionWrapper.firstElementChild.innerHTML;
    sectionHeader.append(p);
  }

  // Grid
  const gridRow = document.createElement('div');
  gridRow.classList.add('row', 'g-4', 'purpose-led-grid', 'pt-3');

  // All remaining rows are cards. Filter out the header rows.
  const cardRows = children.filter(row => row !== headingWrapper && row !== descriptionWrapper);

  cardRows.forEach((row) => {
    // Destructuring is safe here because the EDS block structure guarantees 4 cells per card row.
    const [imageCell, linkCell, linkLabelCell, textCell] = [...row.children];

    const col = document.createElement('div');
    col.classList.add('col-md-6', 'aos-init', 'aos-animate');
    col.setAttribute('data-aos-easing', 'ease-in-out');
    col.setAttribute('data-aos', 'fade-up');
    col.setAttribute('data-aos-delay', '700'); // Delay is fixed in original HTML

    const anchor = document.createElement('a');
    anchor.classList.add('card-wrap');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      anchor.href = foundLink.href;
      anchor.target = '_blank'; // Original HTML has target="_blank"
    }
    moveInstrumentation(row, anchor);

    const cardImage = document.createElement('div');
    cardImage.classList.add('card-image');
    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '576' }, { width: '1200' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('img-fluid'); // Add img-fluid to the img inside picture
      cardImage.append(optimizedPic);
    }
    anchor.append(cardImage);

    const cardText = document.createElement('div');
    cardText.classList.add('card-text');
    const descP = document.createElement('p');
    descP.classList.add('desc');
    moveInstrumentation(textCell, descP);
    descP.innerHTML = textCell.innerHTML; // Rich text content including <p> tags
    cardText.append(descP);
    anchor.append(cardText);

    col.append(anchor);
    gridRow.append(col);
  });

  block.textContent = ''; // Clear the block content
  block.append(sectionHeader);
  block.append(gridRow);
}
