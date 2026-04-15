import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow] = [...block.children];
  const [headingCell] = [...headingRow.children]; // Destructuring for heading cell

  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row');
  moveInstrumentation(block, rowDiv);

  const colMd5Div = document.createElement('div');
  colMd5Div.classList.add('col-md-5');
  colMd5Div.id = 'main-text';

  const headingText = headingCell?.textContent.trim() || ''; // Use headingCell

  const h2BgTextTrans = document.createElement('h2');
  h2BgTextTrans.classList.add('bg_text_trans');
  h2BgTextTrans.setAttribute('aria-label', headingText);
  h2BgTextTrans.textContent = headingText;
  moveInstrumentation(headingRow, h2BgTextTrans);

  const h2BgTextTransMob = document.createElement('h2');
  h2BgTextTransMob.classList.add('bg_text_trans_mob');
  h2BgTextTransMob.setAttribute('aria-label', headingText);
  h2BgTextTransMob.textContent = headingText;

  colMd5Div.append(h2BgTextTrans, h2BgTextTransMob);

  const colMd7Div = document.createElement('div');
  colMd7Div.classList.add('col-md-7');
  colMd7Div.id = 'main-div';

  const socialFeedCarouselDiv = document.createElement('div');
  socialFeedCarouselDiv.classList.add('social_feed_carousel', 'xyz');

  const socialFeedRegularSection = document.createElement('section');
  socialFeedRegularSection.classList.add('social_feed_regular', 'slider');

  socialFeedCarouselDiv.append(socialFeedRegularSection);
  colMd7Div.append(socialFeedCarouselDiv);

  rowDiv.append(colMd5Div, colMd7Div);

  block.textContent = '';
  block.append(rowDiv);
}
