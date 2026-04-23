import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  const mainHeadingRow = children[0];
  const itemRows = children.slice(1);

  // Use content detection for item rows
  const productItems = itemRows.filter((row) => row.children.length === 2);
  const gheePanels = itemRows.filter((row) => row.children.length === 8);
  const milkPanels = itemRows.filter((row) => row.children.length === 6);

  const root = document.createElement('div');
  root.classList.add('container-xl', 'annualReport_mainBox', 'product-selection-component');

  const accountMainBox = document.createElement('div');
  accountMainBox.classList.add('account-mainBox', 'mx-md-16');

  const row = document.createElement('div');
  row.classList.add('row', 'gx-5');

  const leftSection = document.createElement('div');
  leftSection.classList.add('mt-8', 'mt-md-10', 'col-lg-4');

  const heading = document.createElement('p');
  heading.classList.add('font-24', 'font-md-40', 'fw-bold', 'product-container_heading', 'font-baskerville');
  moveInstrumentation(mainHeadingRow, heading);
  heading.innerHTML = mainHeadingRow.firstElementChild.innerHTML;
  leftSection.append(heading);

  const productMainBox = document.createElement('div');
  productMainBox.classList.add('product-mainbox', 'mt-10', 'mt-md-12');

  productItems.forEach((productRow, index) => {
    // Use content detection for product item cells
    const cells = [...productRow.children];
    const productImageCell = cells.find(cell => cell.querySelector('picture'));
    const productLabelCell = cells.find(cell => !cell.querySelector('picture'));

    const productDiv = document.createElement('div');
    const productItem = document.createElement('div');
    productItem.classList.add('milk_ghee_smallImag');

    if (index === 0) {
      productItem.classList.add('ghee-packet', 'product-hover');
    } else if (index === 1) {
      productItem.classList.add('milk-packet');
    }

    if (productImageCell) {
      const picture = productImageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        productItem.append(optimizedPic);
      }
    }
    productItem.querySelector('img')?.classList.add('left-section-gheeBox', 'object-fit-contain');

    const label = document.createElement('p');
    label.classList.add('product-subnames');
    if (productLabelCell) {
      label.textContent = productLabelCell.textContent.trim();
    }
    productItem.append(label);

    moveInstrumentation(productRow, productItem);
    productDiv.append(productItem);
    productMainBox.append(productDiv);
  });

  leftSection.append(productMainBox);
  row.append(leftSection);

  const rightSection = document.createElement('div');
  rightSection.classList.add('right-section', 'mt-10', 'py-0', 'position-relative', 'col-lg-8');

  // Ghee Box
  if (gheePanels.length > 0) {
    const gheePanelRow = gheePanels[0];
    const [
      gheeBgDesktopCell,
      gheeBgMobileCell,
      gheeHeadlineBeforeCell,
      gheeCtaIconCell,
      gheeCtaLinkCell, // This is an aem-content cell
      gheeCtaLabelCell,
      gheeHeadlineAfterCell,
      gheeConfirmationIconCell,
    ] = [...gheePanelRow.children];

    const gheeBox = document.createElement('div');
    gheeBox.classList.add('ghee_box');

    const accountMainBgBox = document.createElement('div');
    accountMainBgBox.classList.add('account-mainBg-box', 'w-100');

    const createBackgroundDiv = (cell, className) => {
      const bgDiv = document.createElement('div');
      bgDiv.classList.add('annual-background_image--overlay', 'd-flex', className);
      const picture = cell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        bgDiv.append(optimizedPic);
      }
      bgDiv.querySelector('img')?.classList.add('account-bgImg', 'with-overlay');
      const overlay = document.createElement('div');
      overlay.classList.add('overlay');
      bgDiv.append(overlay);
      return bgDiv;
    };

    accountMainBgBox.append(createBackgroundDiv(gheeBgDesktopCell, 'annual-bg-desktop'));
    accountMainBgBox.append(createBackgroundDiv(gheeBgMobileCell, 'annual-bg-mobile'));

    const rightSubtextBefore = document.createElement('div');
    rightSubtextBefore.classList.add(
      'right-subtext',
      'position-absolute',
      'start-0',
      'end-0',
      'bottom-0',
      'right-subtext__BeforeDownload',
    );
    const beforeContent = document.createElement('div');
    beforeContent.classList.add('d-flex', 'flex-column', 'align-items-center');

    const gheeMobileHeadingBefore = document.createElement('div');
    gheeMobileHeadingBefore.classList.add(
      'ghee-mobile-heading',
      'text-center',
      'font-md-18',
      'font-baskerville',
      'leading-32',
    );
    gheeMobileHeadingBefore.innerHTML = gheeHeadlineBeforeCell.innerHTML;
    beforeContent.append(gheeMobileHeadingBefore);

    const downloadButton = document.createElement('button');
    downloadButton.classList.add('annual-report_DownloadBtn', 'my-9');
    const downloadIconDiv = document.createElement('div');
    downloadIconDiv.classList.add('download_icon');
    const ctaIconPicture = gheeCtaIconCell.querySelector('picture');
    if (ctaIconPicture) {
      const img = ctaIconPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      downloadIconDiv.append(optimizedPic);
    }
    downloadButton.append(downloadIconDiv);
    beforeContent.append(downloadButton);

    const downloadLinkDiv = document.createElement('div');
    downloadLinkDiv.classList.add('d-flex', 'mb-6');
    const innerDiv = document.createElement('div');
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
    const foundLink = gheeCtaLinkCell.querySelector('a'); // Correctly read href from aem-content cell
    if (foundLink) {
      ctaLink.href = foundLink.href;
      ctaLink.setAttribute('download', 'report.pdf');
    }
    ctaLink.textContent = gheeCtaLabelCell.textContent.trim();
    moveInstrumentation(gheeCtaLinkCell, ctaLink); // Move instrumentation from link cell
    innerDiv.append(ctaLink);
    downloadLinkDiv.append(innerDiv);
    beforeContent.append(downloadLinkDiv);

    const whatsappLinkDiv = document.createElement('div');
    whatsappLinkDiv.classList.add('Whatsapp-link', 'mb-8', 'text-center');
    beforeContent.append(whatsappLinkDiv);

    rightSubtextBefore.append(beforeContent);
    accountMainBgBox.append(rightSubtextBefore);
    gheeBox.append(accountMainBgBox);

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
    const afterContent = document.createElement('div');
    afterContent.classList.add('d-flex', 'flex-column', 'align-items-center', 'justify-content-around');

    const gheeMobileHeadingAfter = document.createElement('div');
    gheeMobileHeadingAfter.classList.add(
      'ghee-mobile-heading',
      'text-center',
      'font-md-18',
      'font-baskerville',
      'leading-32',
    );
    gheeMobileHeadingAfter.innerHTML = gheeHeadlineAfterCell.innerHTML;
    afterContent.append(gheeMobileHeadingAfter);

    const confirmationButton = document.createElement('button');
    confirmationButton.classList.add('annual-report_DownloadBtn', 'my-9');
    const tickDownloadDiv = document.createElement('div');
    tickDownloadDiv.classList.add('tick_download');
    const confirmationIconPicture = gheeConfirmationIconCell.querySelector('picture');
    if (confirmationIconPicture) {
      const img = confirmationIconPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      tickDownloadDiv.append(optimizedPic);
    }
    confirmationButton.append(tickDownloadDiv);
    afterContent.append(confirmationButton);

    const afterDownloadLinkDiv = document.createElement('div');
    afterDownloadLinkDiv.classList.add('d-flex', 'mb-6');
    const afterInnerDiv = document.createElement('div');
    const afterDownloadButton = document.createElement('button');
    afterDownloadButton.classList.add(
      'download-report_btn',
      'download_report_btnAfter',
      'disabled',
      'bg-light-pink',
      'border-light-pink',
      'text-cream-100',
    );
    afterDownloadButton.textContent = gheeCtaLabelCell.textContent.trim();
    afterInnerDiv.append(afterDownloadButton);
    afterDownloadLinkDiv.append(afterInnerDiv);
    afterContent.append(afterDownloadLinkDiv);

    const afterWhatsappLinkDiv = document.createElement('div');
    afterWhatsappLinkDiv.classList.add('Whatsapp-link', 'mb-8', 'text-center');
    afterContent.append(afterWhatsappLinkDiv);

    rightSubtextAfter.append(afterContent);
    gheeBox.append(rightSubtextAfter);

    rightSection.append(gheeBox);

    // Event listeners for Ghee panel interaction
    downloadButton.addEventListener('click', (e) => {
      e.preventDefault();
      ctaLink.click(); // Trigger the download
      rightSubtextBefore.classList.remove('right-subtext__BeforeDownload');
      rightSubtextAfter.classList.add('right-subtext__AfterDownload');
      rightSubtextBefore.style.display = 'none';
      rightSubtextAfter.style.display = 'flex';
    });

    // Initial state: only before download is visible
    rightSubtextBefore.style.display = 'flex';
    rightSubtextAfter.style.display = 'none';

    moveInstrumentation(gheePanelRow, gheeBox); // Move instrumentation for the whole ghee panel
  }

  // Milk Section
  if (milkPanels.length > 0) {
    const milkPanelRow = milkPanels[0];
    const [
      milkBgDesktopCell,
      milkBgMobileCell,
      milkHeadlineCell,
      milkConfirmationIconCell,
      milkWhatsappLinkCell, // This is an aem-content cell
      milkWhatsappLabelCell,
    ] = [...milkPanelRow.children];

    const milkSectionImage = document.createElement('div');
    milkSectionImage.classList.add('position-relative', 'milk-section_image');

    const milkAccountMainBgBox = document.createElement('div');
    milkAccountMainBgBox.classList.add('w-100', 'account-mainBg-box', 'd-flex');

    const createBackgroundDiv = (cell, className) => {
      const bgDiv = document.createElement('div');
      bgDiv.classList.add('annual-background_image--overlay', 'd-flex', className);
      const picture = cell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        bgDiv.append(optimizedPic);
      }
      bgDiv.querySelector('img')?.classList.add('account-bgImg', 'with-overlay');
      const overlay = document.createElement('div');
      overlay.classList.add('overlay');
      bgDiv.append(overlay);
      return bgDiv;
    };

    milkAccountMainBgBox.append(createBackgroundDiv(milkBgDesktopCell, 'annual-bg-desktop'));
    milkAccountMainBgBox.append(createBackgroundDiv(milkBgMobileCell, 'annual-bg-mobile'));
    milkSectionImage.append(milkAccountMainBgBox);

    const milkRightSubtext = document.createElement('div');
    milkRightSubtext.classList.add(
      'right-subtext',
      'position-absolute',
      'start-0',
      'end-0',
      'bottom-0',
      'right-subtext-milk',
    );
    const milkContent = document.createElement('div');
    milkContent.classList.add('d-flex', 'flex-column', 'align-items-center');

    const milkGheeMobileHeading = document.createElement('div');
    milkGheeMobileHeading.classList.add(
      'ghee-mobile-heading',
      'text-center',
      'font-md-18',
      'font-baskerville',
      'leading-32',
    );
    milkGheeMobileHeading.innerHTML = milkHeadlineCell.innerHTML;
    milkContent.append(milkGheeMobileHeading);

    const emptyDiv = document.createElement('div');
    emptyDiv.classList.add('font-md-18', 'mt-6', 'text-center');
    milkContent.append(emptyDiv);

    const confirmationIconDiv = document.createElement('div');
    confirmationIconDiv.classList.add('my-9');
    const confirmationIconPicture = milkConfirmationIconCell.querySelector('picture');
    if (confirmationIconPicture) {
      const img = confirmationIconPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      confirmationIconDiv.append(optimizedPic);
    }
    milkContent.append(confirmationIconDiv);

    const whatsappLinkDiv = document.createElement('div');
    whatsappLinkDiv.classList.add('Whatsapp-link', 'mb-8', 'text-center');
    const whatsappLink = document.createElement('a');
    const foundWhatsappLink = milkWhatsappLinkCell.querySelector('a'); // Correctly read href from aem-content cell
    if (foundWhatsappLink) {
      whatsappLink.href = foundWhatsappLink.href;
      whatsappLink.target = '_blank';
      whatsappLink.rel = 'noopener noreferrer';
    }
    whatsappLink.textContent = milkWhatsappLabelCell.textContent.trim();
    moveInstrumentation(milkWhatsappLinkCell, whatsappLink); // Move instrumentation from link cell

    const whatsappText = document.createElement('p');
    whatsappText.append('Check Your Milk Report Card on ');
    whatsappText.append(whatsappLink);
    const screenReaderOnly = document.createElement('span');
    screenReaderOnly.classList.add('cmp-link__screen-reader-only');
    screenReaderOnly.textContent = 'opens in a new tab';
    whatsappLink.append(screenReaderOnly);

    whatsappLinkDiv.append(whatsappText);
    milkContent.append(whatsappLinkDiv);

    milkRightSubtext.append(milkContent);
    milkSectionImage.append(milkRightSubtext);
    rightSection.append(milkSectionImage);

    moveInstrumentation(milkPanelRow, milkSectionImage); // Move instrumentation for the whole milk panel
  }

  row.append(rightSection);
  accountMainBox.append(row);
  root.append(accountMainBox);

  block.replaceChildren(root);

  // Image optimization for all images in the block
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
