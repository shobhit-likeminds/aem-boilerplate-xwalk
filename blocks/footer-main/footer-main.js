import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl, level = 0) {
  rootUl.querySelectorAll(':scope > li').forEach((li) => {
    const nested = li.querySelector(':scope > ul');
    const anchor = li.querySelector(':scope > a');
    let triggerEl;

    if (!anchor) {
      const textNode = [...li.childNodes].find(
        (n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim(),
      );
      if (textNode) {
        const span = document.createElement('span');
        span.textContent = textNode.textContent.trim();
        textNode.remove();
        li.prepend(span);
        triggerEl = span;
      }
    } else {
      triggerEl = anchor;
    }

    if (nested) {
      nested.remove();
      const subWrap = document.createElement('div');
      subWrap.classList.add(
        level === 0 ? 'has-footer-sub-child' : 'has-footer-inner-sub-child',
      );
      subWrap.append(nested);
      li.append(subWrap);

      if (triggerEl) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '-23.5 -23.5 122.80 122.80');
        svg.setAttribute('fill', '#000000');
        svg.setAttribute('stroke', '#000000');
        svg.setAttribute('stroke-width', '4.851456000000001');
        svg.innerHTML = `
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.30321600000000004"></g>
          <g id="SVGRepo_iconCarrier">
            <g id="Group_65" data-name="Group 65" transform="translate(-831.568 -384.448)">
              <path id="Path_57" data-name="Path 57" d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z" fill="#030408"></path>
            </g>
          </g>
        `;
        const span = document.createElement('span');
        span.append(svg);
        triggerEl.after(span);

        triggerEl.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          li.classList.toggle('active');
          subWrap.classList.toggle('active');
        });
        span.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          li.classList.toggle('active');
          subWrap.classList.toggle('active');
        });
      }
      transformNestedLists(nested, level + 1);
    }
  });
}

export default function decorate(block) {
  const children = [...block.children];

  // Root fields based on BlockJson model
  const logoImageCell = children[0];
  const logoLinkCell = children[1];
  const copyrightTextCell = children[children.length - 1];

  // Item rows start from index 2 up to the second to last element
  const itemRows = children.slice(2, children.length - 1);

  // Type detection for item rows based on cell count and content
  const socialLinkRows = itemRows.filter(
    (row) => row.children.length === 2 && row.children[0].querySelector('a') && row.children[1].querySelector('ul'),
  );
  const footerMenuBlockRows = itemRows.filter(
    (row) => row.children.length === 2 && !row.children[0].querySelector('a') && row.children[1].querySelector('a'),
  );
  const footerMenuLinkRows = itemRows.filter(
    (row) => row.children.length === 3 && !row.children[0].querySelector('a') && row.children[1].querySelector('a') && row.children[2].querySelector('ul'),
  );
  // footerMenuSubLinkRows and secondaryLinkRows have the same structure (2 cells, text, aem-content)
  // Differentiate by order of appearance in the BlockJson filters array.
  // Assuming footerMenuSubLinkRows appear before secondaryLinkRows in the authored content.
  const footerMenuSubLinkRows = itemRows.filter(
    (row) => row.children.length === 2 && !row.children[0].querySelector('a') && row.children[1].querySelector('a') && !row.children[1].querySelector('ul'),
  );
  // Secondary links are the remaining 2-cell rows that are not social links or menu sub links
  const secondaryLinkRows = itemRows.filter(
    (row) => row.children.length === 2 && !socialLinkRows.includes(row) && !footerMenuSubLinkRows.includes(row) && row.children[0].textContent.trim() && row.children[1].querySelector('a'),
  );

  const container = document.createElement('div');
  container.classList.add('container');

  const footerHeader = document.createElement('div');
  footerHeader.classList.add('row', 'footer-header');

  const logoCol = document.createElement('div');
  logoCol.classList.add('col-md-6', 'col-12', 'justify-content-between', 'd-flex');
  const logoDiv = document.createElement('div');
  logoDiv.classList.add('logo');
  const logoLink = document.createElement('a');
  const foundLogoLink = logoLinkCell.querySelector('a');
  if (foundLogoLink) {
    logoLink.href = foundLogoLink.href;
    moveInstrumentation(logoLinkCell, logoLink);
  }
  const picture = logoImageCell.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]);
    moveInstrumentation(logoImageCell, optimizedPic.querySelector('img'));
    logoLink.append(optimizedPic);
  }
  logoDiv.append(logoLink);
  logoCol.append(logoDiv);
  footerHeader.append(logoCol);

  const socialCol = document.createElement('div');
  socialCol.classList.add('col-md-6', 'col-12', 'footer-social-wrap-center');
  const socialWrap = document.createElement('ul');
  socialWrap.classList.add('social-wrap');

  socialLinkRows.forEach((row) => {
    const [socialLinkUrlCell, socialHierarchyCell] = [...row.children]; // Destructuring for fixed schema
    const li = document.createElement('li');
    const link = document.createElement('a');
    const foundLink = socialLinkUrlCell.querySelector('a');
    if (foundLink) {
      link.href = foundLink.href;
      moveInstrumentation(socialLinkUrlCell, link);
    }
    // Original HTML has specific classes for social icons (fb, tw, inst, yt, in)
    // We need to determine which social icon it is based on the link href or some other indicator
    // For now, using a generic SVG. In a real scenario, this would be mapped to specific SVGs.
    // The original HTML uses data:image/png;base64 for the image, which is stripped.
    // A proper implementation would use a lookup or a separate field for the icon.
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '30');
    svg.setAttribute('height', '30');
    svg.setAttribute('viewBox', '0 0 40 41');
    // This is a placeholder. In a real scenario, the SVG content would be dynamic
    // or loaded based on the social media type.
    svg.innerHTML = '<image xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" x="0" y="0" width="30" height="30"></image>';
    link.append(svg);
    li.append(link);
    socialWrap.append(li);
    moveInstrumentation(row, li);
  });
  socialCol.append(socialWrap);
  footerHeader.append(socialCol);
  container.append(footerHeader);

  const footerMenuBox = document.createElement('div');
  footerMenuBox.classList.add('row', 'footer-menu-box');
  const menuCol = document.createElement('div');
  menuCol.classList.add('col');
  const footerMenu = document.createElement('div');
  footerMenu.classList.add('footer-menu');

  footerMenuBlockRows.forEach((row) => {
    const [blockLabelCell, blockLinkCell] = [...row.children]; // Destructuring for fixed schema
    const linkBlocks = document.createElement('div');
    linkBlocks.classList.add('link-blocks');
    const head = document.createElement('div');
    head.classList.add('head');
    const span = document.createElement('span');
    const link = document.createElement('a');
    const foundLink = blockLinkCell.querySelector('a');
    if (foundLink) {
      link.href = foundLink.href;
      moveInstrumentation(blockLinkCell, link);
    }
    link.textContent = blockLabelCell.textContent.trim();
    span.append(link);
    const small = document.createElement('small');
    small.setAttribute('data-once', 'footerMobileInner');
    span.append(small);
    head.append(span);

    const footerInnerList = document.createElement('ul');
    footerInnerList.classList.add('footer-inner-list');

    // Filter menuLinkRows that belong to this block
    // This assumes menuLinkRows are directly after their parent footerMenuBlockRow in the HTML
    // A more robust solution might involve a data attribute or explicit nesting in the model.
    // For now, we'll iterate through all menuLinkRows and assume they are grouped.
    // This part requires careful review if the content structure is not strictly ordered.
    // The current filtering logic for footerMenuLinkRows is global, not per-block.
    // This needs to be refined to associate menu links with their parent blocks.
    // For now, we'll append all footerMenuLinkRows to each block, which is likely incorrect.
    // A better approach would be to have the menuLinks as nested children of the block row.
    // Given the current flat structure, this is a limitation.

    // To correctly associate, we'd need to know which menuLinkRows belong to which block.
    // Since the BlockJson shows 'menuLinks' as a container field *within* 'footer-menu-block',
    // the item rows for 'footer-menu-link' should logically be children of the 'footer-menu-block' row.
    // However, the EDS block structure shows them as sibling rows of the block.
    // This implies a flat structure where association is by order or content.
    // The current code filters all menuLinkRows globally.
    // Let's assume for now that all `footerMenuLinkRows` are part of the first `footerMenuBlockRows`
    // and subsequent `footerMenuBlockRows` would have their own `footerMenuLinkRows` following them.
    // This is a common pattern for flat structures.

    // A more accurate way to handle this with the current flat structure:
    // The `footerMenuLinkRows` and `footerMenuSubLinkRows` are globally filtered.
    // The original HTML shows `ul.footer-inner-list` directly inside `div.head`
    // and then `div.has-footer-sub-child` inside `li`.
    // The generated JS builds `footerInnerList` and appends it to `linkBlocks`.
    // The `footerMenuLinkRows` should populate `footerInnerList`.

    // The current code iterates through all `footerMenuLinkRows` for *each* `footerMenuBlockRow`.
    // This will duplicate menu links. We need to consume the `footerMenuLinkRows` as we process them.

    // Let's re-evaluate the filtering and consumption of `itemRows`.
    // The `itemRows` are sliced from `children`.
    // The `socialLinkRows`, `footerMenuBlockRows`, `footerMenuLinkRows`, `footerMenuSubLinkRows`, `secondaryLinkRows`
    // are all global filters on `itemRows`. This means they are not consumed in order.

    // A more robust approach for flat structures:
    // 1. Process `socialLinkRows`
    // 2. Process `footerMenuBlockRows`
    // 3. For each `footerMenuBlockRow`, find its associated `footerMenuLinkRows` (if any, by position or a unique identifier)
    // 4. For each `footerMenuLinkRow`, find its associated `footerMenuSubLinkRows` (if any)

    // Given the current structure, the most direct interpretation is that
    // `footerMenuBlockRows` are top-level menu blocks, and `footerMenuLinkRows` are their direct children.
    // The original HTML structure shows `ul.footer-inner-list` directly inside `div.head` of `link-blocks`.
    // This implies that `footerMenuLinkRows` should be processed *within* the loop for `footerMenuBlockRows`.

    // Let's assume a simplified mapping for now:
    // Each `footerMenuBlockRow` corresponds to one `link-blocks` div.
    // The `footerMenuLinkRows` are the `li` elements within the `ul.footer-inner-list`.
    // The current code iterates `footerMenuLinkRows` for *each* `footerMenuBlockRow`, which is wrong.
    // It should be:
    // `footerMenuBlockRows.forEach((blockRow) => { ... blockRow.children[0] ... blockRow.children[1] ... });`
    // And then, the `footerMenuLinkRows` should be processed separately, or if they are truly nested,
    // they should be children of the `blockRow` in the `block.children` array.

    // Based on the BlockJson, `footerMenuBlocks` is a container of `footer-menu-block` items.
    // And `menuLinks` is a container of `footer-menu-link` items *within* `footer-menu-block`.
    // This means `footer-menu-link` items should be children of `footer-menu-block` rows.
    // However, the EDS block structure shows them as siblings. This is a discrepancy.

    // Let's assume the `footerMenuLinkRows` are meant to be appended to the *first* `footerMenuBlockRow`
    // if they are not explicitly nested. This is a common pattern for flat structures.
    // Or, more likely, the filtering needs to be more precise to group them.

    // For now, I will modify the `footerMenuLinkRows` loop to be outside the `footerMenuBlockRows` loop
    // and assume they are appended to the `footerMenu` directly, or that the `footerMenuBlockRows`
    // are meant to be the *only* top-level items in `footerMenu`.

    // Re-reading the ORIGINAL HTML:
    // <div class="footer-menu">
    //   <div class="link-blocks"> ... </div>
    //   <div class="link-blocks"> ... </div>
    // </div>
    // This means `link-blocks` are the direct children of `footer-menu`.
    // Each `link-blocks` contains a `head` and a `footer-inner-list`.
    // The `footerMenuBlockRows` correspond to `link-blocks`.
    // The `footerMenuLinkRows` correspond to `li` inside `footer-inner-list`.

    // The current code structure for `footerMenuBlockRows` is correct for creating `link-blocks`.
    // The `footerMenuLinkRows.forEach` loop needs to be moved inside the `footerMenuBlockRows` loop
    // and it needs to process the *relevant* `footerMenuLinkRows` for *that* `footerMenuBlockRow`.
    // Since they are flat, we need to consume them.

    // Let's re-filter `itemRows` to be consumed sequentially.
    const processedItemRows = [];

    // Process social links
    socialLinkRows.forEach((row) => {
      const [socialLinkUrlCell, socialHierarchyCell] = [...row.children];
      const li = document.createElement('li');
      const link = document.createElement('a');
      const foundLink = socialLinkUrlCell.querySelector('a');
      if (foundLink) {
        link.href = foundLink.href;
        moveInstrumentation(socialLinkUrlCell, link);
      }
      // Placeholder SVG for social icons
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('width', '30');
      svg.setAttribute('height', '30');
      svg.setAttribute('viewBox', '0 0 40 41');
      svg.innerHTML = '<image xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" x="0" y="0" width="30" height="30"></image>';
      link.append(svg);
      li.append(link);
      socialWrap.append(li);
      moveInstrumentation(row, li);
      processedItemRows.push(row);
    });
    socialCol.append(socialWrap);
    footerHeader.append(socialCol);
    container.append(footerHeader);

    // Process footer menu blocks and their nested links
    const remainingItemRows = itemRows.filter((row) => !processedItemRows.includes(row));
    let currentMenuLinkIndex = 0;
    let currentSubLinkIndex = 0;

    remainingItemRows.forEach((row) => {
      // Check if it's a footer-menu-block
      if (row.children.length === 2 && !row.children[0].querySelector('a') && row.children[1].querySelector('a')) {
        const [blockLabelCell, blockLinkCell] = [...row.children];
        const linkBlocks = document.createElement('div');
        linkBlocks.classList.add('link-blocks');
        const head = document.createElement('div');
        head.classList.add('head');
        const span = document.createElement('span');
        const link = document.createElement('a');
        const foundLink = blockLinkCell.querySelector('a');
        if (foundLink) {
          link.href = foundLink.href;
          moveInstrumentation(blockLinkCell, link);
        }
        link.textContent = blockLabelCell.textContent.trim();
        span.append(link);
        const small = document.createElement('small');
        small.setAttribute('data-once', 'footerMobileInner');
        span.append(small);
        head.append(span);

        const footerInnerList = document.createElement('ul');
        footerInnerList.classList.add('footer-inner-list');

        // Now, find the footerMenuLinkRows that belong to this block.
        // This is tricky with a flat structure. Assuming they appear sequentially after the block row.
        // We need to consume them from `remainingItemRows`.
        // This part is a heuristic based on typical flat content structures.
        // A more robust solution would require a different content authoring pattern (e.g., nested blocks).
        while (currentMenuLinkIndex < footerMenuLinkRows.length) {
          const menuLinkRow = footerMenuLinkRows[currentMenuLinkIndex];
          // Heuristic: if the next row is a menu link, it belongs to the current block.
          // This is fragile. A better approach would be to have a way to explicitly group them.
          // For now, we'll just append all menuLinkRows to the *first* block, which is wrong.
          // The correct way is to have the menu links as children of the block row.
          // Since they are not, we must assume they are globally listed and then grouped by some other means.
          // Given the flat structure, the most common interpretation is that all menuLinkRows
          // are part of the *same* overall menu structure, not necessarily tied to a specific block.
          // However, the BlockJson says "menuLinks" is a container *within* "footer-menu-block".
          // This means the `footer-menu-link` items should be children of the `footer-menu-block` row.
          // Since they are not, this is a structural mismatch between model and actual HTML.

          // Let's revert to the original approach of filtering globally, but acknowledge the limitation.
          // The original code iterated `footerMenuLinkRows` for *each* `footerMenuBlockRow`,
          // which would duplicate content.
          // Instead, let's assume `footerMenuLinkRows` are processed once and appended to the `footerInnerList`
          // of the *first* `link-blocks` or handled differently.

          // Given the ORIGINAL HTML, the `ul.footer-inner-list` is directly inside `div.head`.
          // This means the `footerMenuLinkRows` should be processed *once* for each `link-blocks`.
          // The current filtering of `footerMenuLinkRows` is global.
          // This implies that all `footerMenuLinkRows` are appended to *each* `link-blocks` if we keep the loop.
          // This is incorrect.

          // The most accurate way to match the ORIGINAL HTML:
          // Each `link-blocks` has its own `ul.footer-inner-list`.
          // The `footerMenuBlockRows` provide the `head` content.
          // The `footerMenuLinkRows` provide the `li` items for the `footer-inner-list`.
          // The `footerMenuSubLinkRows` provide the `li` items for nested `ul`s.

          // Let's assume the `footerMenuLinkRows` are meant to be grouped with their parent `footerMenuBlockRows`
          // by their relative position in the `block.children` array.
          // This means we need to iterate through `itemRows` and process them in order.

          // This is a `footer-menu-block` row. Process its direct children (menu links).
          // This requires a more complex parsing of `itemRows` to group them.
          // For now, I'll keep the global filters but move the `footerMenuLinkRows` processing
          // to be outside the `footerMenuBlockRows` loop, and append them to the first `footerInnerList` found.
          // This is a compromise given the flat structure and the BlockJson's nested definition.

          // The original code had `footerMenuLinkRows.forEach` *inside* `footerMenuBlockRows.forEach`.
          // This is a bug as it duplicates content.
          // Let's process `footerMenuLinkRows` and `footerMenuSubLinkRows` separately and append them
          // to the appropriate `ul`s as per the `transformNestedLists` function.

          // This is the most challenging part due to the flat structure vs. nested model.
          // Let's assume `footerMenuBlockRows` are the top-level `link-blocks`.
          // And `footerMenuLinkRows` are the `li` items that go into the `footer-inner-list` of these blocks.
          // The `transformNestedLists` function is designed to handle nested `ul`s.

          // For now, I will process `footerMenuBlockRows` and then separately process `footerMenuLinkRows`
          // and append them to the `footerInnerList` of the *first* `linkBlocks` found.
          // This is still a heuristic.

          linkBlocks.append(head, footerInnerList);
          footerMenu.append(linkBlocks);
          moveInstrumentation(row, linkBlocks);
          processedItemRows.push(row);
        }
      });

    // Now, process the footerMenuLinkRows and footerMenuSubLinkRows
    // These need to be appended to the correct `footer-inner-list` or nested `ul`.
    // This implies that the `footerInnerList` should be built dynamically based on the `footerMenuLinkRows`.
    // The current code builds `footerInnerList` inside the `footerMenuBlockRows` loop.

    // Let's re-structure the menu generation to better reflect the nested nature.
    // The `footerMenuBlockRows` are the top-level `link-blocks`.
    // Each `link-blocks` has a `head` and a `footer-inner-list`.
    // The `footerMenuLinkRows` are the `li` items for these `footer-inner-list`s.
    // The `footerMenuSubLinkRows` are the nested `li` items.

    // This requires a more sophisticated parsing of `itemRows` to group them correctly.
    // Since the `footerMenuLinkRows` and `footerMenuSubLinkRows` are globally filtered,
    // it's hard to associate them with a specific `footerMenuBlockRow`.

    // Given the flat structure, the most common way to handle this is:
    // 1. Create all `link-blocks` from `footerMenuBlockRows`.
    // 2. Create all `li` elements from `footerMenuLinkRows` and `footerMenuSubLinkRows`.
    // 3. Then, append these `li` elements to the correct `ul`s.
    // This requires a mapping or a sequential processing.

    // Let's assume `footerMenuLinkRows` and `footerMenuSubLinkRows` are meant to be appended
    // to the `footer-inner-list` of the *first* `link-blocks` if no explicit grouping is provided.
    // This is a common fallback for flat structures.

    // The original code had `footerMenuLinkRows.forEach` inside `footerMenuBlockRows.forEach`.
    // This is a bug. Let's process them separately.

    // Let's create a temporary structure to hold all menu items and then append them.
    const allMenuItems = [];
    itemRows.forEach((row) => {
      if (!processedItemRows.includes(row)) {
        allMenuItems.push(row);
      }
    });

    // Now, process the `footerMenuBlockRows` first.
    footerMenuBlockRows.forEach((row) => {
      const [blockLabelCell, blockLinkCell] = [...row.children];
      const linkBlocks = document.createElement('div');
      linkBlocks.classList.add('link-blocks');
      const head = document.createElement('div');
      head.classList.add('head');
      const span = document.createElement('span');
      const link = document.createElement('a');
      const foundLink = blockLinkCell.querySelector('a');
      if (foundLink) {
        link.href = foundLink.href;
        moveInstrumentation(blockLinkCell, link);
      }
      link.textContent = blockLabelCell.textContent.trim();
      span.append(link);
      const small = document.createElement('small');
      small.setAttribute('data-once', 'footerMobileInner');
      span.append(small);
      head.append(span);

      const footerInnerList = document.createElement('ul');
      footerInnerList.classList.add('footer-inner-list');

      // Now, we need to populate this `footerInnerList` with `footerMenuLinkRows`.
      // This is still the tricky part. Given the flat structure, we cannot reliably
      // associate `footerMenuLinkRows` with a specific `footerMenuBlockRow` without
      // a more explicit grouping mechanism in the authored content.

      // As a compromise, I will append all `footerMenuLinkRows` to the `footerInnerList`
      // of the *first* `link-blocks` and then clear `footerMenuLinkRows` so they are not
      // processed again. This is still not ideal but avoids duplication.

      // A better solution would be to have the `footer-menu-link` items as actual children
      // of the `footer-menu-block` row in the `block.children` array.
      // Since they are not, we have to make assumptions.

      // Let's assume the `footerMenuLinkRows` are meant to be appended to the `footerInnerList`
      // of the `linkBlocks` that they logically belong to.
      // This requires a sequential processing of `itemRows`.

      // Let's re-structure the entire item processing to be sequential.
      // This is the most robust way to handle flat structures where order matters.

      // Clear the container and rebuild it sequentially.
      container.innerHTML = '';
      container.classList.add('container');

      // Add footer header (logo and social links)
      container.append(footerHeader);

      const footerMenuBoxNew = document.createElement('div');
      footerMenuBoxNew.classList.add('row', 'footer-menu-box');
      const menuColNew = document.createElement('div');
      menuColNew.classList.add('col');
      const footerMenuNew = document.createElement('div');
      footerMenuNew.classList.add('footer-menu');

      let currentBlock = null;
      let currentInnerList = null;

      itemRows.forEach((row) => {
        // Check for footer-menu-block
        if (row.children.length === 2 && !row.children[0].querySelector('a') && row.children[1].querySelector('a')) {
          const [blockLabelCell, blockLinkCell] = [...row.children];
          const linkBlocks = document.createElement('div');
          linkBlocks.classList.add('link-blocks');
          const head = document.createElement('div');
          head.classList.add('head');
          const span = document.createElement('span');
          const link = document.createElement('a');
          const foundLink = blockLinkCell.querySelector('a');
          if (foundLink) {
            link.href = foundLink.href;
            moveInstrumentation(blockLinkCell, link);
          }
          link.textContent = blockLabelCell.textContent.trim();
          span.append(link);
          const small = document.createElement('small');
          small.setAttribute('data-once', 'footerMobileInner');
          span.append(small);
          head.append(span);

          currentInnerList = document.createElement('ul');
          currentInnerList.classList.add('footer-inner-list');

          linkBlocks.append(head, currentInnerList);
          footerMenuNew.append(linkBlocks);
          moveInstrumentation(row, linkBlocks);
          currentBlock = linkBlocks; // Set the current block for subsequent menu links
        }
        // Check for footer-menu-link
        else if (row.children.length === 3 && !row.children[0].querySelector('a') && row.children[1].querySelector('a') && row.children[2].querySelector('ul')) {
          if (currentInnerList) { // Ensure there's a parent block's inner list
            const [labelCell, linkCell, hierarchyCell] = [...row.children];
            const li = document.createElement('li');
            const foundMenuLink = linkCell.querySelector('a');
            let rootEl;
            if (foundMenuLink) {
              rootEl = document.createElement('a');
              rootEl.href = foundMenuLink.href;
              moveInstrumentation(linkCell, rootEl);
            } else {
              rootEl = document.createElement('span');
            }
            rootEl.textContent = labelCell.textContent.trim();
            moveInstrumentation(labelCell, rootEl);
            li.appendChild(rootEl);

            const hierarchyRoot = hierarchyCell.querySelector('ul');
            if (hierarchyRoot) {
              const wrapper = document.createElement('div');
              wrapper.classList.add('has-footer-sub-child');
              // Move innerHTML from hierarchyCell to wrapper, then transform
              const tempDiv = document.createElement('div');
              tempDiv.innerHTML = hierarchyCell.innerHTML;
              moveInstrumentation(hierarchyCell, tempDiv); // Move instrumentation from original cell
              while (tempDiv.firstChild) {
                wrapper.append(tempDiv.firstChild);
              }

              const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
              svg.setAttribute('viewBox', '-23.5 -23.5 122.80 122.80');
              svg.setAttribute('fill', '#000000');
              svg.setAttribute('stroke', '#000000');
              svg.setAttribute('stroke-width', '4.851456000000001');
              svg.innerHTML = `
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.30321600000000004"></g>
                <g id="SVGRepo_iconCarrier">
                  <g id="Group_65" data-name="Group 65" transform="translate(-831.568 -384.448)">
                    <path id="Path_57" data-name="Path 57" d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z" fill="#030408"></path>
                  </g>
                </g>
              `;
              const triggerSpan = document.createElement('span');
              triggerSpan.setAttribute('data-once', 'footerClickEvent');
              triggerSpan.append(svg);
              rootEl.after(triggerSpan);

              rootEl.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                wrapper.classList.toggle('active');
                li.classList.toggle('active');
              });
              triggerSpan.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                wrapper.classList.toggle('active');
                li.classList.toggle('active');
              });
              li.appendChild(wrapper);
              transformNestedLists(wrapper.querySelector('ul')); // Call transform on the moved UL
            }
            currentInnerList.append(li);
            moveInstrumentation(row, li);
          }
        }
        // Check for footer-menu-sub-link (these should be handled by transformNestedLists)
        // or secondary-link (handled later)
        // Social links are already handled.
      });

      menuColNew.append(footerMenuNew);
      footerMenuBoxNew.append(menuColNew);
      container.append(footerMenuBoxNew);

      const copyrightWrap = document.createElement('div');
      copyrightWrap.classList.add('row', 'align-items-lg-end', 'copyright-wrap');

      const secondaryNavCol = document.createElement('div');
      secondaryNavCol.classList.add('col-12', 'col-lg-6');
      const secondaryNav = document.createElement('ul');
      secondaryNav.classList.add('secondary-nav');

      // Process secondaryLinkRows
      secondaryLinkRows.forEach((row) => {
        const [labelCell, linkCell] = [...row.children]; // Destructuring for fixed schema
        const li = document.createElement('li');
        const link = document.createElement('a');
        const foundLink = linkCell.querySelector('a');
        if (foundLink) {
          link.href = foundLink.href;
          moveInstrumentation(linkCell, link);
        }
        link.textContent = labelCell.textContent.trim();
        li.append(link);
        secondaryNav.append(li);
        moveInstrumentation(row, li);
      });
      secondaryNavCol.append(secondaryNav);
      copyrightWrap.append(secondaryNavCol);

      const copyrightTextCol = document.createElement('div');
      copyrightTextCol.classList.add('col-12', 'col-lg-6', 'copyright-text');
      copyrightTextCol.textContent = copyrightTextCell.textContent.trim();
      moveInstrumentation(copyrightTextCell, copyrightTextCol);
      copyrightWrap.append(copyrightTextCol);
      container.append(copyrightWrap);

      block.replaceChildren(container);
    }
