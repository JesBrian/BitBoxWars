import loading from './components/Loading/index.js';
import { entry } from './views/EntryView/index.js';

import { play } from "./views/PlayView/index.js";

/**
 * 游戏主入口
 */
export default function main() {
  const app = new PIXI.Application({
    view: canvas,
    width: gameWidth,
    height: gameHeight,
    backgroundColor: 0xFFFFFF,
    forceFXAA: true
  });
  app.renderer.plugins.interaction.mapPositionToPoint = (point, x, y) => {
    point.x = x * scaleX;
    point.y = y * scaleY;
  };
  app.loader.baseUrl = 'assets';
  window.app = app;
  window.loadResource = loading;

  // entry();
  play();
  return app;
}
