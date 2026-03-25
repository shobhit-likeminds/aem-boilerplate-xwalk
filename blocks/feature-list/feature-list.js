import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Root model fields: title, image, features (container), buttons (container)
  // The EDS BLOCK STRUCTURE shows 4 root rows for these fields, followed by item rows.
  const [titleRow, imageRow, featuresContainerRow, buttonsContainerRow, ...itemRows] = [...block.children];

  // Title
  const titleDiv = document.createElement('div');
  moveInstrumentation(titleRow, titleDiv);
  titleDiv.classList.add('title');
  // The title content is in the first child div of titleRow
  const titleContentDiv = titleRow.querySelector('div');
  if (titleContentDiv) {
    while (titleContentDiv.firstChild) titleDiv.append(titleContentDiv.firstChild);
  }

  // Image
  const imageLink = document.createElement('a');
  moveInstrumentation(imageRow, imageLink);
  imageLink.classList.add('image', 'featured');
  const picture = imageRow.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    if (img) {
      // Original HTML uses #, EDS model does not provide a link for the image, so keep #
      imageLink.href = '#';
      imageLink.append(picture);
    }
  }

  // Features and Buttons section
  const featuresSection = document.createElement('section');
  featuresSection.id = 'features'; // ID from original HTML

  const header = document.createElement('header');
  header.classList.add('style1'); // Class from original HTML

  // The header content (h2 and p) should come from the 'features' container row.
  // The EDS model for 'feature-list' does not define fields for these directly,
  // but the 'featuresContainerRow' is available.
  // Based on the original HTML, these are static. For now, we'll create them
  // and if the model is updated, we can pull content.
  // For now, we'll use the content of the featuresContainerRow's first child div as h2.
  const h2 = document.createElement('h2');
  const p = document.createElement('p');
  const featuresContainerContentDiv = featuresContainerRow.querySelector('div');
  if (featuresContainerContentDiv) {
    // Assuming the content of the featuresContainerRow is meant for the header h2
    // If the model gets updated with specific header fields, this can be refined.
    h2.textContent = featuresContainerContentDiv.textContent;
    moveInstrumentation(featuresContainerRow, h2); // Move instrumentation from the container row to the header
  }
  // The paragraph <p> is not explicitly in the EDS model for the header,
  // so it will remain empty unless the model is updated.
  header.append(h2, p);
  featuresSection.append(header);

  const featureListDiv = document.createElement('div');
  featureListDiv.classList.add('feature-list'); // Class from original HTML
  const featureRowDiv = document.createElement('div');
  featureRowDiv.classList.add('row'); // Class from original HTML

  const buttonList = document.createElement('ul');
  buttonList.classList.add('actions', 'special'); // Classes from original HTML

  itemRows.forEach((row) => {
    const cells = [...row.children];
    // Check for Feature item: 3 cells, first two are text, third is richtext (contains <p>)
    if (cells.length === 3 && cells[0].textContent && cells[1].textContent && cells[2].querySelector('p')) {
      const colDiv = document.createElement('div');
      colDiv.classList.add('col-6', 'col-12-medium'); // Classes from original HTML
      const section = document.createElement('section');
      const h3 = document.createElement('h3');
      // Icon class from content (e.g., 'fa-comment', 'solid fa-sync')
      h3.classList.add('icon', ...cells[0].textContent.split(' ').filter(Boolean));
      moveInstrumentation(cells[0], h3);
      h3.textContent = cells[1].textContent;
      moveInstrumentation(cells[1], h3);
      const featureP = document.createElement('p');
      moveInstrumentation(cells[2], featureP);
      // Append all children from the rich text cell
      while (cells[2].firstChild) featureP.append(cells[2].firstChild);

      section.append(h3, featureP);
      colDiv.append(section);
      featureRowDiv.append(colDiv);
    }
    // Check for Button item: 2 cells, first is text (label), second is aem-content (contains <a>)
    else if (cells.length === 2 && cells[0].textContent && cells[1].querySelector('a')) {
      const li = document.createElement('li');
      const buttonLink = document.createElement('a');
      const foundLink = cells[1].querySelector('a');
      if (foundLink) {
        buttonLink.href = foundLink.href;
        buttonLink.textContent = cells[0].textContent;
      }
      // Assuming style1 large for all buttons based on original HTML
      buttonLink.classList.add('button', 'style1', 'large'); // Classes from original HTML
      moveInstrumentation(row, li);
      li.append(buttonLink);
      buttonList.append(li);
    }
  });

  featureListDiv.append(featureRowDiv);
  featuresSection.append(featureListDiv, buttonList);

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container'); // Class from original HTML
  containerDiv.append(imageLink, featuresSection);

  block.textContent = '';
  block.classList.add('wrapper', 'style2'); // Classes from original HTML
  block.append(titleDiv, containerDiv);

  // Optimize images
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
