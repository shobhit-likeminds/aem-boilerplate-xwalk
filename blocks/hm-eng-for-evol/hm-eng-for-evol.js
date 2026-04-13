import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, descriptionRow, ...evolutionBlurbRows] = [...block.children];

  // Create container
  const container = document.createElement('div');
  container.classList.add('container-1600-wrp');

  // Heading
  const heading = document.createElement('h2');
  heading.classList.add('common-ttle', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  moveInstrumentation(headingRow, heading);
  heading.textContent = headingRow.firstElementChild.textContent.trim();
  container.append(heading);

  // Description
  const description = document.createElement('p');
  description.classList.add('wow', 'animate__', 'animate__fadeInUp', 'animated');
  moveInstrumentation(descriptionRow, description);
  // Move all children from the description cell into the new paragraph
  while (descriptionRow.firstElementChild.firstChild) {
    description.append(descriptionRow.firstElementChild.firstChild);
  }
  container.append(description);

  // Evolution Blurbs Container
  const evolutionBlurbHld = document.createElement('div');
  evolutionBlurbHld.classList.add('evolution-blurb-hld');
  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row');

  evolutionBlurbRows.forEach((blurbRow) => {
    // Use content detection instead of direct index access for robustness
    const cells = [...blurbRow.children];
    const imageCell = cells.find(cell => cell.querySelector('picture'));
    const titleCell = cells.find(cell => !cell.querySelector('picture') && cell.textContent.trim() !== '' && !cell.querySelector('a'));
    const textCell = cells.find(cell => cell.querySelector('p'));
    const ctaLinkCell = cells.find(cell => cell.querySelector('a') && cell.querySelector('a').href && cell.querySelector('a').textContent.trim() !== '');
    const ctaLinkLabelCell = cells.find(cell => cell.querySelector('a') && cell.querySelector('a').href === ctaLinkCell.querySelector('a').href && cell.textContent.trim() === ctaLinkCell.querySelector('a').href); // This cell contains the raw URL, not the label

    const colLg4 = document.createElement('div');
    colLg4.classList.add('col-lg-4');

    const evolutionBlurb = document.createElement('div');
    evolutionBlurb.classList.add('evolution-blurb', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
    moveInstrumentation(blurbRow, evolutionBlurb);

    const blurb = document.createElement('div');
    blurb.classList.add('blurb');

    const blurbContentDiv = document.createElement('div');

    // Image
    const figure = document.createElement('figure');
    if (imageCell) {
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
    }
    blurbContentDiv.append(figure);

    const blurbDet = document.createElement('div');
    blurbDet.classList.add('blurb-det');

    // Title
    if (titleCell) {
      const h4 = document.createElement('h4');
      h4.textContent = titleCell.textContent.trim();
      blurbDet.append(h4);
    }

    // Text
    if (textCell) {
      // Move all children from the text cell into the blurbDet
      while (textCell.firstElementChild.firstChild) {
        blurbDet.append(textCell.firstElementChild.firstChild);
      }
    }

    blurbContentDiv.append(blurbDet);
    blurb.append(blurbContentDiv);

    // CTA Link
    if (ctaLinkCell) {
      const ctaLink = document.createElement('a');
      ctaLink.classList.add('btn-box');
      const foundCtaLink = ctaLinkCell.querySelector('a');
      if (foundCtaLink) {
        ctaLink.href = foundCtaLink.href;
        ctaLink.target = '_blank'; // Assuming target="_blank" from original HTML
        // The label for the CTA link should come from the text content of the <a> tag in ctaLinkCell
        ctaLink.textContent = foundCtaLink.textContent.trim();
      }
      moveInstrumentation(ctaLinkCell, ctaLink);
      blurb.append(ctaLink);
    }

    evolutionBlurb.append(blurb);
    colLg4.append(evolutionBlurb);
    rowDiv.append(colLg4);
  });

  evolutionBlurbHld.append(rowDiv);
  container.append(evolutionBlurbHld);

  block.textContent = '';
  block.append(container);

  // Image optimization for any remaining pictures
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
