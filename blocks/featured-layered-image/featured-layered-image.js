import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [mainImageRow, layeredImageRow, imageCreditRow, ...itemRows] = [...block.children];

  const imageWrapper = document.createElement('div');
  imageWrapper.classList.add('relative', 'mb-lg', 'mt-6', 'lg:mt-8', 'w-full', 'h-auto');

  // Main Image
  const mainImageCell = mainImageRow.firstElementChild;
  if (mainImageCell) {
    const mainPicture = mainImageCell.querySelector('picture');
    if (mainPicture) {
      const mainImg = mainPicture.querySelector('img');
      if (mainImg) {
        mainImg.classList.add('rounded-sm', 'relative', 'z-1', 'w-full', 'aspect-[4/3]', 'md:aspect-2/1', 'object-cover');
        const optimizedPic = createOptimizedPicture(mainImg.src, mainImg.alt, false, [{ width: '1280' }]);
        moveInstrumentation(mainImg, optimizedPic.querySelector('img'));
        mainPicture.replaceWith(optimizedPic);
      }
    }
    moveInstrumentation(mainImageRow, mainImageCell);
    imageWrapper.append(mainImageCell);
  }

  // Layered Image
  const layeredImageCell = layeredImageRow.firstElementChild;
  if (layeredImageCell) {
    const layeredPictureWrapper = document.createElement('div');
    layeredPictureWrapper.classList.add('absolute', 'right-8', 'md:right-12', 'lg:right-16', '-top-10', 'md:-top-16', 'z-2', 'w-2/3', 'md:w-1/2', 'max-w-[630px]', 'aspect-square', 'rounded-full', 'overflow-hidden', 'shadow-md');

    const layeredPicture = layeredImageCell.querySelector('picture');
    if (layeredPicture) {
      const layeredImg = layeredPicture.querySelector('img');
      if (layeredImg) {
        layeredImg.classList.add('w-full', 'h-full', 'object-cover');
        const optimizedPic = createOptimizedPicture(layeredImg.src, layeredImg.alt, false, [{ width: '630' }]);
        moveInstrumentation(layeredImg, optimizedPic.querySelector('img'));
        layeredPicture.replaceWith(optimizedPic);
      }
    }
    moveInstrumentation(layeredImageRow, layeredPictureWrapper);
    while (layeredImageCell.firstChild) layeredPictureWrapper.append(layeredImageCell.firstChild);
    imageWrapper.append(layeredPictureWrapper);
  }

  // Image Credit
  const imageCreditDiv = document.createElement('div');
  imageCreditDiv.classList.add('mt-2xs');
  const imageCreditP = document.createElement('p');
  imageCreditP.classList.add('z-1', 'relative', 'text-caption-size', 'theme-dark:text-foreground-colored-muted', 'text-foreground-muted');
  if (imageCreditRow && imageCreditRow.firstElementChild) {
    moveInstrumentation(imageCreditRow, imageCreditP);
    imageCreditP.textContent = imageCreditRow.firstElementChild.textContent.trim();
  }
  imageCreditDiv.append(imageCreditP);
  imageWrapper.append(imageCreditDiv);

  const itemsGrid = document.createElement('div');
  itemsGrid.classList.add('grid', 'grid-cols-1', 'gap-grid-gutter', 'mt-lg', 'md:grid-cols-3');

  itemRows.forEach((row) => {
    // Use content detection instead of direct index access for item cells
    const cells = [...row.children];
    const headingCell = cells[0]; // Heading is always the first cell
    const descriptionCell = cells[1]; // Description is always the second cell
    const ctaLinkCell = cells.find(cell => cell.querySelector('a')); // Find cell with an anchor for CTA Link
    const ctaLinkLabelCell = cells.find(cell => cell !== headingCell && cell !== descriptionCell && cell !== ctaLinkCell && cell.textContent.trim()); // Find the remaining cell for CTA Label

    const itemDiv = document.createElement('div');
    itemDiv.classList.add('flex', 'flex-col', 'items-start', 'justify-start', 'p-0');
    moveInstrumentation(row, itemDiv);

    if (headingCell) {
      const heading = document.createElement('h3');
      heading.classList.add('text-h4', 'font-bold', 'mb-xs', 'theme-dark:text-foreground-td', 'theme-medium:text-foreground-tm', 'text-foreground');
      moveInstrumentation(headingCell, heading);
      heading.textContent = headingCell.textContent.trim();
      itemDiv.append(heading);
    }

    if (descriptionCell) {
      const descriptionDiv = document.createElement('div');
      descriptionDiv.classList.add('text-p1', 'mb-md', 'prose', 'theme-dark:prose-td', 'theme-medium:prose-tm');
      moveInstrumentation(descriptionCell, descriptionDiv);
      while (descriptionCell.firstChild) descriptionDiv.append(descriptionCell.firstChild);
      itemDiv.append(descriptionDiv);
    }

    if (ctaLinkCell && ctaLinkLabelCell) {
      const ctaLink = ctaLinkCell.querySelector('a');
      const ctaLabel = ctaLinkLabelCell.textContent.trim();

      if (ctaLink && ctaLabel) {
        const anchor = document.createElement('a');
        anchor.href = ctaLink.href;
        anchor.textContent = ctaLabel;
        anchor.classList.add('button', 'button--dark', 'theme-dark:button--light');
        moveInstrumentation(ctaLinkCell, anchor);
        itemDiv.append(anchor);
      }
    }
    itemsGrid.append(itemDiv);
  });

  block.textContent = '';
  block.append(imageWrapper, itemsGrid);
}
