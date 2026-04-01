import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // CRITICAL: Add page ID classes to the block root element
  block.classList.add('elementor', 'elementor-30');

  const productListContainer = document.createElement('div');
  productListContainer.classList.add('elementor-loop-container', 'elementor-grid');
  productListContainer.setAttribute('role', 'list');

  // Find the search input element from the original HTML
  const searchInput = block.querySelector('.e-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (event) => {
      // Implement search filtering logic here
      const searchTerm = event.target.value.toLowerCase();
      const productItems = productListContainer.querySelectorAll('.e-loop-item');
      productItems.forEach((item) => {
        const titleElement = item.querySelector('.elementor-icon-box-title span');
        const titleText = titleElement ? titleElement.textContent.toLowerCase() : '';
        if (titleText.includes(searchTerm)) {
          item.style.display = ''; // Show item
        } else {
          item.style.display = 'none'; // Hide item
        }
      });
    });
  }

  [...block.children].forEach((row) => {
    const productItem = document.createElement('div');
    moveInstrumentation(row, productItem);
    productItem.classList.add(
      'elementor',
      'elementor-85',
      'e-loop-item',
      // The following classes change per item in original HTML,
      // so they should not be hardcoded.
      // 'e-loop-item-94',
      // 'post-94',
      'product',
      'type-product',
      'status-publish',
      'has-post-thumbnail',
      // These product_brand/cat/tag classes also vary per item.
      // For now, we'll omit them as they are not consistently applied
      // across all items in the provided HTML structure.
      // 'product_brand-nataraj',
      // 'product_cat-pencils',
      // 'product_tag-pre-school',
      // 'product_tag-school',
      // 'first',
      'instock',
      'shipping-taxable',
      'purchasable',
      'product-type-simple'
    );
    productItem.setAttribute('data-elementor-type', 'loop-item');
    productItem.setAttribute('data-elementor-id', '85');
    productItem.setAttribute('data-elementor-post-type', 'elementor_library');
    productItem.setAttribute('data-custom-edit-handle', '1');

    const productInnerContainer = document.createElement('div');
    productInnerContainer.classList.add(
      'elementor-element',
      'elementor-element-dc6b024',
      'e-flex',
      'e-con-boxed',
      'e-con',
      'e-parent',
      'e-lazyloaded'
    );
    productInnerContainer.setAttribute('data-id', 'dc6b024');
    productInnerContainer.setAttribute('data-element_type', 'container');

    const eConInner = document.createElement('div');
    eConInner.classList.add('e-con-inner');

    const imageAndTitleContainer = document.createElement('div');
    imageAndTitleContainer.classList.add(
      'elementor-element',
      'elementor-element-bcbf0be',
      'e-con-full',
      'e-flex',
      'e-con',
      'e-child'
    );
    imageAndTitleContainer.setAttribute('data-id', 'bcbf0be');
    imageAndTitleContainer.setAttribute('data-element_type', 'container');

    let imageCell;
    let titleCell;
    let linkCell;

    // Corrected cell detection for robustness
    const cells = [...row.children];
    imageCell = cells.find(cell => cell.querySelector('picture'));
    titleCell = cells.find(cell => !cell.querySelector('picture') && !cell.querySelector('a'));
    linkCell = cells.find(cell => cell.querySelector('a') && cell !== imageCell); // Link cell should not be the image cell if it contains a link

    if (imageCell) {
      const imageWrapper = document.createElement('div');
      imageWrapper.classList.add(
        'elementor-element',
        'elementor-element-bcab75b',
        'plp-image',
        'dce_masking-none',
        'elementor-widget',
        'elementor-widget-image'
      );
      imageWrapper.setAttribute('data-id', 'bcab75b');
      imageWrapper.setAttribute('data-element_type', 'widget');
      imageWrapper.setAttribute('data-widget_type', 'image.default');

      const imageWidgetContainer = document.createElement('div');
      imageWidgetContainer.classList.add('elementor-widget-container');

      const imageLink = imageCell.querySelector('a') || document.createElement('a');
      const img = imageCell.querySelector('picture > img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '1500' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        imageLink.append(optimizedPic);
      }
      // Ensure imageLink href is set from the image cell's link or the separate link cell
      if (!imageLink.href || imageLink.href === window.location.href) { // Check if href is empty or default
        const foundLink = imageCell.querySelector('a') || (linkCell ? linkCell.querySelector('a') : null);
        if (foundLink) {
          imageLink.href = foundLink.href;
        }
      }

      imageWrapper.append(imageWidgetContainer);
      imageWidgetContainer.append(imageLink);
      imageAndTitleContainer.append(imageWrapper);
    }

    if (titleCell) {
      const titleWrapper = document.createElement('div');
      titleWrapper.classList.add(
        'elementor-element',
        'elementor-element-9468107',
        'elementor-widget',
        'elementor-widget-icon-box'
      );
      titleWrapper.setAttribute('data-id', '9468107');
      titleWrapper.setAttribute('data-element_type', 'widget');
      titleWrapper.setAttribute('data-widget_type', 'icon-box.default');

      const titleWidgetContainer = document.createElement('div');
      titleWidgetContainer.classList.add('elementor-widget-container');

      const iconBoxWrapper = document.createElement('div');
      iconBoxWrapper.classList.add('elementor-icon-box-wrapper');

      const iconBoxContent = document.createElement('div');
      iconBoxContent.classList.add('elementor-icon-box-content');

      const titleElement = document.createElement('h3');
      titleElement.classList.add('elementor-icon-box-title');
      const titleSpan = document.createElement('span');
      moveInstrumentation(titleCell, titleSpan);
      while (titleCell.firstChild) titleSpan.append(titleCell.firstChild);
      titleElement.append(titleSpan);

      iconBoxContent.append(titleElement);
      iconBoxWrapper.append(iconBoxContent);
      titleWidgetContainer.append(iconBoxWrapper);
      titleWrapper.append(titleWidgetContainer);
      imageAndTitleContainer.append(titleWrapper);
    }

    eConInner.append(imageAndTitleContainer);

    if (linkCell) {
      const buttonWrapper = document.createElement('div');
      buttonWrapper.classList.add(
        'elementor-element',
        'elementor-element-597d13a',
        'elementor-align-center',
        'elementor-mobile-align-center',
        'elementor-tablet-align-center',
        'elementor-widget',
        'elementor-widget-button'
      );
      buttonWrapper.setAttribute('data-id', '597d13a');
      buttonWrapper.setAttribute('data-element_type', 'widget');
      buttonWrapper.setAttribute('data-widget_type', 'button.default');

      const buttonWidgetContainer = document.createElement('div');
      buttonWidgetContainer.classList.add('elementor-widget-container');

      const elementorButtonWrapper = document.createElement('div');
      elementorButtonWrapper.classList.add('elementor-button-wrapper');

      const linkElement = document.createElement('a');
      linkElement.classList.add(
        'elementor-button',
        'elementor-button-link',
        'elementor-size-sm'
      );
      const foundLink = linkCell.querySelector('a');
      if (foundLink) {
        linkElement.href = foundLink.href;
        const buttonContentWrapper = document.createElement('span');
        buttonContentWrapper.classList.add('elementor-button-content-wrapper');
        const buttonText = document.createElement('span');
        buttonText.classList.add('elementor-button-text');
        moveInstrumentation(linkCell, buttonText);
        while (linkCell.firstChild) buttonText.append(linkCell.firstChild);
        buttonContentWrapper.append(buttonText);
        linkElement.append(buttonContentWrapper);
      }

      elementorButtonWrapper.append(linkElement);
      buttonWidgetContainer.append(elementorButtonWrapper);
      buttonWrapper.append(buttonWidgetContainer);
      eConInner.append(buttonWrapper);
    }

    productInnerContainer.append(eConInner);
    productItem.append(productInnerContainer);
    productListContainer.append(productItem);
  });

  block.textContent = '';
  block.append(productListContainer);
}
