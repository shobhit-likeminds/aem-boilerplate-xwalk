import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const [headingRow, descriptionRow, ...verticalRows] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('section', 'what-we-do-wrap');

  const container = document.createElement('div');
  container.classList.add('container');
  section.append(container);

  // Section Header
  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center');
  moveInstrumentation(headingRow, sectionHeader);
  moveInstrumentation(descriptionRow, sectionHeader);

  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
  heading.textContent = headingRow.textContent.trim();
  sectionHeader.append(heading);

  const description = document.createElement('p');
  description.classList.add('aos-init', 'aos-animate');
  description.innerHTML = descriptionRow.innerHTML;
  sectionHeader.append(description);

  container.append(sectionHeader);

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

  verticalRows.forEach((row) => {
    const [
      imageDesktopCell,
      imageTabletCell,
      mainImageCell,
      titleCell,
      arrowIconCell,
      verticalLinkCell,
    ] = [...row.children];

    const col = document.createElement('div');
    col.classList.add('col', 'aos-init', 'aos-animate');
    moveInstrumentation(row, col);

    const wrap = document.createElement('div');
    wrap.classList.add('wrap');
    col.append(wrap);

    const imageDiv = document.createElement('div');
    imageDiv.classList.add('image');
    wrap.append(imageDiv);

    const pictureDesktop = imageDesktopCell.querySelector('picture');
    const pictureTablet = imageTabletCell.querySelector('picture');
    const pictureMain = mainImageCell.querySelector('picture');

    if (pictureDesktop || pictureTablet || pictureMain) {
      const combinedPicture = document.createElement('picture');
      if (pictureDesktop) {
        const sourceDesktop = document.createElement('source');
        sourceDesktop.setAttribute('media', '(min-width: 992px)');
        sourceDesktop.srcset = pictureDesktop.querySelector('img').src;
        combinedPicture.append(sourceDesktop);
      }
      if (pictureTablet) {
        const sourceTablet = document.createElement('source');
        sourceTablet.setAttribute('media', '(min-width: 450px)');
        sourceTablet.srcset = pictureTablet.querySelector('img').src;
        combinedPicture.append(sourceTablet);
      }
      if (pictureMain) {
        const img = pictureMain.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '376' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        combinedPicture.append(optimizedPic.querySelector('img'));
      }
      imageDiv.append(combinedPicture);
    }

    const titleDiv = document.createElement('div');
    titleDiv.classList.add('title');
    titleDiv.textContent = titleCell.textContent.trim();
    wrap.append(titleDiv);

    const arrowIcon = arrowIconCell.querySelector('picture');
    if (arrowIcon) {
      const img = arrowIcon.querySelector('img');
      const optimizedArrow = createOptimizedPicture(img.src, img.alt, false, [{ width: '10' }]);
      titleDiv.append(optimizedArrow);
    }

    const verticalLink = verticalLinkCell.querySelector('a');
    if (verticalLink) {
      const anchor = document.createElement('a');
      anchor.href = verticalLink.href;
      anchor.classList.add('stretched-link');
      anchor.setAttribute('aria-label', `Learn more about ${titleCell.textContent.trim()}`);
      wrap.append(anchor);
    }

    desktopRow.append(col);
  });

  // Mobile View (Swiper)
  const mobileContainer = document.createElement('div');
  mobileContainer.classList.add('container', 'd-lg-none', 'd-block', 'aos-init', 'aos-animate');
  ourBusinessVerticals.append(mobileContainer);

  const swiperEl = document.createElement('div');
  swiperEl.classList.add('mobile-slider', 'swiper'); // Add swiper class
  mobileContainer.append(swiperEl);

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');
  swiperEl.append(swiperWrapper);

  // Group items into slides of 3 for mobile
  const itemsPerSlide = 3;
  for (let i = 0; i < verticalRows.length; i += itemsPerSlide) {
    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide', 'slides'); // Add swiper-slide class

    const slideRow = document.createElement('div');
    slideRow.classList.add('row', 'row-cols-1', 'gy-3');
    swiperSlide.append(slideRow);

    const currentItems = verticalRows.slice(i, i + itemsPerSlide);
    currentItems.forEach((row) => {
      const [
        imageDesktopCell,
        imageTabletCell,
        mainImageCell,
        titleCell,
        arrowIconCell,
        verticalLinkCell,
      ] = [...row.children];

      const col = document.createElement('div');
      col.classList.add('col');

      const wrap = document.createElement('div');
      wrap.classList.add('wrap');
      col.append(wrap);

      const imageDiv = document.createElement('div');
      imageDiv.classList.add('image');
      wrap.append(imageDiv);

      const pictureDesktop = imageDesktopCell.querySelector('picture');
      const pictureTablet = imageTabletCell.querySelector('picture');
      const pictureMain = mainImageCell.querySelector('picture');

      if (pictureDesktop || pictureTablet || pictureMain) {
        const combinedPicture = document.createElement('picture');
        if (pictureDesktop) {
          const sourceDesktop = document.createElement('source');
          sourceDesktop.setAttribute('media', '(min-width: 992px)');
          sourceDesktop.srcset = pictureDesktop.querySelector('img').src;
          combinedPicture.append(sourceDesktop);
        }
        if (pictureTablet) {
          const sourceTablet = document.createElement('source');
          sourceTablet.setAttribute('media', '(min-width: 450px)');
          sourceTablet.srcset = pictureTablet.querySelector('img').src;
          combinedPicture.append(sourceTablet);
        }
        if (pictureMain) {
          const img = pictureMain.querySelector('img');
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '376' }]);
          combinedPicture.append(optimizedPic.querySelector('img'));
        }
        imageDiv.append(combinedPicture);
      }

      const titleDiv = document.createElement('div');
      titleDiv.classList.add('title');
      titleDiv.textContent = titleCell.textContent.trim();
      wrap.append(titleDiv);

      const arrowIcon = arrowIconCell.querySelector('picture');
      if (arrowIcon) {
        const img = arrowIcon.querySelector('img');
        const optimizedArrow = createOptimizedPicture(img.src, img.alt, false, [{ width: '10' }]);
        titleDiv.append(optimizedArrow);
      }

      const verticalLink = verticalLinkCell.querySelector('a');
      if (verticalLink) {
        const anchor = document.createElement('a');
        anchor.href = verticalLink.href;
        anchor.classList.add('stretched-link');
        anchor.setAttribute('aria-label', `Learn more about ${titleCell.textContent.trim()}`);
        wrap.append(anchor);
      }

      slideRow.append(col);
    });
    swiperWrapper.append(swiperSlide);
  }

  // Swiper Pagination
  const swiperPagination = document.createElement('div');
  swiperPagination.classList.add('swiper-pagination', 'flickity-page-dots');
  swiperEl.append(swiperPagination);

  block.replaceChildren(section);

  // Image optimization for all pictures
  section.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  // Load Swiper library and initialize
  await loadCSS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
  await loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');

  // eslint-disable-next-line no-undef
  new Swiper(swiperEl, {
    slidesPerView: 1, // One slide per view for mobile
    spaceBetween: 0,
    loop: false, // Original HTML has no data-loop="true"
    pagination: {
      el: swiperPagination,
      clickable: true,
    },
  });
}
