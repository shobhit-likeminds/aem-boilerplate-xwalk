import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    imageRow,
    imageAltRow,
    imageCopyrightRow,
    headingRow,
    bodyRow,
    ctaLinkRow,
    ctaLinkLabelRow,
  ] = [...block.children];

  const gridDiv = document.createElement('div');
  gridDiv.classList.add(
    'grid',
    'md:grid-cols-12',
    'md:gap-x-grid-gutter',
    'justify-center',
    'items-center',
  );

  // Image section
  const imageWrapper = document.createElement('div');
  imageWrapper.classList.add(
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

  const imageAspectDiv = document.createElement('div');
  imageAspectDiv.classList.add('aspect-4/3', 'max-w-[640px]', 'w-full', 'mx-auto');

  const picture = imageRow.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '640' }]);
      const optimizedImg = optimizedPic.querySelector('img');
      optimizedImg.classList.add(
        'rounded-t-sm',
        'md:rounded-sm',
        'overflow-hidden',
        'w-full',
        'h-auto',
      );
      optimizedImg.setAttribute('height', '480'); // Hardcoded from original HTML
      optimizedImg.setAttribute('width', '640'); // Hardcoded from original HTML
      optimizedImg.setAttribute('loading', 'lazy'); // Hardcoded from original HTML

      // Set alt text from the imageAlt field
      const altText = imageAltRow.firstElementChild?.textContent.trim();
      if (altText) {
        optimizedImg.alt = altText;
      }

      moveInstrumentation(picture, optimizedPic.querySelector('img'));
      imageAspectDiv.append(optimizedPic);
    }
  }
  imageWrapper.append(imageAspectDiv);
  gridDiv.append(imageWrapper);

  // Image Copyright section
  const copyrightWrapper = document.createElement('div');
  copyrightWrapper.classList.add(
    'mb-2xs',
    'text-end',
    'md:col-start-6',
    'md:col-span-7',
    'md:mb-0',
    'md:mt-2xs',
  );

  const copyrightTextDiv = document.createElement('div');
  copyrightTextDiv.classList.add('mt-2xs', 'mt-0!');

  const copyrightP = document.createElement('p');
  copyrightP.classList.add(
    'text-caption-size',
    'z-1',
    'relative',
    'text-caption-size',
    'theme-dark:text-foreground-colored-muted',
    'text-foreground-muted',
  );
  moveInstrumentation(imageCopyrightRow.firstElementChild, copyrightP);
  copyrightP.textContent = imageCopyrightRow.firstElementChild?.textContent.trim();
  copyrightTextDiv.append(copyrightP);
  copyrightWrapper.append(copyrightTextDiv);
  gridDiv.append(copyrightWrapper);

  // Content section (Heading, Body, CTA)
  const contentWrapper = document.createElement('div');
  contentWrapper.classList.add(
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

  const textContentDiv = document.createElement('div');

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
  moveInstrumentation(headingRow.firstElementChild, heading);
  heading.textContent = headingRow.firstElementChild?.textContent.trim();
  textContentDiv.append(heading);

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
  moveInstrumentation(bodyRow.firstElementChild, bodyDiv);
  while (bodyRow.firstElementChild) bodyDiv.append(bodyRow.firstElementChild);
  textContentDiv.append(bodyDiv);

  contentWrapper.append(textContentDiv);

  // CTA Link
  const ctaAnchor = document.createElement('a');
  ctaAnchor.classList.add(
    'w-full',
    'md:w-fit',
    'button',
    'button--dark',
    'theme-medium:button--light',
  );

  const foundCtaLink = ctaLinkRow.querySelector('a');
  if (foundCtaLink) {
    ctaAnchor.href = foundCtaLink.href;
  }
  const ctaLabel = ctaLinkLabelRow.firstElementChild?.textContent.trim();
  if (ctaLabel) {
    ctaAnchor.textContent = ctaLabel;
  } else if (foundCtaLink) {
    ctaAnchor.textContent = foundCtaLink.textContent.trim();
  }
  moveInstrumentation(ctaLinkRow, ctaAnchor);
  contentWrapper.append(ctaAnchor);

  gridDiv.append(contentWrapper);

  block.textContent = '';
  block.append(gridDiv);
}
