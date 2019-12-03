import Vue from 'vue'
import {
  Button, // 按钮
  Switch, // 开关
  NavBar, // 导航栏
  Field, // 输入框
  Icon, //  图标
  Toast, // 轻提示
  Tabbar, // 标签栏
  TabbarItem,
  Tab, // 标签页
  Tabs,
  List, // 列表
  PullRefresh, // 下拉刷新
  Cell, // 单元格
  CellGroup,
  Grid, // 宫格
  GridItem,
  Image // 图片
} from 'vant'

Vue
  .use(Button)
  .use(Switch)
  .use(CellGroup)
  .use(NavBar)
  .use(Field)
  .use(Icon)
  .use(Toast)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Tab)
  .use(Tabs)
  .use(List)
  .use(PullRefresh)
  .use(Cell)
  .use(Grid)
  .use(GridItem)
  .use(Image)
