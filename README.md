# vue-clicli

c站（clicli.us）pc 端主站源码，目前的 v2 稳定版本

>预计将在 vue3 发版后进行重构，大概率是年底，期间不做大重构

### 策略

用户登陆状态下，纯 spa，未登录状态下，首屏 ssr

配合 cdn，目前阶段我能做的最小性能损耗的策略了

### 技术栈
* webpack4
* vue2
* vuex
* vue-router
* koa2

>配套后台：[clicli-admin](https://github.com/132yse/clicli-admin)

### 目录结构

client 文件夹集中了 vue 业务逻辑，server 文件夹集中了 ssr 相关逻辑

client 文件夹中，api 是接口相关的方法

component 为业务组件

widget 为基础组件，与业务解耦，可以用于其他 vue 项目

public 文件夹主要是公用的 js 、 stylus 等

router 为路由相关，store 为 vuex 相关

这个目录结构是我积累的最符合语义、维护性最高的结构，供参考
