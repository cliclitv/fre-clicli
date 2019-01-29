const crypto = require('crypto')

module.exports = {
  getAccessToken(params) {
    const ACCESS_KEY = 'd54899f6d6036a2d'
    const SECRET_KEY = '3e2333eb0b03973dbe6f38d8654dad61'

    // const url = 'https://api.dogecloud.com/auth/upload.json?filename=a.mp4'
    const signStr = `/auth/upload.json?${params}\n`


    const sign = crypto.createHmac('sha1', SECRET_KEY).update(signStr).digest('hex')
    return ACCESS_KEY + ':' + sign
  }
}