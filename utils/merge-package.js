const fs = require('fs')
module.exports = function mergePackageJson(config,sourcePath){
  return new Promise((resolve)=>{
    /* 读取文件 */
    fs.readFile(sourcePath+'/package.json',(err,data)=>{
      if(err) throw err
      const { author , name  } = config
      let json = data.toString()
      // /* 替换模版 */
      json = json.replace(/demoName/g,name.trim())
      json = json.replace(/demoAuthor/g,author.trim())
      const path = process.cwd()+ '/package.json'
      // /* 写入文件 */
      fs.writeFile(path, new Buffer.from(json) ,()=>{
        resolve()
      })
    })
  })
}
