import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, ...itemRows] = [...block.children];

  const mainBox = document.createElement('div');
  mainBox.classList.add('account-mainBox', 'mx-md-16');

  const row = document.createElement('div');
  row.classList.add('row', 'gx-5');

  const leftSection = document.createElement('div');
  leftSection.classList.add('mt-8', 'mt-md-10', 'col-lg-4');

  const heading = document.createElement('p');
  heading.classList.add('font-24', 'font-md-40', 'fw-bold', 'product-container_heading', 'font-baskerville');
  moveInstrumentation(headingRow, heading);
  // FIX: heading is richtext, should use innerHTML directly from the row, not firstElementChild
  heading.innerHTML = headingRow.innerHTML;
  leftSection.append(heading);

  const productMainBox = document.createElement('div');
  productMainBox.classList.add('product-mainbox', 'mt-10', 'mt-md-12');

  const productItems = itemRows.filter((item) => item.children.length === 2);
  productItems.forEach((productItem) => {
    const [iconImageCell, labelCell] = [...productItem.children];

    const productDiv = document.createElement('div');
    moveInstrumentation(productItem, productDiv);

    const iconWrapper = document.createElement('div');
    iconWrapper.classList.add('milk_ghee_smallImag', 'ghee-packet', 'product-hover'); // Default classes, will be updated based on content

    const picture = iconImageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      iconWrapper.append(optimizedPic);
      optimizedPic.querySelector('img').classList.add('left-section-gheeBox', 'object-fit-contain');
    }

    const label = document.createElement('p');
    label.classList.add('product-subnames');
    label.textContent = labelCell.textContent.trim();
    iconWrapper.append(label);

    productDiv.append(iconWrapper);
    productMainBox.append(productDiv);
  });
  leftSection.append(productMainBox);

  const rightSection = document.createElement('div');
  rightSection.classList.add('right-section', 'mt-10', 'py-0', 'position-relative', 'col-lg-8');

  const productContentItems = itemRows.filter((item) => item.children.length === 10);
  productContentItems.forEach((productContentItem, index) => {
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
    ] = [...productContentItem.children];

    const gheeBox = document.createElement('div');
    gheeBox.classList.add('ghee_box');
    if (index === 0) {
      gheeBox.classList.add('ghee_box'); // Specific class for the first content item
    } else {
      gheeBox.classList.add('milk-section_image', 'position-relative'); // Specific class for subsequent content items
    }
    moveInstrumentation(productContentItem, gheeBox);

    const accountMainBgBox = document.createElement('div');
    accountMainBgBox.classList.add('account-mainBg-box', 'w-100');
    if (index === 1) {
      accountMainBgBox.classList.add('d-flex');
    }

    const createBackgroundImageDiv = (cell, className) => {
      const bgDiv = document.createElement('div');
      bgDiv.classList.add('annual-background_image--overlay', 'd-flex', className);
      const picture = cell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        bgDiv.append(optimizedPic);
        optimizedPic.querySelector('img').classList.add('account-bgImg', 'with-overlay');
        // The original HTML has height="392px" or height="447px" on the img directly.
        // We should read this from the original img if available, or set a default.
        // For now, using the example height from the original JS.
        optimizedPic.querySelector('img').setAttribute('height', img.getAttribute('height') || '392px');
      }
      const overlay = document.createElement('div');
      overlay.classList.add('overlay');
      bgDiv.append(overlay);
      return bgDiv;
    };

    accountMainBgBox.append(createBackgroundImageDiv(backgroundDesktopCell, 'annual-bg-desktop'));
    accountMainBgBox.append(createBackgroundImageDiv(backgroundMobileCell, 'annual-bg-mobile'));

    const rightSubtextBefore = document.createElement('div');
    rightSubtextBefore.classList.add('right-subtext', 'position-absolute', 'start-0', 'end-0', 'bottom-0', 'right-subtext__BeforeDownload');
    if (index === 1) {
      rightSubtextBefore.classList.add('right-subtext-milk');
    }

    const flexContainerBefore = document.createElement('div');
    flexContainerBefore.classList.add('d-flex', 'flex-column', 'align-items-center');

    const headlineBeforeDiv = document.createElement('div');
    headlineBeforeDiv.classList.add('ghee-mobile-heading', 'text-center', 'font-md-18', 'font-baskerville', 'leading-32');
    headlineBeforeDiv.innerHTML = headlineBeforeCell.innerHTML;
    flexContainerBefore.append(headlineBeforeDiv);

    if (index === 0) { // Only for the first item (Ghee)
      const downloadButton = document.createElement('button');
      downloadButton.classList.add('annual-report_DownloadBtn', 'my-9');

      const downloadIconDiv = document.createElement('div');
      downloadIconDiv.classList.add('download_icon');
      const ctaIconBeforePicture = ctaIconBeforeCell.querySelector('picture');
      if (ctaIconBeforePicture) {
        const ctaIconBeforeImg = ctaIconBeforePicture.querySelector('img');
        const optimizedCtaIconBeforePic = createOptimizedPicture(ctaIconBeforeImg.src, ctaIconBeforeImg.alt, false, [{ width: '750' }]);
        moveInstrumentation(ctaIconBeforeImg, optimizedCtaIconBeforePic.querySelector('img'));
        downloadIconDiv.append(optimizedCtaIconBeforePic);
      }
      downloadButton.append(downloadIconDiv);
      flexContainerBefore.append(downloadButton);

      const downloadLinkDiv = document.createElement('div');
      downloadLinkDiv.classList.add('d-flex', 'mb-6');
      const downloadLinkWrapper = document.createElement('div');
      const ctaLinkBefore = document.createElement('a');
      ctaLinkBefore.classList.add('text-decoration-none', 'download-report_btn', 'cta-analytics', 'download_report_btnBefore', 'text-cream-100', 'border', 'border-2', 'border-red-100', 'border-maroon-100-hover', 'border-red-300-active', 'bg-red-100', 'bg-maroon-100-hover', 'bg-red-300-active');
      const foundCtaLinkBefore = ctaLinkBeforeCell.querySelector('a');
      if (foundCtaLinkBefore) {
        // FIX: ctaLinkBefore is type=aem-content, read href from the <a> tag
        ctaLinkBefore.href = foundCtaLinkBefore.href;
        ctaLinkBefore.setAttribute('download', 'report.pdf'); // Add download attribute as per original
      }
      ctaLinkBefore.textContent = ctaLabelBeforeCell.textContent.trim();
      downloadLinkWrapper.append(ctaLinkBefore);
      downloadLinkDiv.append(downloadLinkWrapper);
      flexContainerBefore.append(downloadLinkDiv);

      // Add event listener for the download button
      downloadButton.addEventListener('click', () => {
        rightSubtextBefore.classList.remove('right-subtext__BeforeDownload');
        rightSubtextBefore.classList.add('d-none'); // Hide before download content
        const rightSubtextAfter = gheeBox.querySelector('.right-subtext__AfterDownload');
        if (rightSubtextAfter) {
          rightSubtextAfter.classList.remove('d-none'); // Show after download content
        }
        // Trigger download if a link is present
        if (ctaLinkBefore.href) {
          const tempLink = document.createElement('a');
          tempLink.href = ctaLinkBefore.href;
          tempLink.download = ctaLinkBefore.download;
          document.body.appendChild(tempLink);
          tempLink.click();
          document.body.removeChild(tempLink);
        }
      });

    } else { // For the second item (Milk)
      const emptyDiv = document.createElement('div');
      emptyDiv.classList.add('font-md-18', 'mt-6', 'text-center');
      flexContainerBefore.append(emptyDiv);

      const milkIconDiv = document.createElement('div');
      milkIconDiv.classList.add('my-9');
      const ctaIconBeforePicture = ctaIconBeforeCell.querySelector('picture');
      if (ctaIconBeforePicture) {
        const ctaIconBeforeImg = ctaIconBeforePicture.querySelector('img');
        const optimizedCtaIconBeforePic = createOptimizedPicture(ctaIconBeforeImg.src, ctaIconBeforeImg.alt, false, [{ width: '750' }]);
        moveInstrumentation(ctaIconBeforeImg, optimizedCtaIconBeforePic.querySelector('img'));
        milkIconDiv.append(optimizedCtaIconBeforePic);
      }
      flexContainerBefore.append(milkIconDiv);
    }

    const whatsappLinkDiv = document.createElement('div');
    whatsappLinkDiv.classList.add('Whatsapp-link', 'mb-8', 'text-center');
    const whatsappLink = whatsappLinkCell.querySelector('a');
    if (whatsappLink) {
      const whatsappAnchor = document.createElement('a');
      // FIX: whatsappLink is type=aem-content, read href from the <a> tag
      whatsappAnchor.href = whatsappLink.href;
      whatsappAnchor.textContent = whatsappLink.textContent.trim();
      whatsappAnchor.target = '_blank';
      whatsappAnchor.rel = 'noopener noreferrer';
      const srOnlySpan = document.createElement('span');
      srOnlySpan.classList.add('cmp-link__screen-reader-only');
      srOnlySpan.textContent = 'opens in a new tab';
      whatsappAnchor.append(srOnlySpan);
      const p = document.createElement('p');
      p.append('Check Your Milk Report Card on ', whatsappAnchor);
      whatsappLinkDiv.append(p);
    }
    flexContainerBefore.append(whatsappLinkDiv);

    rightSubtextBefore.append(flexContainerBefore);
    accountMainBgBox.append(rightSubtextBefore);

    if (index === 0) { // Only for the first item (Ghee)
      const rightSubtextAfter = document.createElement('div');
      rightSubtextAfter.classList.add('right-subtext', 'position-absolute', 'start-0', 'end-0', 'bottom-0', 'right-section_subtextafter', 'right-subtext__AfterDownload', 'd-none'); // Hidden by default

      const flexContainerAfter = document.createElement('div');
      flexContainerAfter.classList.add('d-flex', 'flex-column', 'align-items-center', 'justify-content-around');

      const headlineAfterDiv = document.createElement('div');
      headlineAfterDiv.classList.add('ghee-mobile-heading', 'text-center', 'font-md-18', 'font-baskerville', 'leading-32');
      headlineAfterDiv.innerHTML = headlineAfterCell.innerHTML;
      flexContainerAfter.append(headlineAfterDiv);

      const downloadButtonAfter = document.createElement('button');
      downloadButtonAfter.classList.add('annual-report_DownloadBtn', 'my-9');

      const tickIconDiv = document.createElement('div');
      tickIconDiv.classList.add('tick_download');
      const ctaIconAfterPicture = ctaIconAfterCell.querySelector('picture');
      if (ctaIconAfterPicture) {
        const ctaIconAfterImg = ctaIconAfterPicture.querySelector('img');
        const optimizedCtaIconAfterPic = createOptimizedPicture(ctaIconAfterImg.src, ctaIconAfterImg.alt, false, [{ width: '750' }]);
        moveInstrumentation(ctaIconAfterImg, optimizedCtaIconAfterPic.querySelector('img'));
        tickIconDiv.append(optimizedCtaIconAfterPic);
      }
      downloadButtonAfter.append(tickIconDiv);
      flexContainerAfter.append(downloadButtonAfter);

      const downloadLinkAfterDiv = document.createElement('div');
      downloadLinkAfterDiv.classList.add('d-flex', 'mb-6');
      const downloadLinkAfterWrapper = document.createElement('div');
      const ctaButtonAfter = document.createElement('button');
      ctaButtonAfter.classList.add('download-report_btn', 'download_report_btnAfter', 'disabled', 'bg-light-pink', 'border-light-pink', 'text-cream-100');
      ctaButtonAfter.textContent = ctaLabelAfterCell.textContent.trim();
      downloadLinkAfterWrapper.append(ctaButtonAfter);
      downloadLinkAfterDiv.append(downloadLinkAfterWrapper);
      flexContainerAfter.append(downloadLinkAfterDiv);

      const whatsappLinkAfterDiv = document.createElement('div');
      whatsappLinkAfterDiv.classList.add('Whatsapp-link', 'mb-8', 'text-center');
      flexContainerAfter.append(whatsappLinkAfterDiv);

      rightSubtextAfter.append(flexContainerAfter);
      accountMainBgBox.append(rightSubtextAfter);
    }

    gheeBox.append(accountMainBgBox);
    rightSection.append(gheeBox);
  });

  row.append(leftSection, rightSection);
  mainBox.append(row);

  block.replaceChildren(mainBox);

  // Initialize product selection behavior
  const productItemsElements = productMainBox.querySelectorAll('.milk_ghee_smallImag');
  const productContentElements = rightSection.querySelectorAll('.ghee_box');

  productItemsElements.forEach((item, i) => {
    item.addEventListener('click', () => {
      // Remove active/hover classes from all items
      productItemsElements.forEach((el) => el.classList.remove('product-hover'));
      productContentElements.forEach((el) => el.classList.remove('active'));
      // Also hide all right-subtext__AfterDownload and show right-subtext__BeforeDownload
      productContentElements.forEach((el) => {
        const before = el.querySelector('.right-subtext__BeforeDownload');
        const after = el.querySelector('.right-subtext__AfterDownload');
        if (before) before.classList.remove('d-none');
        if (after) after.classList.add('d-none');
      });

      // Add active/hover class to clicked item
      item.classList.add('product-hover');
      productContentElements[i].classList.add('active');
    });
  });

  // Set initial active state (first item active by default)
  if (productItemsElements.length > 0 && productContentElements.length > 0) {
    productItemsElements[0].classList.add('product-hover');
    productContentElements[0].classList.add('active');
  }
}
