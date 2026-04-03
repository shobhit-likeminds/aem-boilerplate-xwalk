import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const container = document.createElement('div');
  container.classList.add('wp-block-uagb-container', 'block-bg-grey', 'uagb-block-df9f5331', 'alignfull', 'uagb-is-root-container');

  const innerWrap = document.createElement('div');
  innerWrap.classList.add('uagb-container-inner-blocks-wrap');
  container.append(innerWrap);

  const columnsWrapper = document.createElement('div');
  columnsWrapper.classList.add('wp-block-columns', 'is-layout-flex', 'wp-container-core-columns-is-layout-9d6595d7', 'wp-block-columns-is-layout-flex');
  innerWrap.append(columnsWrapper);

  [...block.children].forEach((row) => {
    const column = document.createElement('div');
    moveInstrumentation(row, column);
    column.classList.add('wp-block-column', 'is-layout-flow', 'wp-block-column-is-layout-flow');

    const cells = [...row.children];
    // Based on EDS BLOCK STRUCTURE:
    // cell[0]: field="heading"
    // cell[1]: field="description"
    // cell[2]: field="link-text"
    // cell[3]: field="link-url"
    // cell[4]: field="icon"

    const headingCell = cells[0];
    const descriptionCell = cells[1];
    const linkTextCell = cells[2];
    const linkUrlCell = cells[3];
    const iconCell = cells[4];

    // Heading
    if (headingCell) {
      const headingEl = headingCell.querySelector('h1, h2, h3, h4, h5, h6');
      if (headingEl) {
        const h2 = document.createElement('h2');
        h2.classList.add('wp-block-heading');
        moveInstrumentation(headingEl, h2);
        while (headingEl.firstChild) h2.append(headingEl.firstChild);
        column.append(h2);
      }
    }

    // Description
    if (descriptionCell) {
      const descriptionEl = descriptionCell.querySelector('p');
      if (descriptionEl) {
        const p = document.createElement('p');
        moveInstrumentation(descriptionEl, p);
        while (descriptionEl.firstChild) p.append(descriptionEl.firstChild);
        column.append(p);
      }
    }

    // Link and Icon
    const linkTextEl = linkTextCell?.querySelector('a');
    const linkUrlEl = linkUrlCell?.querySelector('a');
    const iconEl = iconCell?.querySelector('picture');

    if (linkTextEl && linkUrlEl) {
      const nhsukActionLink = document.createElement('div');
      nhsukActionLink.classList.add('nhsuk-action-link');

      const a = document.createElement('a');
      a.classList.add('nhsuk-action-link__link');
      a.href = linkUrlEl.href;
      moveInstrumentation(linkUrlEl, a); // Move instrumentation from the URL link cell

      if (iconEl) {
        const img = iconEl.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        a.append(optimizedPic);
      }

      const span = document.createElement('span');
      span.classList.add('nhsuk-action-link__text');
      moveInstrumentation(linkTextEl, span); // Move instrumentation from the link text cell
      while (linkTextEl.firstChild) span.append(linkTextEl.firstChild);
      a.append(span);

      nhsukActionLink.append(a);
      column.append(nhsukActionLink);
    }

    columnsWrapper.append(column);
  });

  block.textContent = '';
  block.append(container);
}
