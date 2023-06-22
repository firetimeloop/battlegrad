export class Sprite {
  private image: HTMLImageElement;

  constructor(
        private src: string,
  ) {
    // Заглушка для SSR
    this.image = typeof window !== 'undefined' ? new Image() : {} as HTMLImageElement;
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
