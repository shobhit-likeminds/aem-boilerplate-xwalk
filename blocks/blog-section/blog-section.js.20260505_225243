import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  const section = document.createElement('section');
  // section.classList.add('blog-section'); // REMOVED: Outer block div already has this class

  const sectionTitleRow = children[0];
  const sectionTitle = document.createElement('h2');
  moveInstrumentation(sectionTitleRow, sectionTitle);
  sectionTitle.textContent = sectionTitleRow.textContent.trim();
  section.append(sectionTitle);

  const container = document.createElement('div');
  container.classList.add('container', 'mt-6');
  section.append(container);

  const row = document.createElement('div');
  row.classList.add('row', 'justify-content-around');
  container.append(row);

  const blogCardRows = children.slice(1);

  blogCardRows.forEach((blogCardRow) => {
    const [
      imageCell,
      cardLinkCell,
      categoryLabelCell,
      categoryLinkCell,
      blogTitleCell,
      blogDescriptionCell,
      dateCell,
      readMoreLinkCell,
      readMoreLabelCell,
    ] = [...blogCardRow.children];

    const blogCard = document.createElement('div');
    blogCard.classList.add('blog-card', 'col-lg-4', 'col-md-6', 'col-12');
    moveInstrumentation(blogCardRow, blogCard);

    const cardLink = document.createElement('a');
    const foundCardLink = cardLinkCell.querySelector('a');
    if (foundCardLink) {
      cardLink.href = foundCardLink.href;
    }
    blogCard.append(cardLink);

    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      // Add img-fluid class to the actual img element inside the optimized picture
      optimizedPic.querySelector('img').classList.add('img-fluid');
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      cardLink.append(optimizedPic);
    }

    const categoriesDiv = document.createElement('div');
    categoriesDiv.classList.add('categories', 'align-items-center', 'gap-3', 'flex-wrap');
    blogCard.append(categoriesDiv);

    const categoryLink = document.createElement('a');
    const foundCategoryLink = categoryLinkCell.querySelector('a');
    if (foundCategoryLink) {
      categoryLink.href = foundCategoryLink.href;
    }
    categoryLink.textContent = categoryLabelCell.textContent.trim();
    categoriesDiv.append(categoryLink);

    const blogContentLink = document.createElement('a');
    if (foundCardLink) {
      blogContentLink.href = foundCardLink.href;
    }
    blogCard.append(blogContentLink);

    const blogTitle = document.createElement('h5');
    blogTitle.textContent = blogTitleCell.textContent.trim();
    blogContentLink.append(blogTitle);

    // FIX: blogDescription is richtext, so it might contain <p> tags.
    // Assigning to <p> creates <p><p>...</p></p>. Use <div> instead.
    const blogDescription = document.createElement('div');
    blogDescription.innerHTML = blogDescriptionCell.innerHTML;
    blogContentLink.append(blogDescription);

    const dateReadDiv = document.createElement('div');
    dateReadDiv.classList.add('d-flex', 'date-read', 'justify-content-between', 'align-items-center');
    blogCard.append(dateReadDiv);

    const date = document.createElement('time');
    date.textContent = dateCell.textContent.trim();
    dateReadDiv.append(date);

    const readMoreLink = document.createElement('a');
    readMoreLink.classList.add('btn', 'btn-primary');
    const foundReadMoreLink = readMoreLinkCell.querySelector('a');
    if (foundReadMoreLink) {
      readMoreLink.href = foundReadMoreLink.href;
    }
    readMoreLink.textContent = readMoreLabelCell.textContent.trim();
    dateReadDiv.append(readMoreLink);

    row.append(blogCard);
  });

  block.replaceChildren(section);
}
