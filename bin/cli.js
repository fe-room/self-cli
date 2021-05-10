#!/usr/bin/env node
"use strict";
const { Command } = require("commander"); // Commander.js node.js命令行界面的完整解决方案
const program = new Command();
const { green } = require("../utils/chalk"); //修改命令行字体颜色
const inquirerMachine = require("../utils/inquirer")  //交互模块
const create = require('../src/create')
program.version("1.0.0");
program
    .command("create")
    .description('create a project')
    .action(() => {
        green('🎉🎉🎉欢迎使用klzz-react-cli,轻松构建react ts项目🎉🎉🎉')
        inquirerMachine().then((config) => {
            create(config)
        })
    })
program.parse(process.argv)  //执行上述命令