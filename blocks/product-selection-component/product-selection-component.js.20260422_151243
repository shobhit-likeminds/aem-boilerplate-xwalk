import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];
  const [headingRow, ...itemRows] = children;

  const productSelectorItems = itemRows.filter((row) => row.children.length === 2);
  const productDetailItems = itemRows.filter((row) => row.children.length === 11);

  const mainBox = document.createElement('div');
  mainBox.classList.add('account-mainBox', 'mx-md-16');

  const rowContainer = document.createElement('div');
  rowContainer.classList.add('row', 'gx-5');

  // Left Section (Product Selectors)
  const leftSection = document.createElement('div');
  leftSection.classList.add('mt-8', 'mt-md-10', 'col-lg-4');

  const heading = document.createElement('p');
  heading.classList.add('font-24', 'font-md-40', 'fw-bold', 'product-container_heading', 'font-baskerville');
  moveInstrumentation(headingRow, heading);
  // FIX: Use innerHTML for richtext heading, and find the cell if it's not guaranteed to be the first.
  const headingCell = [...headingRow.children].find(cell => cell.innerHTML.trim() !== '');
  heading.innerHTML = headingCell?.innerHTML || '';
  leftSection.append(heading);

  const productMainBox = document.createElement('div');
  productMainBox.classList.add('product-mainbox', 'mt-10', 'mt-md-12');

  productSelectorItems.forEach((row, index) => {
    const [productImageCell, productLabelCell] = [...row.children];

    const productDiv = document.createElement('div');
    const productItem = document.createElement('div');
    productItem.classList.add('milk_ghee_smallImag', index === 0 ? 'ghee-packet' : 'milk-packet');
    if (index === 0) {
      productItem.classList.add('product-hover');
    }

    const picture = productImageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('left-section-gheeBox', 'object-fit-contain');
      productItem.append(optimizedPic);
    }

    const labelP = document.createElement('p');
    labelP.classList.add('product-subnames');
    labelP.textContent = productLabelCell.textContent.trim();
    productItem.append(labelP);

    moveInstrumentation(row, productItem);
    productDiv.append(productItem);
    productMainBox.append(productDiv);
  });
  leftSection.append(productMainBox);
  rowContainer.append(leftSection);

  // Right Section (Product Details)
  const rightSection = document.createElement('div');
  rightSection.classList.add('right-section', 'mt-10', 'py-0', 'position-relative', 'col-lg-8');

  productDetailItems.forEach((row, index) => {
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
      whatsappLinkCell,
      whatsappLabelCell,
    ] = [...row.children];

    const productDetailBox = document.createElement('div');
    productDetailBox.classList.add(index === 0 ? 'ghee_box' : 'milk-section_image');
    if (index !== 0) {
      productDetailBox.classList.add('position-relative');
    }

    const accountMainBgBox = document.createElement('div');
    accountMainBgBox.classList.add('account-mainBg-box', 'w-100');
    if (index !== 0) {
      accountMainBgBox.classList.add('d-flex');
    }

    // Desktop Background
    const annualBgDesktop = document.createElement('div');
    annualBgDesktop.classList.add('annual-background_image--overlay', 'd-flex', 'annual-bg-desktop');
    const desktopPicture = backgroundDesktopCell.querySelector('picture');
    if (desktopPicture) {
      const img = desktopPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('account-bgImg', 'with-overlay');
      optimizedPic.querySelector('img').setAttribute('height', '392px'); // From original HTML
      annualBgDesktop.append(optimizedPic);
    }
    const overlayDesktop = document.createElement('div');
    overlayDesktop.classList.add('overlay');
    annualBgDesktop.append(overlayDesktop);
    accountMainBgBox.append(annualBgDesktop);

    // Mobile Background
    const annualBgMobile = document.createElement('div');
    annualBgMobile.classList.add('annual-background_image--overlay', 'd-flex', 'annual-bg-mobile');
    const mobilePicture = backgroundMobileCell.querySelector('picture');
    if (mobilePicture) {
      const img = mobilePicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('account-bgImg', 'with-overlay');
      optimizedPic.querySelector('img').setAttribute('height', '447px'); // From original HTML
      annualBgMobile.append(optimizedPic);
    }
    const overlayMobile = document.createElement('div');
    overlayMobile.classList.add('overlay');
    annualBgMobile.append(overlayMobile);
    accountMainBgBox.append(annualBgMobile);

    productDetailBox.append(accountMainBgBox);

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
    if (index === 0) {
      rightSubtextBefore.classList.add('right-subtext__BeforeDownload');
    } else {
      rightSubtextBefore.classList.add('right-subtext-milk');
    }

    const beforeDownloadContent = document.createElement('div');
    beforeDownloadContent.classList.add('d-flex', 'flex-column', 'align-items-center');

    const headlineBeforeDiv = document.createElement('div');
    headlineBeforeDiv.classList.add('ghee-mobile-heading', 'text-center', 'font-md-18', 'font-baskerville', 'leading-32');
    headlineBeforeDiv.innerHTML = headlineBeforeCell?.innerHTML || '';
    beforeDownloadContent.append(headlineBeforeDiv);

    if (index === 0) { // Only for Ghee box
      const downloadButton = document.createElement('button');
      downloadButton.classList.add('annual-report_DownloadBtn', 'my-9');
      const downloadIconDiv = document.createElement('div');
      downloadIconDiv.classList.add('download_icon');
      const ctaIconBeforePicture = ctaIconBeforeCell.querySelector('picture');
      if (ctaIconBeforePicture) {
        const img = ctaIconBeforePicture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        downloadIconDiv.append(optimizedPic);
      }
      downloadButton.append(downloadIconDiv);
      beforeDownloadContent.append(downloadButton);

      const downloadLinkDiv = document.createElement('div');
      downloadLinkDiv.classList.add('d-flex', 'mb-6');
      const innerDiv = document.createElement('div');
      const ctaLinkBefore = document.createElement('a');
      const foundCtaLinkBefore = ctaLinkBeforeCell.querySelector('a');
      if (foundCtaLinkBefore) {
        // FIX: Read href from aem-content field
        ctaLinkBefore.href = foundCtaLinkBefore.href;
        moveInstrumentation(foundCtaLinkBefore, ctaLinkBefore); // Move instrumentation from original <a>
      }
      ctaLinkBefore.textContent = ctaLabelBeforeCell.textContent.trim();
      ctaLinkBefore.classList.add(
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
      ctaLinkBefore.setAttribute('download', 'report.pdf'); // From original HTML
      innerDiv.append(ctaLinkBefore);
      downloadLinkDiv.append(innerDiv);
      beforeDownloadContent.append(downloadLinkDiv);

      downloadButton.addEventListener('click', () => {
        ctaLinkBefore.click();
      });
    } else { // Only for Milk box
      const downloadIconDiv = document.createElement('div');
      downloadIconDiv.classList.add('my-9');
      const ctaIconBeforePicture = ctaIconBeforeCell.querySelector('picture');
      if (ctaIconBeforePicture) {
        const img = ctaIconBeforePicture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        downloadIconDiv.append(optimizedPic);
      }
      beforeDownloadContent.append(downloadIconDiv);
    }

    const whatsappLinkDiv = document.createElement('div');
    whatsappLinkDiv.classList.add('Whatsapp-link', 'mb-8', 'text-center');
    const whatsappLink = document.createElement('a');
    const foundWhatsappLink = whatsappLinkCell.querySelector('a');
    if (foundWhatsappLink) {
      // FIX: Read href from aem-content field
      whatsappLink.href = foundWhatsappLink.href;
      whatsappLink.setAttribute('target', '_blank');
      whatsappLink.setAttribute('rel', 'noopener noreferrer');
      moveInstrumentation(foundWhatsappLink, whatsappLink); // Move instrumentation from original <a>
    }
    whatsappLink.textContent = whatsappLabelCell.textContent.trim();
    const srOnlySpan = document.createElement('span');
    srOnlySpan.classList.add('cmp-link__screen-reader-only');
    srOnlySpan.textContent = 'opens in a new tab';
    whatsappLink.append(srOnlySpan);
    whatsappLinkDiv.append(whatsappLink);
    beforeDownloadContent.append(whatsappLinkDiv);

    rightSubtextBefore.append(beforeDownloadContent);
    productDetailBox.append(rightSubtextBefore);

    // After Download Section (Only for Ghee box)
    if (index === 0) {
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

      const afterDownloadContent = document.createElement('div');
      afterDownloadContent.classList.add('d-flex', 'flex-column', 'align-items-center', 'justify-content-around');

      const headlineAfterDiv = document.createElement('div');
      headlineAfterDiv.classList.add('ghee-mobile-heading', 'text-center', 'font-md-18', 'font-baskerville', 'leading-32');
      headlineAfterDiv.innerHTML = headlineAfterCell?.innerHTML || '';
      afterDownloadContent.append(headlineAfterDiv);

      const downloadButtonAfter = document.createElement('button');
      downloadButtonAfter.classList.add('annual-report_DownloadBtn', 'my-9');
      const tickDownloadDiv = document.createElement('div');
      tickDownloadDiv.classList.add('tick_download');
      const ctaIconAfterPicture = ctaIconAfterCell.querySelector('picture');
      if (ctaIconAfterPicture) {
        const img = ctaIconAfterPicture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        tickDownloadDiv.append(optimizedPic);
      }
      downloadButtonAfter.append(tickDownloadDiv);
      afterDownloadContent.append(downloadButtonAfter);

      const downloadLinkAfterDiv = document.createElement('div');
      downloadLinkAfterDiv.classList.add('d-flex', 'mb-6');
      const innerDivAfter = document.createElement('div');
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
      innerDivAfter.append(ctaButtonAfter);
      downloadLinkAfterDiv.append(innerDivAfter);
      afterDownloadContent.append(downloadLinkAfterDiv);

      const whatsappLinkAfterDiv = document.createElement('div');
      whatsappLinkAfterDiv.classList.add('Whatsapp-link', 'mb-8', 'text-center');
      // No content for whatsapp link in after download, as per original HTML
      afterDownloadContent.append(whatsappLinkAfterDiv);

      rightSubtextAfter.append(afterDownloadContent);
      productDetailBox.append(rightSubtextAfter);

      // Toggle logic for before/after download
      downloadButton.addEventListener('click', () => {
        rightSubtextBefore.style.display = 'none';
        rightSubtextAfter.style.display = 'flex';
      });
    }

    moveInstrumentation(row, productDetailBox);
    rightSection.append(productDetailBox);
  });

  rowContainer.append(rightSection);
  mainBox.append(rowContainer);

  block.replaceChildren(mainBox);

  // Initial display setup for product detail boxes
  const allProductDetailBoxes = block.querySelectorAll('.ghee_box, .milk-section_image');
  allProductDetailBoxes.forEach((box, i) => {
    if (i === 0) {
      box.style.display = 'block';
    } else {
      box.style.display = 'none';
    }
  });

  // Add click listeners to product selector items
  const productSelectorButtons = block.querySelectorAll('.product-mainbox > div > div');
  productSelectorButtons.forEach((button, i) => {
    button.addEventListener('click', () => {
      productSelectorButtons.forEach(btn => btn.classList.remove('product-hover'));
      button.classList.add('product-hover');

      allProductDetailBoxes.forEach((box, j) => {
        if (i === j) {
          box.style.display = 'block';
        } else {
          box.style.display = 'none';
        }
      });
    });
  });

  // Optimize all images within the block
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
