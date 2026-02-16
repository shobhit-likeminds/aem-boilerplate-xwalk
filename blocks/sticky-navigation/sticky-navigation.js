import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const popUpDiv = document.createElement('div');
  popUpDiv.id = 'pop-up';
  block.append(popUpDiv);

  const transPopUpDiv = document.createElement('div');
  transPopUpDiv.classList.add('sticky-navigation-trans-pop-up');
  block.append(transPopUpDiv);

  const section = document.createElement('section');
  section.classList.add(
    'sticky-navigation-sticky-bottom-nav',
    'sticky-navigation-position-fixed',
    'sticky-navigation-bottom-0',
    'sticky-navigation-p-3',
    'sticky-navigation-d-flex',
    'sticky-navigation-align-items-center',
    'sticky-navigation-boing-container',
    'sticky-navigation-bg-boing-primary'
  );

  const ul = document.createElement('ul');
  ul.classList.add(
    'sticky-navigation-sticky-bottom-nav__list',
    'sticky-navigation-d-flex',
    'sticky-navigation-justify-content-around',
    'sticky-navigation-align-items-center',
    'sticky-navigation-flex-grow-1'
  );

  [...block.children].forEach((row) => {
    if (row.children.length === 4) { // Assuming each row corresponds to a navigation item
      const li = document.createElement('li');
      moveInstrumentation(row, li);
      li.classList.add('sticky-navigation-sticky-bottom-nav__item', 'sticky-navigation-position-relative');

      const link = document.createElement('a');
      link.classList.add(
        'sticky-navigation-sticky-bottom-nav__link',
        'sticky-navigation-d-flex',
        'sticky-navigation-flex-column',
        'sticky-navigation-align-items-center',
        'sticky-navigation-gap-1',
        'sticky-navigation-analytics_cta_click'
      );

      const iconCell = row.children[0];
      const labelCell = row.children[1];
      const linkCell = row.children[2];
      const consentCell = row.children[3];

      const img = iconCell.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        optimizedPic.querySelector('img').classList.add('sticky-navigation-sticky-bottom-nav__icon');
        link.append(optimizedPic);
      }

      const span = document.createElement('span');
      span.classList.add('sticky-navigation-sticky-bottom-nav__label');
      span.textContent = labelCell.textContent.trim();
      link.append(span);

      const linkHref = linkCell.textContent.trim();
      if (linkHref) {
        link.href = linkHref;
        link.setAttribute('data-link', linkHref);
      }

      const consentValue = consentCell.textContent.trim().toLowerCase();
      link.setAttribute('data-consent', consentValue === 'true' ? 'true' : 'false');

      li.append(link);
      ul.append(li);
    }
  });

  section.append(ul);
  block.textContent = ''; // Clear the original block content
  block.append(popUpDiv, transPopUpDiv, section);
}
