import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    backgroundImageRow,
    subtitleRow,
    headlineRow,
    descriptionRow,
    ctaLinkRow,
    ctaLabelRow,
  ] = [...block.children];

  const root = document.createElement('div');
  root.classList.add('hm-suatainability'); // From ORIGINAL HTML

  // Background Image
  const figure = document.createElement('figure');
  const picture = backgroundImageRow.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '1920' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      figure.append(optimizedPic);
      optimizedPic.querySelector('img').classList.add('bg-cover'); // From ORIGINAL HTML
    }
  }
  moveInstrumentation(backgroundImageRow, figure);
  root.append(figure);

  // Section details
  const sectDet = document.createElement('div');
  sectDet.classList.add('sect-det'); // From ORIGINAL HTML

  // Subtitle
  const subtitle = document.createElement('div');
  subtitle.classList.add('sub-ttle', 'wow', 'animate__', 'animate__fadeInUp', 'animated'); // From ORIGINAL HTML
  moveInstrumentation(subtitleRow, subtitle);
  const [subtitleCell] = [...subtitleRow.children]; // Fixed: destructuring
  subtitle.textContent = subtitleCell?.textContent.trim() || '';
  sectDet.append(subtitle);

  // Headline
  const headline = document.createElement('h2');
  headline.classList.add('common-ttle', 'wow', 'animate__', 'animate__fadeInUp', 'animated'); // From ORIGINAL HTML
  moveInstrumentation(headlineRow, headline);
  const [headlineCell] = [...headlineRow.children]; // Fixed: destructuring
  headline.textContent = headlineCell?.textContent.trim() || '';
  sectDet.append(headline);

  // Description
  const description = document.createElement('p');
  description.classList.add('wow', 'animate__', 'animate__fadeInUp', 'animated'); // From ORIGINAL HTML
  moveInstrumentation(descriptionRow, description);
  const [descriptionCell] = [...descriptionRow.children]; // Fixed: destructuring
  description.innerHTML = descriptionCell?.innerHTML || '';
  sectDet.append(description);

  // CTA Link and Label
  const ctaLink = document.createElement('a');
  ctaLink.classList.add('btn-box', 'wow', 'animate__', 'animate__fadeInUp', 'animated'); // From ORIGINAL HTML
  const foundLink = ctaLinkRow.querySelector('a');
  if (foundLink) {
    ctaLink.href = foundLink.href;
  }
  moveInstrumentation(ctaLinkRow, ctaLink);
  const [ctaLabelCell] = [...ctaLabelRow.children]; // Fixed: destructuring
  ctaLink.textContent = ctaLabelCell?.textContent.trim() || '';
  moveInstrumentation(ctaLabelRow, ctaLink); // Move instrumentation from label row as well
  sectDet.append(ctaLink);

  root.append(sectDet);

  block.replaceChildren(root);
}
