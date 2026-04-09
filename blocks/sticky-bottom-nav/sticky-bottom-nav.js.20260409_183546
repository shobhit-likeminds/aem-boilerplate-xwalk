import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  block.classList.add('position-fixed', 'bottom-0', 'p-3', 'd-flex', 'align-items-center', 'boing-container', 'bg-boing-primary');

  const ul = document.createElement('ul');
  ul.classList.add('sticky-bottom-nav__list', 'd-flex', 'justify-content-around', 'align-items-center', 'flex-grow-1');

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.classList.add('sticky-bottom-nav__item', 'position-relative');

    const link = document.createElement('a');
    link.classList.add('sticky-bottom-nav__link', 'd-flex', 'flex-column', 'align-items-center', 'gap-1', 'analytics_cta_click');

    let iconImg = null;
    let iconAltText = '';
    let linkHref = '';
    let linkLabelText = '';

    const cells = [...row.children];

    // Based on BlockJson:
    // cell[0]: field="icon" label="Icon" type=reference (picture)
    // cell[1]: field="iconAlt" label="Icon Alt Text" type=text
    // cell[2]: field="link" label="Link" type=aem-content (anchor)
    // cell[3]: field="linkLabel" label="Link Label" type=text

    const iconCell = cells[0];
    const iconAltTextCell = cells[1];
    const linkCell = cells[2];
    const linkLabelCell = cells[3];

    // Process Icon field
    if (iconCell && iconCell.querySelector('picture')) {
      const picture = iconCell.querySelector('picture');
      iconImg = picture ? picture.querySelector('img') : null;
    }

    // Process Icon Alt Text field
    if (iconAltTextCell) {
      iconAltText = iconAltTextCell.textContent.trim();
    }

    // Process Link field
    if (linkCell && linkCell.querySelector('a')) {
      const foundLink = linkCell.querySelector('a');
      if (foundLink) {
        linkHref = foundLink.href;
        // Check for data-consent and data-link attributes from original HTML
        if (foundLink.dataset.consent) link.dataset.consent = foundLink.dataset.consent;
        if (foundLink.dataset.link) link.dataset.link = foundLink.dataset.link;
      }
    }

    // Process Link Label field
    if (linkLabelCell) {
      linkLabelText = linkLabelCell.textContent.trim();
    }

    if (linkHref) {
      link.href = linkHref;
    }

    if (iconImg) {
      const img = document.createElement('img');
      img.src = iconImg.src;
      img.alt = iconAltText || iconImg.alt;
      img.classList.add('sticky-bottom-nav__icon');
      link.append(img);
    }

    if (linkLabelText) {
      const span = document.createElement('span');
      span.classList.add('sticky-bottom-nav__label');
      span.textContent = linkLabelText;
      link.append(span);
    }

    li.append(link);
    ul.append(li);
  });

  // Optimize pictures after all elements are created
  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(ul);
}
