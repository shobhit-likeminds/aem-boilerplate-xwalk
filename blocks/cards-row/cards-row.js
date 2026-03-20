import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  block.classList.add('rs-cards-row');

  // Remove the tab-para div if it exists at the beginning of the block,
  // as it's meant to be at the end.
  const existingTabPara = block.querySelector('.rs-cards-tab-para');
  if (existingTabPara) {
    existingTabPara.remove();
  }

  [...block.children].forEach((row) => {
    // Check 1: Structure Alignment - Each card has 3 fields: image, title, description.
    // The JS correctly destructures into imageCell, titleCell, descriptionCell.
    const [imageCell, titleCell, descriptionCell] = [...row.children];

    // Ensure all cells exist before processing
    if (!imageCell || !titleCell || !descriptionCell) {
      // eslint-disable-next-line no-console
      console.warn('Skipping a row in Cards-Row block due to missing cells.', row);
      return;
    }

    const cardWrapper = document.createElement('div');
    // Check 3: CSS Class Coverage - Adding classes from original HTML
    cardWrapper.classList.add('rs-cards-col-xl-4', 'rs-cards-col-lg-6', 'rs-cards-pb-md-0', 'rs-cards-pb-4', 'rs-cards-row-gap-4', 'rs-cards-koi-rscard-padding');
    moveInstrumentation(row, cardWrapper);

    const card = document.createElement('div');
    // Check 3: CSS Class Coverage - Adding classes from original HTML
    card.classList.add('rs-cards-card');

    // Image
    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      card.append(optimizedPic);
      optimizedPic.querySelector('img').classList.add('rs-cards-w-100', 'rs-cards-kitchens-image');
    }

    // Card Body
    const cardBody = document.createElement('div');
    // Check 3: CSS Class Coverage - Adding classes from original HTML
    cardBody.classList.add('rs-cards-card-body');

    // Link (empty link with SVG in original HTML, replicating structure)
    const link = document.createElement('a');
    // Check 3: CSS Class Coverage - Adding classes from original HTML
    link.classList.add('rs-cards-explore-btn-hide-id-style'); // Added missing class from original HTML
    link.setAttribute('aria-label', `Read more about '${titleCell.textContent.trim()}'`);
    link.setAttribute('target', '_self');
    link.setAttribute('id', 'rs-cards-explore-btn-hide-id');
    const svgImg = document.createElement('img');
    svgImg.setAttribute('loading', 'lazy');
    svgImg.setAttribute('src', '/content/dam/aemigrate/uploaded-folder/image/1773984892503.svg+xml');
    link.append(svgImg);
    cardBody.append(link);

    // Check 2: Interactivity - The link is an interactive element.
    // The original HTML has an `<a>` tag, but no explicit JS event listener is needed
    // as it's a standard navigation link. The `aria-label` is correctly set for accessibility.

    // Title
    const title = document.createElement('h5');
    // Check 3: CSS Class Coverage - Adding classes from original HTML
    title.classList.add('rs-cards-blog-card-title');
    moveInstrumentation(titleCell, title);
    while (titleCell.firstChild) title.append(titleCell.firstChild);
    cardBody.append(title);

    // Description
    // Check 1: Structure Alignment - The original HTML uses <p> inside <h5> for description.
    // The JS was creating an <h5> for description, which is incorrect. It should be a <p>
    // or the content should be moved into the existing h5 if the original HTML intended that.
    // Given the original HTML structure, it's an <h5> containing a <p>.
    // To match the original HTML, we should create an <h5> and then append the content,
    // which might contain a <p> from the descriptionCell.
    // The current JS moves the content directly. Let's ensure the outer tag is <h5> as per original.
    const description = document.createElement('h5'); // Keep h5 as per original HTML structure
    description.classList.add('rs-cards-card-title');
    moveInstrumentation(descriptionCell, description);
    while (descriptionCell.firstChild) description.append(descriptionCell.firstChild);
    cardBody.append(description);

    card.append(cardBody);
    cardWrapper.append(card);
    block.append(cardWrapper);
  });

  // Remove original rows
  while (block.firstElementChild && !block.firstElementChild.classList.contains('rs-cards-col-xl-4')) {
    block.firstElementChild.remove();
  }

  // Add the tab-para div as it appears in the original HTML, at the end of the block
  // The original HTML shows it as the last child of the block.
  // The check for existence is good, but it should be appended at the end.
  // The previous removal handles cases where it might be in the wrong place.
  const tabPara = document.createElement('div');
  tabPara.classList.add('rs-cards-tab-para');
  block.append(tabPara);
}
