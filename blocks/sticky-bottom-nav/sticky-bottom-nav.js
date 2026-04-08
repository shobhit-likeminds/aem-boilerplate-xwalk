import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  section.classList.add('sticky-bottom-nav', 'position-fixed', 'bottom-0', 'p-3', 'd-flex', 'align-items-center', 'boing-container', 'bg-boing-primary');

  const ul = document.createElement('ul');
  ul.classList.add('sticky-bottom-nav__list', 'd-flex', 'justify-content-around', 'align-items-center', 'flex-grow-1');

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.classList.add('sticky-bottom-nav__item', 'position-relative');

    const link = document.createElement('a');
    link.classList.add('sticky-bottom-nav__link', 'd-flex', 'flex-column', 'align-items-center', 'gap-1', 'analytics_cta_click');

    let linkHref = '';
    let linkLabelText = '';
    let iconPicture = null;

    // Find cells based on content, not index
    const cells = [...row.children];
    const linkCell = cells.find(cell => cell.querySelector('a') && cell.textContent.trim() !== '' && !cell.querySelector('picture'));
    const labelCell = cells.find(cell => cell.textContent.trim() !== '' && !cell.querySelector('a') && !cell.querySelector('picture'));
    const iconCell = cells.find(cell => cell.querySelector('picture'));

    if (linkCell) {
      const a = linkCell.querySelector('a');
      if (a && a.href) {
        linkHref = a.href;
      }
      // If label text is also in the link cell, prioritize it from there
      if (linkCell.textContent.trim() && !labelCell) {
        linkLabelText = linkCell.textContent.trim();
      }
    }

    if (labelCell) {
      // If a separate label cell exists, use its text
      linkLabelText = labelCell.textContent.trim();
    }

    if (iconCell) {
      iconPicture = iconCell.querySelector('picture');
    }

    if (linkHref) {
      link.href = linkHref;
    }

    if (iconPicture) {
      const img = iconPicture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        const iconImg = optimizedPic.querySelector('img'); // Get the actual img from the optimized picture
        iconImg.classList.add('sticky-bottom-nav__icon');
        link.append(optimizedPic);
      }
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

  section.append(ul);
  block.textContent = '';
  block.append(section);
}
