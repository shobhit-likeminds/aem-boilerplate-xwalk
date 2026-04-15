import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const ourStoryCarousel = document.createElement('section');
  ourStoryCarousel.id = 'press-release-carousel';
  ourStoryCarousel.classList.add('our-story-carousel');

  const imagesWrap = document.createElement('section');
  imagesWrap.classList.add('our-story-imagesWrap', 'press-release-imagesWrap');
  const imagesHome = document.createElement('div');
  imagesHome.classList.add('our-story-images_home');
  imagesWrap.append(imagesHome);

  const textWrap = document.createElement('section');
  textWrap.classList.add('our-story-textWrap_home', 'press-release-textWrap_home');
  const textsHome = document.createElement('div');
  textsHome.classList.add('our-story-texts_home');
  textWrap.append(textsHome);

  [...block.children].forEach((row, index) => {
    const cells = [...row.children];

    // Assuming a fixed order for cells based on BlockJson for non-aem-content fields
    const categoryCell = cells[0];
    const headlineCell = cells[1];
    const dateCell = cells[2];
    const imageCell = cells[3];
    const ctaLinkCell = cells[4]; // This cell contains the <a> tag for the link href
    const ctaLinkLabelCell = cells[5]; // This cell contains the plain text label for the CTA

    // Image Slide
    const imageSlide = document.createElement('div');
    imageSlide.id = `press-release-imageSlide-${index}`; // Unique ID for each slide
    imageSlide.classList.add('our-story-imageSlide');
    moveInstrumentation(row, imageSlide);

    const textBody = document.createElement('div');
    textBody.classList.add('our-story-textBody');

    const category = document.createElement('h4');
    category.textContent = categoryCell.textContent.trim();
    textBody.append(category);

    const headline = document.createElement('h2');
    headline.textContent = headlineCell.textContent.trim();
    textBody.append(headline);

    const date = document.createElement('small');
    date.textContent = dateCell.textContent.trim();
    textBody.append(date);

    const description = document.createElement('p');
    description.id = `pressReleaseCarouselDesc-${index}`; // Unique ID for each description
    textBody.append(description);

    const ctaLink = document.createElement('a');
    const foundCtaLink = ctaLinkCell.querySelector('a'); // Get the actual <a> tag from the ctaLinkCell
    if (foundCtaLink) {
      ctaLink.href = foundCtaLink.href; // Use the href from the <a> tag
    }
    ctaLink.textContent = ctaLinkLabelCell.textContent.trim() || 'Read more'; // Use the ctaLinkLabelCell for text

    const ctaImage = document.createElement('img');
    const originalCtaImage = ctaLinkCell.querySelector('img'); // Check for an image inside the ctaLinkCell
    if (originalCtaImage) {
      ctaImage.src = originalCtaImage.src;
      ctaImage.alt = originalCtaImage.alt;
      ctaLink.append(ctaImage);
    }
    textBody.append(ctaLink);

    imageSlide.append(textBody);
    imagesHome.append(imageSlide);

    // Text Slide (thumbnail)
    const textSlide = document.createElement('div');
    textSlide.id = `press-release-textSlide-${index}`; // Unique ID for each slide
    textSlide.classList.add('our-story-textSlide');

    const img = imageCell.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      textSlide.append(optimizedPic);
    }
    textsHome.append(textSlide);

    // Add event listener for interactivity (carousel navigation)
    // This assumes clicking the textSlide (thumbnail) should switch the main imageSlide
    textSlide.addEventListener('click', () => {
      // Remove active class from all image slides and text slides
      imagesHome.querySelectorAll('.our-story-imageSlide').forEach((slide) => slide.classList.remove('active'));
      textsHome.querySelectorAll('.our-story-textSlide').forEach((slide) => slide.classList.remove('active'));

      // Add active class to the corresponding image slide and clicked text slide
      imageSlide.classList.add('active');
      textSlide.classList.add('active');
    });

    // Set the first slide as active by default
    if (index === 0) {
      imageSlide.classList.add('active');
      textSlide.classList.add('active');
    }
  });

  ourStoryCarousel.append(imagesWrap, textWrap);
  block.textContent = '';
  block.append(ourStoryCarousel);
}
