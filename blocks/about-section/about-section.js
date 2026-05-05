import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  const [
    mainTitleRow,
    descriptionRow,
    aboutPointerImageRow,
    aboutMainImageRow,
    featuresTitleRow,
    ...featureItemRows
  ] = children;

  const section = document.createElement('section');
  section.classList.add('about-section');
  moveInstrumentation(block, section);

  // Main Title
  const mainTitle = document.createElement('h2');
  mainTitle.textContent = mainTitleRow.textContent.trim();
  moveInstrumentation(mainTitleRow, mainTitle);
  section.append(mainTitle);

  // About Section - Top part
  const container1 = document.createElement('div');
  container1.classList.add('container');
  moveInstrumentation(descriptionRow, container1); // Instrumentation for the container that holds description and main image

  const row1 = document.createElement('div');
  row1.classList.add('row', 'align-items-center');

  const colLeft = document.createElement('div');
  colLeft.classList.add('col-lg-6', 'col-md-6', 'col-12', 'order-lg-1', 'order-md-1', 'order-2');
  moveInstrumentation(descriptionRow, colLeft);

  const descriptionP = document.createElement('p');
  // Richtext cell's innerHTML is "<p>content</p>", so extract content or use a div
  // FIX: descriptionRow is a row, its innerHTML is <div><p>content</p></div>.
  // We need the content of the cell, which is descriptionRow.children[0].
  // The original HTML shows <p> directly inside the col-lg-6, so we want to extract the <p> content.
  // However, the BlockJson says 'richtext' for 'description', meaning the cell itself contains the <p> tags.
  // So, descriptionRow.children[0] is the cell, and its innerHTML is "<p>About Description...</p>".
  // Assigning this to descriptionP.innerHTML creates <p><p>...</p></p>, which is invalid.
  // The correct approach for richtext is to use a <div> as the container, or extract the innerHTML of the <p> if a <p> is strictly required.
  // Given the original HTML has a <p> directly inside the col, and the cell contains <p>...</p>,
  // we should extract the innerHTML of the paragraph within the cell.
  descriptionP.innerHTML = descriptionRow.children[0]?.querySelector('p')?.innerHTML || '';

  // Append pointer image inside the description paragraph
  const pointerPicture = aboutPointerImageRow.querySelector('picture');
  if (pointerPicture) {
    const pointerImg = pointerPicture.querySelector('img');
    if (pointerImg) {
      const optimizedPointerPic = createOptimizedPicture(pointerImg.src, pointerImg.alt, false, [{ width: '750' }]);
      const newPointerImg = optimizedPointerPic.querySelector('img');
      newPointerImg.classList.add('img-fluid', 'about-pointer');
      moveInstrumentation(aboutPointerImageRow, newPointerImg);
      descriptionP.append(newPointerImg);
    }
  }
  colLeft.append(descriptionP);
  row1.append(colLeft);

  const colRight = document.createElement('div');
  colRight.classList.add('col-lg-6', 'col-md-6', 'col-12', 'order-lg-2', 'order-md-2', 'order-1');
  moveInstrumentation(aboutMainImageRow, colRight);

  const mainPicture = aboutMainImageRow.querySelector('picture');
  if (mainPicture) {
    const mainImg = mainPicture.querySelector('img');
    if (mainImg) {
      const optimizedMainPic = createOptimizedPicture(mainImg.src, mainImg.alt, false, [{ width: '750' }]);
      const newMainImg = optimizedMainPic.querySelector('img');
      newMainImg.alt = 'about us';
      newMainImg.classList.add('img-fluid');
      // The original code replaces the picture, but then appends the optimizedPicture.
      // This is fine, but ensure instrumentation is moved to the new picture.
      moveInstrumentation(aboutMainImageRow, optimizedMainPic); // Move instrumentation to the new picture element
      colRight.append(optimizedMainPic);
    }
  }
  row1.append(colRight);
  container1.append(row1);
  section.append(container1);

  // Features Section
  const container2 = document.createElement('div');
  container2.classList.add('container');
  moveInstrumentation(featuresTitleRow, container2); // Instrumentation for the container that holds features

  const aboutContainer = document.createElement('div');
  aboutContainer.classList.add('about-container', 'shadow-lg');

  const featuresTitle = document.createElement('h4');
  featuresTitle.textContent = featuresTitleRow.textContent.trim();
  moveInstrumentation(featuresTitleRow, featuresTitle);
  aboutContainer.append(featuresTitle);

  const featuresRow = document.createElement('div');
  featuresRow.classList.add('row');

  featureItemRows.forEach((row) => {
    const [featureIconCell, featureTitleCell, featureDescriptionCell] = [...row.children];

    const col = document.createElement('div');
    col.classList.add('col-lg-4', 'col-md-6', 'col-12');
    moveInstrumentation(row, col);

    const featureIconPicture = featureIconCell.querySelector('picture');
    if (featureIconPicture) {
      const featureIconImg = featureIconPicture.querySelector('img');
      if (featureIconImg) {
        const optimizedFeaturePic = createOptimizedPicture(featureIconImg.src, featureIconImg.alt, false, [{ width: '750' }]);
        const newFeatureImg = optimizedFeaturePic.querySelector('img');
        newFeatureImg.classList.add('img-fluid');
        moveInstrumentation(featureIconCell, optimizedFeaturePic); // Move instrumentation to the new picture element
        col.append(optimizedFeaturePic);
      }
    }

    const featureTitle = document.createElement('h5');
    featureTitle.textContent = featureTitleCell.textContent.trim();
    col.append(featureTitle);

    const featureDescription = document.createElement('p');
    // FIX: featureDescriptionCell is a cell, its innerHTML is "<p>content</p>".
    // Assigning this to featureDescription.innerHTML creates <p><p>...</p></p>, which is invalid.
    // Extract the innerHTML of the paragraph within the cell.
    featureDescription.innerHTML = featureDescriptionCell.querySelector('p')?.innerHTML || '';
    col.append(featureDescription);

    featuresRow.append(col);
  });

  aboutContainer.append(featuresRow);
  container2.append(aboutContainer);
  section.append(container2);

  block.replaceChildren(section);
}
