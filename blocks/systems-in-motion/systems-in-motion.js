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
  block.textContent = ''; // Clear existing content

  // Dot Right Image
  const dotRightDiv = document.createElement('div');
  dotRightDiv.classList.add('dot-right');
  const dotRightPicture = dotRightImageRow.querySelector('picture');
  if (dotRightPicture) {
    const img = dotRightPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '267' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    dotRightDiv.append(optimizedPic);
  }
  moveInstrumentation(dotRightImageRow, dotRightDiv);
  block.append(dotRightDiv);

  // Dot Left Image
  const dotLeftDiv = document.createElement('div');
  dotLeftDiv.classList.add('dot-left');
  const dotLeftPicture = dotLeftImageRow.querySelector('picture');
  if (dotLeftPicture) {
    const img = dotLeftPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '267' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    dotLeftDiv.append(optimizedPic);
  }
  moveInstrumentation(dotLeftImageRow, dotLeftDiv);
  block.append(dotLeftDiv);

  // Main Content Container
  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container-1600-wrp');
  moveInstrumentation(headingRow, containerDiv); // Move instrumentation from headingRow to containerDiv

  // Heading
  const heading = document.createElement('h2');
  heading.classList.add('common-ttle', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  heading.textContent = headingRow.textContent.trim();
  containerDiv.append(heading);

  // Description
  const description = document.createElement('p');
  description.classList.add('wow', 'animate__', 'animate__fadeInUp', 'animated');
  description.innerHTML = descriptionRow.innerHTML;
  containerDiv.append(description);
  moveInstrumentation(descriptionRow, description); // Move instrumentation from descriptionRow to description

  block.append(containerDiv);

  // Motion Cards Holder
  const motionCardHld = document.createElement('div');
  motionCardHld.classList.add('motion-card-hld');
  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row');

  motionCardRows.forEach((row, index) => {
    // Destructure cells for motion-card item
    const [logoCell, titleCell, textCell, ctaLinkCell, ctaLinkLabelCell] = [...row.children];

    const colDiv = document.createElement('div');
    colDiv.classList.add('col-lg-6');

    const mCardBlurb = document.createElement('div');
    mCardBlurb.classList.add('m-card-blurb', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
    mCardBlurb.setAttribute('data-wow-duration', '1s');
    mCardBlurb.setAttribute('data-wow-delay', `${0.1 + index * 0.1}s`);

    const contentDiv = document.createElement('div');

    // Logo
    const figure = document.createElement('figure');
    const logoPicture = logoCell.querySelector('picture');
    if (logoPicture) {
      const img = logoPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '80' }]);
      optimizedPic.querySelector('img').classList.add('bg-cover');
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      figure.append(optimizedPic);
    }
    contentDiv.append(figure);
    moveInstrumentation(logoCell, figure);

    // Title
    const title = document.createElement('h4');
    title.textContent = titleCell.textContent.trim();
    contentDiv.append(title);
    moveInstrumentation(titleCell, title);

    // Text
    const text = document.createElement('p');
    text.innerHTML = textCell.innerHTML;
    contentDiv.append(text);
    moveInstrumentation(textCell, text);

    mCardBlurb.append(contentDiv);

    // CTA Link
    const ctaLinkElement = ctaLinkCell.querySelector('a'); // Get the actual anchor element
    const ctaLinkLabelText = ctaLinkLabelCell.textContent.trim(); // Get the label text

    if (ctaLinkElement && ctaLinkElement.href) {
      const anchor = document.createElement('a');
      anchor.classList.add('btn-box');
      anchor.href = ctaLinkElement.href; // Use the href from the aem-content cell
      anchor.textContent = ctaLinkLabelText; // Use the label from the text cell
      anchor.target = '_blank'; // Assuming target blank from original HTML
      mCardBlurb.append(anchor);
      moveInstrumentation(ctaLinkCell, anchor);
    } else if (ctaLinkLabelText) {
      // If no link but label exists, render as a span (or button if interaction is implied)
      const span = document.createElement('span');
      span.classList.add('btn-box');
      span.textContent = ctaLinkLabelText;
      mCardBlurb.append(span);
      moveInstrumentation(ctaLinkLabelCell, span);
    }

    colDiv.append(mCardBlurb);
    moveInstrumentation(row, colDiv); // Move instrumentation from motion card row to colDiv
    rowDiv.append(colDiv);
  });

  motionCardHld.append(rowDiv);
  block.append(motionCardHld);

  // Image optimization for all pictures in the block
  block.querySelectorAll('picture > img').forEach((img) => {
    // Only optimize if not already handled by createOptimizedPicture above
    if (!img.closest('picture').dataset.optimized) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      img.closest('picture').replaceWith(optimizedPic);
      optimizedPic.dataset.optimized = 'true'; // Mark as optimized
    }
  });
}
