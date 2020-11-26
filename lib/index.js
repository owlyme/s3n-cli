const fs = require('fs-extra')
const path = require('path')
const ejs = require('ejs') // 文件模版语法
const readdirp = require('readdirp');

const templateMap = {
    '传统多页面开发': '../multiplePages',
    '小程序开发': '../miniprogram'
}

const createEslintRules = (destDir) => {
    fs.copySync(path.join(__dirname, '../public/eslint/.eslintrc.js'), path.join(destDir, '.eslintrc.js'))
}

module.exports = async (anwsers) => {
    let {projectName, tempType} = anwsers
    const tempDir = path.join(__dirname, templateMap[tempType]);
    const destDir = path.join(process.cwd(), projectName);
    for await (const entry of readdirp(tempDir)) {
      const filePath = entry.path;
        console.log(filePath)
      ejs.renderFile(path.join(tempDir, filePath), anwsers, (err, result) => {
        if (err) throw err;
  
        fs.ensureFileSync(path.join(destDir, filePath))
        fs.writeFileSync(path.join(destDir, filePath), result)
      })
    }

    createEslintRules(destDir)

    console.log('done')
}
 
