import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];
  const mainHeadingRow = children[0];
  const itemRows = children.slice(1);

  // Use content detection to distinguish item types
  const productItems = itemRows.filter((row) => row.children.length === 2);
  const gheePanels = itemRows.filter((row) => row.children.length === 9);
  const milkPanels = itemRows.filter((row) => row.children.length === 6);

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
  moveInstrumentation(mainHeadingRow, heading);
  heading.innerHTML = mainHeadingRow.querySelector('div').innerHTML;
  leftSection.append(heading);

  const productMainBox = document.createElement('div');
  productMainBox.classList.add('product-mainbox', 'mt-10', 'mt-md-12');
  leftSection.append(productMainBox);

  productItems.forEach((productRow) => {
    // Use content detection for cells instead of index access
    const cells = [...productRow.children];
    const productImageCell = cells.find(cell => cell.querySelector('picture'));
    const productLabelCell = cells.find(cell => !cell.querySelector('picture'));

    const productDiv = document.createElement('div');
    moveInstrumentation(productRow, productDiv);

    const smallImageDiv = document.createElement('div');
    smallImageDiv.classList.add('milk_ghee_smallImag');

    if (productImageCell) {
      const productImagePicture = productImageCell.querySelector('picture');
      if (productImagePicture) {
        const img = productImagePicture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        smallImageDiv.append(optimizedPic);
        optimizedPic.querySelector('img').classList.add('left-section-gheeBox', 'object-fit-contain');
      }
    }

    const productLabel = document.createElement('p');
    productLabel.classList.add('product-subnames');
    if (productLabelCell) {
      productLabel.textContent = productLabelCell.textContent.trim();
    }

    smallImageDiv.append(productLabel);
    productDiv.append(smallImageDiv);
    productMainBox.append(productDiv);

    if (productLabel.textContent.trim().toLowerCase() === 'ghee') {
      smallImageDiv.classList.add('ghee-packet', 'product-hover');
    } else if (productLabel.textContent.trim().toLowerCase() === 'milk') {
      smallImageDiv.classList.add('milk-packet');
    }
  });

  const rightSection = document.createElement('div');
  rightSection.classList.add('right-section', 'mt-10', 'py-0', 'position-relative', 'col-lg-8');
  row.append(rightSection);

  gheePanels.forEach((gheeRow) => {
    // Use content detection for cells instead of index access
    const cells = [...gheeRow.children];
    const bgDesktopCell = cells.find(cell => cell.querySelector('picture') && !cell.nextElementSibling?.querySelector('picture'));
    const bgMobileCell = cells.find(cell => cell.querySelector('picture') && cell.previousElementSibling?.querySelector('picture'));
    const headlineBeforeCell = cells.find(cell => cell.innerHTML.includes('<h3>') && !cell.querySelector('a'));
    const ctaIconCell = cells.find(cell => cell.querySelector('picture') && cell.nextElementSibling?.querySelector('a'));
    const ctaLinkCell = cells.find(cell => cell.querySelector('a'));
    const ctaLabelCell = cells.find(cell => !cell.querySelector('a') && !cell.querySelector('picture') && cell.textContent.trim() === 'Download report');
    const headlineAfterCell = cells.find(cell => cell.innerHTML.includes('Your monthly report') || cell.innerHTML.includes('svasti ghee has'));
    const confirmationIconCell = cells.find(cell => cell.querySelector('picture') && cell.previousElementSibling?.innerHTML.includes('Your monthly report'));
    const ctaLabelAfterCell = cells.find(cell => !cell.querySelector('a') && !cell.querySelector('picture') && cell.textContent.trim() === 'Download report' && cell.previousElementSibling?.querySelector('picture'));

    const gheeBox = document.createElement('div');
    gheeBox.classList.add('ghee_box');
    moveInstrumentation(gheeRow, gheeBox);

    const accountMainBgBox = document.createElement('div');
    accountMainBgBox.classList.add('account-mainBg-box', 'w-100');
    gheeBox.append(accountMainBgBox);

    const createBackgroundImageDiv = (cell, className) => {
      const bgDiv = document.createElement('div');
      bgDiv.classList.add('annual-background_image--overlay', 'd-flex', className);
      if (cell) {
        const picture = cell.querySelector('picture');
        if (picture) {
          const img = picture.querySelector('img');
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
          bgDiv.append(optimizedPic);
          optimizedPic.querySelector('img').classList.add('account-bgImg', 'with-overlay');
        }
      }
      const overlay = document.createElement('div');
      overlay.classList.add('overlay');
      bgDiv.append(overlay);
      return bgDiv;
    };

    accountMainBgBox.append(createBackgroundImageDiv(bgDesktopCell, 'annual-bg-desktop'));
    accountMainBgBox.append(createBackgroundImageDiv(bgMobileCell, 'annual-bg-mobile'));

    const rightSubtextBefore = document.createElement('div');
    rightSubtextBefore.classList.add(
      'right-subtext',
      'position-absolute',
      'start-0',
      'end-0',
      'bottom-0',
      'right-subtext__BeforeDownload',
    );
    accountMainBgBox.append(rightSubtextBefore);

    const beforeContent = document.createElement('div');
    beforeContent.classList.add('d-flex', 'flex-column', 'align-items-center');
    rightSubtextBefore.append(beforeContent);

    const gheeMobileHeadingBefore = document.createElement('div');
    gheeMobileHeadingBefore.classList.add(
      'ghee-mobile-heading',
      'text-center',
      'font-md-18',
      'font-baskerville',
      'leading-32',
    );
    if (headlineBeforeCell) {
      gheeMobileHeadingBefore.innerHTML = headlineBeforeCell.innerHTML;
    }
    beforeContent.append(gheeMobileHeadingBefore);

    const downloadButtonBefore = document.createElement('button');
    downloadButtonBefore.classList.add('annual-report_DownloadBtn', 'my-9');
    const downloadIconDiv = document.createElement('div');
    downloadIconDiv.classList.add('download_icon');
    if (ctaIconCell) {
      const ctaIconPicture = ctaIconCell.querySelector('picture');
      if (ctaIconPicture) {
        const img = ctaIconPicture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        downloadIconDiv.append(optimizedPic);
        optimizedPic.querySelector('img').setAttribute('alt', img.alt);
      }
    }
    downloadButtonBefore.append(downloadIconDiv);
    beforeContent.append(downloadButtonBefore);

    const downloadLinkWrap = document.createElement('div');
    downloadLinkWrap.classList.add('d-flex', 'mb-6');
    const downloadLinkDiv = document.createElement('div');
    const downloadLink = document.createElement('a');
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
    if (ctaLinkCell) {
      const foundCtaLink = ctaLinkCell.querySelector('a');
      if (foundCtaLink) {
        downloadLink.href = foundCtaLink.href;
        downloadLink.setAttribute('download', 'report.pdf');
      }
    }
    if (ctaLabelCell) {
      downloadLink.textContent = ctaLabelCell.textContent.trim();
    }
    downloadLinkDiv.append(downloadLink);
    downloadLinkWrap.append(downloadLinkDiv);
    beforeContent.append(downloadLinkWrap);

    const rightSubtextAfter = document.createElement('div');
    rightSubtextAfter.classList.add(
      'right-subtext',
      'position-absolute',
      'start-0',
      'end-0',
      'bottom-0',
      'right-section_subtextafter',
      'right-subtext__AfterDownload',
    );
    accountMainBgBox.append(rightSubtextAfter);

    const afterContent = document.createElement('div');
    afterContent.classList.add('d-flex', 'flex-column', 'align-items-center', 'justify-content-around');
    rightSubtextAfter.append(afterContent);

    const gheeMobileHeadingAfter = document.createElement('div');
    gheeMobileHeadingAfter.classList.add(
      'ghee-mobile-heading',
      'text-center',
      'font-md-18',
      'font-baskerville',
      'leading-32',
    );
    if (headlineAfterCell) {
      gheeMobileHeadingAfter.innerHTML = headlineAfterCell.innerHTML;
    }
    afterContent.append(gheeMobileHeadingAfter);

    const downloadButtonAfter = document.createElement('button');
    downloadButtonAfter.classList.add('annual-report_DownloadBtn', 'my-9');
    const tickDownloadDiv = document.createElement('div');
    tickDownloadDiv.classList.add('tick_download');
    if (confirmationIconCell) {
      const confirmationIconPicture = confirmationIconCell.querySelector('picture');
      if (confirmationIconPicture) {
        const img = confirmationIconPicture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        tickDownloadDiv.append(optimizedPic);
        optimizedPic.querySelector('img').setAttribute('alt', img.alt);
      }
    }
    downloadButtonAfter.append(tickDownloadDiv);
    afterContent.append(downloadButtonAfter);

    const downloadButtonAfterWrap = document.createElement('div');
    downloadButtonAfterWrap.classList.add('d-flex', 'mb-6');
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
    if (ctaLabelAfterCell) {
      downloadButtonAfterDisabled.textContent = ctaLabelAfterCell.textContent.trim();
    }
    downloadButtonAfterDiv.append(downloadButtonAfterDisabled);
    downloadButtonAfterWrap.append(downloadButtonAfterDiv);
    afterContent.append(downloadButtonAfterWrap);

    downloadLink.addEventListener('click', (e) => {
      e.preventDefault();
      rightSubtextBefore.style.display = 'none';
      rightSubtextAfter.style.display = 'flex';
      // Trigger download
      const tempLink = document.createElement('a');
      tempLink.href = downloadLink.href;
      tempLink.download = downloadLink.download;
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
    });

    rightSection.append(gheeBox);
  });

  milkPanels.forEach((milkRow) => {
    // Use content detection for cells instead of index access
    const cells = [...milkRow.children];
    const bgDesktopCell = cells.find(cell => cell.querySelector('picture') && !cell.nextElementSibling?.querySelector('picture'));
    const bgMobileCell = cells.find(cell => cell.querySelector('picture') && cell.previousElementSibling?.querySelector('picture'));
    const headlineCell = cells.find(cell => cell.innerHTML.includes('<b>') || cell.innerHTML.includes('Thick, Tasty Milk'));
    const ctaIconCell = cells.find(cell => cell.querySelector('picture') && cell.previousElementSibling?.innerHTML.includes('<b>'));
    const whatsappLinkCell = cells.find(cell => cell.querySelector('a') && cell.querySelector('a').href.includes('wa.me'));
    const whatsappLabelCell = cells.find(cell => !cell.querySelector('a') && !cell.querySelector('picture') && cell.textContent.trim().includes('Whatsapp'));

    const milkSectionImage = document.createElement('div');
    milkSectionImage.classList.add('position-relative', 'milk-section_image');
    moveInstrumentation(milkRow, milkSectionImage);

    const accountMainBgBox = document.createElement('div');
    accountMainBgBox.classList.add('w-100', 'account-mainBg-box', 'd-flex');
    milkSectionImage.append(accountMainBgBox);

    const createBackgroundImageDiv = (cell, className) => {
      const bgDiv = document.createElement('div');
      bgDiv.classList.add('annual-background_image--overlay', 'd-flex', className);
      if (cell) {
        const picture = cell.querySelector('picture');
        if (picture) {
          const img = picture.querySelector('img');
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
          bgDiv.append(optimizedPic);
          optimizedPic.querySelector('img').classList.add('account-bgImg', 'with-overlay');
        }
      }
      const overlay = document.createElement('div');
      overlay.classList.add('overlay');
      bgDiv.append(overlay);
      return bgDiv;
    };

    accountMainBgBox.append(createBackgroundImageDiv(bgDesktopCell, 'annual-bg-desktop'));
    accountMainBgBox.append(createBackgroundImageDiv(bgMobileCell, 'annual-bg-mobile'));

    const rightSubtextMilk = document.createElement('div');
    rightSubtextMilk.classList.add(
      'right-subtext',
      'position-absolute',
      'start-0',
      'end-0',
      'bottom-0',
      'right-subtext-milk',
    );
    milkSectionImage.append(rightSubtextMilk);

    const milkContent = document.createElement('div');
    milkContent.classList.add('d-flex', 'flex-column', 'align-items-center');
    rightSubtextMilk.append(milkContent);

    const gheeMobileHeadingMilk = document.createElement('div');
    gheeMobileHeadingMilk.classList.add(
      'ghee-mobile-heading',
      'text-center',
      'font-md-18',
      'font-baskerville',
      'leading-32',
    );
    if (headlineCell) {
      gheeMobileHeadingMilk.innerHTML = headlineCell.innerHTML;
    }
    milkContent.append(gheeMobileHeadingMilk);

    const ctaIconDiv = document.createElement('div');
    ctaIconDiv.classList.add('my-9');
    if (ctaIconCell) {
      const ctaIconPicture = ctaIconCell.querySelector('picture');
      if (ctaIconPicture) {
        const img = ctaIconPicture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        ctaIconDiv.append(optimizedPic);
        optimizedPic.querySelector('img').setAttribute('alt', img.alt);
      }
    }
    milkContent.append(ctaIconDiv);

    const whatsappLinkDiv = document.createElement('div');
    whatsappLinkDiv.classList.add('Whatsapp-link', 'mb-8', 'text-center');
    const whatsappLink = document.createElement('a');
    if (whatsappLinkCell) {
      const foundWhatsappLink = whatsappLinkCell.querySelector('a');
      if (foundWhatsappLink) {
        whatsappLink.href = foundWhatsappLink.href;
        whatsappLink.target = '_blank';
        whatsappLink.rel = 'noopener noreferrer';
        // Move instrumentation for the anchor tag if it exists within the cell
        moveInstrumentation(foundWhatsappLink, whatsappLink);
      }
    }
    if (whatsappLabelCell) {
      whatsappLink.textContent = whatsappLabelCell.textContent.trim();
    }
    whatsappLinkDiv.append(whatsappLink);
    milkContent.append(whatsappLinkDiv);

    rightSection.append(milkSectionImage);
  });

  block.replaceChildren(container);

  // Initial state for ghee panel
  const gheeBoxElement = block.querySelector('.ghee_box');
  if (gheeBoxElement) {
    gheeBoxElement.querySelector('.right-subtext__AfterDownload').style.display = 'none';
  }

  // Toggle products
  const productHoverElements = block.querySelectorAll('.product-hover');
  productHoverElements.forEach((el) => {
    el.addEventListener('click', () => {
      block.querySelectorAll('.ghee_box, .milk-section_image').forEach((panel) => {
        panel.style.display = 'none';
      });
      block.querySelectorAll('.milk_ghee_smallImag').forEach((item) => {
        item.classList.remove('product-hover');
      });
      el.classList.add('product-hover');

      if (el.classList.contains('ghee-packet')) {
        block.querySelector('.ghee_box').style.display = 'block';
      } else if (el.classList.contains('milk-packet')) {
        block.querySelector('.milk-section_image').style.display = 'block';
      }
    });
  });

  // Set initial active product
  const initialActiveProduct = block.querySelector('.ghee-packet');
  if (initialActiveProduct) {
    initialActiveProduct.classList.add('product-hover');
    block.querySelector('.ghee_box').style.display = 'block';
    block.querySelector('.milk-section_image').style.display = 'none';
  } else {
    block.querySelector('.ghee_box').style.display = 'none';
    block.querySelector('.milk-section_image').style.display = 'block';
  }
}
