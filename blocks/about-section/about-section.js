import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  const sectionHeadingRow = children[0];
  const descriptionRow = children[1];
  const aboutPointerImageRow = children[2];
  const aboutMainImageRow = children[3];
  const featuresHeadingRow = children[4];
  const featureItemRows = children.slice(5);

  const rootSection = document.createElement('section');
  // rootSection.classList.add('about-section'); // Removed: outer block div already has this class
  moveInstrumentation(block, rootSection);

  // Section Heading
  const heading = document.createElement('h2');
  moveInstrumentation(sectionHeadingRow, heading);
  heading.textContent = sectionHeadingRow.textContent.trim();
  rootSection.append(heading);

  // About Description and Images
  const container = document.createElement('div');
  container.classList.add('container');

  const row = document.createElement('div');
  row.classList.add('row', 'align-items-center');

  const descriptionCol = document.createElement('div');
  descriptionCol.classList.add('col-lg-6', 'col-md-6', 'col-12', 'order-lg-1', 'order-md-1', 'order-2');
  moveInstrumentation(descriptionRow, descriptionCol);

  // The original HTML has the pointer image *inside* the description paragraph.
  // We need to reconstruct this structure.
  const descriptionContentDiv = document.createElement('div'); // Use div for richtext content
  descriptionContentDiv.innerHTML = descriptionRow.children[0]?.innerHTML || ''; // Corrected: read from cell

  const aboutPointerPicture = aboutPointerImageRow.querySelector('picture');
  if (aboutPointerPicture) {
    const aboutPointerImg = aboutPointerPicture.querySelector('img');
    const optimizedPointerPic = createOptimizedPicture(
      aboutPointerImg.src,
      aboutPointerImg.alt,
      false,
      [{ width: '750' }],
    );
    optimizedPointerPic.querySelector('img').classList.add('img-fluid', 'about-pointer');
    moveInstrumentation(aboutPointerImageRow, optimizedPointerPic.querySelector('img'));
    // Append the optimized picture to the description content div
    descriptionContentDiv.append(optimizedPointerPic);
  }
  // The original HTML wraps the description and pointer image in a <p>
  // If the description content is just text, we can wrap it in a <p>
  // If it's complex HTML, we should use a div. Given it's richtext, a div is safer.
  // However, the original HTML explicitly shows a <p> wrapping both.
  // Let's create a <p> and move the children from descriptionContentDiv into it.
  const descriptionPWrapper = document.createElement('p');
  while (descriptionContentDiv.firstChild) {
    descriptionPWrapper.append(descriptionContentDiv.firstChild);
  }
  descriptionCol.append(descriptionPWrapper);
  row.append(descriptionCol);

  const mainImageCol = document.createElement('div');
  mainImageCol.classList.add('col-lg-6', 'col-md-6', 'col-12', 'order-lg-2', 'order-md-2', 'order-1');
  moveInstrumentation(aboutMainImageRow, mainImageCol);

  const aboutMainPicture = aboutMainImageRow.querySelector('picture');
  if (aboutMainPicture) {
    const aboutMainImg = aboutMainPicture.querySelector('img');
    const optimizedMainPic = createOptimizedPicture(
      aboutMainImg.src,
      aboutMainImg.alt,
      false,
      [{ width: '750' }],
    );
    optimizedMainPic.querySelector('img').classList.add('img-fluid');
    moveInstrumentation(aboutMainImageRow, optimizedMainPic.querySelector('img'));
    mainImageCol.append(optimizedMainPic);
  }
  row.append(mainImageCol);
  container.append(row);
  rootSection.append(container);

  // Features Section
  const featuresContainer = document.createElement('div');
  featuresContainer.classList.add('container');

  const aboutContainer = document.createElement('div');
  aboutContainer.classList.add('about-container', 'shadow-lg');

  const featuresHeading = document.createElement('h4');
  moveInstrumentation(featuresHeadingRow, featuresHeading);
  featuresHeading.textContent = featuresHeadingRow.textContent.trim();
  aboutContainer.append(featuresHeading);

  const featuresRow = document.createElement('div');
  featuresRow.classList.add('row');

  featureItemRows.forEach((rowEl) => {
    const [featureImageCell, featureTitleCell, featureDescriptionCell] = [...rowEl.children];

    const featureCol = document.createElement('div');
    featureCol.classList.add('col-lg-4', 'col-md-6', 'col-12');
    moveInstrumentation(rowEl, featureCol);

    const featurePicture = featureImageCell.querySelector('picture');
    if (featurePicture) {
      const featureImg = featurePicture.querySelector('img');
      const optimizedFeaturePic = createOptimizedPicture(
        featureImg.src,
        featureImg.alt,
        false,
        [{ width: '750' }],
      );
      optimizedFeaturePic.querySelector('img').classList.add('img-fluid');
      featureCol.append(optimizedFeaturePic);
    }

    const featureTitle = document.createElement('h5');
    featureTitle.textContent = featureTitleCell.textContent.trim();
    featureCol.append(featureTitle);

    const featureDescription = document.createElement('p');
    // Corrected: read innerHTML directly from the richtext cell
    featureDescription.innerHTML = featureDescriptionCell?.innerHTML || '';
    featureCol.append(featureDescription);

    featuresRow.append(featureCol);
  });

  aboutContainer.append(featuresRow);
  featuresContainer.append(aboutContainer);
  rootSection.append(featuresContainer);

  block.replaceChildren(rootSection);

  // Optimize all images within the block
  // This loop is redundant as createOptimizedPicture is already called for each image.
  // Removing it to avoid double optimization and potential instrumentation issues.
  // rootSection.querySelectorAll('picture > img').forEach((img) => {
  //   const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
  //   moveInstrumentation(img, optimizedPic.querySelector('img'));
  //   img.closest('picture').replaceWith(optimizedPic);
  // });
}
