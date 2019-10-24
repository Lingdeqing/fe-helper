# install
```
npm i -D git+ssh://git@v9.git.n.xiaomi.com:miot-fe-arch/code-check.git
```

# usage
## for react
```
npx code_check react
```
## for vue
```
npx code_check vue
```
## for default
```
npx code_check
```

## how to fix
```
npm run fix
```

# vscode
1. 安装eslint插件
2. 配置eslint保存时格式化
```
{
    "eslint.enable": true,
    "eslint.autoFixOnSave": true,
    "eslint.validate": [
        {
            "language": "javascript",
            "autoFix": true
        },
        {
            "language": "javascriptreact",
            "autoFix": true
        },
        {
            "language": "html",
            "autoFix": true
        },
        {
            "language": "vue",
            "autoFix": true
        },
        {
            "language": "typescript",
            "autoFix": true
        },
        {
            "language": "typescriptreact",
            "autoFix": true
        }
    ]
}
```
# webstorm2019.1
1. 打开eslint
![这里写图片描述](http://...)
2. 设置eslint fix快捷键
3. 录制宏 先按eslint fix快捷键(shift+command+;) 再按保存快捷键(command+s) 保存宏命名宏叫eslint fix save
4. 设置宏快捷键为(command+s)
