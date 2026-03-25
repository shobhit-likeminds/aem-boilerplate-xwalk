import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  block.classList.add('user_guide_wrapper');

  const [userGuideImgRow, blockTitleRow, h1tagRow, guideListContainerRow, ...guideListRows] = [...block.children];

  // UserGuideImg
  const userGuideImgDiv = document.createElement('div');
  userGuideImgDiv.classList.add('userGuideImg');
  moveInstrumentation(userGuideImgRow, userGuideImgDiv);
  while (userGuideImgRow.firstChild) userGuideImgDiv.append(userGuideImgRow.firstChild);
  block.append(userGuideImgDiv);

  // Block Title and H1 Tag
  const userGuideHeadingDiv = document.createElement('div');
  userGuideHeadingDiv.classList.add('user_guide_heading');

  const blockTitleH2 = document.createElement('h2');
  blockTitleH2.classList.add('block-title');
  moveInstrumentation(blockTitleRow, blockTitleH2);
  while (blockTitleRow.firstChild) blockTitleH2.append(blockTitleRow.firstChild);
  userGuideHeadingDiv.append(blockTitleH2);

  const h1tagH2 = document.createElement('h2');
  h1tagH2.classList.add('h1tag');
  moveInstrumentation(h1tagRow, h1tagH2);
  while (h1tagRow.firstChild) h1tagH2.append(h1tagRow.firstChild);
  userGuideHeadingDiv.append(h1tagH2);

  block.append(userGuideHeadingDiv);

  // Guide List
  const userGuideListDiv = document.createElement('div');
  userGuideListDiv.classList.add('user_guide_list');

  guideListRows.forEach((row) => {
    const guideListDiv = document.createElement('div');
    guideListDiv.classList.add('guide_list');
    moveInstrumentation(row, guideListDiv);

    const [titleCell, descriptionCell] = [...row.children];

    const titleH2 = document.createElement('h2');
    titleH2.classList.add('title');
    moveInstrumentation(titleCell, titleH2);
    while (titleCell.firstChild) titleH2.append(titleCell.firstChild);
    guideListDiv.append(titleH2);

    const descriptionDiv = document.createElement('div');
    descriptionDiv.classList.add('description');
    moveInstrumentation(descriptionCell, descriptionDiv);
    while (descriptionCell.firstChild) descriptionDiv.append(descriptionCell.firstChild);
    guideListDiv.append(descriptionDiv);

    userGuideListDiv.append(guideListDiv);
  });

  block.append(userGuideListDiv);

  // Optimize images
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
