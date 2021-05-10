const which = require('which')
/* 找到npm */
module.exports = function findNpm() {
  var npms = process.platform === 'win32' ? ['npm.cmd'] : ['npm']
  for (var i = 0; i < npms.length; i++) {
    try {
      which.sync(npms[i])
      console.log('use npm: ' + npms[i])
      return npms[i]
    } catch (e) {
    }
  }
  throw new Error('please install npm')
}
