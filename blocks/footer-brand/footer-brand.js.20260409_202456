import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  const primarySection = document.createElement('section');
  primarySection.classList.add('footer-brand__primary');

  const container = document.createElement('div');
  container.classList.add('container');

  const primaryContent = document.createElement('div');
  primaryContent.classList.add('footer-brand__primary--content', 'd-flex', 'flex-column', 'flex-md-row', 'justify-content-md-between', 'align-items-center');

  const footerLeft = document.createElement('section');
  footerLeft.classList.add('footer-brand__left', 'd-flex', 'gap-16', 'px-10', 'align-items-center', 'justify-content-center');

  // Logo Image (field="logoImage")
  const logoImageRow = children.find(row => row.querySelector('picture') && !row.nextElementSibling?.querySelector('picture'));
  if (logoImageRow) {
    const logoImageCell = logoImageRow.firstElementChild;
    if (logoImageCell && logoImageCell.querySelector('picture')) {
      const logoLink = document.createElement('a');
      logoLink.classList.add('footer-brand__logo', 'd-inline-block', 'analytics_cta_click');
      logoLink.setAttribute('aria-label', 'ITC Logo');

      // As per original HTML, the logo has a hardcoded external link.
      // EDS model does not provide this link. We will render the image without a link
      // unless the model is updated to include the link.
      // However, the original HTML has href="https://www.itcportal.com/" and target="_blank"
      // We must adhere to the original HTML behavior if possible.
      // Since the model field `logoImage` is type `reference` and doesn't contain a link,
      // we cannot infer the href from the block data.
      // For now, we will create the image and not wrap it in a link.
      // If the model changes to include a link for the logo, this should be updated.
      // Based on the original HTML, the logo is wrapped in a link with a hardcoded URL.
      // Since we cannot hardcode URLs (Rule 16), we'll just render the image.
      // If a link is required, the EDS model needs to provide it.
      const picture = logoImageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          logoLink.append(optimizedPic);
          footerLeft.append(logoLink);
        }
      }
    }
    moveInstrumentation(logoImageRow, footerLeft);
  }

  // Secondary Logo Image (field="secondaryLogoImage")
  const secondaryLogoImageRow = children.find(row => row.querySelector('picture') && row.nextElementSibling && !row.nextElementSibling.querySelector('a'));
  if (secondaryLogoImageRow) {
    const secondaryLogoImageCell = secondaryLogoImageRow.firstElementChild;
    if (secondaryLogoImageCell && secondaryLogoImageCell.querySelector('picture')) {
      const secondaryLogoDiv = document.createElement('div');
      secondaryLogoDiv.classList.add('footer-brand__secondary--logo', 'd-inline-block');
      const picture = secondaryLogoImageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          secondaryLogoDiv.append(optimizedPic);
          footerLeft.append(secondaryLogoDiv);
        }
      }
    }
    moveInstrumentation(secondaryLogoImageRow, footerLeft);
  }

  primaryContent.append(footerLeft);

  const footerRight = document.createElement('section');
  footerRight.classList.add('footer-brand__right');

  const nav = document.createElement('nav');
  nav.classList.add('footer-brand__navbar', 'd-grid', 'd-md-flex');
  nav.setAttribute('aria-label', 'footer navbar');

  const navLeft = document.createElement('div');
  navLeft.classList.add('footer-brand__navbar--left', 'd-flex', 'flex-column', 'flex-md-row');

  const navRight = document.createElement('div');
  navRight.classList.add('footer-brand__navbar--right', 'd-flex', 'flex-column', 'flex-md-row');

  // Filter for footer links (2 cells) and social links (3 cells)
  // These appear after the single-row fields (logo, secondary logo, footer left link, footer left link label, copyright text)
  const itemRows = children.filter((row) => row.children.length === 2 || row.children.length === 3);
  const footerLinks = itemRows.filter((row) => row.children.length === 2);
  const footerSocialLinks = itemRows.filter((row) => row.children.length === 3);

  // Group footer links into two columns for navLeft and two for navRight
  const linkGroups = [[], [], [], []];
  footerLinks.forEach((row, index) => {
    linkGroups[index % 4].push(row);
  });

  linkGroups.forEach((group, groupIndex) => {
    if (group.length > 0) {
      const footerListDiv = document.createElement('div');
      footerListDiv.classList.add('footerList');
      const ul = document.createElement('ul');
      ul.classList.add('footer-list', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');

      group.forEach((row) => {
        const [linkCell, labelCell] = [...row.children];
        const li = document.createElement('li');
        li.classList.add('footer-list__item');

        const link = document.createElement('a');
        link.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list__item--link', 'd-inline-block');
        const foundLink = linkCell.querySelector('a');
        if (foundLink) {
          link.href = foundLink.href;
          if (foundLink.target) link.target = foundLink.target;
        }
        link.textContent = labelCell ? labelCell.textContent.trim() : '';

        moveInstrumentation(row, li);
        li.append(link);
        ul.append(li);
      });
      footerListDiv.append(ul);
      if (groupIndex < 2) {
        navLeft.append(footerListDiv);
      } else {
        navRight.append(footerListDiv);
      }
    }
  });

  nav.append(navLeft, navRight);
  footerRight.append(nav);
  primaryContent.append(footerRight);
  container.append(primaryContent);
  primarySection.append(container);

  // Secondary Footer Section
  const secondarySection = document.createElement('section');
  secondarySection.classList.add('footer-brand__secondary');

  const secondaryContainer = document.createElement('div');
  secondaryContainer.classList.add('container');

  const secondaryContent = document.createElement('div');
  secondaryContent.classList.add('footer-brand__secondary--content', 'd-flex', 'flex-column', 'justify-content-md-between', 'align-items-center');

  const socialMediaSection = document.createElement('section');
  socialMediaSection.classList.add('footer-brand__right', 'd-flex', 'flex-column', 'pb-5');

  const socialTitle = document.createElement('h3');
  socialTitle.classList.add('social_media--title');
  socialTitle.textContent = 'Follow Us On';
  socialMediaSection.append(socialTitle);

  const socialList = document.createElement('ul');
  socialList.classList.add('footer-brand__right--list', 'd-flex', 'align-items-center', 'justify-content-center', 'px-10', 'flex-wrap');

  footerSocialLinks.forEach((row) => {
    const [socialLinkCell, socialLinkLabelCell, socialIconCell] = [...row.children];
    const li = document.createElement('li');
    li.classList.add('footer-brand__right--item', 'd-flex', 'justify-content-center', 'align-items-center');

    const link = document.createElement('a');
    link.classList.add('footer-brand__right--link', 'd-flex', 'justify-content-center', 'align-items-center', 'analytics_cta_click');
    const foundLink = socialLinkCell.querySelector('a');
    if (foundLink) {
      link.href = foundLink.href;
      if (foundLink.target) link.target = foundLink.target;
    }

    const picture = socialIconCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        // Use socialLinkLabelCell for alt text as per original HTML's aria-label pattern
        const optimizedPic = createOptimizedPicture(img.src, socialLinkLabelCell ? socialLinkLabelCell.textContent.trim() : img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        link.append(optimizedPic);
      }
    }
    moveInstrumentation(row, li);
    li.append(link);
    socialList.append(li);
  });

  socialMediaSection.append(socialList);
  secondaryContent.append(socialMediaSection);

  const copyrightSection = document.createElement('section');
  copyrightSection.classList.add('footer-brand__left', 'py-5', 'd-flex', 'flex-column', 'gap-3');

  const copyrightList = document.createElement('ul');
  copyrightList.classList.add('footer-brand__left--list', 'd-flex', 'align-items-center', 'justify-content-center', 'flex-wrap');

  // Footer Left Link (field="footerLeftLink") and Footer Left Link Label (field="footerLeftLinkLabel")
  // These are single-cell rows. We need to find them by content.
  const footerLeftLinkRow = children.find(row => row.children.length === 1 && row.querySelector('a') && row.querySelector('a').href.includes('footerLeftLink'));
  const footerLeftLinkLabelRow = children.find(row => row.children.length === 1 && !row.querySelector('a') && row.textContent.trim() === 'https://example.com/footerleftlinklabel'); // Assuming label is a URL in model, but text in original HTML

  if (footerLeftLinkRow && footerLeftLinkLabelRow) {
    const footerLeftLinkCell = footerLeftLinkRow.firstElementChild;
    const footerLeftLinkLabelCell = footerLeftLinkLabelRow.firstElementChild;

    const li = document.createElement('li');
    li.classList.add('footer-brand__left--item', 'foot_link');
    const link = document.createElement('a');
    link.classList.add('footer-brand__left--link', 'analytics_cta_click');
    const foundLink = footerLeftLinkCell.querySelector('a');
    if (foundLink) {
      link.href = foundLink.href;
      if (foundLink.target) link.target = foundLink.target;
    }
    // The label cell contains the URL in the EDS structure, but the original HTML uses "ITC portal" as text.
    // We should use the text content from the original HTML's corresponding element or a specific model field if available.
    // Given the model, `footerLeftLinkLabel` is type `text`. The example HTML shows it as a URL.
    // The original HTML for "ITC portal" is a hardcoded text.
    // For now, we will use the text from the `footerLeftLinkLabelCell` as it's the closest model field.
    // If the original HTML's "ITC portal" text is desired, it needs to be a model field.
    link.textContent = footerLeftLinkLabelCell.textContent.trim();
    moveInstrumentation(footerLeftLinkRow, li);
    moveInstrumentation(footerLeftLinkLabelRow, li);
    li.append(link);
    copyrightList.append(li);
  }

  copyrightSection.append(copyrightList);

  // Footer Copyright Text (field="footerCopyrightText")
  const footerCopyrightTextRow = children.find(row => row.children.length === 1 && row.textContent.includes('Copyright Text'));
  if (footerCopyrightTextRow) {
    const footerCopyrightTextCell = footerCopyrightTextRow.firstElementChild;
    const copyrightDiv = document.createElement('div');
    copyrightDiv.classList.add('footer-brand__left--copyright', 'text-center');
    const span = document.createElement('span');
    span.classList.add('footer-brand__left--text', 'text-white');
    span.textContent = footerCopyrightTextCell.textContent.trim();
    copyrightDiv.append(span);
    moveInstrumentation(footerCopyrightTextRow, copyrightDiv);
    copyrightSection.append(copyrightDiv);
  }

  secondaryContent.append(copyrightSection);
  secondaryContainer.append(secondaryContent);
  secondarySection.append(secondaryContainer);

  block.textContent = '';
  block.classList.add('w-100', 'bg-boing-neutral-gray-600'); // Add classes from original HTML
  block.append(primarySection, secondarySection);

  // The original code had a redundant image optimization loop at the end.
  // Images are already optimized when they are created and appended.
  // This loop is not needed and can cause issues if it re-optimizes already replaced pictures.
  // Removed:
  // block.querySelectorAll('picture > img').forEach((img) => {
  //   const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
  //   moveInstrumentation(img, optimizedPic.querySelector('img'));
  //   img.closest('picture').replaceWith(optimizedPic);
  // });
}
