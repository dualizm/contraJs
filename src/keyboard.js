export default class Keyboard {
  #gameContext;
  #keyMap = {};

  constructor(gameContext) {
    this.#gameContext = gameContext;
  }

  getButton(keyName) {
    if (this.#keyMap[keyName] === undefined) {
      this.#keyMap[keyName] = {
        isDown: false,
      };
    }

    return this.#keyMap[keyName];
  }

  onKeyDown(e) {
    const button = this.getButton(e.code);
    button?.executeDown?.call(this.#gameContext);
    button.isDown = true;
  }

  onKeyUp(e) {
    const button = this.getButton(e.code);
    button?.executeUp?.call(this.#gameContext);
    button.isDown = false;
  }

  isButtonPressed(keyName) {
    return this.#keyMap[keyName].isDown;
  }
}
