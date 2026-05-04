import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  const whyTechatomContainer = document.createElement('div');
  whyTechatomContainer.classList.add('why-techatom-container', 'shadow-lg');

  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row', 'justify-content-around', 'gy-5');

  // Section Heading
  const [sectionHeadingRow, ...whyCardItems] = children; // Destructure root rows
  const [sectionHeadingCell] = [...sectionHeadingRow.children]; // Destructure cells of heading row

  const h2 = document.createElement('h2');
  moveInstrumentation(sectionHeadingRow, h2);

  // Extract text and handle curve-underline if present
  const sectionHeadingContent = sectionHeadingCell.innerHTML;
  if (sectionHeadingContent.includes('<span class="curve-underline">')) {
    h2.innerHTML = sectionHeadingContent;
  } else {
    h2.textContent = sectionHeadingCell.textContent.trim();
  }
  rowDiv.append(h2);

  // Why Cards
  // whyCardItems are all rows after the heading
  whyCardItems.forEach((row) => {
    const [iconCell, titleCell, descriptionCell, cardLinkCell] = [...row.children];

    const cardLink = document.createElement('a');
    cardLink.classList.add('d-block', 'why-card', 'col-lg-4', 'col-12');

    const foundLink = cardLinkCell.querySelector('a');
    if (foundLink) {
      cardLink.href = foundLink.href;
    } else {
      cardLink.href = '#'; // Fallback link if not found
    }

    // Card Icon
    const picture = iconCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      // createOptimizedPicture returns a <picture> element, not an <img>
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      const optimizedImg = optimizedPic.querySelector('img'); // Get the <img> from the new <picture>

      // Determine the correct SVG class based on alt text or original HTML
      let svgClass = 'expert-svg'; // Default or first observed
      if (img.alt.toLowerCase().includes('badge')) {
        svgClass = 'badge-svg';
      } else if (img.alt.toLowerCase().includes('customer')) {
        svgClass = 'expert-svg'; // Original HTML uses expert-svg for customer
      }
      optimizedImg.classList.add(svgClass);

      moveInstrumentation(img, optimizedImg); // Instrument the new img
      cardLink.append(optimizedPic); // Append the new picture element
    }

    // Card Title
    const h3 = document.createElement('h3');
    h3.textContent = titleCell.textContent.trim();
    cardLink.append(h3);

    // Card Description
    const p = document.createElement('p');
    p.innerHTML = descriptionCell.innerHTML; // richtext content
    cardLink.append(p);

    moveInstrumentation(row, cardLink);
    rowDiv.append(cardLink);
  });

  whyTechatomContainer.append(rowDiv);
  block.replaceChildren(whyTechatomContainer);

  // This block of code is redundant and potentially problematic.
  // createOptimizedPicture should be called once when processing the iconCell.
  // Removing this global picture optimization loop.
  // block.querySelectorAll('picture > img').forEach((img) => {
  //   const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
  //   moveInstrumentation(img, optimizedPic.querySelector('img'));
  //   img.closest('picture').replaceWith(optimizedPic);
  // });
}
