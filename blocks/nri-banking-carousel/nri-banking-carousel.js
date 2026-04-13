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

  block.classList.add('sections', 'nri-banking', 'crsl-wo-img', 'w-img', 'pbthree', 'pt-0', 'mb-5', 'xl-mt-140');

  // Background Image
  const bgDiv = document.createElement('div');
  bgDiv.classList.add('bg', 'w-100');
  const backgroundPicture = backgroundImageRow.querySelector('picture');
  if (backgroundPicture) {
    const imgSrc = backgroundPicture.querySelector('img').src;
    bgDiv.style.backgroundImage = `url("${imgSrc}")`;
  }
  moveInstrumentation(backgroundImageRow, bgDiv);
  block.append(bgDiv);

  const containerFluid = document.createElement('div');
  containerFluid.classList.add('container-fluid');
  block.append(containerFluid);

  const row = document.createElement('div');
  row.classList.add('row', 'no-gutters', 'justify-content-xl-end');
  containerFluid.append(row);

  const mainBlockCol = document.createElement('div');
  mainBlockCol.classList.add('col-12', 'col-xl-12', 'main-block');
  row.append(mainBlockCol);

  const headingDiv = document.createElement('div');
  headingDiv.classList.add('heading', 'mt240', 'cuthalf', 'mw-100');
  mainBlockCol.append(headingDiv);

  // Title
  const titleWrapper = document.createElement('div');
  titleWrapper.classList.add('title');
  const h3Title = document.createElement('h3');
  h3Title.classList.add('text-gray', 'b-left', 'pl-3', 'mb-3');
  const iTitle = document.createElement('i');
  const bTitle = document.createElement('b');
  moveInstrumentation(titleRow, bTitle);
  bTitle.textContent = titleRow.textContent.trim();
  iTitle.append(bTitle);
  h3Title.append(iTitle);
  titleWrapper.append(h3Title);
  headingDiv.append(titleWrapper);

  // Heading
  const h2Heading = document.createElement('h2');
  h2Heading.classList.add('heading', 'mt-4', 'mb-3', 'h-title');
  moveInstrumentation(headingRow, h2Heading);
  h2Heading.innerHTML = headingRow.textContent.trim().replace(/\n/g, '<br>');
  headingDiv.append(h2Heading);

  // Description
  const pDescription = document.createElement('p');
  pDescription.classList.add('fs16', 'd-none', 'd-md-block');
  moveInstrumentation(descriptionRow, pDescription);
  pDescription.textContent = descriptionRow.textContent.trim();
  headingDiv.append(pDescription);

  // Carousel Items
  const crslWrap = document.createElement('div');
  crslWrap.classList.add('crsl-wrap');
  mainBlockCol.append(crslWrap);

  const slicker = document.createElement('div');
  slicker.classList.add('slicker', 't-left', 'slick-initialized', 'slick-slider');
  crslWrap.append(slicker);

  const slickList = document.createElement('div');
  slickList.classList.add('slick-list', 'draggable');
  slicker.append(slickList);

  const slickTrack = document.createElement('div');
  slickTrack.classList.add('slick-track');
  slickTrack.style.opacity = '1';
  slickList.append(slickTrack);

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
    slickTrack.append(slickSlide);

    const slideContentWrapper = document.createElement('div');
    slickSlide.append(slideContentWrapper);

    const innerSlideContent = document.createElement('div');
    innerSlideContent.classList.add('box-crsl-items', 'shadow');
    slideContentWrapper.append(innerSlideContent);
    moveInstrumentation(row, innerSlideContent);

    // Icon
    const iconDiv = document.createElement('div');
    iconDiv.classList.add('icon');
    const iconPicture = iconCell.querySelector('picture');
    if (iconPicture) {
      const img = iconPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: 'auto' }]);
      optimizedPic.querySelector('img').classList.add('img-fluid');
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      iconDiv.append(optimizedPic);
    }
    innerSlideContent.append(iconDiv);

    // Item Title
    const h3ItemTitle = document.createElement('h3');
    h3ItemTitle.classList.add('title', 'text-capitalize');
    moveInstrumentation(itemTitleCell, h3ItemTitle);
    h3ItemTitle.textContent = itemTitleCell.textContent.trim();
    innerSlideContent.append(h3ItemTitle);

    // Item Description
    const pItemDescription = document.createElement('p');
    pItemDescription.classList.add('text-gray');
    moveInstrumentation(itemDescriptionCell, pItemDescription);
    pItemDescription.textContent = itemDescriptionCell.textContent.trim();
    innerSlideContent.append(pItemDescription);

    // CTAs
    const actionsDiv = document.createElement('div');
    actionsDiv.classList.add('actions', 'd-flex', 'justify-content-center');

    const primaryLink = primaryCtaLinkCell.querySelector('a');
    if (primaryLink) {
      const primaryCta = document.createElement('a');
      primaryCta.classList.add('btn', 'btn-primary');
      primaryCta.href = primaryLink.href;
      primaryCta.textContent = primaryCtaLinkLabelCell.textContent.trim();
      moveInstrumentation(primaryCtaLinkCell, primaryCta);
      actionsDiv.append(primaryCta);
    }

    const secondaryLink = secondaryCtaLinkCell.querySelector('a');
    if (secondaryLink) {
      const secondaryCta = document.createElement('a');
      secondaryCta.classList.add('btn', 'btn-outline-secondary');
      secondaryCta.href = secondaryLink.href;
      secondaryCta.textContent = secondaryCtaLinkLabelCell.textContent.trim();
      moveInstrumentation(secondaryCtaLinkCell, secondaryCta);
      actionsDiv.append(secondaryCta);
    }
    innerSlideContent.append(actionsDiv);
  });

  // View All Link
  const viewAllDiv = document.createElement('div');
  viewAllDiv.classList.add('viewall', 'story');
  mainBlockCol.append(viewAllDiv);

  const viewAllAnchor = document.createElement('a');
  const originalViewAllLink = viewAllLinkRow.querySelector('a');
  if (originalViewAllLink) {
    viewAllAnchor.href = originalViewAllLink.href;
  }
  moveInstrumentation(viewAllLinkRow, viewAllAnchor);

  const spanLabel = document.createElement('span');
  spanLabel.classList.add('d-inline-block', 'align-middle');
  spanLabel.textContent = viewAllLinkLabelRow.textContent.trim();
  moveInstrumentation(viewAllLinkLabelRow, spanLabel);
  viewAllAnchor.append(spanLabel);

  const spanIcon = document.createElement('span');
  spanIcon.classList.add('d-inline-block', 'align-middle');
  // Re-adding the SVG icon based on the original HTML
  // The original HTML has an img tag for the SVG, so we'll replicate that.
  const svgImg = document.createElement('img');
  svgImg.alt = 'svg file';
  // Assuming the SVG source is static or can be derived from the model if it were a field.
  // For now, hardcoding based on the original HTML example.
  svgImg.src = '/content/dam/aemigrate/uploaded-folder/image/1776064347766.svg+xml';
  spanIcon.append(svgImg);
  viewAllAnchor.append(spanIcon); // Append the icon span to the anchor
  viewAllDiv.append(viewAllAnchor); // Append the anchor to the viewAllDiv

  // Image optimization
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
