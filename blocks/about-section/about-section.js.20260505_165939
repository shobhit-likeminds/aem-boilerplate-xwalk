import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Destructure root rows based on BlockJson model
  const [
    sectionTitleRow,
    aboutTextRow,
    aboutPointerImageRow,
    aboutMainImageRow,
    featuresTitleRow,
    ...featureRows
  ] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('about-section');
  moveInstrumentation(block, section); // Move instrumentation from block to the new root section

  const h2 = document.createElement('h2');
  h2.textContent = sectionTitleRow.textContent.trim();
  moveInstrumentation(sectionTitleRow, h2);
  section.append(h2);

  const container = document.createElement('div');
  container.classList.add('container');

  const row = document.createElement('div');
  row.classList.add('row', 'align-items-center');

  const col1 = document.createElement('div');
  col1.classList.add('col-lg-6', 'col-md-6', 'col-12', 'order-lg-1', 'order-md-1', 'order-2');

  // aboutText is richtext, read innerHTML directly from the cell
  const p = document.createElement('p');
  p.innerHTML = aboutTextRow.children[0]?.innerHTML || ''; // Corrected: read from cell, not row
  moveInstrumentation(aboutTextRow, p); // Move instrumentation from aboutTextRow to p

  const aboutPointerImage = aboutPointerImageRow.children[0]?.querySelector('picture'); // Access cell first
  if (aboutPointerImage) {
    const img = aboutPointerImage.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    optimizedPic.classList.add('img-fluid', 'about-pointer');
    p.append(optimizedPic);
  }
  moveInstrumentation(aboutPointerImageRow, p); // Move instrumentation from aboutPointerImageRow to p
  col1.append(p);
  row.append(col1);

  const col2 = document.createElement('div');
  col2.classList.add('col-lg-6', 'col-md-6', 'col-12', 'order-lg-2', 'order-md-2', 'order-1');

  const aboutMainImage = aboutMainImageRow.children[0]?.querySelector('picture'); // Access cell first
  if (aboutMainImage) {
    const img = aboutMainImage.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    optimizedPic.classList.add('img-fluid');
    col2.append(optimizedPic);
  }
  moveInstrumentation(aboutMainImageRow, col2); // Move instrumentation from aboutMainImageRow to col2
  row.append(col2);
  container.append(row);
  section.append(container);

  const featuresContainer = document.createElement('div');
  featuresContainer.classList.add('container');

  const aboutContainer = document.createElement('div');
  aboutContainer.classList.add('about-container', 'shadow-lg');

  const h4 = document.createElement('h4');
  h4.textContent = featuresTitleRow.textContent.trim();
  moveInstrumentation(featuresTitleRow, h4);
  aboutContainer.append(h4);

  const featuresRow = document.createElement('div');
  featuresRow.classList.add('row');

  featureRows.forEach((rowEl) => {
    // Destructure feature item cells based on 'about-feature-item' model
    const [featureImageCell, featureTitleCell, featureDescriptionCell] = [...rowEl.children];

    const featureCol = document.createElement('div');
    featureCol.classList.add('col-lg-4', 'col-md-6', 'col-12');

    const featureImage = featureImageCell.querySelector('picture');
    if (featureImage) {
      const img = featureImage.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.classList.add('img-fluid');
      featureCol.append(optimizedPic);
    }
    moveInstrumentation(featureImageCell, featureCol); // Move instrumentation from featureImageCell to featureCol

    const h5 = document.createElement('h5');
    h5.textContent = featureTitleCell.textContent.trim();
    moveInstrumentation(featureTitleCell, h5); // Move instrumentation from featureTitleCell to h5
    featureCol.append(h5);

    // featureDescription is richtext, read innerHTML directly from the cell
    const featureDescription = document.createElement('p');
    featureDescription.innerHTML = featureDescriptionCell.innerHTML; // Corrected: read innerHTML directly
    moveInstrumentation(featureDescriptionCell, featureDescription); // Move instrumentation from featureDescriptionCell to featureDescription
    featureCol.append(featureDescription);

    moveInstrumentation(rowEl, featureCol); // Move instrumentation from rowEl to featureCol
    featuresRow.append(featureCol);
  });

  aboutContainer.append(featuresRow);
  featuresContainer.append(aboutContainer);
  section.append(featuresContainer);

  block.replaceChildren(section);
}
