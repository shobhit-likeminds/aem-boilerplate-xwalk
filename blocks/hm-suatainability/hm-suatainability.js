import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Destructuring block.children is acceptable here because the EDS BLOCK STRUCTURE
  // explicitly defines a fixed number of root rows, each corresponding to a single field.
  // There are no "item" sub-components where row.children[n] would be problematic.
  const [
    backgroundImageRow,
    subtitleRow,
    titleRow,
    descriptionRow,
    ctaLinkRow,
    ctaLinkLabelRow,
  ] = [...block.children];

  // Background Image
  const figure = document.createElement('figure');
  // The EDS BLOCK STRUCTURE indicates backgroundImageRow contains a single cell with a picture.
  // Accessing row.children[0] here is acceptable because it's a root row, not an item row.
  const pictureCell = backgroundImageRow.children[0];
  const picture = pictureCell.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '1920' }]);
      optimizedPic.querySelector('img').classList.add('bg-cover'); // Apply class from original HTML
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      figure.append(optimizedPic);
    }
  }
  moveInstrumentation(backgroundImageRow, figure);

  // Section details container
  const sectDet = document.createElement('div');
  sectDet.classList.add('sect-det');

  // Subtitle
  const subTtle = document.createElement('div');
  subTtle.classList.add('sub-ttle', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  // The EDS BLOCK STRUCTURE indicates subtitleRow contains a single cell with plain text.
  const subtitleCell = subtitleRow.children[0];
  moveInstrumentation(subtitleCell, subTtle);
  subTtle.textContent = subtitleCell.textContent.trim();

  // Title
  const commonTtle = document.createElement('h2');
  commonTtle.classList.add('common-ttle', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  // The EDS BLOCK STRUCTURE indicates titleRow contains a single cell with plain text.
  const titleCell = titleRow.children[0];
  moveInstrumentation(titleCell, commonTtle);
  commonTtle.textContent = titleCell.textContent.trim();

  // Description
  const descriptionP = document.createElement('p');
  descriptionP.classList.add('wow', 'animate__', 'animate__fadeInUp', 'animated');
  // The EDS BLOCK STRUCTURE indicates descriptionRow contains a single cell with richtext.
  const descriptionCell = descriptionRow.children[0];
  moveInstrumentation(descriptionCell, descriptionP);
  descriptionP.innerHTML = descriptionCell.innerHTML;

  // CTA Link
  const ctaLink = document.createElement('a');
  ctaLink.classList.add('btn-box', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  // The EDS BLOCK STRUCTURE indicates ctaLinkRow contains a single cell with an aem-content link.
  const ctaLinkCell = ctaLinkRow.children[0];
  const foundLink = ctaLinkCell.querySelector('a');
  if (foundLink) {
    ctaLink.href = foundLink.href;
  }
  moveInstrumentation(ctaLinkCell, ctaLink);

  // CTA Label
  // The EDS BLOCK STRUCTURE indicates ctaLinkLabelRow contains a single cell with plain text.
  const ctaLinkLabelCell = ctaLinkLabelRow.children[0];
  ctaLink.textContent = ctaLinkLabelCell.textContent.trim();
  moveInstrumentation(ctaLinkLabelCell, ctaLink); // Move instrumentation from label cell to the link element

  sectDet.append(subTtle, commonTtle, descriptionP, ctaLink);

  block.textContent = '';
  block.append(figure, sectDet);
}
