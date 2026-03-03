import iziToast from "izitoast";
import SimpleLightbox from "simplelightbox";
import type { PixabayImage } from "./types/pixabay";
import "izitoast/dist/css/iziToast.min.css";
import "simplelightbox/dist/simple-lightbox.min.css";

type RenderAPI = {
  createGallery: (images: PixabayImage[]) => void;
  clearGallery: () => void;
  showLoader: () => void;
  hideLoader: () => void;
  showLoadMoreButton: () => void;
  hideLoadMoreButton: () => void;
  showToast: (text: string) => void;
};

type RenderElements = {
  gallery: Element;
  loader: Element;
  loadMoreButton: Element;
};

export function initRender(elements: RenderElements): RenderAPI {
  const { gallery, loader, loadMoreButton } = elements;

  // Narrow element types with helpful errors
  if (!(gallery instanceof HTMLElement)) {
    throw new Error("gallery must be an HTMLElement");
  }
  if (!(loader instanceof HTMLElement)) {
    throw new Error("loader must be an HTMLElement");
  }
  if (!(loadMoreButton instanceof HTMLElement)) {
    throw new Error("loadMoreButton must be an HTMLElement");
  }

  // initial UI state
  loader.style.display = "none";
  loadMoreButton.style.display = "none";

  const lightbox = new SimpleLightbox(".gallery a", {
    captionsData: "alt",
    captionDelay: 250,
  });

  const createGallery = (images: PixabayImage[]) => {
    const galleryItems = images
      .map(
        (image) => `
          <li class="gallery-item">
            <a href="${image.largeImageURL}">
              <img
                src="${image.webformatURL}"
                alt="${image.tags}"
                title="${image.tags}"
                loading="lazy"
              />
            </a>
          </li>`
      )
      .join("");

    gallery.insertAdjacentHTML("beforeend", galleryItems);
    lightbox.refresh();
  };

  const clearGallery = () => {
    gallery.innerHTML = "";
  };

  const showLoader = () => {
    loader.style.display = "block";
  };

  const hideLoader = () => {
    loader.style.display = "none";
  };

  const showLoadMoreButton = () => {
    loadMoreButton.style.display = "block";
  };

  const hideLoadMoreButton = () => {
    loadMoreButton.style.display = "none";
  };

  const showToast = (text: string) => {
    iziToast.info({ message: text, position: "topRight" });
  };

  return {
    createGallery,
    clearGallery,
    showLoader,
    hideLoader,
    showLoadMoreButton,
    hideLoadMoreButton,
    showToast,
  };
}
