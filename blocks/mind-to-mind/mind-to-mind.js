import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    headingRow,
    descriptionRow,
    link1Row,
    link2Row,
    link3Row,
    link4Row,
    videoPlaceholderRow,
  ] = [...block.children];

  block.textContent = '';

  const container = document.createElement('div');
  container.classList.add('wp-block-uagb-container', 'uagb-block-c19854a5', 'alignfull', 'uagb-is-root-container');
  block.append(container);

  const innerWrap = document.createElement('div');
  innerWrap.classList.add('uagb-container-inner-blocks-wrap');
  container.append(innerWrap);

  const heading = document.createElement('h2');
  heading.classList.add('wp-block-heading');
  moveInstrumentation(headingRow, heading);
  heading.textContent = headingRow.firstElementChild.textContent;
  innerWrap.append(heading);

  const columns = document.createElement('div');
  columns.classList.add('wp-block-columns', 'is-layout-flex', 'wp-container-core-columns-is-layout-9d6595d7', 'wp-block-columns-is-layout-flex');
  innerWrap.append(columns);

  const leftColumn = document.createElement('div');
  leftColumn.classList.add('wp-block-column', 'is-layout-flow', 'wp-block-column-is-layout-flow');
  columns.append(leftColumn);

  const description = document.createElement('p');
  moveInstrumentation(descriptionRow, description);
  // Using firstElementChild to access the cell content, then moving its children
  while (descriptionRow.firstElementChild.firstChild) {
    description.append(descriptionRow.firstElementChild.firstChild);
  }
  leftColumn.append(description);

  const links = [link1Row, link2Row, link3Row, link4Row];
  links.forEach((row) => {
    const p = document.createElement('p');
    // Using firstElementChild to access the cell content
    const link = row.firstElementChild.querySelector('a');
    if (link) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.textContent = link.textContent;
      moveInstrumentation(row, newLink);
      p.append(newLink);
    }
    leftColumn.append(p);
  });

  const rightColumn = document.createElement('div');
  rightColumn.classList.add('wp-block-column', 'is-layout-flow', 'wp-block-column-is-layout-flow');
  columns.append(rightColumn);

  const genesisBlock = document.createElement('div');
  genesisBlock.classList.add('genesis-custom-block');
  rightColumn.append(genesisBlock);

  const iframeWrapper = document.createElement('div');
  iframeWrapper.classList.add('iframe-Wrapper');
  genesisBlock.append(iframeWrapper);

  const cookiePlaceholderDiv = document.createElement('div');
  cookiePlaceholderDiv.classList.add('cookie-placeholder');
  cookiePlaceholderDiv.setAttribute('data-cookiecategory', 'youtube');
  // Copy data attributes from original HTML's cookie-placeholder if available, or set defaults
  cookiePlaceholderDiv.setAttribute('data-src', 'https://www.youtube.com/embed/vPD1Tm5FIh8');
  cookiePlaceholderDiv.setAttribute('data-allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
  cookiePlaceholderDiv.setAttribute('data-title', 'My YouTube Video');
  cookiePlaceholderDiv.setAttribute('data-frameborder', '0');
  cookiePlaceholderDiv.setAttribute('data-allowfullscreen', 'true');
  iframeWrapper.append(cookiePlaceholderDiv);

  const placeholderP = document.createElement('p');
  moveInstrumentation(videoPlaceholderRow, placeholderP);
  // Using firstElementChild to access the cell content, then moving its children
  while (videoPlaceholderRow.firstElementChild.firstChild) {
    placeholderP.append(videoPlaceholderRow.firstElementChild.firstChild);
  }
  cookiePlaceholderDiv.append(placeholderP);

  // Handle cookie-placeholder interaction
  const updateConsentLink = placeholderP.querySelector('a');
  if (updateConsentLink) {
    updateConsentLink.addEventListener('click', (e) => {
      e.preventDefault();
      // eslint-disable-next-line no-undef
      if (typeof CookieControl !== 'undefined' && typeof CookieControl.open === 'function') {
        // eslint-disable-next-line no-undef
        CookieControl.open();
      } else {
        console.warn('CookieControl.open() is not defined. Ensure CookieControl script is loaded.');
      }
    });
  }

  // Optimize images if any were added (not explicitly in this block's model, but good practice)
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
