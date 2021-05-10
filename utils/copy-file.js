const fs = require('fs')
const { green, blue, red, yellow } = require("../utils/chalk"); //修改命令行字体颜色
const npm = require("./npm"); //修改命令行字体颜色
let fileCount = 0  /* 文件数量 */
let dirCount = 0   /* 文件夹数量 */
let flat = 0       /* readir数量 */
let isInstall = false
/**
 *
 * @param {*} sourcePath   //template资源路径
 * @param {*} currentPath  //当前项目路径
 * @param {*} cb           //项目复制完成回调函数
 */
module.exports = function copyFile (sourcePath,currentPath,cb){
  console.log(sourcePath,currentPath,cb)
  flat++
  /* 读取文件夹下面的文件 */
  fs.readdir(sourcePath,(err,paths)=>{
    flat--
    if(err){
      throw err
    }
    paths.forEach(path=>{
      console.log(path)
      if(path !== '.git' && path !=='package.json' ) fileCount++
      const  oldSourcePath = sourcePath + '/' + path
      const  newSourcePath = currentPath + '/' + path
      /* 判断文件信息 */
      fs.stat(oldSourcePath,(err,stat)=>{
        if(err){
          throw err
        }
        /* 判断是文件，且不是 package.json  */
        if(stat.isFile() && path !=='package.json' ){
          /* 创建读写流 */
          const readSteam = fs.createReadStream(oldSourcePath)
          const writeSteam = fs.createWriteStream(newSourcePath)
          readSteam.pipe(writeSteam)
          green( '创建文件：'+ newSourcePath  )
          fileCount--
          completeControl(cb)
          /* 判断是文件夹，对文件夹单独进行 dirExist 操作 */
        }else if(stat.isDirectory()){
          if(path!=='.git' && path !=='package.json' ){
            dirCount++
            dirExist( oldSourcePath , newSourcePath ,copyFile,cb)
          }
        }
      })
    })
  })
}

/**
 *
 * @param {*} sourcePath  //template资源路径
 * @param {*} currentPath  //当前项目路径
 * @param {*} copyCallback  // 上面的 copy 函数
 * @param {*} cb    //项目复制完成回调函数
 */
function dirExist(sourcePath,currentPath,copyCallback,cb){
  fs.access(currentPath,(ext=>{
    if(ext){
      /* 递归调用copy函数 */
      copyCallback( sourcePath , currentPath,cb)
    }else {
      fs.mkdir(currentPath,()=>{
        fileCount--
        dirCount--
        copyCallback( sourcePath , currentPath,cb)
        yellow('创建文件夹：'+ currentPath )
        completeControl(cb)
      })
    }
  }))
}

function completeControl(cb){
  /* 三变量均为0，异步I/O执行完毕。 */
  if(fileCount === 0 && dirCount ===0 && flat===0){
    green('------构建完成-------')
    if(cb && !isInstall ){
      isInstall = true
      blue('-----开始install-----')
      cb(()=>{
        blue('-----完成install-----')
        /* 判断是否存在webpack  */
        runProject()
      })
    }
  }
}

function runProject(){
  try{
    /* 继续调用 npm 执行，npm start 命令 */
    const start = npm([ 'start' ])
    start()
  }catch(e){
    red('自动启动失败，请手动npm start 启动项目')
  }
}

