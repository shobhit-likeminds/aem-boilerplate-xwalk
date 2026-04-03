import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Destructure rows based on the BlockJson model and EDS structure
  // headingRow: block.children[0]
  // introRow: block.children[1]
  // imageRow: block.children[2]
  // imageLinkRow: block.children[3]
  // linkRows: remaining rows for the 'links' container field
  const [headingRow, introRow, imageRow, imageLinkRow, ...linkRows] = [...block.children];

  const wrapper = document.createElement('div');
  wrapper.classList.add('wp-block-uagb-container', 'block-bg-grey', 'uagb-block-8612f9ae', 'alignfull', 'uagb-is-root-container');

  const innerWrap = document.createElement('div');
  innerWrap.classList.add('uagb-container-inner-blocks-wrap');
  wrapper.append(innerWrap);

  // Heading
  const heading = document.createElement('h2');
  heading.classList.add('wp-block-heading');
  moveInstrumentation(headingRow, heading);
  // CRITICAL FIX: Replaced .firstElementChild.textContent with content detection
  const headingContent = headingRow.querySelector('div')?.textContent;
  if (headingContent) {
    heading.textContent = headingContent;
  }
  innerWrap.append(heading);

  const columns = document.createElement('div');
  columns.classList.add('wp-block-columns', 'is-layout-flex', 'wp-container-core-columns-is-layout-9d6595d7', 'wp-block-columns-is-layout-flex');
  innerWrap.append(columns);

  const column1 = document.createElement('div');
  column1.classList.add('wp-block-column', 'is-layout-flow', 'wp-block-column-is-layout-flow');
  columns.append(column1);

  // Intro
  const introP = document.createElement('p');
  moveInstrumentation(introRow, introP);
  // CRITICAL FIX: Replaced .firstElementChild.firstChild with content detection
  const introDiv = introRow.querySelector('div');
  if (introDiv) {
    while (introDiv.firstChild) {
      introP.append(introDiv.firstChild);
    }
  }
  column1.append(introP);

  // Links
  linkRows.forEach((row) => {
    const p = document.createElement('p');
    moveInstrumentation(row, p);
    // Correctly using row.querySelector('a') for link detection
    const link = row.querySelector('a');
    if (link) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.textContent = link.textContent;
      p.append(newLink);
    }
    column1.append(p);
  });

  const column2 = document.createElement('div');
  column2.classList.add('wp-block-column', 'is-layout-flow', 'wp-block-column-is-layout-flow');
  columns.append(column2);

  // Image and Image Link
  const figure = document.createElement('figure');
  figure.classList.add('wp-block-image', 'size-full');
  moveInstrumentation(imageRow, figure);

  const imageLink = imageLinkRow.querySelector('a');
  if (imageLink) {
    const newImageLink = document.createElement('a');
    newImageLink.href = imageLink.href;
    moveInstrumentation(imageLinkRow, newImageLink);
    figure.append(newImageLink);

    const picture = imageRow.querySelector('picture');
    if (picture) {
      newImageLink.append(picture);
    }
  } else {
    const picture = imageRow.querySelector('picture');
    if (picture) {
      figure.append(picture);
    }
  }

  column2.append(figure);

  // Optimize images
  wrapper.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(wrapper);
}
