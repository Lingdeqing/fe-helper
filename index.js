const execa = require('execa');
const fs = require('fs-extra');
const path = require('path');
const codeCheckDir = __dirname;

async function copyFile(filename) {
  await fs.copy(path.resolve(__dirname, filename), filename);
}

async function packageJson(key, value) {
  const filepath = 'package.json';
  const json = await fs.readJson(filepath);
  json[key] = value;
  await fs.outputJSON(filepath, json, {
    spaces: 2
  });
}

async function task() {
  // 安装依赖
  await execa.shell(`npm i -D eslint@5.16.0 babel-eslint prettier pretty-quick eslint-config-prettier eslint-plugin-prettier \
  eslint-config-standard eslint-plugin-standard eslint-plugin-import eslint-plugin-node eslint-plugin-promise \
  husky  lint-staged `, {
      stdio: 'inherit',
    });

  // 拷贝配置文件
  await copyFile('.eslintrc.js');
  await copyFile('.eslintignore');
  await copyFile('.prettierrc.js');
  await copyFile('.prettierignore');

  //修改package.json文件
  await packageJson(
    'husky',
    {
      "hooks": {
        "pre-commit": "lint-staged"
      }
    }
  );
  await packageJson(
    "lint-staged",
    {
      "*.{js,jsx}": [
        "eslint --fix",
        "git add"
      ],
      "*": "pretty-quick --staged"
    }
  )
}

task();