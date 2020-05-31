
/**
 * 需要加载的资源
 */
export const PLAY_LOAD_RESOURCE = {
  Stripes: 'images/stripes.png',
  TouchBar: 'images/ui/play/TouchBar.png',
};

/**
 * 游戏游玩入口
 */
export function play() {
  loadResource(PLAY_LOAD_RESOURCE).then(renderPlay);

  function renderPlay() {
    console.log('renderPlay');
  }
}
