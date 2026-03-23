import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Destructure root model fields.
  // The 'categoriesRow' is a placeholder row for the container, not an item itself.
  // The actual category items start after the CTA row.
  const [
    bannerImageRow,
    headingRow,
    subheadingRow,
    descriptionRow,
    categoriesPlaceholderRow, // This row contains the 'Categories' text, not the actual category items
    ctaRow,
    ...categoryItemRows // These are the actual category items
  ] = [...block.children];

  // Create the main section element
  const section = document.createElement('section');
  section.classList.add('make-right-shift-itc-how-shift'); // Correct prefix

  // Left Image Div
  const leftImageDiv = document.createElement('div');
  leftImageDiv.classList.add('make-right-shift-left-image-div'); // Correct prefix
  leftImageDiv.id = 'leftDivId';
  moveInstrumentation(bannerImageRow, leftImageDiv);
  const bannerPicture = bannerImageRow.querySelector('picture');
  if (bannerPicture) {
    leftImageDiv.append(bannerPicture);
  }
  section.append(leftImageDiv);

  // Container for text and categories
  const container = document.createElement('div');
  container.classList.add('make-right-shift-container', 'make-right-shift-read-more'); // Correct prefix

  // Heading
  const heading = document.createElement('h1');
  heading.classList.add('make-right-shift-text-center', 'make-right-shift-pb-4', 'make-right-shift-rs-heading'); // Correct prefix
  moveInstrumentation(headingRow, heading);
  heading.append(headingRow.firstElementChild);
  container.append(heading);

  // Subheading and Description
  const readMoreTextDiv = document.createElement('div');
  readMoreTextDiv.classList.add('make-right-shift-read-more-text'); // Correct prefix
  moveInstrumentation(subheadingRow, readMoreTextDiv);
  const subheading = document.createElement('h2');
  subheading.style.textAlign = 'center';
  subheading.append(subheadingRow.firstElementChild);
  readMoreTextDiv.append(subheading);

  moveInstrumentation(descriptionRow, readMoreTextDiv);
  const description = document.createElement('p');
  description.style.textAlign = 'center';
  description.append(descriptionRow.firstElementChild);
  readMoreTextDiv.append(description);

  container.append(readMoreTextDiv);

  // Read More span (empty in original, but present)
  const readMoreSpan = document.createElement('span');
  readMoreSpan.classList.add('make-right-shift-readMore'); // Correct prefix
  readMoreSpan.textContent = 'Read More'; // Add text content for visibility/interactivity
  container.append(readMoreSpan);

  // Categories Wrapper
  const whyShiftWrapper = document.createElement('div');
  whyShiftWrapper.classList.add('make-right-shift-d-flex', 'make-right-shift-justify-content-evenly', 'make-right-shift-flex-wrap', 'make-right-shift-why-shift-wrapper'); // Correct prefix

  categoryItemRows.forEach((row) => {
    const categoryDiv = document.createElement('div');
    categoryDiv.classList.add('make-right-shift-mb-md-0', 'make-right-shift-mb-3', 'make-right-shift-text-center'); // Correct prefix
    moveInstrumentation(row, categoryDiv);

    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('make-right-shift-itc-health-goal-wrapper'); // Correct prefix

    // According to BlockJson, category item has fields: image, link, label
    const [imageCell, linkCell, labelCell] = [...row.children];

    const picture = imageCell.querySelector('picture');
    if (picture) {
      imageWrapper.append(picture);
    }
    categoryDiv.append(imageWrapper);

    const linkEl = document.createElement('a');
    linkEl.classList.add('make-right-shift-text-center', 'make-right-shift-d-block', 'make-right-shift-text-capitalize', 'make-right-shift-pt-2', 'make-right-shift-image-label'); // Correct prefix

    const originalLink = linkCell.querySelector('a');
    if (originalLink) {
      linkEl.href = originalLink.href;
      linkEl.alt = originalLink.alt || '';
      // The label content should go into the link text
      const labelContent = labelCell.firstElementChild;
      if (labelContent) {
        linkEl.innerHTML = labelContent.innerHTML; // Use innerHTML to preserve line breaks
      } else {
        linkEl.textContent = originalLink.textContent;
      }
    } else {
      // If no <a> tag in linkCell, assume the cell content is the link text and href
      const linkText = linkCell.textContent.trim();
      linkEl.href = linkText; // Assuming the text itself is the URL if no <a>
      // The label content should go into the link text
      const labelContent = labelCell.firstElementChild;
      if (labelContent) {
        linkEl.innerHTML = labelContent.innerHTML; // Use innerHTML to preserve line breaks
      } else {
        linkEl.textContent = linkText;
      }
    }

    categoryDiv.append(linkEl);
    whyShiftWrapper.append(categoryDiv);
  });
  container.append(whyShiftWrapper);

  // Empty div for responsiveness (from original HTML)
  const responsiveDiv = document.createElement('div');
  responsiveDiv.classList.add('make-right-shift-d-md-none', 'make-right-shift-d-block'); // Correct prefix
  container.append(responsiveDiv);

  // CTA Button
  const buttonDiv = document.createElement('div');
  buttonDiv.classList.add('make-right-shift-button', 'make-right-shift-how-shift-button'); // Correct prefix
  moveInstrumentation(ctaRow, buttonDiv);

  const ctaLink = ctaRow.querySelector('a');
  if (ctaLink) {
    const newCtaLink = document.createElement('a');
    newCtaLink.classList.add('make-right-shift-cmp-button'); // Correct prefix
    newCtaLink.href = ctaLink.href;
    newCtaLink.alt = ctaLink.alt || '';
    if (ctaLink.target) {
      newCtaLink.target = ctaLink.target;
    }

    const spanText = document.createElement('span');
    spanText.classList.add('make-right-shift-cmp-button__text'); // Correct prefix
    spanText.textContent = ctaLink.textContent;
    newCtaLink.append(spanText);

    if (newCtaLink.target === '_blank') {
      const screenReaderOnlySpan = document.createElement('span');
      screenReaderOnlySpan.classList.add('make-right-shift-cmp-link__screen-reader-only'); // Correct prefix
      screenReaderOnlySpan.textContent = 'opens in a new tab';
      newCtaLink.append(screenReaderOnlySpan);
    }
    buttonDiv.append(newCtaLink);
  }
  container.append(buttonDiv);

  section.append(container);

  // Add event listener for 'Read More' functionality
  readMoreSpan.addEventListener('click', () => {
    container.classList.toggle('make-right-shift-expanded'); // Toggle an 'expanded' class
    if (container.classList.contains('make-right-shift-expanded')) {
      readMoreSpan.textContent = 'Read Less';
    } else {
      readMoreSpan.textContent = 'Read More';
    }
  });

  // Optimize images
  section.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(section);
}
