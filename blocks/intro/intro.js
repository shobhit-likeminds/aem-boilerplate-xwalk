import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [titleRow, bodyRow, buttonLinkRow, buttonLabelRow] = [...block.children];

  const section = document.createElement('section');
  section.id = 'intro';
  section.classList.add('intro-wrapper', 'intro-style1');

  // Title
  const titleDiv = document.createElement('div');
  titleDiv.classList.add('intro-title');
  // The title content is in the first child's first child div
  const titleContent = titleRow.firstElementChild.firstElementChild;
  if (titleContent) {
    moveInstrumentation(titleRow, titleContent);
    titleDiv.append(titleContent.textContent);
  }
  section.append(titleDiv);

  // Container for body and button
  const introContainer = document.createElement('div');
  introContainer.classList.add('intro-container');

  // Body
  const bodyContentWrapper = bodyRow.querySelector('div'); // This is the div containing the richtext
  if (bodyContentWrapper) {
    moveInstrumentation(bodyRow, bodyContentWrapper);
    // The original HTML has multiple <p> tags inside .intro-container,
    // and the body field is richtext, so it can contain multiple paragraphs.
    // Append all children of the body cell's inner div directly to introContainer.
    while (bodyContentWrapper.firstElementChild) {
      introContainer.append(bodyContentWrapper.firstElementChild);
    }
  }

  // Button
  const buttonLink = buttonLinkRow.querySelector('a');
  const buttonLabel = buttonLabelRow.querySelector('div');

  if (buttonLink && buttonLabel) {
    const ul = document.createElement('ul');
    ul.classList.add('intro-actions');

    const li = document.createElement('li');
    const a = document.createElement('a');
    a.classList.add('intro-button', 'intro-style3', 'intro-large');
    a.href = buttonLink.href;
    moveInstrumentation(buttonLinkRow, a);
    moveInstrumentation(buttonLabelRow, a);
    a.textContent = buttonLabel.textContent;
    li.append(a);
    ul.append(li);
    introContainer.append(ul);
  }

  section.append(introContainer);

  block.textContent = '';
  block.append(section);

  // Image optimization (not applicable for this block as there are no images)
  // This part is kept as is, even if not applicable, as it's a standard utility.
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
