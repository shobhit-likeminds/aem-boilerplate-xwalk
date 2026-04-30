import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [bannerImageRow, sectionTitleRow, headlineRow, ctaLinkRow, ctaLabelRow] = [...block.children];

  const section = document.createElement('section');
  // section.classList.add('hm-careers'); // Removed: block already has this class
  moveInstrumentation(block, section); // Move instrumentation from block to section

  const careersContainer = document.createElement('div');
  careersContainer.classList.add('hm-careers-con');
  section.append(careersContainer);

  // Banner Image
  const figure = document.createElement('figure');
  if (bannerImageRow) {
    const picture = bannerImageRow.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '1920' }]);
        optimizedPic.querySelector('img').classList.add('bg-cover');
        moveInstrumentation(bannerImageRow, optimizedPic.querySelector('img'));
        figure.append(optimizedPic);
      }
    }
  }
  careersContainer.append(figure);

  const sectionDetails = document.createElement('div');
  sectionDetails.classList.add('sect-det');
  careersContainer.append(sectionDetails);

  // Section Title
  if (sectionTitleRow) {
    const subTitle = document.createElement('div');
    subTitle.classList.add('sub-ttle', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
    moveInstrumentation(sectionTitleRow, subTitle);
    subTitle.textContent = sectionTitleRow.textContent.trim();
    sectionDetails.append(subTitle);
  }

  // Headline
  if (headlineRow) {
    const headline = document.createElement('h2');
    headline.classList.add('common-ttle', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
    moveInstrumentation(headlineRow, headline);
    // Fix: headlineRow.innerHTML contains <p> which would create <h2><p>...</p></h2>
    // Read from the cell's first child (the <p> element) or fallback to textContent
    headline.innerHTML = headlineRow.children[0]?.innerHTML ?? headlineRow.textContent.trim();
    sectionDetails.append(headline);
  }

  // CTA Link and Label
  if (ctaLinkRow && ctaLabelRow) {
    const ctaLink = document.createElement('a');
    ctaLink.classList.add('btn-box', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
    const foundLink = ctaLinkRow.querySelector('a');
    if (foundLink) {
      ctaLink.href = foundLink.href;
    }
    moveInstrumentation(ctaLinkRow, ctaLink);
    ctaLink.textContent = ctaLabelRow.textContent.trim();
    sectionDetails.append(ctaLink);
  }

  block.replaceChildren(section);
}
