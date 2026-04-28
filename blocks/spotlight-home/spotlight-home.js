import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const allRows = [...block.children];

  const spotlightSlides = allRows.filter((row) => row.children.length === 8);
  const quickLinks = allRows.filter((row) => row.children.length === 2);

  const section = document.createElement('section');
  section.classList.add('section', 'spotlight-home-wrap', 'm-0', 'p-0');

  const beamSlider = document.createElement('div');
  // Removed swiper-initialized, swiper-horizontal, swiper-backface-hidden as Swiper adds them automatically
  beamSlider.classList.add('beam-slider', 'main-slider', 'loading1', 'beam-slider-multi');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');

  spotlightSlides.forEach((row) => {
    const [
      imageDesktopCell,
      imageTabletCell,
      imageMobileCell,
      smallTextCell,
      headlineCell,
      descriptionCell,
      ctaLinkCell,
      ctaLabelCell,
    ] = [...row.children];

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide', 'nogradient');
    moveInstrumentation(row, swiperSlide);

    const slideBgImg = document.createElement('div');
    slideBgImg.classList.add('slide-bgimg');

    const picture = document.createElement('picture');

    const sourceMobile = document.createElement('source');
    sourceMobile.media = '(max-width: 576px)';
    const mobileImg = imageMobileCell.querySelector('img');
    if (mobileImg) {
      sourceMobile.srcset = mobileImg.src;
    }
    picture.appendChild(sourceMobile);

    const sourceTablet = document.createElement('source');
    sourceTablet.media = '(max-width: 799px)';
    const tabletImg = imageTabletCell.querySelector('img');
    if (tabletImg) {
      sourceTablet.srcset = tabletImg.src;
    }
    picture.appendChild(sourceTablet);

    const desktopImg = imageDesktopCell.querySelector('img');
    if (desktopImg) {
      const optimizedPic = createOptimizedPicture(desktopImg.src, desktopImg.alt, false, [{ width: '1903' }]);
      const imgEl = optimizedPic.querySelector('img');
      imgEl.setAttribute('loading', 'eager');
      imgEl.setAttribute('fetchpriority', 'high');
      moveInstrumentation(desktopImg, imgEl);
      picture.appendChild(optimizedPic.querySelector('img'));
    }

    slideBgImg.appendChild(picture);

    const mobContentHomeSpotlight = document.createElement('div');
    mobContentHomeSpotlight.classList.add('mob-content-home-spotlight');

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('content', 'text-center', 'text-lg-start');

    const smallText = smallTextCell.textContent.trim();
    if (smallText) {
      const smallEl = document.createElement('small');
      smallEl.style.fontWeight = 'bold';
      smallEl.textContent = smallText;
      contentDiv.appendChild(smallEl);
    }

    const headline = headlineCell.innerHTML;
    if (headline) {
      const h1 = document.createElement('h1');
      h1.classList.add('heading', 'font-medium', 'font-size-tb');
      h1.innerHTML = headline;
      contentDiv.appendChild(h1);
    }

    const description = descriptionCell.innerHTML;
    if (description) {
      const p = document.createElement('p');
      p.innerHTML = description;
      contentDiv.appendChild(p);
    }

    const ctaLink = ctaLinkCell.querySelector('a');
    const ctaLabel = ctaLabelCell.textContent.trim();
    if (ctaLink && ctaLabel) {
      const a = document.createElement('a');
      a.href = ctaLink.href;
      a.textContent = ctaLabel;
      a.classList.add('btn', 'btn-primary');
      contentDiv.appendChild(a);
    }

    mobContentHomeSpotlight.appendChild(contentDiv);
    swiperSlide.appendChild(slideBgImg);
    swiperSlide.appendChild(mobContentHomeSpotlight);
    swiperWrapper.appendChild(swiperSlide);
  });

  beamSlider.appendChild(swiperWrapper);

  const prevBtn = document.createElement('div');
  prevBtn.classList.add('swiper-button-prev', 'slide-home-btn', 'swiper-button-white');
  prevBtn.innerHTML = '<svg class="swiper-navigation-icon" width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.38296 20.0762C0.111788 19.805 0.111788 19.3654 0.38296 19.0942L9.19758 10.2796L0.38296 1.46497C0.111788 1.19379 0.111788 0.754138 0.38296 0.482966C0.654131 0.211794 1.09379 0.211794 1.36496 0.482966L10.4341 9.55214C10.8359 9.9539 10.8359 10.6053 10.4341 11.007L1.36496 20.0762C1.09379 20.3474 0.654131 20.3474 0.38296 20.0762Z" fill="currentColor"></path></svg>';
  beamSlider.appendChild(prevBtn);

  const nextBtn = document.createElement('div');
  nextBtn.classList.add('swiper-button-next', 'slide-home-btn', 'swiper-button-white');
  nextBtn.innerHTML = '<svg class="swiper-navigation-icon" width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.38296 20.0762C0.111788 19.805 0.111788 19.3654 0.38296 19.0942L9.19758 10.2796L0.38296 1.46497C0.111788 1.19379 0.111788 0.754138 0.38296 0.482966C0.654131 0.211794 1.09379 0.211794 1.36496 0.482966L10.4341 9.55214C10.8359 9.9539 10.8359 10.6053 10.4341 11.007L1.36496 20.0762C1.09379 20.3474 0.654131 20.3474 0.38296 20.0762Z" fill="currentColor"></path></svg>';
  beamSlider.appendChild(nextBtn);

  const pagination = document.createElement('div');
  pagination.classList.add('swiper-pagination', 'bullet-bottom');
  beamSlider.appendChild(pagination);

  const swiperNotification = document.createElement('span');
  swiperNotification.classList.add('swiper-notification');
  swiperNotification.setAttribute('aria-live', 'assertive');
  swiperNotification.setAttribute('aria-atomic', 'true');
  beamSlider.appendChild(swiperNotification);

  section.appendChild(beamSlider);

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

  quickLinks.forEach((row) => {
    const [linkCell, labelCell] = [...row.children];
    const li = document.createElement('li');
    const a = document.createElement('a');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      a.href = foundLink.href;
      a.target = '_blank';
    }
    a.classList.add('with-full-underline');
    a.textContent = labelCell.textContent.trim();
    moveInstrumentation(row, a);
    li.appendChild(a);
    quickLinksUl.appendChild(li);
  });

  container.appendChild(quickLinksUl);
  quickLinksParentDiv.appendChild(container);
  section.appendChild(quickLinksParentDiv);

  block.replaceChildren(section);

  // Initialize Swiper
  await loadCSS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
  await loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');
  // eslint-disable-next-line no-undef
  new Swiper(beamSlider, {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    navigation: {
      prevEl: prevBtn,
      nextEl: nextBtn,
    },
    pagination: {
      el: pagination,
      clickable: true,
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
  });
}
