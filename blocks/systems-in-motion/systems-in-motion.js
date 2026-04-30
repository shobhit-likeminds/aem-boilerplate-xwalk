import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    dotImageRightRow,
    dotImageLeftRow,
    headlineRow,
    descriptionRow,
    ...motionCardRows
  ] = [...block.children];

  const section = document.createElement('section');
  // section.classList.add('systems-in-motion'); // Removed: The outer block div already has this class

  // Dot Image Right
  if (dotImageRightRow) {
    const dotRightDiv = document.createElement('div');
    dotRightDiv.classList.add('dot-right');
    const picture = dotImageRightRow.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '267' }]);
      moveInstrumentation(dotImageRightRow, optimizedPic.querySelector('img'));
      dotRightDiv.append(optimizedPic);
    }
    section.append(dotRightDiv);
  }

  // Dot Image Left
  if (dotImageLeftRow) {
    const dotLeftDiv = document.createElement('div');
    dotLeftDiv.classList.add('dot-left');
    const picture = dotImageLeftRow.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '267' }]);
      moveInstrumentation(dotImageLeftRow, optimizedPic.querySelector('img'));
      dotLeftDiv.append(optimizedPic);
    }
    section.append(dotLeftDiv);
  }

  const containerWrapper = document.createElement('div');
  containerWrapper.classList.add('container-1600-wrp');

  // Headline
  if (headlineRow) {
    const headline = document.createElement('h2');
    headline.classList.add('common-ttle', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
    moveInstrumentation(headlineRow, headline);
    headline.textContent = headlineRow.textContent.trim();
    containerWrapper.append(headline);
  }

  // Description
  if (descriptionRow) {
    const description = document.createElement('div'); // Changed to div to avoid <p> inside <p>
    description.classList.add('wow', 'animate__', 'animate__fadeInUp', 'animated');
    moveInstrumentation(descriptionRow, description);
    description.innerHTML = descriptionRow.children[0]?.innerHTML || ''; // Correctly reads from the cell
    containerWrapper.append(description);
  }
  section.append(containerWrapper);

  // Motion Cards
  if (motionCardRows.length > 0) {
    const motionCardHld = document.createElement('div');
    motionCardHld.classList.add('motion-card-hld');

    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row');

    motionCardRows.forEach((cardRow, index) => {
      const [logoCell, cardHeadlineCell, cardDescriptionCell, ctaLinkCell, ctaLabelCell] = [
        ...cardRow.children,
      ];

      const colDiv = document.createElement('div');
      colDiv.classList.add('col-lg-6');

      const mCardBlurb = document.createElement('div');
      mCardBlurb.classList.add('m-card-blurb', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
      mCardBlurb.setAttribute('data-wow-duration', '1s');
      mCardBlurb.setAttribute('data-wow-delay', `${0.1 * (index + 1)}s`);

      const contentDiv = document.createElement('div');

      // Card Logo
      if (logoCell) {
        const figure = document.createElement('figure');
        const picture = logoCell.querySelector('picture');
        if (picture) {
          const img = picture.querySelector('img');
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '80' }]);
          optimizedPic.querySelector('img').classList.add('bg-cover');
          moveInstrumentation(logoCell, optimizedPic.querySelector('img'));
          figure.append(optimizedPic);
        }
        contentDiv.append(figure);
      }

      // Card Headline
      if (cardHeadlineCell) {
        const h4 = document.createElement('h4');
        h4.textContent = cardHeadlineCell.textContent.trim();
        moveInstrumentation(cardHeadlineCell, h4);
        contentDiv.append(h4);
      }

      // Card Description
      if (cardDescriptionCell) {
        const p = document.createElement('div'); // Changed to div to avoid <p> inside <p>
        p.innerHTML = cardDescriptionCell.innerHTML;
        moveInstrumentation(cardDescriptionCell, p);
        contentDiv.append(p);
      }

      mCardBlurb.append(contentDiv);

      // CTA Link and Label
      if (ctaLinkCell && ctaLabelCell) {
        const ctaLink = document.createElement('a');
        ctaLink.classList.add('btn-box');
        const foundLink = ctaLinkCell.querySelector('a');
        if (foundLink) {
          ctaLink.href = foundLink.href;
          ctaLink.target = '_blank'; // Assuming target blank from original HTML
        }
        ctaLink.textContent = ctaLabelCell.textContent.trim();
        moveInstrumentation(ctaLinkCell, ctaLink); // Move instrumentation from link cell
        moveInstrumentation(ctaLabelCell, ctaLink); // Move instrumentation from label cell
        mCardBlurb.append(ctaLink);
      }
      moveInstrumentation(cardRow, mCardBlurb); // Move instrumentation from the item row
      colDiv.append(mCardBlurb);
      rowDiv.append(colDiv);
    });
    motionCardHld.append(rowDiv);
    section.append(motionCardHld);
  }

  block.replaceChildren(section);
}
