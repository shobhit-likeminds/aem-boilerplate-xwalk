import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, ...slideRows] = [...block.children];

  // Section Header
  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center');
  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
  // CRITICAL FIX: Use content detection instead of direct index access for headingRow
  const headingCell = [...headingRow.children].find((cell) => cell.textContent.trim());
  if (headingCell) {
    heading.textContent = headingCell.textContent.trim();
    moveInstrumentation(headingCell, heading);
  }
  sectionHeader.append(heading);

  // Slides Container
  const positionRelativeDiv = document.createElement('div');
  positionRelativeDiv.classList.add('position-relative', 'aos-init', 'aos-animate');

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container');

  const gridLayoutDiv = document.createElement('div');
  gridLayoutDiv.classList.add('grid-layout');

  slideRows.forEach((row) => {
    const cells = [...row.children];
    // Destructuring is safe here as per EDS Block Structure for uniform item rows
    const imageCell = cells[0];
    const altTextCell = cells[1];
    const titleCell = cells[2];
    const descriptionCell = cells[3];
    const linkCell = cells[4];
    const linkLabelCell = cells[5];

    const slideDiv = document.createElement('div');
    slideDiv.classList.add('slides');

    const wrapDiv = document.createElement('div');
    wrapDiv.classList.add('wrap');

    // Image
    const imageWrapDiv = document.createElement('div');
    imageWrapDiv.classList.add('image-wrap');
    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, altTextCell?.textContent.trim() || '', false, [{ width: '750' }]);
        optimizedPic.querySelector('img').classList.add('img-fluid');
        moveInstrumentation(picture, optimizedPic.querySelector('img'));
        imageWrapDiv.append(optimizedPic);
      }
    }
    moveInstrumentation(imageCell, imageWrapDiv);

    // Content
    const contentWrapDiv = document.createElement('div');
    contentWrapDiv.classList.add('content-wrap');

    const contentSectionHeader = document.createElement('div');
    contentSectionHeader.classList.add('section-header');

    const title = document.createElement('h3');
    title.classList.add('heading', 'font-regular');
    if (titleCell) {
      title.textContent = titleCell.textContent.trim();
      moveInstrumentation(titleCell, title);
    }

    const description = document.createElement('p');
    description.classList.add('text-size-body');
    if (descriptionCell) {
      description.textContent = descriptionCell.textContent.trim();
      moveInstrumentation(descriptionCell, description);
    }

    const link = document.createElement('a');
    link.classList.add('btn', 'btn-primary', 'stretched-link');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      // CRITICAL FIX: Read href from the <a> tag, not textContent of the cell
      link.href = foundLink.href;
      link.textContent = linkLabelCell?.textContent.trim();
      moveInstrumentation(linkLabelCell, link);
      moveInstrumentation(linkCell, link); // Also move instrumentation from the link cell itself
    }


    contentSectionHeader.append(title, description, link);
    contentWrapDiv.append(contentSectionHeader);

    wrapDiv.append(imageWrapDiv, contentWrapDiv);
    slideDiv.append(wrapDiv);
    moveInstrumentation(row, slideDiv);
    gridLayoutDiv.append(slideDiv);
  });

  containerDiv.append(gridLayoutDiv);
  positionRelativeDiv.append(containerDiv);

  block.innerHTML = '';
  block.classList.add('section', 'work-with-us', 'pb-0');
  block.append(sectionHeader, positionRelativeDiv);
}
