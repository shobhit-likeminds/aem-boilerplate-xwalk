import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, descriptionRow, ...blurbRows] = [...block.children];

  block.textContent = '';
  block.classList.add('hm-eng-for-evol');

  const containerWrapper = document.createElement('div');
  containerWrapper.classList.add('container-1600-wrp');

  // Heading
  const heading = document.createElement('h2');
  heading.classList.add('common-ttle', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  moveInstrumentation(headingRow.firstElementChild, heading);
  heading.textContent = headingRow.firstElementChild.textContent.trim();
  containerWrapper.append(heading);

  // Description
  const description = document.createElement('p');
  description.classList.add('wow', 'animate__', 'animate__fadeInUp', 'animated');
  moveInstrumentation(descriptionRow.firstElementChild, description);
  description.innerHTML = descriptionRow.firstElementChild.innerHTML;
  containerWrapper.append(description);

  // Blurbs container
  const evolutionBlurbHld = document.createElement('div');
  evolutionBlurbHld.classList.add('evolution-blurb-hld');
  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row');

  blurbRows.forEach((row) => {
    // Destructuring is safe here as per BlockJson and EDS Block Structure for 'evolution-blurb' items.
    const [imageCell, titleCell, textCell, ctaLinkCell, ctaLinkLabelCell] = [...row.children];

    const colLg4 = document.createElement('div');
    colLg4.classList.add('col-lg-4');

    const evolutionBlurb = document.createElement('div');
    evolutionBlurb.classList.add('evolution-blurb', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
    moveInstrumentation(row, evolutionBlurb);

    const blurbDiv = document.createElement('div');
    blurbDiv.classList.add('blurb');

    const contentDiv = document.createElement('div');

    const figure = document.createElement('figure');
    const picture = imageCell.querySelector('picture');
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

    const blurbDet = document.createElement('div');
    blurbDet.classList.add('blurb-det');

    const title = document.createElement('h4');
    moveInstrumentation(titleCell, title);
    title.textContent = titleCell.textContent.trim();
    blurbDet.append(title);

    const text = document.createElement('p');
    moveInstrumentation(textCell, text);
    text.innerHTML = textCell.innerHTML;
    blurbDet.append(text);

    contentDiv.append(blurbDet);
    blurbDiv.append(contentDiv);

    const ctaLink = document.createElement('a');
    ctaLink.classList.add('btn-box');
    const foundCtaLink = ctaLinkCell.querySelector('a');
    if (foundCtaLink) {
      ctaLink.href = foundCtaLink.href; // Correctly get href from the <a> tag
    }
    moveInstrumentation(ctaLinkCell, ctaLink);
    ctaLink.textContent = ctaLinkLabelCell.textContent.trim();
    blurbDiv.append(ctaLink);

    evolutionBlurb.append(blurbDiv);
    colLg4.append(evolutionBlurb);
    rowDiv.append(colLg4);
  });

  evolutionBlurbHld.append(rowDiv);
  containerWrapper.append(evolutionBlurbHld);
  block.append(containerWrapper);
}
