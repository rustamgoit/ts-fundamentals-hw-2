declare module "simplelightbox" {
  export type SimpleLightboxOptions = {
    captionsData?: "alt" | "title" | "data-title";
    captionDelay?: number;
  };

  export default class SimpleLightbox {
    constructor(selector: string, options?: SimpleLightboxOptions);
    refresh(): void;
  }
}
