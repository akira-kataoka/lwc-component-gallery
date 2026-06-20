# LWC コンポーネント配布ギャラリー

汎用 Lightning Web Component（LWC）を **閲覧・コピー・ダウンロード** できるスタンドアロンの配布ページです。
ブラウザで [index.html](index.html) を開くだけで動作し、Salesforce 環境やビルドツールは不要です（GitHub Pages 等でそのまま公開可）。

## 何ができる？

各コンポーネントについて以下を提供します。

- **ライブプレビュー** — 実 LWC の CSS を使った見た目・動作の再現（クリックやソートも動く）
- **プロパティ / イベント / スロット** の一覧（API リファレンス）
- **使い方テンプレート** のスニペット
- **ソース表示** — HTML / JS / CSS / meta をタブ切替で表示、ボタンでコピー & ダウンロード

## 収録コンポーネント（16種）

左サイドバーはカテゴリごとに折りたためるため、種類が増えても氾濫しません。

| カテゴリ | コンポーネント | タグ | 概要 |
| --- | --- | --- | --- |
| 表示 | UI Badge | `<c-ui-badge>` | ステータスバッジ（色バリアント・アイコン） |
| 表示 | UI Data Table | `<c-ui-data-table>` | 列ソート・行選択テーブル |
| 表示 | UI Progress Bar | `<c-ui-progress-bar>` | 進捗バー（色バリアント・%表示） |
| 表示 | UI Avatar | `<c-ui-avatar>` | 画像/イニシャルのアバター |
| 表示 | UI Pill | `<c-ui-pill>` | 削除可能なタグ（remove） |
| アクション | UI Button | `<c-ui-button>` | 汎用ボタン（5バリアント・無効化・click） |
| レイアウト | UI Card | `<c-ui-card>` | ヘッダ/本文/アクション/フッタのカード |
| レイアウト | UI Accordion | `<c-ui-accordion>` | アコーディオン（単独/複数オープン） |
| オーバーレイ | UI Modal | `<c-ui-modal>` | モーダル（背景/×/Esc で close） |
| ナビゲーション | UI Tabs | `<c-ui-tabs>` | タブ（select イベント） |
| ナビゲーション | UI Pagination | `<c-ui-pagination>` | ページネーション（change） |
| フォーム | UI Input | `<c-ui-input>` | テキスト入力（ラベル・必須・change） |
| フォーム | UI Toggle | `<c-ui-toggle>` | ON/OFF スイッチ（change） |
| フィードバック | UI Alert | `<c-ui-alert>` | インラインアラート（4バリアント・閉じる） |
| フィードバック | UI Spinner | `<c-ui-spinner>` | ローディングスピナー（サイズ・色） |
| フィードバック | UI Toast | `<c-ui-toast>` | トースト通知（show()・自動クローズ） |

実体は [`../force-app/main/default/lwc`](../force-app/main/default/lwc) 配下の本物の LWC です。

## ファイル構成

```
lwc-gallery/
├── index.html        … 配布ページ本体
├── styles.css        … ページのレイアウト/UI
├── app.js            … ナビ・ライブデモ・ソースビューア・コピー/DL
├── build.mjs         … 実 LWC からデータを生成するスクリプト
├── data.js           … 【自動生成】各 LWC のメタ情報 + ソース
└── components.css    … 【自動生成】全 LWC の CSS 連結（デモ用）
```

`data.js` と `components.css` は **自動生成** です。直接編集しないでください。

## 再生成（LWC を更新したら）

LWC 本体を編集したら、ソース表示とデモを同期するために再ビルドします。

```bash
cd lwc-gallery
node build.mjs
```

`build.mjs` が `force-app/main/default/lwc` を読み取り、`data.js` と `components.css` を作り直します。
これによりカタログは常に実 LWC と一致し、ソースを二重管理しません。

## Salesforce へのデプロイ

各コンポーネントは `lightning__AppPage` / `lightning__RecordPage` / `lightning__HomePage` に公開済み
（`isExposed=true`）。Lightning アプリビルダーからページに配置できます。

```bash
# 例: 全 LWC をデプロイ
sf project deploy start -d force-app/main/default/lwc
```

## 注意

- プレビューは実 LWC の CSS を用いた **再現** です。`lightning-icon` はギャラリー側では省略しています
  （アイコンは Salesforce 上でのみ描画）。
- ページは静的なため、`file://` で直接開いてもクリップボードコピー以外は動作します。
