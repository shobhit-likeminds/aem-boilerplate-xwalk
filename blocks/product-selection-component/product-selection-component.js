import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  const mainHeadingRow = children[0];
  // Use content detection for product option rows to avoid index-based access
  const productOptionRows = children.filter((row) => row.children.length === 2 && row.querySelector('picture') && row.querySelector('p'));
  const gheeProductInfoRows = children.filter((row) => row.children.length === 9);
  const milkProductInfoRows = children.filter((row) => row.children.length === 6);

  const mainBox = document.createElement('div');
  mainBox.classList.add('account-mainBox', 'mx-md-16');

  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row', 'gx-5');

  const leftSection = document.createElement('div');
  leftSection.classList.add('mt-8', 'mt-md-10', 'col-lg-4');

  const heading = document.createElement('p');
  heading.classList.add('font-24', 'font-md-40', 'fw-bold', 'product-container_heading', 'font-baskerville');
  moveInstrumentation(mainHeadingRow, heading);
  heading.innerHTML = mainHeadingRow.innerHTML;
  leftSection.append(heading);

  const productMainBox = document.createElement('div');
  productMainBox.classList.add('product-mainbox', 'mt-10', 'mt-md-12');

  productOptionRows.forEach((row) => {
    // Use content detection instead of index for product option cells
    const cells = [...row.children];
    const productImageCell = cells.find(cell => cell.querySelector('picture'));
    const productLabelCell = cells.find(cell => cell.querySelector('p') && !cell.querySelector('picture'));

    const productDiv = document.createElement('div');
    const productHoverDiv = document.createElement('div');
    productHoverDiv.classList.add('milk_ghee_smallImag', 'product-hover');

    if (productImageCell) {
      const picture = productImageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        optimizedPic.querySelector('img').classList.add('left-section-gheeBox', 'object-fit-contain');
        productHoverDiv.append(optimizedPic);
      }
    }

    if (productLabelCell) {
      const label = document.createElement('p');
      label.classList.add('product-subnames');
      label.textContent = productLabelCell.textContent.trim();
      productHoverDiv.append(label);
    }

    moveInstrumentation(row, productDiv);
    productDiv.append(productHoverDiv);
    productMainBox.append(productDiv);
  });
  leftSection.append(productMainBox);
  rowDiv.append(leftSection);

  const rightSection = document.createElement('div');
  rightSection.classList.add('right-section', 'mt-10', 'py-0', 'position-relative', 'col-lg-8');

  // Ghee Product Info
  gheeProductInfoRows.forEach((row, index) => {
    const [
      backgroundDesktopCell,
      backgroundMobileCell,
      headlineBeforeDownloadCell,
      ctaIconBeforeDownloadCell,
      ctaLinkBeforeDownloadCell,
      ctaLabelBeforeDownloadCell,
      headlineAfterDownloadCell,
      ctaIconAfterDownloadCell,
      ctaLabelAfterDownloadCell,
    ] = [...row.children];

    const gheeBox = document.createElement('div');
    gheeBox.classList.add('ghee_box');
    // Initial active state is handled after all elements are appended to rightSection

    const accountMainBgBox = document.createElement('div');
    accountMainBgBox.classList.add('account-mainBg-box', 'w-100');

    const desktopBg = document.createElement('div');
    desktopBg.classList.add('annual-background_image--overlay', 'd-flex', 'annual-bg-desktop');
    const desktopPicture = backgroundDesktopCell.querySelector('picture');
    if (desktopPicture) {
      const img = desktopPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('account-bgImg', 'with-overlay');
      desktopBg.append(optimizedPic);
      const overlayDiv = document.createElement('div'); // Corrected: create div then add class
      overlayDiv.classList.add('overlay');
      desktopBg.append(overlayDiv);
    }
    accountMainBgBox.append(desktopBg);

    const mobileBg = document.createElement('div');
    mobileBg.classList.add('annual-background_image--overlay', 'd-flex', 'annual-bg-mobile');
    const mobilePicture = backgroundMobileCell.querySelector('picture');
    if (mobilePicture) {
      const img = mobilePicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('account-bgImg', 'with-overlay');
      mobileBg.append(optimizedPic);
      const overlayDiv = document.createElement('div'); // Corrected: create div then add class
      overlayDiv.classList.add('overlay');
      mobileBg.append(overlayDiv);
    }
    accountMainBgBox.append(mobileBg);

    const rightSubtextBefore = document.createElement('div');
    rightSubtextBefore.classList.add('right-subtext', 'position-absolute', 'start-0', 'end-0', 'bottom-0', 'right-subtext__BeforeDownload');
    const beforeContent = document.createElement('div');
    beforeContent.classList.add('d-flex', 'flex-column', 'align-items-center');

    const headlineBefore = document.createElement('div');
    headlineBefore.classList.add('ghee-mobile-heading', 'text-center', 'font-md-18', 'font-baskerville', 'leading-32');
    headlineBefore.innerHTML = headlineBeforeDownloadCell.innerHTML;
    beforeContent.append(headlineBefore);

    const downloadButton = document.createElement('button');
    downloadButton.classList.add('annual-report_DownloadBtn', 'my-9');
    const downloadIconDiv = document.createElement('div');
    downloadIconDiv.classList.add('download_icon');
    const ctaIconBefore = ctaIconBeforeDownloadCell.querySelector('picture');
    if (ctaIconBefore) {
      const img = ctaIconBefore.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      downloadIconDiv.append(optimizedPic);
    }
    downloadButton.append(downloadIconDiv);
    beforeContent.append(downloadButton);

    const downloadLinkDiv = document.createElement('div');
    downloadLinkDiv.classList.add('d-flex', 'mb-6');
    const innerDiv = document.createElement('div');
    const downloadLink = document.createElement('a');
    const foundLinkBefore = ctaLinkBeforeDownloadCell.querySelector('a');
    if (foundLinkBefore) {
      downloadLink.href = foundLinkBefore.href;
    } else {
      // Fallback or error handling if link not found
      console.warn('CTA Link (Before Download) not found in cell.');
    }
    downloadLink.download = 'report.pdf'; // Assuming it's a PDF download
    downloadLink.classList.add('text-decoration-none', 'download-report_btn', 'cta-analytics', 'download_report_btnBefore', 'text-cream-100', 'border', 'border-2', 'border-red-100', 'border-maroon-100-hover', 'border-red-300-active', 'bg-red-100', 'bg-maroon-100-hover', 'bg-red-300-active');
    downloadLink.textContent = ctaLabelBeforeDownloadCell.textContent.trim();
    innerDiv.append(downloadLink);
    downloadLinkDiv.append(innerDiv);
    beforeContent.append(downloadLinkDiv);
    rightSubtextBefore.append(beforeContent);
    accountMainBgBox.append(rightSubtextBefore);

    const rightSubtextAfter = document.createElement('div');
    rightSubtextAfter.classList.add('right-subtext', 'position-absolute', 'start-0', 'end-0', 'bottom-0', 'right-section_subtextafter', 'right-subtext__AfterDownload');
    const afterContent = document.createElement('div');
    afterContent.classList.add('d-flex', 'flex-column', 'align-items-center', 'justify-content-around');

    const headlineAfter = document.createElement('div');
    headlineAfter.classList.add('ghee-mobile-heading', 'text-center', 'font-md-18', 'font-baskerville', 'leading-32');
    headlineAfter.innerHTML = headlineAfterDownloadCell.innerHTML;
    afterContent.append(headlineAfter);

    const afterButton = document.createElement('button');
    afterButton.classList.add('annual-report_DownloadBtn', 'my-9');
    const tickDownloadDiv = document.createElement('div');
    tickDownloadDiv.classList.add('tick_download');
    const ctaIconAfter = ctaIconAfterDownloadCell.querySelector('picture');
    if (ctaIconAfter) {
      const img = ctaIconAfter.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      tickDownloadDiv.append(optimizedPic);
    }
    afterButton.append(tickDownloadDiv);
    afterContent.append(afterButton);

    const afterDownloadLinkDiv = document.createElement('div');
    afterDownloadLinkDiv.classList.add('d-flex', 'mb-6');
    const afterInnerDiv = document.createElement('div');
    const afterDownloadButton = document.createElement('button');
    afterDownloadButton.classList.add('download-report_btn', 'download_report_btnAfter', 'disabled', 'bg-light-pink', 'border-light-pink', 'text-cream-100');
    afterDownloadButton.textContent = ctaLabelAfterDownloadCell.textContent.trim();
    afterInnerDiv.append(afterDownloadButton);
    afterDownloadLinkDiv.append(afterInnerDiv);
    afterContent.append(afterDownloadLinkDiv);
    rightSubtextAfter.append(afterContent);
    accountMainBgBox.append(rightSubtextAfter);

    gheeBox.append(accountMainBgBox);
    moveInstrumentation(row, gheeBox);
    rightSection.append(gheeBox);

    downloadButton.addEventListener('click', () => {
      downloadLink.click();
      rightSubtextBefore.classList.remove('right-subtext__BeforeDownload');
      rightSubtextAfter.classList.add('right-subtext__AfterDownload', 'active'); // Ensure active class is added
      rightSubtextAfter.classList.remove('right-subtext__AfterDownload'); // Remove the initial class to show it
    });

    // Add event listener to product option to switch content
    productMainBox.children[index].addEventListener('click', () => {
      rightSection.querySelectorAll('.ghee_box, .milk-section_image').forEach(box => box.classList.remove('active'));
      gheeBox.classList.add('active');
      productMainBox.querySelectorAll('.milk_ghee_smallImag').forEach(item => item.classList.remove('ghee-packet', 'milk-packet'));
      productMainBox.children[index].querySelector('.milk_ghee_smallImag').classList.add('ghee-packet');
    });
  });

  // Milk Product Info
  milkProductInfoRows.forEach((row, index) => {
    const [
      backgroundDesktopCell,
      backgroundMobileCell,
      headlineCell,
      iconCell,
      whatsappLinkCell,
      whatsappLabelCell,
    ] = [...row.children];

    const milkSectionImage = document.createElement('div');
    milkSectionImage.classList.add('position-relative', 'milk-section_image');

    const accountMainBgBox = document.createElement('div');
    accountMainBgBox.classList.add('w-100', 'account-mainBg-box', 'd-flex');

    const desktopBg = document.createElement('div');
    desktopBg.classList.add('annual-background_image--overlay', 'd-flex', 'annual-bg-desktop');
    const desktopPicture = backgroundDesktopCell.querySelector('picture');
    if (desktopPicture) {
      const img = desktopPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('account-bgImg', 'with-overlay');
      desktopBg.append(optimizedPic);
      const overlayDiv = document.createElement('div'); // Corrected: create div then add class
      overlayDiv.classList.add('overlay');
      desktopBg.append(overlayDiv);
    }
    accountMainBgBox.append(desktopBg);

    const mobileBg = document.createElement('div');
    mobileBg.classList.add('annual-background_image--overlay', 'd-flex', 'annual-bg-mobile');
    const mobilePicture = backgroundMobileCell.querySelector('picture');
    if (mobilePicture) {
      const img = mobilePicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('account-bgImg', 'with-overlay');
      mobileBg.append(optimizedPic);
      const overlayDiv = document.createElement('div'); // Corrected: create div then add class
      overlayDiv.classList.add('overlay');
      mobileBg.append(overlayDiv);
    }
    accountMainBgBox.append(mobileBg);

    milkSectionImage.append(accountMainBgBox);

    const rightSubtextMilk = document.createElement('div');
    rightSubtextMilk.classList.add('right-subtext', 'position-absolute', 'start-0', 'end-0', 'bottom-0', 'right-subtext-milk');
    const milkContent = document.createElement('div');
    milkContent.classList.add('d-flex', 'flex-column', 'align-items-center');

    const headline = document.createElement('div');
    headline.classList.add('ghee-mobile-heading', 'text-center', 'font-md-18', 'font-baskerville', 'leading-32');
    headline.innerHTML = headlineCell.innerHTML;
    milkContent.append(headline);

    const iconDiv = document.createElement('div');
    iconDiv.classList.add('my-9');
    const iconPicture = iconCell.querySelector('picture');
    if (iconPicture) {
      const img = iconPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      iconDiv.append(optimizedPic);
    }
    milkContent.append(iconDiv);

    const whatsappLinkDiv = document.createElement('div');
    whatsappLinkDiv.classList.add('Whatsapp-link', 'mb-8', 'text-center');
    const whatsappP = document.createElement('p');
    const whatsappAnchor = document.createElement('a');
    const foundWhatsappLink = whatsappLinkCell.querySelector('a');
    if (foundWhatsappLink) {
      whatsappAnchor.href = foundWhatsappLink.href;
    } else {
      console.warn('WhatsApp Link not found in cell.');
    }
    whatsappAnchor.target = '_blank';
    whatsappAnchor.rel = 'noopener noreferrer';
    whatsappAnchor.textContent = whatsappLabelCell.textContent.trim();
    const srOnlySpan = document.createElement('span');
    srOnlySpan.classList.add('cmp-link__screen-reader-only');
    srOnlySpan.textContent = 'opens in a new tab';
    whatsappAnchor.append(srOnlySpan);
    whatsappP.append('Check Your Milk Report Card on ');
    whatsappP.append(whatsappAnchor);
    whatsappLinkDiv.append(whatsappP);
    milkContent.append(whatsappLinkDiv);

    rightSubtextMilk.append(milkContent);
    milkSectionImage.append(rightSubtextMilk);

    moveInstrumentation(row, milkSectionImage);
    rightSection.append(milkSectionImage);

    // Add event listener to product option to switch content
    productMainBox.children[productOptionRows.length + index].addEventListener('click', () => {
      rightSection.querySelectorAll('.ghee_box, .milk-section_image').forEach(box => box.classList.remove('active'));
      milkSectionImage.classList.add('active');
      productMainBox.querySelectorAll('.milk_ghee_smallImag').forEach(item => item.classList.remove('ghee-packet', 'milk-packet'));
      productMainBox.children[productOptionRows.length + index].querySelector('.milk_ghee_smallImag').classList.add('milk-packet');
    });
  });

  rowDiv.append(rightSection);
  mainBox.append(rowDiv);

  block.classList.add('container-xl', 'annualReport_mainBox');
  block.replaceChildren(mainBox);

  // Initial state: ensure first ghee product is active and its corresponding product option
  const firstGheeBox = rightSection.querySelector('.ghee_box');
  if (firstGheeBox) {
    firstGheeBox.classList.add('active');
  }
  const firstGheeProductOption = productMainBox.querySelector('.milk_ghee_smallImag');
  if (firstGheeProductOption) {
    firstGheeProductOption.classList.add('ghee-packet');
  }
}
