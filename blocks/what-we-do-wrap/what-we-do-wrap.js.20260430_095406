import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const children = [...block.children];
  const [headingRow, descriptionRow, ...verticalRows] = children;

  const section = document.createElement('section');
  section.classList.add('section', 'what-we-do-wrap');
  moveInstrumentation(block, section);

  const container = document.createElement('div');
  container.classList.add('container');
  section.append(container);

  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center');
  container.append(sectionHeader);

  // Section Heading
  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
  moveInstrumentation(headingRow, heading);
  heading.textContent = headingRow.textContent.trim();
  sectionHeader.append(heading);

  // Section Description
  const description = document.createElement('p');
  description.classList.add('aos-init', 'aos-animate');
  moveInstrumentation(descriptionRow, description);
  description.innerHTML = descriptionRow.innerHTML;
  sectionHeader.append(description);

  // Our Business Verticals
  const ourBusinessVerticals = document.createElement('div');
  ourBusinessVerticals.classList.add('our-business-verticals');
  section.append(ourBusinessVerticals);

  // Desktop View
  const desktopContainer = document.createElement('div');
  desktopContainer.classList.add('container', 'd-lg-block', 'd-none');
  ourBusinessVerticals.append(desktopContainer);

  const desktopRow = document.createElement('div');
  desktopRow.classList.add('row', 'row-cols-lg-3', 'row-cols-1', 'g-3');
  desktopContainer.append(desktopRow);

  // Mobile View
  const mobileContainer = document.createElement('div');
  mobileContainer.classList.add('container', 'd-lg-none', 'd-block', 'aos-init', 'aos-animate');
  ourBusinessVerticals.append(mobileContainer);

  const mobileSlider = document.createElement('div');
  mobileSlider.classList.add('mobile-slider');
  mobileSlider.setAttribute('data-flickity', '{ "wrapAround": false, "lazyLoad": true, "pageDots": true, "prevNextButtons": false, "imagesLoaded": true, "cellAlign": "left", "adaptiveHeight": true }');
  mobileContainer.append(mobileSlider);

  let currentMobileSlide = document.createElement('div');
  currentMobileSlide.classList.add('slides');
  let mobileInnerRow = document.createElement('div');
  mobileInnerRow.classList.add('row', 'row-cols-1', 'gy-3');
  currentMobileSlide.append(mobileInnerRow);

  verticalRows.forEach((row, index) => {
    const [imageDesktopCell, imageTabletCell, imageMobileCell, titleCell, arrowIconCell, linkCell] = [...row.children];

    // Create item for desktop view
    const colDesktop = document.createElement('div');
    colDesktop.classList.add('col', 'aos-init', 'aos-animate');
    colDesktop.setAttribute('data-aos', 'fade-up');
    colDesktop.setAttribute('data-aos-delay', `${(index % 3) * 300 + 100}`); // Stagger delays
    desktopRow.append(colDesktop);

    const wrapDesktop = document.createElement('div');
    wrapDesktop.classList.add('wrap');
    colDesktop.append(wrapDesktop);

    const imageDesktopDiv = document.createElement('div');
    imageDesktopDiv.classList.add('image');
    wrapDesktop.append(imageDesktopDiv);

    const desktopPicture = imageDesktopCell.querySelector('picture');
    if (desktopPicture) {
      const optimizedPic = createOptimizedPicture(
        desktopPicture.querySelector('img').src,
        desktopPicture.querySelector('img').alt,
        false,
        [{ media: '(min-width: 992px)', width: '376' }, { media: '(min-width: 450px)', width: '376' }, { width: '376' }],
      );
      moveInstrumentation(desktopPicture.querySelector('img'), optimizedPic.querySelector('img'));
      imageDesktopDiv.append(optimizedPic);
    }

    const titleDesktopDiv = document.createElement('div');
    titleDesktopDiv.classList.add('title');
    titleDesktopDiv.textContent = titleCell.textContent.trim();
    wrapDesktop.append(titleDesktopDiv);

    const arrowIcon = arrowIconCell.querySelector('picture');
    if (arrowIcon) {
      const optimizedArrow = createOptimizedPicture(
        arrowIcon.querySelector('img').src,
        arrowIcon.querySelector('img').alt,
        false,
        [{ width: '10' }],
      );
      moveInstrumentation(arrowIcon.querySelector('img'), optimizedArrow.querySelector('img'));
      titleDesktopDiv.append(optimizedArrow);
    }

    const linkDesktop = document.createElement('a');
    linkDesktop.classList.add('stretched-link');
    const foundLinkDesktop = linkCell.querySelector('a');
    if (foundLinkDesktop) {
      linkDesktop.href = foundLinkDesktop.href;
      linkDesktop.setAttribute('aria-label', `Learn more about ${titleCell.textContent.trim()}`);
    }
    moveInstrumentation(row, linkDesktop); // Move instrumentation from the entire row to the link
    wrapDesktop.append(linkDesktop);

    // Create item for mobile view
    if (mobileInnerRow.children.length === 3) {
      mobileSlider.append(currentMobileSlide); // Append the completed slide to the slider
      currentMobileSlide = document.createElement('div');
      currentMobileSlide.classList.add('slides');
      mobileInnerRow = document.createElement('div'); // Re-declare mobileInnerRow for the new slide
      mobileInnerRow.classList.add('row', 'row-cols-1', 'gy-3');
      currentMobileSlide.append(mobileInnerRow);
    }

    const colMobile = document.createElement('div');
    colMobile.classList.add('col');
    mobileInnerRow.append(colMobile);

    const wrapMobile = document.createElement('div');
    wrapMobile.classList.add('wrap');
    colMobile.append(wrapMobile);

    const imageMobileDiv = document.createElement('div');
    imageMobileDiv.classList.add('image');
    wrapMobile.append(imageMobileDiv);

    const mobilePicture = imageMobileCell.querySelector('picture');
    if (mobilePicture) {
      const optimizedPic = createOptimizedPicture(
        mobilePicture.querySelector('img').src,
        mobilePicture.querySelector('img').alt,
        false,
        [{ media: '(min-width: 992px)', width: '376' }, { media: '(min-width: 450px)', width: '376' }, { width: '376' }],
      );
      // No instrumentation move here, as it's already moved to the desktop link
      imageMobileDiv.append(optimizedPic);
    }

    const titleMobileDiv = document.createElement('div');
    titleMobileDiv.classList.add('title');
    titleMobileDiv.textContent = titleCell.textContent.trim();
    wrapMobile.append(titleMobileDiv);

    if (arrowIcon) {
      const optimizedArrow = createOptimizedPicture(
        arrowIcon.querySelector('img').src,
        arrowIcon.querySelector('img').alt,
        false,
        [{ width: '10' }],
      );
      titleMobileDiv.append(optimizedArrow);
    }

    const linkMobile = document.createElement('a');
    linkMobile.classList.add('stretched-link');
    const foundLinkMobile = linkCell.querySelector('a');
    if (foundLinkMobile) {
      linkMobile.href = foundLinkMobile.href;
      linkMobile.setAttribute('aria-label', `Learn more about ${titleCell.textContent.trim()}`);
    }
    wrapMobile.append(linkMobile);
  });

  // Append the last mobile slide if it has content
  if (mobileInnerRow.children.length > 0) {
    mobileSlider.append(currentMobileSlide);
  }

  block.replaceChildren(section);

  // Load Flickity for mobile slider
  await loadCSS('https://unpkg.com/flickity@2/dist/flickity.min.css');
  await loadScript('https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js');

  // eslint-disable-next-line no-undef
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
