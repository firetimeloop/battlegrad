export class Sprite {
  private image: HTMLImageElement;

  constructor(
        private src: string,
  ) {
    this.image = new Image();
  }

  async load() {
    return new Promise((resolve) => {
      this.image.src = this.src;
      this.image.addEventListener('load', () => resolve(this));
    });
  }

  getImage() {
    return this.image;
  }
}
