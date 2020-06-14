
import { loadSubModule } from '../../../utils/functions.js';

/**
 * 需要加载的资源
 */
const ENTRY_LOAD_RESOURCE = {
  Cover: 'static/images/Cover.png',
  MenuBtn: 'static/images/icon/menu.png',
  MapBtn: 'static/images/ui/entry/MapBtn.png',
  MapIcon: 'static/images/ui/entry/MapIcon.png',
  StartBtn: 'static/images/ui/entry/StartBtn.png',
  PlayerBg: 'static/images/ui/entry/PlayerBg.png',
  PlayerBtn: 'static/images/ui/entry/PlayerBtn.png',
  StartArrow: 'static/images/ui/entry/StartArrow.png',
  SingleArrow: 'static/images/ui/entry/SingleArrow.png',
};

/**
 * 游戏开始入口
 */
export default function entry() {
  loadResource({
    resource: ENTRY_LOAD_RESOURCE,
    showProcess: false
  }).then(_renderEntry);

  function _renderEntry() {
    const entryViewStage = new PIXI.Container(0x000000);
    const CoverImg = PIXI.Sprite.from('Cover');
    CoverImg.x = gameWidth / 2;
    CoverImg.y = gameHeight / 2;
    CoverImg.anchor.set(0.5, 0.5);
    CoverImg.width = gameWidth;
    CoverImg.height = gameHeight;
    entryViewStage.addChild(CoverImg);
    app.stage.addChild(entryViewStage);


    const MapIconTexture = PIXI.utils.TextureCache['MapIcon'], MapIconOriginWidth = MapIconTexture.width,
      MapBtnTexture = PIXI.utils.TextureCache['MapBtn'], MapBtnOriginHeight = MapBtnTexture.height;
    let nowMapStep = 0, loopStep = 0,
      MapIcon, MapBtn, MapLeftArrowBtn, MapRightArrowBtn,
      PlayerBg, PlayerBtn,
      StartBtn, StartArrow;

    _renderMap();
    _renderPlayer();
    _renderOther();
    app.ticker.add(_eventLoop);


    // 地图
    function _renderMap() {
      MapIconTexture.frame = new PIXI.Rectangle(MapIconOriginWidth / 5 * nowMapStep, 0, MapIconOriginWidth / 5, MapIconTexture.height);
      MapIcon = new PIXI.Sprite(MapIconTexture);
      MapIcon.anchor.set(0.5, 0.5);
      MapIcon.x = gameWidth * 0.25;
      MapIcon.y = gameHeight * 0.35;
      MapIcon.direction = false;

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
      let MenuBtnTexture = PIXI.utils.TextureCache['MenuBtn'], MenuBtnOriginWidth = MenuBtnTexture.width;
      MenuBtnTexture.frame = new PIXI.Rectangle(MenuBtnOriginWidth / 3 * 1, 0, MenuBtnOriginWidth / 3, MenuBtnTexture.height);
      let MenuBtn = new PIXI.Sprite.from(MenuBtnTexture);
      MenuBtn.x = gameWidth * 2.8 / 4;
      MenuBtn.y = 0;
      MenuBtn.width *= 1.5;
      MenuBtn.height *= 1.5;
      MenuBtn.anchor.set(0.5, 0);
      MenuBtn.buttonMode = true;
      MenuBtn.interactive = true;
      MenuBtn.on('pointertap', () => {
        MenuBtnTexture.frame = new PIXI.Rectangle(MenuBtnOriginWidth / 3 * 0, 0, MenuBtnOriginWidth / 3, MenuBtnTexture.height);

        // TODO: 去抖 && 节流
        setTimeout(() => {
          MenuBtnTexture.frame = new PIXI.Rectangle(MenuBtnOriginWidth / 3 * 1, 0, MenuBtnOriginWidth / 3, MenuBtnTexture.height);
        }, 1000);
      });

      let StartBtnTexture = PIXI.utils.TextureCache['StartBtn'], StartBtnOriginHeight = StartBtnTexture.height;
      StartBtnTexture.frame = new PIXI.Rectangle(0, 0, StartBtnTexture.width, StartBtnOriginHeight / 2);
      StartBtn = new PIXI.Sprite.from(StartBtnTexture);
      StartBtn.anchor.set(0.5, 0.5);
      StartBtn.x = PlayerBg.x;
      StartBtn.y = gameHeight * 0.85;
      StartBtn.buttonMode = true;
      StartBtn.interactive = true;
      StartBtn.on('pointertap', () => {
        MapBtnTexture.frame = new PIXI.Rectangle(0, MapBtnOriginHeight / 10 * nowMapStep * 2, MapBtnTexture.width, MapBtnOriginHeight / 10);
        StartBtnTexture.frame = new PIXI.Rectangle(0, StartBtnOriginHeight / 2, StartBtnTexture.width, StartBtnOriginHeight / 2);

        loadSubModule('Play').then(res => {
          play({
            map: nowMapStep
          });
          _changeStage();
        });
      });

      StartArrow = PIXI.Sprite.from('StartArrow');
      StartArrow.anchor.set(1, 0.5);
      StartArrow.x = StartBtn.x - StartBtn.width / 2 - 68;
      StartArrow.y = StartBtn.y;

      entryViewStage.addChild(MenuBtn, StartArrow, StartBtn);
    }

    function _eventLoop() {
      // 地图图标
      if (MapIcon.direction) {
        MapIcon.y += 0.38;
        if (gameHeight * 0.35 + 10 < MapIcon.y) MapIcon.direction = false;
      } else {
        MapIcon.y -= 0.38;
        if (gameHeight * 0.35 - 10 > MapIcon.y) MapIcon.direction = true;
      }

      if (StartArrow.x < StartBtn.x - StartBtn.width / 2 - 38) {
        StartArrow.x += 0.88;
        MapLeftArrowBtn.x -= 1;
        MapRightArrowBtn.x += 1;
      } else {
        StartArrow.x = StartBtn.x - StartBtn.width / 2 - 68;
        loopStep++;
      }
      if (loopStep === 2) {
        loopStep = 0;
        MapLeftArrowBtn.x = MapBtn.x - MapBtn.width / 2 - MapLeftArrowBtn.width / 3 + 28;
        MapRightArrowBtn.x = MapBtn.x + MapBtn.width / 2 + MapRightArrowBtn.width / 3 - 28;
      }
    }

    function _changeStage() {
      app.ticker.remove(_eventLoop);
      entryViewStage.removeChild(MapLeftArrowBtn, MapRightArrowBtn, StartArrow, StartBtn);
      setTimeout(() => app.stage.removeChild(entryViewStage), 1500);
    }
  }
}

