import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, ...itemRows] = [...block.children];

  const root = document.createElement('div');
  root.classList.add('container-xl', 'annualReport_mainBox', 'product-selection-component');

  const accountMainBox = document.createElement('div');
  accountMainBox.classList.add('account-mainBox', 'mx-md-16');
  root.append(accountMainBox);

  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row', 'gx-5');
  accountMainBox.append(rowDiv);

  const leftSection = document.createElement('div');
  leftSection.classList.add('mt-8', 'mt-md-10', 'col-lg-4');
  rowDiv.append(leftSection);

  const heading = document.createElement('p');
  heading.classList.add('font-24', 'font-md-40', 'fw-bold', 'product-container_heading', 'font-baskerville');
  moveInstrumentation(headingRow, heading);
  // Heading is richtext, so use innerHTML
  heading.innerHTML = headingRow.innerHTML;
  leftSection.append(heading);

  const productMainBox = document.createElement('div');
  productMainBox.classList.add('product-mainbox', 'mt-10', 'mt-md-12');
  leftSection.append(productMainBox);

  const rightSection = document.createElement('div');
  rightSection.classList.add('right-section', 'mt-10', 'py-0', 'position-relative', 'col-lg-8');
  rowDiv.append(rightSection);

  const gheeBox = document.createElement('div');
  gheeBox.classList.add('ghee_box');
  rightSection.append(gheeBox);

  const milkSectionImage = document.createElement('div');
  milkSectionImage.classList.add('position-relative', 'milk-section_image');
  rightSection.append(milkSectionImage);

  // Filter item rows based on the number of children (cells)
  const productItems = itemRows.filter((row) => row.children.length === 2);
  const gheePanels = itemRows.filter((row) => row.children.length === 9);
  const milkPanels = itemRows.filter((row) => row.children.length === 6);

  productItems.forEach((row, index) => {
    // Use content detection for product item cells
    const cells = [...row.children];
    const iconCell = cells.find(cell => cell.querySelector('picture'));
    const labelCell = cells.find(cell => !cell.querySelector('picture'));

    const productDiv = document.createElement('div');
    moveInstrumentation(row, productDiv); // Move instrumentation for the product item row

    const productInnerDiv = document.createElement('div');
    let productClass = '';
    if (index === 0) {
      productClass = 'ghee-packet';
    } else if (index === 1) {
      productClass = 'milk-packet';
    }
    productInnerDiv.classList.add('milk_ghee_smallImag', productClass);
    if (index === 0) {
      productInnerDiv.classList.add('product-hover');
    }

    if (iconCell) {
      const picture = iconCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          productInnerDiv.append(optimizedPic);
          optimizedPic.querySelector('img').classList.add('left-section-gheeBox', 'object-fit-contain');
        }
      }
    }

    const p = document.createElement('p');
    p.classList.add('product-subnames');
    if (labelCell) {
      p.textContent = labelCell.textContent.trim();
    }
    productInnerDiv.append(p);

    productDiv.append(productInnerDiv);
    productMainBox.append(productDiv);

    productInnerDiv.addEventListener('click', () => {
      productItems.forEach((itemRow, i) => {
        const itemDiv = productMainBox.children[i].querySelector('.milk_ghee_smallImag');
        if (itemDiv) {
          itemDiv.classList.remove('product-hover');
          if (i === 0) {
            gheeBox.style.display = 'none';
          } else if (i === 1) {
            milkSectionImage.style.display = 'none';
          }
        }
      });

      productInnerDiv.classList.add('product-hover');
      if (index === 0) {
        gheeBox.style.display = 'block';
        milkSectionImage.style.display = 'none';
      } else if (index === 1) {
        milkSectionImage.style.display = 'block';
        gheeBox.style.display = 'none';
      }
    });
  });

  gheePanels.forEach((row) => {
    const [
      backgroundDesktopCell,
      backgroundMobileCell,
      headlineBeforeCell,
      ctaIconBeforeCell,
      ctaLinkBeforeCell,
      ctaLabelBeforeCell,
      headlineAfterCell,
      ctaIconAfterCell,
      ctaLabelAfterCell,
    ] = [...row.children];

    const accountMainBgBox = document.createElement('div');
    accountMainBgBox.classList.add('account-mainBg-box', 'w-100');
    gheeBox.append(accountMainBgBox);
    moveInstrumentation(row, accountMainBgBox); // Move instrumentation for the ghee panel row

    const annualBgDesktop = document.createElement('div');
    annualBgDesktop.classList.add('annual-background_image--overlay', 'd-flex', 'annual-bg-desktop');
    accountMainBgBox.append(annualBgDesktop);

    const desktopPicture = backgroundDesktopCell.querySelector('picture');
    if (desktopPicture) {
      const img = desktopPicture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        annualBgDesktop.append(optimizedPic);
        optimizedPic.querySelector('img').classList.add('account-bgImg', 'with-overlay');
      }
    }
    const desktopOverlay = document.createElement('div');
    desktopOverlay.classList.add('overlay');
    annualBgDesktop.append(desktopOverlay);

    const annualBgMobile = document.createElement('div');
    annualBgMobile.classList.add('annual-background_image--overlay', 'd-flex', 'annual-bg-mobile');
    accountMainBgBox.append(annualBgMobile);

    const mobilePicture = backgroundMobileCell.querySelector('picture');
    if (mobilePicture) {
      const img = mobilePicture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        annualBgMobile.append(optimizedPic);
        optimizedPic.querySelector('img').classList.add('account-bgImg', 'with-overlay');
      }
    }
    const mobileOverlay = document.createElement('div');
    mobileOverlay.classList.add('overlay');
    annualBgMobile.append(mobileOverlay);

    // Before Download Section
    const rightSubtextBefore = document.createElement('div');
    rightSubtextBefore.classList.add('right-subtext', 'position-absolute', 'start-0', 'end-0', 'bottom-0', 'right-subtext__BeforeDownload');
    gheeBox.append(rightSubtextBefore);
    // moveInstrumentation(row, rightSubtextBefore); // Already moved to accountMainBgBox

    const beforeContent = document.createElement('div');
    beforeContent.classList.add('d-flex', 'flex-column', 'align-items-center');
    rightSubtextBefore.append(beforeContent);

    const gheeMobileHeadingBefore = document.createElement('div');
    gheeMobileHeadingBefore.classList.add('ghee-mobile-heading', 'text-center', 'font-md-18', 'font-baskerville', 'leading-32');
    // Headline is richtext, so use innerHTML
    gheeMobileHeadingBefore.innerHTML = headlineBeforeCell.innerHTML;
    beforeContent.append(gheeMobileHeadingBefore);

    const downloadButtonBefore = document.createElement('button');
    downloadButtonBefore.classList.add('annual-report_DownloadBtn', 'my-9');
    beforeContent.append(downloadButtonBefore);

    const downloadIconDiv = document.createElement('div');
    downloadIconDiv.classList.add('download_icon');
    downloadButtonBefore.append(downloadIconDiv);

    const ctaIconBeforePicture = ctaIconBeforeCell.querySelector('picture');
    if (ctaIconBeforePicture) {
      const img = ctaIconBeforePicture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        downloadIconDiv.append(optimizedPic);
      }
    }

    const downloadLinkWrapper = document.createElement('div');
    downloadLinkWrapper.classList.add('d-flex', 'mb-6');
    beforeContent.append(downloadLinkWrapper);

    const downloadLinkDiv = document.createElement('div');
    downloadLinkWrapper.append(downloadLinkDiv);

    const downloadLink = document.createElement('a');
    const ctaLinkBefore = ctaLinkBeforeCell.querySelector('a');
    if (ctaLinkBefore) {
      downloadLink.href = ctaLinkBefore.href; // Read href from aem-content
      downloadLink.setAttribute('download', 'report.pdf');
    }
    downloadLink.classList.add('text-decoration-none', 'download-report_btn', 'cta-analytics', 'download_report_btnBefore', 'text-cream-100', 'border', 'border-2', 'border-red-100', 'border-maroon-100-hover', 'border-red-300-active', 'bg-red-100', 'bg-maroon-100-hover', 'bg-red-300-active');
    downloadLink.textContent = ctaLabelBeforeCell.textContent.trim();
    downloadLinkDiv.append(downloadLink);

    const whatsappLinkBefore = document.createElement('div');
    whatsappLinkBefore.classList.add('Whatsapp-link', 'mb-8', 'text-center');
    beforeContent.append(whatsappLinkBefore);

    // After Download Section
    const rightSubtextAfter = document.createElement('div');
    rightSubtextAfter.classList.add('right-subtext', 'position-absolute', 'start-0', 'end-0', 'bottom-0', 'right-section_subtextafter', 'right-subtext__AfterDownload');
    gheeBox.append(rightSubtextAfter);

    const afterContent = document.createElement('div');
    afterContent.classList.add('d-flex', 'flex-column', 'align-items-center', 'justify-content-around');
    rightSubtextAfter.append(afterContent);

    const gheeMobileHeadingAfter = document.createElement('div');
    gheeMobileHeadingAfter.classList.add('ghee-mobile-heading', 'text-center', 'font-md-18', 'font-baskerville', 'leading-32');
    // Headline is richtext, so use innerHTML
    gheeMobileHeadingAfter.innerHTML = headlineAfterCell.innerHTML;
    afterContent.append(gheeMobileHeadingAfter);

    const downloadButtonAfter = document.createElement('button');
    downloadButtonAfter.classList.add('annual-report_DownloadBtn', 'my-9');
    afterContent.append(downloadButtonAfter);

    const tickDownloadDiv = document.createElement('div');
    tickDownloadDiv.classList.add('tick_download');
    downloadButtonAfter.append(tickDownloadDiv);

    const ctaIconAfterPicture = ctaIconAfterCell.querySelector('picture');
    if (ctaIconAfterPicture) {
      const img = ctaIconAfterPicture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        tickDownloadDiv.append(optimizedPic);
      }
    }

    const downloadButtonAfterWrapper = document.createElement('div');
    downloadButtonAfterWrapper.classList.add('d-flex', 'mb-6');
    afterContent.append(downloadButtonAfterWrapper);

    const downloadButtonAfterDiv = document.createElement('div');
    downloadButtonAfterWrapper.append(downloadButtonAfterDiv);

    const downloadButtonAfterEl = document.createElement('button');
    downloadButtonAfterEl.classList.add('download-report_btn', 'download_report_btnAfter', 'disabled', 'bg-light-pink', 'border-light-pink', 'text-cream-100');
    downloadButtonAfterEl.textContent = ctaLabelAfterCell.textContent.trim();
    downloadButtonAfterDiv.append(downloadButtonAfterEl);

    const whatsappLinkAfter = document.createElement('div');
    whatsappLinkAfter.classList.add('Whatsapp-link', 'mb-8', 'text-center');
    afterContent.append(whatsappLinkAfter);

    // Initial state
    rightSubtextAfter.style.display = 'none';

    downloadButtonBefore.addEventListener('click', () => {
      rightSubtextBefore.style.display = 'none';
      rightSubtextAfter.style.display = 'flex';
    });
  });

  milkPanels.forEach((row) => {
    const [
      backgroundDesktopCell,
      backgroundMobileCell,
      headlineCell,
      ctaIconCell,
      whatsappLinkCell,
      whatsappLabelCell,
    ] = [...row.children];

    const accountMainBgBox = document.createElement('div');
    accountMainBgBox.classList.add('w-100', 'account-mainBg-box', 'd-flex');
    milkSectionImage.append(accountMainBgBox);
    moveInstrumentation(row, accountMainBgBox); // Move instrumentation for the milk panel row

    const annualBgDesktop = document.createElement('div');
    annualBgDesktop.classList.add('annual-background_image--overlay', 'd-flex', 'annual-bg-desktop');
    accountMainBgBox.append(annualBgDesktop);

    const desktopPicture = backgroundDesktopCell.querySelector('picture');
    if (desktopPicture) {
      const img = desktopPicture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        annualBgDesktop.append(optimizedPic);
        optimizedPic.querySelector('img').classList.add('account-bgImg', 'with-overlay');
      }
    }
    const desktopOverlay = document.createElement('div');
    desktopOverlay.classList.add('overlay');
    annualBgDesktop.append(desktopOverlay);

    const annualBgMobile = document.createElement('div');
    annualBgMobile.classList.add('annual-background_image--overlay', 'd-flex', 'annual-bg-mobile');
    accountMainBgBox.append(annualBgMobile);

    const mobilePicture = backgroundMobileCell.querySelector('picture');
    if (mobilePicture) {
      const img = mobilePicture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        annualBgMobile.append(optimizedPic);
        optimizedPic.querySelector('img').classList.add('account-bgImg', 'with-overlay');
      }
    }
    const mobileOverlay = document.createElement('div');
    mobileOverlay.classList.add('overlay');
    annualBgMobile.append(mobileOverlay);

    const rightSubtextMilk = document.createElement('div');
    rightSubtextMilk.classList.add('right-subtext', 'position-absolute', 'start-0', 'end-0', 'bottom-0', 'right-subtext-milk');
    milkSectionImage.append(rightSubtextMilk);

    const milkContent = document.createElement('div');
    milkContent.classList.add('d-flex', 'flex-column', 'align-items-center');
    rightSubtextMilk.append(milkContent);

    const gheeMobileHeadingMilk = document.createElement('div');
    gheeMobileHeadingMilk.classList.add('ghee-mobile-heading', 'text-center', 'font-md-18', 'font-baskerville', 'leading-32');
    // Headline is richtext, so use innerHTML
    gheeMobileHeadingMilk.innerHTML = headlineCell.innerHTML;
    milkContent.append(gheeMobileHeadingMilk);

    const fontMd18Div = document.createElement('div');
    fontMd18Div.classList.add('font-md-18', 'mt-6', 'text-center');
    milkContent.append(fontMd18Div);

    const my9Div = document.createElement('div');
    my9Div.classList.add('my-9');
    milkContent.append(my9Div);

    const ctaIconPicture = ctaIconCell.querySelector('picture');
    if (ctaIconPicture) {
      const img = ctaIconPicture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        my9Div.append(optimizedPic);
      }
    }

    const whatsappLinkDiv = document.createElement('div');
    whatsappLinkDiv.classList.add('Whatsapp-link', 'mb-8', 'text-center');
    milkContent.append(whatsappLinkDiv);

    const whatsappP = document.createElement('p');
    const whatsappLink = whatsappLinkCell.querySelector('a');
    if (whatsappLink) {
      const anchor = document.createElement('a');
      anchor.href = whatsappLink.href; // Read href from aem-content
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';
      anchor.textContent = whatsappLabelCell.textContent.trim();
      const screenReaderSpan = document.createElement('span');
      screenReaderSpan.classList.add('cmp-link__screen-reader-only');
      screenReaderSpan.textContent = 'opens in a new tab';
      anchor.append(screenReaderSpan);
      whatsappP.append('Check Your Milk Report Card on ', anchor);
    }
    whatsappLinkDiv.append(whatsappP);
  });

  // Set initial display states for ghee and milk panels
  if (gheePanels.length > 0) {
    gheeBox.style.display = 'block';
  } else {
    gheeBox.style.display = 'none';
  }
  if (milkPanels.length > 0) {
    // The original JS had this as 'none' twice, assuming it should be hidden initially
    milkSectionImage.style.display = 'none';
  } else {
    milkSectionImage.style.display = 'none';
  }

  block.replaceChildren(root);
}
