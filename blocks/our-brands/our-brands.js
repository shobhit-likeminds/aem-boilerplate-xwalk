import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [titleRow, subtitleRow, contentRow] = [...block.children];

  // Main container
  const rowThar = document.createElement('div');
  rowThar.classList.add('row-thar', 'position-relative-thar', 'w-100-thar', 'mx-0-thar');

  const col12 = document.createElement('div');
  col12.classList.add('col-12-ghst', 'px-0-thar', 'position-relative-thar');
  moveInstrumentation(titleRow, col12); // Move instrumentation from first row

  // Title
  const titleCell = [...titleRow.children].find((cell) => cell.textContent.trim());
  const titleP = document.createElement('p');
  titleP.classList.add('title-ghst-md', 'title-ghst-sm', 'my-auto-thar', 'ml-n10-ghst');
  if (titleCell) {
    titleP.textContent = titleCell.textContent.trim();
  }
  col12.appendChild(titleP);

  // Subtitle container
  const subtitleAbsoluteDiv = document.createElement('div');
  subtitleAbsoluteDiv.classList.add('position-absolute-thar', 'ghst-101-lg', 'ghst-101-md', 'ghst-101-sm');

  const dFlex = document.createElement('div');
  dFlex.classList.add('d-flex-thar', 'align-items-center');

  const bullet = document.createElement('div');
  bullet.classList.add('bullet-ghst-md', 'bullet-ghst-sm');
  dFlex.appendChild(bullet);

  const subtitleCell = [...subtitleRow.children].find((cell) => cell.textContent.trim());
  const subtitleP = document.createElement('p');
  subtitleP.classList.add('subtitle-ghst-md', 'subtitle-ghst-sm', 'my-auto-thar');
  if (subtitleCell) {
    subtitleP.textContent = subtitleCell.textContent.trim();
  }
  dFlex.appendChild(subtitleP);

  subtitleAbsoluteDiv.appendChild(dFlex);
  col12.appendChild(subtitleAbsoluteDiv);
  rowThar.appendChild(col12);

  // Spacer
  const spacer = document.createElement('div');
  spacer.classList.add('spacer', 'mt-3');

  // Content
  const contentRowDiv = document.createElement('div');
  contentRowDiv.classList.add('row');

  const contentCol = document.createElement('div');
  contentCol.classList.add('sf_colsIn', 'col-lg-12', 'our_brands_bg');
  moveInstrumentation(contentRow, contentCol); // Move instrumentation from content row

  const contentInnerDiv = document.createElement('div');
  const sfContentBlock = document.createElement('div');
  sfContentBlock.classList.add('sfContentBlock', 'sf-Long-text');

  const contentCell = [...contentRow.children].find((cell) => cell.innerHTML.trim());
  const bulletDisplayUl = document.createElement('div');
  bulletDisplayUl.classList.add('bullet_display_ul');
  if (contentCell) {
    bulletDisplayUl.innerHTML = contentCell.innerHTML;
  }
  sfContentBlock.appendChild(bulletDisplayUl);
  contentInnerDiv.appendChild(sfContentBlock);
  contentCol.appendChild(contentInnerDiv);
  contentRowDiv.appendChild(contentCol);

  // Optimize images within the content
  sfContentBlock.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(rowThar, spacer, contentRowDiv);
}
