/*!
 @Title: hg-layui-admin-ui
 @Description：经典模块化前端 UI 框架
 @Site: www.layui.com
 @Author: 一如既往
 @License：MIT
 */
;!function (win) {
  "use strict";
  var doc = document,
    HG = function () {
      this.v = '1.0.0';
    },
    FORM = function () {
      this.v = '1.0.0';
    },
    TABLE = function() {
      this.v = '1.0.0';
    },
    TREE = function() {
      this.v = '1.0.0';
    }

  // 添加tabs页
  HG.prototype.add_tab = function (title, url, is_refresh) {
    var id = url;
    for (var i = 0; i < $('.hg-iframe').length; i++) {
      if ($('.hg-iframe').eq(i).attr('tab-id') == id) {
        element.tabChange('xbs_tab', id);
        if (is_refresh)
          $('.hg-iframe').eq(i).attr("src", $('.hg-iframe').eq(i).attr('src'));
        return;
      }
    };
    this.add_lay_tab(title, url, id);
    element.tabChange('xbs_tab', id);
  }
  // 移除tabs页
  HG.prototype.del_tab = function (id) {
    if (id) {
      parent.element.tabDelete('xbs_tab', id);
    }
  }
  // 添加tabs内容
  HG.prototype.add_lay_tab = function (title, url, id) {
    element.tabAdd('xbs_tab', {
      title: title,
      content: '<iframe tab-id="' + id + '" frameborder="0" allowpaymentrequest=true allowfullscreen=true src="' + url + '" scrolling="yes" class="hg-iframe"></iframe>',
      id: id
    })
    hg.NProgress(id);
  }
  /**
   * [open 打开弹出层]
   * @param  {[type]}  title [弹出层标题]
   * @param  {[type]}  url   [弹出层地址]
   * @param  {[type]}  w     [宽]
   * @param  {[type]}  h     [高]
   * @param  {Boolean} full  [全屏]
   * @return {[type]}        [description]
   */
  HG.prototype.open = function (title, url, w, h, full) {
    if (title == null || title == '') {
      var title = false;
    };
    if (url == null || url == '') {
      var url = "404.html";
    };
    if (w == null || w == '') {
      var w = ($(window).width() * 0.9);
    };
    if (h == null || h == '') {
      var h = ($(window).height() - 50);
    };
    var index = layer.open({
      type: 2,
      area: [w + 'px', h + 'px'],
      fix: false, //不固定
      maxmin: true,
      shadeClose: true,
      shade: 0.4,
      title: title,
      content: url
    });
    if (full) {
      layer.full(index);
    }
  }
  /**
   * [close 关闭弹出层]
   * @return {[type]} [description]
   */
  HG.prototype.close = function () {
    var index = parent.layer.getFrameIndex(window.name);
    parent.layer.close(index);
  };
  /**
   * [base_reload 刷新父窗口]
   * @return {[type]} [description]
   */
  HG.prototype.base_reload = function () {
    parent.location.reload();
  };
  // NProgress 请求进度条
  HG.prototype.NProgress = function(id){
    if(typeof NProgress == 'undefined') return false;
    var iframe = $('iframe.hg-iframe[tab-id="'+id+'"]');
    if(iframe.length>0){
      NProgress.done();
      NProgress.remove();
      NProgress.start();
      iframe.eq(0)[0].onload = function() { // iframe加载完成后事件
        NProgress.start();
        NProgress.done();
        setTimeout(function(){NProgress.remove();},200);
        // console.log("iframe加载完了！！");
      };
    }
  }
  /**
   * [msg 弹出提示框]
   * @param  {[type]}  content [提示框内容]
   * @param  {[type]}  title   [提示框标题]
   * @param  {[type]}  time    [自动关闭]
   */
  HG.prototype.msg = function (content, title, time) {
    var _title = '提示';
    var _time = 0;
    if (title) {
      _title = title;
    }
    if(typeof time==='number'){
      _time = time;
    }
    if(parent.layer){
      parent.layer.alert(content, {
        title: _title,
        skin: 'layui-layer-lan',
        closeBtn: 0,
        time: _time,
        anim: 5 //动画类型
      });
    }
    else{
      layer.alert(content, {
        title: _title,
        skin: 'layui-layer-lan',
        closeBtn: 0,
        time: _time,
        anim: 5 //动画类型
      });
    }
  }
  /**
   * [msghide 弹出半透明提示层]
   * @param  {[type]}  content [提示框内容]
   * @param  {[type]}  time    [自动关闭]
   */
  HG.prototype.msghide = function (content, time) {
    var _time = 2000;
    if(typeof time==='number'){
      _time = time;
    }
    if(parent.layer){
      parent.layer.msg(content, {
        time: _time
      });
    }
    else{
      layer.msg(content, {
        time: _time
      });
    }
  }
  /**
   * [load 弹出加载层]
   * @param  {[type]}  callbackmething [执行函数]
   */
  HG.prototype.load = function(callbackmething) {
    layer.load();
    var result = {close:function(){
      layer.closeAll('loading');
    }}
    callbackmething.call(result);
    return result;
  }
  /**
   * [confirm 弹出询问框]
   * @param  {[type]}  content [提示框内容]
   * @param  {[type]}  title   [提示框标题]
   * @param  {[type]}  callbackmething [执行函数]
   */
  HG.prototype.confirm = function (content, title, callbackmething) {
    var _title = '提示';
    var _callback = callbackmething;
    if (typeof title === "function") {
      _callback = title;
    } else {
      _title = title;
    }

    layer.confirm(content, {
      title: _title,
      skin: 'layui-layer-lan',
      closeBtn: 0,
      anim: 5
    },
      function (index) {
        if (typeof _callback === "function") {
          _callback();
        }
        layer.close(index);
      });
  }
  /**
   * [datetime 基本日期框]
   * @param  {[type]}  btime   [开始日期元素]
   * @param  {[type]}  etime   [结束日期元素]
   * @param  {[type]}  options [初始化属性]
   * @param  {[type]}  type    [时间类型]
   * @param  {[type]}  value   [初始值]
   */
  HG.prototype.datetime = function (btime, etime, options) {
    var ops = {
      type: 'date', //选择类型
      value: null, //默认值1
      value2: null, //默认值2
      min: '2001-01-01', //最小时间1
      min2: '2001-01-01', //最小时间2
      max: this.getdate(), //最大时间1
      max2: '2099-12-31' //最大时间2
    }
    $.extend(ops, options);

    var _type = ops.type;
    if (ops.type === 'dt') {
      _type = 'datetime';
    }
    if (ops.type === 't') {
      _type = 'time';
    }
    if (ops.type === 'y') {
      _type = 'year';
    }
    if (ops.type === 'm') {
      _type = 'month';
    }
    layui.use(['laydate'], function () {
      var laydate = layui.laydate;
      if (btime) {
        var date = laydate.render({
          elem: btime,
          type: _type,
          min: ops.min,
          max: ops.max,
          value: ops.value
        });
      }
      if (etime) {
        laydate.render({
          elem: etime,
          type: _type,
          min: ops.min2,
          max: ops.max2,
          value: ops.value2
        });
      };
    });
  }
  /**
   * [datetime2 组合日期框]
   * @param  {[type]}     elem   [绑定元素]
   * @param  {[type]}     type   [选择类型]
   * @param  {[type]}     min    [最小范围]
   * @param  {[type]}     max    [最大范围]
   */
  HG.prototype.datetime2 = function (elem, type, min, max) {
    var _type = 'date';
    if (type && type === 'datetime' || type === 'dt') {
      _type = 'datetime';
    }
    if (type && type === 'time' || type === 't') {
      _type = 'time';
    }
    if (type && type === 'year' || type === 'y') {
      _type = 'year';
    }
    if (type && type === 'month' || type === 'm') {
      _type = 'month';
    }
    var _min = '2001-01-01';
    var _max = '2099-12-31';
    if (min && typeof min === 'string') {
      _min = min;
    }
    if (max && typeof max === 'string') {
      _max = max;
    }
    layui.use(['laydate'], function () {
      var laydate = layui.laydate;
      if (elem) {
        laydate.render({
          elem: elem,
          type: _type,
          range: true,
          min: _min,
          max: _max
        });
      }
    });
  }
  /**
   * [getdate 获取日期时间]
   * @param  {[type]}     type   [获取日期类型]
   * @param  {[type]}     e      [特定返回值]
   */
  HG.prototype.getdate = function (type, e) {
    var _type = 'date';
    if (type && type === 'datetime' || type === 'dt') {
      _type = 'datetime';
    }
    var dd = new Date();
    if (typeof e === 'number' && e <= -1) { //过去日期
      dd.setDate(dd.getDate() + e);
    }
    var y = dd.getFullYear();
    var mm = dd.getMonth() + 1;
    mm = (mm < 10 ? '0' : '') + mm;
    var d = dd.getDate();
    d = (d < 10 ? '0' : '') + d;
    var h = dd.getHours();
    h = (h < 10 ? '0' : '') + h;
    var m = dd.getMinutes();
    m = (m < 10 ? '0' : '') + m;
    var s = dd.getSeconds();
    s = (s < 10 ? '0' : '') + s;
    if (e && e === 1 || e === '01') { // 本月1号
      d = '01';
      h = '00';
      m = '00';
      s = '00';
    }
    if (e && e === 2 || e === '23:59:59') { // 当日结束时间
      h = '23';
      m = '59';
      s = '59';
    }
    if (_type == 'datetime') {
      return y + "-" + mm + "-" + d + " " + h + ":" + m + ":" + s;
    } else {
      return y + "-" + mm + "-" + d;
    }
  }
  /**
   * [request 网络请求]
   * @param  {[type]}  url     [请求后台地址]
   * @param  {[type]}  data    [请求参数]
   * @param  {[type]}  type    [请求方式]
   * @param  {[type]}  contentType    [上传数据类型]
   * @param  {[type]}  dataType       [返回数据类型]
   * @param  {[type]}  async          [异步请求]
   * @param  {[type]}  funSuccess     [请求成功后的回调函数]
   */
  HG.prototype.request = function (url, data, type, contentType, dataType, async, funSuccess) {
    try {
      var _callback = null;
      if (url && data) {
        _callback = typeof data === 'function' ? data : _callback;
        _callback = typeof type === 'function' ? type : _callback;
        _callback = typeof contentType === 'function' ? contentType : _callback;
        _callback = typeof dataType === 'function' ? dataType : _callback;
        _callback = typeof async === 'function' ? async : _callback;
        _callback = typeof funSuccess === 'function' ? funSuccess : _callback;
      } else {
        console.error("request 网络请求前2个参数必须指定.");
      }
      $.ajax({
        url: url,
        data: typeof (data) === 'function' ? '' : data,
        type: typeof (type) === 'string' ? type : 'GET',
        contentType: typeof (contentType) === 'string' ? contentType : 'application/json;charset=utf-8',
        dataType: typeof (dataType) === 'string' ? dataType : 'json',
        async: typeof (async) === 'boolean' ? async : true,
        success: function (data) {
          if (_callback) {
            _callback(data);
          }
        },
        error: function () {
          this.msg("网络请求失败！");
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
  /**
   * [ontab 监听Tab切换事件]
   * @param  {[type]}  layfilter  [过滤器]
   * @param  {[type]}  _callback  [回调方法]
   * @return {[type]} [description]
   */
  HG.prototype.ontab = function (layfilter, _callback) {
    layui.use('element', function(){
      var element = layui.element;
      element.on('tab('+layfilter+')', _callback);
    });
  };
  /**
   * [onsubmit 监听表单提交事件]
   * @param  {[type]}  layfilter  [过滤器]
   * @param  {[type]}  _callback  [回调方法]
   */
  FORM.prototype.onsubmit = function (layfilter, _callback) {
    layui.use('form', function () {
      var form = layui.form;
      form.on('submit(' + layfilter + ')', function (data) {
        _callback(data.field);
        return false;
      });
    });
  }
  /**
   * [onswitch 监听switch操作事件]
   * @param  {[type]}  layfilter  [过滤器]
   * @param  {[type]}  _callback  [回调方法]
   */
  FORM.prototype.onswitch = function (layfilter, _callback) {
    layui.use('form', function () {
      var form = layui.form;
      form.on('switch(' + layfilter + ')', function (data) {
        _callback(data);
        return false;
      });
    });
  }
  /**
   * [verify 表单自定义验证规则]
   * @param  {[type]}  options    [规则对象]
   */
  FORM.prototype.verify = function (options) {
    layui.use('form', function () {
      var form = layui.form;
      form.verify(options || {});
    });
  }
  /**
   * [datatablestatus 数据表格状态]
   */
  TABLE.prototype.datatablestatus = Array();
  /**
   * [toolbaronclick 监听toolbar自定义事件]
   * @param  {[type]}  layid  [过滤器ID]
   * @param  {[type]}  index  [索引器]
   */
  TABLE.prototype.toolbaronclick = function (layid, index) {
    // 排除内部按钮 LAYTABLE_COLS、LAYTABLE_PRINT、LAYTABLE_EXPORT
    if(index==='LAYTABLE_COLS' || index==='LAYTABLE_PRINT' || index==='LAYTABLE_EXPORT'){
      return false;
    }
    var obj = hg.table.datatablestatus[layid];
    if (obj) {
      var checkobj = $('.layui-table-view[lay-id=' + layid + '] table tr.layui-table-click');
      if (checkobj.length > 0) {
        if (obj.btns[index]) {
          obj.btns[index](obj, obj.selectrow);
        }
        else{ //拓展头部工具栏按钮，全部导出、全部打印
          var fn = window[index];
          if(fn){
            fn(layid);
            return false;
          }
          console.error('function '+index+'(layid) is not defined');
        }
      } else {
        if (obj.btns[index]) {
          obj.btns[index](obj);
        }
        else{
          var fn = window[index];
          if(fn){
            fn(layid);
            return false;
          }
          console.error('function '+index+'(layid) is not defined');
        }
      }
    }
  }
  /**
   * [printall datatable打印任意数据]
   * @param  {[type]}  layid  [过滤器ID][tableCols]
   * @param  {[type]}  data   [数据]
   */
  TABLE.prototype.printall = function (layid, data) {
    if(typeof layid === 'object' && typeof data === 'object'){
      var fields = $.map(layid[0], function(e,i){
        return e.field
      })
      var tds = $.map(layid[0], function(e,i){
        return '<th><div><span>'+e.title+'</span></div></th>'
      }).join('');
      var handler = '<table cellspacing="0" cellpadding="0" border="0" class="layui-table"><thead><tr>'+tds+'</tr></thead></table>';

      var table = '';
      layui.each(data, function(i,e){
        table += '<tr data-index="0">';
        var td =  $.map(fields,function(e1){
          return '<td data-field="'+e+'"><div>'+e[e1]+'</div></td>';
        }).join('');
        table += td+'</tr>';
      });
      var html = document.createElement("div");
      var style = ['<style>'
          ,'body{font-size: 12px; color: #666;}'
          ,'table{width: 100%; border-collapse: collapse; border-spacing: 0;}'
          ,'th,td{line-height: 20px; padding: 9px 15px; border: 1px solid #ccc; text-align: left; font-size: 12px; color: #666;}'
          ,'a{color: #666; text-decoration:none;}'
          ,'*.layui-hide{display: none}'
          ,'</style>'].join('');
      $(html).append(handler); //输出表头
      $(html).find('tr').after(table);  //输出表体
      var printWin = window.open("打印窗口", "_blank");
      printWin.document.write(style + $(html).prop("outerHTML"));
      printWin.document.close();
      printWin.print();
      printWin.close();
    }
    else{ //打印当页数据
      var html = document.createElement("div");
      var style = ['<style>'
          ,'body{font-size: 12px; color: #666;}'
          ,'table{width: 100%; border-collapse: collapse; border-spacing: 0;}'
          ,'th,td{line-height: 20px; padding: 9px 15px; border: 1px solid #ccc; text-align: left; font-size: 12px; color: #666;}'
          ,'a{color: #666; text-decoration:none;}'
          ,'*.layui-hide{display: none}'
          ,'</style>'].join('');
      $(html).append($('.layui-table-view[lay-id=' + layid + '] .layui-table-header').html()); //输出表头
      $(html).find('tr').after($('.layui-table-view[lay-id=' + layid + '] .layui-table-main table tbody').html());  //输出表体
      $(html).find("th.layui-table-patch").remove(); //移除补丁
      $(html).find(".layui-table-col-special").remove(); //移除特殊列
      var printWin = window.open("打印窗口", "_blank");
      printWin.document.write(style + $(html).prop("outerHTML"));
      printWin.document.close();
      printWin.print();
      printWin.close();
    }
  }
  /**
   * [exportfile datatable导出任意数据]
   * @param  {[type]}  layid  [过滤器ID]
   * @param  {[type]}  data   [数据]
   */
  TABLE.prototype.exportfile = function (layid, data) {
    layui.use(['table'], function () {
      var table = layui.table;
      table.exportFile(layid, data, 'csv');
    });
  }
  /**
   * [datatable 基本数据表格]
   * @param  {[type]}  layid     [过滤器]
   * @param  {[type]}  title     [标题]
   * @param  {[type]}  url       [请求地址]
   * @param  {[type]}  where     [请求参数]
   * @param  {[type]}  cols      [表格字段]
   * @param  {[type]}  toolbar   [工具栏]
   * @param  {[type]}  page      [启用分页]
   * @param  {[type]}  height    [设置高度]
   * @param  {[type]}  defaultToolbar [工具栏显示按钮]['filter','print','exports','printall','exportsall']
   * @param  {[type]}  totalRow  [启用合计]
   */
  TABLE.prototype.datatable = function (layid, title, url, where, cols, toolbar, page, height, defaultToolbar, totalRow) {
    if (layid) {
      //获取选中行
      if (title === 'getSelected') {
        var obj = hg.table.datatablestatus[layid];
        if (obj) {
          var checkobj = $('.layui-table-view[lay-id=' + layid + '] table tr.layui-table-click');
          if (checkobj.length > 0) {
            return obj.selectrow;
          } else {
            return null;
          }
        }
        return false;
      }
      //重载表格
      if (title === 'reload') {
        var obj = hg.table.datatablestatus[layid];
        if (obj) {
          layui.use(['table'], function () {
            var _table = layui.table;
            var _where = url || {};
            var _ispage = $('.layui-table-view[lay-id=' + layid + '] .layui-table-page');
            var _options = {
              where: _where
            }; //无分页
            _options = _ispage.length > 0 ? {
              where: _where,
              page: {
                curr: 1
              }
            } : _options; //有分页
            _table.reload(layid, _options);
          });
          return true;
        }
        return false;
      }
      //重置表格大小
      if (title === 'resize') {
        var obj = hg.table.datatablestatus[layid];
        if (obj) {
          layui.use(['table'], function () {
            var _table = layui.table;
            _table.resize(layid);
          });
          return true;
        }
        return false;
      }
      var _title = title || "";
      var _url = typeof url==='string' ? url : '';
      var _data = typeof url==='object' ? url : [];
      var _where = where || {};
      var _cols = cols || "";
      var _toolbar = toolbar || "";
      var _page = page || false;
      if(_page){
        _page = {
          layout: ['prev', 'page', 'next', 'skip', 'count', 'limit'], //自定义分页布局
          curr: 1, //设定初始在第1页
          groups: 5, //显示连续页码
          first: false, //不显示首页
          last: false //不显示尾页
        }
      }
      var _limit = _page === false ? 0 : 10;
      var _height = height || "";
      _height = height === 'full' ? "full-220" : _height;
      // 拓展导出按钮
      var _defaultToolbar = $.extend(true, [], defaultToolbar) || ['filter', 'print', 'exports'];
      if($.inArray("printall", defaultToolbar)!=-1){
        _defaultToolbar[$.inArray("printall", defaultToolbar)] = {title:'打印全部',layEvent:'printall',icon:'layui-icon-print'};
      }
      if($.inArray("exportsall", defaultToolbar)!=-1){
        _defaultToolbar[$.inArray("exportsall", defaultToolbar)] = {title:'导出全部',layEvent:'exportsall',icon:'layui-icon-export'};
      }
      var _totalRow = totalRow || false;
      var _status = {
        btns: [], //btns toolbar按钮
        selectrow: null, //selectrow选中行
        reload: null,  //reload重新获取数据
        checkstatus: null,
        rowclick: null //行单击事件
      }; 
      if (typeof toolbar === 'object') {
        var html = '<div class="layui-btn-container">';
        for (let i = 0; i < toolbar.length; i++) {
          const element = toolbar[i];
          _status.btns.push(element.handler);
          const btn = '<button class="layui-btn layui-btn-sm" lay-event="' + i + '"><i class="layui-icon">' + element.layuiicon + '</i>' + element.text + '</button>';
          html = html + btn;
        }
        _toolbar = html + '</div>';
      }
      hg.table.datatablestatus[layid] = _status;
      layui.use(['table'], function () {
        var table = layui.table;
        var tableIns = table.render({
          elem: '#' + layid,
          title: _title,
          url: _url,
          where: _where,
          toolbar: _toolbar,
          height: _height,
          cellMinWidth: 80,
          cols: _cols,
          page: _page, //启用分页
          //limit: _limit,
          limits: [10, 30, 50, 200],
          defaultToolbar: _defaultToolbar, //打印 导出
          data: _data,
          parseData: function (res) { //将原始数据解析成 table 组件所规定的数据
            if (typeof (res.total) === 'number' && typeof (res.rows) === 'object') {
              return {
                "code": 0, //解析接口状态
                "msg": '', //解析提示文本
                "count": res.total, //解析数据长度
                "data": res.rows //解析数据列表
              };
            }
          },
          // request: {
          //   pageName: 'page', //默认：page
          //   limitName: 'rows' //默认：limit
          // },
          totalRow: _totalRow //启用合计 cols参数:totalRowText: '合计' totalRow: true
        });
        //重新获取数据
        if (hg.table.datatablestatus[layid]) {
          hg.table.datatablestatus[layid].reload = tableIns.reload;
        }
        //监听行单击事件（单击事件为：rowDouble）
        table.on('row(' + layid + ')', function (obj) {
          //标注选中样式
          obj.tr.addClass('layui-table-click').siblings().removeClass('layui-table-click');
          if (hg.table.datatablestatus[layid]) {
            hg.table.datatablestatus[layid].selectrow = obj;
          }
          if(hg.table.datatablestatus[layid].rowclick){
            hg.table.datatablestatus[layid].rowclick(obj);
          }
        });
        //监听行工具事件
        table.on('tool(' + layid + ')', function (obj) {
          if (obj.event && obj.event.length > 1) {
            var field = $(this).parents('.layui-table-cell').parent().attr('data-field');
            var fn = window[obj.event];
            if (fn)
              fn(obj, field);
            else
              console.error('function ' + obj.event + '(obj) is not defined');
          }
        });
        //监听头部工具栏事件
        table.on('toolbar(' + layid + ')', function (obj) {
          hg.table.datatablestatus[layid].checkstatus = table.checkStatus(layid);
          hg.table.toolbaronclick(layid, obj.event);
        });
      });

      return {
        //获取选中行
        getSelected: function(){
          var obj = hg.table.datatablestatus[layid];
          if (obj) {
            var checkobj = $('.layui-table-view[lay-id=' + layid + '] table tr.layui-table-click');
            if (checkobj.length > 0) {
              return obj.selectrow;
            } else {
              return null;
            }
          }
        },
        //重载表格
        reload: function(where){
          var obj = hg.table.datatablestatus[layid];
          if (obj) {
            layui.use(['table'], function () {
              var _table = layui.table;
              var _where = where || {};
              var _ispage = $('.layui-table-view[lay-id=' + layid + '] .layui-table-page');
              var _options = {
                where: _where
              }; //无分页
              _options = _ispage.length > 0 ? {
                where: _where,
                page: {
                  curr: 1
                }
              } : _options; //有分页
              _table.reload(layid, _options);
            });
            return true;
          }
          return false;
        },
        //重置表格大小
        resize: function(){
          var obj = hg.table.datatablestatus[layid];
          if (obj) {
            layui.use(['table'], function () {
              var _table = layui.table;
              _table.resize(layid);
            });
            return true;
          }
          return false;
        },
        //行单击触发事件
        onrowclick: function(clink){
          var obj = hg.table.datatablestatus[layid];
          if(obj){
            hg.table.datatablestatus[layid].rowclick = clink;
          }
        }
      }
    }
  }
  /**
   * [tree 树形组件]
   * @param  {[type]}  layid   [过滤器ID]
   * @param  {[type]}  data    [数据]
   * @param  {[type]}  showCheckbox [复选框]
   * @param  {[type]}  showLine [连接线]
   * @param  {[type]}  accordion [手风琴模式]
   * @param  {[type]}  onlyIconControl [图标控制展开]
   * @param  {[type]}  isJump [新窗口跳转]
   */
  TREE.prototype.datatree = function(layid, data, showCheckbox, showLine, accordion, onlyIconControl, isJump) {
    if(layid){
      var _data = data || [];
      var _showCheckbox = showCheckbox || false; //是否显示复选框
      var _showLine = showLine || true; //是否开启连接线。默认 true，若设为 false，则节点左侧出现三角图标。
      var _accordion = accordion || false; //是否开启手风琴模式，默认 false
      var _onlyIconControl = onlyIconControl || false; //是否仅允许节点左侧图标控制展开收缩。默认 false
      var _isJump = isJump || false; //是否允许点击节点时弹出新窗口跳转。默认 false
      var result = {
        onclick: function(){},
        oncheck: function(){},
        onspread: function(){},
        getChecked: function(){},
        setChecked: function(){},
        reload: function(){}
      }
      layui.use('tree', function() {
        var tree = layui.tree;
        var inst1 = tree.render({
            elem: '#'+layid,
            id: layid, //定义索引
            showCheckbox: _showCheckbox, 
            showLine: _showLine, 
            accordion: _accordion, 
            onlyIconControl: _onlyIconControl, 
            isJump: _isJump, 
            data: _data,
            text: {
                defaultNodeName: '无数据',
                none: '加载数据失败！'
            },
            click: function (obj) {
              result.onclick.call(obj);
              if (!_showCheckbox) {
                $('#'+layid).find('.layui-tree-click').removeClass('layui-tree-click');
                obj.elem.find('span.layui-tree-txt:first').addClass('layui-tree-click');
              }
                // console.log(obj.data); //得到当前点击的节点数据
                // console.log(obj.state); //得到当前节点的展开状态：open、close、normal
                // console.log(obj.elem); //得到当前节点元素
                // console.log(obj.data.children); //当前节点下是否有子节点
            },
            oncheck: function (obj) {
              result.oncheck.call(obj);
                // console.log(obj.data); //得到当前点击的节点数据
                // console.log(obj.checked); //得到当前节点的展开状态：open、close、normal
                // console.log(obj.elem); //得到当前节点元素
            },
            spread: function (obj) {
                if(obj.state=='open'){
                  obj.lazytree = function(data){
                    tree.lazytree(inst1.config.id, obj.elem, data);
                  }
                  result.onspread.call(obj);
                }
            }
        });
        result.getChecked = function() {
          if(_showCheckbox){
            var checkData = tree.getChecked(layid);
            return checkData;
          }
          else{
            var check = $('#'+layid).find('.layui-tree-click');
            if(check.length>0){
              return {id:check.parent().parent().parent().attr('data-id')}
            }
          }
        }
        result.setChecked = function(data) {
          if(_showCheckbox){
            tree.setChecked(layid, data);
          }
        }
        result.reload = function() {
          tree.reload(layid, {});
        }
      });
      return result;
    }
  }
  win.hg = new HG();
  win.hg.form = new FORM();
  win.hg.table = new TABLE();
  win.hg.tree = new TREE();
}(window);

//框架使用
layui.use(['layer', 'element', 'form', 'jquery'], function () {
  layer = layui.layer;
  element = layui.element;
  form = layui.form;
  $ = layui.jquery;

  //左侧菜单
  $('.layui-left-nav #nav').on('click', 'li', function (event) {

    // 左侧菜单展开状态
    if ($(this).parent().attr('id') == 'nav') {
      $(this).parent().find('a').removeClass('border')
      $(this).children('a').addClass('border');
    }
    // 左侧菜单选中状态
    if ($(this).hasClass('sub-tab')) {
      $('.layui-left-nav').find('a').removeClass('active');
      $(this).children('a').addClass('active');
    }

    if ($(this).children('.sub-menu').length) {
      if ($(this).hasClass('open')) {
        $(this).removeClass('open');
        $(this).find('.nav_right').removeClass('fa-angle-up').addClass('fa-angle-down');
        $(this).children('.sub-menu').stop(true, true).slideUp();
        $(this).siblings().children('.sub-menu').slideUp();
      } else {
        $(this).addClass('open');
        $(this).children('a').find('.nav_right').removeClass('fa-angle-down').addClass('fa-angle-up');
        $(this).children('.sub-menu').stop(true, true).slideDown();
        $(this).siblings().children('.sub-menu').stop(true, true).slideUp();
        $(this).siblings().find('.nav_right').removeClass('fa-angle-up').addClass('fa-angle-down');
        $(this).siblings().removeClass('open');
      }
    }
    event.stopPropagation();
  })
  var left_tips_index = null;
  $('.layui-left-nav #nav').on('mouseenter', '.fa', function (event) {
    if ($('.layui-left-nav').css('width') == '60px') {
      var tips = $(this).next('cite').text();
      left_tips_index = layer.tips(tips, $(this));
    }
  })
  $('.layui-left-nav #nav').on('mouseout', '.fa', function (event) {
    layer.close(left_tips_index);
  })

  // 隐藏左侧
  $('.indent-tab i').click(function(event){
    if ($('.layui-left-nav').css('width') == '220px') {
      //$('.layui-left-nav .open').click();
      $('.layui-left-nav i').addClass('nav-iconfont');
      $('.layui-left-nav').animate({width: '60px'}, 100);
      $('.layui-left-nav cite,.layui-left-nav .nav_right').hide();
      $('.layui-page-content').animate({left: '60px'}, 100);
      $('.indent-tab i').removeClass('fa-dedent');
      $('.indent-tab i').addClass('fa-indent');
      $('.layui-left-nav #nav li .sub-menu li a').addClass('xs-left-nav');
    } else {
      $('.layui-left-nav').animate({width: '220px'}, 100);
      $('.layui-page-content').animate({left: '220px'}, 100);
      $('.layui-left-nav i').removeClass('nav-iconfont');
      $('.layui-left-nav cite,.layui-left-nav .nav_right').show();
      $('.indent-tab i').removeClass('fa-indent');
      $('.indent-tab i').addClass('fa-dedent');
      $('.layui-left-nav #nav li .sub-menu li a').removeClass('xs-left-nav');
    }
  });

  hg.ontab('xbs_tab',function(e){
    var othis = $(this)
    ,index = othis.index();
    rollPage('auto', index);
  });

  var rollPage = function(type, index){
    var tabsHeader = $('.layui-tab-title')
    ,liItem = tabsHeader.children('li')
    ,scrollWidth = tabsHeader.prop('scrollWidth')
    ,outerWidth = tabsHeader.outerWidth()
    ,tabsLeft = parseFloat(tabsHeader.css('left'));

    if(type === 'left'){
      if(!tabsLeft && tabsLeft <=0) return;
      
      //当前的left减去可视宽度，用于与上一轮的页标比较
      var  prefLeft = -tabsLeft - outerWidth; 

      liItem.each(function(index, item){
        var li = $(item)
        ,left = li.position().left;
        
        if(left >= prefLeft){
          tabsHeader.css('left', -left);
          return false;
        }
      });
    } else if(type === 'auto'){ //自动滚动
      (function(){
        var thisLi = liItem.eq(index), thisLeft;
        
        if(!thisLi[0]) return;
        thisLeft = thisLi.position().left;

        //当目标标签在可视区域左侧时
        if(thisLeft < -tabsLeft){
          return tabsHeader.css('left', -thisLeft);
        }
        
        //当目标标签在可视区域右侧时
        if(thisLeft + thisLi.outerWidth() >= outerWidth - tabsLeft){
          var subLeft = thisLeft + thisLi.outerWidth() - (outerWidth - tabsLeft);
          liItem.each(function(i, item){
            var li = $(item)
            ,left = li.position().left;
            
            //从当前可视区域的最左第二个节点遍历，如果减去最左节点的差 > 目标在右侧不可见的宽度，则将该节点放置可视区域最左
            if(left + tabsLeft > 0){
              if(left - tabsLeft > subLeft){
                tabsHeader.css('left', -left);
                return false;
              }
            }
          });
        }
      }());
    } else{
      //默认向左滚动
      liItem.each(function(i, item){
        var li = $(item)
        ,left = li.position().left;

        if(left + li.outerWidth() >= outerWidth - tabsLeft){
          tabsHeader.css('left', -left);
          return false;
        }
      });
    }
  }

  // 向右滚动标签
  $('.layui-tab .indent-tab.fa-step-backward').click(function(event){
    rollPage('left');
  });

   // 向左滚动标签
   $('.layui-tab .indent-tab.fa-step-forward').click(function(event){
    rollPage();
  });

  // 单击左侧菜单项打开tabs页
  $(".layui-left-nav #nav .sub-menu").on('click', 'li', function (event) {
    var title = $(this).attr('hg-title');
    var nav = $(this).attr('hg-nav');
    if (typeof (title) != "undefined" && typeof (nav) != "undefined") {
      hg.add_tab(title, nav);
    }
  });

  // 切换tabs页面触发，定位左侧导航位置
  $(".layui-tab-title").on('click', 'li', function (event) {
    var this_index = $(this).attr('lay-id');

    if (typeof (this_index) != "undefined") {
      $('.layui-left-nav #nav .sub-menu').find('li').each(function (e) {
        var _nav = $(this).attr('hg-nav');
        var this_li = $(this).parent().parent();
        var this_nav = $(this).parent().parent().parent();
        if (typeof (_nav) != "undefined") {
          if (_nav == this_index) {
            //处理3级菜单定位问题
            if($(this).parent().parent().parent().attr('class')==='sub-menu'){
              this_li = $(this).parent().parent().parent().parent();
              this_nav = $(this).parent().parent().parent().parent().parent();
            }

            // 父级菜单边框颜色
            var _tip = this_li.children('a');
            if (_tip.hasClass('border') == false) {
              $('.layui-left-nav').find('a').removeClass('border');
              this_li.children('a').addClass('border');
            }
            

            // 更新左侧菜单选中状态
            $('.layui-left-nav').find('a').removeClass('active');
            $(this).children('a').addClass('active');

            // 自动展开菜单
            if (this_li.hasClass('open') == false) {
              this_li.click();
            }

            // 自动切换顶部菜单项
            if (this_nav.hasClass('layui-show') == false) {
              var _index = this_nav.attr('hg-index');
              if (typeof _index != "undefined") {
                var _meun = $('.layui-nav').children('li[meun_id]');
                _meun.eq(_index).children('a').click();
              }
            }
          }
        }
      });

    }
  });


  // 选项卡操作按钮
  $('.layui-page-content').on('click', '[data-page-close]', function () {
    var loading = layer.load(0, {
      shade: false,
      time: 2 * 1000
    });
    var closeType = $(this).attr('data-page-close');
    if(closeType==='this'){
      $(".layui-tab-title li.layui-this").each(function(){
        tabId = $(this).attr('lay-id');
        title = $(this).text();
        hg.add_tab(title,tabId,true);
      });
    }
    else{
      $(".layui-tab-title li").each(function () {
        tabId = $(this).attr('lay-id');
        if(closeType==='other'){
          if($(this).attr('class')!='layui-this'){
            hg.del_tab(tabId);
          }
        }
        else{
          hg.del_tab(tabId);
        }
      });
    }
    $('.layui-page-content .layui-tab .layui-nav .layui-nav-item .layui-nav-child').removeClass('layui-show');
    layer.close(loading);
  });

  $('.layui-header').on('click','dl',function(){
    $(this).removeClass('layui-show');
  });


  // 顶部导航切换触发事件
  element.on('nav(nav-top)', function (elem) {
    var id = $(this).parent().attr("meun_id");
    if (typeof (id) != "undefined") {
      var nav = $(".layui-left-nav ul#nav");
      nav.removeClass("layui-show");
      if (typeof (nav[id]) != "undefined") {
        $(nav[id]).addClass("layui-show");
      }
    }
  });

  //自定义click事件
  $("body").on("click", "*[hg-event]", function () {
    var e = $(this),
      t = e.attr("hg-event");
      events[t] && events[t].call(this, e)
  });

  var events = {
    //全屏
    fullscreen: function (m) {
      var a = "fa-arrows-alt",
          t = "fa-compress",
          i = m.children("i");
      if(i.hasClass(a)){
        i.addClass(t).removeClass(a);
        var e = document.documentElement,
          a = e.requestFullScreen || e.webkitRequestFullScreen || e.mozRequestFullScreen || e.msRequestFullscreen;
        "undefined" != typeof a && a && a.call(e);
      }
      else {
        document.documentElement;
        if(document.fullscreenElement){
          document.exitFullscreen ? document.exitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitCancelFullScreen ? document.webkitCancelFullScreen() : document.msExitFullscreen && document.msExitFullscreen()
        }
        i.addClass(a).removeClass(t);
      }
    },
    //皮肤设置
    skinConfig: function (m) {
      var clientHeight = (document.documentElement.clientHeight) - 55;
      var html = $('.hg-config');
      $.getJSON('config/skin.json', function (res) {
        if (res && res.data) {
          var ul = document.createElement("ul");
          var config = events.getSkinConfig();
          layui.each(res.data, function(arr,obj){
            var li = document.createElement("li");
            li.setAttribute("hg-event","skinChangeColor");
            li.setAttribute("data-skin",arr);
            if(arr == config.hg_skin){
              li.setAttribute("class","layui-this");
            }
            var a = $('<a href="javascript:;"> '+
                      '  <div> '+
                      '      <span style="display:block; width: 100%; float: left; height: 12px; background: '+res.data[arr].header_bgcolor+';"></span> '+
                      '  </div> '+
                      '  <div> '+
                      '      <span style="display:block; width: 20%; float: left; height: 40px; background: '+res.data[arr].menu_bgcolor+';"></span> '+
                      '      <span style="display:block; width: 80%; float: left; height: 40px; background: #f1f1f1;"></span> '+
                      '  </div> '+
                      '</a> ');
            $(li).html(a);
            ul.appendChild(li);
          });
          html.find('ul.skin').html(ul.children);
        }
      });

      layer.open({
          type: 1,
          title: '皮肤设置',
          btn: ['保存'],
          yes: function(index, layero){
            var hg_skin = $('#'+this.id + ' li.layui-this').attr('data-skin');
            var hg_fontsize = $('#'+this.id + ' input[name="fontsize"]:checked').val();
            events['saveSkinConfig'].call(this, {hg_skin,hg_fontsize});
          },
          closeBtn: 1,
          shade: 0.2,
          anim: 2, //动画
          resize: false, //禁止拉伸
          scrollbar: true, //滚动条
          move: false, //禁止拖拽
          shadeClose: false, //点击遮罩关闭
          id: 'hgconfig',
          area: ['400px', clientHeight + 'px'],
          offset: 'rb',
          content: html,
          success: function () {
            var config = events.getSkinConfig();
            var data_skin = $('#'+this.id + ' li[data-skin='+config.hg_skin+']');
            data_skin.addClass('layui-this').siblings().removeClass('layui-this');
            $('input[name="fontsize"][value='+config.hg_fontsize+']').next().click();
          },
          end: function () {
            events['initSkinConfig'].call(this);
          }
      })  
    },
    //主题切换
    skinChangeColor: function (m) {
      var hg_skin = $(this).attr('data-skin');
      $(this).addClass('layui-this').siblings().removeClass('layui-this');
      var hg_fontsize = $('#hgconfig input[name="fontsize"]:checked').val();
      events['initSkinConfig'].call(this,{hg_skin,hg_fontsize});
    },
    //字号切换
    skinChangeWord: function (m) {
      console.log($(this));
    },
    //保存皮肤设置
    saveSkinConfig: function (m) {
      localStorage.setItem('hg_skin', m.hg_skin);
      localStorage.setItem('hg_fontsize', m.hg_fontsize);
      hg.msghide('保存成功！');
    },
    //获取皮肤设置
    getSkinConfig: function(){
      var hg_skin = localStorage.getItem('hg_skin') || 0;
      var hg_fontsize = localStorage.getItem('hg_fontsize') || 'md';
      return {
        hg_skin,hg_fontsize
      };
    },
    //删除皮肤设置
    delSkinConfig: function (m) {
      localStorage.removeItem('hg_skin');
      localStorage.removeItem('hg_fontsize');
      events.initSkinConfig();
    },
    //初始化皮肤
    initSkinConfig: function (m) {
      if($('body').hasClass('layui-layout-body')){
        var config = m || events.getSkinConfig();
        var hg_skin = config.hg_skin;
        var hg_fontsize = config.hg_fontsize;
        $('head').find('style#skinConfig').remove();
        if (hg_skin) {        
          $.getJSON('config/skin.json', function (res) {
            if (res && res.data) { 
              var style = document.createElement("style");
              style.id = 'skinConfig';
              style.innerHTML = '.layui-layout-admin .layui-header{background-color: '+res.data[hg_skin].header_bgcolor+';} '+
              '.layui-left-nav{background-color:'+res.data[hg_skin].menu_bgcolor+';} '+
              '.layui-left-nav .sub-tab a.active{background: '+res.data[hg_skin].menu_bgcolor_this+';color: #fff} '+
              '.layui-left-nav a.border{border-color:  '+res.data[hg_skin].menu_border_color+' !important;} ';
              if(hg_fontsize==='lg'){
                style.innerHTML += '.layui-page-content .layui-tab-title li{font-size: 16px;}';
              }
              if(hg_fontsize==='sm'){
                style.innerHTML += '.layui-page-content .layui-tab-title li{font-size: 13px;}';
              }
              if(hg_fontsize==='xs'){
                style.innerHTML += '.layui-page-content .layui-tab-title li{font-size: 12px;}';
              }
              document.head.appendChild(style);
              $('.layui-layout-body').show();
            }
          });
        }
        else{
          $('.layui-layout-body').show();
        }
      }
    }
  }


  // 动态添加索引顶部导航对应meun_id
  var n = 0;
  $('.layui-left-nav ul#nav').each(function (e) {
    $(this).attr('hg-index', n++);
  });

  // 滚动条插件
  if(typeof $(".scrollBox").scrollBar === "function"){
    $(".scrollBox").scrollBar();
  }

  // 全屏高度设置，添加属性lay-height='full'，'full'='full-200'，'auto'
  var hgfull = function() {
    var layfull = $('[lay-height]');
    if(layfull.attr('lay-height')){
      var arr = layfull.attr('lay-height').split('-');
      if(arr.length===2){
          var height = window.innerHeight-arr[1];
          layfull.css('height',height+'px');
          layfull.css('overflow-y','auto');
      }
      else if(arr[0]==='full'){
          layfull.css('height',window.innerHeight-200+'px');
          layfull.css('overflow-y','auto');
      }
      else if(arr[0]==='auto'){
        var next = layfull.next();
        if(next.length > 0){
          setTimeout(function(){
            //console.log(next.height());
            if(next.height()===99){
              hgfull();
              return false;
            }
            layfull.children('.layui-card').css('height',next.height()+'px');
            layfull.children('.layui-card').css('overflow-y','auto');
          },5);
        }
      }
    }
  }

  hgfull();

  //初始化皮肤
  events['initSkinConfig'].call(this);
 
  //浏览器窗口大小更改事件
  $(window).resize(function() { 
    hgfull();
    if(!document.fullscreenElement){
      $("body").find('.fa-compress').removeClass('fa-compress').addClass('fa-arrows-alt');
    }
  });

  //键盘监听事件
  $(window).keyup(function(event){
      //判断回车键的CODE
      if(event.keyCode == 13){
      }
      //console.log(event.keyCode);
  })
})
