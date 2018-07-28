# vue-idanmu

第二次重写，是对上一次 ssr 架构的改进与重构，上个版本请参阅分支 v1.0

顺便UI也重新设计，代码也重写大部分，配合用 go 重构过的后端 api

### 策略

用户登陆状态下，纯 spa，未登录状态下，首屏 ssr

配合 cdn，目前阶段我能做的最小性能损耗的策略了

### 技术栈
* webpack4
* vue2
* vuex
* vue-router
* koa2

>配套后台：[idanmu-admin](https://github.com/132yse/idanmu-admin)

## about

* blog: [伊撒尔の窝](http://www.yisaer.com)
* weibo: [@世界倒数第一公主殿下](http://weibo.com/oreshura)