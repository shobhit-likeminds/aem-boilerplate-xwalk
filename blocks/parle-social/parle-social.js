import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];
  const headingRow = children[0];
  const itemRows = children.slice(1);

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container');

  const heading = document.createElement('h2');
  moveInstrumentation(headingRow.firstElementChild, heading);
  heading.textContent = headingRow.firstElementChild.textContent;
  containerDiv.append(heading);

  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row');

  // Distinguish item types based on cell count and content
  const socialItems = itemRows.filter((row) => {
    const cells = [...row.children];
    return cells.length === 3 && cells[0].querySelector('picture') && cells[1].textContent && cells[2].innerHTML;
  });
  const instagramImages = itemRows.filter((row) => {
    const cells = [...row.children];
    return cells.length === 2 && cells[0].querySelector('a') && cells[1].querySelector('picture');
  });

  socialItems.forEach((row) => {
    const cells = [...row.children];
    const iconCell = cells.find(cell => cell.querySelector('picture'));
    const platformCell = cells.find(cell => !cell.querySelector('picture') && !cell.querySelector('a') && cell.textContent);
    const embedHtmlCell = cells.find(cell => cell.innerHTML.includes('<iframe') || cell.innerHTML.includes('<a class="twitter-timeline"'));

    const colDiv = document.createElement('div');
    colDiv.classList.add('col-md-4');
    moveInstrumentation(row, colDiv);

    const socialLogoDiv = document.createElement('div');
    socialLogoDiv.classList.add('social_logo');

    if (iconCell) {
      const picture = iconCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        socialLogoDiv.append(optimizedPic);
      }
    }

    if (platformCell) {
      const platformText = document.createElement('span');
      moveInstrumentation(platformCell, platformText);
      platformText.textContent = platformCell.textContent;
      socialLogoDiv.append(platformText);
    }

    colDiv.append(socialLogoDiv);

    const embedDiv = document.createElement('div');
    if (embedHtmlCell) {
      moveInstrumentation(embedHtmlCell, embedDiv);
      embedDiv.innerHTML = embedHtmlCell.innerHTML;
    }

    // Specific handling for Facebook embed
    if (platformCell && platformCell.textContent.toLowerCase().includes('facebook')) {
      embedDiv.classList.add('fb_reset'); // Original HTML has this on a div above the iframe
      const fbPageDiv = embedDiv.querySelector('.fb-page');
      if (fbPageDiv) {
        // Ensure data-width and data-height are not hardcoded in JS, let CSS handle it
        fbPageDiv.removeAttribute('data-width');
        fbPageDiv.removeAttribute('data-height');
        fbPageDiv.setAttribute('data-adapt-container-width', 'true');
        fbPageDiv.setAttribute('data-small-header', 'true');
        fbPageDiv.setAttribute('data-hide-cover', 'false');
        fbPageDiv.setAttribute('data-show-facepile', 'false');
        fbPageDiv.setAttribute('data-tabs', 'timeline');
      }
      const fbRoot = document.createElement('div');
      fbRoot.id = 'fb-root';
      fbRoot.classList.add('fb_reset');
      colDiv.prepend(fbRoot);

      const script = document.createElement('script');
      script.async = true;
      script.defer = true;
      script.crossOrigin = 'anonymous';
      script.src = 'https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v8.0';
      script.nonce = '';
      colDiv.append(script);
    }
    // Specific handling for Twitter embed
    else if (platformCell && platformCell.textContent.toLowerCase().includes('twitter')) {
      const twitterTimelineDiv = document.createElement('div');
      twitterTimelineDiv.classList.add('twitter-timeline', 'twitter-timeline-rendered');
      const twitterLink = embedDiv.querySelector('a.twitter-timeline');
      if (twitterLink) {
        twitterLink.removeAttribute('data-width');
        twitterLink.removeAttribute('data-height');
        twitterLink.setAttribute('data-theme', 'light');
        twitterTimelineDiv.append(twitterLink);
      }
      colDiv.append(twitterTimelineDiv);

      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://platform.twitter.com/widgets.js';
      script.charset = 'utf-8';
      colDiv.append(script);
    }

    colDiv.append(embedDiv);
    rowDiv.append(colDiv);
  });

  if (instagramImages.length > 0) {
    const colDiv = document.createElement('div');
    colDiv.classList.add('col-md-4');

    const socialLogoDiv = document.createElement('div');
    socialLogoDiv.classList.add('social_logo');
    const img = document.createElement('img');
    img.classList.add('img-fluid');
    // Assuming a default Instagram icon if not provided in EDS, or could be from an item row
    img.src = '/content/dam/aemigrate/uploaded-folder/image/instagram.png';
    img.alt = 'Instagram';
    socialLogoDiv.append(img);
    socialLogoDiv.append(document.createTextNode(' Instagram'));
    colDiv.append(socialLogoDiv);

    const parlegInstaDiv = document.createElement('div');
    parlegInstaDiv.classList.add('parleg-insta', 'owl-carousel', 'owl-theme', 'owl-loaded', 'owl-drag');

    const owlStageOuter = document.createElement('div');
    owlStageOuter.classList.add('owl-stage-outer');

    const owlStage = document.createElement('div');
    owlStage.classList.add('owl-stage');
    // The original HTML has inline styles for transform, transition, width for owl-stage.
    // These are likely set by Owl Carousel JS, so we shouldn't hardcode them.
    // We'll add a placeholder for now, but Owl Carousel JS would override.

    instagramImages.forEach((row) => {
      const cells = [...row.children];
      const linkCell = cells.find(cell => cell.querySelector('a'));
      const imageCell = cells.find(cell => cell.querySelector('picture'));

      const owlItem = document.createElement('div');
      owlItem.classList.add('owl-item');
      // The original HTML has inline styles for width and margin-right for owl-item.
      // These are likely set by Owl Carousel JS, so we shouldn't hardcode them.

      const itemDiv = document.createElement('div');
      itemDiv.classList.add('item');

      const link = document.createElement('a');
      if (linkCell) {
        const foundLink = linkCell.querySelector('a');
        if (foundLink) {
          link.href = foundLink.href;
          link.target = '_blank';
        }
        moveInstrumentation(linkCell, link); // Move instrumentation from linkCell to new link
      }

      if (imageCell) {
        const picture = imageCell.querySelector('picture');
        if (picture) {
          const imgEl = picture.querySelector('img');
          const optimizedPic = createOptimizedPicture(imgEl.src, imgEl.alt, false, [{ width: '750' }]);
          optimizedPic.querySelector('img').classList.add('img-fluid');
          moveInstrumentation(imgEl, optimizedPic.querySelector('img'));
          link.append(optimizedPic);
        }
        moveInstrumentation(imageCell, link); // Move instrumentation from imageCell to new link
      }

      itemDiv.append(link);
      owlItem.append(itemDiv);
      owlStage.append(owlItem);
    });

    owlStageOuter.append(owlStage);
    parlegInstaDiv.append(owlStageOuter);

    // Add placeholder owl-nav and owl-dots as they are part of the structure
    const owlNav = document.createElement('div');
    owlNav.classList.add('owl-nav', 'disabled');
    owlNav.innerHTML = '<div class="owl-prev">prev</div><div class="owl-next">next</div>';
    parlegInstaDiv.append(owlNav);

    const owlDots = document.createElement('div');
    owlDots.classList.add('owl-dots');
    // Add a dot for each image as a placeholder
    instagramImages.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('owl-dot');
      if (index === 0) dot.classList.add('active');
      dot.innerHTML = '<span></span>';
      owlDots.append(dot);
    });
    parlegInstaDiv.append(owlDots);

    colDiv.append(parlegInstaDiv);
    rowDiv.append(colDiv);
  }

  containerDiv.append(rowDiv);
  block.textContent = '';
  block.append(containerDiv);

  // Image optimization for any remaining pictures
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
