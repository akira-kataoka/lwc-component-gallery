#!/usr/bin/env node
/**
 * build.mjs — LWC ギャラリー（配布ページ）のデータ生成スクリプト。
 *
 * force-app/main/default/lwc 配下の実 LWC ソースを読み取り、
 *   - data.js        : 各コンポーネントのメタ情報 + ソース文字列
 *   - components.css : 全コンポーネント CSS の連結（ライブデモ用）
 * を生成する。これによりカタログのソース表示・ライブデモは
 * 常に実 LWC と同期する（二重管理しない）。
 *
 * 使い方:  node build.mjs
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const LWC_DIR = join(__dirname, '..', 'force-app', 'main', 'default', 'lwc');

/**
 * コンポーネント定義（フォルダ名・ドキュメント・デモ種別）。
 * ソース本文はビルド時に実ファイルから読み込むためここには持たない。
 */
const COMPONENTS = [
    {
        id: 'uiBadge',
        title: 'UI Badge',
        icon: '🏷️',
        category: '表示',
        demo: 'badge',
        description:
            'ラベル・色バリアント・アイコンを表示する純粋なステータスバッジ。',
        props: [
            { name: 'label', type: 'String', def: '—', desc: '表示テキスト' },
            {
                name: 'variant',
                type: 'String',
                def: "'neutral'",
                desc: 'neutral | info | success | warning | error'
            },
            {
                name: 'icon-name',
                type: 'String',
                def: '—',
                desc: '任意の lightning-icon 名（例: utility:check）'
            }
        ],
        events: [],
        usage: `<c-ui-badge label="承認済み" variant="success"></c-ui-badge>`
    },
    {
        id: 'uiButton',
        title: 'UI Button',
        icon: '🔘',
        category: 'アクション',
        demo: 'button',
        description:
            '色バリアント・アイコン・無効化に対応した汎用ボタン。click イベントを発火。',
        props: [
            { name: 'label', type: 'String', def: '—', desc: 'ボタンラベル' },
            {
                name: 'variant',
                type: 'String',
                def: "'brand'",
                desc: 'brand | neutral | outline | success | destructive'
            },
            {
                name: 'icon-name',
                type: 'String',
                def: '—',
                desc: '任意の lightning-icon 名'
            },
            {
                name: 'disabled',
                type: 'Boolean',
                def: 'false',
                desc: 'true で無効化'
            },
            {
                name: 'stretch',
                type: 'Boolean',
                def: 'false',
                desc: 'true で横幅いっぱい'
            }
        ],
        events: [{ name: 'click', desc: 'ボタン押下時に発火' }],
        usage: `<c-ui-button label="保存" variant="brand" onclick={handleSave}></c-ui-button>`
    },
    {
        id: 'uiCard',
        title: 'UI Card',
        icon: '🗂️',
        category: 'レイアウト',
        demo: 'card',
        description:
            'ヘッダ（タイトル・アイコン）、本文、アクション、フッタのスロットを持つ汎用カード。',
        props: [
            { name: 'title', type: 'String', def: '—', desc: 'ヘッダタイトル' },
            {
                name: 'icon-name',
                type: 'String',
                def: '—',
                desc: '任意の lightning-icon 名（例: standard:account）'
            }
        ],
        slots: [
            { name: '(default)', desc: '本文' },
            { name: 'actions', desc: 'ヘッダ右のアクション領域' },
            { name: 'footer', desc: 'フッタ（空なら自動的に非表示）' }
        ],
        events: [],
        usage: `<c-ui-card title="取引先" icon-name="standard:account">\n    本文をここに記述\n    <div slot="footer">フッタ</div>\n</c-ui-card>`
    },
    {
        id: 'uiModal',
        title: 'UI Modal',
        icon: '🪟',
        category: 'オーバーレイ',
        demo: 'modal',
        description:
            'open プロパティで表示制御するモーダル。背景・×・Esc で close イベントを発火。',
        props: [
            { name: 'header', type: 'String', def: '—', desc: 'ヘッダタイトル' },
            {
                name: 'open',
                type: 'Boolean',
                def: 'false',
                desc: 'true で表示'
            },
            {
                name: 'size',
                type: 'String',
                def: "'medium'",
                desc: 'small | medium | large'
            }
        ],
        slots: [
            { name: '(default)', desc: '本文' },
            { name: 'footer', desc: 'フッタ（ボタン等）' }
        ],
        events: [{ name: 'close', desc: '閉じる操作時に発火' }],
        usage: `<c-ui-modal header="確認" open={isOpen} onclose={handleClose}>\n    本当に削除しますか？\n    <div slot="footer">\n        <c-ui-button label="OK"></c-ui-button>\n    </div>\n</c-ui-modal>`
    },
    {
        id: 'uiTabs',
        title: 'UI Tabs',
        icon: '📑',
        category: 'ナビゲーション',
        demo: 'tabs',
        description:
            'tabs 配列でヘッダと本文を切替える汎用タブ。select イベントで選択値を通知。',
        props: [
            {
                name: 'tabs',
                type: 'Array',
                def: '[]',
                desc: '[{ label, value, content }] の配列'
            }
        ],
        events: [
            { name: 'select', desc: 'タブ選択時に発火（detail.value）' }
        ],
        usage: `<c-ui-tabs tabs={tabs} onselect={handleSelect}></c-ui-tabs>`
    },
    {
        id: 'uiAccordion',
        title: 'UI Accordion',
        icon: '📂',
        category: 'レイアウト',
        demo: 'accordion',
        description:
            'sections 配列を折りたたみ表示。allowMultiple で複数同時オープンを制御。',
        props: [
            {
                name: 'sections',
                type: 'Array',
                def: '[]',
                desc: '[{ label, value, content }] の配列'
            },
            {
                name: 'allow-multiple',
                type: 'Boolean',
                def: 'false',
                desc: 'true で複数同時オープン'
            }
        ],
        events: [
            { name: 'toggle', desc: '開閉時に発火（detail.open: 開いている value 配列）' }
        ],
        usage: `<c-ui-accordion sections={sections}></c-ui-accordion>`
    },
    {
        id: 'uiDataTable',
        title: 'UI Data Table',
        icon: '📊',
        category: '表示',
        demo: 'datatable',
        description:
            '列ソート（昇順⇄降順）と行クリック（rowselect）に対応した汎用データテーブル。',
        props: [
            {
                name: 'columns',
                type: 'Array',
                def: '[]',
                desc: '[{ label, fieldName, sortable }] の配列'
            },
            {
                name: 'data',
                type: 'Array',
                def: '[]',
                desc: '表示するレコード（オブジェクト配列）'
            }
        ],
        events: [
            { name: 'rowselect', desc: '行クリック時に発火（detail.row）' }
        ],
        usage: `<c-ui-data-table columns={columns} data={rows} onrowselect={handleRow}></c-ui-data-table>`
    },
    {
        id: 'uiProgressBar',
        title: 'UI Progress Bar',
        icon: '📶',
        category: '表示',
        demo: 'progress',
        description:
            '0〜100 の進捗を色付きバーで表示。任意でパーセント数値を併記。',
        props: [
            { name: 'value', type: 'Number', def: '0', desc: '進捗率 0〜100' },
            {
                name: 'variant',
                type: 'String',
                def: "'brand'",
                desc: 'brand | success | warning | error'
            },
            {
                name: 'show-label',
                type: 'Boolean',
                def: 'false',
                desc: 'true でパーセント表示'
            }
        ],
        events: [],
        usage: `<c-ui-progress-bar value="65" variant="success" show-label></c-ui-progress-bar>`
    },
    {
        id: 'uiInput',
        title: 'UI Input',
        icon: '⌨️',
        category: 'フォーム',
        demo: 'input',
        description:
            'ラベル・プレースホルダ・必須表示に対応したテキスト入力。change イベントを発火。',
        props: [
            { name: 'label', type: 'String', def: '—', desc: 'ラベル' },
            { name: 'value', type: 'String', def: "''", desc: '入力値' },
            {
                name: 'placeholder',
                type: 'String',
                def: "''",
                desc: 'プレースホルダ'
            },
            {
                name: 'type',
                type: 'String',
                def: "'text'",
                desc: 'text | email | number | password 等'
            },
            {
                name: 'required',
                type: 'Boolean',
                def: 'false',
                desc: 'true で必須マーク'
            },
            {
                name: 'disabled',
                type: 'Boolean',
                def: 'false',
                desc: 'true で無効化'
            }
        ],
        events: [
            { name: 'change', desc: '入力時に発火（detail.value）' }
        ],
        usage: `<c-ui-input label="氏名" required onchange={handleChange}></c-ui-input>`
    },
    {
        id: 'uiToggle',
        title: 'UI Toggle',
        icon: '🔀',
        category: 'フォーム',
        demo: 'toggle',
        description:
            'ON/OFF を切替える汎用スイッチ。change イベント (detail.checked) を発火。',
        props: [
            { name: 'label', type: 'String', def: '—', desc: 'ラベル' },
            {
                name: 'checked',
                type: 'Boolean',
                def: 'false',
                desc: 'ON 状態'
            },
            {
                name: 'disabled',
                type: 'Boolean',
                def: 'false',
                desc: 'true で無効化'
            }
        ],
        events: [
            { name: 'change', desc: '切替時に発火（detail.checked）' }
        ],
        usage: `<c-ui-toggle label="通知を受け取る" checked onchange={handleToggle}></c-ui-toggle>`
    },
    {
        id: 'uiAvatar',
        title: 'UI Avatar',
        icon: '👤',
        category: '表示',
        demo: 'avatar',
        description:
            '画像があれば画像、なければ名前のイニシャルを表示するアバター。',
        props: [
            {
                name: 'name',
                type: 'String',
                def: "''",
                desc: 'イニシャル生成に使う名前'
            },
            {
                name: 'src',
                type: 'String',
                def: '—',
                desc: '画像 URL（指定時は画像表示）'
            },
            {
                name: 'size',
                type: 'String',
                def: "'medium'",
                desc: 'small | medium | large'
            },
            {
                name: 'variant',
                type: 'String',
                def: "'circle'",
                desc: 'circle | square'
            }
        ],
        events: [],
        usage: `<c-ui-avatar name="田中 太郎" size="large"></c-ui-avatar>`
    },
    {
        id: 'uiPill',
        title: 'UI Pill',
        icon: '🟦',
        category: '表示',
        demo: 'pill',
        description:
            'ラベルを表示する汎用ピル（タグ）。removable で×ボタンと remove イベントを有効化。',
        props: [
            { name: 'label', type: 'String', def: '—', desc: '表示テキスト' },
            {
                name: 'removable',
                type: 'Boolean',
                def: 'false',
                desc: 'true で削除ボタン表示'
            }
        ],
        events: [
            { name: 'remove', desc: '×ボタン押下時に発火' }
        ],
        usage: `<c-ui-pill label="重要" removable onremove={handleRemove}></c-ui-pill>`
    },
    {
        id: 'uiAlert',
        title: 'UI Alert',
        icon: '📢',
        category: 'フィードバック',
        demo: 'alert',
        description:
            'バリアントに応じた色・アイコンでメッセージを表示するインラインアラート。',
        props: [
            {
                name: 'variant',
                type: 'String',
                def: "'info'",
                desc: 'info | success | warning | error'
            },
            { name: 'title', type: 'String', def: '—', desc: '見出し（任意）' },
            {
                name: 'closable',
                type: 'Boolean',
                def: 'false',
                desc: 'true で閉じるボタン表示'
            }
        ],
        slots: [{ name: '(default)', desc: 'メッセージ本文' }],
        events: [{ name: 'close', desc: '閉じる操作時に発火' }],
        usage: `<c-ui-alert variant="success" title="保存しました" closable>\n    変更内容が保存されました。\n</c-ui-alert>`
    },
    {
        id: 'uiSpinner',
        title: 'UI Spinner',
        icon: '⏳',
        category: 'フィードバック',
        demo: 'spinner',
        description:
            'サイズ・色バリアントに対応した CSS アニメーションのローディングスピナー。',
        props: [
            {
                name: 'size',
                type: 'String',
                def: "'medium'",
                desc: 'small | medium | large'
            },
            {
                name: 'variant',
                type: 'String',
                def: "'brand'",
                desc: 'brand | inverse'
            },
            {
                name: 'alternative-text',
                type: 'String',
                def: "'読み込み中'",
                desc: 'スクリーンリーダー向け代替テキスト'
            }
        ],
        events: [],
        usage: `<c-ui-spinner size="large"></c-ui-spinner>`
    },
    {
        id: 'uiToast',
        title: 'UI Toast',
        icon: '🔔',
        category: 'フィードバック',
        demo: 'toast',
        description:
            'show(message, variant) で表示し一定時間後に自動で閉じるトースト通知。',
        props: [
            {
                name: 'variant',
                type: 'String',
                def: "'info'",
                desc: '既定バリアント info | success | warning | error'
            },
            {
                name: 'duration',
                type: 'Number',
                def: '3000',
                desc: '自動クローズまでの ms（0 で無効）'
            }
        ],
        events: [{ name: 'close', desc: '閉じた時に発火' }],
        methods: [
            { name: 'show(message, variant)', desc: 'トーストを表示' },
            { name: 'close()', desc: 'トーストを閉じる' }
        ],
        usage: `// 親コンポーネントから\nthis.template.querySelector('c-ui-toast').show('保存しました', 'success');`
    },
    {
        id: 'uiPagination',
        title: 'UI Pagination',
        icon: '⏬',
        category: 'ナビゲーション',
        demo: 'pagination',
        description:
            'totalPages / currentPage を受け取りページ番号を表示。change イベントで遷移先を通知。',
        props: [
            {
                name: 'total-pages',
                type: 'Number',
                def: '1',
                desc: '総ページ数'
            },
            {
                name: 'current-page',
                type: 'Number',
                def: '1',
                desc: '現在ページ（1 始まり）'
            }
        ],
        events: [
            { name: 'change', desc: 'ページ変更時に発火（detail.page）' }
        ],
        usage: `<c-ui-pagination total-pages="8" current-page="1" onchange={handlePage}></c-ui-pagination>`
    },
    {
        id: 'uiSelect',
        title: 'UI Select',
        icon: '🔽',
        category: 'フォーム',
        demo: 'select',
        description:
            'options 配列を表示するドロップダウン。選択時に change イベント (detail.value) を発火。',
        props: [
            { name: 'label', type: 'String', def: '—', desc: 'ラベル' },
            {
                name: 'options',
                type: 'Array',
                def: '[]',
                desc: '[{ label, value }] の配列'
            },
            { name: 'value', type: 'String', def: "''", desc: '選択値' },
            {
                name: 'placeholder',
                type: 'String',
                def: "'選択してください'",
                desc: '未選択時の表示'
            },
            {
                name: 'disabled',
                type: 'Boolean',
                def: 'false',
                desc: 'true で無効化'
            }
        ],
        events: [{ name: 'change', desc: '選択時に発火（detail.value）' }],
        usage: `<c-ui-select label="部署" options={options} onchange={handleChange}></c-ui-select>`
    },
    {
        id: 'uiCheckbox',
        title: 'UI Checkbox',
        icon: '☑️',
        category: 'フォーム',
        demo: 'checkbox',
        description:
            'ラベル付きチェックボックス。変更時に change イベント (detail.checked) を発火。',
        props: [
            { name: 'label', type: 'String', def: '—', desc: 'ラベル' },
            {
                name: 'checked',
                type: 'Boolean',
                def: 'false',
                desc: 'チェック状態'
            },
            {
                name: 'disabled',
                type: 'Boolean',
                def: 'false',
                desc: 'true で無効化'
            }
        ],
        events: [{ name: 'change', desc: '変更時に発火（detail.checked）' }],
        usage: `<c-ui-checkbox label="利用規約に同意" onchange={handleChange}></c-ui-checkbox>`
    },
    {
        id: 'uiTextarea',
        title: 'UI Textarea',
        icon: '📝',
        category: 'フォーム',
        demo: 'textarea',
        description:
            'ラベル・行数に対応した複数行入力。入力時に change イベント (detail.value) を発火。',
        props: [
            { name: 'label', type: 'String', def: '—', desc: 'ラベル' },
            { name: 'value', type: 'String', def: "''", desc: '入力値' },
            {
                name: 'placeholder',
                type: 'String',
                def: "''",
                desc: 'プレースホルダ'
            },
            { name: 'rows', type: 'Number', def: '4', desc: '表示行数' },
            {
                name: 'disabled',
                type: 'Boolean',
                def: 'false',
                desc: 'true で無効化'
            }
        ],
        events: [{ name: 'change', desc: '入力時に発火（detail.value）' }],
        usage: `<c-ui-textarea label="備考" rows="5" onchange={handleChange}></c-ui-textarea>`
    },
    {
        id: 'uiBreadcrumb',
        title: 'UI Breadcrumb',
        icon: '🧭',
        category: 'ナビゲーション',
        demo: 'breadcrumb',
        description:
            'items 配列をパンくず表示。末尾以外のリンククリックで navigate イベント (detail.value) を発火。',
        props: [
            {
                name: 'items',
                type: 'Array',
                def: '[]',
                desc: '[{ label, value }] の配列'
            }
        ],
        events: [
            { name: 'navigate', desc: 'リンク押下時に発火（detail.value）' }
        ],
        usage: `<c-ui-breadcrumb items={items} onnavigate={handleNavigate}></c-ui-breadcrumb>`
    },
    {
        id: 'uiSteps',
        title: 'UI Steps',
        icon: '🪜',
        category: 'ナビゲーション',
        demo: 'steps',
        description:
            'steps 配列と current から、完了/現在/未到達を色分け表示するステップインジケータ。',
        props: [
            {
                name: 'steps',
                type: 'Array',
                def: '[]',
                desc: '[{ label }] の配列'
            },
            {
                name: 'current',
                type: 'Number',
                def: '1',
                desc: '現在ステップ（1 始まり）'
            }
        ],
        events: [],
        usage: `<c-ui-steps steps={steps} current="2"></c-ui-steps>`
    },
    {
        id: 'uiRating',
        title: 'UI Rating',
        icon: '⭐',
        category: '表示',
        demo: 'rating',
        description:
            'スター評価。クリックで値を変更し change イベント (detail.value) を発火。read-only で閲覧専用。',
        props: [
            { name: 'value', type: 'Number', def: '0', desc: '現在の評価値' },
            { name: 'max', type: 'Number', def: '5', desc: '星の数' },
            {
                name: 'read-only',
                type: 'Boolean',
                def: 'false',
                desc: 'true で閲覧専用'
            }
        ],
        events: [{ name: 'change', desc: '評価変更時に発火（detail.value）' }],
        usage: `<c-ui-rating value="3" onchange={handleRate}></c-ui-rating>`
    },
    {
        id: 'uiStat',
        title: 'UI Stat',
        icon: '🔢',
        category: '表示',
        demo: 'stat',
        description:
            'ラベル・大きな値・前期比（delta）を表示する KPI タイル。trend で増減色を切替え。',
        props: [
            { name: 'label', type: 'String', def: '—', desc: '指標ラベル' },
            { name: 'value', type: 'String', def: '—', desc: '主要な値' },
            { name: 'delta', type: 'String', def: '—', desc: '差分テキスト' },
            {
                name: 'trend',
                type: 'String',
                def: "'flat'",
                desc: 'up | down | flat'
            }
        ],
        events: [],
        usage: `<c-ui-stat label="今月の売上" value="¥1,250,000" delta="+12.5%" trend="up"></c-ui-stat>`
    },
    {
        id: 'uiDivider',
        title: 'UI Divider',
        icon: '➖',
        category: 'レイアウト',
        demo: 'divider',
        description:
            'ラベル付き／水平線の区切り。spacing で上下余白を調整する。',
        props: [
            {
                name: 'label',
                type: 'String',
                def: '—',
                desc: '中央ラベル（任意）'
            },
            {
                name: 'spacing',
                type: 'String',
                def: "'medium'",
                desc: 'small | medium | large'
            }
        ],
        events: [],
        usage: `<c-ui-divider label="または"></c-ui-divider>`
    },
    {
        id: 'uiTooltip',
        title: 'UI Tooltip',
        icon: '💬',
        category: 'オーバーレイ',
        demo: 'tooltip',
        description:
            'スロット要素にホバー／フォーカスすると content を吹き出し表示する。',
        props: [
            { name: 'content', type: 'String', def: '—', desc: '吹き出しテキスト' },
            {
                name: 'position',
                type: 'String',
                def: "'top'",
                desc: 'top | bottom | left | right'
            }
        ],
        slots: [{ name: '(default)', desc: 'ホバー対象の要素' }],
        events: [],
        usage: `<c-ui-tooltip content="詳細はこちら">\n    <c-ui-button label="?"></c-ui-button>\n</c-ui-tooltip>`
    },
    {
        id: 'uiEmptyState',
        title: 'UI Empty State',
        icon: '🗒️',
        category: 'フィードバック',
        demo: 'emptystate',
        description:
            'データ未登録・検索0件時のプレースホルダ。アイコン・見出し・アクションを中央表示。',
        props: [
            { name: 'heading', type: 'String', def: '—', desc: '見出し' },
            {
                name: 'message',
                type: 'String',
                def: '—',
                desc: '補足メッセージ（任意）'
            },
            {
                name: 'icon',
                type: 'String',
                def: "'📭'",
                desc: 'アイコン文字（絵文字可）'
            }
        ],
        slots: [{ name: '(default)', desc: 'アクション（ボタン等）' }],
        events: [],
        usage: `<c-ui-empty-state heading="データがありません" message="新規作成してください">\n    <c-ui-button label="新規作成"></c-ui-button>\n</c-ui-empty-state>`
    },
    {
        id: 'uiRadioGroup',
        title: 'UI Radio Group',
        icon: '🔘',
        category: 'フォーム',
        demo: 'radio',
        description:
            'options 配列から単一選択のラジオボタンを生成。選択時に change イベント (detail.value) を発火。',
        props: [
            { name: 'label', type: 'String', def: '—', desc: 'グループ見出し' },
            {
                name: 'options',
                type: 'Array',
                def: '[]',
                desc: '[{ label, value }] の配列'
            },
            { name: 'value', type: 'String', def: '—', desc: '選択値' },
            { name: 'name', type: 'String', def: '自動採番', desc: 'ラジオ name 属性' }
        ],
        events: [{ name: 'change', desc: '選択時に発火（detail.value）' }],
        usage: `<c-ui-radio-group label="支払方法" options={options} onchange={handleChange}></c-ui-radio-group>`
    },
    {
        id: 'uiSearchBox',
        title: 'UI Search Box',
        icon: '🔎',
        category: 'フォーム',
        demo: 'searchbox',
        description:
            '虫眼鏡アイコン付き検索ボックス。入力時に search イベント (detail.value) を発火、クリアボタン付き。',
        props: [
            { name: 'value', type: 'String', def: "''", desc: '入力値' },
            {
                name: 'placeholder',
                type: 'String',
                def: "'検索…'",
                desc: 'プレースホルダ'
            }
        ],
        events: [{ name: 'search', desc: '入力／クリア時に発火（detail.value）' }],
        usage: `<c-ui-search-box onsearch={handleSearch}></c-ui-search-box>`
    },
    {
        id: 'uiSlider',
        title: 'UI Slider',
        icon: '🎚️',
        category: 'フォーム',
        demo: 'slider',
        description:
            'min/max/step の範囲で値を選ぶスライダー。変更時に change イベント (detail.value) を発火。',
        props: [
            { name: 'label', type: 'String', def: '—', desc: 'ラベル' },
            { name: 'min', type: 'Number', def: '0', desc: '最小値' },
            { name: 'max', type: 'Number', def: '100', desc: '最大値' },
            { name: 'step', type: 'Number', def: '1', desc: '刻み' },
            { name: 'value', type: 'Number', def: '50', desc: '現在値' },
            {
                name: 'show-value',
                type: 'Boolean',
                def: 'false',
                desc: 'true で現在値を併記'
            }
        ],
        events: [{ name: 'change', desc: '変更時に発火（detail.value）' }],
        usage: `<c-ui-slider label="音量" value="60" show-value onchange={handleChange}></c-ui-slider>`
    },
    {
        id: 'uiButtonGroup',
        title: 'UI Button Group',
        icon: '🎛️',
        category: 'アクション',
        demo: 'buttongroup',
        description:
            'buttons 配列を横並びにしたセグメンテッドコントロール。選択時に select イベント (detail.value) を発火。',
        props: [
            {
                name: 'buttons',
                type: 'Array',
                def: '[]',
                desc: '[{ label, value }] の配列'
            },
            { name: 'active', type: 'String', def: '—', desc: '選択中の value' }
        ],
        events: [{ name: 'select', desc: '選択時に発火（detail.value）' }],
        usage: `<c-ui-button-group buttons={views} active="list" onselect={handleSelect}></c-ui-button-group>`
    },
    {
        id: 'uiTimeline',
        title: 'UI Timeline',
        icon: '📅',
        category: '表示',
        demo: 'timeline',
        description:
            'items 配列 ([{ title, time, description }]) を時系列で縦表示するタイムライン。',
        props: [
            {
                name: 'items',
                type: 'Array',
                def: '[]',
                desc: '[{ title, time, description }] の配列'
            }
        ],
        events: [],
        usage: `<c-ui-timeline items={events}></c-ui-timeline>`
    },
    {
        id: 'uiStatusDot',
        title: 'UI Status Dot',
        icon: '🟢',
        category: '表示',
        demo: 'statusdot',
        description:
            'online/offline/busy などの状態を色付きの丸とラベルで表示。pulse で点滅も可能。',
        props: [
            { name: 'label', type: 'String', def: '—', desc: 'ラベル（任意）' },
            {
                name: 'status',
                type: 'String',
                def: "'neutral'",
                desc: 'online | offline | busy | away | neutral'
            },
            {
                name: 'pulse',
                type: 'Boolean',
                def: 'false',
                desc: 'true で点滅アニメーション'
            }
        ],
        events: [],
        usage: `<c-ui-status-dot label="オンライン" status="online" pulse></c-ui-status-dot>`
    },
    {
        id: 'uiProgressRing',
        title: 'UI Progress Ring',
        icon: '⭕',
        category: 'フィードバック',
        demo: 'progressring',
        description:
            '0〜100 の進捗を SVG の円形リングで表示。任意で中央にパーセントを併記。',
        props: [
            { name: 'value', type: 'Number', def: '0', desc: '進捗率 0〜100' },
            {
                name: 'size',
                type: 'String',
                def: "'medium'",
                desc: 'small | medium | large'
            },
            {
                name: 'variant',
                type: 'String',
                def: "'brand'",
                desc: 'brand | success | warning | error'
            },
            {
                name: 'show-label',
                type: 'Boolean',
                def: 'false',
                desc: 'true で中央にパーセント表示'
            }
        ],
        events: [],
        usage: `<c-ui-progress-ring value="72" size="large" show-label></c-ui-progress-ring>`
    },
    {
        id: 'uiDropdownMenu',
        title: 'UI Dropdown Menu',
        icon: '🔻',
        category: 'ナビゲーション',
        demo: 'dropdownmenu',
        description:
            'トリガーで items を開閉するメニュー。項目選択で select イベント (detail.value) を発火し、外側クリックで閉じる。',
        props: [
            { name: 'label', type: 'String', def: "'メニュー'", desc: 'トリガーラベル' },
            {
                name: 'items',
                type: 'Array',
                def: '[]',
                desc: '[{ label, value }] の配列'
            }
        ],
        events: [{ name: 'select', desc: '項目選択時に発火（detail.value）' }],
        usage: `<c-ui-dropdown-menu label="操作" items={actions} onselect={handleSelect}></c-ui-dropdown-menu>`
    },
    {
        id: 'uiStepper',
        title: 'UI Stepper',
        icon: '🔢',
        category: 'フォーム',
        demo: 'stepper',
        description:
            '−/+ ボタンと数値入力で値を増減する数値ステッパー。変更時に change イベント (detail.value) を発火。',
        props: [
            { name: 'label', type: 'String', def: '—', desc: 'ラベル' },
            { name: 'value', type: 'Number', def: '0', desc: '現在値' },
            { name: 'min', type: 'Number', def: '—', desc: '最小値（任意）' },
            { name: 'max', type: 'Number', def: '—', desc: '最大値（任意）' },
            { name: 'step', type: 'Number', def: '1', desc: '刻み' }
        ],
        events: [{ name: 'change', desc: '変更時に発火（detail.value）' }],
        usage: `<c-ui-stepper label="数量" value="1" min="0" onchange={handleChange}></c-ui-stepper>`
    },
    {
        id: 'uiFileUpload',
        title: 'UI File Upload',
        icon: '📤',
        category: 'フォーム',
        demo: 'fileupload',
        description:
            'クリックまたはドラッグ＆ドロップでファイルを選択するドロップゾーン。選択時に upload イベント (detail.name) を発火。',
        props: [
            { name: 'label', type: 'String', def: '案内文', desc: '案内テキスト' },
            { name: 'accept', type: 'String', def: '—', desc: 'accept 属性（例: image/*）' }
        ],
        events: [{ name: 'upload', desc: 'ファイル選択時に発火（detail.name）' }],
        usage: `<c-ui-file-upload accept="image/*" onupload={handleUpload}></c-ui-file-upload>`
    },
    {
        id: 'uiColorSwatch',
        title: 'UI Color Swatch',
        icon: '🎨',
        category: 'フォーム',
        demo: 'colorswatch',
        description:
            '色見本を並べて単一選択する。選択時に change イベント (detail.value) を発火。',
        props: [
            {
                name: 'colors',
                type: 'Array',
                def: '[]',
                desc: "HEX 文字列または { value, label } の配列"
            },
            { name: 'value', type: 'String', def: '—', desc: '選択中の色' }
        ],
        events: [{ name: 'change', desc: '選択時に発火（detail.value）' }],
        usage: `<c-ui-color-swatch colors={colors} value="#0176d3" onchange={handleChange}></c-ui-color-swatch>`
    },
    {
        id: 'uiPopover',
        title: 'UI Popover',
        icon: '💭',
        category: 'オーバーレイ',
        demo: 'popover',
        description:
            'トリガークリックでヘッダ付きの吹き出し（default スロット）を開閉。外側クリックで閉じる。',
        props: [
            { name: 'trigger-label', type: 'String', def: "'詳細'", desc: 'トリガーのラベル' },
            { name: 'header', type: 'String', def: '—', desc: '吹き出しの見出し（任意）' }
        ],
        slots: [{ name: '(default)', desc: '吹き出しの本文' }],
        events: [{ name: 'close', desc: '閉じる操作時に発火' }],
        usage: `<c-ui-popover trigger-label="ヘルプ" header="使い方">\n    ここに説明を表示します。\n</c-ui-popover>`
    },
    {
        id: 'uiSkeleton',
        title: 'UI Skeleton',
        icon: '⬜',
        category: 'フィードバック',
        demo: 'skeleton',
        description:
            '読み込み中のプレースホルダ。シマーアニメーションの行を表示し、avatar で円形も表示。',
        props: [
            { name: 'lines', type: 'Number', def: '3', desc: '行数' },
            {
                name: 'avatar',
                type: 'Boolean',
                def: 'false',
                desc: 'true で円形アバターを表示'
            }
        ],
        events: [],
        usage: `<c-ui-skeleton lines="3" avatar></c-ui-skeleton>`
    },
    {
        id: 'uiList',
        title: 'UI List',
        icon: '📋',
        category: '表示',
        demo: 'list',
        description:
            'items 配列 ([{ title, meta, icon }]) をクリック可能な行で表示。行クリックで select イベント (detail.value) を発火。',
        props: [
            {
                name: 'items',
                type: 'Array',
                def: '[]',
                desc: '[{ title, meta, icon }] の配列'
            }
        ],
        events: [{ name: 'select', desc: '行クリック時に発火（detail.value）' }],
        usage: `<c-ui-list items={items} onselect={handleSelect}></c-ui-list>`
    },
    {
        id: 'uiVerticalNav',
        title: 'UI Vertical Nav',
        icon: '🧱',
        category: 'ナビゲーション',
        demo: 'verticalnav',
        description:
            'items 配列を縦並びで表示し active を強調する縦型ナビ。選択時に select イベント (detail.value) を発火。',
        props: [
            {
                name: 'items',
                type: 'Array',
                def: '[]',
                desc: '[{ label, value, icon }] の配列'
            },
            { name: 'active', type: 'String', def: '—', desc: '選択中の value' }
        ],
        events: [{ name: 'select', desc: '選択時に発火（detail.value）' }],
        usage: `<c-ui-vertical-nav items={items} active="home" onselect={handleSelect}></c-ui-vertical-nav>`
    },
    {
        id: 'uiBanner',
        title: 'UI Banner',
        icon: '📣',
        category: 'フィードバック',
        demo: 'banner',
        description:
            'variant に応じた色・アイコンで横長の通知を表示。default スロットにアクションを差し込め、closable で閉じられる。',
        props: [
            {
                name: 'variant',
                type: 'String',
                def: "'info'",
                desc: 'info | success | warning | error'
            },
            { name: 'message', type: 'String', def: '—', desc: 'メッセージ本文' },
            {
                name: 'closable',
                type: 'Boolean',
                def: 'false',
                desc: 'true で閉じるボタンを表示'
            }
        ],
        slots: [{ name: '(default)', desc: 'アクション（ボタン等）' }],
        events: [{ name: 'close', desc: '閉じる操作時に発火' }],
        usage: `<c-ui-banner variant="warning" message="メンテナンス予定があります" closable></c-ui-banner>`
    },
    {
        id: 'uiMeter',
        title: 'UI Meter',
        icon: '🌡️',
        category: '表示',
        demo: 'meter',
        description:
            'value / max の割合をバーで表示。割合に応じて低（赤）/中（橙）/高（緑）に色が変わる。',
        props: [
            { name: 'value', type: 'Number', def: '0', desc: '現在値' },
            { name: 'max', type: 'Number', def: '100', desc: '最大値' },
            { name: 'label', type: 'String', def: '—', desc: 'ラベル' }
        ],
        events: [],
        usage: `<c-ui-meter label="ディスク使用量" value="82" max="100"></c-ui-meter>`
    },
    {
        id: 'uiCountBadge',
        title: 'UI Count Badge',
        icon: '🔴',
        category: '表示',
        demo: 'countbadge',
        description:
            'default スロットの要素の右上に件数バッジを重ねて表示。max 超過で「max+」、dot で点のみ表示。',
        props: [
            { name: 'count', type: 'Number', def: '0', desc: '件数' },
            { name: 'max', type: 'Number', def: '99', desc: '表示上限（超過で max+）' },
            {
                name: 'dot',
                type: 'Boolean',
                def: 'false',
                desc: 'true で数字なしのドット表示'
            }
        ],
        slots: [{ name: '(default)', desc: 'バッジを重ねる要素' }],
        events: [],
        usage: `<c-ui-count-badge count="5">\n    <span>🔔</span>\n</c-ui-count-badge>`
    },
    {
        id: 'uiTag',
        title: 'UI Tag',
        icon: '🏷️',
        category: '表示',
        demo: 'tag',
        description:
            'color に応じた淡い背景色でラベルを表示するタグ。6色のバリアントに対応。',
        props: [
            { name: 'label', type: 'String', def: '—', desc: '表示テキスト' },
            {
                name: 'color',
                type: 'String',
                def: "'neutral'",
                desc: 'neutral | blue | green | red | orange | purple'
            }
        ],
        events: [],
        usage: `<c-ui-tag label="新着" color="blue"></c-ui-tag>`
    },
    {
        id: 'uiIconButton',
        title: 'UI Icon Button',
        icon: '🔣',
        category: 'アクション',
        demo: 'iconbutton',
        description:
            'アイコンのみの正方形ボタン。click イベントを発火し、3 バリアントに対応。',
        props: [
            { name: 'icon', type: 'String', def: '—', desc: 'アイコン文字（絵文字可）' },
            {
                name: 'variant',
                type: 'String',
                def: "'neutral'",
                desc: 'neutral | brand | ghost'
            },
            { name: 'title', type: 'String', def: '—', desc: 'ツールチップ／代替名' },
            { name: 'disabled', type: 'Boolean', def: 'false', desc: 'true で無効化' }
        ],
        events: [{ name: 'click', desc: 'ボタン押下時に発火' }],
        usage: `<c-ui-icon-button icon="✏️" title="編集" onclick={handleEdit}></c-ui-icon-button>`
    },
    {
        id: 'uiKbd',
        title: 'UI Kbd',
        icon: '⌨️',
        category: '表示',
        demo: 'kbd',
        description:
            'keys 配列をキー風の見た目で表示。ショートカット表記に使う（例: Ctrl + S）。',
        props: [
            {
                name: 'keys',
                type: 'Array',
                def: '[]',
                desc: "キー文字列の配列（例: ['Ctrl', 'S']）"
            }
        ],
        events: [],
        usage: `<c-ui-kbd keys={shortcut}></c-ui-kbd>`
    },
    {
        id: 'uiCopyButton',
        title: 'UI Copy Button',
        icon: '📋',
        category: 'アクション',
        demo: 'copybutton',
        description:
            'value をクリップボードにコピーし、一時的に「コピー済み」表示へ切替える。copy イベントを発火。',
        props: [
            { name: 'value', type: 'String', def: "''", desc: 'コピーするテキスト' },
            { name: 'label', type: 'String', def: "'コピー'", desc: 'ボタンラベル' }
        ],
        events: [{ name: 'copy', desc: 'コピー時に発火（detail.value）' }],
        usage: `<c-ui-copy-button value="ABC-123" oncopy={handleCopy}></c-ui-copy-button>`
    },
    {
        id: 'uiSplitButton',
        title: 'UI Split Button',
        icon: '🎛️',
        category: 'アクション',
        demo: 'splitbutton',
        description:
            '主ボタン（click）と付随メニュー（items から生成、select）を持つ分割ボタン。外側クリックで閉じる。',
        props: [
            { name: 'label', type: 'String', def: '—', desc: '主ボタンのラベル' },
            {
                name: 'items',
                type: 'Array',
                def: '[]',
                desc: '[{ label, value }] の配列'
            }
        ],
        events: [
            { name: 'click', desc: '主ボタン押下時に発火' },
            { name: 'select', desc: 'メニュー選択時に発火（detail.value）' }
        ],
        usage: `<c-ui-split-button label="保存" items={menu} onclick={handleSave} onselect={handleMenu}></c-ui-split-button>`
    },
    {
        id: 'uiRibbon',
        title: 'UI Ribbon',
        icon: '🎀',
        category: '表示',
        demo: 'ribbon',
        description:
            'default スロットの要素の右上隅に斜めのリボンラベルを重ねる。4 色に対応。',
        props: [
            { name: 'label', type: 'String', def: '—', desc: 'リボンのテキスト' },
            {
                name: 'color',
                type: 'String',
                def: "'brand'",
                desc: 'brand | success | warning | error'
            }
        ],
        slots: [{ name: '(default)', desc: 'リボンを重ねる要素' }],
        events: [],
        usage: `<c-ui-ribbon label="NEW">\n    <c-ui-card title="商品">...</c-ui-card>\n</c-ui-ribbon>`
    },
    {
        id: 'uiDateField',
        title: 'UI Date Field',
        icon: '📆',
        category: 'フォーム',
        demo: 'datefield',
        description:
            'ラベル付きの日付入力。変更時に change イベント (detail.value) を発火。',
        props: [
            { name: 'label', type: 'String', def: '—', desc: 'ラベル' },
            { name: 'value', type: 'String', def: "''", desc: '値（YYYY-MM-DD）' },
            { name: 'disabled', type: 'Boolean', def: 'false', desc: 'true で無効化' }
        ],
        events: [{ name: 'change', desc: '変更時に発火（detail.value）' }],
        usage: `<c-ui-date-field label="締切日" onchange={handleChange}></c-ui-date-field>`
    },
    {
        id: 'uiSegmentedProgress',
        title: 'UI Segmented Progress',
        icon: '🔲',
        category: 'フィードバック',
        demo: 'segmentedprogress',
        description:
            'total 個のセグメントのうち current 個を塗りつぶす段階的な進捗インジケータ。',
        props: [
            { name: 'total', type: 'Number', def: '5', desc: 'セグメント総数' },
            { name: 'current', type: 'Number', def: '0', desc: '塗りつぶす数' },
            {
                name: 'variant',
                type: 'String',
                def: "'brand'",
                desc: 'brand | success | warning | error'
            }
        ],
        events: [],
        usage: `<c-ui-segmented-progress total="5" current="3"></c-ui-segmented-progress>`
    },
    {
        id: 'uiTree',
        title: 'UI Tree',
        icon: '🌳',
        category: 'ナビゲーション',
        demo: 'tree',
        description:
            'nodes 配列（親に children を持つ 2 階層）を折りたたみ表示。ノード選択で select イベント (detail.value) を発火。',
        props: [
            {
                name: 'nodes',
                type: 'Array',
                def: '[]',
                desc: '[{ label, value, children: [{ label, value }] }] の配列'
            }
        ],
        events: [{ name: 'select', desc: 'ノード選択時に発火（detail.value）' }],
        usage: `<c-ui-tree nodes={tree} onselect={handleSelect}></c-ui-tree>`
    },
    {
        id: 'uiCalendar',
        title: 'UI Calendar',
        icon: '🗓️',
        category: '表示',
        demo: 'calendar',
        description:
            'year / month の月間カレンダー。日付クリックで select イベント (detail.{year,month,day}) を発火。省略時は今月。',
        props: [
            { name: 'year', type: 'Number', def: '今年', desc: '表示する年' },
            { name: 'month', type: 'Number', def: '今月', desc: '表示する月（1〜12）' },
            { name: 'selected', type: 'Number', def: '—', desc: '選択中の日' }
        ],
        events: [
            { name: 'select', desc: '日付クリックで発火（detail.{year,month,day}）' }
        ],
        usage: `<c-ui-calendar year="2026" month="6" onselect={handleSelect}></c-ui-calendar>`
    },
    {
        id: 'uiCarousel',
        title: 'UI Carousel',
        icon: '🎠',
        category: '表示',
        demo: 'carousel',
        description:
            'slides 配列 ([{ title, text }]) を 1 枚ずつ表示。前後ボタン／ドットで切替え、change イベント (detail.index) を発火。',
        props: [
            {
                name: 'slides',
                type: 'Array',
                def: '[]',
                desc: '[{ title, text }] の配列'
            }
        ],
        events: [{ name: 'change', desc: '切替時に発火（detail.index）' }],
        usage: `<c-ui-carousel slides={slides} onchange={handleChange}></c-ui-carousel>`
    },
    {
        id: 'uiAvatarGroup',
        title: 'UI Avatar Group',
        icon: '👥',
        category: '表示',
        demo: 'avatargroup',
        description:
            'people 配列を重ねて表示し、max を超える分を「+N」で集約するアバターグループ。',
        props: [
            {
                name: 'people',
                type: 'Array',
                def: '[]',
                desc: '[{ name, src }] の配列'
            },
            { name: 'max', type: 'Number', def: '4', desc: '表示する最大人数' }
        ],
        events: [],
        usage: `<c-ui-avatar-group people={members} max="4"></c-ui-avatar-group>`
    },
    {
        id: 'uiCodeBlock',
        title: 'UI Code Block',
        icon: '💻',
        category: '表示',
        demo: 'codeblock',
        description:
            'コードを等幅で表示し、コピーボタンでクリップボードへコピーする。copy イベントを発火。',
        props: [
            { name: 'code', type: 'String', def: "''", desc: '表示するコード' },
            { name: 'label', type: 'String', def: "'CODE'", desc: '言語ラベル' }
        ],
        events: [{ name: 'copy', desc: 'コピー時に発火' }],
        usage: `<c-ui-code-block code={snippet} label="JS"></c-ui-code-block>`
    },
    {
        id: 'uiVerticalSteps',
        title: 'UI Vertical Steps',
        icon: '🪜',
        category: 'ナビゲーション',
        demo: 'verticalsteps',
        description:
            'steps 配列 ([{ label, description }]) を縦並びで表示し、current までを色分けする。',
        props: [
            {
                name: 'steps',
                type: 'Array',
                def: '[]',
                desc: '[{ label, description }] の配列'
            },
            {
                name: 'current',
                type: 'Number',
                def: '1',
                desc: '現在ステップ（1 始まり）'
            }
        ],
        events: [],
        usage: `<c-ui-vertical-steps steps={steps} current="2"></c-ui-vertical-steps>`
    },
    {
        id: 'uiTagInput',
        title: 'UI Tag Input',
        icon: '🔖',
        category: 'フォーム',
        demo: 'taginput',
        description:
            'Enter でタグを追加し ×（または Backspace）で削除する入力。変更時に change イベント (detail.tags) を発火。',
        props: [
            {
                name: 'tags',
                type: 'Array',
                def: '[]',
                desc: 'タグ文字列の配列'
            },
            {
                name: 'placeholder',
                type: 'String',
                def: "'タグを入力して Enter'",
                desc: 'プレースホルダ'
            }
        ],
        events: [{ name: 'change', desc: '追加／削除時に発火（detail.tags）' }],
        usage: `<c-ui-tag-input tags={tags} onchange={handleChange}></c-ui-tag-input>`
    },
    {
        id: 'uiSparkline',
        title: 'UI Sparkline',
        icon: '📈',
        category: '表示',
        demo: 'sparkline',
        description:
            'values 配列の数値を小さな折れ線グラフ（SVG）で表示。末尾にドットを打つ。',
        props: [
            { name: 'values', type: 'Array', def: '[]', desc: '数値の配列' },
            { name: 'color', type: 'String', def: "'#0176d3'", desc: '線の色' },
            { name: 'width', type: 'Number', def: '120', desc: '幅(px)' },
            { name: 'height', type: 'Number', def: '36', desc: '高さ(px)' }
        ],
        events: [],
        usage: `<c-ui-sparkline values={trend} color="#2e844a"></c-ui-sparkline>`
    },
    {
        id: 'uiBarChart',
        title: 'UI Bar Chart',
        icon: '📊',
        category: '表示',
        demo: 'barchart',
        description:
            'data 配列 ([{ label, value }]) を最大値基準の横棒グラフで表示する。',
        props: [
            {
                name: 'data',
                type: 'Array',
                def: '[]',
                desc: '[{ label, value }] の配列'
            },
            { name: 'color', type: 'String', def: "'#0176d3'", desc: 'バーの色' }
        ],
        events: [],
        usage: `<c-ui-bar-chart data={sales}></c-ui-bar-chart>`
    },
    {
        id: 'uiChoiceChips',
        title: 'UI Choice Chips',
        icon: '🔘',
        category: 'フォーム',
        demo: 'choicechips',
        description:
            'options 配列からチップ状の単一選択 UI を生成。選択時に change イベント (detail.value) を発火。',
        props: [
            {
                name: 'options',
                type: 'Array',
                def: '[]',
                desc: '[{ label, value }] の配列'
            },
            { name: 'value', type: 'String', def: '—', desc: '選択値' }
        ],
        events: [{ name: 'change', desc: '選択時に発火（detail.value）' }],
        usage: `<c-ui-choice-chips options={sizes} value="m" onchange={handleChange}></c-ui-choice-chips>`
    },
    {
        id: 'uiInlineEdit',
        title: 'UI Inline Edit',
        icon: '✏️',
        category: 'フォーム',
        demo: 'inlineedit',
        description:
            'テキストをクリックすると入力に切替わり、Enter／blur で確定、Esc で取消。確定時に change イベント (detail.value) を発火。',
        props: [
            { name: 'value', type: 'String', def: "''", desc: '値' },
            {
                name: 'placeholder',
                type: 'String',
                def: "'クリックして編集'",
                desc: '未入力時の表示'
            }
        ],
        events: [{ name: 'change', desc: '確定時に発火（detail.value）' }],
        usage: `<c-ui-inline-edit value="タイトル" onchange={handleChange}></c-ui-inline-edit>`
    },
    {
        id: 'uiOtpInput',
        title: 'UI OTP Input',
        icon: '🔢',
        category: 'フォーム',
        demo: 'otpinput',
        description:
            'length 桁の 1 文字マスに入力し自動フォーカス移動。全桁で complete、変更で change イベントを発火。',
        props: [
            { name: 'length', type: 'Number', def: '6', desc: '桁数' }
        ],
        events: [
            { name: 'change', desc: '入力ごとに発火（detail.value）' },
            { name: 'complete', desc: '全桁入力で発火（detail.value）' }
        ],
        usage: `<c-ui-otp-input length="6" oncomplete={handleComplete}></c-ui-otp-input>`
    },
    {
        id: 'uiCurrencyInput',
        title: 'UI Currency Input',
        icon: '💴',
        category: 'フォーム',
        demo: 'currencyinput',
        description:
            '3 桁区切りで整形しながら金額を入力し、記号を前置する。変更時に change イベント (detail.value = 数値) を発火。',
        props: [
            { name: 'label', type: 'String', def: '—', desc: 'ラベル' },
            { name: 'value', type: 'Number', def: '0', desc: '数値の値' },
            { name: 'symbol', type: 'String', def: "'¥'", desc: '通貨記号' }
        ],
        events: [{ name: 'change', desc: '変更時に発火（detail.value）' }],
        usage: `<c-ui-currency-input label="金額" onchange={handleChange}></c-ui-currency-input>`
    },
    {
        id: 'uiPhoneInput',
        title: 'UI Phone Input',
        icon: '📞',
        category: 'フォーム',
        demo: 'phoneinput',
        description:
            '数字のみ受け付け 3-4-4 のハイフン区切りに自動整形する電話番号入力。変更時に change イベント (detail.value) を発火。',
        props: [
            { name: 'label', type: 'String', def: '—', desc: 'ラベル' },
            { name: 'value', type: 'String', def: "''", desc: '整形済みの値' }
        ],
        events: [{ name: 'change', desc: '変更時に発火（detail.value）' }],
        usage: `<c-ui-phone-input label="電話番号" onchange={handleChange}></c-ui-phone-input>`
    },
    {
        id: 'uiLikert',
        title: 'UI Likert',
        icon: '😊',
        category: 'フォーム',
        demo: 'likert',
        description:
            '1〜5 の選択肢を丸で表示し両端にラベルを置くリッカート尺度。選択時に change イベント (detail.value) を発火。',
        props: [
            { name: 'value', type: 'Number', def: '—', desc: '選択値（1〜5）' },
            { name: 'left-label', type: 'String', def: "'不満'", desc: '左端ラベル' },
            { name: 'right-label', type: 'String', def: "'満足'", desc: '右端ラベル' }
        ],
        events: [{ name: 'change', desc: '選択時に発火（detail.value）' }],
        usage: `<c-ui-likert left-label="不満" right-label="満足" onchange={handleChange}></c-ui-likert>`
    },
    {
        id: 'uiDrawer',
        title: 'UI Drawer',
        icon: '🗄️',
        category: 'オーバーレイ',
        demo: 'drawer',
        description:
            'open で表示制御し画面端からスライドインするパネル。背景・×・Esc で close を発火。',
        props: [
            { name: 'header', type: 'String', def: '—', desc: 'ヘッダタイトル' },
            { name: 'open', type: 'Boolean', def: 'false', desc: 'true で表示' },
            { name: 'side', type: 'String', def: "'right'", desc: 'right | left' }
        ],
        slots: [
            { name: '(default)', desc: '本文' },
            { name: 'footer', desc: 'フッタ' }
        ],
        events: [{ name: 'close', desc: '閉じる操作時に発火' }],
        usage: `<c-ui-drawer header="フィルタ" open={isOpen} onclose={handleClose}>...</c-ui-drawer>`
    },
    {
        id: 'uiCallout',
        title: 'UI Callout',
        icon: '🗯️',
        category: 'フィードバック',
        demo: 'callout',
        description:
            '左罫線・見出し・アイコンで補足を強調するボックス。本文は default スロット。',
        props: [
            {
                name: 'variant',
                type: 'String',
                def: "'info'",
                desc: 'info | success | warning | error | tip'
            },
            { name: 'title', type: 'String', def: '—', desc: '見出し' }
        ],
        slots: [{ name: '(default)', desc: '本文' }],
        events: [],
        usage: `<c-ui-callout variant="tip" title="ヒント">\n    便利な使い方を紹介します。\n</c-ui-callout>`
    },
    {
        id: 'uiRatingSummary',
        title: 'UI Rating Summary',
        icon: '🌟',
        category: '表示',
        demo: 'ratingsummary',
        description:
            '平均評価・件数・星分布（5★〜1★）をまとめて表示するレビューサマリー。',
        props: [
            { name: 'average', type: 'Number', def: '0', desc: '平均評価（例: 4.3）' },
            { name: 'count', type: 'Number', def: '0', desc: '総件数' },
            {
                name: 'distribution',
                type: 'Array',
                def: '[]',
                desc: '5★→1★ の件数配列（長さ 5）'
            }
        ],
        events: [],
        usage: `<c-ui-rating-summary average="4.3" count="128" distribution={dist}></c-ui-rating-summary>`
    },
    {
        id: 'uiToolbar',
        title: 'UI Toolbar',
        icon: '🧰',
        category: 'レイアウト',
        demo: 'toolbar',
        description:
            '左にタイトル、右にアクション（default スロット）を配置する横長のバー。',
        props: [
            { name: 'title', type: 'String', def: '—', desc: '左側のタイトル' }
        ],
        slots: [{ name: '(default)', desc: '右側のアクション' }],
        events: [],
        usage: `<c-ui-toolbar title="一覧">\n    <c-ui-button label="追加"></c-ui-button>\n</c-ui-toolbar>`
    }
];

/**
 * 日本語表示名（カタログのナビ・見出しで「日本語（English）」と併記）。
 */
const JA_NAMES = {
    uiBadge: 'バッジ',
    uiButton: 'ボタン',
    uiCard: 'カード',
    uiModal: 'モーダル',
    uiTabs: 'タブ',
    uiAccordion: 'アコーディオン',
    uiDataTable: 'データテーブル',
    uiProgressBar: 'プログレスバー',
    uiInput: '入力フィールド',
    uiToggle: 'トグルスイッチ',
    uiAvatar: 'アバター',
    uiPill: 'ピル（タグ）',
    uiAlert: 'アラート',
    uiSpinner: 'スピナー',
    uiToast: 'トースト通知',
    uiPagination: 'ページネーション',
    uiSelect: 'セレクト',
    uiCheckbox: 'チェックボックス',
    uiTextarea: 'テキストエリア',
    uiBreadcrumb: 'パンくずリスト',
    uiSteps: 'ステップ',
    uiRating: 'スター評価',
    uiStat: 'KPI表示',
    uiDivider: '区切り線',
    uiTooltip: 'ツールチップ',
    uiEmptyState: '空状態',
    uiRadioGroup: 'ラジオボタン',
    uiSearchBox: '検索ボックス',
    uiSlider: 'スライダー',
    uiButtonGroup: 'ボタングループ',
    uiTimeline: 'タイムライン',
    uiStatusDot: 'ステータスドット',
    uiProgressRing: '円形プログレス',
    uiDropdownMenu: 'ドロップダウンメニュー',
    uiStepper: '数値ステッパー',
    uiFileUpload: 'ファイルアップロード',
    uiColorSwatch: 'カラースウォッチ',
    uiPopover: 'ポップオーバー',
    uiSkeleton: 'スケルトン',
    uiList: 'リスト',
    uiVerticalNav: '縦ナビ',
    uiBanner: 'バナー',
    uiMeter: 'メーター',
    uiCountBadge: 'カウントバッジ',
    uiTag: 'タグ',
    uiIconButton: 'アイコンボタン',
    uiKbd: 'キーボードキー',
    uiCopyButton: 'コピーボタン',
    uiSplitButton: '分割ボタン',
    uiRibbon: 'リボン',
    uiDateField: '日付フィールド',
    uiSegmentedProgress: 'セグメント進捗',
    uiTree: 'ツリー',
    uiCalendar: 'カレンダー',
    uiCarousel: 'カルーセル',
    uiAvatarGroup: 'アバターグループ',
    uiCodeBlock: 'コードブロック',
    uiVerticalSteps: '縦ステップ',
    uiTagInput: 'タグ入力',
    uiSparkline: 'スパークライン',
    uiBarChart: '棒グラフ',
    uiChoiceChips: '選択チップ',
    uiInlineEdit: 'インライン編集',
    uiOtpInput: 'OTP入力',
    uiCurrencyInput: '通貨入力',
    uiPhoneInput: '電話番号入力',
    uiLikert: 'リッカート尺度',
    uiDrawer: 'ドロワー',
    uiCallout: 'コールアウト',
    uiRatingSummary: '評価サマリー',
    uiToolbar: 'ツールバー'
};

const FILE_KEYS = [
    { key: 'html', ext: '.html' },
    { key: 'js', ext: '.js' },
    { key: 'css', ext: '.css' },
    { key: 'meta', ext: '.js-meta.xml' }
];

function readComponentFiles(id) {
    const files = {};
    const cssParts = [];
    for (const { key, ext } of FILE_KEYS) {
        const path = join(LWC_DIR, id, `${id}${ext}`);
        if (existsSync(path)) {
            const content = readFileSync(path, 'utf8');
            files[key] = content;
            if (key === 'css') {
                cssParts.push(`/* ===== ${id} ===== */\n${content}`);
            }
        }
    }
    return { files, css: cssParts.join('\n') };
}

const out = [];
const cssAll = [];
let count = 0;

for (const comp of COMPONENTS) {
    const { files, css } = readComponentFiles(comp.id);
    if (!files.js) {
        console.warn(`⚠ ${comp.id}: .js が見つかりません（スキップ）`);
        continue;
    }
    out.push({ ...comp, ja: JA_NAMES[comp.id] || comp.title, files });
    if (css) {
        cssAll.push(css);
    }
    count += 1;
}

const data = {
    generatedAt: new Date().toISOString(),
    components: out
};

const dataJs =
    '/* 自動生成ファイル — build.mjs が生成。直接編集しないでください。 */\n' +
    'window.GALLERY_DATA = ' +
    JSON.stringify(data, null, 2) +
    ';\n';

writeFileSync(join(__dirname, 'data.js'), dataJs, 'utf8');
writeFileSync(
    join(__dirname, 'components.css'),
    '/* 自動生成ファイル — 実 LWC の CSS を連結（ライブデモ用）。 */\n' +
        cssAll.join('\n\n'),
    'utf8'
);

console.log(`✅ ${count} コンポーネントを生成しました`);
console.log('   → data.js');
console.log('   → components.css');
