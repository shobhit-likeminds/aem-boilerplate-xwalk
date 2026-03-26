import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [imageRow, headingRow, descriptionRow, dontAllowButtonRow, allowButtonRow] = [...block.children];

  const desktopBannerWrapped = document.createElement('div');
  desktopBannerWrapped.id = 'desktopBannerWrapped';
  desktopBannerWrapped.setAttribute('aria-labelledby', 'optInTitle');
  desktopBannerWrapped.setAttribute('data-rapid_height', '50');
  desktopBannerWrapped.setAttribute('tabindex', '0');
  desktopBannerWrapped.setAttribute('role', 'alert');
  desktopBannerWrapped.setAttribute('aria-live', 'polite');
  desktopBannerWrapped.style.cssText = 'width: 422px; top: 1px; left: calc(50% - 211px); margin: 0px; padding: 0px; box-shadow: rgb(136, 136, 136) 0px 0px 4px; font-size: 11px; font-weight: 400; position: fixed; z-index: 2147483647; background: #FFFFFF;';

  const contentWrapper = document.createElement('div');
  contentWrapper.style.cssText = 'margin: 0;padding: 0 20px 10px;word-spacing: normal!important;letter-spacing: normal!important;font-family: Open Sans,sans-serif!important;';

  const imageContainer = document.createElement('div');
  imageContainer.style.cssText = 'float: left;position: relative;display: inline-block;margin: 15px 15px 0 0!important;padding: 0!important;word-spacing: normal!important;letter-spacing: normal!important;font-family: Open Sans,sans-serif!important;';
  const picture = imageRow.firstElementChild.querySelector('picture'); // Corrected to use firstElementChild
  if (picture) {
    const img = picture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '65' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    imageContainer.append(optimizedPic);
    optimizedPic.querySelector('img').style.cssText = 'word-spacing: normal!important;letter-spacing: normal!important;font-family: Open Sans,sans-serif!important;height: 65px!important;width: 65px!important;';
  }
  moveInstrumentation(imageRow, imageContainer);

  const textContainer = document.createElement('div');
  textContainer.style.cssText = 'word-spacing: normal!important;letter-spacing: normal!important;font-family: Open Sans,sans-serif!important;position: relative!important;padding: 10px 0 0!important;color: #000!important;text-align: left!important;margin: 0!important;line-height: 1.4em!important;display: inline-block!important;width: calc(100% - 80px)!important;';

  const heading = document.createElement('h2');
  heading.id = 'optInTitle';
  heading.style.cssText = 'margin-bottom: 5px; text-align: left; font-size: 14px; font-weight: 700; overflow: hidden; height: 2.8em; line-height: 1.4em; display: block; font-family: Open Sans, sans-serif !important; word-spacing: normal !important; letter-spacing: normal !important; color: #232323 !important;';
  moveInstrumentation(headingRow, heading);
  while (headingRow.firstElementChild.firstChild) heading.append(headingRow.firstElementChild.firstChild); // Corrected to use firstElementChild

  const description = document.createElement('p');
  description.setAttribute('aria-describedby', 'optInTitle');
  description.style.cssText = 'overflow: hidden; height: 2.8em; word-spacing: normal !important; letter-spacing: normal !important; font-family: Open Sans, sans-serif !important; font-size: 12px !important; line-height: 1.4em !important; margin: 10px 0px !important; padding: 0px !important; text-align: left !important; color: #232323 !important;';
  moveInstrumentation(descriptionRow, description);
  while (descriptionRow.firstElementChild.firstChild) description.append(descriptionRow.firstElementChild.firstChild); // Corrected to use firstElementChild

  textContainer.append(heading, description);

  const buttonContainer = document.createElement('div');
  buttonContainer.style.cssText = 'display: flex;justify-content: space-between;word-spacing: normal!important;letter-spacing: normal!important;font-family: Open Sans,sans-serif!important;';

  const buttonWrapper = document.createElement('div');
  buttonWrapper.style.cssText = 'word-spacing: normal!important;letter-spacing: normal!important;font-family: Open Sans,sans-serif!important;margin: 0!important;padding: 0!important;margin-left: auto !important;';

  const dontAllowButton = document.createElement('button');
  dontAllowButton.id = 'moe-dontallow_button';
  dontAllowButton.style.cssText = 'overflow: hidden; word-spacing: normal !important; letter-spacing: normal !important; width: 100px !important; height: 26px !important; font-size: 14px !important; cursor: pointer !important; line-height: 1.1em !important; border-radius: 4px !important; border: 1px solid rgba(0, 0, 0, 0.1) !important; display: inline-block !important; font-weight: 400 !important; margin: 0px 20px 0px 0px !important; padding: 5px !important; text-transform: none !important; box-sizing: border-box !important; text-shadow: none !important; box-shadow: none !important; white-space: nowrap !important; color: #000000; background: #ffffff;';
  moveInstrumentation(dontAllowButtonRow, dontAllowButton);
  while (dontAllowButtonRow.firstElementChild.firstChild) dontAllowButton.append(dontAllowButtonRow.firstElementChild.firstChild); // Corrected to use firstElementChild

  const allowButton = document.createElement('button');
  allowButton.id = 'optInText';
  allowButton.style.cssText = 'overflow: hidden; word-spacing: normal !important; letter-spacing: normal !important; width: 90px !important; height: 26px !important; font-size: 14px !important; cursor: pointer !important; line-height: 1.1em !important; border-radius: 4px !important; border: 1px solid rgba(0, 0, 0, 0.1) !important; display: inline-block !important; font-weight: 400 !important; margin: 0px !important; padding: 5px !important; text-transform: none !important; box-sizing: border-box !important; text-shadow: none !important; box-shadow: none !important; white-space: nowrap !important; color: #FFFFFF; background: #23bd9f;';
  moveInstrumentation(allowButtonRow, allowButton);
  while (allowButtonRow.firstElementChild.firstChild) allowButton.append(allowButtonRow.firstElementChild.firstChild); // Corrected to use firstElementChild

  buttonWrapper.append(dontAllowButton, allowButton);
  buttonContainer.append(buttonWrapper);

  contentWrapper.append(imageContainer, textContainer, buttonContainer);
  desktopBannerWrapped.append(contentWrapper);

  block.textContent = '';
  block.append(desktopBannerWrapped);

  // Add event listeners for the buttons
  dontAllowButton.addEventListener('click', () => {
    desktopBannerWrapped.style.display = 'none';
    // You might want to add further logic here, e.g., setting a cookie
  });

  allowButton.addEventListener('click', () => {
    desktopBannerWrapped.style.display = 'none';
    // You might want to add further logic here, e.g., setting a cookie
  });
}
