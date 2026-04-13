import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    imageRow,
    imageAltRow,
    creditRow,
    headlineLinkRow,
    headlineLinkLabelRow,
    summaryRow,
  ] = [...block.children];

  const header = document.createElement('header');
  header.classList.add('theme-dark', 'theme-bg', 'theme-section-spacing', 'first:pt-0!');
  header.setAttribute('aria-labelledby', 'hero-headline');

  const figure = document.createElement('figure');

  const imageWrapper = document.createElement('div');
  imageWrapper.classList.add(
    'w-full',
    'h-[clamp(300px,65svh,500px)]',
    'md:h-[clamp(420px,68svh,660px)]',
    'lg:h-[clamp(420px,70svh,768px)]',
    'xl:h-[clamp(420px,70svh,1020px)]',
  );
  const picture = imageRow.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    if (img) {
      // Apply alt text from imageAltRow
      const altText = imageAltRow.querySelector('div')?.textContent.trim() || '';
      img.alt = altText;
      img.classList.add('z-1', 'w-full', 'h-full', 'object-cover');
      img.setAttribute('fetchpriority', 'high');
      img.setAttribute('loading', 'eager');

      const optimizedPic = createOptimizedPicture(img.src, img.alt, true, [
        { media: '(min-width:1921px)', width: '2560' },
        { media: '(min-width:1440px)', width: '1920' },
        { media: '(min-width:1024px)', width: '1440' },
        { media: '(min-width:768px)', width: '768' },
        { width: '375' },
      ]);
      moveInstrumentation(picture, optimizedPic);
      imageWrapper.append(optimizedPic);
    }
  }
  figure.append(imageWrapper);

  const creditContainer = document.createElement('div');
  creditContainer.classList.add('container', 'z-3');
  const creditGrid = document.createElement('div');
  creditGrid.classList.add('grid', 'grid-cols-4', 'sm:grid-cols-2', 'sm:gap-grid-gutter');
  const creditWrapper = document.createElement('div');
  creditWrapper.classList.add(
    'mt-2xs',
    'flex',
    'flex-col',
    'justify-start',
    'max-lg:mb-lg',
    'lg:pb-5',
    'lg:items-end',
    'col-span-3',
    'sm:col-span-1',
    'lg:col-start-2',
  );

  const creditP = document.createElement('p');
  creditP.classList.add(
    'z-1',
    'relative',
    'text-caption-size',
    'theme-dark:text-foreground-colored-muted',
    'text-foreground-muted',
  );
  creditP.setAttribute('data-testid', 'hero-credit');
  moveInstrumentation(creditRow, creditP);
  creditP.textContent = creditRow.querySelector('div')?.textContent.trim() || '';
  creditWrapper.append(creditP);
  creditGrid.append(creditWrapper);
  creditContainer.append(creditGrid);
  figure.append(creditContainer);

  header.append(figure);

  const contentContainer = document.createElement('div');
  contentContainer.classList.add('container');
  const contentGrid = document.createElement('div');
  contentGrid.classList.add('grid-cols-4', 'md:grid-cols-14', 'grid-full');
  const contentWrapper = document.createElement('div');
  contentWrapper.classList.add(
    'col-span-4',
    'md:col-span-12',
    'xl:col-span-11',
    'space-y-xs',
  );

  const headlineLink = document.createElement('a');
  headlineLink.id = 'hero-headline';
  headlineLink.setAttribute('data-testid', 'hero-headline');
  headlineLink.classList.add(
    'text-h4',
    'link-arrow',
    'col-span-4',
    'md:col-span-12',
    'xl:col-span-11',
    'text-foreground',
    'theme-dark:text-foreground-td',
    'hover:underline',
    'hocus:underline-offset-4',
    'hocus:decoration-[3px]',
    'hover:cursor-pointer',
    'theme-focus-outline',
    'transition-underline',
  );
  const foundHeadlineLink = headlineLinkRow.querySelector('a');
  if (foundHeadlineLink) {
    headlineLink.href = foundHeadlineLink.href;
  }
  const headlineLabelText = headlineLinkLabelRow.querySelector('div')?.textContent.trim() || '';
  headlineLink.textContent = headlineLabelText;
  moveInstrumentation(headlineLinkRow, headlineLink);
  contentWrapper.append(headlineLink);

  const summaryDiv = document.createElement('div');
  summaryDiv.classList.add(
    'text-p1',
    'md:col-span-12',
    'xl:col-span-11',
    'text-pretty',
    'prose',
    'theme-dark:prose-td',
    'theme-medium:prose-tm',
  );
  summaryDiv.setAttribute('data-testid', 'hero-link-summary');
  moveInstrumentation(summaryRow, summaryDiv);
  while (summaryRow.firstElementChild) summaryDiv.append(summaryRow.firstElementChild);
  contentWrapper.append(summaryDiv);

  contentGrid.append(contentWrapper);
  contentContainer.append(contentGrid);
  header.append(contentContainer);

  block.textContent = '';
  block.append(header);
}
