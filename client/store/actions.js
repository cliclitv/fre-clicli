import {getPostsByStatus, getPostsBySort, getOneArticle} from '../api/article'
import {userList} from '../api/user'


export default {
  getArticleList({commit}) {
    return getPostsByStatus(1, 10).then((res) => {
      commit('loadArticleList', res.data.posts)
    }).catch(e => {
      console.log(e)
    })
  },

  getAuthor({commit}) {
    return userList(1, 12).then(res => {
      commit('loadAuthor', res.data.posts)
    }).catch(e => {
      console.log(e)
    })
  },
  getPost({commit}, id) {
    return getOneArticle(id).then(res => {
      commit('loadPost', res.data.result)
    }).catch(e => {
      console.log(e)
    })
  },
  getSortArticle({commit}, sort) {
    return getPostsBySort(sort, 1, 10).then(res => {
      commit('loadSortArticle', res.data.posts)
    }).catch(e => {
      console.log(e)
    })
  },
}