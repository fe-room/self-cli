const { green, blue } = require("../utils/chalk"); //修改命令行字体颜色
module.exports = function init(args) {
    green('------开始构建-------')
     /* 找到template文件夹下的模版项目 */
    const sourcePath = __dirname.slice(0,-3)+'template'
    blue('当前路径:'+ process.cwd())
    console.table(args)
}