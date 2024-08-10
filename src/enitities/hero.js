import { Graphics, Container } from "pixi.js";
import config from "../config";

const States = {
  stay: "stay",
  jump: "jump",
};

export default class Hero extends Container {
  #velocity = {
    x: 0,
    y: 0,
  };
  #jumpForce = 2.5;
  #speed = 2;
  #movement = {
    x: 0,
    y: 0,
  };

  #directionContext = {
    left: 0,
    right: 0,
  };

  #state = States.stay;

  constructor() {
    super();
    const view = new Graphics().rect(0, 0, 20, 60).stroke(0xff0000);

    this.addChild(view);
  }

  update() {
    this.#velocity.x = this.#movement.x * this.#speed;
    this.x += this.#velocity.x;

    this.#velocity.y += config.gravityForce;
    this.y += this.#velocity.y;
  }

  stay() {
    this.#state = States.stay;
    this.#velocity.y = 0;
  }

  jump() {
    if (this.#state === States.stay) {
      this.#velocity.y -= this.#jumpForce;
    }

    this.#state = States.jump;
  }

  startLeftMove() {
    this.#directionContext.left = -1;

    if (this.#directionContext.right > 0) {
      this.#movement.x = 0;
      return;
    }

    this.#movement.x = -1;
  }

  startRightMove() {
    this.#directionContext.right = 1;

    if (this.#directionContext.left < 0) {
      this.#movement.x = 0;
      return;
    }

    this.#movement.x = 1;
  }

  stopLeftMove() {
    this.#directionContext.left = 0;
    this.#movement.x = this.#directionContext.right;
  }

  stopRightMove() {
    this.#directionContext.right = 0;
    this.#movement.x = this.#directionContext.left;
  }
}
