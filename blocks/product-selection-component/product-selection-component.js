import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, ...productRows] = [...block.children];

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

  const heading = document.createElement('p');
  heading.classList.add('font-24', 'font-md-40', 'fw-bold', 'product-container_heading', 'font-baskerville');
  moveInstrumentation(headingRow, heading);
  heading.textContent = headingRow.textContent.trim();
  leftSection.append(heading);

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

  productRows.forEach((productRow, index) => {
    const [imageCell, labelCell] = [...productRow.children];

    const productDiv = document.createElement('div');
    moveInstrumentation(productRow, productDiv);

    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('milk_ghee_smallImag', 'product-hover');

    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        imageWrapper.append(optimizedPic);
        optimizedPic.querySelector('img').classList.add('left-section-gheeBox', 'object-fit-contain');
      }
    }

    const label = document.createElement('p');
    label.classList.add('product-subnames');
    label.textContent = labelCell.textContent.trim();
    imageWrapper.append(label);

    productDiv.append(imageWrapper);
    productMainBox.append(productDiv);

    if (index === 0) { // Ghee product
      imageWrapper.classList.add('ghee-packet');

      const accountMainBgBoxGhee = document.createElement('div');
      accountMainBgBoxGhee.classList.add('account-mainBg-box', 'w-100');
      gheeBox.append(accountMainBgBoxGhee);

      // Assuming desktop and mobile images are the same and come from the imageCell
      const desktopImageGhee = imageCell.querySelector('picture');
      if (desktopImageGhee) {
        const desktopImg = desktopImageGhee.querySelector('img');
        const desktopWrap = document.createElement('div');
        desktopWrap.classList.add('annual-background_image--overlay', 'd-flex', 'annual-bg-desktop');
        const optimizedDesktopPic = createOptimizedPicture(desktopImg.src, desktopImg.alt, false, [{ width: '750' }]);
        moveInstrumentation(desktopImg, optimizedDesktopPic.querySelector('img')); // Move instrumentation for the background image
        optimizedDesktopPic.querySelector('img').classList.add('account-bgImg', 'with-overlay');
        desktopWrap.append(optimizedDesktopPic);
        const overlayDiv = document.createElement('div');
        overlayDiv.classList.add('overlay'); // Corrected class name
        desktopWrap.append(overlayDiv);
        accountMainBgBoxGhee.append(desktopWrap);
      }

      const mobileImageGhee = imageCell.querySelector('picture');
      if (mobileImageGhee) {
        const mobileImg = mobileImageGhee.querySelector('img');
        const mobileWrap = document.createElement('div');
        mobileWrap.classList.add('annual-background_image--overlay', 'd-flex', 'annual-bg-mobile');
        const optimizedMobilePic = createOptimizedPicture(mobileImg.src, mobileImg.alt, false, [{ width: '750' }]);
        moveInstrumentation(mobileImg, optimizedMobilePic.querySelector('img')); // Move instrumentation for the background image
        optimizedMobilePic.querySelector('img').classList.add('account-bgImg', 'with-overlay');
        mobileWrap.append(optimizedMobilePic);
        const overlayDiv = document.createElement('div');
        overlayDiv.classList.add('overlay'); // Corrected class name
        mobileWrap.append(overlayDiv);
        accountMainBgBoxGhee.append(mobileWrap);
      }

      const rightSubtextBeforeDownload = document.createElement('div');
      rightSubtextBeforeDownload.classList.add('right-subtext', 'position-absolute', 'start-0', 'end-0', 'bottom-0', 'right-subtext__BeforeDownload');
      gheeBox.append(rightSubtextBeforeDownload);

      const flexContainerBefore = document.createElement('div');
      flexContainerBefore.classList.add('d-flex', 'flex-column', 'align-items-center');
      rightSubtextBeforeDownload.append(flexContainerBefore);

      const gheeMobileHeadingBefore = document.createElement('div');
      gheeMobileHeadingBefore.classList.add('ghee-mobile-heading', 'text-center', 'font-md-18', 'font-baskerville', 'leading-32');
      // Read content from a cell if available, otherwise hardcode or leave blank
      // Assuming this content is part of the productRow, perhaps in a third cell or derived.
      // For now, keeping it as is, but ideally, this should come from a model field.
      gheeMobileHeadingBefore.innerHTML = `<p class="download_your_monthly_ghee"></p><p><h3>Pure and tested—Aashirvaad Svasti Organic Ghee!</h3><p></p>`;
      flexContainerBefore.append(gheeMobileHeadingBefore);

      const downloadButtonBefore = document.createElement('button');
      downloadButtonBefore.classList.add('annual-report_DownloadBtn', 'my-9');
      // Assuming download icon src comes from a cell, or is hardcoded if not editable.
      // For now, hardcoding as it's an SVG icon, but ideally it should be a model field.
      downloadButtonBefore.innerHTML = `<div class="download_icon"><img alt="svg file" src="/content/dam/aemigrate/uploaded-folder/image/1776770161788.svg+xml"/></div>`;
      flexContainerBefore.append(downloadButtonBefore);

      const downloadLinkWrapper = document.createElement('div');
      downloadLinkWrapper.classList.add('d-flex', 'mb-6');
      flexContainerBefore.append(downloadLinkWrapper);

      const downloadLinkDiv = document.createElement('div');
      downloadLinkWrapper.append(downloadLinkDiv);

      const downloadLink = document.createElement('a');
      downloadLink.classList.add('text-decoration-none', 'download-report_btn', 'cta-analytics', 'download_report_btnBefore', 'text-cream-100', 'border', 'border-2', 'border-red-100', 'border-maroon-100-hover', 'border-red-300-active', 'bg-red-100', 'bg-maroon-100-hover', 'bg-red-300-active');
      // Assuming the download link text and href come from a cell.
      // For now, hardcoding as it's not explicitly in the product-item model, but should be.
      downloadLink.textContent = 'Download report';
      downloadLink.setAttribute('download', 'report.pdf');
      downloadLink.href = '/content/dam/svasti/annual-reports/ghee/monthly-quality-report-card-organic-ghee-oct.pdf'; // Hardcoded for now, should come from a cell
      downloadLinkDiv.append(downloadLink);

      const whatsappLinkBefore = document.createElement('div');
      whatsappLinkBefore.classList.add('Whatsapp-link', 'mb-8', 'text-center');
      // Assuming whatsapp link content comes from a cell.
      // For now, leaving empty as it's not in the model.
      flexContainerBefore.append(whatsappLinkBefore);

      const rightSubtextAfterDownload = document.createElement('div');
      rightSubtextAfterDownload.classList.add('right-subtext', 'position-absolute', 'start-0', 'end-0', 'bottom-0', 'right-section_subtextafter', 'right-subtext__AfterDownload');
      gheeBox.append(rightSubtextAfterDownload);

      const flexContainerAfter = document.createElement('div');
      flexContainerAfter.classList.add('d-flex', 'flex-column', 'align-items-center', 'justify-content-around');
      rightSubtextAfterDownload.append(flexContainerAfter);

      const gheeMobileHeadingAfter = document.createElement('div');
      gheeMobileHeadingAfter.classList.add('ghee-mobile-heading', 'text-center', 'font-md-18', 'font-baskerville', 'leading-32');
      // Assuming this content is part of the productRow, perhaps in a third cell or derived.
      // For now, keeping it as is, but ideally, this should come from a model field.
      gheeMobileHeadingAfter.innerHTML = `<p>Your monthly report of svasti ghee has<br>been downloaded!</p>`;
      flexContainerAfter.append(gheeMobileHeadingAfter);

      const downloadButtonAfter = document.createElement('button');
      downloadButtonAfter.classList.add('annual-report_DownloadBtn', 'my-9');
      // Assuming tick icon src comes from a cell, or is hardcoded if not editable.
      // For now, hardcoding as it's an SVG icon, but ideally it should be a model field.
      downloadButtonAfter.innerHTML = `<div class="tick_download"><img alt="svg file" src="/content/dam/aemigrate/uploaded-folder/image/1776770161916.svg+xml"/></div>`;
      flexContainerAfter.append(downloadButtonAfter);

      const downloadButtonWrapperAfter = document.createElement('div');
      downloadButtonWrapperAfter.classList.add('d-flex', 'mb-6');
      flexContainerAfter.append(downloadButtonWrapperAfter);

      const downloadButtonDivAfter = document.createElement('div');
      downloadButtonWrapperAfter.append(downloadButtonDivAfter);

      const downloadButtonAfterDisabled = document.createElement('button');
      downloadButtonAfterDisabled.classList.add('download-report_btn', 'download_report_btnAfter', 'disabled', 'bg-light-pink', 'border-light-pink', 'text-cream-100');
      downloadButtonAfterDisabled.textContent = 'Download report'; // Hardcoded for now, should come from a cell
      downloadButtonDivAfter.append(downloadButtonAfterDisabled);

      const whatsappLinkAfter = document.createElement('div');
      whatsappLinkAfter.classList.add('Whatsapp-link', 'mb-8', 'text-center');
      // Assuming whatsapp link content comes from a cell.
      // For now, leaving empty as it's not in the model.
      flexContainerAfter.append(whatsappLinkAfter);

      // Event listeners for toggle
      downloadButtonBefore.addEventListener('click', () => {
        rightSubtextBeforeDownload.classList.add('d-none');
        rightSubtextAfterDownload.classList.add('d-flex');
        rightSubtextAfterDownload.classList.remove('d-none');
      });

      downloadButtonAfter.addEventListener('click', () => {
        rightSubtextAfterDownload.classList.add('d-none');
        rightSubtextBeforeDownload.classList.add('d-flex');
        rightSubtextBeforeDownload.classList.remove('d-none');
      });

    } else if (index === 1) { // Milk product
      imageWrapper.classList.add('milk-packet');

      const accountMainBgBoxMilk = document.createElement('div');
      accountMainBgBoxMilk.classList.add('w-100', 'account-mainBg-box', 'd-flex');
      milkSectionImage.append(accountMainBgBoxMilk);

      const desktopImageMilk = imageCell.querySelector('picture');
      if (desktopImageMilk) {
        const desktopImg = desktopImageMilk.querySelector('img');
        const desktopWrap = document.createElement('div');
        desktopWrap.classList.add('annual-background_image--overlay', 'd-flex', 'annual-bg-desktop');
        const optimizedDesktopPic = createOptimizedPicture(desktopImg.src, desktopImg.alt, false, [{ width: '750' }]);
        moveInstrumentation(desktopImg, optimizedDesktopPic.querySelector('img')); // Move instrumentation for the background image
        optimizedDesktopPic.querySelector('img').classList.add('account-bgImg', 'with-overlay');
        desktopWrap.append(optimizedDesktopPic);
        const overlayDiv = document.createElement('div');
        overlayDiv.classList.add('overlay'); // Corrected class name
        desktopWrap.append(overlayDiv);
        accountMainBgBoxMilk.append(desktopWrap);
      }

      const mobileImageMilk = imageCell.querySelector('picture');
      if (mobileImageMilk) {
        const mobileImg = mobileImageMilk.querySelector('img');
        const mobileWrap = document.createElement('div');
        mobileWrap.classList.add('annual-background_image--overlay', 'd-flex', 'annual-bg-mobile');
        const optimizedMobilePic = createOptimizedPicture(mobileImg.src, mobileImg.alt, false, [{ width: '750' }]);
        moveInstrumentation(mobileImg, optimizedMobilePic.querySelector('img')); // Move instrumentation for the background image
        optimizedMobilePic.querySelector('img').classList.add('account-bgImg', 'with-overlay');
        mobileWrap.append(optimizedMobilePic);
        const overlayDiv = document.createElement('div');
        overlayDiv.classList.add('overlay'); // Corrected class name
        mobileWrap.append(overlayDiv);
        accountMainBgBoxMilk.append(mobileWrap);
      }

      const rightSubtextMilk = document.createElement('div');
      rightSubtextMilk.classList.add('right-subtext', 'position-absolute', 'start-0', 'end-0', 'bottom-0', 'right-subtext-milk');
      milkSectionImage.append(rightSubtextMilk);

      const flexContainerMilk = document.createElement('div');
      flexContainerMilk.classList.add('d-flex', 'flex-column', 'align-items-center');
      rightSubtextMilk.append(flexContainerMilk);

      const milkMobileHeading = document.createElement('div');
      milkMobileHeading.classList.add('ghee-mobile-heading', 'text-center', 'font-md-18', 'font-baskerville', 'leading-32');
      // Assuming this content is part of the productRow, perhaps in a third cell or derived.
      // For now, keeping it as is, but ideally, this should come from a model field.
      milkMobileHeading.innerHTML = `<p> </p><p><b>Thick, Tasty Milk</b></p><p><b>Selected with care, for you!</b></p><p></p>`;
      flexContainerMilk.append(milkMobileHeading);

      const emptyDiv = document.createElement('div');
      emptyDiv.classList.add('font-md-18', 'mt-6', 'text-center');
      flexContainerMilk.append(emptyDiv);

      const milkIconWrapper = document.createElement('div');
      milkIconWrapper.classList.add('my-9');
      // Assuming milk icon src comes from a cell, or is hardcoded if not editable.
      // For now, hardcoding as it's an SVG icon, but ideally it should be a model field.
      milkIconWrapper.innerHTML = `<img alt="svg file" src="/content/dam/aemigrate/uploaded-folder/image/1776770163966.svg+xml"/>`;
      flexContainerMilk.append(milkIconWrapper);

      const whatsappLinkMilk = document.createElement('div');
      whatsappLinkMilk.classList.add('Whatsapp-link', 'mb-8', 'text-center');
      // Assuming whatsapp link content comes from a cell.
      // For now, hardcoding as it's not explicitly in the product-item model, but should be.
      whatsappLinkMilk.innerHTML = `<p>Check Your Milk Report Card on <a href="https://wa.me/message/GW56YICBZLQGI1" target="_blank" rel="noopener noreferrer">Whatsapp​<span class="cmp-link__screen-reader-only">opens in a new tab</span></a></p>`;
      flexContainerMilk.append(whatsappLinkMilk);
    }
  });

  block.replaceChildren(container);

  // Image optimization - this part is handled by createOptimizedPicture already.
  // The loop below is redundant if createOptimizedPicture is used correctly and moveInstrumentation
  // is applied to the original img element within the picture.
  // Removing this block as it might cause double optimization or issues with instrumentation.
  // container.querySelectorAll('picture > img').forEach((img) => {
  //   const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
  //   moveInstrumentation(img, optimizedPic.querySelector('img'));
  //   img.closest('picture').replaceWith(optimizedPic);
  // });
}
