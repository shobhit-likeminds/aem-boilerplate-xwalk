import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainContainer = document.createElement('div');
  mainContainer.classList.add('elementor-element', 'elementor-element-2975444', 'e-flex', 'e-con-boxed', 'e-con', 'e-parent', 'e-lazyloaded');

  const innerContainer = document.createElement('div');
  innerContainer.classList.add('e-con-inner');
  mainContainer.append(innerContainer);

  [...block.children].forEach((row) => {
    // Each row represents an 'about-us-cta-item' with 4 cells: Heading, Description, Link, Image
    const cells = [...row.children];
    if (cells.length !== 4) {
      // eslint-disable-next-line no-console
      console.warn('About Us CTA block expects 4 cells per row, but found', cells.length);
      return;
    }

    const contentContainer = document.createElement('div');
    contentContainer.classList.add('elementor-element', 'elementor-element-b354155', 'e-con-full', 'e-flex', 'e-con', 'e-child');

    const ctaWidget = document.createElement('div');
    ctaWidget.classList.add('elementor-element', 'elementor-element-9eee8e1', 'elementor-cta--layout-image-right', 'elementor-cta--skin-classic', 'elementor-animated-content', 'elementor-widget', 'elementor-widget-call-to-action');
    contentContainer.append(ctaWidget);

    const cta = document.createElement('div');
    cta.classList.add('elementor-cta');
    ctaWidget.append(cta);

    const ctaContent = document.createElement('div');
    ctaContent.classList.add('elementor-cta__content');
    cta.append(ctaContent);

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('elementor-element', 'elementor-element-1fa2410', 'e-con-full', 'e-flex', 'e-con', 'e-child');

    const imageWidget = document.createElement('div');
    imageWidget.classList.add('elementor-element', 'elementor-element-98e8508', 'elementor-widget', 'elementor-widget-image');
    imageContainer.append(imageWidget);

    // Cell 0: Heading
    const headingCell = cells[0];
    const title = document.createElement('h2');
    title.classList.add('elementor-cta__title', 'elementor-cta__content-item', 'elementor-content-item');
    moveInstrumentation(headingCell, title);
    while (headingCell.firstChild) title.append(headingCell.firstChild);
    ctaContent.append(title);

    // Cell 1: Description
    const descriptionCell = cells[1];
    const description = document.createElement('div');
    description.classList.add('elementor-cta__description', 'elementor-cta__content-item', 'elementor-content-item');
    moveInstrumentation(descriptionCell, description);
    while (descriptionCell.firstChild) description.append(descriptionCell.firstChild);
    ctaContent.append(description);

    // Cell 2: Link
    const linkCell = cells[2];
    const linkWrapper = document.createElement('div');
    linkWrapper.classList.add('elementor-cta__button-wrapper', 'elementor-cta__content-item', 'elementor-content-item');
    const link = linkCell.querySelector('a');
    if (link) {
      const ctaButton = document.createElement('a');
      ctaButton.classList.add('elementor-cta__button', 'elementor-button', 'elementor-size-');
      ctaButton.href = link.href;
      moveInstrumentation(link, ctaButton);
      while (link.firstChild) ctaButton.append(link.firstChild);
      linkWrapper.append(ctaButton);
    }
    ctaContent.append(linkWrapper);

    // Cell 3: Image
    const imageCell = cells[3];
    const picture = imageCell.querySelector('picture');
    if (picture) {
      moveInstrumentation(imageCell, imageWidget);
      imageWidget.append(picture);
    }

    innerContainer.append(contentContainer, imageContainer);
  });

  mainContainer.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(mainContainer);
}
