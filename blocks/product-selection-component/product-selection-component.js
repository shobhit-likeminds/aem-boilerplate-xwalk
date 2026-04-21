import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, ...productRows] = [...block.children];

  const containerXl = document.createElement('div');
  containerXl.classList.add('container-xl', 'annualReport_mainBox', 'product-selection-component');
  moveInstrumentation(block, containerXl);

  const accountMainBox = document.createElement('div');
  accountMainBox.classList.add('account-mainBox', 'mx-md-16');
  containerXl.append(accountMainBox);

  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row', 'gx-5');
  accountMainBox.append(rowDiv);

  const leftSection = document.createElement('div');
  leftSection.classList.add('mt-8', 'mt-md-10', 'col-lg-4');
  rowDiv.append(leftSection);

  const headingP = document.createElement('p');
  headingP.classList.add('font-24', 'font-md-40', 'fw-bold', 'product-container_heading', 'font-baskerville');
  moveInstrumentation(headingRow, headingP);
  headingP.textContent = headingRow.textContent.trim();
  leftSection.append(headingP);

  const productMainBox = document.createElement('div');
  productMainBox.classList.add('product-mainbox', 'mt-10', 'mt-md-12');
  leftSection.append(productMainBox);

  const rightSection = document.createElement('div');
  rightSection.classList.add('right-section', 'mt-10', 'py-0', 'position-relative', 'col-lg-8');
  rowDiv.append(rightSection);

  const productData = [];
  productRows.forEach((row, index) => {
    const cells = [...row.children];
    const imageCell = cells.find(cell => cell.querySelector('picture'));
    const labelCell = cells.find(cell => !cell.querySelector('picture'));

    const productDiv = document.createElement('div');
    moveInstrumentation(row, productDiv);

    const productItemDiv = document.createElement('div');
    productItemDiv.classList.add('milk_ghee_smallImag', 'product-hover');
    if (index === 0) {
      productItemDiv.classList.add('ghee-packet');
    } else if (index === 1) {
      productItemDiv.classList.add('milk-packet');
    }
    productDiv.append(productItemDiv);

    let productImgSrc = '';
    let productImgAlt = '';

    if (imageCell) {
      const picture = imageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        productImgSrc = img.src;
        productImgAlt = img.alt;
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        productItemDiv.append(optimizedPic);
        optimizedPic.querySelector('img').classList.add('left-section-gheeBox', 'object-fit-contain');
      }
    }

    const p = document.createElement('p');
    p.classList.add('product-subnames');
    p.textContent = labelCell ? labelCell.textContent.trim() : '';
    productItemDiv.append(p);

    productMainBox.append(productDiv);
    productData.push({
      imageSrc: productImgSrc,
      imageAlt: productImgAlt,
      label: labelCell ? labelCell.textContent.trim() : '',
      originalRow: row,
    });
  });

  // Ghee Box (first product)
  const gheeBox = document.createElement('div');
  gheeBox.classList.add('ghee_box');
  rightSection.append(gheeBox);

  const gheeAccountMainBgBox = document.createElement('div');
  gheeAccountMainBgBox.classList.add('account-mainBg-box', 'w-100');
  gheeBox.append(gheeAccountMainBgBox);

  // Desktop Image for Ghee
  const gheeDesktopBg = document.createElement('div');
  gheeDesktopBg.classList.add('annual-background_image--overlay', 'd-flex', 'annual-bg-desktop');
  gheeAccountMainBgBox.append(gheeDesktopBg);
  const gheeDesktopImgSrc = '/content/dam/aemigrate/uploaded-folder/image/mask-group-20176-2x-fmt-webp-alpha.webp'; // From ORIGINAL HTML
  if (gheeDesktopImgSrc) {
    const optimizedGheeDesktopPic = createOptimizedPicture(gheeDesktopImgSrc, 'Ghee Desktop Background', false, [{ width: '750' }]);
    gheeDesktopBg.append(optimizedGheeDesktopPic);
    optimizedGheeDesktopPic.querySelector('img').classList.add('account-bgImg', 'with-overlay');
    optimizedGheeDesktopPic.querySelector('img').setAttribute('height', '392px');
  }
  const gheeDesktopOverlay = document.createElement('div');
  gheeDesktopOverlay.classList.add('overlay');
  gheeDesktopBg.append(gheeDesktopOverlay);

  // Mobile Image for Ghee
  const gheeMobileBg = document.createElement('div');
  gheeMobileBg.classList.add('annual-background_image--overlay', 'd-flex', 'annual-bg-mobile');
  gheeAccountMainBgBox.append(gheeMobileBg);
  const gheeMobileImgSrc = '/content/dam/aemigrate/uploaded-folder/image/annual-bg-mobile-fmt-webp-alpha.webp'; // From ORIGINAL HTML
  if (gheeMobileImgSrc) {
    const optimizedGheeMobilePic = createOptimizedPicture(gheeMobileImgSrc, 'Ghee Mobile Background', false, [{ width: '750' }]);
    gheeMobileBg.append(optimizedGheeMobilePic);
    optimizedGheeMobilePic.querySelector('img').classList.add('account-bgImg', 'with-overlay');
    optimizedGheeMobilePic.querySelector('img').setAttribute('height', '447px');
  }
  const gheeMobileOverlay = document.createElement('div');
  gheeMobileOverlay.classList.add('overlay');
  gheeMobileBg.append(gheeMobileOverlay);

  const gheeRightSubtextBefore = document.createElement('div');
  gheeRightSubtextBefore.classList.add('right-subtext', 'position-absolute', 'start-0', 'end-0', 'bottom-0', 'right-subtext__BeforeDownload');
  gheeAccountMainBgBox.append(gheeRightSubtextBefore);

  const gheeBeforeContent = document.createElement('div');
  gheeBeforeContent.classList.add('d-flex', 'flex-column', 'align-items-center');
  gheeRightSubtextBefore.append(gheeBeforeContent);

  const gheeMobileHeadingBefore = document.createElement('div');
  gheeMobileHeadingBefore.classList.add('ghee-mobile-heading', 'text-center', 'font-md-18', 'font-baskerville', 'leading-32');
  // Content from ORIGINAL HTML, should ideally be authored
  gheeMobileHeadingBefore.innerHTML = '<p class="download_your_monthly_ghee"></p><p></p><h3>Pure and tested—Aashirvaad Svasti Organic Ghee!</h3><p></p>';
  gheeBeforeContent.append(gheeMobileHeadingBefore);

  const gheeDownloadBtnBefore = document.createElement('button');
  gheeDownloadBtnBefore.classList.add('annual-report_DownloadBtn', 'my-9');
  // SVG from ORIGINAL HTML
  gheeDownloadBtnBefore.innerHTML = '<div class="download_icon"><img alt="svg file" src="/content/dam/aemigrate/uploaded-folder/image/1776770161788.svg+xml"/></div>';
  gheeBeforeContent.append(gheeDownloadBtnBefore);

  const gheeDownloadLinkDiv = document.createElement('div');
  gheeDownloadLinkDiv.classList.add('d-flex', 'mb-6');
  gheeBeforeContent.append(gheeDownloadLinkDiv);

  const gheeDownloadLinkWrapper = document.createElement('div');
  gheeDownloadLinkDiv.append(gheeDownloadLinkWrapper);

  const gheeDownloadLink = document.createElement('a');
  gheeDownloadLink.classList.add('text-decoration-none', 'download-report_btn', 'cta-analytics', 'download_report_btnBefore', 'text-cream-100', 'border', 'border-2', 'border-red-100', 'border-maroon-100-hover', 'border-red-300-active', 'bg-red-100', 'bg-maroon-100-hover', 'bg-red-300-active');
  // Placeholder, should be dynamic if available from authored content
  gheeDownloadLink.href = '/content/dam/svasti/annual-reports/ghee/monthly-quality-report-card-organic-ghee-oct.pdf'; // From ORIGINAL HTML
  gheeDownloadLink.setAttribute('download', 'report.pdf');
  gheeDownloadLink.textContent = 'Download report'; // From ORIGINAL HTML
  gheeDownloadLinkWrapper.append(gheeDownloadLink);

  const gheeWhatsappLinkDiv = document.createElement('div');
  gheeWhatsappLinkDiv.classList.add('Whatsapp-link', 'mb-8', 'text-center');
  gheeBeforeContent.append(gheeWhatsappLinkDiv);

  const gheeRightSubtextAfter = document.createElement('div');
  gheeRightSubtextAfter.classList.add('right-subtext', 'position-absolute', 'start-0', 'end-0', 'bottom-0', 'right-section_subtextafter', 'right-subtext__AfterDownload');
  gheeBox.append(gheeRightSubtextAfter);

  const gheeAfterContent = document.createElement('div');
  gheeAfterContent.classList.add('d-flex', 'flex-column', 'align-items-center', 'justify-content-around');
  gheeRightSubtextAfter.append(gheeAfterContent);

  const gheeMobileHeadingAfter = document.createElement('div');
  gheeMobileHeadingAfter.classList.add('ghee-mobile-heading', 'text-center', 'font-md-18', 'font-baskerville', 'leading-32');
  // Content from ORIGINAL HTML, should ideally be authored
  gheeMobileHeadingAfter.innerHTML = '<p>Your monthly report of svasti ghee has<br>been downloaded!</p>';
  gheeAfterContent.append(gheeMobileHeadingAfter);

  const gheeDownloadBtnAfter = document.createElement('button');
  gheeDownloadBtnAfter.classList.add('annual-report_DownloadBtn', 'my-9');
  // SVG from ORIGINAL HTML
  gheeDownloadBtnAfter.innerHTML = '<div class="tick_download"><img alt="svg file" src="/content/dam/aemigrate/uploaded-folder/image/1776770161916.svg+xml"/></div>';
  gheeAfterContent.append(gheeDownloadBtnAfter);

  const gheeDownloadBtnAfterDiv = document.createElement('div');
  gheeDownloadBtnAfterDiv.classList.add('d-flex', 'mb-6');
  gheeAfterContent.append(gheeDownloadBtnAfterDiv);

  const gheeDownloadBtnAfterWrapper = document.createElement('div');
  gheeDownloadBtnAfterDiv.append(gheeDownloadBtnAfterWrapper);

  const gheeDownloadBtnAfterBtn = document.createElement('button');
  gheeDownloadBtnAfterBtn.classList.add('download-report_btn', 'download_report_btnAfter', 'disabled', 'bg-light-pink', 'border-light-pink', 'text-cream-100');
  gheeDownloadBtnAfterBtn.textContent = 'Download report'; // From ORIGINAL HTML
  gheeDownloadBtnAfterWrapper.append(gheeDownloadBtnAfterBtn);

  const gheeWhatsappLinkAfterDiv = document.createElement('div');
  gheeWhatsappLinkAfterDiv.classList.add('Whatsapp-link', 'mb-8', 'text-center');
  gheeAfterContent.append(gheeWhatsappLinkAfterDiv);

  // Initial state for Ghee section
  gheeRightSubtextAfter.style.display = 'none';

  // Event listener for Ghee download button
  gheeDownloadLink.addEventListener('click', (e) => {
    e.preventDefault();
    // Simulate download
    setTimeout(() => {
      gheeRightSubtextBefore.style.display = 'none';
      gheeRightSubtextAfter.style.display = 'flex'; // Use flex to match original display
    }, 500); // Simulate a short delay for download
  });

  // Milk Section (second product)
  const milkSectionImage = document.createElement('div');
  milkSectionImage.classList.add('position-relative', 'milk-section_image');
  rightSection.append(milkSectionImage);

  const milkAccountMainBgBox = document.createElement('div');
  milkAccountMainBgBox.classList.add('w-100', 'account-mainBg-box', 'd-flex');
  milkSectionImage.append(milkAccountMainBgBox);

  // Desktop Image for Milk
  const milkDesktopBg = document.createElement('div');
  milkDesktopBg.classList.add('annual-background_image--overlay', 'd-flex', 'annual-bg-desktop');
  milkAccountMainBgBox.append(milkDesktopBg);
  const milkDesktopImgSrc = '/content/dam/aemigrate/uploaded-folder/image/mask-group-20176-2x-fmt-webp-alpha.webp'; // From ORIGINAL HTML
  if (milkDesktopImgSrc) {
    const optimizedMilkDesktopPic = createOptimizedPicture(milkDesktopImgSrc, 'Milk Desktop Background', false, [{ width: '750' }]);
    milkDesktopBg.append(optimizedMilkDesktopPic);
    optimizedMilkDesktopPic.querySelector('img').classList.add('account-bgImg', 'with-overlay');
    optimizedMilkDesktopPic.querySelector('img').setAttribute('height', '392px');
  }
  const milkDesktopOverlay = document.createElement('div');
  milkDesktopOverlay.classList.add('overlay');
  milkDesktopBg.append(milkDesktopOverlay);

  // Mobile Image for Milk
  const milkMobileBg = document.createElement('div');
  milkMobileBg.classList.add('annual-background_image--overlay', 'd-flex', 'annual-bg-mobile');
  milkAccountMainBgBox.append(milkMobileBg);
  const milkMobileImgSrc = '/content/dam/aemigrate/uploaded-folder/image/annual-bg-mobile-fmt-webp-alpha.webp'; // From ORIGINAL HTML
  if (milkMobileImgSrc) {
    const optimizedMilkMobilePic = createOptimizedPicture(milkMobileImgSrc, 'Milk Mobile Background', false, [{ width: '750' }]);
    milkMobileBg.append(optimizedMilkMobilePic);
    optimizedMilkMobilePic.querySelector('img').classList.add('account-bgImg', 'with-overlay');
    optimizedMilkMobilePic.querySelector('img').setAttribute('height', '447px');
  }
  const milkMobileOverlay = document.createElement('div');
  milkMobileOverlay.classList.add('overlay');
  milkMobileBg.append(milkMobileOverlay);

  const milkRightSubtext = document.createElement('div');
  milkRightSubtext.classList.add('right-subtext', 'position-absolute', 'start-0', 'end-0', 'bottom-0', 'right-subtext-milk');
  milkSectionImage.append(milkRightSubtext);

  const milkContent = document.createElement('div');
  milkContent.classList.add('d-flex', 'flex-column', 'align-items-center');
  milkRightSubtext.append(milkContent);

  const milkMobileHeading = document.createElement('div');
  milkMobileHeading.classList.add('ghee-mobile-heading', 'text-center', 'font-md-18', 'font-baskerville', 'leading-32');
  // Content from ORIGINAL HTML, should ideally be authored
  milkMobileHeading.innerHTML = '<p> </p><p><b>Thick, Tasty Milk</b></p><p><b>Selected with care, for you!</b></p><p></p>';
  milkContent.append(milkMobileHeading);

  const milkFontDiv = document.createElement('div');
  milkFontDiv.classList.add('font-md-18', 'mt-6', 'text-center');
  milkContent.append(milkFontDiv);

  const milkImageDiv = document.createElement('div');
  milkImageDiv.classList.add('my-9');
  // SVG from ORIGINAL HTML
  milkImageDiv.innerHTML = '<img alt="svg file" src="/content/dam/aemigrate/uploaded-folder/image/1776770163966.svg+xml"/>';
  milkContent.append(milkImageDiv);

  const milkWhatsappLinkDiv = document.createElement('div');
  milkWhatsappLinkDiv.classList.add('Whatsapp-link', 'mb-8', 'text-center');
  // Content from ORIGINAL HTML, should ideally be authored
  milkWhatsappLinkDiv.innerHTML = '<p>Check Your Milk Report Card on <a href="https://wa.me/message/GW56YICBZLQGI1" target="_blank" rel="noopener noreferrer">Whatsapp​<span class="cmp-link__screen-reader-only">opens in a new tab</span></a></p>';
  milkContent.append(milkWhatsappLinkDiv);

  // Initial state for Milk section
  milkSectionImage.style.display = 'none';

  // Event listeners for product selection
  const productItems = productMainBox.querySelectorAll('.product-hover');
  productItems.forEach((item, idx) => {
    item.addEventListener('click', () => {
      // Remove active class from all
      productItems.forEach(p => p.classList.remove('active'));
      // Add active class to clicked item
      item.classList.add('active');

      // Toggle visibility of right sections
      if (idx === 0) { // Ghee
        gheeBox.style.display = 'block';
        milkSectionImage.style.display = 'none';
      } else if (idx === 1) { // Milk
        gheeBox.style.display = 'none';
        milkSectionImage.style.display = 'block';
      }
    });
  });

  // Set initial active state and display for the first product (Ghee)
  if (productItems.length > 0) {
    productItems[0].classList.add('active');
    gheeBox.style.display = 'block';
    milkSectionImage.style.display = 'none';
  }

  block.replaceChildren(containerXl);
}
