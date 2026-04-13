import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row');

  [...block.children].forEach((cardRow) => {
    // Use content detection instead of array destructuring for robustness
    const cells = [...cardRow.children];
    const imageCell = cells.find((cell) => cell.querySelector('picture'));
    const headlineCell = cells.find((cell) => !cell.querySelector('picture') && cell.textContent.trim() !== '' && cell.querySelector('a') === null);
    const descriptionCell = cells.find((cell) => cell.querySelector('p'));
    const ctaLinkCell = cells.find((cell) => cell.querySelector('a') && cell.querySelector('a').href && cell.querySelector('a').textContent.trim() === 'CTA Link link');
    const ctaLinkLabelCell = cells.find((cell) => cell.querySelector('a') && cell.querySelector('a').href && cell.querySelector('a').textContent.trim() !== 'CTA Link link');


    const colDiv = document.createElement('div');
    colDiv.classList.add('col-xl-4', 'col-lg-6', 'pb-md-0', 'pb-4', 'row-gap-4', 'koi-rscard-padding');
    moveInstrumentation(cardRow, colDiv);

    const card = document.createElement('div');
    card.classList.add('card', 'rs-card');

    // Image
    if (imageCell) {
      const picture = imageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
          optimizedPic.classList.add('w-100', 'kitchens-image');
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          card.append(optimizedPic);
        }
      }
    }


    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    // CTA Link and Label (combined into an anchor element)
    if (ctaLinkCell && ctaLinkLabelCell) {
      const ctaLink = ctaLinkCell.querySelector('a');
      if (ctaLink) {
        const anchor = document.createElement('a');
        anchor.href = ctaLink.href;
        anchor.setAttribute('aria-label', `Read more about '${headlineCell ? headlineCell.textContent.trim() : ''}'`);
        anchor.setAttribute('target', '_self');
        // The original HTML has an img inside the anchor, but the block model doesn't provide an icon field.
        // We will only add the anchor with text content as per the model.
        anchor.textContent = ctaLinkLabelCell ? ctaLinkLabelCell.textContent.trim() : '';
        moveInstrumentation(ctaLinkCell, anchor);
        cardBody.append(anchor);
      }
    }


    // Headline
    if (headlineCell) {
      const headline = document.createElement('h5');
      headline.classList.add('blog-card-title');
      moveInstrumentation(headlineCell, headline);
      while (headlineCell.firstChild) headline.append(headlineCell.firstChild);
      cardBody.append(headline);
    }


    // Description
    if (descriptionCell) {
      const description = document.createElement('h5');
      description.classList.add('card-title');
      moveInstrumentation(descriptionCell, description);
      while (descriptionCell.firstChild) description.append(descriptionCell.firstChild);
      cardBody.append(description);
    }


    card.append(cardBody);
    colDiv.append(card);
    rowDiv.append(colDiv);
  });

  const tabPara = document.createElement('div');
  tabPara.classList.add('tab-para');
  rowDiv.append(tabPara);

  block.textContent = '';
  block.append(rowDiv);
}
