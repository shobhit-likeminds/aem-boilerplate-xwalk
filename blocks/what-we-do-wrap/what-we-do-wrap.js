import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center');

  // CHECK 0 & 1: Replaced row.children[n] with content detection for heading and description
  const headingRow = children.find((row) => row.querySelector('h1, h2, h3, h4, h5, h6'));
  if (headingRow) {
    const headingEl = document.createElement('h2');
    headingEl.classList.add('heading', 'font-regular');
    moveInstrumentation(headingRow, headingEl);
    headingEl.textContent = headingRow.firstElementChild.textContent.trim();
    sectionHeader.append(headingEl);
  }

  const descriptionRow = children.find((row) => row.querySelector('p') && !row.querySelector('h1, h2, h3, h4, h5, h6'));
  if (descriptionRow) {
    const descriptionEl = document.createElement('p');
    moveInstrumentation(descriptionRow, descriptionEl);
    while (descriptionRow.firstElementChild) {
      descriptionEl.append(descriptionRow.firstElementChild);
    }
    sectionHeader.append(descriptionEl);
  }

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container');
  containerDiv.append(sectionHeader);
  block.append(containerDiv);

  const ourBusinessVerticals = document.createElement('div');
  ourBusinessVerticals.classList.add('our-business-verticals');

  // Desktop view
  const desktopContainer = document.createElement('div');
  desktopContainer.classList.add('container', 'd-lg-block', 'd-none');
  const desktopRow = document.createElement('div');
  desktopRow.classList.add('row', 'row-cols-lg-3', 'row-cols-1', 'g-3');

  // Mobile view (Flickity structure)
  const mobileContainer = document.createElement('div');
  mobileContainer.classList.add('container', 'd-lg-none', 'd-block');
  mobileContainer.setAttribute('data-aos', 'fade-up');
  mobileContainer.setAttribute('data-aos-offset', '100');
  mobileContainer.setAttribute('data-aos-duration', '650');
  mobileContainer.setAttribute('data-aos-easing', 'ease-in-out');

  const mobileSlider = document.createElement('div');
  mobileSlider.classList.add('mobile-slider', 'flickity-enabled', 'is-draggable');
  mobileSlider.setAttribute('tabindex', '0');

  const flickityViewport = document.createElement('div');
  flickityViewport.classList.add('flickity-viewport');
  const flickitySlider = document.createElement('div');
  flickitySlider.classList.add('flickity-slider');

  const mobileSlides = [];
  let currentMobileSlide = null;
  let mobileItemCount = 0;
  let desktopItemIndex = 0; // To correctly apply data-aos-delay

  // Filter out header/description rows to get only item rows
  const itemRows = children.filter((row) => !row.querySelector('h1, h2, h3, h4, h5, h6') && !row.querySelector('p'));

  itemRows.forEach((row) => {
    // CHECK 0: Replaced row.children[n] with content detection for item cells
    const cells = [...row.children];
    const imageCell = cells.find((cell) => cell.querySelector('picture'));
    const titleCell = cells.find((cell) => !cell.querySelector('picture') && !cell.querySelector('a') && cell.textContent.trim().length > 0);
    const iconCell = cells.find((cell) => cell.querySelector('picture') && cell !== imageCell);
    const linkCell = cells.find((cell) => cell.querySelector('a'));
    const linkLabelCell = cells.find((cell) => cell !== imageCell && cell !== titleCell && cell !== iconCell && cell !== linkCell);

    // Create item for desktop
    const col = document.createElement('div');
    col.classList.add('col');
    col.setAttribute('data-aos', 'fade-up');
    col.setAttribute('data-aos-delay', `${(desktopItemIndex % 3) * 300 + 100}`);

    const wrap = document.createElement('div');
    wrap.classList.add('wrap');

    const imageDiv = document.createElement('div');
    imageDiv.classList.add('image');
    if (imageCell) {
      const picture = imageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ media: '(min-width: 992px)', width: '376' }, { media: '(min-width: 450px)', width: '376' }, { width: '376' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        imageDiv.append(optimizedPic);
        optimizedPic.querySelector('img').classList.add('img-fluid');
      }
    }
    wrap.append(imageDiv);

    const titleDiv = document.createElement('div');
    titleDiv.classList.add('title');
    if (titleCell) {
      titleDiv.textContent = titleCell.textContent.trim();
    }
    if (iconCell) {
      const iconPic = iconCell.querySelector('picture');
      if (iconPic) {
        const iconImg = iconPic.querySelector('img');
        const optimizedIcon = createOptimizedPicture(iconImg.src, iconImg.alt, false, [{ width: '10' }]);
        moveInstrumentation(iconImg, optimizedIcon.querySelector('img'));
        titleDiv.append(optimizedIcon);
      }
    }
    wrap.append(titleDiv);

    const anchor = document.createElement('a');
    const foundLink = linkCell ? linkCell.querySelector('a') : null;
    if (foundLink) {
      anchor.href = foundLink.href;
      anchor.setAttribute('aria-label', `Learn more about ${linkLabelCell ? linkLabelCell.textContent.trim() : titleCell.textContent.trim()}`);
    }
    anchor.classList.add('stretched-link');
    moveInstrumentation(row, anchor);

    wrap.append(anchor);
    col.append(wrap);
    desktopRow.append(col);
    desktopItemIndex += 1;

    // Create item for mobile slider
    if (mobileItemCount % 3 === 0) {
      currentMobileSlide = document.createElement('div');
      currentMobileSlide.classList.add('slides');
      if (mobileItemCount === 0) currentMobileSlide.classList.add('is-selected');
      const mobileRow = document.createElement('div');
      mobileRow.classList.add('row', 'row-cols-1', 'gy-3');
      currentMobileSlide.append(mobileRow);
      mobileSlides.push(currentMobileSlide);
    }

    const mobileCol = document.createElement('div');
    mobileCol.classList.add('col');
    const mobileWrap = document.createElement('div');
    mobileWrap.classList.add('wrap');
    mobileWrap.append(imageDiv.cloneNode(true));
    mobileWrap.append(titleDiv.cloneNode(true));
    mobileWrap.append(anchor.cloneNode(true));
    mobileCol.append(mobileWrap);
    currentMobileSlide.querySelector('.row').append(mobileCol);

    mobileItemCount += 1;
  });

  desktopContainer.append(desktopRow);
  ourBusinessVerticals.append(desktopContainer);

  mobileSlides.forEach(slide => flickitySlider.append(slide));
  flickityViewport.append(flickitySlider);
  mobileSlider.append(flickityViewport);

  const pageDots = document.createElement('ol');
  pageDots.classList.add('flickity-page-dots');
  for (let i = 0; i < mobileSlides.length; i += 1) {
    const dot = document.createElement('li');
    dot.classList.add('dot');
    dot.setAttribute('aria-label', `Page dot ${i + 1}`);
    if (i === 0) dot.classList.add('is-selected');
    pageDots.append(dot);
  }
  mobileSlider.append(pageDots);

  mobileContainer.append(mobileSlider);
  ourBusinessVerticals.append(mobileContainer);

  block.textContent = '';
  block.append(containerDiv);
  block.append(ourBusinessVerticals);

  // CHECK 2: Add event listeners for mobile slider dots
  const dots = block.querySelectorAll('.flickity-page-dots .dot');
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      // Remove 'is-selected' from all dots and slides
      block.querySelectorAll('.flickity-page-dots .dot').forEach(d => d.classList.remove('is-selected'));
      block.querySelectorAll('.flickity-slider .slides').forEach(s => s.classList.remove('is-selected'));

      // Add 'is-selected' to the clicked dot and corresponding slide
      dot.classList.add('is-selected');
      mobileSlides[index].classList.add('is-selected');

      // Simulate flickity slider movement (basic implementation)
      flickitySlider.style.transform = `translateX(-${index * 100}%)`;
    });
  });

  // Final image optimization (if any remaining pictures are not handled)
  block.querySelectorAll('picture > img').forEach((img) => {
    // Ensure this only runs for images not already optimized or handled
    if (!img.closest('.image') && !img.closest('.title')) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      img.closest('picture').replaceWith(optimizedPic);
    }
  });
}
