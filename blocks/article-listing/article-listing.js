import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('section');
  wrapper.classList.add('article_listing--wrapper');

  const articleListing = document.createElement('div');
  articleListing.classList.add('article_listing', 'position-relative');
  wrapper.append(articleListing);

  const [headingRow, descriptionRow, ctaLinkRow, ctaLinkLabelRow, ...articleRows] = [...block.children];

  // First section
  const firstSection = document.createElement('div');
  firstSection.classList.add('article_listing_section--first', 'text-white', 'text-center');

  const heading = document.createElement('h2');
  heading.classList.add('article_listing--title', 'boing--text__heading-1', 'text-white', 'pb-3');
  moveInstrumentation(headingRow.firstElementChild, heading);
  heading.append(...headingRow.firstElementChild.childNodes);
  firstSection.append(heading);

  const description = document.createElement('p');
  description.classList.add('article_listing--desc', 'boing--text__body-2', 'pb-4');
  moveInstrumentation(descriptionRow.firstElementChild, description);
  description.append(...descriptionRow.firstElementChild.childNodes);
  firstSection.append(description);

  const ctaWrapper = document.createElement('div');
  ctaWrapper.classList.add('article_listing--btnWrapper');

  const ctaLink = document.createElement('a');
  const originalCtaLink = ctaLinkRow.querySelector('a');
  const originalCtaLinkLabel = ctaLinkLabelRow.querySelector('a');

  if (originalCtaLink) {
    ctaLink.href = originalCtaLink.href;
    // The original HTML shows the ctaLinkLabel is a URL, but the model says it's text.
    // The JS was trying to use the textContent of the ctaLinkLabel for the title,
    // which is correct for the model's intent.
    ctaLink.title = originalCtaLinkLabel ? originalCtaLinkLabel.textContent.trim() : originalCtaLink.textContent.trim();
    ctaLink.classList.add('boing--text__title-3', 'article_listing--btn', 'analytics_cta_click');
    moveInstrumentation(originalCtaLink, ctaLink);
    // The original HTML shows an SVG inside the CTA link, which is not handled here.
    // For now, append the title as text content.
    ctaLink.append(ctaLink.title);
  }
  ctaWrapper.append(ctaLink);
  firstSection.append(ctaWrapper);
  articleListing.append(firstSection);

  // Second section (article cards)
  const secondSection = document.createElement('div');
  secondSection.classList.add('article_listing_section--second', 'd-flex');

  articleRows.forEach((row) => {
    // Based on BLOCK JSON and EDS BLOCK STRUCTURE:
    // cell[0]: field="cardLink" label="Card Link" type=aem-content (<a>)
    // cell[1]: field="cardLinkLabel" label="Card Link Label" type=text (<a>, but content is label)
    // cell[2]: field="image" label="Image" type=reference (<picture>)
    // cell[3]: field="date" label="Date" type=text (text content)
    // cell[4]: field="title" label="Title" type=text (text content)
    const cells = [...row.children];
    const cardLinkCell = cells[0];
    const cardLinkLabelCell = cells[1];
    const imageCell = cells[2];
    const dateCell = cells[3];
    const titleCell = cells[4];

    const cardLinkWrapper = document.createElement('a');
    cardLinkWrapper.classList.add('article_listing--cardWrapper', 'analytics_cta_click');
    moveInstrumentation(row, cardLinkWrapper);

    const originalCardLink = cardLinkCell ? cardLinkCell.querySelector('a') : null;
    const originalCardLinkLabel = cardLinkLabelCell ? cardLinkLabelCell.querySelector('a') : null;

    if (originalCardLink) {
      cardLinkWrapper.href = originalCardLink.href;
    }
    if (originalCardLinkLabel) {
      cardLinkWrapper.setAttribute('data-cta-label', originalCardLinkLabel.textContent.trim());
    } else if (titleCell) {
      cardLinkWrapper.setAttribute('data-cta-label', titleCell.textContent.trim());
    }

    const card = document.createElement('div');
    card.classList.add('article_listing--cards');

    if (imageCell) {
      const cardImageWrapper = document.createElement('div');
      cardImageWrapper.classList.add('article_listing--cardImageWrapper');
      const picture = imageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          optimizedPic.querySelector('img').classList.add('article_listing--cardImage', 'w-100', 'h-100');
          cardImageWrapper.append(optimizedPic);
        }
      }
      card.append(cardImageWrapper);
    }

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('cards_content--wrapper');

    if (dateCell) {
      const datePara = document.createElement('p');
      datePara.classList.add('boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'published_date');
      moveInstrumentation(dateCell, datePara);
      datePara.append(dateCell.textContent.trim());
      contentWrapper.append(datePara);
    }

    if (titleCell) {
      const titlePara = document.createElement('p');
      titlePara.classList.add('boing--text__body-2', 'boing--text__body');
      moveInstrumentation(titleCell, titlePara);
      titlePara.append(titleCell.textContent.trim());
      contentWrapper.append(titlePara);
    }

    card.append(contentWrapper);
    cardLinkWrapper.append(card);
    secondSection.append(cardLinkWrapper);
  });

  articleListing.append(secondSection);

  block.textContent = '';
  block.append(wrapper);
}
