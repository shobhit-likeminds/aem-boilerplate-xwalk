import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  const headlineRow = children[0];
  const productItemRows = children.filter((row) => row.children.length === 2);
  const gheeContentRows = children.filter((row) => row.children.length === 9);
  const milkContentRows = children.filter((row) => row.children.length === 6);

  const root = document.createElement('div');
  root.classList.add('container-xl', 'annualReport_mainBox', 'product-selection-component');

  const accountMainBox = document.createElement('div');
  accountMainBox.classList.add('account-mainBox', 'mx-md-16');
  root.append(accountMainBox);

  const row = document.createElement('div');
  row.classList.add('row', 'gx-5');
  accountMainBox.append(row);

  const leftSection = document.createElement('div');
  leftSection.classList.add('mt-8', 'mt-md-10', 'col-lg-4');
  row.append(leftSection);

  const headlineP = document.createElement('p');
  headlineP.classList.add('font-24', 'font-md-40', 'fw-bold', 'product-container_heading', 'font-baskerville');
  moveInstrumentation(headlineRow, headlineP);
  // Correctly move children for richtext
  while (headlineRow.firstChild) {
    headlineP.append(headlineRow.firstChild);
  }
  leftSection.append(headlineP);

  const productMainBox = document.createElement('div');
  productMainBox.classList.add('product-mainbox', 'mt-10', 'mt-md-12');
  leftSection.append(productMainBox);

  const gheeProductDiv = document.createElement('div');
  const milkProductDiv = document.createElement('div');

  productItemRows.forEach((productRow, index) => {
    const [productImageCell, productLabelCell] = [...productRow.children];
    const productItemDiv = document.createElement('div');
    productItemDiv.classList.add('milk_ghee_smallImag', 'product-hover');

    const picture = productImageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(productImageCell, optimizedPic.querySelector('img'));
      productItemDiv.append(optimizedPic);
      optimizedPic.querySelector('img').classList.add('left-section-gheeBox', 'object-fit-contain');
    }

    const labelP = document.createElement('p');
    labelP.classList.add('product-subnames');
    moveInstrumentation(productLabelCell, labelP);
    labelP.textContent = productLabelCell.textContent.trim();
    productItemDiv.append(labelP);

    if (index === 0) {
      productItemDiv.classList.add('ghee-packet');
      gheeProductDiv.append(productItemDiv);
    } else {
      productItemDiv.classList.add('milk-packet');
      milkProductDiv.append(productItemDiv);
    }
  });

  productMainBox.append(gheeProductDiv, milkProductDiv);

  const rightSection = document.createElement('div');
  rightSection.classList.add('right-section', 'mt-10', 'py-0', 'position-relative', 'col-lg-8');
  row.append(rightSection);

  const gheeBox = document.createElement('div');
  gheeBox.classList.add('ghee_box');
  rightSection.append(gheeBox);

  gheeContentRows.forEach((gheeRow) => {
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
    gheeBox.append(accountMainBgBox);

    const desktopBgOverlay = document.createElement('div');
    desktopBgOverlay.classList.add('annual-background_image--overlay', 'd-flex', 'annual-bg-desktop');
    if (backgroundDesktopCell) {
      const picture = backgroundDesktopCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(backgroundDesktopCell, optimizedPic.querySelector('img'));
        desktopBgOverlay.append(optimizedPic);
        optimizedPic.querySelector('img').classList.add('account-bgImg', 'with-overlay');
      }
    }
    const desktopOverlayDiv = document.createElement('div');
    desktopOverlayDiv.classList.add('overlay');
    desktopBgOverlay.append(desktopOverlayDiv);
    accountMainBgBox.append(desktopBgOverlay);

    const mobileBgOverlay = document.createElement('div');
    mobileBgOverlay.classList.add('annual-background_image--overlay', 'd-flex', 'annual-bg-mobile');
    if (backgroundMobileCell) {
      const picture = backgroundMobileCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(backgroundMobileCell, optimizedPic.querySelector('img'));
        mobileBgOverlay.append(optimizedPic);
        optimizedPic.querySelector('img').classList.add('account-bgImg', 'with-overlay');
      }
    }
    const mobileOverlayDiv = document.createElement('div');
    mobileOverlayDiv.classList.add('overlay');
    mobileBgOverlay.append(mobileOverlayDiv);
    accountMainBgBox.append(mobileBgOverlay);

    const rightSubtextBefore = document.createElement('div');
    rightSubtextBefore.classList.add('right-subtext', 'position-absolute', 'start-0', 'end-0', 'bottom-0', 'right-subtext__BeforeDownload');
    accountMainBgBox.append(rightSubtextBefore);

    const beforeContent = document.createElement('div');
    beforeContent.classList.add('d-flex', 'flex-column', 'align-items-center');
    rightSubtextBefore.append(beforeContent);

    const gheeMobileHeadingBefore = document.createElement('div');
    gheeMobileHeadingBefore.classList.add('ghee-mobile-heading', 'text-center', 'font-md-18', 'font-baskerville', 'leading-32');
    moveInstrumentation(headlineBeforeCell, gheeMobileHeadingBefore);
    while (headlineBeforeCell.firstChild) {
      gheeMobileHeadingBefore.append(headlineBeforeCell.firstChild);
    }
    beforeContent.append(gheeMobileHeadingBefore);

    const downloadButton = document.createElement('button');
    downloadButton.classList.add('annual-report_DownloadBtn', 'my-9');
    beforeContent.append(downloadButton);

    const downloadIconDiv = document.createElement('div');
    downloadIconDiv.classList.add('download_icon');
    if (ctaIconCell) {
      const picture = ctaIconCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(ctaIconCell, optimizedPic.querySelector('img'));
        downloadIconDiv.append(optimizedPic);
      }
    }
    downloadButton.append(downloadIconDiv); // Corrected append

    const downloadLinkDiv = document.createElement('div');
    downloadLinkDiv.classList.add('d-flex', 'mb-6');
    beforeContent.append(downloadLinkDiv);

    const downloadAnchor = document.createElement('a');
    const foundCtaLink = ctaLinkCell.querySelector('a');
    if (foundCtaLink) {
      downloadAnchor.href = foundCtaLink.href;
      downloadAnchor.setAttribute('download', 'report.pdf'); // Assuming PDF download
    }
    downloadAnchor.textContent = ctaLabelCell.textContent.trim();
    downloadAnchor.classList.add('text-decoration-none', 'download-report_btn', 'cta-analytics', 'download_report_btnBefore', 'text-cream-100', 'border', 'border-2', 'border-red-100', 'border-maroon-100-hover', 'border-red-300-active', 'bg-red-100', 'bg-maroon-100-hover', 'bg-red-300-active');
    moveInstrumentation(ctaLinkCell, downloadAnchor);
    moveInstrumentation(ctaLabelCell, downloadAnchor);
    downloadLinkDiv.append(downloadAnchor);

    const rightSubtextAfter = document.createElement('div');
    rightSubtextAfter.classList.add('right-subtext', 'position-absolute', 'start-0', 'end-0', 'bottom-0', 'right-section_subtextafter', 'right-subtext__AfterDownload');
    accountMainBgBox.append(rightSubtextAfter);
    rightSubtextAfter.style.display = 'none'; // Initially hidden

    const afterContent = document.createElement('div');
    afterContent.classList.add('d-flex', 'flex-column', 'align-items-center', 'justify-content-around');
    rightSubtextAfter.append(afterContent);

    const gheeMobileHeadingAfter = document.createElement('div');
    gheeMobileHeadingAfter.classList.add('ghee-mobile-heading', 'text-center', 'font-md-18', 'font-baskerville', 'leading-32');
    moveInstrumentation(headlineAfterCell, gheeMobileHeadingAfter);
    while (headlineAfterCell.firstChild) {
      gheeMobileHeadingAfter.append(headlineAfterCell.firstChild);
    }
    afterContent.append(gheeMobileHeadingAfter);

    const confirmationButton = document.createElement('button');
    confirmationButton.classList.add('annual-report_DownloadBtn', 'my-9');
    afterContent.append(confirmationButton);

    const tickDownloadDiv = document.createElement('div');
    tickDownloadDiv.classList.add('tick_download');
    if (confirmationIconCell) {
      const picture = confirmationIconCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(confirmationIconCell, optimizedPic.querySelector('img'));
        tickDownloadDiv.append(optimizedPic);
      }
    }
    confirmationButton.append(tickDownloadDiv); // Corrected append

    const downloadButtonAfterDiv = document.createElement('div');
    downloadButtonAfterDiv.classList.add('d-flex', 'mb-6');
    afterContent.append(downloadButtonAfterDiv);

    const downloadButtonAfter = document.createElement('button');
    downloadButtonAfter.classList.add('download-report_btn', 'download_report_btnAfter', 'disabled', 'bg-light-pink', 'border-light-pink', 'text-cream-100');
    downloadButtonAfter.textContent = ctaLabelAfterCell.textContent.trim();
    moveInstrumentation(ctaLabelAfterCell, downloadButtonAfter);
    downloadButtonAfterDiv.append(downloadButtonAfter);

    // Event listener for download
    downloadAnchor.addEventListener('click', (e) => {
      e.preventDefault();
      const link = document.createElement('a');
      link.href = downloadAnchor.href;
      link.download = 'report.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      rightSubtextBefore.style.display = 'none';
      rightSubtextAfter.style.display = 'flex';
    });
  });

  const milkSectionImage = document.createElement('div');
  milkSectionImage.classList.add('position-relative', 'milk-section_image');
  milkSectionImage.style.display = 'none'; // Initially hidden
  rightSection.append(milkSectionImage);

  milkContentRows.forEach((milkRow) => {
    const [
      backgroundDesktopCell,
      backgroundMobileCell,
      headlineCell,
      milkIconCell,
      whatsappLinkCell,
      whatsappLabelCell,
    ] = [...milkRow.children];

    const accountMainBgBoxMilk = document.createElement('div');
    accountMainBgBoxMilk.classList.add('w-100', 'account-mainBg-box', 'd-flex');
    milkSectionImage.append(accountMainBgBoxMilk);

    const desktopBgOverlayMilk = document.createElement('div');
    desktopBgOverlayMilk.classList.add('annual-background_image--overlay', 'd-flex', 'annual-bg-desktop');
    if (backgroundDesktopCell) {
      const picture = backgroundDesktopCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(backgroundDesktopCell, optimizedPic.querySelector('img'));
        desktopBgOverlayMilk.append(optimizedPic);
        optimizedPic.querySelector('img').classList.add('account-bgImg', 'with-overlay');
      }
    }
    const desktopOverlayMilkDiv = document.createElement('div');
    desktopOverlayMilkDiv.classList.add('overlay');
    desktopBgOverlayMilk.append(desktopOverlayMilkDiv);
    accountMainBgBoxMilk.append(desktopBgOverlayMilk);

    const mobileBgOverlayMilk = document.createElement('div');
    mobileBgOverlayMilk.classList.add('annual-background_image--overlay', 'd-flex', 'annual-bg-mobile');
    if (backgroundMobileCell) {
      const picture = backgroundMobileCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(backgroundMobileCell, optimizedPic.querySelector('img'));
        mobileBgOverlayMilk.append(optimizedPic);
        optimizedPic.querySelector('img').classList.add('account-bgImg', 'with-overlay');
      }
    }
    const mobileOverlayMilkDiv = document.createElement('div');
    mobileOverlayMilkDiv.classList.add('overlay');
    mobileBgOverlayMilk.append(mobileOverlayMilkDiv);
    accountMainBgBoxMilk.append(mobileBgOverlayMilk);

    const rightSubtextMilk = document.createElement('div');
    rightSubtextMilk.classList.add('right-subtext', 'position-absolute', 'start-0', 'end-0', 'bottom-0', 'right-subtext-milk');
    milkSectionImage.append(rightSubtextMilk);

    const milkContent = document.createElement('div');
    milkContent.classList.add('d-flex', 'flex-column', 'align-items-center');
    rightSubtextMilk.append(milkContent);

    const gheeMobileHeadingMilk = document.createElement('div');
    gheeMobileHeadingMilk.classList.add('ghee-mobile-heading', 'text-center', 'font-md-18', 'font-baskerville', 'leading-32');
    moveInstrumentation(headlineCell, gheeMobileHeadingMilk);
    while (headlineCell.firstChild) {
      gheeMobileHeadingMilk.append(headlineCell.firstChild);
    }
    milkContent.append(gheeMobileHeadingMilk);

    const milkIconDiv = document.createElement('div');
    milkIconDiv.classList.add('my-9');
    if (milkIconCell) {
      const picture = milkIconCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(milkIconCell, optimizedPic.querySelector('img'));
        milkIconDiv.append(optimizedPic);
      }
    }
    milkContent.append(milkIconDiv);

    const whatsappLinkDiv = document.createElement('div');
    whatsappLinkDiv.classList.add('Whatsapp-link', 'mb-8', 'text-center');
    const whatsappAnchor = document.createElement('a');
    const foundWhatsappLink = whatsappLinkCell.querySelector('a');
    if (foundWhatsappLink) {
      whatsappAnchor.href = foundWhatsappLink.href;
      whatsappAnchor.target = '_blank';
      whatsappAnchor.rel = 'noopener noreferrer';
    }
    whatsappAnchor.textContent = whatsappLabelCell.textContent.trim();
    whatsappAnchor.classList.add('cmp-link__screen-reader-only');
    moveInstrumentation(whatsappLinkCell, whatsappAnchor);
    moveInstrumentation(whatsappLabelCell, whatsappAnchor);
    whatsappLinkDiv.append(whatsappAnchor);
    milkContent.append(whatsappLinkDiv);

    const whatsappP = document.createElement('p');
    whatsappP.innerHTML = `Check Your Milk Report Card on <a href="${whatsappAnchor.href}" target="_blank" rel="noopener noreferrer">Whatsapp​<span class="cmp-link__screen-reader-only">opens in a new tab</span></a>`;
    // moveInstrumentation for the dynamically created paragraph
    // This assumes the original HTML had a <p> element for this text, which it does.
    // We need to ensure the instrumentation from the original <p> is moved to this new <p>
    // However, the original <p> is nested inside whatsappLinkDiv, so we need to move its children.
    const originalWhatsappP = whatsappLinkCell.parentElement.querySelector('.Whatsapp-link p');
    if (originalWhatsappP) {
      moveInstrumentation(originalWhatsappP, whatsappP);
    }
    whatsappLinkDiv.append(whatsappP);
  });

  // Toggle functionality for Ghee/Milk sections
  gheeProductDiv.addEventListener('click', () => {
    gheeProductDiv.classList.add('ghee-packet', 'product-hover');
    milkProductDiv.classList.remove('milk-packet', 'product-hover'); // Ensure milk-packet is removed
    gheeBox.style.display = 'block';
    milkSectionImage.style.display = 'none';
  });

  milkProductDiv.addEventListener('click', () => {
    milkProductDiv.classList.add('milk-packet', 'product-hover'); // Add product-hover here
    gheeProductDiv.classList.remove('ghee-packet', 'product-hover'); // Ensure ghee-packet is removed
    gheeBox.style.display = 'none';
    milkSectionImage.style.display = 'block';
  });

  block.replaceChildren(root);

  // Initial state setup
  // These classes are already added during the initial loop for productItemRows.
  // The original HTML shows 'ghee-packet product-hover' on the first item and 'milk-packet' on the second.
  // The JS correctly adds 'ghee-packet' to gheeProductDiv and 'milk-packet' to milkProductDiv.
  // The 'product-hover' class is added to the ghee-packet by default in the loop.
  // The initial state should reflect the first item being active.
  const firstGheeProductItem = gheeProductDiv.querySelector('.ghee-packet');
  if (firstGheeProductItem) {
    firstGheeProductItem.classList.add('product-hover');
  }
  const firstMilkProductItem = milkProductDiv.querySelector('.milk-packet');
  if (firstMilkProductItem) {
    firstMilkProductItem.classList.remove('product-hover');
  }

  gheeBox.style.display = 'block';
  milkSectionImage.style.display = 'none';
}
