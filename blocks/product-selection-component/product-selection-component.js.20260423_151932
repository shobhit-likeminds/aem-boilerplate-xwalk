import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, ...itemRows] = [...block.children];

  const productSelectorItems = itemRows.filter(
    (row) => row.children.length === 2 && row.querySelector('picture') && row.querySelector('div:last-child')
  );
  const productPanels = itemRows.filter(
    (row) => row.children.length === 12 && row.querySelector('picture') && row.querySelector('a')
  );

  const mainBox = document.createElement('div');
  mainBox.classList.add('account-mainBox', 'mx-md-16');
  moveInstrumentation(block, mainBox);

  const row = document.createElement('div');
  row.classList.add('row', 'gx-5');

  const leftSection = document.createElement('div');
  leftSection.classList.add('mt-8', 'mt-md-10', 'col-lg-4');

  const heading = document.createElement('p');
  heading.classList.add(
    'font-24',
    'font-md-40',
    'fw-bold',
    'product-container_heading',
    'font-baskerville'
  );
  moveInstrumentation(headingRow, heading);
  // FIX: Use innerHTML for richtext field, not children[0].innerHTML
  heading.innerHTML = headingRow.innerHTML;
  leftSection.append(heading);

  const productMainBox = document.createElement('div');
  productMainBox.classList.add('product-mainbox', 'mt-10', 'mt-md-12');

  productSelectorItems.forEach((itemRow, index) => {
    const [productIconCell, productLabelCell] = [...itemRow.children];

    const productDiv = document.createElement('div');
    const productHoverDiv = document.createElement('div');
    productHoverDiv.classList.add('milk_ghee_smallImag', 'product-hover');
    if (index === 0) {
      productHoverDiv.classList.add('ghee-packet'); // Add ghee-packet class
      productHoverDiv.classList.add('active'); // Set first item as active by default
    } else if (index === 1) {
      productHoverDiv.classList.add('milk-packet'); // Add milk-packet class
    }

    const picture = productIconCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        optimizedPic.classList.add('left-section-gheeBox', 'object-fit-contain');
        productHoverDiv.append(optimizedPic);
      }
    }

    const labelP = document.createElement('p');
    labelP.classList.add('product-subnames');
    labelP.textContent = productLabelCell.textContent.trim();
    productHoverDiv.append(labelP);

    moveInstrumentation(itemRow, productDiv);
    productDiv.append(productHoverDiv);
    productMainBox.append(productDiv);
  });

  leftSection.append(productMainBox);
  row.append(leftSection);

  const rightSection = document.createElement('div');
  rightSection.classList.add(
    'right-section',
    'mt-10',
    'py-0',
    'position-relative',
    'col-lg-8'
  );

  productPanels.forEach((panelRow, index) => {
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
      milkPanelIconCell, // This field is present in the model but not used in the current rendering logic for product panels.
      whatsappLinkCell,
      whatsappLabelCell,
    ] = [...panelRow.children];

    const panelContainer = document.createElement('div');
    if (index === 0) {
      panelContainer.classList.add('ghee_box');
      panelContainer.classList.add('active'); // Set first panel as active by default
    } else if (index === 1) {
      panelContainer.classList.add('position-relative', 'milk-section_image');
    }

    const accountMainBgBox = document.createElement('div');
    accountMainBgBox.classList.add('account-mainBg-box', 'w-100', 'd-flex');

    const createBackgroundDiv = (cell, className) => {
      const bgDiv = document.createElement('div');
      bgDiv.classList.add('annual-background_image--overlay', 'd-flex', className);
      const picture = cell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          optimizedPic.classList.add('account-bgImg', 'with-overlay');
          bgDiv.append(optimizedPic);
        }
      }
      const overlay = document.createElement('div');
      overlay.classList.add('overlay');
      bgDiv.append(overlay);
      return bgDiv;
    };

    accountMainBgBox.append(
      createBackgroundDiv(backgroundDesktopCell, 'annual-bg-desktop')
    );
    accountMainBgBox.append(
      createBackgroundDiv(backgroundMobileCell, 'annual-bg-mobile')
    );

    panelContainer.append(accountMainBgBox);

    // Before Download Section
    const rightSubtextBefore = document.createElement('div');
    rightSubtextBefore.classList.add(
      'right-subtext',
      'position-absolute',
      'start-0',
      'end-0',
      'bottom-0',
      'right-subtext__BeforeDownload'
    );

    const beforeContent = document.createElement('div');
    beforeContent.classList.add('d-flex', 'flex-column', 'align-items-center');

    const headlineBeforeDiv = document.createElement('div');
    headlineBeforeDiv.classList.add(
      'ghee-mobile-heading',
      'text-center',
      'font-md-18',
      'font-baskerville',
      'leading-32'
    );
    headlineBeforeDiv.innerHTML = headlineBeforeCell.innerHTML;
    beforeContent.append(headlineBeforeDiv);

    const downloadButton = document.createElement('button');
    downloadButton.classList.add('annual-report_DownloadBtn', 'my-9');
    const downloadIconDiv = document.createElement('div');
    downloadIconDiv.classList.add('download_icon');
    const ctaIcon = ctaIconCell.querySelector('picture');
    if (ctaIcon) {
      const img = ctaIcon.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        downloadIconDiv.append(optimizedPic);
      }
    }
    downloadButton.append(downloadIconDiv);
    beforeContent.append(downloadButton);

    const ctaLinkDiv = document.createElement('div');
    ctaLinkDiv.classList.add('d-flex', 'mb-6');
    const innerCtaDiv = document.createElement('div');
    const ctaAnchor = document.createElement('a');
    const foundCtaLink = ctaLinkCell.querySelector('a');
    if (foundCtaLink) {
      ctaAnchor.href = foundCtaLink.href;
      ctaAnchor.download = 'report.pdf'; // Add download attribute
    }
    ctaAnchor.classList.add(
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
      'bg-red-300-active'
    );
    ctaAnchor.textContent = ctaLabelCell.textContent.trim();
    moveInstrumentation(ctaLinkCell, ctaAnchor); // Move instrumentation from link cell
    innerCtaDiv.append(ctaAnchor);
    ctaLinkDiv.append(innerCtaDiv);
    beforeContent.append(ctaLinkDiv);

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
    moveInstrumentation(whatsappLinkCell, whatsappAnchor);
    whatsappLinkDiv.append(whatsappAnchor);
    beforeContent.append(whatsappLinkDiv);

    rightSubtextBefore.append(beforeContent);
    panelContainer.append(rightSubtextBefore);

    // After Download Section
    const rightSubtextAfter = document.createElement('div');
    rightSubtextAfter.classList.add(
      'right-subtext',
      'position-absolute',
      'start-0',
      'end-0',
      'bottom-0',
      'right-section_subtextafter',
      'right-subtext__AfterDownload'
    );

    const afterContent = document.createElement('div');
    afterContent.classList.add(
      'd-flex',
      'flex-column',
      'align-items-center',
      'justify-content-around'
    );

    const headlineAfterDiv = document.createElement('div');
    headlineAfterDiv.classList.add(
      'ghee-mobile-heading',
      'text-center',
      'font-md-18',
      'font-baskerville',
      'leading-32'
    );
    headlineAfterDiv.innerHTML = headlineAfterCell.innerHTML;
    afterContent.append(headlineAfterDiv);

    const confirmationButton = document.createElement('button');
    confirmationButton.classList.add('annual-report_DownloadBtn', 'my-9');
    const tickDownloadDiv = document.createElement('div');
    tickDownloadDiv.classList.add('tick_download');
    const confirmationIcon = confirmationIconCell.querySelector('picture');
    if (confirmationIcon) {
      const img = confirmationIcon.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        tickDownloadDiv.append(optimizedPic);
      }
    }
    confirmationButton.append(tickDownloadDiv);
    afterContent.append(confirmationButton);

    const ctaAfterDiv = document.createElement('div');
    ctaAfterDiv.classList.add('d-flex', 'mb-6');
    const innerCtaAfterDiv = document.createElement('div');
    const ctaAfterButton = document.createElement('button');
    ctaAfterButton.classList.add(
      'download-report_btn',
      'download_report_btnAfter',
      'disabled',
      'bg-light-pink',
      'border-light-pink',
      'text-cream-100'
    );
    ctaAfterButton.textContent = ctaLabelAfterCell.textContent.trim();
    innerCtaAfterDiv.append(ctaAfterButton);
    ctaAfterDiv.append(innerCtaAfterDiv);
    afterContent.append(ctaAfterDiv);

    const whatsappLinkAfterDiv = document.createElement('div');
    whatsappLinkAfterDiv.classList.add('Whatsapp-link', 'mb-8', 'text-center');
    const whatsappAfterAnchor = document.createElement('a');
    // FIX: Use whatsappLinkCell and whatsappLabelCell for after download section
    const foundWhatsappLinkAfter = whatsappLinkCell.querySelector('a');
    if (foundWhatsappLinkAfter) {
      whatsappAfterAnchor.href = foundWhatsappLinkAfter.href;
      whatsappAfterAnchor.target = '_blank';
      whatsappAfterAnchor.rel = 'noopener noreferrer';
    }
    whatsappAfterAnchor.textContent = whatsappLabelCell.textContent.trim();
    moveInstrumentation(whatsappLinkCell, whatsappAfterAnchor); // Move instrumentation from original cell
    whatsappLinkAfterDiv.append(whatsappAfterAnchor);
    afterContent.append(whatsappLinkAfterDiv);

    rightSubtextAfter.append(afterContent);
    panelContainer.append(rightSubtextAfter);

    moveInstrumentation(panelRow, panelContainer);
    rightSection.append(panelContainer);
  });

  row.append(rightSection);
  mainBox.append(row);

  block.replaceChildren(mainBox);

  // Add event listeners for product selection
  const productSelectors = block.querySelectorAll('.product-mainbox > div > div');
  const productPanelsElements = block.querySelectorAll(
    '.right-section > div'
  );

  productSelectors.forEach((selector, index) => {
    selector.addEventListener('click', () => {
      // Remove active class from all selectors and panels
      productSelectors.forEach((s) => s.classList.remove('active'));
      productPanelsElements.forEach((p) => p.classList.remove('active'));

      // Add active class to the clicked selector and corresponding panel
      selector.classList.add('active');
      if (productPanelsElements[index]) {
        productPanelsElements[index].classList.add('active');
      }
    });
  });

  // Add event listener for download button
  const downloadButtons = block.querySelectorAll('.annual-report_DownloadBtn');
  downloadButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      // Find the parent panel
      const parentPanel = event.target.closest('.ghee_box');
      if (parentPanel) {
        const beforeDownloadSection = parentPanel.querySelector(
          '.right-subtext__BeforeDownload'
        );
        const afterDownloadSection = parentPanel.querySelector(
          '.right-subtext__AfterDownload'
        );

        if (beforeDownloadSection && afterDownloadSection) {
          beforeDownloadSection.style.display = 'none';
          afterDownloadSection.style.display = 'flex';
        }
      }
    });
  });
}
