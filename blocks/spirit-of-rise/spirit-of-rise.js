import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, subheadingRow, ...cardRows] = [...block.children];

  const section = document.createElement('section');
  // The block already has 'spirit-of-rise' from AEM.
  // Add other classes from original HTML to the root section.
  section.classList.add('grey-bg', 'spirit-of-rise');

  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center', 'pb-3');
  moveInstrumentation(headingRow, sectionHeader);

  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
  // Add data-aos attributes from original HTML
  heading.setAttribute('data-aos-easing', 'ease-in-out');
  heading.setAttribute('data-aos', 'fade-up');
  heading.setAttribute('data-aos-delay', '200');
  heading.textContent = headingRow.textContent.trim();
  sectionHeader.append(heading);

  const subheading = document.createElement('p');
  subheading.classList.add('aos-init', 'aos-animate');
  // Add data-aos attributes from original HTML
  subheading.setAttribute('data-aos', 'fade-up');
  subheading.setAttribute('data-aos-offset', '100');
  subheading.setAttribute('data-aos-duration', '650');
  subheading.setAttribute('data-aos-easing', 'ease-in-out');
  moveInstrumentation(subheadingRow, subheading);
  subheading.textContent = subheadingRow.textContent.trim();
  sectionHeader.append(subheading);

  section.append(sectionHeader);

  const performanceDriven = document.createElement('div');
  performanceDriven.classList.add('performance-driven', 'performace-driven-home');

  const container = document.createElement('div');
  container.classList.add('container');
  performanceDriven.append(container);

  const performaceDrivenCards = document.createElement('div');
  performaceDrivenCards.classList.add('performace-driven-cards');
  container.append(performaceDrivenCards);

  cardRows.forEach((row) => {
    const [imageDesktopCell, imageMobileCell, cardTextCell, cardLinkCell] = [...row.children];

    const cardLink = document.createElement('a');
    cardLink.classList.add('performace-driven-cards-link');
    const foundLink = cardLinkCell.querySelector('a');
    if (foundLink) {
      cardLink.href = foundLink.href;
      // Original HTML has target="_blank", so we should replicate that.
      cardLink.target = '_blank';
    }
    moveInstrumentation(row, cardLink);

    const cardWrapper = document.createElement('div');
    cardWrapper.classList.add('performace-driven-card-wrapper');
    cardLink.append(cardWrapper);

    const cardImage = document.createElement('div');
    cardImage.classList.add('card-image');
    cardWrapper.append(cardImage);

    const pictureDesktop = imageDesktopCell.querySelector('picture');
    const pictureMobile = imageMobileCell.querySelector('picture');

    // Handle image optimization more robustly, ensuring both desktop and mobile sources are used
    // if available, or falling back to one if the other is missing.
    const finalPicture = document.createElement('picture');
    let imgElementForInstrumentation;

    if (pictureMobile) {
      const sourceMobile = pictureMobile.querySelector('source');
      if (sourceMobile) {
        finalPicture.append(sourceMobile.cloneNode(true)); // Clone to avoid moving from original cell
      }
      // Use mobile image as base for optimization if desktop is not present or for mobile view
      const imgMobile = pictureMobile.querySelector('img');
      if (imgMobile) {
        const optimizedImg = createOptimizedPicture(imgMobile.src, imgMobile.alt, false, [{ media: '(max-width: 576px)', width: '576' }]);
        finalPicture.append(optimizedImg.querySelector('img'));
        imgElementForInstrumentation = imgMobile;
      }
    }

    if (pictureDesktop) {
      const imgDesktop = pictureDesktop.querySelector('img');
      if (imgDesktop) {
        // If both mobile and desktop pictures exist, the desktop img should be the default fallback
        // and also the one used for desktop optimization.
        const optimizedImg = createOptimizedPicture(imgDesktop.src, imgDesktop.alt, false, [{ width: '750' }]);
        // If mobile picture was processed, the last img appended will be the mobile one.
        // We need to ensure the desktop img is appended last as the default.
        if (finalPicture.querySelector('img')) {
          finalPicture.querySelector('img').replaceWith(optimizedImg.querySelector('img'));
        } else {
          finalPicture.append(optimizedImg.querySelector('img'));
        }
        imgElementForInstrumentation = imgDesktop;
      }
    }

    if (imgElementForInstrumentation) {
      moveInstrumentation(imgElementForInstrumentation, finalPicture.querySelector('img'));
    }
    if (finalPicture.children.length > 0) {
      cardImage.append(finalPicture);
    }


    const homeBoxCard = document.createElement('div');
    homeBoxCard.classList.add('performace-driven-home-box-card');
    cardWrapper.append(homeBoxCard);

    const desc = document.createElement('p');
    desc.classList.add('desc');
    // cardText is richtext, so innerHTML is correct.
    desc.innerHTML = cardTextCell.innerHTML;
    homeBoxCard.append(desc);

    performaceDrivenCards.append(cardLink);
  });

  section.append(performanceDriven);
  block.replaceChildren(section);
}
