import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [dotRightImageRow, dotLeftImageRow, headingRow, introTextRow, ...motionCardRows] = [...block.children];

  block.classList.add('systems-in-motion');

  // Dot Right Image
  if (dotRightImageRow) {
    const dotRightDiv = document.createElement('div');
    dotRightDiv.classList.add('dot-right');
    const picture = dotRightImageRow.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '267' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        dotRightDiv.append(optimizedPic);
      }
    }
    moveInstrumentation(dotRightImageRow, dotRightDiv);
    block.append(dotRightDiv);
  }

  // Dot Left Image
  if (dotLeftImageRow) {
    const dotLeftDiv = document.createElement('div');
    dotLeftDiv.classList.add('dot-left');
    const picture = dotLeftImageRow.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '267' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        dotLeftDiv.append(optimizedPic);
      }
    }
    moveInstrumentation(dotLeftImageRow, dotLeftDiv);
    block.append(dotLeftDiv);
  }

  // Container for Heading and Intro Text
  const containerWrapper = document.createElement('div');
  containerWrapper.classList.add('container-1600-wrp');

  // Heading
  if (headingRow) {
    const headingCell = headingRow.firstElementChild;
    const h2 = document.createElement('h2');
    h2.classList.add('common-ttle', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
    h2.textContent = headingCell.textContent.trim();
    moveInstrumentation(headingRow, h2);
    containerWrapper.append(h2);
  }

  // Intro Text
  if (introTextRow) {
    const introTextCell = introTextRow.firstElementChild;
    const p = document.createElement('p');
    p.classList.add('wow', 'animate__', 'animate__fadeInUp', 'animated');
    p.innerHTML = introTextCell.innerHTML;
    moveInstrumentation(introTextRow, p);
    containerWrapper.append(p);
  }
  block.append(containerWrapper);

  // Motion Cards
  if (motionCardRows.length > 0) {
    const motionCardHld = document.createElement('div');
    motionCardHld.classList.add('motion-card-hld');

    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row');

    motionCardRows.forEach((cardRow, index) => {
      // CRITICAL FIX: Destructuring for fixed-field item models
      const [logoCell, titleCell, descriptionCell, ctaLinkCell, ctaLinkLabelCell] = [...cardRow.children];

      const colDiv = document.createElement('div');
      colDiv.classList.add('col-lg-6');

      const mCardBlurb = document.createElement('div');
      mCardBlurb.classList.add('m-card-blurb', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
      mCardBlurb.style.animationDuration = '1s';
      mCardBlurb.style.animationDelay = `${0.1 + index * 0.1}s`;

      const contentDiv = document.createElement('div');

      // Logo
      if (logoCell) {
        const figure = document.createElement('figure');
        const picture = logoCell.querySelector('picture');
        if (picture) {
          const img = picture.querySelector('img');
          if (img) {
            const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '80' }]);
            optimizedPic.querySelector('img').classList.add('bg-cover');
            moveInstrumentation(img, optimizedPic.querySelector('img'));
            figure.append(optimizedPic);
          }
        }
        contentDiv.append(figure);
      }

      // Title
      if (titleCell) {
        const h4 = document.createElement('h4');
        h4.textContent = titleCell.textContent.trim();
        contentDiv.append(h4);
      }

      // Description
      if (descriptionCell) {
        const p = document.createElement('p');
        p.innerHTML = descriptionCell.innerHTML;
        contentDiv.append(p);
      }

      mCardBlurb.append(contentDiv);

      // CTA Link
      if (ctaLinkCell && ctaLinkLabelCell) {
        const ctaAnchor = ctaLinkCell.querySelector('a'); // Get the anchor from the ctaLinkCell
        if (ctaAnchor) {
          const anchor = document.createElement('a');
          anchor.href = ctaAnchor.href; // Use the href from the aem-content cell
          anchor.textContent = ctaLinkLabelCell.textContent.trim(); // Use text from ctaLinkLabelCell
          anchor.classList.add('btn-box');
          anchor.target = '_blank';
          mCardBlurb.append(anchor);
        }
      }
      moveInstrumentation(cardRow, mCardBlurb);
      colDiv.append(mCardBlurb);
      rowDiv.append(colDiv);
    });
    motionCardHld.append(rowDiv);
    block.append(motionCardHld);
  }

  // Remove original rows as they have been processed
  [...block.children].forEach((child) => {
    if (!child.classList.contains('dot-right') && !child.classList.contains('dot-left') &&
        !child.classList.contains('container-1600-wrp') && !child.classList.contains('motion-card-hld')) {
      child.remove();
    }
  });
}
