import Game from "@/game";
import "./style.css";
import { Application } from "pixi.js";

const app = new Application();
await app.init();

const game = new Game(app);
document.body.appendChild(app.canvas);

document.addEventListener("keydown", function (key) {
  game.keyboard.onKeyDown(key);
});

document.addEventListener("keyup", function (key) {
  game.keyboard.onKeyUp(key);
});

app.ticker.add(game.update, game);
