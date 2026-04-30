import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  const [dotRightImageRow, dotLeftImageRow, titleRow, descriptionRow, ...motionCardRows] = children;

  const dotRight = document.createElement('div');
  dotRight.classList.add('dot-right');
  const dotRightPicture = dotRightImageRow.querySelector('picture');
  if (dotRightPicture) {
    const img = dotRightPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '267' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    dotRight.append(optimizedPic);
  }
  moveInstrumentation(dotRightImageRow, dotRight);

  const dotLeft = document.createElement('div');
  dotLeft.classList.add('dot-left');
  const dotLeftPicture = dotLeftImageRow.querySelector('picture');
  if (dotLeftPicture) {
    const img = dotLeftPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '267' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    dotLeft.append(optimizedPic);
  }
  moveInstrumentation(dotLeftImageRow, dotLeft);

  const container1600Wrp = document.createElement('div');
  container1600Wrp.classList.add('container-1600-wrp');

  const title = document.createElement('h2');
  title.classList.add('common-ttle', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  title.textContent = titleRow.textContent.trim();
  moveInstrumentation(titleRow, title);
  container1600Wrp.append(title);

  const description = document.createElement('p');
  description.classList.add('wow', 'animate__', 'animate__fadeInUp', 'animated');
  description.innerHTML = descriptionRow.children[0]?.querySelector('p')?.innerHTML ?? descriptionRow.textContent.trim() ?? '';
  moveInstrumentation(descriptionRow, description);
  container1600Wrp.append(description);

  const motionCardHld = document.createElement('div');
  motionCardHld.classList.add('motion-card-hld');

  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row');

  motionCardRows.forEach((cardRow, index) => {
    const [logoCell, headlineCell, cardDescriptionCell, ctaLinkCell, ctaLabelCell] = [...cardRow.children];

    const colLg6 = document.createElement('div');
    colLg6.classList.add('col-lg-6');

    const mCardBlurb = document.createElement('div');
    mCardBlurb.classList.add('m-card-blurb', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
    mCardBlurb.setAttribute('data-wow-duration', '1s');
    mCardBlurb.setAttribute('data-wow-delay', `${0.1 + index * 0.1}s`);

    const innerDiv = document.createElement('div');

    const figure = document.createElement('figure');
    const logoPicture = logoCell.querySelector('picture');
    if (logoPicture) {
      const img = logoPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '80' }]);
      optimizedPic.querySelector('img').classList.add('bg-cover');
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      figure.append(optimizedPic);
    }
    innerDiv.append(figure);

    const headline = document.createElement('h4');
    headline.textContent = headlineCell.textContent.trim();
    innerDiv.append(headline);

    const cardDescription = document.createElement('p');
    cardDescription.innerHTML = cardDescriptionCell?.querySelector('p')?.innerHTML ?? cardDescriptionCell?.textContent.trim() ?? '';
    innerDiv.append(cardDescription);

    mCardBlurb.append(innerDiv);

    const ctaLink = document.createElement('a');
    ctaLink.classList.add('btn-box');
    // FIX: ctaLink is aem-content, read href from the anchor
    const foundCtaLink = ctaLinkCell.querySelector('a');
    if (foundCtaLink) {
      ctaLink.href = foundCtaLink.href;
      ctaLink.target = '_blank';
    }
    ctaLink.textContent = ctaLabelCell.textContent.trim();
    moveInstrumentation(cardRow, mCardBlurb);
    mCardBlurb.append(ctaLink);

    colLg6.append(mCardBlurb);
    rowDiv.append(colLg6);
  });

  motionCardHld.append(rowDiv);

  block.replaceChildren(dotRight, dotLeft, container1600Wrp, motionCardHld);
}
