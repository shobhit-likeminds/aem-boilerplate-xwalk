import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  block.classList.add('ts_cards_sec', 'mt-md-50-acrds');

  const rowThar = document.createElement('div');
  rowThar.classList.add('row-thar', 'mx-0-thar');

  const col = document.createElement('div');
  col.classList.add('col', 'col-md-12', 'ts_cards', 'px-0-thar');

  [...block.children].forEach((row) => {
    // Use content detection for cells as per EDS Block Structure and BlockJson
    const cells = [...row.children];

    // Cell 0: field="image" type=reference
    const imageCell = cells[0];
    // Cell 1: field="imageLink" type=aem-content
    const imageLinkCell = cells[1];
    // Cell 2: field="imageLinkLabel" type=text
    const imageLinkLabelCell = cells[2];
    // Cell 3: field="heading" type=text
    const headingCell = cells[3];
    // Cell 4: field="description" type=richtext
    const descriptionCell = cells[4];
    // Cell 5: field="ctaLink" type=aem-content
    const ctaLinkCell = cells[5];
    // Cell 6: field="ctaLinkLabel" type=text
    const ctaLinkLabelCell = cells[6];

    const iacInnerWrap = document.createElement('div');
    iacInnerWrap.classList.add('iac-innerWrap');

    const imageLink = document.createElement('a');
    const foundImageLink = imageLinkCell.querySelector('a');
    if (foundImageLink) {
      imageLink.href = foundImageLink.href;
    }
    imageLink.setAttribute('aria-label', imageLinkLabelCell?.textContent.trim() || '');

    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        imageLink.append(optimizedPic);
      }
    }
    moveInstrumentation(imageLinkCell, imageLink);
    iacInnerWrap.append(imageLink);

    const heading = document.createElement('h2');
    // Heading is type=text, so read .textContent.trim()
    heading.textContent = headingCell?.textContent.trim() || '';
    moveInstrumentation(headingCell, heading);
    iacInnerWrap.append(heading);

    col.append(iacInnerWrap);

    const description = document.createElement('p');
    // Description is type=richtext, so read .innerHTML
    description.innerHTML = descriptionCell?.innerHTML || '';
    moveInstrumentation(descriptionCell, description);
    col.append(description);

    const ctaLink = document.createElement('a');
    const foundCtaLink = ctaLinkCell.querySelector('a');
    if (foundCtaLink) {
      ctaLink.href = foundCtaLink.href;
      ctaLink.target = '_blank';
    }
    ctaLink.textContent = ctaLinkLabelCell?.textContent.trim() || '';

    // The original HTML shows an SVG img, but the block model does not have a dedicated SVG field.
    // Based on rule 16, we cannot hardcode the SVG path. Therefore, we omit the SVG icon.
    moveInstrumentation(ctaLinkCell, ctaLink);
    col.append(ctaLink);
  });

  rowThar.append(col);
  block.textContent = '';
  block.append(rowThar);

  // Optimize images within the block
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
