const chalk = require('chalk')
const colors = [ 'green' , 'blue' , 'yellow' ,'red'  ]
const colorText= {}

colors.forEach(color=>{
    colorText[color] = function(text,isConsole=true){
         return isConsole ? console.log( chalk[color](text) ) : chalk[color](text)
    }
})
module.exports = colorText