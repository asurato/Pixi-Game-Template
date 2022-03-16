/**
 * テンプレートを作るスクリプト
 * ts-node tool/templateMaker.ts hoge
 * または
 * npm run make -- hoge
 * と入力すると自動で1セット作ってくれる
 */

// $ node test.js aaa bbb ccc ddd eee
// の aaa は process.argv[2]

import fs from "fs"
import path from "path"

const word = process.argv[2]
const className = word.charAt(0).toUpperCase() + word.slice(1)
const folderName = word.charAt(0).toLowerCase() + word.slice(1)
const location = path.join('src', 'box', folderName)

function convertText(text: string) {
  return text.replace(/template/g, folderName).replace(/Template/g, className).replace(/\/src\/abstract\//g, '/abstract/')
}

if (fs.existsSync(path.join('src', 'box', folderName))) {
  console.log("既に存在します")
  process.exit(1)
} else {
  fs.mkdirSync(location, { recursive: true })
  console.log('フォルダ作成完了')
}

let originText = fs.readFileSync('tool/template/templateDelegate.ts',).toString()
fs.writeFileSync(path.join(location, folderName + 'Delegate.ts'), convertText(originText))

originText = fs.readFileSync('tool/template/templateLogic.ts').toString()
fs.writeFileSync(path.join(location, folderName + 'Logic.ts'), convertText(originText))

originText = fs.readFileSync('tool/template/templateView.ts').toString()
fs.writeFileSync(path.join(location, folderName + 'View.ts'), convertText(originText))

originText = fs.readFileSync('tool/template/templateBox.ts').toString()
fs.writeFileSync(path.join(location, folderName + 'Box.ts'), convertText(originText))

console.log('全行程完了')