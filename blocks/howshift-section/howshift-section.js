import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rows = [...block.children];

  // Based on BlockJson, there are 7 root fields:
  // leftImage, heading, subHeading, subText, items, buttonLabel, buttonUrl
  // 'items' is a reference to the first item row, so we need to account for it
  // and then slice the remaining item rows.

  const leftImageRow = rows[0];
  const headingRow = rows[1];
  const subHeadingRow = rows[2];
  const subTextRow = rows[3];
  // rows[4] is the start of the "items" field, which can have multiple rows.
  // The last two rows are always buttonLabel and buttonUrl.
  const buttonLabelRow = rows[rows.length - 2];
  const buttonUrlRow = rows[rows.length - 1];

  block.classList.add('howshift-section');

  // Left Image
  const leftImageDiv = document.createElement('div');
  leftImageDiv.classList.add('howshift-left-image-div');
  moveInstrumentation(leftImageRow, leftImageDiv);
  const picture = leftImageRow.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      leftImageDiv.append(optimizedPic);
    }
  }
  block.append(leftImageDiv);

  // Content container
  const contentContainer = document.createElement('div');
  contentContainer.classList.add('howshift-container-read-more', 'read-more');

  // Heading
  const heading = document.createElement('h1');
  heading.classList.add('howshift-heading', 'text-center', 'pb-4');
  moveInstrumentation(headingRow, heading);
  heading.append(...headingRow.children[0].childNodes);
  contentContainer.append(heading);

  // Read More Text (Sub Heading and Sub Text)
  const readMoreTextDiv = document.createElement('div');
  readMoreTextDiv.classList.add('howshift-read-more-text');

  const subHeading = document.createElement('h2');
  subHeading.classList.add('howshift-read-more-h2');
  moveInstrumentation(subHeadingRow, subHeading);
  subHeading.append(...subHeadingRow.children[0].childNodes);
  readMoreTextDiv.append(subHeading);

  const subText = document.createElement('p');
  subText.classList.add('howshift-read-more-p');
  moveInstrumentation(subTextRow, subText);
  subText.append(...subTextRow.children[0].childNodes);
  readMoreTextDiv.append(subText);

  contentContainer.append(readMoreTextDiv);

  // Read More Toggle
  const readMoreToggle = document.createElement('span');
  readMoreToggle.classList.add('howshift-read-more-toggle', 'readMore');
  readMoreToggle.addEventListener('click', () => {
    readMoreTextDiv.classList.toggle('expanded');
    readMoreToggle.classList.toggle('expanded');
  });
  contentContainer.append(readMoreToggle);

  // Howshift Items Wrapper
  const itemsWrapper = document.createElement('div');
  itemsWrapper.classList.add('howshift-why-shift-wrapper', 'd-flex', 'justify-content-evenly', 'flex-wrap');

  // The item rows are between subTextRow (index 3) and buttonLabelRow (rows.length - 2)
  // So, they start from index 4 and go up to rows.length - 3.
  const itemRows = rows.slice(4, rows.length - 2);

  itemRows.forEach((row) => {
    // Each item row has 3 cells: itemImage, itemLabel, itemUrl
    const cells = [...row.children];
    if (cells.length !== 3) {
      // eslint-disable-next-line no-console
      console.warn('Howshift-Section: Item row does not have 3 cells as expected.', row);
      return;
    }

    const itemImageCell = cells[0];
    const itemLabelCell = cells[1];
    const itemUrlCell = cells[2];

    const itemDiv = document.createElement('div');
    itemDiv.classList.add('howshift-item', 'text-center', 'mb-md-0', 'mb-3');
    moveInstrumentation(row, itemDiv);

    const itemImageWrapper = document.createElement('div');
    itemImageWrapper.classList.add('howshift-health-goal-wrapper');

    const pictureElement = itemImageCell.querySelector('picture');
    if (pictureElement) {
      const img = pictureElement.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        itemImageWrapper.append(optimizedPic);
      }
    }
    itemDiv.append(itemImageWrapper);

    const itemLink = document.createElement('a');
    itemLink.classList.add('howshift-image-label', 'text-center', 'd-block', 'text-capitalize', 'pt-2');

    const foundLink = itemUrlCell.querySelector('a');
    if (foundLink) {
      itemLink.href = foundLink.href;
      // The alt text should come from the itemLabelCell content, not the URL text
      itemLink.alt = itemLabelCell.textContent.trim();
      moveInstrumentation(itemUrlCell, itemLink); // Instrument the link from the URL cell
    }

    // Append content from itemLabelCell to the link
    moveInstrumentation(itemLabelCell, itemLink); // Instrument the link from the label cell
    while (itemLabelCell.firstChild) itemLink.append(itemLabelCell.firstChild);

    itemDiv.append(itemLink);
    itemsWrapper.append(itemDiv);
  });

  contentContainer.append(itemsWrapper);

  // Mobile Spacer
  const mobileSpacer = document.createElement('div');
  mobileSpacer.classList.add('howshift-mobile-spacer', 'd-md-none', 'd-block');
  contentContainer.append(mobileSpacer);

  // Button
  const buttonDiv = document.createElement('div');
  buttonDiv.classList.add('howshift-button', 'button');

  const buttonLink = document.createElement('a');
  buttonLink.classList.add('howshift-cmp-button', 'cmp-button');
  buttonLink.target = '_blank';

  const buttonLabelSpan = document.createElement('span');
  buttonLabelSpan.classList.add('howshift-cmp-button-text', 'cmp-button__text');
  moveInstrumentation(buttonLabelRow, buttonLabelSpan);
  buttonLabelSpan.append(...buttonLabelRow.children[0].childNodes);
  buttonLink.append(buttonLabelSpan);

  const buttonUrlCell = buttonUrlRow.children[0];
  const foundButtonLink = buttonUrlCell.querySelector('a');
  if (foundButtonLink) {
    buttonLink.href = foundButtonLink.href;
    buttonLink.alt = buttonLabelSpan.textContent; // Use button label as alt text
  }

  const screenReaderSpan = document.createElement('span');
  screenReaderSpan.classList.add('howshift-link-screen-reader-only', 'cmp-link__screen-reader-only');
  screenReaderSpan.textContent = 'opens in a new tab';
  buttonLink.append(screenReaderSpan);

  buttonDiv.append(buttonLink);
  contentContainer.append(buttonDiv);

  block.textContent = '';
  block.append(contentContainer);
}
