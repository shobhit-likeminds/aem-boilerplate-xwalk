import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rows = [...block.children];

  const mainWrapper = document.createElement('div');
  mainWrapper.classList.add('container-xl', 'annualReport_mainBox', 'product-selection-component');
  moveInstrumentation(block, mainWrapper);

  const accountMainBox = document.createElement('div');
  accountMainBox.classList.add('account-mainBox', 'mx-md-16');
  mainWrapper.append(accountMainBox);

  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row', 'gx-5');
  accountMainBox.append(rowDiv);

  const leftSection = document.createElement('div');
  leftSection.classList.add('mt-8', 'mt-md-10', 'col-lg-4');
  rowDiv.append(leftSection);

  const headlineRow = rows.shift(); // First row is always the headline
  const headlineP = document.createElement('p');
  headlineP.classList.add('font-24', 'font-md-40', 'fw-bold', 'product-container_heading', 'font-baskerville');
  moveInstrumentation(headlineRow, headlineP);
  headlineP.innerHTML = headlineRow.firstElementChild.innerHTML;
  leftSection.append(headlineP);

  const productMainBox = document.createElement('div');
  productMainBox.classList.add('product-mainbox', 'mt-10', 'mt-md-12');
  leftSection.append(productMainBox);

  const rightSection = document.createElement('div');
  rightSection.classList.add('right-section', 'mt-10', 'py-0', 'position-relative', 'col-lg-8');
  rowDiv.append(rightSection);

  let gheeBox;
  let milkSectionImage;

  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length === 2) { // Product Item
      const [productImageCell, productLabelCell] = cells;

      const productItemDiv = document.createElement('div');
      moveInstrumentation(row, productItemDiv);

      const smallImageDiv = document.createElement('div');
      smallImageDiv.classList.add('milk_ghee_smallImag');

      const img = productImageCell.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        smallImageDiv.append(optimizedPic);
      }

      const labelP = document.createElement('p');
      labelP.classList.add('product-subnames');
      labelP.textContent = productLabelCell.textContent.trim();
      smallImageDiv.append(labelP);

      if (productLabelCell.textContent.trim().toLowerCase().includes('ghee')) {
        smallImageDiv.classList.add('ghee-packet', 'product-hover');
      } else if (productLabelCell.textContent.trim().toLowerCase().includes('milk')) {
        smallImageDiv.classList.add('milk-packet');
      }
      productItemDiv.append(smallImageDiv);
      productMainBox.append(productItemDiv);
    } else if (cells.length === 9) { // Ghee Panel
      const [
        backgroundDesktopCell,
        backgroundMobileCell,
        headlineBeforeCell,
        ctaIconBeforeCell,
        ctaLinkBeforeCell,
        ctaLabelBeforeCell,
        headlineAfterCell,
        ctaIconAfterCell,
        ctaLabelAfterCell,
      ] = cells;

      gheeBox = document.createElement('div');
      gheeBox.classList.add('ghee_box');
      moveInstrumentation(row, gheeBox); // Move instrumentation from first ghee-panel row

      const accountMainBgBox = document.createElement('div');
      accountMainBgBox.classList.add('account-mainBg-box', 'w-100');
      gheeBox.append(accountMainBgBox);

      // Desktop Background
      const desktopBgOverlay = document.createElement('div');
      desktopBgOverlay.classList.add('annual-background_image--overlay', 'd-flex', 'annual-bg-desktop');
      const desktopPic = backgroundDesktopCell.querySelector('picture');
      if (desktopPic) {
        const desktopImg = desktopPic.querySelector('img');
        const optimizedPic = createOptimizedPicture(desktopImg.src, desktopImg.alt, false, [{ width: '750' }]);
        moveInstrumentation(desktopImg, optimizedPic.querySelector('img'));
        desktopBgOverlay.append(optimizedPic);
      }
      const overlayDivDesktop = document.createElement('div');
      overlayDivDesktop.classList.add('overlay');
      desktopBgOverlay.append(overlayDivDesktop);
      accountMainBgBox.append(desktopBgOverlay);

      // Mobile Background
      const mobileBgOverlay = document.createElement('div');
      mobileBgOverlay.classList.add('annual-background_image--overlay', 'd-flex', 'annual-bg-mobile');
      const mobilePic = backgroundMobileCell.querySelector('picture');
      if (mobilePic) {
        const mobileImg = mobilePic.querySelector('img');
        const optimizedPic = createOptimizedPicture(mobileImg.src, mobileImg.alt, false, [{ width: '750' }]);
        moveInstrumentation(mobileImg, optimizedPic.querySelector('img'));
        mobileBgOverlay.append(optimizedPic);
      }
      const overlayDivMobile = document.createElement('div');
      overlayDivMobile.classList.add('overlay');
      mobileBgOverlay.append(overlayDivMobile);
      accountMainBgBox.append(mobileBgOverlay);

      // Before Download Section
      const rightSubtextBefore = document.createElement('div');
      rightSubtextBefore.classList.add('right-subtext', 'position-absolute', 'start-0', 'end-0', 'bottom-0', 'right-subtext__BeforeDownload');
      accountMainBgBox.append(rightSubtextBefore);

      const beforeContent = document.createElement('div');
      beforeContent.classList.add('d-flex', 'flex-column', 'align-items-center');
      rightSubtextBefore.append(beforeContent);

      const gheeMobileHeadingBefore = document.createElement('div');
      gheeMobileHeadingBefore.classList.add('ghee-mobile-heading', 'text-center', 'font-md-18', 'font-baskerville', 'leading-32');
      gheeMobileHeadingBefore.innerHTML = headlineBeforeCell.innerHTML;
      beforeContent.append(gheeMobileHeadingBefore);

      const downloadBtnBefore = document.createElement('button');
      downloadBtnBefore.classList.add('annual-report_DownloadBtn', 'my-9');
      const downloadIconDiv = document.createElement('div');
      downloadIconDiv.classList.add('download_icon');
      const ctaIconBeforeImg = ctaIconBeforeCell.querySelector('img');
      if (ctaIconBeforeImg) {
        const optimizedPic = createOptimizedPicture(ctaIconBeforeImg.src, ctaIconBeforeImg.alt, false, [{ width: '750' }]);
        moveInstrumentation(ctaIconBeforeImg, optimizedPic.querySelector('img'));
        downloadIconDiv.append(optimizedPic);
      }
      downloadBtnBefore.append(downloadIconDiv);
      beforeContent.append(downloadBtnBefore);

      const downloadLinkWrapper = document.createElement('div');
      downloadLinkWrapper.classList.add('d-flex', 'mb-6');
      const downloadLinkDiv = document.createElement('div');
      downloadLinkWrapper.append(downloadLinkDiv);

      const ctaLinkBeforeA = document.createElement('a');
      ctaLinkBeforeA.classList.add('text-decoration-none', 'download-report_btn', 'cta-analytics', 'download_report_btnBefore', 'text-cream-100', 'border', 'border-2', 'border-red-100', 'border-maroon-100-hover', 'border-red-300-active', 'bg-red-100', 'bg-maroon-100-hover', 'bg-red-300-active');
      const foundLinkBefore = ctaLinkBeforeCell.querySelector('a');
      if (foundLinkBefore) {
        ctaLinkBeforeA.href = foundLinkBefore.href;
        if (foundLinkBefore.href.endsWith('.pdf')) { // Only set download attribute for PDF links
          ctaLinkBeforeA.setAttribute('download', 'report.pdf');
        }
      }
      ctaLinkBeforeA.textContent = ctaLabelBeforeCell.textContent.trim();
      downloadLinkDiv.append(ctaLinkBeforeA);
      beforeContent.append(downloadLinkWrapper);

      // After Download Section
      const rightSubtextAfter = document.createElement('div');
      rightSubtextAfter.classList.add('right-subtext', 'position-absolute', 'start-0', 'end-0', 'bottom-0', 'right-section_subtextafter', 'right-subtext__AfterDownload');
      accountMainBgBox.append(rightSubtextAfter);

      const afterContent = document.createElement('div');
      afterContent.classList.add('d-flex', 'flex-column', 'align-items-center', 'justify-content-around');
      rightSubtextAfter.append(afterContent);

      const gheeMobileHeadingAfter = document.createElement('div');
      gheeMobileHeadingAfter.classList.add('ghee-mobile-heading', 'text-center', 'font-md-18', 'font-baskerville', 'leading-32');
      gheeMobileHeadingAfter.innerHTML = headlineAfterCell.innerHTML;
      afterContent.append(gheeMobileHeadingAfter);

      const downloadBtnAfter = document.createElement('button');
      downloadBtnAfter.classList.add('annual-report_DownloadBtn', 'my-9');
      const tickDownloadDiv = document.createElement('div');
      tickDownloadDiv.classList.add('tick_download');
      const ctaIconAfterImg = ctaIconAfterCell.querySelector('img');
      if (ctaIconAfterImg) {
        const optimizedPic = createOptimizedPicture(ctaIconAfterImg.src, ctaIconAfterImg.alt, false, [{ width: '750' }]);
        moveInstrumentation(ctaIconAfterImg, optimizedPic.querySelector('img'));
        tickDownloadDiv.append(optimizedPic);
      }
      downloadBtnAfter.append(tickDownloadDiv);
      afterContent.append(downloadBtnAfter);

      const downloadBtnAfterWrapper = document.createElement('div');
      downloadBtnAfterWrapper.classList.add('d-flex', 'mb-6');
      const downloadBtnAfterDiv = document.createElement('div');
      downloadBtnAfterWrapper.append(downloadBtnAfterDiv);

      const ctaButtonAfter = document.createElement('button');
      ctaButtonAfter.classList.add('download-report_btn', 'download_report_btnAfter', 'disabled', 'bg-light-pink', 'border-light-pink', 'text-cream-100');
      ctaButtonAfter.textContent = ctaLabelAfterCell.textContent.trim();
      downloadBtnAfterDiv.append(ctaButtonAfter);
      afterContent.append(downloadBtnAfterWrapper);

      const whatsappLinkBefore = document.createElement('div');
      whatsappLinkBefore.classList.add('Whatsapp-link', 'mb-8', 'text-center');
      beforeContent.append(whatsappLinkBefore);

      const whatsappLinkAfter = document.createElement('div');
      whatsappLinkAfter.classList.add('Whatsapp-link', 'mb-8', 'text-center');
      afterContent.append(whatsappLinkAfter);

      // Add event listener for download button
      downloadBtnBefore.addEventListener('click', () => {
        ctaLinkBeforeA.click(); // Trigger download
        rightSubtextBefore.classList.remove('right-subtext__BeforeDownload');
        rightSubtextAfter.classList.add('right-subtext__AfterDownload');
        rightSubtextBefore.style.display = 'none';
        rightSubtextAfter.style.display = 'flex';
      });
      // Initial state
      rightSubtextAfter.style.display = 'none';

    } else if (cells.length === 6) { // Milk Panel
      const [
        backgroundDesktopCell,
        backgroundMobileCell,
        headlineCell,
        ctaIconCell,
        whatsappLinkCell,
        whatsappLabelCell,
      ] = cells;

      milkSectionImage = document.createElement('div');
      milkSectionImage.classList.add('position-relative', 'milk-section_image');
      moveInstrumentation(row, milkSectionImage); // Move instrumentation from first milk-panel row

      const w100AccountMainBgBox = document.createElement('div');
      w100AccountMainBgBox.classList.add('w-100', 'account-mainBg-box', 'd-flex');
      milkSectionImage.append(w100AccountMainBgBox);

      // Desktop Background
      const desktopBgOverlay = document.createElement('div');
      desktopBgOverlay.classList.add('annual-background_image--overlay', 'd-flex', 'annual-bg-desktop');
      const desktopPic = backgroundDesktopCell.querySelector('picture');
      if (desktopPic) {
        const desktopImg = desktopPic.querySelector('img');
        const optimizedPic = createOptimizedPicture(desktopImg.src, desktopImg.alt, false, [{ width: '750' }]);
        moveInstrumentation(desktopImg, optimizedPic.querySelector('img'));
        desktopBgOverlay.append(optimizedPic);
      }
      const overlayDivDesktop = document.createElement('div');
      overlayDivDesktop.classList.add('overlay');
      desktopBgOverlay.append(overlayDivDesktop);
      w100AccountMainBgBox.append(desktopBgOverlay);

      // Mobile Background
      const mobileBgOverlay = document.createElement('div');
      mobileBgOverlay.classList.add('annual-background_image--overlay', 'd-flex', 'annual-bg-mobile');
      const mobilePic = backgroundMobileCell.querySelector('picture');
      if (mobilePic) {
        const mobileImg = mobilePic.querySelector('img');
        const optimizedPic = createOptimizedPicture(mobileImg.src, mobileImg.alt, false, [{ width: '750' }]);
        moveInstrumentation(mobileImg, optimizedPic.querySelector('img'));
        mobileBgOverlay.append(optimizedPic);
      }
      const overlayDivMobile = document.createElement('div');
      overlayDivMobile.classList.add('overlay');
      mobileBgOverlay.append(overlayDivMobile);
      w100AccountMainBgBox.append(mobileBgOverlay);

      const rightSubtextMilk = document.createElement('div');
      rightSubtextMilk.classList.add('right-subtext', 'position-absolute', 'start-0', 'end-0', 'bottom-0', 'right-subtext-milk');
      milkSectionImage.append(rightSubtextMilk);

      const milkContent = document.createElement('div');
      milkContent.classList.add('d-flex', 'flex-column', 'align-items-center');
      rightSubtextMilk.append(milkContent);

      const gheeMobileHeading = document.createElement('div');
      gheeMobileHeading.classList.add('ghee-mobile-heading', 'text-center', 'font-md-18', 'font-baskerville', 'leading-32');
      gheeMobileHeading.innerHTML = headlineCell.innerHTML;
      milkContent.append(gheeMobileHeading);

      const mt6Div = document.createElement('div');
      mt6Div.classList.add('font-md-18', 'mt-6', 'text-center');
      milkContent.append(mt6Div);

      const my9Div = document.createElement('div');
      my9Div.classList.add('my-9');
      const ctaIconImg = ctaIconCell.querySelector('img');
      if (ctaIconImg) {
        const optimizedPic = createOptimizedPicture(ctaIconImg.src, ctaIconImg.alt, false, [{ width: '750' }]);
        moveInstrumentation(ctaIconImg, optimizedPic.querySelector('img'));
        my9Div.append(optimizedPic);
      }
      milkContent.append(my9Div);

      const whatsappLinkDiv = document.createElement('div');
      whatsappLinkDiv.classList.add('Whatsapp-link', 'mb-8', 'text-center');
      const whatsappLinkA = document.createElement('a');
      const foundWhatsappLink = whatsappLinkCell.querySelector('a');
      if (foundWhatsappLink) {
        whatsappLinkA.href = foundWhatsappLink.href;
        whatsappLinkA.target = '_blank';
        whatsappLinkA.rel = 'noopener noreferrer';
      }
      // Reconstruct the innerHTML to include the screen reader span
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = whatsappLabelCell.innerHTML;
      const screenReaderSpan = document.createElement('span');
      screenReaderSpan.classList.add('cmp-link__screen-reader-only');
      screenReaderSpan.textContent = 'opens in a new tab';
      tempDiv.append(screenReaderSpan);
      whatsappLinkA.innerHTML = tempDiv.innerHTML;

      const p = document.createElement('p');
      p.append(whatsappLinkA);
      whatsappLinkDiv.append(p);
      milkContent.append(whatsappLinkDiv);
    }
  });

  if (gheeBox) {
    rightSection.append(gheeBox);
  }
  if (milkSectionImage) {
    rightSection.append(milkSectionImage);
    milkSectionImage.style.display = 'none'; // Initially hide milk section
  }

  // Add event listeners for product selection
  const productItems = productMainBox.querySelectorAll('.milk_ghee_smallImag');
  productItems.forEach((item) => {
    item.addEventListener('click', () => {
      productItems.forEach((pi) => pi.classList.remove('product-hover'));
      item.classList.add('product-hover');

      if (item.classList.contains('ghee-packet')) {
        if (gheeBox) gheeBox.style.display = 'block';
        if (milkSectionImage) milkSectionImage.style.display = 'none';
      } else if (item.classList.contains('milk-packet')) {
        if (gheeBox) gheeBox.style.display = 'none';
        if (milkSectionImage) milkSectionImage.style.display = 'block';
      }
    });
  });

  // Set initial active product
  const initialActiveProduct = productMainBox.querySelector('.ghee-packet');
  if (initialActiveProduct) {
    initialActiveProduct.classList.add('product-hover');
    if (gheeBox) gheeBox.style.display = 'block';
    if (milkSectionImage) milkSectionImage.style.display = 'none';
  } else {
    // Fallback if no ghee-packet, show milk-packet if available
    const initialActiveMilk = productMainBox.querySelector('.milk-packet');
    if (initialActiveMilk) {
      initialActiveMilk.classList.add('product-hover');
      if (gheeBox) gheeBox.style.display = 'none';
      if (milkSectionImage) milkSectionImage.style.display = 'block';
    }
  }

  block.replaceChildren(mainWrapper);
}
