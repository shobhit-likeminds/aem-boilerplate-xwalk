import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  moveInstrumentation(block, ul); // Move instrumentation from block to ul

  const skipContentLi = document.createElement('li');
  const skipContentLink = document.createElement('a');
  skipContentLink.href = '#skip_content';
  skipContentLink.textContent = 'Skip to Main Content';
  skipContentLi.append(skipContentLink);
  ul.append(skipContentLi);

  const fontControlsLi = document.createElement('li');

  const fontDecreaseLink = document.createElement('a');
  fontDecreaseLink.href = '#';
  fontDecreaseLink.classList.add('decrese');
  fontDecreaseLink.id = 'fontDecrease';
  fontDecreaseLink.textContent = 'A -';
  fontControlsLi.append(fontDecreaseLink);

  const fontResetLink = document.createElement('a');
  fontResetLink.href = '#';
  fontResetLink.classList.add('reset');
  fontResetLink.id = 'fontReset';
  fontResetLink.textContent = 'A';
  fontControlsLi.append(fontResetLink);

  const fontIncreaseLink = document.createElement('a');
  fontIncreaseLink.href = '#';
  fontIncreaseLink.classList.add('increase');
  fontIncreaseLink.id = 'fontIncrease';
  fontIncreaseLink.textContent = 'A +';
  fontControlsLi.append(fontIncreaseLink);

  const defaultThemeLink = document.createElement('a');
  defaultThemeLink.href = '#';
  defaultThemeLink.classList.add('default_theme');
  defaultThemeLink.id = 'default_theme';
  defaultThemeLink.textContent = 'A';
  fontControlsLi.append(defaultThemeLink);

  const darkThemeLink = document.createElement('a');
  darkThemeLink.href = '#';
  darkThemeLink.classList.add('dark_theme');
  darkThemeLink.id = 'dark_theme';
  darkThemeLink.textContent = 'A';
  fontControlsLi.append(darkThemeLink);

  ul.append(fontControlsLi);

  // Add event listeners for font size controls
  fontDecreaseLink.addEventListener('click', (e) => {
    e.preventDefault();
    const currentSize = parseFloat(getComputedStyle(document.body).fontSize);
    document.body.style.fontSize = `${Math.max(12, currentSize - 2)}px`;
  });

  fontResetLink.addEventListener('click', (e) => {
    e.preventDefault();
    document.body.style.fontSize = ''; // Reset to default
  });

  fontIncreaseLink.addEventListener('click', (e) => {
    e.preventDefault();
    const currentSize = parseFloat(getComputedStyle(document.body).fontSize);
    document.body.style.fontSize = `${Math.min(20, currentSize + 2)}px`;
  });

  // Add event listeners for theme controls
  defaultThemeLink.addEventListener('click', (e) => {
    e.preventDefault();
    document.body.classList.remove('dark-theme');
  });

  darkThemeLink.addEventListener('click', (e) => {
    e.preventDefault();
    document.body.classList.add('dark-theme');
  });

  block.textContent = '';
  block.classList.add('top_band'); // Corrected class name to match original HTML
  block.append(ul);
}
