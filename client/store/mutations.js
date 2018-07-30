export default {
  loadArticleList(state, posts) {
    state.posts = posts
  },
  loadAuthor(state, author) {
    state.author = author
  },
  loadPost(state, post) {
    state.post = post
  },
  loadSortArticle(state, sort) {
    state.sort = sort
  },
  isOnLogin(state, isLogin) {
    state.isLogin = isLogin
  }

}