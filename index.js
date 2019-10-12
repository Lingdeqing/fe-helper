#!/usr/bin/env node

const execa = require('execa');
const fs = require('fs-extra');
const path = require('path');
const codeCheckDir = __dirname;

async function copyFile(framework, filename) {
  if (fs.existsSync(filename)) {
    return;
  }
  await fs.copy(path.resolve(codeCheckDir, `${framework}/${filename}`), filename);
}

async function packageJson(key, value, cli) {
  const filepath = 'package.json';
  const json = await fs.readJson(filepath);
  if(cli){
    json.scripts = {
      ...(json.scripts || {}),
      [value]: cli
    }
  } else {
    json[key] = value;
  }
  await fs.outputJSON(filepath, json, {
    spaces: 2
  });
}

async function task(framework) {
  // 安装依赖
  await execa.shell(`npm i -D prettier pretty-quick eslint-config-prettier eslint-plugin-prettier \
  eslint-config-standard eslint-plugin-standard eslint-plugin-import eslint-plugin-node eslint-plugin-promise \
  husky  lint-staged `, {
    stdio: 'inherit',
  });

  // 拷贝配置文件
  await copyFile(framework, '.eslintrc.js');
  await copyFile(framework, '.eslintignore');
  await copyFile(framework, '.prettierrc.js');
  await copyFile(framework, '.prettierignore');

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
  await packageJson(
    "scripts",
    "fix",
    `eslint "src/**/*.@(vue|js|jsx)"  --fix && prettier "src/**/*.@(c|le|sc)ss"  --write`
  )
}

async function vueInit() {
  const framework = 'vue';
  // 安装依赖
  await execa.shell(`npm i -D prettier pretty-quick eslint-config-prettier eslint-plugin-prettier husky lint-staged`, {
    stdio: 'inherit',
  });

  // 拷贝配置文件
  await copyFile(framework, '.eslintignore');
  await copyFile(framework, '.prettierrc.js');
  await copyFile(framework, '.prettierignore');

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
      "*.{js,vue}": [
        "eslint --fix",
        "git add"
      ],
      "*": "pretty-quick --staged"
    }
  )
  await packageJson(
    "scripts",
    "fix",
    `eslint "src/**/*.@(vue|js|jsx)"  --fix && prettier "src/**/*.@(c|le|sc)ss"  --write`
  )

}

const args = process.argv.slice(2);
if (args[0] === 'react') {
  task('react');
} else if (args[0] === 'vue') {
  vueInit();
} else {
  task('default');
}