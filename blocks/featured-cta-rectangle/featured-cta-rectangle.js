import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Destructure block.children directly as per EDS BLOCK STRUCTURE
  const [
    imageRow,
    imageAltRow,
    titleRow,
    textRow,
    ctaLinkRow,
    ctaLinkLabelRow,
    imageCreditRow,
  ] = [...block.children];

  // Main container div
  const container = document.createElement('div');
  container.classList.add('container');

  // Grid wrapper for image and content
  const gridWrapper = document.createElement('div');
  gridWrapper.classList.add('grid', 'grid-full', 'md:gap-grid-gutter', 'justify-center', 'items-center');

  // Image section
  const imageSection = document.createElement('div');
  imageSection.classList.add(
    'order-1',
    'md:order-2',
    'relative',
    'md:col-start-8',
    'md:col-span-8',
    'xl:col-start-7',
    'xl:col-span-7',
    'lg:z-10',
    'min-w-0',
    'md:row-start-1',
    'md:row-end-1',
  );
  imageSection.setAttribute('data-testid', 'featured-cta-image');

  const imageAspectWrapper = document.createElement('div');
  imageAspectWrapper.classList.add('aspect-4/3', 'max-w-[672px]', 'w-full', 'mx-auto');

  // Access content from the first child element of the row
  const picture = imageRow.firstElementChild.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, imageAltRow.firstElementChild.textContent.trim(), false, [{ width: '672' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('rounded-t-sm', 'md:rounded-sm', 'overflow-hidden', 'w-full', 'h-auto');
      optimizedPic.querySelector('img').setAttribute('width', '672');
      optimizedPic.querySelector('img').setAttribute('height', '504');
      imageAspectWrapper.append(optimizedPic);
    }
  }
  imageSection.append(imageAspectWrapper);
  gridWrapper.append(imageSection);

  // Content section
  const contentSection = document.createElement('div');
  contentSection.classList.add(
    'order-2',
    'md:order-1',
    'relative',
    'md:col-span-8',
    'md:col-start-1',
    'xl:col-start-2',
    'xl:col-span-6',
    'md:z-20',
    'bg-card-surface',
    'theme-dark:bg-card-surface-td',
    'theme-medium:bg-card-surface-tm',
    'text-foreground',
    'theme-dark:text-foreground-tm',
    'theme-medium:text-foreground-td',
    'rounded-sm',
    'flex',
    'flex-col',
    'justify-center',
    'space-y-2xs',
    'p-6',
    'xl:p-lg',
  );

  // Title
  const title = document.createElement('h4');
  title.classList.add('text-h4', 'font-bold');
  title.setAttribute('data-testid', 'featured-cta-title');
  moveInstrumentation(titleRow.firstElementChild, title);
  title.textContent = titleRow.firstElementChild.textContent.trim();
  contentSection.append(title);

  // Text
  const textDiv = document.createElement('div');
  textDiv.classList.add('prose', 'theme-dark:prose-tm', 'theme-medium:prose-td', 'max-w-none');
  textDiv.setAttribute('data-testid', 'featured-cta-text');
  moveInstrumentation(textRow.firstElementChild, textDiv);
  // Move all child nodes from the original text cell to the new textDiv
  while (textRow.firstElementChild.firstChild) {
    textDiv.append(textRow.firstElementChild.firstChild);
  }
  contentSection.append(textDiv);

  // CTA Link
  const ctaLinksWrapper = document.createElement('div');
  ctaLinksWrapper.classList.add('flex', 'flex-wrap', 'gap-xs', 'mt-6');
  ctaLinksWrapper.setAttribute('data-testid', 'featured-cta-links');

  const ctaLink = document.createElement('a');
  const originalCtaLink = ctaLinkRow.firstElementChild.querySelector('a');
  if (originalCtaLink) {
    ctaLink.href = originalCtaLink.href;
  }
  ctaLink.classList.add('w-full', 'md:w-auto', 'button', 'button--dark', 'theme-medium:button--light');
  ctaLink.setAttribute('data-testid', 'featured-cta-link-primary');
  moveInstrumentation(ctaLinkRow.firstElementChild, ctaLink); // Instrument the original cell's content
  ctaLink.textContent = ctaLinkLabelRow.firstElementChild.textContent.trim(); // Get text from the ctaLinkLabelRow's first child
  ctaLinksWrapper.append(ctaLink);
  contentSection.append(ctaLinksWrapper);

  gridWrapper.append(contentSection);
  container.append(gridWrapper);

  // Image Credit
  const imageCreditGridWrapper = document.createElement('div');
  imageCreditGridWrapper.classList.add('grid-full', 'grid-centered-12');

  const imageCreditDiv = document.createElement('div');
  imageCreditDiv.classList.add(
    'md:text-end',
    'order-1',
    'md:order-2',
    'relative',
    'md:col-start-8',
    'md:col-span-8',
    'xl:col-start-8',
    'xl:col-span-6',
    'lg:z-10',
    'min-w-0',
    'md:row-start-1',
    'md:row-end-1',
  );

  const imageCreditTextWrapper = document.createElement('div');
  imageCreditTextWrapper.classList.add('mt-2xs');

  const imageCreditParagraph = document.createElement('p');
  imageCreditParagraph.classList.add(
    'z-1',
    'relative',
    'text-caption-size',
    'theme-dark:text-foreground-colored-muted',
    'text-foreground-muted',
  );
  moveInstrumentation(imageCreditRow.firstElementChild, imageCreditParagraph);
  imageCreditParagraph.textContent = imageCreditRow.firstElementChild.textContent.trim();
  imageCreditTextWrapper.append(imageCreditParagraph);
  imageCreditDiv.append(imageCreditTextWrapper);
  imageCreditGridWrapper.append(imageCreditDiv);
  container.append(imageCreditGridWrapper);

  block.textContent = '';
  block.append(container);

  // Apply section classes to the block itself
  block.classList.add('theme-light', 'theme-bg', 'theme-section-spacing');
  block.setAttribute('data-testid', 'featured-cta-rectangle');
}
