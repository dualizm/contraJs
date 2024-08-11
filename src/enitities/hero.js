import { Graphics, Container } from "pixi.js";
import config from "../config";

const States = {
  stay: "stay",
  jump: "jump",
  flyDown: "flyDown",
};

export default class Hero extends Container {
  #velocity = {
    x: 0,
    y: 0,
  };
  #jumpForce = 10;
  #speed = 3;
  #movement = {
    x: 0,
    y: 0,
  };

  #directionContext = {
    left: 0,
    right: 0,
  };

  #rect = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };

  #state = States.stay;

  constructor() {
    super();
    const view = new Graphics().rect(0, 0, 20, 90).stroke(0xffff00);

    this.addChild(view);
  }

  update() {
    this.#velocity.x = this.#movement.x * this.#speed;
    this.x += this.#velocity.x;

    if (this.#velocity.y > 0 && this.isJump()) {
      this.#state = States.flyDown;
    }

    this.#velocity.y += config.gravityForce;
    this.y += this.#velocity.y;
  }

  stay(platformY) {
    this.#state = States.stay;
    this.#velocity.y = 0;

    this.y = platformY - this.height;
  }

  jump() {
    if (this.#state === States.stay) {
      this.#velocity.y -= this.#jumpForce;
    }

    this.#state = States.jump;
  }

  isJump() {
    return this.#state === States.jump;
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

  getRect() {
    this.#rect.x = this.x;
    this.#rect.y = this.y;
    this.#rect.width = this.width;
    this.#rect.height = this.height;

    return this.#rect;
  }

  throwDown() {
    this.#state = States.jump;
  }
}
