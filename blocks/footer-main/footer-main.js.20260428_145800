import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl, inner = false) {
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
      subWrap.classList.add(inner ? 'has-footer-inner-sub-child' : 'has-footer-sub-child');
      subWrap.append(nested);
      li.append(subWrap);
      const trigger = li.querySelector(':scope > a, :scope > span');
      if (trigger) {
        const arrowSvg = `
          <svg viewBox="-23.5 -23.5 122.80 122.80" fill="#000000" stroke="#000000" stroke-width="4.851456000000001">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.30321600000000004"></g>
            <g id="SVGRepo_iconCarrier">
              <g id="Group_65" data-name="Group 65" transform="translate(-831.568 -384.448)">
                <path id="Path_57" data-name="Path 57" d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z" fill="#030408"></path>
              </g>
            </g>
          </svg>
        `;
        const small = document.createElement('small');
        small.innerHTML = arrowSvg;
        trigger.append(small);

        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          li.classList.toggle('active');
          subWrap.classList.toggle('active');
        });
      }
      transformNestedLists(nested, true);
    }
  });
}

export default function decorate(block) {
  const children = [...block.children];

  const logoRow = children.find((row) => row.querySelector('picture'));
  const logoLinkRow = children.find((row) => row.querySelector('a') && row.children.length === 1);
  const copyrightTextRow = children.find((row) => row.textContent.trim().startsWith('Copyright'));

  const socialLinkRows = children.filter(
    (row) => row.children.length === 3 && row.querySelector('div:first-child')?.textContent.trim() !== 'Column Heading label text',
  );
  const footerColumnRows = children.filter(
    (row) => row.children.length === 3 && row.querySelector('div:first-child')?.textContent.trim() === 'Column Heading label text',
  );
  const footerColumnLinkRows = children.filter(
    (row) => row.children.length === 4,
  );
  const footerSubLinkRows = children.filter(
    (row) => row.children.length === 2 && row.querySelector('div:first-child')?.textContent.trim() === 'Sub Link Label label text',
  );
  const secondaryLinkRows = children.filter(
    (row) => row.children.length === 2 && row.querySelector('div:first-child')?.textContent.trim() === 'Secondary Link Label label text',
  );

  const container = document.createElement('div');
  container.classList.add('container');

  const footerHeader = document.createElement('div');
  footerHeader.classList.add('row', 'footer-header');

  const logoWrapper = document.createElement('div');
  logoWrapper.classList.add('col-md-6', 'col-12', 'justify-content-between', 'd-flex');

  const logoDiv = document.createElement('div');
  logoDiv.classList.add('logo');

  const logoLink = document.createElement('a');
  if (logoLinkRow) {
    const foundLink = logoLinkRow.querySelector('a');
    if (foundLink) {
      logoLink.href = foundLink.href;
      moveInstrumentation(logoLinkRow, logoLink);
    }
  } else {
    logoLink.href = '#';
  }

  if (logoRow) {
    const picture = logoRow.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]);
        moveInstrumentation(logoRow, optimizedPic.querySelector('img'));
        logoLink.append(optimizedPic);
      }
    }
  }
  logoDiv.append(logoLink);
  logoWrapper.append(logoDiv);
  footerHeader.append(logoWrapper);

  const socialWrapper = document.createElement('div');
  socialWrapper.classList.add('col-md-6', 'col-12', 'footer-social-wrap-center');

  const socialList = document.createElement('ul');
  socialList.classList.add('social-wrap');

  socialLinkRows.forEach((row) => {
    const [platformCell, linkCell, hierarchyCell] = [...row.children]; // FIXED: Destructuring for fixed schema
    
    const li = document.createElement('li');
    let platformClass = '';
    if (platformCell) {
      const platformText = platformCell.textContent.trim().toLowerCase();
      if (platformText.includes('facebook')) platformClass = 'fb';
      else if (platformText.includes('twitter')) platformClass = 'tw';
      else if (platformText.includes('instagram')) platformClass = 'inst';
      else if (platformText.includes('youtube')) platformClass = 'yt';
      else if (platformText.includes('linkedin')) platformClass = 'in';
    }
    li.classList.add(platformClass);

    const anchor = document.createElement('a');
    if (linkCell) {
      const foundLink = linkCell.querySelector('a');
      if (foundLink) anchor.href = foundLink.href;
    }
    anchor.target = '_blank';
    moveInstrumentation(row, anchor);

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '30');
    svg.setAttribute('height', '30');
    svg.setAttribute('viewBox', '0 0 40 41');
    const image = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    // Placeholder image data for social icons
    const iconMap = {
      fb: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAApCAYAAABHomvIAAAAAXNSR0IArs4c6QAAAZRJREFUWEftltFNwzAQhn2NHxMpj5HsSOkG3YCyQTcoTABMUJgANiArdILCBIxApNh5pQNEMXEFUqmcxNa1UZDsV1/uvvvPdzkgEz8wcT7iAbEVOjuCcRzHYRiuAWChlMoMgO9CiEdb8LMBarAoijZKqfu+4ACQl2V5OypgkiRZEAS7NrhJsT8sowO6wGnS0QHTNM2VUmvrko1ZYq0epfTTFm50BRljNwDw2gO4b5tmf3K/lVL2NtKxPaqLOecvhJC7DsAnl3HSlSQKkDGWA4Dx/QkhUL5/gVFOPKAeSy4deGo7OQWzLIvruv7CJHXRQc0YWwDABwawrZpTdzuVmHO+JITsMIBKqQcppR5PVscJ0GIwDwZtmmZVVdV20PDHwAmQc673uI2t8w67ayHEm60PV8C+P4dVTErpvCiKwsrYdczoEs9ms6sj58uOrfmwVpkgXJbVw3Jhm4nJbnJzcPKD2gMa3pF/g5gm9F2MVc8r6BUcUuA//OqeCSErUyJSyvlQgjb3qEFtEwBr4wG9glgFsN9/A/ubqSotIjiQAAAAAElFTkSuQmCC',
      tw: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAApCAYAAABHomvIAAAAAXNSR0IArs4c6QAAA0NJREFUWEftmF9OIkEQxrtAn+CBR5NuyRxBbrDcYPcE6glWT6CeYPUE4gncPQHeQI9AnB7jI4nwJFA7NaEnTdM9XQNsYjbME2H6z4+vur6qBsQXf+CL84k94LYR2iu4cwWVUleIeMZY+C7LslvGuJUhUsoTIcSj/SUA/NFaX/jWWgtxkiSd+Xz+jIgJY/O+1vqJMa4YcnR0lDSbzSEA2Gu/TCaT/ng8HrMAzUIHBwfPQoiONcmA0HekgsiVHs3n8/77+/soBumDA4DR5+dn5fxgkhwfH39HxDIUi8Xix9vb228CUUoRfAEphHjSWverADudTqfVaj3bynHgaM3KLFZKXedCXS03H89msx6pRWocHh4OzTEAgNs0TS9DkM4PomHlWjHlozajlBrmKn0zIZ1Opz06L0op+o7eFU+j0Tj7fX19cDeUUt7naq0kHSL2six7icFFFaQBbtLkYRqkaXpO76SUFwDwy1XYbEyOkH+mKJQPAJynaTrgwLEAlyAnAEBqFUmDiJfGYqSUAwA49Si8BpcfqRut9QpwDDQaYrOAlPIMAO6tBQuL8dgSJRJlvOuRteHYCloho01/GrWMxVDSeGyp/C2ISKbuNeKdKWhBlkkjhChN1qNwMQURH7Is41QmLys7xGZ2lcUopUqFl+Mrq0RMvdohts4jJQ2ZtVGpTBrblkhhrXWPAxIaU1tBC9K2GApl4W11TTwGvzEgLWyH1K7L1LGEFI4Bue+3AnRB7Lrsmjgi9rnVw4bcGNDXABSH2qrLIROvo+JGgATXbrfJbkxHs7Knqctk4rPZzB4X7Xx2EmJfAyCEuDMmTt2KCanHxK+11jdcFWsrWNUAhELq9pZCCHYnXgvQB2c3AJ66XIY01FvGlGQDxuDsSuPU5TKkrolX3UXMeizAbrd7ulgs3B4u2J2Ergue3rKyE2eVOo/XsRqAUEiX63l7S1+4KxUMtFHsBiB0XXBMvCyTtQBD18SPj4/iThI73PTeDSkivgCAmVvcc3ipur56Fdz0DuuDjjWz1hyvia8B+qoE9w4bUjXUzK5VDc/11QtIkPZkCik3rCHIJEk4f6WI0Wi08i8Fy2Y45+1fjdkDbqvsXsH/XsG/07ZKSIssn8EAAAAAElFTkSuQmCC',
      inst: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAApCAYAAABHomvIAAAAAXNSR0IArs4c6QAAA5FJREFUWEftWG1O4zAQ9ZTyC9Bm/yE50YYb0BtsbwAnWDgBcALoCYATUE4AewK4AbkBRbER/8iq5Q+kmc2gJHK+nbogtNpIlarEY788v3kzDrAvfsEXx8f+HYCu67qvr6/bvV7vB2Psu8K8BQDfqnYCEf8wxgLl2XMURQ9RFHlPT08Tnd1rZNCyLGt9ff2AMbbDGNvWmVB3DCISwBMp5WVTTC3Azc1Nd2Vl5QYAXN1FFxlHQOfz+bCO0UqABK7f798xxqxFFl0gJkDEoZTSK8aWANK2rq2t3X00c0UgxOTLy8sgCAJVs+Ustm37mLSxAAvLCBkJIXJrlxjknN9/IHvXAHAZRRFl/mmFhAIhhOoQeQZt2/7JGLtZBhUlLQFMfN/fSu9zzvcA4KJiqweqFnMMcs4PkzfrjJE0BACkH/qRJRUT7LcQguzq/eKcbwMAJWLuQsR9KeU4vZkDaNs27T9pUPciMOf9fn88mUxyxpvY1AkA/EomC8IwHKR20pB1nA6LDI6VCdtAemEY7rZVBAK6urp6g4huwjJZCbFLcipdsf7Hvu/vVzLIOdcF6M1ms2HREureyHVdKwxD0nZrNTIGCACTt7e3nPMnyXWAiO8AAMBDxJEqdl3zMwYYr5/TSItvngghRimzOho3BhiG4ZYidB1bGgohbglkstXPTeI2BegJIQYKI6SrSrErIG6FEEMlhqylVoumAHNeZts2sdHWUOSqg+M4V4iY+WGRTSOAxeBYf9jmRfQ81mFmZx8KMG5cF9niTjFGDFIZm81mW6n/1dVTldXYnPfSrvkzkoTF54wjKeVZCqLJ3BHxXEp5qIytbBDUFzJlkACWGktistfrHVM5o8WS8waBy15EtxE2BphUily9TBkgEPS/qgQ6jnOKiBmbdcm1FIAJyLPpdDpqq8cJc6dxidzTyfhGgDqlqJAAjUdHqtGIeNGxQ29stxZtWKkv9KiRSDSYtlNtJl4itZiExYZVp7bq7JTJmKx2v0tJnSnxqXuN8mUCoCm2+dBEkV11uEyksU2NpZRZN11iUGmJPp3Fqka4EiDddBxnBxGvlslO21xRFO0+Pj5el7qbusAEJJ1bO2diG5jC8wAAjnzfz46audLXNFnF0bHj2o3D6YPR9Xw+HzWdDLW+sFI12NjYINOlwzZ9wLQQsROzikc+0KFqOp3etlWhWg0ukybTubQYNF3EJP4/w0B/2KPYv1E4ISFh4AkYAAAAASUVORK5CYII=',
      yt: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAApCAYAAABHomvIAAAAAXNSR0IArs4c6QAAAm9JREFUWEftmNFt2zAQhnm0Hm1AfTNMGuAIyQbJBPEGTSZoOkGcCZpOYHeCthMkmaDuBgJMGn6rH/xmQVefIQmSLNmSqNh+EJ8ESMf7dHf8jySwCx9w4XysBbTNUBvBs0RQKaUix5vNxgUAtwjEcRwveud5XvxcFrwwxf3+XzmOc8cYu2GMKUQkkBisrIO87xDRA4AVY4yA//q+P10ul7nwuYBSyi+MsRcbiBq2Y631c9ZuD3AwGIw45z9rOGjC5FZr/ZacaA9QSvkaprUJh1XneNNa3xYCKqVc3/f/VZ21ye/X6/Wn1WpF9bkbqQhKKWlBUATPNhDx2hgzywUcDocjRDxX/e2YEPHBGDPNBRRCPALAt4rhe6d5m6pbRPxqjIkVJJvi8dbZUxXArTZO5/P5gxDinnP+hIi2WvmstSaO3BokctLA0iMCjAyklJV/MmkMEb8bYx6LUjwFgM+l6WiVhRFM2lAX6nQ646pz7VZtZr5UioUQjQAmonkDAJMqaT8pYARapT7PAhjqK6nD1bHyOSmg67pur9d7QcTSdX0SQALrdrukBrQaC/eKedH8cEBKJyJO6u4dD8pMHQ2L/jjc4E4a6CjFQl2z1f1ijFFzj9X/2EI49P5gqyM5IN2ycWBrGwTBaLFY/C7qJFcA8MfWiaV9aled6iQXv2GlP5dSUgSPCqpllIrMZ1rr6+TLvTNJzYXSCO/2OHpvjPlxEDCMotWWqSZtSl5yF0ly4rDB34U7kQ9JOR3gOeczEufsc/MoYDYKdN2RvOag644gCEq3MQDY3RxEVyFlr0Ha262a9RibtRFsI2gbAVv7i6/B/67JGjl3UeQYAAAAAElFTkSuQmCC',
      in: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAApCAYAAABHomvIAAAAAXNSR0IArs4c6QAAAg5JREFUWEftWFFOwkAQ3SH94qufJLsf9Qb2BnIS6wnAEygnEE8g3sAbiDeoJ6AJuwl/1qR8UTJ2DJBmuwvU2Gqm+wmzMy9vZm7MFtiJHzhxfKwFWDVD58ugEGLAGAsQ0e10OtPVajVaLBZRVUbK3jcyKIS4yxzd550hYrRcLv04juOyQarYGwFyzmcA4OmOEfFWKTWuErDs3QLAXq/nOY4zMzlCxEel1LBskCp2thR/MMZcA4OBUuq5SsCyd20pHgLAg+YslFL6ZQNUtbfKjBDiCgCokxkividJMm66QSj2+epg1dTo913XdbvdLmXlu7YBIEqSJDyUFVuTvFoAvkkpd/pIZZBVAGlm4WwkKczZkG3hZHI22TcEbADR5mw+n99s/+OcBwDwZLJ1HOdivV4PEPEYWYoRsa+UCnVftQFExEmWxqBEqcRpmvr6OK0NYAlgedOplLKf/+HUADIqjSiKdktJEwCnjLGXrGk+GWPUxdf32NXnfd0AR/muJ2Cc80sAIJUojNKN/EzyjVgnQOtoFEKQVBnliWSnEYDZ/mhdLDzPc9M0pYXEqItNAfRNurZFlG3sxo2pMQb1btSpsi3FLcAtUy2Dx3TYoWUhPxHaGjSp3Mug7U2SfVn4lYW1rcHC+q0N8j+rQc/zCt9lCCy9wPKvMHqp0TFJ0r70kv2xMdp38Q/fJrtrLYP/nsEv9hasOXFhAv8AAAAAElFTkSuQmCC',
    };
    image.setAttributeNS('http://www.w3.org/2000/svg', 'xlink:href', iconMap[platformClass] || '');
    image.setAttribute('x', '0');
    image.setAttribute('y', '0');
    image.setAttribute('width', '30');
    image.setAttribute('height', '30');
    svg.append(image);
    anchor.append(svg);
    li.append(anchor);
    socialList.append(li);
  });
  socialWrapper.append(socialList);
  footerHeader.append(socialWrapper);
  container.append(footerHeader);

  const footerMenuBox = document.createElement('div');
  footerMenuBox.classList.add('row', 'footer-menu-box');
  const colDiv = document.createElement('div');
  colDiv.classList.add('col');
  const footerMenu = document.createElement('div');
  footerMenu.classList.add('footer-menu');

  footerColumnRows.forEach((row) => {
    const [headingCell, headingLinkCell, linksCell] = [...row.children]; // FIXED: Destructuring for fixed schema

    const linkBlocks = document.createElement('div');
    linkBlocks.classList.add('link-blocks');
    const head = document.createElement('div');
    head.classList.add('head');
    const span = document.createElement('span');

    let headingEl;
    const headingLink = headingLinkCell?.querySelector('a');
    if (headingLink) {
      headingEl = document.createElement('a');
      headingEl.href = headingLink.href;
      moveInstrumentation(headingLinkCell, headingEl);
    } else {
      headingEl = document.createElement('span');
    }
    headingEl.textContent = headingCell?.textContent.trim() || '';
    moveInstrumentation(headingCell, headingEl);
    span.append(headingEl);

    const small = document.createElement('small');
    span.append(small);
    head.append(span);

    const footerInnerList = document.createElement('ul');
    footerInnerList.classList.add('footer-inner-list');

    footerColumnLinkRows.forEach((linkRow) => {
      const [labelCell, linkCell, hierarchyTreeCell, subLinksCell] = [...linkRow.children]; // FIXED: Destructuring for fixed schema

      const li = document.createElement('li');
      const linkAnchor = document.createElement('a');
      const foundLink = linkCell?.querySelector('a');
      if (foundLink) linkAnchor.href = foundLink.href;
      linkAnchor.textContent = labelCell?.textContent.trim() || '';
      moveInstrumentation(linkRow, linkAnchor);
      li.append(linkAnchor);

      const hierarchyRootTempDiv = document.createElement('div'); // Use a temp div to parse innerHTML
      if (hierarchyTreeCell) {
        hierarchyRootTempDiv.innerHTML = hierarchyTreeCell.innerHTML; // FIXED: Use innerHTML for richtext
      }
      const hierarchyRoot = hierarchyRootTempDiv.querySelector('ul');

      if (hierarchyRoot) {
        const arrowSvg = `
          <svg viewBox="-23.5 -23.5 122.80 122.80" fill="#000000" stroke="#000000" stroke-width="4.851456000000001">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.30321600000000004"></g>
            <g id="SVGRepo_iconCarrier">
              <g id="Group_65" data-name="Group 65" transform="translate(-831.568 -384.448)">
                <path id="Path_57" data-name="Path 57" d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z" fill="#030408"></path>
              </g>
            </g>
          </svg>
        `;
        const smallArrow = document.createElement('span');
        smallArrow.innerHTML = arrowSvg;
        linkAnchor.append(smallArrow);

        const subWrap = document.createElement('div');
        subWrap.classList.add('has-footer-sub-child'); // FIXED: Class name from ORIGINAL HTML
        moveInstrumentation(hierarchyTreeCell, subWrap); // FIXED: Move instrumentation for richtext container
        while (hierarchyRootTempDiv.firstChild) { // Move all children from temp div
          subWrap.append(hierarchyRootTempDiv.firstChild);
        }
        li.append(subWrap);
        linkAnchor.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          li.classList.toggle('active');
          subWrap.classList.toggle('active');
        });
        transformNestedLists(hierarchyRoot);
      }
      footerInnerList.append(li);
    });

    head.append(footerInnerList);
    linkBlocks.append(head);
    footerMenu.append(linkBlocks);
  });

  colDiv.append(footerMenu);
  footerMenuBox.append(colDiv);
  container.append(footerMenuBox);

  const copyrightWrap = document.createElement('div');
  copyrightWrap.classList.add('row', 'align-items-lg-end', 'copyright-wrap');

  const secondaryNavCol = document.createElement('div');
  secondaryNavCol.classList.add('col-12', 'col-lg-6');
  const secondaryNav = document.createElement('ul');
  secondaryNav.classList.add('secondary-nav');

  secondaryLinkRows.forEach((row) => {
    const [labelCell, linkCell] = [...row.children]; // FIXED: Destructuring for fixed schema

    const li = document.createElement('li');
    const anchor = document.createElement('a');
    const foundLink = linkCell?.querySelector('a');
    if (foundLink) anchor.href = foundLink.href;
    anchor.textContent = labelCell?.textContent.trim() || '';
    moveInstrumentation(row, anchor);
    li.append(anchor);
    secondaryNav.append(li);
  });
  secondaryNavCol.append(secondaryNav);
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
