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
  moveInstrumentation(headingRow, headingP);
  headingP.classList.add('font-24', 'font-md-40', 'fw-bold', 'product-container_heading', 'font-baskerville');
  headingP.textContent = headingRow.firstElementChild?.textContent.trim() || '';
  leftSection.append(headingP);

  const productMainBox = document.createElement('div');
  productMainBox.classList.add('product-mainbox', 'mt-10', 'mt-md-12');
  leftSection.append(productMainBox);

  productRows.forEach((productRow, index) => {
    // CRITICAL FIX: Replaced row.children[n] with content detection
    const cells = [...productRow.children];
    const imageCell = cells.find(cell => cell.querySelector('picture'));
    const labelCell = cells.find(cell => !cell.querySelector('picture')); // Assuming label is the other cell

    const productDiv = document.createElement('div');
    moveInstrumentation(productRow, productDiv);

    const productItemDiv = document.createElement('div');
    productItemDiv.classList.add('milk_ghee_smallImag');
    if (index === 0) {
      productItemDiv.classList.add('ghee-packet', 'product-hover'); // Add product-hover to the first item by default
      productItemDiv.dataset.productType = 'ghee';
    } else if (index === 1) {
      productItemDiv.classList.add('milk-packet');
      productItemDiv.dataset.productType = 'milk';
    }

    if (imageCell) {
      const picture = imageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          optimizedPic.classList.add('left-section-gheeBox', 'object-fit-contain');
          productItemDiv.append(optimizedPic);
        }
      }
    }

    if (labelCell) {
      const labelP = document.createElement('p');
      labelP.classList.add('product-subnames');
      labelP.textContent = labelCell.textContent.trim() || '';
      productItemDiv.append(labelP);
    }

    productDiv.append(productItemDiv);
    productMainBox.append(productDiv);
  });

  // Right section - placeholder for now, as it's not part of the product-selection block model
  // but exists in the original HTML and might be a separate block or part of a layout.
  // For this decorate function, we only create the structure explicitly defined by the block model.
  const rightSection = document.createElement('div');
  rightSection.classList.add('right-section', 'mt-10', 'py-0', 'position-relative', 'col-lg-8');
  row.append(rightSection);

  // --- INTERACTIVITY ---
  // Create the right section content based on original HTML for interactivity
  const gheeBox = document.createElement('div');
  gheeBox.classList.add('ghee_box');
  rightSection.append(gheeBox);

  const milkSectionImage = document.createElement('div');
  milkSectionImage.classList.add('position-relative', 'milk-section_image');
  rightSection.append(milkSectionImage);

  // Initial state: ghee_box is visible, milk-section_image is hidden
  milkSectionImage.style.display = 'none';

  // Add event listeners to product items for switching content
  const productItems = productMainBox.querySelectorAll('.milk_ghee_smallImag');
  productItems.forEach((item) => {
    item.addEventListener('click', () => {
      // Remove 'product-hover' from all items
      productItems.forEach((pItem) => pItem.classList.remove('product-hover'));
      // Add 'product-hover' to the clicked item
      item.classList.add('product-hover');

      const productType = item.dataset.productType;
      if (productType === 'ghee') {
        gheeBox.style.display = 'block';
        milkSectionImage.style.display = 'none';
      } else if (productType === 'milk') {
        gheeBox.style.display = 'none';
        milkSectionImage.style.display = 'block';
      }
    });
  });

  // Ghee box content (simplified, focusing on interactive elements)
  gheeBox.innerHTML = `
    <div class="account-mainBg-box w-100">
      <div class="annual-background_image--overlay d-flex annual-bg-desktop">
        <img src="/content/dam/aemigrate/uploaded-folder/image/mask-group-20176-2x-fmt-webp-alpha.webp" class="account-bgImg with-overlay" height="392px" loading="lazy">
        <div class="overlay"></div>
      </div>
      <div class="annual-background_image--overlay d-flex annual-bg-mobile">
        <img src="/content/dam/aemigrate/uploaded-folder/image/annual-bg-mobile-fmt-webp-alpha.webp" class="account-bgImg with-overlay" height="447px" loading="lazy">
        <div class="overlay"></div>
      </div>
      <div class="right-subtext position-absolute start-0 end-0 bottom-0 right-subtext__BeforeDownload">
        <div class="d-flex flex-column align-items-center">
          <div class="ghee-mobile-heading text-center font-md-18 font-baskerville leading-32">
            <p class="download_your_monthly_ghee"></p>
            <p></p><h3>Pure and tested—Aashirvaad Svasti Organic Ghee!</h3><p></p>
          </div>
          <button class="annual-report_DownloadBtn my-9">
            <div class="download_icon">
              <img alt="svg file" src="/content/dam/aemigrate/uploaded-folder/image/1776254208862.svg+xml"/>
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
      </div>
      <div class="right-subtext position-absolute start-0 end-0 bottom-0 right-section_subtextafter right-subtext__AfterDownload" style="display: none;">
        <div class="d-flex flex-column align-items-center justify-content-around">
          <div class="ghee-mobile-heading text-center font-md-18 font-baskerville leading-32">
            <p>Your monthly report of svasti ghee has<br>been downloaded!</p>
          </div>
          <button class="annual-report_DownloadBtn my-9">
            <div class="tick_download">
              <img alt="svg file" src="/content/dam/aemigrate/uploaded-folder/image/1776254208935.svg+xml"/>
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
      </div>
    </div>
  `;

  // Milk box content (simplified)
  milkSectionImage.innerHTML = `
    <div class="w-100 account-mainBg-box d-flex">
      <div class="annual-background_image--overlay d-flex annual-bg-desktop">
        <img src="/content/dam/aemigrate/uploaded-folder/image/mask-group-20176-2x-fmt-webp-alpha.webp" class="account-bgImg with-overlay" height="392px" loading="lazy">
        <div class="overlay"></div>
      </div>
      <div class="annual-background_image--overlay d-flex annual-bg-mobile">
        <img src="/content/dam/aemigrate/uploaded-folder/image/annual-bg-mobile-fmt-webp-alpha.webp" class="account-bgImg with-overlay" height="447px" loading="lazy">
        <div class="overlay"></div>
      </div>
    </div>
    <div class="right-subtext position-absolute start-0 end-0 bottom-0 right-subtext-milk">
      <div class="d-flex flex-column align-items-center">
        <div class="ghee-mobile-heading text-center font-md-18 font-baskerville leading-32">
          <p> </p><p><b>Thick, Tasty Milk</b></p><p><b>Selected with care, for you!</b></p><p></p>
        </div>
        <div class="font-md-18 mt-6 text-center"></div>
        <div class="my-9">
          <img alt="svg file" src="/content/dam/aemigrate/uploaded-folder/image/1776254209360.svg+xml"/>
        </div>
        <div class="Whatsapp-link mb-8 text-center"><p>Check Your Milk Report Card on <a href="https://wa.me/message/GW56YICBZLQGI1" target="_blank" rel="noopener noreferrer">Whatsapp​<span class="cmp-link__screen-reader-only">opens in a new tab</span></a></p></div>
      </div>
    </div>
  `;

  // Add event listener for the "Download report" button in the Ghee section
  const downloadReportBtn = gheeBox.querySelector('.download-report_btnBefore');
  const beforeDownloadSection = gheeBox.querySelector('.right-subtext__BeforeDownload');
  const afterDownloadSection = gheeBox.querySelector('.right-subtext__AfterDownload');

  if (downloadReportBtn && beforeDownloadSection && afterDownloadSection) {
    downloadReportBtn.addEventListener('click', (e) => {
      // Prevent default link behavior if it's just for UI state change
      // If it's a real download, the browser will handle it.
      // For this example, we'll just toggle the UI.
      // e.preventDefault(); // Uncomment if you want to prevent actual download for testing UI

      beforeDownloadSection.style.display = 'none';
      afterDownloadSection.style.display = 'block';
    });
  }

  // Clear the original block content as it has been restructured
  block.textContent = '';
  block.append(accountMainBox);
}
