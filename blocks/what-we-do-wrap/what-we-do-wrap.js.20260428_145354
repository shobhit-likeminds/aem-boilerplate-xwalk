import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const [sectionHeadingRow, sectionDescriptionRow, ...businessVerticalRows] = [...block.children];

  const root = document.createElement('div');
  root.classList.add('section', 'what-we-do-wrap');

  const container = document.createElement('div');
  container.classList.add('container');
  root.append(container);

  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center');
  container.append(sectionHeader);

  // Section Heading
  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular');
  moveInstrumentation(sectionHeadingRow, heading);
  heading.textContent = sectionHeadingRow.textContent.trim();
  sectionHeader.append(heading);

  // Section Description
  const description = document.createElement('p');
  moveInstrumentation(sectionDescriptionRow, description);
  description.innerHTML = sectionDescriptionRow.innerHTML;
  sectionHeader.append(description);

  // Our Business Verticals
  const ourBusinessVerticals = document.createElement('div');
  ourBusinessVerticals.classList.add('our-business-verticals');
  root.append(ourBusinessVerticals);

  // Desktop View
  const desktopContainer = document.createElement('div');
  desktopContainer.classList.add('container', 'd-lg-block', 'd-none');
  ourBusinessVerticals.append(desktopContainer);

  const desktopRow = document.createElement('div');
  desktopRow.classList.add('row', 'row-cols-lg-3', 'row-cols-1', 'g-3');
  desktopContainer.append(desktopRow);

  // Mobile View - Flickity based slider
  const mobileContainer = document.createElement('div');
  mobileContainer.classList.add('container', 'd-lg-none', 'd-block');
  ourBusinessVerticals.append(mobileContainer);

  const mobileSlider = document.createElement('div');
  mobileSlider.classList.add('mobile-slider');
  // Add data-flickity attribute from ORIGINAL HTML for Flickity initialization
  mobileSlider.setAttribute('data-flickity', '{ "wrapAround": false, "lazyLoad": true, "pageDots": true, "prevNextButtons": false, "imagesLoaded": true, "cellAlign": "left", "adaptiveHeight": true }');
  mobileContainer.append(mobileSlider);

  const mobileSlidesWrapper = document.createElement('div');
  mobileSlidesWrapper.classList.add('flickity-slider');
  mobileSlider.append(mobileSlidesWrapper);

  // Group items for mobile slider (3 items per slide)
  const mobileSlides = [];
  for (let i = 0; i < businessVerticalRows.length; i += 3) {
    mobileSlides.push(businessVerticalRows.slice(i, i + 3));
  }

  businessVerticalRows.forEach((row) => {
    const [mainImageDesktopCell, mainImageMobileCell, titleCell, iconCell, ctaLinkCell, ctaAriaLabelCell] = [...row.children];

    // Create item wrap for desktop
    const colDesktop = document.createElement('div');
    colDesktop.classList.add('col');
    desktopRow.append(colDesktop);

    const wrapDesktop = document.createElement('div');
    wrapDesktop.classList.add('wrap');
    colDesktop.append(wrapDesktop);

    const imageDesktop = document.createElement('div');
    imageDesktop.classList.add('image');
    wrapDesktop.append(imageDesktop);

    const desktopPicture = mainImageDesktopCell.querySelector('picture');
    if (desktopPicture) {
      const optimizedPic = createOptimizedPicture(
        desktopPicture.querySelector('img').src,
        desktopPicture.querySelector('img').alt,
        false,
        [{ media: '(min-width: 992px)', width: '376' }, { media: '(min-width: 450px)', width: '376' }, { width: '376' }],
      );
      moveInstrumentation(desktopPicture, optimizedPic.querySelector('img'));
      imageDesktop.append(optimizedPic);
    }

    const titleDivDesktop = document.createElement('div');
    titleDivDesktop.classList.add('title');
    titleDivDesktop.textContent = titleCell.textContent.trim();
    wrapDesktop.append(titleDivDesktop);

    const iconPicture = iconCell.querySelector('picture');
    if (iconPicture) {
      const iconImg = iconPicture.querySelector('img');
      const optimizedIcon = createOptimizedPicture(
        iconImg.src,
        iconImg.alt,
        false,
        [{ width: '10' }],
      );
      moveInstrumentation(iconImg, optimizedIcon.querySelector('img'));
      titleDivDesktop.append(optimizedIcon);
    }

    const ctaLinkDesktop = document.createElement('a');
    ctaLinkDesktop.classList.add('stretched-link');
    const originalCtaLink = ctaLinkCell.querySelector('a');
    if (originalCtaLink) {
      ctaLinkDesktop.href = originalCtaLink.href;
    }
    ctaLinkDesktop.setAttribute('aria-label', ctaAriaLabelCell.textContent.trim());
    moveInstrumentation(ctaLinkCell, ctaLinkDesktop);
    wrapDesktop.append(ctaLinkDesktop);

    // Move instrumentation for the entire row to the desktop column
    moveInstrumentation(row, colDesktop);
  });

  // Mobile slider content
  mobileSlides.forEach((slideItems) => {
    const slideDiv = document.createElement('div');
    slideDiv.classList.add('slides');
    // Flickity adds 'is-selected' dynamically, do not add it here.
    mobileSlidesWrapper.append(slideDiv);

    const slideRow = document.createElement('div');
    slideRow.classList.add('row', 'row-cols-1', 'gy-3');
    slideDiv.append(slideRow);

    slideItems.forEach((itemRow) => {
      const [mainImageDesktopCell, mainImageMobileCell, titleCell, iconCell, ctaLinkCell, ctaAriaLabelCell] = [...itemRow.children];

      const colMobile = document.createElement('div');
      colMobile.classList.add('col');
      slideRow.append(colMobile);

      const wrapMobile = document.createElement('div');
      wrapMobile.classList.add('wrap');
      colMobile.append(wrapMobile);

      const imageMobile = document.createElement('div');
      imageMobile.classList.add('image');
      wrapMobile.append(imageMobile);

      const mobilePicture = mainImageMobileCell.querySelector('picture');
      if (mobilePicture) {
        const optimizedPic = createOptimizedPicture(
          mobilePicture.querySelector('img').src,
          mobilePicture.querySelector('img').alt,
          false,
          [{ media: '(min-width: 992px)', width: '376' }, { media: '(min-width: 450px)', width: '376' }, { width: '376' }],
        );
        moveInstrumentation(mobilePicture, optimizedPic.querySelector('img'));
        imageMobile.append(optimizedPic);
      }

      const titleDivMobile = document.createElement('div');
      titleDivMobile.classList.add('title');
      titleDivMobile.textContent = titleCell.textContent.trim();
      wrapMobile.append(titleDivMobile);

      const iconPicture = iconCell.querySelector('picture');
      if (iconPicture) {
        const iconImg = iconPicture.querySelector('img');
        const optimizedIcon = createOptimizedPicture(
          iconImg.src,
          iconImg.alt,
          false,
          [{ width: '10' }],
        );
        moveInstrumentation(iconImg, optimizedIcon.querySelector('img'));
        titleDivMobile.append(optimizedIcon);
      }

      const ctaLinkMobile = document.createElement('a');
      ctaLinkMobile.classList.add('stretched-link');
      const originalCtaLink = ctaLinkCell.querySelector('a');
      if (originalCtaLink) {
        ctaLinkMobile.href = originalCtaLink.href;
      }
      ctaLinkMobile.setAttribute('aria-label', ctaAriaLabelCell.textContent.trim());
      moveInstrumentation(ctaLinkCell, ctaLinkMobile);
      wrapMobile.append(ctaLinkMobile);
    });
  });

  block.replaceChildren(root);

  // Flickity initialization for mobile slider
  // Original HTML has data-flickity attribute, indicating Flickity.js is used.
  // We need to load it and initialize it.
  await loadCSS('https://unpkg.com/flickity@2/dist/flickity.min.css');
  await loadScript('https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js');

  // eslint-disable-next-line no-undef
  new Flickity(mobileSlider, {
    wrapAround: mobileSlider.dataset.flickity.includes('"wrapAround": true'),
    lazyLoad: mobileSlider.dataset.flickity.includes('"lazyLoad": true'),
    pageDots: mobileSlider.dataset.flickity.includes('"pageDots": true'),
    prevNextButtons: mobileSlider.dataset.flickity.includes('"prevNextButtons": true'),
    imagesLoaded: mobileSlider.dataset.flickity.includes('"imagesLoaded": true'),
    cellAlign: mobileSlider.dataset.flickity.includes('"cellAlign": "left"') ? 'left' : 'center', // Default to center if not specified
    adaptiveHeight: mobileSlider.dataset.flickity.includes('"adaptiveHeight": true'),
  });
}
