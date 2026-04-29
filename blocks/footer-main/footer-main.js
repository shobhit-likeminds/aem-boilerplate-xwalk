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
      subWrap.classList.add(
        level === 0 ? 'has-footer-sub-child' : 'has-footer-inner-sub-child',
      );
      subWrap.append(nested);
      li.append(subWrap);

      const trigger = li.querySelector(':scope > a, :scope > span');
      if (trigger) {
        const arrowSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        arrowSvg.setAttribute('viewBox', '-23.5 -23.5 122.80 122.80');
        arrowSvg.setAttribute('fill', '#000000');
        arrowSvg.setAttribute('stroke', '#000000');
        arrowSvg.setAttribute('stroke-width', '4.851456000000001');
        arrowSvg.innerHTML = `
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.30321600000000004"></g>
          <g id="SVGRepo_iconCarrier">
            <g id="Group_65" data-name="Group 65" transform="translate(-831.568 -384.448)">
              <path id="Path_57" data-name="Path 57" d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z" fill="#030408"></path>
            </g>
          </g>
        `;
        const small = document.createElement('small');
        small.append(arrowSvg);
        trigger.append(small);

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

  // Root fields
  const [logoRow, logoLinkRow, copyrightTextRow, ...itemRows] = children;

  const socialLinkItems = itemRows.filter(
    (row) => row.children.length === 2 && row.querySelector('div:first-child a'),
  );
  const footerMenuBlocks = itemRows.filter(
    (row) => row.children.length === 3 && row.querySelector('div:first-child').textContent.trim() && !row.querySelector('div:nth-child(2) a'),
  );
  const footerMenuLinks = itemRows.filter(
    (row) => row.children.length === 3 && row.querySelector('div:first-child').textContent.trim() && row.querySelector('div:nth-child(2) a'),
  );
  // footerSubLinks and secondaryNavLinks are identical in the original JS and model.
  // Assuming secondaryNavLinks is the correct model field.
  const secondaryNavLinks = itemRows.filter(
    (row) => row.children.length === 2 && row.querySelector('div:first-child').textContent.trim() && row.querySelector('div:nth-child(2) a'),
  );

  const root = document.createElement('div');
  root.classList.add('container');

  // Footer Header
  const footerHeader = document.createElement('div');
  footerHeader.classList.add('row', 'footer-header');
  moveInstrumentation(logoRow, footerHeader);
  moveInstrumentation(logoLinkRow, footerHeader);

  const logoCol = document.createElement('div');
  logoCol.classList.add('col-md-6', 'col-12', 'justify-content-between', 'd-flex');

  const logoDiv = document.createElement('div');
  logoDiv.classList.add('logo');

  const logoLink = document.createElement('a');
  const authoredLogoLink = logoLinkRow.querySelector('a');
  if (authoredLogoLink) {
    logoLink.href = authoredLogoLink.href;
  }

  const picture = logoRow.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    logoLink.append(optimizedPic);
  }
  logoDiv.append(logoLink);
  logoCol.append(logoDiv);
  footerHeader.append(logoCol);

  // Social Links
  const socialWrapCol = document.createElement('div');
  socialWrapCol.classList.add('col-md-6', 'col-12', 'footer-social-wrap-center');
  const socialWrapUl = document.createElement('ul');
  socialWrapUl.classList.add('social-wrap');

  socialLinkItems.forEach((row) => {
    const [linkCell, hierarchyCell] = [...row.children]; // Correct: array destructuring for fixed schema
    const li = document.createElement('li');
    const anchor = document.createElement('a');
    const authoredLink = linkCell.querySelector('a');
    if (authoredLink) {
      anchor.href = authoredLink.href;
      anchor.target = '_blank';
    }

    // Use innerHTML for richtext field 'hierarchy-tree'
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = hierarchyCell.innerHTML;
    const hierarchyRoot = tempDiv.querySelector('ul');

    if (hierarchyRoot) {
      // Apply classes from ORIGINAL HTML to nested elements
      hierarchyRoot.querySelectorAll('a').forEach(a => a.classList.add('list-item-link')); // Example class, adjust as needed
      hierarchyRoot.querySelectorAll('li').forEach(liItem => liItem.classList.add('list-item')); // Example class, adjust as needed
      hierarchyRoot.querySelectorAll('ul').forEach(ulItem => ulItem.classList.add('nested-list')); // Example class, adjust as needed

      moveInstrumentation(hierarchyCell, tempDiv); // Move instrumentation from original cell to tempDiv
      transformNestedLists(hierarchyRoot);
      anchor.append(hierarchyRoot);
    }

    // Determine social icon class based on link href
    if (anchor.href.includes('facebook.com')) {
      li.classList.add('fb');
      anchor.innerHTML = `
        <svg width="30" height="30" viewBox="0 0 40 41" xmlns:xlink="http://www.w3.org/1999/xlink">
          <image xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAApCAYAAABHomvIAAAAAXNSR0IArs4c6QAAAZRJREFUWEftltFNwzAQhn2NHxMpj5HsSOkG3YCyQTcoTABMUJgANiArdILCBIxApNh5pQNEMXEFUqmcxNa1UZDsV1/uvvvPdzkgEz8wcT7iAbEVOjuCcRzHYRiuAWChlMoMgO9CiEdb8LMBarAoijZKqfu+4ACQl2V5OypgkiRZEAS7NrhJsT8sowO6wGnS0QHTNM2VUmvrko1ZYq1epfTTFm50BRljNwDw2gO4b5tmf3K/lVL2NtKxPaqLOecvhJC7DsAnl3HSlSQKkDGWA4Dx/QkhUL5/gVFOPKAeSy4deGo7OQWzLIvruv7CJHXRQc0YWwDABwawrZpTdzuVmHO+JITsMIBKqQcppR5PVscJ0G/wDwZtmmZVVdV20PDHwAmQc673uI2t8w67ayHEm60PV8C+P4dVTErpvCiKwsrYdczoEs9ms6sj58uOrfmwVpkgXJbVw3Jhm4nJbnJzcPKD2gMa3pF/g5gm9F2MVc8r6BUcUuA//OqeCSErUyJSyvlQgjb3qEFtEwBr4wG9glgFsN9/A/ubqSotIjiQAAAAAElFTkSuQmCC" x="0" y="0" width="30" height="30"></image>
        </svg>
      `;
    } else if (anchor.href.includes('twitter.com')) {
      li.classList.add('tw');
      anchor.innerHTML = `
        <svg width="30" height="30" viewBox="0 0 40 41" xmlns:xlink="http://www.w3.org/1999/xlink">
          <image xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAApCAYAAABHomvIAAAAAXNSR0IArs4c6QAAA0NJREFUWEftmF9OIkEQxrtAn+CBR5NuyRxBbrDcYPcE6glWT6CeYPUE4gncPQHeQI9AnB7jI4nwJFA7NaEnTdM9XQNsYjbME2H6z4+vur6qBsQXf+CL84k94LYR2iu4cwWVUleIeMZY+C7LslvGuJUhUsoTIcSj/SUA/NFaX/jWWgtxkiSd+Xz+jIgJY/O+1vqJMa4YcnR0lDSbzSEA2Gu/TCaT/ng8HrMAzUIHBwfPQoiONcmA0HekgsiVHs3n8/77+/soBumDA4DR5+dn5fxgkhwfH39HxDIUi8Xix9vb228CUUoRfAEphHjSWverADudTqfVaj3bynHgaM3KLFZKXedCXS03H89msx6pRWocHh4OzTEAgNs0TS9DkM4PomHlWjHlozajlBrmKn0zIZ1Opz06L0op+o7eFU+j0Th7fX19cDeUUt7naq0kHSL2six7icFFFaQBbtLkYRqkaXpO76SUFwDwy1XYbEyOkH+mKJQPAJynaTrgwLEAlyAnAEBqFUmDiJfGYqSUAwA49Si8BpcfqRut9QpwDDQaYrOAlPIMAO6tBQuL8dgSJRJlvOuRteHYCloho01/GrWMxVDSeGyp/C2ISKbuNeKdKWhBlkkjhChN1uNwMQURH7Is41QmLys7xGZ2lcUopUqFl+Mrq0RMvdohts4jJQ2ZtVGpTBrblkhhrXWPAxIaU1tBC9K2GApl4W11TTwGvzEgLWyH1K7L1LGEFI4Bue+3AnRB7Lrsmjgi9rnVw4bcGNDXABSH2qrLIROvo+JGgATXbrfJbkxHs7Knqctk4rPZzB4X7Xx2EmJfAyCEuDMmTt2KCanHxK+11jdcFWsrWNUAhELq9pZCCHYnXgvQB2c3AJ66XIY01FvGlGQDxuDsSuPU5TKkromX3UXMeizAbrd7ulgs3B4u2J2Ergue3rKyE2eVOo/XsRqAUEiX63l7S1+4KxUMtFHsBiB0XXBMvCyTtQBD18SPj4/iThI73PTeDSkivgCAmVvcc3ipur56Fdz0DuuDjjWz1hyvia8B+qoE9w4bUjXUzK5VDc/11QtIkPZkCik3rCHIJEk4f6WI0Wi08i8Fy2Y45+1fjdkDbqvsXsH/XsG/07ZKSIssn8EAAAAASUVORK5CYII=" x="0" y="0" width="30" height="30"></image>
        </svg>
      `;
    } else if (anchor.href.includes('instagram.com')) {
      li.classList.add('inst');
      anchor.innerHTML = `
        <svg width="30" height="30" viewBox="0 0 40 41" xmlns:xlink="http://www.w3.org/1999/xlink">
          <image xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAApCAYAAABHomvIAAAAAXNSR0IArs4c6QAAA5FJREFUWEftWG1O4zAQ9ZTyC9Bm/yE50YYb0BtsbwAnWDgBcALoCYATUE4AewK4AbkBRbER/8iq5Q+kmc2gJHK+nbogtNpIlarEY788v3kzDrAvfsEXx8f+HYCu67qvr6/bvV7vB2Psu8K8BQDfqnYCEf8wxgLl2XMURQ9RFHlPT08Tnd1rZNCyLGt9ff2AMbbDGNvWmVB3DCISwBMp5WVTTC3Azc1Nd2Vl5QYAXN1FFxlHQOfz+bCO0UqABK7f798xxqxFFl0gJkDEoZTSK8aWANK2rq2t3X00c0UgxOTLy8sgCAJVs+Ustm37mLSxAAvLCBkJIXJrlxjknN9/IHvXAHAZRRFl/mmFhAIhhOoQeQZt2/7JGLtZBhUlLQFMfN/fSu9zzvcA4KJiqweqFnMMcs4PkzPnrJE0BACkH/qRJRUT7LcQguzq/eKcbwMAJWLuQsR9KeU4vZkDaNs27T9pUPciMOf9fn88mUxyxpvY1AkA/EpmC8IwHKR20qP1nA6LDI6VCdtAemEY7rZVBAK6urp6g4huwjJZCbFLcipdsf7Hvu/vVzLIOdcF6M1ms2HREureyHVdKwxD0nZrNTIGCACTt7e3nPMnyXWAiO8AAMBDxJEqdl3zNwYYr5/TSItvngghRimzOho3BhiG4ZYidB1bGgohbglkstXPTeI2BegJIQYKI6SrSrErIG6FEEMlhqylVoumAHNeZts2sdHWUOSqg+M4V4iY+WGRTSOAxeBYf9jmRfQ81mFmZx8KMG5cF9niTjFGDFIZm81mW6n/1dVTldXYnPfSrvkzkoTF54wjKeVZCqLJ3BHxXEp5qIytbBDUFzJlkACWGktistfrHVM5o8WS8waBy15EtxE2BphUily9TBkgEPS/qgQ6jnOKiBmbdcm1FIAJyLPpdDpqq8cJc6dxidzTyfhGgDqlqJAAjUdHqtGIeNGxQ29stxZtWKkv9KiRSDSYtlNtJl4itZiExYZVp7bq7JTJmKx2v0tJnSnxqXuN8mUCoCm2+dBEkV11uEyksU2NpZRZN11iUGmJPp3Fqka4EiDddBxnBxGvlslO21xRFO0+Pj5el7qbusAEJJ1bO2diG5jC8wAAjnzfz46audLXNFnF0bHj2o3D6YPR9Xw+HzWdDLW+sFI12NjYINOlwzZ9wLQQsROzinc+0KFqOp3etlWhWg0ukybTubQYNF3EJP4/QBP2KPYv1E4ISFh4AkYAAAAASUVORK5CYII=" x="0" y="0" width="30" height="30"></image>
        </svg>
      `;
    } else if (anchor.href.includes('youtube.com')) {
      li.classList.add('yt');
      anchor.innerHTML = `
        <svg width="30" height="30" viewBox="0 0 40 41" xmlns:xlink="http://www.w3.org/1999/xlink">
          <image xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAApCAYAAABHomvIAAAAAXNSR0IArs4c6QAAAm9JREFUWEftmNFt2zAQhnm0Hm1AfTNMGuAIyQbJBPEGTSZoOkGcCZpOYHeCthMkmaDuBgJMGn6rH/xmQVefIQmSLNmSqNh+EJ8ESMf7dHf8jySwCx9w4XysBbTNUBvBs0RQKaUix5vNxgUAtwjEcRwveud5XvxcFrwwxf1+XzmOc8cYu2GMKUQkkBisrIO87xDRA4AVY4yA//q+P10ul7nwuYBSyi+MsRcbiBq2Y631c9ZuD3AwGIw45z9rOGjC5FZr/ZacaA9QSvkaprUJh1XneNNa3xYCKqVc3/f/VZ21ye/X6/Wn1WpF9bkbqQhKKWlBUATPNhDx2hgzywUcDocjRDxX/u2YEPHBGDPNBRRCPALAt4rhe6d5m6pbRPxqjIkVJJvi8dbZUxXArTZO5/P5gxDinnP+hIi2WvmstSaO3BokctLA0iMCjAyklJVzMukMEb8bYx6LUjwFgM+l6WiVhRFM2lAX6nQ646pz7VZtZr5UioUQjQAmonkDAJMqaT8pYARapT7PAhjqK6nD1bHyOSmg67pur9d7QcTSdX0SQALrdrukBrQaC/eKedH8cEBKJyJO6u4dD8pMHQ2L/jjc4E4a6CjFQl2z1f1ijFFzj9X/2EI49P5gqyM5IN2ycWBrGwTBaLFY/C7qJFcA8MfWiaV9aled6iQXv2GlP5dSUgSPCqpllIrMZ1rr6+TLvTNJzYXSCO/2OHpvjPlxEDCMotWWqSZtSl5yF0ly4rDB34U7kQ9JOR3gOeczEufscfMoYDYKdN2RvOag644gCEq3MQDY3RxEVyFlr0Ha262a9RibtRFsI2gbAVv7i6/B/67JGjl3UeQYAAAAASUVORK5CYII=" x="0" y="0" width="30" height="30"></image>
        </svg>
      `;
    } else if (anchor.href.includes('linkedin.com')) {
      li.classList.add('in');
      anchor.innerHTML = `
        <svg width="30" height="30" viewBox="0 0 40 41" xmlns:xlink="http://www.w3.org/1999/xlink">
          <image xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAApCAYAAABHomvIAAAAAXNSR0IArs4c6QAAAg5JREFUWEftWFFOwkAQ3SH94qufJLsf9Qb2BnIS6wnAEygnEE8g3sAbiDeoJ6AJuwl/1qR8UTJ2DJBmuwvU2gqm+wmzMy9vZt7MFtiJHzhxfKwFWDVD58ugEGLAGAsQ0e30OtPVajVaLBZRVUbK3jcyKIS4yxzd550hYrRcLv04juOyQarYGwFyzmcA4OmOEfFWKTWuErDs3QLAXq/nOY4zMzlCxEel1LBskCp2thR/MMZcA4OBUuq5SsCyd20pHgLAg+YslFL6ZQNUtbfKjBDiCgCokxkividJMm66QSj2+epg1dTo913XdbvdLmXlu7YBIEqSJDyUFVuTvFoAvkkpd/pIZZBVAGlm4WwkKczZkG3hZHI22TcEbADR5mw+n99s/+OcBwDwZLJ1HOdivV4PEPEYWYoRsa+UCnVftQFExEmWxqBEqcRpmvr6OK0NYAlgedOplLKf/+HUADIqjSiKdktJEwCnjLGXrGk+GWPUxdf72NXnfd0AR/muJ2Cc80sAIJUojNKN/EzyjVgnQOtoFEKQVBnliWSnEYDZ/mhdLDzPc9M0pYXEqItNAfRNurZFlG3sxo2pMQb1btSpsi3FLcAtUy2Dx3TYoWUhPxHaGjSpfMug7U2SfVn4lYW1rcHC+q0N8j+rQc/zCt9lCCy9wPKvMHqp0TFJ0k70kv2xMdp38Q/fJrtrLYP/nsEv9hasOXFhAv8AAAAASUVORK5CYII=" x="0" y="0" width="30" height="30"></image>
        </svg>
      `;
    }
    moveInstrumentation(row, li);
    li.append(anchor);
    socialWrapUl.append(li);
  });
  socialWrapCol.append(socialWrapUl);
  footerHeader.append(socialWrapCol);
  root.append(footerHeader);

  // Footer Menu Box
  const footerMenuBox = document.createElement('div');
  footerMenuBox.classList.add('row', 'footer-menu-box');
  const footerMenuCol = document.createElement('div');
  footerMenuCol.classList.add('col');
  const footerMenu = document.createElement('div');
  footerMenu.classList.add('footer-menu');

  footerMenuBlocks.forEach((blockRow) => {
    const [blockTitleCell, blockTitleLinkCell, menuLinksContainerCell] = [...blockRow.children]; // Correct: array destructuring for fixed schema
    const linkBlocks = document.createElement('div');
    linkBlocks.classList.add('link-blocks');
    const head = document.createElement('div');
    head.classList.add('head');
    const span = document.createElement('span');

    const blockTitleLink = blockTitleLinkCell.querySelector('a');
    let titleElement;
    if (blockTitleLink) {
      titleElement = document.createElement('a');
      titleElement.href = blockTitleLink.href;
      titleElement.textContent = blockTitleCell.textContent.trim();
    } else {
      titleElement = document.createElement('span');
      titleElement.textContent = blockTitleCell.textContent.trim();
    }
    moveInstrumentation(blockTitleCell, titleElement);
    moveInstrumentation(blockTitleLinkCell, titleElement);
    span.append(titleElement);

    const small = document.createElement('small');
    span.append(small);
    head.append(span);

    const ul = document.createElement('ul');
    ul.classList.add('footer-inner-list');

    const relevantMenuLinks = footerMenuLinks.filter((linkRow) => {
      const linkBlockTitle = linkRow.children[0].textContent.trim(); // Correct: direct access for content detection
      return linkBlockTitle === blockTitleCell.textContent.trim();
    });

    relevantMenuLinks.forEach((menuLinkRow) => {
      const [labelCell, linkCell, hierarchyCell] = [...menuLinkRow.children]; // Correct: array destructuring for fixed schema
      const li = document.createElement('li');
      const foundLink = linkCell.querySelector('a');
      let rootEl;

      if (foundLink) {
        rootEl = document.createElement('a');
        rootEl.href = foundLink.href;
      } else {
        rootEl = document.createElement('span');
      }
      rootEl.textContent = labelCell.textContent.trim();
      moveInstrumentation(labelCell, rootEl);
      moveInstrumentation(linkCell, rootEl);
      li.appendChild(rootEl);

      // Use innerHTML for richtext field 'hierarchy-tree'
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = hierarchyCell.innerHTML;
      const hierarchyRoot = tempDiv.querySelector('ul');

      if (hierarchyRoot) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('has-footer-sub-child');
        wrapper.appendChild(hierarchyRoot);

        const arrowSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        arrowSvg.setAttribute('viewBox', '-23.5 -23.5 122.80 122.80');
        arrowSvg.setAttribute('fill', '#000000');
        arrowSvg.setAttribute('stroke', '#000000');
        arrowSvg.setAttribute('stroke-width', '4.851456000000001');
        arrowSvg.innerHTML = `
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.30321600000000004"></g>
          <g id="Group_65" data-name="Group 65" transform="translate(-831.568 -384.448)">
            <path id="Path_57" data-name="Path 57" d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z" fill="#030408"></path>
          </g>
        </g>`;
        const spanArrow = document.createElement('span');
        spanArrow.append(arrowSvg);
        rootEl.append(spanArrow);

        rootEl.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          wrapper.classList.toggle('active');
          li.classList.toggle('active');
        });
        li.appendChild(wrapper);
        moveInstrumentation(hierarchyCell, tempDiv); // Move instrumentation from original cell to tempDiv
        transformNestedLists(hierarchyRoot);
      }
      ul.append(li);
    });

    head.append(ul);
    linkBlocks.append(head);
    footerMenu.append(linkBlocks);
    moveInstrumentation(blockRow, linkBlocks);
  });

  footerMenuCol.append(footerMenu);
  footerMenuBox.append(footerMenuCol);
  root.append(footerMenuBox);

  // Copyright Wrap
  const copyrightWrap = document.createElement('div');
  copyrightWrap.classList.add('row', 'align-items-lg-end', 'copyright-wrap');
  moveInstrumentation(copyrightTextRow, copyrightWrap);

  const secondaryNavCol = document.createElement('div');
  secondaryNavCol.classList.add('col-12', 'col-lg-6');
  const secondaryNavUl = document.createElement('ul');
  secondaryNavUl.classList.add('secondary-nav');

  secondaryNavLinks.forEach((row) => {
    const [labelCell, linkCell] = [...row.children]; // Correct: array destructuring for fixed schema
    const li = document.createElement('li');
    const anchor = document.createElement('a');
    const authoredLink = linkCell.querySelector('a');
    if (authoredLink) {
      anchor.href = authoredLink.href;
    }
    anchor.textContent = labelCell.textContent.trim();
    moveInstrumentation(row, li);
    li.append(anchor);
    secondaryNavUl.append(li);
  });
  secondaryNavCol.append(secondaryNavUl);
  copyrightWrap.append(secondaryNavCol);

  const copyrightTextCol = document.createElement('div');
  copyrightTextCol.classList.add('col-12', 'col-lg-6', 'copyright-text');
  copyrightTextCol.innerHTML = copyrightTextRow.innerHTML;
  copyrightWrap.append(copyrightTextCol);
  root.append(copyrightWrap);

  block.replaceChildren(root);
}
