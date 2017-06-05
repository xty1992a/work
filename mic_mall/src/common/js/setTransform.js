(function (window) {
  window.setTransform = function (dom, name, value) {
    if (!dom.transform) {
      dom.transform = {};
    }
    let result = '';
    if (arguments.length > 2) {//写
      dom.transform[name] = value;
      'translate3d' + '0,0,0'
      for (var item in dom.transform) {
        switch (item) {
          case 'scale':
          case 'scaleX':
          case 'scaleY':
          case 'scaleZ':
            result += item + '(' + dom.transform[item] + ') ';
            break;
          case 'translate':
          case 'translateX':
          case 'translateY':
          case 'translateZ':
            result += item + '(' + dom.transform[item] + 'px) ';
            break;
          case 'rotate':
          case 'rotateX':
          case 'rotateY':
          case 'rotateZ':
            result += item + '(' + dom.transform[item] + 'deg) ';
            break;
          case 'translate3d':
            var value = dom.transform[item].split(',')
            var x = value[0],y = value[1],z = value[2]
            result += 'translate3d('+x+'px,'+y+'px,'+z+'px)';
            break;
        }
      }
      dom.style.transform = result;
    } else {//读
      if (dom.transform[name]) {//已添加transform对象,返回transform内值
        return dom.transform[name];
      } else {//未添加transform对象,返回默认值
        if (name === 'scale' || name === 'scaleX' || name === 'scaleY') {
          return 1;
        } else {
          return 0;
        }
      }
    }
  };
  window.dragNav = function (wrap,callback) {
    let screenH = document.documentElement.clientHeight;
    let content = wrap.children[0];
    let startTime = 0;
    let endTime = 0;
    let startY = 0;
    let timer = 0;
    let speed = 0;
    let gapY = 0;
    let eleY = 0;

    wrap.addEventListener('touchstart', function (ev) {
      speed = gapY = endTime = startTime = 0;

      startY = ev.changedTouches[0].clientY;
      eleY = setTransform(content, 'translateY');
      startTime = new Date().getTime();
      clearInterval(timer);
      if(callback&&callback['start']){
        callback.start();
      }
    });

    wrap.addEventListener('touchmove', function (ev) {
      let currentY = ev.changedTouches[0].clientY;
      gapY = currentY - startY;
      let translateY = gapY + eleY;

      //屏幕高度与内容高度的差,即内容允许上移的最大值(该值为负)
      let minY = screenH - content.offsetHeight;
      let scale = 0;

      //移动到两端,继续拉动.
      if (translateY > 0) {
        scale = 1 - translateY / screenH;
        translateY = translateY * scale
      }
      if (translateY < minY) {//(移动量绝对值大于差值绝对值)   -10<-5    即内容区被拖离顶部.
        let over = minY - translateY;//移动量超出差值部分.   -5--10    必然为正.
        scale = 1 - over / screenH;  //求出一个比值,超出越多,该比值越小. 超出值/屏高递增,用1-它,结果递减
        translateY = minY - over * scale;//在最大差值的基础上加上一个越来越小的移动量
      }
      setTransform(content, 'translateY', translateY);
      if(callback&&callback['move']){
        callback.move();
      }

    });

    wrap.addEventListener('touchend', function () {
      endTime = new Date().getTime();
      let gapTime = endTime - startTime;
      //只有用户快速滑动时,才允许加速度产生.
      if(gapTime<300){
        //取得用户抬起手指之前的滑动速度.
        speed = gapY / gapTime;
      }
      //快速滑动时,自动滑动100ms的移动距离.
      let target = setTransform(content, 'translateY') + speed * 300;
      //自动滑动默认匀速.
      let type = 'linear';
      //滑动到两端时,使用回弹;
      if (target > 0) {
        target = 0;
        type = 'easeOut';
      }
      if (target < screenH - content.offsetHeight) {
        target = screenH - content.offsetHeight;
        type = 'easeOut';
      }
      time = Math.abs(speed*.3);
      time = time<.3?.3:time;
      timer = move(content,time,target,type);

      setTransform(content, 'translateY', target);
    });
    move = function (dom, time, target, type) {
      let t = 0;
      let b = setTransform(dom, 'translateY'),
          c = target - b,
          d = time / .02;
      /*  t: step,当前步骤
       b: 初始位置
       c: 变化量(移动量)
       d: 总步骤          */
      let timer = setInterval(function () {
        t++;
        var point = tween[type](t, b, c, d);
        setTransform(dom, 'translateY', point);
        // callback && callback.move();
        if (t > d) {
          if(callback&&callback['end']){
            callback['end']();
          }
          clearInterval(timer);
        }
      }, 10);
      return timer;
    };
  };
  window.tween = {
    linear: function (t, b, c, d) {
      return c * t / d + b;
    },
    easeOut: function (t, b, c, d, s) {
      if (s == undefined) s = 1.70158;
      let scale = ((t = t / d - 1) * t * ((s + 1) * t + s) + 1);
      // console.log(scale);
      return c * scale + b;
    }
  };

})(window);