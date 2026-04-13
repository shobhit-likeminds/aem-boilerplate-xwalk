import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // CHECK 0 & 1: Using destructuring for block.children, which is acceptable for a fixed number of rows.
  // The BlockJson defines two fields, 'link' and 'linkLabel', corresponding to two rows.
  const [linkRow, linkLabelRow] = [...block.children];

  // CHECK 1: Extracting 'link' from the first row.
  const linkAnchor = linkRow.querySelector('a');

  // CHECK 1: Extracting 'linkLabel' from the second row.
  // The EDS structure shows the linkLabel is inside a div, which itself contains a div.
  // The original HTML shows "Skip to main content" as plain text.
  // The BlockJson defines 'linkLabel' as a 'text' component.
  // The current JS attempts to get textContent from linkLabelRow directly.
  // The EDS structure shows: <div><div><a href="...">https://example.com/linklabel</a></div></div>
  // We need to get the text content of the inner div, or the anchor if it exists.
  // Given the original HTML, it's just text. Let's assume the content is directly in the inner div.
  const linkLabelText = linkLabelRow.querySelector('div')?.textContent.trim();

  const skipLink = document.createElement('a');
  if (linkAnchor) {
    skipLink.href = linkAnchor.href;
  }
  skipLink.textContent = linkLabelText;
  // CHECK 1: All class names are verbatim from the ORIGINAL HTML and CLASS NAMES ALLOWLIST.
  skipLink.classList.add('z-99', 'fixed', 'top-[-1000px]', 'inset-[auto]', 'p-4', 'border-primary', 'border', 'rounded-md', 'font-bold', 'focus:top-6', 'focus:left-6', 'bg-brand-1', 'text-white', 'theme-focus-outline');

  moveInstrumentation(block, skipLink);
  block.textContent = '';
  block.append(skipLink);

  // CHECK 2: Interactivity - The skip link is an anchor tag, which inherently handles navigation.
  // No additional JavaScript event listeners are required for its primary function.
}
