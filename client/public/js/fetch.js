import fetch from 'cross-fetch'

export default class Fetch {
  constructor(url, cb) {
    this.perfix = ''

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