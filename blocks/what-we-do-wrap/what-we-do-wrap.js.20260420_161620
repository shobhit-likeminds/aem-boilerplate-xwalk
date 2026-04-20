import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rows = [...block.children];

  const section = document.createElement('section');
  section.classList.add('section', 'what-we-do-wrap');
  moveInstrumentation(block, section);

  const container = document.createElement('div');
  container.classList.add('container');
  section.append(container);

  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center');
  container.append(sectionHeader);

  const headingRow = rows.shift();
  if (headingRow) {
    const headingCell = headingRow.querySelector('div');
    const heading = document.createElement('h2');
    heading.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
    heading.setAttribute('data-aos', 'fade-up');
    heading.setAttribute('data-aos-offset', '100');
    heading.setAttribute('data-aos-duration', '650');
    heading.setAttribute('data-aos-easing', 'ease-in-out');
    moveInstrumentation(headingRow, heading);
    heading.textContent = headingCell?.textContent.trim() || '';
    sectionHeader.append(heading);
  }

  const descriptionRow = rows.shift();
  if (descriptionRow) {
    const descriptionCell = descriptionRow.querySelector('div');
    const description = document.createElement('p');
    description.classList.add('aos-init', 'aos-animate');
    description.setAttribute('data-aos', 'fade-up');
    description.setAttribute('data-aos-offset', '100');
    description.setAttribute('data-aos-duration', '650');
    description.setAttribute('data-aos-easing', 'ease-in-out');
    moveInstrumentation(descriptionRow, description);
    description.textContent = descriptionCell?.textContent.trim() || '';
    sectionHeader.append(description);
  }

  const ourBusinessVerticals = document.createElement('div');
  ourBusinessVerticals.classList.add('our-business-verticals');
  section.append(ourBusinessVerticals);

  // Desktop view
  const desktopContainer = document.createElement('div');
  desktopContainer.classList.add('container', 'd-lg-block', 'd-none');
  ourBusinessVerticals.append(desktopContainer);

  const desktopRow = document.createElement('div');
  desktopRow.classList.add('row', 'row-cols-lg-3', 'row-cols-1', 'g-3');
  desktopContainer.append(desktopRow);

  // Mobile view
  const mobileContainer = document.createElement('div');
  mobileContainer.classList.add('container', 'd-lg-none', 'd-block', 'aos-init', 'aos-animate');
  mobileContainer.setAttribute('data-aos', 'fade-up');
  mobileContainer.setAttribute('data-aos-offset', '100');
  mobileContainer.setAttribute('data-aos-duration', '650');
  mobileContainer.setAttribute('data-aos-easing', 'ease-in-out');
  ourBusinessVerticals.append(mobileContainer);

  const mobileSlider = document.createElement('div');
  mobileSlider.classList.add('mobile-slider');
  mobileSlider.setAttribute('data-flickity', '{ "wrapAround": false, "lazyLoad": true, "pageDots": true, "prevNextButtons": false, "imagesLoaded": true, "cellAlign": "left", "adaptiveHeight": true }');
  mobileContainer.append(mobileSlider);

  const mobileSlides = [];
  const itemsPerSlide = 3;
  let currentSlide;

  rows.forEach((row, i) => {
    const cells = [...row.children];
    if (cells.length !== 6) return; // Ensure it's a business-vertical-item

    // CRITICAL FIX: Replaced index access with destructuring for item rows
    const [imageCell, imageAltCell, imageTitleCell, labelCell, iconCell, linkCell] = cells;

    // Desktop item
    const colDesktop = document.createElement('div');
    colDesktop.classList.add('col', 'aos-init', 'aos-animate');
    colDesktop.setAttribute('data-aos', 'fade-up');
    colDesktop.setAttribute('data-aos-delay', `${(i % 3) * 300 + 100}`); // Stagger delay
    desktopRow.append(colDesktop);

    const wrapDesktop = document.createElement('div');
    wrapDesktop.classList.add('wrap');
    colDesktop.append(wrapDesktop);

    const imageDivDesktop = document.createElement('div');
    imageDivDesktop.classList.add('image');
    wrapDesktop.append(imageDivDesktop);

    const pictureDesktop = imageCell.querySelector('picture');
    if (pictureDesktop) {
      const img = pictureDesktop.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, imageAltCell?.textContent.trim() || img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      imageDivDesktop.append(optimizedPic);
    }

    const titleDivDesktop = document.createElement('div');
    titleDivDesktop.classList.add('title');
    titleDivDesktop.textContent = labelCell?.textContent.trim() || '';
    wrapDesktop.append(titleDivDesktop);

    const iconPictureDesktop = iconCell.querySelector('picture');
    if (iconPictureDesktop) {
      const iconImg = iconPictureDesktop.querySelector('img');
      const iconOptimizedPic = createOptimizedPicture(iconImg.src, iconImg.alt, false, [{ width: '10' }]);
      moveInstrumentation(iconImg, iconOptimizedPic.querySelector('img'));
      titleDivDesktop.append(iconOptimizedPic);
    }

    const linkDesktop = document.createElement('a');
    linkDesktop.classList.add('stretched-link');
    const foundLinkDesktop = linkCell.querySelector('a');
    if (foundLinkDesktop) {
      linkDesktop.href = foundLinkDesktop.href;
      linkDesktop.setAttribute('aria-label', `Learn more about ${labelCell?.textContent.trim() || ''}`);
    }
    moveInstrumentation(row, linkDesktop);
    wrapDesktop.append(linkDesktop);

    // Mobile item
    if (i % itemsPerSlide === 0) {
      currentSlide = document.createElement('div');
      currentSlide.classList.add('slides');
      if (i === 0) currentSlide.classList.add('is-selected');
      const slideRow = document.createElement('div');
      slideRow.classList.add('row', 'row-cols-1', 'gy-3');
      currentSlide.append(slideRow);
      mobileSlides.push(currentSlide);
    }

    const colMobile = document.createElement('div');
    colMobile.classList.add('col');
    currentSlide.querySelector('.row').append(colMobile);

    const wrapMobile = document.createElement('div');
    wrapMobile.classList.add('wrap');
    colMobile.append(wrapMobile);

    const imageDivMobile = document.createElement('div');
    imageDivMobile.classList.add('image');
    wrapMobile.append(imageDivMobile);

    const pictureMobile = imageCell.querySelector('picture');
    if (pictureMobile) {
      const img = pictureMobile.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, imageAltCell?.textContent.trim() || img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      imageDivMobile.append(optimizedPic);
    }

    const titleDivMobile = document.createElement('div');
    titleDivMobile.classList.add('title');
    titleDivMobile.textContent = labelCell?.textContent.trim() || '';
    wrapMobile.append(titleDivMobile);

    const iconPictureMobile = iconCell.querySelector('picture');
    if (iconPictureMobile) {
      const iconImg = iconPictureMobile.querySelector('img');
      const iconOptimizedPic = createOptimizedPicture(iconImg.src, iconImg.alt, false, [{ width: '10' }]);
      moveInstrumentation(iconImg, iconOptimizedPic.querySelector('img'));
      titleDivMobile.append(iconOptimizedPic);
    }

    const linkMobile = document.createElement('a');
    linkMobile.classList.add('stretched-link');
    const foundLinkMobile = linkCell.querySelector('a');
    if (foundLinkMobile) {
      linkMobile.href = foundLinkMobile.href;
      linkMobile.setAttribute('aria-label', `Learn more about ${labelCell?.textContent.trim() || ''}`);
    }
    wrapMobile.append(linkMobile);
  });

  mobileSlides.forEach((slide) => mobileSlider.append(slide));

  block.replaceWith(section);
}
