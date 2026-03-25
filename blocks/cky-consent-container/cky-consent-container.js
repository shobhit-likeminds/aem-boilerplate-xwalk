import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  // Destructure the first four rows as per BlockJson model
  const [titleRow, descriptionRow, categoryDirectItemsContainer, accordionsContainer, ...restRows] = children;

  // Filter item rows based on their structure
  const categoryDirectItemRows = restRows.filter(
    (row) => row.children.length === 2
  );
  const accordionRows = restRows.filter(
    (row) => row.children.length === 3
  );

  block.textContent = '';
  block.classList.add('cky-classic-bottom');
  block.setAttribute('aria-label', 'We value your privacy');
  block.setAttribute('role', 'region');
  block.setAttribute('tabindex', '-1');

  // Consent Bar
  const consentBar = document.createElement('div');
  consentBar.classList.add('cky-consent-bar');
  consentBar.setAttribute('data-cky-tag', 'notice');
  block.append(consentBar);

  const notice = document.createElement('div');
  notice.classList.add('cky-notice');
  consentBar.append(notice);

  const title = document.createElement('p');
  title.classList.add('cky-title');
  moveInstrumentation(titleRow.firstElementChild, title);
  title.setAttribute('aria-level', '2');
  title.setAttribute('data-cky-tag', 'title');
  title.setAttribute('role', 'heading');
  title.textContent = titleRow.firstElementChild.textContent;
  notice.append(title);

  const noticeGroup = document.createElement('div');
  noticeGroup.classList.add('cky-notice-group');
  notice.append(noticeGroup);

  const noticeDes = document.createElement('div');
  noticeDes.classList.add('cky-notice-des');
  moveInstrumentation(descriptionRow.firstElementChild, noticeDes);
  noticeDes.setAttribute('data-cky-tag', 'description');
  noticeDes.innerHTML = descriptionRow.firstElementChild.innerHTML;
  noticeGroup.append(noticeDes);

  const noticeBtnWrapper = document.createElement('div');
  noticeBtnWrapper.classList.add('cky-notice-btn-wrapper');
  noticeBtnWrapper.setAttribute('data-cky-tag', 'notice-buttons');
  noticeGroup.append(noticeBtnWrapper);

  const customizeBtn = document.createElement('button');
  customizeBtn.classList.add('cky-btn', 'cky-btn-customize');
  customizeBtn.setAttribute('aria-label', 'Customise');
  customizeBtn.setAttribute('aria-haspopup', 'dialog');
  customizeBtn.setAttribute('aria-controls', 'ckyPreferenceCenter');
  customizeBtn.setAttribute('data-cky-tag', 'settings-button');
  customizeBtn.setAttribute('aria-expanded', 'false');
  customizeBtn.textContent = 'Customise';
  noticeBtnWrapper.append(customizeBtn);

  const rejectBtn = document.createElement('button');
  rejectBtn.classList.add('cky-btn', 'cky-btn-reject');
  rejectBtn.setAttribute('aria-label', 'Reject All');
  rejectBtn.setAttribute('data-cky-tag', 'reject-button');
  rejectBtn.textContent = 'Reject All';
  noticeBtnWrapper.append(rejectBtn);

  const acceptBtn = document.createElement('button');
  acceptBtn.classList.add('cky-btn', 'cky-btn-accept');
  acceptBtn.setAttribute('aria-label', 'Accept All');
  acceptBtn.setAttribute('data-cky-tag', 'accept-button');
  acceptBtn.textContent = 'Accept All';
  noticeBtnWrapper.append(acceptBtn);

  // Category Direct Preview
  const categoryDirectPreviewWrapper = document.createElement('div');
  categoryDirectPreviewWrapper.classList.add('cky-category-direct-preview-wrapper');
  categoryDirectPreviewWrapper.setAttribute('data-cky-tag', 'detail-category-preview');
  consentBar.append(categoryDirectPreviewWrapper);

  const categoryDirectPreview = document.createElement('div');
  categoryDirectPreview.classList.add('cky-category-direct-preview');
  categoryDirectPreviewWrapper.append(categoryDirectPreview);

  const categoryDirectPreviewSection = document.createElement('div');
  categoryDirectPreviewSection.classList.add('cky-category-direct-preview-section');
  categoryDirectPreview.append(categoryDirectPreviewSection);

  categoryDirectItemRows.forEach((row, index) => {
    const categoryDirectItem = document.createElement('div');
    categoryDirectItem.classList.add('cky-category-direct-item');
    moveInstrumentation(row, categoryDirectItem);
    categoryDirectPreviewSection.append(categoryDirectItem);

    const categoryTitleCell = row.children[0];
    const enabledCell = row.children[1];

    const label = document.createElement('label');
    label.setAttribute('for', `ckyCategoryDirect${index}`);
    label.setAttribute('data-cky-tag', 'detail-category-preview-title');
    label.textContent = categoryTitleCell.textContent;
    categoryDirectItem.append(label);

    const categoryDirectSwitch = document.createElement('div');
    categoryDirectSwitch.classList.add('cky-category-direct-switch');
    categoryDirectSwitch.setAttribute('data-cky-tag', 'detail-category-preview-toggle');
    categoryDirectItem.append(categoryDirectSwitch);

    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('id', `ckyCategoryDirect${index}`);
    input.setAttribute('autocomplete', 'off');
    input.setAttribute('aria-label', `${enabledCell.textContent.trim().toLowerCase() === 'true' ? 'Disable' : 'Enable'} ${categoryTitleCell.textContent}`);
    if (enabledCell.textContent.trim().toLowerCase() === 'true') {
      input.setAttribute('checked', 'true');
      input.setAttribute('disabled', 'true');
    }
    categoryDirectSwitch.append(input);
  });

  const categoryDirectPreviewBtnWrapper = document.createElement('div');
  categoryDirectPreviewBtnWrapper.classList.add('cky-category-direct-preview-btn-wrapper');
  categoryDirectPreviewBtnWrapper.setAttribute('data-cky-tag', 'detail-category-preview-buttons');
  categoryDirectPreviewWrapper.append(categoryDirectPreviewBtnWrapper);

  const savePreferencesBtn = document.createElement('button');
  savePreferencesBtn.classList.add('cky-btn', 'cky-btn-preferences');
  savePreferencesBtn.setAttribute('aria-label', 'Save My Preferences');
  savePreferencesBtn.setAttribute('data-cky-tag', 'detail-category-preview-save-button');
  savePreferencesBtn.textContent = 'Save My Preferences';
  categoryDirectPreviewBtnWrapper.append(savePreferencesBtn);

  // Preference Wrapper
  const preferenceWrapper = document.createElement('div');
  preferenceWrapper.classList.add('cky-preference-wrapper');
  preferenceWrapper.setAttribute('data-cky-tag', 'detail');
  block.append(preferenceWrapper);

  const preferenceCenter = document.createElement('div');
  preferenceCenter.classList.add('cky-preference-center');
  preferenceWrapper.append(preferenceCenter);

  const preference = document.createElement('div');
  preference.classList.add('cky-preference');
  preferenceCenter.append(preference);

  const preferenceHeader = document.createElement('div');
  preferenceHeader.classList.add('cky-preference-header');
  preference.append(preferenceHeader);

  const preferenceTitle = document.createElement('span');
  preferenceTitle.classList.add('cky-preference-title');
  preferenceTitle.setAttribute('aria-level', '2');
  preferenceTitle.setAttribute('data-cky-tag', 'detail-title');
  preferenceTitle.setAttribute('role', 'heading');
  preferenceTitle.textContent = 'Customise Consent Preferences';
  preferenceHeader.append(preferenceTitle);

  const closeBtn = document.createElement('button');
  closeBtn.classList.add('cky-btn-close');
  closeBtn.setAttribute('aria-label', 'Close');
  closeBtn.setAttribute('data-cky-tag', 'detail-close');
  const closeImg = document.createElement('img');
  closeImg.setAttribute('alt', '');
  closeImg.src = '/content/dam/aemigrate/uploaded-folder/image/1774436645609.svg+xml';
  closeBtn.append(closeImg);
  preferenceHeader.append(closeBtn);

  const preferenceBodyWrapper = document.createElement('div');
  preferenceBodyWrapper.classList.add('cky-preference-body-wrapper');
  preference.append(preferenceBodyWrapper);

  const preferenceContentWrapper = document.createElement('div');
  preferenceContentWrapper.classList.add('cky-preference-content-wrapper');
  preferenceContentWrapper.setAttribute('data-cky-tag', 'detail-description');
  preferenceContentWrapper.innerHTML = `
    <p>We use cookies to help you navigate efficiently and perform certain functions. You will find detailed information about all cookies under each consent category below.</p>
    <p>The cookies that are categorised as "Necessary" are stored on your browser as they are essential for enabling the basic functionalities of the site. ...&nbsp;<button class="cky-show-desc-btn" data-cky-tag="show-desc-button" aria-label="Show more">Show more</button></p>
  `;
  preferenceBodyWrapper.append(preferenceContentWrapper);

  const horizontalSeparator = document.createElement('div');
  horizontalSeparator.classList.add('cky-horizontal-separator');
  preferenceBodyWrapper.append(horizontalSeparator);

  const accordionWrapper = document.createElement('div');
  accordionWrapper.classList.add('cky-accordion-wrapper');
  accordionWrapper.setAttribute('data-cky-tag', 'detail-categories');
  preferenceBodyWrapper.append(accordionWrapper);

  accordionRows.forEach((row) => {
    const accordionTitleCell = row.children[0];
    const accordionDescriptionCell = row.children[1];
    const auditTablesCell = row.children[2];

    const accordion = document.createElement('div');
    accordion.classList.add('cky-accordion');
    accordion.setAttribute('id', `ckyDetailCategory${accordionTitleCell.textContent.toLowerCase().replace(/\s/g, '')}`);
    moveInstrumentation(row, accordion);
    accordionWrapper.append(accordion);

    const accordionItem = document.createElement('div');
    accordionItem.classList.add('cky-accordion-item');
    accordion.append(accordionItem);

    const accordionChevron = document.createElement('div');
    accordionChevron.classList.add('cky-accordion-chevron');
    const chevronIcon = document.createElement('i');
    chevronIcon.classList.add('cky-chevron-right');
    accordionChevron.append(chevronIcon);
    accordionItem.append(accordionChevron);

    const accordionHeaderWrapper = document.createElement('div');
    accordionHeaderWrapper.classList.add('cky-accordion-header-wrapper');
    accordionItem.append(accordionHeaderWrapper);

    const accordionHeader = document.createElement('div');
    accordionHeader.classList.add('cky-accordion-header');
    accordionHeaderWrapper.append(accordionHeader);

    const accordionBtn = document.createElement('button');
    accordionBtn.classList.add('cky-accordion-btn');
    accordionBtn.setAttribute('aria-expanded', 'false');
    accordionBtn.setAttribute('aria-controls', `ckyDetailCategory${accordionTitleCell.textContent.toLowerCase().replace(/\s/g, '')}Body`);
    accordionBtn.setAttribute('aria-label', accordionTitleCell.textContent);
    accordionBtn.setAttribute('data-cky-tag', 'detail-category-title');
    accordionBtn.textContent = accordionTitleCell.textContent;
    accordionHeader.append(accordionBtn);

    if (accordionTitleCell.textContent.toLowerCase() === 'necessary') {
      const alwaysActiveSpan = document.createElement('span');
      alwaysActiveSpan.classList.add('cky-always-active');
      alwaysActiveSpan.setAttribute('data-cky-tag', 'always-active');
      alwaysActiveSpan.textContent = 'Always Active';
      accordionHeader.append(alwaysActiveSpan);
    }

    const accordionHeaderDes = document.createElement('div');
    accordionHeaderDes.classList.add('cky-accordion-header-des');
    accordionHeaderDes.setAttribute('data-cky-tag', 'detail-category-description');
    accordionHeaderDes.innerHTML = accordionDescriptionCell.innerHTML;
    accordionHeaderWrapper.append(accordionHeaderDes);

    const accordionBody = document.createElement('div');
    accordionBody.classList.add('cky-accordion-body');
    accordionBody.setAttribute('id', `ckyDetailCategory${accordionTitleCell.textContent.toLowerCase().replace(/\s/g, '')}Body`);
    accordion.append(accordionBody);

    // Assuming auditTablesCell contains nested audit-table blocks
    // This part requires a specific structure for auditTablesCell content
    // For now, we'll just append its content as is, wrapped in a div
    const auditTableContainer = document.createElement('div');
    auditTableContainer.classList.add('cky-audit-table');
    auditTableContainer.setAttribute('data-cky-tag', 'audit-table');
    moveInstrumentation(auditTablesCell, auditTableContainer);
    while (auditTablesCell.firstChild) {
      auditTableContainer.append(auditTablesCell.firstChild);
    }
    accordionBody.append(auditTableContainer);

    // Add event listeners for accordion functionality
    accordionBtn.addEventListener('click', () => {
      const isExpanded = accordionBtn.getAttribute('aria-expanded') === 'true';
      accordionBtn.setAttribute('aria-expanded', !isExpanded);
      accordionBody.classList.toggle('show'); // Assuming 'show' class reveals the body
      accordionItem.classList.toggle('expanded'); // For chevron rotation
    });
  });

  // Footer
  const footerWrapper = document.createElement('div');
  footerWrapper.classList.add('cky-footer-wrapper');
  block.append(footerWrapper);

  const footerShadow = document.createElement('span');
  footerShadow.classList.add('cky-footer-shadow');
  footerWrapper.append(footerShadow);

  const preferenceBtnWrapper = document.createElement('div'); // Corrected class name
  preferenceBtnWrapper.classList.add('cky-preference-btn-wrapper'); // Corrected class name
  preferenceBtnWrapper.setAttribute('data-cky-tag', 'detail-buttons');
  footerWrapper.append(preferenceBtnWrapper);

  const footerAcceptBtn = document.createElement('button');
  footerAcceptBtn.classList.add('cky-btn', 'cky-btn-accept');
  footerAcceptBtn.setAttribute('aria-label', 'Accept All');
  footerAcceptBtn.setAttribute('data-cky-tag', 'detail-accept-button');
  footerAcceptBtn.textContent = 'Accept All';
  preferenceBtnWrapper.append(footerAcceptBtn);

  const footerRejectBtn = document.createElement('button');
  footerRejectBtn.classList.add('cky-btn', 'cky-btn-reject');
  footerRejectBtn.setAttribute('aria-label', 'Reject All');
  footerRejectBtn.setAttribute('data-cky-tag', 'detail-reject-button');
  footerRejectBtn.textContent = 'Reject All';
  preferenceBtnWrapper.append(footerRejectBtn);

  const poweredBy = document.createElement('div');
  poweredBy.setAttribute('data-cky-tag', 'detail-powered-by');
  poweredBy.innerHTML = `Powered by <a href="https://www.cookieyes.com/product/cookie-consent/?ref=cypbcyb&amp;utm_source=cookie-banner&amp;utm_medium=powered-by-cookieyes" rel="noopener" style="margin-left:5px;line-height:0" target="_blank"><img alt="Cookieyes logo" src="/content/dam/aemigrate/uploaded-folder/image/1774436645633.svg+xml" style="width:78px;height:13px;margin:0"></a>`;
  footerWrapper.append(poweredBy);

  // Event Listeners for main buttons
  customizeBtn.addEventListener('click', () => {
    preferenceWrapper.classList.add('show');
    customizeBtn.setAttribute('aria-expanded', 'true');
  });

  closeBtn.addEventListener('click', () => {
    preferenceWrapper.classList.remove('show');
    customizeBtn.setAttribute('aria-expanded', 'false');
  });

  // Event listeners for Reject All buttons
  rejectBtn.addEventListener('click', () => {
    // Implement reject all logic here
    console.log('Reject All clicked from notice bar');
    // Example: Hide consent bar, show category direct preview
    consentBar.classList.remove('show'); // Assuming 'show' class controls visibility
    categoryDirectPreviewWrapper.classList.add('show');
  });

  footerRejectBtn.addEventListener('click', () => {
    // Implement reject all logic here for footer button
    console.log('Reject All clicked from footer');
    preferenceWrapper.classList.remove('show');
    customizeBtn.setAttribute('aria-expanded', 'false');
  });

  // Event listeners for Accept All buttons
  acceptBtn.addEventListener('click', () => {
    // Implement accept all logic here
    console.log('Accept All clicked from notice bar');
    consentBar.classList.remove('show'); // Assuming 'show' class controls visibility
  });

  footerAcceptBtn.addEventListener('click', () => {
    // Implement accept all logic here for footer button
    console.log('Accept All clicked from footer');
    preferenceWrapper.classList.remove('show');
    customizeBtn.setAttribute('aria-expanded', 'false');
  });

  // Event listener for Save My Preferences button
  savePreferencesBtn.addEventListener('click', () => {
    // Implement save preferences logic here
    console.log('Save My Preferences clicked');
    categoryDirectPreviewWrapper.classList.remove('show');
    consentBar.classList.remove('show');
  });

  // Event listener for "Show more" button in preference content
  const showMoreBtn = preferenceContentWrapper.querySelector('.cky-show-desc-btn');
  if (showMoreBtn) {
    showMoreBtn.addEventListener('click', () => {
      // Implement show more/less functionality
      console.log('Show more/less description clicked');
      // Example: toggle a class on preferenceContentWrapper to expand/collapse text
      preferenceContentWrapper.classList.toggle('expanded-description');
      if (preferenceContentWrapper.classList.contains('expanded-description')) {
        showMoreBtn.textContent = 'Show less';
        showMoreBtn.setAttribute('aria-label', 'Show less');
      } else {
        showMoreBtn.textContent = 'Show more';
        showMoreBtn.setAttribute('aria-label', 'Show more');
      }
    });
  }

  // Optimize images
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
