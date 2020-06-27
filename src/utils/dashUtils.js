
const noop = () => {};

function debounceOrThrottle({fn, wait = 300, immediate = false, executeOncePerWait = false}) {
  if (typeof fn !== 'function') {
    throw new Error('fn is expected to be a function')
  }

  let tId = null, _this = null, args = null, lastTriggerTime = null, result = null, lastExecutedTime = null;

  const later = function () {
    const last = Date.now() - (executeOncePerWait ? lastExecutedTime : lastTriggerTime);
    if (last < wait && last > 0) {
      setTimeout(later, wait - last);
    } else {
      if (!immediate) {
        executeOncePerWait && (lastExecutedTime = Date.now());
        result = fn.apply(_this, args);
        _this = args = null;
      }
      tId = null;
    }
  }

  return function () {
    _this = this;
    args = arguments;
    !executeOncePerWait && (lastTriggerTime = Date.now());
    const callNow = immediate && !tId;

    if (!tId) {
      executeOncePerWait && (lastExecutedTime = Date.now());
      tId = setTimeout(later, wait);
    }

    if (callNow) {
      executeOncePerWait && (lastExecutedTime = Date.now());
      result = fn.apply(_this, args);
      _this = args = null;
    }

    return result;
  }
}

/**
 * 防抖
 * @param fn
 * @param wait
 * @param immediate
 * @returns {function(): null}
 */
const debounce = ({fn, wait, immediate}) => debounceOrThrottle({fn, wait, immediate});

/**
 * 节流
 * @param fn
 * @param wait
 * @param immediate
 * @returns {function(): null}
 */
const throttle = ({fn, wait, immediate = true}) => debounceOrThrottle({fn, wait, immediate, executeOncePerWait: true});

/**
 * 加载子模块
 * @param moduleName
 * @returns {Promise}
 */
const loadSubModule = (moduleName = '') => {
  return new Promise((resolve, reject) => {
    if (!moduleName) return reject(new Error('请输入模块名'));
    const loadTask = wx.loadSubpackage({
      name: `${moduleName}Module`,
      success: res => {
        return resolve(res);
      },
      fail: err => {
        return reject(err);
      }
    });
  });
}

export default {
  noop, debounce, throttle, loadSubModule
};
