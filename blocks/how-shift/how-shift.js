import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainImageRow = block.children[0];
  const contentRow = block.children[1];

  // Clear the block content initially
  block.textContent = '';

  // Create the main section wrapper
  const section = document.createElement('section');
  section.classList.add('makerightshift-itc-how-shift');
  moveInstrumentation(block, section);

  // Process the main image (first row)
  if (mainImageRow) {
    const leftImageDiv = document.createElement('div');
    leftImageDiv.classList.add('makerightshift-left-image-div');
    leftImageDiv.id = 'leftDivId';

    const imgCell = mainImageRow.children[0];
    if (imgCell) {
      const img = imgCell.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        leftImageDiv.append(optimizedPic);
      }
    }
    section.append(leftImageDiv);
  }

  // Process the content (second row)
  if (contentRow) {
    const containerDiv = document.createElement('div');
    containerDiv.classList.add('makerightshift-container', 'makerightshift-read-more');

    const cells = [...contentRow.children];

    // Heading
    const headingCell = cells[0];
    if (headingCell) {
      const h1 = document.createElement('h1');
      h1.classList.add('makerightshift-rs-heading');
      h1.textContent = headingCell.textContent.trim();
      containerDiv.append(h1);
    }

    // Subheading and Description
    const subheadingCell = cells[1];
    const descriptionCell = cells[2];
    if (subheadingCell || descriptionCell) {
      const readMoreTextDiv = document.createElement('div');
      readMoreTextDiv.classList.add('makerightshift-read-more-text');

      if (subheadingCell) {
        const h2 = document.createElement('h2');
        h2.style.textAlign = 'center';
        h2.textContent = subheadingCell.textContent.trim();
        readMoreTextDiv.append(h2);
      }
      if (descriptionCell) {
        const p = document.createElement('p');
        p.style.textAlign = 'center';
        p.innerHTML = descriptionCell.innerHTML.trim(); // Use innerHTML for rich text
        readMoreTextDiv.append(p);
      }
      containerDiv.append(readMoreTextDiv);
    }

    const spanReadMore = document.createElement('span');
    spanReadMore.classList.add('makerightshift-readMore');
    containerDiv.append(spanReadMore);

    // Why Shift Wrapper (items)
    const whyShiftWrapper = document.createElement('div');
    whyShiftWrapper.classList.add('makerightshift-why-shift-wrapper');

    // Assuming whyShiftItem rows start from the 4th cell (index 3) onwards
    // and each item is a separate row in the block's children after the main content
    const itemRows = block.children.slice(2); // Get all rows after the main image and content rows

    itemRows.forEach((itemRow) => {
      const itemCells = [...itemRow.children];
      if (itemCells.length >= 4) { // Expecting Image, Alt Text, Link, Label
        const textCenterDiv = document.createElement('div');
        textCenterDiv.classList.add('makerightshift-text-center');
        moveInstrumentation(itemRow, textCenterDiv);

        const healthGoalWrapper = document.createElement('div');
        healthGoalWrapper.classList.add('makerightshift-itc-health-goal-wrapper');

        const itemImgCell = itemCells[0];
        const itemImg = itemImgCell.querySelector('img');
        if (itemImg) {
          const optimizedPic = createOptimizedPicture(itemImg.src, itemImg.alt);
          moveInstrumentation(itemImg, optimizedPic.querySelector('img'));
          healthGoalWrapper.append(optimizedPic);
        }
        textCenterDiv.append(healthGoalWrapper);

        const itemLinkCell = itemCells[2];
        const itemLabelCell = itemCells[3];
        if (itemLinkCell && itemLabelCell) {
          const link = itemLinkCell.querySelector('a');
          if (link) {
            const newLink = document.createElement('a');
            newLink.href = link.href;
            newLink.alt = link.alt || ''; // Assuming alt text might be on the link or derived
            newLink.classList.add('makerightshift-image-label');
            newLink.innerHTML = itemLabelCell.innerHTML.trim(); // Use innerHTML for potential <br>
            textCenterDiv.append(newLink);
          }
        }
        whyShiftWrapper.append(textCenterDiv);
      }
    });
    containerDiv.append(whyShiftWrapper);

    // CTA Button
    const ctaLinkCell = cells[3]; // Assuming CTA Link is the 4th cell in the content row
    const ctaTextCell = cells[4]; // Assuming CTA Text is the 5th cell in the content row

    if (ctaLinkCell && ctaTextCell) {
      const buttonDiv = document.createElement('div');
      buttonDiv.classList.add('makerightshift-button', 'makerightshift-how-shift-button');

      const link = ctaLinkCell.querySelector('a');
      if (link) {
        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.target = '_blank'; // Assuming target blank from original HTML
        newLink.id = `button-${Math.random().toString(36).substring(2, 11)}`; // Generate a unique ID
        newLink.alt = link.textContent.trim(); // Use link text as alt
        newLink.classList.add('makerightshift-cmp-button');
        // Transfer data-cmp-data-layer if present
        if (link.dataset.cmpDataLayer) {
          newLink.dataset.cmpDataLayer = link.dataset.cmpDataLayer;
        }

        const spanText = document.createElement('span');
        spanText.classList.add('makerightshift-cmp-button__text');
        spanText.textContent = ctaTextCell.textContent.trim();
        newLink.append(spanText);

        const spanScreenReader = document.createElement('span');
        spanScreenReader.classList.add('makerightshift-cmp-link__screen-reader-only');
        spanScreenReader.textContent = 'opens in a new tab';
        newLink.append(spanScreenReader);

        buttonDiv.append(newLink);
      }
      containerDiv.append(buttonDiv);
    }
  }

  block.append(section);
}
