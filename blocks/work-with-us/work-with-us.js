import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const [sectionHeadingRow, ...slideRows] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('section', 'work-with-us', 'pb-0');
  moveInstrumentation(block, section); // Move instrumentation from block to section

  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center');

  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
  moveInstrumentation(sectionHeadingRow, heading);
  heading.textContent = sectionHeadingRow.textContent.trim();
  sectionHeader.append(heading);
  section.append(sectionHeader);

  const positionRelative = document.createElement('div');
  positionRelative.classList.add('position-relative', 'aos-init', 'aos-animate');

  const container = document.createElement('div');
  container.classList.add('container');

  const gridLayout = document.createElement('div');
  gridLayout.classList.add('grid-layout');

  slideRows.forEach((row) => {
    const [
      imageMobile576Cell,
      imageMobile799Cell,
      imageDesktopCell,
      slideHeadingCell,
      slideBodyCell,
      ctaLinkCell,
      ctaLabelCell,
    ] = [...row.children];

    const slideDiv = document.createElement('div');
    slideDiv.classList.add('slides');

    const wrapDiv = document.createElement('div');
    wrapDiv.classList.add('wrap');

    const imageWrap = document.createElement('div');
    imageWrap.classList.add('image-wrap');

    const picture = document.createElement('picture');

    const source576 = document.createElement('source');
    source576.media = '(max-width: 576px)';
    const img576 = imageMobile576Cell.querySelector('img');
    if (img576) source576.srcset = img576.src;
    picture.append(source576);

    const source799 = document.createElement('source');
    source799.media = '(max-width: 799px)';
    const img799 = imageMobile799Cell.querySelector('img');
    if (img799) source799.srcset = img799.src;
    picture.append(source799);

    const desktopImg = imageDesktopCell.querySelector('img');
    if (desktopImg) {
      const optimizedPic = createOptimizedPicture(
        desktopImg.src,
        desktopImg.alt,
        false,
        [{ width: '750' }],
      );
      const img = optimizedPic.querySelector('img');
      img.classList.add('img-fluid');
      img.title = desktopImg.title;
      img.alt = desktopImg.alt;
      picture.append(img);
      moveInstrumentation(imageDesktopCell, optimizedPic.querySelector('img'));
    }

    imageWrap.append(picture);
    wrapDiv.append(imageWrap);

    const contentWrap = document.createElement('div');
    contentWrap.classList.add('content-wrap');

    const contentSectionHeader = document.createElement('div');
    contentSectionHeader.classList.add('section-header');

    const slideHeading = document.createElement('h3');
    slideHeading.classList.add('heading', 'font-regular');
    slideHeading.textContent = slideHeadingCell.textContent.trim();
    contentSectionHeader.append(slideHeading);

    const slideBody = document.createElement('p');
    slideBody.classList.add('text-size-body');
    slideBody.innerHTML = slideBodyCell.innerHTML;
    moveInstrumentation(slideBodyCell, slideBody); // Move instrumentation for richtext
    contentSectionHeader.append(slideBody);

    const ctaLink = document.createElement('a');
    ctaLink.classList.add('btn', 'btn-primary', 'stretched-link');
    const foundCtaLink = ctaLinkCell.querySelector('a');
    if (foundCtaLink) {
      ctaLink.href = foundCtaLink.href;
      moveInstrumentation(ctaLinkCell, ctaLink); // Move instrumentation for aem-content
    }
    ctaLink.textContent = ctaLabelCell.textContent.trim();
    contentSectionHeader.append(ctaLink);

    contentWrap.append(contentSectionHeader);
    wrapDiv.append(contentWrap);
    slideDiv.append(wrapDiv);
    gridLayout.append(slideDiv);

    moveInstrumentation(row, slideDiv); // Move instrumentation from row to slideDiv
  });

  container.append(gridLayout);
  positionRelative.append(container);
  section.append(positionRelative);

  block.replaceChildren(section);

  // Swiper initialization (from ORIGINAL HTML's flickity-slider-mobile-wrap data-flickity)
  // The original HTML uses Flickity, but EDS uses Swiper.
  // We need to load Swiper and initialize it if the original block implies a slider.
  // The presence of 'grid-layout' and 'slides' suggests a slider structure.
  await loadCSS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
  await loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');

  const swiperContainer = block.querySelector('.grid-layout'); // The container for slides
  if (swiperContainer) {
    // Create necessary Swiper elements if they don't exist
    const swiperWrapper = document.createElement('div');
    swiperWrapper.classList.add('swiper-wrapper');
    while (swiperContainer.firstChild) {
      const slide = swiperContainer.firstChild;
      slide.classList.add('swiper-slide'); // Add swiper-slide class to each slide
      swiperWrapper.append(slide);
    }
    swiperContainer.append(swiperWrapper);

    const paginationEl = document.createElement('div');
    paginationEl.classList.add('swiper-pagination');
    swiperContainer.append(paginationEl);

    const prevBtn = document.createElement('div');
    prevBtn.classList.add('swiper-button-prev');
    swiperContainer.append(prevBtn);

    const nextBtn = document.createElement('div');
    nextBtn.classList.add('swiper-button-next');
    swiperContainer.append(nextBtn);

    // eslint-disable-next-line no-undef
    new Swiper(swiperContainer, {
      slidesPerView: 'auto',
      loop: false, // Based on original Flickity data-flickity='{ "wrapAround": false ... }'
      navigation: {
        prevEl: prevBtn,
        nextEl: nextBtn,
      },
      pagination: {
        el: paginationEl,
        clickable: true,
      },
      // The original HTML had 'cellAlign': 'left', 'watchCSS': true, 'adaptiveHeight': true
      // These are Swiper equivalents or handled by CSS
      // 'imagesLoaded': true is not a Swiper option, handled by browser
    });
  }
}
