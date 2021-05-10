const { green } = require("../utils/chalk"); //修改命令行字体颜色
const mergePackageJson =  require("../utils/merge-package"); //修改命令行字体颜色
const copyFile = require("../utils/copy-file")
module.exports = function init(args) {
    green('------开始创建-------')
     /* 找到template文件夹下的模版项目 */
    const sourcePath = __dirname.slice(0,-3)+'template'
    // 根据配置修改packages
    mergePackageJson(args, sourcePath).then(()=>{
        copyFile( sourcePath , process.cwd(),()=>{})
    })
}
