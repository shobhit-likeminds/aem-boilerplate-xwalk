import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Destructure the block children based on the EDS BLOCK STRUCTURE
  // block.children[0]: field="follow-us-heading"
  // block.children[1]: field="site-logo"
  // Remaining children are item rows for "footer-links" and "social-icons"
  const [followUsHeadingRow, siteLogoRow, ...itemRows] = [...block.children];

  const mainContainer = document.createElement('div');
  mainContainer.classList.add('elementor-element', 'elementor-element-fa8725a', 'e-flex', 'e-con-boxed', 'e-con', 'e-parent', 'e-lazyloaded');

  const innerContainer = document.createElement('div');
  innerContainer.classList.add('e-con-inner');
  mainContainer.append(innerContainer);

  // Footer Links Section
  const footerLinksContainer = document.createElement('div');
  footerLinksContainer.classList.add('elementor-element', 'elementor-element-dbd8f1f', 'e-con-full', 'e-flex', 'e-con', 'e-child');
  innerContainer.append(footerLinksContainer);

  // Filter itemRows for footer links (2 cells: label, url)
  const footerLinks = itemRows.filter((row) => row.children.length === 2);
  footerLinks.forEach((row) => {
    const linkWrapper = document.createElement('div');
    linkWrapper.classList.add('elementor-element', 'elementor-widget', 'elementor-widget-heading');
    moveInstrumentation(row, linkWrapper);

    const widgetContainer = document.createElement('div');
    widgetContainer.classList.add('elementor-widget-container');
    linkWrapper.append(widgetContainer);

    const heading = document.createElement('h2');
    heading.classList.add('elementor-heading-title', 'elementor-size-default');
    widgetContainer.append(heading);

    // Use content detection instead of row.children[n]
    const labelCell = [...row.children].find(cell => !cell.querySelector('a'));
    const urlCell = [...row.children].find(cell => cell.querySelector('a'));

    if (urlCell) {
      const link = urlCell.querySelector('a');
      if (link) {
        const newLink = document.createElement('a');
        newLink.href = link.href;
        moveInstrumentation(urlCell, newLink);
        // Append content from the label cell to the new link
        if (labelCell) {
          while (labelCell.firstChild) newLink.append(labelCell.firstChild);
        }
        heading.append(newLink);

        // Check for off-canvas action and add event listener
        if (newLink.href.includes('#elementor-action:action=off_canvas')) {
          const offCanvasId = newLink.href.match(/id%22%3A%22([a-f0-9]+)%22/)?.[1];
          if (offCanvasId) {
            const offCanvasElement = document.getElementById(`off-canvas-${offCanvasId}`);
            if (offCanvasElement) {
              newLink.addEventListener('click', (e) => {
                e.preventDefault();
                offCanvasElement.toggleAttribute('inert');
                offCanvasElement.setAttribute('aria-hidden', offCanvasElement.hasAttribute('inert'));
                offCanvasElement.classList.toggle('e-off-canvas--is-open'); // Assuming this class controls visibility
              });
            }
          }
        }
      }
    } else if (labelCell) {
      moveInstrumentation(labelCell, heading);
      while (labelCell.firstChild) heading.append(labelCell.firstChild);
    }

    footerLinksContainer.append(linkWrapper);
  });

  // Follow Us and Social Icons Section
  const socialSectionContainer = document.createElement('div');
  socialSectionContainer.classList.add('elementor-element', 'elementor-element-e403dbb', 'e-con-full', 'e-flex', 'e-con', 'e-child');
  innerContainer.append(socialSectionContainer);

  // Follow Us Heading
  const followUsHeadingWrapper = document.createElement('div');
  followUsHeadingWrapper.classList.add('elementor-element', 'elementor-element-3c76dc7', 'elementor-widget', 'elementor-widget-heading');
  moveInstrumentation(followUsHeadingRow, followUsHeadingWrapper);

  const followUsWidgetContainer = document.createElement('div');
  followUsWidgetContainer.classList.add('elementor-widget-container');
  followUsHeadingWrapper.append(followUsWidgetContainer);

  const followUsHeading = document.createElement('h2');
  followUsHeading.classList.add('elementor-heading-title', 'elementor-size-default');
  // The followUsHeadingRow contains a single div cell with the text
  if (followUsHeadingRow.firstElementChild) {
    moveInstrumentation(followUsHeadingRow.firstElementChild, followUsHeading);
    while (followUsHeadingRow.firstElementChild.firstChild) {
      followUsHeading.append(followUsHeadingRow.firstElementChild.firstChild);
    }
  }
  followUsWidgetContainer.append(followUsHeading);
  socialSectionContainer.append(followUsHeadingWrapper);

  // Social Icons
  const socialIconsWrapper = document.createElement('div');
  socialIconsWrapper.classList.add('elementor-element', 'elementor-element-0744dfb', 'e-grid-align-left', 'elementor-shape-rounded', 'elementor-grid-0', 'elementor-widget', 'elementor-widget-social-icons');

  const socialIconsWidgetContainer = document.createElement('div');
  socialIconsWidgetContainer.classList.add('elementor-widget-container');
  socialIconsWrapper.append(socialIconsWidgetContainer);

  const socialIconsGrid = document.createElement('div');
  socialIconsGrid.classList.add('elementor-social-icons-wrapper', 'elementor-grid');
  socialIconsGrid.setAttribute('role', 'list');
  socialIconsWidgetContainer.append(socialIconsGrid);

  // Filter itemRows for social icons (3 cells: icon, label, url)
  const socialIcons = itemRows.filter((row) => row.children.length === 3);
  socialIcons.forEach((row) => { // Removed index as it's not used for unique repeater item IDs
    const gridItem = document.createElement('span');
    gridItem.classList.add('elementor-grid-item');
    gridItem.setAttribute('role', 'listitem');
    moveInstrumentation(row, gridItem);

    const iconLink = document.createElement('a');
    iconLink.classList.add('elementor-icon', 'elementor-social-icon');

    // Use content detection instead of row.children[n]
    const cells = [...row.children];
    const iconCell = cells.find(cell => cell.querySelector('picture'));
    const labelCell = cells.find(cell => !cell.querySelector('picture') && !cell.querySelector('a'));
    const urlCell = cells.find(cell => cell.querySelector('a'));

    if (urlCell) {
      const foundLink = urlCell.querySelector('a');
      if (foundLink) {
        iconLink.href = foundLink.href;
        iconLink.target = '_blank'; // Assuming social links open in new tab
      }
    }

    if (labelCell) {
      const screenOnlySpan = document.createElement('span');
      screenOnlySpan.classList.add('elementor-screen-only');
      moveInstrumentation(labelCell, screenOnlySpan);
      while (labelCell.firstChild) screenOnlySpan.append(labelCell.firstChild);
      iconLink.append(screenOnlySpan);

      // Add specific social icon class based on label content
      const labelText = screenOnlySpan.textContent.toLowerCase();
      // Use original HTML class names for social icons, e.g., elementor-social-icon-facebook
      if (labelText.includes('facebook')) {
        iconLink.classList.add('elementor-social-icon-facebook');
      } else if (labelText.includes('instagram')) {
        iconLink.classList.add('elementor-social-icon-instagram');
      } else if (labelText.includes('youtube')) {
        iconLink.classList.add('elementor-social-icon-youtube');
      } else if (labelText.includes('x-twitter')) {
        iconLink.classList.add('elementor-social-icon-x-twitter');
      }
      // The original HTML uses elementor-repeater-item-XXXXXXX for unique IDs,
      // but the generated JS doesn't have a stable way to generate these.
      // For now, we omit them as they are likely for editor functionality.
    }

    if (iconCell) {
      const picture = iconCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          const newImg = document.createElement('img');
          newImg.src = img.src;
          newImg.alt = img.alt || 'Social Icon';
          iconLink.append(newImg);
        }
      }
    }

    gridItem.append(iconLink);
    socialIconsGrid.append(gridItem);
  });
  socialSectionContainer.append(socialIconsWrapper);

  // Site Logo Section
  const siteLogoContainer = document.createElement('div');
  siteLogoContainer.classList.add('elementor-element', 'elementor-element-2779fc3', 'e-con-full', 'e-flex', 'e-con', 'e-child');
  innerContainer.append(siteLogoContainer);

  const siteLogoWrapper = document.createElement('div');
  siteLogoWrapper.classList.add('elementor-element', 'elementor-element-0a043e5', 'elementor-widget', 'elementor-widget-theme-site-logo', 'elementor-widget-image');
  moveInstrumentation(siteLogoRow, siteLogoWrapper);

  const siteLogoWidgetContainer = document.createElement('div');
  siteLogoWidgetContainer.classList.add('elementor-widget-container');
  siteLogoWrapper.append(siteLogoWidgetContainer);

  const siteLogoLink = document.createElement('a');
  // The original HTML has a specific link for the logo, use that if available, otherwise default to '/'
  const originalLogoLink = siteLogoRow.querySelector('a');
  siteLogoLink.href = originalLogoLink ? originalLogoLink.href : '/';

  const siteLogoPicture = siteLogoRow.querySelector('picture');
  if (siteLogoPicture) {
    const img = siteLogoPicture.querySelector('img');
    if (img) {
      const newImg = document.createElement('img');
      newImg.src = img.src;
      newImg.alt = img.alt || '';
      // Copy classes from original HTML for the logo image
      newImg.classList.add('attachment-full', 'size-full', 'wp-image-47');
      siteLogoLink.append(newImg);
    }
  }
  siteLogoWidgetContainer.append(siteLogoLink);
  siteLogoContainer.append(siteLogoWrapper);

  // Off-canvas modal (from original HTML, not directly in block structure but referenced by a link)
  const offCanvasElement = document.createElement('div');
  offCanvasElement.id = 'off-canvas-dab152e'; // Hardcoded ID from original HTML
  offCanvasElement.classList.add('e-off-canvas');
  offCanvasElement.setAttribute('role', 'dialog');
  offCanvasElement.setAttribute('aria-hidden', 'true');
  offCanvasElement.setAttribute('aria-label', 'Redirection Notice');
  offCanvasElement.setAttribute('aria-modal', 'true');
  offCanvasElement.setAttribute('inert', ''); // Initially hidden

  offCanvasElement.innerHTML = `
    <div class="e-off-canvas__overlay"></div>
    <div class="e-off-canvas__main">
      <div class="e-off-canvas__content">
        <div class="elementor-element elementor-element-e348ddb e-con-full e-flex e-con e-child" data-id="e348ddb" data-element_type="container">
          <!-- Content for the off-canvas modal would go here, if provided in the block structure -->
        </div>
      </div>
    </div>
  `;
  // Append off-canvas to the main container or body, depending on desired DOM structure
  // For now, append to mainContainer to keep it scoped.
  mainContainer.append(offCanvasElement);

  // Optimize images
  mainContainer.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(mainContainer);
}
