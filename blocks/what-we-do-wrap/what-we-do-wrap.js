import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const [headingRow, descriptionRow, ...businessVerticalRows] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('section', 'what-we-do-wrap');

  const container = document.createElement('div');
  container.classList.add('container');
  section.append(container);

  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center');
  container.append(sectionHeader);

  // Heading
  if (headingRow) {
    const heading = document.createElement('h2');
    heading.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
    moveInstrumentation(headingRow, heading);
    heading.textContent = headingRow.textContent.trim();
    sectionHeader.append(heading);
  }

  // Description
  if (descriptionRow) {
    const description = document.createElement('p');
    description.classList.add('aos-init', 'aos-animate');
    moveInstrumentation(descriptionRow, description);
    description.innerHTML = descriptionRow.innerHTML;
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
  ourBusinessVerticals.append(mobileContainer);

  const mobileSlider = document.createElement('div');
  mobileSlider.classList.add('mobile-slider'); // flickity-enabled and is-draggable are added by Flickity
  mobileSlider.setAttribute('data-flickity', '{ "wrapAround": false, "lazyLoad": true, "pageDots": true, "prevNextButtons": false, "imagesLoaded": true, "cellAlign": "left", "adaptiveHeight": true }');
  mobileContainer.append(mobileSlider);

  const flickityViewport = document.createElement('div');
  flickityViewport.classList.add('flickity-viewport');
  mobileSlider.append(flickityViewport);

  const flickitySlider = document.createElement('div');
  flickitySlider.classList.add('flickity-slider');
  flickityViewport.append(flickitySlider);

  const mobileSlides = [];
  let currentSlide = document.createElement('div');
  currentSlide.classList.add('slides');
  let mobileSlideRow = document.createElement('div'); // Use let for re-assignment
  mobileSlideRow.classList.add('row', 'row-cols-1', 'gy-3');
  currentSlide.append(mobileSlideRow);
  mobileSlides.push(currentSlide);

  businessVerticalRows.forEach((row, index) => {
    const [
      imageDesktopCell,
      imageTabletCell,
      altTextCell,
      titleCell,
      arrowIconCell,
      ctaLinkCell,
    ] = [...row.children];

    // Desktop item
    const desktopCol = document.createElement('div');
    desktopCol.classList.add('col', 'aos-init', 'aos-animate');
    desktopCol.setAttribute('data-aos', 'fade-up');
    desktopCol.setAttribute('data-aos-delay', `${(index % 3) * 300 + 100}`); // Stagger delay
    desktopRow.append(desktopCol);

    const desktopWrap = document.createElement('div');
    desktopWrap.classList.add('wrap');
    desktopCol.append(desktopWrap);

    const desktopImageDiv = document.createElement('div');
    desktopImageDiv.classList.add('image');
    desktopWrap.append(desktopImageDiv);

    const desktopPicture = imageDesktopCell.querySelector('picture');
    if (desktopPicture) {
      const img = desktopPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, altTextCell.textContent.trim(), false, [{ media: '(min-width: 992px)', width: '376' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      desktopImageDiv.append(optimizedPic);
    }

    const desktopTitleDiv = document.createElement('div');
    desktopTitleDiv.classList.add('title');
    desktopTitleDiv.textContent = titleCell.textContent.trim();
    desktopWrap.append(desktopTitleDiv);

    const desktopArrowIcon = arrowIconCell.querySelector('picture');
    if (desktopArrowIcon) {
      const desktopArrowImg = desktopArrowIcon.querySelector('img');
      if (desktopArrowImg) {
        const arrow = document.createElement('img');
        arrow.src = desktopArrowImg.src;
        arrow.alt = desktopArrowImg.alt;
        arrow.width = '10';
        arrow.height = '29';
        desktopTitleDiv.append(arrow);
      }
    }

    const desktopLink = document.createElement('a');
    desktopLink.classList.add('stretched-link');
    const foundCtaLink = ctaLinkCell.querySelector('a');
    if (foundCtaLink) {
      desktopLink.href = foundCtaLink.href;
      desktopLink.setAttribute('aria-label', `Learn more about ${titleCell.textContent.trim()}`);
    }
    moveInstrumentation(row, desktopLink);
    desktopWrap.append(desktopLink);

    // Mobile item
    // Check if the current mobile slide row has 3 children, if so, start a new slide
    if (mobileSlideRow.children.length === 3) {
      currentSlide = document.createElement('div');
      currentSlide.classList.add('slides');
      mobileSlideRow = document.createElement('div'); // Re-assign mobileSlideRow for the new slide
      mobileSlideRow.classList.add('row', 'row-cols-1', 'gy-3');
      currentSlide.append(mobileSlideRow);
      mobileSlides.push(currentSlide);
    }

    const mobileCol = document.createElement('div');
    mobileCol.classList.add('col');
    mobileSlideRow.append(mobileCol);

    const mobileWrap = document.createElement('div');
    mobileWrap.classList.add('wrap');
    mobileCol.append(mobileWrap);

    const mobileImageDiv = document.createElement('div');
    mobileImageDiv.classList.add('image');
    mobileWrap.append(mobileImageDiv);

    const mobilePicture = imageTabletCell.querySelector('picture');
    if (mobilePicture) {
      const img = mobilePicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, altTextCell.textContent.trim(), false, [{ media: '(min-width: 450px)', width: '376' }]);
      mobileImageDiv.append(optimizedPic);
    }

    const mobileTitleDiv = document.createElement('div');
    mobileTitleDiv.classList.add('title');
    mobileTitleDiv.textContent = titleCell.textContent.trim();
    mobileWrap.append(mobileTitleDiv);

    const mobileArrowIcon = arrowIconCell.querySelector('picture');
    if (mobileArrowIcon) {
      const mobileArrowImg = mobileArrowIcon.querySelector('img');
      if (mobileArrowImg) {
        const arrow = document.createElement('img');
        arrow.src = mobileArrowImg.src;
        arrow.alt = mobileArrowImg.alt;
        arrow.width = '10';
        arrow.height = '29';
        mobileTitleDiv.append(arrow);
      }
    }

    const mobileLink = document.createElement('a');
    mobileLink.classList.add('stretched-link');
    if (foundCtaLink) {
      mobileLink.href = foundCtaLink.href;
      mobileLink.setAttribute('aria-label', `Learn more about ${titleCell.textContent.trim()}`);
    }
    mobileWrap.append(mobileLink);
  });

  mobileSlides.forEach((slide) => flickitySlider.append(slide));

  block.replaceChildren(section);

  // Load Flickity for mobile slider
  await loadCSS('/libs/flickity/flickity.min.css');
  await loadScript('/libs/flickity/flickity.pkgd.min.js');

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
