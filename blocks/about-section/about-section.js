import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The outer block div already has 'about-section' class. Do not add it to an inner wrapper.
  const section = document.createElement('section');
  // section.classList.add('about-section'); // Removed - outer block div already has this class

  const children = [...block.children];

  // Row 0: headline
  const headlineRow = children[0];
  const headline = document.createElement('h2');
  moveInstrumentation(headlineRow, headline);
  // headline is type=text, content is directly in the first child div
  headline.textContent = headlineRow.children[0]?.textContent.trim() || '';
  section.append(headline);

  const container1 = document.createElement('div');
  container1.classList.add('container');
  const row1 = document.createElement('div');
  row1.classList.add('row', 'align-items-center');
  container1.append(row1);

  // Row 1: description, Row 2: descriptionImage
  const descriptionRow = children[1];
  const descriptionImageRow = children[2];

  const col1 = document.createElement('div');
  col1.classList.add('col-lg-6', 'col-md-6', 'col-12', 'order-lg-1', 'order-md-1', 'order-2');
  const p = document.createElement('p');
  moveInstrumentation(descriptionRow, p);
  // description is type=richtext, content is directly in the first child div, may contain <p>
  // Assigning innerHTML of a cell containing <p> to another <p> creates invalid nesting <p><p>
  // Use a div as a container for richtext, or extract innerHTML from the <p> if a <p> is strictly required by CSS.
  // Given original HTML has <p> directly inside col, we will try to mimic that.
  // The original HTML has the image *inside* the paragraph, so we'll append to the paragraph.
  p.innerHTML = descriptionRow.children[0]?.innerHTML || '';

  const descriptionPicture = descriptionImageRow.querySelector('picture');
  if (descriptionPicture) {
    const img = descriptionPicture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      // moveInstrumentation should be called on the original img element, not the optimized one's img
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('img-fluid', 'about-pointer');
      p.append(optimizedPic); // Append the picture to the paragraph as per original HTML
    }
  }
  moveInstrumentation(descriptionImageRow, col1); // Move instrumentation for the image row to the column
  col1.append(p);
  row1.append(col1);

  // Row 3: mainImage
  const mainImageRow = children[3];
  const col2 = document.createElement('div');
  col2.classList.add('col-lg-6', 'col-md-6', 'col-12', 'order-lg-2', 'order-md-2', 'order-1');
  const mainPicture = mainImageRow.querySelector('picture');
  if (mainPicture) {
    const img = mainPicture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('img-fluid');
      col2.append(optimizedPic);
    }
  }
  moveInstrumentation(mainImageRow, col2); // Move instrumentation for the main image row to the column
  row1.append(col2);

  section.append(container1);

  // Row 4: featuresHeadline
  const featuresHeadlineRow = children[4];
  const container2 = document.createElement('div');
  container2.classList.add('container');
  const aboutContainer = document.createElement('div');
  aboutContainer.classList.add('about-container', 'shadow-lg');
  const h4 = document.createElement('h4');
  moveInstrumentation(featuresHeadlineRow, h4);
  // featuresHeadline is type=text, content is directly in the first child div
  h4.textContent = featuresHeadlineRow.children[0]?.textContent.trim() || '';
  aboutContainer.append(h4);

  const row2 = document.createElement('div');
  row2.classList.add('row');
  aboutContainer.append(row2);

  // Remaining rows are feature items
  const featureRows = children.slice(5);
  featureRows.forEach((row) => {
    // Fixed schema for 'about-feature-item', use destructuring
    const [iconCell, titleCell, featureDescriptionCell] = [...row.children];

    const col3 = document.createElement('div');
    col3.classList.add('col-lg-4', 'col-md-6', 'col-12');

    const iconPicture = iconCell.querySelector('picture');
    if (iconPicture) {
      const img = iconPicture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        optimizedPic.querySelector('img').classList.add('img-fluid');
        col3.append(optimizedPic);
      }
    }

    const h5 = document.createElement('h5');
    // title is type=text, content is directly in the first child div
    h5.textContent = titleCell.children[0]?.textContent.trim() || '';
    col3.append(h5);

    const featureDescriptionP = document.createElement('p');
    // featureDescription is type=richtext, content is directly in the first child div
    // Assigning innerHTML of a cell containing <p> to another <p> creates invalid nesting <p><p>
    // Extract innerHTML from the <p> inside the cell, or use a div if <p> is not strictly required.
    // Original HTML uses <p> for this, so we'll extract the inner content.
    featureDescriptionP.innerHTML = featureDescriptionCell.querySelector('p')?.innerHTML ?? featureDescriptionCell.textContent.trim() ?? '';
    col3.append(featureDescriptionP);

    moveInstrumentation(row, col3); // Move instrumentation for the feature item row to its column
    row2.append(col3);
  });

  container2.append(aboutContainer);
  section.append(container2);

  block.replaceChildren(section);
}
