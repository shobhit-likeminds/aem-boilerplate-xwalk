import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, ...cardRows] = [...block.children];

  // Heading
  const headingContainer = document.createElement('div');
  moveInstrumentation(headingRow, headingContainer);
  headingContainer.classList.add('cmp-text');
  while (headingRow.firstChild) {
    headingContainer.append(headingRow.firstChild);
  }
  block.append(headingContainer);

  // Cards section
  const section = document.createElement('section');
  section.classList.add('d-block', 'feature_card--Section', 'feature_card', 'mx-auto');

  cardRows.forEach((row) => {
    const cells = [...row.children];
    // Use content detection instead of index access for robustness
    const imageCell = cells.find(cell => cell.querySelector('picture'));
    const ctaLinkCell = cells.find(cell => cell.querySelector('a'));
    const ctaLinkLabelCell = cells.find(cell => cell.textContent.trim() === ctaLinkCell.textContent.trim() && cell !== ctaLinkCell); // Find the cell that contains the CTA Label text, which might be the same as CTA Link text initially
    const titleCell = cells.find(cell => cell.querySelector('div') && !cell.querySelector('picture') && !cell.querySelector('a') && cell.textContent.trim().length > 0 && cell !== ctaLinkLabelCell);
    const descriptionCell = cells.find(cell => cell.querySelector('div') && !cell.querySelector('picture') && !cell.querySelector('a') && cell.textContent.trim().length > 0 && cell !== titleCell && cell !== ctaLinkLabelCell);

    const ctaLink = ctaLinkCell ? ctaLinkCell.querySelector('a') : null;
    const cardAnchor = document.createElement('a');
    cardAnchor.classList.add('d-flex', 'flex-column', 'analytics_cta_click', 'text-decoration-none');
    if (ctaLink) {
      cardAnchor.href = ctaLink.href;
      if (ctaLink.target) cardAnchor.target = ctaLink.target;
      if (ctaLink.title) cardAnchor.title = ctaLink.title;
      cardAnchor.setAttribute('data-cta-label', ctaLinkLabelCell ? ctaLinkLabelCell.textContent.trim() : ctaLink.textContent.trim());
    }
    moveInstrumentation(row, cardAnchor);

    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('feature_card--image', 'w-100', 'pb-4');
    const picture = imageCell ? imageCell.querySelector('picture') : null;
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        picture.replaceWith(optimizedPic);
        imageWrapper.append(optimizedPic);
      }
    }
    cardAnchor.append(imageWrapper);

    const textCenter = document.createElement('div');
    textCenter.classList.add('text-center');

    const title = document.createElement('h2');
    title.classList.add('feature_card--title', 'boing--text__heading-1');
    if (titleCell) {
      title.textContent = titleCell.textContent.trim();
    }
    textCenter.append(title);

    const descriptionWrapper = document.createElement('div');
    descriptionWrapper.classList.add('pb-5');
    const description = document.createElement('p');
    description.classList.add('feature_card--desc', 'boing--text__body-2', 'text-boing-dark');
    if (descriptionCell) {
      description.textContent = descriptionCell.textContent.trim();
    }
    descriptionWrapper.append(description);
    textCenter.append(descriptionWrapper);

    const redirectedBtn = document.createElement('div');
    redirectedBtn.classList.add('redirected_btn', 'd-none');
    const button = document.createElement('button');
    button.type = 'button';
    button.role = 'button';
    button.classList.add('arrow-icon-btn');
    // Add event listener for the button
    button.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent default button behavior if it's inside an anchor
      e.stopPropagation(); // Stop propagation to prevent the cardAnchor's click from firing
      if (cardAnchor.href) {
        if (cardAnchor.target === '_blank') {
          window.open(cardAnchor.href, '_blank');
        } else {
          window.location.href = cardAnchor.href;
        }
      }
    });

    // Assuming the SVG image is not part of the model, so it's not added here.
    // If it were in the model, it would be handled via a reference field.
    // Based on ORIGINAL HTML, the SVG is directly inside the button.
    const svgImg = document.createElement('img');
    svgImg.alt = 'svg file';
    svgImg.src = '/content/dam/aemigrate/uploaded-folder/image/1775815894002.svg+xml'; // Hardcoded from ORIGINAL HTML
    button.append(svgImg);

    redirectedBtn.append(button);
    textCenter.append(redirectedBtn);

    cardAnchor.append(textCenter);
    section.append(cardAnchor);
  });

  block.textContent = '';
  block.append(headingContainer, section);
}
