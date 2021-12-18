import axios from 'axios'

export function getHcyList(fid) {
  return axios.get('/hcy/list', {
    params: {
      fid
    }
  })

}