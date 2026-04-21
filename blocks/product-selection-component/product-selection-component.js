import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  const mainHeadingRow = children[0];
  const itemRows = children.slice(1);

  const productItems = itemRows.filter((row) => row.children.length === 2);
  const reportSections = itemRows.filter((row) => row.children.length === 7);
  const milkSections = itemRows.filter((row) => row.children.length === 5);

  const mainContainer = document.createElement('div');
  mainContainer.classList.add('container-xl', 'annualReport_mainBox', 'product-selection-component');
  moveInstrumentation(block, mainContainer);

  const accountMainBox = document.createElement('div');
  accountMainBox.classList.add('account-mainBox', 'mx-md-16');
  mainContainer.append(accountMainBox);

  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row', 'gx-5');
  accountMainBox.append(rowDiv);

  // Left Section (Products)
  const leftSection = document.createElement('div');
  leftSection.classList.add('mt-8', 'mt-md-10', 'col-lg-4');
  rowDiv.append(leftSection);

  const headingP = document.createElement('p');
  headingP.classList.add('font-24', 'font-md-40', 'fw-bold', 'product-container_heading', 'font-baskerville');
  moveInstrumentation(mainHeadingRow, headingP);
  headingP.textContent = mainHeadingRow.textContent.trim();
  leftSection.append(headingP);

  const productMainBox = document.createElement('div');
  productMainBox.classList.add('product-mainbox', 'mt-10', 'mt-md-12');
  leftSection.append(productMainBox);

  productItems.forEach((row, index) => {
    const [imageCell, labelCell] = [...row.children];

    const productDiv = document.createElement('div');
    moveInstrumentation(row, productDiv);

    const productItemDiv = document.createElement('div');
    productItemDiv.classList.add('milk_ghee_smallImag', index === 0 ? 'ghee-packet' : 'milk-packet');
    if (index === 0) {
      productItemDiv.classList.add('product-hover');
    }

    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      productItemDiv.append(optimizedPic);
      optimizedPic.querySelector('img').classList.add('left-section-gheeBox', 'object-fit-contain');
    }

    const labelP = document.createElement('p');
    labelP.classList.add('product-subnames');
    labelP.textContent = labelCell.textContent.trim();
    productItemDiv.append(labelP);

    productDiv.append(productItemDiv);
    productMainBox.append(productDiv);
  });

  // Right Section (Reports and Milk)
  const rightSection = document.createElement('div');
  rightSection.classList.add('right-section', 'mt-10', 'py-0', 'position-relative', 'col-lg-8');
  rowDiv.append(rightSection);

  // Report Sections
  reportSections.forEach((row, index) => {
    const [
      bgImageDesktopCell,
      bgImageMobileCell,
      reportHeadingCell,
      downloadIconCell,
      downloadLinkCell,
      downloadedIconCell,
      downloadedTextCell,
    ] = [...row.children];

    const gheeBox = document.createElement('div');
    gheeBox.classList.add('ghee_box');
    if (index === 0) {
      gheeBox.classList.add('active'); // Initially active
    }
    moveInstrumentation(row, gheeBox);

    const accountMainBgBox = document.createElement('div');
    accountMainBgBox.classList.add('account-mainBg-box', 'w-100');
    gheeBox.append(accountMainBgBox);

    // Desktop background image
    const desktopOverlay = document.createElement('div');
    desktopOverlay.classList.add('annual-background_image--overlay', 'd-flex', 'annual-bg-desktop');
    const desktopPicture = bgImageDesktopCell.querySelector('picture');
    if (desktopPicture) {
      const img = desktopPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      desktopOverlay.append(optimizedPic);
      optimizedPic.querySelector('img').classList.add('account-bgImg', 'with-overlay');
    }
    const desktopOverlayDiv = document.createElement('div');
    desktopOverlayDiv.classList.add('overlay');
    desktopOverlay.append(desktopOverlayDiv);
    accountMainBgBox.append(desktopOverlay);

    // Mobile background image
    const mobileOverlay = document.createElement('div');
    mobileOverlay.classList.add('annual-background_image--overlay', 'd-flex', 'annual-bg-mobile');
    const mobilePicture = bgImageMobileCell.querySelector('picture');
    if (mobilePicture) {
      const img = mobilePicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      mobileOverlay.append(optimizedPic);
      optimizedPic.querySelector('img').classList.add('account-bgImg', 'with-overlay');
    }
    const mobileOverlayDiv = document.createElement('div');
    mobileOverlayDiv.classList.add('overlay');
    mobileOverlay.append(mobileOverlayDiv);
    accountMainBgBox.append(mobileOverlay);

    // Before Download section
    const rightSubtextBefore = document.createElement('div');
    rightSubtextBefore.classList.add('right-subtext', 'position-absolute', 'start-0', 'end-0', 'bottom-0', 'right-subtext__BeforeDownload');
    gheeBox.append(rightSubtextBefore);

    const flexContainerBefore = document.createElement('div');
    flexContainerBefore.classList.add('d-flex', 'flex-column', 'align-items-center');
    rightSubtextBefore.append(flexContainerBefore);

    const headingBefore = document.createElement('div');
    headingBefore.classList.add('ghee-mobile-heading', 'text-center', 'font-md-18', 'font-baskerville', 'leading-32');
    headingBefore.innerHTML = reportHeadingCell.innerHTML;
    flexContainerBefore.append(headingBefore);

    const downloadButton = document.createElement('button');
    downloadButton.classList.add('annual-report_DownloadBtn', 'my-9');
    flexContainerBefore.append(downloadButton);

    const downloadIconDiv = document.createElement('div');
    downloadIconDiv.classList.add('download_icon');
    const downloadIconPicture = downloadIconCell.querySelector('picture');
    if (downloadIconPicture) {
      const img = downloadIconPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      downloadIconDiv.append(optimizedPic);
    }
    downloadButton.append(downloadIconDiv);

    const downloadLinkContainer = document.createElement('div');
    downloadLinkContainer.classList.add('d-flex', 'mb-6');
    flexContainerBefore.append(downloadLinkContainer);

    const downloadLinkDiv = document.createElement('div');
    downloadLinkContainer.append(downloadLinkDiv);

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
      'bg-red-300-active',
    );
    const foundDownloadLink = downloadLinkCell.querySelector('a');
    if (foundDownloadLink) {
      downloadAnchor.href = foundDownloadLink.href;
      // Read the download link text from the model, not hardcoded
      downloadAnchor.textContent = foundDownloadLink.textContent.trim() || 'Download report';
      // Extract filename from href for download attribute
      const filename = foundDownloadLink.href.split('/').pop().split('?')[0];
      downloadAnchor.setAttribute('download', filename);
    }
    downloadLinkDiv.append(downloadAnchor);

    const whatsappLinkDiv = document.createElement('div');
    whatsappLinkDiv.classList.add('Whatsapp-link', 'mb-8', 'text-center');
    flexContainerBefore.append(whatsappLinkDiv);

    // After Download section
    const rightSubtextAfter = document.createElement('div');
    rightSubtextAfter.classList.add('right-subtext', 'position-absolute', 'start-0', 'end-0', 'bottom-0', 'right-section_subtextafter', 'right-subtext__AfterDownload');
    gheeBox.append(rightSubtextAfter);

    const flexContainerAfter = document.createElement('div');
    flexContainerAfter.classList.add('d-flex', 'flex-column', 'align-items-center', 'justify-content-around');
    rightSubtextAfter.append(flexContainerAfter);

    const headingAfter = document.createElement('div');
    headingAfter.classList.add('ghee-mobile-heading', 'text-center', 'font-md-18', 'font-baskerville', 'leading-32');
    headingAfter.innerHTML = downloadedTextCell.innerHTML;
    flexContainerAfter.append(headingAfter);

    const downloadedButton = document.createElement('button');
    downloadedButton.classList.add('annual-report_DownloadBtn', 'my-9');
    flexContainerAfter.append(downloadedButton);

    const downloadedIconDiv = document.createElement('div');
    downloadedIconDiv.classList.add('tick_download');
    const downloadedIconPicture = downloadedIconCell.querySelector('picture');
    if (downloadedIconPicture) {
      const img = downloadedIconPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      downloadedIconDiv.append(optimizedPic);
    }
    downloadedButton.append(downloadedIconDiv);

    const downloadedLinkContainer = document.createElement('div');
    downloadedLinkContainer.classList.add('d-flex', 'mb-6');
    flexContainerAfter.append(downloadedLinkContainer);

    const downloadedLinkDiv = document.createElement('div');
    downloadedLinkContainer.append(downloadedLinkDiv);

    const downloadedButtonEl = document.createElement('button');
    downloadedButtonEl.classList.add('download-report_btn', 'download_report_btnAfter', 'disabled', 'bg-light-pink', 'border-light-pink', 'text-cream-100');
    // Read the download link text from the model, not hardcoded
    downloadedButtonEl.textContent = foundDownloadLink?.textContent.trim() || 'Download report';
    downloadedLinkDiv.append(downloadedButtonEl);

    const downloadedWhatsappLinkDiv = document.createElement('div');
    downloadedWhatsappLinkDiv.classList.add('Whatsapp-link', 'mb-8', 'text-center');
    flexContainerAfter.append(downloadedWhatsappLinkDiv);

    // Event listeners for download functionality
    downloadButton.addEventListener('click', () => {
      if (downloadAnchor.href) {
        window.open(downloadAnchor.href, '_blank');
        rightSubtextBefore.style.display = 'none';
        rightSubtextAfter.style.display = 'flex';
      }
    });

    rightSection.append(gheeBox);
  });

  // Milk Sections
  milkSections.forEach((row, index) => {
    const [
      bgImageDesktopCell,
      bgImageMobileCell,
      milkHeadingCell,
      milkIconCell,
      whatsappLinkCell,
    ] = [...row.children];

    const milkSectionImage = document.createElement('div');
    milkSectionImage.classList.add('position-relative', 'milk-section_image');
    if (index === 0) {
      milkSectionImage.classList.add('active'); // Initially active
    }
    moveInstrumentation(row, milkSectionImage);

    const accountMainBgBox = document.createElement('div');
    accountMainBgBox.classList.add('w-100', 'account-mainBg-box', 'd-flex');
    milkSectionImage.append(accountMainBgBox);

    // Desktop background image
    const desktopOverlay = document.createElement('div');
    desktopOverlay.classList.add('annual-background_image--overlay', 'd-flex', 'annual-bg-desktop');
    const desktopPicture = bgImageDesktopCell.querySelector('picture');
    if (desktopPicture) {
      const img = desktopPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      desktopOverlay.append(optimizedPic);
      optimizedPic.querySelector('img').classList.add('account-bgImg', 'with-overlay');
    }
    const desktopOverlayDiv = document.createElement('div');
    desktopOverlayDiv.classList.add('overlay');
    desktopOverlay.append(desktopOverlayDiv);
    accountMainBgBox.append(desktopOverlay);

    // Mobile background image
    const mobileOverlay = document.createElement('div');
    mobileOverlay.classList.add('annual-background_image--overlay', 'd-flex', 'annual-bg-mobile');
    const mobilePicture = bgImageMobileCell.querySelector('picture');
    if (mobilePicture) {
      const img = mobilePicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      mobileOverlay.append(optimizedPic);
      optimizedPic.querySelector('img').classList.add('account-bgImg', 'with-overlay');
    }
    const mobileOverlayDiv = document.createElement('div');
    mobileOverlayDiv.classList.add('overlay');
    mobileOverlay.append(mobileOverlayDiv);
    accountMainBgBox.append(mobileOverlay);

    const rightSubtextMilk = document.createElement('div');
    rightSubtextMilk.classList.add('right-subtext', 'position-absolute', 'start-0', 'end-0', 'bottom-0', 'right-subtext-milk');
    milkSectionImage.append(rightSubtextMilk);

    const flexContainerMilk = document.createElement('div');
    flexContainerMilk.classList.add('d-flex', 'flex-column', 'align-items-center');
    rightSubtextMilk.append(flexContainerMilk);

    const milkHeadingDiv = document.createElement('div');
    milkHeadingDiv.classList.add('ghee-mobile-heading', 'text-center', 'font-md-18', 'font-baskerville', 'leading-32');
    milkHeadingDiv.innerHTML = milkHeadingCell.innerHTML;
    flexContainerMilk.append(milkHeadingDiv);

    const fontDiv = document.createElement('div');
    fontDiv.classList.add('font-md-18', 'mt-6', 'text-center');
    flexContainerMilk.append(fontDiv);

    const milkIconDiv = document.createElement('div');
    milkIconDiv.classList.add('my-9');
    const milkIconPicture = milkIconCell.querySelector('picture');
    if (milkIconPicture) {
      const img = milkIconPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      milkIconDiv.append(optimizedPic);
    }
    flexContainerMilk.append(milkIconDiv);

    const whatsappLinkDiv = document.createElement('div');
    whatsappLinkDiv.classList.add('Whatsapp-link', 'mb-8', 'text-center');
    const foundWhatsappLink = whatsappLinkCell.querySelector('a');
    if (foundWhatsappLink) {
      const whatsappAnchor = document.createElement('a');
      whatsappAnchor.href = foundWhatsappLink.href;
      whatsappAnchor.textContent = foundWhatsappLink.textContent;
      whatsappAnchor.target = '_blank';
      whatsappAnchor.rel = 'noopener noreferrer';
      const screenReaderOnly = document.createElement('span');
      screenReaderOnly.classList.add('cmp-link__screen-reader-only');
      screenReaderOnly.textContent = 'opens in a new tab';
      whatsappAnchor.append(screenReaderOnly);
      const p = document.createElement('p');
      // The original HTML has "Check Your Milk Report Card on " followed by the anchor.
      // Replicate this structure, reading the text from the original cell if available.
      const preText = whatsappLinkCell.textContent.split(foundWhatsappLink.textContent)[0].trim();
      if (preText) {
        p.textContent = preText;
      } else {
        p.textContent = 'Check Your Milk Report Card on '; // Fallback if preText is empty
      }
      p.append(whatsappAnchor);
      whatsappLinkDiv.append(p);
    }
    flexContainerMilk.append(whatsappLinkDiv);

    rightSection.append(milkSectionImage);
  });

  block.replaceChildren(mainContainer);

  // Add click handlers for product selection
  const productHoverElements = document.querySelectorAll('.product-mainbox .milk_ghee_smallImag');
  const gheeBoxElements = document.querySelectorAll('.ghee_box');
  const milkSectionElements = document.querySelectorAll('.milk-section_image');

  productHoverElements.forEach((productEl, index) => {
    productEl.addEventListener('click', () => {
      // Remove active class from all products
      productHoverElements.forEach((el) => el.classList.remove('product-hover'));
      // Add active class to clicked product
      productEl.classList.add('product-hover');

      // Hide all report and milk sections
      gheeBoxElements.forEach((el) => el.classList.remove('active'));
      milkSectionElements.forEach((el) => el.classList.remove('active'));

      // Show the corresponding section
      if (index === 0) { // Ghee
        gheeBoxElements[0].classList.add('active');
      } else { // Milk
        milkSectionElements[0].classList.add('active');
      }
    });
  });
}
