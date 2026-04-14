import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const allRows = [...block.children];

  const slideRows = allRows.filter((row) => row.children.length === 7);
  const quickLinkRows = allRows.filter((row) => row.children.length === 2);

  const section = document.createElement('section');
  section.classList.add('section', 'spotlight-home-wrap', 'm-0', 'p-0');

  const beamSlider = document.createElement('div');
  beamSlider.classList.add('beam-slider', 'main-slider', 'loading1', 'beam-slider-multi');
  section.append(beamSlider);

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');
  beamSlider.append(swiperWrapper);

  slideRows.forEach((row) => {
    const [imageCell, altTextCell, smallTextCell, headingCell, descriptionCell, ctaLinkCell, ctaLinkLabelCell] = [...row.children];

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide', 'nogradient');
    moveInstrumentation(row, swiperSlide);

    const slideBgImg = document.createElement('div');
    slideBgImg.classList.add('slide-bgimg');

    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, altTextCell.textContent.trim(), false, [{ width: '1903' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        slideBgImg.append(optimizedPic);
      }
    }
    swiperSlide.append(slideBgImg);

    const mobContentHomeSpotlight = document.createElement('div');
    mobContentHomeSpotlight.classList.add('mob-content-home-spotlight');

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('content', 'text-center', 'text-lg-start');

    const smallText = smallTextCell.textContent.trim();
    if (smallText) {
      const small = document.createElement('small');
      small.style.fontWeight = 'bold';
      small.textContent = smallText;
      contentDiv.append(small);
    }

    const heading = headingCell.textContent.trim();
    if (heading) {
      const h2 = document.createElement('h2');
      h2.classList.add('heading', 'font-medium', 'font-size-tb');
      h2.innerHTML = heading;
      contentDiv.append(h2);
    }

    const description = descriptionCell.textContent.trim();
    if (description) {
      const p = document.createElement('p');
      p.innerHTML = description;
      contentDiv.append(p);
    }

    const ctaLink = ctaLinkCell.querySelector('a');
    const ctaLinkLabel = ctaLinkLabelCell.textContent.trim(); // Corrected: Use textContent.trim()
    if (ctaLink && ctaLinkLabel) {
      const a = document.createElement('a');
      a.href = ctaLink.href;
      a.textContent = ctaLinkLabel;
      a.classList.add('btn', 'btn-primary');
      contentDiv.append(a);
    }

    mobContentHomeSpotlight.append(contentDiv);
    swiperSlide.append(mobContentHomeSpotlight);
    swiperWrapper.append(swiperSlide);
  });

  const prevButton = document.createElement('div');
  prevButton.classList.add('swiper-button-prev', 'slide-home-btn', 'swiper-button-white');
  const prevImg = document.createElement('img');
  prevImg.alt = 'svg file';
  prevImg.src = '/content/dam/aemigrate/uploaded-folder/image/1776145926124.svg+xml'; // Corrected SVG path
  prevButton.append(prevImg);
  beamSlider.append(prevButton);

  const nextButton = document.createElement('div');
  nextButton.classList.add('swiper-button-next', 'slide-home-btn', 'swiper-button-white');
  const nextImg = document.createElement('img');
  nextImg.alt = 'svg file';
  nextImg.src = '/content/dam/aemigrate/uploaded-folder/image/1776145926124.svg+xml'; // Corrected SVG path
  nextButton.append(nextImg);
  beamSlider.append(nextButton);

  const swiperPagination = document.createElement('div');
  swiperPagination.classList.add('swiper-pagination', 'bullet-bottom');
  beamSlider.append(swiperPagination);

  const quickLinksParentDiv = document.createElement('div');
  quickLinksParentDiv.classList.add('mt-0', 'pt-1', 'pb-1', 'm-none1', 'bottom-0', 'w-100', 'quick-links-parents-div', 'position-relative');

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container', 'aos-init', 'aos-animate');
  containerDiv.setAttribute('data-aos', 'fade-up');
  containerDiv.setAttribute('data-aos-offset', '-100');
  containerDiv.setAttribute('data-aos-duration', '650');
  containerDiv.setAttribute('data-aos-easing', 'ease-in-out');
  quickLinksParentDiv.append(containerDiv);

  const quickLinksUl = document.createElement('ul');
  quickLinksUl.classList.add('quick-links-div');
  containerDiv.append(quickLinksUl);

  quickLinkRows.forEach((row) => {
    const [linkCell, linkLabelCell] = [...row.children];

    const li = document.createElement('li');
    moveInstrumentation(row, li);

    const link = linkCell.querySelector('a');
    const linkLabel = linkLabelCell.textContent.trim();

    if (link && linkLabel) {
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = linkLabel;
      a.classList.add('with-full-underline');
      li.append(a);
    }
    quickLinksUl.append(li);
  });

  block.textContent = '';
  block.append(section);

  // Swiper initialization (simplified, full Swiper logic would be in a separate script)
  let currentIndex = 0;
  const slides = [...swiperWrapper.children];
  const totalSlides = slides.length;

  const updateSlider = () => {
    slides.forEach((slide, index) => {
      slide.style.transform = `translateX(-${currentIndex * 100}%)`;
      slide.classList.remove('swiper-slide-active', 'swiper-slide-prev', 'swiper-slide-next');
      if (index === currentIndex) {
        slide.classList.add('swiper-slide-active');
      } else if (index === currentIndex - 1) {
        slide.classList.add('swiper-slide-prev');
      } else if (index === currentIndex + 1) {
        slide.classList.add('swiper-slide-next');
      }
    });

    // Update pagination bullets
    swiperPagination.innerHTML = '';
    for (let i = 0; i < totalSlides; i += 1) {
      const bullet = document.createElement('span');
      bullet.classList.add('swiper-pagination-bullet');
      if (i === currentIndex) {
        bullet.classList.add('swiper-pagination-bullet-active');
      }
      bullet.addEventListener('click', () => {
        currentIndex = i;
        updateSlider();
      });
      swiperPagination.append(bullet);
    }
  };

  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlider();
  });

  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
  });

  updateSlider(); // Initial render
}
