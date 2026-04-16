import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, descriptionRow, ...blurbRows] = [...block.children];

  // Main container
  const container = document.createElement('div');
  container.classList.add('container-1600-wrp');

  // Heading
  const heading = document.createElement('h2');
  heading.classList.add('common-ttle', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  moveInstrumentation(headingRow.firstElementChild, heading);
  heading.textContent = headingRow.firstElementChild.textContent.trim();
  container.append(heading);

  // Description
  const description = document.createElement('p');
  description.classList.add('wow', 'animate__', 'animate__fadeInUp', 'animated');
  moveInstrumentation(descriptionRow.firstElementChild, description);
  description.innerHTML = descriptionRow.firstElementChild.innerHTML;
  container.append(description);

  // Evolution Blurbs Holder
  const evolutionBlurbHld = document.createElement('div');
  evolutionBlurbHld.classList.add('evolution-blurb-hld');
  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row');

  blurbRows.forEach((blurbRow, index) => {
    // Use content detection for cells, especially for aem-content types
    const cells = [...blurbRow.children];
    const imageCell = cells.find(cell => cell.querySelector('picture'));
    const headlineCell = cells.find(cell => !cell.querySelector('picture') && cell.textContent.trim() !== '' && !cell.querySelector('a'));
    const textCell = cells.find(cell => cell.innerHTML.includes('<p>') || cell.innerHTML.includes('<ul>'));
    const ctaLinkCell = cells.find(cell => cell.querySelector('a') && cell.querySelector('a').href.includes('/content/')); // aem-content link
    const ctaLinkLabelCell = cells.find(cell => cell.textContent.trim() !== '' && !cell.querySelector('a') && cell !== headlineCell); // CTA label is plain text

    const colLg4 = document.createElement('div');
    colLg4.classList.add('col-lg-4');

    const evolutionBlurb = document.createElement('div');
    evolutionBlurb.classList.add('evolution-blurb', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
    // Add delay for animation, matching original HTML pattern
    if (index > 0) {
      evolutionBlurb.setAttribute('data-wow-duration', '1s');
      evolutionBlurb.setAttribute('data-wow-delay', `${0.2 + (index - 1) * 0.1}s`);
    }

    const blurb = document.createElement('div');
    blurb.classList.add('blurb');

    const blurbContentWrapper = document.createElement('div');

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
      blurbContentWrapper.append(figure);
    }


    // Blurb Details
    const blurbDet = document.createElement('div');
    blurbDet.classList.add('blurb-det');

    // Headline
    if (headlineCell) {
      const headline = document.createElement('h4');
      moveInstrumentation(headlineCell, headline);
      headline.textContent = headlineCell.textContent.trim();
      blurbDet.append(headline);
    }

    // Text
    if (textCell) {
      const text = document.createElement('p');
      moveInstrumentation(textCell, text);
      text.innerHTML = textCell.innerHTML;
      blurbDet.append(text);
    }

    blurbContentWrapper.append(blurbDet);
    blurb.append(blurbContentWrapper);

    // CTA Link
    if (ctaLinkCell && ctaLinkLabelCell) {
      const ctaLink = document.createElement('a');
      ctaLink.classList.add('btn-box');
      const originalCtaLink = ctaLinkCell.querySelector('a');
      if (originalCtaLink) {
        ctaLink.href = originalCtaLink.href;
        // Original HTML uses target="_blank"
        ctaLink.target = '_blank';
      }
      moveInstrumentation(ctaLinkCell, ctaLink);
      ctaLink.textContent = ctaLinkLabelCell.textContent.trim();
      blurb.append(ctaLink);
    }


    evolutionBlurb.append(blurb);
    moveInstrumentation(blurbRow, evolutionBlurb); // Move instrumentation from the blurb row
    colLg4.append(evolutionBlurb);
    rowDiv.append(colLg4);
  });

  evolutionBlurbHld.append(rowDiv);
  container.append(evolutionBlurbHld);

  block.textContent = '';
  block.append(container);
  block.classList.add('hm-eng-for-evol'); // Add the block class to the block itself
}
