import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Destructure block.children directly based on the BlockJson model
  const [captionRow, videoPosterRow, videoSourceRow] = [...block.children];

  // Create the main content wrapper
  const contentWrapper = document.createElement('div');
  contentWrapper.classList.add('text-align-center'); // Class from ORIGINAL HTML
  contentWrapper.id = 'front-web-banner-content-wrapper'; // ID from ORIGINAL HTML
  moveInstrumentation(captionRow, contentWrapper);

  // Create caption container
  const captionContainer = document.createElement('div');
  captionContainer.id = 'front-web-banner-content-caption'; // ID from ORIGINAL HTML
  if (captionRow) {
    // Access the first child of the captionRow, which is the cell containing the richtext
    const captionCell = captionRow.firstElementChild;
    if (captionCell) {
      moveInstrumentation(captionCell, captionContainer);
      // Move all children from the captionCell to the captionContainer
      while (captionCell.firstChild) {
        captionContainer.append(captionCell.firstChild);
      }
    }
  }
  contentWrapper.append(captionContainer);

  // Create video element
  const video = document.createElement('video');
  video.autoplay = true;
  video.loop = true;
  video.muted = true;
  video.preload = 'metadata';

  // Set video poster
  if (videoPosterRow) {
    // The videoPosterRow contains a single cell with a picture element
    const posterCell = videoPosterRow.firstElementChild;
    const posterPicture = posterCell ? posterCell.querySelector('picture') : null;
    if (posterPicture) {
      const posterImg = posterPicture.querySelector('img');
      if (posterImg) {
        video.poster = posterImg.src;
        // The poster image is not displayed as a separate element,
        // so we don't need to move instrumentation for it.
      }
    }
  }

  // Set video source
  if (videoSourceRow) {
    // The videoSourceRow contains a single cell with a picture element
    const sourceCell = videoSourceRow.firstElementChild;
    const sourcePicture = sourceCell ? sourceCell.querySelector('picture') : null;
    if (sourcePicture) {
      const sourceImg = sourcePicture.querySelector('img');
      if (sourceImg && sourceImg.src) {
        const source = document.createElement('source');
        source.src = sourceImg.src;
        // Determine type based on extension
        if (sourceImg.src.endsWith('.mp4')) {
          source.type = 'video/mp4';
        } else if (sourceImg.src.endsWith('.webm')) {
          source.type = 'video/webm';
        } else if (sourceImg.src.endsWith('.ogg')) {
          source.type = 'video/ogg';
        }
        video.append(source);
        moveInstrumentation(videoSourceRow, video);
      }
    }
  }

  block.textContent = ''; // Clear the block content
  block.append(contentWrapper, video);

  // Optimize any images that might be in the caption
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
