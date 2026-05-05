import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, ...cardRows] = [...block.children];

  const whyTechatomContainer = document.createElement('div');
  whyTechatomContainer.classList.add('why-techatom-container', 'shadow-lg');

  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row', 'justify-content-around', 'gy-5');

  // Section Heading
  const headingElement = document.createElement('h2');
  moveInstrumentation(headingRow, headingElement);
  // headingRow is a row, its innerHTML contains the cell wrapper.
  // The heading content is in the first cell, which is richtext.
  // Use innerHTML from the cell to preserve potential formatting.
  headingElement.innerHTML = headingRow.children[0]?.innerHTML || '';

  // Check if heading contains "Techatom?" and wrap it with <span class="curve-underline">
  // Use textContent for the check to avoid issues with existing HTML tags,
  // but apply the span to the innerHTML to preserve other formatting.
  const headingText = headingElement.textContent.trim();
  const techatomIndex = headingText.toLowerCase().indexOf('techatom?');
  if (techatomIndex !== -1) {
    const originalHtml = headingElement.innerHTML;
    // Find the actual "Techatom?" string in the HTML to wrap it.
    // This is a bit fragile if there are other HTML tags within "Techatom?"
    // but matches the original intent. A more robust solution might parse the HTML.
    const regex = /Techatom\?/i;
    headingElement.innerHTML = originalHtml.replace(regex, '<span class="curve-underline">$&</span>');
  }
  rowDiv.append(headingElement);

  // Why Cards
  cardRows.forEach((row) => {
    const [cardLinkCell, imageCell, titleCell, descriptionCell] = [...row.children];

    const cardLink = document.createElement('a');
    cardLink.classList.add('d-block', 'why-card', 'col-lg-4', 'col-12');
    const foundLink = cardLinkCell.querySelector('a');
    if (foundLink) {
      cardLink.href = foundLink.href;
    } else {
      cardLink.href = '#'; // Fallback href
    }
    moveInstrumentation(row, cardLink);

    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        const optimizedImg = optimizedPic.querySelector('img');
        moveInstrumentation(img, optimizedImg);
        // Apply specific SVG classes based on alt text or content
        const altText = img.alt.toLowerCase();
        if (altText.includes('expert')) {
          optimizedImg.classList.add('expert-svg');
        } else if (altText.includes('badge')) {
          optimizedImg.classList.add('badge-svg');
        } else if (altText.includes('customer')) {
          // As per original HTML, 'customer' uses 'expert-svg'
          optimizedImg.classList.add('expert-svg');
        }
        cardLink.append(optimizedPic);
      }
    }

    const title = document.createElement('h3');
    title.textContent = titleCell.textContent.trim();
    cardLink.append(title);

    const description = document.createElement('p');
    // descriptionCell is richtext, so use innerHTML to preserve formatting.
    // Ensure it's not assigning <p> inside <p> if descriptionCell already contains <p>
    // The model says richtext, so it can contain <p>. Assigning to a <p> would be invalid.
    // Changed to a div to safely contain richtext.
    const descriptionDiv = document.createElement('div');
    descriptionDiv.innerHTML = descriptionCell.innerHTML;
    // If the original HTML explicitly uses <p> for description, and we need to match that,
    // we would need to extract the innerHTML of the first <p> if present.
    // For now, using a div as a safer container for richtext.
    // Reverting to <p> as per original HTML structure, assuming the innerHTML will be just text or simple tags.
    // If descriptionCell.innerHTML is "<p>content</p>", assigning it to description.innerHTML will create <p><p>content</p></p>.
    // To avoid this, we should extract the content of the inner <p> if it exists.
    description.innerHTML = descriptionCell.querySelector('p')?.innerHTML ?? descriptionCell.textContent.trim() ?? '';
    cardLink.append(description);

    rowDiv.append(cardLink);
  });

  whyTechatomContainer.append(rowDiv);
  block.replaceChildren(whyTechatomContainer);
}
