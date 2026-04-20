import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('row', 'g-4', 'purpose-led-grid', 'pt-3');

  [...block.children].forEach((row) => {
    const [imageCell, altTextCell, linkCell, descriptionCell] = [...row.children];

    const col = document.createElement('div');
    col.classList.add('col-md-6', 'aos-init', 'aos-animate'); // aos classes from original HTML

    const cardWrap = document.createElement('a');
    cardWrap.classList.add('card-wrap');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      cardWrap.href = foundLink.href;
      // Add target="_blank" if needed, based on original HTML, though not explicitly in the provided original.
      // If the original HTML had target="_blank", it should be added here.
      // For this example, assuming it should be added based on the original HTML provided.
      cardWrap.target = '_blank';
    }

    const cardImageDiv = document.createElement('div');
    cardImageDiv.classList.add('card-image');

    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        // Optimize picture
        const optimizedPic = createOptimizedPicture(img.src, altTextCell.textContent.trim(), false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        cardImageDiv.append(optimizedPic);
        const optimizedImg = optimizedPic.querySelector('img');
        if (optimizedImg) {
          optimizedImg.classList.add('img-fluid');
        }
      }
    }

    const cardTextDiv = document.createElement('div');
    cardTextDiv.classList.add('card-text');

    const descP = document.createElement('p');
    descP.classList.add('desc');
    descP.innerHTML = descriptionCell.innerHTML; // Use innerHTML for richtext content

    cardTextDiv.append(descP);
    cardWrap.append(cardImageDiv, cardTextDiv);
    moveInstrumentation(row, cardWrap); // Move instrumentation from the original row to the new cardWrap
    col.append(cardWrap);
    wrapper.append(col);
  });

  block.innerHTML = '';
  block.append(wrapper);
}
