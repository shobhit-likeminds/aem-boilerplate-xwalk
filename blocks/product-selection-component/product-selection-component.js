import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, ...productRows] = [...block.children];

  block.classList.add('container-xl', 'annualReport_mainBox', 'product-selection-component');

  const accountMainBox = document.createElement('div');
  accountMainBox.classList.add('account-mainBox', 'mx-md-16');
  block.append(accountMainBox);

  const row = document.createElement('div');
  row.classList.add('row', 'gx-5');
  accountMainBox.append(row);

  const leftSection = document.createElement('div');
  leftSection.classList.add('mt-8', 'mt-md-10', 'col-lg-4');
  row.append(leftSection);

  // Heading
  const headingP = document.createElement('p');
  moveInstrumentation(headingRow.firstElementChild, headingP);
  headingP.classList.add('font-24', 'font-md-40', 'fw-bold', 'product-container_heading', 'font-baskerville');
  headingP.textContent = headingRow.firstElementChild.textContent.trim();
  leftSection.append(headingP);

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

  // State management for active product
  let activeProduct = null; // 'ghee' or 'milk'

  const activateProduct = (productType) => {
    if (activeProduct === productType) return; // Already active

    // Deactivate current product
    if (activeProduct === 'ghee') {
      gheeBox.classList.remove('active');
      const gheePacket = productMainBox.querySelector('.ghee-packet');
      if (gheePacket) gheePacket.classList.remove('active');
    } else if (activeProduct === 'milk') {
      milkSectionImage.classList.remove('active');
      const milkPacket = productMainBox.querySelector('.milk-packet');
      if (milkPacket) milkPacket.classList.remove('active');
    }

    // Activate new product
    if (productType === 'ghee') {
      gheeBox.classList.add('active');
      const gheePacket = productMainBox.querySelector('.ghee-packet');
      if (gheePacket) gheePacket.classList.add('active');
    } else if (productType === 'milk') {
      milkSectionImage.classList.add('active');
      const milkPacket = productMainBox.querySelector('.milk-packet');
      if (milkPacket) milkPacket.classList.add('active');
    }
    activeProduct = productType;
  };

  // Process product items
  productRows.forEach((productRow, index) => {
    // Use content detection instead of index access for robustness
    const cells = [...productRow.children];
    const imageCell = cells.find(cell => cell.querySelector('picture'));
    const labelCell = cells.find(cell => !cell.querySelector('picture'));

    const productDiv = document.createElement('div');
    moveInstrumentation(productRow, productDiv);

    const productHoverDiv = document.createElement('div');
    productHoverDiv.classList.add('milk_ghee_smallImag', 'product-hover');

    if (imageCell) {
      const img = imageCell.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        const optimizedImg = optimizedPic.querySelector('img');
        optimizedImg.classList.add('left-section-gheeBox', 'object-fit-contain');
        optimizedImg.setAttribute('loading', 'lazy');
        productHoverDiv.append(optimizedPic);
        moveInstrumentation(img, optimizedImg);
      }
    }

    if (labelCell) {
      const labelP = document.createElement('p');
      moveInstrumentation(labelCell, labelP);
      labelP.classList.add('product-subnames');
      labelP.textContent = labelCell.textContent.trim();
      productHoverDiv.append(labelP);
    }

    productDiv.append(productHoverDiv);
    productMainBox.append(productDiv);

    // Add specific classes for ghee and milk based on index (assuming order is fixed for now)
    if (index === 0) { // Ghee
      productHoverDiv.classList.add('ghee-packet');
      productHoverDiv.addEventListener('click', () => activateProduct('ghee'));

      // Ghee specific right section content
      const accountMainBgBoxGhee = document.createElement('div');
      accountMainBgBoxGhee.classList.add('account-mainBg-box', 'w-100');
      gheeBox.append(accountMainBgBoxGhee);

      const annualBgDesktopGhee = document.createElement('div');
      annualBgDesktopGhee.classList.add('annual-background_image--overlay', 'd-flex', 'annual-bg-desktop');
      accountMainBgBoxGhee.append(annualBgDesktopGhee);

      const annualBgMobileGhee = document.createElement('div');
      annualBgMobileGhee.classList.add('annual-background_image--overlay', 'd-flex', 'annual-bg-mobile');
      accountMainBgBoxGhee.append(annualBgMobileGhee);

      const rightSubtextBeforeDownload = document.createElement('div');
      rightSubtextBeforeDownload.classList.add('right-subtext', 'position-absolute', 'start-0', 'end-0', 'bottom-0', 'right-subtext__BeforeDownload');
      accountMainBgBoxGhee.append(rightSubtextBeforeDownload);

      const flexContainerBefore = document.createElement('div');
      flexContainerBefore.classList.add('d-flex', 'flex-column', 'align-items-center');
      rightSubtextBeforeDownload.append(flexContainerBefore);

      const gheeMobileHeadingBefore = document.createElement('div');
      gheeMobileHeadingBefore.classList.add('ghee-mobile-heading', 'text-center', 'font-md-18', 'font-baskerville', 'leading-32');
      flexContainerBefore.append(gheeMobileHeadingBefore);

      const downloadYourMonthlyGheeP = document.createElement('p');
      downloadYourMonthlyGheeP.classList.add('download_your_monthly_ghee');
      gheeMobileHeadingBefore.append(downloadYourMonthlyGheeP);

      const h3 = document.createElement('h3');
      h3.textContent = 'Pure and tested—Aashirvaad Svasti Organic Ghee!';
      gheeMobileHeadingBefore.append(h3);

      const downloadBtnBefore = document.createElement('button');
      downloadBtnBefore.classList.add('annual-report_DownloadBtn', 'my-9');
      flexContainerBefore.append(downloadBtnBefore);

      const downloadIconDiv = document.createElement('div');
      downloadIconDiv.classList.add('download_icon');
      downloadBtnBefore.append(downloadIconDiv);

      const downloadIconImg = document.createElement('img');
      downloadIconImg.alt = 'svg file';
      downloadIconImg.src = '/content/dam/aemigrate/uploaded-folder/image/1776277123097.svg+xml'; // From original HTML
      downloadIconDiv.append(downloadIconImg);

      const downloadLinkDiv = document.createElement('div');
      downloadLinkDiv.classList.add('d-flex', 'mb-6');
      flexContainerBefore.append(downloadLinkDiv);

      const downloadLinkInnerDiv = document.createElement('div');
      downloadLinkDiv.append(downloadLinkInnerDiv);

      const downloadAnchor = document.createElement('a');
      downloadAnchor.classList.add('text-decoration-none', 'download-report_btn', 'cta-analytics', 'download_report_btnBefore', 'text-cream-100', 'border', 'border-2', 'border-red-100', 'border-maroon-100-hover', 'border-red-300-active', 'bg-red-100', 'bg-maroon-100-hover', 'bg-red-300-active');
      downloadAnchor.textContent = 'Download report';
      downloadAnchor.download = 'report.pdf';
      downloadAnchor.href = '/content/dam/svasti/annual-reports/ghee/monthly-quality-report-card-organic-ghee-oct.pdf'; // From original HTML
      downloadLinkInnerDiv.append(downloadAnchor);

      const whatsappLinkBefore = document.createElement('div');
      whatsappLinkBefore.classList.add('Whatsapp-link', 'mb-8', 'text-center');
      flexContainerBefore.append(whatsappLinkBefore);

      const rightSubtextAfterDownload = document.createElement('div');
      rightSubtextAfterDownload.classList.add('right-subtext', 'position-absolute', 'start-0', 'end-0', 'bottom-0', 'right-section_subtextafter', 'right-subtext__AfterDownload');
      accountMainBgBoxGhee.append(rightSubtextAfterDownload);

      const flexContainerAfter = document.createElement('div');
      flexContainerAfter.classList.add('d-flex', 'flex-column', 'align-items-center', 'justify-content-around');
      rightSubtextAfterDownload.append(flexContainerAfter);

      const gheeMobileHeadingAfter = document.createElement('div');
      gheeMobileHeadingAfter.classList.add('ghee-mobile-heading', 'text-center', 'font-md-18', 'font-baskerville', 'leading-32');
      flexContainerAfter.append(gheeMobileHeadingAfter);

      const downloadedP = document.createElement('p');
      downloadedP.innerHTML = 'Your monthly report of svasti ghee has<br>been downloaded!';
      gheeMobileHeadingAfter.append(downloadedP);

      const downloadBtnAfter = document.createElement('button');
      downloadBtnAfter.classList.add('annual-report_DownloadBtn', 'my-9');
      flexContainerAfter.append(downloadBtnAfter);

      const tickDownloadDiv = document.createElement('div');
      tickDownloadDiv.classList.add('tick_download');
      downloadBtnAfter.append(tickDownloadDiv);

      const tickDownloadImg = document.createElement('img');
      tickDownloadImg.alt = 'svg file';
      tickDownloadImg.src = '/content/dam/aemigrate/uploaded-folder/image/1776277123195.svg+xml'; // From original HTML
      tickDownloadDiv.append(tickDownloadImg);

      const downloadBtnAfterDiv = document.createElement('div');
      downloadBtnAfterDiv.classList.add('d-flex', 'mb-6');
      flexContainerAfter.append(downloadBtnAfterDiv);

      const downloadBtnAfterInnerDiv = document.createElement('div');
      downloadBtnAfterDiv.append(downloadBtnAfterInnerDiv);

      const downloadBtnAfterButton = document.createElement('button');
      downloadBtnAfterButton.classList.add('download-report_btn', 'download_report_btnAfter', 'disabled', 'bg-light-pink', 'border-light-pink', 'text-cream-100');
      downloadBtnAfterButton.textContent = 'Download report';
      downloadBtnAfterInnerDiv.append(downloadBtnAfterButton);

      const whatsappLinkAfter = document.createElement('div');
      whatsappLinkAfter.classList.add('Whatsapp-link', 'mb-8', 'text-center');
      flexContainerAfter.append(whatsappLinkAfter);

      // Background images for ghee section
      const bgImgDesktopGhee = document.createElement('img');
      bgImgDesktopGhee.src = '/content/dam/aemigrate/uploaded-folder/image/mask-group-20176-2x-fmt-webp-alpha.webp'; // From original HTML
      bgImgDesktopGhee.classList.add('account-bgImg', 'with-overlay');
      bgImgDesktopGhee.setAttribute('height', '392px');
      bgImgDesktopGhee.setAttribute('loading', 'lazy');
      annualBgDesktopGhee.append(bgImgDesktopGhee);
      const overlayGheeDesktop = document.createElement('div');
      overlayGheeDesktop.classList.add('overlay');
      annualBgDesktopGhee.append(overlayGheeDesktop);

      const bgImgMobileGhee = document.createElement('img');
      bgImgMobileGhee.src = '/content/dam/aemigrate/uploaded-folder/image/annual-bg-mobile-fmt-webp-alpha.webp'; // From original HTML
      bgImgMobileGhee.classList.add('account-bgImg', 'with-overlay');
      bgImgMobileGhee.setAttribute('height', '447px');
      bgImgMobileGhee.setAttribute('loading', 'lazy');
      annualBgMobileGhee.append(bgImgMobileGhee);
      const overlayGheeMobile = document.createElement('div');
      overlayGheeMobile.classList.add('overlay');
      annualBgMobileGhee.append(overlayGheeMobile);

      // Event listeners for Ghee download
      downloadAnchor.addEventListener('click', (e) => {
        e.preventDefault();
        // Simulate download
        const link = document.createElement('a');
        link.href = downloadAnchor.href;
        link.download = downloadAnchor.download;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        rightSubtextBeforeDownload.style.display = 'none';
        rightSubtextAfterDownload.style.display = 'flex'; // Show after download
      });

    } else if (index === 1) { // Milk
      productHoverDiv.classList.add('milk-packet');
      productHoverDiv.addEventListener('click', () => activateProduct('milk'));

      const labelP = productHoverDiv.querySelector('p');
      if (labelP) {
        labelP.classList.remove('product-subnames'); // Milk has plain <p>
      }

      // Milk specific right section content
      const accountMainBgBoxMilk = document.createElement('div');
      accountMainBgBoxMilk.classList.add('w-100', 'account-mainBg-box', 'd-flex');
      milkSectionImage.append(accountMainBgBoxMilk);

      const annualBgDesktopMilk = document.createElement('div');
      annualBgDesktopMilk.classList.add('annual-background_image--overlay', 'd-flex', 'annual-bg-desktop');
      accountMainBgBoxMilk.append(annualBgDesktopMilk);

      const annualBgMobileMilk = document.createElement('div');
      annualBgMobileMilk.classList.add('annual-background_image--overlay', 'd-flex', 'annual-bg-mobile');
      accountMainBgBoxMilk.append(annualBgMobileMilk);

      const rightSubtextMilk = document.createElement('div');
      rightSubtextMilk.classList.add('right-subtext', 'position-absolute', 'start-0', 'end-0', 'bottom-0', 'right-subtext-milk');
      milkSectionImage.append(rightSubtextMilk);

      const flexContainerMilk = document.createElement('div');
      flexContainerMilk.classList.add('d-flex', 'flex-column', 'align-items-center');
      rightSubtextMilk.append(flexContainerMilk);

      const gheeMobileHeadingMilk = document.createElement('div');
      gheeMobileHeadingMilk.classList.add('ghee-mobile-heading', 'text-center', 'font-md-18', 'font-baskerville', 'leading-32');
      flexContainerMilk.append(gheeMobileHeadingMilk);

      gheeMobileHeadingMilk.innerHTML = '<p> </p><p><b>Thick, Tasty Milk</b></p><p><b>Selected with care, for you!</b></p><p></p>';

      const fontMd18Div = document.createElement('div');
      fontMd18Div.classList.add('font-md-18', 'mt-6', 'text-center');
      flexContainerMilk.append(fontMd18Div);

      const my9Div = document.createElement('div');
      my9Div.classList.add('my-9');
      flexContainerMilk.append(my9Div);

      const my9Img = document.createElement('img');
      my9Img.alt = 'svg file';
      my9Img.src = '/content/dam/aemigrate/uploaded-folder/image/1776277123264.svg+xml'; // From original HTML
      my9Div.append(my9Img);

      const whatsappLinkMilk = document.createElement('div');
      whatsappLinkMilk.classList.add('Whatsapp-link', 'mb-8', 'text-center');
      flexContainerMilk.append(whatsappLinkMilk);

      const whatsappP = document.createElement('p');
      whatsappP.innerHTML = 'Check Your Milk Report Card on <a href="https://wa.me/message/GW56YICBZLQGI1" target="_blank" rel="noopener noreferrer">Whatsapp​<span class="cmp-link__screen-reader-only">opens in a new tab</span></a>';
      whatsappLinkMilk.append(whatsappP);

      // Background images for milk section
      const bgImgDesktopMilk = document.createElement('img');
      bgImgDesktopMilk.src = '/content/dam/aemigrate/uploaded-folder/image/mask-group-20176-2x-fmt-webp-alpha.webp'; // From original HTML
      bgImgDesktopMilk.classList.add('account-bgImg', 'with-overlay');
      bgImgDesktopMilk.setAttribute('height', '392px');
      bgImgDesktopMilk.setAttribute('loading', 'lazy');
      annualBgDesktopMilk.append(bgImgDesktopMilk);
      const overlayMilkDesktop = document.createElement('div');
      overlayMilkDesktop.classList.add('overlay');
      annualBgDesktopMilk.append(overlayMilkDesktop);

      const bgImgMobileMilk = document.createElement('img');
      bgImgMobileMilk.src = '/content/dam/aemigrate/uploaded-folder/image/annual-bg-mobile-fmt-webp-alpha.webp'; // From original HTML
      bgImgMobileMilk.classList.add('account-bgImg', 'with-overlay');
      bgImgMobileMilk.setAttribute('height', '447px');
      bgImgMobileMilk.setAttribute('loading', 'lazy');
      annualBgMobileMilk.append(bgImgMobileMilk);
      const overlayMilkMobile = document.createElement('div');
      overlayMilkMobile.classList.add('overlay');
      annualBgMobileMilk.append(overlayMilkMobile);
    }
  });

  // Set initial active product (e.g., Ghee)
  activateProduct('ghee');

  // Optimize pictures in the right section (backgrounds)
  rightSection.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
