
/**
 * 需要加载的资源
 */
export const PLAY_LOAD_RESOURCE = {
  Stripes: 'images/stripes.png',
  TouchBtn: 'images/ui/play/TouchBtn.png',
  TouchBar: 'images/ui/play/TouchBar.png',
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

  loadResource(PLAY_LOAD_RESOURCE).then(renderPlay);

  function renderPlay() {
    console.log('renderPlay');
    const playViewStage = new PIXI.Container();
    app.stage.addChild(playViewStage);

    _statusContainer();
    _controllerContainer();
    _playContainer();

    function _statusContainer() {
      let spriteFrame = new PIXI.Sprite.from('StatusBar');
      spriteFrame.x = 38;
      spriteFrame.y = 20;
      let spriteFrame2 = new PIXI.Sprite.from('StatusBar');
      // spriteFrame2.anchor.set(0, 0);
      spriteFrame2.x = 38;
      spriteFrame2.y = spriteFrame.height + 25;
      playViewStage.addChild(spriteFrame, spriteFrame2);
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

      playViewStage.addChild(TouchBar, TouchBtn);
    }

    function _playContainer() {
    }
  }
}
