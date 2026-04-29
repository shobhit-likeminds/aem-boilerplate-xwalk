import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, subheadingRow, ...cardRows] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('section', 'grey-bg', 'spirit-of-rise');

  const headerDiv = document.createElement('div');
  headerDiv.classList.add('section-header', 'text-center', 'pb-3');
  moveInstrumentation(headingRow, headerDiv);

  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
  heading.textContent = headingRow.textContent.trim();
  // Add data-aos attributes from original HTML
  heading.dataset.aosEasing = 'ease-in-out';
  heading.dataset.aos = 'fade-up';
  heading.dataset.aosDelay = '200';
  headerDiv.append(heading);

  const subheading = document.createElement('p');
  subheading.classList.add('aos-init', 'aos-animate');
  subheading.textContent = subheadingRow.textContent.trim();
  // Add data-aos attributes from original HTML
  subheading.dataset.aos = 'fade-up';
  subheading.dataset.aosOffset = '100';
  subheading.dataset.aosDuration = '650';
  subheading.dataset.aosEasing = 'ease-in-out';
  headerDiv.append(subheading);

  section.append(headerDiv);

  const performanceDriven = document.createElement('div');
  performanceDriven.classList.add('performance-driven', 'performace-driven-home');

  const container = document.createElement('div');
  container.classList.add('container');

  const cardsWrapper = document.createElement('div');
  cardsWrapper.classList.add('performace-driven-cards');

  cardRows.forEach((row) => {
    const [imageMobileCell, imageDesktopCell, descriptionCell, cardLinkCell] = [...row.children];

    const cardLink = document.createElement('a');
    cardLink.classList.add('performace-driven-cards-link');
    const foundLink = cardLinkCell.querySelector('a');
    if (foundLink) {
      cardLink.href = foundLink.href;
      // Only set target="_blank" if it was present in the original HTML link
      if (foundLink.target === '_blank') {
        cardLink.target = '_blank';
      }
    }
    moveInstrumentation(row, cardLink);

    const cardWrapper = document.createElement('div');
    cardWrapper.classList.add('performace-driven-card-wrapper');

    const cardImage = document.createElement('div');
    cardImage.classList.add('card-image');

    const pictureMobile = imageMobileCell.querySelector('picture');
    const pictureDesktop = imageDesktopCell.querySelector('picture');

    if (pictureMobile && pictureDesktop) {
      const sourceMobile = document.createElement('source');
      sourceMobile.media = '(max-width: 576px)';
      sourceMobile.srcset = pictureMobile.querySelector('img').src;

      const img = document.createElement('img');
      img.src = pictureDesktop.querySelector('img').src;
      img.alt = pictureDesktop.querySelector('img').alt;

      const newPicture = document.createElement('picture');
      newPicture.append(sourceMobile, img);
      cardImage.append(newPicture);

      // Optimize images
      cardImage.querySelectorAll('picture > img').forEach((imgEl) => {
        const optimizedPic = createOptimizedPicture(imgEl.src, imgEl.alt, false, [{ width: '750' }]);
        moveInstrumentation(imgEl, optimizedPic.querySelector('img'));
        imgEl.closest('picture').replaceWith(optimizedPic);
      });
    }

    const homeBoxCard = document.createElement('div');
    homeBoxCard.classList.add('performace-driven-home-box-card');

    const description = document.createElement('p');
    description.classList.add('desc');
    description.innerHTML = descriptionCell.innerHTML; // richtext content

    homeBoxCard.append(description);
    cardWrapper.append(cardImage, homeBoxCard);
    cardLink.append(cardWrapper);
    cardsWrapper.append(cardLink);
  });

  container.append(cardsWrapper);
  performanceDriven.append(container);
  section.append(performanceDriven);

  block.replaceChildren(section);
}
