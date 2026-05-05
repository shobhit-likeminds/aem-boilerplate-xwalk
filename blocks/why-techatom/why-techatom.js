import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  const headlineRow = children[0];
  const cardRows = children.slice(1);

  const whyTechatomContainer = document.createElement('div');
  whyTechatomContainer.classList.add('why-techatom-container', 'shadow-lg');

  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row', 'justify-content-around', 'gy-5');

  const headline = document.createElement('h2');
  moveInstrumentation(headlineRow, headline);
  headline.innerHTML = headlineRow.children[0]?.innerHTML || '';
  const span = headline.querySelector('span');
  if (span) {
    span.classList.add('curve-underline');
  }
  rowDiv.append(headline);

  cardRows.forEach((row) => {
    const [cardLinkCell, imageCell, titleCell, descriptionCell] = [...row.children];

    const cardLink = document.createElement('a');
    cardLink.classList.add('d-block', 'why-card', 'col-lg-4', 'col-12');
    moveInstrumentation(row, cardLink);

    const foundLink = cardLinkCell.querySelector('a');
    if (foundLink) {
      cardLink.href = foundLink.href;
    }

    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        const optimizedImg = optimizedPic.querySelector('img');
        moveInstrumentation(img, optimizedImg);
        // Check alt text to apply specific classes
        if (img.alt === 'expert' || img.alt === 'customer') {
          optimizedImg.classList.add('expert-svg');
        } else if (img.alt === 'badge') {
          optimizedImg.classList.add('badge-svg');
        }
        cardLink.append(optimizedPic);
      }
    }

    const title = document.createElement('h3');
    title.textContent = titleCell.textContent.trim();
    cardLink.append(title);

    const description = document.createElement('p');
    description.innerHTML = descriptionCell.innerHTML;
    cardLink.append(description);

    rowDiv.append(cardLink);
  });

  whyTechatomContainer.append(rowDiv);
  block.replaceChildren(whyTechatomContainer);
}
