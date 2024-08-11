import Hero from "@/enitities/hero";
import PlatformFabric from "./enitities/Platform/platformFabric";
import Keyboard from "@/keyboard";

export default class Game {
  #app;
  #hero;
  #platforms;

  keyboard;

  constructor(app) {
    this.#app = app;
    this.#hero = new Hero();
    this.#hero.x = 200;
    this.#hero.y = 100;
    this.#app.stage.addChild(this.#hero);

    this.#platforms = new PlatformFabric(this.#app, { w: 200, h: 20 });

    this.#platforms
      .addPlatform(100, 200)
      .addPlatform(300, 200)
      .addPlatform(500, 200)
      .addPlatform(700, 200)
      .addPlatform(900, 200)
      .addPlatform(300, 350)
      .addBox(0, 538)
      .addBox(200, 538)
      .addStep(400, 508);

    this.keyboard = new Keyboard(this);
    this.setKeys();
  }

  update() {
    const prevPoint = {
      x: this.#hero.x,
      y: this.#hero.y,
    };

    this.#hero.update();

    this.#platforms.platforms.forEach((platform) => {
      if (this.#hero.isJump() && platform.type !== "box") {
        return;
      }

      const collision = this.getPlatformCollisionResult(
        this.#hero,
        platform,
        prevPoint
      );

      if (collision.vertical) {
        this.#hero.stay(platform.y);
      }
    });
  }

  getPlatformCollisionResult(character, platform, prevPoint) {
    const collisionResult = this.getOrientationCollisionResult(
      character.getRect(),
      platform,
      prevPoint
    );

    if (collisionResult.vertical) {
      character.y = prevPoint.y;
    }

    if (collisionResult.horizontal && platform.type === "box") {
      character.x = prevPoint.x;
    }

    if (collisionResult.horizontal && platform.type === "step") {
      character.stay(platform.y);
      character.x = prevPoint.x;
    }

    return collisionResult;
  }

  getOrientationCollisionResult(aaRect, bbRect, aaPrevPoint) {
    if (!this.isCheckAABB(aaRect, bbRect)) {
      return {
        horizontal: false,
        vertical: false,
      };
    }

    aaRect.y = aaPrevPoint.y;
    if (!this.isCheckAABB(aaRect, bbRect)) {
      return {
        horizontal: false,
        vertical: true,
      };
    }

    return {
      horizontal: true,
      vertical: false,
    };
  }

  isCheckAABB(entity, area) {
    return (
      entity.x < area.x + area.width &&
      entity.x + entity.width > area.x &&
      entity.y < area.y + area.height &&
      entity.height + entity.y > area.y
    );
  }

  setKeys() {
    this.keyboard.getButton("ArrowLeft").executeUp = function () {
      this.#hero.stopLeftMove();
    };

    this.keyboard.getButton("ArrowLeft").executeDown = function () {
      this.#hero.startLeftMove();
    };

    this.keyboard.getButton("ArrowRight").executeUp = function () {
      this.#hero.stopRightMove();
    };

    this.keyboard.getButton("ArrowRight").executeDown = function () {
      this.#hero.startRightMove();
    };

    this.keyboard.getButton("ArrowUp").executeDown = function () {
      if (this.keyboard.isButtonPressed("ArrowDown")) {
        this.#hero.throwDown();
      } else {
        this.#hero.jump();
      }
    };
  }
}
