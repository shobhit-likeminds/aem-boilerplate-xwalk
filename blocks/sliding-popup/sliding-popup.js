import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [messageRow, policyLinkRow, policyLinkLabelRow, closeButtonLabelRow] = [...block.children];

  const containerFluid = document.createElement('div');
  containerFluid.classList.add('container-fluid');

  const row = document.createElement('div');
  row.classList.add('row', 'align-items-center');

  const colMd10 = document.createElement('div');
  colMd10.classList.add('col-md-10');

  const slidingPara = document.createElement('p');
  slidingPara.classList.add('sliding-para');
  moveInstrumentation(messageRow, slidingPara);
  while (messageRow.firstChild) slidingPara.append(messageRow.firstChild);

  const policyLinkAnchor = document.createElement('a');
  const originalPolicyLink = policyLinkRow.querySelector('a');
  if (originalPolicyLink) {
    policyLinkAnchor.href = originalPolicyLink.href;
    policyLinkAnchor.style.color = '#fff'; // Copy inline style from original HTML
    moveInstrumentation(policyLinkRow, policyLinkAnchor);
  }
  // Read label text from policyLinkLabelRow
  const policyLinkLabel = policyLinkLabelRow.textContent.trim(); // Corrected: use textContent.trim() directly
  policyLinkAnchor.textContent = policyLinkLabel || originalPolicyLink?.href || '';

  // Append the policy link to the sliding paragraph
  slidingPara.append(policyLinkAnchor);
  colMd10.append(slidingPara);

  const colMd2 = document.createElement('div');
  colMd2.classList.add('col-md-2');

  const closeBtnPop = document.createElement('div');
  closeBtnPop.classList.add('close-btn-pop');

  const closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.classList.add('btn', 'btn-primary');
  moveInstrumentation(closeButtonLabelRow, closeButton);
  closeButton.textContent = closeButtonLabelRow.textContent.trim(); // Corrected: use textContent.trim() directly

  closeButton.addEventListener('click', () => {
    block.classList.remove('active');
  });

  closeBtnPop.append(closeButton);
  colMd2.append(closeBtnPop);

  row.append(colMd10, colMd2);
  containerFluid.append(row);

  block.textContent = '';
  block.classList.add('sections', 'sliding-popup', 'active'); // Add initial classes
  block.append(containerFluid);

  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
