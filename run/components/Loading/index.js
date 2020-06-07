
const LOADING_RESOURCE = {
  LoadingBg: 'images/loading/loadingBg.png',
  LoadingBar: 'images/loading/loadingBar.png'
};

/**
 * 通用加载资源组件
 * @param resource
 * @returns {Promise}
 */
export default function loading(resource = []) {
  return new Promise((resolve, reject) => {
    let loadingStage = new PIXI.Container(),
      loadingError = false, loadingFinish = false,
      nowLoading = 10, maxLoading = 699,
      bunny1, sprite, texture;

    if (loading.hasInit) loadComplete();
    else app.loader.add('loadingBg', 'images/loading/loadingBg.png').add('loadingBar', 'images/loading/loadingBar.png').load(loadComplete);

    app.stage.addChild(loadingStage);

    function loadComplete() {
      bunny1 = PIXI.Sprite.from('loadingBg');
      bunny1.anchor.set(0.5, 0.5);
      bunny1.x = gameWidth * 0.5;
      bunny1.y = gameHeight * 0.68;
      loadingStage.addChild(bunny1);

      texture = PIXI.utils.TextureCache['loadingBar'];
      texture.frame = new PIXI.Rectangle(0, 0, nowLoading, 32);
      sprite = new PIXI.Sprite(texture);
      sprite.anchor.set(0, 0.5);
      sprite.x = (gameWidth - bunny1.width) * 0.5;
      sprite.y = gameHeight * 0.68;
      loadingStage.addChild(sprite);

      app.ticker.add(_loadingLoop);
      loading.hasInit = true;

      if (resource) {
        for (let key in resource) {
          // TODO: 判断是否是曾经加载过的资源
          app.loader.add(key, resource[key]);
        }
        app.loader.once('error', (loader) => {
          loadingError = true;
          return reject();
        }).once('complete', () => {
          loadingFinish = true;
          if (_checkEnd()) {
            _finishEvent();
            return resolve();
          }
        }).load();
      } else {
        return resolve();
      }
    }

    function _checkEnd() {
      return (loadingStage && nowLoading >= maxLoading && loadingFinish);
    }

    function _loadingLoop() {
      if (_checkEnd()) {
        _finishEvent();
        return resolve();
      }
      nowLoading += 5;
      loadingStage.removeChild(sprite);
      texture.frame = new PIXI.Rectangle(0, 0, nowLoading, 32);
      sprite = new PIXI.Sprite(texture);
      sprite.anchor.set(0, 0.5);
      sprite.x = (gameWidth - maxLoading) * 0.5;
      sprite.y = gameHeight * 0.68;
      loadingStage.addChild(sprite);
    }

    function _finishEvent() {
      if (loadingError || _finishEvent.hasRun) return;
      app.stage.removeChild(loadingStage);
      app.ticker.remove(_loadingLoop);
      _finishEvent.hasRun = true;
    }
  });
}
