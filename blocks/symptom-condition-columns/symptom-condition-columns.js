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
    // BlockJson specifies 5 fields per item row: heading, description, icon, link, link-label
    const headingCell = cells[0];
    const descriptionCell = cells[1];
    const iconCell = cells[2];
    const linkCell = cells[3];
    const linkLabelCell = cells[4];

    let headingEl = headingCell?.querySelector('h1, h2, h3, h4, h5, h6') || headingCell;
    let descriptionEl = descriptionCell?.querySelector('p') || descriptionCell;
    let iconEl = iconCell?.querySelector('picture');
    let linkEl = linkCell?.querySelector('a');
    let linkLabelEl = linkLabelCell; // link-label is a text field, not necessarily an anchor

    if (headingEl) {
      const h2 = document.createElement('h2');
      h2.classList.add('wp-block-heading');
      moveInstrumentation(headingEl.parentElement, h2);
      while (headingEl.firstChild) h2.append(headingEl.firstChild);
      column.append(h2);
    }

    if (descriptionEl) {
      const p = document.createElement('p');
      moveInstrumentation(descriptionEl.parentElement, p);
      while (descriptionEl.firstChild) p.append(descriptionEl.firstChild);
      column.append(p);
    }

    if (linkEl && linkLabelEl) {
      const nhsukActionLink = document.createElement('div');
      nhsukActionLink.classList.add('nhsuk-action-link');

      const nhsukActionLinkLink = document.createElement('a');
      nhsukActionLinkLink.classList.add('nhsuk-action-link__link');
      nhsukActionLinkLink.href = linkEl.href;
      nhsukActionLink.append(nhsukActionLinkLink);

      if (iconEl) {
        const img = iconEl.querySelector('img');
        if (img) {
          const newImg = document.createElement('img');
          newImg.alt = img.alt;
          newImg.src = img.src;
          moveInstrumentation(img.closest('picture'), newImg);
          nhsukActionLinkLink.append(newImg);
        }
      }

      const nhsukActionLinkText = document.createElement('span');
      nhsukActionLinkText.classList.add('nhsuk-action-link__text');
      moveInstrumentation(linkLabelEl, nhsukActionLinkText); // linkLabelEl is the cell itself
      while (linkLabelEl.firstChild) nhsukActionLinkText.append(linkLabelEl.firstChild);
      nhsukActionLinkLink.append(nhsukActionLinkText);

      column.append(nhsukActionLink);
    }

    columnsWrapper.append(column);
  });

  columnsWrapper.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(container);
}
