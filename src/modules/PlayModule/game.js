
import MenuModule from './views/MenuModule.js';

/**
 * 需要加载的资源
 */
const PLAY_LOAD_RESOURCE = {
    // Stripes: 'modules/PlayModule/resources/images/stripes.png',
    TopBar: 'modules/PlayModule/resources/images/TopBar.png',
    ChargeBar: 'modules/PlayModule/resources/images/ChargeBar.png',
    EmptyCharge: 'modules/PlayModule/resources/images/EmptyCharge.png',
    FullCharge: 'modules/PlayModule/resources/images/FullCharge.png',
    ComboBar: 'modules/PlayModule/resources/images/ComboBar.png',
    TouchBtn: 'modules/PlayModule/resources/images/TouchBtn.png',
    TouchBar: 'modules/PlayModule/resources/images/TouchBar.png',
    FireBtn: 'modules/PlayModule/resources/images/FireBtn.png',
    LeftSwitchBtn: 'modules/PlayModule/resources/images/LeftSwitchBtn.png',
    RightSwitchBtn: 'modules/PlayModule/resources/images/RightSwitchBtn.png',
    StatusBar: 'modules/PlayModule/resources/images/StatusBar.png',
    HeartIcon: 'static/images/icon/heart.png',
    Icon0: 'static/images/icon/0.png',
    Icon1: 'static/images/icon/1.png',
    Icon2: 'static/images/icon/2.png',
    Icon3: 'static/images/icon/3.png',
    Icon4: 'static/images/icon/4.png',
    Icon5: 'static/images/icon/5.png',
    Icon6: 'static/images/icon/6.png',
    Icon7: 'static/images/icon/7.png',
    Icon8: 'static/images/icon/8.png',
    Icon9: 'static/images/icon/9.png',
    MenuBtn: 'static/images/icon/menu.png',
};

/**
 * 游戏游玩入口
 */
export default function play(options = {}) {
    const playOptions = {
        map: 0,
        player: 1,
        network: false,
    }, {computedRadius, computedAngles, computedAnglesToPoint} = RoundUtils;

    Object.assign(playOptions, options);

    loadResource({
        resource: PLAY_LOAD_RESOURCE,
        position: {
            top: gameHeight / 5, left: 0
        }
    }).then(renderPlay);

    function renderPlay() {
        const playViewStage = new PIXI.Container();
        let nowScore = '000',
            TopBar, MenuBtn, TouchBar,
            FireBtn, FireBtnTexture, FireBtnOriginWidth = 0;

        app.addChild(playViewStage);
        _statusContainer();
        _controllerContainer();
        _playContainer();
        _bindEvent();
        ticker.add(_renderLoop);

        function _statusContainer() {
            TopBar = PixiUtils.genSprite('TopBar');
            TopBar.anchor.set(0.5, 0);
            TopBar.x = gameWidth / 2;
            TopBar.y = 0;
            TopBar.width = TopBar.width * 1.38;
            TopBar.height = TopBar.height * 1.38;

            let ChargeBarTexture = PixiUtils.getTexture('ChargeBar'),
                ChargeBarOriginWidth = ChargeBarTexture.width * 1.38;
            ChargeBarTexture.frame = new PIXI.Rectangle(0, 0, 0, ChargeBarTexture.height);
            let ChargeBar = PixiUtils.genSprite(ChargeBarTexture);
            ChargeBar.anchor.set(0, 0);
            ChargeBar.x = gameWidth / 2 - ChargeBarOriginWidth / 2;
            ChargeBar.y = TopBar.height * 0.195;
            ChargeBar.width = ChargeBarTexture.width * 1.38 || 0.01;
            ChargeBar.height = ChargeBar.height * 1.2;

            let EmptyCharge = PixiUtils.genSprite('EmptyCharge');
            EmptyCharge.anchor.set(0.5, 0);
            EmptyCharge.x = gameWidth / 2 - TopBar.width / 2 * 0.448;
            EmptyCharge.y = TopBar.height * 0.18;
            EmptyCharge.width = EmptyCharge.width * 1.18;
            EmptyCharge.height = EmptyCharge.height * 1.18;

            let FullCharge = PixiUtils.genSprite('FullCharge');
            FullCharge.anchor.set(0.5, 0);
            FullCharge.x = gameWidth / 2 + TopBar.width / 2 * 0.455;
            FullCharge.y = TopBar.height * 0.08;
            FullCharge.width = FullCharge.width * 2.25;
            FullCharge.height = FullCharge.height * 2;
            FullCharge.visible = false;

            let spriteFrame = PixiUtils.genSprite('StatusBar');
            spriteFrame.x = 38;
            spriteFrame.y = 20;
            let HeartIcon = PixiUtils.genSprite('HeartIcon');
            HeartIcon.x = 62;
            HeartIcon.y = 38;
            HeartIcon.width = HeartIcon.width * 0.68;
            HeartIcon.height = HeartIcon.height * 0.68;
            let spriteFrame2 = PixiUtils.genSprite('StatusBar');
            spriteFrame2.x = spriteFrame.x;
            spriteFrame2.y = spriteFrame.height + spriteFrame.y + 3;
            let ComboBar = PixiUtils.genSprite('ComboBar');
            ComboBar.anchor.set(1, 0.5);
            ComboBar.x = gameWidth;
            ComboBar.y = 105 + ComboBar.height / 2;

            // 数字
            let num1, num2, num3;
            _renderComboNum();

            function _renderComboNum() {
                playViewStage.removeChild(num1, num2, num3);
                const scoreArr = nowScore.split('');

                num1 = PixiUtils.genSprite(`Icon${scoreArr[2]}`);
                num1.anchor.set(1, 0.5);
                num1.x = gameWidth - 25;
                num1.y = ComboBar.y - 2;
                num1.height = num1.height * 1.3;

                num2 = PixiUtils.genSprite(`Icon${scoreArr[1]}`);
                num2.anchor.set(1, 0.5);
                num2.x = num1.x - num1.width - 10;
                num2.y = ComboBar.y - 2;
                num2.height = num2.height * 1.3;

                num3 = PixiUtils.genSprite(`Icon${scoreArr[0]}`);
                num3.anchor.set(1, 0.5);
                num3.x = num2.x - num2.width - 10;
                num3.y = ComboBar.y - 2;
                num3.height = num3.height * 1.3;

                playViewStage.addChild(num1, num2, num3);
            }

            let MenuBtnTexture = PixiUtils.getTexture('MenuBtn'), MenuBtnOriginWidth = MenuBtnTexture.width * 3;
            MenuBtnTexture.frame = new PIXI.Rectangle(MenuBtnOriginWidth / 3 * 1, 0, MenuBtnOriginWidth / 3, MenuBtnTexture.height);
            MenuBtn = PixiUtils.genSprite(MenuBtnTexture);
            MenuBtn.x = gameWidth;
            MenuBtn.y = ComboBar.y + ComboBar.height / 2 + MenuBtn.height / 2;
            MenuBtn.anchor.set(1, 0.5);
            MenuBtn.buttonMode = true;
            MenuBtn.on('pointertap', () => {
                MenuModule({
                    initCallBack: () => {
                        MenuBtnTexture.frame = new PIXI.Rectangle(MenuBtnOriginWidth / 3 * 0, 0, MenuBtnOriginWidth / 3, MenuBtnTexture.height);
                        ticker.remove(_renderLoop);
                        _unbindEvent();
                    },
                    destroyCallBack: () => {
                        MenuBtnTexture.frame = new PIXI.Rectangle(MenuBtnOriginWidth / 3 * 1, 0, MenuBtnOriginWidth / 3, MenuBtnTexture.height);
                        ticker.add(_renderLoop);
                        _bindEvent();
                    }
                }).init();
            });


            playViewStage.addChild(TopBar, ChargeBar, EmptyCharge, FullCharge, spriteFrame, HeartIcon, spriteFrame2, ComboBar, num1, num2, num3);

            _statusContainer.comboNumEventLoop = (detail) => {
                if (typeof _statusContainer.comboNumEventLoop.coutTime === 'undefined') _statusContainer.comboNumEventLoop.coutTime = 0;
                _statusContainer.comboNumEventLoop.coutTime += detail;
                if (_statusContainer.comboNumEventLoop.coutTime >= 150) {
                    _statusContainer.comboNumEventLoop.coutTime = 0;
                    nowScore = `000${nowScore * 1 + 1}`.slice(-3);
                    _renderComboNum();
                }
            }

            _statusContainer.chargeBarEventLoop = (detail) => {
                let _this = _statusContainer.chargeBarEventLoop;
                if ((ChargeBar.width || 0) + 1.8 <= ChargeBarOriginWidth && _this.countDown === 100) {
                    ChargeBarTexture.frame = new PIXI.Rectangle(0, 0, ChargeBarTexture.width + 0.8, ChargeBarTexture.height);
                } else if (_this.countDown >= 0 && _this.countDown <= 100) {
                    _this.countDown -= detail;
                    FullCharge.visible = true;
                } else {
                    _this.countDown = 100;
                    FullCharge.visible = false;
                    ChargeBarTexture.frame = new PIXI.Rectangle(0, 0, 0, ChargeBarTexture.height);
                    nowScore = `000${nowScore * 1 - 1}`.slice(-3);
                    _renderComboNum();
                }
                ChargeBar.width = ChargeBarTexture.width * 1.38;
            }
            _statusContainer.chargeBarEventLoop.countDown = 100;
        }

        function _controllerContainer() {
            const MAX_RADIUS = 135;

            TouchBar = PixiUtils.genSprite('TouchBar');
            TouchBar.width = 218;
            TouchBar.height = 218;
            TouchBar.x = TouchBar.width + 38;
            TouchBar.y = gameHeight - TouchBar.height / 2 - 95;
            TouchBar.anchor.set(0.5, 0.5);
            TouchBar.buttonMode = true;
            TouchBar.on('touchstart', onDragStart)
            .on('touchmove', onDragMove)
            .on('touchendoutside', onDragEnd)
            .on('touchend', onDragEnd);

            let TouchBtn = PixiUtils.genSprite('TouchBtn');
            TouchBtn.width = 68;
            TouchBtn.height = 68;
            TouchBtn.x = TouchBar.x;
            TouchBtn.y = TouchBar.y;
            TouchBtn.anchor.set(0.5, 0.5);

            function onDragStart(event) {
                this.data = event.data;
                this.dragging = true;
                _renderRocker(this);
            }

            function onDragMove(event) {
                if (this.dragging) _renderRocker(this);
            }

            function onDragEnd(event) {
                this.dragging = false;
                this.data = null;
                TouchBtn.x = TouchBar.x;
                TouchBtn.y = TouchBar.y;
            }

            FireBtnTexture = PixiUtils.getTexture('FireBtn');
            FireBtnOriginWidth = FireBtnTexture.width;
            FireBtnTexture.frame = new PIXI.Rectangle(0, 0, FireBtnOriginWidth / 2, FireBtnTexture.height);
            FireBtn = new PIXI.Sprite(FireBtnTexture);
            FireBtn.width = 128;
            FireBtn.height = 128;
            FireBtn.x = gameWidth - FireBtn.width - 75;
            FireBtn.y = TouchBar.y - 8;
            FireBtn.rotation = -Math.PI / 4;
            FireBtn.anchor.set(0.5, 0.5);
            FireBtn.buttonMode = true;
            FireBtn.on('pointertap', () => {
                FireBtnTexture.frame = new PIXI.Rectangle(FireBtnOriginWidth / 2, 0, FireBtnOriginWidth / 2, FireBtnTexture.height);

                // TODO: 去抖 && 节流
                setTimeout(() => {
                    FireBtnTexture.frame = new PIXI.Rectangle(0, 0, FireBtnOriginWidth / 2, FireBtnTexture.height);
                }, 1000);
            });

            let LeftSwitchBtn = PixiUtils.genSprite('LeftSwitchBtn');
            LeftSwitchBtn.anchor.set(0.5, 0.5);
            LeftSwitchBtn.width = 88;
            LeftSwitchBtn.height = 88;
            LeftSwitchBtn.x = FireBtn.x - FireBtn.width / 4 * 2.5;
            LeftSwitchBtn.y = FireBtn.y + FireBtn.height / 4 * 2.5;
            let RightSwitchBtn = PixiUtils.genSprite('RightSwitchBtn');
            RightSwitchBtn.anchor.set(0.5, 0.5);
            RightSwitchBtn.width = 88;
            RightSwitchBtn.height = 88;
            RightSwitchBtn.x = FireBtn.x + FireBtn.width / 4 * 2.5;
            RightSwitchBtn.y = FireBtn.y - FireBtn.height / 4 * 2.5;
            // RightSwitchBtn.rotation = Math.PI;

            playViewStage.addChild(MenuBtn, TouchBar, TouchBtn, FireBtn, LeftSwitchBtn, RightSwitchBtn);

            function _renderRocker(touchTarget) {
                let {x, y} = touchTarget.data.getLocalPosition(touchTarget.parent), tmpPoint = {x, y};
                const tmpRadius = computedRadius(TouchBar, tmpPoint);
                if (tmpRadius > MAX_RADIUS) {
                    const targetPoint = computedAnglesToPoint(TouchBar, computedAngles(TouchBar, tmpPoint), MAX_RADIUS);
                    x = targetPoint.x;
                    y = targetPoint.y;
                }
                TouchBtn.x = x;
                TouchBtn.y = y;
            }
        }

        function _playContainer() {

            function _renderMap() {
            }

            function _renderPlayer() {
            }

            function _renderEnemy() {
            }
        }

        function _renderLoop(detail) {
            _statusContainer.comboNumEventLoop(detail);
            _statusContainer.chargeBarEventLoop(detail);
        }

        function _bindEvent() {
            MenuBtn.interactive = true;
            FireBtn.interactive = true;
            TouchBar.interactive = true;
        }

        function _unbindEvent() {
            MenuBtn.interactive = false;
            FireBtn.interactive = false;
            TouchBar.interactive = false;
        }
    }
}
window.play = play;
