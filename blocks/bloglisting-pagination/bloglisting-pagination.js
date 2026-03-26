import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [pageSizeRow] = [...block.children];

  const pageSize = parseInt(pageSizeRow.firstElementChild.textContent.trim(), 10);
  moveInstrumentation(pageSizeRow, block);

  block.textContent = '';
  // Corrected class name to match ORIGINAL HTML
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

  const createNavButton = (ariaLabel, iconSrc) => {
    const button = document.createElement('button');
    button.setAttribute('aria-label', ariaLabel);
    button.classList.add(
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

    const span = document.createElement('span');
    span.classList.add(
      'navButton-icon-tob',
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

    const img = document.createElement('img');
    img.setAttribute('alt', 'svg file');
    img.setAttribute('src', iconSrc);
    span.append(img);
    button.append(span);
    return button;
  };

  const prevButton = createNavButton(
    'move to the previous page',
    '/content/dam/aemigrate/uploaded-folder/image/1774510727266.svg+xml',
  );
  const nextButton = createNavButton(
    'move to the next page',
    '/content/dam/aemigrate/uploaded-folder/image/1774510727444.svg+xml',
  );

  // Add event listeners for navigation buttons
  prevButton.addEventListener('click', () => {
    // Placeholder for previous page logic
    console.log('Previous page clicked');
  });
  nextButton.addEventListener('click', () => {
    // Placeholder for next page logic
    console.log('Next page clicked');
  });

  paginationRoot.append(prevButton, nextButton);
  block.append(paginationRoot);

  const pageSizeDiv = document.createElement('div');
  // Corrected class name to match ORIGINAL HTML
  pageSizeDiv.classList.add('blogListing-pageSize-C5l', 'grid');
  pageSizeDiv.textContent = 'Show ';

  const pageSizeInputSpan = document.createElement('span');
  pageSizeInputSpan.classList.add('blogListing-pageSizeInput-gCy');

  const select = document.createElement('select');
  const options = [2, 10, 20];
  options.forEach((optionValue) => {
    const option = document.createElement('option');
    option.value = optionValue.toString();
    option.textContent = optionValue.toString();
    if (optionValue === pageSize) {
      option.selected = true;
    }
    select.append(option);
  });

  // Add event listener for the select dropdown
  select.addEventListener('change', (event) => {
    const newPageSize = parseInt(event.target.value, 10);
    // Placeholder for page size change logic
    console.log('Page size changed to:', newPageSize);
  });

  pageSizeInputSpan.append(select);
  pageSizeDiv.append(pageSizeInputSpan, ' per page');
  block.append(pageSizeDiv);

  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
