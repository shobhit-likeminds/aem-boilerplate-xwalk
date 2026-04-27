import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headlineRow, ...itemRows] = [...block.children];

  const rootContainer = document.createElement('div');
  rootContainer.classList.add('container-xl', 'annualReport_mainBox', 'product-selection-component');

  const accountMainBox = document.createElement('div');
  accountMainBox.classList.add('account-mainBox', 'mx-md-16');
  rootContainer.append(accountMainBox);

  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row', 'gx-5');
  accountMainBox.append(rowDiv);

  const leftSection = document.createElement('div');
  leftSection.classList.add('mt-8', 'mt-md-10', 'col-lg-4');
  rowDiv.append(leftSection);

  const headline = document.createElement('p');
  moveInstrumentation(headlineRow.firstElementChild, headline); // Move instrumentation from the actual content cell
  headline.classList.add('font-24', 'font-md-40', 'fw-bold', 'product-container_heading', 'font-baskerville');
  headline.innerHTML = headlineRow.firstElementChild.innerHTML; // Read innerHTML for richtext
  leftSection.append(headline);

  const productMainBox = document.createElement('div');
  productMainBox.classList.add('product-mainbox', 'mt-10', 'mt-md-12');
  leftSection.append(productMainBox);

  const rightSection = document.createElement('div');
  rightSection.classList.add('right-section', 'mt-10', 'py-0', 'position-relative', 'col-lg-8');
  rowDiv.append(rightSection);

  const gheeBox = document.createElement('div');
  gheeBox.classList.add('ghee_box');
  rightSection.append(gheeBox);

  const milkSectionImage = document.createElement('div');
  milkSectionImage.classList.add('position-relative', 'milk-section_image');
  rightSection.append(milkSectionImage);

  const productItems = itemRows.filter((row) => row.children.length === 2);
  const gheePanels = itemRows.filter((row) => row.children.length === 9);
  const milkPanels = itemRows.filter((row) => row.children.length === 6);

  productItems.forEach((row, index) => {
    const [iconCell, labelCell] = [...row.children];

    const productDiv = document.createElement('div');
    moveInstrumentation(row, productDiv);

    const productHoverDiv = document.createElement('div');
    productHoverDiv.classList.add('milk_ghee_smallImag'); // 'product-hover' is added conditionally or by JS
    if (index === 0) {
      productHoverDiv.classList.add('ghee-packet', 'product-hover'); // Initial active state
      productHoverDiv.setAttribute('data-product', 'ghee');
    } else {
      productHoverDiv.classList.add('milk-packet');
      productHoverDiv.setAttribute('data-product', 'milk');
    }

    const picture = iconCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('left-section-gheeBox', 'object-fit-contain');
      productHoverDiv.append(optimizedPic);
    }

    const labelP = document.createElement('p');
    labelP.classList.add('product-subnames'); // Added missing class for milk label as well
    labelP.textContent = labelCell.textContent.trim();
    productHoverDiv.append(labelP);
    productDiv.append(productHoverDiv);
    productMainBox.append(productDiv);
  });

  gheePanels.forEach((row) => {
    const [
      backgroundDesktopCell,
      backgroundMobileCell,
      headlineBeforeCell,
      ctaIconCell,
      ctaLinkCell,
      ctaLabelCell,
      headlineAfterCell,
      confirmationIconCell,
      ctaLabelAfterCell,
    ] = [...row.children];

    const accountMainBgBox = document.createElement('div');
    accountMainBgBox.classList.add('account-mainBg-box', 'w-100');
    moveInstrumentation(row, accountMainBgBox);
    gheeBox.append(accountMainBgBox);

    const annualBgDesktop = document.createElement('div');
    annualBgDesktop.classList.add('annual-background_image--overlay', 'd-flex', 'annual-bg-desktop');
    const desktopPicture = backgroundDesktopCell.querySelector('picture');
    if (desktopPicture) {
      const img = desktopPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('account-bgImg', 'with-overlay');
      optimizedPic.querySelector('img').setAttribute('height', '392px');
      annualBgDesktop.append(optimizedPic);
      const overlay = document.createElement('div');
      overlay.classList.add('overlay');
      annualBgDesktop.append(overlay);
    }
    accountMainBgBox.append(annualBgDesktop);

    const annualBgMobile = document.createElement('div');
    annualBgMobile.classList.add('annual-background_image--overlay', 'd-flex', 'annual-bg-mobile');
    const mobilePicture = backgroundMobileCell.querySelector('picture');
    if (mobilePicture) {
      const img = mobilePicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('account-bgImg', 'with-overlay');
      optimizedPic.querySelector('img').setAttribute('height', '447px');
      annualBgMobile.append(optimizedPic);
      const overlay = document.createElement('div');
      overlay.classList.add('overlay');
      annualBgMobile.append(overlay);
    }
    accountMainBgBox.append(annualBgMobile);

    // Before download section
    const rightSubtextBefore = document.createElement('div');
    rightSubtextBefore.classList.add('right-subtext', 'position-absolute', 'start-0', 'end-0', 'bottom-0', 'right-subtext__BeforeDownload');
    const beforeContent = document.createElement('div');
    beforeContent.classList.add('d-flex', 'flex-column', 'align-items-center');
    rightSubtextBefore.append(beforeContent);

    const gheeMobileHeadingBefore = document.createElement('div');
    gheeMobileHeadingBefore.classList.add('ghee-mobile-heading', 'text-center', 'font-md-18', 'font-baskerville', 'leading-32');
    gheeMobileHeadingBefore.innerHTML = headlineBeforeCell.innerHTML;
    beforeContent.append(gheeMobileHeadingBefore);

    const downloadButtonBefore = document.createElement('button');
    downloadButtonBefore.classList.add('annual-report_DownloadBtn', 'my-9');
    const downloadIconDiv = document.createElement('div');
    downloadIconDiv.classList.add('download_icon');
    const ctaIconPicture = ctaIconCell.querySelector('picture');
    if (ctaIconPicture) {
      const img = ctaIconPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      downloadIconDiv.append(optimizedPic);
    }
    downloadButtonBefore.append(downloadIconDiv);
    beforeContent.append(downloadButtonBefore);

    const downloadLinkWrapper = document.createElement('div');
    downloadLinkWrapper.classList.add('d-flex', 'mb-6');
    const downloadLinkDiv = document.createElement('div');
    downloadLinkWrapper.append(downloadLinkDiv);

    const downloadLink = document.createElement('a');
    const foundCtaLink = ctaLinkCell.querySelector('a');
    if (foundCtaLink) {
      downloadLink.href = foundCtaLink.href; // Correctly read href from aem-content cell
      downloadLink.setAttribute('download', 'report.pdf'); // Assuming a default download name
    }
    downloadLink.classList.add('text-decoration-none', 'download-report_btn', 'cta-analytics', 'download_report_btnBefore', 'text-cream-100', 'border', 'border-2', 'border-red-100', 'border-maroon-100-hover', 'border-red-300-active', 'bg-red-100', 'bg-maroon-100-hover', 'bg-red-300-active');
    downloadLink.textContent = ctaLabelCell.textContent.trim();
    downloadLinkDiv.append(downloadLink);
    beforeContent.append(downloadLinkWrapper);
    accountMainBgBox.append(rightSubtextBefore);

    const whatsappLinkBefore = document.createElement('div');
    whatsappLinkBefore.classList.add('Whatsapp-link', 'mb-8', 'text-center');
    beforeContent.append(whatsappLinkBefore);

    // After download section
    const rightSubtextAfter = document.createElement('div');
    rightSubtextAfter.classList.add('right-subtext', 'position-absolute', 'start-0', 'end-0', 'bottom-0', 'right-section_subtextafter', 'right-subtext__AfterDownload');
    const afterContent = document.createElement('div');
    afterContent.classList.add('d-flex', 'flex-column', 'align-items-center', 'justify-content-around');
    rightSubtextAfter.append(afterContent);

    const gheeMobileHeadingAfter = document.createElement('div');
    gheeMobileHeadingAfter.classList.add('ghee-mobile-heading', 'text-center', 'font-md-18', 'font-baskerville', 'leading-32');
    gheeMobileHeadingAfter.innerHTML = headlineAfterCell.innerHTML;
    afterContent.append(gheeMobileHeadingAfter);

    const downloadButtonAfter = document.createElement('button');
    downloadButtonAfter.classList.add('annual-report_DownloadBtn', 'my-9');
    const tickDownloadDiv = document.createElement('div');
    tickDownloadDiv.classList.add('tick_download');
    const confirmationIconPicture = confirmationIconCell.querySelector('picture');
    if (confirmationIconPicture) {
      const img = confirmationIconPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      tickDownloadDiv.append(optimizedPic);
    }
    downloadButtonAfter.append(tickDownloadDiv);
    afterContent.append(downloadButtonAfter);

    const downloadButtonAfterWrapper = document.createElement('div');
    downloadButtonAfterWrapper.classList.add('d-flex', 'mb-6');
    const downloadButtonAfterDiv = document.createElement('div');
    downloadButtonAfterWrapper.append(downloadButtonAfterDiv);

    const downloadButtonAfterEl = document.createElement('button');
    downloadButtonAfterEl.classList.add('download-report_btn', 'download_report_btnAfter', 'disabled', 'bg-light-pink', 'border-light-pink', 'text-cream-100');
    downloadButtonAfterEl.textContent = ctaLabelAfterCell.textContent.trim();
    downloadButtonAfterDiv.append(downloadButtonAfterEl);
    afterContent.append(downloadButtonAfterWrapper);

    const whatsappLinkAfter = document.createElement('div');
    whatsappLinkAfter.classList.add('Whatsapp-link', 'mb-8', 'text-center');
    afterContent.append(whatsappLinkAfter);

    accountMainBgBox.append(rightSubtextAfter);

    downloadLink.addEventListener('click', (e) => {
      e.preventDefault();
      rightSubtextBefore.style.display = 'none';
      rightSubtextAfter.style.display = 'flex'; // Use flex to match original display
      // Trigger actual download
      const tempLink = document.createElement('a');
      tempLink.href = downloadLink.href;
      tempLink.download = downloadLink.download;
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
    });

    // Initial state
    rightSubtextAfter.style.display = 'none';
  });

  milkPanels.forEach((row) => {
    const [
      backgroundDesktopCell,
      backgroundMobileCell,
      headlineCell,
      ctaIconCell,
      whatsappLinkCell,
      whatsappLabelCell,
    ] = [...row.children];

    const accountMainBgBox = document.createElement('div');
    accountMainBgBox.classList.add('w-100', 'account-mainBg-box', 'd-flex');
    moveInstrumentation(row, accountMainBgBox);
    milkSectionImage.append(accountMainBgBox);

    const annualBgDesktop = document.createElement('div');
    annualBgDesktop.classList.add('annual-background_image--overlay', 'd-flex', 'annual-bg-desktop');
    const desktopPicture = backgroundDesktopCell.querySelector('picture');
    if (desktopPicture) {
      const img = desktopPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('account-bgImg', 'with-overlay');
      optimizedPic.querySelector('img').setAttribute('height', '392px');
      annualBgDesktop.append(optimizedPic);
      const overlay = document.createElement('div');
      overlay.classList.add('overlay');
      annualBgDesktop.append(overlay);
    }
    accountMainBgBox.append(annualBgDesktop);

    const annualBgMobile = document.createElement('div');
    annualBgMobile.classList.add('annual-background_image--overlay', 'd-flex', 'annual-bg-mobile');
    const mobilePicture = backgroundMobileCell.querySelector('picture');
    if (mobilePicture) {
      const img = mobilePicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('account-bgImg', 'with-overlay');
      optimizedPic.querySelector('img').setAttribute('height', '447px');
      annualBgMobile.append(optimizedPic);
      const overlay = document.createElement('div');
      overlay.classList.add('overlay');
      annualBgMobile.append(overlay);
    }
    accountMainBgBox.append(annualBgMobile);

    const rightSubtextMilk = document.createElement('div');
    rightSubtextMilk.classList.add('right-subtext', 'position-absolute', 'start-0', 'end-0', 'bottom-0', 'right-subtext-milk');
    const milkContent = document.createElement('div');
    milkContent.classList.add('d-flex', 'flex-column', 'align-items-center');
    rightSubtextMilk.append(milkContent);

    const gheeMobileHeadingMilk = document.createElement('div');
    gheeMobileHeadingMilk.classList.add('ghee-mobile-heading', 'text-center', 'font-md-18', 'font-baskerville', 'leading-32');
    gheeMobileHeadingMilk.innerHTML = headlineCell.innerHTML;
    milkContent.append(gheeMobileHeadingMilk);

    const fontMd18Div = document.createElement('div');
    fontMd18Div.classList.add('font-md-18', 'mt-6', 'text-center');
    milkContent.append(fontMd18Div);

    const ctaIconDiv = document.createElement('div');
    ctaIconDiv.classList.add('my-9');
    const ctaIconPicture = ctaIconCell.querySelector('picture');
    if (ctaIconPicture) {
      const img = ctaIconPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      ctaIconDiv.append(optimizedPic);
    }
    milkContent.append(ctaIconDiv);

    const whatsappLinkDiv = document.createElement('div');
    whatsappLinkDiv.classList.add('Whatsapp-link', 'mb-8', 'text-center');
    const whatsappP = document.createElement('p');
    const whatsappAnchor = document.createElement('a');
    const foundWhatsappLink = whatsappLinkCell.querySelector('a');
    if (foundWhatsappLink) {
      whatsappAnchor.href = foundWhatsappLink.href; // Correctly read href from aem-content cell
      whatsappAnchor.setAttribute('target', '_blank');
      whatsappAnchor.setAttribute('rel', 'noopener noreferrer');
    }
    whatsappAnchor.textContent = whatsappLabelCell.textContent.trim();
    const screenReaderOnly = document.createElement('span');
    screenReaderOnly.classList.add('cmp-link__screen-reader-only');
    screenReaderOnly.textContent = 'opens in a new tab';
    whatsappAnchor.append(screenReaderOnly);

    whatsappP.append(whatsappAnchor);
    whatsappLinkDiv.append(whatsappP);
    milkContent.append(whatsappLinkDiv);

    milkSectionImage.append(rightSubtextMilk);
  });

  const gheeProduct = leftSection.querySelector('.ghee-packet');
  const milkProduct = leftSection.querySelector('.milk-packet');

  const gheePanelEl = rightSection.querySelector('.ghee_box');
  const milkPanelEl = rightSection.querySelector('.milk-section_image');

  // Initial state
  if (gheePanelEl) gheePanelEl.style.display = 'block';
  if (milkPanelEl) milkPanelEl.style.display = 'none';

  if (gheeProduct) {
    gheeProduct.classList.add('product-hover');
    gheeProduct.addEventListener('click', () => {
      gheeProduct.classList.add('product-hover');
      milkProduct.classList.remove('product-hover');
      gheePanelEl.style.display = 'block';
      milkPanelEl.style.display = 'none';
    });
  }

  if (milkProduct) {
    milkProduct.addEventListener('click', () => {
      milkProduct.classList.add('product-hover');
      gheeProduct.classList.remove('product-hover');
      gheePanelEl.style.display = 'none';
      milkPanelEl.style.display = 'block';
    });
  }

  block.replaceChildren(rootContainer);
}
