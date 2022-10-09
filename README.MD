# React v.18 with Server Side Rendering and SCSS
## Требования к установке `Node v.16`
## Установка
```shell
npm ci
```
Для Windows необходимо доустановить пакет.
```shell
npm install -g win-node-env
```
## Запуск
```shell
npm run dev
npm run prod
```
## Настройка для autoprefixer и babel в `package.json`
```json
"babel": {
  "presets": [
    "@babel/preset-env",
    [ "@babel/preset-react", { "runtime": "automatic" } ]
  ]
},
"nodemonConfig": {
  "ignore": [ "build/*" ]
},
"browserslist": {
  "production": [
    "> 0.5% in RU",
    "last 30 major versions",
    "not dead"
  ],
  "development": [
    "> 90% in RU",
    "last 10 major versions",
    "not dead"
  ],
  "ssr": [ "node 16"]
}
```
