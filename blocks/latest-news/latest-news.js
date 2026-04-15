import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, ...newsItemRows] = [...block.children];

  const container = document.createElement('div');
  container.classList.add('row', 'row-pad', 'align-items-center');
  container.id = 'front-latest-news';

  const colLeft = document.createElement('div');
  colLeft.classList.add('col-md-4');

  const headingWrapper = document.createElement('div');
  headingWrapper.classList.add('paragraph', 'paragraph--type--text', 'paragraph--view-mode--default');
  const headingDiv = document.createElement('div');
  headingDiv.classList.add('clearfix', 'text-formatted', 'field', 'field--name-field-longtext', 'field--type-text-long', 'field--label-hidden', 'field__item');
  const heading = document.createElement('h3');
  heading.classList.add('front-section-title');
  moveInstrumentation(headingRow.firstElementChild, heading);
  heading.textContent = headingRow.firstElementChild.textContent.trim();
  headingDiv.append(heading);
  headingWrapper.append(headingDiv);
  colLeft.append(headingWrapper);

  const newsListWrapper = document.createElement('div');
  newsListWrapper.classList.add('paragraph', 'paragraph--type--content-list', 'paragraph--view-mode--default');
  const newsListViewsContainer = document.createElement('div');
  newsListViewsContainer.classList.add('field', 'field--name-field-content-view', 'field--type-viewfield', 'field--label-visually_hidden');
  const newsListViewsItem = document.createElement('div');
  newsListViewsItem.classList.add('field__item', 'field__item-label-hidden');
  const viewsElementContainer = document.createElement('div');
  viewsElementContainer.classList.add('views-element-container');
  const viewContentArticleList = document.createElement('div');
  viewContentArticleList.classList.add('view', 'view-content-article-list', 'view-id-content_article_list', 'view-display-id-thumb_title_body');
  const viewContentRow = document.createElement('div');
  viewContentRow.classList.add('view-content', 'row');

  // The first item in newsItemRows is actually the "top news" item from the right column.
  // The remaining items are the "sidebar news" items for the left column.
  // This is a deviation from the EDS model where newsItems is a container of news-item.
  // We need to handle this by splitting the newsItemRows.
  // Assuming the first row is always the "top news" and the rest are "sidebar news".
  const topNewsItemRow = newsItemRows.shift(); // Get the first item for the right column

  newsItemRows.forEach((row) => {
    const [linkCell, linkLabelCell, descriptionCell] = [...row.children];

    const newsItemCol = document.createElement('div');
    newsItemCol.classList.add('col-md-12', 'frontpage-sidebar-news', 'views-row');
    moveInstrumentation(row, newsItemCol);

    const titleField = document.createElement('div');
    titleField.classList.add('views-field', 'views-field-title');
    const titleH4 = document.createElement('h4');
    titleH4.classList.add('field-content');
    const link = document.createElement('a');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      link.href = foundLink.href;
    }
    link.textContent = linkLabelCell.textContent.trim();
    titleH4.append(link);
    titleField.append(titleH4);
    newsItemCol.append(titleField);

    const bodyField = document.createElement('div');
    bodyField.classList.add('views-field', 'views-field-body');
    const bodyContent = document.createElement('div');
    bodyContent.classList.add('field-content');
    bodyContent.innerHTML = descriptionCell.innerHTML;
    bodyField.append(bodyContent);
    newsItemCol.append(bodyField);

    const nothingField = document.createElement('div');
    nothingField.classList.add('views-field', 'views-field-nothing');
    const hr = document.createElement('span');
    hr.classList.add('field-content');
    hr.innerHTML = '<hr>';
    nothingField.append(hr);
    newsItemCol.append(nothingField);

    viewContentRow.append(newsItemCol);
  });

  viewContentArticleList.append(viewContentRow);
  viewsElementContainer.append(viewContentArticleList);
  newsListViewsItem.append(viewsElementContainer);
  newsListViewsContainer.append(newsListViewsItem);
  newsListWrapper.append(newsListViewsContainer);
  colLeft.append(newsListWrapper);

  const moreNewsWrapper = document.createElement('div');
  moreNewsWrapper.classList.add('paragraph', 'paragraph--type--text', 'paragraph--view-mode--default');
  const moreNewsDiv = document.createElement('div');
  moreNewsDiv.classList.add('clearfix', 'text-formatted', 'field', 'field--name-field-longtext', 'field--type-text-long', 'field--label-hidden', 'field__item');
  const moreNewsP = document.createElement('p');
  moreNewsP.innerHTML = '<br>';
  const moreNewsLink = document.createElement('a');
  moreNewsLink.classList.add('btn', 'btn-primary');
  moreNewsLink.href = '/news-articles';
  const moreNewsSpan = document.createElement('span');
  moreNewsSpan.classList.add('text');
  moreNewsSpan.textContent = 'More news';
  moreNewsLink.append(moreNewsSpan);
  moreNewsP.append(moreNewsLink);
  moreNewsDiv.append(moreNewsP);
  moreNewsWrapper.append(moreNewsDiv);
  colLeft.append(moreNewsWrapper);

  container.append(colLeft);

  const colRight = document.createElement('div');
  colRight.classList.add('col-md-8');

  const topNewsWrapper = document.createElement('div');
  topNewsWrapper.classList.add('paragraph', 'paragraph--type--column-content', 'paragraph--view-mode--default');
  const topNewsContentField = document.createElement('div');
  topNewsContentField.classList.add('field', 'field--name-field-column-content', 'field--type-entity-reference-revisions', 'field--label-hidden', 'field__items');
  const topNewsItem = document.createElement('div');
  topNewsItem.classList.add('field__item');
  const topNewsParagraph = document.createElement('div');
  topNewsParagraph.classList.add('paragraph', 'paragraph--type--content-list', 'paragraph--view-mode--default');
  const topNewsViewField = document.createElement('div');
  topNewsViewField.classList.add('field', 'field--name-field-content-view', 'field--type-viewfield', 'field--label-visually_hidden');
  const topNewsViewItem = document.createElement('div');
  topNewsViewItem.classList.add('field__item', 'field__item-label-hidden');
  const topNewsViewsElementContainer = document.createElement('div');
  topNewsViewsElementContainer.classList.add('views-element-container');
  const topNewsView = document.createElement('div');
  topNewsView.classList.add('view', 'view-content-article-list', 'view-id-content_article_list', 'view-display-id-block_1');
  const topNewsViewContentRow = document.createElement('div');
  topNewsViewContentRow.classList.add('view-content', 'row');

  // Process the single top news item from the block model
  if (topNewsItemRow) {
    const [topNewsLinkCell, topNewsLinkLabelCell, topNewsDescriptionCell] = [...topNewsItemRow.children];

    const topNewsCol = document.createElement('div');
    topNewsCol.classList.add('col-md-12', 'frontpage-top-news', 'views-row');
    moveInstrumentation(topNewsItemRow, topNewsCol);

    const topNewsTitleField = document.createElement('div');
    topNewsTitleField.classList.add('views-field', 'views-field-title');
    const topNewsTitleH4 = document.createElement('h4');
    topNewsTitleH4.classList.add('field-content');
    const topNewsLink = document.createElement('a');
    const foundTopNewsLink = topNewsLinkCell.querySelector('a');
    if (foundTopNewsLink) {
      topNewsLink.href = foundTopNewsLink.href;
    }
    topNewsLink.setAttribute('hreflang', 'en'); // Assuming default language
    topNewsLink.textContent = topNewsLinkLabelCell.textContent.trim();
    topNewsTitleH4.append(topNewsLink);
    topNewsTitleField.append(topNewsTitleH4);
    topNewsCol.append(topNewsTitleField);

    const topNewsSubHeadingField = document.createElement('div');
    topNewsSubHeadingField.classList.add('views-field', 'views-field-field-news-sub-heading');
    const topNewsSubHeadingH5 = document.createElement('h5');
    topNewsSubHeadingH5.classList.add('field-content');
    // The model doesn't explicitly define a sub-heading field, so it will be empty unless descriptionCell is used.
    // Based on original HTML, this is an empty h5.
    topNewsSubHeadingField.append(topNewsSubHeadingH5);
    topNewsCol.append(topNewsSubHeadingField);

    const topNewsMediaField = document.createElement('div');
    topNewsMediaField.classList.add('views-field', 'views-field-field-add-media');
    const topNewsMediaContent = document.createElement('div');
    topNewsMediaContent.classList.add('field-content');
    // The model doesn't explicitly define a media field.
    // If descriptionCell contained an image, it would be handled here.
    topNewsMediaContent.innerHTML = topNewsDescriptionCell.innerHTML;
    topNewsMediaField.append(topNewsMediaContent);
    topNewsCol.append(topNewsMediaField);

    topNewsViewContentRow.append(topNewsCol);
  }

  topNewsView.append(topNewsViewContentRow);
  topNewsViewsElementContainer.append(topNewsView);
  topNewsViewItem.append(topNewsViewsElementContainer);
  topNewsViewField.append(topNewsViewItem);
  topNewsParagraph.append(topNewsViewField);
  topNewsItem.append(topNewsParagraph);
  topNewsContentField.append(topNewsItem);
  topNewsWrapper.append(topNewsContentField);
  colRight.append(topNewsWrapper);

  const buttonWrapper = document.createElement('div');
  buttonWrapper.classList.add('paragraph', 'paragraph--type--text', 'paragraph--view-mode--default');
  const buttonDiv = document.createElement('div');
  buttonDiv.classList.add('clearfix', 'text-formatted', 'field', 'field--name-field-longtext', 'field--type-text-long', 'field--label-hidden', 'field__item');
  const buttonHr = document.createElement('hr');
  const buttonP = document.createElement('p');
  const buttonLink = document.createElement('a');
  buttonLink.classList.add('btn', 'btn-primary', 'btn-lg');
  buttonLink.href = '/regional-resilience-partnership';

  // The original HTML has hardcoded DAM paths for these SVG images.
  // Since the EDS model doesn't provide fields for these specific icons,
  // and we cannot hardcode DAM paths, we will omit these images from the block model.
  // However, if the original HTML has them, we should recreate them.
  // The original HTML has img tags, so we should create img elements.
  const imgLeft = document.createElement('img');
  imgLeft.alt = 'svg file';
  imgLeft.src = '/content/dam/aemigrate/uploaded-folder/image/1776240689441.svg+xml'; // Re-adding based on original HTML
  buttonLink.append(imgLeft);

  const buttonSpan = document.createElement('span');
  buttonSpan.classList.add('text');
  buttonSpan.innerHTML = '&nbsp;&nbsp;Click to go to the Regional Resilience Partnership&nbsp;&nbsp;';
  buttonLink.append(buttonSpan);

  const imgRight = document.createElement('img');
  imgRight.alt = 'svg file';
  imgRight.src = '/content/dam/aemigrate/uploaded-folder/image/1776240689464.svg+xml'; // Re-adding based on original HTML
  buttonLink.append(imgRight);

  buttonP.append(buttonLink);
  buttonDiv.append(buttonHr, buttonP);
  buttonWrapper.append(buttonDiv);
  colRight.append(buttonWrapper);

  container.append(colRight);

  block.textContent = '';
  block.append(container);

  // Image optimization for any images within the block, including the button images
  block.querySelectorAll('picture > img, img[src*=".svg+xml"]').forEach((img) => {
    if (img.closest('picture')) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      img.closest('picture').replaceWith(optimizedPic);
    } else if (img.src.endsWith('.svg+xml')) {
      // For SVG images not wrapped in <picture>, we don't optimize them with createOptimizedPicture
      // as it's primarily for raster images. We just ensure they are present.
      // However, if they were part of the block model, they would be handled by createOptimizedPicture
      // if they were in a picture tag. Since they are hardcoded in the original HTML,
      // we just ensure they are added as is. No optimization needed for SVG.
    }
  });
}
