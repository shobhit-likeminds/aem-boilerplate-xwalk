import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, videoRow, videoPosterRow] = [...block.children];

  // Create the main wrapper div
  const frontWebBannerDiv = document.createElement('div');
  frontWebBannerDiv.id = 'front-web-banner';

  // Create content wrapper and caption
  const contentWrapper = document.createElement('div');
  contentWrapper.classList.add('text-align-center'); // Class from ORIGINAL HTML
  contentWrapper.id = 'front-web-banner-content-wrapper';

  const captionDiv = document.createElement('div');
  captionDiv.id = 'front-web-banner-content-caption';

  const headingElement = document.createElement('div');
  headingElement.id = 'front-web-banner-content';
  if (headingRow) {
    const headingCell = headingRow.firstElementChild; // This is fine as it's the only cell
    if (headingCell) {
      moveInstrumentation(headingCell, headingElement);
      headingElement.innerHTML = headingCell.innerHTML;
    }
  }

  captionDiv.append(headingElement);
  contentWrapper.append(captionDiv);
  frontWebBannerDiv.append(contentWrapper);

  // Create video element
  const videoElement = document.createElement('video');
  videoElement.autoplay = true;
  videoElement.loop = true;
  videoElement.muted = true;
  videoElement.preload = 'metadata';

  if (videoRow) {
    // The model specifies 'video' as type=reference, which implies a picture/img,
    // but the original HTML shows a <source src="..."> inside a <video> tag.
    // The generated JS correctly looks for an 'a' tag, which is a common way to reference videos in AEM.
    // Let's assume the 'a' tag is the correct source as per the model's intent for a reference.
    const videoLink = videoRow.querySelector('a'); // Correctly find the 'a' tag within the row
    if (videoLink && /\.(mp4|webm|ogg|mov)$/i.test(videoLink.href)) {
      videoElement.src = videoLink.href;
      moveInstrumentation(videoLink, videoElement); // Instrument the link, not the cell
    }
  }

  // Set video poster
  if (videoPosterRow) {
    const videoPosterPicture = videoPosterRow.querySelector('picture'); // Correctly find the picture element
    const videoPosterImg = videoPosterPicture?.querySelector('img');
    if (videoPosterImg) {
      videoElement.poster = videoPosterImg.src;
      // Optimize poster image
      const optimizedPic = createOptimizedPicture(videoPosterImg.src, videoPosterImg.alt, false, [{ width: '750' }]);
      moveInstrumentation(videoPosterImg, optimizedPic.querySelector('img'));
      // Replace the original picture element with the optimized one
      videoPosterPicture.replaceWith(optimizedPic);
    }
  }

  frontWebBannerDiv.append(videoElement);

  // Replace the block content
  block.textContent = '';
  block.append(frontWebBannerDiv);
}
