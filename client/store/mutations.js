export default {
  loadArticleList(state, posts) {
    state.posts = posts
  },
  loadPost(state, post) {
    state.post = post
  },
  isOnLogin(state, isLogin) {
    state.isLogin = isLogin
  },
  setVid(state, vid) {
    state.vid = vid
  },

  getDanmuku(state, danmuku) {
    state.danmuku = danmuku
  }

}