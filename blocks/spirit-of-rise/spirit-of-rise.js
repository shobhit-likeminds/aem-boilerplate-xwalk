import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  const section = document.createElement('section');
  section.classList.add('section', 'grey-bg', 'spirit-of-rise');
  moveInstrumentation(block, section);

  // Section Header
  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center', 'pb-3');

  // Root rows have fixed schema: heading, description, then cards container
  const [headingRow, descriptionRow, ...cardRows] = children;

  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
  heading.setAttribute('data-aos-easing', 'ease-in-out');
  heading.setAttribute('data-aos', 'fade-up');
  heading.setAttribute('data-aos-delay', '200');
  moveInstrumentation(headingRow, heading);
  heading.textContent = headingRow.textContent.trim();
  sectionHeader.append(heading);

  const description = document.createElement('p');
  description.classList.add('aos-init', 'aos-animate');
  description.setAttribute('data-aos', 'fade-up');
  description.setAttribute('data-aos-offset', '100');
  description.setAttribute('data-aos-duration', '650');
  description.setAttribute('data-aos-easing', 'ease-in-out');
  moveInstrumentation(descriptionRow, description);
  description.textContent = descriptionRow.textContent.trim();
  sectionHeader.append(description);

  section.append(sectionHeader);

  // Performance Driven Cards
  const performanceDriven = document.createElement('div');
  performanceDriven.classList.add('performance-driven', 'performace-driven-home');

  const container = document.createElement('div');
  container.classList.add('container');
  performanceDriven.append(container);

  const cardsWrapper = document.createElement('div');
  cardsWrapper.classList.add('performace-driven-cards');
  container.append(cardsWrapper);

  cardRows.forEach((row) => {
    const [imageDesktopCell, imageMobileCell, cardDescriptionCell, cardLinkCell] = [...row.children];

    const link = document.createElement('a');
    link.classList.add('performace-driven-cards-link');
    // For type=aem-content, read the href from the anchor inside the cell
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = cardLinkCell.innerHTML; // Use innerHTML to preserve potential button-container wrapper
    const foundLink = tempDiv.querySelector('a');
    if (foundLink) {
      link.href = foundLink.href;
      link.target = '_blank'; // From original HTML
    }
    moveInstrumentation(row, link); // Move instrumentation from the item row to the top-level link

    const cardWrapper = document.createElement('div');
    cardWrapper.classList.add('performace-driven-card-wrapper');
    link.append(cardWrapper);

    const cardImage = document.createElement('div');
    cardImage.classList.add('card-image');
    cardWrapper.append(cardImage);

    const pictureDesktop = imageDesktopCell.querySelector('picture');
    const imgDesktop = pictureDesktop ? pictureDesktop.querySelector('img') : null;

    const pictureMobile = imageMobileCell.querySelector('picture');
    const imgMobile = pictureMobile ? pictureMobile.querySelector('img') : null;

    if (imgDesktop || imgMobile) {
      const optimizedPicture = document.createElement('picture');

      if (imgMobile) {
        const sourceMobile = document.createElement('source');
        sourceMobile.media = '(max-width: 576px)';
        sourceMobile.srcset = imgMobile.src;
        optimizedPicture.append(sourceMobile);
      }

      if (imgDesktop) {
        const img = createOptimizedPicture(imgDesktop.src, imgDesktop.alt, false, [{ width: '750' }]);
        optimizedPicture.append(img.querySelector('img'));
      }
      cardImage.append(optimizedPicture);
    }

    const homeBoxCard = document.createElement('div');
    homeBoxCard.classList.add('performace-driven-home-box-card');
    cardWrapper.append(homeBoxCard);

    const descriptionP = document.createElement('p');
    descriptionP.classList.add('desc');
    descriptionP.innerHTML = cardDescriptionCell.textContent.trim();
    homeBoxCard.append(descriptionP);

    cardsWrapper.append(link);
  });

  section.append(performanceDriven); // Append performanceDriven to section
  block.replaceChildren(section);
}
