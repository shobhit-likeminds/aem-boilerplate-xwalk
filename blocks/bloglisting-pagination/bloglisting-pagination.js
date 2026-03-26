import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [pageSizeRow] = [...block.children];

  // Corrected block class name from original HTML
  block.classList.add('blogListing-pagination-7JB', 'grid');

  const paginationRoot = document.createElement('div');
  paginationRoot.classList.add(
    'pagination-root-SR6',
    'bg-white',
    'border-t',
    'border-solid',
    'border-subtle',
    'gap-1',
    'grid',
    'grid-flow-col',
    'justify-center',
    'px-0',
    'py-xs',
    'text-center',
  );

  // Previous button
  const prevButton = document.createElement('button');
  prevButton.classList.add(
    'navButton-root-sWY',
    'button-root_normalPriority-Z4b',
    'button-root-3iv',
    'border-[1px]',
    'border-solid',
    'cursor-pointer',
    'inline-flex',
    'items-center',
    'justify-center',
    'leading-tight',
    'max-w-full',
    'min-w-[10rem]',
    'outline-none',
    'pointer-events-auto',
    'px-sm',
    'text-center',
    'text-sm',
    'uppercase',
    'disabled_bg-gray-400',
    'disabled_border-gray-400',
    'disabled_opacity-50',
    'disabled_pointer-events-none',
    'disabled_text-white',
    'focus_shadow-inputFocus',
    'bg-blue-60',
    'border-blue-60',
    'text-white',
    'active_bg-blue-80',
    'active_border-blue-80',
    'active_text-white',
    'hover_bg-blue-80',
    'hover_border-blue-80',
    'hover_text-white',
    'min-w-[6.3rem]',
  );
  prevButton.setAttribute('aria-label', 'move to the previous page');
  prevButton.setAttribute('disabled', '');

  const prevButtonSpan = document.createElement('span');
  // Removed redundant classes from span, keeping only those from original HTML
  prevButtonSpan.classList.add(
    'navButton-icon_disabled-V7O',
    'navButton-icon-tob',
  );
  const prevImg = document.createElement('img');
  prevImg.setAttribute('alt', 'svg file');
  prevImg.setAttribute('src', '/content/dam/aemigrate/uploaded-folder/image/1774517932491.svg+xml');
  prevButtonSpan.append(prevImg);
  prevButton.append(prevButtonSpan);
  paginationRoot.append(prevButton);

  // Next button
  const nextButton = document.createElement('button');
  nextButton.classList.add(
    'navButton-root-sWY',
    'button-root_normalPriority-Z4b',
    'button-root-3iv',
    'border-[1px]',
    'border-solid',
    'cursor-pointer',
    'inline-flex',
    'items-center',
    'justify-center',
    'leading-tight',
    'max-w-full',
    'min-w-[10rem]',
    'outline-none',
    'pointer-events-auto',
    'px-sm',
    'text-center',
    'text-sm',
    'uppercase',
    'disabled_bg-gray-400',
    'disabled_border-gray-400',
    'disabled_opacity-50',
    'disabled_pointer-events-none',
    'disabled_text-white',
    'focus_shadow-inputFocus',
    'bg-blue-60',
    'border-blue-60',
    'text-white',
    'active_bg-blue-80',
    'active_border-blue-80',
    'active_text-white',
    'hover_bg-blue-80',
    'hover_border-blue-80',
    'hover_text-white',
    'min-w-[6.3rem]',
  );
  nextButton.setAttribute('aria-label', 'move to the next page');

  const nextButtonSpan = document.createElement('span');
  // Removed redundant classes from span, keeping only those from original HTML
  nextButtonSpan.classList.add(
    'navButton-icon-tob',
  );
  const nextImg = document.createElement('img');
  nextImg.setAttribute('alt', 'svg file');
  nextImg.setAttribute('src', '/content/dam/aemigrate/uploaded-folder/image/1774517932520.svg+xml');
  nextButtonSpan.append(nextImg);
  nextButton.append(nextButtonSpan);
  paginationRoot.append(nextButton);

  block.append(paginationRoot);

  const pageSizeDiv = document.createElement('div');
  pageSizeDiv.classList.add('blogListing-pageSize-C5l', 'grid');
  pageSizeDiv.textContent = 'Show ';

  const pageSizeInputSpan = document.createElement('span');
  pageSizeInputSpan.classList.add('blogListing-pageSizeInput-gCy');

  const selectEl = document.createElement('select');
  // The BlockJson indicates 'page-size' is a select with options, and the EDS structure shows
  // block.children[0] contains the options as a comma-separated string.
  const options = pageSizeRow.firstElementChild.textContent.split(',').map((option) => option.trim());
  options.forEach((value) => {
    const optionEl = document.createElement('option');
    optionEl.value = value;
    optionEl.textContent = value;
    selectEl.append(optionEl);
  });
  moveInstrumentation(pageSizeRow.firstElementChild, selectEl);
  pageSizeInputSpan.append(selectEl);
  pageSizeDiv.append(pageSizeInputSpan);
  pageSizeDiv.append(' per page');

  block.append(pageSizeDiv);
  pageSizeRow.remove(); // Remove the original page size row

  // Add event listener for the select element
  selectEl.addEventListener('change', (event) => {
    // eslint-disable-next-line no-console
    console.log('Selected page size:', event.target.value);
    // TODO: Implement actual pagination logic here, e.g.,
    // - Fetch new data based on selected page size
    // - Update the blog listing content
    // - Update pagination buttons (enable/disable, page numbers)
  });
}
