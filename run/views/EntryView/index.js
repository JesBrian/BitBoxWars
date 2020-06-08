
import { play } from '../PlayView/index.js';

/**
 * 需要加载的资源
 */
export const ENTRY_LOAD_RESOURCE = {
  MapBtn: 'images/ui/entry/MapBtn.png',
  MapIcon: 'images/ui/entry/MapIcon.png',
  StartBtn: 'images/ui/entry/StartBtn.png',
  PlayerBg: 'images/ui/entry/PlayerBg.png',
  PlayerBtn: 'images/ui/entry/PlayerBtn.png',
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


    const MapIconTexture = PIXI.utils.TextureCache['MapIcon'], MapIconOriginWidth = MapIconTexture.width,
      MapBtnTexture = PIXI.utils.TextureCache['MapBtn'], MapBtnOriginHeight = MapBtnTexture.height;
    let nowMapStep = 0, loopStep = 0,
      MapBtn, MapLeftArrowBtn, MapRightArrowBtn,
      PlayerBg, PlayerBtn,
      StartBtn, StartArrow;

    _renderMap();
    _renderPlayer();
    _renderOther();
    app.ticker.add(_eventLoop);


    // 地图
    function _renderMap() {
      MapIconTexture.frame = new PIXI.Rectangle(MapIconOriginWidth / 5 * nowMapStep, 0, MapIconOriginWidth / 5, MapIconTexture.height);
      let MapIcon = new PIXI.Sprite(MapIconTexture);
      MapIcon.anchor.set(0.5, 0.5);
      MapIcon.x = gameWidth * 0.25;
      MapIcon.y = gameHeight * 0.35;

      MapBtnTexture.frame = new PIXI.Rectangle(0, MapBtnOriginHeight / 10 * (nowMapStep * 2 + 1), MapBtnTexture.width, MapBtnOriginHeight / 10);
      MapBtn = new PIXI.Sprite(MapBtnTexture);
      MapBtn.anchor.set(0.5, 0.5);
      MapBtn.x = MapIcon.x;
      MapBtn.y = MapIcon.y + MapIcon.height / 2 + MapBtn.height;
      MapBtn.buttonMode = true;
      MapBtn.interactive = true;
      MapBtn.on('pointertap', () => _changeMap());

      MapLeftArrowBtn = new PIXI.Sprite.from('SingleArrow');
      MapLeftArrowBtn.anchor.set(0.5, 0.5);
      MapLeftArrowBtn.x = MapBtn.x - MapBtn.width / 2 - MapLeftArrowBtn.width / 3 + 28;
      MapLeftArrowBtn.y = MapIcon.y;
      MapLeftArrowBtn.buttonMode = true;
      MapLeftArrowBtn.interactive = true;
      MapLeftArrowBtn.rotation = Math.PI;
      MapLeftArrowBtn.on('pointertap', () => _changeMap( -2));

      MapRightArrowBtn = new PIXI.Sprite.from('SingleArrow');
      MapRightArrowBtn.anchor.set(0.5, 0.5);
      MapRightArrowBtn.x = MapBtn.x + MapBtn.width / 2 + MapRightArrowBtn.width / 3 - 28;
      MapRightArrowBtn.y = MapIcon.y;
      MapRightArrowBtn.buttonMode = true;
      MapRightArrowBtn.interactive = true;
      MapRightArrowBtn.on('pointertap', () => _changeMap());

      entryViewStage.addChild(MapIcon, MapLeftArrowBtn, MapRightArrowBtn, MapBtn);

      function _changeMap(step = 1) {
        nowMapStep += step;
        if (nowMapStep < 0) nowMapStep = 5 - Math.abs(nowMapStep);
        nowMapStep %= 5;
        MapIconTexture.frame = new PIXI.Rectangle(MapIconOriginWidth / 5 * nowMapStep, 0, MapIconOriginWidth / 5, MapIconTexture.height);
        MapBtnTexture.frame = new PIXI.Rectangle(0, MapBtnOriginHeight / 10 * (nowMapStep * 2 + 1), MapBtnTexture.width, MapBtnOriginHeight / 10);
      }

      _renderMap.change = _changeMap;
    }

    // 人物
    function _renderPlayer() {
      PlayerBg = PIXI.Sprite.from('PlayerBg');
      PlayerBg.anchor.set(0.5, 0.5);
      PlayerBg.x = gameWidth * 2.8 / 4;
      PlayerBg.y = gameHeight * 0.4;

      PlayerBtn = PIXI.Sprite.from('PlayerBtn');
      PlayerBtn.anchor.set(0.5, 0.5);
      PlayerBtn.x = PlayerBg.x + (PlayerBg.width) / 2 ;
      PlayerBtn.y = PlayerBg.y;
      PlayerBtn.width = PlayerBtn.width * 2.2;
      PlayerBtn.height = PlayerBtn.height * 2.2;
      PlayerBtn.buttonMode = true;
      PlayerBtn.interactive = true;
      PlayerBtn.on('pointertap', () => {
      });

      entryViewStage.addChild(PlayerBg, PlayerBtn);
    }

    // 杂项
    function _renderOther() {
      StartBtn = PIXI.Sprite.from('StartBtn');
      StartBtn.anchor.set(0.5, 0.5);
      StartBtn.x = PlayerBg.x;
      StartBtn.y = gameHeight * 0.85;
      StartBtn.buttonMode = true;
      StartBtn.interactive = true;
      StartBtn.on('pointertap', () => {
        MapBtnTexture.frame = new PIXI.Rectangle(0, MapBtnOriginHeight / 10 * nowMapStep * 2, MapBtnTexture.width, MapBtnOriginHeight / 10);

        play({
          map: nowMapStep
        });
        _changeStage();
      });

      StartArrow = PIXI.Sprite.from('StartArrow');
      StartArrow.anchor.set(1, 0.5);
      StartArrow.x = StartBtn.x - StartBtn.width / 2 - 68;
      StartArrow.y = StartBtn.y;

      entryViewStage.addChild(StartArrow, StartBtn);
    }

    function _eventLoop() {
      if (StartArrow.x < StartBtn.x - StartBtn.width / 2 - 68) {
        StartArrow.x += 0.8;
        MapLeftArrowBtn.x -= 1;
        MapRightArrowBtn.x += 1;
      } else {
        StartArrow.x = StartBtn.x - StartBtn.width / 2 - 88;
        loopStep++;
      }
      if (loopStep === 2) {
        loopStep = 0;
        MapLeftArrowBtn.x = MapBtn.x - MapBtn.width / 2 - MapLeftArrowBtn.width / 3 + 18;
        MapRightArrowBtn.x = MapBtn.x + MapBtn.width / 2 + MapRightArrowBtn.width / 3 - 38;
      }
    }

    function _changeStage() {
      app.ticker.remove(_eventLoop);
      entryViewStage.removeChild(MapLeftArrowBtn, MapRightArrowBtn, StartArrow, StartBtn);
      // app.stage.removeChild(entryViewStage);
      setTimeout(() => app.stage.removeChild(entryViewStage), 1500);
    }
  }
}

