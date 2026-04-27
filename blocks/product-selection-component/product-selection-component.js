import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];
  const [headlineRow, ...itemRows] = children;

  const productSelectorItems = itemRows.filter((row) => row.children.length === 2);
  const gheePanels = itemRows.filter((row) => row.children.length === 9);
  const milkPanels = itemRows.filter((row) => row.children.length === 6);

  const container = document.createElement('div');
  container.classList.add('container-xl', 'annualReport_mainBox', 'product-selection-component');

  const accountMainBox = document.createElement('div');
  accountMainBox.classList.add('account-mainBox', 'mx-md-16');
  container.append(accountMainBox);

  const row = document.createElement('div');
  row.classList.add('row', 'gx-5');
  accountMainBox.append(row);

  const leftSection = document.createElement('div');
  leftSection.classList.add('mt-8', 'mt-md-10', 'col-lg-4');
  row.append(leftSection);

  const headline = document.createElement('p');
  headline.classList.add(
    'font-24',
    'font-md-40',
    'fw-bold',
    'product-container_heading',
    'font-baskerville',
  );
  moveInstrumentation(headlineRow, headline);
  // headlineRow is a richtext field, so its content is the innerHTML of the row itself.
  // The original HTML shows <p> inside the div, so firstElementChild.innerHTML is correct.
  headline.innerHTML = headlineRow.firstElementChild.innerHTML;
  leftSection.append(headline);

  const productMainBox = document.createElement('div');
  productMainBox.classList.add('product-mainbox', 'mt-10', 'mt-md-12');
  leftSection.append(productMainBox);

  const rightSection = document.createElement('div');
  rightSection.classList.add('right-section', 'mt-10', 'py-0', 'position-relative', 'col-lg-8');
  row.append(rightSection);

  const gheeBox = document.createElement('div');
  gheeBox.classList.add('ghee_box');
  rightSection.append(gheeBox);

  const milkSectionImage = document.createElement('div');
  milkSectionImage.classList.add('position-relative', 'milk-section_image');
  rightSection.append(milkSectionImage);

  productSelectorItems.forEach((productRow, index) => {
    const [productImageCell, productLabelCell] = [...productRow.children];

    const productWrapper = document.createElement('div');
    moveInstrumentation(productRow, productWrapper);

    const productItem = document.createElement('div');
    productItem.classList.add('milk_ghee_smallImag', 'product-hover');
    if (index === 0) {
      productItem.classList.add('ghee-packet');
    } else if (index === 1) {
      productItem.classList.add('milk-packet');
    }

    const img = productImageCell.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('left-section-gheeBox', 'object-fit-contain');
      productItem.append(optimizedPic);
    }

    const label = document.createElement('p');
    label.classList.add('product-subnames');
    label.textContent = productLabelCell.textContent.trim();
    productItem.append(label);

    productWrapper.append(productItem);
    productMainBox.append(productWrapper);

    productItem.addEventListener('click', () => {
      document.querySelectorAll('.product-mainbox .milk_ghee_smallImag').forEach((item) => {
        item.classList.remove('product-hover');
      });
      productItem.classList.add('product-hover');

      if (productItem.classList.contains('ghee-packet')) {
        gheeBox.style.display = 'block';
        milkSectionImage.style.display = 'none';
      } else if (productItem.classList.contains('milk-packet')) {
        gheeBox.style.display = 'none';
        milkSectionImage.style.display = 'block';
      }
    });
  });

  gheePanels.forEach((gheeRow) => {
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

    const accountMainBgBox = document.createElement('div');
    accountMainBgBox.classList.add('account-mainBg-box', 'w-100');
    moveInstrumentation(gheeRow, accountMainBgBox);
    gheeBox.append(accountMainBgBox);

    // Desktop background
    const desktopBgOverlay = document.createElement('div');
    desktopBgOverlay.classList.add('annual-background_image--overlay', 'd-flex', 'annual-bg-desktop');
    const desktopPic = backgroundDesktopCell.querySelector('picture');
    if (desktopPic) {
      const img = desktopPic.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      optimizedPic.querySelector('img').classList.add('account-bgImg', 'with-overlay');
      desktopBgOverlay.append(optimizedPic);
    }
    const desktopOverlayDiv = document.createElement('div');
    desktopOverlayDiv.classList.add('overlay');
    desktopBgOverlay.append(desktopOverlayDiv);
    accountMainBgBox.append(desktopBgOverlay);

    // Mobile background
    const mobileBgOverlay = document.createElement('div');
    mobileBgOverlay.classList.add('annual-background_image--overlay', 'd-flex', 'annual-bg-mobile');
    const mobilePic = mobileBackgroundCell.querySelector('picture');
    if (mobilePic) {
      const img = mobilePic.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      optimizedPic.querySelector('img').classList.add('account-bgImg', 'with-overlay');
      mobileBgOverlay.append(optimizedPic);
    }
    const mobileOverlayDiv = document.createElement('div');
    mobileOverlayDiv.classList.add('overlay');
    mobileBgOverlay.append(mobileOverlayDiv);
    accountMainBgBox.append(mobileBgOverlay);

    // Before Download section
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

    const downloadButton = document.createElement('button');
    downloadButton.classList.add('annual-report_DownloadBtn', 'my-9');
    beforeContent.append(downloadButton);

    const downloadIconDiv = document.createElement('div');
    downloadIconDiv.classList.add('download_icon');
    const ctaIconPic = ctaIconCell.querySelector('picture');
    if (ctaIconPic) {
      downloadIconDiv.append(ctaIconPic);
    }
    downloadButton.append(downloadIconDiv);

    const downloadLinkWrapper = document.createElement('div');
    downloadLinkWrapper.classList.add('d-flex', 'mb-6');
    beforeContent.append(downloadLinkWrapper);

    const downloadLinkDiv = document.createElement('div');
    downloadLinkWrapper.append(downloadLinkDiv);

    const ctaLink = document.createElement('a');
    ctaLink.classList.add(
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
      ctaLink.href = foundCtaLink.href;
      // Only set download attribute if it's a PDF
      if (foundCtaLink.href.endsWith('.pdf')) {
        ctaLink.download = 'report.pdf';
      }
      moveInstrumentation(foundCtaLink, ctaLink); // Move instrumentation from original <a>
    }
    ctaLink.textContent = ctaLabelCell.textContent.trim();
    downloadLinkDiv.append(ctaLink);

    // After Download section
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
    accountMainBgBox.append(rightSubtextAfter);
    rightSubtextAfter.style.display = 'none'; // Initially hidden

    const afterContent = document.createElement('div');
    afterContent.classList.add('d-flex', 'flex-column', 'align-items-center', 'justify-content-around');
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
    const confirmationIconPic = confirmationIconCell.querySelector('picture');
    if (confirmationIconPic) {
      tickDownloadDiv.append(confirmationIconPic);
    }
    downloadButtonAfter.append(tickDownloadDiv);

    const downloadButtonAfterWrapper = document.createElement('div');
    downloadButtonAfterWrapper.classList.add('d-flex', 'mb-6');
    afterContent.append(downloadButtonAfterWrapper);

    const downloadButtonAfterDiv = document.createElement('div');
    downloadButtonAfterWrapper.append(downloadButtonAfterDiv);

    const ctaButtonAfter = document.createElement('button');
    ctaButtonAfter.classList.add(
      'download-report_btn',
      'download_report_btnAfter',
      'disabled',
      'bg-light-pink',
      'border-light-pink',
      'text-cream-100',
    );
    ctaButtonAfter.textContent = ctaLabelAfterCell.textContent.trim();
    downloadButtonAfterDiv.append(ctaButtonAfter);

    // Add event listener to the download button
    downloadButton.addEventListener('click', (e) => {
      e.preventDefault();
      ctaLink.click(); // Trigger download
      rightSubtextBefore.style.display = 'none';
      rightSubtextAfter.style.display = 'flex';
    });
  });

  milkPanels.forEach((milkRow) => {
    const [
      backgroundDesktopCell,
      backgroundMobileCell,
      headlineCell,
      confirmationIconCell,
      whatsappLinkCell,
      whatsappLabelCell,
    ] = [...milkRow.children];

    const accountMainBgBox = document.createElement('div');
    accountMainBgBox.classList.add('w-100', 'account-mainBg-box', 'd-flex');
    moveInstrumentation(milkRow, accountMainBgBox);
    milkSectionImage.append(accountMainBgBox);

    // Desktop background
    const desktopBgOverlay = document.createElement('div');
    desktopBgOverlay.classList.add('annual-background_image--overlay', 'd-flex', 'annual-bg-desktop');
    const desktopPic = backgroundDesktopCell.querySelector('picture');
    if (desktopPic) {
      const img = desktopPic.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      optimizedPic.querySelector('img').classList.add('account-bgImg', 'with-overlay');
      desktopBgOverlay.append(optimizedPic);
    }
    const desktopOverlayDiv = document.createElement('div');
    desktopOverlayDiv.classList.add('overlay');
    desktopBgOverlay.append(desktopOverlayDiv);
    accountMainBgBox.append(desktopBgOverlay);

    // Mobile background
    const mobileBgOverlay = document.createElement('div');
    mobileBgOverlay.classList.add('annual-background_image--overlay', 'd-flex', 'annual-bg-mobile');
    const mobilePic = backgroundMobileCell.querySelector('picture');
    if (mobilePic) {
      const img = mobilePic.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      optimizedPic.querySelector('img').classList.add('account-bgImg', 'with-overlay');
      mobileBgOverlay.append(optimizedPic);
    }
    const mobileOverlayDiv = document.createElement('div');
    mobileOverlayDiv.classList.add('overlay');
    mobileBgOverlay.append(mobileOverlayDiv);
    accountMainBgBox.append(mobileBgOverlay);

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

    const emptyDiv = document.createElement('div');
    emptyDiv.classList.add('font-md-18', 'mt-6', 'text-center');
    milkContent.append(emptyDiv);

    const confirmationIconWrapper = document.createElement('div');
    confirmationIconWrapper.classList.add('my-9');
    const confirmationIconPic = confirmationIconCell.querySelector('picture');
    if (confirmationIconPic) {
      confirmationIconWrapper.append(confirmationIconPic);
    }
    milkContent.append(confirmationIconWrapper);

    const whatsappLinkWrapper = document.createElement('div');
    whatsappLinkWrapper.classList.add('Whatsapp-link', 'mb-8', 'text-center');
    milkContent.append(whatsappLinkWrapper);

    const whatsappLink = document.createElement('a');
    const foundWhatsappLink = whatsappLinkCell.querySelector('a');
    if (foundWhatsappLink) {
      whatsappLink.href = foundWhatsappLink.href;
      whatsappLink.target = '_blank';
      whatsappLink.rel = 'noopener noreferrer';
      moveInstrumentation(foundWhatsappLink, whatsappLink); // Move instrumentation from original <a>
    }
    whatsappLink.textContent = whatsappLabelCell.textContent.trim();
    whatsappLinkWrapper.append(whatsappLink);
  });

  // Initial state: show ghee, hide milk
  if (gheePanels.length > 0) {
    gheeBox.style.display = 'block';
  } else {
    gheeBox.style.display = 'none';
  }
  if (milkPanels.length > 0) {
    milkSectionImage.style.display = 'none';
  } else {
    milkSectionImage.style.display = 'none';
  }

  // Optimize all images
  container.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.replaceChildren(container);
}
