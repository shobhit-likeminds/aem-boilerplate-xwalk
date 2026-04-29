import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, subheadingRow, ...cardRows] = [...block.children];

  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center', 'pb-3');

  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
  moveInstrumentation(headingRow, heading);
  heading.textContent = headingRow.textContent.trim();
  heading.setAttribute('data-aos-easing', 'ease-in-out');
  heading.setAttribute('data-aos', 'fade-up');
  heading.setAttribute('data-aos-delay', '200');
  sectionHeader.append(heading);

  const subheading = document.createElement('p');
  subheading.classList.add('aos-init', 'aos-animate');
  moveInstrumentation(subheadingRow, subheading);
  subheading.textContent = subheadingRow.textContent.trim();
  subheading.setAttribute('data-aos', 'fade-up');
  subheading.setAttribute('data-aos-offset', '100');
  subheading.setAttribute('data-aos-duration', '650');
  subheading.setAttribute('data-aos-easing', 'ease-in-out');
  sectionHeader.append(subheading);

  const performanceDriven = document.createElement('div');
  performanceDriven.classList.add('performance-driven', 'performace-driven-home');

  const container = document.createElement('div');
  container.classList.add('container');

  const cardsWrapper = document.createElement('div');
  cardsWrapper.classList.add('performace-driven-cards');

  cardRows.forEach((row) => {
    const [imageMobileCell, imageDesktopCell, linkCell, descriptionCell] = [...row.children];

    const linkEl = document.createElement('a');
    linkEl.classList.add('performace-driven-cards-link');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      linkEl.href = foundLink.href;
      linkEl.target = '_blank';
    }

    const cardWrapper = document.createElement('div');
    cardWrapper.classList.add('performace-driven-card-wrapper');

    const cardImage = document.createElement('div');
    cardImage.classList.add('card-image');

    const mobilePicture = imageMobileCell.querySelector('picture');
    const desktopPicture = imageDesktopCell.querySelector('picture');

    if (mobilePicture && desktopPicture) {
      const picture = document.createElement('picture');
      const mobileSource = document.createElement('source');
      mobileSource.media = '(max-width: 576px)';
      mobileSource.srcset = mobilePicture.querySelector('img').src;
      picture.append(mobileSource);

      const desktopImg = document.createElement('img');
      desktopImg.src = desktopPicture.querySelector('img').src;
      desktopImg.alt = desktopPicture.querySelector('img').alt;
      picture.append(desktopImg);

      cardImage.append(picture);
    }
    cardWrapper.append(cardImage);

    const homeBoxCard = document.createElement('div');
    homeBoxCard.classList.add('performace-driven-home-box-card');

    const description = document.createElement('p');
    description.classList.add('desc');
    description.innerHTML = descriptionCell.innerHTML;
    homeBoxCard.append(description);

    cardWrapper.append(homeBoxCard);
    linkEl.append(cardWrapper);
    moveInstrumentation(row, linkEl);
    cardsWrapper.append(linkEl);
  });

  container.append(cardsWrapper);
  performanceDriven.append(container);

  const section = document.createElement('section');
  section.classList.add('section', 'grey-bg', 'spirit-of-rise');
  section.append(sectionHeader);
  section.append(performanceDriven);

  block.replaceChildren(section);

  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
