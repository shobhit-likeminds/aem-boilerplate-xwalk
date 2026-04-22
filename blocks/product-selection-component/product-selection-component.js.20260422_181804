import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  const headlineRow = children[0];
  const itemRows = children.slice(1);

  const productSelectorItems = [];
  const gheeProductPanels = [];
  const milkProductPanels = [];

  itemRows.forEach((row) => {
    // Product Selector Item has 2 cells
    if (row.children.length === 2) {
      productSelectorItems.push(row);
    }
    // Ghee Product Panel has 9 cells
    else if (row.children.length === 9) {
      gheeProductPanels.push(row);
    }
    // Milk Product Panel has 6 cells
    else if (row.children.length === 6) {
      milkProductPanels.push(row);
    }
  });

  const mainWrapper = document.createElement('div');
  mainWrapper.classList.add('container-xl', 'annualReport_mainBox', 'product-selection-component');
  moveInstrumentation(block, mainWrapper);

  const accountMainBox = document.createElement('div');
  accountMainBox.classList.add('account-mainBox', 'mx-md-16');
  mainWrapper.append(accountMainBox);

  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row', 'gx-5');
  accountMainBox.append(rowDiv);

  // Left Section
  const leftSection = document.createElement('div');
  leftSection.classList.add('mt-8', 'mt-md-10', 'col-lg-4');
  rowDiv.append(leftSection);

  // Headline
  const headlineP = document.createElement('p');
  headlineP.classList.add(
    'font-24',
    'font-md-40',
    'fw-bold',
    'product-container_heading',
    'font-baskerville',
  );
  moveInstrumentation(headlineRow, headlineP);
  headlineP.innerHTML = headlineRow.innerHTML; // Corrected to read full richtext
  leftSection.append(headlineP);

  // Product Selector
  const productMainBox = document.createElement('div');
  productMainBox.classList.add('product-mainbox', 'mt-10', 'mt-md-12');
  leftSection.append(productMainBox);

  productSelectorItems.forEach((row, index) => {
    const [thumbnailImageCell, productLabelCell] = [...row.children];

    const productDiv = document.createElement('div');
    moveInstrumentation(row, productDiv);

    const productItem = document.createElement('div');
    productItem.classList.add('milk_ghee_smallImag'); // Removed initial ghee-packet/milk-packet
    if (index === 0) {
      productItem.classList.add('ghee-packet', 'product-hover'); // Default active
    } else if (index === 1) {
      productItem.classList.add('milk-packet');
    }

    const picture = thumbnailImageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      productItem.append(optimizedPic);
      optimizedPic.querySelector('img').classList.add('left-section-gheeBox', 'object-fit-contain');
    }

    const productLabelP = document.createElement('p');
    productLabelP.classList.add('product-subnames');
    productLabelP.innerHTML = productLabelCell.innerHTML; // Corrected to read richtext
    productItem.append(productLabelP);

    productDiv.append(productItem);
    productMainBox.append(productDiv);

    productItem.addEventListener('click', () => {
      document.querySelectorAll('.product-hover').forEach((item) => {
        item.classList.remove('product-hover');
      });
      productItem.classList.add('product-hover');
      document.querySelectorAll('.ghee_box, .milk-section_image').forEach((panel) => {
        panel.classList.remove('active');
      });

      if (index === 0) {
        document.querySelector('.ghee_box').classList.add('active');
      } else if (index === 1) {
        document.querySelector('.milk-section_image').classList.add('active');
      }
    });
  });

  // Right Section
  const rightSection = document.createElement('div');
  rightSection.classList.add('right-section', 'mt-10', 'py-0', 'position-relative', 'col-lg-8');
  rowDiv.append(rightSection);

  // Ghee Product Panel
  gheeProductPanels.forEach((row, index) => {
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

    const gheeBox = document.createElement('div');
    gheeBox.classList.add('ghee_box');
    moveInstrumentation(row, gheeBox);
    if (index === 0) {
      gheeBox.classList.add('active'); // Default active
    }
    rightSection.append(gheeBox);

    const accountMainBgBox = document.createElement('div');
    accountMainBgBox.classList.add('account-mainBg-box', 'w-100');
    gheeBox.append(accountMainBgBox);

    // Desktop Background
    const desktopBgOverlay = document.createElement('div');
    desktopBgOverlay.classList.add(
      'annual-background_image--overlay',
      'd-flex',
      'annual-bg-desktop',
    );
    accountMainBgBox.append(desktopBgOverlay);
    const desktopPicture = backgroundDesktopCell.querySelector('picture');
    if (desktopPicture) {
      const img = desktopPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      desktopBgOverlay.append(optimizedPic);
      optimizedPic.querySelector('img').classList.add('account-bgImg', 'with-overlay');
    }
    const desktopOverlayDiv = document.createElement('div');
    desktopOverlayDiv.classList.add('overlay');
    desktopBgOverlay.append(desktopOverlayDiv);

    // Mobile Background
    const mobileBgOverlay = document.createElement('div');
    mobileBgOverlay.classList.add(
      'annual-background_image--overlay',
      'd-flex',
      'annual-bg-mobile',
    );
    accountMainBgBox.append(mobileBgOverlay);
    const mobilePicture = backgroundMobileCell.querySelector('picture');
    if (mobilePicture) {
      const img = mobilePicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      mobileBgOverlay.append(optimizedPic);
      optimizedPic.querySelector('img').classList.add('account-bgImg', 'with-overlay');
    }
    const mobileOverlayDiv = document.createElement('div');
    mobileOverlayDiv.classList.add('overlay');
    mobileBgOverlay.append(mobileOverlayDiv);

    // Before Download Section
    const rightSubtextBefore = document.createElement('div');
    rightSubtextBefore.classList.add(
      'right-subtext',
      'position-absolute',
      'start-0',
      'end-0',
      'bottom-0',
      'right-subtext__BeforeDownload',
    );
    accountMainBgBox.append(rightSubtextBefore);

    const beforeContent = document.createElement('div');
    beforeContent.classList.add('d-flex', 'flex-column', 'align-items-center');
    rightSubtextBefore.append(beforeContent);

    const gheeMobileHeadingBefore = document.createElement('div');
    gheeMobileHeadingBefore.classList.add(
      'ghee-mobile-heading',
      'text-center',
      'font-md-18',
      'font-baskerville',
      'leading-32',
    );
    gheeMobileHeadingBefore.innerHTML = headlineBeforeCell.innerHTML;
    beforeContent.append(gheeMobileHeadingBefore);

    const downloadButtonBefore = document.createElement('button');
    downloadButtonBefore.classList.add('annual-report_DownloadBtn', 'my-9');
    beforeContent.append(downloadButtonBefore);

    const downloadIconDiv = document.createElement('div');
    downloadIconDiv.classList.add('download_icon');
    downloadButtonBefore.append(downloadIconDiv);

    const ctaIconImg = ctaIconCell.querySelector('picture > img');
    if (ctaIconImg) {
      const optimizedPic = createOptimizedPicture(ctaIconImg.src, ctaIconImg.alt, false, [{ width: '750' }]);
      moveInstrumentation(ctaIconImg, optimizedPic.querySelector('img'));
      downloadIconDiv.append(optimizedPic);
    }

    const downloadLinkDiv = document.createElement('div');
    downloadLinkDiv.classList.add('d-flex', 'mb-6');
    beforeContent.append(downloadLinkDiv);

    const downloadLinkWrapper = document.createElement('div');
    downloadLinkDiv.append(downloadLinkWrapper);

    const downloadLink = document.createElement('a');
    downloadLink.classList.add(
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
    const foundCtaLink = ctaLinkCell.querySelector('a');
    if (foundCtaLink) {
      downloadLink.href = foundCtaLink.href;
      downloadLink.setAttribute('download', 'report.pdf'); // Assuming a PDF download
    }
    downloadLink.innerHTML = ctaLabelCell.innerHTML; // Corrected to read richtext
    downloadLinkWrapper.append(downloadLink);

    // After Download Section
    const rightSubtextAfter = document.createElement('div');
    rightSubtextAfter.classList.add(
      'right-subtext',
      'position-absolute',
      'start-0',
      'end-0',
      'bottom-0',
      'right-section_subtextafter',
      'right-subtext__AfterDownload',
    );
    gheeBox.append(rightSubtextAfter);

    const afterContent = document.createElement('div');
    afterContent.classList.add(
      'd-flex',
      'flex-column',
      'align-items-center',
      'justify-content-around',
    );
    rightSubtextAfter.append(afterContent);

    const gheeMobileHeadingAfter = document.createElement('div');
    gheeMobileHeadingAfter.classList.add(
      'ghee-mobile-heading',
      'text-center',
      'font-md-18',
      'font-baskerville',
      'leading-32',
    );
    gheeMobileHeadingAfter.innerHTML = headlineAfterCell.innerHTML;
    afterContent.append(gheeMobileHeadingAfter);

    const downloadButtonAfter = document.createElement('button');
    downloadButtonAfter.classList.add('annual-report_DownloadBtn', 'my-9');
    afterContent.append(downloadButtonAfter);

    const tickDownloadDiv = document.createElement('div');
    tickDownloadDiv.classList.add('tick_download');
    downloadButtonAfter.append(tickDownloadDiv);

    const confirmationIconImg = confirmationIconCell.querySelector('picture > img');
    if (confirmationIconImg) {
      const optimizedPic = createOptimizedPicture(confirmationIconImg.src, confirmationIconImg.alt, false, [{ width: '750' }]);
      moveInstrumentation(confirmationIconImg, optimizedPic.querySelector('img'));
      tickDownloadDiv.append(optimizedPic);
    }

    const downloadLinkAfterDiv = document.createElement('div');
    downloadLinkAfterDiv.classList.add('d-flex', 'mb-6');
    afterContent.append(downloadLinkAfterDiv);

    const downloadLinkAfterWrapper = document.createElement('div');
    downloadLinkAfterDiv.append(downloadLinkAfterWrapper);

    const downloadLinkAfter = document.createElement('button');
    downloadLinkAfter.classList.add(
      'download-report_btn',
      'download_report_btnAfter',
      'disabled',
      'bg-light-pink',
      'border-light-pink',
      'text-cream-100',
    );
    downloadLinkAfter.innerHTML = ctaLabelAfterCell.innerHTML; // Corrected to read richtext
    downloadLinkAfterWrapper.append(downloadLinkAfter);

    // Event listener for download button
    downloadButtonBefore.addEventListener('click', () => {
      // Simulate download
      setTimeout(() => {
        rightSubtextBefore.style.display = 'none';
        rightSubtextAfter.style.display = 'flex';
      }, 100); // Small delay to simulate download
    });
  });

  // Milk Product Panel
  milkProductPanels.forEach((row, index) => {
    const [
      backgroundDesktopCell,
      backgroundMobileCell,
      headlineCell,
      milkIconCell,
      whatsappLinkCell,
      whatsappLabelCell,
    ] = [...row.children];

    const milkSectionImage = document.createElement('div');
    milkSectionImage.classList.add('position-relative', 'milk-section_image');
    moveInstrumentation(row, milkSectionImage);
    rightSection.append(milkSectionImage);

    const accountMainBgBox = document.createElement('div');
    accountMainBgBox.classList.add('w-100', 'account-mainBg-box', 'd-flex');
    milkSectionImage.append(accountMainBgBox);

    // Desktop Background
    const desktopBgOverlay = document.createElement('div');
    desktopBgOverlay.classList.add(
      'annual-background_image--overlay',
      'd-flex',
      'annual-bg-desktop',
    );
    accountMainBgBox.append(desktopBgOverlay);
    const desktopPicture = backgroundDesktopCell.querySelector('picture');
    if (desktopPicture) {
      const img = desktopPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      desktopBgOverlay.append(optimizedPic);
      optimizedPic.querySelector('img').classList.add('account-bgImg', 'with-overlay');
    }
    const desktopOverlayDiv = document.createElement('div');
    desktopOverlayDiv.classList.add('overlay');
    desktopBgOverlay.append(desktopOverlayDiv);

    // Mobile Background
    const mobileBgOverlay = document.createElement('div');
    mobileBgOverlay.classList.add(
      'annual-background_image--overlay',
      'd-flex',
      'annual-bg-mobile',
    );
    accountMainBgBox.append(mobileBgOverlay);
    const mobilePicture = backgroundMobileCell.querySelector('picture');
    if (mobilePicture) {
      const img = mobilePicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      mobileBgOverlay.append(optimizedPic);
      optimizedPic.querySelector('img').classList.add('account-bgImg', 'with-overlay');
    }
    const mobileOverlayDiv = document.createElement('div');
    mobileOverlayDiv.classList.add('overlay');
    mobileBgOverlay.append(mobileOverlayDiv);

    const rightSubtextMilk = document.createElement('div');
    rightSubtextMilk.classList.add(
      'right-subtext',
      'position-absolute',
      'start-0',
      'end-0',
      'bottom-0',
      'right-subtext-milk',
    );
    milkSectionImage.append(rightSubtextMilk);

    const milkContent = document.createElement('div');
    milkContent.classList.add('d-flex', 'flex-column', 'align-items-center');
    rightSubtextMilk.append(milkContent);

    const gheeMobileHeading = document.createElement('div');
    gheeMobileHeading.classList.add(
      'ghee-mobile-heading',
      'text-center',
      'font-md-18',
      'font-baskerville',
      'leading-32',
    );
    gheeMobileHeading.innerHTML = headlineCell.innerHTML;
    milkContent.append(gheeMobileHeading);

    const mt6Div = document.createElement('div');
    mt6Div.classList.add('font-md-18', 'mt-6', 'text-center');
    milkContent.append(mt6Div);

    const my9Div = document.createElement('div');
    my9Div.classList.add('my-9');
    milkContent.append(my9Div);

    const milkIconImg = milkIconCell.querySelector('picture > img');
    if (milkIconImg) {
      const optimizedPic = createOptimizedPicture(milkIconImg.src, milkIconImg.alt, false, [{ width: '750' }]);
      moveInstrumentation(milkIconImg, optimizedPic.querySelector('img'));
      my9Div.append(optimizedPic);
    }

    const whatsappLinkDiv = document.createElement('div');
    whatsappLinkDiv.classList.add('Whatsapp-link', 'mb-8', 'text-center');
    milkContent.append(whatsappLinkDiv);

    const whatsappP = document.createElement('p');
    const whatsappAnchor = document.createElement('a');
    const foundWhatsappLink = whatsappLinkCell.querySelector('a');
    if (foundWhatsappLink) {
      whatsappAnchor.href = foundWhatsappLink.href;
      whatsappAnchor.setAttribute('target', '_blank');
      whatsappAnchor.setAttribute('rel', 'noopener noreferrer');
    }
    whatsappAnchor.innerHTML = whatsappLabelCell.innerHTML; // Corrected to read richtext
    const screenReaderSpan = document.createElement('span');
    screenReaderSpan.classList.add('cmp-link__screen-reader-only');
    screenReaderSpan.textContent = 'opens in a new tab';
    whatsappAnchor.append(screenReaderSpan);
    whatsappP.append('Check Your Milk Report Card on ', whatsappAnchor);
    whatsappLinkDiv.append(whatsappP);
  });

  block.replaceChildren(mainWrapper);
}
