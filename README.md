# HG框架简介
HG-Layui-UI框架，是基于layui最新版UI搭建的一套通用后台管理框架，借鉴了市面上各大主流框架风格，采用iframe标签页实现，保留了传统开发模式的简单实用性。
为快速开发减少重复代码量，框架内部admin.js中封装了常用的组件，包括弹窗提示、日期组件、表单监听、表单验证、数据表格组件、树形组件和request获取数据方法等。

# 2020-08-10更新
* 修复360浏览器兼容IE模式下无法加载问题。
* hg.datatable，toolbar中增加class选项，可自定义按钮样式。
* 新增三方组件使用案例，dtree和treeTable组件。

# 2020-03-23更新
* HG-Layui-UI框架升级1.1版。
* 移除原有图标库，集成Font Awesome V4.7字体图标库。
* 优化了页面样式，框架中全部替换为使用新的图标样式。
* 增加了皮肤设置，config文件夹下skin.json中设置配色，字号大小目前只修改tabs标签文字大小。
* 修复火狐浏览器打开皮肤设置出现闪屏问题。

# 2020-02-24更新
* 增加hg-event自定义click事件。
* 增加fullscreen全屏，配合hg-event使用。
* 修复iframe中无法使用全屏问题。
* 修复lay-height='full'与layui-col冲突问题。
* 增加lay-height='auto'在与多个同级元素时使用，根据下一个元素计算高度。
* 修复fullscreen全屏模式下，按Esc键退出全屏后，全屏图标显示错误问题。
* 增加树形组件不显示多选框时，选中一个节点高亮显示，同时支持tree.getChecked()获得选中节点。
* 加载admin.js初始化form表单组件。
* 修改datatable，监听行工具事件，增加返回参数(obj, field)，field为当前点击单元格id。
* 增加datatable，行单击触发事件，onrowclick(callback)。

# 2020-01-03更新
* 修复使用scrollBar滚动条插件时宽度不对齐问题。
* 增加tabs标签页向左向右滚动按钮。
* 修改兼容小屏幕样式，左侧菜单伸缩状态下展开列表仅显示图标。
* 伸缩左侧菜单时取消折叠菜单操作。
* 增加hg.table.datatable已知数据加载，url参数直接赋值Array对象。
* 增加hg.msghide(content, time)，弹出半透明提示层。
* 增加hg.load(callbackmething)，弹出加载层。
* 增加HG使用文档页面。

# 2019-12-19更新
* 修改官方Layui.tree树形组件源码，增加懒加载模式，data参数lazy: true 开启子节点懒加载方式，需要配合spread事件使用。
* 增加spread事件，lazy为true时，展开节点时触发该事件，obj.elem:节点元素，obj.state:状态open/close，obj.data:节点数据。
* 增加tree.lazytree(treeid, elem, children)方法，懒加载子节点数据展示。
* 增加hg.table.datatable(layid, 'resize')方法，重置表格大小。
* 增加hg.ontab(layfilter, _callback)方法，监听Tab切换事件。
* 增加datatable实例化对象扩展方法，table.getSelected() 获取选中行,table.reload(where) 重载表格,table.resize() 重置表格大小。
* 增加hg.tree.datatree(layid, data, showCheckbox, showLine, accordion, onlyIconControl, isJump)方法，基本树形组件。
* 增加datatree实例对象事件与方法onclick() oncheck() onspread() getChecked() setChecked() reload()。
* 增加spread()事件中this.lazytree(data)方法，触发懒加载子节点。


## 2019-11-01更新
* 引用layui-v2.5.5最新版。
* 增加主页面布局，由顶部layui-header、左侧菜单layui-left-nav和内容展示区域layui-page-content组成。
* 增加顶部layui-header，LOGO和标题展示，顶部一级菜单展示。
* 增加左侧菜单layui-left-nav，支持3级菜单，默认手风琴展开模式。
* 增加hg.add_tab、hg.del_tab、hg.add_lay_tab方法，用来管理tabs页。
* 增加顶部菜单与左侧菜单联动效果，切换tabs页时自动定位当前菜单项。
* 增加tabs页选项卡操作，刷新当前页面，关闭其他页面，关闭全部页面。
* 增加侧边伸缩按钮，在选项卡栏最左侧，改变左侧菜单展示状态。
* 引用jquery-1.9.1插件，依赖第三方jquery插件时用到。
* 引用jquery.scrollBar.js插件，美化滚动条样式，class="scrollBox"。
* 引用jquery.NProgress.js插件，请求进度条样式，iframe页面加载时显示。
* 修改layui默认样式颜色，默认主题以蓝色为主。
* 增加hg.msg(content, title)方法，弹出提示框。
* 增加hg.confirm(content, title, callbackmething)方法，弹出询问框。
* 增加hg.open(title, url, w, h, full)方法，打开弹出层。
* 增加hg.close()方法，关闭弹出层。
* 增加hg.base_reload()方法，刷新父窗口。
* 增加hg.datetime(btime, etime, options)方法，基本日期框选择。
* 增加hg.datetime2(elem, type, min, max)方法，组合日期框选择。
* 增加hg.getdate(type, e)方法，获取日期时间。
* 增加hg.request(url, data, type, contentType, dataType, async, funSuccess)方法，网络请求。
* 增加hg.form.onsubmit(layfilter, _callback)方法，监听表单提交事件。
* 增加hg.form.onswitch(layfilter, _callback)方法，监听switch操作事件。
* 增加hg.form.verify(options)方法，表单自定义验证规则。
* 增加hg.table.datatable(layid, title, url, where, cols, toolbar, page, height, defaultToolbar, totalRow)方法，基本数据表格。
* 增加hg.table.toolbaronclick(layid, index)方法，监听toolbar自定义事件。
* 增加datatable，监听行工具事件，操作行lay-event中定义值为触发函数名。
* 增加hg.table.printall(cols, data)方法，打印任意数据，defaultToolbar='printall'。
* 增加hg.table.exportfile(layid, data)方法，导出任意数据，defaultToolbar='exportsall'。
* 增加hg.table.datatablestatus，状态属性集合。
* 修改datatable，支持easyui数据格式解析方式，包括分页参数page和rows。
* 修改datatable，工具条toolbar参数添加handler: function (obj, row)匿名函数方式。
* 增加hg.table.datatable(layid, 'reload', where)方法，重载表格。
* 增加hg.table.getSelected(layid, 'getSelected')方法，获取选中行。
* 添加lay-height全屏高度设置属性，lay-height='full'，'full'='full-200'。

![输入图片说明](https://images.gitee.com/uploads/images/2019/1207/203434_c07033c1_1282578.png "主页面展示")

官方演示地址：[http://h_gxi.gitee.io/hg-layui-admin-ui/](http://h_gxi.gitee.io/hg-layui-admin-ui/)