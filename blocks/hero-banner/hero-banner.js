import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [backgroundImageRow, headlineRow, breadcrumbRow] = [...block.children];

  const root = document.createElement('div');
  root.classList.add('elementor-element', 'elementor-element-7a30379', 'e-con-full', 'e-flex', 'e-con', 'e-parent', 'e-lazyloaded');

  // Background Image
  // backgroundImageRow is a row, its first child is the cell
  const backgroundImageCell = backgroundImageRow.children[0];
  if (backgroundImageCell) {
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('elementor-element', 'elementor-element-07c6b9c', 'dce_masking-none', 'elementor-widget', 'elementor-widget-image');
    moveInstrumentation(backgroundImageRow, imageContainer);

    const widgetContainer = document.createElement('div');
    widgetContainer.classList.add('elementor-widget-container');

    const picture = backgroundImageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '1920' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        widgetContainer.append(optimizedPic);
      }
    }
    imageContainer.append(widgetContainer);
    root.append(imageContainer);
  }

  // Headline
  // headlineRow is a row, its first child is the cell
  const headlineCell = headlineRow.children[0];
  if (headlineCell) {
    const headlineContainer = document.createElement('div');
    headlineContainer.classList.add('elementor-element', 'elementor-element-cbf9496', 'elementor-widget', 'elementor-widget-theme-archive-title', 'elementor-page-title', 'elementor-widget-heading');
    moveInstrumentation(headlineRow, headlineContainer);

    const widgetContainer = document.createElement('div');
    widgetContainer.classList.add('elementor-widget-container');

    const h1 = document.createElement('h1');
    h1.classList.add('elementor-heading-title', 'elementor-size-default');
    h1.textContent = headlineCell.textContent.trim();
    widgetContainer.append(h1);
    headlineContainer.append(widgetContainer);
    root.append(headlineContainer);
  }

  // Breadcrumb Navigation
  // breadcrumbRow is a row, its first child is the cell
  const breadcrumbCell = breadcrumbRow.children[0];
  if (breadcrumbCell) {
    const breadcrumbContainer = document.createElement('div');
    breadcrumbContainer.classList.add('elementor-element', 'elementor-element-f87ddb8', 'elementor-widget', 'elementor-widget-woocommerce-breadcrumb');
    moveInstrumentation(breadcrumbRow, breadcrumbContainer);

    const widgetContainer = document.createElement('div');
    widgetContainer.classList.add('elementor-widget-container');

    const nav = document.createElement('nav');
    nav.classList.add('woocommerce-breadcrumb');
    nav.setAttribute('aria-label', 'Breadcrumb');
    // FIX: Richtext cells do not have an inner div wrapper, read innerHTML directly from the cell.
    nav.innerHTML = breadcrumbCell.innerHTML;
    widgetContainer.append(nav);
    breadcrumbContainer.append(widgetContainer);
    root.append(breadcrumbContainer);
  }

  block.replaceChildren(root);
}
