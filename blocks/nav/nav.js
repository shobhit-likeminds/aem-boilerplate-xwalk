import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const nav = document.createElement('nav');
  nav.classList.add('clearfix');

  // Destructure block.children based on BlockJson model:
  // [0] site-logo (text)
  // [1] site-nav-items (container for site-nav-item)
  // [2...] site-nav-item rows
  const [siteLogoRow, siteNavItemsContainer, ...siteNavItems] = [...block.children];

  // Site Logo
  const siteLogoDiv = document.createElement('div');
  siteLogoDiv.classList.add('site-logo');
  moveInstrumentation(siteLogoRow, siteLogoDiv);

  // The site logo content is directly in the first div of siteLogoRow
  // Original HTML has "HTML5 <span class="star">★</span> Boilerplate"
  // The EDS structure provides "Site Logo value" in block.children[0].children[0]
  // We need to replicate the original HTML structure and content.
  const logoTextContent = siteLogoRow.children[0].textContent.trim(); // Get the text content from the first cell

  // Replicate the original HTML structure: "HTML5 <span class="star">★</span> Boilerplate"
  // Assuming 'Site Logo value' from EDS structure corresponds to 'HTML5'
  siteLogoDiv.append(logoTextContent); // Append the initial text, e.g., "HTML5"

  const starSpan = document.createElement('span');
  starSpan.classList.add('star');
  starSpan.textContent = '★';
  siteLogoDiv.append(starSpan);

  siteLogoDiv.append(' Boilerplate'); // Append the remaining text

  nav.append(siteLogoDiv);

  // Site Nav Items
  const ul = document.createElement('ul');
  ul.classList.add('site-nav', 'inline-block-list');
  // moveInstrumentation for the container row, even if it's empty
  moveInstrumentation(siteNavItemsContainer, ul);

  siteNavItems.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);

    // According to BlockJson for 'site-nav-item', there's one field: 'link' (aem-content)
    // This means each 'row' (div) will contain one child div, which contains the 'a' tag.
    const linkCell = row.children[0]; // Get the first (and only) cell for the link
    const foundLink = linkCell ? linkCell.querySelector('a') : null;

    if (foundLink) {
      const linkEl = document.createElement('a');
      linkEl.href = foundLink.href;
      linkEl.textContent = foundLink.textContent; // Copy text content
      li.append(linkEl);
    }
    ul.append(li);
  });

  nav.append(ul);

  block.textContent = '';
  block.append(nav);
}
