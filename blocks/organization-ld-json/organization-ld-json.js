import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  const [
    nameRow,
    logoRow,
    urlRow,
    streetAddressRow,
    addressLocalityRow,
    addressRegionRow,
    postalCodeRow,
    addressCountryRow,
    areaServedRow,
    ...sameAsLinkRows
  ] = children;

  const organizationName = nameRow.firstElementChild.textContent.trim();
  const logoPicture = logoRow.firstElementChild.querySelector('picture');
  const organizationUrl = urlRow.firstElementChild.querySelector('a')?.href;
  const streetAddress = streetAddressRow.firstElementChild.textContent.trim();
  const addressLocality = addressLocalityRow.firstElementChild.textContent.trim();
  const addressRegion = addressRegionRow.firstElementChild.textContent.trim();
  const postalCode = postalCodeRow.firstElementChild.textContent.trim();
  const addressCountry = addressCountryRow.firstElementChild.textContent.trim();
  const areaServed = areaServedRow.firstElementChild.textContent.trim();

  const sameAsLinks = sameAsLinkRows.map((row) => {
    const [linkCell] = [...row.children]; // FIXED: Use array destructuring for fixed-schema item rows
    return linkCell.querySelector('a')?.href;
  }).filter(Boolean);

  const ldJson = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: organizationName,
  };

  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      // moveInstrumentation from img to the new optimized img within the picture
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      // The logo URL needs to be absolute for schema.org, so we'll use the original img.src
      // as createOptimizedPicture might return a relative path.
      ldJson.logo = new URL(img.src, window.location.origin).href;
    }
  }

  if (organizationUrl) {
    ldJson.url = organizationUrl;
  }

  if (streetAddress || addressLocality || addressRegion || postalCode || addressCountry) {
    ldJson.address = {
      '@type': 'PostalAddress',
    };
    if (streetAddress) ldJson.address.streetAddress = streetAddress;
    if (addressLocality) ldJson.address.addressLocality = addressLocality;
    if (addressRegion) ldJson.address.addressRegion = addressRegion;
    if (postalCode) ldJson.address.postalCode = postalCode;
    if (addressCountry) ldJson.address.addressCountry = addressCountry;
  }

  if (areaServed) {
    ldJson.contactPoint = {
      '@type': 'ContactPoint',
      areaServed,
    };
  }

  if (sameAsLinks.length > 0) {
    ldJson.sameAs = sameAsLinks;
  }

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(ldJson, null, 2);

  // Move instrumentation from the block itself to the script tag
  moveInstrumentation(block, script);

  // Replace the entire block content with the script tag
  block.replaceChildren(script);
}
