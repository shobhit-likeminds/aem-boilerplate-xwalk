import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rows = [...block.children];
  const [headingRow, ...itemRows] = rows;

  const mainHeading = document.createElement('p');
  mainHeading.classList.add('font-24', 'font-md-40', 'fw-bold', 'product-container_heading', 'font-baskerville');
  moveInstrumentation(headingRow, mainHeading);
  mainHeading.innerHTML = headingRow.firstElementChild.innerHTML;

  const productSelectorItems = itemRows.filter((row) => row.children.length === 2);
  const gheeProductDetails = itemRows.filter((row) => row.children.length === 9);
  const milkProductDetails = itemRows.filter((row) => row.children.length === 6);

  const productMainBox = document.createElement('div');
  productMainBox.classList.add('product-mainbox', 'mt-10', 'mt-md-12');

  const productSelectorDivs = []; // Store product selector divs to add event listeners later

  productSelectorItems.forEach((row, index) => {
    const [productImageCell, productLabelCell] = [...row.children];

    const productDiv = document.createElement('div');
    const smallImageDiv = document.createElement('div');
    smallImageDiv.classList.add('milk_ghee_smallImag');
    if (index === 0) {
      smallImageDiv.classList.add('ghee-packet', 'product-hover');
    } else {
      smallImageDiv.classList.add('milk-packet');
    }

    const picture = productImageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      smallImageDiv.append(optimizedPic);
    }

    const labelP = document.createElement('p');
    labelP.classList.add('product-subnames');
    labelP.textContent = productLabelCell.textContent.trim();

    moveInstrumentation(row, productDiv);
    smallImageDiv.append(labelP);
    productDiv.append(smallImageDiv);
    productMainBox.append(productDiv);
    productSelectorDivs.push({ div: productDiv, type: index === 0 ? 'ghee' : 'milk' });
  });

  const leftSection = document.createElement('div');
  leftSection.classList.add('mt-8', 'mt-md-10', 'col-lg-4');
  leftSection.append(mainHeading, productMainBox);

  const rightSection = document.createElement('div');
  rightSection.classList.add('right-section', 'mt-10', 'py-0', 'position-relative', 'col-lg-8');

  let gheeBox;
  let milkSectionImage;
  let downloadButtonBefore;
  let downloadLink;
  let rightSubtextBeforeDownload;
  let rightSubtextAfterDownload;

  // Ghee Box
  if (gheeProductDetails.length > 0) {
    gheeBox = document.createElement('div');
    gheeBox.classList.add('ghee_box');

    const gheeDetails = gheeProductDetails[0];
    const [
      gheeBgDesktopCell,
      gheeBgMobileCell,
      gheeHeadlineBeforeCell,
      gheeCtaIconCell,
      gheeCtaLinkCell,
      gheeCtaLabelCell,
      gheeHeadlineAfterCell,
      gheeConfirmationIconCell,
      gheeCtaLabelAfterCell,
    ] = [...gheeDetails.children];

    const accountMainBgBoxGhee = document.createElement('div');
    accountMainBgBoxGhee.classList.add('account-mainBg-box', 'w-100');

    const annualBgDesktopGhee = document.createElement('div');
    annualBgDesktopGhee.classList.add('annual-background_image--overlay', 'd-flex', 'annual-bg-desktop');
    const desktopPictureGhee = gheeBgDesktopCell.querySelector('picture');
    if (desktopPictureGhee) {
      const img = desktopPictureGhee.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      annualBgDesktopGhee.append(optimizedPic);
    }
    const overlayGheeDesktop = document.createElement('div');
    overlayGheeDesktop.classList.add('overlay');
    annualBgDesktopGhee.append(overlayGheeDesktop);
    accountMainBgBoxGhee.append(annualBgDesktopGhee);

    const annualBgMobileGhee = document.createElement('div');
    annualBgMobileGhee.classList.add('annual-background_image--overlay', 'd-flex', 'annual-bg-mobile');
    const mobilePictureGhee = gheeBgMobileCell.querySelector('picture');
    if (mobilePictureGhee) {
      const img = mobilePictureGhee.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      annualBgMobileGhee.append(optimizedPic);
    }
    const overlayGheeMobile = document.createElement('div');
    overlayGheeMobile.classList.add('overlay');
    annualBgMobileGhee.append(overlayGheeMobile);
    accountMainBgBoxGhee.append(annualBgMobileGhee);

    rightSubtextBeforeDownload = document.createElement('div');
    rightSubtextBeforeDownload.classList.add(
      'right-subtext',
      'position-absolute',
      'start-0',
      'end-0',
      'bottom-0',
      'right-subtext__BeforeDownload',
    );
    const beforeDownloadContent = document.createElement('div');
    beforeDownloadContent.classList.add('d-flex', 'flex-column', 'align-items-center');

    const gheeMobileHeadingBefore = document.createElement('div');
    gheeMobileHeadingBefore.classList.add('ghee-mobile-heading', 'text-center', 'font-md-18', 'font-baskerville', 'leading-32');
    gheeMobileHeadingBefore.innerHTML = gheeHeadlineBeforeCell.innerHTML;
    beforeDownloadContent.append(gheeMobileHeadingBefore);

    downloadButtonBefore = document.createElement('button');
    downloadButtonBefore.classList.add('annual-report_DownloadBtn', 'my-9');
    const downloadIconDiv = document.createElement('div');
    downloadIconDiv.classList.add('download_icon');
    const ctaIconPicture = gheeCtaIconCell.querySelector('picture');
    if (ctaIconPicture) {
      const img = ctaIconPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      downloadIconDiv.append(optimizedPic);
    }
    downloadButtonBefore.append(downloadIconDiv);
    beforeDownloadContent.append(downloadButtonBefore);

    const downloadLinkWrapper = document.createElement('div');
    downloadLinkWrapper.classList.add('d-flex', 'mb-6');
    const downloadLinkDiv = document.createElement('div');
    downloadLink = document.createElement('a');
    downloadLink.classList.add(
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
    const ctaLinkAnchor = gheeCtaLinkCell.querySelector('a');
    if (ctaLinkAnchor) {
      downloadLink.href = ctaLinkAnchor.href;
      downloadLink.download = 'report.pdf';
    }
    downloadLink.textContent = gheeCtaLabelCell.textContent.trim();
    moveInstrumentation(gheeCtaLinkCell, downloadLink);
    downloadLinkDiv.append(downloadLink);
    downloadLinkWrapper.append(downloadLinkDiv);
    beforeDownloadContent.append(downloadLinkWrapper);

    rightSubtextBeforeDownload.append(beforeDownloadContent);
    accountMainBgBoxGhee.append(rightSubtextBeforeDownload);

    rightSubtextAfterDownload = document.createElement('div');
    rightSubtextAfterDownload.classList.add(
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

    const gheeMobileHeadingAfter = document.createElement('div');
    gheeMobileHeadingAfter.classList.add('ghee-mobile-heading', 'text-center', 'font-md-18', 'font-baskerville', 'leading-32');
    gheeMobileHeadingAfter.innerHTML = gheeHeadlineAfterCell.innerHTML;
    afterDownloadContent.append(gheeMobileHeadingAfter);

    const downloadButtonAfter = document.createElement('button');
    downloadButtonAfter.classList.add('annual-report_DownloadBtn', 'my-9');
    const tickDownloadDiv = document.createElement('div');
    tickDownloadDiv.classList.add('tick_download');
    const confirmationIconPicture = gheeConfirmationIconCell.querySelector('picture');
    if (confirmationIconPicture) {
      const img = confirmationIconPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      tickDownloadDiv.append(optimizedPic);
    }
    downloadButtonAfter.append(tickDownloadDiv);
    afterDownloadContent.append(downloadButtonAfter);

    const downloadButtonAfterWrapper = document.createElement('div');
    downloadButtonAfterWrapper.classList.add('d-flex', 'mb-6');
    const downloadButtonAfterDiv = document.createElement('div');
    const downloadButtonAfterDisabled = document.createElement('button');
    downloadButtonAfterDisabled.classList.add(
      'download-report_btn',
      'download_report_btnAfter',
      'disabled',
      'bg-light-pink',
      'border-light-pink',
      'text-cream-100',
    );
    downloadButtonAfterDisabled.textContent = gheeCtaLabelAfterCell.textContent.trim();
    downloadButtonAfterDiv.append(downloadButtonAfterDisabled);
    downloadButtonAfterWrapper.append(downloadButtonAfterDiv);
    afterDownloadContent.append(downloadButtonAfterWrapper);

    rightSubtextAfterDownload.append(afterDownloadContent);
    accountMainBgBoxGhee.append(rightSubtextAfterDownload);

    gheeBox.append(accountMainBgBoxGhee);
    rightSection.append(gheeBox);

    // Initial state for ghee box
    rightSubtextAfterDownload.style.display = 'none';

    downloadButtonBefore.addEventListener('click', () => {
      downloadLink.click();
      rightSubtextBeforeDownload.style.display = 'none';
      rightSubtextAfterDownload.style.display = 'block';
    });
  }

  // Milk Section
  if (milkProductDetails.length > 0) {
    milkSectionImage = document.createElement('div');
    milkSectionImage.classList.add('position-relative', 'milk-section_image');

    const milkDetails = milkProductDetails[0];
    const [
      milkBgDesktopCell,
      milkBgMobileCell,
      milkHeadlineCell,
      milkCtaIconCell,
      milkWhatsappLinkCell,
      milkWhatsappLabelCell,
    ] = [...milkDetails.children];

    const accountMainBgBoxMilk = document.createElement('div');
    accountMainBgBoxMilk.classList.add('w-100', 'account-mainBg-box', 'd-flex');

    const annualBgDesktopMilk = document.createElement('div');
    annualBgDesktopMilk.classList.add('annual-background_image--overlay', 'd-flex', 'annual-bg-desktop');
    const desktopPictureMilk = milkBgDesktopCell.querySelector('picture');
    if (desktopPictureMilk) {
      const img = desktopPictureMilk.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      annualBgDesktopMilk.append(optimizedPic);
    }
    const overlayMilkDesktop = document.createElement('div');
    overlayMilkDesktop.classList.add('overlay');
    annualBgDesktopMilk.append(overlayMilkDesktop);
    accountMainBgBoxMilk.append(annualBgDesktopMilk);

    const annualBgMobileMilk = document.createElement('div');
    annualBgMobileMilk.classList.add('annual-background_image--overlay', 'd-flex', 'annual-bg-mobile');
    const mobilePictureMilk = milkBgMobileCell.querySelector('picture');
    if (mobilePictureMilk) {
      const img = mobilePictureMilk.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      annualBgMobileMilk.append(optimizedPic);
    }
    const overlayMilkMobile = document.createElement('div');
    overlayMilkMobile.classList.add('overlay');
    annualBgMobileMilk.append(overlayMilkMobile);
    accountMainBgBoxMilk.append(annualBgMobileMilk);

    milkSectionImage.append(accountMainBgBoxMilk);

    const rightSubtextMilk = document.createElement('div');
    rightSubtextMilk.classList.add('right-subtext', 'position-absolute', 'start-0', 'end-0', 'bottom-0', 'right-subtext-milk');
    const milkContent = document.createElement('div');
    milkContent.classList.add('d-flex', 'flex-column', 'align-items-center');

    const gheeMobileHeadingMilk = document.createElement('div');
    gheeMobileHeadingMilk.classList.add('ghee-mobile-heading', 'text-center', 'font-md-18', 'font-baskerville', 'leading-32');
    gheeMobileHeadingMilk.innerHTML = milkHeadlineCell.innerHTML;
    milkContent.append(gheeMobileHeadingMilk);

    const ctaIconDiv = document.createElement('div');
    ctaIconDiv.classList.add('my-9');
    const ctaIconPicture = milkCtaIconCell.querySelector('picture');
    if (ctaIconPicture) {
      const img = ctaIconPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      ctaIconDiv.append(optimizedPic);
    }
    milkContent.append(ctaIconDiv);

    const whatsappLinkDiv = document.createElement('div');
    whatsappLinkDiv.classList.add('Whatsapp-link', 'mb-8', 'text-center');
    const whatsappLink = document.createElement('a');
    const whatsappAnchor = milkWhatsappLinkCell.querySelector('a');
    if (whatsappAnchor) {
      whatsappLink.href = whatsappAnchor.href;
      whatsappLink.target = '_blank';
      whatsappLink.rel = 'noopener noreferrer';
    }
    whatsappLink.textContent = milkWhatsappLabelCell.textContent.trim();
    moveInstrumentation(milkWhatsappLinkCell, whatsappLink);
    whatsappLinkDiv.append(whatsappLink);
    milkContent.append(whatsappLinkDiv);

    rightSubtextMilk.append(milkContent);
    milkSectionImage.append(rightSubtextMilk);
    rightSection.append(milkSectionImage);
  }

  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row', 'gx-5');
  rowDiv.append(leftSection, rightSection);

  const accountMainBox = document.createElement('div');
  accountMainBox.classList.add('account-mainBox', 'mx-md-16');
  accountMainBox.append(rowDiv);

  const container = document.createElement('div');
  container.classList.add('container-xl', 'annualReport_mainBox', 'product-selection-component');
  container.append(accountMainBox);

  block.replaceChildren(container);

  // Initial display logic: show ghee by default if available, otherwise milk
  if (gheeBox) {
    gheeBox.style.display = 'block';
  }
  if (milkSectionImage) {
    milkSectionImage.style.display = 'none';
  }

  // Add event listeners for product selection
  productSelectorDivs.forEach((productSelector) => {
    productSelector.div.addEventListener('click', () => {
      // Remove product-hover from all
      productSelectorItems.forEach((row) => {
        row.querySelector('.milk_ghee_smallImag').classList.remove('product-hover');
      });
      // Add product-hover to clicked item
      productSelector.div.querySelector('.milk_ghee_smallImag').classList.add('product-hover');

      if (productSelector.type === 'ghee') {
        if (gheeBox) gheeBox.style.display = 'block';
        if (milkSectionImage) milkSectionImage.style.display = 'none';
      } else if (productSelector.type === 'milk') {
        if (gheeBox) gheeBox.style.display = 'none';
        if (milkSectionImage) milkSectionImage.style.display = 'block';
      }
    });
  });

  // Image optimization
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
