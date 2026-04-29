import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, descriptionRow, ...cardRows] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('section', 'grey-bg', 'spirit-of-rise');

  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center', 'pb-3');
  moveInstrumentation(headingRow, sectionHeader);

  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
  heading.textContent = headingRow.textContent.trim();
  // Add data-aos attributes from ORIGINAL HTML
  heading.setAttribute('data-aos-easing', 'ease-in-out');
  heading.setAttribute('data-aos', 'fade-up');
  heading.setAttribute('data-aos-delay', '200');
  sectionHeader.append(heading);

  const description = document.createElement('p');
  description.classList.add('aos-init', 'aos-animate');
  description.textContent = descriptionRow.textContent.trim();
  // Add data-aos attributes from ORIGINAL HTML
  description.setAttribute('data-aos', 'fade-up');
  description.setAttribute('data-aos-offset', '100');
  description.setAttribute('data-aos-duration', '650');
  description.setAttribute('data-aos-easing', 'ease-in-out');
  sectionHeader.append(description);

  section.append(sectionHeader);

  const performanceDriven = document.createElement('div');
  performanceDriven.classList.add('performance-driven', 'performace-driven-home');

  const container = document.createElement('div');
  container.classList.add('container');

  const cardsContainer = document.createElement('div');
  cardsContainer.classList.add('performace-driven-cards');

  cardRows.forEach((row) => {
    const [imageMobileCell, imageDesktopCell, cardDescriptionCell, cardLinkCell] = [...row.children];

    const cardLink = document.createElement('a');
    cardLink.classList.add('performace-driven-cards-link');
    const foundLink = cardLinkCell.querySelector('a');
    if (foundLink) {
      cardLink.href = foundLink.href;
      cardLink.target = '_blank'; // Assuming target blank from original HTML
    }
    moveInstrumentation(row, cardLink);

    const cardWrapper = document.createElement('div');
    cardWrapper.classList.add('performace-driven-card-wrapper');

    const cardImage = document.createElement('div');
    cardImage.classList.add('card-image');

    const pictureMobile = imageMobileCell.querySelector('picture');
    const pictureDesktop = imageDesktopCell.querySelector('picture');

    if (pictureMobile && pictureDesktop) {
      // The original HTML uses a single picture element with a source for mobile and an img for desktop
      // Recreate that structure.
      const optimizedPicture = document.createElement('picture');

      const sourceMobile = document.createElement('source');
      sourceMobile.media = '(max-width: 576px)';
      sourceMobile.srcset = pictureMobile.querySelector('img').src; // Use mobile picture's img src for mobile srcset
      optimizedPicture.append(sourceMobile);

      const img = document.createElement('img');
      img.src = pictureDesktop.querySelector('img').src; // Use desktop picture's img src for default
      img.alt = pictureDesktop.querySelector('img').alt;
      img.loading = 'lazy';
      optimizedPicture.append(img);

      cardImage.append(optimizedPicture);
    } else if (pictureDesktop) {
      // Fallback if only desktop picture is available, though model implies both
      const img = pictureDesktop.querySelector('img');
      // createOptimizedPicture is not needed here as we are directly appending the img from the picture element
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      cardImage.append(optimizedPic);
    }

    cardWrapper.append(cardImage);

    const cardBox = document.createElement('div');
    cardBox.classList.add('performace-driven-home-box-card');

    const cardDesc = document.createElement('p');
    cardDesc.classList.add('desc');
    cardDesc.textContent = cardDescriptionCell.textContent.trim();
    cardBox.append(cardDesc);

    cardWrapper.append(cardBox);
    cardLink.append(cardWrapper);
    cardsContainer.append(cardLink);
  });

  container.append(cardsContainer);
  performanceDriven.append(container);
  section.append(performanceDriven);

  block.replaceChildren(section);
}
