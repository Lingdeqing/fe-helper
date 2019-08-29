
# 安装依赖
```
npm i -D eslint@5.16.0 prettier pretty-quick eslint-config-prettier eslint-plugin-prettier \
     eslint-config-standard eslint-plugin-standard eslint-plugin-import eslint-plugin-node eslint-plugin-promise \
     husky  lint-staged \
```

# 设置package.json

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