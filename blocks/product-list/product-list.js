import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('elementor-widget-container');

  const loopContainer = document.createElement('div');
  loopContainer.classList.add('elementor-loop-container', 'elementor-grid');
  loopContainer.setAttribute('role', 'list');

  [...block.children].forEach((row) => {
    const productItem = document.createElement('div');
    moveInstrumentation(row, productItem);
    productItem.classList.add('elementor', 'elementor-85', 'e-loop-item', 'product', 'type-product', 'status-publish', 'has-post-thumbnail', 'instock', 'shipping-taxable', 'purchasable', 'product-type-simple');

    const productContainer = document.createElement('div');
    productContainer.classList.add('elementor-element', 'elementor-element-dc6b024', 'e-flex', 'e-con-boxed', 'e-con', 'e-parent', 'e-lazyloaded');

    const innerContainer = document.createElement('div');
    innerContainer.classList.add('e-con-inner');

    const contentContainer = document.createElement('div');
    contentContainer.classList.add('elementor-element', 'elementor-element-bcbf0be', 'e-con-full', 'e-flex', 'e-con', 'e-child');

    let imageCell;
    let titleCell;
    let productLinkCell;

    [...row.children].forEach((cell) => {
      if (cell.querySelector('picture')) {
        imageCell = cell;
      } else if (cell.querySelector('a')) {
        productLinkCell = cell;
      } else {
        titleCell = cell;
      }
    });

    if (imageCell) {
      const imageWidget = document.createElement('div');
      imageWidget.classList.add('elementor-element', 'elementor-element-bcab75b', 'plp-image', 'dce_masking-none', 'elementor-widget', 'elementor-widget-image');
      const imageWidgetContainer = document.createElement('div');
      imageWidgetContainer.classList.add('elementor-widget-container');

      const productLink = productLinkCell ? productLinkCell.querySelector('a') : null;
      const imageLink = document.createElement('a');
      if (productLink) {
        imageLink.href = productLink.href;
      }

      const picture = imageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '1500' }]);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          imageLink.append(optimizedPic);
        }
      }
      imageWidgetContainer.append(imageLink);
      imageWidget.append(imageWidgetContainer);
      contentContainer.append(imageWidget);
    }

    if (titleCell) {
      const iconBoxWidget = document.createElement('div');
      iconBoxWidget.classList.add('elementor-element', 'elementor-element-9468107', 'elementor-widget', 'elementor-widget-icon-box');
      const iconBoxWidgetContainer = document.createElement('div');
      iconBoxWidgetContainer.classList.add('elementor-widget-container');
      const iconBoxWrapper = document.createElement('div');
      iconBoxWrapper.classList.add('elementor-icon-box-wrapper');
      const iconBoxContent = document.createElement('div');
      iconBoxContent.classList.add('elementor-icon-box-content');
      const titleElement = document.createElement('h3');
      titleElement.classList.add('elementor-icon-box-title');
      const titleSpan = document.createElement('span');
      titleSpan.textContent = titleCell.textContent.trim();
      titleElement.append(titleSpan);
      iconBoxContent.append(titleElement);
      iconBoxWrapper.append(iconBoxContent);
      iconBoxWidgetContainer.append(iconBoxWrapper);
      iconBoxWidget.append(iconBoxWidgetContainer);
      contentContainer.append(iconBoxWidget);
    }

    innerContainer.append(contentContainer);

    if (productLinkCell) {
      const buttonWidget = document.createElement('div');
      buttonWidget.classList.add('elementor-element', 'elementor-element-597d13a', 'elementor-align-center', 'elementor-mobile-align-center', 'elementor-tablet-align-center', 'elementor-widget', 'elementor-widget-button');
      const buttonWidgetContainer = document.createElement('div');
      buttonWidgetContainer.classList.add('elementor-widget-container');
      const buttonWrapper = document.createElement('div');
      buttonWrapper.classList.add('elementor-button-wrapper');
      const link = productLinkCell.querySelector('a');
      const buttonLink = document.createElement('a');
      buttonLink.classList.add('elementor-button', 'elementor-button-link', 'elementor-size-sm');
      if (link) {
        buttonLink.href = link.href;
        const buttonContentWrapper = document.createElement('span');
        buttonContentWrapper.classList.add('elementor-button-content-wrapper');
        const buttonText = document.createElement('span');
        buttonText.classList.add('elementor-button-text');
        buttonText.textContent = link.textContent.trim();
        buttonContentWrapper.append(buttonText);
        buttonLink.append(buttonContentWrapper);
      }
      buttonWrapper.append(buttonLink);
      buttonWidgetContainer.append(buttonWrapper);
      buttonWidget.append(buttonWidgetContainer);
      innerContainer.append(buttonWidget);
    }

    productContainer.append(innerContainer);
    productItem.append(productContainer);
    loopContainer.append(productItem);
  });

  wrapper.append(loopContainer);
  block.textContent = '';
  block.append(wrapper);
}
