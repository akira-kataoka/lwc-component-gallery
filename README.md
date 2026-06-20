# LWC コンポーネント

汎用 Salesforce Lightning Web Component（LWC）を **閲覧・コピー・ダウンロード** できる配布ページです。

🔗 **公開サイト**: https://akira-kataoka.github.io/lwc-component-gallery/

## 内容

- [`force-app/main/default/lwc`](force-app/main/default/lwc) … 汎用 LWC 26 種（実体）
- [`lwc-gallery`](lwc-gallery) … 配布カタログ（ライブデモ・ソースコピー/DL・ドキュメント）

カテゴリ: 表示 / アクション / レイアウト / オーバーレイ / ナビゲーション / フォーム / フィードバック

## ローカルで開く

```bash
# そのままブラウザで開くだけ（ビルド不要）
lwc-gallery/index.html
```

## 再生成（LWC を更新したら）

```bash
cd lwc-gallery
node build.mjs   # 実 LWC から data.js / components.css を再生成
```

## デプロイ

`main`/`master` への push で [GitHub Actions](.github/workflows/pages.yml) が
`lwc-gallery` を GitHub Pages へ公開します。

## Salesforce へのデプロイ

各 LWC は `isExposed=true`。Lightning アプリビルダーから配置できます。

```bash
sf project deploy start -d force-app/main/default/lwc
```
