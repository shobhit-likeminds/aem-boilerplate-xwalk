import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const allRows = [...block.children];

  const spotlightSlides = allRows.filter((row) => row.children.length === 8);
  const quickLinks = allRows.filter((row) => row.children.length === 2);

  const section = document.createElement('section');
  section.classList.add('section', 'spotlight-home-wrap', 'm-0', 'p-0');

  const swiperEl = document.createElement('div');
  swiperEl.classList.add('beam-slider', 'main-slider', 'loading1', 'beam-slider-multi');
  // Swiper.js will add swiper-initialized, swiper-horizontal, swiper-watch-progress, swiper-backface-hidden

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');

  spotlightSlides.forEach((row) => {
    const [
      backgroundDesktopCell,
      backgroundTabletCell,
      backgroundMobileCell,
      eyebrowCell,
      headlineCell,
      descriptionCell,
      ctaLinkCell,
      ctaLabelCell,
    ] = [...row.children];

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide', 'nogradient'); // dark-content class handled by authoring

    const slideBgImg = document.createElement('div');
    slideBgImg.classList.add('slide-bgimg');

    const picture = document.createElement('picture');
    const sourceMobile = document.createElement('source');
    sourceMobile.media = '(max-width: 576px)';
    sourceMobile.srcset = backgroundMobileCell?.querySelector('img')?.src || '';
    picture.appendChild(sourceMobile);

    const sourceTablet = document.createElement('source');
    sourceTablet.media = '(max-width: 799px)';
    sourceTablet.srcset = backgroundTabletCell?.querySelector('img')?.src || '';
    picture.appendChild(sourceTablet);

    const img = backgroundDesktopCell?.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '1903' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      picture.appendChild(optimizedPic.querySelector('img'));
    }
    slideBgImg.appendChild(picture);
    swiperSlide.appendChild(slideBgImg);

    const mobContentHomeSpotlight = document.createElement('div');
    mobContentHomeSpotlight.classList.add('mob-content-home-spotlight');

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('content', 'text-center', 'text-lg-start');
    // active class is added by JS, not static

    if (eyebrowCell?.textContent.trim()) {
      const small = document.createElement('small');
      small.style.fontWeight = 'bold';
      small.textContent = eyebrowCell.textContent.trim();
      contentDiv.appendChild(small);
    }

    if (headlineCell?.innerHTML.trim()) {
      const h1 = document.createElement('h1');
      h1.classList.add('heading', 'font-medium', 'font-size-tb');
      h1.innerHTML = headlineCell.innerHTML.trim();
      contentDiv.appendChild(h1);
    }

    if (descriptionCell?.innerHTML.trim()) {
      const p = document.createElement('p');
      p.innerHTML = descriptionCell.innerHTML.trim();
      contentDiv.appendChild(p);
    }

    const ctaLink = ctaLinkCell?.querySelector('a');
    if (ctaLink && ctaLabelCell?.textContent.trim()) {
      const anchor = document.createElement('a');
      anchor.href = ctaLink.href;
      anchor.textContent = ctaLabelCell.textContent.trim();
      anchor.classList.add('btn', 'btn-primary'); // Add other button classes as needed
      moveInstrumentation(ctaLinkCell, anchor);
      contentDiv.appendChild(anchor);
    }

    mobContentHomeSpotlight.appendChild(contentDiv);
    swiperSlide.appendChild(mobContentHomeSpotlight);
    swiperWrapper.appendChild(swiperSlide);
    moveInstrumentation(row, swiperSlide);
  });

  swiperEl.appendChild(swiperWrapper);

  const prevBtn = document.createElement('div');
  prevBtn.classList.add('swiper-button-prev', 'slide-home-btn', 'swiper-button-white');
  prevBtn.innerHTML = `<svg class="swiper-navigation-icon" width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.38296 20.0762C0.111788 19.805 0.111788 19.3654 0.38296 19.0942L9.19758 10.2796L0.38296 1.46497C0.111788 1.19379 0.111788 0.754138 0.38296 0.482966C0.654131 0.211794 1.09379 0.211794 1.36496 0.482966L10.4341 9.55214C10.8359 9.9539 10.8359 10.6053 10.4341 11.007L1.36496 20.0762C1.09379 20.3474 0.654131 20.3474 0.38296 20.0762Z" fill="currentColor"></path></svg>`;
  swiperEl.appendChild(prevBtn);

  const nextBtn = document.createElement('div');
  nextBtn.classList.add('swiper-button-next', 'slide-home-btn', 'swiper-button-white');
  nextBtn.innerHTML = `<svg class="swiper-navigation-icon" width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.38296 20.0762C0.111788 19.805 0.111788 19.3654 0.38296 19.0942L9.19758 10.2796L0.38296 1.46497C0.111788 1.19379 0.111788 0.754138 0.38296 0.482966C0.654131 0.211794 1.09379 0.211794 1.36496 0.482966L10.4341 9.55214C10.8359 9.9539 10.8359 10.6053 10.4341 11.007L1.36496 20.0762C1.09379 20.3474 0.654131 20.3474 0.38296 20.0762Z" fill="currentColor"></path></svg>`;
  swiperEl.appendChild(nextBtn);

  const paginationEl = document.createElement('div');
  paginationEl.classList.add('swiper-pagination', 'bullet-bottom');
  swiperEl.appendChild(paginationEl);

  section.appendChild(swiperEl);

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

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container', 'aos-init', 'aos-animate');
  containerDiv.setAttribute('data-aos', 'fade-up');
  containerDiv.setAttribute('data-aos-offset', '-100');
  containerDiv.setAttribute('data-aos-duration', '650');
  containerDiv.setAttribute('data-aos-easing', 'ease-in-out');

  const quickLinksUl = document.createElement('ul');
  quickLinksUl.classList.add('quick-links-div');

  quickLinks.forEach((row) => {
    const [linkCell, labelCell] = [...row.children];
    const li = document.createElement('li');
    const link = linkCell.querySelector('a');
    if (link && labelCell?.textContent.trim()) {
      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.textContent = labelCell.textContent.trim();
      anchor.classList.add('with-full-underline');
      moveInstrumentation(linkCell, anchor);
      li.appendChild(anchor);
    }
    quickLinksUl.appendChild(li);
    moveInstrumentation(row, li);
  });

  containerDiv.appendChild(quickLinksUl);
  quickLinksParentDiv.appendChild(containerDiv);
  section.appendChild(quickLinksParentDiv);

  block.replaceChildren(section);

  // Initialize Swiper
  await loadCSS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
  await loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');
  // eslint-disable-next-line no-undef
  new Swiper(swiperEl, {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true, // Assuming loop from original HTML behavior
    navigation: {
      prevEl: prevBtn,
      nextEl: nextBtn,
    },
    pagination: {
      el: paginationEl,
      clickable: true,
    },
    breakpoints: {
      576: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 1,
      },
      992: {
        slidesPerView: 1,
      },
    },
  });
}
