#!/usr/bin/env node
// Node Cli要有的固定格式
// Linux 或者 Mac 系统下要 修改 文件权限
const fs = require('fs-extra')
const path = require('path')
const inquirer = require('inquirer') // 用来和用户交互
const ejs = require('ejs') // 文件模版语法
const readdirp = require('readdirp');
inquirer.prompt([
  {
    type: 'input',
    name: "name",
    message: "Project name"
  },
  {
    type: 'list',
    name: "type",
    message: "选择项目类型",
    choices: ['a', 'b']
  }
]).then(async (anwsers) => {
  console.log(anwsers)
  const tempDir = path.join(__dirname, '../gulpTemplate');
  const destDir = process.cwd()
  for await (const entry of readdirp(tempDir)) {
    const filePath = entry.path;
    console.log('read dirp',filePath)
    ejs.renderFile(path.join(tempDir, filePath), anwsers, (err, result) => {
      if (err) throw err;

      fs.ensureFileSync(path.join(destDir, filePath))
      fs.writeFileSync(path.join(destDir, filePath), result)
    })
  }
})