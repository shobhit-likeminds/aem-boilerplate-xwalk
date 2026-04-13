import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  // Filtering root rows based on content detection
  const accordionSections = children.filter((row) => {
    const cells = [...row.children];
    return cells.length === 2 && !cells[0].querySelector('picture') && !cells[0].querySelector('a');
  });

  const socialLinks = children.filter((row) => {
    const cells = [...row.children];
    return cells.length === 3 && cells[0].querySelector('a') && cells[2].querySelector('picture') && !cells[0].textContent.includes('App Link');
  });

  const appLinks = children.filter((row) => {
    const cells = [...row.children];
    return cells.length === 3 && cells[0].querySelector('a') && cells[2].querySelector('picture') && cells[0].textContent.includes('App Link');
  });

  const termLinks = children.filter((row) => {
    const cells = [...row.children];
    return cells.length === 2 && cells[0].querySelector('a') && !cells[1].querySelector('picture');
  });

  const footerLight = document.createElement('div');
  footerLight.classList.add('footer-light');

  const containerFluid = document.createElement('div');
  containerFluid.classList.add('container-fluid');
  footerLight.append(containerFluid);

  const rowAccordion = document.createElement('div');
  rowAccordion.classList.add('row', 'accordion');
  rowAccordion.id = 'fl-acc-one';
  containerFluid.append(rowAccordion);

  // Accordion Sections
  const allYouMayWantToKnowCol = document.createElement('div');
  allYouMayWantToKnowCol.classList.add('col-12', 'accblock', 'col-lg-6', 'col-xl-5');
  rowAccordion.append(allYouMayWantToKnowCol);

  const fLinksWantToKnow = document.createElement('div');
  fLinksWantToKnow.classList.add('f-links');
  allYouMayWantToKnowCol.append(fLinksWantToKnow);

  const flheadWantToKnow = document.createElement('div');
  flheadWantToKnow.classList.add('flhead', 'font-italic');
  flheadWantToKnow.textContent = 'All you may want to know';
  fLinksWantToKnow.append(flheadWantToKnow);

  const flbodyWantToKnow = document.createElement('div');
  flbodyWantToKnow.classList.add('flbody');
  fLinksWantToKnow.append(flbodyWantToKnow);

  const dXlFlexWantToKnow = document.createElement('div');
  dXlFlexWantToKnow.classList.add('d-xl-flex');
  flbodyWantToKnow.append(dXlFlexWantToKnow);

  accordionSections.forEach((row, index) => {
    const cells = [...row.children];
    const sectionTitleCell = cells.find(cell => !cell.querySelector('a') && !cell.querySelector('picture'));
    const accordionItemsCell = cells.find(cell => cell.children.length > 0 && !cell.querySelector('a') && !cell.querySelector('picture'));

    const card = document.createElement('div');
    card.classList.add('card');
    dXlFlexWantToKnow.append(card);

    const cardHeader = document.createElement('div');
    cardHeader.classList.add('card-header');
    cardHeader.id = `flheading${index + 1}`;
    card.append(cardHeader);

    const h2 = document.createElement('h2');
    h2.classList.add('mb-0');
    cardHeader.append(h2);

    const button = document.createElement('button');
    button.classList.add('btn', 'btn-link', 'btn-block', 'text-left');
    button.type = 'button';
    button.setAttribute('aria-expanded', index === 0 ? 'true' : 'false');
    button.setAttribute('aria-controls', `flcollapse${index + 1}`);
    button.textContent = sectionTitleCell ? sectionTitleCell.textContent.trim() : '';
    h2.append(button);

    const faDiv = document.createElement('div');
    faDiv.classList.add('fa', index === 0 ? 'fa-minus' : 'fa-plus');
    cardHeader.append(faDiv);

    const plusDiv = document.createElement('div');
    plusDiv.classList.add('plus');
    plusDiv.textContent = '+';
    faDiv.append(plusDiv);

    const minusDiv = document.createElement('div');
    minusDiv.classList.add('minus');
    minusDiv.textContent = '_';
    faDiv.append(minusDiv);

    const collapseDiv = document.createElement('div');
    collapseDiv.id = `flcollapse${index + 1}`;
    collapseDiv.classList.add('collapse', 'bbbb', `${index + 1}`);
    if (index === 0) {
      collapseDiv.classList.add('show');
    }
    collapseDiv.setAttribute('aria-labelledby', `flheading${index + 1}`);
    collapseDiv.setAttribute('data-parent', '#fl-acc-one');
    card.append(collapseDiv);

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    collapseDiv.append(cardBody);

    const ul = document.createElement('ul');
    cardBody.append(ul);

    // Accordion Items (links)
    if (accordionItemsCell) {
      const accordionItems = [...accordionItemsCell.children];
      accordionItems.forEach((itemRow) => {
        const itemCells = [...itemRow.children];
        const linkFieldCell = itemCells.find(cell => cell.querySelector('a'));
        const linkLabelCell = itemCells.find(cell => !cell.querySelector('a'));

        const li = document.createElement('li');
        const a = document.createElement('a');
        const foundLink = linkFieldCell ? linkFieldCell.querySelector('a') : null;
        if (foundLink) {
          a.href = foundLink.href;
        }
        a.textContent = linkLabelCell ? linkLabelCell.textContent.trim() : '';
        li.append(a);
        ul.append(li);
        moveInstrumentation(itemRow, li);
      });
    }

    button.addEventListener('click', () => {
      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!isExpanded));
      collapseDiv.classList.toggle('show');
      faDiv.classList.toggle('fa-minus', !isExpanded);
      faDiv.classList.toggle('fa-plus', isExpanded);
    });
    moveInstrumentation(row, card);
  });

  // Social Links
  const socialLinksCol = document.createElement('div');
  socialLinksCol.classList.add('col-12', 'col-xl-2');
  rowAccordion.append(socialLinksCol);

  const sociallinksDiv = document.createElement('div');
  sociallinksDiv.classList.add('sociallinks');
  socialLinksCol.append(sociallinksDiv);

  const fLinksSocial = document.createElement('div');
  fLinksSocial.classList.add('f-links');
  sociallinksDiv.append(fLinksSocial);

  const flheadSocial = document.createElement('div');
  flheadSocial.classList.add('flhead', 'font-italic');
  flheadSocial.textContent = "Let's get social";
  fLinksSocial.append(flheadSocial);

  const socialNavDiv = document.createElement('div');
  sociallinksDiv.append(socialNavDiv);

  const socialNav = document.createElement('nav');
  socialNav.setAttribute('role', 'navigation');
  socialNav.setAttribute('aria-labelledby', 'block-socialmedialinks-menu');
  socialNav.id = 'block-socialmedialinks';
  socialNavDiv.append(socialNav);

  const socialH2 = document.createElement('h2');
  socialH2.classList.add('visually-hidden');
  socialH2.id = 'block-socialmedialinks-menu';
  socialH2.textContent = 'social media links';
  socialNav.append(socialH2);

  socialLinks.forEach((row) => {
    const cells = [...row.children];
    const socialLinkCell = cells.find(cell => cell.querySelector('a'));
    const iconCell = cells.find(cell => cell.querySelector('picture'));

    const a = document.createElement('a');
    const foundLink = socialLinkCell ? socialLinkCell.querySelector('a') : null;
    if (foundLink) {
      a.href = foundLink.href;
      if (foundLink.textContent.includes('facebook')) a.classList.add('fb');
      if (foundLink.textContent.includes('twitter')) a.classList.add('tw');
      if (foundLink.textContent.includes('youtube')) a.classList.add('yt');
      if (foundLink.textContent.includes('linkedin')) a.classList.add('lin');
      if (foundLink.textContent.includes('instagram')) a.classList.add('yt'); // Original HTML uses 'yt' for instagram
      a.target = '_blank';
    }

    const picture = iconCell ? iconCell.querySelector('picture') : null;
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '30' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        a.append(optimizedPic);
      }
    }
    socialNav.append(a);
    moveInstrumentation(row, a);
  });

  // App Links
  const appLinksDiv = document.createElement('div');
  appLinksDiv.classList.add('sociallinks');
  socialLinksCol.append(appLinksDiv);

  const appNavDiv = document.createElement('div');
  appLinksDiv.append(appNavDiv);

  const appNav = document.createElement('nav');
  appNav.setAttribute('role', 'navigation');
  appNav.setAttribute('aria-labelledby', 'block-mobileappdownload-menu');
  appNav.id = 'block-mobileappdownload';
  appNavDiv.append(appNav);

  const appH2 = document.createElement('h2');
  appH2.classList.add('visually-hidden');
  appH2.id = 'block-mobileappdownload-menu';
  appH2.textContent = 'Mobile App download';
  appNav.append(appH2);

  const fLinksApp = document.createElement('div');
  fLinksApp.classList.add('f-links');
  appNav.append(fLinksApp);

  const flheadApp = document.createElement('div');
  flheadApp.classList.add('flhead', 'font-italic', 'nowrap');
  flheadApp.textContent = 'Download mBandhan 2.0 app';
  fLinksApp.append(flheadApp);

  appLinks.forEach((row) => {
    const cells = [...row.children];
    const appLinkCell = cells.find(cell => cell.querySelector('a'));
    const iconCell = cells.find(cell => cell.querySelector('picture'));

    const a = document.createElement('a');
    const foundLink = appLinkCell ? appLinkCell.querySelector('a') : null;
    if (foundLink) {
      a.href = foundLink.href;
      a.classList.add('apps');
      a.target = '_blank';
    }

    const picture = iconCell ? iconCell.querySelector('picture') : null;
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: 'auto' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        a.append(optimizedPic);
      }
    }
    appNav.append(a);
    moveInstrumentation(row, a);
  });

  // Footer Dark
  const footerDark = document.createElement('div');
  footerDark.classList.add('footer-dark');
  block.append(footerDark);

  const darkContainerFluid = document.createElement('div');
  darkContainerFluid.classList.add('container-fluid');
  footerDark.append(darkContainerFluid);

  const darkRow = document.createElement('div');
  darkRow.classList.add('row');
  darkContainerFluid.append(darkRow);

  const darkCol = document.createElement('div');
  darkCol.classList.add('col-12');
  darkRow.append(darkCol);

  const flinksDark = document.createElement('div');
  flinksDark.classList.add('flinks');
  darkCol.append(flinksDark);

  const flheadTerms = document.createElement('div');
  flheadTerms.classList.add('flhead');
  flheadTerms.textContent = 'Terms, Polices & Regulations';
  flinksDark.append(flheadTerms);

  const flbodyTerms = document.createElement('div');
  flbodyTerms.classList.add('flbody');
  flinksDark.append(flbodyTerms);

  const cloudlinks = document.createElement('div');
  cloudlinks.classList.add('cloudlinks', 'clearfix');
  flbodyTerms.append(cloudlinks);

  termLinks.forEach((row) => {
    const cells = [...row.children];
    const termLinkCell = cells.find(cell => cell.querySelector('a'));
    const termLinkLabelCell = cells.find(cell => !cell.querySelector('a'));

    const a = document.createElement('a');
    const foundLink = termLinkCell ? termLinkCell.querySelector('a') : null;
    if (foundLink) {
      a.href = foundLink.href;
      if (foundLink.target) {
        a.target = foundLink.target;
      }
    }
    a.textContent = termLinkLabelCell ? termLinkLabelCell.textContent.trim() : '';
    cloudlinks.append(a);
    moveInstrumentation(row, a);
  });

  const copyrightsDiv = document.createElement('div');
  copyrightsDiv.classList.add('copyrights');
  darkCol.append(copyrightsDiv);

  const p = document.createElement('p');
  p.innerHTML = `Bandhan Bank is <a href="/iso-certification" rel="noopener noreferrer" target="_blank">ISO27001:2022 &amp; ISO 22301:2019 certified</a><br>
© 2026&nbsp;Bandhan Bank. All Rights Reserved`;
  copyrightsDiv.append(p);

  block.textContent = '';
  block.append(footerLight, footerDark);

  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
