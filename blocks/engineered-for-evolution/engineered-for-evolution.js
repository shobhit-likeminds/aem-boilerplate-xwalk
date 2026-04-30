import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headlineRow, introRow, ...blurbRows] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('hm-eng-for-evol'); // This is correct, it's the outer wrapper class from ORIGINAL HTML

  const container = document.createElement('div');
  container.classList.add('container-1600-wrp');

  const headline = document.createElement('h2');
  headline.classList.add('common-ttle', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  moveInstrumentation(headlineRow, headline);
  headline.textContent = headlineRow.children[0]?.textContent.trim() || '';
  container.append(headline);

  const intro = document.createElement('p');
  intro.classList.add('wow', 'animate__', 'animate__fadeInUp', 'animated');
  moveInstrumentation(introRow, intro);
  // Intro text is richtext, so we need to extract the content from its inner div.
  // The original HTML uses <p> for intro, so we'll set innerHTML directly.
  // Ensure we get the content from the cell, not the row.
  intro.innerHTML = introRow.children[0]?.innerHTML || '';
  container.append(intro);

  const blurbHolder = document.createElement('div');
  blurbHolder.classList.add('evolution-blurb-hld');

  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row');

  blurbRows.forEach((row) => {
    const [imageCell, titleCell, descriptionCell, ctaLinkCell, ctaLabelCell] = [...row.children];

    const col = document.createElement('div');
    col.classList.add('col-lg-4');

    const evolutionBlurb = document.createElement('div');
    evolutionBlurb.classList.add('evolution-blurb', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
    moveInstrumentation(row, evolutionBlurb);

    const blurb = document.createElement('div');
    blurb.classList.add('blurb');

    const contentDiv = document.createElement('div');

    const figure = document.createElement('figure');
    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '80' }]);
        optimizedPic.querySelector('img').classList.add('bg-cover');
        // moveInstrumentation should be called on the original img element, not the optimized one directly
        // The optimized picture replaces the original, so we move instrumentation from the original cell
        moveInstrumentation(imageCell, optimizedPic); // Move instrumentation from the imageCell to the new picture element
        figure.append(optimizedPic);
      }
    }
    contentDiv.append(figure);

    const blurbDet = document.createElement('div');
    blurbDet.classList.add('blurb-det');

    const title = document.createElement('h4');
    title.textContent = titleCell?.textContent.trim() || '';
    blurbDet.append(title);

    const description = document.createElement('p');
    description.innerHTML = descriptionCell?.innerHTML || ''; // description is richtext
    blurbDet.append(description);

    contentDiv.append(blurbDet);
    blurb.append(contentDiv);

    const ctaLink = document.createElement('a');
    ctaLink.classList.add('btn-box');
    const foundLink = ctaLinkCell.querySelector('a');
    if (foundLink) {
      ctaLink.href = foundLink.href; // Correctly get href from the <a> tag in ctaLinkCell
    }
    ctaLink.textContent = ctaLabelCell?.textContent.trim() || '';
    blurb.append(ctaLink);

    evolutionBlurb.append(blurb);
    col.append(evolutionBlurb);
    rowDiv.append(col);
  });

  blurbHolder.append(rowDiv);
  container.append(blurbHolder);
  section.append(container);

  block.replaceChildren(section);
}
