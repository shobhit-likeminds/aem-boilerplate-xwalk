import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  const mainHeadingRow = children[0];
  const itemRows = children.slice(1);

  // Use content detection for item rows based on the number of cells
  // product-item has 2 cells
  const productItems = itemRows.filter((row) => row.children.length === 2);
  // ghee-detail has 9 cells
  const gheeDetails = itemRows.filter((row) => row.children.length === 9);
  // milk-detail has 6 cells
  const milkDetails = itemRows.filter((row) => row.children.length === 6);

  const containerXl = document.createElement('div');
  containerXl.classList.add('container-xl', 'annualReport_mainBox', 'product-selection-component');
  moveInstrumentation(block, containerXl);

  const accountMainBox = document.createElement('div');
  accountMainBox.classList.add('account-mainBox', 'mx-md-16');

  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row', 'gx-5');

  const leftSection = document.createElement('div');
  leftSection.classList.add('mt-8', 'mt-md-10', 'col-lg-4');

  const heading = document.createElement('p');
  heading.classList.add('font-24', 'font-md-40', 'fw-bold', 'product-container_heading', 'font-baskerville');
  moveInstrumentation(mainHeadingRow, heading);
  // mainHeading is richtext, use innerHTML
  heading.innerHTML = mainHeadingRow.innerHTML;
  leftSection.append(heading);

  const productMainBox = document.createElement('div');
  productMainBox.classList.add('product-mainbox', 'mt-10', 'mt-md-12');

  let activeProduct = 'ghee'; // Default active product

  productItems.forEach((row, index) => {
    // Destructure cells for product-item
    const [productImageCell, productLabelCell] = [...row.children];

    const productDiv = document.createElement('div');
    moveInstrumentation(row, productDiv);

    const productInnerDiv = document.createElement('div');
    productInnerDiv.classList.add('milk_ghee_smallImag');

    if (index === 0) {
      productInnerDiv.classList.add('ghee-packet', 'product-hover');
      productInnerDiv.dataset.product = 'ghee';
    } else if (index === 1) {
      productInnerDiv.classList.add('milk-packet');
      productInnerDiv.dataset.product = 'milk';
    }

    const picture = productImageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      productInnerDiv.append(optimizedPic);
      optimizedPic.querySelector('img').classList.add('left-section-gheeBox', 'object-fit-contain');
    }

    const labelP = document.createElement('p');
    labelP.classList.add('product-subnames');
    labelP.textContent = productLabelCell.textContent.trim();
    productInnerDiv.append(labelP);
    productDiv.append(productInnerDiv);
    productMainBox.append(productDiv);

    productInnerDiv.addEventListener('click', () => {
      document.querySelectorAll('.milk_ghee_smallImag').forEach((el) => el.classList.remove('product-hover'));
      productInnerDiv.classList.add('product-hover');
      activeProduct = productInnerDiv.dataset.product;
      updateRightSection();
    });
  });

  leftSection.append(productMainBox);
  rowDiv.append(leftSection);

  const rightSection = document.createElement('div');
  rightSection.classList.add('right-section', 'mt-10', 'py-0', 'position-relative', 'col-lg-8');

  const gheeBox = document.createElement('div');
  gheeBox.classList.add('ghee_box');
  rightSection.append(gheeBox);

  const milkSectionImage = document.createElement('div');
  milkSectionImage.classList.add('position-relative', 'milk-section_image');
  rightSection.append(milkSectionImage);

  function createDetailSection(detailRow, type) {
    const mainBgBox = document.createElement('div');
    mainBgBox.classList.add('account-mainBg-box', 'w-100');
    moveInstrumentation(detailRow, mainBgBox); // Move instrumentation for the entire detail row

    const cells = [...detailRow.children]; // Get all cells for the detail row

    // Common cells for both ghee and milk details
    const desktopBgCell = cells[0];
    const mobileBgCell = cells[1];

    const desktopBgDiv = document.createElement('div');
    desktopBgDiv.classList.add('annual-background_image--overlay', 'd-flex', 'annual-bg-desktop');
    const desktopPic = desktopBgCell.querySelector('picture');
    if (desktopPic) {
      const img = desktopPic.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      desktopBgDiv.append(optimizedPic);
      optimizedPic.querySelector('img').classList.add('account-bgImg', 'with-overlay');
    }
    const overlayDivDesktop = document.createElement('div');
    overlayDivDesktop.classList.add('overlay');
    desktopBgDiv.append(overlayDivDesktop);
    mainBgBox.append(desktopBgDiv);

    const mobileBgDiv = document.createElement('div');
    mobileBgDiv.classList.add('annual-background_image--overlay', 'd-flex', 'annual-bg-mobile');
    const mobilePic = mobileBgCell.querySelector('picture');
    if (mobilePic) {
      const img = mobilePic.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      mobileBgDiv.append(optimizedPic);
      optimizedPic.querySelector('img').classList.add('account-bgImg', 'with-overlay');
    }
    const overlayDivMobile = document.createElement('div');
    overlayDivMobile.classList.add('overlay');
    mobileBgDiv.append(overlayDivMobile);
    mainBgBox.append(mobileBgDiv);

    if (type === 'ghee') {
      // Destructure specific cells for ghee-detail
      const [
        , , // Skip backgroundDesktop and backgroundMobile
        headlineBeforeCell,
        ctaIconCell,
        ctaLinkCell,
        ctaLabelCell,
        headlineAfterCell,
        confirmationIconCell,
        disabledDownloadLabelCell,
      ] = cells;

      const rightSubtextBeforeDownload = document.createElement('div');
      rightSubtextBeforeDownload.classList.add('right-subtext', 'position-absolute', 'start-0', 'end-0', 'bottom-0', 'right-subtext__BeforeDownload');
      const beforeDownloadContent = document.createElement('div');
      beforeDownloadContent.classList.add('d-flex', 'flex-column', 'align-items-center');
      rightSubtextBeforeDownload.append(beforeDownloadContent);

      const rightSubtextAfterDownload = document.createElement('div');
      rightSubtextAfterDownload.classList.add('right-subtext', 'position-absolute', 'start-0', 'end-0', 'bottom-0', 'right-section_subtextafter', 'right-subtext__AfterDownload');
      const afterDownloadContent = document.createElement('div');
      afterDownloadContent.classList.add('d-flex', 'flex-column', 'align-items-center', 'justify-content-around');
      rightSubtextAfterDownload.append(afterDownloadContent);

      // Before Download Section
      const gheeMobileHeadingBefore = document.createElement('div');
      gheeMobileHeadingBefore.classList.add('ghee-mobile-heading', 'text-center', 'font-md-18', 'font-baskerville', 'leading-32');
      // headlineBefore is richtext, use innerHTML
      gheeMobileHeadingBefore.innerHTML = headlineBeforeCell.innerHTML;
      beforeDownloadContent.append(gheeMobileHeadingBefore);

      const downloadButtonBefore = document.createElement('button');
      downloadButtonBefore.classList.add('annual-report_DownloadBtn', 'my-9');
      const downloadIconDiv = document.createElement('div');
      downloadIconDiv.classList.add('download_icon');
      const ctaIcon = ctaIconCell.querySelector('picture');
      if (ctaIcon) {
        const img = ctaIcon.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        downloadIconDiv.append(optimizedPic);
      }
      downloadButtonBefore.append(downloadIconDiv);
      beforeDownloadContent.append(downloadButtonBefore);

      const downloadLinkDiv = document.createElement('div');
      downloadLinkDiv.classList.add('d-flex', 'mb-6'); // Added missing classes from ORIGINAL HTML
      const downloadLink = document.createElement('a');
      const foundLink = ctaLinkCell.querySelector('a');
      if (foundLink) {
        downloadLink.href = foundLink.href;
      }
      downloadLink.download = 'report.pdf'; // Assuming a default download name
      downloadLink.classList.add('text-decoration-none', 'download-report_btn', 'cta-analytics', 'download_report_btnBefore', 'text-cream-100', 'border', 'border-2', 'border-red-100', 'border-maroon-100-hover', 'border-red-300-active', 'bg-red-100', 'bg-maroon-100-hover', 'bg-red-300-active');
      downloadLink.textContent = ctaLabelCell.textContent.trim();
      downloadLinkDiv.append(downloadLink);
      beforeDownloadContent.append(downloadLinkDiv);

      // After Download Section
      const gheeMobileHeadingAfter = document.createElement('div');
      gheeMobileHeadingAfter.classList.add('ghee-mobile-heading', 'text-center', 'font-md-18', 'font-baskerville', 'leading-32');
      // headlineAfter is richtext, use innerHTML
      gheeMobileHeadingAfter.innerHTML = headlineAfterCell.innerHTML;
      afterDownloadContent.append(gheeMobileHeadingAfter);

      const downloadButtonAfter = document.createElement('button');
      downloadButtonAfter.classList.add('annual-report_DownloadBtn', 'my-9');
      const tickDownloadDiv = document.createElement('div');
      tickDownloadDiv.classList.add('tick_download');
      const confirmationIcon = confirmationIconCell.querySelector('picture');
      if (confirmationIcon) {
        const img = confirmationIcon.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        tickDownloadDiv.append(optimizedPic);
      }
      downloadButtonAfter.append(tickDownloadDiv);
      afterDownloadContent.append(downloadButtonAfter);

      const disabledDownloadDiv = document.createElement('div');
      disabledDownloadDiv.classList.add('d-flex', 'mb-6'); // Added missing classes from ORIGINAL HTML
      const disabledButton = document.createElement('button');
      disabledButton.classList.add('download-report_btn', 'download_report_btnAfter', 'disabled', 'bg-light-pink', 'border-light-pink', 'text-cream-100');
      disabledButton.textContent = disabledDownloadLabelCell.textContent.trim();
      disabledDownloadDiv.append(disabledButton);
      afterDownloadContent.append(disabledDownloadDiv);

      downloadButtonBefore.addEventListener('click', () => {
        downloadLink.click();
        rightSubtextBeforeDownload.style.display = 'none';
        rightSubtextAfterDownload.style.display = 'flex';
      });

      mainBgBox.append(rightSubtextBeforeDownload);
      mainBgBox.append(rightSubtextAfterDownload);
      return mainBgBox;
    } else if (type === 'milk') {
      // Destructure specific cells for milk-detail
      const [
        , , // Skip backgroundDesktop and backgroundMobile
        headlineCell,
        confirmationIconCell,
        whatsappLinkCell,
        whatsappLabelCell,
      ] = cells;

      const rightSubtextMilk = document.createElement('div');
      rightSubtextMilk.classList.add('right-subtext', 'position-absolute', 'start-0', 'end-0', 'bottom-0', 'right-subtext-milk');
      const milkContent = document.createElement('div');
      milkContent.classList.add('d-flex', 'flex-column', 'align-items-center');
      rightSubtextMilk.append(milkContent);

      const milkHeading = document.createElement('div');
      milkHeading.classList.add('ghee-mobile-heading', 'text-center', 'font-md-18', 'font-baskerville', 'leading-32');
      // headline is richtext, use innerHTML
      milkHeading.innerHTML = headlineCell.innerHTML;
      milkContent.append(milkHeading);

      const confirmationIconDiv = document.createElement('div');
      confirmationIconDiv.classList.add('my-9');
      const confirmationIcon = confirmationIconCell.querySelector('picture');
      if (confirmationIcon) {
        const img = confirmationIcon.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        confirmationIconDiv.append(optimizedPic);
      }
      milkContent.append(confirmationIconDiv);

      const whatsappLinkDiv = document.createElement('div');
      whatsappLinkDiv.classList.add('Whatsapp-link', 'mb-8', 'text-center');
      const whatsappLink = document.createElement('a');
      const foundLink = whatsappLinkCell.querySelector('a');
      if (foundLink) {
        whatsappLink.href = foundLink.href;
      }
      whatsappLink.target = '_blank';
      whatsappLink.rel = 'noopener noreferrer';
      whatsappLink.textContent = whatsappLabelCell.textContent.trim();
      const whatsappP = document.createElement('p');
      whatsappP.textContent = 'Check Your Milk Report Card on ';
      whatsappP.append(whatsappLink);
      whatsappLinkDiv.append(whatsappP);
      milkContent.append(whatsappLinkDiv);

      mainBgBox.append(rightSubtextMilk);
      return mainBgBox;
    }
    return null;
  }

  function updateRightSection() {
    gheeBox.innerHTML = '';
    milkSectionImage.innerHTML = '';

    if (activeProduct === 'ghee' && gheeDetails.length > 0) {
      const gheeDetailSection = createDetailSection(gheeDetails[0], 'ghee');
      if (gheeDetailSection) {
        gheeBox.append(gheeDetailSection);
        gheeBox.style.display = 'block';
        milkSectionImage.style.display = 'none';
        gheeBox.querySelector('.right-subtext__BeforeDownload').style.display = 'flex';
        gheeBox.querySelector('.right-subtext__AfterDownload').style.display = 'none';
      }
    } else if (activeProduct === 'milk' && milkDetails.length > 0) {
      const milkDetailSection = createDetailSection(milkDetails[0], 'milk');
      if (milkDetailSection) {
        milkSectionImage.append(milkDetailSection);
        milkSectionImage.style.display = 'block';
        gheeBox.style.display = 'none';
      }
    }
  }

  rowDiv.append(rightSection);
  accountMainBox.append(rowDiv);
  containerXl.append(accountMainBox);
  block.replaceChildren(containerXl);

  updateRightSection();
}
