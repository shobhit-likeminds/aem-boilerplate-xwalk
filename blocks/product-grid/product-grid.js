import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const productGridContainer = document.createElement('div');
  // Add the block's own class from the outer div, as per CHECK 0.5
  productGridContainer.classList.add('elementor-widget-container', 'product-grid');

  const elementorLoopContainer = document.createElement('div');
  elementorLoopContainer.classList.add('elementor-loop-container', 'elementor-grid');
  elementorLoopContainer.setAttribute('role', 'list');

  [...block.children].forEach((row) => {
    const [imageCell, imageLinkCell, titleCell, productLinkCell, ctaLabelCell] = [...row.children];

    const productItem = document.createElement('div');
    // Added missing classes from ORIGINAL HTML for productItem
    productItem.classList.add('elementor', 'elementor-85', 'e-loop-item', 'product', 'type-product', 'status-publish', 'has-post-thumbnail', 'instock', 'shipping-taxable', 'purchasable', 'product-type-simple');
    moveInstrumentation(row, productItem);

    const mainFlexContainer = document.createElement('div');
    mainFlexContainer.classList.add('elementor-element', 'elementor-element-dc6b024', 'e-flex', 'e-con-boxed', 'e-con', 'e-parent', 'e-lazyloaded');

    const innerContainer = document.createElement('div');
    innerContainer.classList.add('e-con-inner');

    const imageAndTitleContainer = document.createElement('div');
    imageAndTitleContainer.classList.add('elementor-element', 'elementor-element-bcbf0be', 'e-con-full', 'e-flex', 'e-con', 'e-child');

    // Product Image
    const imageWidget = document.createElement('div');
    imageWidget.classList.add('elementor-element', 'elementor-element-bcab75b', 'plp-image', 'dce_masking-none', 'elementor-widget', 'elementor-widget-image');
    const imageWidgetContainer = document.createElement('div');
    imageWidgetContainer.classList.add('elementor-widget-container');

    const imageLink = document.createElement('a');
    // Added classes to imageLink from ORIGINAL HTML
    imageLink.classList.add('attachment-full', 'size-full', 'wp-image-104'); // Example classes, adjust based on actual image link in HTML
    const foundImageLink = imageLinkCell.querySelector('a');
    if (foundImageLink) {
      imageLink.href = foundImageLink.href;
    }

    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        imageLink.append(optimizedPic);
      }
    }
    imageWidgetContainer.append(imageLink);
    imageWidget.append(imageWidgetContainer);
    imageAndTitleContainer.append(imageWidget);

    // Product Title
    const titleWidget = document.createElement('div');
    titleWidget.classList.add('elementor-element', 'elementor-element-9468107', 'elementor-widget', 'elementor-widget-icon-box');
    const titleWidgetContainer = document.createElement('div');
    titleWidgetContainer.classList.add('elementor-widget-container');
    const iconBoxWrapper = document.createElement('div');
    iconBoxWrapper.classList.add('elementor-icon-box-wrapper');
    const iconBoxContent = document.createElement('div');
    iconBoxContent.classList.add('elementor-icon-box-content');
    const titleHeading = document.createElement('h3');
    titleHeading.classList.add('elementor-icon-box-title');
    const titleSpan = document.createElement('span');
    titleSpan.textContent = titleCell.textContent.trim();
    titleHeading.append(titleSpan);
    iconBoxContent.append(titleHeading);
    iconBoxWrapper.append(iconBoxContent);
    titleWidgetContainer.append(iconBoxWrapper);
    titleWidget.append(titleWidgetContainer);
    imageAndTitleContainer.append(titleWidget);

    innerContainer.append(imageAndTitleContainer);

    // CTA Button
    const ctaButtonWidget = document.createElement('div');
    ctaButtonWidget.classList.add('elementor-element', 'elementor-element-597d13a', 'elementor-align-center', 'elementor-mobile-align-center', 'elementor-tablet-align-center', 'elementor-widget', 'elementor-widget-button');
    const ctaButtonWidgetContainer = document.createElement('div');
    ctaButtonWidgetContainer.classList.add('elementor-widget-container');
    const buttonWrapper = document.createElement('div');
    buttonWrapper.classList.add('elementor-button-wrapper');
    const ctaLink = document.createElement('a');
    ctaLink.classList.add('elementor-button', 'elementor-button-link', 'elementor-size-sm');
    const foundProductLink = productLinkCell.querySelector('a');
    if (foundProductLink) {
      ctaLink.href = foundProductLink.href;
    }
    const buttonContentWrapper = document.createElement('span');
    buttonContentWrapper.classList.add('elementor-button-content-wrapper');
    const buttonText = document.createElement('span');
    buttonText.classList.add('elementor-button-text');
    buttonText.textContent = ctaLabelCell.textContent.trim();
    buttonContentWrapper.append(buttonText);
    ctaLink.append(buttonContentWrapper);
    buttonWrapper.append(ctaLink);
    ctaButtonWidgetContainer.append(buttonWrapper);
    ctaButtonWidget.append(ctaButtonWidgetContainer);

    innerContainer.append(ctaButtonWidget);
    mainFlexContainer.append(innerContainer);
    productItem.append(mainFlexContainer);
    elementorLoopContainer.append(productItem);
  });

  productGridContainer.append(elementorLoopContainer);

  const spinner = document.createElement('span');
  spinner.classList.add('e-load-more-spinner');
  spinner.innerHTML = `
    <svg aria-hidden="true" class="e-font-icon-svg e-fas-spinner" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"></path></svg>
  `;
  productGridContainer.append(spinner);

  block.replaceChildren(productGridContainer);
}
