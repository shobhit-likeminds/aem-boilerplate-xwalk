import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Destructure block.children based on the EDS BLOCK STRUCTURE and BlockJson model.
  // Each element in block.children corresponds to a root field in the BlockJson.
  const [
    imageRow,
    imageAltRow,
    headingRow,
    textRow,
    ctaLinkRow,
    ctaLinkLabelRow, // This row contains the CTA label text.
    imageCreditRow,
  ] = [...block.children];

  const container = document.createElement('div');
  container.classList.add('container');

  const grid = document.createElement('div');
  grid.classList.add('grid', 'grid-full', 'md:gap-grid-gutter', 'justify-center', 'items-center');

  // Image section
  const imageWrapper = document.createElement('div');
  imageWrapper.classList.add(
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
  imageWrapper.setAttribute('data-testid', 'featured-cta-image');

  const imageAspect = document.createElement('div');
  imageAspect.classList.add('aspect-4/3', 'max-w-[672px]', 'w-full', 'mx-auto');

  const picture = imageRow.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    if (img) {
      // Use the imageAltRow for the alt text
      const optimizedPic = createOptimizedPicture(img.src, imageAltRow.textContent.trim(), false, [{ width: '672' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('rounded-t-sm', 'md:rounded-sm', 'overflow-hidden', 'w-full', 'h-auto');
      imageAspect.append(optimizedPic);
    }
  }
  imageWrapper.append(imageAspect);
  grid.append(imageWrapper);

  // Content section
  const contentWrapper = document.createElement('div');
  contentWrapper.classList.add(
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
    'md:row-start-1',
    'md:row-end-1',
  );

  const heading = document.createElement('h4');
  heading.classList.add('text-h4', 'font-bold');
  heading.setAttribute('data-testid', 'featured-cta-title');
  moveInstrumentation(headingRow, heading);
  // The heading content is directly in headingRow
  heading.textContent = headingRow.textContent.trim();
  contentWrapper.append(heading);

  const textDiv = document.createElement('div');
  textDiv.classList.add('prose', 'theme-dark:prose-tm', 'theme-medium:prose-td', 'max-w-none');
  textDiv.setAttribute('data-testid', 'featured-cta-text');
  moveInstrumentation(textRow, textDiv);
  // The text content can contain rich text, so append its children
  while (textRow.firstChild) textDiv.append(textRow.firstChild);
  contentWrapper.append(textDiv);

  const linksWrapper = document.createElement('div');
  linksWrapper.classList.add('flex', 'flex-wrap', 'gap-xs', 'mt-6');
  linksWrapper.setAttribute('data-testid', 'featured-cta-links');

  const ctaLink = document.createElement('a');
  ctaLink.classList.add('w-full', 'md:w-auto', 'button', 'button--dark', 'theme-medium:button--light');
  ctaLink.setAttribute('data-testid', 'featured-cta-link-primary');
  const originalCtaLink = ctaLinkRow.querySelector('a');
  if (originalCtaLink) {
    ctaLink.href = originalCtaLink.href;
  }
  moveInstrumentation(ctaLinkRow, ctaLink);
  // The CTA label text is in ctaLinkLabelRow
  ctaLink.textContent = ctaLinkLabelRow.textContent.trim();
  linksWrapper.append(ctaLink);
  contentWrapper.append(linksWrapper);

  grid.append(contentWrapper);
  container.append(grid);

  // Image Credit section
  const creditGrid = document.createElement('div');
  creditGrid.classList.add('grid-full', 'grid-centered-12');

  const creditWrapper = document.createElement('div');
  creditWrapper.classList.add(
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

  const creditDiv = document.createElement('div');
  creditDiv.classList.add('mt-2xs');

  const creditText = document.createElement('p');
  creditText.classList.add('z-1', 'relative', 'text-caption-size', 'theme-dark:text-foreground-colored-muted', 'text-foreground-muted');
  moveInstrumentation(imageCreditRow, creditText);
  // The image credit text is in imageCreditRow
  creditText.textContent = imageCreditRow.textContent.trim();
  creditDiv.append(creditText);
  creditWrapper.append(creditDiv);
  creditGrid.append(creditWrapper);
  container.append(creditGrid);

  block.textContent = '';
  block.append(container);
}
