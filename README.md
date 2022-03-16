# PIXI-Game-Template

MVCを用いるゲーム開発用の自分用のテンプレートです。
依存関係を整えた上でBox, Delegate, Logic, Viewという4つのセットを自動作成してくれます。
これらは@asuratoが独自に設定したもので未完成です。

## 準備
```
yarn install
```
or
```
npm install
```

## ゲーム開始
```
yarn start
```
or
```
npm start
```

## セット作成
```
ts-node tool/templateMaker.ts hoge
```
or
```
yarn make hoge
```

とするとsrc/box/hogeというフォルダに1セットが作成されます

## tool/model.tsとtool/proxy.tsとtool/state.ts
パラメータの更新を受けてイベントが自動的に発火される仕組みのテストプログラム


