import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const container = document.createElement('div');
  container.classList.add('container');

  const brandsBreadcrumbs = document.createElement('div');
  brandsBreadcrumbs.classList.add('brands-breadcrumbs');

  const breadcrumbsUl = document.createElement('ul');
  breadcrumbsUl.classList.add('mr-auto');

  const socialInfoDiv = document.createElement('div');
  socialInfoDiv.classList.add('social-info', 'bg_icon');
  const socialUl = document.createElement('ul');

  const rows = [...block.children];

  rows.forEach((row) => {
    const cells = [...row.children];
    const linkCell = cells.find(cell => cell.querySelector('a'));

    if (linkCell) {
      if (cells.length === 2) { // Breadcrumb item
        const li = document.createElement('li');
        moveInstrumentation(row, li);

        // Correctly identify label cell without using index access
        const labelCell = cells.find(cell => !cell.querySelector('a'));
        
        const linkEl = document.createElement('a');
        linkEl.href = linkCell.querySelector('a').href;
        linkEl.textContent = labelCell ? labelCell.textContent : ''; // Use labelCell if found

        li.append(linkEl);
        breadcrumbsUl.append(li);
      } else if (cells.length === 1) { // Social link item
        const li = document.createElement('li');
        moveInstrumentation(row, li);

        const urlLink = document.createElement('a');
        urlLink.href = linkCell.querySelector('a').href;
        urlLink.target = '_blank';

        const icon = document.createElement('i');
        icon.classList.add('fab');

        if (urlLink.href.includes('facebook')) {
          icon.classList.add('fa-facebook-f');
          li.classList.add('fb');
        } else if (urlLink.href.includes('twitter')) {
          icon.classList.add('fa-twitter');
          li.classList.add('twit');
        } else if (urlLink.href.includes('youtube')) {
          icon.classList.add('fa-youtube');
          li.classList.add('you-t');
        } else if (urlLink.href.includes('instagram')) {
          icon.classList.add('fa-instagram');
          li.classList.add('insta');
        } else {
          icon.classList.add('fa-link'); // Default if no specific match
        }
        icon.setAttribute('aria-hidden', 'true'); // Add aria-hidden as per original HTML

        urlLink.append(icon);
        li.append(urlLink);
        socialUl.append(li);
      }
    }
  });

  brandsBreadcrumbs.append(breadcrumbsUl);
  socialInfoDiv.append(socialUl);
  brandsBreadcrumbs.append(socialInfoDiv);
  container.append(brandsBreadcrumbs);

  block.textContent = '';
  block.append(container);
}
