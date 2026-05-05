import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  const section = document.createElement('section');
  section.classList.add('blog-section');

  // Section Title
  const sectionTitleRow = children.shift(); // First row is always sectionTitle
  if (sectionTitleRow) {
    const h2 = document.createElement('h2');
    moveInstrumentation(sectionTitleRow, h2);
    h2.textContent = sectionTitleRow.children[0]?.textContent.trim() || '';
    section.append(h2);
  }

  const container = document.createElement('div');
  container.classList.add('container', 'mt-6');

  const row = document.createElement('div');
  row.classList.add('row', 'justify-content-around');

  children.forEach((blogCardRow) => {
    // Destructure cells by index as per fixed schema
    const [
      imageCell,
      imageLinkCell,
      categoryLabelCell,
      categoryLinkCell,
      blogTitleCell,
      blogDescriptionCell,
      blogLinkCell,
      dateCell,
      ctaLinkCell,
      ctaLabelCell,
    ] = [...blogCardRow.children];

    const blogCard = document.createElement('div');
    blogCard.classList.add('blog-card', 'col-lg-4', 'col-md-6', 'col-12');
    moveInstrumentation(blogCardRow, blogCard);

    // Image Link and Image
    const imageLink = document.createElement('a');
    const foundImageLink = imageLinkCell?.querySelector('a');
    if (foundImageLink) imageLink.href = foundImageLink.href;

    const picture = imageCell?.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        imageLink.append(optimizedPic);
      }
    }
    blogCard.append(imageLink);

    // Categories
    const categoriesDiv = document.createElement('div');
    categoriesDiv.classList.add('categories', 'align-items-center', 'gap-3', 'flex-wrap');

    const categoryLink = document.createElement('a');
    const foundCategoryLink = categoryLinkCell?.querySelector('a');
    if (foundCategoryLink) categoryLink.href = foundCategoryLink.href;
    categoryLink.textContent = categoryLabelCell?.textContent.trim() || '';
    categoriesDiv.append(categoryLink);
    blogCard.append(categoriesDiv);

    // Blog Title and Description Link
    const blogTitleLink = document.createElement('a');
    const foundBlogLink = blogLinkCell?.querySelector('a');
    if (foundBlogLink) blogTitleLink.href = foundBlogLink.href;

    const h5 = document.createElement('h5');
    h5.textContent = blogTitleCell?.textContent.trim() || '';
    blogTitleLink.append(h5);

    const p = document.createElement('p');
    p.innerHTML = blogDescriptionCell?.innerHTML || '';
    blogTitleLink.append(p);
    blogCard.append(blogTitleLink);

    // Date and CTA
    const dateReadDiv = document.createElement('div');
    dateReadDiv.classList.add('d-flex', 'date-read', 'justify-content-between', 'align-items-center');

    const time = document.createElement('time');
    time.setAttribute('datetime', dateCell?.textContent.trim() || ''); // Assuming date format is compatible
    time.textContent = dateCell?.textContent.trim() || '';
    dateReadDiv.append(time);

    const ctaLink = document.createElement('a');
    ctaLink.classList.add('btn', 'btn-primary');
    const foundCtaLink = ctaLinkCell?.querySelector('a');
    if (foundCtaLink) ctaLink.href = foundCtaLink.href;
    ctaLink.textContent = ctaLabelCell?.textContent.trim() || '';
    dateReadDiv.append(ctaLink);
    blogCard.append(dateReadDiv);

    row.append(blogCard);
  });

  container.append(row);
  section.append(container);

  block.replaceChildren(section);
}
