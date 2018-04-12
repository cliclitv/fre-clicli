import {articleList} from '../api/article'


export default {
  articleList({commit}) {
    articleList().then((res) => {
      if (res.data.code === 0) {
        commit('articleList', res.data)
      }
    })
  }
}