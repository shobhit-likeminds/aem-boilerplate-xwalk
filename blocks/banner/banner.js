import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  section.classList.add('banner-section');
  moveInstrumentation(block, section); // Move instrumentation from the block itself to the new section

  const wrapper = document.createElement('div');
  wrapper.classList.add('position-relative', 'boing', 'banner-section__wrapper');

  const ctaWrapper = document.createElement('div');
  ctaWrapper.classList.add('position-absolute', 'start-50', 'translate-middle-x', 'w-100', 'boing__banner--cta');

  const bannerCta = document.createElement('div');
  bannerCta.classList.add('banner-cta');

  ctaWrapper.append(bannerCta);
  wrapper.append(ctaWrapper);
  section.append(wrapper);

  // The BlockJson model has no fields, and the EDS Block Structure shows an empty div.
  // This means there are no rows or cells within block.children to process for content.
  // The original JS incorrectly assumed there might be empty rows for instrumentation.
  // We've already moved the block's own instrumentation to the section above.

  block.textContent = '';
  block.append(section);
}
