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
  if (headingRow) {
    const headingCell = headingRow.firstElementChild;
    if (headingCell) {
      const heading = document.createElement('p');
      heading.classList.add('font-24', 'font-md-40', 'fw-bold', 'product-container_heading', 'font-baskerville');
      moveInstrumentation(headingCell, heading);
      heading.textContent = headingCell.textContent.trim();
      leftSection.append(heading);
    }
  }

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

  productRows.forEach((rowEl, index) => {
    const [imageCell, labelCell] = [...rowEl.children];

    const productDiv = document.createElement('div');
    moveInstrumentation(rowEl, productDiv);

    const productHoverDiv = document.createElement('div');
    productHoverDiv.classList.add('milk_ghee_smallImag', index === 0 ? 'ghee-packet' : 'milk-packet', 'product-hover');

    // Image
    const picture = imageCell?.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        optimizedPic.querySelector('img').classList.add('left-section-gheeBox', 'object-fit-contain');
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        productHoverDiv.append(optimizedPic);
      }
    }

    // Label
    if (labelCell) {
      const p = document.createElement('p');
      p.classList.add('product-subnames');
      moveInstrumentation(labelCell, p);
      p.textContent = labelCell.textContent.trim();
      productHoverDiv.append(p);
    }

    productDiv.append(productHoverDiv);
    productMainBox.append(productDiv);

    // Add event listener for hover effect
    productHoverDiv.addEventListener('mouseenter', () => {
      productHoverDiv.classList.add('active');
      if (index === 0) { // Ghee product
        gheeBox.style.display = 'block';
        milkSectionImage.style.display = 'none';
      } else { // Milk product
        gheeBox.style.display = 'none';
        milkSectionImage.style.display = 'block';
      }
    });

    productHoverDiv.addEventListener('mouseleave', () => {
      productHoverDiv.classList.remove('active');
      // Optional: Reset to a default state or keep the last selected visible
      // For now, we'll keep the last selected visible on mouse leave from the product item itself
    });

    // Initial state: first product is active
    if (index === 0) {
      productHoverDiv.classList.add('active');
      gheeBox.style.display = 'block';
      milkSectionImage.style.display = 'none';
    } else {
      gheeBox.style.display = 'none';
      milkSectionImage.style.display = 'block';
    }
  });

  // Right section content (simplified based on original HTML, focusing on interactivity)
  // Ghee section
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
            <p><h3>Pure and tested—Aashirvaad Svasti Organic Ghee!</h3></p>
            <p></p>
          </div>
          <button class="annual-report_DownloadBtn my-9">
            <div class="download_icon">
              <img alt="svg file" src="/content/dam/aemigrate/uploaded-folder/image/1776277123097.svg+xml"/>
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
              <img alt="svg file" src="/content/dam/aemigrate/uploaded-folder/image/1776277123195.svg+xml"/>
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

  // Milk section
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
          <p> </p><p><b>Thick, Tasty Milk</b></p>
          <p><b>Selected with care, for you!</b></p>
          <p></p>
        </div>
        <div class="font-md-18 mt-6 text-center"></div>
        <div class="my-9">
          <img alt="svg file" src="/content/dam/aemigrate/uploaded-folder/image/1776277123264.svg+xml"/>
        </div>
        <div class="Whatsapp-link mb-8 text-center"><p>Check Your Milk Report Card on <a href="https://wa.me/message/GW56YICBZLQGI1" target="_blank" rel="noopener noreferrer">Whatsapp<span class="cmp-link__screen-reader-only">opens in a new tab</span></a></p></div>
      </div>
    </div>
  `;

  // Interactivity for download button in Ghee section
  const downloadButton = gheeBox.querySelector('.annual-report_DownloadBtn');
  const beforeDownloadSection = gheeBox.querySelector('.right-subtext__BeforeDownload');
  const afterDownloadSection = gheeBox.querySelector('.right-subtext__AfterDownload');
  const downloadLink = gheeBox.querySelector('.download-report_btnBefore');

  if (downloadButton && beforeDownloadSection && afterDownloadSection && downloadLink) {
    downloadButton.addEventListener('click', (e) => {
      e.preventDefault();
      // Trigger the download
      const link = document.createElement('a');
      link.href = downloadLink.href;
      link.download = downloadLink.download;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Toggle visibility
      beforeDownloadSection.style.display = 'none';
      afterDownloadSection.style.display = 'block';
    });
  }
}
