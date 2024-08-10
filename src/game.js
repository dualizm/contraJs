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

    this.#platforms = new PlatformFabric(this.#app, { w: 100, h: 20 })
      .addPlatform(150, 300)
      .addPlatform(250, 330)
      .addPlatform(360, 300);

    this.keyboard = new Keyboard(this);

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
      this.#hero.jump();
    };
  }

  update() {
    const prevPoint = {
      x: this.#hero.x,
      y: this.#hero.y,
    };

    this.#hero.update();

    this.#platforms.platforms.forEach((platform) => {
      const collision = this.getPlatformCollisionResult(
        this.#hero,
        platform,
        prevPoint
      );

      if (collision.vertical) {
        this.#hero.stay();
      }
    });
  }

  getPlatformCollisionResult(character, platform, prevPoint) {
    if (!this.isCheckAABB(character, platform)) {
      return {
        horizontal: false,
        vertical: false,
      };
    }

    const currY = character.y;
    character.y = prevPoint.y;
    if (!this.isCheckAABB(character, platform)) {
      return {
        horizontal: false,
        vertical: true,
      };
    }

    character.y = currY;
    character.x = prevPoint.x;
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
}
