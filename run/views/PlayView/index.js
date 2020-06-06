
/**
 * 需要加载的资源
 */
export const PLAY_LOAD_RESOURCE = {
  Stripes: 'images/stripes.png',
  TouchBar: 'images/ui/play/TouchBar.png',
  StatusBar: 'images/ui/play/StatusBar.png',
};

/**
 * 游戏游玩入口
 */
export function play() {
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
      TouchBar.x = 138;
      TouchBar.y = gameHeight - 68;
      TouchBar.anchor.set(0, 1);
      playViewStage.addChild(TouchBar);
    }

    function _playContainer() {
    }
  }
}
