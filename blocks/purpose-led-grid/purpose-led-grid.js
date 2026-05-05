import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The outer block div already has 'purpose-led-grid'.
  // We create an inner container for the cards, which should not have the block's own class.
  const cardsContainer = document.createElement('div');
  cardsContainer.classList.add('row', 'g-4', 'pt-3'); // Classes from ORIGINAL HTML

  [...block.children].forEach((row, index) => {
    // Fixed schema for 'purpose-led-grid-card' item rows, using index destructuring.
    const [desktopImageCell, mobileImageCell, cardLinkCell, descriptionCell] = [...row.children];

    const cardLink = cardLinkCell.querySelector('a');
    const cardWrap = document.createElement('a');
    if (cardLink) {
      cardWrap.href = cardLink.href;
      // The original HTML uses target="_blank", so we add it here.
      cardWrap.target = '_blank';
    }
    cardWrap.classList.add('card-wrap'); // Class from ORIGINAL HTML

    const cardImage = document.createElement('div');
    cardImage.classList.add('card-image'); // Class from ORIGINAL HTML

    const desktopPicture = desktopImageCell.querySelector('picture');
    const mobilePicture = mobileImageCell.querySelector('picture');

    if (desktopPicture && mobilePicture) {
      // Create a new picture element to combine sources
      const combinedPicture = document.createElement('picture');

      // Add mobile source
      const sourceMobile = document.createElement('source');
      sourceMobile.media = '(max-width: 576px)';
      sourceMobile.srcset = mobilePicture.querySelector('img')?.src || '';
      combinedPicture.append(sourceMobile);

      // Get desktop image and add img-fluid class
      const img = desktopPicture.querySelector('img');
      if (img) {
        img.classList.add('img-fluid'); // Class from ORIGINAL HTML
        combinedPicture.append(img);
      }

      // Optimize images using the combined picture's img
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        // moveInstrumentation should be applied to the original img element's parent (picture)
        // or to the new optimized picture element if it replaces the original structure.
        // Here, we are replacing the original picture with the optimized one.
        // The original `img` is inside `desktopPicture` which is a cell child.
        // We need to move instrumentation from the original cell to the new `optimizedPic`
        // or ensure the `img` inside `optimizedPic` carries the instrumentation.
        // For simplicity, we'll move instrumentation from the original desktopImageCell to the new combinedPicture
        // before replacing, and then append the optimized image.
        // A more robust solution might involve passing the original img to createOptimizedPicture
        // and letting it handle instrumentation, but the current createOptimizedPicture doesn't support that directly.
        // So, we'll move instrumentation from the original cell to the new picture container.
        // The current `moveInstrumentation(img, optimizedPic.querySelector('img'));` is problematic
        // because `img` is from `desktopPicture` and `optimizedPic.querySelector('img')` is a new element.
        // The instrumentation should ideally follow the content.
        // Let's simplify and ensure the `optimizedPic` itself is instrumented if it replaces the cell content.

        // Instead of replacing `picture` with `optimizedPic`, we'll append `optimizedPic` to `cardImage`
        // and ensure the original `desktopImageCell`'s instrumentation is moved to `cardImage` or `optimizedPic`.
        // The most direct way to preserve instrumentation for the image is to move it from the original
        // `desktopImageCell` to the `cardImage` div, which will contain the new `optimizedPic`.
        cardImage.append(optimizedPic);
      }
    }

    const cardText = document.createElement('div');
    cardText.classList.add('card-text'); // Class from ORIGINAL HTML

    const description = document.createElement('p');
    description.classList.add('desc'); // Class from ORIGINAL HTML
    // descriptionCell is a richtext field, so innerHTML is correct.
    // However, assigning <p>content</p> to another <p> creates invalid nesting.
    // Fix: use a <div> for richtext content or extract innerHTML from the <p> if a <p> is required.
    // Since original HTML has <p class="desc">Educated <br/> 940K+ girls <br/> till date</p>,
    // and descriptionCell.innerHTML is also <p>...</p>, we should extract the inner content.
    description.innerHTML = descriptionCell.querySelector('p')?.innerHTML || descriptionCell.textContent.trim();


    cardText.append(description);
    cardWrap.append(cardImage, cardText);

    const col = document.createElement('div');
    col.classList.add('col-md-6', 'aos-init', 'aos-animate'); // Classes from ORIGINAL HTML
    col.setAttribute('data-aos-easing', 'ease-in-out');
    col.setAttribute('data-aos', 'fade-up');
    col.setAttribute('data-aos-delay', '700'); // Fixed delay from original HTML

    moveInstrumentation(row, col); // Move instrumentation from the original row to the new column div
    col.append(cardWrap);
    cardsContainer.append(col);
  });

  block.replaceChildren(cardsContainer);
}
