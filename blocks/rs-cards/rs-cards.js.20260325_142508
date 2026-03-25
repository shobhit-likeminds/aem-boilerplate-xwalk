import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The first row is the container label, so we skip it to get the item rows.
  // BlockJson indicates one root model field "cards" which is a container of "rs-card" items.
  // Each "rs-card" item has 3 fields: "image", "title", "text".
  const itemRows = [...block.children].slice(1);

  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row');

  itemRows.forEach((row) => {
    const colDiv = document.createElement('div');
    moveInstrumentation(row, colDiv);
    // Classes from original HTML for column layout
    colDiv.classList.add('col-xl-4', 'col-lg-6', 'pb-md-0', 'pb-4', 'row-gap-4', 'rs-cards-koi-rscard-padding');

    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card', 'rs-cards-rs-card');

    // Destructure cells based on BlockJson model for 'rs-card': image, title, text
    const [imageCell, titleCell, textCell, linkCell] = [...row.children]; // Added linkCell to capture potential link

    // Image
    if (imageCell) {
      const picture = imageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
          const newImg = optimizedPic.querySelector('img');
          moveInstrumentation(img, newImg);
          // Class from original HTML for the image
          newImg.classList.add('w-100', 'rs-cards-kitchens-image');
          newImg.style.display = 'block';
          cardDiv.append(optimizedPic);
        }
      }
    }

    const cardBodyDiv = document.createElement('div');
    cardBodyDiv.classList.add('card-body');

    // Title
    if (titleCell) {
      const h5Title = document.createElement('h5');
      moveInstrumentation(titleCell, h5Title);
      // Class from original HTML for the title
      h5Title.classList.add('rs-cards-blog-card-title');
      h5Title.style.display = 'block';
      while (titleCell.firstChild) h5Title.append(titleCell.firstChild);
      cardBodyDiv.append(h5Title);
    }

    // Text
    if (textCell) {
      const h5Text = document.createElement('h5');
      moveInstrumentation(textCell, h5Text);
      // Class from original HTML for the text
      h5Text.classList.add('card-title');
      while (textCell.firstChild) h5Text.append(textCell.firstChild);
      cardBodyDiv.append(h5Text);
    }

    // Link (interactive element)
    if (linkCell) {
      const anchor = linkCell.querySelector('a');
      if (anchor) {
        const newAnchor = document.createElement('a');
        moveInstrumentation(anchor, newAnchor);
        // Copy attributes from original anchor
        if (anchor.href) newAnchor.href = anchor.href;
        if (anchor.getAttribute('aria-label')) newAnchor.setAttribute('aria-label', anchor.getAttribute('aria-label'));
        if (anchor.target) newAnchor.target = anchor.target;
        if (anchor.id) newAnchor.id = anchor.id;
        // The original HTML shows `display: none;` for the anchor, but it's an interactive element.
        // If it's meant to be visible and clickable, this style should be removed or toggled.
        // For now, we'll ensure it's appended, and assume CSS will handle its visibility if needed.
        // The original HTML also shows an image inside the anchor, so we append its children.
        while (anchor.firstChild) newAnchor.append(anchor.firstChild);
        cardBodyDiv.append(newAnchor);

        // Add event listener if this link is meant to be interactive beyond simple navigation
        // Based on the ID 'explore-btn-hide-id' and the 'display: none' in original HTML,
        // it suggests this might be a button that becomes visible on interaction or a specific state.
        // For a generic link, no special JS event listener is needed beyond default browser behavior.
        // If it were a toggle/modal/carousel control, an addEventListener would be required.
        // Since it's a standard anchor with an image, default behavior is sufficient.
      }
    }

    cardDiv.append(cardBodyDiv);
    colDiv.append(cardDiv);
    rowDiv.append(colDiv);
  });

  block.textContent = '';
  block.append(rowDiv);
}
