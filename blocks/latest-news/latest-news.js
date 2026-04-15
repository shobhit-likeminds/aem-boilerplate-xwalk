import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  // Destructure the known fixed rows first, then spread the remaining as newsItemRows
  const [headingRow, moreNewsLinkRow, moreNewsLinkLabelRow, ...newsItemRows] = children;

  block.textContent = '';
  block.classList.add('row', 'row-pad', 'align-items-center');
  block.id = 'front-latest-news';
  block.style.padding = '70px 0 80px 0';

  const colMd4 = document.createElement('div');
  colMd4.classList.add('col-md-4');
  block.append(colMd4);

  const colMd8 = document.createElement('div');
  colMd8.classList.add('col-md-8');
  block.append(colMd8);

  // Left Column (col-md-4)
  const leftColumnContent = document.createElement('div');
  leftColumnContent.classList.add('paragraph', 'paragraph--type--column-content', 'paragraph--view-mode--default');
  colMd4.append(leftColumnContent);

  const leftColumnItems = document.createElement('div');
  leftColumnItems.classList.add('field', 'field--name-field-column-content', 'field--type-entity-reference-revisions', 'field--label-hidden', 'field__items');
  leftColumnContent.append(leftColumnItems);

  // Heading
  const headingItem = document.createElement('div');
  headingItem.classList.add('field__item');
  leftColumnItems.append(headingItem);

  const headingParagraph = document.createElement('div');
  headingParagraph.classList.add('paragraph', 'paragraph--type--text', 'paragraph--view-mode--default');
  headingItem.append(headingParagraph);

  const headingDiv = document.createElement('div');
  headingDiv.classList.add('clearfix', 'text-formatted', 'field', 'field--name-field-longtext', 'field--type-text-long', 'field--label-hidden', 'field__item');
  headingParagraph.append(headingDiv);

  const h3 = document.createElement('h3');
  h3.classList.add('front-section-title');
  h3.textContent = headingRow.firstElementChild.textContent.trim();
  moveInstrumentation(headingRow, h3);
  headingDiv.append(h3);

  // News Items List
  const newsListItem = document.createElement('div');
  newsListItem.classList.add('field__item');
  leftColumnItems.append(newsListItem);

  const newsListParagraph = document.createElement('div');
  newsListParagraph.classList.add('paragraph', 'paragraph--type--content-list', 'paragraph--view-mode--default');
  newsListItem.append(newsListParagraph);

  const newsListViewField = document.createElement('div');
  newsListViewField.classList.add('field', 'field--name-field-content-view', 'field--type-viewfield', 'field--label-visually_hidden');
  newsListParagraph.append(newsListViewField);

  const newsListViewLabel = document.createElement('div');
  newsListViewLabel.classList.add('field__label', 'visually-hidden');
  newsListViewLabel.textContent = 'Content View';
  newsListViewField.append(newsListViewLabel);

  const newsListViewItem = document.createElement('div');
  newsListViewItem.classList.add('field__item', 'field__item-label-hidden');
  newsListViewField.append(newsListViewItem);

  const newsViewsElementContainer = document.createElement('div');
  newsViewsElementContainer.classList.add('views-element-container');
  newsListViewItem.append(newsViewsElementContainer);

  const newsView = document.createElement('div');
  newsView.classList.add('view', 'view-content-article-list', 'view-id-content_article_list', 'view-display-id-thumb_title_body', 'js-view-dom-id-630e995c9bf5b677871e8caf7bcdb0ab9c70e900cc513d48fe52bd6e605b48ad');
  newsViewsElementContainer.append(newsView);

  const newsViewContent = document.createElement('div');
  newsViewContent.classList.add('view-content', 'row');
  newsView.append(newsViewContent);

  newsItemRows.forEach((row) => {
    // CRITICAL FIX: Use destructuring for fixed-field item models instead of row.children[n]
    const [linkCell, linkLabelCell, bodyCell] = [...row.children];

    const newsRowDiv = document.createElement('div');
    newsRowDiv.classList.add('col-md-12', 'frontpage-sidebar-news', 'views-row');
    moveInstrumentation(row, newsRowDiv);
    newsViewContent.append(newsRowDiv);

    const titleField = document.createElement('div');
    titleField.classList.add('views-field', 'views-field-title');
    newsRowDiv.append(titleField);

    const h4 = document.createElement('h4');
    h4.classList.add('field-content');
    titleField.append(h4);

    const link = document.createElement('a');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      link.href = foundLink.href;
    }
    link.textContent = linkLabelCell.textContent.trim();
    h4.append(link);

    const bodyField = document.createElement('div');
    bodyField.classList.add('views-field', 'views-field-body');
    newsRowDiv.append(bodyField);

    const bodyContent = document.createElement('div');
    bodyContent.classList.add('field-content');
    bodyContent.innerHTML = bodyCell.innerHTML;
    bodyField.append(bodyContent);

    const hrField = document.createElement('div');
    hrField.classList.add('views-field', 'views-field-nothing');
    newsRowDiv.append(hrField);

    const hrSpan = document.createElement('span');
    hrSpan.classList.add('field-content');
    hrSpan.innerHTML = '<hr>';
    hrField.append(hrSpan);
  });

  // More News Link
  const moreNewsLinkItem = document.createElement('div');
  moreNewsLinkItem.classList.add('field__item');
  leftColumnItems.append(moreNewsLinkItem);

  const moreNewsLinkParagraph = document.createElement('div');
  moreNewsLinkParagraph.classList.add('paragraph', 'paragraph--type--text', 'paragraph--view-mode--default');
  moreNewsLinkItem.append(moreNewsLinkParagraph);

  const moreNewsLinkDiv = document.createElement('div');
  moreNewsLinkDiv.classList.add('clearfix', 'text-formatted', 'field', 'field--name-field-longtext', 'field--type-text-long', 'field--label-hidden', 'field__item');
  moreNewsLinkParagraph.append(moreNewsLinkDiv);

  const p = document.createElement('p');
  p.innerHTML = '<br>';
  moreNewsLinkDiv.append(p);

  const moreLink = document.createElement('a');
  moreLink.classList.add('btn', 'btn-primary');
  const foundMoreLink = moreNewsLinkRow.querySelector('a');
  if (foundMoreLink) {
    moreLink.href = foundMoreLink.href;
  }
  const moreLinkTextSpan = document.createElement('span');
  moreLinkTextSpan.classList.add('text');
  moreLinkTextSpan.textContent = moreNewsLinkLabelRow.firstElementChild.textContent.trim();
  moreLink.append(moreLinkTextSpan);
  moveInstrumentation(moreNewsLinkRow, moreLink);
  moveInstrumentation(moreNewsLinkLabelRow, moreLinkTextSpan);
  p.append(moreLink);

  // Right Column (col-md-8) - This section is empty based on the provided original HTML for this block.
  // We'll create the basic structure to match the original HTML, but it will remain empty.
  const rightColumnContent = document.createElement('div');
  rightColumnContent.classList.add('paragraph', 'paragraph--type--column-content', 'paragraph--view-mode--default');
  colMd8.append(rightColumnContent);

  const rightColumnItems = document.createElement('div');
  rightColumnItems.classList.add('field', 'field--name-field-column-content', 'field--type-entity-reference-revisions', 'field--label-hidden', 'field__items');
  rightColumnContent.append(rightColumnItems);

  // Add an empty item to match the original HTML structure for the right column
  const emptyItem1 = document.createElement('div');
  emptyItem1.classList.add('field__item');
  rightColumnItems.append(emptyItem1);

  const emptyParagraph1 = document.createElement('div');
  emptyParagraph1.classList.add('paragraph', 'paragraph--type--content-list', 'paragraph--view-mode--default');
  emptyItem1.append(emptyParagraph1);

  const emptyViewField1 = document.createElement('div');
  emptyViewField1.classList.add('field', 'field--name-field-content-view', 'field--type-viewfield', 'field--label-visually_hidden');
  emptyParagraph1.append(emptyViewField1);

  const emptyViewLabel1 = document.createElement('div');
  emptyViewLabel1.classList.add('field__label', 'visually-hidden');
  emptyViewLabel1.textContent = 'Content View';
  emptyViewField1.append(emptyViewLabel1);

  const emptyViewItem1 = document.createElement('div');
  emptyViewItem1.classList.add('field__item', 'field__item-label-hidden');
  emptyViewField1.append(emptyViewItem1);

  const emptyViewsElementContainer1 = document.createElement('div');
  emptyViewsElementContainer1.classList.add('views-element-container');
  emptyViewItem1.append(emptyViewsElementContainer1);

  const emptyView1 = document.createElement('div');
  emptyView1.classList.add('view', 'view-content-article-list', 'view-id-content_article_list', 'view-display-id-block_1', 'js-view-dom-id-e97638c5e61fd279890ae6a51465923d6e11da450dcf35c2863b32844dc3ee77');
  emptyViewsElementContainer1.append(emptyView1);

  const emptyViewContent1 = document.createElement('div');
  emptyViewContent1.classList.add('view-content', 'row');
  emptyView1.append(emptyViewContent1);

  // Add another empty item to match the original HTML structure for the right column
  const emptyItem2 = document.createElement('div');
  emptyItem2.classList.add('field__item');
  rightColumnItems.append(emptyItem2);

  const emptyParagraph2 = document.createElement('div');
  emptyParagraph2.classList.add('paragraph', 'paragraph--type--text', 'paragraph--view-mode--default');
  emptyItem2.append(emptyParagraph2);

  const emptyDiv2 = document.createElement('div');
  emptyDiv2.classList.add('clearfix', 'text-formatted', 'field', 'field--name-field-longtext', 'field--type-text-long', 'field--label-hidden', 'field__item');
  emptyDiv2.innerHTML = '<hr>'; // Add the <hr> from the original HTML
  emptyParagraph2.append(emptyDiv2);

  // Image optimization for any pictures that might be in the body (though none are expected in this model)
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
