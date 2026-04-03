import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // According to EDS BLOCK STRUCTURE and BLOCK JSON:
  // block.children[0] is Heading
  // block.children[1] is Footer
  // block.children[2...] are Service Links
  const allRows = [...block.children];
  const headingRow = allRows[0];
  const footerRow = allRows[1];
  const serviceLinkRows = allRows.slice(2);

  // Main container
  const mainContainer = document.createElement('div');
  mainContainer.classList.add('wp-block-uagb-container', 'uagb-block-1bb4371e', 'alignfull', 'uagb-is-root-container');
  const innerWrap = document.createElement('div');
  innerWrap.classList.add('uagb-container-inner-blocks-wrap');
  mainContainer.append(innerWrap);

  // Heading
  if (headingRow) {
    const headingColumns = document.createElement('div');
    headingColumns.classList.add('wp-block-columns', 'is-layout-flex', 'wp-container-core-columns-is-layout-9d6595d7', 'wp-block-columns-is-layout-flex');
    const headingColumn = document.createElement('div');
    headingColumn.classList.add('wp-block-column', 'is-layout-flow', 'wp-block-column-is-layout-flow');
    const h2 = document.createElement('h2');
    h2.classList.add('wp-block-heading');
    // Use firstElementChild as per BlockJson for single cell row
    moveInstrumentation(headingRow.firstElementChild, h2);
    while (headingRow.firstElementChild.firstChild) h2.append(headingRow.firstElementChild.firstChild);
    headingColumn.append(h2);
    headingColumns.append(headingColumn);
    innerWrap.append(headingColumns);
  }

  // Service Links
  if (serviceLinkRows.length > 0) {
    const serviceLinksColumns = document.createElement('div');
    serviceLinksColumns.classList.add('wp-block-columns', 'is-layout-flex', 'wp-container-core-columns-is-layout-9d6595d7', 'wp-block-columns-is-layout-flex');

    // Split links into two columns for layout matching original HTML
    const half = Math.ceil(serviceLinkRows.length / 2);
    const firstColumnLinks = serviceLinkRows.slice(0, half);
    const secondColumnLinks = serviceLinkRows.slice(half);

    const createLinkColumn = (links) => {
      const column = document.createElement('div');
      column.classList.add('wp-block-column', 'is-layout-flow', 'wp-block-column-is-layout-flow');
      links.forEach((row) => {
        // Each service-link item row has only one cell: row.firstElementChild
        const cell = row.firstElementChild;
        if (cell) {
          const foundLink = cell.querySelector('a');
          if (foundLink) {
            const link = document.createElement('a');
            link.classList.add('nhsuk-action-group__link');
            link.href = foundLink.href;
            moveInstrumentation(foundLink, link);
            while (foundLink.firstChild) link.append(foundLink.firstChild);

            const icon = document.createElement('i');
            icon.classList.add('fa-solid', 'fa-angle-right');
            link.append(icon);
            column.append(link);
          }
        }
      });
      return column;
    };

    serviceLinksColumns.append(createLinkColumn(firstColumnLinks));
    if (secondColumnLinks.length > 0) {
      serviceLinksColumns.append(createLinkColumn(secondColumnLinks));
    }
    innerWrap.append(serviceLinksColumns);
  }

  // Footer
  if (footerRow) {
    const p = document.createElement('p');
    // Use firstElementChild as per BlockJson for single cell row
    moveInstrumentation(footerRow.firstElementChild, p);
    while (footerRow.firstElementChild.firstChild) p.append(footerRow.firstElementChild.firstChild);
    innerWrap.append(p);
  }

  block.textContent = '';
  block.append(mainContainer);

  // Image optimization (no images in this block, but keeping the pattern for completeness)
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
