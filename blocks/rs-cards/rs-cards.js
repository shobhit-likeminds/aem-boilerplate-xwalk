import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row');

  // Skip the first row which is the container title.
  [...block.children].slice(1).forEach((row) => {
    const colDiv = document.createElement('div');
    colDiv.classList.add('col-xl-4', 'col-lg-6', 'pb-md-0', 'pb-4', 'row-gap-4', 'koi-rscard-padding');
    moveInstrumentation(row, colDiv);

    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card', 'rs-card');

    const cardBodyDiv = document.createElement('div');
    cardBodyDiv.classList.add('card-body');

    // Each row represents an 'rs-card' item with 3 cells: image, blog-card-title, card-title
    const cells = [...row.children];

    // Cell 0: Image
    const imageCell = cells[0];
    if (imageCell) {
      const picture = imageCell.querySelector('picture');
      const img = picture ? picture.querySelector('img') : null;
      if (img) {
        const rightshiftImage = document.createElement('img');
        rightshiftImage.classList.add('w-100', 'rightshift-image');
        rightshiftImage.setAttribute('loading', 'lazy');
        rightshiftImage.alt = img.alt;
        rightshiftImage.style.display = 'none'; // Based on original HTML

        const kitchensImage = document.createElement('img');
        kitchensImage.classList.add('w-100', 'kitchens-image');
        kitchensImage.setAttribute('loading', 'lazy');
        kitchensImage.alt = 'variation image'; // Based on original HTML

        // Optimize the image
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        kitchensImage.src = optimizedPic.querySelector('img').src;
        kitchensImage.style.display = 'block'; // Based on original HTML

        cardDiv.append(rightshiftImage, kitchensImage);
      }
    }

    // Handle the 'explore-btn-hide-id' link if present in the original HTML
    // It's not part of the BlockJson model, but present in the original HTML structure
    // We'll create a placeholder for it if it's not explicitly in a cell.
    // Based on the original HTML, it appears before the blog-card-title inside card-body.
    const exploreLink = document.createElement('a');
    exploreLink.setAttribute('aria-label', 'Read more about \'\''); // Placeholder, will be updated by content if available
    exploreLink.setAttribute('target', '_self');
    exploreLink.setAttribute('id', 'explore-btn-hide-id');
    exploreLink.style.display = 'none'; // Default to hidden as per original HTML
    const exploreLinkImg = document.createElement('img');
    exploreLinkImg.setAttribute('loading', 'lazy');
    exploreLinkImg.src = '/content/dam/aemigrate/uploaded-folder/image/1774521237965.svg+xml'; // From original HTML
    exploreLink.append(exploreLinkImg);
    cardBodyDiv.append(exploreLink);


    // Cell 1: Blog Card Title
    const blogCardTitleCell = cells[1];
    if (blogCardTitleCell && blogCardTitleCell.textContent.trim()) {
      const blogCardTitle = document.createElement('h5');
      blogCardTitle.classList.add('blog-card-title');
      blogCardTitle.style.display = 'block'; // Based on original HTML
      moveInstrumentation(blogCardTitleCell, blogCardTitle);
      blogCardTitle.textContent = blogCardTitleCell.textContent.trim();
      cardBodyDiv.append(blogCardTitle);
      // Update aria-label for the explore link
      exploreLink.setAttribute('aria-label', `Read more about '${blogCardTitle.textContent.trim()}'`);
    }

    // Cell 2: Card Title (richtext)
    const cardTitleCell = cells[2];
    if (cardTitleCell && cardTitleCell.textContent.trim()) {
      const cardTitle = document.createElement('h5');
      cardTitle.classList.add('card-title');
      moveInstrumentation(cardTitleCell, cardTitle);
      // Append all children from the cell to the new h5 element
      while (cardTitleCell.firstChild) {
        cardTitle.append(cardTitleCell.firstChild);
      }
      cardBodyDiv.append(cardTitle);
    }

    cardDiv.append(cardBodyDiv);
    colDiv.append(cardDiv);
    rowDiv.append(colDiv);
  });

  const tabPara = document.createElement('div');
  tabPara.classList.add('tab-para');
  rowDiv.append(tabPara);

  block.textContent = '';
  block.append(rowDiv);
}
