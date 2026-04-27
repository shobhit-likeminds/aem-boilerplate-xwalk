import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];
  const [headingRow, ...itemRows] = children;

  const mainBox = document.createElement('div');
  mainBox.classList.add('account-mainBox', 'mx-md-16');

  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row', 'gx-5');

  const leftSection = document.createElement('div');
  leftSection.classList.add('mt-8', 'mt-md-10', 'col-lg-4');

  const heading = document.createElement('p');
  heading.classList.add('font-24', 'font-md-40', 'fw-bold', 'product-container_heading', 'font-baskerville');
  moveInstrumentation(headingRow, heading);
  heading.innerHTML = headingRow.innerHTML;
  leftSection.append(heading);

  const productMainBox = document.createElement('div');
  productMainBox.classList.add('product-mainbox', 'mt-10', 'mt-md-12');

  const productItems = itemRows.filter((row) => row.children.length === 2);
  const gheePanels = itemRows.filter((row) => row.children.length === 9);
  const milkPanels = itemRows.filter((row) => row.children.length === 6);

  productItems.forEach((row, index) => {
    const [productImageCell, productLabelCell] = [...row.children];

    const productWrapper = document.createElement('div');
    const productDiv = document.createElement('div');
    productDiv.classList.add('milk_ghee_smallImag', index === 0 ? 'ghee-packet' : 'milk-packet');
    if (index === 0) {
      productDiv.classList.add('product-hover');
    }

    const picture = productImageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('left-section-gheeBox', 'object-fit-contain');
      productDiv.append(optimizedPic);
    }

    const label = document.createElement('p');
    label.classList.add('product-subnames');
    label.textContent = productLabelCell.textContent.trim();
    productDiv.append(label);

    moveInstrumentation(row, productWrapper);
    productWrapper.append(productDiv);
    productMainBox.append(productWrapper);

    productDiv.addEventListener('click', () => {
      document.querySelectorAll('.milk_ghee_smallImag').forEach((el) => el.classList.remove('product-hover'));
      productDiv.classList.add('product-hover');
      document.querySelectorAll('.ghee_box, .milk-section_image').forEach((el) => el.style.display = 'none');
      if (index === 0) {
        document.querySelector('.ghee_box').style.display = 'block';
      } else {
        document.querySelector('.milk-section_image').style.display = 'block';
      }
    });
  });

  leftSection.append(productMainBox);
  rowDiv.append(leftSection);

  const rightSection = document.createElement('div');
  rightSection.classList.add('right-section', 'mt-10', 'py-0', 'position-relative', 'col-lg-8');

  // Ghee Panel
  gheePanels.forEach((row) => {
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

    const accountMainBgBox = document.createElement('div');
    accountMainBgBox.classList.add('account-mainBg-box', 'w-100');

    const createBgImageDiv = (cell, className) => {
      const div = document.createElement('div');
      div.classList.add('annual-background_image--overlay', 'd-flex', className);
      const picture = cell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        optimizedPic.querySelector('img').classList.add('account-bgImg', 'with-overlay');
        div.append(optimizedPic);
      }
      const overlay = document.createElement('div');
      overlay.classList.add('overlay');
      div.append(overlay);
      return div;
    };

    accountMainBgBox.append(createBgImageDiv(backgroundDesktopCell, 'annual-bg-desktop'));
    accountMainBgBox.append(createBgImageDiv(backgroundMobileCell, 'annual-bg-mobile'));

    const rightSubtextBefore = document.createElement('div');
    rightSubtextBefore.classList.add('right-subtext', 'position-absolute', 'start-0', 'end-0', 'bottom-0', 'right-subtext__BeforeDownload');
    const beforeContent = document.createElement('div');
    beforeContent.classList.add('d-flex', 'flex-column', 'align-items-center');

    const headlineBefore = document.createElement('div');
    headlineBefore.classList.add('ghee-mobile-heading', 'text-center', 'font-md-18', 'font-baskerville', 'leading-32');
    headlineBefore.innerHTML = headlineBeforeCell.innerHTML;
    beforeContent.append(headlineBefore);

    const downloadButton = document.createElement('button');
    downloadButton.classList.add('annual-report_DownloadBtn', 'my-9');
    const downloadIconDiv = document.createElement('div');
    downloadIconDiv.classList.add('download_icon');
    const ctaIconPicture = ctaIconCell.querySelector('picture');
    if (ctaIconPicture) {
      const ctaIconImg = ctaIconPicture.querySelector('img');
      const optimizedCtaIcon = createOptimizedPicture(ctaIconImg.src, ctaIconImg.alt, false, [{ width: '750' }]);
      moveInstrumentation(ctaIconImg, optimizedCtaIcon.querySelector('img'));
      downloadIconDiv.append(optimizedCtaIcon);
    }
    downloadButton.append(downloadIconDiv);
    beforeContent.append(downloadButton);

    const downloadLinkWrapper = document.createElement('div');
    downloadLinkWrapper.classList.add('d-flex', 'mb-6');
    const downloadLinkDiv = document.createElement('div');
    const ctaAnchor = document.createElement('a');
    ctaAnchor.classList.add('text-decoration-none', 'download-report_btn', 'cta-analytics', 'download_report_btnBefore', 'text-cream-100', 'border', 'border-2', 'border-red-100', 'border-maroon-100-hover', 'border-red-300-active', 'bg-red-100', 'bg-maroon-100-hover', 'bg-red-300-active');
    const foundLink = ctaLinkCell.querySelector('a');
    if (foundLink) {
      ctaAnchor.href = foundLink.href;
      ctaAnchor.download = 'report.pdf'; // Assuming PDF download
    }
    ctaAnchor.textContent = ctaLabelCell.textContent.trim();
    downloadLinkDiv.append(ctaAnchor);
    downloadLinkWrapper.append(downloadLinkDiv);
    beforeContent.append(downloadLinkWrapper);

    rightSubtextBefore.append(beforeContent);
    accountMainBgBox.append(rightSubtextBefore);

    const rightSubtextAfter = document.createElement('div');
    rightSubtextAfter.classList.add('right-subtext', 'position-absolute', 'start-0', 'end-0', 'bottom-0', 'right-section_subtextafter', 'right-subtext__AfterDownload');
    const afterContent = document.createElement('div');
    afterContent.classList.add('d-flex', 'flex-column', 'align-items-center', 'justify-content-around');

    const headlineAfter = document.createElement('div');
    headlineAfter.classList.add('ghee-mobile-heading', 'text-center', 'font-md-18', 'font-baskerville', 'leading-32');
    headlineAfter.innerHTML = headlineAfterCell.innerHTML;
    afterContent.append(headlineAfter);

    const confirmationButton = document.createElement('button');
    confirmationButton.classList.add('annual-report_DownloadBtn', 'my-9');
    const tickDownloadDiv = document.createElement('div');
    tickDownloadDiv.classList.add('tick_download');
    const confirmationIconPicture = confirmationIconCell.querySelector('picture');
    if (confirmationIconPicture) {
      const confirmationIconImg = confirmationIconPicture.querySelector('img');
      const optimizedConfirmationIcon = createOptimizedPicture(confirmationIconImg.src, confirmationIconImg.alt, false, [{ width: '750' }]);
      moveInstrumentation(confirmationIconImg, optimizedConfirmationIcon.querySelector('img'));
      tickDownloadDiv.append(optimizedConfirmationIcon);
    }
    confirmationButton.append(tickDownloadDiv);
    afterContent.append(confirmationButton);

    const afterDownloadLinkWrapper = document.createElement('div');
    afterDownloadLinkWrapper.classList.add('d-flex', 'mb-6');
    const afterDownloadLinkDiv = document.createElement('div');
    const afterCtaButton = document.createElement('button');
    afterCtaButton.classList.add('download-report_btn', 'download_report_btnAfter', 'disabled', 'bg-light-pink', 'border-light-pink', 'text-cream-100');
    afterCtaButton.textContent = ctaLabelAfterCell.textContent.trim();
    afterDownloadLinkDiv.append(afterCtaButton);
    afterDownloadLinkWrapper.append(afterDownloadLinkDiv);
    afterContent.append(afterDownloadLinkWrapper);

    rightSubtextAfter.append(afterContent);
    accountMainBgBox.append(rightSubtextAfter);

    gheeBox.append(accountMainBgBox);
    rightSection.append(gheeBox);

    ctaAnchor.addEventListener('click', (e) => {
      e.preventDefault();
      // Simulate download
      setTimeout(() => {
        rightSubtextBefore.style.display = 'none';
        rightSubtextAfter.style.display = 'block';
      }, 500);
    });
  });

  // Milk Panel
  milkPanels.forEach((row) => {
    const [
      backgroundDesktopCell,
      backgroundMobileCell,
      headlineCell,
      confirmationIconCell,
      whatsappLinkCell,
      whatsappLabelCell,
    ] = [...row.children];

    const milkSection = document.createElement('div');
    milkSection.classList.add('position-relative', 'milk-section_image');
    milkSection.style.display = 'none'; // Initially hidden
    moveInstrumentation(row, milkSection);

    const accountMainBgBox = document.createElement('div');
    accountMainBgBox.classList.add('w-100', 'account-mainBg-box', 'd-flex');

    const createBgImageDiv = (cell, className) => {
      const div = document.createElement('div');
      div.classList.add('annual-background_image--overlay', 'd-flex', className);
      const picture = cell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        optimizedPic.querySelector('img').classList.add('account-bgImg', 'with-overlay');
        div.append(optimizedPic);
      }
      const overlay = document.createElement('div');
      overlay.classList.add('overlay');
      div.append(overlay);
      return div;
    };

    accountMainBgBox.append(createBgImageDiv(backgroundDesktopCell, 'annual-bg-desktop'));
    accountMainBgBox.append(createBgImageDiv(backgroundMobileCell, 'annual-bg-mobile'));
    milkSection.append(accountMainBgBox);

    const rightSubtextMilk = document.createElement('div');
    rightSubtextMilk.classList.add('right-subtext', 'position-absolute', 'start-0', 'end-0', 'bottom-0', 'right-subtext-milk');
    const milkContent = document.createElement('div');
    milkContent.classList.add('d-flex', 'flex-column', 'align-items-center');

    const headlineMilk = document.createElement('div');
    headlineMilk.classList.add('ghee-mobile-heading', 'text-center', 'font-md-18', 'font-baskerville', 'leading-32');
    headlineMilk.innerHTML = headlineCell.innerHTML;
    milkContent.append(headlineMilk);

    const confirmationIconWrapper = document.createElement('div');
    confirmationIconWrapper.classList.add('my-9');
    const confirmationIconPicture = confirmationIconCell.querySelector('picture');
    if (confirmationIconPicture) {
      const confirmationIconImg = confirmationIconPicture.querySelector('img');
      const optimizedConfirmationIcon = createOptimizedPicture(confirmationIconImg.src, confirmationIconImg.alt, false, [{ width: '750' }]);
      moveInstrumentation(confirmationIconImg, optimizedConfirmationIcon.querySelector('img'));
      confirmationIconWrapper.append(optimizedConfirmationIcon);
    }
    milkContent.append(confirmationIconWrapper);

    const whatsappLinkWrapper = document.createElement('div');
    whatsappLinkWrapper.classList.add('Whatsapp-link', 'mb-8', 'text-center');
    const whatsappAnchor = document.createElement('a');
    const foundLink = whatsappLinkCell.querySelector('a');
    if (foundLink) {
      whatsappAnchor.href = foundLink.href;
      whatsappAnchor.target = '_blank';
      whatsappAnchor.rel = 'noopener noreferrer';
    }
    whatsappAnchor.textContent = whatsappLabelCell.textContent.trim();
    whatsappLinkWrapper.append(whatsappAnchor); // Append anchor directly, not wrapped in <p>
    milkContent.append(whatsappLinkWrapper);

    rightSubtextMilk.append(milkContent);
    milkSection.append(rightSubtextMilk);
    rightSection.append(milkSection);
  });

  rowDiv.append(rightSection);
  mainBox.append(rowDiv);

  block.replaceChildren(mainBox);

  // Initial state: show ghee panel, hide milk panel
  const initialGheeBox = block.querySelector('.ghee_box');
  const initialMilkSection = block.querySelector('.milk-section_image');
  if (initialGheeBox) {
    initialGheeBox.style.display = 'block';
    const beforeDownload = initialGheeBox.querySelector('.right-subtext__BeforeDownload');
    const afterDownload = initialGheeBox.querySelector('.right-subtext__AfterDownload');
    if (beforeDownload) beforeDownload.style.display = 'block';
    if (afterDownload) afterDownload.style.display = 'none';
  }
  if (initialMilkSection) {
    initialMilkSection.style.display = 'none';
  }
}
