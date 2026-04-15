import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    dotRightImageRow,
    dotLeftImageRow,
    headingRow,
    descriptionRow,
    ...motionCardRows
  ] = [...block.children];

  // Dot Right Image
  const dotRight = document.createElement('div');
  dotRight.classList.add('dot-right');
  const dotRightPicture = dotRightImageRow.querySelector('picture');
  if (dotRightPicture) {
    const img = dotRightPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '267' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    dotRight.append(optimizedPic);
  }
  moveInstrumentation(dotRightImageRow, dotRight);

  // Dot Left Image
  const dotLeft = document.createElement('div');
  dotLeft.classList.add('dot-left');
  const dotLeftPicture = dotLeftImageRow.querySelector('picture');
  if (dotLeftPicture) {
    const img = dotLeftPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '267' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    dotLeft.append(optimizedPic);
  }
  moveInstrumentation(dotLeftImageRow, dotLeft);

  // Container for heading and description
  const container1600Wrp = document.createElement('div');
  container1600Wrp.classList.add('container-1600-wrp');

  // Heading
  const heading = document.createElement('h2');
  heading.classList.add('common-ttle', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  heading.textContent = headingRow.textContent.trim();
  moveInstrumentation(headingRow, heading);
  container1600Wrp.append(heading);

  // Description
  const description = document.createElement('p');
  description.classList.add('wow', 'animate__', 'animate__fadeInUp', 'animated');
  description.innerHTML = descriptionRow.innerHTML;
  moveInstrumentation(descriptionRow, description);
  container1600Wrp.append(description);

  // Motion Cards Holder
  const motionCardHld = document.createElement('div');
  motionCardHld.classList.add('motion-card-hld');
  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row');

  motionCardRows.forEach((row, index) => {
    // CRITICAL FIX: Replaced row.children[n] with destructuring for fixed-field item model
    const [logoCell, titleCell, textCell, linkCell, linkLabelCell] = [...row.children];

    const colLg6 = document.createElement('div');
    colLg6.classList.add('col-lg-6');

    const mCardBlurb = document.createElement('div');
    mCardBlurb.classList.add('m-card-blurb', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
    mCardBlurb.style.setProperty('--wow-duration', '1s');
    mCardBlurb.style.setProperty('--wow-delay', `${0.1 + index * 0.1}s`);

    const contentDiv = document.createElement('div');

    // Logo
    const figure = document.createElement('figure');
    const logoPicture = logoCell.querySelector('picture');
    if (logoPicture) {
      const img = logoPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '80' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('bg-cover'); // Add class to the img inside picture
      figure.append(optimizedPic);
    }
    contentDiv.append(figure);

    // Title
    const title = document.createElement('h4');
    title.textContent = titleCell.textContent.trim();
    contentDiv.append(title);

    // Text
    const text = document.createElement('p');
    text.innerHTML = textCell.innerHTML;
    contentDiv.append(text);

    mCardBlurb.append(contentDiv);

    // Link
    const foundLink = linkCell.querySelector('a');
    if (foundLink && linkLabelCell.textContent.trim()) {
      const anchor = document.createElement('a');
      // CRITICAL FIX: For type=aem-content, read href from the foundLink element, not textContent
      anchor.href = foundLink.href;
      anchor.textContent = linkLabelCell.textContent.trim();
      anchor.classList.add('btn-box');
      anchor.target = '_blank'; // Assuming links open in new tab based on original HTML
      mCardBlurb.append(anchor);
    }

    moveInstrumentation(row, mCardBlurb);
    colLg6.append(mCardBlurb);
    rowDiv.append(colLg6);
  });

  motionCardHld.append(rowDiv);

  block.textContent = '';
  block.classList.add('systems-in-motion'); // Add block-level class
  block.append(dotRight, dotLeft, container1600Wrp, motionCardHld);
}
