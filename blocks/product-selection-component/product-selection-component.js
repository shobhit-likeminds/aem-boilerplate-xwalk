import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];
  const [headlineRow, ...itemRows] = children;

  const productSelectorItems = itemRows.filter((row) => row.children.length === 2);
  const productDetailItems = itemRows.filter((row) => row.children.length === 12);

  const mainWrapper = document.createElement('div');
  mainWrapper.classList.add('container-xl', 'annualReport_mainBox', 'product-selection-component');
  moveInstrumentation(block, mainWrapper);

  const accountMainBox = document.createElement('div');
  accountMainBox.classList.add('account-mainBox', 'mx-md-16');
  mainWrapper.append(accountMainBox);

  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row', 'gx-5');
  accountMainBox.append(rowDiv);

  // Left Section - Product Selectors
  const leftSection = document.createElement('div');
  leftSection.classList.add('mt-8', 'mt-md-10', 'col-lg-4');
  rowDiv.append(leftSection);

  const heading = document.createElement('p');
  heading.classList.add('font-24', 'font-md-40', 'fw-bold', 'product-container_heading', 'font-baskerville');
  moveInstrumentation(headlineRow, heading);
  // Corrected: Use innerHTML for richtext field
  heading.innerHTML = headlineRow.firstElementChild.innerHTML;
  leftSection.append(heading);

  const productMainBox = document.createElement('div');
  productMainBox.classList.add('product-mainbox', 'mt-10', 'mt-md-12');
  leftSection.append(productMainBox);

  const productDetailBoxes = [];

  productSelectorItems.forEach((row, index) => {
    const [thumbnailImageCell, productLabelCell] = [...row.children];

    const productDiv = document.createElement('div');
    moveInstrumentation(row, productDiv);
    productMainBox.append(productDiv);

    const productHoverDiv = document.createElement('div');
    productHoverDiv.classList.add('milk_ghee_smallImag', 'product-hover');
    if (index === 0) {
      productHoverDiv.classList.add('ghee-packet');
      productHoverDiv.classList.add('active'); // Set first item as active by default
    } else {
      productHoverDiv.classList.add('milk-packet');
    }
    productDiv.append(productHoverDiv);

    const picture = thumbnailImageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('left-section-gheeBox', 'object-fit-contain');
      productHoverDiv.append(optimizedPic);
    }

    const productName = document.createElement('p');
    productName.classList.add('product-subnames');
    productName.textContent = productLabelCell.textContent.trim();
    productHoverDiv.append(productName);

    // Add click listener to switch active product
    productHoverDiv.addEventListener('click', () => {
      productMainBox.querySelectorAll('.product-hover').forEach((item) => item.classList.remove('active'));
      productHoverDiv.classList.add('active');

      productDetailBoxes.forEach((box, detailIndex) => {
        if (index === detailIndex) {
          box.classList.add('active');
        } else {
          box.classList.remove('active');
        }
      });
    });
  });

  // Right Section - Product Details
  const rightSection = document.createElement('div');
  rightSection.classList.add('right-section', 'mt-10', 'py-0', 'position-relative', 'col-lg-8');
  rowDiv.append(rightSection);

  productDetailItems.forEach((row, index) => {
    const [
      backgroundDesktopCell,
      backgroundMobileCell,
      headlineBeforeDownloadCell,
      ctaIconBeforeDownloadCell,
      downloadLinkCell,
      downloadLabelCell,
      headlineAfterDownloadCell,
      ctaIconAfterDownloadCell,
      downloadLabelAfterCell,
      confirmationIconAfterDownloadCell, // This field is present in the model but not used in the JS
      whatsappLinkCell,
      whatsappLabelCell,
    ] = [...row.children];

    const gheeBox = document.createElement('div');
    gheeBox.classList.add('ghee_box');
    if (index === 0) {
      gheeBox.classList.add('active'); // Set first detail item as active by default
    } else {
      gheeBox.classList.add('milk-section_image');
    }
    productDetailBoxes.push(gheeBox);
    rightSection.append(gheeBox);
    moveInstrumentation(row, gheeBox);

    const accountMainBgBox = document.createElement('div');
    accountMainBgBox.classList.add('account-mainBg-box', 'w-100');
    gheeBox.append(accountMainBgBox);

    // Desktop background image
    const desktopBgOverlay = document.createElement('div');
    desktopBgOverlay.classList.add('annual-background_image--overlay', 'd-flex', 'annual-bg-desktop');
    accountMainBgBox.append(desktopBgOverlay);
    const desktopPicture = backgroundDesktopCell.querySelector('picture');
    if (desktopPicture) {
      const img = desktopPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('account-bgImg', 'with-overlay');
      optimizedPic.querySelector('img').setAttribute('height', '392px');
      desktopBgOverlay.append(optimizedPic);
    }
    const desktopOverlay = document.createElement('div');
    desktopOverlay.classList.add('overlay');
    desktopBgOverlay.append(desktopOverlay);

    // Mobile background image
    const mobileBgOverlay = document.createElement('div');
    mobileBgOverlay.classList.add('annual-background_image--overlay', 'd-flex', 'annual-bg-mobile');
    accountMainBgBox.append(mobileBgOverlay);
    const mobilePicture = backgroundMobileCell.querySelector('picture');
    if (mobilePicture) {
      const img = mobilePicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('account-bgImg', 'with-overlay');
      optimizedPic.querySelector('img').setAttribute('height', '447px');
      mobileBgOverlay.append(optimizedPic);
    }
    const mobileOverlay = document.createElement('div');
    mobileOverlay.classList.add('overlay');
    mobileBgOverlay.append(mobileOverlay);

    // Before Download Section
    const beforeDownloadSection = document.createElement('div');
    beforeDownloadSection.classList.add(
      'right-subtext',
      'position-absolute',
      'start-0',
      'end-0',
      'bottom-0',
      'right-subtext__BeforeDownload'
    );
    accountMainBgBox.append(beforeDownloadSection);

    const beforeDownloadContent = document.createElement('div');
    beforeDownloadContent.classList.add('d-flex', 'flex-column', 'align-items-center');
    beforeDownloadSection.append(beforeDownloadContent);

    const headlineBefore = document.createElement('div');
    headlineBefore.classList.add('ghee-mobile-heading', 'text-center', 'font-md-18', 'font-baskerville', 'leading-32');
    // Corrected: Use innerHTML for richtext field
    headlineBefore.innerHTML = headlineBeforeDownloadCell.innerHTML;
    beforeDownloadContent.append(headlineBefore);

    const downloadButton = document.createElement('button');
    downloadButton.classList.add('annual-report_DownloadBtn', 'my-9');
    beforeDownloadContent.append(downloadButton);

    const downloadIconDiv = document.createElement('div');
    downloadIconDiv.classList.add('download_icon');
    downloadButton.append(downloadIconDiv);

    const ctaIconBefore = ctaIconBeforeDownloadCell.querySelector('picture');
    if (ctaIconBefore) {
      const img = ctaIconBefore.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      downloadIconDiv.append(optimizedPic);
    }

    const downloadLinkWrapper = document.createElement('div');
    downloadLinkWrapper.classList.add('d-flex', 'mb-6');
    beforeDownloadContent.append(downloadLinkWrapper);

    const downloadLinkDiv = document.createElement('div');
    downloadLinkWrapper.append(downloadLinkDiv);

    const downloadAnchor = document.createElement('a');
    downloadAnchor.classList.add(
      'text-decoration-none',
      'download-report_btn',
      'cta-analytics',
      'download_report_btnBefore',
      'text-cream-100',
      'border',
      'border-2',
      'border-red-100',
      'border-maroon-100-hover',
      'border-red-300-active',
      'bg-red-100',
      'bg-maroon-100-hover',
      'bg-red-300-active'
    );
    const foundDownloadLink = downloadLinkCell.querySelector('a');
    if (foundDownloadLink) {
      downloadAnchor.href = foundDownloadLink.href;
      downloadAnchor.setAttribute('download', 'report.pdf'); // Assuming default download name
    }
    downloadAnchor.textContent = downloadLabelCell.textContent.trim();
    downloadLinkDiv.append(downloadAnchor);

    const whatsappLinkWrapper = document.createElement('div');
    whatsappLinkWrapper.classList.add('Whatsapp-link', 'mb-8', 'text-center');
    beforeDownloadContent.append(whatsappLinkWrapper);

    // After Download Section
    const afterDownloadSection = document.createElement('div');
    afterDownloadSection.classList.add(
      'right-subtext',
      'position-absolute',
      'start-0',
      'end-0',
      'bottom-0',
      'right-section_subtextafter',
      'right-subtext__AfterDownload'
    );
    accountMainBgBox.append(afterDownloadSection);

    const afterDownloadContent = document.createElement('div');
    afterDownloadContent.classList.add('d-flex', 'flex-column', 'align-items-center', 'justify-content-around');
    afterDownloadSection.append(afterDownloadContent);

    const headlineAfter = document.createElement('div');
    headlineAfter.classList.add('ghee-mobile-heading', 'text-center', 'font-md-18', 'font-baskerville', 'leading-32');
    // Corrected: Use innerHTML for richtext field
    headlineAfter.innerHTML = headlineAfterDownloadCell.innerHTML;
    afterDownloadContent.append(headlineAfter);

    const afterDownloadButton = document.createElement('button');
    afterDownloadButton.classList.add('annual-report_DownloadBtn', 'my-9');
    afterDownloadContent.append(afterDownloadButton);

    const tickDownloadDiv = document.createElement('div');
    tickDownloadDiv.classList.add('tick_download');
    afterDownloadButton.append(tickDownloadDiv);

    const ctaIconAfter = ctaIconAfterDownloadCell.querySelector('picture');
    if (ctaIconAfter) {
      const img = ctaIconAfter.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      tickDownloadDiv.append(optimizedPic);
    }

    const afterDownloadLinkWrapper = document.createElement('div');
    afterDownloadLinkWrapper.classList.add('d-flex', 'mb-6');
    afterDownloadContent.append(afterDownloadLinkWrapper);

    const afterDownloadLinkDiv = document.createElement('div');
    afterDownloadLinkWrapper.append(afterDownloadLinkDiv);

    const afterDownloadButtonText = document.createElement('button');
    afterDownloadButtonText.classList.add(
      'download-report_btn',
      'download_report_btnAfter',
      'disabled',
      'bg-light-pink',
      'border-light-pink',
      'text-cream-100'
    );
    afterDownloadButtonText.textContent = downloadLabelAfterCell.textContent.trim();
    afterDownloadLinkDiv.append(afterDownloadButtonText);

    const afterWhatsappLinkWrapper = document.createElement('div');
    afterWhatsappLinkWrapper.classList.add('Whatsapp-link', 'mb-8', 'text-center');
    afterDownloadContent.append(afterWhatsappLinkWrapper);

    // Whatsapp Link (common for both states)
    const whatsappLink = whatsappLinkCell.querySelector('a');
    if (whatsappLink && whatsappLabelCell.textContent.trim()) {
      const whatsappP = document.createElement('p');
      whatsappP.textContent = 'Check Your Milk Report Card on ';

      const whatsappAnchor = document.createElement('a');
      whatsappAnchor.href = whatsappLink.href;
      whatsappAnchor.textContent = whatsappLabelCell.textContent.trim();
      whatsappAnchor.setAttribute('target', '_blank');
      whatsappAnchor.setAttribute('rel', 'noopener noreferrer');
      const screenReaderOnlySpan = document.createElement('span');
      screenReaderOnlySpan.classList.add('cmp-link__screen-reader-only');
      screenReaderOnlySpan.textContent = 'opens in a new tab';
      whatsappAnchor.append(screenReaderOnlySpan);

      whatsappP.append(whatsappAnchor);
      whatsappLinkWrapper.append(whatsappP);
      // Corrected: Clone the entire paragraph to ensure all elements and instrumentation are copied
      afterWhatsappLinkWrapper.append(whatsappP.cloneNode(true));
    }

    // Event listeners for download button
    downloadButton.addEventListener('click', () => {
      beforeDownloadSection.classList.remove('right-subtext__BeforeDownload');
      beforeDownloadSection.style.display = 'none';
      afterDownloadSection.classList.add('right-subtext__AfterDownload');
      afterDownloadSection.style.display = 'flex'; // Use flex to match original
    });
  });

  block.replaceChildren(mainWrapper);
}
