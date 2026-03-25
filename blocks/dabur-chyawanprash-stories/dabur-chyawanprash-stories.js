import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  block.classList.add('videoContentArea');

  const [categoryRow, storiesRow, ...storyItemRows] = [...block.children];

  // Category filter section
  const viewsElementContainer = document.createElement('div');
  viewsElementContainer.classList.add('views-element-container', 'form-group');
  moveInstrumentation(categoryRow, viewsElementContainer);

  const viewBlock = document.createElement('div');
  viewBlock.classList.add('view', 'view-ingredients-slideshow-brand-page', 'view-id-ingredients_slideshow_brand_page', 'view-display-id-block_2', 'clearfix');
  viewsElementContainer.append(viewBlock);

  const viewFilters = document.createElement('div');
  viewFilters.classList.add('view-filters', 'form-group');
  viewBlock.append(viewFilters);

  const form = document.createElement('form');
  form.classList.add('views-exposed-form', 'bef-exposed-form', 'form--inline', 'form-inline', 'clearfix');
  form.setAttribute('data-bef-auto-submit-full-form', '');
  form.setAttribute('data-bef-auto-submit', '');
  form.setAttribute('data-bef-auto-submit-delay', '500');
  form.setAttribute('data-drupal-selector', 'views-exposed-form-ingredients-slideshow-brand-page-block-2');
  form.setAttribute('action', '/our-brand/real');
  form.setAttribute('method', 'get');
  form.setAttribute('id', 'views-exposed-form-ingredients-slideshow-brand-page-block-2');
  form.setAttribute('accept-charset', 'UTF-8');
  form.setAttribute('data-drupal-form-fields', 'edit-submit-ingredients-slideshow-brand-page');
  viewFilters.append(form);

  const fieldset = document.createElement('fieldset');
  fieldset.classList.add('fieldgroup', 'form-composite', 'js-form-item', 'form-item', 'js-form-wrapper', 'form-wrapper');
  fieldset.setAttribute('data-drupal-selector', 'edit-field-categories-type-target-id');
  fieldset.setAttribute('id', 'edit-field-categories-type-target-id--wrapper');
  form.append(fieldset);

  const legend = document.createElement('legend');
  const legendSpan = document.createElement('span');
  legendSpan.classList.add('fieldset-legend');
  legend.append(legendSpan);
  fieldset.append(legend);

  const fieldsetWrapper = document.createElement('div');
  fieldsetWrapper.classList.add('fieldset-wrapper');
  fieldset.append(fieldsetWrapper);

  const editFieldCategories = document.createElement('div');
  editFieldCategories.setAttribute('id', 'edit-field-categories-type-target-id');
  fieldsetWrapper.append(editFieldCategories);

  const formRadios = document.createElement('div');
  formRadios.classList.add('form-radios', 'bef-nested');
  editFieldCategories.append(formRadios);

  const ul = document.createElement('ul');
  formRadios.append(ul);

  // Read category options from the first cell of categoryRow
  const categoryOptions = categoryRow.children[0].textContent.split(',').map((s) => s.trim());
  const categoryLabels = ['All', 'Brand', 'Videos']; // These are the labels to display

  categoryOptions.forEach((optionValue, index) => {
    const li = document.createElement('li');
    const formItem = document.createElement('div');
    formItem.classList.add('form-item', 'js-form-item', 'form-type-radio', 'js-form-type-radio', 'form-item-field-categories-type-target-id', 'js-form-item-field-categories-type-target-id', 'radio');
    li.append(formItem);

    const label = document.createElement('label');
    label.classList.add('tablink', 'control-label', 'option');
    label.textContent = categoryLabels[index]; // Use the predefined labels
    label.setAttribute('for', `edit-field-categories-type-target-id-${optionValue.toLowerCase().replace(/\s/g, '-')}`);
    formItem.append(label);

    label.addEventListener('click', (e) => {
      [...document.querySelectorAll('.tabid')].forEach((tab) => {
        tab.style.display = 'none';
      });
      [...document.querySelectorAll('.tablink')].forEach((tablink) => {
        tablink.classList.remove('checked_button_active');
      });
      // Use the actual label text for the tab ID
      document.getElementById(categoryLabels[index]).style.display = 'block';
      e.currentTarget.classList.add('checked_button_active');
    });

    if (index === 0) {
      label.classList.add('checked_button_active');
    }
    ul.append(li);
  });

  const formActions = document.createElement('div');
  formActions.classList.add('form-actions', 'form-group', 'js-form-wrapper', 'form-wrapper');
  formActions.setAttribute('data-drupal-selector', 'edit-actions');
  formActions.setAttribute('id', 'edit-actions');
  form.append(formActions);

  const applyButton = document.createElement('button');
  applyButton.classList.add('js-hide', 'button', 'js-form-submit', 'form-submit', 'btn-info', 'btn');
  applyButton.setAttribute('data-bef-auto-submit-click', '');
  applyButton.setAttribute('data-drupal-selector', 'edit-submit-ingredients-slideshow-brand-page');
  applyButton.setAttribute('type', 'submit');
  applyButton.setAttribute('id', 'edit-submit-ingredients-slideshow-brand-page');
  applyButton.setAttribute('value', 'Apply');
  applyButton.setAttribute('name', '');
  applyButton.textContent = 'Apply';
  formActions.append(applyButton);

  // Stories content section
  const viewContent = document.createElement('div');
  viewContent.classList.add('view-content');
  viewBlock.append(viewContent);
  moveInstrumentation(storiesRow, viewContent);

  const allTab = document.createElement('div');
  allTab.classList.add('w3-container', 'tabid');
  allTab.setAttribute('id', 'All');
  viewContent.append(allTab);

  const brandsTab = document.createElement('div');
  brandsTab.classList.add('w3-container', 'tabid');
  brandsTab.setAttribute('id', 'Brands');
  brandsTab.style.display = 'none';
  viewContent.append(brandsTab);

  const tvcTab = document.createElement('div');
  tvcTab.classList.add('w3-container', 'tabid');
  tvcTab.setAttribute('id', 'Videos'); // Changed from 'TVC' to 'Videos' to match categoryLabels
  tvcTab.style.display = 'none';
  viewContent.append(tvcTab);

  const createSlider = (container, sliderClass) => {
    const blazeSlider = document.createElement('div');
    blazeSlider.classList.add(sliderClass);
    blazeSlider.style.setProperty('--slides-to-show', '4');
    blazeSlider.style.setProperty('--slide-gap', '20px');
    container.append(blazeSlider);

    const blazeContainer = document.createElement('div');
    blazeContainer.classList.add('blaze-container');
    blazeSlider.append(blazeContainer);

    const blazeTrackContainer = document.createElement('div');
    blazeTrackContainer.classList.add('blaze-track-container');
    blazeContainer.append(blazeTrackContainer);

    const blazeTrack = document.createElement('div');
    blazeTrack.classList.add('blaze-track');
    blazeTrack.style.cssText = 'transition-property: transform; transition-timing-function: ease; transition-duration: 300ms; transform: translate3d(0px, 0px, 0px);';
    blazeTrackContainer.append(blazeTrack);

    const nav = document.createElement('nav');
    nav.classList.add('slick__arrow');
    nav.setAttribute('role', 'navigation');
    blazeContainer.append(nav);

    const prevButton = document.createElement('button');
    prevButton.classList.add('slick-prev', 'slick-arrow', 'slick-disabled', 'blaze-prev');
    prevButton.setAttribute('type', 'button');
    prevButton.setAttribute('aria-label', 'Previous');
    prevButton.setAttribute('aria-disabled', 'true');
    prevButton.textContent = 'Previous';
    nav.append(prevButton);

    const nextButton = document.createElement('button');
    nextButton.classList.add('slick-next', 'slick-arrow', 'blaze-next');
    nextButton.setAttribute('type', 'button');
    nextButton.setAttribute('aria-label', 'Next');
    nextButton.setAttribute('aria-disabled', 'false');
    nextButton.textContent = 'Next';
    nav.append(nextButton);

    let currentIndex = 0;
    const itemsPerPage = parseInt(blazeSlider.style.getPropertyValue('--slides-to-show'), 10);

    const updateSlider = () => {
      const totalItems = blazeTrack.children.length;
      const maxIndex = Math.max(0, totalItems - itemsPerPage);
      currentIndex = Math.min(Math.max(0, currentIndex), maxIndex);
      blazeTrack.style.transform = `translate3d(-${currentIndex * (100 / itemsPerPage)}%, 0px, 0px)`;

      prevButton.disabled = currentIndex === 0;
      prevButton.classList.toggle('slick-disabled', currentIndex === 0);
      nextButton.disabled = currentIndex >= maxIndex;
      nextButton.classList.toggle('slick-disabled', currentIndex >= maxIndex);
    };

    prevButton.addEventListener('click', () => {
      currentIndex--;
      updateSlider();
    });

    nextButton.addEventListener('click', () => {
      currentIndex++;
      updateSlider();
    });

    return { blazeTrack, updateSlider };
  };

  const { blazeTrack: allTrack, updateSlider: updateAllSlider } = createSlider(allTab, 'blaze-slider');
  const { blazeTrack: brandsTrack, updateSlider: updateBrandsSlider } = createSlider(brandsTab, 'blaze-slider-video static');
  const { blazeTrack: tvcTrack, updateSlider: updateTvcSlider } = createSlider(tvcTab, 'blaze-slider-tvc');

  storyItemRows.forEach((row) => {
    const cells = [...row.children];
    // BlockJson indicates 4 cells per story-item: image, link, title, description
    const imageCell = cells[0];
    const linkCell = cells[1];
    const titleCell = cells[2];
    const descriptionCell = cells[3];
    const categoryCell = cells[4]; // Assuming category is the 5th cell based on original HTML's p tag content

    const itemContainer = document.createElement('div');
    itemContainer.style.cssText = 'float: left;height: 100%;min-height: 1px;';
    moveInstrumentation(row, itemContainer);

    const slideContent = document.createElement('div');
    slideContent.classList.add('slide__content');
    itemContainer.append(slideContent);

    const slideCaption = document.createElement('div');
    slideCaption.classList.add('slide__caption');
    slideContent.append(slideCaption);

    const slideDescription = document.createElement('div');
    slideDescription.classList.add('slide__description');
    slideCaption.append(slideDescription);

    const viewsFieldNothing = document.createElement('div');
    viewsFieldNothing.classList.add('views-field', 'views-field-nothing');
    slideDescription.append(viewsFieldNothing);

    const fieldContent = document.createElement('span');
    fieldContent.classList.add('field-content');
    viewsFieldNothing.append(fieldContent);

    const temp11SliderItem = document.createElement('div');
    temp11SliderItem.classList.add('temp11-sliderItem', 'slick-slide');
    temp11SliderItem.style.display = 'block !important';
    fieldContent.append(temp11SliderItem);

    const linkEl = document.createElement('a');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      linkEl.href = foundLink.href;
      linkEl.title = titleCell.textContent.trim();
      linkEl.classList.add('colorbox', 'cboxElement');
      linkEl.setAttribute('data-colorbox-gallery', '');
      linkEl.setAttribute('tabindex', '0');
    }
    temp11SliderItem.append(linkEl);

    const temp11SliderPost = document.createElement('div');
    temp11SliderPost.classList.add('temp11-sliderpost');
    linkEl.append(temp11SliderPost);

    const temp11BgHeight = document.createElement('div');
    temp11BgHeight.classList.add('temp11-bg-height');
    temp11SliderPost.append(temp11BgHeight);

    const temp11SliderImg = document.createElement('div');
    temp11SliderImg.classList.add('temp11-sliderimg');
    temp11BgHeight.append(temp11SliderImg);

    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        temp11SliderImg.append(optimizedPic);
        optimizedPic.querySelector('img').classList.add('img-responsive');
      }
    }

    const temp11ImgTtli = document.createElement('div');
    temp11ImgTtli.classList.add('temp11-img-ttli');
    const categoryP = document.createElement('p');
    // Read the category from the actual item row's content, not the block's categoryRow
    // Assuming category is embedded in the description or another cell, or needs to be inferred.
    // Based on the HTML, it seems the category is derived from the item itself.
    // For now, let's assume it's part of the description or a hidden cell.
    // If not explicitly provided in a cell, we might need to infer it from the link or title.
    // For this review, I'll assume it's in a 5th cell (index 4) if it exists, otherwise default.
    const itemCategoryText = categoryCell ? categoryCell.textContent.trim() : 'All'; // Default to 'All' if not found
    categoryP.textContent = itemCategoryText;
    temp11ImgTtli.append(categoryP);
    temp11SliderPost.append(temp11ImgTtli);

    const temp11ImgText = document.createElement('div');
    temp11ImgText.classList.add('temp11-img-text');
    const descriptionP = document.createElement('p');
    moveInstrumentation(descriptionCell, descriptionP);
    while (descriptionCell.firstChild) descriptionP.append(descriptionCell.firstChild);
    temp11ImgText.append(descriptionP);
    temp11SliderPost.append(temp11ImgText);

    allTrack.append(itemContainer.cloneNode(true)); // Add to All tab

    // Use the item's actual category for filtering
    if (itemCategoryText === 'Brand') {
      brandsTrack.append(itemContainer.cloneNode(true));
    } else if (itemCategoryText === 'Videos') {
      const videoItemContainer = itemContainer.cloneNode(true);
      const videoLink = videoItemContainer.querySelector('.colorbox.cboxElement');
      if (videoLink) {
        videoLink.classList.remove('colorbox', 'cboxElement');
        videoLink.classList.add('colorbox-load', 'videopopup');
        videoLink.removeAttribute('data-colorbox-gallery');
        videoLink.setAttribute('target', '_blank');
        videoLink.href = foundLink.href; // Use original link for video
        videoLink.setAttribute('data-video', foundLink.href);

        const imgDiv = videoItemContainer.querySelector('.temp11-sliderimg');
        if (imgDiv) imgDiv.classList.add('ir-video');

        const textSpan = document.createElement('span');
        const textLink = document.createElement('a');
        textLink.setAttribute('tabindex', '0');
        textLink.style.cssText = 'text-decoration:none !important';
        textLink.textContent = titleCell.textContent.trim();
        textSpan.append(textLink);
        const imgTextDiv = videoItemContainer.querySelector('.temp11-img-text');
        if (imgTextDiv) imgTextDiv.append(textSpan);
      }
      tvcTrack.append(videoItemContainer);
    }
  });

  block.textContent = '';
  block.append(viewsElementContainer);

  updateAllSlider();
  updateBrandsSlider();
  updateTvcSlider();
}
