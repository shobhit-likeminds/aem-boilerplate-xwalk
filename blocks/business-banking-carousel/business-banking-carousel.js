import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    backgroundImageRow,
    sectionTitleRow,
    headingRow,
    descriptionRow,
    viewAllLinkRow,
    viewAllLinkLabelRow, // This row contains the link text, but the actual link is in viewAllLinkRow
    ...itemRows
  ] = [...block.children];

  block.classList.add('sections', 'bussiness-banking', 'crsl-wo-img', 'w-img', 'pbthree', 'pt-0', 'mb-5', 'mt-90', 'mob-spc-40');

  // Background Image
  const bgDiv = document.createElement('div');
  bgDiv.classList.add('bg', 'w-100', 'h870');
  const backgroundPicture = backgroundImageRow.querySelector('picture');
  if (backgroundPicture) {
    const img = backgroundPicture.querySelector('img');
    if (img) {
      bgDiv.style.backgroundImage = `url("${img.src}")`;
      // Optimize image
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '1920' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      backgroundPicture.replaceWith(optimizedPic);
    }
  }
  moveInstrumentation(backgroundImageRow, bgDiv); // Move instrumentation from row to bgDiv
  block.append(bgDiv);

  const containerFluid = document.createElement('div');
  containerFluid.classList.add('container-fluid');
  block.append(containerFluid);

  const rowNoGutters = document.createElement('div');
  rowNoGutters.classList.add('row', 'no-gutters', 'justify-content-xl-end');
  containerFluid.append(rowNoGutters);

  const mainBlockCol = document.createElement('div');
  mainBlockCol.classList.add('col-12', 'col-xl-12', 'main-block');
  mainBlockCol.id = 'business_block';
  rowNoGutters.append(mainBlockCol);

  const headingRowWrapper = document.createElement('div');
  headingRowWrapper.classList.add('row', 'mt-180');
  mainBlockCol.append(headingRowWrapper);

  const headingCol = document.createElement('div');
  headingCol.classList.add('col-12', 'col-sm-11', 'offset-sm-1', 'col-md-8', 'offset-md-4', 'col-lg-6', 'offset-lg-6', 'col-xl-7', 'offset-xl-5');
  headingRowWrapper.append(headingCol);

  const headingDiv = document.createElement('div');
  headingDiv.classList.add('heading', 'cuthalf', 'mw-100', 'f-right');
  headingCol.append(headingDiv);

  // Section Title
  const titleDiv = document.createElement('div');
  titleDiv.classList.add('title');
  const h3 = document.createElement('h3');
  h3.classList.add('text-gray', 'b-left', 'pl-3', 'mb-3', 'ml155');
  const i = document.createElement('i');
  const b = document.createElement('b');
  b.textContent = sectionTitleRow.textContent.trim();
  i.append(b);
  h3.append(i);
  titleDiv.append(h3);
  moveInstrumentation(sectionTitleRow, h3);
  headingDiv.append(titleDiv);

  // Heading
  const h2 = document.createElement('h2');
  h2.classList.add('heading', 'mt-4', 'mb-3', 'h-title', 'ml155');
  h2.innerHTML = headingRow.textContent.trim(); // Use innerHTML as it contains <br>
  moveInstrumentation(headingRow, h2);
  headingDiv.append(h2);

  // Description
  const pDescription = document.createElement('p');
  pDescription.classList.add('fs16', 'd-none', 'd-md-block');
  pDescription.textContent = descriptionRow.textContent.trim();
  moveInstrumentation(descriptionRow, pDescription);
  headingDiv.append(pDescription);

  // Carousel Items
  const crslWrap = document.createElement('div');
  crslWrap.classList.add('crsl-wrap');
  mainBlockCol.append(crslWrap);

  const slicker = document.createElement('div');
  slicker.classList.add('slicker', 'slick-initialized', 'slick-slider');
  crslWrap.append(slicker);

  const slickList = document.createElement('div');
  slickList.classList.add('slick-list', 'draggable');
  slicker.append(slickList);

  const slickTrack = document.createElement('div');
  slickTrack.classList.add('slick-track');
  slickTrack.style.opacity = '1';
  slickTrack.style.width = `${itemRows.length * 537}px`; // Adjust width based on number of items
  slickTrack.style.transform = 'translate3d(0px, 0px, 0px)';
  slickList.append(slickTrack);

  itemRows.forEach((row, index) => {
    const [
      iconCell,
      titleCell,
      textCell,
      primaryCtaLinkCell,
      primaryCtaLinkLabelCell,
      secondaryCtaLinkCell,
      secondaryCtaLinkLabelCell,
    ] = [...row.children];

    const slickSlide = document.createElement('div');
    slickSlide.classList.add('slick-slide');
    if (index === 0) {
      slickSlide.classList.add('slick-current', 'slick-active');
    } else {
      slickSlide.setAttribute('aria-hidden', 'true');
    }
    slickSlide.setAttribute('data-slick-index', index);
    slickSlide.style.width = '537px';

    const innerDiv = document.createElement('div');
    const innerInnerDiv = document.createElement('div');
    innerInnerDiv.style.width = '100%';
    innerInnerDiv.style.display = 'inline-block';
    innerDiv.append(innerInnerDiv);
    slickSlide.append(innerDiv);

    const boxCrslItems = document.createElement('div');
    boxCrslItems.classList.add('box-crsl-items', 'shadow');
    innerInnerDiv.append(boxCrslItems);

    // Icon
    const iconDiv = document.createElement('div');
    iconDiv.classList.add('icon');
    const iconPicture = iconCell.querySelector('picture');
    if (iconPicture) {
      const img = iconPicture.querySelector('img');
      if (img) {
        const newImg = document.createElement('img');
        newImg.src = img.src;
        newImg.alt = img.alt;
        newImg.classList.add('img-fluid');
        moveInstrumentation(img, newImg);
        iconDiv.append(newImg);
      }
    }
    moveInstrumentation(iconCell, iconDiv);
    boxCrslItems.append(iconDiv);

    // Title
    const itemTitle = document.createElement('h3');
    itemTitle.classList.add('title', 'text-capitalize');
    itemTitle.textContent = titleCell.textContent.trim();
    moveInstrumentation(titleCell, itemTitle);
    boxCrslItems.append(itemTitle);

    // Text
    const itemText = document.createElement('p');
    itemText.classList.add('text-gray');
    itemText.textContent = textCell.textContent.trim();
    moveInstrumentation(textCell, itemText);
    boxCrslItems.append(itemText);

    // Actions
    const actionsDiv = document.createElement('div');
    actionsDiv.classList.add('actions');

    // Primary CTA
    const primaryCtaLink = primaryCtaLinkCell.querySelector('a');
    if (primaryCtaLink) {
      const btnPrimary = document.createElement('a');
      btnPrimary.href = primaryCtaLink.href;
      btnPrimary.classList.add('btn', 'btn-primary');
      btnPrimary.textContent = primaryCtaLinkLabelCell.textContent.trim();
      moveInstrumentation(primaryCtaLinkCell, btnPrimary);
      moveInstrumentation(primaryCtaLinkLabelCell, btnPrimary);
      actionsDiv.append(btnPrimary);
    }

    // Secondary CTA
    const secondaryCtaLink = secondaryCtaLinkCell.querySelector('a');
    if (secondaryCtaLink) {
      const btnSecondary = document.createElement('a');
      btnSecondary.href = secondaryCtaLink.href;
      btnSecondary.classList.add('btn', 'btn-outline-secondary');
      btnSecondary.textContent = secondaryCtaLinkLabelCell.textContent.trim();
      moveInstrumentation(secondaryCtaLinkCell, btnSecondary);
      moveInstrumentation(secondaryCtaLinkLabelCell, btnSecondary);
      actionsDiv.append(btnSecondary);
    }
    boxCrslItems.append(actionsDiv);
    slickTrack.append(slickSlide);
    moveInstrumentation(row, slickSlide); // Move instrumentation from item row to slickSlide
  });

  // View All Link
  const viewAllDiv = document.createElement('div');
  viewAllDiv.classList.add('viewall', 'story', 'mt50');
  const viewAllAnchor = document.createElement('a');
  const originalViewAllLink = viewAllLinkRow.querySelector('a');
  if (originalViewAllLink) {
    viewAllAnchor.href = originalViewAllLink.href;
  }

  const spanLabel = document.createElement('span');
  spanLabel.classList.add('d-inline-block', 'align-middle');
  // The label for the "View All Link" is the text content of the anchor in viewAllLinkRow
  spanLabel.textContent = originalViewAllLink ? originalViewAllLink.textContent.trim() : '';
  viewAllAnchor.append(spanLabel);

  const spanImg = document.createElement('span');
  spanImg.classList.add('d-inline-block', 'align-middle');
  // Add the SVG icon as per the original HTML
  spanImg.innerHTML = '<img alt="svg file" src="/content/dam/aemigrate/uploaded-folder/image/1776064347766.svg+xml"/>';
  viewAllAnchor.append(spanImg);

  viewAllDiv.append(viewAllAnchor);
  moveInstrumentation(viewAllLinkRow, viewAllAnchor);
  moveInstrumentation(viewAllLinkLabelRow, viewAllAnchor); // Still move instrumentation from the label row
  mainBlockCol.append(viewAllDiv);

  // Optimize all images in the block
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
