/**
 * 需要加载的资源
 */
export const PLAY_LOAD_RESOURCE = {
  // Stripes: 'modules/PlayModule/resources/images/stripes.png',
  TopBar: 'modules/PlayModule/resources/images/TopBar.png',
  MenuBtn: 'modules/PlayModule/resources/images/MenuBtn.png',
  ComboBar: 'modules/PlayModule/resources/images/ComboBar.png',
  TouchBtn: 'modules/PlayModule/resources/images/TouchBtn.png',
  TouchBar: 'modules/PlayModule/resources/images/TouchBar.png',
  FireBtn: 'modules/PlayModule/resources/images/FireBtn.png',
  LeftSwitchBtn: 'modules/PlayModule/resources/images/LeftSwitchBtn.png',
  RightSwitchBtn: 'modules/PlayModule/resources/images/RightSwitchBtn.png',
  StatusBar: 'modules/PlayModule/resources/images/StatusBar.png',
  HeartIcon: 'assets/images/icon/heart.png',
  Icon0: 'assets/images/icon/0.png',
  Icon1: 'assets/images/icon/1.png',
  Icon2: 'assets/images/icon/2.png',
  Icon3: 'assets/images/icon/3.png',
  Icon4: 'assets/images/icon/4.png',
  Icon5: 'assets/images/icon/5.png',
  Icon6: 'assets/images/icon/6.png',
  Icon7: 'assets/images/icon/7.png',
  Icon8: 'assets/images/icon/8.png',
  Icon9: 'assets/images/icon/9.png',
};

/**
 * 游戏游玩入口
 */
export function play(options = {}) {
  const playOptions = {
    map: 0,
    player: 1,
    network: false,
  };

  Object.assign(playOptions, options);

  loadResource({
    resource: PLAY_LOAD_RESOURCE,
    position: {
      top: gameHeight / 5, left: 0
    }
  }).then(renderPlay);

  function renderPlay() {
    const playViewStage = new PIXI.Container();
    let nowScore = '000', TopBar, FireBtnTexture, FireBtnOriginWidth = 0;

    app.stage.addChild(playViewStage);
    _statusContainer();
    _controllerContainer();
    _playContainer();
    app.ticker.add(_eventLoop);

    function _statusContainer() {
      TopBar = PIXI.Sprite.from('TopBar');
      TopBar.anchor.set(0.5, 0);
      TopBar.x = gameWidth / 2;
      TopBar.y = 0;
      TopBar.width = TopBar.width * 1.38;
      TopBar.height = TopBar.height * 1.38;
      let spriteFrame = new PIXI.Sprite.from('StatusBar');
      spriteFrame.x = 38;
      spriteFrame.y = 20;
      let HeartIcon = PIXI.Sprite.from('HeartIcon');
      HeartIcon.x = 62;
      HeartIcon.y = 38;
      HeartIcon.width = HeartIcon.width * 0.68;
      HeartIcon.height = HeartIcon.height * 0.68;
      let spriteFrame2 = new PIXI.Sprite.from('StatusBar');
      spriteFrame2.x = spriteFrame.x;
      spriteFrame2.y = spriteFrame.height + spriteFrame.y + 3;
      let ComboBar = PIXI.Sprite.from('ComboBar');
      ComboBar.anchor.set(1, 0.5);
      ComboBar.x = gameWidth;
      ComboBar.y = 105 + ComboBar.height / 2;
      // 数字
      let num1 = PIXI.Sprite.from('Icon0');
      num1.anchor.set(1, 0.5);
      num1.x = gameWidth - 25;
      num1.y = ComboBar.y - 2;
      num1.height = num1.height * 1.3;
      let num2 = PIXI.Sprite.from('Icon0');
      num2.anchor.set(1, 0.5);
      num2.x = num1.x - num1.width - 10;
      num2.y = ComboBar.y - 2;
      num2.height = num2.height * 1.3;
      let num3 = PIXI.Sprite.from('Icon0');
      num3.anchor.set(1, 0.5);
      num3.x = num2.x - num2.width - 10;
      num3.y = ComboBar.y - 2;
      num3.height = num3.height * 1.3;

      // TODO: 测试递增数字
      setInterval(() => {
        playViewStage.removeChild(num1, num2, num3);
        const scoreArr = nowScore.split('');
        num1 = PIXI.Sprite.from(`Icon${scoreArr[2]}`);
        num1.anchor.set(1, 0.5);
        num1.x = gameWidth - 25;
        num1.y = ComboBar.y - 2;
        num1.height = num1.height * 1.3;
        num2 = PIXI.Sprite.from(`Icon${scoreArr[1]}`);
        num2.anchor.set(1, 0.5);
        num2.x = num1.x - num1.width - 10;
        num2.y = ComboBar.y - 2;
        num2.height = num2.height * 1.3;
        num3 = PIXI.Sprite.from(`Icon${scoreArr[0]}`);
        num3.anchor.set(1, 0.5);
        num3.x = num2.x - num2.width - 10;
        num3.y = ComboBar.y - 2;
        num3.height = num3.height * 1.3;
        nowScore = `000${nowScore * 1 + 1}`.slice(-3);
        playViewStage.addChild(num1, num2, num3);
      }, 3000);

      playViewStage.addChild(TopBar, spriteFrame, HeartIcon, spriteFrame2, ComboBar, num1, num2, num3);
    }

    function _controllerContainer() {
      let MenuBtnTexture = PIXI.utils.TextureCache['MenuBtn'], MenuBtnOriginWidth = MenuBtnTexture.width;
      MenuBtnTexture.frame = new PIXI.Rectangle(MenuBtnOriginWidth / 3 * 1, 0, MenuBtnOriginWidth / 3, MenuBtnTexture.height);
      let MenuBtn = new PIXI.Sprite.from(MenuBtnTexture);
      MenuBtn.x = TopBar.x + TopBar.width / 2;
      MenuBtn.y = 0;
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
      TouchBtn.buttonMode = true;
      TouchBtn.interactive = true;
      TouchBtn.on('mousedown', onDragStart)
      .on('touchstart', onDragStart)
      .on('mouseup', onDragEnd)
      .on('mouseupoutside', onDragEnd)
      .on('touchend', onDragEnd)
      .on('touchendoutside', onDragEnd)
      .on('mousemove', onDragMove)
      .on('touchmove', onDragMove);

      function onDragStart(event) {
        console.log('onDragStart', event);
      }

      function onDragEnd() {
        console.log('onDragEnd');
      }

      function onDragMove() {
        console.log('onDragMove');
      }

      FireBtnTexture = PIXI.utils.TextureCache['FireBtn'];
      FireBtnOriginWidth = FireBtnTexture.width;
      FireBtnTexture.frame = new PIXI.Rectangle(0, 0, FireBtnOriginWidth / 2, FireBtnTexture.height);
      let FireBtn = new PIXI.Sprite(FireBtnTexture);
      FireBtn.width = 128;
      FireBtn.height = 128;
      FireBtn.x = gameWidth - FireBtn.width - 75;
      FireBtn.y = TouchBar.y - 8;
      FireBtn.rotation = -Math.PI / 4;
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

      let LeftSwitchBtn = new PIXI.Sprite.from('LeftSwitchBtn');
      LeftSwitchBtn.anchor.set(0.5, 0.5);
      LeftSwitchBtn.width = 88;
      LeftSwitchBtn.height = 88;
      LeftSwitchBtn.x = FireBtn.x - FireBtn.width / 4 * 2.5;
      LeftSwitchBtn.y = FireBtn.y + FireBtn.height / 4 * 2.5;
      let RightSwitchBtn = new PIXI.Sprite.from('RightSwitchBtn');
      RightSwitchBtn.anchor.set(0.5, 0.5);
      RightSwitchBtn.width = 88;
      RightSwitchBtn.height = 88;
      RightSwitchBtn.x = FireBtn.x + FireBtn.width / 4 * 2.5;
      RightSwitchBtn.y = FireBtn.y - FireBtn.height / 4 * 2.5;
      // RightSwitchBtn.rotation = Math.PI;

      playViewStage.addChild(MenuBtn, TouchBar, TouchBtn, FireBtn, LeftSwitchBtn, RightSwitchBtn);
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
window.play = play;
