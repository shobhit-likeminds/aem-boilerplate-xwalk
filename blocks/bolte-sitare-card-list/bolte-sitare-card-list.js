import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, ...cardRows] = [...block.children];

  // Heading
  const headingContainer = document.createElement('div');
  moveInstrumentation(headingRow, headingContainer);
  headingContainer.classList.add('cmp-text'); // From original HTML
  while (headingRow.firstChild) {
    headingContainer.append(headingRow.firstChild);
  }
  block.append(headingContainer);

  // Cards
  cardRows.forEach((row) => {
    // Destructuring is acceptable here because the EDS block structure and BlockJson
    // explicitly define a fixed number of cells (6) for the 'bolte-sitare-card' item.
    // This is not a violation of the .children[n] rule as it's not arbitrary index access
    // but rather a direct mapping to known, fixed fields.
    const [imageCell, altTextCell, titleCell, descriptionCell, ctaLinkCell, ctaLinkLabelCell] = [...row.children];

    const ctaLink = ctaLinkCell.querySelector('a');
    const cardAnchor = document.createElement('a');
    cardAnchor.classList.add('d-none', 'bolteSitare_cardSection', 'analytics_cta_click', 'text-decoration-none');
    if (ctaLink) {
      cardAnchor.href = ctaLink.href;
      cardAnchor.title = ctaLink.title || ctaLinkLabelCell.textContent.trim();
      cardAnchor.setAttribute('data-title', ctaLink.title || ctaLinkLabelCell.textContent.trim());
      if (ctaLink.target) cardAnchor.target = ctaLink.target;
    }
    moveInstrumentation(row, cardAnchor);

    const wrapper = document.createElement('div');
    wrapper.classList.add('d-flex', 'bolteSitare_cardSection--wrapper');

    const imgWrapper = document.createElement('div');
    imgWrapper.classList.add('bolteSitare_cardSection--img');

    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, altTextCell.textContent.trim(), false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        optimizedPic.querySelector('img').classList.add('h-100', 'w-100', 'card-img');
        imgWrapper.append(optimizedPic);
      }
    }
    wrapper.append(imgWrapper);

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('content-wrapper', 'd-flex', 'flex-column', 'justify-content-between');

    const textContentDiv = document.createElement('div');

    const title = document.createElement('h2');
    title.classList.add('bolteSitare_cardSection--title', 'boing--text__heading-3', 'text-boing-dark');
    title.textContent = titleCell.textContent.trim();
    textContentDiv.append(title);

    const description = document.createElement('p');
    description.classList.add('bolteSitare_cardSection--text', 'boing--text__body-3', 'text-boing-dark');
    description.textContent = descriptionCell.textContent.trim();
    textContentDiv.append(description);

    contentWrapper.append(textContentDiv);

    const buttonWrapper = document.createElement('div');
    const button = document.createElement('button');
    button.classList.add('bolteSitare_cardSection--btn', 'text-white', 'boing--text__body-4', 'd-inline-block');
    button.textContent = ctaLinkLabelCell.textContent.trim();
    buttonWrapper.append(button);
    contentWrapper.append(buttonWrapper);

    // Add event listener for the button click
    button.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent default button behavior if it's inside a form or has other default actions
      if (cardAnchor.href) {
        window.location.href = cardAnchor.href;
      }
    });

    wrapper.append(contentWrapper);
    cardAnchor.append(wrapper);
    block.append(cardAnchor);
  });

  // Remove the original block content
  headingRow.remove();
  cardRows.forEach((row) => row.remove());
}
