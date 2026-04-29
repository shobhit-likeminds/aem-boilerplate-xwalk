import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const [headingRow, descriptionRow, ...businessVerticalRows] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('section', 'what-we-do-wrap');
  moveInstrumentation(block, section);

  const container = document.createElement('div');
  container.classList.add('container');
  section.append(container);

  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center');
  container.append(sectionHeader);

  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
  moveInstrumentation(headingRow, heading);
  heading.textContent = headingRow.textContent.trim();
  sectionHeader.append(heading);

  const description = document.createElement('p');
  description.classList.add('aos-init', 'aos-animate');
  moveInstrumentation(descriptionRow, description);
  description.innerHTML = descriptionRow.innerHTML;
  sectionHeader.append(description);

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

  // Mobile view (slider)
  const mobileContainer = document.createElement('div');
  mobileContainer.classList.add('container', 'd-lg-none', 'd-block', 'aos-init', 'aos-animate');
  ourBusinessVerticals.append(mobileContainer);

  const mobileSlider = document.createElement('div');
  mobileSlider.classList.add('mobile-slider'); // Flickity adds flickity-enabled and is-draggable
  mobileContainer.append(mobileSlider);

  const flickityViewport = document.createElement('div');
  flickityViewport.classList.add('flickity-viewport');
  mobileSlider.append(flickityViewport);

  const flickitySlider = document.createElement('div');
  flickitySlider.classList.add('flickity-slider');
  flickityViewport.append(flickitySlider);

  const mobileSlides = [];
  let currentMobileSlideRowContainer; // Declare outside loop to manage scope
  let currentSlideIndex = 0;

  businessVerticalRows.forEach((row, index) => {
    const [desktopImageCell, mobileImageCell, titleCell, arrowIconCell, linkCell] = [...row.children];

    // Desktop item
    const colDesktop = document.createElement('div');
    colDesktop.classList.add('col', 'aos-init', 'aos-animate');
    desktopRow.append(colDesktop);

    const wrapDesktop = document.createElement('div');
    wrapDesktop.classList.add('wrap');
    colDesktop.append(wrapDesktop);

    const imageDesktop = document.createElement('div');
    imageDesktop.classList.add('image');
    wrapDesktop.append(imageDesktop);

    const desktopPicture = desktopImageCell.querySelector('picture');
    if (desktopPicture) {
      const optimizedPic = createOptimizedPicture(
        desktopPicture.querySelector('img').src,
        desktopPicture.querySelector('img').alt,
        false,
        [{ media: '(min-width: 992px)', width: '376' }, { media: '(min-width: 450px)', width: '376' }, { width: '376' }],
      );
      moveInstrumentation(desktopPicture, optimizedPic.querySelector('img'));
      imageDesktop.append(optimizedPic);
    }

    const titleDesktop = document.createElement('div');
    titleDesktop.classList.add('title');
    titleDesktop.textContent = titleCell.textContent.trim();
    wrapDesktop.append(titleDesktop);

    const arrowIconDesktop = arrowIconCell.querySelector('picture');
    if (arrowIconDesktop) {
      const optimizedArrow = createOptimizedPicture(
        arrowIconDesktop.querySelector('img').src,
        arrowIconDesktop.querySelector('img').alt,
        false,
        [{ width: '10' }],
      );
      moveInstrumentation(arrowIconDesktop, optimizedArrow.querySelector('img'));
      titleDesktop.append(optimizedArrow);
    }

    const linkDesktop = document.createElement('a');
    linkDesktop.classList.add('stretched-link');
    moveInstrumentation(linkCell, linkDesktop);
    linkDesktop.href = linkCell.querySelector('a')?.href || '#';
    linkDesktop.setAttribute('aria-label', `Learn more about ${titleCell.textContent.trim()}`);
    wrapDesktop.append(linkDesktop);

    // Mobile item (for slider)
    if (index % 3 === 0) {
      const newSlide = document.createElement('div');
      newSlide.classList.add('slides');
      currentMobileSlideRowContainer = document.createElement('div');
      currentMobileSlideRowContainer.classList.add('row', 'row-cols-1', 'gy-3');
      newSlide.append(currentMobileSlideRowContainer);
      mobileSlides.push(newSlide);
    }

    const colMobile = document.createElement('div');
    colMobile.classList.add('col');
    currentMobileSlideRowContainer.append(colMobile);

    const wrapMobile = document.createElement('div');
    wrapMobile.classList.add('wrap');
    colMobile.append(wrapMobile);

    const imageMobile = document.createElement('div');
    imageMobile.classList.add('image');
    wrapMobile.append(imageMobile);

    const mobilePicture = mobileImageCell.querySelector('picture');
    if (mobilePicture) {
      const optimizedPic = createOptimizedPicture(
        mobilePicture.querySelector('img').src,
        mobilePicture.querySelector('img').alt,
        false,
        [{ media: '(min-width: 992px)', width: '376' }, { media: '(min-width: 450px)', width: '376' }, { width: '376' }],
      );
      moveInstrumentation(mobilePicture, optimizedPic.querySelector('img'));
      imageMobile.append(optimizedPic);
    }

    const titleMobile = document.createElement('div');
    titleMobile.classList.add('title');
    titleMobile.textContent = titleCell.textContent.trim();
    wrapMobile.append(titleMobile);

    const arrowIconMobile = arrowIconCell.querySelector('picture');
    if (arrowIconMobile) {
      const optimizedArrow = createOptimizedPicture(
        arrowIconMobile.querySelector('img').src,
        arrowIconMobile.querySelector('img').alt,
        false,
        [{ width: '10' }],
      );
      moveInstrumentation(arrowIconMobile, optimizedArrow.querySelector('img'));
      titleMobile.append(optimizedArrow);
    }

    const linkMobile = document.createElement('a');
    linkMobile.classList.add('stretched-link');
    // Instrumentation already moved for desktop link, so just copy href
    linkMobile.href = linkCell.querySelector('a')?.href || '#';
    linkMobile.setAttribute('aria-label', `Learn more about ${titleCell.textContent.trim()}`);
    wrapMobile.append(linkMobile);
  });

  mobileSlides.forEach((slide) => flickitySlider.append(slide));

  // Load Flickity and initialize
  await loadCSS('https://unpkg.com/flickity@2/dist/flickity.min.css');
  await loadScript('https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js');

  // eslint-disable-next-line no-undef
  if (typeof Flickity !== 'undefined') {
    // eslint-disable-next-line no-new, no-undef
    new Flickity(mobileSlider, {
      wrapAround: false,
      lazyLoad: true,
      pageDots: true,
      prevNextButtons: false,
      imagesLoaded: true,
      cellAlign: 'left',
      adaptiveHeight: true,
    });
  }

  block.replaceChildren(section);
}
