import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
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

  [...block.children].forEach((row) => {
    const button = document.createElement('button');
    moveInstrumentation(row, button);
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

    const [iconCell, ariaLabelCell, disabledCell] = [...row.children];

    const ariaLabel = ariaLabelCell.textContent.trim();
    if (ariaLabel) {
      button.setAttribute('aria-label', ariaLabel);
    }

    const isDisabled = disabledCell.textContent.trim().toLowerCase() === 'true';
    if (isDisabled) {
      button.setAttribute('disabled', '');
    }

    const span = document.createElement('span');
    span.classList.add(
      'navButton-icon-tob',
      // The following classes were redundant and not present on the span in the original HTML
      // 'button-root_normalPriority-Z4b',
      // 'button-root-3iv',
      // 'border-[1px]',
      // 'border-solid',
      // 'cursor-pointer',
      // 'inline-flex',
      // 'items-center',
      // 'justify-center',
      // 'leading-tight',
      // 'max-w-full',
      // 'min-w-[10rem]',
      // 'outline-none',
      // 'pointer-events-auto',
      // 'px-sm',
      // 'text-center',
      // 'text-sm',
      // 'uppercase',
      // 'disabled_bg-gray-400',
      // 'disabled_border-gray-400',
      // 'disabled_opacity-50',
      // 'disabled_pointer-events-none',
      // 'disabled_text-white',
      // 'focus_shadow-inputFocus',
      // 'bg-blue-60',
      // 'border-blue-60',
      // 'text-white',
      // 'active_bg-blue-80',
      // 'active_border-blue-80',
      // 'active_text-white',
      // 'hover_bg-blue-80',
      // 'hover_border-blue-80',
      // 'hover_text-white',
      // 'min-w-[6.3rem]',
    );

    if (isDisabled) {
      span.classList.add('navButton-icon_disabled-V7O');
    }

    const picture = iconCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        span.append(optimizedPic);
      }
    }

    button.append(span);
    paginationRoot.append(button);
  });

  block.textContent = '';
  block.append(paginationRoot);
}
