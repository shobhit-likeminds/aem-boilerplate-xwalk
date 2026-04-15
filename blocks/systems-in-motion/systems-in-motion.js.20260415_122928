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

  block.classList.add('systems-in-motion');

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
  block.append(dotRight);

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
  block.append(dotLeft);

  // Container for Heading and Description
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

  block.append(container1600Wrp);

  // Motion Cards
  const motionCardHld = document.createElement('div');
  motionCardHld.classList.add('motion-card-hld');
  const rowWrapper = document.createElement('div');
  rowWrapper.classList.add('row');

  motionCardRows.forEach((row, index) => {
    const [logoImageCell, titleCell, textCell, ctaLinkCell, ctaLinkLabelCell] = [...row.children];

    const colLg6 = document.createElement('div');
    colLg6.classList.add('col-lg-6');

    const mCardBlurb = document.createElement('div');
    mCardBlurb.classList.add('m-card-blurb', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
    mCardBlurb.setAttribute('data-wow-duration', '1s');
    mCardBlurb.setAttribute('data-wow-delay', `${0.1 + index * 0.1}s`);

    const contentDiv = document.createElement('div');

    // Logo Image
    const figure = document.createElement('figure');
    const logoPicture = logoImageCell.querySelector('picture');
    if (logoPicture) {
      const img = logoPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '80' }]);
      optimizedPic.querySelector('img').classList.add('bg-cover'); // Add bg-cover to the img inside picture
      moveInstrumentation(img, optimizedPic.querySelector('img'));
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

    // CTA Link
    const foundLink = ctaLinkCell.querySelector('a');
    if (foundLink) {
      const ctaLink = document.createElement('a');
      // For type=aem-content, read href from the <a> tag within the cell
      ctaLink.href = foundLink.href;
      // For CTA Link Label, read textContent from the dedicated label cell
      ctaLink.textContent = ctaLinkLabelCell.textContent.trim();
      ctaLink.classList.add('btn-box');
      // Check if the original link had target="_blank"
      if (foundLink.target === '_blank') {
        ctaLink.target = '_blank';
      }
      moveInstrumentation(ctaLinkCell, ctaLink);
      mCardBlurb.append(ctaLink);
    }

    moveInstrumentation(row, colLg6);
    colLg6.append(mCardBlurb);
    rowWrapper.append(colLg6);
  });

  motionCardHld.append(rowWrapper);
  block.append(motionCardHld);
}
