import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [imageRow, headingRow, breadcrumbRow] = [...block.children];

  block.textContent = '';
  block.classList.add('elementor', 'elementor-30', 'e-con-full', 'e-flex', 'e-con', 'e-parent', 'e-lazyloaded');

  // Image
  if (imageRow) {
    const imageContainer = document.createElement('div');
    moveInstrumentation(imageRow, imageContainer);
    imageContainer.classList.add('elementor-element', 'elementor-element-07c6b9c', 'dce_masking-none', 'elementor-widget', 'elementor-widget-image');

    const widgetContainer = document.createElement('div');
    widgetContainer.classList.add('elementor-widget-container');

    const picture = imageRow.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '1920' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        widgetContainer.append(optimizedPic);
      }
    }
    imageContainer.append(widgetContainer);
    block.append(imageContainer);
  }

  // Heading
  if (headingRow) {
    const headingContainer = document.createElement('div');
    moveInstrumentation(headingRow, headingContainer);
    headingContainer.classList.add('elementor-element', 'elementor-element-cbf9496', 'elementor-widget', 'elementor-widget-theme-archive-title', 'elementor-page-title', 'elementor-widget-heading');

    const widgetContainer = document.createElement('div');
    widgetContainer.classList.add('elementor-widget-container');

    const h1 = document.createElement('h1');
    h1.classList.add('elementor-heading-title', 'elementor-size-default');
    while (headingRow.firstChild) h1.append(headingRow.firstChild);
    widgetContainer.append(h1);
    headingContainer.append(widgetContainer);
    block.append(headingContainer);
  }

  // Breadcrumb
  if (breadcrumbRow) {
    const breadcrumbContainer = document.createElement('div');
    moveInstrumentation(breadcrumbRow, breadcrumbContainer);
    breadcrumbContainer.classList.add('elementor-element', 'elementor-element-f87ddb8', 'elementor-widget', 'elementor-widget-woocommerce-breadcrumb');

    const widgetContainer = document.createElement('div');
    widgetContainer.classList.add('elementor-widget-container');

    const nav = document.createElement('nav');
    nav.classList.add('woocommerce-breadcrumb');
    nav.setAttribute('aria-label', 'Breadcrumb');

    const link = breadcrumbRow.querySelector('a');
    if (link) {
      const homeLink = document.createElement('a');
      homeLink.href = 'https://natarajofficial.com'; // Hardcoded as per original HTML
      homeLink.textContent = 'Home';
      nav.append(homeLink);
      nav.append(document.createTextNode('\u00A0/\u00A0')); // Non-breaking space and slash

      const currentItem = document.createTextNode(link.textContent);
      nav.append(currentItem);
    }
    
    widgetContainer.append(nav);
    breadcrumbContainer.append(widgetContainer);
    block.append(breadcrumbContainer);
  }
}
