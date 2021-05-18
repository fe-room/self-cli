const { green } = require("../utils/chalk"); //修改命令行字体颜色
const templateList = require('../config/template.json')

const downTemplate = require('../utils/download-template')
module.exports = function init(answers) {
    green('------开始初始化-------')
    downTemplate(templateList[answers.libTemplate], `${answers.name}`, '', answers)
}
