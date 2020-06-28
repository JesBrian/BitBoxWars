import {stage, monitor, loader, ticker} from '../core/core.js';

/**
 * 加载全局组件
 */
import loading from './components/Loading/index.js';
import closeBtn from './components/CloseBtn/index.js';
import mainBtn from './components/MainBtn/index.js';

import entry  from './views/EntryView/index.js';

/**
 * 游戏主入口
 */
export default function main() {
    window.app = stage;

    window.loader = loader;
    window.ticker = ticker;


    window.loadResource = loading;
    window.closeBtn = closeBtn;
    window.mainBtn = mainBtn;

    entry();
}
