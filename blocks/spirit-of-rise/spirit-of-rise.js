import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, subheadingRow, ...cardRows] = [...block.children];

  const root = document.createElement('div');
  // Add the block's own class and grey-bg from ORIGINAL HTML section
  root.classList.add('spirit-of-rise', 'grey-bg');

  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center', 'pb-3');

  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
  // Add data attributes from ORIGINAL HTML
  heading.dataset.aosEasing = 'ease-in-out';
  heading.dataset.aos = 'fade-up';
  heading.dataset.aosDelay = '200';
  moveInstrumentation(headingRow, heading);
  heading.textContent = headingRow.textContent.trim();
  sectionHeader.append(heading);

  const subheading = document.createElement('p');
  subheading.classList.add('aos-init', 'aos-animate');
  // Add data attributes from ORIGINAL HTML
  subheading.dataset.aos = 'fade-up';
  subheading.dataset.aosOffset = '100';
  subheading.dataset.aosDuration = '650';
  subheading.dataset.aosEasing = 'ease-in-out';
  moveInstrumentation(subheadingRow, subheading);
  subheading.textContent = subheadingRow.textContent.trim();
  sectionHeader.append(subheading);

  root.append(sectionHeader);

  const performanceDriven = document.createElement('div');
  performanceDriven.classList.add('performance-driven', 'performace-driven-home');

  const container = document.createElement('div');
  container.classList.add('container');
  performanceDriven.append(container);

  const performaceDrivenCards = document.createElement('div');
  performaceDrivenCards.classList.add('performace-driven-cards');
  container.append(performaceDrivenCards);

  cardRows.forEach((row) => {
    const [imageMobileCell, imageDesktopCell, linkCell, descriptionCell] = [...row.children];

    const linkEl = document.createElement('a');
    linkEl.classList.add('performace-driven-cards-link');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      linkEl.href = foundLink.href;
      linkEl.target = '_blank'; // Assuming target blank from original HTML
    }
    moveInstrumentation(row, linkEl); // Move instrumentation from the original row to the new link element

    const cardWrapper = document.createElement('div');
    cardWrapper.classList.add('performace-driven-card-wrapper');
    linkEl.append(cardWrapper);

    const cardImage = document.createElement('div');
    cardImage.classList.add('card-image');
    cardWrapper.append(cardImage);

    // Optimized picture for mobile and desktop
    const mobilePicture = imageMobileCell.querySelector('picture');
    const desktopPicture = imageDesktopCell.querySelector('picture');

    if (mobilePicture && desktopPicture) {
      const imgMobile = mobilePicture.querySelector('img');
      const imgDesktop = desktopPicture.querySelector('img');

      const picture = document.createElement('picture');
      const sourceMobile = document.createElement('source');
      sourceMobile.media = '(max-width: 576px)';
      sourceMobile.srcset = imgMobile.src;
      picture.append(sourceMobile);

      const img = document.createElement('img');
      img.src = imgDesktop.src;
      img.alt = imgDesktop.alt;
      img.loading = 'lazy'; // Add lazy loading as per best practices

      picture.append(img);
      cardImage.append(picture);
    } else if (desktopPicture) {
      // Fallback if only desktop image is provided
      const imgDesktop = desktopPicture.querySelector('img');
      // Ensure alt text is passed correctly
      const optimizedPic = createOptimizedPicture(imgDesktop.src, imgDesktop.alt, false, [{ width: '750' }]);
      cardImage.append(optimizedPic);
    }


    const homeBoxCard = document.createElement('div');
    homeBoxCard.classList.add('performace-driven-home-box-card');
    cardWrapper.append(homeBoxCard);

    const description = document.createElement('p');
    description.classList.add('desc');
    description.innerHTML = descriptionCell.innerHTML; // Use innerHTML for richtext
    homeBoxCard.append(description);

    performaceDrivenCards.append(linkEl);
  });

  root.append(performanceDriven);

  block.replaceChildren(root);
}
