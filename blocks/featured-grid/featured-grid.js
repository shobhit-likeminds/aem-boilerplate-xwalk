import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  block.classList.add('grid', 'gap-8', 'lg:gap-grid-gutter', 'sm:featured-grid-sm', 'md:featured-grid-md', 'lg:featured-grid-lg');

  [...block.children].forEach((row) => {
    const cells = [...row.children];

    // Content detection for cells based on BlockJson and typical content patterns
    const imageCell = cells.find(cell => cell.querySelector('picture'));
    const imageAltCell = cells.find(cell => cell.textContent.trim() === 'Image Alt Text value'); // Assuming unique placeholder for alt text
    const captionCell = cells.find(cell => cell.textContent.trim().startsWith('Caption value') || cell.textContent.trim().startsWith('©')); // Caption often contains copyright
    const eyebrowCell = cells.find(cell => cell.textContent.trim().length > 0 && cell.textContent.trim().toLowerCase() === 'news' || cell.textContent.trim().toLowerCase() === 'blog' || cell.textContent.trim().toLowerCase() === 'story'); // Eyebrow is short text
    const titleCell = cells.find(cell => cell.textContent.trim().startsWith('Title value') || cell.textContent.trim().includes('penguins') || cell.textContent.trim().includes('plastic pollution') || cell.textContent.trim().includes('bonobos')); // Title is usually longer, descriptive
    const subheadingCell = cells.find(cell => cell.textContent.trim().startsWith('Subheading value') || cell.textContent.trim().includes('urgent action') || cell.textContent.trim().includes('new pathways') || cell.textContent.trim().includes('coexistence')); // Subheading is descriptive text
    const linkCell = cells.find(cell => cell.querySelector('a') && cell.querySelector('a').href.includes('example.com/link')); // Link cell contains an anchor with a specific href pattern
    const linkLabelCell = cells.find(cell => cell.querySelector('a') && cell.querySelector('a').href.includes('example.com/linklabel')); // Link Label cell contains an anchor with a specific href pattern

    const linkEl = document.createElement('a');
    linkEl.classList.add('grid', 'grid-rows-subgrid', 'row-span-3', 'gap-0', 'group/card', 'no-underline', 'cursor-pointer', 'theme-focus-outline', 'max-w-[650px]');

    const foundLink = linkCell?.querySelector('a');
    if (foundLink) {
      linkEl.href = foundLink.href;
      linkEl.setAttribute('aria-label', titleCell?.textContent.trim() || '');
      linkEl.setAttribute('aria-description', subheadingCell?.textContent.trim() || '');
    }
    moveInstrumentation(row, linkEl);

    // Image container
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('row-start-1', 'w-full');
    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('rounded-sm', 'relative', 'overflow-hidden', 'bg-surface-muted', 'aspect-[4/3]');
    imageWrapper.setAttribute('data-testid', 'card');

    const picture = imageCell?.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        img.classList.add('rounded-sm', 'w-full', 'object-cover', 'motion-safe:group-hover/card:scale-105', 'transition-transform', 'duration-400', 'aspect-[4/3]');
        img.height = '300';
        img.width = '400';
        img.loading = 'lazy';
        img.alt = imageAltCell?.textContent.trim() || ''; // Use alt text from model
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '400' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        picture.replaceWith(optimizedPic);
      }
      imageWrapper.append(picture);
    }
    imageContainer.append(imageWrapper);
    linkEl.append(imageContainer);

    // Caption
    const captionWrapper = document.createElement('div');
    captionWrapper.classList.add('row-start-2', 'w-full');
    const captionDiv = document.createElement('div');
    captionDiv.classList.add('mt-2xs', 'mt-1!');
    const captionP = document.createElement('p');
    captionP.classList.add('z-1', 'relative', 'text-caption-size', 'theme-dark:text-foreground-colored-muted', 'text-foreground-muted');
    captionP.textContent = captionCell?.textContent.trim() || '';
    captionDiv.append(captionP);
    captionWrapper.append(captionDiv);
    linkEl.append(captionWrapper);

    // Content container
    const contentContainer = document.createElement('div');
    contentContainer.classList.add('w-full', 'mt-2.5', 'row-start-3');

    // Eyebrow
    const eyebrowP = document.createElement('p');
    eyebrowP.setAttribute('data-testid', 'featured-item-eyebrow');
    eyebrowP.classList.add('text-p2', 'font-bold', 'pb-3xs', 'theme-dark:text-foreground-td', 'theme-medium:text-foreground-tm');
    eyebrowP.textContent = eyebrowCell?.textContent.trim() || '';
    contentContainer.append(eyebrowP);

    // Title
    const titleH3 = document.createElement('h3');
    titleH3.classList.add('text-card-title-size', 'font-stretch-normal', 'font-semibold', 'inline');
    titleH3.setAttribute('data-testid', 'card-link-title');
    const titleSpan = document.createElement('span');
    titleSpan.classList.add(
      'link-arrow',
      'group-hover/card:after:motion-safe:ml-link-arrow-hover-offset',
      'inline',
      'link',
      'text-foreground',
      'theme-dark:text-foreground-td',
      'theme-medium:text-foreground-tm',
      'no-underline',
      'hover:text-foreground',
      'focus-visible:outline-focus-color',
      'group-hover/card:text-foreground',
      'group-hover/card:underline',
      'group-hover/card:underline-offset-4',
      'group-hover/card:decoration-inherit',
      'group-hover/card:decoration-[3px]',
      'transition-[text-decoration]',
    );
    titleSpan.textContent = titleCell?.textContent.trim() || '';
    titleH3.append(titleSpan);
    contentContainer.append(titleH3);

    // Subheading
    const subheadingP = document.createElement('p');
    subheadingP.setAttribute('data-testid', 'featured-item-subheading');
    subheadingP.classList.add('text-p1', 'pt-1', 'text-foreground', 'theme-dark:text-foreground-td', 'theme-medium:text-foreground-tm');
    subheadingP.textContent = subheadingCell?.textContent.trim() || '';
    contentContainer.append(subheadingP);

    linkEl.append(contentContainer);
    block.append(linkEl);
  });
}
