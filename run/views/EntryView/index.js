
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

    let nowMapStep = 1, StartBtn, StartArrow;

    _renderMap();
    _renderPlayer();
    _renderOther();
    app.ticker.add(_eventLoop);


    // 地图
    function _renderMap() {
      const MapBtnTexture = PIXI.utils.TextureCache['MapBtn'], MapBtnOriginHeight = MapBtnTexture.height;
      MapBtnTexture.frame = new PIXI.Rectangle(0, MapBtnOriginHeight / 10 * nowMapStep, MapBtnTexture.width, MapBtnOriginHeight / 10);
      let MapBtn = new PIXI.Sprite(MapBtnTexture);
      MapBtn.anchor.set(0.5, 0.5);
      MapBtn.x = gameWidth * 0.3;
      MapBtn.y = gameHeight * 0.68;
      MapBtn.buttonMode = true;
      MapBtn.interactive = true;
      MapBtn.on('pointertap', () => _changeMap());

      const LeftArrowBtn = new PIXI.Sprite.from('SingleArrow');
      LeftArrowBtn.anchor.set(0.5, 0.5);
      LeftArrowBtn.x = MapBtn.x - MapBtn.width / 2 - LeftArrowBtn.width / 3;
      LeftArrowBtn.y = MapBtn.y - MapBtn.height - LeftArrowBtn.height - 38;
      LeftArrowBtn.buttonMode = true;
      LeftArrowBtn.interactive = true;
      LeftArrowBtn.rotation = Math.PI;
      LeftArrowBtn.on('pointertap', () => _changeMap( -2));

      const RightArrowBtn = new PIXI.Sprite.from('SingleArrow');
      RightArrowBtn.anchor.set(0.5, 0.5);
      RightArrowBtn.x = MapBtn.x + MapBtn.width / 2 + RightArrowBtn.width / 3;
      RightArrowBtn.y = MapBtn.y - MapBtn.height - RightArrowBtn.height - 38;
      RightArrowBtn.buttonMode = true;
      RightArrowBtn.interactive = true;
      RightArrowBtn.on('pointertap', () => _changeMap());

      entryViewStage.addChild(LeftArrowBtn, RightArrowBtn, MapBtn);

      function _changeMap(step = 2) {
        if (nowMapStep % 2 === 0) return;
        nowMapStep += step;
        if (nowMapStep < 0) nowMapStep = 10 - Math.abs(nowMapStep);
        nowMapStep %= 10;
        MapBtnTexture.frame = new PIXI.Rectangle(0, MapBtnOriginHeight / 10 * nowMapStep, MapBtnTexture.width, MapBtnOriginHeight / 10);
      }

      _renderMap.change = _changeMap;
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
        _renderMap.change(-1);
        play({
          map: nowMapStep
        });
        _changeStage();
      });

      StartArrow = PIXI.Sprite.from('StartArrow');
      StartArrow.anchor.set(1, 0.5);
      StartArrow.x = StartBtn.x - 68;
      StartArrow.y = gameHeight * 0.9;

      entryViewStage.addChild(StartArrow, StartBtn);
    }

    function _eventLoop() {
      if (StartArrow.x < StartBtn.x - 68) StartArrow.x += 0.8;
      else StartArrow.x = StartBtn.x - 88;
    }

    function _changeStage() {
      app.ticker.remove(_eventLoop);
      setTimeout(() => app.stage.removeChild(entryViewStage), 1500);
    }
  }
}

