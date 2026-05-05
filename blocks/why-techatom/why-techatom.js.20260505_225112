import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headlineRow, ...cardRows] = [...block.children];

  const whyTechatomContainer = document.createElement('div');
  whyTechatomContainer.classList.add('why-techatom-container', 'shadow-lg');

  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row', 'justify-content-around', 'gy-5');

  const headline = document.createElement('h2');
  moveInstrumentation(headlineRow, headline);
  // Headline is richtext, so read innerHTML from the cell
  const [headlineCell] = [...headlineRow.children];
  headline.innerHTML = headlineCell?.innerHTML || '';

  // Find the text content that needs the curve-underline
  // Use textContent from the headline element itself to get the combined text
  const headlineText = headline.textContent;
  const techatomIndex = headlineText.toLowerCase().indexOf('techatom');

  if (techatomIndex !== -1) {
    const beforeText = headlineText.substring(0, techatomIndex);
    const techatomText = headlineText.substring(techatomIndex, techatomIndex + 'techatom'.length);
    const afterText = headlineText.substring(techatomIndex + 'techatom'.length);

    // Clear existing content and reconstruct with span
    headline.innerHTML = '';
    // The original HTML shows the text directly inside <h2>, not inside a <p> within <h2>
    // So, we directly append the text nodes and the span.
    headline.append(document.createTextNode(beforeText));
    const span = document.createElement('span');
    span.classList.add('curve-underline');
    span.textContent = techatomText;
    headline.append(span);
    headline.append(document.createTextNode(afterText));
  }

  rowDiv.append(headline);

  cardRows.forEach((row) => {
    const [linkCell, imageCell, titleCell, descriptionCell] = [...row.children];

    const cardLink = document.createElement('a');
    cardLink.classList.add('d-block', 'why-card', 'col-lg-4', 'col-12');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      cardLink.href = foundLink.href;
    } else {
      cardLink.href = '#'; // Fallback if no link is found
    }
    moveInstrumentation(row, cardLink);

    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        const optimizedImg = optimizedPic.querySelector('img');
        // Corrected class detection based on original HTML and common patterns
        const altTextLower = img.alt.toLowerCase();
        if (altTextLower.includes('expert') || altTextLower.includes('customer')) {
          optimizedImg.classList.add('expert-svg');
        } else if (altTextLower.includes('badge')) {
          optimizedImg.classList.add('badge-svg');
        }
        cardLink.append(optimizedPic);
      }
    }

    const cardTitle = document.createElement('h3');
    cardTitle.textContent = titleCell.textContent.trim();
    cardLink.append(cardTitle);

    const cardDescription = document.createElement('p');
    cardDescription.innerHTML = descriptionCell.innerHTML;
    cardLink.append(cardDescription);

    rowDiv.append(cardLink);
  });

  whyTechatomContainer.append(rowDiv);
  block.replaceChildren(whyTechatomContainer);
}
