/**
 * AEM-specific fixes to make generated pages work with EDS framework
 * This script runs BEFORE aem.js and adds missing classes/structure
 *
 * CRITICAL: Must run synchronously BEFORE decorateBlocks() in aem.js
 */

// Run immediately - this script is loaded before body is parsed,
// so it sets up a DOMContentLoaded listener
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', applyAemFixes);
} else {
  // DOM already loaded (script loaded late)
  applyAemFixes();
}

function applyAemFixes() {
  console.log('AEM Fix: Starting fixes...');

  // Fix 1: Add 'section' class to divs with data-aue-model="section"
  const sections = document.querySelectorAll('[data-aue-model="section"]');
  console.log(`AEM Fix: Found ${sections.length} sections to fix`);

  sections.forEach((section) => {
    if (!section.classList.contains('section')) {
      section.classList.add('section');
      console.log('AEM Fix: Added section class to', section);
    }
  });

  // Fix 2: Wrap direct block children in wrapper divs if needed
  // EDS expects: div.section > div (wrapper) > div.blockname (block)
  document.querySelectorAll('.section').forEach((section) => {
    const directChildren = Array.from(section.children);

    directChildren.forEach((child) => {
      // Check if this child has a class (indicating it's a block)
      const hasBlockClass = child.className && child.className.trim().length > 0;

      // Check if it has data-aue-model (AEM authoring marker)
      const hasModel = child.hasAttribute('data-aue-model');

      // If it looks like a block and it's a direct child of section, wrap it
      if (hasBlockClass || hasModel) {
        // Check if it's already wrapped (parent is section, not a wrapper div)
        const parent = child.parentElement;
        if (parent && parent.classList.contains('section')) {
          // Not wrapped - need to wrap it
          const wrapper = document.createElement('div');
          wrapper.classList.add('block-wrapper'); // Add class for debugging

          // Insert wrapper before the block
          parent.insertBefore(wrapper, child);

          // Move block into wrapper
          wrapper.appendChild(child);

          console.log('AEM Fix: Wrapped block', child.className || child.getAttribute('data-aue-model'), 'in wrapper');
        }
      }
    });
  });

  console.log('AEM Fix: Complete - sections and blocks should now be discoverable by EDS');
}
