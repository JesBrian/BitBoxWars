
/**
 * 计算两点之间距离
 * @param basePoint 原点
 * @param targetPoint 目标坐标点
 * @returns {number}
 */
const computedRadius = (basePoint = {x: 0, y: 0}, targetPoint = {x: 0, y: 0}) => {
  return Math.sqrt(Math.pow(targetPoint.x - basePoint.x, 2) + Math.pow(targetPoint.y - basePoint.y, 2));
};

/**
 * 计算两点之间角度
 * @param basePoint 原点
 * @param targetPoint 目标坐标点
 * @returns {number}
 */
const computedAngles = (basePoint = {x: 0, y: 0}, targetPoint = {x: 0, y: 0}) => {
  let x = Math.abs(basePoint.x - targetPoint.x);
  let y = Math.abs(basePoint.y - targetPoint.y);
  let z = computedRadius(basePoint, targetPoint);
  let cos = y / z;
  let radian = Math.acos(cos);//用反三角函数求弧度
  let angle = Math.floor(180 / (Math.PI / radian));//将弧度转换成角度

  // 目标坐标在第四象限
  if (targetPoint.x > basePoint.x && targetPoint.y > basePoint.y) angle = 180 - angle;

  // 目标坐标在y轴负方向上
  if (targetPoint.x == basePoint.x && targetPoint.y > basePoint.y) angle = 180;

  // 目标坐标在x轴正方向上
  if (targetPoint.x > basePoint.x && targetPoint.y == basePoint.y) angle = 90;

  // 目标坐标在第三象限
  if (targetPoint.x < basePoint.x && targetPoint.y > basePoint.y) angle = 180 + angle;

  // 目标坐标在x轴负方向
  if (targetPoint.x < basePoint.x && targetPoint.y == basePoint.y) angle = 270;

  // 目标坐标在第二象限
  if (targetPoint.x < basePoint.x && targetPoint.y < basePoint.y) angle = 360 - angle;

  return angle;
};

/**
 * 弧度转换角度
 * @param radian 弧度
 * @returns {number}
 */
const computedRadianToAngles = (radian = 0) => {
  return radian * 180 / Math.PI;
};

/**
 * 角度转换弧度
 * @param angles 角度
 * @returns {number}
 */
const computedAnglesToRadian = (angles = 0) => {
  return angles * Math.PI / 180;
};

/**
 * 弧度转换坐标
 * @param basePoint 原点
 * @param radian 角度
 * @param radius 半径
 * @returns {{x: number, y: number}}
 */
const computedRadianToPoint = (basePoint = {x: 0, y: 0}, radian = 0, radius = 0) => {
  return {
    x: Math.sin(radian) * radius + basePoint.x,
    y: basePoint.y - Math.cos(radian) * radius
  }
};

/**
 * 角度转换坐标 - [弧度转换坐标同理 -> 弧度转换角度再调用该方法]
 * @param basePoint 原点
 * @param angles 角度
 * @param radius 半径
 * @returns {{x: number, y: number}}
 */
const computedAnglesToPoint = (basePoint = {x: 0, y: 0}, angles = 0, radius = 0) => {
  return computedRadianToPoint(basePoint, computedAnglesToRadian(angles), radius);
};

export {
  computedRadius,
  computedAngles,
  computedRadianToAngles,
  computedAnglesToRadian,
  computedRadianToPoint,
  computedAnglesToPoint,
};
