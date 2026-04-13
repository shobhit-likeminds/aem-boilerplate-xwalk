import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Extract all rows from the block
  const rows = [...block.children];

  // Create the main grid container
  const gridContainer = document.createElement('div');
  gridContainer.classList.add('grid', 'md:grid-cols-12', 'md:gap-x-grid-gutter', 'justify-center', 'items-center');

  // --- Image Section ---
  const imageRow = rows.find(row => row.querySelector('picture'));
  const imageAltRow = rows.find(row => !row.querySelector('picture') && !row.querySelector('a') && row.textContent.trim().length > 0 && row.previousElementSibling === imageRow); // Assuming alt text is immediately after image
  
  const imageSection = document.createElement('div');
  imageSection.classList.add(
    'relative',
    'lg:z-10',
    'order-2',
    'w-full',
    'md:col-start-6',
    'md:col-span-7',
    'min-w-0',
    'md:row-start-1',
    'md:row-end-1',
  );

  const imageWrapper = document.createElement('div');
  imageWrapper.classList.add('aspect-4/3', 'max-w-[640px]', 'w-full', 'mx-auto');

  if (imageRow) {
    const picture = imageRow.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const altText = imageAltRow ? imageAltRow.textContent.trim() : img.alt;
        const optimizedPic = createOptimizedPicture(img.src, altText, false, [{ width: '640' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        optimizedPic.querySelector('img').classList.add('rounded-t-sm', 'md:rounded-sm', 'overflow-hidden', 'w-full', 'h-auto');
        optimizedPic.querySelector('img').setAttribute('height', '480');
        optimizedPic.querySelector('img').setAttribute('width', '640');
        imageWrapper.append(optimizedPic);
      }
    }
  }
  imageSection.append(imageWrapper);
  gridContainer.append(imageSection);

  // --- Caption Section (if caption exists) ---
  const captionRow = rows.find(row => row.textContent.trim().length > 0 && row.querySelector('picture') === null && row.querySelector('a') === null && row.querySelector('h1, h2, h3, h4, h5, h6') === null && row.querySelector('p') === null);
  const captionText = captionRow ? captionRow.textContent.trim() : '';
  if (captionText) {
    const captionSection = document.createElement('div');
    captionSection.classList.add(
      'mb-2xs',
      'text-end',
      'md:col-start-6',
      'md:col-span-7',
      'md:mb-0',
      'md:mt-2xs',
    );

    const captionWrapper = document.createElement('div');
    captionWrapper.classList.add('mt-2xs', 'mt-0!');

    const captionP = document.createElement('p');
    captionP.classList.add(
      'text-caption-size',
      'z-1',
      'relative',
      'text-caption-size',
      'theme-dark:text-foreground-colored-muted',
      'text-foreground-muted',
    );
    captionP.textContent = captionText;
    if (captionRow) moveInstrumentation(captionRow, captionP);
    captionWrapper.append(captionP);
    captionSection.append(captionWrapper);
    gridContainer.append(captionSection);
  }

  // --- Content and CTA Section ---
  const contentCtaSection = document.createElement('div');
  contentCtaSection.classList.add(
    'order-3',
    'bg-card-surface',
    'theme-dark:bg-card-surface-td',
    'theme-medium:bg-card-surface-tm',
    'rounded-b-sm',
    'relative',
    'md:z-20',
    'flex',
    'flex-col',
    'justify-between',
    'p-6',
    'xl:p-lg',
    'order-2',
    'md:order-1',
    'md:col-span-6',
    'md:col-start-1',
    'md:row-start-1',
    'md:row-end-1',
  );

  const contentWrapper = document.createElement('div');

  const headingRow = rows.find(row => row.querySelector('h1, h2, h3, h4, h5, h6'));
  if (headingRow) {
    const heading = document.createElement('h3');
    heading.classList.add(
      'text-h4',
      'text-24',
      'lg:text-32',
      'font-stretch-normal',
      'font-heading',
      'font-bold',
      'mb-2xs',
      'text-foreground',
      'theme-dark:text-foreground-tm',
      'theme-medium:text-foreground-td',
    );
    heading.textContent = headingRow.textContent.trim();
    moveInstrumentation(headingRow, heading);
    contentWrapper.append(heading);
  }

  const bodyRow = rows.find(row => row.querySelector('p') && !row.querySelector('a'));
  if (bodyRow) {
    const bodyDiv = document.createElement('div');
    bodyDiv.classList.add(
      'prose',
      'theme-dark:prose-tm',
      'theme-medium:prose-td',
      'text-p1',
      'max-sm:prose-p:text-16!',
      'mb-md',
      '*:mt-0',
    );
    moveInstrumentation(bodyRow, bodyDiv);
    while (bodyRow.firstChild) bodyDiv.append(bodyRow.firstChild);
    contentWrapper.append(bodyDiv);
  }

  contentCtaSection.append(contentWrapper);

  const ctaLinkRow = rows.find(row => row.querySelector('a') && row.textContent.trim().length > 0 && !row.querySelector('picture'));
  const ctaLinkLabelRow = rows.find(row => row.textContent.trim().length > 0 && row.querySelector('a') === null && row.previousElementSibling === ctaLinkRow);

  if (ctaLinkRow && ctaLinkLabelRow) {
    const ctaLink = ctaLinkRow.querySelector('a');
    const ctaLinkLabel = ctaLinkLabelRow.textContent.trim();

    if (ctaLink && ctaLinkLabel) {
      const ctaAnchor = document.createElement('a');
      ctaAnchor.href = ctaLink.href;
      ctaAnchor.textContent = ctaLinkLabel;
      ctaAnchor.classList.add(
        'w-full',
        'md:w-fit',
        'button',
        'button--dark',
        'theme-medium:button--light',
      );
      moveInstrumentation(ctaLinkRow, ctaAnchor);
      contentCtaSection.append(ctaAnchor);
    }
  }

  gridContainer.append(contentCtaSection);

  block.textContent = '';
  block.append(gridContainer);
}
