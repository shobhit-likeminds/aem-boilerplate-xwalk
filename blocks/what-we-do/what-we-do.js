import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const [headingRow, descriptionRow, ...itemRows] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('section', 'what-we-do-wrap');

  const container = document.createElement('div');
  container.classList.add('container');
  section.append(container);

  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center');
  container.append(sectionHeader);

  // Section Heading
  if (headingRow) {
    const heading = document.createElement('h2');
    heading.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
    heading.setAttribute('data-aos', 'fade-up');
    heading.setAttribute('data-aos-offset', '100');
    heading.setAttribute('data-aos-duration', '650');
    heading.setAttribute('data-aos-easing', 'ease-in-out');
    moveInstrumentation(headingRow, heading);
    heading.textContent = headingRow.textContent.trim();
    sectionHeader.append(heading);
  }

  // Section Description
  if (descriptionRow) {
    const description = document.createElement('p');
    description.classList.add('aos-init', 'aos-animate');
    description.setAttribute('data-aos', 'fade-up');
    description.setAttribute('data-aos-offset', '100');
    description.setAttribute('data-aos-duration', '650');
    description.setAttribute('data-aos-easing', 'ease-in-out');
    moveInstrumentation(descriptionRow, description);
    description.innerHTML = descriptionRow.innerHTML;
    sectionHeader.append(description);
  }

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

  // Mobile View - Swiper setup
  const mobileContainer = document.createElement('div');
  mobileContainer.classList.add('container', 'd-lg-none', 'd-block', 'aos-init', 'aos-animate');
  mobileContainer.setAttribute('data-aos', 'fade-up');
  mobileContainer.setAttribute('data-aos-offset', '100');
  mobileContainer.setAttribute('data-aos-duration', '650');
  mobileContainer.setAttribute('data-aos-easing', 'ease-in-out');
  ourBusinessVerticals.append(mobileContainer);

  const swiperEl = document.createElement('div');
  swiperEl.classList.add('mobile-slider'); // This will be the Swiper container
  mobileContainer.append(swiperEl);

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');
  swiperEl.append(swiperWrapper);

  const paginationEl = document.createElement('div');
  paginationEl.classList.add('swiper-pagination');
  swiperEl.append(paginationEl);

  // Group items for mobile slider (3 items per slide)
  const mobileSlides = [];
  let currentSlide = null;

  itemRows.forEach((row, index) => {
    const [imageDesktopCell, imageMobileCell, titleIconCell, titleCell, linkCell] = [...row.children];

    // Desktop Item
    const desktopCol = document.createElement('div');
    desktopCol.classList.add('col', 'aos-init', 'aos-animate');
    desktopCol.setAttribute('data-aos', 'fade-up');
    desktopCol.setAttribute('data-aos-delay', `${(index % 3) * 300 + 100}`); // Stagger delays
    desktopRow.append(desktopCol);

    const desktopWrap = document.createElement('div');
    desktopWrap.classList.add('wrap');
    desktopCol.append(desktopWrap);

    const desktopImage = document.createElement('div');
    desktopImage.classList.add('image');
    if (imageDesktopCell) {
      const picture = imageDesktopCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ media: '(min-width: 992px)', width: '376' }, { width: '376' }]);
        // The original HTML has img-fluid on the img, but createOptimizedPicture handles this.
        // No need to add img-fluid class manually to the optimized picture's img.
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        desktopImage.append(optimizedPic);
      }
    }
    desktopWrap.append(desktopImage);

    const desktopTitle = document.createElement('div');
    desktopTitle.classList.add('title');
    if (titleCell) {
      desktopTitle.textContent = titleCell.textContent.trim();
    }
    if (titleIconCell) {
      const iconImg = titleIconCell.querySelector('img');
      if (iconImg) {
        const icon = document.createElement('img');
        icon.src = iconImg.src;
        icon.alt = iconImg.alt;
        icon.loading = 'lazy';
        icon.width = '10'; // From original HTML
        icon.height = '29'; // From original HTML
        desktopTitle.append(' ', icon);
      }
    }
    desktopWrap.append(desktopTitle);

    const desktopLink = document.createElement('a');
    desktopLink.classList.add('stretched-link');
    if (linkCell) {
      const foundLink = linkCell.querySelector('a');
      if (foundLink) {
        desktopLink.href = foundLink.href;
        desktopLink.setAttribute('aria-label', `Learn more about ${titleCell?.textContent.trim() || ''}`);
      }
    }
    moveInstrumentation(row, desktopLink); // Move instrumentation from the original row to the link
    desktopWrap.append(desktopLink);

    // Mobile Item (for Swiper)
    if (index % 3 === 0) {
      currentSlide = document.createElement('div');
      currentSlide.classList.add('swiper-slide');
      const slideRow = document.createElement('div');
      slideRow.classList.add('row', 'row-cols-1', 'gy-3');
      currentSlide.append(slideRow);
      mobileSlides.push(currentSlide);
    }

    const mobileCol = document.createElement('div');
    mobileCol.classList.add('col');
    currentSlide.querySelector('.row').append(mobileCol);

    const mobileWrap = document.createElement('div');
    mobileWrap.classList.add('wrap');
    mobileCol.append(mobileWrap);

    const mobileImage = document.createElement('div');
    mobileImage.classList.add('image');
    if (imageMobileCell) {
      const picture = imageMobileCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ media: '(min-width: 450px)', width: '376' }, { width: '376' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        mobileImage.append(optimizedPic);
      }
    }
    mobileWrap.append(mobileImage);

    const mobileTitle = document.createElement('div');
    mobileTitle.classList.add('title');
    if (titleCell) {
      mobileTitle.textContent = titleCell.textContent.trim();
    }
    if (titleIconCell) {
      const iconImg = titleIconCell.querySelector('img');
      if (iconImg) {
        const icon = document.createElement('img');
        icon.src = iconImg.src;
        icon.alt = iconImg.alt;
        icon.loading = 'lazy';
        icon.width = '10'; // From original HTML
        icon.height = '29'; // From original HTML
        mobileTitle.append(' ', icon);
      }
    }
    mobileWrap.append(mobileTitle);

    const mobileLink = document.createElement('a');
    mobileLink.classList.add('stretched-link');
    if (linkCell) {
      const foundLink = linkCell.querySelector('a');
      if (foundLink) {
        mobileLink.href = foundLink.href;
        mobileLink.setAttribute('aria-label', `Learn more about ${titleCell?.textContent.trim() || ''}`);
      }
    }
    // Instrumentation for mobile link is already handled by the desktop link above (Rule 23)
    mobileWrap.append(mobileLink);
  });

  mobileSlides.forEach(slide => swiperWrapper.append(slide));

  block.replaceChildren(section);

  // Load Swiper and initialize
  await loadCSS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
  await loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');
  // eslint-disable-next-line no-undef
  new Swiper(swiperEl, {
    slidesPerView: 1,
    spaceBetween: 16,
    loop: false, // Original HTML's flickity config has "wrapAround": false
    pagination: {
      el: paginationEl,
      clickable: true,
    },
    breakpoints: {
      // Swiper should be enabled only on mobile, disabled on desktop (>= 992px)
      992: {
        enabled: false,
      },
    },
  });
}
