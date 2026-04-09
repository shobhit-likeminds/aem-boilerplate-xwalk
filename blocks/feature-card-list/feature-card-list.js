import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];
  const headingRow = children[0];
  const cardRows = children.slice(1);

  // Heading
  const headingContainer = document.createElement('div');
  moveInstrumentation(headingRow, headingContainer);
  headingContainer.classList.add('cmp-text');
  while (headingRow.firstChild) headingContainer.append(headingRow.firstChild);
  // Do not append to block yet, collect all elements first

  // Feature Cards
  const featureCardSections = [];
  cardRows.forEach((row) => {
    const cells = [...row.children];

    // Use content detection to map cells to fields
    const imageCell = cells.find(cell => cell.querySelector('picture'));
    const altTextCell = cells.find(cell => !cell.querySelector('picture') && !cell.querySelector('a') && cell.textContent.trim().length > 0);
    const titleCell = cells.find(cell => !cell.querySelector('picture') && !cell.querySelector('a') && cell.querySelector('p') === null && cell.textContent.trim().length > 0 && cells.indexOf(cell) > cells.indexOf(altTextCell));
    const descriptionCell = cells.find(cell => cell.querySelector('p'));
    const ctaLinkCell = cells.find(cell => cell.querySelector('a') && cells.indexOf(cell) > cells.indexOf(descriptionCell));
    const ctaLinkLabelCell = cells.find(cell => cell.querySelector('a') && cells.indexOf(cell) > cells.indexOf(ctaLinkCell));


    const section = document.createElement('section');
    moveInstrumentation(row, section);
    section.classList.add('d-block', 'feature_card--Section', 'feature_card', 'mx-auto');

    const ctaLink = document.createElement('a');
    const originalCtaLink = ctaLinkCell?.querySelector('a');
    if (originalCtaLink) {
      ctaLink.href = originalCtaLink.href;
      if (originalCtaLink.target) ctaLink.target = originalCtaLink.target;
      if (originalCtaLink.title) ctaLink.title = originalCtaLink.title;
    }
    ctaLink.classList.add('d-flex', 'flex-column', 'analytics_cta_click', 'text-decoration-none');
    ctaLink.setAttribute('data-cta-label', ctaLinkLabelCell?.textContent.trim() || '');

    // Image
    const imageDiv = document.createElement('div');
    imageDiv.classList.add('feature_card--image', 'w-100', 'pb-4');
    const picture = imageCell?.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, altTextCell?.textContent.trim() || '', false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        imageDiv.append(optimizedPic);
      }
    }
    ctaLink.append(imageDiv);

    // Content
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('text-center');

    const title = document.createElement('h2');
    title.classList.add('feature_card--title', 'boing--text__heading-1');
    if (titleCell) {
      moveInstrumentation(titleCell, title);
      title.append(...titleCell.children);
    }
    contentDiv.append(title);

    const descriptionContainer = document.createElement('div');
    descriptionContainer.classList.add('pb-5');
    const description = document.createElement('p');
    description.classList.add('feature_card--desc', 'boing--text__body-2', 'text-boing-dark');
    if (descriptionCell) {
      moveInstrumentation(descriptionCell, description);
      description.append(...descriptionCell.children);
    }
    descriptionContainer.append(description);
    contentDiv.append(descriptionContainer);

    const redirectedBtnDiv = document.createElement('div');
    redirectedBtnDiv.classList.add('redirected_btn', 'd-none');
    const button = document.createElement('button');
    button.type = 'button';
    button.role = 'button';
    button.classList.add('arrow-icon-btn');
    // The arrow icon is present in the original HTML as an img inside the button.
    // Since it's not part of the block model fields, we'll assume it's a static asset
    // that needs to be added or handled separately if it's not in the block content.
    // For this review, we'll add a placeholder if not present in the model.
    // If the original HTML has an img, it should be preserved.
    const originalButtonImg = ctaLinkCell?.querySelector('button img'); // Check if the original CTA cell had an image in a button
    if (originalButtonImg) {
      button.append(originalButtonImg.cloneNode(true));
    } else {
      // Placeholder if not found in model or original HTML
      const img = document.createElement('img');
      img.alt = 'svg file';
      img.src = '/content/dam/aemigrate/uploaded-folder/image/1775737677707.svg+xml'; // Example path, adjust as needed
      button.append(img);
    }

    redirectedBtnDiv.append(button);
    contentDiv.append(redirectedBtnDiv);

    ctaLink.append(contentDiv);
    section.append(ctaLink);
    featureCardSections.push(section);

    // Add event listener for the button
    button.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent default button behavior if it's inside a link
      e.stopPropagation(); // Stop propagation to prevent the parent link from being triggered immediately
      window.location.href = ctaLink.href; // Navigate to the CTA link's href
    });
  });

  // Clear the original block content
  block.textContent = '';

  // Re-append the heading and sections
  block.append(headingContainer);
  featureCardSections.forEach((section) => {
    block.append(section);
  });
}
