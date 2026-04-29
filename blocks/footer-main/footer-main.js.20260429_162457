import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl, subChildClass, innerSubChildClass) {
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
      subWrap.classList.add(subChildClass);
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
      transformNestedLists(nested, innerSubChildClass, innerSubChildClass);
    }
  });
}

export default function decorate(block) {
  const children = [...block.children];

  const logoRow = children[0];
  const logoLinkRow = children[1];
  const copyrightTextRow = children.find(
    (row) => !row.querySelector('picture') && !row.querySelector('a') && row.textContent.trim() !== '',
  );

  const itemRows = children.filter(
    (row) => row !== logoRow && row !== logoLinkRow && row !== copyrightTextRow,
  );

  // Distinguish item types based on their content structure
  const socialLinkItems = itemRows.filter(
    (row) => row.children.length === 3 && row.querySelector('div:first-child')?.textContent.trim().length < 100 && row.querySelector('a') && row.querySelector('ul'),
  );
  const footerMenuBlocks = itemRows.filter(
    (row) => row.children.length === 3 && row.querySelector('div:first-child')?.textContent.trim().length > 100 && row.querySelector('a') && !row.querySelector('ul'),
  );
  const secondaryNavLinks = itemRows.filter(
    (row) => row.children.length === 2 && row.querySelector('div:first-child')?.textContent.trim().length < 100 && row.querySelector('a'),
  );

  const rootDiv = document.createElement('div');
  rootDiv.classList.add('container');

  // Footer Header
  const footerHeader = document.createElement('div');
  footerHeader.classList.add('row', 'footer-header');

  const logoCol = document.createElement('div');
  logoCol.classList.add('col-md-6', 'col-12', 'justify-content-between', 'd-flex');

  const logoDiv = document.createElement('div');
  logoDiv.classList.add('logo');

  const logoLink = document.createElement('a');
  const foundLogoLink = logoLinkRow.querySelector('a');
  if (foundLogoLink) {
    logoLink.href = foundLogoLink.href;
  }
  moveInstrumentation(logoLinkRow, logoLink);

  const picture = logoRow.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      logoLink.append(optimizedPic);
      logoLink.querySelector('img').classList.add('hiddenlogo1');
    }
  }
  moveInstrumentation(logoRow, logoLink);
  logoDiv.append(logoLink);
  logoCol.append(logoDiv);
  footerHeader.append(logoCol);

  // Social Links
  const socialCol = document.createElement('div');
  socialCol.classList.add('col-md-6', 'col-12', 'footer-social-wrap-center');
  const socialUl = document.createElement('ul');
  socialUl.classList.add('social-wrap');

  socialLinkItems.forEach((row) => {
    const [socialTypeCell, linkCell, hierarchyCell] = [...row.children];

    const li = document.createElement('li');
    li.classList.add(socialTypeCell?.textContent.trim() || 'social-icon');

    const anchor = document.createElement('a');
    const foundLink = linkCell?.querySelector('a');
    if (foundLink) {
      anchor.href = foundLink.href;
      anchor.setAttribute('target', '_blank');
    }
    moveInstrumentation(row, anchor);

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '30');
    svg.setAttribute('height', '30');
    svg.setAttribute('viewBox', '0 0 40 41');
    // Inline SVG content from ORIGINAL HTML
    const socialType = socialTypeCell?.textContent.trim().toLowerCase();
    let svgPath = '';
    if (socialType === 'fb') {
      svgPath = '<image xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAApCAYAAABHomvIAAAAAXNSR0IArs4c6QAAAZRJREFUWEftltFNwzAQhn2NHxMpj5HsSOkG3YCyQTcoTABMUJgANiArdILCBIxApNh5pQNEMXEFUqmcxNa1UZDsV1/uvvvPdzkgEz8wcT7iAbEVOjuCcRzHYRhuAWChlMoMgO9CiEdb8LMBarAoijZKqfu+4ACQl2V5OypgkiRZEAS7NrhJsT8sowO6wGnS0QHTNM2VUmvrko1ZYq0epfTTFm50BRljNwDw2gO4b5tmf3K/lVL2NtKxPaqLOecvhJC7DsAnl3HSlSQKkDGWA4Dx/QkhUL5/gVFOPKAeSy4deGo7OQWzLIvruv7CJHXRQc0YWwDABwawrZpTdzuVmHO+JITsMIBKqQcppR5PVscJ0GIwDwZtmmZVVdV20PDHwAmQc673uI2t8w67ayHEm60PV8C+P4dVTErpvCiKwsrYdczoEs9ms6sj58uOrfmwVpkgXJbVw3Jhm4nJbnJzcPKD2gMa3pF/g5gm9F2MVc8r6BUcUuA//OqeCSErUyJSyvlQgjb3qEFtEwBr4wG9glgFsN9/A/ubqSotIjiQAAAAAElFTkSuQmCC" x="0" y="0" width="30" height="30"></image>';
    } else if (socialType === 'tw') {
      svgPath = '<image xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAApCAYAAABHomvIAAAAAXNSR0IArs4c6QAAA0NJREFUWEftmF9OIkEQxrtAn+CBR5NuyRxBbrDcYPcE6glWT6CeYPUE4gncPQHeQI9AnB7jI4nwJFA7NaEnTdM9XQNsYjbME2H6z4+vur6qBsQXf+CL84k94LYR2iu4cwWVUleIeMZY+C7LslvGuJUhUsoTIcSj/SUA/NFaX/jWWgtxkiSd+Xz+jIgJY/O+1vqJMa4YcnR0lDSbzSEA2Gu/TCaT/ng8HrMAzUIHBwfPQoiONcmA0HekgsiVHs3n8/77+/soBumDA4DR5+dn5fxgkhwfH39HxDIUi8Xix9vb228CUUoRfAEphHjSWverADudTqfVaj3bynHgaM3KLFZKXedCXS03H89msx6pRWocHh4OzTEAgNs0TS9DkM4PomHlWjFlozajlBrmKn0zIZ1Opz06L0op+o7eFU+j0Th7fX19cDeUUt7naq0kHSL2six7icFFFaQBbtLkYRqkaXpO76SUFwDwy1XYbEyOkH+mKJQPAJynaTrgwLEAlyAnAEBqFUmDiJfGYqSUAwA49Si8BpcfqRut9QpwDDQaYrOAlPIMAO6tBQuL8dgSJRJlvOuRteHYCloho01/GrWMxVDSeGyp/C2ISKbuNeKdKWhBlkkjhChN1kNwMQURH7Is41QmLys7xGZ2lcUopUqFl+Mrq0RMvdohts4jJQ2ZtVGpTBrblkhhrXWPAxIaU1tBC9K2GApl4W11TTwGvzEgLWyH1K7L1LGEFI4Bue+3AnRB7Lrsmjgi9rnVw4bcGNDXABSH2qrLIROvo+JGgATXbrfJbkxHs7Knqctk4rPZzB4X7Xx2EmJfAyCEuDMmTt2KCanHxK+11jdcFWsrWNUAhELq9pZCCHYnXgvQB2c3AJ66XIY01FvGlGQDxuDsSuPU5TKkromX3UXMeizAbrd7ulgs3B4u2J2Ergue3rKyE2eVOo/XsRqAUEiX63l7S1+4KxUMtFHsBiB0XXBMvCyTtQBD18SPj4/iThI73PTeDSkivgCAmVvcc3ipur56Fdz0DuuDjjWz1hyvia8B+qoE9w4bUjXUzK5VDc/11QtIkPZkCik3rCHIJEk4f6WI0Wi08i8Fy2Y45+1fjdkDbqvsXsH/XsG/07ZKSIssn8EAAAAASUVORK5CYII=" x="0" y="0" width="30" height="30"></image>';
    } else if (socialType === 'inst') {
      svgPath = '<image xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAApCAYAAABHomvIAAAAAXNSR0IArs4c6QAAA5FJREFUWEftWG1O4zAQ9ZTyC9Bm/yE50YYb0BtsbwAnWDgBcALoCYATUE4AewK4AbkBRbER/8iq5Q+kmc2gJHK+nbogtNpIlarEY788v3kzDrAvfsEXx8f+HYCu67qvr6/bvV7vB2Psu8K8BQDfqnYCEf8wxgLl2XMURQ9RFHlPT08Tnd1rZNCyLGt9ff2AMbbDGNvWmVB3DCISwBMp5WVTTC3Azc1Nd2Vl5QYAXN1FFxlHQOfz+bCO0UqABK7f798xxqxFFl0gJkDEoZTSK8aWANK2rq2t3X00c0UgxOTLy8sgCAJVs+Ustm37mLSxAAvLCBkJIXJrlxjknN9/IHvXAHAZRRFl/mmFhAIhhOoQeQZt2/7JGLtZBhUlLQFMfN/fSu9zzvcA4KJiqweqFnMMcs4PkzfrjJE0BACkH/qRJRUT7LcQguzq/eKcbwMAJWLuQsR9KeU4vZkDaNs27T9pUPciMOf9fn88mUxyxpvY1AkA/EomC8IwHKR20qH1nA6LDI6VCdtAemEY7rZVBAK6urp6g4huwjJZCbFLcipdsf7Hvu/vVzLIOdcF6M1ms2HREureyHVdKwxD0nZrNTIGCACTt7e3nPMnyXWAiO8AAMBDxJEqdl3zNwYYr5/TSItvngghRimzOho3BhiG4ZYidB1bGgohbglkstXPTeI2BegJIQYKI6SrSrErIG6FEEMSJhlrK5VoumAHNeZts2sdHWUOSqg+M4V4iY+WGRTSOAxeBYf9jmRfQ81mFmZx8KMG5cF9niTjFGDFIZm81mW6n/1dVTldXYnPfSrvkzkoTF54wjKeVZCqLJ3BHxXEp5qIytbBDUFzJlkACWGktistfrHVM5o8WS8waBy15EtxE2BphUily9TBkgEPS/qgQ6jnOKiBmbdcm1FIAJyLPpdDpqq8cJc6dxidzTyfhGgDqlqJAAjUdHqtGIeNGxQ29stxZtWKkv1KiRSDSYtlNtJl4itZiExYZVp7bq7JTJmKx2v0tJnSnxqXuN8mUCoCm2+dBEkV11uEyksU2NpZRZN11iUGmJPp3Fqka4EiDddBxnBxGvlslO21xRFO0+Pj5el7qbusAEJJ1bO2diG5jC8wAAjnzfz46audLXNFnF0bHj2o3D6YPR9Xw+HzWdDLW+sFI12NjYINOlwzZ9wLQQsROzikc+0KFqOp3etlWhWg0ukybTubQYNF3EJP4/QBP2KPYv1E4ISFh4AkYAAAAASUVORK5CYII=" x="0" y="0" width="30" height="30"></image>';
    } else if (socialType === 'yt') {
      svgPath = '<image xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAApCAYAAABHomvIAAAAAXNSR0IArs4c6QAAAm9JREFUWEftmNFt2zAQhnm0Hm1AfTNMGuAIyQbJBPEGTSZoOkGcCZpOYHeCthMkmaDuBgJMGn6rH/xmQVefIQmSLNmSqNh+EJ8ESMf7dHf8jySwCx9w4XysBbTNUBvBs0RQKaUix5vNxgUAtwjEcRwveud5XvxcFrwwxf1+XzmOc8cYu2GMKUQkkBisrIO87xDRA4AVY4yA//q+P10ul7nwuYBSyi+MsRcbiBq2Y631c9ZuD3AwGIw45z9rOGjC5FZr/ZacaA9QSvkaprUJh1XneNNa3xYCKqVc3/f/VZ21ye/X6/Wn1WpF9bkbqQhKKWlBUATPNhDx2hgzywUcDocjRDxX/e2YEPHBGDPNBRRCPALAt4rhe6d5m6pbRPxqjIkVJJvi8dbZUxXArTZO5/P5gxDinnP+hIi2WvmstSaO3BokctLA0iMCjAyklJVz/MukMEb8bYx6LUjwFgM+l6WiVhRFM2lAX6nQ646pz7VZtZr5UioUQjQAmonkDAJMqaT8pYARapT7PAhjqK6nD1bHyOSmg67pur9d7QcTSdX0SQALrdrukBrQaC/eKedH8cEBKJyJO6u4dD8pMHQ2L/jjc4E4a6CjFQl2z1f1ijFFzj9X/2EI49P5gqyM5IN2ycGBrGwTBaLFY/C7qJFcA8MfWiaV9aled6iQXv2GlP5dSUgSPCqpllIrMZ1rr6+TLvTNJzYXSCO/2OHpvjPlxEDCMotWWqSZtSl5yF0ly4rDB34U7kQ9JOR3gOeczEufscfMoYDYKdN2RvOag644gCEq3MQDY3RxEVyFlr0Ha262a9RibtRFsI2gbAVv7i6/B/67JGjl3UeQYAAAAAElFTkSuQmCC" x="0" y="0" width="30" height="30"></image>';
    } else if (socialType === 'in') {
      svgPath = '<image xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAApCAYAAABHomvIAAAAAXNSR0IArs4c6QAAAg5JREFUWEftWFFOwkAQ3SH94qufJLsf9Qb2BnIS6wnAEygnEE8g3sAbiDeoJ6AJuwl/1qR8UTJ2DJBmuwvU2gqm+wmzMy9vZt7MFtiJHzhxfKwFWDVD58ugEGLAGAsQ0e30OtPVajVaLBZRVUbK3jcyKIS4yxzd550hYrRcLv04juOyQarYGwFyzmcA4OmOEfFWKTWuErDs3QLAXq/nOY4zMzlCxEel1LBskCp2thR/MMZcA4OBUuq5SsCyd20pHgLAg+YslFL6ZQNUtbfKjBDiCgCokxkividJMm66QSj2+epg1dTo913XdbvdLmXlu7YBIEqSJDyUFVuTvFoAvkkpd/pIZZBVAGlm4WwkKczZkG3hZHI22TcEbADR5mw+n99s/+OcBwDwZLJ1HOdivV4PEPEYWYoRsa+UCnVftQFExEmWxqBEqcRpmvr6OK0NYAlgedOplLKf/+HUADIqjSiKdktJEwCnjLGXrGk+GWPUxdf72NXnfd0AR/muJ2Cc80sAIJUojNKN/EzyjVgnQOtoFEKQVBnliWSnEYDZ/mhdLDzPc9M0pYXEqItNAfRNurZFlG3sxo2pMQb1btSpsi3FLcAtUy2Dx3TYoWUhPxHaGjSpfMug7U2SfVn4lYW1rcHC+q0N8j+rQc/zCt9lCCy9wPKvMHqp0TFJ0r70kv2xMdp38Q/fJrtrLYP/nsEv9hasOXFhAv8AAAAASUVORK5CYII=" x="0" y="0" width="30" height="30"></image>';
    }
    svg.innerHTML = svgPath;
    anchor.appendChild(svg);
    li.appendChild(anchor);

    const hierarchyRoot = hierarchyCell?.querySelector('ul');
    if (hierarchyRoot) {
      const wrapper = document.createElement('div');
      wrapper.classList.add('has-footer-sub-child');
      moveInstrumentation(hierarchyCell, wrapper); // Move instrumentation from cell to wrapper
      while (hierarchyRoot.firstChild) {
        wrapper.append(hierarchyRoot.firstChild);
      }
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        wrapper.classList.toggle('active');
        li.classList.toggle('active');
      });
      li.appendChild(wrapper);
      transformNestedLists(wrapper.querySelector('ul'), 'has-footer-inner-sub-child', 'has-footer-inner-sub-child');
    }

    socialUl.append(li);
  });
  socialCol.append(socialUl);
  footerHeader.append(socialCol);
  rootDiv.append(footerHeader);

  // Footer Menu Box
  const footerMenuBox = document.createElement('div');
  footerMenuBox.classList.add('row', 'footer-menu-box');
  const menuCol = document.createElement('div');
  menuCol.classList.add('col');
  const footerMenu = document.createElement('div');
  footerMenu.classList.add('footer-menu');

  footerMenuBlocks.forEach((row) => {
    const [blockTitleCell, blockTitleLinkCell, menuLinksCell] = [...row.children];

    const linkBlocks = document.createElement('div');
    linkBlocks.classList.add('link-blocks');
    moveInstrumentation(row, linkBlocks);

    const headDiv = document.createElement('div');
    headDiv.classList.add('head');

    const span = document.createElement('span');
    const titleLink = document.createElement('a');
    const foundTitleLink = blockTitleLinkCell?.querySelector('a');
    if (foundTitleLink) {
      titleLink.href = foundTitleLink.href;
    }
    titleLink.textContent = blockTitleCell?.textContent.trim();
    span.append(titleLink);
    const small = document.createElement('small');
    small.setAttribute('data-once', 'footerMobileInner');
    span.append(small);
    headDiv.append(span);

    const menuLinksUl = document.createElement('ul');
    menuLinksUl.classList.add('footer-inner-list');

    const authoredMenuUl = menuLinksCell?.querySelector('ul');
    if (authoredMenuUl) {
      moveInstrumentation(menuLinksCell, menuLinksUl);
      while (authoredMenuUl.firstChild) {
        menuLinksUl.append(authoredMenuUl.firstChild);
      }
    }

    menuLinksUl.querySelectorAll('li').forEach((li) => {
      const subLinksUl = li.querySelector(':scope > ul');
      if (subLinksUl) {
        subLinksUl.remove();
        const wrapper = document.createElement('div');
        wrapper.classList.add('has-footer-sub-child');
        wrapper.append(subLinksUl);
        li.append(wrapper);

        const trigger = li.querySelector(':scope > a');
        if (trigger) {
          const svgIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          svgIcon.setAttribute('viewBox', '-23.5 -23.5 122.80 122.80');
          svgIcon.setAttribute('fill', '#000000');
          svgIcon.setAttribute('stroke', '#000000');
          svgIcon.setAttribute('stroke-width', '4.851456000000001');
          svgIcon.innerHTML = `<g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.30321600000000004"></g><g id="SVGRepo_iconCarrier"> <g id="Group_65" data-name="Group 65" transform="translate(-831.568 -384.448"> <path id="Path_57" data-name="Path 57" d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z" fill="#030408"></path> </g> </g>`;
          const spanWrapper = document.createElement('span');
          spanWrapper.setAttribute('data-once', 'footerClickEvent');
          spanWrapper.append(svgIcon);
          trigger.after(spanWrapper);

          trigger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            li.classList.toggle('active');
            wrapper.classList.toggle('active');
          });
        }
        transformNestedLists(subLinksUl, 'has-footer-inner-sub-child', 'has-footer-inner-sub-child');
      }
    });

    linkBlocks.append(headDiv, menuLinksUl);
    footerMenu.append(linkBlocks);
  });

  menuCol.append(footerMenu);
  footerMenuBox.append(menuCol);
  rootDiv.append(footerMenuBox);

  // Copyright Wrap
  const copyrightWrap = document.createElement('div');
  copyrightWrap.classList.add('row', 'align-items-lg-end', 'copyright-wrap');

  const secondaryNavCol = document.createElement('div');
  secondaryNavCol.classList.add('col-12', 'col-lg-6');
  const secondaryNavUl = document.createElement('ul');
  secondaryNavUl.classList.add('secondary-nav');

  secondaryNavLinks.forEach((row) => {
    const [labelCell, linkCell] = [...row.children];

    const li = document.createElement('li');
    const anchor = document.createElement('a');
    const foundLink = linkCell?.querySelector('a');
    if (foundLink) {
      anchor.href = foundLink.href;
    }
    anchor.textContent = labelCell?.textContent.trim();
    moveInstrumentation(row, anchor);
    li.append(anchor);
    secondaryNavUl.append(li);
  });
  secondaryNavCol.append(secondaryNavUl);
  copyrightWrap.append(secondaryNavCol);

  const copyrightTextCol = document.createElement('div');
  copyrightTextCol.classList.add('col-12', 'col-lg-6', 'copyright-text');
  if (copyrightTextRow) {
    moveInstrumentation(copyrightTextRow, copyrightTextCol);
    copyrightTextCol.innerHTML = copyrightTextRow.innerHTML;
  }
  copyrightWrap.append(copyrightTextCol);
  rootDiv.append(copyrightWrap);

  block.replaceChildren(rootDiv);
}
