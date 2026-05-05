import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Destructure root rows based on BlockJson model
  const [headingRow, pointerImageRow, ...serviceCardRows] = [...block.children];

  const section = document.createElement('section');
  section.id = 'services'; // From original HTML

  const containerTop = document.createElement('div');
  containerTop.classList.add('container', 'position-relative');
  moveInstrumentation(headingRow, containerTop); // Move instrumentation from heading row

  const heading = document.createElement('h2');
  heading.textContent = headingRow.textContent.trim();
  containerTop.append(heading);

  // Handle pointer image
  if (pointerImageRow) {
    const picture = pointerImageRow.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      const optimizedImg = optimizedPic.querySelector('img');
      optimizedImg.classList.add('pointer'); // From original HTML
      // moveInstrumentation(img, optimizedImg); // moveInstrumentation should be on the cell or row, not the img
      containerTop.append(optimizedPic);
    }
  }

  section.append(containerTop);

  const containerBottom = document.createElement('div');
  containerBottom.classList.add('container');

  const row = document.createElement('div');
  row.classList.add('row', 'justify-content-around');
  containerBottom.append(row);

  serviceCardRows.forEach((cardRow) => {
    // Destructure cells for each service card row
    const [linkCell, imageCell, titleCell, descriptionCell, ctaLabelCell] = [...cardRow.children];

    const serviceCardLink = document.createElement('a');
    serviceCardLink.classList.add('d-block', 'col-lg-4', 'col-md-6', 'col-12', 'service-card');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      serviceCardLink.href = foundLink.href;
    }
    moveInstrumentation(cardRow, serviceCardLink);

    if (imageCell) {
      const picture = imageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        const optimizedImg = optimizedPic.querySelector('img');
        optimizedImg.classList.add('img-fluid', 'service-img'); // From original HTML
        // moveInstrumentation(img, optimizedImg); // moveInstrumentation should be on the cell or row, not the img
        serviceCardLink.append(optimizedPic);
      }
    }

    if (titleCell) {
      const title = document.createElement('h3');
      title.textContent = titleCell.textContent.trim();
      serviceCardLink.append(title);
    }

    if (descriptionCell) {
      const description = document.createElement('p');
      description.innerHTML = descriptionCell.innerHTML; // Richtext content
      serviceCardLink.append(description);
    }

    if (ctaLabelCell) {
      const button = document.createElement('button');
      button.textContent = ctaLabelCell.textContent.trim();
      serviceCardLink.append(button);
    }

    row.append(serviceCardLink);
  });

  section.append(containerBottom);
  block.replaceChildren(section);
}
