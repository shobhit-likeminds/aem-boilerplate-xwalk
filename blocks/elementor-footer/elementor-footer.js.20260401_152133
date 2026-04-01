import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The block structure is:
  // block.children[0]: follow-us (richtext)
  // block.children[1]: logo (reference)
  // block.children[2...N]: item rows (footer-link or social-icon)

  const [followUsRow, logoRow, ...itemRows] = [...block.children];

  const mainContainer = document.createElement('div');
  mainContainer.classList.add('elementor-element', 'elementor-element-fa8725a', 'e-flex', 'e-con-boxed', 'e-con', 'e-parent', 'e-lazyloaded');

  const innerContainer = document.createElement('div');
  innerContainer.classList.add('e-con-inner');
  mainContainer.append(innerContainer);

  // Footer Links Section
  const footerLinksContainer = document.createElement('div');
  footerLinksContainer.classList.add('elementor-element', 'elementor-element-dbd8f1f', 'e-con-full', 'e-flex', 'e-con', 'e-child');
  innerContainer.append(footerLinksContainer);

  // Filter for footer-link items: 2 cells, one of which contains an 'a' tag.
  const footerLinks = itemRows.filter((row) => {
    const cells = [...row.children];
    return cells.length === 2 && cells.some(cell => cell.querySelector('a'));
  });

  footerLinks.forEach((row) => {
    const cells = [...row.children];
    const linkCell = cells.find(cell => cell.querySelector('a'));
    const textCell = cells.find(cell => !cell.querySelector('a')); // Assuming the other cell is text

    if (linkCell && textCell) {
      const linkWrapper = document.createElement('div');
      linkWrapper.classList.add('elementor-element', 'elementor-widget', 'elementor-widget-heading');
      // Original HTML has specific IDs for each link, but we're generating dynamically.
      // For now, we'll use a generic class or omit the ID.
      // Example: elementor-element-7aa018b, elementor-element-4823a3d, elementor-element-e54b1da
      // We can't replicate these specific IDs without more info, so we'll omit them.
      moveInstrumentation(row, linkWrapper);

      const widgetContainer = document.createElement('div');
      widgetContainer.classList.add('elementor-widget-container');
      linkWrapper.append(widgetContainer);

      const heading = document.createElement('h2');
      heading.classList.add('elementor-heading-title', 'elementor-size-default');

      const foundLink = linkCell.querySelector('a');
      const linkEl = document.createElement('a');
      if (foundLink) {
        linkEl.href = foundLink.href;
      }
      moveInstrumentation(linkCell, linkEl);
      // Move all content from linkCell to linkEl
      while (linkCell.firstChild) linkEl.append(linkCell.firstChild);
      heading.append(linkEl);
      widgetContainer.append(heading);
      footerLinksContainer.append(linkWrapper);

      // Check for interactive elements within the footer links (e.g., off-canvas modal)
      // The original HTML shows a "Careers" link that triggers an off-canvas modal.
      // We need to detect this and add an event listener.
      if (foundLink && foundLink.href.includes('action=off_canvas')) {
        const offCanvasId = 'off-canvas-dab152e'; // This ID is from the original HTML for the off-canvas widget
        const offCanvasElement = document.getElementById(offCanvasId);
        if (offCanvasElement) {
          linkEl.addEventListener('click', (e) => {
            e.preventDefault();
            offCanvasElement.classList.add('e-off-canvas--open');
            offCanvasElement.removeAttribute('inert');
            offCanvasElement.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
          });

          // Add event listener to close the off-canvas when clicking overlay or close button (if any)
          const overlay = offCanvasElement.querySelector('.e-off-canvas__overlay');
          if (overlay) {
            overlay.addEventListener('click', () => {
              offCanvasElement.classList.remove('e-off-canvas--open');
              offCanvasElement.setAttribute('inert', '');
              offCanvasElement.setAttribute('aria-hidden', 'true');
              document.body.style.overflow = ''; // Restore scrolling
            });
          }
          // If there's a close button inside the off-canvas content, add listener for that too
          // (not explicitly in the provided HTML, but good practice)
        }
      }
    }
  });

  // Follow Us and Social Icons Section
  const socialContainer = document.createElement('div');
  socialContainer.classList.add('elementor-element', 'elementor-element-e403dbb', 'e-con-full', 'e-flex', 'e-con', 'e-child');
  innerContainer.append(socialContainer);

  if (followUsRow) {
    const followUsWrapper = document.createElement('div');
    followUsWrapper.classList.add('elementor-element', 'elementor-element-3c76dc7', 'elementor-widget', 'elementor-widget-heading');
    moveInstrumentation(followUsRow, followUsWrapper);

    const widgetContainer = document.createElement('div');
    widgetContainer.classList.add('elementor-widget-container');
    followUsWrapper.append(widgetContainer);

    const heading = document.createElement('h2');
    heading.classList.add('elementor-heading-title', 'elementor-size-default');
    while (followUsRow.firstChild) heading.append(followUsRow.firstChild);
    widgetContainer.append(heading);
    socialContainer.append(followUsWrapper);
  }

  // Filter for social-icon items: 3 cells, one of which contains a 'picture' tag.
  const socialIcons = itemRows.filter((row) => {
    const cells = [...row.children];
    return cells.length === 3 && cells.some(cell => cell.querySelector('picture'));
  });

  if (socialIcons.length > 0) {
    const socialIconsWrapper = document.createElement('div');
    socialIconsWrapper.classList.add('elementor-element', 'elementor-element-0744dfb', 'e-grid-align-left', 'elementor-shape-rounded', 'elementor-grid-0', 'elementor-widget', 'elementor-widget-social-icons');

    const widgetContainer = document.createElement('div');
    widgetContainer.classList.add('elementor-widget-container');
    socialIconsWrapper.append(widgetContainer);

    const socialGrid = document.createElement('div');
    socialGrid.classList.add('elementor-social-icons-wrapper', 'elementor-grid');
    socialGrid.setAttribute('role', 'list');
    widgetContainer.append(socialGrid);

    socialIcons.forEach((row) => {
      const cells = [...row.children];
      const linkCell = cells.find(cell => cell.querySelector('a'));
      const iconCell = cells.find(cell => cell.querySelector('picture'));
      const labelCell = cells.find(cell => !cell.querySelector('a') && !cell.querySelector('picture')); // The remaining cell

      if (linkCell && iconCell && labelCell) {
        const gridItem = document.createElement('span');
        gridItem.classList.add('elementor-grid-item');
        gridItem.setAttribute('role', 'listitem');
        moveInstrumentation(row, gridItem);

        const foundLink = linkCell.querySelector('a');
        const linkEl = document.createElement('a');
        if (foundLink) {
          linkEl.href = foundLink.href;
          linkEl.target = '_blank';
        }
        linkEl.classList.add('elementor-icon', 'elementor-social-icon'); // Specific social icon classes added below
        // Add specific social icon class based on label or link content if needed
        const labelText = labelCell.textContent.trim().toLowerCase();
        if (labelText.includes('facebook')) {
          linkEl.classList.add('elementor-social-icon-facebook', 'elementor-repeater-item-894622b');
        } else if (labelText.includes('instagram')) {
          linkEl.classList.add('elementor-social-icon-instagram', 'elementor-repeater-item-4aedf71');
        } else if (labelText.includes('youtube')) {
          linkEl.classList.add('elementor-social-icon-youtube', 'elementor-repeater-item-6d2e1de');
        } else if (labelText.includes('x-twitter')) {
          linkEl.classList.add('elementor-social-icon-x-twitter', 'elementor-repeater-item-1079e6e');
        }

        const screenOnlySpan = document.createElement('span');
        screenOnlySpan.classList.add('elementor-screen-only');
        screenOnlySpan.textContent = labelCell.textContent.trim();
        linkEl.append(screenOnlySpan);

        const img = iconCell.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          linkEl.append(optimizedPic);
        }

        gridItem.append(linkEl);
        socialGrid.append(gridItem);
      }
    });
    socialContainer.append(socialIconsWrapper);
  }

  // Logo Section
  const logoContainer = document.createElement('div');
  logoContainer.classList.add('elementor-element', 'elementor-element-2779fc3', 'e-con-full', 'e-flex', 'e-con', 'e-child');
  innerContainer.append(logoContainer);

  if (logoRow) {
    const logoWrapper = document.createElement('div');
    logoWrapper.classList.add('elementor-element', 'elementor-element-0a043e5', 'elementor-widget', 'elementor-widget-theme-site-logo', 'elementor-widget-image');
    moveInstrumentation(logoRow, logoWrapper);

    const widgetContainer = document.createElement('div');
    widgetContainer.classList.add('elementor-widget-container');
    logoWrapper.append(widgetContainer);

    const foundLink = logoRow.querySelector('a');
    const linkEl = document.createElement('a');
    if (foundLink) {
      linkEl.href = foundLink.href;
    }

    const picture = logoRow.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '503' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        linkEl.append(optimizedPic);
      }
    }
    widgetContainer.append(linkEl);
    logoContainer.append(logoWrapper);
  }

  // Off-canvas modal structure (from original HTML, but needs to be created dynamically if not present)
  // This part is tricky because the off-canvas is a widget itself, not directly part of the block's content.
  // We'll create a placeholder for it if it's not already in the DOM.
  let offCanvasElement = document.getElementById('off-canvas-dab152e');
  if (!offCanvasElement) {
    offCanvasElement = document.createElement('div');
    offCanvasElement.id = 'off-canvas-dab152e';
    offCanvasElement.classList.add('e-off-canvas');
    offCanvasElement.setAttribute('role', 'dialog');
    offCanvasElement.setAttribute('aria-hidden', 'true');
    offCanvasElement.setAttribute('aria-label', 'Redirection Notice');
    offCanvasElement.setAttribute('aria-modal', 'true');
    offCanvasElement.setAttribute('inert', ''); // Initially inert

    offCanvasElement.innerHTML = `
      <div class="e-off-canvas__overlay"></div>
      <div class="e-off-canvas__main">
        <div class="e-off-canvas__content">
          <div class="elementor-element elementor-element-e348ddb e-con-full e-flex e-con e-child" data-id="e348ddb" data-element_type="container">
            <!-- Content for the off-canvas modal goes here -->
            <div class="elementor-widget-container">
              <h2 class="elementor-heading-title elementor-size-default">Redirection Notice</h2>
              <p>You are about to leave our site.</p>
              <button class="e-off-canvas__close-button">Close</button>
            </div>
          </div>
        </div>
      </div>
    `;
    // Append to body or a suitable container
    document.body.append(offCanvasElement);

    // Add event listener to close the off-canvas when clicking overlay or close button
    const overlay = offCanvasElement.querySelector('.e-off-canvas__overlay');
    if (overlay) {
      overlay.addEventListener('click', () => {
        offCanvasElement.classList.remove('e-off-canvas--open');
        offCanvasElement.setAttribute('inert', '');
        offCanvasElement.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // Restore scrolling
      });
    }
    const closeButton = offCanvasElement.querySelector('.e-off-canvas__close-button');
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        offCanvasElement.classList.remove('e-off-canvas--open');
        offCanvasElement.setAttribute('inert', '');
        offCanvasElement.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // Restore scrolling
      });
    }
  }


  block.textContent = '';
  block.classList.add('elementor', 'elementor-40', 'elementor-location-footer');
  block.append(mainContainer);
}
