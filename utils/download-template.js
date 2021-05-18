const git = require('git-promise') // 运行git命令
const { green } = require("../utils/chalk"); //修改命令行字体颜色
const fs = require('fs-extra') //fs-extra是fs的一个扩展，提供了非常多的便利API，并且继承了fs所有方法和为fs方法添加了promise的支持。
const mergePackageJson =  require("../utils/merge-package"); 
module.exports = async function downloadRepo(repoPath, localPath, branch, answers) {
  console.log(__dirname)
  const _branch = branch ? `-b ${branch} --` : '--'
  const _repoPath = `clone ${_branch} ${repoPath} ./${localPath}`
  if (!fs.existsSync(localPath)) {
    await git(_repoPath)
    fs.removeSync(`./${localPath}/.git`)
    const sourcePath = `./${localPath}/`
    //根据配置修改packagesjson
    mergePackageJson(answers, sourcePath).then((res)=>{
      console.log('初始化完成，请输入:')
      console.log(green(`cd ${localPath} && yarn && yarn dev`))
    })
  } else {
    console.log('已存在指定目录')
  }
}