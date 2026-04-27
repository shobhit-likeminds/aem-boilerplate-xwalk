import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];
  const [mainHeadingRow, ...itemRows] = children;

  const productIcons = [];
  const productVariantGhee = [];
  const productVariantMilk = [];

  // Separate item rows based on cell count and content
  itemRows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length === 2 && cells[0].querySelector('picture')) {
      // product-icon-item: [iconImage, productLabel]
      productIcons.push(row);
    } else if (cells.length === 9 && cells[4].querySelector('a')) {
      // product-variant-ghee: [backgroundDesktop, backgroundMobile, headlineBefore, ctaIcon, ctaLink, ctaLabel, headlineAfter, confirmationIcon, ctaLabelAfter]
      productVariantGhee.push(row);
    } else if (cells.length === 6 && cells[4].querySelector('a')) {
      // product-variant-milk: [backgroundDesktop, backgroundMobile, headline, ctaIcon, whatsappLink, whatsappLabel]
      productVariantMilk.push(row);
    }
  });

  const productSelectionWrapper = document.createElement('div');
  productSelectionWrapper.classList.add('container-xl', 'annualReport_mainBox', 'product-selection-component');

  const accountMainBox = document.createElement('div');
  accountMainBox.classList.add('account-mainBox', 'mx-md-16');
  productSelectionWrapper.append(accountMainBox);

  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row', 'gx-5');
  accountMainBox.append(rowDiv);

  // Left Section
  const leftSection = document.createElement('div');
  leftSection.classList.add('mt-8', 'mt-md-10', 'col-lg-4');
  rowDiv.append(leftSection);

  const headingP = document.createElement('p');
  headingP.classList.add('font-24', 'font-md-40', 'fw-bold', 'product-container_heading', 'font-baskerville');
  moveInstrumentation(mainHeadingRow, headingP);
  headingP.innerHTML = mainHeadingRow.firstElementChild.innerHTML;
  leftSection.append(headingP);

  const productMainBox = document.createElement('div');
  productMainBox.classList.add('product-mainbox', 'mt-10', 'mt-md-12');
  leftSection.append(productMainBox);

  const productIconWrappers = [];
  productIcons.forEach((row, index) => {
    const cells = [...row.children];
    const iconImageCell = cells.find(cell => cell.querySelector('picture'));
    const productLabelCell = cells.find(cell => !cell.querySelector('picture'));

    const iconWrapper = document.createElement('div');
    const innerWrapper = document.createElement('div');
    innerWrapper.classList.add('milk_ghee_smallImag', index === 0 ? 'ghee-packet' : 'milk-packet');
    if (index === 0) {
      innerWrapper.classList.add('product-hover');
    }
    moveInstrumentation(row, innerWrapper);

    const img = iconImageCell.querySelector('picture');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.querySelector('img').src, img.querySelector('img').alt, false, [{ width: '750' }]);
      moveInstrumentation(img.querySelector('img'), optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('left-section-gheeBox', 'object-fit-contain');
      innerWrapper.append(optimizedPic);
    }

    const labelP = document.createElement('p');
    labelP.classList.add('product-subnames');
    labelP.textContent = productLabelCell.textContent.trim();
    innerWrapper.append(labelP);
    iconWrapper.append(innerWrapper);
    productMainBox.append(iconWrapper);
    productIconWrappers.push(innerWrapper);
  });

  // Right Section
  const rightSection = document.createElement('div');
  rightSection.classList.add('right-section', 'mt-10', 'py-0', 'position-relative', 'col-lg-8');
  rowDiv.append(rightSection);

  const gheeBox = document.createElement('div');
  gheeBox.classList.add('ghee_box');
  rightSection.append(gheeBox);

  const milkSectionImage = document.createElement('div');
  milkSectionImage.classList.add('position-relative', 'milk-section_image');
  rightSection.append(milkSectionImage);

  // Ghee Variant
  if (productVariantGhee.length > 0) {
    const gheeRow = productVariantGhee[0]; // Assuming only one ghee variant for now
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
    ] = [...gheeRow.children];

    const accountMainBgBoxGhee = document.createElement('div');
    accountMainBgBoxGhee.classList.add('account-mainBg-box', 'w-100');
    moveInstrumentation(gheeRow, accountMainBgBoxGhee);
    gheeBox.append(accountMainBgBoxGhee);

    const desktopBgGhee = document.createElement('div');
    desktopBgGhee.classList.add('annual-background_image--overlay', 'd-flex', 'annual-bg-desktop');
    const desktopPicGhee = backgroundDesktopCell.querySelector('picture');
    if (desktopPicGhee) {
      const optimizedPic = createOptimizedPicture(desktopPicGhee.querySelector('img').src, desktopPicGhee.querySelector('img').alt, false, [{ width: '750' }]);
      moveInstrumentation(desktopPicGhee.querySelector('img'), optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('account-bgImg', 'with-overlay');
      desktopBgGhee.append(optimizedPic);
    }
    const overlayDivGheeDesktop = document.createElement('div');
    overlayDivGheeDesktop.classList.add('overlay');
    desktopBgGhee.append(overlayDivGheeDesktop);
    accountMainBgBoxGhee.append(desktopBgGhee);

    const mobileBgGhee = document.createElement('div');
    mobileBgGhee.classList.add('annual-background_image--overlay', 'd-flex', 'annual-bg-mobile');
    const mobilePicGhee = backgroundMobileCell.querySelector('picture');
    if (mobilePicGhee) {
      const optimizedPic = createOptimizedPicture(mobilePicGhee.querySelector('img').src, mobilePicGhee.querySelector('img').alt, false, [{ width: '750' }]);
      moveInstrumentation(mobilePicGhee.querySelector('img'), optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('account-bgImg', 'with-overlay');
      mobileBgGhee.append(optimizedPic);
    }
    const overlayDivGheeMobile = document.createElement('div');
    overlayDivGheeMobile.classList.add('overlay');
    mobileBgGhee.append(overlayDivGheeMobile);
    accountMainBgBoxGhee.append(mobileBgGhee);

    // Before Download
    const rightSubtextBefore = document.createElement('div');
    rightSubtextBefore.classList.add('right-subtext', 'position-absolute', 'start-0', 'end-0', 'bottom-0', 'right-subtext__BeforeDownload');
    accountMainBgBoxGhee.append(rightSubtextBefore);

    const beforeContent = document.createElement('div');
    beforeContent.classList.add('d-flex', 'flex-column', 'align-items-center');
    rightSubtextBefore.append(beforeContent);

    const gheeMobileHeadingBefore = document.createElement('div');
    gheeMobileHeadingBefore.classList.add('ghee-mobile-heading', 'text-center', 'font-md-18', 'font-baskerville', 'leading-32');
    gheeMobileHeadingBefore.innerHTML = headlineBeforeCell.innerHTML;
    beforeContent.append(gheeMobileHeadingBefore);

    const downloadButtonBefore = document.createElement('button');
    downloadButtonBefore.classList.add('annual-report_DownloadBtn', 'my-9');
    beforeContent.append(downloadButtonBefore);

    const downloadIconDiv = document.createElement('div');
    downloadIconDiv.classList.add('download_icon');
    const ctaIconPic = ctaIconCell.querySelector('picture');
    if (ctaIconPic) {
      const optimizedPic = createOptimizedPicture(ctaIconPic.querySelector('img').src, ctaIconPic.querySelector('img').alt, false, [{ width: '750' }]);
      moveInstrumentation(ctaIconPic.querySelector('img'), optimizedPic.querySelector('img'));
      downloadIconDiv.append(optimizedPic);
    }
    downloadButtonBefore.append(downloadIconDiv);

    const downloadLinkWrapper = document.createElement('div');
    downloadLinkWrapper.classList.add('d-flex', 'mb-6');
    beforeContent.append(downloadLinkWrapper);

    const downloadLinkDiv = document.createElement('div');
    downloadLinkWrapper.append(downloadLinkDiv);

    const downloadAnchor = document.createElement('a');
    downloadAnchor.classList.add('text-decoration-none', 'download-report_btn', 'cta-analytics', 'download_report_btnBefore', 'text-cream-100', 'border', 'border-2', 'border-red-100', 'border-maroon-100-hover', 'border-red-300-active', 'bg-red-100', 'bg-maroon-100-hover', 'bg-red-300-active');
    const ctaLink = ctaLinkCell.querySelector('a');
    if (ctaLink) {
      downloadAnchor.href = ctaLink.href;
    }
    downloadAnchor.textContent = ctaLabelCell.textContent.trim();
    downloadAnchor.setAttribute('download', 'report.pdf'); // Assuming this attribute from original HTML
    downloadLinkDiv.append(downloadAnchor);

    // After Download
    const rightSubtextAfter = document.createElement('div');
    rightSubtextAfter.classList.add('right-subtext', 'position-absolute', 'start-0', 'end-0', 'bottom-0', 'right-section_subtextafter', 'right-subtext__AfterDownload');
    accountMainBgBoxGhee.append(rightSubtextAfter);

    const afterContent = document.createElement('div');
    afterContent.classList.add('d-flex', 'flex-column', 'align-items-center', 'justify-content-around');
    rightSubtextAfter.append(afterContent);

    const gheeMobileHeadingAfter = document.createElement('div');
    gheeMobileHeadingAfter.classList.add('ghee-mobile-heading', 'text-center', 'font-md-18', 'font-baskerville', 'leading-32');
    gheeMobileHeadingAfter.innerHTML = headlineAfterCell.innerHTML;
    afterContent.append(gheeMobileHeadingAfter);

    const downloadButtonAfter = document.createElement('button');
    downloadButtonAfter.classList.add('annual-report_DownloadBtn', 'my-9');
    afterContent.append(downloadButtonAfter);

    const tickDownloadDiv = document.createElement('div');
    tickDownloadDiv.classList.add('tick_download');
    const confirmationIconPic = confirmationIconCell.querySelector('picture');
    if (confirmationIconPic) {
      const optimizedPic = createOptimizedPicture(confirmationIconPic.querySelector('img').src, confirmationIconPic.querySelector('img').alt, false, [{ width: '750' }]);
      moveInstrumentation(confirmationIconPic.querySelector('img'), optimizedPic.querySelector('img'));
      tickDownloadDiv.append(optimizedPic);
    }
    downloadButtonAfter.append(tickDownloadDiv);

    const downloadAfterLinkWrapper = document.createElement('div');
    downloadAfterLinkWrapper.classList.add('d-flex', 'mb-6');
    afterContent.append(downloadAfterLinkWrapper);

    const downloadAfterLinkDiv = document.createElement('div');
    downloadAfterLinkWrapper.append(downloadAfterLinkDiv);

    const downloadButtonAfterEl = document.createElement('button');
    downloadButtonAfterEl.classList.add('download-report_btn', 'download_report_btnAfter', 'disabled', 'bg-light-pink', 'border-light-pink', 'text-cream-100');
    downloadButtonAfterEl.textContent = ctaLabelAfterCell.textContent.trim();
    downloadAfterLinkDiv.append(downloadButtonAfterEl);

    // Event listener for download button
    downloadButtonBefore.addEventListener('click', () => {
      downloadAnchor.click(); // Trigger download
      rightSubtextBefore.style.display = 'none';
      rightSubtextAfter.style.display = 'flex'; // Use flex to match original display
    });

    // Initial state
    rightSubtextAfter.style.display = 'none';
  }

  // Milk Variant
  if (productVariantMilk.length > 0) {
    const milkRow = productVariantMilk[0]; // Assuming only one milk variant for now
    const [
      backgroundDesktopCell,
      backgroundMobileCell,
      headlineCell,
      ctaIconCell,
      whatsappLinkCell,
      whatsappLabelCell,
    ] = [...milkRow.children];

    const accountMainBgBoxMilk = document.createElement('div');
    accountMainBgBoxMilk.classList.add('w-100', 'account-mainBg-box', 'd-flex');
    moveInstrumentation(milkRow, accountMainBgBoxMilk);
    milkSectionImage.append(accountMainBgBoxMilk);

    const desktopBgMilk = document.createElement('div');
    desktopBgMilk.classList.add('annual-background_image--overlay', 'd-flex', 'annual-bg-desktop');
    const desktopPicMilk = backgroundDesktopCell.querySelector('picture');
    if (desktopPicMilk) {
      const optimizedPic = createOptimizedPicture(desktopPicMilk.querySelector('img').src, desktopPicMilk.querySelector('img').alt, false, [{ width: '750' }]);
      moveInstrumentation(desktopPicMilk.querySelector('img'), optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('account-bgImg', 'with-overlay');
      desktopBgMilk.append(optimizedPic);
    }
    const overlayDivMilkDesktop = document.createElement('div');
    overlayDivMilkDesktop.classList.add('overlay');
    desktopBgMilk.append(overlayDivMilkDesktop);
    accountMainBgBoxMilk.append(desktopBgMilk);

    const mobileBgMilk = document.createElement('div');
    mobileBgMilk.classList.add('annual-background_image--overlay', 'd-flex', 'annual-bg-mobile');
    const mobilePicMilk = backgroundMobileCell.querySelector('picture');
    if (mobilePicMilk) {
      const optimizedPic = createOptimizedPicture(mobilePicMilk.querySelector('img').src, mobilePicMilk.querySelector('img').alt, false, [{ width: '750' }]);
      moveInstrumentation(mobilePicMilk.querySelector('img'), optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('account-bgImg', 'with-overlay');
      mobileBgMilk.append(optimizedPic);
    }
    const overlayDivMilkMobile = document.createElement('div');
    overlayDivMilkMobile.classList.add('overlay');
    mobileBgMilk.append(overlayDivMilkMobile);
    accountMainBgBoxMilk.append(mobileBgMilk);

    const rightSubtextMilk = document.createElement('div');
    rightSubtextMilk.classList.add('right-subtext', 'position-absolute', 'start-0', 'end-0', 'bottom-0', 'right-subtext-milk');
    milkSectionImage.append(rightSubtextMilk);

    const milkContent = document.createElement('div');
    milkContent.classList.add('d-flex', 'flex-column', 'align-items-center');
    rightSubtextMilk.append(milkContent);

    const gheeMobileHeadingMilk = document.createElement('div');
    gheeMobileHeadingMilk.classList.add('ghee-mobile-heading', 'text-center', 'font-md-18', 'font-baskerville', 'leading-32');
    gheeMobileHeadingMilk.innerHTML = headlineCell.innerHTML;
    milkContent.append(gheeMobileHeadingMilk);

    const emptyDiv = document.createElement('div');
    emptyDiv.classList.add('font-md-18', 'mt-6', 'text-center');
    milkContent.append(emptyDiv);

    const ctaIconWrapper = document.createElement('div');
    ctaIconWrapper.classList.add('my-9');
    const ctaIconPic = ctaIconCell.querySelector('picture');
    if (ctaIconPic) {
      const optimizedPic = createOptimizedPicture(ctaIconPic.querySelector('img').src, ctaIconPic.querySelector('img').alt, false, [{ width: '750' }]);
      moveInstrumentation(ctaIconPic.querySelector('img'), optimizedPic.querySelector('img'));
      ctaIconWrapper.append(optimizedPic);
    }
    milkContent.append(ctaIconWrapper);

    const whatsappLinkWrapper = document.createElement('div');
    whatsappLinkWrapper.classList.add('Whatsapp-link', 'mb-8', 'text-center');
    milkContent.append(whatsappLinkWrapper);

    const whatsappP = document.createElement('p');
    const whatsappAnchor = document.createElement('a');
    const whatsappLink = whatsappLinkCell.querySelector('a');
    if (whatsappLink) {
      whatsappAnchor.href = whatsappLink.href;
    }
    whatsappAnchor.textContent = whatsappLabelCell.textContent.trim();
    whatsappAnchor.setAttribute('target', '_blank');
    whatsappAnchor.setAttribute('rel', 'noopener noreferrer');
    whatsappP.append('Check Your Milk Report Card on ', whatsappAnchor);
    whatsappLinkWrapper.append(whatsappP);
  }

  // Toggle functionality for product icons
  productIconWrappers.forEach((iconWrapper, index) => {
    iconWrapper.addEventListener('click', () => {
      productIconWrappers.forEach((wrapper) => wrapper.classList.remove('product-hover'));
      iconWrapper.classList.add('product-hover');

      if (index === 0) { // Ghee
        gheeBox.style.display = 'block';
        milkSectionImage.style.display = 'none';
      } else { // Milk
        gheeBox.style.display = 'none';
        milkSectionImage.style.display = 'block';
      }
    });
  });

  // Initial display state
  if (productVariantGhee.length > 0) {
    gheeBox.style.display = 'block';
  } else {
    gheeBox.style.display = 'none';
  }
  // Only show milk section if it exists and ghee is not active initially
  if (productVariantMilk.length > 0 && productVariantGhee.length === 0) {
    milkSectionImage.style.display = 'block';
  } else {
    milkSectionImage.style.display = 'none';
  }

  // Set initial active state for the first product icon if available
  if (productIconWrappers.length > 0) {
    productIconWrappers[0].classList.add('product-hover');
  }

  block.replaceChildren(productSelectionWrapper);
}
