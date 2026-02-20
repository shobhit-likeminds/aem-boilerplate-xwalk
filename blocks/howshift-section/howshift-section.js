import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Create the main section wrapper and apply its class
  const section = document.createElement('section');
  section.classList.add('howshift-section');

  // Process the first row for main image, heading, subheading, description, and button
  const firstRow = block.children[0];
  if (firstRow) {
    const cells = [...firstRow.children];

    // Cell 1: Main Image
    const mainImageDiv = document.createElement('div');
    mainImageDiv.classList.add('howshift-left-image-div');
    mainImageDiv.id = 'leftDivId'; // Copy ID from source HTML
    const mainImageCell = cells[0];
    if (mainImageCell) {
      const img = mainImageCell.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        mainImageDiv.append(optimizedPic);
      }
    }
    section.append(mainImageDiv);

    // Create the right container for text and items
    const containerReadMore = document.createElement('div');
    containerReadMore.classList.add('howshift-container-read-more');

    // Cell 2: Heading
    const headingCell = cells[1];
    if (headingCell) {
      const h1 = document.createElement('h1');
      h1.classList.add('howshift-heading', 'text-center', 'pb-4');
      h1.textContent = headingCell.textContent.trim();
      containerReadMore.append(h1);
    }

    // Cell 3 & 4: Subheading and Description (combined into howshift-read-more-text)
    const readMoreTextDiv = document.createElement('div');
    readMoreTextDiv.classList.add('howshift-read-more-text');
    const subheadingCell = cells[2];
    if (subheadingCell) {
      const h2 = document.createElement('h2');
      // Copy inline style from source HTML
      h2.style.textAlign = 'center';
      h2.innerHTML = subheadingCell.innerHTML.trim(); // Use innerHTML to preserve potential formatting
      readMoreTextDiv.append(h2);
    }
    const descriptionCell = cells[3];
    if (descriptionCell) {
      const p = document.createElement('p');
      // Copy inline style from source HTML
      p.style.textAlign = 'center';
      p.innerHTML = descriptionCell.innerHTML.trim(); // Use innerHTML to preserve potential formatting
      readMoreTextDiv.append(p);
    }
    containerReadMore.append(readMoreTextDiv);

    // Add the empty span from source HTML
    const readMoreSpan = document.createElement('span');
    readMoreSpan.classList.add('howshift-readMore');
    containerReadMore.append(readMoreSpan);

    // Cell 5: Button Text
    const buttonTextCell = cells[4];
    let buttonText = '';
    if (buttonTextCell) {
      buttonText = buttonTextCell.textContent.trim();
    }

    // Cell 6: Button Link
    const buttonLinkCell = cells[5];
    let buttonLink = '';
    if (buttonLinkCell) {
      const linkEl = buttonLinkCell.querySelector('a');
      if (linkEl) {
        buttonLink = linkEl.href;
      }
    }

    // Create the wrapper for howshift items
    const whyShiftWrapper = document.createElement('div');
    whyShiftWrapper.classList.add('howshift-why-shift-wrapper', 'd-flex', 'justify-content-evenly', 'flex-wrap');
    containerReadMore.append(whyShiftWrapper);

    // Process remaining rows as howshift items
    [...block.children].slice(1).forEach((row) => {
      const itemDiv = document.createElement('div');
      moveInstrumentation(row, itemDiv);
      itemDiv.classList.add('howshift-mb-md-0', 'howshift-mb-3', 'text-center');

      const itemCells = [...row.children];

      // Item Image
      const healthGoalWrapper = document.createElement('div');
      healthGoalWrapper.classList.add('howshift-health-goal-wrapper');
      const itemImageCell = itemCells[0];
      if (itemImageCell) {
        const img = itemImageCell.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]); // Smaller width for item images
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          healthGoalWrapper.append(optimizedPic);
        }
      }
      itemDiv.append(healthGoalWrapper);

      // Item Link and Label
      const itemLinkCell = itemCells[2]; // Link is in the third cell
      const itemLabelCell = itemCells[3]; // Label is in the fourth cell

      if (itemLinkCell && itemLabelCell) {
        const linkEl = itemLinkCell.querySelector('a');
        const a = document.createElement('a');
        a.classList.add('howshift-image-label', 'text-center', 'd-block', 'text-capitalize', 'pt-2');
        if (linkEl) {
          a.href = linkEl.href;
          a.alt = linkEl.alt || ''; // Copy alt attribute if present
        }
        a.innerHTML = itemLabelCell.innerHTML.trim(); // Use innerHTML to preserve potential <br> tags
        itemDiv.append(a);
      }
      whyShiftWrapper.append(itemDiv);
    });

    // Add the empty div for responsive spacing
    const responsiveDiv = document.createElement('div');
    responsiveDiv.classList.add('d-md-none', 'd-block');
    containerReadMore.append(responsiveDiv);

    // Add the button at the end
    if (buttonText && buttonLink) {
      const buttonDiv = document.createElement('div');
      buttonDiv.classList.add('howshift-button');

      const buttonA = document.createElement('a');
      buttonA.classList.add('howshift-cmp-button');
      buttonA.target = '_blank';
      buttonA.href = buttonLink;
      buttonA.alt = buttonText; // Use buttonText for alt attribute
      buttonA.id = `button-${Math.random().toString(36).substring(2, 10)}`; // Generate a unique ID

      const buttonSpanText = document.createElement('span');
      buttonSpanText.classList.add('howshift-cmp-button__text');
      buttonSpanText.textContent = buttonText;
      buttonA.append(buttonSpanText);

      const buttonSpanScreenReader = document.createElement('span');
      buttonSpanScreenReader.classList.add('howshift-link__screen-reader-only');
      buttonSpanScreenReader.textContent = 'opens in a new tab';
      buttonA.append(buttonSpanScreenReader);

      buttonDiv.append(buttonA);
      containerReadMore.append(buttonDiv);
    }

    section.append(containerReadMore);
  }

  // Clear the block and append the new structure
  block.textContent = '';
  block.append(section);
}
