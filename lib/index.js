const fs = require('fs-extra')
const path = require('path')
const ejs = require('ejs') // 文件模版语法
const readdirp = require('readdirp');


const templateMap = {
    '传统多页面开发': '../multiplePages',
    '小程序开发': '../miniprogram'
}

module.exports = async (anwsers) => {
    let {tempType} = anwsers
    const tempDir = path.join(__dirname, templateMap[tempType]);
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
}
 
