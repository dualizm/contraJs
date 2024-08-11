import { Graphics, Container } from "pixi.js";

export default class Box extends Container {
  type = "box";

  constructor(size) {
    super();
    const view = new Graphics().rect(0, 0, size.w, size.h).stroke(0x00ff00);
    view.lineTo(size.w, size.h).stroke(0x00ff00);
    this.addChild(view);
  }
}
