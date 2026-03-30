/**
 * AEM-specific fixes to make generated pages work with EDS framework
 * This script runs BEFORE aem.js and adds missing classes/structure
 */

(function() {
  console.log('AEM Fix: Adding missing section classes...');

  // Fix 1: Add 'section' class to divs with data-aue-model="section"
  document.querySelectorAll('[data-aue-model="section"]').forEach((section) => {
    if (!section.classList.contains('section')) {
      section.classList.add('section');
      console.log('AEM Fix: Added section class to', section);
    }
  });

  // Fix 2: Wrap direct block children in wrapper divs if needed
  document.querySelectorAll('.section').forEach((section) => {
    const directBlockChildren = Array.from(section.children).filter(child => {
      // Check if it's a block (has data-aue-model that's not 'section')
      const model = child.getAttribute('data-aue-model');
      return model && model !== 'section' && !child.classList.contains('block');
    });

    directBlockChildren.forEach((block) => {
      // Check if already wrapped
      const parent = block.parentElement;
      if (parent.classList.contains('section')) {
        // Not wrapped, needs wrapping
        const wrapper = document.createElement('div');
        parent.insertBefore(wrapper, block);
        wrapper.appendChild(block);
        console.log('AEM Fix: Wrapped block', block.className, 'in wrapper');
      }
    });
  });

  console.log('AEM Fix: Complete');
})();
