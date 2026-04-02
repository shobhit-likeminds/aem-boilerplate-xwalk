import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The block structure is:
  // 0: Heading row (single cell with heading text)
  // 1: Footer row (single cell with rich text)
  // 2+: Service Link rows (each with a single cell containing an <a> tag)

  // Separate the rows based on the BlockJson structure
  const allRows = [...block.children];
  const headingRow = allRows[0];
  const footerRow = allRows[1];
  const serviceLinkRows = allRows.slice(2);

  // Create the main container div
  const mainContainer = document.createElement('div');
  mainContainer.classList.add('wp-block-uagb-container', 'uagb-block-1bb4371e', 'alignfull', 'uagb-is-root-container');

  const innerWrap = document.createElement('div');
  innerWrap.classList.add('uagb-container-inner-blocks-wrap');
  mainContainer.append(innerWrap);

  // Heading section
  if (headingRow) {
    const headingColumns = document.createElement('div');
    headingColumns.classList.add('wp-block-columns', 'is-layout-flex', 'wp-container-core-columns-is-layout-9d6595d7', 'wp-block-columns-is-layout-flex');
    moveInstrumentation(headingRow, headingColumns);

    const headingColumn = document.createElement('div');
    headingColumn.classList.add('wp-block-column', 'is-layout-flow', 'wp-block-column-is-layout-flow');

    const h2 = document.createElement('h2');
    h2.classList.add('wp-block-heading');
    // The heading content is in the first child of the headingRow
    const headingCell = headingRow.firstElementChild;
    if (headingCell) {
      moveInstrumentation(headingCell, h2);
      while (headingCell.firstChild) h2.append(headingCell.firstChild);
    }

    headingColumn.append(h2);
    headingColumns.append(headingColumn);
    innerWrap.append(headingColumns);
  }

  // Service Links section
  if (serviceLinkRows.length > 0) {
    const serviceLinksColumns = document.createElement('div');
    serviceLinksColumns.classList.add('wp-block-columns', 'is-layout-flex', 'wp-container-core-columns-is-layout-9d6595d7', 'wp-block-columns-is-layout-flex');

    // Divide links into two columns
    const column1 = document.createElement('div');
    column1.classList.add('wp-block-column', 'is-layout-flow', 'wp-block-column-is-layout-flow');
    const column2 = document.createElement('div');
    column2.classList.add('wp-block-column', 'is-layout-flow', 'wp-block-column-is-layout-flow');

    serviceLinkRows.forEach((row, index) => {
      // Each serviceLinkRow has one cell containing the link
      const linkCell = row.firstElementChild;
      if (linkCell) {
        const foundLink = linkCell.querySelector('a');
        if (foundLink) {
          const link = document.createElement('a');
          link.classList.add('nhsuk-action-group__link');
          link.href = foundLink.href;
          moveInstrumentation(linkCell, link);
          // Move all child nodes from linkCell to the new link element
          while (foundLink.firstChild) link.append(foundLink.firstChild);

          const icon = document.createElement('i');
          icon.classList.add('fa-solid', 'fa-angle-right');
          link.append(icon);

          if (index % 2 === 0) {
            column1.append(link);
          } else {
            column2.append(link);
          }
        }
      }
    });

    serviceLinksColumns.append(column1, column2);
    innerWrap.append(serviceLinksColumns);
  }

  // Footer section
  if (footerRow) {
    const footerContent = document.createElement('p');
    // The footer content is in the first child of the footerRow
    const footerCell = footerRow.firstElementChild;
    if (footerCell) {
      moveInstrumentation(footerCell, footerContent);
      while (footerCell.firstChild) footerContent.append(footerCell.firstChild);
    }
    innerWrap.append(footerContent);
  }

  block.textContent = '';
  block.append(mainContainer);
}
