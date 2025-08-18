//获取元素对象下标
function getElementIdx(item) {
  var elements = item.parentNode.children;
  for (var i = 0, len = elements.length; i < len; i++) {
    if (item === elements[i]) {
      return i;
    }
  }
}

/**
 * @description: 实现监听并解除监听(匿名函数也可用)
 * @param {Object} element 需要监听的DOM对象
 * @param {String} type 事件类型 click mouseenter
 * @param {Function} fn 监听绑定的回调函数
 * @param {Boolean} capture true 捕获阶段监听 false 冒泡阶段监听 
 * @return {JSON} "remove":Function 返回一个用于解除监听的函数
 */
function eventListener(element, type, fn, capture) {
  capture = capture || false; //默认值为 false
  if (element.addEventListener) {
    //标准浏览器写法
    element.addEventListener(type, fn, capture);
  } else {
    //IE兼容写法
    element.attachEvent("on" + type, fn);
  }

  return {
    'remove': function () {
      if (element.removeEventListener) {
        element.removeEventListener(type, fn, false);
      } else {
        element.detachEvent("on" + type, fn);
      }
    }
  }
}


//获取节点
function $(ele) {
  return document.querySelector(ele);
}
function $$(ele) {
  return document.querySelectorAll(ele);
}

//获取元素实际样式
function getStyle(obj, attr) {//标签,属性
  return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];
}

//设置元素样式
function setStyle(dom, css) {
  for (var key in css) {
    dom['style'][key] = css[key];
  }
}

//transition 运动框架
function animate(ele, styleJson, time, speed, callback) {//运动框架
  time = time || 500;
  speed = speed || 'linear';
  ele.style.transition = `${time}ms ${speed}`;
  setStyle(ele, styleJson);//设置要改变的样式
  ele.addEventListener('transitionend', end);
  function end() {
    callback && callback();
    ele.removeEventListener('transitionend', end);
    ele.style.transition = '0';
  }
}
//定时器运动框架
function animate(ele, json, callback) {
  clearInterval(ele.time);//保证每一次都只有一个定时器在运行
  var toggle = false;
  var currLeft = parseInt(getStyle(ele, 'left'));
  ele.time = setInterval(function () {
    //每次定时循环都暂且认为他们都可以达到最终结果
    toggle = true;
    for (var key in json) {
      var target = parseInt(json[key])
      curr = parseInt(getStyle(ele, key));
      speed = (target - curr) / 10;
      speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
      if (curr === target) {
        //width 先到了指定值了 定时器结束了 
        ele.style[key] = target + 'px';
      }
      ele.style[key] = curr + speed + 'px';
      if (curr !== target) {
        //只要有某一个属性的值不到指定结果 关闭锁
        toggle = false;
      }
    }
    if (toggle) {
      clearInterval(ele.time);
      callback && callback();
    }
  }, 1000 / 60);
}

//获取元素到浏览器原点的距离
function getPosition(element) {
  var pos = {
    left: 0,
    top: 0
  }
  while (element.offsetParent) {
    pos.left += element.offsetLeft;
    pos.top += element.offsetTop;
    element = element.offsetParent;
  }
  return pos;
}

//日期格式化
function formatDate(format, data) { // ◆ 使用prototype定义原型方法
  var data = data || new Date();
  /*
   * eg:format="YYYY-MM-dd hh:mm:ss";
   */
  var o = { // ◆ 键值对形式的数组。只能通过加强的for循环来迭代取值
    "M+": data.getMonth() + 1, // month
    "d+": data.getDate(), // day
    "h+": data.getHours(), // hour
    "m+": data.getMinutes(), // minute
    "s+": data.getSeconds(), // second
    "q+": Math.floor((data.getMonth() + 3) / 3), // quarter (季度)
    "S": data.getMilliseconds()
    // millisecond (毫秒)
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (data.getFullYear() + "") // ◆ RegExp.$1 : 取正则表达式中第一个分组匹配到的内容
      .substr(4 - RegExp.$1.length));
  }
  for (var k in o) { // ◆ 加强的for循环。k为键值对数组o中的键，故o[k]为对应的值
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));// ◆ 这里的逻辑很好
    }
  }
  return format;
}

/*
*@static _regValue 金额验证
*@param {String} str 金额
*@return {String} 修正后金额
*/
function _regValue(value) {

  //非数字验证
  value = value.replace(/[^\d\.]+/g, '');

  //强制保留两位小数
  var doubleReg = /^(\d+)\.(\d\d).*$/;
  value = value.replace(doubleReg, '$1.$2');

  //开始非零验证
  value = value.replace(/^(0)(\d)$/, '$2');

  //小数点验
  value = value.replace(/^(\.+)$/, '0.');
  value = value.replace(/^(\d*)(\.+)$/, '$1.');

  //巨大数值
  value = value.replace(/^(\S{8})(\S+)$/, '$1');

  //只保留一个 .
  value = value.replace(/(\d+\.)(\d)(\.+)/, '$1$2');

  return value;
}

//柯里化函数
function currying(fn) {
  let args = [].slice.call(arguments, 1);
  let inlay = function () {
    if (arguments.length === 0) {
      return fn.apply(this, args);
    }
    // args.push.apply(args, arguments);
    args.push(...arguments);//解构实参列表
    return inlay;
  }
  return inlay;
}

//判断某个函数是否是bind的产物
const isBoundFuns = (funs) => (
  console.log(funs.name), /bound/ig.test(funs.name)
)

//通道函数
const pipe = (...funcs) => (input) => funcs.reduce((acc, curr) => curr(acc), input);

//多重继承
function mixProto(targetClass, parentClass, otherParent) {
  targetClass.prototype = Object.create(parentClass.prototype);
  Object.assign(targetClass.prototype, otherParent.prototype);
  targetClass.prototype.constructor = targetClass;
}

//Object.defineProperty()的封装
function defineReactive(obj, key, val, setBack, getBack) {
  Object.defineProperty(obj, key, {
    set(newVal) {
      if (newVal === val) return;
      val = newVal;
      setBack && setBack(newVal);
    },
    get() {
      return val;
    }
  });
}

//深拷贝(本质:把每个值递归成基础类型)
function deepCopy(original) {
  if (Array.isArray(original)) {
    const copy = [];
    for (const [index, value] of original.entries()) {
      copy[index] = deepCopy(value);
    }
    return copy;
  }
  if (typeof original === 'object' && original !== null) {
    const copy = {};
    for (const [key, value] of Object.entries(original)) {
      copy[key] = deepCopy(value);
    }
    return copy;
  }
  // 基础类型无需拷贝
  return original;
}

//彻底冻结对象
let constantize = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach((key, i) => {
    if (typeof obj[key] === 'object') {
      constantize(obj[key]);
    }
  })
}

// 节流函数
/**
 * 
 * @param { Function } fn 需要节流的函数 
 * @param { Number } delay 节流时间，默认500ms
 * @returns 
 */
function throttle(fn, delay = 500) {
  let time = Date.now()
  return function () {
    if (Date.now() - time > delay) {
      time = Date.now()
      fn.call(this, ...arguments)
    }
  }
}

// 防抖函数
/**
 * 
 * @param { Function } fn 需要防抖的函数 
 * @param { Number } delay 防抖时间，默认500ms
 * @returns 
 */
function debounce(fn, delay = 500) {
  let timer = null
  return function () {
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      fn.call(this, ...arguments) // this指向调用者
    }, delay)
  }
}