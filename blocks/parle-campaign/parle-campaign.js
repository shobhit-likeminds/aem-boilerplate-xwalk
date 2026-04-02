import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, ...videoRows] = [...block.children];

  const campaignGallery = document.createElement('div');
  campaignGallery.classList.add('campaign-gallery');

  const container = document.createElement('div');
  container.classList.add('container');
  const h2 = document.createElement('h2');
  moveInstrumentation(headingRow, h2);
  h2.append(headingRow.firstElementChild.textContent);
  container.append(h2);
  campaignGallery.append(container);

  const campaignSlider = document.createElement('div');
  campaignSlider.classList.add('campaign-slider', 'owl-carousel', 'owl-theme', 'owl-loaded', 'owl-drag');

  const owlStageOuter = document.createElement('div');
  owlStageOuter.classList.add('owl-stage-outer');

  const owlStage = document.createElement('div');
  owlStage.classList.add('owl-stage');
  owlStageOuter.append(owlStage);
  campaignSlider.append(owlStageOuter);

  const mobCampaignSlider = document.createElement('div');
  mobCampaignSlider.classList.add('mob-campaign-slider');
  const mobUl = document.createElement('ul');
  mobUl.classList.add('owl-carousel', 'owl-theme', 'owl-loaded', 'owl-drag');
  const mobOwlStageOuter = document.createElement('div');
  mobOwlStageOuter.classList.add('owl-stage-outer');
  const mobOwlStage = document.createElement('div');
  mobOwlStage.classList.add('owl-stage');
  mobOwlStageOuter.append(mobOwlStage);
  mobUl.append(mobOwlStageOuter);
mobCampaignSlider.append(mobUl);

  videoRows.forEach((row) => {
    const owlItem = document.createElement('div');
    owlItem.classList.add('owl-item');
    moveInstrumentation(row, owlItem);

    const ul = document.createElement('ul');
    const li = document.createElement('li');

    const linkEl = document.createElement('a');
    linkEl.classList.add('youtube', 'cboxElement');

    const campaignImg = document.createElement('div');
    campaignImg.classList.add('campaign-img');

    let videoLink = '';
    let thumbnailImage = null;
    let altText = '';
    let videoTitle = '';

    const cells = [...row.children];
    const linkCell = cells.find(cell => cell.querySelector('a'));
    const imageCell = cells.find(cell => cell.querySelector('picture'));
    const textCells = cells.filter(cell => !cell.querySelector('a') && !cell.querySelector('picture'));

    if (linkCell) {
      videoLink = linkCell.querySelector('a').href;
      moveInstrumentation(linkCell, linkEl);
    }
    if (imageCell) {
      thumbnailImage = imageCell.querySelector('picture');
      altText = thumbnailImage.querySelector('img').alt;
    }
    if (textCells.length > 0) {
      // Assuming the first text cell is alt text if image alt is missing, and second is video title
      if (!altText && textCells[0]) {
        altText = textCells[0].textContent.trim();
      }
      if (textCells.length > 1) {
        videoTitle = textCells[1].textContent.trim();
      } else if (textCells.length === 1 && altText !== textCells[0].textContent.trim()) {
        // If only one text cell and it's not already used as altText, use it as videoTitle
        videoTitle = textCells[0].textContent.trim();
      }
    }

    linkEl.href = videoLink;

    if (thumbnailImage) {
      const img = thumbnailImage.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, altText, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      campaignImg.append(optimizedPic);
      optimizedPic.querySelector('img').classList.add('img-fluid', 'lozad');
    }

    const campTitle = document.createElement('div');
    campTitle.classList.add('camp-title');
    const p = document.createElement('p');
    p.textContent = videoTitle;
    campTitle.append(p);

    campaignImg.append(campTitle);
    linkEl.append(campaignImg);
    li.append(linkEl);
    ul.append(li);
    owlItem.append(ul);
    owlStage.append(owlItem);

    // For mobile slider
    const mobOwlItem = document.createElement('div');
    mobOwlItem.classList.add('owl-item');
    moveInstrumentation(row, mobOwlItem); // Use original row for instrumentation
    const mobLi = document.createElement('li');
    const mobLinkEl = document.createElement('a');
    mobLinkEl.classList.add('youtube', 'cboxElement');
    mobLinkEl.href = videoLink;

    const mobCampaignImg = document.createElement('div');
    mobCampaignImg.classList.add('campaign-img');

    if (thumbnailImage) {
      const img = thumbnailImage.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, altText, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      mobCampaignImg.append(optimizedPic);
      optimizedPic.querySelector('img').classList.add('img-fluid', 'lozad');
    }

    const mobCampTitle = document.createElement('div');
    mobCampTitle.classList.add('camp-title');
    const mobP = document.createElement('p');
    mobP.textContent = videoTitle;
    mobCampTitle.append(mobP);

    mobCampaignImg.append(mobCampTitle);
    mobLinkEl.append(mobCampaignImg);
    mobLi.append(mobLinkEl);
    mobOwlItem.append(mobLi);
    mobOwlStage.append(mobOwlItem);

    // Add event listener for YouTube links to open in a modal
    linkEl.addEventListener('click', (e) => {
      e.preventDefault();
      const url = linkEl.href;
      // Implement your modal logic here. For example:
      // const modal = document.createElement('div');
      // modal.classList.add('video-modal');
      // modal.innerHTML = `<div class="video-modal-content"><iframe src="${url}" frameborder="0" allowfullscreen></iframe></div>`;
      // document.body.append(modal);
      // modal.addEventListener('click', () => modal.remove());
      // console.log(`Opening video modal for: ${url}`);
      window.open(url, '_blank'); // Fallback to opening in new tab if no modal implementation
    });
    mobLinkEl.addEventListener('click', (e) => {
      e.preventDefault();
      const url = mobLinkEl.href;
      // Implement your modal logic here.
      // console.log(`Opening video modal for mobile: ${url}`);
      window.open(url, '_blank'); // Fallback to opening in new tab if no modal implementation
    });
  });

  campaignGallery.append(campaignSlider);
  campaignGallery.append(mobCampaignSlider);

  block.textContent = '';
  block.append(campaignGallery);
}
