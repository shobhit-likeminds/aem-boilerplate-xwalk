import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [sectionTitleRow, ...blogCardRows] = [...block.children];

  // The outer block div already has 'blog-section' from AEM.
  // Creating an inner 'section' wrapper and adding 'blog-section' to it
  // would cause double padding/CSS. Remove the block name class from the inner wrapper.
  const section = document.createElement('section');
  // section.classList.add('blog-section'); // Removed - outer block already has it
  moveInstrumentation(block, section);

  // Section Title
  const h2 = document.createElement('h2');
  moveInstrumentation(sectionTitleRow, h2);
  // Direct children[0] access replaced with destructuring for clarity and robustness
  const [sectionTitleCell] = [...sectionTitleRow.children];
  h2.textContent = sectionTitleCell?.textContent.trim();
  section.append(h2);

  const container = document.createElement('div');
  container.classList.add('container', 'mt-6');
  section.append(container);

  const row = document.createElement('div');
  row.classList.add('row', 'justify-content-around');
  container.append(row);

  blogCardRows.forEach((cardRow) => {
    const [
      cardLinkCell,
      imageCell,
      categoryLinkCell,
      categoryLabelCell,
      headlineCell,
      excerptCell,
      dateCell,
      readMoreLinkCell,
      readMoreLabelCell,
    ] = [...cardRow.children];

    const blogCard = document.createElement('div');
    blogCard.classList.add('blog-card', 'col-lg-4', 'col-md-6', 'col-12');
    moveInstrumentation(cardRow, blogCard);

    // Card Image Link
    const cardLink = document.createElement('a');
    cardLink.href = cardLinkCell.querySelector('a')?.href || '#';
    blogCard.append(cardLink);

    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        optimizedPic.querySelector('img').classList.add('img-fluid');
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        cardLink.append(optimizedPic);
      }
    }

    // Categories
    const categoriesDiv = document.createElement('div');
    categoriesDiv.classList.add('categories', 'align-items-center', 'gap-3', 'flex-wrap');
    blogCard.append(categoriesDiv);

    const categoryLink = document.createElement('a');
    categoryLink.href = categoryLinkCell.querySelector('a')?.href || '#';
    categoryLink.textContent = categoryLabelCell?.textContent.trim();
    categoriesDiv.append(categoryLink);

    // Headline and Excerpt
    const headlineLink = document.createElement('a');
    headlineLink.href = cardLinkCell.querySelector('a')?.href || '#';
    blogCard.append(headlineLink);

    const h5 = document.createElement('h5');
    h5.textContent = headlineCell?.textContent.trim();
    headlineLink.append(h5);

    // Excerpt is richtext, so it may contain <p> tags. Assigning to <p>.innerHTML
    // would create invalid <p><p>...</p></p> nesting. Use a <div> instead.
    const p = document.createElement('div'); // Changed from 'p' to 'div'
    p.innerHTML = excerptCell?.innerHTML || '';
    headlineLink.append(p);

    // Date and Read More
    const dateReadDiv = document.createElement('div');
    dateReadDiv.classList.add('d-flex', 'date-read', 'justify-content-between', 'align-items-center');
    blogCard.append(dateReadDiv);

    const time = document.createElement('time');
    time.setAttribute('datetime', dateCell?.textContent.trim()); // Assuming date format is suitable for datetime
    time.textContent = dateCell?.textContent.trim();
    dateReadDiv.append(time);

    const readMoreLink = document.createElement('a');
    readMoreLink.classList.add('btn', 'btn-primary');
    readMoreLink.href = readMoreLinkCell.querySelector('a')?.href || '#';
    readMoreLink.textContent = readMoreLabelCell?.textContent.trim();
    dateReadDiv.append(readMoreLink);

    row.append(blogCard);
  });

  block.replaceChildren(section);
}
