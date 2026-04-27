import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [mainHeadingRow, ...itemRows] = [...block.children];

  const root = document.createElement('div');
  root.classList.add('container-xl', 'annualReport_mainBox', 'product-selection-component');

  const accountMainBox = document.createElement('div');
  accountMainBox.classList.add('account-mainBox', 'mx-md-16');
  root.append(accountMainBox);

  const row = document.createElement('div');
  row.classList.add('row', 'gx-5');
  accountMainBox.append(row);

  // Left section for product options
  const leftSection = document.createElement('div');
  leftSection.classList.add('mt-8', 'mt-md-10', 'col-lg-4');
  row.append(leftSection);

  const mainHeading = document.createElement('p');
  mainHeading.classList.add(
    'font-24',
    'font-md-40',
    'fw-bold',
    'product-container_heading',
    'font-baskerville',
  );
  moveInstrumentation(mainHeadingRow, mainHeading);
  mainHeading.innerHTML = mainHeadingRow.firstElementChild?.innerHTML || '';
  leftSection.append(mainHeading);

  const productMainBox = document.createElement('div');
  productMainBox.classList.add('product-mainbox', 'mt-10', 'mt-md-12');
  leftSection.append(productMainBox);

  // Content detection for item rows based on number of children
  const productOptions = itemRows.filter((r) => r.children.length === 2);
  const gheePanels = itemRows.filter((r) => r.children.length === 9);
  const milkPanels = itemRows.filter((r) => r.children.length === 6);

  productOptions.forEach((optionRow, index) => {
    const cells = [...optionRow.children];
    const productImageCell = cells.find((cell) => cell.querySelector('picture'));
    const productLabelCell = cells.find((cell) => !cell.querySelector('picture'));

    const productDiv = document.createElement('div');
    moveInstrumentation(optionRow, productDiv);

    const productInnerDiv = document.createElement('div');
    productInnerDiv.classList.add(
      'milk_ghee_smallImag',
      index === 0 ? 'ghee-packet' : 'milk-packet',
    );
    if (index === 0) {
      productInnerDiv.classList.add('product-hover');
    }
    productDiv.append(productInnerDiv);

    if (productImageCell) {
      const picture = productImageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        optimizedPic.querySelector('img').classList.add('left-section-gheeBox', 'object-fit-contain');
        productInnerDiv.append(optimizedPic);
      }
    }

    if (productLabelCell) {
      const labelP = document.createElement('p');
      labelP.classList.add('product-subnames');
      labelP.textContent = productLabelCell.textContent.trim();
      productInnerDiv.append(labelP);
    }

    productMainBox.append(productDiv);
  });

  // Right section for panels
  const rightSection = document.createElement('div');
  rightSection.classList.add('right-section', 'mt-10', 'py-0', 'position-relative', 'col-lg-8');
  row.append(rightSection);

  // Ghee panels
  if (gheePanels.length > 0) {
    const gheeBox = document.createElement('div');
    gheeBox.classList.add('ghee_box');
    rightSection.append(gheeBox);

    gheePanels.forEach((gheeRow) => {
      const [
        backgroundDesktopCell,
        backgroundMobileCell,
        headlineBeforeCell,
        ctaIconCell,
        ctaLinkCell,
        ctaLabelCell,
        headlineAfterCell,
        confirmationIconCell,
        ctaLabelAfterCell,
      ] = [...gheeRow.children];

      const accountMainBgBox = document.createElement('div');
      accountMainBgBox.classList.add('account-mainBg-box', 'w-100');
      moveInstrumentation(gheeRow, accountMainBgBox);
      gheeBox.append(accountMainBgBox);

      // Desktop background
      const desktopBgWrap = document.createElement('div');
      desktopBgWrap.classList.add(
        'annual-background_image--overlay',
        'd-flex',
        'annual-bg-desktop',
      );
      const desktopPicture = backgroundDesktopCell.querySelector('picture');
      if (desktopPicture) {
        const img = desktopPicture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        optimizedPic.querySelector('img').classList.add('account-bgImg', 'with-overlay');
        optimizedPic.querySelector('img').setAttribute('height', '392px');
        desktopBgWrap.append(optimizedPic);
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');
        desktopBgWrap.append(overlay);
      }
      accountMainBgBox.append(desktopBgWrap);

      // Mobile background
      const mobileBgWrap = document.createElement('div');
      mobileBgWrap.classList.add(
        'annual-background_image--overlay',
        'd-flex',
        'annual-bg-mobile',
      );
      const mobilePicture = backgroundMobileCell.querySelector('picture');
      if (mobilePicture) {
        const img = mobilePicture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        optimizedPic.querySelector('img').classList.add('account-bgImg', 'with-overlay');
        optimizedPic.querySelector('img').setAttribute('height', '447px');
        mobileBgWrap.append(optimizedPic);
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');
        mobileBgWrap.append(overlay);
      }
      accountMainBgBox.append(mobileBgWrap);

      // Before Download section
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

      const headlineBeforeDiv = document.createElement('div');
      headlineBeforeDiv.classList.add(
        'ghee-mobile-heading',
        'text-center',
        'font-md-18',
        'font-baskerville',
        'leading-32',
      );
      headlineBeforeDiv.innerHTML = headlineBeforeCell.innerHTML;
      beforeContent.append(headlineBeforeDiv);

      const ctaButton = document.createElement('button');
      ctaButton.classList.add('annual-report_DownloadBtn', 'my-9');
      beforeContent.append(ctaButton);

      const downloadIconDiv = document.createElement('div');
      downloadIconDiv.classList.add('download_icon');
      const ctaIconPicture = ctaIconCell.querySelector('picture');
      if (ctaIconPicture) {
        const img = ctaIconPicture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        downloadIconDiv.append(optimizedPic);
      }
      ctaButton.append(downloadIconDiv);

      const ctaLinkDiv = document.createElement('div');
      ctaLinkDiv.classList.add('d-flex', 'mb-6');
      beforeContent.append(ctaLinkDiv);

      const ctaLinkInnerDiv = document.createElement('div');
      ctaLinkDiv.append(ctaLinkInnerDiv);

      const ctaAnchor = document.createElement('a');
      ctaAnchor.classList.add(
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
      const foundLink = ctaLinkCell.querySelector('a');
      if (foundLink) {
        ctaAnchor.href = foundLink.href;
        ctaAnchor.setAttribute('download', 'report.pdf');
      }
      ctaAnchor.textContent = ctaLabelCell.textContent.trim();
      ctaLinkInnerDiv.append(ctaAnchor);

      // After Download section
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
      afterContent.classList.add(
        'd-flex',
        'flex-column',
        'align-items-center',
        'justify-content-around',
      );
      rightSubtextAfter.append(afterContent);

      const headlineAfterDiv = document.createElement('div');
      headlineAfterDiv.classList.add(
        'ghee-mobile-heading',
        'text-center',
        'font-md-18',
        'font-baskerville',
        'leading-32',
      );
      headlineAfterDiv.innerHTML = headlineAfterCell.innerHTML;
      afterContent.append(headlineAfterDiv);

      const confirmationButton = document.createElement('button');
      confirmationButton.classList.add('annual-report_DownloadBtn', 'my-9');
      afterContent.append(confirmationButton);

      const tickDownloadDiv = document.createElement('div');
      tickDownloadDiv.classList.add('tick_download');
      const confirmationIconPicture = confirmationIconCell.querySelector('picture');
      if (confirmationIconPicture) {
        const img = confirmationIconPicture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        tickDownloadDiv.append(optimizedPic);
      }
      confirmationButton.append(tickDownloadDiv);

      const ctaAfterLinkDiv = document.createElement('div');
      ctaAfterLinkDiv.classList.add('d-flex', 'mb-6');
      afterContent.append(ctaAfterLinkDiv);

      const ctaAfterLinkInnerDiv = document.createElement('div');
      ctaAfterLinkDiv.append(ctaAfterLinkInnerDiv);

      const ctaAfterButton = document.createElement('button');
      ctaAfterButton.classList.add(
        'download-report_btn',
        'download_report_btnAfter',
        'disabled',
        'bg-light-pink',
        'border-light-pink',
        'text-cream-100',
      );
      ctaAfterButton.textContent = ctaLabelAfterCell.textContent.trim();
      ctaAfterLinkInnerDiv.append(ctaAfterButton);

      // Initial state management for ghee panels
      ctaAnchor.addEventListener('click', (e) => {
        e.preventDefault();
        rightSubtextBefore.style.display = 'none';
        rightSubtextAfter.style.display = 'block';
      });

      // Initially hide the after download section
      rightSubtextAfter.style.display = 'none';
    });
  }

  // Milk panels
  if (milkPanels.length > 0) {
    const milkSectionImage = document.createElement('div');
    milkSectionImage.classList.add('position-relative', 'milk-section_image');
    rightSection.append(milkSectionImage);

    milkPanels.forEach((milkRow) => {
      const [
        backgroundDesktopCell,
        backgroundMobileCell,
        headlinesCell,
        confirmationIconCell,
        whatsappTextCell,
        whatsappLinkCell,
      ] = [...milkRow.children];

      const accountMainBgBox = document.createElement('div');
      accountMainBgBox.classList.add('w-100', 'account-mainBg-box', 'd-flex');
      moveInstrumentation(milkRow, accountMainBgBox);
      milkSectionImage.append(accountMainBgBox);

      // Desktop background
      const desktopBgWrap = document.createElement('div');
      desktopBgWrap.classList.add(
        'annual-background_image--overlay',
        'd-flex',
        'annual-bg-desktop',
      );
      const desktopPicture = backgroundDesktopCell.querySelector('picture');
      if (desktopPicture) {
        const img = desktopPicture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        optimizedPic.querySelector('img').classList.add('account-bgImg', 'with-overlay');
        optimizedPic.querySelector('img').setAttribute('height', '392px');
        desktopBgWrap.append(optimizedPic);
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');
        desktopBgWrap.append(overlay);
      }
      accountMainBgBox.append(desktopBgWrap);

      // Mobile background
      const mobileBgWrap = document.createElement('div');
      mobileBgWrap.classList.add(
        'annual-background_image--overlay',
        'd-flex',
        'annual-bg-mobile',
      );
      const mobilePicture = backgroundMobileCell.querySelector('picture');
      if (mobilePicture) {
        const img = mobilePicture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        optimizedPic.querySelector('img').classList.add('account-bgImg', 'with-overlay');
        optimizedPic.querySelector('img').setAttribute('height', '447px');
        mobileBgWrap.append(optimizedPic);
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');
        mobileBgWrap.append(overlay);
      }
      accountMainBgBox.append(mobileBgWrap);

      // Milk subtext section
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

      const headlinesDiv = document.createElement('div');
      headlinesDiv.classList.add(
        'ghee-mobile-heading',
        'text-center',
        'font-md-18',
        'font-baskerville',
        'leading-32',
      );
      headlinesDiv.innerHTML = headlinesCell.innerHTML;
      milkContent.append(headlinesDiv);

      const confirmationIconDiv = document.createElement('div');
      confirmationIconDiv.classList.add('my-9');
      const confirmationIconPicture = confirmationIconCell.querySelector('picture');
      if (confirmationIconPicture) {
        const img = confirmationIconPicture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        confirmationIconDiv.append(optimizedPic);
      }
      milkContent.append(confirmationIconDiv);

      const whatsappLinkDiv = document.createElement('div');
      whatsappLinkDiv.classList.add('Whatsapp-link', 'mb-8', 'text-center');
      milkContent.append(whatsappLinkDiv);

      const whatsappTextP = document.createElement('p');
      whatsappTextP.innerHTML = whatsappTextCell.innerHTML;
      whatsappLinkDiv.append(whatsappTextP);

      const whatsappAnchor = whatsappTextP.querySelector('a');
      const foundWhatsappLink = whatsappLinkCell.querySelector('a'); // This cell is type=aem-content
      if (whatsappAnchor && foundWhatsappLink) {
        whatsappAnchor.href = foundWhatsappLink.href;
      }
    });
  }

  // Event listeners for product selection
  const productOptionDivs = productMainBox.children;
  const gheeBoxEl = rightSection.querySelector('.ghee_box');
  const milkSectionEl = rightSection.querySelector('.milk-section_image');

  if (gheeBoxEl) gheeBoxEl.style.display = 'block';
  if (milkSectionEl) milkSectionEl.style.display = 'none';

  [...productOptionDivs].forEach((optionDiv, index) => {
    optionDiv.addEventListener('click', () => {
      [...productOptionDivs].forEach((div) => div.firstElementChild.classList.remove('product-hover'));
      optionDiv.firstElementChild.classList.add('product-hover');

      if (index === 0) {
        if (gheeBoxEl) gheeBoxEl.style.display = 'block';
        if (milkSectionEl) milkSectionEl.style.display = 'none';
      } else {
        if (gheeBoxEl) gheeBoxEl.style.display = 'none';
        if (milkSectionEl) milkSectionEl.style.display = 'block';
      }
    });
  });

  block.replaceChildren(root);

  // Image optimization
  root.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
