import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // BlockJson defines 2 root fields: "heading" and "brands" (a container).
  // The EDS block structure shows:
  // block.children[0] is the heading row.
  // block.children[1] is the brands container row (which is empty in the EDS structure, but acts as a separator).
  // block.children[2...] are the actual brand item rows.
  const [headingRow, brandsContainerRow, ...brandRows] = [...block.children];

  const mainContainer = document.createElement('div');
  mainContainer.classList.add('elementor-element', 'elementor-element-b3f206c', 'e-flex', 'e-con-boxed', 'e-con', 'e-parent', 'e-lazyloaded');

  const innerContainer = document.createElement('div');
  innerContainer.classList.add('e-con-inner');
  mainContainer.append(innerContainer);

  // Heading
  if (headingRow) {
    const headingWrapper = document.createElement('div');
    headingWrapper.classList.add('elementor-element', 'elementor-element-424a061', 'e-con-full', 'e-flex', 'e-con', 'e-child');
    moveInstrumentation(headingRow, headingWrapper);

    const headingWidget = document.createElement('div');
    headingWidget.classList.add('elementor-element', 'elementor-element-2346d0a', 'elementor-widget', 'elementor-widget-heading');
    headingWrapper.append(headingWidget);

    const heading = document.createElement('h2');
    heading.classList.add('elementor-heading-title', 'elementor-size-default');
    // The heading value is in the first cell of the headingRow
    const headingCell = headingRow.firstElementChild;
    if (headingCell) {
      while (headingCell.firstChild) heading.append(headingCell.firstChild);
    }
    headingWidget.append(heading);
    innerContainer.append(headingWrapper);
  }

  // Brands
  brandRows.forEach((row, rowIndex) => {
    const brandContainer = document.createElement('div');
    // Dynamically assign elementor-element-ID based on original HTML pattern
    // Original HTML has c91966a, 71ba5c1, 50cff40 etc. for each brand container.
    // We can't replicate these exact IDs, but we can ensure the class structure is correct.
    // For now, we'll omit specific IDs as they are not functional and are unique to the original page.
    // If specific IDs are required for styling, they would need to be passed from the model.
    brandContainer.classList.add('elementor-element', `elementor-element-${(rowIndex + 1).toString(16)}`, 'e-con-full', 'e-flex', 'e-con', 'e-child');
    moveInstrumentation(row, brandContainer);

    // BlockJson for 'brand' model has 4 fields: logo, link, button-text, side-image
    const [logoCell, linkCell, buttonTextCell, sideImageCell] = [...row.children];

    // Logo
    if (logoCell) {
      const logoWrapper = document.createElement('div');
      logoWrapper.classList.add('elementor-element', `elementor-element-${(rowIndex + 1).toString(16)}a`, 'elementor-widget', 'elementor-widget-image');
      moveInstrumentation(logoCell, logoWrapper);
      const picture = logoCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '1080' }]);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          logoWrapper.append(optimizedPic);
        }
      }
      brandContainer.append(logoWrapper);
    }

    // Button
    if (linkCell && buttonTextCell) {
      const buttonWrapper = document.createElement('div');
      buttonWrapper.classList.add('elementor-element', `elementor-element-${(rowIndex + 1).toString(16)}b`, 'elementor-align-center', 'elementor-widget', 'elementor-widget-button');
      moveInstrumentation(linkCell, buttonWrapper);
      moveInstrumentation(buttonTextCell, buttonWrapper);

      const linkEl = document.createElement('a');
      linkEl.classList.add('elementor-button', 'elementor-button-link', 'elementor-size-sm');
      const foundLink = linkCell.querySelector('a');
      if (foundLink) {
        linkEl.href = foundLink.href;
        linkEl.target = '_blank';
      }

      const contentWrapper = document.createElement('span');
      contentWrapper.classList.add('elementor-button-content-wrapper');
      linkEl.append(contentWrapper);

      const buttonTextSpan = document.createElement('span');
      buttonTextSpan.classList.add('elementor-button-text');
      buttonTextSpan.textContent = buttonTextCell.textContent.trim();
      contentWrapper.append(buttonTextSpan);

      buttonWrapper.append(linkEl);
      brandContainer.append(buttonWrapper);
    }

    // Side Image
    if (sideImageCell) {
      const sideImageWrapper = document.createElement('div');
      sideImageWrapper.classList.add('elementor-element', `elementor-element-${(rowIndex + 1).toString(16)}c`, 'elementor-widget', 'elementor-widget-image');
      moveInstrumentation(sideImageCell, sideImageWrapper);
      const picture = sideImageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '1080' }]);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          sideImageWrapper.append(optimizedPic);
        }
      }
      brandContainer.append(sideImageWrapper);
    }

    innerContainer.append(brandContainer);
  });

  block.textContent = '';
  block.append(mainContainer);
}
