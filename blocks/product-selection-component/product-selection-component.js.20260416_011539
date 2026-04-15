import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, ...productRows] = [...block.children];

  block.classList.add('container-xl', 'annualReport_mainBox');

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
  if (headingRow) {
    const headingCell = headingRow.firstElementChild;
    if (headingCell) {
      const headingP = document.createElement('p');
      headingP.classList.add('font-24', 'font-md-40', 'fw-bold', 'product-container_heading', 'font-baskerville');
      moveInstrumentation(headingCell, headingP);
      headingP.textContent = headingCell.textContent.trim();
      leftSection.append(headingP);
    }
  }

  const productMainBox = document.createElement('div');
  productMainBox.classList.add('product-mainbox', 'mt-10', 'mt-md-12');
  leftSection.append(productMainBox);

  const rightSection = document.createElement('div');
  rightSection.classList.add('right-section', 'mt-10', 'py-0', 'position-relative', 'col-lg-8');
  row.append(rightSection);

  // Ghee box (static content from original HTML, simplified to just the structure)
  const gheeBox = document.createElement('div');
  gheeBox.classList.add('ghee_box');
  rightSection.append(gheeBox);

  const gheeAccountMainBgBox = document.createElement('div');
  gheeAccountMainBgBox.classList.add('account-mainBg-box', 'w-100');
  gheeBox.append(gheeAccountMainBgBox);

  const gheeAnnualBgDesktop = document.createElement('div');
  gheeAnnualBgDesktop.classList.add('annual-background_image--overlay', 'd-flex', 'annual-bg-desktop');
  gheeAccountMainBgBox.append(gheeAnnualBgDesktop);

  const gheeDesktopImg = document.createElement('img');
  gheeDesktopImg.classList.add('account-bgImg', 'with-overlay');
  // Image src from model if available, otherwise placeholder
  gheeDesktopImg.src = '/content/dam/aemigrate/uploaded-folder/image/mask-group-20176-2x-fmt-webp-alpha.webp';
  gheeDesktopImg.alt = '';
  gheeDesktopImg.height = '392px';
  gheeDesktopImg.loading = 'lazy';
  gheeAnnualBgDesktop.append(gheeDesktopImg);

  const gheeDesktopOverlay = document.createElement('div');
  gheeDesktopOverlay.classList.add('overlay');
  gheeAnnualBgDesktop.append(gheeDesktopOverlay);

  const gheeAnnualBgMobile = document.createElement('div');
  gheeAnnualBgMobile.classList.add('annual-background_image--overlay', 'd-flex', 'annual-bg-mobile');
  gheeAccountMainBgBox.append(gheeAnnualBgMobile);

  const gheeMobileImg = document.createElement('img');
  gheeMobileImg.classList.add('account-bgImg', 'with-overlay');
  // Image src from model if available, otherwise placeholder
  gheeMobileImg.src = '/content/dam/aemigrate/uploaded-folder/image/annual-bg-mobile-fmt-webp-alpha.webp';
  gheeMobileImg.alt = '';
  gheeMobileImg.height = '447px';
  gheeMobileImg.loading = 'lazy';
  gheeAnnualBgMobile.append(gheeMobileImg);

  const gheeMobileOverlay = document.createElement('div');
  gheeMobileOverlay.classList.add('overlay');
  gheeAnnualBgMobile.append(gheeMobileOverlay);

  const gheeRightSubtextBefore = document.createElement('div');
  gheeRightSubtextBefore.classList.add('right-subtext', 'position-absolute', 'start-0', 'end-0', 'bottom-0', 'right-subtext__BeforeDownload');
  gheeAccountMainBgBox.append(gheeRightSubtextBefore);

  const gheeFlexContainer = document.createElement('div');
  gheeFlexContainer.classList.add('d-flex', 'flex-column', 'align-items-center');
  gheeRightSubtextBefore.append(gheeFlexContainer);

  const gheeMobileHeading = document.createElement('div');
  gheeMobileHeading.classList.add('ghee-mobile-heading', 'text-center', 'font-md-18', 'font-baskerville', 'leading-32');
  gheeMobileHeading.innerHTML = '<p class="download_your_monthly_ghee"></p><p><h3>Pure and tested—Aashirvaad Svasti Organic Ghee!</h3><p></p>';
  gheeFlexContainer.append(gheeMobileHeading);

  const gheeDownloadButton = document.createElement('button');
  gheeDownloadButton.classList.add('annual-report_DownloadBtn', 'my-9');
  gheeFlexContainer.append(gheeDownloadButton);

  const gheeDownloadIcon = document.createElement('div');
  gheeDownloadIcon.classList.add('download_icon');
  gheeDownloadButton.append(gheeDownloadIcon);

  const gheeDownloadImg = document.createElement('img');
  gheeDownloadImg.alt = 'svg file';
  // Image src from model if available, otherwise placeholder
  gheeDownloadImg.src = '/content/dam/aemigrate/uploaded-folder/image/1776277123097.svg+xml';
  gheeDownloadIcon.append(gheeDownloadImg);

  const gheeDownloadLinkContainer = document.createElement('div');
  gheeDownloadLinkContainer.classList.add('d-flex', 'mb-6');
  gheeFlexContainer.append(gheeDownloadLinkContainer);

  const gheeDownloadLinkDiv = document.createElement('div');
  gheeDownloadLinkContainer.append(gheeDownloadLinkDiv);

  const gheeDownloadLink = document.createElement('a');
  // href from model if available, otherwise placeholder
  gheeDownloadLink.href = '/content/dam/svasti/annual-reports/ghee/monthly-quality-report-card-organic-ghee-oct.pdf';
  gheeDownloadLink.download = 'report.pdf';
  gheeDownloadLink.classList.add('text-decoration-none', 'download-report_btn', 'cta-analytics', 'download_report_btnBefore', 'text-cream-100', 'border', 'border-2', 'border-red-100', 'border-maroon-100-hover', 'border-red-300-active', 'bg-red-100', 'bg-maroon-100-hover', 'bg-red-300-active');
  gheeDownloadLink.textContent = 'Download report';
  gheeDownloadLinkDiv.append(gheeDownloadLink);

  const gheeWhatsappLink = document.createElement('div');
  gheeWhatsappLink.classList.add('Whatsapp-link', 'mb-8', 'text-center');
  gheeFlexContainer.append(gheeWhatsappLink);

  const gheeRightSubtextAfter = document.createElement('div');
  gheeRightSubtextAfter.classList.add('right-subtext', 'position-absolute', 'start-0', 'end-0', 'bottom-0', 'right-section_subtextafter', 'right-subtext__AfterDownload');
  gheeAccountMainBgBox.append(gheeRightSubtextAfter);
  gheeRightSubtextAfter.style.display = 'none'; // Initially hidden

  const gheeAfterFlexContainer = document.createElement('div');
  gheeAfterFlexContainer.classList.add('d-flex', 'flex-column', 'align-items-center', 'justify-content-around');
  gheeRightSubtextAfter.append(gheeAfterFlexContainer);

  const gheeAfterHeading = document.createElement('div');
  gheeAfterHeading.classList.add('ghee-mobile-heading', 'text-center', 'font-md-18', 'font-baskerville', 'leading-32');
  gheeAfterHeading.innerHTML = '<p>Your monthly report of svasti ghee has<br>been downloaded!</p>';
  gheeAfterFlexContainer.append(gheeAfterHeading);

  const gheeAfterDownloadButton = document.createElement('button');
  gheeAfterDownloadButton.classList.add('annual-report_DownloadBtn', 'my-9');
  gheeAfterFlexContainer.append(gheeAfterDownloadButton);

  const gheeTickDownload = document.createElement('div');
  gheeTickDownload.classList.add('tick_download');
  gheeAfterDownloadButton.append(gheeTickDownload);

  const gheeTickImg = document.createElement('img');
  gheeTickImg.alt = 'svg file';
  gheeTickImg.src = '/content/dam/aemigrate/uploaded-folder/image/1776277123195.svg+xml';
  gheeTickDownload.append(gheeTickImg);

  const gheeAfterDownloadLinkContainer = document.createElement('div');
  gheeAfterDownloadLinkContainer.classList.add('d-flex', 'mb-6');
  gheeAfterFlexContainer.append(gheeAfterDownloadLinkContainer);

  const gheeAfterDownloadLinkDiv = document.createElement('div');
  gheeAfterDownloadLinkContainer.append(gheeAfterDownloadLinkDiv);

  const gheeAfterDownloadLink = document.createElement('button');
  gheeAfterDownloadLink.classList.add('download-report_btn', 'download_report_btnAfter', 'disabled', 'bg-light-pink', 'border-light-pink', 'text-cream-100');
  gheeAfterDownloadLink.textContent = 'Download report';
  gheeAfterDownloadLinkDiv.append(gheeAfterDownloadLink);

  const gheeAfterWhatsappLink = document.createElement('div');
  gheeAfterWhatsappLink.classList.add('Whatsapp-link', 'mb-8', 'text-center');
  gheeAfterFlexContainer.append(gheeAfterWhatsappLink);

  // Milk section (static content from original HTML, simplified to just the structure)
  const milkSectionImage = document.createElement('div');
  milkSectionImage.classList.add('position-relative', 'milk-section_image');
  rightSection.append(milkSectionImage);
  milkSectionImage.style.display = 'none'; // Initially hidden

  const milkAccountMainBgBox = document.createElement('div');
  milkAccountMainBgBox.classList.add('w-100', 'account-mainBg-box', 'd-flex');
  milkSectionImage.append(milkAccountMainBgBox);

  const milkAnnualBgDesktop = document.createElement('div');
  milkAnnualBgDesktop.classList.add('annual-background_image--overlay', 'd-flex', 'annual-bg-desktop');
  milkAccountMainBgBox.append(milkAnnualBgDesktop);

  const milkDesktopImg = document.createElement('img');
  milkDesktopImg.classList.add('account-bgImg', 'with-overlay');
  // Image src from model if available, otherwise placeholder
  milkDesktopImg.src = '/content/dam/aemigrate/uploaded-folder/image/mask-group-20176-2x-fmt-webp-alpha.webp';
  milkDesktopImg.alt = '';
  milkDesktopImg.height = '392px';
  milkDesktopImg.loading = 'lazy';
  milkAnnualBgDesktop.append(milkDesktopImg);

  const milkDesktopOverlay = document.createElement('div');
  milkDesktopOverlay.classList.add('overlay');
  milkAnnualBgDesktop.append(milkDesktopOverlay);

  const milkAnnualBgMobile = document.createElement('div');
  milkAnnualBgMobile.classList.add('annual-background_image--overlay', 'd-flex', 'annual-bg-mobile');
  milkAccountMainBgBox.append(milkAnnualBgMobile);

  const milkMobileImg = document.createElement('img');
  milkMobileImg.classList.add('account-bgImg', 'with-overlay');
  // Image src from model if available, otherwise placeholder
  milkMobileImg.src = '/content/dam/aemigrate/uploaded-folder/image/annual-bg-mobile-fmt-webp-alpha.webp';
  milkMobileImg.alt = '';
  milkMobileImg.height = '447px';
  milkMobileImg.loading = 'lazy';
  milkAnnualBgMobile.append(milkMobileImg);

  const milkMobileOverlay = document.createElement('div');
  milkMobileOverlay.classList.add('overlay');
  milkAnnualBgMobile.append(milkMobileOverlay);

  const milkRightSubtext = document.createElement('div');
  milkRightSubtext.classList.add('right-subtext', 'position-absolute', 'start-0', 'end-0', 'bottom-0', 'right-subtext-milk');
  milkSectionImage.append(milkRightSubtext);

  const milkFlexContainer = document.createElement('div');
  milkFlexContainer.classList.add('d-flex', 'flex-column', 'align-items-center');
  milkRightSubtext.append(milkFlexContainer);

  const milkMobileHeading = document.createElement('div');
  milkMobileHeading.classList.add('ghee-mobile-heading', 'text-center', 'font-md-18', 'font-baskerville', 'leading-32');
  milkMobileHeading.innerHTML = '<p> </p><p><b>Thick, Tasty Milk</b></p><p><b>Selected with care, for you!</b></p><p></p>';
  milkFlexContainer.append(milkMobileHeading);

  const milkEmptyDiv = document.createElement('div');
  milkEmptyDiv.classList.add('font-md-18', 'mt-6', 'text-center');
  milkFlexContainer.append(milkEmptyDiv);

  const milkSvgContainer = document.createElement('div');
  milkSvgContainer.classList.add('my-9');
  milkFlexContainer.append(milkSvgContainer);

  const milkSvgImg = document.createElement('img');
  milkSvgImg.alt = 'svg file';
  // Image src from model if available, otherwise placeholder
  milkSvgImg.src = '/content/dam/aemigrate/uploaded-folder/image/1776277123264.svg+xml';
  milkSvgContainer.append(milkSvgImg);

  const milkWhatsappLink = document.createElement('div');
  milkWhatsappLink.classList.add('Whatsapp-link', 'mb-8', 'text-center');
  milkWhatsappLink.innerHTML = '<p>Check Your Milk Report Card on <a href="https://wa.me/message/GW56YICBZLQGI1" target="_blank" rel="noopener noreferrer">Whatsapp<span class="cmp-link__screen-reader-only">opens in a new tab</span></a></p>';
  milkFlexContainer.append(milkWhatsappLink);

  // Event listeners for product selection
  productRows.forEach((productRow, index) => {
    const cells = [...productRow.children];
    const imageCell = cells.find(cell => cell.querySelector('picture'));
    const labelCell = cells.find(cell => !cell.querySelector('picture'));

    const productDiv = document.createElement('div');
    moveInstrumentation(productRow, productDiv);

    const productItem = document.createElement('div');
    productItem.classList.add('milk_ghee_smallImag', 'product-hover');
    if (index === 0) {
      productItem.classList.add('ghee-packet');
      productItem.classList.add('active'); // Set Ghee as active by default
      gheeBox.style.display = 'block';
      milkSectionImage.style.display = 'none';
    } else if (index === 1) {
      productItem.classList.add('milk-packet');
    }

    if (imageCell) {
      const picture = imageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
          optimizedPic.querySelector('img').classList.add('left-section-gheeBox', 'object-fit-contain');
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          productItem.append(optimizedPic);
        }
      }
    }

    if (labelCell) {
      const p = document.createElement('p');
      p.classList.add('product-subnames');
      moveInstrumentation(labelCell, p);
      p.textContent = labelCell.textContent.trim();
      productItem.append(p);
    }

    productItem.addEventListener('click', () => {
      // Remove 'active' from all product items
      document.querySelectorAll('.product-hover').forEach((item) => item.classList.remove('active'));
      // Add 'active' to the clicked item
      productItem.classList.add('active');

      // Toggle visibility of right sections based on clicked item
      if (productItem.classList.contains('ghee-packet')) {
        gheeBox.style.display = 'block';
        milkSectionImage.style.display = 'none';
      } else if (productItem.classList.contains('milk-packet')) {
        gheeBox.style.display = 'none';
        milkSectionImage.style.display = 'block';
      }
    });

    productDiv.append(productItem);
    productMainBox.append(productDiv);
  });

  // Event listener for the Ghee download button
  gheeDownloadButton.addEventListener('click', () => {
    gheeRightSubtextBefore.style.display = 'none';
    gheeRightSubtextAfter.style.display = 'flex'; // Use flex to maintain layout
  });

  // Event listener for the Ghee download link (actual download)
  gheeDownloadLink.addEventListener('click', () => {
    // This will trigger the download, the button click above handles the UI change
  });
}
