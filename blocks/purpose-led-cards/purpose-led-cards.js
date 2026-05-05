import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  const section = document.createElement('section');
  section.classList.add('section', 'grey-bg'); // Removed 'spirit-of-rise' as it's the block name
  // The outer block div already has 'purpose-led-cards' and 'spirit-of-rise' from AEM.

  const container = document.createElement('div');
  container.classList.add('container');
  section.append(container);

  // Section Header
  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center', 'pb-3');
  container.append(sectionHeader);

  // Heading and Description rows
  const [headingRow, descriptionRow, ...cardRows] = children; // Destructure first two rows, rest are cards

  // Heading
  const headingCell = headingRow.children[0];
  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
  heading.setAttribute('data-aos-easing', 'ease-in-out');
  heading.setAttribute('data-aos', 'fade-up');
  heading.setAttribute('data-aos-delay', '200');
  moveInstrumentation(headingRow, heading);
  heading.innerHTML = headingCell?.innerHTML || ''; // BlockJson says richtext
  sectionHeader.append(heading);

  // Description
  const descriptionCell = descriptionRow.children[0];
  const description = document.createElement('p');
  description.classList.add('aos-init', 'aos-animate');
  description.setAttribute('data-aos', 'fade-up');
  description.setAttribute('data-aos-offset', '100');
  description.setAttribute('data-aos-duration', '650');
  description.setAttribute('data-aos-easing', 'ease-in-out');
  moveInstrumentation(descriptionRow, description);
  // BlockJson says 'description' is type=text, but ORIGINAL HTML shows <p> tags.
  // Using innerHTML to preserve potential formatting, or textContent if strictly plain text.
  // Given the original HTML has <br/> tags, innerHTML is safer.
  description.innerHTML = descriptionCell?.innerHTML || '';
  sectionHeader.append(description);

  // Cards Grid
  const purposeLedGrid = document.createElement('div');
  purposeLedGrid.classList.add('row', 'g-4', 'purpose-led-grid', 'pt-3');
  container.append(purposeLedGrid);

  cardRows.forEach((row) => {
    const [imageDesktopCell, imageMobileCell, linkCell, cardDescriptionCell] = [...row.children];

    const col = document.createElement('div');
    col.classList.add('col-md-6', 'aos-init', 'aos-animate');
    col.setAttribute('data-aos-easing', 'ease-in-out');
    col.setAttribute('data-aos', 'fade-up');
    col.setAttribute('data-aos-delay', '700'); // Assuming a fixed delay for all cards

    const cardWrap = document.createElement('a');
    cardWrap.classList.add('card-wrap');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      cardWrap.href = foundLink.href;
      cardWrap.target = '_blank'; // Assuming target blank from original HTML
    }
    moveInstrumentation(row, cardWrap);

    const cardImage = document.createElement('div');
    cardImage.classList.add('card-image');

    const pictureDesktop = imageDesktopCell.querySelector('picture');
    const pictureMobile = imageMobileCell.querySelector('picture');

    if (pictureDesktop || pictureMobile) {
      const picture = document.createElement('picture');
      if (pictureMobile) {
        const sourceMobile = document.createElement('source');
        sourceMobile.media = '(max-width: 576px)';
        sourceMobile.srcset = pictureMobile.querySelector('img')?.src;
        picture.append(sourceMobile);
      }
      if (pictureDesktop) {
        const img = document.createElement('img');
        img.src = pictureDesktop.querySelector('img')?.src;
        img.alt = pictureDesktop.querySelector('img')?.alt || '';
        img.classList.add('img-fluid');
        picture.append(img);
      }
      cardImage.append(picture);
    }
    cardWrap.append(cardImage);

    const cardText = document.createElement('div');
    cardText.classList.add('card-text');

    const descP = document.createElement('p');
    descP.classList.add('desc');
    descP.innerHTML = cardDescriptionCell?.innerHTML || '';
    cardText.append(descP);
    cardWrap.append(cardText);

    col.append(cardWrap);
    purposeLedGrid.append(col);
  });

  block.replaceChildren(section);

  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
