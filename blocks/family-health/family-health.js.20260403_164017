import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, ...itemRows] = [...block.children];

  const container = document.createElement('div');
  container.classList.add('wp-block-uagb-container', 'block-bg-grey', 'uagb-block-8612f9ae', 'alignfull', 'uagb-is-root-container');

  const innerWrap = document.createElement('div');
  innerWrap.classList.add('uagb-container-inner-blocks-wrap');
  container.append(innerWrap);

  const heading = document.createElement('h2');
  heading.classList.add('wp-block-heading');
  moveInstrumentation(headingRow, heading);
  heading.append(headingRow.textContent); // Heading content is directly in the row's first child
  innerWrap.append(heading);

  const columnsWrapper = document.createElement('div'); // Renamed to avoid confusion with inner columns
  columnsWrapper.classList.add('wp-block-columns', 'is-layout-flex', 'wp-container-core-columns-is-layout-9d6595d7', 'wp-block-columns-is-layout-flex');
  innerWrap.append(columnsWrapper);

  itemRows.forEach((row) => {
    const cells = [...row.children];
    const descriptionCell = cells.find(cell => !cell.querySelector('picture') && !cell.querySelector('a'));
    const linkCells = cells.filter(cell => cell.querySelector('a'));
    const imageCell = cells.find(cell => cell.querySelector('picture'));

    const textColumn = document.createElement('div');
    textColumn.classList.add('wp-block-column', 'is-layout-flow', 'wp-block-column-is-layout-flow');
    moveInstrumentation(row, textColumn); // Instrument the text column with the row's original data

    if (descriptionCell) {
      const p = document.createElement('p');
      moveInstrumentation(descriptionCell, p);
      while (descriptionCell.firstChild) p.append(descriptionCell.firstChild);
      textColumn.append(p);
    }

    linkCells.forEach((cell) => {
      const p = document.createElement('p');
      moveInstrumentation(cell, p);
      const link = cell.querySelector('a');
      if (link) {
        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.textContent = link.textContent;
        p.append(newLink);
      }
      textColumn.append(p);
    });

    columnsWrapper.append(textColumn); // Append the text column first

    if (imageCell) {
      const imageColumn = document.createElement('div');
      imageColumn.classList.add('wp-block-column', 'is-layout-flow', 'wp-block-column-is-layout-flow');
      moveInstrumentation(imageCell, imageColumn); // Instrument the image column with the image cell's original data

      const figure = document.createElement('figure');
      figure.classList.add('wp-block-image', 'size-full');

      const picture = imageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          const anchor = document.createElement('a');
          // The image itself is wrapped in an anchor in the original HTML.
          // We'll use the href from the image's parent anchor if it exists,
          // or a placeholder if not. The model implies the image is a reference,
          // and the original HTML shows the image wrapped in an anchor.
          const imgLink = imageCell.querySelector('a') ? imageCell.querySelector('a').href : '#';
          anchor.href = imgLink;

          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '582' }]);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          anchor.append(optimizedPic);
          figure.append(anchor);
        }
      }
      imageColumn.append(figure);
      columnsWrapper.append(imageColumn); // Append the image column next to the text column
    }
  });

  // Optimize all images within the block that haven't been optimized yet (e.g., if imageCell logic was skipped)
  // This is a fallback and might re-optimize already optimized images if not careful.
  // Given the current structure, images are optimized when created. This loop might be redundant.
  // Removing for now, as createOptimizedPicture is called when the image is processed.
  // If there were other images not handled by the specific `imageCell` logic, this would be useful.

  block.textContent = '';
  block.append(container);
}
