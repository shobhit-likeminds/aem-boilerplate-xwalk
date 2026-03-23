import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselId = `carousel-${Math.random().toString(36).substring(2, 9)}`;
  block.id = carouselId;
  block.classList.add('carousel', 'slide');

  const carouselIndicators = document.createElement('ol');
  carouselIndicators.classList.add('carousel-indicators');

  const carouselInner = document.createElement('div');
  carouselInner.classList.add('carousel-inner');

  [...block.children].forEach((row, index) => {
    const indicator = document.createElement('li');
    indicator.setAttribute('data-target', `#${carouselId}`);
    indicator.setAttribute('data-slide-to', index);
    if (index === 0) {
      indicator.classList.add('active');
    }
    // Add event listener for indicators
    indicator.addEventListener('click', (e) => {
      e.preventDefault();
      const currentActiveItem = carouselInner.querySelector('.carousel-item.active');
      const currentActiveIndicator = carouselIndicators.querySelector('.active');
      const targetIndex = parseInt(e.target.getAttribute('data-slide-to'), 10);
      const targetItem = carouselInner.children[targetIndex];

      if (currentActiveItem && currentActiveIndicator && targetItem) {
        currentActiveItem.classList.remove('active');
        currentActiveIndicator.classList.remove('active');
        targetItem.classList.add('active');
        e.target.classList.add('active');
      }
    });
    carouselIndicators.append(indicator);

    const carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel-item');
    if (index === 0) {
      carouselItem.classList.add('active');
    }
    moveInstrumentation(row, carouselItem);

    const [desktopImageCell, mobileImageCell, headingCell, descriptionCell, ctaLinkCell] = [...row.children];

    // Desktop Image
    const desktopPicture = desktopImageCell.querySelector('picture');
    if (desktopPicture) {
      const desktopImg = desktopPicture.querySelector('img');
      const optimizedDesktopPic = createOptimizedPicture(desktopImg.src, desktopImg.alt, index === 0, [{ width: '2000' }]);
      moveInstrumentation(desktopImg, optimizedDesktopPic.querySelector('img'));
      optimizedDesktopPic.classList.add('d-none', 'd-sm-block', 'w-100', 'banner-desktop-image');
      carouselItem.append(optimizedDesktopPic);
    }

    // Mobile Image
    const mobilePicture = mobileImageCell.querySelector('picture');
    if (mobilePicture) {
      const mobileImg = mobilePicture.querySelector('img');
      const optimizedMobilePic = createOptimizedPicture(mobileImg.src, mobileImg.alt, index === 0, [{ width: '750' }]);
      moveInstrumentation(mobileImg, optimizedMobilePic.querySelector('img'));
      optimizedMobilePic.classList.add('d-block', 'd-sm-none', 'w-100', 'banner-mobile-image');
      carouselItem.append(optimizedMobilePic);
    }

    const bannerContentWrapper = document.createElement('div');
    bannerContentWrapper.classList.add('banner-content-wrapper', 'position-absolute');

    // Heading
    const heading = document.createElement('h1');
    heading.classList.add('banner-koi-carousel-heading', 'text-sm-left');
    const headingColor = headingCell.querySelector('h1')?.dataset.color || '#3c2904';
    heading.style.color = headingColor;
    while (headingCell.firstChild) heading.append(headingCell.firstChild);
    bannerContentWrapper.append(heading);

    // Description
    const descriptionDiv = document.createElement('div');
    descriptionDiv.classList.add('banner-koi-carousel-description');
    const descriptionColor = descriptionCell.querySelector('div')?.dataset.descColor || '#3c2904';
    descriptionDiv.style.color = descriptionColor;
    while (descriptionCell.firstChild) descriptionDiv.append(descriptionCell.firstChild);
    // Apply color to direct children of descriptionDiv
    [...descriptionDiv.children].forEach(child => {
      if (child.tagName === 'H3' || child.tagName === 'P') {
        child.style.color = descriptionColor;
        [...child.children].forEach(grandchild => {
          if (grandchild.tagName === 'I') {
            grandchild.style.color = descriptionColor;
          }
        });
      }
    });

    bannerContentWrapper.append(descriptionDiv);

    // CTA Link
    const ctaLink = ctaLinkCell.querySelector('a');
    if (ctaLink) {
      const newCta = document.createElement('a');
      newCta.href = ctaLink.href;
      newCta.target = ctaLink.target;
      newCta.alt = ctaLink.alt;
      newCta.classList.add('banner-koi-carousel-cta', 'btn', 'btn-primary', 'btn-start-now');
      const bgColor = ctaLink.dataset.bgColor || '#6c3003';
      newCta.style.backgroundColor = bgColor;
      moveInstrumentation(ctaLink, newCta);
      while (ctaLink.firstChild) newCta.append(ctaLink.firstChild);
      bannerContentWrapper.append(newCta);
    }

    carouselItem.append(bannerContentWrapper);
    carouselInner.append(carouselItem);
  });

  const bannerNextCarouselBtn = document.createElement('div');
  bannerNextCarouselBtn.classList.add('banner-next-carousel-btn');

  const prevButton = document.createElement('a');
  prevButton.classList.add('carousel-control-prev');
  prevButton.href = `#${carouselId}`;
  prevButton.setAttribute('role', 'button');
  prevButton.addEventListener('click', (e) => {
    e.preventDefault();
    const activeItem = carouselInner.querySelector('.carousel-item.active');
    const activeIndicator = carouselIndicators.querySelector('.active');
    const prevItem = activeItem.previousElementSibling || carouselInner.lastElementChild;
    if (prevItem) {
      activeItem.classList.remove('active');
      activeIndicator.classList.remove('active');
      prevItem.classList.add('active');
      carouselIndicators.children[Array.from(carouselInner.children).indexOf(prevItem)].classList.add('active');
    }
  });

  const prevIcon = document.createElement('span');
  prevIcon.classList.add('carousel-control-prev-icon');
  prevIcon.setAttribute('aria-hidden', 'true');
  prevButton.append(prevIcon);

  const prevSrOnly = document.createElement('span');
  prevSrOnly.classList.add('sr-only');
  prevSrOnly.textContent = 'Previous';
  prevButton.append(prevSrOnly);
  bannerNextCarouselBtn.append(prevButton);

  const nextButton = document.createElement('a');
  nextButton.classList.add('carousel-control-next');
  nextButton.href = `#${carouselId}`;
  nextButton.setAttribute('role', 'button');
  nextButton.addEventListener('click', (e) => {
    e.preventDefault();
    const activeItem = carouselInner.querySelector('.carousel-item.active');
    const activeIndicator = carouselIndicators.querySelector('.active');
    const nextItem = activeItem.nextElementSibling || carouselInner.firstElementChild;
    if (nextItem) {
      activeItem.classList.remove('active');
      activeIndicator.classList.remove('active');
      nextItem.classList.add('active');
      carouselIndicators.children[Array.from(carouselInner.children).indexOf(nextItem)].classList.add('active');
    }
  });

  const nextIcon = document.createElement('span');
  nextIcon.classList.add('carousel-control-next-icon');
  nextIcon.setAttribute('aria-hidden', 'true');
  nextButton.append(nextIcon);

  const nextSrOnly = document.createElement('span');
  nextSrOnly.classList.add('sr-only');
  nextSrOnly.textContent = 'Next';
  nextButton.append(nextSrOnly);
  bannerNextCarouselBtn.append(nextButton);

  block.textContent = '';
  block.append(carouselIndicators, carouselInner, bannerNextCarouselBtn);
}
