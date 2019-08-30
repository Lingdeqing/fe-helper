1. 安装依赖
```
npm i -D babel-eslint@10.0.2 eslint@5.16.0 prettier pretty-quick eslint-config-prettier eslint-plugin-prettier \
     eslint-config-standard eslint-plugin-standard eslint-plugin-import eslint-plugin-node eslint-plugin-promise \
     husky  lint-staged \
```

2. 拷贝配置文件
```
cp ./react/* your_project_root
```

3. 配置package.json
```
{
    "husky": {
        "hooks": {
            "pre-commit": "lint-staged"
        }
    },
    "lint-staged": {
        "*.{js,jsx}": [
            "eslint --fix",
            "git add"
        ],
        "*": "pretty-quick --staged"
    }
}
```