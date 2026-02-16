import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const popUpDiv = document.createElement('div');
  popUpDiv.id = 'sticky-navigation-pop-up';
  popUpDiv.style.cssText = '';
  block.prepend(popUpDiv);

  const transPopUpDiv = document.createElement('div');
  transPopUpDiv.className = 'sticky-navigation-trans-pop-up';
  block.prepend(transPopUpDiv);

  const section = document.createElement('section');
  section.className = 'sticky-navigation-bottom-nav sticky-navigation-position-fixed sticky-navigation-bottom-0 sticky-navigation-p-3 sticky-navigation-d-flex sticky-navigation-align-items-center sticky-navigation-boing-container sticky-navigation-bg-boing-primary';
  moveInstrumentation(block, section);

  const ul = document.createElement('ul');
  ul.className = 'sticky-navigation-bottom-nav__list sticky-navigation-d-flex sticky-navigation-justify-content-around sticky-navigation-align-items-center sticky-navigation-flex-grow-1';

  [...block.children].forEach((row) => {
    if (row.children.length === 0) return; // Skip empty rows

    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.className = 'sticky-navigation-bottom-nav__item sticky-navigation-position-relative';

    const linkCell = row.children[0]; // Assuming the first cell contains the link, image, and label

    const link = linkCell.querySelector('a');
    const img = linkCell.querySelector('img');
    const labelSpan = linkCell.querySelector('span');

    if (link && img && labelSpan) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.className = 'sticky-navigation-bottom-nav__link sticky-navigation-d-flex sticky-navigation-flex-column sticky-navigation-align-items-center sticky-navigation-gap-1 sticky-navigation-analytics_cta_click';
      newLink.setAttribute('data-consent', link.getAttribute('data-consent'));
      newLink.setAttribute('data-link', link.getAttribute('data-link'));

      const optimizedPic = createOptimizedPicture(img.src, img.alt);
      const newImg = optimizedPic.querySelector('img');
      newImg.className = 'sticky-navigation-bottom-nav__icon';
      moveInstrumentation(img, newImg);
      newLink.append(optimizedPic);

      const newLabelSpan = document.createElement('span');
      newLabelSpan.className = 'sticky-navigation-bottom-nav__label';
      newLabelSpan.textContent = labelSpan.textContent;
      newLink.append(newLabelSpan);

      li.append(newLink);
    }
    ul.append(li);
  });

  section.append(ul);
  block.textContent = '';
  block.append(transPopUpDiv, popUpDiv, section);
}
