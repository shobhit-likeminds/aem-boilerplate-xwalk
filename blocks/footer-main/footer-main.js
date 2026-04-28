import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl) {
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
      subWrap.classList.add('has-footer-sub-child'); // Use original HTML class
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
      transformNestedLists(nested); // Recursively transform nested lists
    }
  });
}

export default function decorate(block) {
  const children = [...block.children];

  const logoImageCell = children[0].querySelector('div');
  const logoLinkCell = children[1].querySelector('div');
  const copyrightTextCell = children[2].querySelector('div');

  const socialLinkRows = children.filter((row) => row.children.length === 3 && row.querySelector('div:first-child')?.textContent.includes('Social Label'));
  const menuGroupRows = children.filter((row) => row.children.length === 3 && row.querySelector('div:first-child')?.textContent.includes('Menu Group Label'));
  const menuLinkRows = children.filter((row) => row.children.length === 4 && row.querySelector('div:first-child')?.textContent.includes('Menu Link Label'));
  const menuSubLinkRows = children.filter((row) => row.children.length === 2 && row.querySelector('div:first-child')?.textContent.includes('Sub Menu Link Label'));
  const secondaryNavRows = children.filter((row) => row.children.length === 2 && row.querySelector('div:first-child')?.textContent.includes('Secondary Nav Label'));

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container');

  // Footer Header
  const footerHeaderRow = document.createElement('div');
  footerHeaderRow.classList.add('row', 'footer-header');

  const logoCol = document.createElement('div');
  logoCol.classList.add('col-md-6', 'col-12', 'justify-content-between', 'd-flex');

  const logoDiv = document.createElement('div');
  logoDiv.classList.add('logo');

  const logoAnchor = document.createElement('a');
  const foundLogoLink = logoLinkCell.querySelector('a');
  if (foundLogoLink) {
    logoAnchor.href = foundLogoLink.href;
  }
  moveInstrumentation(logoLinkCell, logoAnchor);

  const picture = logoImageCell.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    logoAnchor.append(optimizedPic);
  }
  moveInstrumentation(logoImageCell, logoAnchor);

  logoDiv.append(logoAnchor);
  logoCol.append(logoDiv);
  footerHeaderRow.append(logoCol);

  const socialCol = document.createElement('div');
  socialCol.classList.add('col-md-6', 'col-12', 'footer-social-wrap-center');

  const socialWrapUl = document.createElement('ul');
  socialWrapUl.classList.add('social-wrap');

  socialLinkRows.forEach((row) => {
    const [labelCell, linkCell, hierarchyCell] = [...row.children];
    const li = document.createElement('li');
    const labelText = labelCell?.textContent.trim().toLowerCase();

    if (labelText.includes('fb')) li.classList.add('fb');
    else if (labelText.includes('twitter')) li.classList.add('tw');
    else if (labelText.includes('inst')) li.classList.add('inst');
    else if (labelText.includes('yt')) li.classList.add('yt');
    else if (labelText.includes('in')) li.classList.add('in');

    const anchor = document.createElement('a');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      anchor.href = foundLink.href;
      anchor.target = '_blank'; // Social links usually open in new tab
    }
    moveInstrumentation(row, anchor);

    // Placeholder for SVG icons based on original HTML
    let svgIcon = '';
    if (labelText.includes('fb')) {
      svgIcon = '<svg width="30" height="30" viewBox="0 0 40 41" xmlns:xlink="http://www.w3.org/1999/xlink"><image xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAApCAYAAABHomvIAAAAAXNSR0IArs4c6QAAAZRJREFUWEftltFNwzAQhn2NHxMpj5HsSOkG3YCyQTcoTABMUJgANiArdILCBIxApNh5pQNEMXEFUqmcxNa1UZDsV1/uvvvPdzkgEz8wcT7iAbEVOjuCcRzHYRiuAWChlMoMgO9CiEdb8LMBarAoijZKqfu+4ACQl2V5OypgkiRZEAS7NrhJsT8sowO6wGnS0QHTNM2VUmvrko1ZYq0epfTTFm50BRljNwDw2gO4b5tmf3K/lVL2NtKxPaqLOecvhJC7DsAnl3HSlSQKkDGWA4Dx/QkhUL5/gVFOPKAeSy4deGo7OQWzLIvruv7CJHXRQc0YWwDABwawrZpTdzuVmHO+JITsMIBKqQcppR5PVscJ0GIwDwZtmmZVVdV20PDHwAmQc673uI2t8w67ayHEm60PV8C+P4dVTErpvCiKwsrYdczoEs9ms6sj58uOrfmwVpkgXJbVw3Jhm4nJbnJzcPKD2gMa3pF/g5gm9F2MVc8r6BUcUuA//OqeCSErUyJSyvlQgjb3qEFtEwBr4wG9glgFsN9/A/ubqSotIjiQAAAAAElFTkSuQmCC" x="0" y="0" width="30" height="30"></image></svg>';
    } else if (labelText.includes('twitter')) {
      svgIcon = '<svg width="30" height="30" viewBox="0 0 40 41" xmlns:xlink="http://www.w3.org/1999/xlink"><image xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAApCAYAAABHomvIAAAAAXNSR0IArs4c6QAAA0NJREFUWEftmF9OIkEQxrtAn+CBR5NuyRxBbrDcYPcE6glWT6CeYPUE4gncPQHeQI9AnB7jI4nwJFA7NaEnTdM9XQNsYjbME2H6z4+vur6qBsQXf+CL84k94LYR2iu4cwWVUleIeMZY+C7LslvGuJUhUsoTIcSj/SUA/NFaX/jWWgtxkiSd+Xz+jIgJY/O+1vqJMa4YcnR0lDSbzSEA2Gu/TCaT/ng8HrMAzUIHBwfPQoiONcmA0HekgsiVHs3n8/77+/soBumDA4DR5+dn5fxgkhwfH39HxDIUi8Xix9vb228CUUoRfAEphHjSWverADudTqfVaj3bynHgaM3KLFZKXedCXS03H89msx6pRWocHh4OzTEAgNs0TS9DkM4PomHlWjHlozajlBrmKn0zIZ1Opz06L0op+o7eFU+j0Tj7fX19cDeUUt7naq0kHSL2six7icFFFaQBbtLkYRqkaXpO76SUFwDwy1XYbEyOkH+mKJQPAJynaTrgwLEAlyAnAEBqFUmDiJfGYqSUAwA49Si8BpcfqRut9QpwDDQaYrOAlPIMAO6tBQuL8dgSJRJlvOuRteHYCloho01/GrWMxVDSeGyp/C2ISKbuNeKdKWhBlkkjhChN1qNwMQURH7Is41QmLys7xGZ2lcUopUqFl+Mrq0RMvdohts4jJQ2ZtVGpTBrblkhhrXWPAxIaU1tBC9K2GApl4W11TTwGvzEgLWyH1K7L1LGEFI4Bue+3AnRB7Lrsmjgi9rnVw4bcGNDXABSH2qrLIROvo+JGgATXbrfJbkxHs7Knqctk4rPZzB4X7Xx2EmJfAyCEuDMmTt2KCanHxK+11jdcFWsrWNUAhELq9pZCCHYnXgvQB2c3AJ66XIY01FvGlGQDxuDsSuPU5TKkromX3UXMeizAbrd7ulgs3B4u2J2Ergue3rKyE2eVOo/XsRqAUEiX63l7S1+4KxUMtFHsBiB0XXBMvCyTtQBD18SPj4/iThI73PTeDSkivgCAmVvcc3ipur56Fdz0DuuDjjWz1hyvia8B+qoE9w4bUjXUzK5VDc/11QtIkPZkCik3rCHIJEk4f6WI0Wi08i8Fy2Y45+1fjdkDbqvsXsH/XsG/07ZKSIssn8EAAAAAElFTkSuQmCC" x="0" y="0" width="30" height="30"></image></svg>';
    } else if (labelText.includes('inst')) {
      svgIcon = '<svg width="30" height="30" viewBox="0 0 40 41" xmlns:xlink="http://www.w3.org/1999/xlink"><image xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAApCAYAAABHomvIAAAAAXNSR0IArs4c6QAAA5FJREFUWEftWG1O4zAQ9ZTyC9Bm/yE50YYb0BtsbwAnWDgBcALoCYATUE4AewK4AbkBRbER/8iq5Q+kmc2gJHK+nbogtNpIlarEY788v3kzDrAvfsEXx8f+HYCu67qvr6/bvV7vB2Psu8K8BQDfqnYCEf8wxgLl2XMURQ9RFHlPT08Tnd1rZNCyLGt9ff2AMbbDGNvWmVB3DCISwBMp5WVTTC3Azc1Nd2Vl5QYAXN1FFxlHQOfz+bCO0UqABK7f798xxqxFFl0gJkDEoZTSK8aWANK2rq2t3X00c0UgxOTLy8sgCAJVs+Ustm37mLSxAAvLCBkJIXJrlxjknN9/IHvXAHAZRRFl/mmFhAIhhOoQeQZt2/7JGLtZBhUlLQFMfN/fSu9zzvcA4KJiqweqFnMMcs4PkzfrnJE0BACkH/qRJRUT7LcQguzq/eKcbwMAJWLuQsR9KeU4vZkDaNs27T9pUPciMOf9fn88mUxyxpvY1AkA/EomC8IwHKR20pB1nA6LDI6VCdtAemEY7rZVBAK6urp6g4huwjJZCbFLcipdsf7Hvu/vVzLIOdcF6M1ms2HREureyHVdKwxD0nZrNTIGCACTt7e3nPMnyXWAiO+AAMBDxJEqdl3zMwYYr5/TSItvngghRimzOho3BhiG4ZYidB1bGgohbglkstXPTeI2BegJIQYKI6SrSrErIG6FEEMlhqylVoumAHNeZts2sdHWUOSqg+M4V4iY+WGRTSOAxeBYf9jmRfQ81mFmZx8KMG5cF9niTjFGDFIZm81mW6n/1dVTldXYnPfSrvkzkoTF54wjKeVZCqLJ3BHxXEp5qIytbBDUFzJlkACWGktistfrHVM5o8WS8waBy15EtxE2BphUily9TBkgEPS/qgQ6jnOKiBmbdcm1FIAJyLPpdDpqq8cJc6dxidzTyfhGgDqlqJAAjUdHqtGIeNGxQ29stxZtWKkv9KiRSDSYtlNtJl4itZiExYZVp7bq7JTJmKx2v0tJnSnxqXuN8mUCoCm2+dBEkV11uEyksU2NpZRZN11iUGmJPp3Fqka4EiDddBxnBxGvlslO21xRFO0+Pj5el7qbusAEJJ1bO2diG5jC8wAAjnzfz46audLXNFnF0bHj2o3D6YPR9Xw+HzWdDLW+sFI12NjYINOlwzZ9wLQQsROzikc+0KFqOp3etlWhWg0ukybTubQYNF3EJP4/w0B/2KPYv1E4ISFh4AkYAAAAASUVORK5CYII=" x="0" y="0" width="30" height="30"></image></svg>';
    } else if (labelText.includes('yt')) {
      svgIcon = '<svg width="30" height="30" viewBox="0 0 40 41" xmlns:xlink="http://www.w3.org/1999/xlink"><image xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAApCAYAAABHomvIAAAAAXNSR0IArs4c6QAAAm9JREFUWEftmNFt2zAQhnm0Hm1AfTNMGuAIyQbJBPEGTSZoOkGcCZpOYHeCthMkmaDuBgJMGn6rH/xmQVefIQmSLNmSqNh+EJ8ESMf7dHf8jySwCx9w4XysBbTNUBvBs0RQKaUix5vNxgUAtwjEcRwveud5XvxcFrwwxf1+XzmOc8cYu2GMKUQkkBisrIO87xDRA4AVY4yA//q+P10ul7nwuYBSyi+MsRcbiBq2Y631c9ZuD3AwGIw45z9rOGjC5FZr/ZacaA9QSvkaprUJh1XneNNa3xYCKqVc3/f/VZ21ye/X6/Wn1WpF9bkbqQhKKWlBUATPNhDx2hgzywUcDocjRDxX/e2YEPHBGDPNBRRCPALAt4rhe6d5m6pbRPxqjIkVJJvi8dbZUxXArTZO5/P5gxDinnP+hIi2WvmstSaO3BokctLA0iMCjAyklJV/MukMEb8bYx6LUjwFgM+l6WiVhRFM2lAX6nQ646pz7VZtZr5UioUQjQAmonkDAJMqaT8pYARapT7PAhjqK6nD1bHyOSmg67pur9d7QcTSdX0SQALrdrukBrQaC/eKedH8cEBKJyJO6u4dD8pMHQ2L/jjc4E4a6CjFQl2z1f1ijFFzj9X/2EI49P5gqyM5IN2ycWBrGwTBaLFY/C7qJFcA8MfWiaV9ared6iQXv2GlP5dSUgSPCqpllIrMZ1rr6+TLvTNJzYXSCO/2OHpvjPlxEDCMotWWqSZtSl5yF0ly4rDB34U7kQ9JOR3gOeczEufscfMoYDYKdN2RvOag644gCEq3MQDY3RxEVyFlr0Ha262a9RibtRFsI2gbAVv7i6/B/67JGjl3UeQYAAAAAElFTkSuQmCC" x="0" y="0" width="30" height="30"></image></svg>';
    } else if (labelText.includes('in')) {
      svgIcon = '<svg width="30" height="30" viewBox="0 0 40 41" xmlns:xlink="http://www.w3.org/1999/xlink"><image xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAApCAYAAABHomvIAAAAAXNSR0IArs4c6QAAAg5JREFUWEftWFFOwkAQ3SH94qufJLsf9Qb2BnIS6wnAEygnEE8g3sAbiDeoJ6AJuwl/1qR8UTJ2DJBmuwvU2gpm+wmzMy9vZm7MFtiJHzhxfKwFWDVD58ugEGLAGAsQ0e30OtPVajVaLBZRVUbK3jcyKIS4yxzd550hYrRcLv04juOyQarYGwFyzmcA4OmOEfFWKTWuErDs3QLAXq/nOY4zMzlCxEel1LBskCp2thR/MMZcA4OBUuq5SsCyd20pHgLAg+YslFL6ZQNUtbfKjBDiCgCokxkividJMm66QSj2+epg1dTo913XdbvdLmXlu24BIEqSJDyUFVuTvFoAvkkpd/pIZZBVAGlm4WwkKczZkG3hZHI22TcEbADR5mw+n99s/+OcBwDwZLJ1HOdivV4PEPEYWYoRsa+UCnVftQFExEmWxqBEqcRpmvr6OK0NYAlgedOplLKf/+HUANIqjSiKdktJEwCnjLGXrGk+GWPUxdf72NXnfd0AR/muJ2Cc80sAIJUojNKN/EzyjVgnQOtoFEKQVBnliWSnEYDZ/mhdLDzPc9M0pYXEqItNAfRNurZFlG3sxo2pMQb1btSpsi3FLcAtUy2Dx3TYoWUhPxHaGjSpfMug7U2SfVn4lYW1rcHC+q0N8j+rQc/zCt9lCCy9wPKvMHqp0TFJ0r70kv2xMdp38Q/fJrtrLYP/nsEv9hasOXFhAv8AAAAASUVORK5CYII" x="0" y="0" width="30" height="30"></image></svg>';
    }
    anchor.innerHTML = svgIcon;
    li.append(anchor);
    socialWrapUl.append(li);
  });
  socialCol.append(socialWrapUl);
  footerHeaderRow.append(socialCol);
  containerDiv.append(footerHeaderRow);

  // Footer Menu Box
  const footerMenuBoxRow = document.createElement('div');
  footerMenuBoxRow.classList.add('row', 'footer-menu-box');

  const menuCol = document.createElement('div');
  menuCol.classList.add('col');

  const footerMenuDiv = document.createElement('div');
  footerMenuDiv.classList.add('footer-menu');

  menuGroupRows.forEach((row) => {
    const [menuGroupLabelCell, menuGroupLinkCell, menuLinksContainerCell] = [...row.children];
    const linkBlocksDiv = document.createElement('div');
    linkBlocksDiv.classList.add('link-blocks');

    const headDiv = document.createElement('div');
    headDiv.classList.add('head');

    const span = document.createElement('span');
    const menuGroupLink = document.createElement('a');
    const foundGroupLink = menuGroupLinkCell.querySelector('a');
    if (foundGroupLink) {
      menuGroupLink.href = foundGroupLink.href;
    }
    menuGroupLink.textContent = menuGroupLabelCell.textContent.trim();
    moveInstrumentation(menuGroupLabelCell, menuGroupLink);
    moveInstrumentation(menuGroupLinkCell, menuGroupLink);
    span.append(menuGroupLink);
    headDiv.append(span);

    const footerInnerList = document.createElement('ul');
    footerInnerList.classList.add('footer-inner-list');

    // Filter menuLinkRows that belong to this menu group
    const currentMenuGroupIndex = children.indexOf(row);
    const nextMenuGroupIndex = children.findIndex((r, i) => i > currentMenuGroupIndex && r.children.length === 3 && r.querySelector('div:first-child')?.textContent.includes('Menu Group Label'));
    const relevantMenuLinkRows = menuLinkRows.filter((r) => {
      const rowIndex = children.indexOf(r);
      return rowIndex > currentMenuGroupIndex && (nextMenuGroupIndex === -1 || rowIndex < nextMenuGroupIndex);
    });

    relevantMenuLinkRows.forEach((menuLinkRow) => {
      const [labelCell, linkCell, hierarchyCell] = [...menuLinkRow.children];
      const li = document.createElement('li');
      const foundLink = linkCell.querySelector('a');
      let rootEl;
      if (foundLink) {
        rootEl = document.createElement('a');
        rootEl.href = foundLink.href;
      } else {
        rootEl = document.createElement('span');
      }
      rootEl.textContent = labelCell?.textContent.trim() || '';
      moveInstrumentation(menuLinkRow, rootEl);
      li.appendChild(rootEl);

      const hierarchyRoot = hierarchyCell?.querySelector('ul');
      if (hierarchyRoot) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('has-footer-sub-child');
        wrapper.appendChild(hierarchyRoot);
        rootEl.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          wrapper.classList.toggle('active');
          li.classList.toggle('active');
        });
        li.appendChild(wrapper);
        transformNestedLists(hierarchyRoot);
      }
      footerInnerList.append(li);
    });

    headDiv.append(footerInnerList);
    linkBlocksDiv.append(headDiv);
    footerMenuDiv.append(linkBlocksDiv);
    moveInstrumentation(row, linkBlocksDiv);
  });

  menuCol.append(footerMenuDiv);
  footerMenuBoxRow.append(menuCol);
  containerDiv.append(footerMenuBoxRow);

  // Copyright Wrap
  const copyrightWrapRow = document.createElement('div');
  copyrightWrapRow.classList.add('row', 'align-items-lg-end', 'copyright-wrap');

  const secondaryNavCol = document.createElement('div');
  secondaryNavCol.classList.add('col-12', 'col-lg-6');

  const secondaryNavUl = document.createElement('ul');
  secondaryNavUl.classList.add('secondary-nav');

  secondaryNavRows.forEach((row) => {
    const [labelCell, linkCell] = [...row.children];
    const li = document.createElement('li');
    const anchor = document.createElement('a');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      anchor.href = foundLink.href;
    }
    anchor.textContent = labelCell.textContent.trim();
    moveInstrumentation(row, anchor);
    li.append(anchor);
    secondaryNavUl.append(li);
  });
  secondaryNavCol.append(secondaryNavUl);
  copyrightWrapRow.append(secondaryNavCol);

  const copyrightTextCol = document.createElement('div');
  copyrightTextCol.classList.add('col-12', 'col-lg-6', 'copyright-text');
  copyrightTextCol.textContent = copyrightTextCell.textContent.trim();
  moveInstrumentation(copyrightTextCell, copyrightTextCol);
  copyrightWrapRow.append(copyrightTextCol);
  containerDiv.append(copyrightWrapRow);

  block.replaceChildren(containerDiv);
}
