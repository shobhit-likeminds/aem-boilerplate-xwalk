export default function decorate(block) {
  // The space-adder block does not have any fields according to BlockJson.
  // Its purpose is to apply specific CSS classes for vertical padding directly
  // to the block element itself, as indicated by the original HTML structure
  // where the padding classes are on a section, and the block is a wrapper.
  // However, in EDS, the decorate function receives the block element (div.space-adder)
  // which should then be styled.

  // Apply the padding classes directly to the block element.
  // The original HTML shows these classes on a <section>, but the block itself
  // is the container we are decorating.
  block.classList.add('spaceAdder-verticalPadding_section', 'padding-80');

  // Since this block has no content or children to process,
  // and its purpose is purely for spacing via CSS classes,
  // no further DOM manipulation is needed.
}
