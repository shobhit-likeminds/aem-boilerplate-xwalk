import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, ...productRows] = [...block.children];

  block.classList.add('container-xl', 'annualReport_mainBox', 'product-selection-component');

  const accountMainBox = document.createElement('div');
  accountMainBox.classList.add('account-mainBox', 'mx-md-16');

  const row = document.createElement('div');
  row.classList.add('row', 'gx-5');

  const leftColumn = document.createElement('div');
  leftColumn.classList.add('mt-8', 'mt-md-10', 'col-lg-4');

  // Heading
  if (headingRow) {
    const headingCell = headingRow.firstElementChild;
    if (headingCell) {
      const headingP = document.createElement('p');
      headingP.classList.add('font-24', 'font-md-40', 'fw-bold', 'product-container_heading', 'font-baskerville');
      moveInstrumentation(headingCell, headingP);
      headingP.textContent = headingCell.textContent.trim();
      leftColumn.append(headingP);
    }
  }

  // Products
  const productMainBox = document.createElement('div');
  productMainBox.classList.add('product-mainbox', 'mt-10', 'mt-md-12');

  const productItems = []; // Store product items to manage active state

  productRows.forEach((productRow) => {
    const cells = [...productRow.children];
    const imageCell = cells.find(cell => cell.querySelector('picture'));
    const labelCell = cells.find(cell => !cell.querySelector('picture')); // Assuming label is the other cell

    const productWrapper = document.createElement('div');
    const productItem = document.createElement('div');
    productItem.classList.add('milk_ghee_smallImag', 'product-hover');

    // Image
    const picture = imageCell?.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        productItem.append(optimizedPic);
        optimizedPic.querySelector('img').classList.add('left-section-gheeBox', 'object-fit-contain');
      }
    }

    // Label
    if (labelCell) {
      const labelP = document.createElement('p');
      labelP.classList.add('product-subnames');
      moveInstrumentation(labelCell, labelP);
      labelP.textContent = labelCell.textContent.trim();
      productItem.append(labelP);
    }

    moveInstrumentation(productRow, productWrapper);
    productWrapper.append(productItem);
    productMainBox.append(productWrapper);
    productItems.push(productItem);
  });

  leftColumn.append(productMainBox);
  row.append(leftColumn);

  // Right section - this part is static content from the original HTML and not part of the block model.
  const rightColumn = document.createElement('div');
  rightColumn.classList.add('right-section', 'mt-10', 'py-0', 'position-relative', 'col-lg-8');

  // Ghee Section
  const gheeBox = document.createElement('div');
  gheeBox.classList.add('ghee_box');

  const accountMainBgBoxGhee = document.createElement('div');
  accountMainBgBoxGhee.classList.add('account-mainBg-box', 'w-100');
  gheeBox.append(accountMainBgBoxGhee);

  const annualBgDesktopGhee = document.createElement('div');
  annualBgDesktopGhee.classList.add('annual-background_image--overlay', 'd-flex', 'annual-bg-desktop');
  annualBgDesktopGhee.innerHTML = `
    <img src="/content/dam/aemigrate/uploaded-folder/image/mask-group-20176-2x-fmt-webp-alpha.webp" class="account-bgImg with-overlay" height="392px" loading="lazy">
    <div class="overlay"></div>
  `;
  accountMainBgBoxGhee.append(annualBgDesktopGhee);

  const annualBgMobileGhee = document.createElement('div');
  annualBgMobileGhee.classList.add('annual-background_image--overlay', 'd-flex', 'annual-bg-mobile');
  annualBgMobileGhee.innerHTML = `
    <img src="/content/dam/aemigrate/uploaded-folder/image/annual-bg-mobile-fmt-webp-alpha.webp" class="account-bgImg with-overlay" height="447px" loading="lazy">
    <div class="overlay"></div>
  `;
  accountMainBgBoxGhee.append(annualBgMobileGhee);

  const rightSubtextBeforeDownload = document.createElement('div');
  rightSubtextBeforeDownload.classList.add('right-subtext', 'position-absolute', 'start-0', 'end-0', 'bottom-0', 'right-subtext__BeforeDownload');
  rightSubtextBeforeDownload.innerHTML = `
    <div class="d-flex flex-column align-items-center">
      <div class="ghee-mobile-heading text-center font-md-18 font-baskerville leading-32">
        <p class="download_your_monthly_ghee"></p>
        <p></p><h3>Pure and tested—Aashirvaad Svasti Organic Ghee!</h3><p></p>
      </div>
      <button class="annual-report_DownloadBtn my-9">
        <div class="download_icon">
          <img alt="svg file" src="/content/dam/aemigrate/uploaded-folder/image/1776251959808.svg+xml"/>
        </div>
      </button>
      <div class="d-flex mb-6">
        <div>
          <a href="/content/dam/svasti/annual-reports/ghee/monthly-quality-report-card-organic-ghee-oct.pdf" download="report.pdf" class="text-decoration-none download-report_btn cta-analytics download_report_btnBefore text-cream-100 border border-2 border-red-100 border-maroon-100-hover border-red-300-active bg-red-100 bg-maroon-100-hover bg-red-300-active">
              Download report
          </a>
        </div>
      </div>
      <div class="Whatsapp-link mb-8 text-center"></div>
    </div>
  `;
  accountMainBgBoxGhee.append(rightSubtextBeforeDownload);

  const rightSubtextAfterDownload = document.createElement('div');
  rightSubtextAfterDownload.classList.add('right-subtext', 'position-absolute', 'start-0', 'end-0', 'bottom-0', 'right-section_subtextafter', 'right-subtext__AfterDownload');
  rightSubtextAfterDownload.innerHTML = `
    <div class="d-flex flex-column align-items-center justify-content-around">
      <div class="ghee-mobile-heading text-center font-md-18 font-baskerville leading-32">
        <p>Your monthly report of svasti ghee has<br>been downloaded!</p>
      </div>
      <button class="annual-report_DownloadBtn my-9">
        <div class="tick_download">
          <img alt="svg file" src="/content/dam/aemigrate/uploaded-folder/image/1776251959995.svg+xml"/>
        </div>
      </button>
      <div class="d-flex mb-6">
        <div>
          <button class="download-report_btn download_report_btnAfter disabled bg-light-pink border-light-pink text-cream-100">
            Download report
          </button>
        </div>
      </div>
      <div class="Whatsapp-link mb-8 text-center"></div>
    </div>
  `;
  gheeBox.append(rightSubtextAfterDownload);
  rightColumn.append(gheeBox);

  // Milk Section
  const milkSectionImage = document.createElement('div');
  milkSectionImage.classList.add('position-relative', 'milk-section_image');

  const accountMainBgBoxMilk = document.createElement('div');
  accountMainBgBoxMilk.classList.add('w-100', 'account-mainBg-box', 'd-flex');
  milkSectionImage.append(accountMainBgBoxMilk);

  const annualBgDesktopMilk = document.createElement('div');
  annualBgDesktopMilk.classList.add('annual-background_image--overlay', 'd-flex', 'annual-bg-desktop');
  annualBgDesktopMilk.innerHTML = `
    <img src="/content/dam/aemigrate/uploaded-folder/image/mask-group-20176-2x-fmt-webp-alpha.webp" class="account-bgImg with-overlay" height="392px" loading="lazy">
    <div class="overlay"></div>
  `;
  accountMainBgBoxMilk.append(annualBgDesktopMilk);

  const annualBgMobileMilk = document.createElement('div');
  annualBgMobileMilk.classList.add('annual-background_image--overlay', 'd-flex', 'annual-bg-mobile');
  annualBgMobileMilk.innerHTML = `
    <img src="/content/dam/aemigrate/uploaded-folder/image/annual-bg-mobile-fmt-webp-alpha.webp" class="account-bgImg with-overlay" height="447px" loading="lazy">
    <div class="overlay"></div>
  `;
  accountMainBgBoxMilk.append(annualBgMobileMilk);

  const rightSubtextMilk = document.createElement('div');
  rightSubtextMilk.classList.add('right-subtext', 'position-absolute', 'start-0', 'end-0', 'bottom-0', 'right-subtext-milk');
  rightSubtextMilk.innerHTML = `
    <div class="d-flex flex-column align-items-center">
      <div class="ghee-mobile-heading text-center font-md-18 font-baskerville leading-32">
        <p> </p><p><b>Thick, Tasty Milk</b></p><p><b>Selected with care, for you!</b></p><p></p>
      </div>
      <div class="font-md-18 mt-6 text-center"></div>
      <div class="my-9">
        <img alt="svg file" src="/content/dam/aemigrate/uploaded-folder/image/1776251960322.svg+xml"/>
      </div>
      <div class="Whatsapp-link mb-8 text-center"><p>Check Your Milk Report Card on <a href="https://wa.me/message/GW56YICBZLQGI1" target="_blank" rel="noopener noreferrer">Whatsapp​<span class="cmp-link__screen-reader-only">opens in a new tab</span></a></p></div>
    </div>
  `;
  milkSectionImage.append(rightSubtextMilk);
  rightColumn.append(milkSectionImage);

  row.append(rightColumn);
  accountMainBox.append(row);
  block.textContent = '';
  block.append(accountMainBox);

  // Event Listeners
  const downloadReportBtnBefore = block.querySelector('.download_report_btnBefore');
  const rightSubtextBefore = block.querySelector('.right-subtext__BeforeDownload');
  const rightSubtextAfter = block.querySelector('.right-subtext__AfterDownload');

  if (downloadReportBtnBefore && rightSubtextBefore && rightSubtextAfter) {
    downloadReportBtnBefore.addEventListener('click', (e) => {
      e.preventDefault();
      rightSubtextBefore.style.display = 'none';
      rightSubtextAfter.style.display = 'flex';
    });
  }

  // Product selection logic
  const gheeProductItem = productItems[0]; // Assuming first product is Ghee
  const milkProductItem = productItems[1]; // Assuming second product is Milk

  // Initialize with Ghee active
  gheeProductItem.classList.add('ghee-packet', 'active');
  milkProductItem.classList.add('milk-packet');
  gheeBox.style.display = 'block';
  milkSectionImage.style.display = 'none';

  gheeProductItem.addEventListener('click', () => {
    productItems.forEach(item => item.classList.remove('active'));
    gheeProductItem.classList.add('active');
    gheeBox.style.display = 'block';
    milkSectionImage.style.display = 'none';
    // Reset download state for ghee
    if (rightSubtextBefore && rightSubtextAfter) {
      rightSubtextBefore.style.display = 'flex';
      rightSubtextAfter.style.display = 'none';
    }
  });

  milkProductItem.addEventListener('click', () => {
    productItems.forEach(item => item.classList.remove('active'));
    milkProductItem.classList.add('active');
    gheeBox.style.display = 'none';
    milkSectionImage.style.display = 'block';
  });

  // Handle image optimization for any images added dynamically or from block content
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
