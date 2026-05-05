import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  const section = document.createElement('section');
  section.classList.add('blog-section');

  // CHECK 0: Replaced direct children[0] access with destructuring
  const [sectionTitleRow, ...blogCardRows] = children;

  const sectionTitle = document.createElement('h2');
  moveInstrumentation(sectionTitleRow, sectionTitle);
  sectionTitle.textContent = sectionTitleRow.textContent.trim();
  section.append(sectionTitle);

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container', 'mt-6');

  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row', 'justify-content-around');

  blogCardRows.forEach((row) => {
    const [
      cardLinkCell,
      imageCell,
      categoryLinkCell,
      categoryLabelCell,
      titleCell,
      descriptionCell,
      dateCell,
      readMoreLinkCell,
      readMoreLabelCell,
    ] = [...row.children];

    const blogCard = document.createElement('div');
    blogCard.classList.add('blog-card', 'col-lg-4', 'col-md-6', 'col-12');
    moveInstrumentation(row, blogCard);

    const cardLink = document.createElement('a');
    cardLink.href = cardLinkCell.querySelector('a')?.href || '#';
    moveInstrumentation(cardLinkCell, cardLink);

    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      // CHECK 2.6: moveInstrumentation for the actual img element inside the picture
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('img-fluid'); // Add img-fluid class
      cardLink.append(optimizedPic);
    }
    blogCard.append(cardLink);

    const categoriesDiv = document.createElement('div');
    categoriesDiv.classList.add('categories', 'align-items-center', 'gap-3', 'flex-wrap');
    moveInstrumentation(categoryLinkCell, categoriesDiv); // Instrumentation for the container

    const categoryLink = document.createElement('a');
    categoryLink.href = categoryLinkCell.querySelector('a')?.href || '#';
    categoryLink.textContent = categoryLabelCell.textContent.trim();
    moveInstrumentation(categoryLabelCell, categoryLink); // Instrumentation for the label
    categoriesDiv.append(categoryLink);
    blogCard.append(categoriesDiv);

    const titleAndDescriptionLink = document.createElement('a');
    titleAndDescriptionLink.href = cardLinkCell.querySelector('a')?.href || '#';
    moveInstrumentation(titleCell, titleAndDescriptionLink); // Instrumentation for the title

    const title = document.createElement('h5');
    title.textContent = titleCell.textContent.trim();
    titleAndDescriptionLink.append(title);

    const description = document.createElement('p');
    description.textContent = descriptionCell.textContent.trim();
    titleAndDescriptionLink.append(description);
    moveInstrumentation(descriptionCell, description); // Instrumentation for the description
    blogCard.append(titleAndDescriptionLink);

    const dateReadDiv = document.createElement('div');
    dateReadDiv.classList.add('d-flex', 'date-read', 'justify-content-between', 'align-items-center');
    moveInstrumentation(dateCell, dateReadDiv); // Instrumentation for the container

    const time = document.createElement('time');
    time.setAttribute('datetime', dateCell.textContent.trim()); // Assuming date format is suitable for datetime
    time.textContent = dateCell.textContent.trim();
    dateReadDiv.append(time);

    const readMoreLink = document.createElement('a');
    readMoreLink.href = readMoreLinkCell.querySelector('a')?.href || '#';
    readMoreLink.classList.add('btn', 'btn-primary');
    readMoreLink.textContent = readMoreLabelCell.textContent.trim();
    moveInstrumentation(readMoreLinkCell, readMoreLink); // Instrumentation for the link
    moveInstrumentation(readMoreLabelCell, readMoreLink); // Instrumentation for the label
    dateReadDiv.append(readMoreLink);
    blogCard.append(dateReadDiv);

    rowDiv.append(blogCard);
  });

  containerDiv.append(rowDiv);
  section.append(containerDiv);

  block.replaceChildren(section);
}
