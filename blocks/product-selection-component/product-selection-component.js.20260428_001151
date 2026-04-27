import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  const headingRow = children[0];
  const productItemRows = children.filter(
    (row) => row.children.length === 2 && row.querySelector('picture')
  );
  const gheeContentRows = children.filter(
    (row) => row.children.length === 9
  );
  const milkContentRows = children.filter(
    (row) => row.children.length === 6
  );

  const mainBox = document.createElement('div');
  mainBox.classList.add('account-mainBox', 'mx-md-16');

  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row', 'gx-5');

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
  heading.innerHTML = headingRow.innerHTML;
  leftSection.append(heading);

  const productMainBox = document.createElement('div');
  productMainBox.classList.add('product-mainbox', 'mt-10', 'mt-md-12');

  productItemRows.forEach((row) => {
    const [productIconCell, productLabelCell] = [...row.children];

    const productDiv = document.createElement('div');
    const productHoverDiv = document.createElement('div');
    productHoverDiv.classList.add('milk_ghee_smallImag', 'ghee-packet', 'product-hover');

    const productIconPicture = productIconCell.querySelector('picture');
    if (productIconPicture) {
      const img = productIconPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('left-section-gheeBox', 'object-fit-contain');
      productHoverDiv.append(optimizedPic);
    }

    const productLabel = document.createElement('p');
    productLabel.classList.add('product-subnames');
    productLabel.textContent = productLabelCell.textContent.trim();
    productHoverDiv.append(productLabel);

    moveInstrumentation(row, productHoverDiv);
    productDiv.append(productHoverDiv);
    productMainBox.append(productDiv);
  });
  leftSection.append(productMainBox);

  const rightSection = document.createElement('div');
  rightSection.classList.add('right-section', 'mt-10', 'py-0', 'position-relative', 'col-lg-8');

  gheeContentRows.forEach((row) => {
    const [
      backgroundDesktopCell,
      backgroundMobileCell,
      headlineBeforeDownloadCell,
      ctaIconCell,
      ctaLinkCell,
      ctaLabelCell,
      headlineAfterDownloadCell,
      confirmationIconCell,
      ctaLabelAfterDownloadCell,
    ] = [...row.children];

    const gheeBox = document.createElement('div');
    gheeBox.classList.add('ghee_box');

    const accountMainBgBox = document.createElement('div');
    accountMainBgBox.classList.add('account-mainBg-box', 'w-100');

    const annualBgDesktop = document.createElement('div');
    annualBgDesktop.classList.add(
      'annual-background_image--overlay',
      'd-flex',
      'annual-bg-desktop'
    );
    const desktopPicture = backgroundDesktopCell.querySelector('picture');
    if (desktopPicture) {
      const img = desktopPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('account-bgImg', 'with-overlay');
      annualBgDesktop.append(optimizedPic);
    }
    const desktopOverlay = document.createElement('div');
    desktopOverlay.classList.add('overlay');
    annualBgDesktop.append(desktopOverlay);
    accountMainBgBox.append(annualBgDesktop);

    const annualBgMobile = document.createElement('div');
    annualBgMobile.classList.add(
      'annual-background_image--overlay',
      'd-flex',
      'annual-bg-mobile'
    );
    const mobilePicture = backgroundMobileCell.querySelector('picture');
    if (mobilePicture) {
      const img = mobilePicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('account-bgImg', 'with-overlay');
      annualBgMobile.append(optimizedPic);
    }
    const mobileOverlay = document.createElement('div');
    mobileOverlay.classList.add('overlay');
    annualBgMobile.append(mobileOverlay);
    accountMainBgBox.append(annualBgMobile);

    const rightSubtextBeforeDownload = document.createElement('div');
    rightSubtextBeforeDownload.classList.add(
      'right-subtext',
      'position-absolute',
      'start-0',
      'end-0',
      'bottom-0',
      'right-subtext__BeforeDownload'
    );
    const flexContainerBefore = document.createElement('div');
    flexContainerBefore.classList.add('d-flex', 'flex-column', 'align-items-center');

    const gheeMobileHeadingBefore = document.createElement('div');
    gheeMobileHeadingBefore.classList.add(
      'ghee-mobile-heading',
      'text-center',
      'font-md-18',
      'font-baskerville',
      'leading-32'
    );
    gheeMobileHeadingBefore.innerHTML = headlineBeforeDownloadCell.innerHTML;
    flexContainerBefore.append(gheeMobileHeadingBefore);

    const downloadButton = document.createElement('button');
    downloadButton.classList.add('annual-report_DownloadBtn', 'my-9');
    const downloadIconDiv = document.createElement('div');
    downloadIconDiv.classList.add('download_icon');
    const ctaIconPicture = ctaIconCell.querySelector('picture');
    if (ctaIconPicture) {
      const img = ctaIconPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      downloadIconDiv.append(optimizedPic);
    }
    downloadButton.append(downloadIconDiv);
    flexContainerBefore.append(downloadButton);

    const downloadLinkWrapper = document.createElement('div');
    downloadLinkWrapper.classList.add('d-flex', 'mb-6');
    const linkDiv = document.createElement('div');
    const ctaAnchor = document.createElement('a');
    const foundCtaLink = ctaLinkCell.querySelector('a');
    if (foundCtaLink) {
      ctaAnchor.href = foundCtaLink.href;
      if (/\.(pdf)$/i.test(foundCtaLink.href)) {
        ctaAnchor.setAttribute('download', 'report.pdf');
      }
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
    moveInstrumentation(ctaLinkCell, ctaAnchor);
    linkDiv.append(ctaAnchor);
    downloadLinkWrapper.append(linkDiv);
    flexContainerBefore.append(downloadLinkWrapper);

    const whatsappLinkBefore = document.createElement('div');
    whatsappLinkBefore.classList.add('Whatsapp-link', 'mb-8', 'text-center');
    flexContainerBefore.append(whatsappLinkBefore);

    rightSubtextBeforeDownload.append(flexContainerBefore);
    accountMainBgBox.append(rightSubtextBeforeDownload);

    const rightSubtextAfterDownload = document.createElement('div');
    rightSubtextAfterDownload.classList.add(
      'right-subtext',
      'position-absolute',
      'start-0',
      'end-0',
      'bottom-0',
      'right-section_subtextafter',
      'right-subtext__AfterDownload'
    );
    const flexContainerAfter = document.createElement('div');
    flexContainerAfter.classList.add(
      'd-flex',
      'flex-column',
      'align-items-center',
      'justify-content-around'
    );

    const gheeMobileHeadingAfter = document.createElement('div');
    gheeMobileHeadingAfter.classList.add(
      'ghee-mobile-heading',
      'text-center',
      'font-md-18',
      'font-baskerville',
      'leading-32'
    );
    gheeMobileHeadingAfter.innerHTML = headlineAfterDownloadCell.innerHTML;
    flexContainerAfter.append(gheeMobileHeadingAfter);

    const confirmationButton = document.createElement('button');
    confirmationButton.classList.add('annual-report_DownloadBtn', 'my-9');
    const tickDownloadDiv = document.createElement('div');
    tickDownloadDiv.classList.add('tick_download');
    const confirmationIconPicture = confirmationIconCell.querySelector('picture');
    if (confirmationIconPicture) {
      const img = confirmationIconPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      tickDownloadDiv.append(optimizedPic);
    }
    confirmationButton.append(tickDownloadDiv);
    flexContainerAfter.append(confirmationButton);

    const downloadButtonAfterWrapper = document.createElement('div');
    downloadButtonAfterWrapper.classList.add('d-flex', 'mb-6');
    const buttonDivAfter = document.createElement('div');
    const downloadButtonAfter = document.createElement('button');
    downloadButtonAfter.classList.add(
      'download-report_btn',
      'download_report_btnAfter',
      'disabled',
      'bg-light-pink',
      'border-light-pink',
      'text-cream-100'
    );
    downloadButtonAfter.textContent = ctaLabelAfterDownloadCell.textContent.trim();
    buttonDivAfter.append(downloadButtonAfter);
    downloadButtonAfterWrapper.append(buttonDivAfter);
    flexContainerAfter.append(downloadButtonAfterWrapper);

    const whatsappLinkAfter = document.createElement('div');
    whatsappLinkAfter.classList.add('Whatsapp-link', 'mb-8', 'text-center');
    flexContainerAfter.append(whatsappLinkAfter);

    rightSubtextAfterDownload.append(flexContainerAfter);
    accountMainBgBox.append(rightSubtextAfterDownload);

    gheeBox.append(accountMainBgBox);
    rightSection.append(gheeBox);

    // Add event listeners for download functionality
    downloadButton.addEventListener('click', () => {
      ctaAnchor.click();
      rightSubtextBeforeDownload.style.display = 'none';
      rightSubtextAfterDownload.style.display = 'flex';
    });
  });

  milkContentRows.forEach((row) => {
    const [
      backgroundDesktopCell,
      backgroundMobileCell,
      headlineCell,
      ctaIconCell,
      whatsappLinkCell,
      whatsappLabelCell,
    ] = [...row.children];

    const milkSectionImage = document.createElement('div');
    milkSectionImage.classList.add('position-relative', 'milk-section_image');

    const milkAccountMainBgBox = document.createElement('div');
    milkAccountMainBgBox.classList.add('w-100', 'account-mainBg-box', 'd-flex');

    const milkAnnualBgDesktop = document.createElement('div');
    milkAnnualBgDesktop.classList.add(
      'annual-background_image--overlay',
      'd-flex',
      'annual-bg-desktop'
    );
    const milkDesktopPicture = backgroundDesktopCell.querySelector('picture');
    if (milkDesktopPicture) {
      const img = milkDesktopPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('account-bgImg', 'with-overlay');
      milkAnnualBgDesktop.append(optimizedPic);
    }
    const milkDesktopOverlay = document.createElement('div');
    milkDesktopOverlay.classList.add('overlay');
    milkAnnualBgDesktop.append(milkDesktopOverlay);
    milkAccountMainBgBox.append(milkAnnualBgDesktop);

    const milkAnnualBgMobile = document.createElement('div');
    milkAnnualBgMobile.classList.add(
      'annual-background_image--overlay',
      'd-flex',
      'annual-bg-mobile'
    );
    const milkMobilePicture = backgroundMobileCell.querySelector('picture');
    if (milkMobilePicture) {
      const img = milkMobilePicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('account-bgImg', 'with-overlay');
      milkAnnualBgMobile.append(optimizedPic);
    }
    const milkMobileOverlay = document.createElement('div');
    milkMobileOverlay.classList.add('overlay');
    milkAnnualBgMobile.append(milkMobileOverlay);
    milkAccountMainBgBox.append(milkAnnualBgMobile);

    const milkRightSubtext = document.createElement('div');
    milkRightSubtext.classList.add(
      'right-subtext',
      'position-absolute',
      'start-0',
      'end-0',
      'bottom-0',
      'right-subtext-milk'
    );
    const milkFlexContainer = document.createElement('div');
    milkFlexContainer.classList.add('d-flex', 'flex-column', 'align-items-center');

    const milkGheeMobileHeading = document.createElement('div');
    milkGheeMobileHeading.classList.add(
      'ghee-mobile-heading',
      'text-center',
      'font-md-18',
      'font-baskerville',
      'leading-32'
    );
    milkGheeMobileHeading.innerHTML = headlineCell.innerHTML;
    milkFlexContainer.append(milkGheeMobileHeading);

    const emptyDiv = document.createElement('div');
    emptyDiv.classList.add('font-md-18', 'mt-6', 'text-center');
    milkFlexContainer.append(emptyDiv);

    const ctaIconDiv = document.createElement('div');
    ctaIconDiv.classList.add('my-9');
    const milkCtaIconPicture = ctaIconCell.querySelector('picture');
    if (milkCtaIconPicture) {
      const img = milkCtaIconPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      ctaIconDiv.append(optimizedPic);
    }
    milkFlexContainer.append(ctaIconDiv);

    const whatsappLinkDiv = document.createElement('div');
    whatsappLinkDiv.classList.add('Whatsapp-link', 'mb-8', 'text-center');
    const foundWhatsappLink = whatsappLinkCell.querySelector('a');
    if (foundWhatsappLink) {
      // Move the original anchor element and its instrumentation
      moveInstrumentation(whatsappLinkCell, foundWhatsappLink);
      whatsappLinkDiv.append(foundWhatsappLink);
      foundWhatsappLink.classList.add('cmp-link__screen-reader-only'); // Add class if needed
      foundWhatsappLink.setAttribute('target', '_blank');
      foundWhatsappLink.setAttribute('rel', 'noopener noreferrer');
    } else {
      // Fallback if no anchor found, though it should be present for type=aem-content
      const whatsappAnchor = document.createElement('a');
      whatsappAnchor.textContent = whatsappLabelCell.textContent.trim();
      whatsappAnchor.classList.add('cmp-link__screen-reader-only');
      // No href available if no anchor found, consider logging or adding a placeholder
      whatsappLinkDiv.append(whatsappAnchor);
    }
    moveInstrumentation(whatsappLinkCell, whatsappLinkDiv); // Move instrumentation for the div as well
    milkFlexContainer.append(whatsappLinkDiv);

    milkRightSubtext.append(milkFlexContainer);
    milkSectionImage.append(milkAccountMainBgBox, milkRightSubtext);
    rightSection.append(milkSectionImage);
  });

  rowDiv.append(leftSection, rightSection);
  mainBox.append(rowDiv);

  block.replaceChildren(mainBox);

  block.classList.add('container-xl', 'annualReport_mainBox');
}
