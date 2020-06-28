import MenuView from '../MenuView/index.js';

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
        const entryViewStage = new PIXI.Container();
        entryViewStage.interactive = true;

        const CoverImg = PixiUtils.genSprite('Cover');
        CoverImg.x = gameWidth / 2;
        CoverImg.y = gameHeight / 2;
        CoverImg.anchor.set(0.5, 0.5);
        CoverImg.width = gameWidth;
        CoverImg.height = gameHeight;
        entryViewStage.addChild(CoverImg);
        app.addChild(entryViewStage);


        const MapIconTexture = PixiUtils.getTexture('MapIcon'), MapIconOriginWidth = MapIconTexture.width,
            MapBtnTexture = PixiUtils.getTexture('MapBtn'), MapBtnOriginHeight = MapBtnTexture.height;
        let nowMapStep = 0, loopStep = 0,
            MapIcon, MapBtn, MapLeftArrowBtn, MapRightArrowBtn,
            PlayerBg, PlayerBtn, PlayMapBg, PlayMapBtn,
            StartBtn, StartArrow;

        _renderMap();
        _renderPlayer();
        _renderOther();
        ticker.add(_renderLoop);


        // 地图
        function _renderMap() {
            MapIconTexture.frame = new PIXI.Rectangle(MapIconOriginWidth / 5 * nowMapStep, 0, MapIconOriginWidth / 5, MapIconTexture.height);
            MapIcon = PixiUtils.genSprite(MapIconTexture);
            MapIcon.anchor.set(0.5, 0.5);
            MapIcon.x = gameWidth * 0.25;
            MapIcon.y = gameHeight * 0.4;
            MapIcon.direction = false;

            MapBtnTexture.frame = new PIXI.Rectangle(0, MapBtnOriginHeight / 10 * (nowMapStep * 2 + 1), MapBtnTexture.width, MapBtnOriginHeight / 10);
            MapBtn = PixiUtils.genSprite(MapBtnTexture);
            MapBtn.anchor.set(0.5, 0.5);
            MapBtn.x = MapIcon.x;
            MapBtn.y = MapIcon.y + MapIcon.height / 2 + MapBtn.height;
            MapBtn.interactive = true;
            MapBtn.on('tap', () => _changeMap());

            MapLeftArrowBtn = PixiUtils.genSprite('SingleArrow');
            MapLeftArrowBtn.anchor.set(0.5, 0.5);
            MapLeftArrowBtn.x = MapBtn.x - MapBtn.width / 2 - MapLeftArrowBtn.width / 3 + 28;
            MapLeftArrowBtn.y = MapIcon.y;
            MapLeftArrowBtn.width = MapLeftArrowBtn.width * 0.68;
            MapLeftArrowBtn.width = MapLeftArrowBtn.height * 0.68;
            MapLeftArrowBtn.interactive = true;
            MapLeftArrowBtn.rotation = Math.PI;
            MapLeftArrowBtn.on('tap', () => _changeMap(-2));

            MapRightArrowBtn = PixiUtils.genSprite('SingleArrow');
            MapRightArrowBtn.anchor.set(0.5, 0.5);
            MapRightArrowBtn.x = MapBtn.x + MapBtn.width / 2 + MapRightArrowBtn.width / 3 - 28;
            MapRightArrowBtn.y = MapIcon.y;
            MapRightArrowBtn.width = MapRightArrowBtn.width * 0.68;
            MapRightArrowBtn.width = MapRightArrowBtn.height * 0.68;
            MapRightArrowBtn.interactive = true;
            MapRightArrowBtn.on('tap', () => _changeMap());

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
            PlayerBg = PixiUtils.genSprite('PlayerBg');
            PlayerBg.anchor.set(0.5, 0.5);
            PlayerBg.x = gameWidth * 2.8 / 4;
            PlayerBg.y = gameHeight * 0.3;
            PlayerBg.height = PlayerBg.height * 0.8;

            PlayMapBg = PixiUtils.genSprite('PlayerBg');
            PlayMapBg.anchor.set(0.5, 0.5);
            PlayMapBg.x = PlayerBg.x;
            PlayMapBg.y = PlayerBg.y + PlayerBg.height;
            PlayMapBg.height = PlayerBg.height;

            PlayerBtn = PixiUtils.genSprite('PlayerBtn');
            PlayerBtn.anchor.set(0.5, 0.5);
            PlayerBtn.x = PlayerBg.x + (PlayerBg.width) / 2;
            PlayerBtn.y = PlayerBg.y;
            PlayerBtn.width = PlayerBtn.width * 2.2;
            PlayerBtn.height = PlayerBtn.height * 2.2;
            PlayerBtn.interactive = true;
            PlayerBtn.on('tap', () => {
            });

            PlayMapBtn = PixiUtils.genSprite('PlayerBtn');
            PlayMapBtn.anchor.set(0.5, 0.5);
            PlayMapBtn.x = PlayerBtn.x;
            PlayMapBtn.y = PlayMapBg.y;
            PlayMapBtn.width = PlayerBtn.width;
            PlayMapBtn.height = PlayerBtn.height;
            PlayMapBtn.interactive = true;
            PlayMapBtn.on('tap', () => {
            });

            entryViewStage.addChild(PlayerBg, PlayerBtn, PlayMapBg, PlayMapBtn);
        }

        // 杂项
        function _renderOther() {
            let MenuBtnTexture = PixiUtils.getTexture('MenuBtn'), MenuBtnOriginWidth = MenuBtnTexture.width;
            MenuBtnTexture.frame = new PIXI.Rectangle(MenuBtnOriginWidth / 3 * 1, 0, MenuBtnOriginWidth / 3, MenuBtnTexture.height);
            let MenuBtn = PixiUtils.genSprite(MenuBtnTexture);
            MenuBtn.x = gameWidth * 2.8 / 4;
            MenuBtn.y = 0;
            MenuBtn.width *= 1.5;
            MenuBtn.height *= 1.5;
            MenuBtn.anchor.set(0.5, 0);
            MenuBtn.interactive = true;
            MenuBtn.on('tap', () => {
                MenuView({
                    initCallBack: () => {
                        MenuBtnTexture.frame = new PIXI.Rectangle(MenuBtnOriginWidth / 3 * 0, 0, MenuBtnOriginWidth / 3, MenuBtnTexture.height);
                        ticker.remove(_renderLoop);
                    },
                    destroyCallBack: () => {
                        MenuBtnTexture.frame = new PIXI.Rectangle(MenuBtnOriginWidth / 3 * 1, 0, MenuBtnOriginWidth / 3, MenuBtnTexture.height);
                        ticker.add(_renderLoop);
                    }
                }).init();
            });

            let StartBtnTexture = PixiUtils.getTexture('StartBtn'), StartBtnOriginHeight = StartBtnTexture.height;
            StartBtnTexture.frame = new PIXI.Rectangle(0, 0, StartBtnTexture.width, StartBtnOriginHeight / 2);
            StartBtn = PixiUtils.genSprite(StartBtnTexture);
            StartBtn.anchor.set(0.5, 0.5);
            StartBtn.x = PlayerBg.x;
            StartBtn.y = gameHeight * 0.885;
            StartBtn.interactive = true;
            StartBtn.on('tap', () => {
                MapBtnTexture.frame = new PIXI.Rectangle(0, MapBtnOriginHeight / 10 * nowMapStep * 2, MapBtnTexture.width, MapBtnOriginHeight / 10);
                StartBtnTexture.frame = new PIXI.Rectangle(0, StartBtnOriginHeight / 2, StartBtnTexture.width, StartBtnOriginHeight / 2);

                DashUtils.loadSubModule('Play').then(res => {
                    play({
                        map: nowMapStep
                    });
                    _changeStage();
                });
            });

            StartArrow = PixiUtils.genSprite('StartArrow');
            StartArrow.anchor.set(1, 0.5);
            StartArrow.x = StartBtn.x - StartBtn.width / 2 - 68;
            StartArrow.y = StartBtn.y;

            entryViewStage.addChild(MenuBtn, StartArrow, StartBtn);
        }

        function _renderLoop() {
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
            ticker.remove(_renderLoop);
            entryViewStage.removeChild(MapLeftArrowBtn, MapRightArrowBtn, StartArrow, StartBtn);
            setTimeout(() => app.removeChild(entryViewStage), 1500);
        }
    }
}

