
jQuery.extend({
  // 打开弹窗
  dialog_open: function (options) {
    var width = options.width || 800 // 弹窗宽度
    var title = options.title || '' // 弹窗标题
    var groups = options.groups || [] // 弹窗底部标签组
    var columns = options.columns || [] // 表格列数据
    var datas = options.datas || [] // 表格行数据
    var operates = options.operates || [] // 表格操作列标签组
    var onclose = options.onclose // 关闭弹窗回调函数

    // 处理数据
    datas.forEach(function (v, i) {
      v.index = i + 1;
      v.operates = '<div style="display: flex; justify-content: space-around">' + operates.map(function (o) {
        return '<' + (o.tag || "button") + ' class="' + o.class + '" style="cursor: pointer" data-index="' + i + '">' + o.name + '</' + (o.tag || "button") + '>'
      }).join(' ') + '</div>';
    })

    // 内部样式表
    var style = '<style>.wrapper::after { content: ""; display: inline-block; height: 100%; width: 0; vertical-align: middle } table { width: 100%; border-collapse: collapse } th, td { padding: 2px 4px; height: 24px }</style>'
    $("head").append(style)

    $("body").append("<div class='_dialog'><div class='wrapper'><div class='main'></div></div><div class='shadow'></div></div>")

    // 遮罩层样式
    $(".shadow").css({
      position: "fixed",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      background: "#000",
      opacity: 0.2,
      zIndex: 100
    })

    // 弹窗外部盒子样式
    $(".wrapper").css({
      position: "fixed",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      textAlign: "center",
      zIndex: 111
    })

    // 弹窗样式
    $(".main").css({
      display: "inline-block",
      width: width,
      verticalAlign: "middle",
      background: "#fff",
      border: "1px solid #ccc",
    })

    // 右上角关闭图标
    var icon = '<svg xmlns="http://www.w3.org/2000/svg" width="28px" height="28px"><line x1="7" y1="7" x2="21" y2="21" stroke="#575757" stroke-width="2" /><line x1="7" y1="21" x2="21" y2="7" stroke="#575757" stroke-width="2" /></svg>'

    // 弹窗内容
    var main = '<div class="header"><div style="text-align: left; padding-left: 20px">' + title + '</div><i style="position: absolute; right: 12px; top: 2px; height: 28px; cursor: pointer" class="close">' + icon + '</i></div><div class="content" style="padding: 10px 12px; font-size: 12px"></div><div class="footer" style="padding: 0 12px 10px; text-align: right"></div>'
    $(".main").append(main)

    // 弹窗头部样式
    $(".header").css({
      position: "relative",
      padding: "2px 12px",
      borderBottom: "1px solid #f0f0f0",
      font: "600 13px/28px ''",
      color: "#575757",
      background: "#d6d6d6",
      userSelect: "none",
      cursor: "move"
    })

    // 弹窗底部内容
    var footer = groups.length ? groups.map(function (v) {
      return '<' + v.tag + ' id=' + v.id + ' style="display: inline-block; cursor: pointer">' + v.name + '</' + v.tag + '>'
    }).join(' ') : ''
    $(".footer").append(footer)

    // 弹窗表格表头
    var table_head = '<div class="table-head"><table border><tr>' + columns.map(function (v) {
      return '<th class="head-' + v.prop + '" width="' + v.width + '" align="' + v.align + '">' + v.name + '</th>'
    }).join('') + '</tr></table></div>'

    // 弹窗表格内容
    var table_body = '<div class="table-body"><div class="scrollbar-track"><span class="scrollbar-thumb"></span></div><table border>' + (datas.length ? datas.map(function (v, i) {
      return '<tr>' + columns.map(function (c) {
        return '<td class="body-' + c.prop + '" width="' + c.width + '" align="' + c.align + '">' + v[c.prop] + '</td>'
      }).join('') + '</tr>'
    }).join('') : '<tr><td colspan="' + columns.length + 2 + '" style="padding: 30px">暂无数据</td></tr>') + '</table></div>'

    var table = table_head + table_body
    $(".content").append(table)

    // 弹窗表格表头样式
    $(".table-head").css({
      overflowY: "hidden",
      textAlign: "center",
      background: "#e0f1ff"
    })

    // 弹窗表格盒子样式
    $(".table-body").css({
      height: $(".shadow")[0].getBoundingClientRect().height * 0.4 + "px",
      overflowY: "hidden",
      position: "relative",
      border: "1px solid #aaa",
      borderTop: "none"
    })

    // 弹窗表格样式
    $(".table-body table").css({
      position: "absolute",
      borderTop: "none",
      borderLeft: "none",
      borderRight: "none",
      top: 0,
      transition: '30ms'
    })

    // 自定义滚动条样式
    $(".scrollbar-track").css({
      display: "none",
      position: "absolute",
      borderRadius: 3,
      right: 1,
      top: 0,
      bottom: 0,
      width: 6,
      background: "#ccc",
    })

    var scale = $('.table-body').height() / $(".table-body table").height() // 比例
    var thumbH = $(".scrollbar-track").height() * scale // 滚动条滑块高度

    // 自定义滚动条滑块样式
    $(".scrollbar-thumb").css({
      position: "absolute",
      borderRadius: 2,
      width: 4,
      height: thumbH,
      left: 1,
      top: 0,
      background: "#aaa",
      transition: '30ms'
    })

    // 表格操作栏按钮组
    operates.forEach(function (v) {
      var _class = '.' + v.class
      $(_class).click(function (e) {
        v.fun && v.fun(e, datas[+this.dataset.index], +this.dataset.index)
      })
    })

    // 弹窗底部按钮组
    groups.forEach(function (v) {
      var _id = '#' + v.id
      $(_id).click(function () {
        v.fun && v.fun()
      })
    });

    // 点击关闭按钮
    $(".close").click(function () {
      onclose && onclose()
    })

    // 点击非弹窗区域
    $("._dialog").click(function (e) {
      $(".main")[0] && !$(".main")[0].contains(e.target) && !$(".main")[0].isEqualNode(e.target) && onclose && onclose()
    })

    // 拖拽
    $(".header").mousedown(function (e1) {
      let W = $(".main")[0].getBoundingClientRect().width
      let H = $(".main")[0].getBoundingClientRect().height
      let X = e1.clientX - $(".main")[0].getBoundingClientRect().left
      let Y = e1.clientY - $(".main")[0].getBoundingClientRect().top
      document.body.onmousemove = function (e2) {
        var L = e2.clientX - X
        var T = e2.clientY - Y
        if (L < 0) L = 0
        if (L > window.innerWidth - W) L = window.innerWidth - W
        if (T < 0) T = 0
        if (T > window.innerHeight - H) T = window.innerHeight - H
        $('.main').css({ 'position': 'absolute', 'left': L + 'px', 'top': T + 'px' })
      }
      document.body.onmouseup = function () {
        document.body.onmousemove = null
      }
      document.body.onmouseleave = function () {
        document.body.onmousemove = null
      }
    })

    $('.table-body').mouseover(function () {
      if ($(".table-body").height() < $(".table-body table").height()) {
        $(".scrollbar-track").css("display", "block")
      }
    })
    $('.table-body').mouseout(function () {
      $(".scrollbar-track").css("display", "none")
    })

    // 滚动
    if (window.addEventListener) {
      if ($(".table-body").height() < $(".table-body table").height()) {
        $(".table-body")[0].addEventListener("wheel", function (e) {
          var ev = e || window.event;
          ev.preventDefault();
          if (ev.deltaY > 0) {
            if (thumbH + parseFloat($(".scrollbar-thumb").css("top")) > $(".scrollbar-track").height()) return $(".table-body table").css("top", $(".table-body").height() - $(".table-body table").height() + "px")
            var speed = 5 // 向下滚动步长速度【可自行调整】
          } else {
            if (parseFloat($(".scrollbar-thumb").css("top")) < 0) return $(".table-body table").css("top", "0px")
            var speed = -5 // 向上滚动步长速度【可自行调整】
          }
          $(".scrollbar-thumb").css("top", parseFloat($(".scrollbar-thumb").css("top")) + speed + "px")
          $(".table-body table").css("top", parseFloat($(".table-body table").css("top")) - speed / scale + "px")
        }, {
          passive: false
        })
      }
    } else {
      console.warn('当前浏览器版本不支持');
    }
  },
  // 关闭弹窗
  dialog_close: function () {
    $('._dialog').html('')
  }
});
