import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Use destructuring for direct access to the first two children,
  // which correspond to the heading and video URL based on the EDS block structure.
  const [headingRow, videoUrlRow] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('tv-sec', 'd-none');
  moveInstrumentation(block, section);

  const container = document.createElement('div');
  container.classList.add('container');

  const row = document.createElement('div');
  row.classList.add('row');

  const col = document.createElement('div');
  col.classList.add('col-md-12');

  // Heading
  // The heading content is directly within the first div of headingRow.
  const h2 = document.createElement('h2');
  // Ensure we get the actual content from the inner div, not the row itself.
  const headingContentCell = headingRow.querySelector('div');
  if (headingContentCell) {
    moveInstrumentation(headingContentCell, h2);
    while (headingContentCell.firstChild) h2.append(headingContentCell.firstChild);
  }
  col.append(h2);

  // Video Embed
  // The video link is within the first div of videoUrlRow.
  const videoLinkCell = videoUrlRow.querySelector('div');
  const videoLink = videoLinkCell ? videoLinkCell.querySelector('a') : null;

  if (videoLink && videoLink.href) {
    const iframe = document.createElement('iframe');
    iframe.setAttribute('src', videoLink.href);
    iframe.setAttribute('width', '100%');
    iframe.setAttribute('height', '500');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
    moveInstrumentation(videoLinkCell, iframe); // Instrument the cell that contained the link
    col.append(iframe);
  }

  row.append(col);
  container.append(row);
  section.append(container);

  block.textContent = '';
  block.append(section);
}
