import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl, level = 0) {
  rootUl.querySelectorAll('li').forEach((li) => {
    const nested = li.querySelector(':scope > ul');
    const anchor = li.querySelector(':scope > a');

    if (!anchor) {
      const textNode = [...li.childNodes].find(
        (n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim(),
      );
      if (textNode) {
        const span = document.createElement('span');
        span.textContent = textNode.textContent.trim();
        textNode.remove();
        li.prepend(span);
      }
    }

    if (nested) {
      nested.remove();
      const subWrap = document.createElement('div');
      if (level === 0) {
        subWrap.classList.add('has-footer-sub-child');
      } else if (level === 1) {
        subWrap.classList.add('has-footer-inner-sub-child');
      }
      subWrap.append(nested);
      li.append(subWrap);

      const trigger = li.querySelector(':scope > a, :scope > span');
      if (trigger) {
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          li.classList.toggle('active');
          subWrap.classList.toggle('active');
        });
      }
      transformNestedLists(nested, level + 1);
    }
  });
}

export default function decorate(block) {
  const children = [...block.children];

  // Root-level rows (fixed order per BlockJson model)
  const logoRow = children[0];
  const logoLinkRow = children[1];
  const copyrightTextRow = children[children.length - 1]; // Assuming copyright is always the last root field

  // Filter for item rows based on their structure and content
  const socialLinkItems = children.filter(
    (row) => row.children.length === 2 && row.querySelector('div:nth-child(2)')?.querySelector('ul'),
  );
  const footerMenuBlocks = children.filter(
    (row) => row.children.length === 3 && row.querySelector('div:nth-child(3)')?.textContent.trim() === 'Menu Items value',
  );
  const footerMenuItems = children.filter(
    (row) => row.children.length === 3 && row.querySelector('div:nth-child(3)')?.textContent.trim() === 'Sub Menu Items value',
  );
  const footerSubMenuItems = children.filter(
    (row) => row.children.length === 3 && row.querySelector('div:nth-child(3)')?.textContent.trim() === 'Inner Sub Menu Items value',
  );
  const footerInnerSubMenuItems = children.filter(
    (row) => row.children.length === 2 && row.querySelector('div:nth-child(1)')?.textContent.trim().startsWith('Inner Sub Menu Item Label'),
  );
  const secondaryNavItems = children.filter(
    (row) => row.children.length === 2 && row.querySelector('div:nth-child(1)')?.textContent.trim().startsWith('Secondary Navigation Item Label'),
  );

  const container = document.createElement('div');
  container.classList.add('container');

  const footerHeader = document.createElement('div');
  footerHeader.classList.add('row', 'footer-header');

  const logoWrapper = document.createElement('div');
  logoWrapper.classList.add('col-md-6', 'col-12', 'justify-content-between', 'd-flex');

  const logoDiv = document.createElement('div');
  logoDiv.classList.add('logo');

  const logoAnchor = document.createElement('a');
  if (logoLinkRow) {
    const foundLink = logoLinkRow.querySelector('a');
    if (foundLink) logoAnchor.href = foundLink.href;
    moveInstrumentation(logoLinkRow, logoAnchor);
  } else {
    logoAnchor.href = '#';
  }

  if (logoRow) {
    const picture = logoRow.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        logoAnchor.append(optimizedPic);
      }
    }
    moveInstrumentation(logoRow, logoDiv);
  }
  logoDiv.append(logoAnchor);
  logoWrapper.append(logoDiv);
  footerHeader.append(logoWrapper);

  const socialWrapCenter = document.createElement('div');
  socialWrapCenter.classList.add('col-md-6', 'col-12', 'footer-social-wrap-center');

  const socialWrapUl = document.createElement('ul');
  socialWrapUl.classList.add('social-wrap');

  socialLinkItems.forEach((row) => {
    const [linkCell, hierarchyCell] = [...row.children]; // Fixed schema for social-link-item
    const li = document.createElement('li');
    const anchor = document.createElement('a');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) anchor.href = foundLink.href;

    // Inline SVG from ORIGINAL HTML
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '30');
    svg.setAttribute('height', '30');
    svg.setAttribute('viewBox', '0 0 40 41');

    if (anchor.href.includes('facebook.com')) {
      li.classList.add('fb');
      svg.innerHTML = '<image xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAApCAYAAABHomvIAAAAAXNSR0IArs4c6QAAAZRJREFUWEftltFNwzAQhn2NHxMpj5HsSOkG3YCyQTcoTABMUJgANiArdILCBIxApNh5pQNEMXEFUqmcxNa1UZDsV1/uvvvPdzkgEz8wcT7iAbEVOjuCcRzHYRiuAWChlMoMgO9CiEdb8LMBarAoijZKqfu+4ACQl2V5OypgkiRZEAS7NrhJsT8sowO6wGnS0QHTNM2VUmvrko1ZYq0epfTTFm50BRljNwDw2gO4b5tmf3K/lVL2NtKxPaqLOecvhJC7DsAnl3HSlSQKkDGWA4Dx/QkhUL5/gVFOPKAOyy4deGo7OQWzLIvruv7CJHXRQc0YWwDABwawrZpTdzuVmHO+JITsMIBKqQcppR5PVscJ0G/wDwZtmmZVVdV20PDHwAmQc673uI2t8w67ayHEm60PV8C+P4dVTErpvCiKwsrYdczoEs9ms6sj58uOrfmwVpkgXJbVw3Jhm4nJbnJzcPKD2gMa3pF/g5gm9F2MVc8r6BUcUuA//OqeCSErUyJSyvlQgjb3qEFtEwBr4wG9glgFsN9/A/ubqSotIjiQAAAAAElFTkSuQmCC" x="0" y="0" width="30" height="30"></image>';
    } else if (anchor.href.includes('twitter.com')) {
      li.classList.add('tw');
      svg.innerHTML = '<image xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAApCAYAAABHomvIAAAAAXNSR0IArs4c6QAAA0NJREFUWEftmF9OIkEQxrtAn+CBR5NuyRxBbrDcYPcE6glWT6CeYPUE4gncPQHeQI9AnB7jI4nwJFA7NaEnTdM9XQNsYjbME2H6z4+vur6qBsQXf+CL84k94LYR2iu4cwWVUleIeMZY+C7LslvGuJUhUsoTIcSj/SUA/NFaX/jWWgtxkiSd+Xz+jIgJY/O+1vqJMa4YcnR0lDSbzSEA2Gu/TCaT/ng8HrMAzUIHBwfPQoiONcmA0HekgsiVHs3n8/77+/soBumDA4DR5+dn5fxgkhwfH39HxDIUi8Xix9vb228CUUoRfAEphHjSWverADudTqfVaj3bynHgaM3KLFZKXedCXS03H89msx6pRWocHh4OzTEAgNs0TS9DkM4PomHlWjHlozajlBrmKn0zIZ1Opz06L0op+o7eFU+j0Th7fX19cDeUUt7naq0kHSL2six7icFFFaQBbtLkYRqkaXpO76SUFwDwy1XYbEyOkH+mKJQPAJynaTrgwLEAlyAnAEBqFUmDiJfGYqSUAwA49Si8BpcfqRut9QpwDDQaYrOAlPIMAO6tBQuL8dgSJRJlvOuRteHYCloho01/GrWMxVDSeGyp/C2ISKbuNeKdKWhBlkkjhChN1kPwMQURH7Is41QmLys7xGZ2lcUopUqFl+Mrq0RMvdohts4jJQ2ZtVGpTBrblkhhrXWPAxIaU1tBC9K2GApl4W11TTwGvzEgLWyH1K7L1LGEFI4Bue+3AnRB7Lrsmjgi9rnVw4bcGNDXABSH2qrLIROvo+JGgATXbrfJbkxHs7Knqctk4rPZzB4X7Xx2EmJfAyCEuDMmTt2KCanHxK+11jdcFWsrWNUAhELq9pZCCHYnXgvQB2c3AJ66XIY01FvGlGQDxuDsSuPU5TKkromX3UXMeizAbrd7ulgs3B4u2J2Ergue3rKyE2eVOo/XsRqAUEiX63l7S1+4KxUMtFHsBiB0XXBMvCyTtQBD18SPj4/iThI73PTeDSkivgCAmVvcc+ipur56Fdz0DuuDjjWz1hyvia8B+qoE9w4bUjXUzK5VDc/11QtIkPZkCik3rCHIJEk4f6WI0Wi08i8Fy2Y45+1fjdkDbqvsXsH/XsG/07ZKSIssn8EAAAAAElFTkSuQmCC" x="0" y="0" width="30" height="30"></image>';
    } else if (anchor.href.includes('instagram.com')) {
      li.classList.add('inst');
      svg.innerHTML = '<image xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAApCAYAAABHomvIAAAAAXNSR0IArs4c6QAAA5FJREFUWEftWG1O4zAQ9ZTyC9Bm/yE50YYb0BtsbwAnWDgBcALoCYATUE4AewK4AbkBRbER/8iq5Q+kmc2gJHK+nbogtNpIlarEY788v3kzDrAvfsEXx8f+HYCu67qvr6/bvV7vB2Psu8K8BQDfqnYCEf8wxgLl2XMURQ9RFHlPT08Tnd1rZNCyLGt9ff2AMbbDGNvWmVB3DCISwBMp5WVTTC3Azc1Nd2Vl5QYAXN1FFxlHQOfz+bCO0UqABK7f798xxqxFFl0gJkDEoZTSK8aWANK2rq2t3X00c0UgxOTLy8sgCAJVs+Ustm37mLSxAAvLCBkJIXJrlxjknN9/IHvXAHAZRRFl/mmFhAIhhOoQeQZt2/7JGLtZBhUlLQFMfN/fSu9zzvcA4KJiqweqFnMMcs4PkzfrnJE0BACkH/qRJRUT7LcQguzq/eKcb4MAJWLuQsR9KeU4vZkDaNs27T9pUPciMOf9fn88mUxyxpvY1AkA/EpmC8IwHKR20qH1nA6LDI6VCdtAemEY7rZVBAK6urp6g4huwjJZCbFLcipdsf7Hvu/vVzLIOdcF6M1ms2HREureyHVdKwxD0nZrNTIGCACTt7e3nPMnyXWAiO8AAMBDxJEqdl3zNwYYr5/TSItvngghRimzOho3BhiG4ZYidB1bGgohbglkstXPTeI2BegJIQYKI6SrSrErIG6FEEMlhqylVoumAHNeZts2sdHWUOSqg+M4V4iY+WGRTSOAxeBYf9jmRfQ81mFmZx8KMG5cF9niTjFGDFIZm81mW6n/1dVTldXYnPfSrvkzkoTF54wjKeVZCqLJ3BHxXEp5qIytbBDUFzJlkACWGktistfrHVM5o8WS8waBy15EtxE2BphUily9TBkgEPS/qgQ6jnOKiBmbdcm1FIAJyLPpdDpqq8cJc6dxidzTyfhGgDqlqJAAjUdHqtGIeNGxQ29stxZtWKkv9KiRSDSYtlNtJl4itZiExYZVp7bq7JTJmKx2v0tJnSnxqXuN8mUCoCm2+dBEkV11uEyksU2NpZRZN11iUGmJPp3Fqka4EiDddBxnBxGvlslO21xRFO0+Pj5el7qbusAEJJ1bO2diG5jC8wAAjnzfz46audLXNFnF0bHj2o3D6YPR9Xw+HzWdDLW+sFI12NjYINOlwzZ9wLQQsROzikc+0KFqOp3etlWhWg0ukybTubQYNF3EJP4/w0wBP2KPYv1E4ISFh4AkYAAAAASUVORK5CYII" x="0" y="0" width="30" height="30"></image>';
    } else if (anchor.href.includes('linkedin.com')) {
      li.classList.add('in');
      svg.innerHTML = '<image xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAApCAYAAABHomvIAAAAAXNSR0IArs4c6QAAAg5JREFUWEftWFFOwkAQ3SH94qufJLsf9Qb2BnIS6wnAEygnEE8g3sAbiDeoJ6AJuwl/1qR8UTJ2DJBmuwvU2gqm+wmzMy9vZm7MFtiJHzhxfKwFWDVD58ugEGLAGAsQ0e10OtPVajVaLBZRVUbK3jcyKIS4yxzd550hYrRcLv04juOyQarYGwFyzmcA4OmOEfFWKTWuErDs3QLAXq/nOY4zMzlCxEel1LBskCp2thR/MMZcA4OBUuq5SsCyd20pHgLAg+YslFL6ZQNUtbfKjBDiCgCokxkividJMm66QSj2+epg1dTo913XdbvdLmXlu7YBIEqSJDyUFVuTvFoAvkkpd/pIZZBVAGlm4WwkKczZkG3hZHI22TcEbADR5mw+n99s/+OcBwDwZLJ1HOdivV4PEPEYWYoRsa+UCnVftQFExEmWxqBEqcRpmvr6OK0NYAlgedOplLKf/+HUADIqjSiKdktJEwCnjLGXrGk+GWPUxdf72NXnfd0AR/muJ2Cc80sAIJUojNKN/EzyjVgnQOtoFEKQVBnliWSnEYDZ/mhdLDzPc9M0pYXEqItNAfRNurZFlG3sxo2pMQb1btSpsi3FLcAtUy2Dx3TYoWUhPxHaGjSpfMug7U2SfVn4lYW1rcHC+q0N8j+rQc/zCt9lCCy9wPKvMHqp0TFJ0k70kv2xMdp38Q/fJrtrLYP/nsEv9hasOXFhAv8AAAAASUVORK5CYII" x="0" y="0" width="30" height="30"></image>';
    }
    anchor.append(svg);
    li.append(anchor);
    socialWrapUl.append(li);
    moveInstrumentation(row, li);
  });
  socialWrapCenter.append(socialWrapUl);
  footerHeader.append(socialWrapCenter);
  container.append(footerHeader);

  const footerMenuBox = document.createElement('div');
  footerMenuBox.classList.add('row', 'footer-menu-box');
  const footerMenuCol = document.createElement('div');
  footerMenuCol.classList.add('col');
  const footerMenuDiv = document.createElement('div');
  footerMenuDiv.classList.add('footer-menu');

  const linkBlocksContainer = document.createElement('div');
  linkBlocksContainer.classList.add('link-blocks-container');

  footerMenuBlocks.forEach((blockRow) => {
    const [headingCell, headingLinkCell, menuItemsContainerCell] = [...blockRow.children]; // Fixed schema for footer-menu-block
    const linkBlocks = document.createElement('div');
    linkBlocks.classList.add('link-blocks');
    const headDiv = document.createElement('div');
    headDiv.classList.add('head');
    const span = document.createElement('span');
    const anchor = document.createElement('a');
    const foundLink = headingLinkCell.querySelector('a');
    if (foundLink) anchor.href = foundLink.href;
    anchor.textContent = headingCell.textContent.trim();
    span.append(anchor);
    headDiv.append(span);

    const small = document.createElement('small');
    small.setAttribute('data-once', 'footerMobileInner');
    span.append(small);

    const ul = document.createElement('ul');
    ul.classList.add('footer-inner-list');

    const menuItems = footerMenuItems.filter(
      (item) => item.dataset.aueResource.includes(blockRow.dataset.aueResource),
    );

    menuItems.forEach((menuItemRow) => {
      const [labelCell, linkCell, subMenuItemsContainerCell] = [...menuItemRow.children]; // Fixed schema for footer-menu-item
      const li = document.createElement('li');
      const menuAnchor = document.createElement('a');
      const menuFoundLink = linkCell.querySelector('a');
      if (menuFoundLink) menuAnchor.href = menuFoundLink.href;
      menuAnchor.textContent = labelCell.textContent.trim();
      li.append(menuAnchor);

      const subMenuItems = footerSubMenuItems.filter(
        (subItem) => subItem.dataset.aueResource.includes(menuItemRow.dataset.aueResource),
      );

      if (subMenuItems.length > 0) {
        const spanArrow = document.createElement('span');
        spanArrow.setAttribute('data-once', 'footerClickEvent');
        spanArrow.innerHTML = '<svg viewBox="-23.5 -23.5 122.80 122.80" fill="#000000" stroke="#000000" stroke-width="4.851456000000001"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.30321600000000004"></g><g id="SVGRepo_iconCarrier"> <g id="Group_65" data-name="Group 65" transform="translate(-831.568 -384.448)"> <path id="Path_57" data-name="Path 57" d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z" fill="#030408"></path> </g> </g></svg>';
        li.append(spanArrow);

        const hasFooterSubChild = document.createElement('div');
        hasFooterSubChild.classList.add('has-footer-sub-child');
        hasFooterSubChild.setAttribute('data-once', 'hideFooterSubChild');
        const subUl = document.createElement('ul');

        subMenuItems.forEach((subMenuItemRow) => {
          const [subLabelCell, subLinkCell, innerSubMenuItemsContainerCell] = [...subMenuItemRow.children]; // Fixed schema for footer-sub-menu-item
          const subLi = document.createElement('li');
          const subMenuAnchor = document.createElement('a');
          const subMenuFoundLink = subLinkCell.querySelector('a');
          if (subMenuFoundLink) subMenuAnchor.href = subMenuFoundLink.href;
          subMenuAnchor.textContent = subLabelCell.textContent.trim();
          subLi.append(subMenuAnchor);

          const innerSubMenuItems = footerInnerSubMenuItems.filter(
            (innerSubItem) => innerSubItem.dataset.aueResource.includes(subMenuItemRow.dataset.aueResource),
          );

          if (innerSubMenuItems.length > 0) {
            const innerSpanArrow = document.createElement('span');
            innerSpanArrow.setAttribute('data-once', 'footerClickEvent innerFooterClickEvent');
            innerSpanArrow.innerHTML = '<svg viewBox="-23.5 -23.5 122.80 122.80" fill="#000000" stroke="#000000" stroke-width="4.851456000000001"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.30321600000000004"></g><g id="SVGRepo_iconCarrier"> <g id="Group_65" data-name="Group 65" transform="translate(-831.568 -384.448)"> <path id="Path_57" data-name="Path 57" d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z" fill="#030408"></path> </g> </g></svg>';
            subLi.append(innerSpanArrow);

            const hasFooterInnerSubChild = document.createElement('div');
            hasFooterInnerSubChild.classList.add('has-footer-inner-sub-child');
            const innerSubUl = document.createElement('ul');

            innerSubMenuItems.forEach((innerSubMenuItemRow) => {
              const [innerLabelCell, innerLinkCell] = [...innerSubMenuItemRow.children]; // Fixed schema for footer-inner-sub-menu-item
              const innerSubLi = document.createElement('li');
              const innerSubMenuAnchor = document.createElement('a');
              const innerSubMenuFoundLink = innerLinkCell.querySelector('a');
              if (innerSubMenuFoundLink) innerSubMenuAnchor.href = innerSubMenuFoundLink.href;
              innerSubMenuAnchor.textContent = innerLabelCell.textContent.trim();
              innerSubLi.append(innerSubMenuAnchor);
              innerSubUl.append(innerSubLi);
              moveInstrumentation(innerSubMenuItemRow, innerSubLi);
            });
            hasFooterInnerSubChild.append(innerSubUl);
            subLi.append(hasFooterInnerSubChild);

            innerSpanArrow.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation();
              hasFooterInnerSubChild.classList.toggle('active');
            });
          }
          subUl.append(subLi);
          moveInstrumentation(subMenuItemRow, subLi);
        });
        hasFooterSubChild.append(subUl);
        li.append(hasFooterSubChild);

        spanArrow.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          hasFooterSubChild.classList.toggle('active');
        });
      }
      ul.append(li);
      moveInstrumentation(menuItemRow, li);
    });

    headDiv.append(ul);
    linkBlocks.append(headDiv);
    linkBlocksContainer.append(linkBlocks);
    moveInstrumentation(blockRow, linkBlocks);
  });

  footerMenuDiv.append(linkBlocksContainer);
  footerMenuCol.append(footerMenuDiv);
  footerMenuBox.append(footerMenuCol);
  container.append(footerMenuBox);

  const copyrightWrap = document.createElement('div');
  copyrightWrap.classList.add('row', 'align-items-lg-end', 'copyright-wrap');

  const secondaryNavCol = document.createElement('div');
  secondaryNavCol.classList.add('col-12', 'col-lg-6');

  const secondaryNavUl = document.createElement('ul');
  secondaryNavUl.classList.add('secondary-nav');

  secondaryNavItems.forEach((row) => {
    const [labelCell, linkCell] = [...row.children]; // Fixed schema for secondary-nav-item
    const li = document.createElement('li');
    const anchor = document.createElement('a');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) anchor.href = foundLink.href;
    anchor.textContent = labelCell.textContent.trim();
    li.append(anchor);
    secondaryNavUl.append(li);
    moveInstrumentation(row, li);
  });
  secondaryNavCol.append(secondaryNavUl);
  copyrightWrap.append(secondaryNavCol);

  const copyrightTextCol = document.createElement('div');
  copyrightTextCol.classList.add('col-12', 'col-lg-6', 'copyright-text');
  if (copyrightTextRow) {
    copyrightTextCol.textContent = copyrightTextRow.textContent.trim();
    moveInstrumentation(copyrightTextRow, copyrightTextCol);
  }
  copyrightWrap.append(copyrightTextCol);
  container.append(copyrightWrap);

  block.replaceChildren(container);
}
