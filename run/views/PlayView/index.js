
/**
 * 需要加载的资源
 */
export const PLAY_LOAD_RESOURCE = {
  Stripes: 'images/stripes.png',
  TopBar: 'images/ui/play/TopBar.png',
  ComboBar: 'images/ui/play/ComboBar.png',
  TouchBtn: 'images/ui/play/TouchBtn.png',
  TouchBar: 'images/ui/play/TouchBar.png',
  FireBtn: 'images/ui/play/FireBtn.png',
  StatusBar: 'images/ui/play/StatusBar.png',
};

/**
 * 游戏游玩入口
 */
export function play(options = {}) {
  Object.assign(options, {
    map: 1,
    player: 1,
    network: false,
  });

  console.log(options);

  loadResource(PLAY_LOAD_RESOURCE, {
    top: gameHeight / 5, left: 0
  }).then(renderPlay);

  function renderPlay() {
    const playViewStage = new PIXI.Container();
    let FireBtnTexture, FireBtnOriginWidth = 0;

    app.stage.addChild(playViewStage);
    _statusContainer();
    _controllerContainer();
    _playContainer();
    app.ticker.add(_eventLoop);

    function _statusContainer() {
      let TopBar = PIXI.Sprite.from('TopBar');
      TopBar.anchor.set(0.5, 0);
      TopBar.x = gameWidth / 2;
      TopBar.y = 0;
      TopBar.width = TopBar.width * 1.38;
      TopBar.height = TopBar.height * 1.38;
      let spriteFrame = new PIXI.Sprite.from('StatusBar');
      spriteFrame.x = 38;
      spriteFrame.y = 20;
      let spriteFrame2 = new PIXI.Sprite.from('StatusBar');
      spriteFrame2.x = spriteFrame.x;
      spriteFrame2.y = spriteFrame.height + spriteFrame.y + 3;
      let ComboBar = PIXI.Sprite.from('ComboBar');
      ComboBar.anchor.set(1, 0);
      ComboBar.x = gameWidth;
      ComboBar.y = 100;
      playViewStage.addChild(TopBar, ComboBar, spriteFrame, spriteFrame2);
    }

    function _controllerContainer() {
      let TouchBar = PIXI.Sprite.from('TouchBar');
      TouchBar.width = 228;
      TouchBar.height = 228;
      TouchBar.x = TouchBar.width + 38;
      TouchBar.y = gameHeight - TouchBar.height / 2 - 68;
      TouchBar.anchor.set(0.5, 0.5);

      let TouchBtn = PIXI.Sprite.from('TouchBtn');
      TouchBtn.width = 88;
      TouchBtn.height = 88;
      TouchBtn.x = TouchBar.x;
      TouchBtn.y = TouchBar.y;
      TouchBtn.anchor.set(0.5, 0.5);

      FireBtnTexture = PIXI.utils.TextureCache['FireBtn'];
      FireBtnOriginWidth = FireBtnTexture.width;
      FireBtnTexture.frame = new PIXI.Rectangle(0, 0, FireBtnOriginWidth / 2, FireBtnTexture.height);
      let FireBtn = new PIXI.Sprite(FireBtnTexture);
      FireBtn.width = 168;
      FireBtn.height = 168;
      FireBtn.x = gameWidth - FireBtn.width - 68;
      FireBtn.y = TouchBar.y + 18;
      FireBtn.anchor.set(0.5, 0.5);
      FireBtn.buttonMode = true;
      FireBtn.interactive = true;
      FireBtn.on('pointertap', () => {
        FireBtnTexture.frame = new PIXI.Rectangle(FireBtnOriginWidth / 2, 0, FireBtnOriginWidth / 2, FireBtnTexture.height);

        // TODO: 去抖 && 节流
        setTimeout(() => {
          FireBtnTexture.frame = new PIXI.Rectangle(0, 0, FireBtnOriginWidth / 2, FireBtnTexture.height);
        }, 1000);
      });

      playViewStage.addChild(TouchBar, TouchBtn, FireBtn);
    }

    function _playContainer() {

      function _renderMap() {
      }

      function _renderPlayer() {
      }

      function _renderEnemy() {
      }
    }

    function _eventLoop(detail) {
    }
  }
}
