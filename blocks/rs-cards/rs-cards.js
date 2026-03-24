import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  block.classList.add('rsCards-rs-cards');

  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row');

  // Skip the first row which is the container field label
  const itemRows = [...block.children].slice(1);

  itemRows.forEach((row) => {
    const colDiv = document.createElement('div');
    colDiv.classList.add('col-xl-4', 'col-lg-6', 'pb-md-0', 'pb-4', 'row-gap-4', 'rsCards-koi-rscard-padding');
    moveInstrumentation(row, colDiv);

    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card', 'rsCards-rs-card');

    const cells = [...row.children];

    const imageCell = cells[0];
    const titleCell = cells[1];
    const descriptionCell = cells[2];
    const iconCell = cells[3];
    const linkCell = cells[4];

    // Image
    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        // Corrected class name from 'rsCards-kitchens-image' to 'rsCards-rightshift-image' based on original HTML
        optimizedPic.classList.add('w-100', 'rsCards-rightshift-image');
        optimizedPic.querySelector('img').style.display = 'block'; // Ensure it's visible based on original HTML
        moveInstrumentation(imageCell, optimizedPic);
        cardDiv.append(optimizedPic);
      }
    }

    const cardBodyDiv = document.createElement('div');
    cardBodyDiv.classList.add('card-body');

    // Link with Icon
    const foundLink = linkCell.querySelector('a');
    const linkEl = document.createElement('a');
    // The link itself doesn't have 'rsCards-blog-card-title' class in the original HTML, the H5 title does.
    // The original HTML shows the link containing the icon, and the H5 title separately.
    // Re-evaluating the structure: the link is a wrapper for the icon, and the title is a separate H5.
    // The original HTML has an `<a>` tag with `id="explore-btn-hide-id"` and an `<img>` inside it.
    // The `rsCards-blog-card-title` class is on the `h5` element.
    // Let's ensure the link is created correctly as per original HTML.
    if (foundLink) {
      linkEl.href = foundLink.href;
      linkEl.setAttribute('aria-label', `Read more about '${titleCell.textContent.trim()}'`);
      linkEl.setAttribute('target', '_self');
      linkEl.id = 'explore-btn-hide-id'; // Apply ID from original HTML
    }

    const iconPicture = iconCell.querySelector('picture');
    if (iconPicture) {
      const iconImg = iconPicture.querySelector('img');
      if (iconImg) {
        const optimizedIconPic = createOptimizedPicture(iconImg.src, iconImg.alt, false, [{ width: '24' }]); // Assuming a small icon size
        optimizedIconPic.querySelector('img').removeAttribute('loading'); // Remove loading attribute from icon
        moveInstrumentation(iconCell, optimizedIconPic);
        linkEl.append(optimizedIconPic);
      }
    }
    // Append the link (which may contain the icon) to the card body
    cardBodyDiv.append(linkEl);

    // Title
    const titleEl = document.createElement('h5');
    titleEl.classList.add('rsCards-blog-card-title');
    titleEl.style.display = 'block'; // Ensure it's visible based on original HTML
    moveInstrumentation(titleCell, titleEl);
    while (titleCell.firstChild) titleEl.append(titleCell.firstChild);
    cardBodyDiv.append(titleEl);

    // Description
    // Original HTML shows <h5 class="card-title"><p>...</p></h5>
    // The JS was creating an h5 and putting text directly. It should create an h5 and put the p inside.
    // Or, more accurately, the description cell itself contains a <p> tag.
    // The original HTML has <h5 class="card-title"><p>...</p></h5>, so we should replicate that.
    const descriptionWrapperEl = document.createElement('h5');
    descriptionWrapperEl.classList.add('card-title'); // Class from original HTML
    moveInstrumentation(descriptionCell, descriptionWrapperEl);
    // The description cell already contains a <p> tag, so we move that directly.
    while (descriptionCell.firstChild) descriptionWrapperEl.append(descriptionCell.firstChild);
    cardBodyDiv.append(descriptionWrapperEl);

    cardDiv.append(cardBodyDiv);
    colDiv.append(cardDiv);
    rowDiv.append(colDiv);
  });

  const tabParaDiv = document.createElement('div');
  tabParaDiv.classList.add('rsCards-tab-para');
  rowDiv.append(tabParaDiv);

  block.textContent = '';
  block.append(rowDiv);

  // Removed the redundant image optimization loop at the end.
  // Images are optimized when they are created within the loop.
}
