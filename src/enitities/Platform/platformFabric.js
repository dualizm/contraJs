import Platform from "./platform";

export default class PlatformFabric {
  platforms = [];
  #app;
  #size = {
    w: 0,
    h: 0,
  };

  constructor(app, size) {
    this.#size = size;
    this.#app = app;
  }

  addPlatform(x, y) {
    const platform = new Platform(this.#size);
    platform.y = y;
    platform.x = x;
    this.#app.stage.addChild(platform);
    this.platforms.push(platform);
    return this;
  }
}
