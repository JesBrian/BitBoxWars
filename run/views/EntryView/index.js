
import { play } from '../PlayView/index.js';

/**
 * 需要加载的资源
 */
export const ENTRY_LOAD_RESOURCE = {
  MapBtn: 'images/ui/entry/MapBtn.png',
  MapIcon: 'images/ui/entry/MapIcon.png',
  StartBtn: 'images/ui/entry/StartBtn.png',
  StartArrow: 'images/ui/entry/StartArrow.png',
  SingleArrow: 'images/ui/entry/SingleArrow.png',
};

/**
 * 游戏开始入口
 */
export function entry() {
  loadResource(ENTRY_LOAD_RESOURCE).then(_renderEntry);

  function _renderEntry() {
    const entryViewStage = new PIXI.Container();
    app.stage.addChild(entryViewStage);

    let StartBtn, StartArrow;

    _renderMap();
    _renderPlayer();
    _renderOther();
    app.ticker.add(_eventLoop);


    // 地图
    function _renderMap() {
      const MapBtnTexture = PIXI.utils.TextureCache['MapBtn'];
      MapBtnTexture.frame = new PIXI.Rectangle(0, 0, MapBtnTexture.width, MapBtnTexture.height / 10);
      const MapBtn = new PIXI.Sprite(MapBtnTexture);
      MapBtn.anchor.set(0.5, 0.5);
      MapBtn.x = gameWidth * 0.25;
      MapBtn.y = gameHeight * 0.68;
      entryViewStage.addChild(MapBtn);
    }

    // 人物
    function _renderPlayer() {
    }

    // 杂项
    function _renderOther() {
      StartBtn = PIXI.Sprite.from('StartBtn');
      StartBtn.anchor.set(0, 0.5);
      StartBtn.x = gameWidth - StartBtn.width - 38;
      StartBtn.y = gameHeight * 0.9;
      StartBtn.buttonMode = true;
      StartBtn.interactive = true;
      StartBtn.on('pointertap', () => {
        _changeStage();
        play();
      });

      StartArrow = PIXI.Sprite.from('StartArrow');
      StartArrow.anchor.set(1, 0.5);
      StartArrow.x = StartBtn.x - 68;
      StartArrow.y = gameHeight * 0.9;

      entryViewStage.addChild(StartBtn);
      entryViewStage.addChild(StartArrow);
    }

    function _eventLoop() {
      if (StartArrow.x < StartBtn.x - 68) StartArrow.x += 0.8;
      else StartArrow.x = StartBtn.x - 88;
    }

    function _changeStage() {
      app.stage.removeChild(entryViewStage);
      app.ticker.remove(_eventLoop);
    }
  }
}

