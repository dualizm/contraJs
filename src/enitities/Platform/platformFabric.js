import Box from "./box";
import Platform from "./platform";
import Step from "./step";

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

  addBox(x, y) {
    const box = new Box(this.#size);
    box.y = y;
    box.x = x;
    this.#app.stage.addChild(box);
    this.platforms.push(box);
    return this;
  }

  addStep(x, y) {
    const step = new Step(this.#size);
    step.y = y;
    step.x = x;
    this.#app.stage.addChild(step);
    this.platforms.push(step);
    return this;
  }
}
