import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The yippee-banner block model is empty, meaning it's a structural wrapper
  // that will contain other components or content.
  // Based on the ORIGINAL HTML, the block itself acts as a container
  // for a carousel.

  // Create the main container div, copying classes and data attributes from ORIGINAL HTML
  const root = document.createElement('div');
  root.classList.add('cmp-yippee-banner', 'cmp-yippee-banner--content-second-half-left-aligned');

  // Copy data attributes from the original HTML for the root element
  // These attributes are crucial for the carousel's JS behavior.
  root.dataset.component = 'yippee-banner';
  root.dataset.arrows = 'true';
  root.dataset.meatballs = 'true';
  root.dataset.autoPlayIsEnabled = 'false';
  root.dataset.infiniteScroll = 'false';
  root.dataset.endpoint = '/content/itc-foods-brands/yippee/us/en/jcr:content/root/container/container/banneryippee.model.json';
  root.dataset.template = 'Yippee Generic Template';
  root.dataset.wcmmode = 'true';

  // Create the carousel wrapper div
  const carouselWrapper = document.createElement('div');
  carouselWrapper.classList.add('slickcarousel', 'carousel', 'panelcontainer');

  // Create the cmp-carousel div
  const cmpCarousel = document.createElement('div');
  cmpCarousel.classList.add('cmp-carousel');
  // Copy data attributes for carousel from original HTML
  cmpCarousel.dataset.component = 'carousel';
  cmpCarousel.dataset.showInfiniteScroll = 'false';
  cmpCarousel.dataset.showArrows = 'true';
  cmpCarousel.dataset.showDots = 'true';
  cmpCarousel.dataset.itemCountPerSlide = '1';
  cmpCarousel.dataset.autoPlayIsEnabled = 'false';
  cmpCarousel.dataset.autoPlaySpeedInMs = '500';
  cmpCarousel.dataset.revealNextItemPartially = 'false';
  cmpCarousel.dataset.showCenterZoom = 'false';
  cmpCarousel.dataset.slidesToScroll = '1';
  cmpCarousel.dataset.initialized = 'true';

  // Create the cmp-carousel__container div
  const carouselContainer = document.createElement('div');
  carouselContainer.classList.add('cmp-carousel__container', 'slick-initialized', 'slick-slider', 'slick-dotted');

  // Append the elements in the correct hierarchy
  cmpCarousel.append(carouselContainer);
  carouselWrapper.append(cmpCarousel);
  root.append(carouselWrapper);

  // Since the block model is empty, the block itself is the only authored element.
  // We replace the block's children with the new structure.
  // No need to call moveInstrumentation for children as there are none.
  block.replaceChildren(root);

  // INTERACTIVITY CHECK:
  // The ORIGINAL HTML shows a button with classes 'slick-prev slick-arrow slick-disabled'.
  // This indicates an interactive carousel. The generated JS does not include any
  // event listeners for carousel navigation (e.g., click on slick-prev/slick-next).
  // This block is likely a wrapper for a client-side carousel library (e.g., Slick Carousel).
  // The data attributes like data-arrows="true" and data-meatballs="true" suggest
  // that the carousel's behavior is driven by an external script that reads these attributes.
  // Therefore, no explicit addEventListener is needed within this decorate function
  // for the carousel navigation itself, as it's handled by the external library.
  // If this were a custom carousel, addEventListeners for navigation would be required here.
}
