import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const allRows = [...block.children];

  const slideRows = allRows.filter((row) => row.children.length === 8);
  const quickLinkRows = allRows.filter((row) => row.children.length === 2);

  const section = document.createElement('section');
  section.classList.add('section', 'spotlight-home-wrap', 'm-0', 'p-0');

  const beamSlider = document.createElement('div');
  beamSlider.classList.add('beam-slider', 'main-slider', 'loading1', 'beam-slider-multi');
  beamSlider.setAttribute('data-aos', 'fade-up');
  beamSlider.setAttribute('data-aos-offset', '-100');
  beamSlider.setAttribute('data-aos-duration', '650');
  beamSlider.setAttribute('data-aos-easing', 'ease-in-out');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');

  slideRows.forEach((row) => {
    const [
      backgroundImageMobile576Cell,
      backgroundImageMobile799Cell,
      backgroundImageDesktopCell,
      smallTextCell,
      headingCell,
      descriptionCell,
      ctaLinkCell,
      ctaLabelCell,
    ] = [...row.children];

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide', 'nogradient');
    // Check if the original slide had 'dark-content'
    if (row.classList.contains('dark-content')) {
      swiperSlide.classList.add('dark-content');
    }
    moveInstrumentation(row, swiperSlide);

    const slideBgImg = document.createElement('div');
    slideBgImg.classList.add('slide-bgimg');

    // Use createOptimizedPicture for all images
    const desktopImg = backgroundImageDesktopCell.querySelector('img');
    const mobile799Img = backgroundImageMobile799Cell.querySelector('img');
    const mobile576Img = backgroundImageMobile576Cell.querySelector('img');

    const picture = createOptimizedPicture(
      desktopImg?.src || '',
      desktopImg?.alt || '',
      false,
      [
        { media: '(max-width: 576px)', width: '576', url: mobile576Img?.src || '' },
        { media: '(max-width: 799px)', width: '799', url: mobile799Img?.src || '' },
        { width: '1903' }, // Desktop width
      ],
    );
    // Set loading eager for the main image
    picture.querySelector('img').setAttribute('loading', 'eager');
    picture.querySelector('img').setAttribute('width', '1903'); // From original HTML
    picture.querySelector('img').setAttribute('height', '841'); // From original HTML

    slideBgImg.append(picture);
    swiperSlide.append(slideBgImg);

    const mobContentHomeSpotlight = document.createElement('div');
    mobContentHomeSpotlight.classList.add('mob-content-home-spotlight');

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('content', 'text-center', 'text-lg-start');

    if (smallTextCell.textContent.trim()) {
      const small = document.createElement('small');
      small.style.fontWeight = 'bold';
      small.textContent = smallTextCell.textContent.trim();
      contentDiv.append(small);
    }

    if (headingCell.innerHTML.trim()) {
      const heading = document.createElement('h1');
      heading.classList.add('heading', 'font-medium', 'font-size-tb');
      // Check if the original heading had 'banner-text-dark'
      if (row.querySelector('h1')?.classList.contains('banner-text-dark')) {
        heading.classList.add('banner-text-dark');
      }
      // Check if the original heading had 'heading-small'
      if (row.querySelector('h2')?.classList.contains('heading-small')) {
        heading.classList.add('heading-small');
      }
      heading.innerHTML = headingCell.innerHTML.trim();
      contentDiv.append(heading);
    }

    if (descriptionCell.innerHTML.trim()) {
      const p = document.createElement('p');
      p.innerHTML = descriptionCell.innerHTML.trim();
      contentDiv.append(p);
    }

    const ctaLink = ctaLinkCell.querySelector('a');
    const ctaLabel = ctaLabelCell.textContent.trim();

    if (ctaLink && ctaLabel) {
      const anchor = document.createElement('a');
      anchor.href = ctaLink.href;
      anchor.textContent = ctaLabel;
      anchor.classList.add('btn', 'btn-primary');
      // Check if the original button had custom styles
      const originalCta = ctaLinkCell.querySelector('a');
      if (originalCta && originalCta.style.backgroundColor) {
        anchor.style.backgroundColor = originalCta.style.backgroundColor;
      }
      if (originalCta && originalCta.style.color) {
        anchor.style.color = originalCta.style.color;
      }
      contentDiv.append(anchor);
    }

    mobContentHomeSpotlight.append(contentDiv);
    swiperSlide.append(mobContentHomeSpotlight);
    swiperWrapper.append(swiperSlide);
  });

  beamSlider.append(swiperWrapper);

  const prevButton = document.createElement('div');
  prevButton.classList.add('swiper-button-prev', 'slide-home-btn', 'swiper-button-white');
  prevButton.innerHTML = `<svg class="swiper-navigation-icon" width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.38296 20.0762C0.111788 19.805 0.111788 19.3654 0.38296 19.0942L9.19758 10.2796L0.38296 1.46497C0.111788 1.19379 0.111788 0.754138 0.38296 0.482966C0.654131 0.211794 1.09379 0.211794 1.36496 0.482966L10.4341 9.55214C10.8359 9.9539 10.8359 10.6053 10.4341 11.007L1.36496 20.0762C1.09379 20.3474 0.654131 20.3474 0.38296 20.0762Z" fill="currentColor"></path></svg>`;
  beamSlider.append(prevButton);

  const nextButton = document.createElement('div');
  nextButton.classList.add('swiper-button-next', 'slide-home-btn', 'swiper-button-white');
  nextButton.innerHTML = `<svg class="swiper-navigation-icon" width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.38296 20.0762C0.111788 19.805 0.111788 19.3654 0.38296 19.0942L9.19758 10.2796L0.38296 1.46497C0.111788 1.19379 0.111788 0.754138 0.38296 0.482966C0.654131 0.211794 1.09379 0.211794 1.36496 0.482966L10.4341 9.55214C10.8359 9.9539 10.8359 10.6053 10.4341 11.007L1.36496 20.0762C1.09379 20.3474 0.654131 20.3474 0.38296 20.0762Z" fill="currentColor"></path></svg>`;
  beamSlider.append(nextButton);

  const pagination = document.createElement('div');
  pagination.classList.add('swiper-pagination', 'bullet-bottom');
  beamSlider.append(pagination);

  section.append(beamSlider);

  const quickLinksParentDiv = document.createElement('div');
  quickLinksParentDiv.classList.add(
    'mt-0',
    'pt-1',
    'pb-1',
    'm-none1',
    'bottom-0',
    'w-100',
    'quick-links-parents-div',
    'position-relative',
  );

  const container = document.createElement('div');
  container.classList.add('container', 'aos-init', 'aos-animate');
  container.setAttribute('data-aos', 'fade-up');
  container.setAttribute('data-aos-offset', '-100');
  container.setAttribute('data-aos-duration', '650');
  container.setAttribute('data-aos-easing', 'ease-in-out');

  const quickLinksUl = document.createElement('ul');
  quickLinksUl.classList.add('quick-links-div');

  quickLinkRows.forEach((row) => {
    const [linkCell, labelCell] = [...row.children];
    const li = document.createElement('li');
    const anchor = document.createElement('a');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      anchor.href = foundLink.href;
    }
    anchor.textContent = labelCell.textContent.trim();
    anchor.classList.add('with-full-underline');
    moveInstrumentation(row, anchor);
    li.append(anchor);
    quickLinksUl.append(li);
  });

  container.append(quickLinksUl);
  quickLinksParentDiv.append(container);
  section.append(quickLinksParentDiv);

  block.replaceChildren(section);

  // Load Swiper and initialize
  await loadCSS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
  await loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');
  // eslint-disable-next-line no-undef
  new Swiper(beamSlider, {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true, // From original HTML, slides loop
    autoplay: {
      delay: 5000, // Common autoplay delay, adjust if original has specific value
      disableOnInteraction: false,
    },
    navigation: {
      prevEl: prevButton,
      nextEl: nextButton,
    },
    pagination: {
      el: pagination,
      clickable: true,
    },
  });
}
