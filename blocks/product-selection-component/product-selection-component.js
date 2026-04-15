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

  const leftColumn = document.createElement('div');
  leftColumn.classList.add('mt-8', 'mt-md-10', 'col-lg-4');
  row.append(leftColumn);

  // Heading
  const headingP = document.createElement('p');
  headingP.classList.add('font-24', 'font-md-40', 'fw-bold', 'product-container_heading', 'font-baskerville');
  moveInstrumentation(headingRow, headingP);
  headingP.textContent = headingRow.firstElementChild.textContent.trim();
  leftColumn.append(headingP);

  const productMainBox = document.createElement('div');
  productMainBox.classList.add('product-mainbox', 'mt-10', 'mt-md-12');
  leftColumn.append(productMainBox);

  const rightSection = document.createElement('div');
  rightSection.classList.add('right-section', 'mt-10', 'py-0', 'position-relative', 'col-lg-8');
  row.append(rightSection);

  // Placeholder for dynamic content in the right section
  const gheeBox = document.createElement('div');
  gheeBox.classList.add('ghee_box');
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
              <img alt="svg file" src="/content/dam/aemigrate/uploaded-folder/image/1776285257332.svg+xml"/>
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
      <div class="right-subtext position-absolute start-0 end-0 bottom-0 right-section_subtextafter right-subtext__AfterDownload">
        <div class="d-flex flex-column align-items-center justify-content-around">
          <div class="ghee-mobile-heading text-center font-md-18 font-baskerville leading-32">
            <p>Your monthly report of svasti ghee has<br>been downloaded!</p>
          </div>
          <button class="annual-report_DownloadBtn my-9">
            <div class="tick_download">
              <img alt="svg file" src="/content/dam/aemigrate/uploaded-folder/image/1776285257381.svg+xml"/>
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

  const milkSection = document.createElement('div');
  milkSection.classList.add('position-relative', 'milk-section_image');
  milkSection.innerHTML = `
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
          <img alt="svg file" src="/content/dam/aemigrate/uploaded-folder/image/1776285257429.svg+xml"/>
        </div>
        <div class="Whatsapp-link mb-8 text-center"><p>Check Your Milk Report Card on <a href="https://wa.me/message/GW56YICBZLQGI1" target="_blank" rel="noopener noreferrer">Whatsapp​<span class="cmp-link__screen-reader-only">opens in a new tab</span></a></p></div>
      </div>
    </div>
  `;

  rightSection.append(gheeBox); // Default to showing ghee box
  rightSection.append(milkSection);
  milkSection.style.display = 'none'; // Hide milk section initially

  productRows.forEach((productRow) => {
    const cells = [...productRow.children];
    const imageCell = cells.find(cell => cell.querySelector('picture'));
    const labelCell = cells.find(cell => !cell.querySelector('picture')); // Assuming label cell doesn't contain a picture

    const productDiv = document.createElement('div');
    moveInstrumentation(productRow, productDiv);

    const productItemDiv = document.createElement('div');
    productItemDiv.classList.add('milk_ghee_smallImag', 'product-hover');
    productDiv.append(productItemDiv);

    // Image
    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      productItemDiv.append(optimizedPic);
      optimizedPic.querySelector('img').classList.add('left-section-gheeBox', 'object-fit-contain');
    }

    // Label
    const labelP = document.createElement('p');
    labelP.classList.add('product-subnames');
    labelP.textContent = labelCell.textContent.trim();
    productItemDiv.append(labelP);

    productMainBox.append(productDiv);

    // Add event listener for product selection
    productItemDiv.addEventListener('click', () => {
      // Remove 'ghee-packet' and 'milk-packet' from all product items
      document.querySelectorAll('.milk_ghee_smallImag').forEach(item => {
        item.classList.remove('ghee-packet', 'milk-packet');
      });

      // Add 'ghee-packet' or 'milk-packet' based on label text
      if (labelP.textContent.trim().toLowerCase() === 'ghee') {
        productItemDiv.classList.add('ghee-packet');
        gheeBox.style.display = 'block';
        milkSection.style.display = 'none';
      } else if (labelP.textContent.trim().toLowerCase() === 'milk') {
        productItemDiv.classList.add('milk-packet');
        gheeBox.style.display = 'none';
        milkSection.style.display = 'block';
      }
    });
  });

  // Set initial active product based on the first product in the list
  const firstProductItem = productMainBox.querySelector('.milk_ghee_smallImag');
  if (firstProductItem) {
    const firstProductLabel = firstProductItem.querySelector('.product-subnames').textContent.trim().toLowerCase();
    if (firstProductLabel === 'ghee') {
      firstProductItem.classList.add('ghee-packet');
      gheeBox.style.display = 'block';
      milkSection.style.display = 'none';
    } else if (firstProductLabel === 'milk') {
      firstProductItem.classList.add('milk-packet');
      gheeBox.style.display = 'none';
      milkSection.style.display = 'block';
    }
  }

  // Add event listener for the download button in the ghee section
  const gheeDownloadButton = gheeBox.querySelector('.annual-report_DownloadBtn');
  const gheeDownloadLink = gheeBox.querySelector('.download-report_btnBefore');
  const gheeBeforeDownload = gheeBox.querySelector('.right-subtext__BeforeDownload');
  const gheeAfterDownload = gheeBox.querySelector('.right-subtext__AfterDownload');

  if (gheeDownloadButton && gheeDownloadLink && gheeBeforeDownload && gheeAfterDownload) {
    gheeDownloadButton.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent default button behavior
      gheeDownloadLink.click(); // Trigger the download link click
      gheeBeforeDownload.style.display = 'none';
      gheeAfterDownload.style.display = 'flex'; // Use flex to match original HTML structure
    });

    gheeDownloadLink.addEventListener('click', () => {
      // This listener ensures the state changes even if the link is clicked directly
      gheeBeforeDownload.style.display = 'none';
      gheeAfterDownload.style.display = 'flex';
    });
  }

  // Clear the original block content as we've reconstructed it
  block.textContent = '';
  block.append(accountMainBox);
}
