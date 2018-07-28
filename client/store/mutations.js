export default {
  loadArticleList(state, articles) {
    state.articles = articles
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