import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, introRow, ...itemRows] = [...block.children];

  const heading = headingRow.querySelector('div');
  const intro = introRow.querySelector('div');

  const links = itemRows.filter((row) => row.querySelector('div > a'));
  // Use content detection for video rows: they have two cells, and no anchor in the first cell
  const videos = itemRows.filter((row) => {
    const cells = [...row.children];
    return cells.length === 2 && !cells[0].querySelector('a');
  });

  const container = document.createElement('div');
  container.classList.add('wp-block-uagb-container', 'uagb-block-c19854a5', 'alignfull', 'uagb-is-root-container');

  const innerWrap = document.createElement('div');
  innerWrap.classList.add('uagb-container-inner-blocks-wrap');
  container.append(innerWrap);

  if (heading) {
    const h2 = document.createElement('h2');
    h2.classList.add('wp-block-heading');
    moveInstrumentation(headingRow, h2);
    h2.append(...heading.childNodes);
    innerWrap.append(h2);
  }

  const columns = document.createElement('div');
  columns.classList.add('wp-block-columns', 'is-layout-flex', 'wp-container-core-columns-is-layout-9d6595d7', 'wp-block-columns-is-layout-flex');
  innerWrap.append(columns);

  const leftColumn = document.createElement('div');
  leftColumn.classList.add('wp-block-column', 'is-layout-flow', 'wp-block-column-is-layout-flow');
  columns.append(leftColumn);

  if (intro) {
    moveInstrumentation(introRow, intro);
    leftColumn.append(intro);
  }

  links.forEach((row) => {
    const linkCell = row.querySelector('div');
    if (linkCell) {
      const foundLink = linkCell.querySelector('a');
      const p = document.createElement('p');
      const a = document.createElement('a');
      if (foundLink) {
        a.href = foundLink.href;
        a.textContent = foundLink.textContent;
      }
      moveInstrumentation(row, p);
      p.append(a);
      leftColumn.append(p);
    }
  });

  const rightColumn = document.createElement('div');
  rightColumn.classList.add('wp-block-column', 'is-layout-flow', 'wp-block-column-is-layout-flow');
  columns.append(rightColumn);

  videos.forEach((row) => {
    const cells = [...row.children];
    const videoSrcCell = cells[0]; // Now safe because we filtered for rows with 2 children
    const videoTitleCell = cells[1]; // Now safe because we filtered for rows with 2 children

    if (videoSrcCell && videoTitleCell) {
      const genesisBlock = document.createElement('div');
      genesisBlock.classList.add('genesis-custom-block');

      const iframeWrapper = document.createElement('div');
      iframeWrapper.classList.add('iframe-Wrapper');
      genesisBlock.append(iframeWrapper);

      const cookiePlaceholder = document.createElement('div');
      cookiePlaceholder.classList.add('cookie-placeholder');
      cookiePlaceholder.setAttribute('data-cookiecategory', 'youtube');
      cookiePlaceholder.setAttribute('data-src', videoSrcCell.textContent.trim());
      cookiePlaceholder.setAttribute('data-allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
      cookiePlaceholder.setAttribute('data-title', videoTitleCell.textContent.trim());
      cookiePlaceholder.setAttribute('data-frameborder', '0');
      cookiePlaceholder.setAttribute('data-allowfullscreen', 'true');

      const p = document.createElement('p');
      p.innerHTML = 'This video requires YouTube cookies. <a href="#" class="cookie-consent-link">Update your consent</a>.';
      cookiePlaceholder.append(p);

      // Add event listener for the cookie consent link
      const consentLink = p.querySelector('.cookie-consent-link');
      if (consentLink) {
        consentLink.addEventListener('click', (e) => {
          e.preventDefault();
          if (window.CookieControl && typeof window.CookieControl.open === 'function') {
            window.CookieControl.open();
          } else {
            console.warn('CookieControl.open() is not available.');
          }
        });
      }

      iframeWrapper.append(cookiePlaceholder);
      moveInstrumentation(row, genesisBlock);
      rightColumn.append(genesisBlock);
    }
  });

  block.textContent = '';
  block.append(container);
}
