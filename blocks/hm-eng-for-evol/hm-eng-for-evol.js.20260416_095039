import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, descriptionRow, ...evolutionBlurbRows] = [...block.children];

  block.classList.add('hm-eng-for-evol');

  // Heading
  if (headingRow) {
    const headingCell = headingRow.firstElementChild;
    const heading = document.createElement('h2');
    heading.classList.add('common-ttle', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
    moveInstrumentation(headingCell, heading);
    heading.textContent = headingCell.textContent.trim();
    block.append(heading);
  }

  // Description
  if (descriptionRow) {
    const descriptionCell = descriptionRow.firstElementChild;
    const description = document.createElement('p');
    description.classList.add('wow', 'animate__', 'animate__fadeInUp', 'animated');
    moveInstrumentation(descriptionCell, description);
    description.innerHTML = descriptionCell.innerHTML;
    block.append(description);
  }

  // Evolution Blurbs Container
  const evolutionBlurbHld = document.createElement('div');
  evolutionBlurbHld.classList.add('evolution-blurb-hld');

  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row');

  evolutionBlurbRows.forEach((row) => {
    // CRITICAL: row.children[n] is used here, but it's okay because the model is fixed-field
    // and the EDS BLOCK STRUCTURE explicitly states to use index destructuring for fixed-field item models.
    const [imageCell, titleCell, textCell, ctaLinkCell, ctaLinkLabelCell] = [...row.children];

    const colLg4 = document.createElement('div');
    colLg4.classList.add('col-lg-4');

    const evolutionBlurb = document.createElement('div');
    evolutionBlurb.classList.add('evolution-blurb', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
    moveInstrumentation(row, evolutionBlurb);

    const blurb = document.createElement('div');
    blurb.classList.add('blurb');

    const blurbContentDiv = document.createElement('div');

    // Image
    if (imageCell) {
      const figure = document.createElement('figure');
      const picture = imageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '80' }]);
          optimizedPic.querySelector('img').classList.add('bg-cover');
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          figure.append(optimizedPic);
        }
      }
      blurbContentDiv.append(figure);
    }

    const blurbDet = document.createElement('div');
    blurbDet.classList.add('blurb-det');

    // Title
    if (titleCell) {
      const title = document.createElement('h4');
      moveInstrumentation(titleCell, title);
      title.textContent = titleCell.textContent.trim();
      blurbDet.append(title);
    }

    // Text
    if (textCell) {
      const text = document.createElement('p');
      moveInstrumentation(textCell, text);
      text.innerHTML = textCell.innerHTML;
      blurbDet.append(text);
    }

    blurbContentDiv.append(blurbDet);
    blurb.append(blurbContentDiv);

    // CTA Link
    if (ctaLinkCell || ctaLinkLabelCell) {
      const ctaLink = document.createElement('a');
      ctaLink.classList.add('btn-box');
      const foundLink = ctaLinkCell?.querySelector('a'); // Correctly read href from the <a> tag
      if (foundLink) {
        ctaLink.href = foundLink.href;
        ctaLink.target = '_blank'; // Original HTML has target="_blank"
      }
      ctaLink.textContent = ctaLinkLabelCell?.textContent.trim() || '';
      moveInstrumentation(ctaLinkCell, ctaLink);
      blurb.append(ctaLink);
    }

    evolutionBlurb.append(blurb);
    colLg4.append(evolutionBlurb);
    rowDiv.append(colLg4);
  });

  evolutionBlurbHld.append(rowDiv);
  block.append(evolutionBlurbHld);

  // Wrap the entire block content in a container as per original HTML
  const containerWrapper = document.createElement('div');
  containerWrapper.classList.add('container-1600-wrp');
  while (block.firstChild) {
    containerWrapper.append(block.firstChild);
  }
  block.append(containerWrapper);
}
