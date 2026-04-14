import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, descriptionRow, ...businessVerticalRows] = [...block.children];

  // Section container
  const section = document.createElement('section');
  section.classList.add('section', 'what-we-do-wrap');
  moveInstrumentation(block, section);

  // Main container
  const container = document.createElement('div');
  container.classList.add('container');
  section.append(container);

  // Section header
  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center');
  container.append(sectionHeader);

  // Heading
  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
  moveInstrumentation(headingRow, heading);
  heading.textContent = headingRow.firstElementChild.textContent.trim();
  sectionHeader.append(heading);

  // Description
  const description = document.createElement('p');
  description.classList.add('aos-init', 'aos-animate');
  moveInstrumentation(descriptionRow, description);
  description.textContent = descriptionRow.firstElementChild.textContent.trim();
  sectionHeader.append(description);

  // Our Business Verticals container
  const ourBusinessVerticals = document.createElement('div');
  ourBusinessVerticals.classList.add('our-business-verticals');
  section.append(ourBusinessVerticals);

  // Desktop view
  const desktopContainer = document.createElement('div');
  desktopContainer.classList.add('container', 'd-lg-block', 'd-none');
  ourBusinessVerticals.append(desktopContainer);

  const desktopRow = document.createElement('div');
  desktopRow.classList.add('row', 'row-cols-lg-3', 'row-cols-1', 'g-3');
  desktopContainer.append(desktopRow);

  // Mobile view (slider)
  const mobileContainer = document.createElement('div');
  mobileContainer.classList.add('container', 'd-lg-none', 'd-block', 'aos-init', 'aos-animate');
  ourBusinessVerticals.append(mobileContainer);

  const mobileSlider = document.createElement('div');
  mobileSlider.classList.add('mobile-slider', 'flickity-enabled', 'is-draggable');
  mobileSlider.setAttribute('data-flickity', '{ "wrapAround": false, "lazyLoad": true, "pageDots": true, "prevNextButtons": false, "imagesLoaded": true, "cellAlign": "left", "adaptiveHeight": true }');
  mobileContainer.append(mobileSlider);

  const flickityViewport = document.createElement('div');
  flickityViewport.classList.add('flickity-viewport');
  mobileSlider.append(flickityViewport);

  const flickitySlider = document.createElement('div');
  flickitySlider.classList.add('flickity-slider');
  flickityViewport.append(flickitySlider);

  // Group items for mobile slider (3 items per slide)
  const mobileSlides = [];
  for (let i = 0; i < businessVerticalRows.length; i += 3) {
    mobileSlides.push(businessVerticalRows.slice(i, i + 3));
  }

  mobileSlides.forEach((slideRows, slideIndex) => {
    const slide = document.createElement('div');
    slide.classList.add('slides');
    if (slideIndex === 0) {
      slide.classList.add('is-selected');
    } else {
      slide.setAttribute('aria-hidden', 'true');
    }
    flickitySlider.append(slide);

    const mobileSlideRow = document.createElement('div');
    mobileSlideRow.classList.add('row', 'row-cols-1', 'gy-3');
    slide.append(mobileSlideRow);

    slideRows.forEach((row) => {
      // No row.children[n] violations here, destructuring is safe
      const [imageCell, titleCell, linkCell, linkLabelCell] = [...row.children];

      // Create item for desktop
      const desktopCol = document.createElement('div');
      desktopCol.classList.add('col', 'aos-init', 'aos-animate');
      moveInstrumentation(row, desktopCol);

      const wrap = document.createElement('div');
      wrap.classList.add('wrap');
      desktopCol.append(wrap);

      const imageDiv = document.createElement('div');
      imageDiv.classList.add('image');
      wrap.append(imageDiv);

      const picture = imageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '376' }]);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          imageDiv.append(optimizedPic);
        }
      }

      const titleDiv = document.createElement('div');
      titleDiv.classList.add('title');
      moveInstrumentation(titleCell, titleDiv);
      titleDiv.innerHTML = titleCell.innerHTML; // Keep any inner HTML like the SVG icon

      wrap.append(titleDiv);

      const anchor = document.createElement('a');
      anchor.classList.add('stretched-link');
      const foundLink = linkCell.querySelector('a');
      if (foundLink) {
        anchor.href = foundLink.href;
      }
      anchor.setAttribute('aria-label', linkLabelCell.textContent.trim());
      wrap.append(anchor);

      desktopRow.append(desktopCol);

      // Create item for mobile slider
      const mobileCol = desktopCol.cloneNode(true); // Clone the desktop item for mobile
      mobileSlideRow.append(mobileCol);
    });
  });

  // Add flickity page dots for mobile
  const pageDots = document.createElement('ol');
  pageDots.classList.add('flickity-page-dots');
  mobileSlider.append(pageDots);

  const dots = [];
  mobileSlides.forEach((_, index) => {
    const dot = document.createElement('li');
    dot.classList.add('dot');
    dot.setAttribute('aria-label', `Page dot ${index + 1}`);
    if (index === 0) {
      dot.classList.add('is-selected');
      dot.setAttribute('aria-current', 'step');
    }
    pageDots.append(dot);
    dots.push(dot);
  });

  // Interactivity for Flickity slider
  // The Flickity library itself handles most of the interaction,
  // but we need to ensure our custom page dots reflect the slider state.
  // Assuming Flickity is initialized externally or via data-flickity attribute.
  // We'll add event listeners to update the custom dots.
  if (mobileSlides.length > 1) {
    // Add event listener for Flickity's 'select' event to update page dots
    mobileSlider.addEventListener('select', (event) => {
      const selectedIndex = event.detail.selectedIndex;
      dots.forEach((dot, index) => {
        if (index === selectedIndex) {
          dot.classList.add('is-selected');
          dot.setAttribute('aria-current', 'step');
        } else {
          dot.classList.remove('is-selected');
          dot.removeAttribute('aria-current');
        }
      });

      // Update slides' aria-hidden attribute
      const allSlides = flickitySlider.querySelectorAll('.slides');
      allSlides.forEach((slide, index) => {
        if (index === selectedIndex) {
          slide.removeAttribute('aria-hidden');
        } else {
          slide.setAttribute('aria-hidden', 'true');
        }
      });
    });

    // Add event listener for Flickity's 'change' event to update slide visibility
    mobileSlider.addEventListener('change', (event) => {
      const selectedIndex = event.detail.selectedIndex;
      const allSlides = flickitySlider.querySelectorAll('.slides');
      allSlides.forEach((slide, index) => {
        if (index === selectedIndex) {
          slide.classList.add('is-selected');
        } else {
          slide.classList.remove('is-selected');
        }
      });
    });
  }

  block.textContent = '';
  block.append(section);
}
