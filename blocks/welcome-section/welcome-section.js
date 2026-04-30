import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [dotRightImageRow, dotLeftImageRow, headlineRow, descriptionRow] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('hm-welcome'); // This is the block's root element, it already has the class from AEM.

  // Dot Right Image
  const dotRightDiv = document.createElement('div');
  dotRightDiv.classList.add('dot-right');
  const dotRightPicture = dotRightImageRow.querySelector('picture');
  if (dotRightPicture) {
    const img = dotRightPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '267' }]);
    moveInstrumentation(dotRightImageRow, optimizedPic.querySelector('img'));
    dotRightDiv.append(optimizedPic);
  }
  section.append(dotRightDiv);

  // Dot Left Image
  const dotLeftDiv = document.createElement('div');
  dotLeftDiv.classList.add('dot-left');
  const dotLeftPicture = dotLeftImageRow.querySelector('picture');
  if (dotLeftPicture) {
    const img = dotLeftPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '267' }]);
    moveInstrumentation(dotLeftImageRow, optimizedPic.querySelector('img'));
    dotLeftDiv.append(optimizedPic);
  }
  section.append(dotLeftDiv);

  // Content container
  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container-1600-wrp', 'intro-para', 'wow', 'animate__', 'animate__fadeInUp', 'animated');

  const welcomeConDiv = document.createElement('div');
  welcomeConDiv.classList.add('hm-welcome-con');

  // Headline
  const headline = document.createElement('h2');
  headline.classList.add('common-ttle');
  moveInstrumentation(headlineRow, headline);
  headline.textContent = headlineRow.textContent.trim();
  welcomeConDiv.append(headline);

  // Description
  const description = document.createElement('p');
  moveInstrumentation(descriptionRow, description);
  // Richtext cell content is already wrapped in <p> or other tags, so extract innerHTML
  // The descriptionRow itself contains the cell wrapper div, so we need to get the innerHTML of its first child.
  // The original code was descriptionRow.children[0]?.innerHTML which is correct for a cell.
  // However, the BlockJson model indicates "description" is a richtext field at block.children[3].
  // The EDS BLOCK STRUCTURE shows:
  // <!-- block.children[3]: field="description" label="Description" type=richtext — read: cell.innerHTML -->
  // <div>
  //   <div><p>Description text content</p></div>
  // </div>
  // This means descriptionRow is the outer <div>, and descriptionRow.children[0] is the inner <div> containing the <p>.
  // So, descriptionRow.children[0].innerHTML correctly extracts "<p>Description text content</p>".
  // The previous fix was incorrect. Reverting to the original correct access.
  description.innerHTML = descriptionRow.children[0]?.innerHTML || '';
  welcomeConDiv.append(description);

  containerDiv.append(welcomeConDiv);
  section.append(containerDiv);

  block.replaceChildren(section);
}
