import {articleList, sortArticle, getOneArticle} from '../api/article'
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
    return sortArticle('news', 1, 6).then(res => {
      commit('loadNews', res.data.result)
    }).catch(e => {
      console.log(e)
    })
  },
  getAnime({commit}) {
    return sortArticle('anime', 1, 5).then(res => {
      commit('loadAnime', res.data.result)
    }).catch(e => {
      console.log(e)
    })
  },
  getComic({commit}) {
    return sortArticle('comic', 1, 5).then(res => {
      commit('loadComic', res.data.result)
    }).catch(e => {
      console.log(e)
    })
  },
  getGame({commit}) {
    return sortArticle('game', 1, 5).then(res => {
      commit('loadGame', res.data.result)
    }).catch(e => {
      console.log(e)
    })
  },
  getImgPack({commit}) {
    return sortArticle('imgpack', 1, 5).then(res => {
      commit('loadImgPack', res.data.result)
    }).catch(e => {
      console.log(e)
    })
  },
  getOther({commit}) {
    return sortArticle('other', 1, 5).then(res => {
      commit('loadOther', res.data.result)
    }).catch(e => {
      console.log(e)
    })
  },
  getMusic({commit}) {
    return sortArticle('music', 1, 5).then(res => {
      commit('loadMusic', res.data.result)
    }).catch(e => {
      console.log(e)
    })
  },
  getAuthor({commit}) {
    return userList(1, 12).then(res => {
      commit('loadAuthor', res.data.result)
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
    return sortArticle(sort, 1, 24).then(res => {
      commit('loadSortArticle', res.data.result)
    }).catch(e => {
      console.log(e)
    })
  },
}