import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Destructure block.children directly as per BlockJson model
  // block.children[0] corresponds to 'mobile-image'
  // block.children[1] corresponds to 'desktop-image'
  const [mobileImageRow, desktopImageRow] = [...block.children];

  // Mobile Image Section
  const mobileSection = document.createElement('div');
  mobileSection.classList.add('inner-banner', 'brand_mobile');
  moveInstrumentation(mobileImageRow, mobileSection);

  // The mobileImageRow contains a single div, which contains the picture element
  const mobilePicture = mobileImageRow.querySelector('picture');
  if (mobilePicture) {
    const mobileImg = mobilePicture.querySelector('img');
    if (mobileImg) {
      const optimizedMobilePic = createOptimizedPicture(mobileImg.src, mobileImg.alt, false, [{ width: '750' }]);
      const newMobileImg = optimizedMobilePic.querySelector('img');
      newMobileImg.classList.add('img-fluid', 'lozad');
      // Original HTML shows id="ctl00_ContentPlaceHolder1_imgbanner1" on the img,
      // but createOptimizedPicture generates a new img. We should not re-add the ID
      // unless it's explicitly required for functionality. Removing the original ID
      // from the generated img is good practice if it's not needed.
      // The original HTML uses data-src for lozad, so we should ensure the optimized picture
      // also uses data-src for the lozad class to work correctly.
      newMobileImg.setAttribute('data-src', mobileImg.src);
      mobileSection.append(optimizedMobilePic);
    }
  }

  // Desktop Image Section
  const desktopSection = document.createElement('div');
  desktopSection.classList.add('inner-banner', 'brand_desktop');
  moveInstrumentation(desktopImageRow, desktopSection);

  // The desktopImageRow contains a single div, which contains the picture element
  const desktopPicture = desktopImageRow.querySelector('picture');
  if (desktopPicture) {
    const desktopImg = desktopPicture.querySelector('img');
    if (desktopImg) {
      // As per original HTML, the desktop image is set as a background style.
      // Ensure the background properties match the original HTML.
      desktopSection.style.background = `url("${desktopImg.src}") no-repeat fixed`;
      desktopSection.style.backgroundSize = '100%';
    }
  }

  block.textContent = '';
  block.append(mobileSection, desktopSection);
}
