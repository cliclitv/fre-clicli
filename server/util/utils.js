const utils = require('utility')


module.exports = {
  /*
* 密码加密
* */
  md5Pwd(pwd) {
    const salt = 'acgzoneKOAreact@16.3~'
    return utils.md5(utils.md5(pwd + salt))
  }
}