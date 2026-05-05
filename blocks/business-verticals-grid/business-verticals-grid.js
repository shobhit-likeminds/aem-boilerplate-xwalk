import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  const section = document.createElement('section');
  // section.classList.add('section', 'what-we-do-wrap'); // Removed 'what-we-do-wrap' as the outer block div already has it
  section.classList.add('section'); // Keep 'section' if it's a generic wrapper class

  const container = document.createElement('div');
  container.classList.add('container');
  section.append(container);

  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center');
  container.append(sectionHeader);

  // Heading and Description rows are the first two rows
  const [headingRow, descriptionRow, ...verticalItemRows] = children;

  // Heading
  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
  moveInstrumentation(headingRow, heading);
  heading.textContent = headingRow.children[0]?.textContent.trim() || '';
  sectionHeader.append(heading);

  // Description
  const description = document.createElement('p');
  description.classList.add('aos-init', 'aos-animate');
  moveInstrumentation(descriptionRow, description);
  description.textContent = descriptionRow.children[0]?.textContent.trim() || '';
  sectionHeader.append(description);

  const ourBusinessVerticals = document.createElement('div');
  ourBusinessVerticals.classList.add('our-business-verticals');
  section.append(ourBusinessVerticals);

  const businessContainer = document.createElement('div');
  businessContainer.classList.add('container', 'd-lg-block', 'd-none');
  ourBusinessVerticals.append(businessContainer);

  const row = document.createElement('div');
  row.classList.add('row', 'row-cols-lg-3', 'row-cols-1', 'g-3');
  businessContainer.append(row);

  verticalItemRows.forEach((verticalRow) => {
    const [
      imageDesktopCell,
      imageTabletCell,
      imageMobileCell,
      titleCell,
      arrowIconCell,
      linkCell,
    ] = [...verticalRow.children];

    const col = document.createElement('div');
    col.classList.add('col', 'aos-init', 'aos-animate');
    moveInstrumentation(verticalRow, col);

    const wrap = document.createElement('div');
    wrap.classList.add('wrap');
    col.append(wrap);

    const imageDiv = document.createElement('div');
    imageDiv.classList.add('image');
    wrap.append(imageDiv);

    // Optimized picture for desktop, tablet, and mobile
    const desktopPicture = imageDesktopCell.querySelector('picture');
    const tabletPicture = imageTabletCell.querySelector('picture');
    const mobilePicture = imageMobileCell.querySelector('picture');

    if (desktopPicture && tabletPicture && mobilePicture) {
      const imgDesktop = desktopPicture.querySelector('img');
      const imgTablet = tabletPicture.querySelector('img');
      const imgMobile = mobilePicture.querySelector('img');

      const picture = document.createElement('picture');

      const sourceDesktop = document.createElement('source');
      sourceDesktop.setAttribute('media', '(min-width: 992px)');
      sourceDesktop.setAttribute('srcset', imgDesktop.src);
      picture.append(sourceDesktop);

      const sourceTablet = document.createElement('source');
      sourceTablet.setAttribute('media', '(min-width: 450px)');
      sourceTablet.setAttribute('srcset', imgTablet.src);
      picture.append(sourceTablet);

      const img = document.createElement('img');
      img.classList.add('img-fluid');
      img.setAttribute('loading', 'lazy');
      img.src = imgMobile.src;
      img.alt = imgMobile.alt;
      picture.append(img);

      imageDiv.append(picture);
    } else if (desktopPicture) {
      // Fallback if not all three are present, use desktop if available
      const img = desktopPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      optimizedPic.querySelector('img').classList.add('img-fluid');
      imageDiv.append(optimizedPic);
    }

    const titleDiv = document.createElement('div');
    titleDiv.classList.add('title');
    titleDiv.textContent = titleCell?.textContent.trim() || '';
    wrap.append(titleDiv);

    const arrowIcon = arrowIconCell.querySelector('picture');
    if (arrowIcon) {
      const img = arrowIcon.querySelector('img');
      const arrowImg = document.createElement('img');
      arrowImg.setAttribute('loading', 'lazy');
      arrowImg.src = img.src;
      arrowImg.alt = img.alt;
      arrowImg.width = img.width;
      arrowImg.height = img.height;
      titleDiv.append(arrowImg);
    }

    const linkAnchor = document.createElement('a');
    linkAnchor.classList.add('stretched-link');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      linkAnchor.href = foundLink.href;
      linkAnchor.setAttribute('aria-label', `Learn more about ${titleCell?.textContent.trim() || ''}`);
    }
    wrap.append(linkAnchor);

    row.append(col);
  });

  block.replaceChildren(section);
}
