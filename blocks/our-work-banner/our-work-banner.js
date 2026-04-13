import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Destructure block.children directly as per BlockJson model
  const [headingRow, ctaLinkRow, ctaLinkLabelRow, ctaIconRow] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('theme-dark', 'theme-bg', 'theme-section-spacing', 'first:not-is-themed:mt-component');
  moveInstrumentation(block, section);

  const container = document.createElement('div');
  container.classList.add('container');

  const gridFull = document.createElement('div');
  gridFull.classList.add('grid-full');

  const gridCentered = document.createElement('div');
  gridCentered.classList.add('grid-centered-12', 'grid', 'grid-cols-subgrid', 'gap-grid-gutter');

  // Heading
  const headingWrapper = document.createElement('div');
  headingWrapper.classList.add('sm:col-span-10', 'xl:col-span-9');
  const headingElement = document.createElement('h2');
  headingElement.classList.add('text-h2', 'theme-dark:text-foreground-td', 'theme-medium:text-foreground-tm', 'text-foreground', 'text-pretty');
  // Access the first child of the headingRow, which is the div containing the content
  moveInstrumentation(headingRow.firstElementChild, headingElement);
  while (headingRow.firstElementChild.firstChild) {
    headingElement.append(headingRow.firstElementChild.firstChild);
  }
  headingWrapper.append(headingElement);
  gridCentered.append(headingWrapper);

  // CTA
  const ctaWrapper = document.createElement('div');
  ctaWrapper.classList.add('sm:col-span-4', 'xl:col-span-3', 'sm:flex', 'sm:justify-end', 'sm:items-end');

  const ctaLink = document.createElement('a');
  ctaLink.classList.add('button', 'button--dark-outline', 'theme-dark:button--light-outline');

  // CTA Link (href)
  const originalLink = ctaLinkRow.querySelector('a');
  if (originalLink) {
    ctaLink.href = originalLink.href;
  }
  // Instrumentation for the CTA Link row's first child (the div containing the link)
  moveInstrumentation(ctaLinkRow.firstElementChild, ctaLink);

  // CTA Label (text content)
  // Access the first child of ctaLinkLabelRow, which is the div containing the text
  const ctaLabelCell = ctaLinkLabelRow.firstElementChild;
  if (ctaLabelCell) {
    ctaLink.textContent = ctaLabelCell.textContent.trim();
  }

  // CTA Icon
  // Access the first child of ctaIconRow, which is the div containing the picture
  const ctaIconCell = ctaIconRow.firstElementChild;
  if (ctaIconCell) {
    const ctaIconPicture = ctaIconCell.querySelector('picture');
    if (ctaIconPicture) {
      const img = ctaIconPicture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        ctaLink.append(optimizedPic);
      }
    }
  }
  // Instrumentation for the CTA Icon row's first child (the div containing the picture)
  moveInstrumentation(ctaIconRow.firstElementChild, ctaLink);

  ctaWrapper.append(ctaLink);
  gridCentered.append(ctaWrapper);

  gridFull.append(gridCentered);
  container.append(gridFull);
  section.append(container);

  block.textContent = '';
  block.append(section);
}
