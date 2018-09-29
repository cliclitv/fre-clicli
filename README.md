# vue-clicli

第三次重构，主要是对 UI 进行重新设计
p.s. 本来想等到 vue3 顺便来一次大的重构来着，但是假期如约而至，等不及了(⊙o⊙)…

顺便 ssr 架构也会调整

### ssr策略

用户登陆状态下，纯 spa，未登录状态下，首屏 ssr

配合缓存和 cdn，目前阶段我能做的最小性能损耗的策略了

### 技术栈
* webpack4
* vue2
* vuex
* vue-router
* koa2

>配套后台：[clicli-admin](https://github.com/132yse/clicli-admin)

## about

* blog: [伊撒尔の窝](http://www.yisaer.com)
* weibo: [@世界倒数第一公主殿下](http://weibo.com/oreshura)