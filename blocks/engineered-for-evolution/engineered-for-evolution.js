import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Check 0.5: Remove block's own class from inner wrapper.
  // The outer block div already carries 'engineered-for-evolution' from AEM.
  // const section = document.createElement('section');
  // section.classList.add('hm-eng-for-evol'); // This is the block name in kebab-case.

  const section = document.createElement('section');
  section.classList.add('hm-eng-for-evol'); // This class is from ORIGINAL HTML, not the block name.

  const container = document.createElement('div');
  container.classList.add('container-1600-wrp');
  section.append(container);

  // Check 0: Replaced direct children[n] access for root rows with named destructuring.
  const [sectionTitleRow, sectionDescriptionRow, ...blurbItems] = [...block.children];

  // Section Title
  const sectionTitle = document.createElement('h2');
  sectionTitle.classList.add('common-ttle', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  moveInstrumentation(sectionTitleRow, sectionTitle);
  sectionTitle.textContent = sectionTitleRow.children[0]?.textContent.trim() || '';
  container.append(sectionTitle);

  // Section Description
  const sectionDescription = document.createElement('p');
  sectionDescription.classList.add('wow', 'animate__', 'animate__fadeInUp', 'animated');
  moveInstrumentation(sectionDescriptionRow, sectionDescription);
  // Check 0.6 & 0.7B: sectionDescription is a <p>, so assigning innerHTML directly from a richtext cell
  // which contains <p> will create <p><p>...</p></p>. Use a <div> or extract inner content.
  // Since the original HTML uses <p> for the description, we should extract the inner content.
  sectionDescription.innerHTML = sectionDescriptionRow.querySelector('p')?.innerHTML ?? sectionDescriptionRow.textContent.trim() ?? '';
  container.append(sectionDescription);

  // Blurbs
  const blurbsHolder = document.createElement('div');
  blurbsHolder.classList.add('evolution-blurb-hld');
  container.append(blurbsHolder);

  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row');
  blurbsHolder.append(rowDiv);

  blurbItems.forEach((row) => {
    // Check 0: Array destructuring is correct for fixed-schema rows.
    const [imageCell, titleCell, descriptionCell, ctaLinkCell, ctaLabelCell] = [...row.children];

    const colLg4 = document.createElement('div');
    colLg4.classList.add('col-lg-4');
    rowDiv.append(colLg4);

    const evolutionBlurb = document.createElement('div');
    evolutionBlurb.classList.add('evolution-blurb', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
    colLg4.append(evolutionBlurb);

    const blurb = document.createElement('div');
    blurb.classList.add('blurb');
    evolutionBlurb.append(blurb);

    const blurbContentDiv = document.createElement('div');
    blurb.append(blurbContentDiv);

    // Image
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
    blurbContentDiv.append(figure);

    const blurbDet = document.createElement('div');
    blurbDet.classList.add('blurb-det');
    blurbContentDiv.append(blurbDet);

    // Title
    const title = document.createElement('h4');
    moveInstrumentation(titleCell, title);
    title.textContent = titleCell.textContent.trim();
    blurbDet.append(title);

    // Description
    const description = document.createElement('p');
    moveInstrumentation(descriptionCell, description);
    // Check 0.6 & 0.7B: description is a <p>, so assigning innerHTML directly from a richtext cell
    // which contains <p> will create <p><p>...</p></p>. Use a <div> or extract inner content.
    // The original HTML shows <p> for the blurb description, so extract inner content.
    description.innerHTML = descriptionCell.querySelector('p')?.innerHTML ?? descriptionCell.textContent.trim() ?? '';
    blurbDet.append(description);

    // CTA Link and Label
    const ctaLink = document.createElement('a');
    ctaLink.classList.add('btn-box');
    const foundLink = ctaLinkCell.querySelector('a');
    if (foundLink) {
      ctaLink.href = foundLink.href;
      if (foundLink.target) ctaLink.target = foundLink.target;
    }
    moveInstrumentation(ctaLinkCell, ctaLink);
    ctaLink.textContent = ctaLabelCell.textContent.trim();
    blurb.append(ctaLink);
  });

  block.replaceChildren(section);
}
