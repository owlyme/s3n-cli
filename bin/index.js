#!/usr/bin/env node
// Node Cli要有的固定格式
// Linux 或者 Mac 系统下要 修改 文件权限
const inquirer = require('inquirer') // 用来和用户交互
const createTemplate = require('../lib')
inquirer.prompt([
  {
    type: 'input',
    name: "projectName",
    message: "输入项目名"
  },
  {
    type: 'list',
    name: "tempType",
    message: "选择项目类型",
    choices: ['传统多页面开发', '小程序开发']
  }
]).then(async (anwsers) => {
  console.log(anwsers)
  createTemplate(anwsers)
})