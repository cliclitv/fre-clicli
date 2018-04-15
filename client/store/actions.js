import {articleList, sortArticle} from '../api/article'
import {userList} from '../api/user'


export default {
  getArticleList({commit}) {
    return articleList().then((res) => {
      commit('loadArticleList', res.data.result)
    }).catch(e => {
      console.log(e)
    })
  },
  getNews({commit}) {
    return sortArticle('news').then(res => {
      commit('loadNews', res.data.result)
    }).catch(e => {
      console.log(e)
    })
  },
  getAnime({commit}) {
    return sortArticle('anime').then(res => {
      commit('loadAnime', res.data.result)
    }).catch(e => {
      console.log(e)
    })
  },
  getComic({commit}) {
    return sortArticle('comic').then(res => {
      commit('loadComic', res.data.result)
    }).catch(e => {
      console.log(e)
    })
  },
  getAuthor({commit}) {
    return userList().then(res => {
      commit('loadAuthor', res.data.result)
    }).catch(e => {
      console.log(e)
    })
  },
}