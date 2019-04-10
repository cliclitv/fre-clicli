import {getPosts, getPost} from '../api/post'

export default {
  getArticleList({commit}) {
    return getPosts('public', 'bgm', '', '', 1, 20).then((res) => {
      commit('loadArticleList', res.data.posts)
    })
  },
  getPost({commit}, id) {
    return getPost(id).then(res => {
      commit('loadPost', res.data.result)
    })
  }
}