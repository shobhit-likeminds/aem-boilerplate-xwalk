import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    backgroundImageRow,
    titleRow,
    headingRow,
    descriptionRow,
    viewAllLinkRow,
    viewAllLinkLabelRow,
    ...itemRows
  ] = [...block.children];

  block.classList.add('sections', 'personal-mt20', 'crsl-wo-img', 'w-img', 'pbthree', 'pt-0', 'mb-5', 'mt-90', 'spc-0');

  // Background Image
  const bgDiv = document.createElement('div');
  bgDiv.classList.add('bg', 'w-100');
  const picture = backgroundImageRow.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    if (img && img.src) {
      bgDiv.style.backgroundImage = `url("${img.src}")`;
      // Optimize the background image if needed, though it's typically handled by CSS for background-image
      // For actual <img> elements, the createOptimizedPicture pattern is used.
      // For background images, we just use the src directly.
    }
  }
  moveInstrumentation(backgroundImageRow, bgDiv);
  block.append(bgDiv);

  const containerFluid = document.createElement('div');
  containerFluid.classList.add('container-fluid');

  const row = document.createElement('div');
  row.classList.add('row', 'no-gutters', 'justify-content-xl-end');

  const mainBlock = document.createElement('div');
  mainBlock.classList.add('col-12', 'col-xl-12', 'main-block');

  // Heading section
  const headingSection = document.createElement('div');
  headingSection.classList.add('heading', 'cuthalf', 'mw-100');

  const titleDiv = document.createElement('div');
  titleDiv.classList.add('title');
  titleDiv.id = 'personal_section';
  const h3 = document.createElement('h3');
  h3.classList.add('text-gray', 'b-left', 'pl-3', 'mb-3');
  const i = document.createElement('i');
  const b = document.createElement('b');
  moveInstrumentation(titleRow, b);
  b.textContent = titleRow.textContent.trim();
  i.append(b);
  h3.append(i);
  titleDiv.append(h3);
  headingSection.append(titleDiv);

  const h2 = document.createElement('h2');
  h2.classList.add('heading', 'mt-4', 'mb-3', 'h-title');
  moveInstrumentation(headingRow, h2);
  h2.textContent = headingRow.textContent.trim();
  headingSection.append(h2);

  const pDescription = document.createElement('p');
  pDescription.classList.add('fs16', 'd-none', 'd-md-block');
  moveInstrumentation(descriptionRow, pDescription);
  pDescription.textContent = descriptionRow.textContent.trim();
  headingSection.append(pDescription);

  mainBlock.append(headingSection);

  // Carousel Wrapper
  const crslWrap = document.createElement('div');
  crslWrap.classList.add('crsl-wrap');

  const slicker = document.createElement('div');
  slicker.classList.add('slicker', 'slick-initialized', 'slick-slider');

  const slickList = document.createElement('div');
  slickList.classList.add('slick-list', 'draggable');

  const slickTrack = document.createElement('div');
  slickTrack.classList.add('slick-track');
  slickTrack.style.opacity = '1';
  // slickTrack.style.width = '1641px'; // Removed hardcoded width
  slickTrack.style.transform = 'translate3d(0px, 0px, 0px)';

  itemRows.forEach((row, index) => {
    const [
      iconCell,
      itemTitleCell,
      itemDescriptionCell,
      primaryCtaLinkCell,
      primaryCtaLinkLabelCell,
      secondaryCtaLinkCell,
      secondaryCtaLinkLabelCell,
    ] = [...row.children];

    const slickSlide = document.createElement('div');
    slickSlide.classList.add('slick-slide');
    if (index === 0) {
      slickSlide.classList.add('slick-current', 'slick-active');
    }
    slickSlide.setAttribute('data-slick-index', index);
    slickSlide.setAttribute('aria-hidden', index !== 0);
    // slickSlide.style.width = '537px'; // Removed hardcoded width

    const innerDiv = document.createElement('div');
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('box-crsl-items', 'shadow', 'hov');
    // contentDiv.style.width = '100%'; // Removed hardcoded width
    contentDiv.style.display = 'inline-block';

    const iconDiv = document.createElement('div');
    iconDiv.classList.add('icon');
    const iconPicture = iconCell.querySelector('picture');
    if (iconPicture) {
      const img = iconPicture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        optimizedPic.classList.add('img-fluid'); // Add img-fluid to the picture element
        iconDiv.append(optimizedPic);
      }
    }
    contentDiv.append(iconDiv);

    const itemTitle = document.createElement('h3');
    itemTitle.classList.add('title', 'text-capitalize');
    moveInstrumentation(itemTitleCell, itemTitle);
    itemTitle.textContent = itemTitleCell.textContent.trim();
    contentDiv.append(itemTitle);

    const itemDescription = document.createElement('p');
    itemDescription.classList.add('text-gray');
    moveInstrumentation(itemDescriptionCell, itemDescription);
    itemDescription.textContent = itemDescriptionCell.textContent.trim();
    contentDiv.append(itemDescription);

    const actionsDiv = document.createElement('div');
    actionsDiv.classList.add('actions');

    const primaryLink = primaryCtaLinkCell.querySelector('a');
    if (primaryLink) {
      const primaryCta = document.createElement('a');
      primaryCta.href = primaryLink.href;
      primaryCta.classList.add('btn', 'btn-primary');
      // Add gtm_id class if present in original HTML, e.g., gtm_id_savings_accounts
      // This requires parsing the original HTML's gtm_id classes, which is beyond direct EDS model.
      // For now, we'll omit specific gtm_id classes unless explicitly provided in model.
      primaryCta.textContent = primaryCtaLinkLabelCell.textContent.trim();
      moveInstrumentation(primaryCtaLinkCell, primaryCta);
      actionsDiv.append(primaryCta);
    }

    const secondaryLink = secondaryCtaLinkCell.querySelector('a');
    if (secondaryLink) {
      const secondaryCta = document.createElement('a');
      secondaryCta.href = secondaryLink.href;
      secondaryCta.classList.add('btn', 'btn-outline-secondary');
      // Add 'internal' class if applicable, based on original HTML
      secondaryCta.textContent = secondaryCtaLinkLabelCell.textContent.trim();
      moveInstrumentation(secondaryCtaLinkCell, secondaryCta);
      actionsDiv.append(secondaryCta);
    }
    contentDiv.append(actionsDiv);

    innerDiv.append(contentDiv);
    slickSlide.append(innerDiv);
    slickTrack.append(slickSlide);
    moveInstrumentation(row, slickSlide); // Move instrumentation from original row to slickSlide
  });

  slickList.append(slickTrack);
  slicker.append(slickList);
  crslWrap.append(slicker);
  mainBlock.append(crslWrap);

  // View All Link
  const viewAllDiv = document.createElement('div');
  viewAllDiv.classList.add('viewall', 'story');

  const viewAllAnchor = document.createElement('a');
  const originalViewAllLink = viewAllLinkRow.querySelector('a');
  if (originalViewAllLink) {
    viewAllAnchor.href = originalViewAllLink.href;
  }
  moveInstrumentation(viewAllLinkRow, viewAllAnchor);

  const spanText = document.createElement('span');
  spanText.classList.add('d-inline-block', 'align-middle');
  spanText.textContent = viewAllLinkLabelRow.textContent.trim(); // Corrected to use viewAllLinkLabelRow
  moveInstrumentation(viewAllLinkLabelRow, spanText);
  viewAllAnchor.append(spanText);

  // Assuming the SVG icon is part of the viewAllLinkRow or a fixed asset.
  // If it's a fixed asset, it needs to be created. If it's from the model, it would be in a cell.
  // Based on the original HTML, it's a fixed SVG.
  const spanIcon = document.createElement('span');
  spanIcon.classList.add('d-inline-block', 'align-middle');
  const svgImg = document.createElement('img');
  svgImg.alt = 'svg file';
  svgImg.src = '/content/dam/aemigrate/uploaded-folder/image/1776064347766.svg+xml'; // This is a hardcoded path from original HTML, but should ideally come from model if editable.
  spanIcon.append(svgImg);
  viewAllAnchor.append(spanIcon);

  viewAllDiv.append(viewAllAnchor);
  mainBlock.append(viewAllDiv);

  row.append(mainBlock);
  containerFluid.append(row);
  block.append(containerFluid);

  // Clean up original block content
  block.textContent = '';
  block.append(bgDiv, containerFluid);

  // Image optimization for all images within the block
  block.querySelectorAll('picture > img').forEach((img) => {
    // Check if the image is the background image's source, which is handled via CSS
    // and not replaced by a <picture> element.
    if (!img.closest('.bg')) { // Only optimize if not the background image
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      img.closest('picture').replaceWith(optimizedPic);
    }
  });
}
