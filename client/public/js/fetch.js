import fetch from 'cross-fetch'

export default class Fetch {
  static perfix = ''

  constructor(url, params) {

    fetch(`${this.perfix}${url}`).then(res => {
      if (res.status >= 400) {
        throw new Error("Bad response from server");
      }
      return res.json()
    }).then(data => {
      cb(data)
    }).catch(err => {
      console.log(err)
    })
  }
}