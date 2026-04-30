import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const children = [...block.children];

  const slideRows = children.filter((row) => row.children.length === 8);
  const quickLinkRows = children.filter((row) => row.children.length === 2);

  const section = document.createElement('section');
  section.classList.add('section', 'spotlight-home-wrap', 'm-0', 'p-0');
  moveInstrumentation(block, section); // Move instrumentation from block to section

  const beamSlider = document.createElement('div');
  // Removed swiper-initialized, swiper-horizontal, swiper-backface-hidden as Swiper adds them
  beamSlider.classList.add('beam-slider', 'main-slider', 'loading1', 'beam-slider-multi');
  section.append(beamSlider);

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');
  beamSlider.append(swiperWrapper);

  slideRows.forEach((row) => {
    const [desktopImageCell, tabletImageCell, mobileImageCell, smallTextCell, headlineCell, descriptionCell, ctaLinkCell, ctaLabelCell] = [...row.children];

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide', 'nogradient');
    moveInstrumentation(row, swiperSlide); // Move instrumentation from row to swiperSlide
    swiperWrapper.append(swiperSlide);

    const slideBgImg = document.createElement('div');
    slideBgImg.classList.add('slide-bgimg');
    swiperSlide.append(slideBgImg);

    const picture = document.createElement('picture');
    slideBgImg.append(picture);

    const mobileSource = document.createElement('source');
    mobileSource.media = '(max-width: 576px)';
    const mobileImg = mobileImageCell.querySelector('img');
    if (mobileImg) {
      mobileSource.srcset = mobileImg.src;
    }
    picture.append(mobileSource);

    const tabletSource = document.createElement('source');
    tabletSource.media = '(max-width: 799px)';
    const tabletImg = tabletImageCell.querySelector('img');
    if (tabletImg) {
      tabletSource.srcset = tabletImg.src;
    }
    picture.append(tabletSource);

    const desktopImg = desktopImageCell.querySelector('img');
    if (desktopImg) {
      // createOptimizedPicture returns a <picture> element, we need its <img> child
      const optimizedPic = createOptimizedPicture(desktopImg.src, desktopImg.alt, false, [{ width: '1903' }]);
      picture.append(optimizedPic.querySelector('img'));
    }

    const mobContentHomeSpotlight = document.createElement('div');
    mobContentHomeSpotlight.classList.add('mob-content-home-spotlight');
    swiperSlide.append(mobContentHomeSpotlight);

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('content', 'text-center', 'text-lg-start');
    mobContentHomeSpotlight.append(contentDiv);

    // Richtext fields should use innerHTML, not textContent.trim() for check, then innerHTML for content
    if (smallTextCell.innerHTML.trim()) {
      const small = document.createElement('small');
      small.innerHTML = smallTextCell.innerHTML; // Correctly uses innerHTML for richtext
      contentDiv.append(small);
    }

    if (headlineCell.innerHTML.trim()) {
      const headline = document.createElement('h2');
      headline.classList.add('heading', 'font-medium', 'font-size-tb');
      headline.innerHTML = headlineCell.innerHTML; // Correctly uses innerHTML for richtext
      contentDiv.append(headline);
    }

    if (descriptionCell.innerHTML.trim()) {
      const description = document.createElement('p');
      description.innerHTML = descriptionCell.innerHTML; // Correctly uses innerHTML for richtext
      contentDiv.append(description);
    }

    const ctaLink = ctaLinkCell.querySelector('a');
    if (ctaLink && ctaLabelCell.textContent.trim()) {
      const btn = document.createElement('a');
      btn.classList.add('btn', 'btn-primary');
      btn.href = ctaLink.href;
      btn.textContent = ctaLabelCell.textContent.trim();
      contentDiv.append(btn);
    }
  });

  const prevBtn = document.createElement('div');
  prevBtn.classList.add('swiper-button-prev', 'slide-home-btn', 'swiper-button-white');
  // SVG path is hardcoded, but it's a standard icon, not a DAM asset. Keep as is.
  prevBtn.innerHTML = '<svg class="swiper-navigation-icon" width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.38296 20.0762C0.111788 19.805 0.111788 19.3654 0.38296 19.0942L9.19758 10.2796L0.38296 1.46497C0.111788 1.19379 0.111788 0.754138 0.38296 0.482966C0.654131 0.211794 1.09379 0.211794 1.36496 0.482966L10.4341 9.55214C10.8359 9.9539 10.8359 10.6053 10.4341 11.007L1.36496 20.0762C1.09379 20.3474 0.654131 20.3474 0.38296 20.0762Z" fill="currentColor"></path></svg>';
  beamSlider.append(prevBtn);

  const nextBtn = document.createElement('div');
  nextBtn.classList.add('swiper-button-next', 'slide-home-btn', 'swiper-button-white');
  // SVG path is hardcoded, but it's a standard icon, not a DAM asset. Keep as is.
  nextBtn.innerHTML = '<svg class="swiper-navigation-icon" width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.38296 20.0762C0.111788 19.805 0.111788 19.3654 0.38296 19.0942L9.19758 10.2796L0.38296 1.46497C0.111788 1.19379 0.111788 0.754138 0.38296 0.482966C0.654131 0.211794 1.09379 0.211794 1.36496 0.482966L10.4341 9.55214C10.8359 9.9539 10.8359 10.6053 10.4341 11.007L1.36496 20.0762C1.09379 20.3474 0.654131 20.3474 0.38296 20.0762Z" fill="currentColor"></path></svg>';
  beamSlider.append(nextBtn);

  const pagination = document.createElement('div');
  pagination.classList.add('swiper-pagination', 'bullet-bottom');
  beamSlider.append(pagination);

  const quickLinksParentDiv = document.createElement('div');
  quickLinksParentDiv.classList.add('mt-0', 'pt-1', 'pb-1', 'm-none1', 'bottom-0', 'w-100', 'quick-links-parents-div', 'position-relative');
  section.append(quickLinksParentDiv);

  const container = document.createElement('div');
  container.classList.add('container', 'aos-init', 'aos-animate');
  container.setAttribute('data-aos', 'fade-up');
  container.setAttribute('data-aos-offset', '-100');
  container.setAttribute('data-aos-duration', '650');
  container.setAttribute('data-aos-easing', 'ease-in-out');
  quickLinksParentDiv.append(container);

  const quickLinksUl = document.createElement('ul');
  quickLinksUl.classList.add('quick-links-div');
  container.append(quickLinksUl);

  quickLinkRows.forEach((row) => {
    const [linkCell, labelCell] = [...row.children];
    const li = document.createElement('li');
    moveInstrumentation(row, li); // Move instrumentation from row to li
    quickLinksUl.append(li);

    const linkEl = linkCell.querySelector('a');
    if (linkEl && labelCell.textContent.trim()) {
      const anchor = document.createElement('a');
      anchor.href = linkEl.href;
      anchor.textContent = labelCell.textContent.trim();
      anchor.classList.add('with-full-underline');
      li.append(anchor);
    }
  });

  block.replaceChildren(section);

  // Initialize Swiper
  await loadCSS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
  await loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');
  // eslint-disable-next-line no-undef
  new Swiper(beamSlider, {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    navigation: {
      prevEl: prevBtn,
      nextEl: nextBtn,
    },
    pagination: {
      el: pagination,
      clickable: true,
    },
  });
}
