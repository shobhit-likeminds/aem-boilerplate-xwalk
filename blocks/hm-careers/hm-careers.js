import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Use content detection for rows, as array destructuring is prone to errors if content order changes.
  // The BlockJson defines 5 fields, so we expect 5 rows.
  const rows = [...block.children];

  block.classList.add('hm-careers');

  const hmCareersCon = document.createElement('div');
  hmCareersCon.classList.add('hm-careers-con');

  // Image
  // Find the row containing a picture element
  const imageRow = rows.find((row) => row.querySelector('picture'));
  if (imageRow) {
    const figure = document.createElement('figure');
    const imageCell = imageRow.firstElementChild;
    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '1920' }]);
        optimizedPic.querySelector('img').classList.add('bg-cover');
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        figure.append(optimizedPic);
      }
    }
    moveInstrumentation(imageRow, figure);
    hmCareersCon.append(figure);
  }

  // Section Details
  const sectDet = document.createElement('div');
  sectDet.classList.add('sect-det');

  // Sub Title
  // Find the row that contains plain text and is not a heading or a CTA link
  const subTitleRow = rows.find((row) => {
    const cell = row.firstElementChild;
    return cell && cell.textContent.trim() && !cell.querySelector('h1, h2, h3, h4, h5, h6, a, picture');
  });
  if (subTitleRow) {
    const subTtle = document.createElement('div');
    subTtle.classList.add('sub-ttle', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
    subTtle.textContent = subTitleRow.firstElementChild?.textContent.trim() || '';
    moveInstrumentation(subTitleRow, subTtle);
    sectDet.append(subTtle);
  }

  // Heading
  // Find the row that contains a heading (or text that should be a heading)
  const headingRow = rows.find((row) => {
    const cell = row.firstElementChild;
    return cell && cell.innerHTML.includes('<br>') && !cell.querySelector('picture, a'); // Heuristic for heading with <br>
  });
  if (headingRow) {
    const heading = document.createElement('h2');
    heading.classList.add('common-ttle', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
    heading.innerHTML = headingRow.firstElementChild?.innerHTML || ''; // Use innerHTML for potential <br>
    moveInstrumentation(headingRow, heading);
    sectDet.append(heading);
  }

  // CTA Link and CTA Link Label
  // Find the row that contains an anchor tag for the CTA link
  const ctaLinkRow = rows.find((row) => row.firstElementChild?.querySelector('a'));
  // Find the row that contains the CTA Link Label (plain text, not a link itself)
  const ctaLinkLabelRow = rows.find((row) => {
    const cell = row.firstElementChild;
    return cell && cell.textContent.trim() && !cell.querySelector('a, picture') && row !== subTitleRow && row !== headingRow;
  });

  if (ctaLinkRow && ctaLinkLabelRow) {
    const ctaLink = document.createElement('a');
    ctaLink.classList.add('btn-box', 'wow', 'animate__', 'animate__fadeInUp', 'animated');

    const foundCtaLink = ctaLinkRow.firstElementChild?.querySelector('a');
    if (foundCtaLink) {
      ctaLink.href = foundCtaLink.href; // Read href from the <a> tag
    }
    ctaLink.textContent = ctaLinkLabelRow.firstElementChild?.textContent.trim() || ''; // Read text from the label row
    moveInstrumentation(ctaLinkRow, ctaLink);
    moveInstrumentation(ctaLinkLabelRow, ctaLink);
    sectDet.append(ctaLink);
  }

  hmCareersCon.append(sectDet);

  block.textContent = '';
  block.append(hmCareersCon);
}
