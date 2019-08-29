const { json, lines, packageJson, install } = require('mrm-core')
 
function task() {
  // 安装依赖
  const packages = 'eslint-config-standard eslint-plugin-standard eslint-plugin-import eslint-plugin-node eslint-plugin-promise'.split(' ')
  install(packages)

  // .eslintrc

  // .eslintignore

  // package.json

  // Install dependencies
}
 
task();