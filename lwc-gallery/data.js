/* 自動生成ファイル — build.mjs が生成。直接編集しないでください。 */
window.GALLERY_DATA = {
  "generatedAt": "2026-06-20T08:49:51.151Z",
  "components": [
    {
      "id": "uiBadge",
      "title": "UI Badge",
      "icon": "🏷️",
      "category": "表示",
      "demo": "badge",
      "description": "ラベル・色バリアント・アイコンを表示する純粋なステータスバッジ。",
      "props": [
        {
          "name": "label",
          "type": "String",
          "def": "—",
          "desc": "表示テキスト"
        },
        {
          "name": "variant",
          "type": "String",
          "def": "'neutral'",
          "desc": "neutral | info | success | warning | error"
        },
        {
          "name": "icon-name",
          "type": "String",
          "def": "—",
          "desc": "任意の lightning-icon 名（例: utility:check）"
        }
      ],
      "events": [],
      "usage": "<c-ui-badge label=\"承認済み\" variant=\"success\"></c-ui-badge>",
      "ja": "バッジ",
      "files": {
        "html": "<template>\n    <span class={computedClass}>\n        <lightning-icon\n            lwc:if={iconName}\n            icon-name={iconName}\n            size=\"xx-small\"\n            class=\"ui-badge__icon\"\n        ></lightning-icon>\n        <span class=\"ui-badge__label\">{label}</span>\n    </span>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\nconst VARIANTS = ['neutral', 'info', 'success', 'warning', 'error'];\n\n/**\n * uiBadge — 汎用ステータスバッジ。\n * ラベルと色バリアント、任意のアイコンを表示する純粋な表示コンポーネント。\n */\nexport default class UiBadge extends LightningElement {\n    /** 表示テキスト */\n    @api label;\n    /** 色バリアント: neutral | info | success | warning | error */\n    @api variant = 'neutral';\n    /** 任意の lightning-icon 名 (例: utility:check) */\n    @api iconName;\n\n    get computedClass() {\n        const variant = VARIANTS.includes(this.variant) ? this.variant : 'neutral';\n        return `ui-badge ui-badge_${variant}`;\n    }\n}\n",
        "css": ".ui-badge {\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    padding: 2px 8px;\n    border-radius: 11px;\n    font-size: 0.75rem;\n    font-weight: 600;\n    line-height: 1.4;\n    white-space: nowrap;\n}\n\n.ui-badge__icon {\n    --slds-c-icon-color-foreground-default: currentColor;\n}\n\n.ui-badge_neutral {\n    background: #ecebea;\n    color: #444444;\n}\n.ui-badge_info {\n    background: #eef4ff;\n    color: #0b5cab;\n}\n.ui-badge_success {\n    background: #e6f4ea;\n    color: #1d7a3f;\n}\n.ui-badge_warning {\n    background: #fef5e7;\n    color: #a86403;\n}\n.ui-badge_error {\n    background: #fdecea;\n    color: #b3261e;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Badge</masterLabel>\n    <description>汎用ステータスバッジ。ラベル・色バリアント・アイコンを表示。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiButton",
      "title": "UI Button",
      "icon": "🔘",
      "category": "アクション",
      "demo": "button",
      "description": "色バリアント・アイコン・無効化に対応した汎用ボタン。click イベントを発火。",
      "props": [
        {
          "name": "label",
          "type": "String",
          "def": "—",
          "desc": "ボタンラベル"
        },
        {
          "name": "variant",
          "type": "String",
          "def": "'brand'",
          "desc": "brand | neutral | outline | success | destructive"
        },
        {
          "name": "icon-name",
          "type": "String",
          "def": "—",
          "desc": "任意の lightning-icon 名"
        },
        {
          "name": "disabled",
          "type": "Boolean",
          "def": "false",
          "desc": "true で無効化"
        },
        {
          "name": "stretch",
          "type": "Boolean",
          "def": "false",
          "desc": "true で横幅いっぱい"
        }
      ],
      "events": [
        {
          "name": "click",
          "desc": "ボタン押下時に発火"
        }
      ],
      "usage": "<c-ui-button label=\"保存\" variant=\"brand\" onclick={handleSave}></c-ui-button>",
      "ja": "ボタン",
      "files": {
        "html": "<template>\n    <button\n        class={computedClass}\n        type={type}\n        disabled={disabled}\n        onclick={handleClick}\n    >\n        <lightning-icon\n            lwc:if={iconName}\n            icon-name={iconName}\n            size=\"xx-small\"\n            class=\"ui-button__icon\"\n        ></lightning-icon>\n        <span class=\"ui-button__label\">{label}</span>\n    </button>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\nconst VARIANTS = ['brand', 'neutral', 'outline', 'success', 'destructive'];\n\n/**\n * uiButton — 汎用ボタン。\n * 色バリアント・アイコン・無効化に対応し、click イベントを発火する。\n */\nexport default class UiButton extends LightningElement {\n    /** ボタンラベル */\n    @api label;\n    /** 色バリアント: brand | neutral | outline | success | destructive */\n    @api variant = 'brand';\n    /** 任意の lightning-icon 名 (例: utility:add) */\n    @api iconName;\n    /** true で無効化 */\n    @api disabled = false;\n    /** ネイティブ type: button | submit | reset */\n    @api type = 'button';\n    /** true で横幅いっぱいに広げる */\n    @api stretch = false;\n\n    get computedClass() {\n        const variant = VARIANTS.includes(this.variant) ? this.variant : 'brand';\n        return `ui-button ui-button_${variant}${this.stretch ? ' ui-button_stretch' : ''}`;\n    }\n\n    handleClick() {\n        this.dispatchEvent(new CustomEvent('click'));\n    }\n}\n",
        "css": ".ui-button {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    gap: 6px;\n    padding: 0 16px;\n    height: 32px;\n    border-radius: 6px;\n    border: 1px solid transparent;\n    font-size: 0.8125rem;\n    font-weight: 600;\n    cursor: pointer;\n    transition: background 0.12s ease, box-shadow 0.12s ease;\n    font-family: inherit;\n}\n\n.ui-button:disabled {\n    opacity: 0.5;\n    cursor: not-allowed;\n}\n\n.ui-button_stretch {\n    width: 100%;\n}\n\n.ui-button__icon {\n    --slds-c-icon-color-foreground-default: currentColor;\n}\n\n.ui-button_brand {\n    background: #0176d3;\n    color: #ffffff;\n}\n.ui-button_brand:not(:disabled):hover {\n    background: #014486;\n}\n\n.ui-button_neutral {\n    background: #ffffff;\n    color: #0176d3;\n    border-color: #c9c9c9;\n}\n.ui-button_neutral:not(:disabled):hover {\n    background: #f3f3f3;\n}\n\n.ui-button_outline {\n    background: transparent;\n    color: #0176d3;\n    border-color: #0176d3;\n}\n.ui-button_outline:not(:disabled):hover {\n    background: #eef4ff;\n}\n\n.ui-button_success {\n    background: #2e844a;\n    color: #ffffff;\n}\n.ui-button_success:not(:disabled):hover {\n    background: #1f6135;\n}\n\n.ui-button_destructive {\n    background: #ba0517;\n    color: #ffffff;\n}\n.ui-button_destructive:not(:disabled):hover {\n    background: #8e030f;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Button</masterLabel>\n    <description>汎用ボタン。色バリアント・アイコン・無効化に対応し click イベントを発火。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiCard",
      "title": "UI Card",
      "icon": "🗂️",
      "category": "レイアウト",
      "demo": "card",
      "description": "ヘッダ（タイトル・アイコン）、本文、アクション、フッタのスロットを持つ汎用カード。",
      "props": [
        {
          "name": "title",
          "type": "String",
          "def": "—",
          "desc": "ヘッダタイトル"
        },
        {
          "name": "icon-name",
          "type": "String",
          "def": "—",
          "desc": "任意の lightning-icon 名（例: standard:account）"
        }
      ],
      "slots": [
        {
          "name": "(default)",
          "desc": "本文"
        },
        {
          "name": "actions",
          "desc": "ヘッダ右のアクション領域"
        },
        {
          "name": "footer",
          "desc": "フッタ（空なら自動的に非表示）"
        }
      ],
      "events": [],
      "usage": "<c-ui-card title=\"取引先\" icon-name=\"standard:account\">\n    本文をここに記述\n    <div slot=\"footer\">フッタ</div>\n</c-ui-card>",
      "ja": "カード",
      "files": {
        "html": "<template>\n    <article class=\"ui-card\">\n        <header lwc:if={hasHeader} class=\"ui-card__header\">\n            <lightning-icon\n                lwc:if={iconName}\n                icon-name={iconName}\n                size=\"small\"\n                class=\"ui-card__icon\"\n            ></lightning-icon>\n            <h2 class=\"ui-card__title\">{title}</h2>\n            <div class=\"ui-card__actions\">\n                <slot name=\"actions\"></slot>\n            </div>\n        </header>\n        <div class=\"ui-card__body\">\n            <slot></slot>\n        </div>\n        <footer class={footerClass}>\n            <slot name=\"footer\" onslotchange={handleFooterSlotChange}></slot>\n        </footer>\n    </article>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\n/**\n * uiCard — 汎用カード。\n * タイトル・アイコンのヘッダ、本文 (default スロット)、\n * 任意のアクション (actions スロット) とフッタ (footer スロット) を持つ。\n */\nexport default class UiCard extends LightningElement {\n    /** ヘッダタイトル */\n    @api title;\n    /** 任意の lightning-icon 名 (例: standard:account) */\n    @api iconName;\n\n    hasFooter = false;\n\n    get hasHeader() {\n        return !!this.title || !!this.iconName;\n    }\n\n    get footerClass() {\n        return this.hasFooter\n            ? 'ui-card__footer'\n            : 'ui-card__footer ui-card__footer_empty';\n    }\n\n    handleFooterSlotChange(event) {\n        this.hasFooter = event.target.assignedNodes().length > 0;\n    }\n}\n",
        "css": ".ui-card {\n    display: flex;\n    flex-direction: column;\n    background: #ffffff;\n    border: 1px solid #e5e5e5;\n    border-radius: 8px;\n    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);\n    overflow: hidden;\n}\n\n.ui-card__header {\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    padding: 12px 16px;\n    border-bottom: 1px solid #ececec;\n}\n\n.ui-card__title {\n    flex: 1;\n    margin: 0;\n    font-size: 0.9375rem;\n    font-weight: 700;\n    color: #181818;\n}\n\n.ui-card__actions {\n    display: flex;\n    align-items: center;\n    gap: 4px;\n}\n\n.ui-card__body {\n    padding: 16px;\n    color: #444444;\n    font-size: 0.875rem;\n    line-height: 1.5;\n}\n\n.ui-card__footer {\n    padding: 12px 16px;\n    border-top: 1px solid #ececec;\n    background: #fafafa;\n}\n\n.ui-card__footer_empty {\n    display: none;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Card</masterLabel>\n    <description>汎用カード。ヘッダ・本文・アクション・フッタのスロットを持つ。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiModal",
      "title": "UI Modal",
      "icon": "🪟",
      "category": "オーバーレイ",
      "demo": "modal",
      "description": "open プロパティで表示制御するモーダル。背景・×・Esc で close イベントを発火。",
      "props": [
        {
          "name": "header",
          "type": "String",
          "def": "—",
          "desc": "ヘッダタイトル"
        },
        {
          "name": "open",
          "type": "Boolean",
          "def": "false",
          "desc": "true で表示"
        },
        {
          "name": "size",
          "type": "String",
          "def": "'medium'",
          "desc": "small | medium | large"
        }
      ],
      "slots": [
        {
          "name": "(default)",
          "desc": "本文"
        },
        {
          "name": "footer",
          "desc": "フッタ（ボタン等）"
        }
      ],
      "events": [
        {
          "name": "close",
          "desc": "閉じる操作時に発火"
        }
      ],
      "usage": "<c-ui-modal header=\"確認\" open={isOpen} onclose={handleClose}>\n    本当に削除しますか？\n    <div slot=\"footer\">\n        <c-ui-button label=\"OK\"></c-ui-button>\n    </div>\n</c-ui-modal>",
      "ja": "モーダル",
      "files": {
        "html": "<template>\n    <template lwc:if={open}>\n        <div\n            class=\"ui-modal-backdrop\"\n            onclick={handleClose}\n            onkeydown={handleBackdropKeydown}\n        >\n            <section\n                class={modalClass}\n                role=\"dialog\"\n                aria-modal=\"true\"\n                aria-label={header}\n                onclick={stopPropagation}\n            >\n                <header class=\"ui-modal__header\">\n                    <h2 class=\"ui-modal__title\">{header}</h2>\n                    <button\n                        class=\"ui-modal__close\"\n                        type=\"button\"\n                        title=\"閉じる\"\n                        onclick={handleClose}\n                    >\n                        &times;\n                    </button>\n                </header>\n                <div class=\"ui-modal__body\">\n                    <slot></slot>\n                </div>\n                <footer class=\"ui-modal__footer\">\n                    <slot name=\"footer\"></slot>\n                </footer>\n            </section>\n        </div>\n    </template>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\nconst SIZES = ['small', 'medium', 'large'];\n\n/**\n * uiModal — 汎用モーダルダイアログ。\n * open プロパティで表示制御し、本文 (default スロット) と\n * フッタ (footer スロット) を持つ。背景・×ボタン・Esc で close イベントを発火。\n */\nexport default class UiModal extends LightningElement {\n    /** ヘッダタイトル */\n    @api header;\n    /** true で表示 */\n    @api open = false;\n    /** サイズ: small | medium | large */\n    @api size = 'medium';\n\n    get modalClass() {\n        const size = SIZES.includes(this.size) ? this.size : 'medium';\n        return `ui-modal ui-modal_${size}`;\n    }\n\n    handleClose() {\n        this.dispatchEvent(new CustomEvent('close'));\n    }\n\n    handleBackdropKeydown(event) {\n        if (event.key === 'Escape') {\n            this.handleClose();\n        }\n    }\n\n    stopPropagation(event) {\n        event.stopPropagation();\n    }\n}\n",
        "css": ".ui-modal-backdrop {\n    position: fixed;\n    inset: 0;\n    background: rgba(8, 7, 7, 0.5);\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    padding: 16px;\n    z-index: 9000;\n}\n\n.ui-modal {\n    display: flex;\n    flex-direction: column;\n    width: 100%;\n    max-height: 90vh;\n    background: #ffffff;\n    border-radius: 10px;\n    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.28);\n    overflow: hidden;\n}\n\n.ui-modal_small {\n    max-width: 420px;\n}\n.ui-modal_medium {\n    max-width: 640px;\n}\n.ui-modal_large {\n    max-width: 900px;\n}\n\n.ui-modal__header {\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    padding: 16px 20px;\n    border-bottom: 1px solid #ececec;\n}\n\n.ui-modal__title {\n    flex: 1;\n    margin: 0;\n    font-size: 1.0625rem;\n    font-weight: 700;\n    color: #181818;\n}\n\n.ui-modal__close {\n    border: none;\n    background: transparent;\n    font-size: 1.5rem;\n    line-height: 1;\n    color: #706e6b;\n    cursor: pointer;\n    padding: 0 4px;\n    border-radius: 4px;\n}\n.ui-modal__close:hover {\n    background: #f3f3f3;\n    color: #181818;\n}\n\n.ui-modal__body {\n    padding: 20px;\n    overflow-y: auto;\n    color: #444444;\n    font-size: 0.875rem;\n    line-height: 1.6;\n}\n\n.ui-modal__footer {\n    display: flex;\n    justify-content: flex-end;\n    gap: 8px;\n    padding: 12px 20px;\n    border-top: 1px solid #ececec;\n    background: #fafafa;\n}\n\n.ui-modal__footer:empty {\n    display: none;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Modal</masterLabel>\n    <description>汎用モーダルダイアログ。open で表示制御し close イベントを発火。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiTabs",
      "title": "UI Tabs",
      "icon": "📑",
      "category": "ナビゲーション",
      "demo": "tabs",
      "description": "tabs 配列でヘッダと本文を切替える汎用タブ。select イベントで選択値を通知。",
      "props": [
        {
          "name": "tabs",
          "type": "Array",
          "def": "[]",
          "desc": "[{ label, value, content }] の配列"
        }
      ],
      "events": [
        {
          "name": "select",
          "desc": "タブ選択時に発火（detail.value）"
        }
      ],
      "usage": "<c-ui-tabs tabs={tabs} onselect={handleSelect}></c-ui-tabs>",
      "ja": "タブ",
      "files": {
        "html": "<template>\n    <div class=\"ui-tabs\">\n        <div class=\"ui-tabs__nav\" role=\"tablist\">\n            <template for:each={computedTabs} for:item=\"tab\">\n                <button\n                    key={tab.value}\n                    class={tab.cssClass}\n                    role=\"tab\"\n                    type=\"button\"\n                    aria-selected={tab.selected}\n                    data-value={tab.value}\n                    onclick={handleSelect}\n                >\n                    {tab.label}\n                </button>\n            </template>\n        </div>\n        <div class=\"ui-tabs__panel\" role=\"tabpanel\">{activeContent}</div>\n    </div>\n</template>\n",
        "js": "import { LightningElement, api, track } from 'lwc';\n\n/**\n * uiTabs — 汎用タブ。\n * tabs 配列 ([{ label, value, content }]) を受け取り、\n * ヘッダ切替で本文を表示し、select イベントで選択値を通知する。\n */\nexport default class UiTabs extends LightningElement {\n    @track _tabs = [];\n    @track activeValue;\n\n    /** [{ label, value, content }] の配列 */\n    @api\n    get tabs() {\n        return this._tabs;\n    }\n    set tabs(value) {\n        this._tabs = Array.isArray(value) ? value : [];\n        if (this._tabs.length && !this._hasActive()) {\n            this.activeValue = this._tabs[0].value;\n        }\n    }\n\n    _hasActive() {\n        return this._tabs.some((t) => t.value === this.activeValue);\n    }\n\n    get computedTabs() {\n        return this._tabs.map((t) => ({\n            ...t,\n            cssClass:\n                t.value === this.activeValue\n                    ? 'ui-tab ui-tab_active'\n                    : 'ui-tab',\n            selected: t.value === this.activeValue\n        }));\n    }\n\n    get activeContent() {\n        const tab = this._tabs.find((t) => t.value === this.activeValue);\n        return tab ? tab.content : '';\n    }\n\n    handleSelect(event) {\n        this.activeValue = event.currentTarget.dataset.value;\n        this.dispatchEvent(\n            new CustomEvent('select', { detail: { value: this.activeValue } })\n        );\n    }\n}\n",
        "css": ".ui-tabs {\n    width: 100%;\n}\n\n.ui-tabs__nav {\n    display: flex;\n    gap: 4px;\n    border-bottom: 1px solid #dddbda;\n}\n\n.ui-tab {\n    border: none;\n    background: transparent;\n    padding: 10px 16px;\n    font-size: 0.8125rem;\n    font-weight: 600;\n    color: #706e6b;\n    cursor: pointer;\n    border-bottom: 2px solid transparent;\n    margin-bottom: -1px;\n    font-family: inherit;\n}\n\n.ui-tab:hover {\n    color: #0176d3;\n}\n\n.ui-tab_active {\n    color: #0176d3;\n    border-bottom-color: #0176d3;\n}\n\n.ui-tabs__panel {\n    padding: 16px 4px;\n    font-size: 0.875rem;\n    line-height: 1.6;\n    color: #444444;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Tabs</masterLabel>\n    <description>汎用タブ。tabs配列でヘッダと本文を切替え、select イベントを発火。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiAccordion",
      "title": "UI Accordion",
      "icon": "📂",
      "category": "レイアウト",
      "demo": "accordion",
      "description": "sections 配列を折りたたみ表示。allowMultiple で複数同時オープンを制御。",
      "props": [
        {
          "name": "sections",
          "type": "Array",
          "def": "[]",
          "desc": "[{ label, value, content }] の配列"
        },
        {
          "name": "allow-multiple",
          "type": "Boolean",
          "def": "false",
          "desc": "true で複数同時オープン"
        }
      ],
      "events": [
        {
          "name": "toggle",
          "desc": "開閉時に発火（detail.open: 開いている value 配列）"
        }
      ],
      "usage": "<c-ui-accordion sections={sections}></c-ui-accordion>",
      "ja": "アコーディオン",
      "files": {
        "html": "<template>\n    <div class=\"ui-accordion\">\n        <template for:each={computedSections} for:item=\"section\">\n            <div key={section.value} class={section.cssClass}>\n                <button\n                    class=\"ui-accordion__header\"\n                    type=\"button\"\n                    aria-expanded={section.isOpen}\n                    data-value={section.value}\n                    onclick={handleToggle}\n                >\n                    <span class=\"ui-accordion__icon\">{section.iconChar}</span>\n                    <span class=\"ui-accordion__label\">{section.label}</span>\n                </button>\n                <div lwc:if={section.isOpen} class=\"ui-accordion__body\">\n                    {section.content}\n                </div>\n            </div>\n        </template>\n    </div>\n</template>\n",
        "js": "import { LightningElement, api, track } from 'lwc';\n\n/**\n * uiAccordion — 汎用アコーディオン。\n * sections 配列 ([{ label, value, content }]) を折りたたみ表示する。\n * allowMultiple=false (既定) では同時に1つだけ開く。\n * 開閉時に toggle イベントで開いている value 配列を通知する。\n */\nexport default class UiAccordion extends LightningElement {\n    @track _sections = [];\n    @track openValues = [];\n\n    /** [{ label, value, content }] の配列 */\n    @api\n    get sections() {\n        return this._sections;\n    }\n    set sections(value) {\n        this._sections = Array.isArray(value) ? value : [];\n    }\n\n    /** true で複数同時オープンを許可 */\n    @api allowMultiple = false;\n\n    get computedSections() {\n        return this._sections.map((s) => {\n            const isOpen = this.openValues.includes(s.value);\n            return {\n                ...s,\n                isOpen,\n                cssClass: isOpen\n                    ? 'ui-accordion__item ui-accordion__item_open'\n                    : 'ui-accordion__item',\n                iconChar: isOpen ? '−' : '+'\n            };\n        });\n    }\n\n    handleToggle(event) {\n        const value = event.currentTarget.dataset.value;\n        const isOpen = this.openValues.includes(value);\n        if (this.allowMultiple) {\n            this.openValues = isOpen\n                ? this.openValues.filter((v) => v !== value)\n                : [...this.openValues, value];\n        } else {\n            this.openValues = isOpen ? [] : [value];\n        }\n        this.dispatchEvent(\n            new CustomEvent('toggle', { detail: { open: [...this.openValues] } })\n        );\n    }\n}\n",
        "css": ".ui-accordion {\n    border: 1px solid #e5e5e5;\n    border-radius: 8px;\n    overflow: hidden;\n}\n\n.ui-accordion__item + .ui-accordion__item {\n    border-top: 1px solid #ececec;\n}\n\n.ui-accordion__header {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    width: 100%;\n    padding: 12px 16px;\n    border: none;\n    background: #ffffff;\n    cursor: pointer;\n    font-size: 0.875rem;\n    font-weight: 600;\n    color: #181818;\n    text-align: left;\n    font-family: inherit;\n}\n\n.ui-accordion__header:hover {\n    background: #f8f8f8;\n}\n\n.ui-accordion__icon {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    width: 18px;\n    height: 18px;\n    border-radius: 4px;\n    background: #eef4ff;\n    color: #0176d3;\n    font-weight: 700;\n    flex-shrink: 0;\n}\n\n.ui-accordion__label {\n    flex: 1;\n}\n\n.ui-accordion__body {\n    padding: 0 16px 14px 44px;\n    font-size: 0.8125rem;\n    line-height: 1.6;\n    color: #444444;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Accordion</masterLabel>\n    <description>汎用アコーディオン。sections配列を折りたたみ表示し toggle イベントを発火。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiDataTable",
      "title": "UI Data Table",
      "icon": "📊",
      "category": "表示",
      "demo": "datatable",
      "description": "列ソート（昇順⇄降順）と行クリック（rowselect）に対応した汎用データテーブル。",
      "props": [
        {
          "name": "columns",
          "type": "Array",
          "def": "[]",
          "desc": "[{ label, fieldName, sortable }] の配列"
        },
        {
          "name": "data",
          "type": "Array",
          "def": "[]",
          "desc": "表示するレコード（オブジェクト配列）"
        }
      ],
      "events": [
        {
          "name": "rowselect",
          "desc": "行クリック時に発火（detail.row）"
        }
      ],
      "usage": "<c-ui-data-table columns={columns} data={rows} onrowselect={handleRow}></c-ui-data-table>",
      "ja": "データテーブル",
      "files": {
        "html": "<template>\n    <table class=\"ui-dt\">\n        <thead>\n            <tr>\n                <template for:each={computedColumns} for:item=\"col\">\n                    <th\n                        key={col.fieldName}\n                        class={col.cssClass}\n                        data-field={col.fieldName}\n                        onclick={handleSort}\n                        scope=\"col\"\n                    >\n                        {col.headerLabel}\n                    </th>\n                </template>\n            </tr>\n        </thead>\n        <tbody>\n            <template for:each={computedRows} for:item=\"row\" for:index=\"idx\">\n                <tr\n                    key={row.key}\n                    class=\"ui-dt__row\"\n                    data-index={idx}\n                    onclick={handleRowClick}\n                >\n                    <template for:each={row.cells} for:item=\"cell\">\n                        <td key={cell.key} class=\"ui-dt__td\">{cell.value}</td>\n                    </template>\n                </tr>\n            </template>\n        </tbody>\n    </table>\n</template>\n",
        "js": "import { LightningElement, api, track } from 'lwc';\n\n/**\n * uiDataTable — 汎用データテーブル。\n * columns ([{ label, fieldName, sortable }]) と data (オブジェクト配列) を受け取り、\n * ソート可能列のヘッダクリックで昇順→降順を切替える。\n * 行クリックで rowselect イベント (detail: { row }) を発火する。\n */\nexport default class UiDataTable extends LightningElement {\n    @track _columns = [];\n    @track _data = [];\n    @track sortBy;\n    @track sortDirection = 'asc';\n\n    /** [{ label, fieldName, sortable }] の配列 */\n    @api\n    get columns() {\n        return this._columns;\n    }\n    set columns(value) {\n        this._columns = Array.isArray(value) ? value : [];\n    }\n\n    /** 表示するレコード (オブジェクト配列) */\n    @api\n    get data() {\n        return this._data;\n    }\n    set data(value) {\n        this._data = Array.isArray(value) ? value : [];\n    }\n\n    get computedColumns() {\n        return this._columns.map((c) => {\n            const isSorted = c.sortable && c.fieldName === this.sortBy;\n            let indicator = '';\n            if (isSorted) {\n                indicator = this.sortDirection === 'asc' ? ' ▲' : ' ▼';\n            }\n            return {\n                ...c,\n                cssClass: c.sortable\n                    ? 'ui-dt__th ui-dt__th_sortable'\n                    : 'ui-dt__th',\n                headerLabel: c.label + indicator\n            };\n        });\n    }\n\n    get computedRows() {\n        const rows = [...this._data];\n        if (this.sortBy) {\n            const dir = this.sortDirection === 'asc' ? 1 : -1;\n            rows.sort((a, b) => {\n                const av = a[this.sortBy];\n                const bv = b[this.sortBy];\n                if (av === bv) {\n                    return 0;\n                }\n                if (av === undefined || av === null) {\n                    return 1;\n                }\n                if (bv === undefined || bv === null) {\n                    return -1;\n                }\n                return av > bv ? dir : -dir;\n            });\n        }\n        return rows.map((row, index) => ({\n            key: row.id !== undefined ? row.id : index,\n            data: row,\n            cells: this._columns.map((c) => ({\n                key: c.fieldName,\n                value: row[c.fieldName]\n            }))\n        }));\n    }\n\n    handleSort(event) {\n        const field = event.currentTarget.dataset.field;\n        const column = this._columns.find((c) => c.fieldName === field);\n        if (!column || !column.sortable) {\n            return;\n        }\n        if (this.sortBy === field) {\n            this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';\n        } else {\n            this.sortBy = field;\n            this.sortDirection = 'asc';\n        }\n    }\n\n    handleRowClick(event) {\n        const index = Number(event.currentTarget.dataset.index);\n        const row = this.computedRows[index];\n        this.dispatchEvent(\n            new CustomEvent('rowselect', { detail: { row: row && row.data } })\n        );\n    }\n}\n",
        "css": ".ui-dt {\n    width: 100%;\n    border-collapse: collapse;\n    font-size: 0.8125rem;\n    background: #ffffff;\n}\n\n.ui-dt__th {\n    text-align: left;\n    padding: 10px 12px;\n    background: #fafaf9;\n    border-bottom: 1px solid #dddbda;\n    font-weight: 700;\n    color: #514f4d;\n    white-space: nowrap;\n}\n\n.ui-dt__th_sortable {\n    cursor: pointer;\n    user-select: none;\n}\n.ui-dt__th_sortable:hover {\n    background: #f3f2f2;\n    color: #0176d3;\n}\n\n.ui-dt__row {\n    cursor: pointer;\n    transition: background 0.1s ease;\n}\n.ui-dt__row:hover {\n    background: #f3f9ff;\n}\n\n.ui-dt__td {\n    padding: 10px 12px;\n    border-bottom: 1px solid #ececec;\n    color: #444444;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Data Table</masterLabel>\n    <description>汎用データテーブル。列ソートと行クリック (rowselect) に対応。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiProgressBar",
      "title": "UI Progress Bar",
      "icon": "📶",
      "category": "表示",
      "demo": "progress",
      "description": "0〜100 の進捗を色付きバーで表示。任意でパーセント数値を併記。",
      "props": [
        {
          "name": "value",
          "type": "Number",
          "def": "0",
          "desc": "進捗率 0〜100"
        },
        {
          "name": "variant",
          "type": "String",
          "def": "'brand'",
          "desc": "brand | success | warning | error"
        },
        {
          "name": "show-label",
          "type": "Boolean",
          "def": "false",
          "desc": "true でパーセント表示"
        }
      ],
      "events": [],
      "usage": "<c-ui-progress-bar value=\"65\" variant=\"success\" show-label></c-ui-progress-bar>",
      "ja": "プログレスバー",
      "files": {
        "html": "<template>\n    <div class=\"ui-progress\">\n        <div\n            class=\"ui-progress__track\"\n            role=\"progressbar\"\n            aria-valuenow={clampedValue}\n            aria-valuemin=\"0\"\n            aria-valuemax=\"100\"\n        >\n            <div class={fillClass} style={barStyle}></div>\n        </div>\n        <span lwc:if={showLabel} class=\"ui-progress__label\">{labelText}</span>\n    </div>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\nconst VARIANTS = ['brand', 'success', 'warning', 'error'];\n\n/**\n * uiProgressBar — 汎用プログレスバー。\n * 0〜100 の値を色付きバーで表示し、任意でパーセント数値を併記する。\n */\nexport default class UiProgressBar extends LightningElement {\n    /** 進捗率 0〜100 */\n    @api value = 0;\n    /** 色バリアント: brand | success | warning | error */\n    @api variant = 'brand';\n    /** true でパーセント表示 */\n    @api showLabel = false;\n\n    get clampedValue() {\n        const n = Number(this.value);\n        if (Number.isNaN(n)) {\n            return 0;\n        }\n        return Math.min(100, Math.max(0, n));\n    }\n\n    get barStyle() {\n        return `width: ${this.clampedValue}%`;\n    }\n\n    get fillClass() {\n        const variant = VARIANTS.includes(this.variant) ? this.variant : 'brand';\n        return `ui-progress__fill ui-progress__fill_${variant}`;\n    }\n\n    get labelText() {\n        return `${Math.round(this.clampedValue)}%`;\n    }\n}\n",
        "css": ".ui-progress {\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    width: 100%;\n}\n\n.ui-progress__track {\n    flex: 1;\n    height: 8px;\n    border-radius: 5px;\n    background: #e5e5e5;\n    overflow: hidden;\n}\n\n.ui-progress__fill {\n    height: 100%;\n    border-radius: 5px;\n    transition: width 0.3s ease;\n}\n\n.ui-progress__fill_brand {\n    background: #0176d3;\n}\n.ui-progress__fill_success {\n    background: #2e844a;\n}\n.ui-progress__fill_warning {\n    background: #dd7a01;\n}\n.ui-progress__fill_error {\n    background: #ba0517;\n}\n\n.ui-progress__label {\n    font-size: 0.75rem;\n    font-weight: 600;\n    color: #444444;\n    min-width: 36px;\n    text-align: right;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Progress Bar</masterLabel>\n    <description>汎用プログレスバー。0〜100の進捗を色付きバーで表示。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiInput",
      "title": "UI Input",
      "icon": "⌨️",
      "category": "フォーム",
      "demo": "input",
      "description": "ラベル・プレースホルダ・必須表示に対応したテキスト入力。change イベントを発火。",
      "props": [
        {
          "name": "label",
          "type": "String",
          "def": "—",
          "desc": "ラベル"
        },
        {
          "name": "value",
          "type": "String",
          "def": "''",
          "desc": "入力値"
        },
        {
          "name": "placeholder",
          "type": "String",
          "def": "''",
          "desc": "プレースホルダ"
        },
        {
          "name": "type",
          "type": "String",
          "def": "'text'",
          "desc": "text | email | number | password 等"
        },
        {
          "name": "required",
          "type": "Boolean",
          "def": "false",
          "desc": "true で必須マーク"
        },
        {
          "name": "disabled",
          "type": "Boolean",
          "def": "false",
          "desc": "true で無効化"
        }
      ],
      "events": [
        {
          "name": "change",
          "desc": "入力時に発火（detail.value）"
        }
      ],
      "usage": "<c-ui-input label=\"氏名\" required onchange={handleChange}></c-ui-input>",
      "ja": "入力フィールド",
      "files": {
        "html": "<template>\n    <div class=\"ui-input\">\n        <label lwc:if={label} class=\"ui-input__label\">\n            {label}\n            <abbr lwc:if={required} class=\"ui-input__req\" title=\"必須\">*</abbr>\n        </label>\n        <input\n            class=\"ui-input__field\"\n            type={type}\n            value={value}\n            placeholder={placeholder}\n            disabled={disabled}\n            oninput={handleInput}\n        />\n    </div>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\n/**\n * uiInput — 汎用テキスト入力。\n * ラベル・プレースホルダ・必須表示に対応し、入力時に change イベント\n * (detail.value) を発火する。\n */\nexport default class UiInput extends LightningElement {\n    /** ラベル */\n    @api label;\n    /** 入力値 */\n    @api value = '';\n    /** プレースホルダ */\n    @api placeholder = '';\n    /** input type: text | email | number | password など */\n    @api type = 'text';\n    /** true で必須マーク表示 */\n    @api required = false;\n    /** true で無効化 */\n    @api disabled = false;\n\n    handleInput(event) {\n        this.value = event.target.value;\n        this.dispatchEvent(\n            new CustomEvent('change', { detail: { value: this.value } })\n        );\n    }\n}\n",
        "css": ".ui-input {\n    display: flex;\n    flex-direction: column;\n    gap: 4px;\n    width: 100%;\n}\n\n.ui-input__label {\n    font-size: 0.78rem;\n    font-weight: 600;\n    color: #444444;\n}\n\n.ui-input__req {\n    color: #ba0517;\n    text-decoration: none;\n    margin-left: 2px;\n}\n\n.ui-input__field {\n    width: 100%;\n    height: 34px;\n    padding: 0 12px;\n    border: 1px solid #c9c9c9;\n    border-radius: 6px;\n    font-size: 0.875rem;\n    color: #181818;\n    background: #ffffff;\n    font-family: inherit;\n}\n\n.ui-input__field:focus {\n    outline: none;\n    border-color: #0176d3;\n    box-shadow: 0 0 0 2px rgba(1, 118, 211, 0.25);\n}\n\n.ui-input__field:disabled {\n    background: #f3f3f3;\n    color: #969492;\n    cursor: not-allowed;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Input</masterLabel>\n    <description>汎用テキスト入力。ラベル・必須表示に対応し change イベントを発火。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiToggle",
      "title": "UI Toggle",
      "icon": "🔀",
      "category": "フォーム",
      "demo": "toggle",
      "description": "ON/OFF を切替える汎用スイッチ。change イベント (detail.checked) を発火。",
      "props": [
        {
          "name": "label",
          "type": "String",
          "def": "—",
          "desc": "ラベル"
        },
        {
          "name": "checked",
          "type": "Boolean",
          "def": "false",
          "desc": "ON 状態"
        },
        {
          "name": "disabled",
          "type": "Boolean",
          "def": "false",
          "desc": "true で無効化"
        }
      ],
      "events": [
        {
          "name": "change",
          "desc": "切替時に発火（detail.checked）"
        }
      ],
      "usage": "<c-ui-toggle label=\"通知を受け取る\" checked onchange={handleToggle}></c-ui-toggle>",
      "ja": "トグルスイッチ",
      "files": {
        "html": "<template>\n    <button\n        class=\"ui-toggle\"\n        type=\"button\"\n        role=\"switch\"\n        aria-checked={checked}\n        disabled={disabled}\n        onclick={handleClick}\n    >\n        <span class={trackClass}>\n            <span class=\"ui-toggle__thumb\"></span>\n        </span>\n        <span lwc:if={label} class=\"ui-toggle__label\">{label}</span>\n    </button>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\n/**\n * uiToggle — 汎用トグルスイッチ。\n * checked の ON/OFF を切替え、change イベント (detail.checked) を発火する。\n */\nexport default class UiToggle extends LightningElement {\n    /** ラベル */\n    @api label;\n    /** ON 状態 */\n    @api checked = false;\n    /** true で無効化 */\n    @api disabled = false;\n\n    get trackClass() {\n        return this.checked\n            ? 'ui-toggle__track ui-toggle__track_on'\n            : 'ui-toggle__track';\n    }\n\n    handleClick() {\n        if (this.disabled) {\n            return;\n        }\n        this.checked = !this.checked;\n        this.dispatchEvent(\n            new CustomEvent('change', { detail: { checked: this.checked } })\n        );\n    }\n}\n",
        "css": ".ui-toggle {\n    display: inline-flex;\n    align-items: center;\n    gap: 10px;\n    border: none;\n    background: transparent;\n    cursor: pointer;\n    padding: 0;\n    font-family: inherit;\n}\n\n.ui-toggle:disabled {\n    opacity: 0.5;\n    cursor: not-allowed;\n}\n\n.ui-toggle__track {\n    position: relative;\n    width: 40px;\n    height: 22px;\n    border-radius: 11px;\n    background: #c9c9c9;\n    transition: background 0.18s ease;\n    flex-shrink: 0;\n}\n\n.ui-toggle__track_on {\n    background: #2e844a;\n}\n\n.ui-toggle__thumb {\n    position: absolute;\n    top: 2px;\n    left: 2px;\n    width: 18px;\n    height: 18px;\n    border-radius: 50%;\n    background: #ffffff;\n    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);\n    transition: transform 0.18s ease;\n}\n\n.ui-toggle__track_on .ui-toggle__thumb {\n    transform: translateX(18px);\n}\n\n.ui-toggle__label {\n    font-size: 0.85rem;\n    color: #181818;\n    font-weight: 600;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Toggle</masterLabel>\n    <description>汎用トグルスイッチ。ON/OFFを切替え change イベントを発火。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiAvatar",
      "title": "UI Avatar",
      "icon": "👤",
      "category": "表示",
      "demo": "avatar",
      "description": "画像があれば画像、なければ名前のイニシャルを表示するアバター。",
      "props": [
        {
          "name": "name",
          "type": "String",
          "def": "''",
          "desc": "イニシャル生成に使う名前"
        },
        {
          "name": "src",
          "type": "String",
          "def": "—",
          "desc": "画像 URL（指定時は画像表示）"
        },
        {
          "name": "size",
          "type": "String",
          "def": "'medium'",
          "desc": "small | medium | large"
        },
        {
          "name": "variant",
          "type": "String",
          "def": "'circle'",
          "desc": "circle | square"
        }
      ],
      "events": [],
      "usage": "<c-ui-avatar name=\"田中 太郎\" size=\"large\"></c-ui-avatar>",
      "ja": "アバター",
      "files": {
        "html": "<template>\n    <span class={avatarClass}>\n        <img\n            lwc:if={hasImage}\n            src={src}\n            alt={name}\n            class=\"ui-avatar__img\"\n        />\n        <span lwc:else class=\"ui-avatar__initials\">{initials}</span>\n    </span>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\nconst SIZES = ['small', 'medium', 'large'];\n\n/**\n * uiAvatar — 汎用アバター。\n * 画像 (src) があれば画像、なければ name から生成したイニシャルを表示する。\n */\nexport default class UiAvatar extends LightningElement {\n    /** 表示名（イニシャル生成に使用） */\n    @api name = '';\n    /** 画像 URL（指定時は画像を表示） */\n    @api src;\n    /** サイズ: small | medium | large */\n    @api size = 'medium';\n    /** 形状: circle | square */\n    @api variant = 'circle';\n\n    get hasImage() {\n        return !!this.src;\n    }\n\n    get initials() {\n        const text = (this.name || '').trim();\n        if (!text) {\n            return '?';\n        }\n        const parts = text.split(/\\s+/);\n        if (parts.length === 1) {\n            return parts[0].slice(0, 2).toUpperCase();\n        }\n        return (parts[0][0] + parts[1][0]).toUpperCase();\n    }\n\n    get avatarClass() {\n        const size = SIZES.includes(this.size) ? this.size : 'medium';\n        const shape = this.variant === 'square' ? 'square' : 'circle';\n        return `ui-avatar ui-avatar_${size} ui-avatar_${shape}`;\n    }\n}\n",
        "css": ".ui-avatar {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    overflow: hidden;\n    background: #0176d3;\n    color: #ffffff;\n    font-weight: 700;\n    flex-shrink: 0;\n}\n\n.ui-avatar_circle {\n    border-radius: 50%;\n}\n.ui-avatar_square {\n    border-radius: 8px;\n}\n\n.ui-avatar_small {\n    width: 28px;\n    height: 28px;\n    font-size: 0.7rem;\n}\n.ui-avatar_medium {\n    width: 40px;\n    height: 40px;\n    font-size: 0.9rem;\n}\n.ui-avatar_large {\n    width: 56px;\n    height: 56px;\n    font-size: 1.2rem;\n}\n\n.ui-avatar__img {\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Avatar</masterLabel>\n    <description>汎用アバター。画像またはイニシャルを円形/角丸で表示。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiPill",
      "title": "UI Pill",
      "icon": "🟦",
      "category": "表示",
      "demo": "pill",
      "description": "ラベルを表示する汎用ピル（タグ）。removable で×ボタンと remove イベントを有効化。",
      "props": [
        {
          "name": "label",
          "type": "String",
          "def": "—",
          "desc": "表示テキスト"
        },
        {
          "name": "removable",
          "type": "Boolean",
          "def": "false",
          "desc": "true で削除ボタン表示"
        }
      ],
      "events": [
        {
          "name": "remove",
          "desc": "×ボタン押下時に発火"
        }
      ],
      "usage": "<c-ui-pill label=\"重要\" removable onremove={handleRemove}></c-ui-pill>",
      "ja": "ピル（タグ）",
      "files": {
        "html": "<template>\n    <span class=\"ui-pill\">\n        <span class=\"ui-pill__label\">{label}</span>\n        <button\n            lwc:if={removable}\n            class=\"ui-pill__remove\"\n            type=\"button\"\n            title=\"削除\"\n            onclick={handleRemove}\n        >\n            &times;\n        </button>\n    </span>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\n/**\n * uiPill — 汎用ピル（タグ）。\n * ラベルを表示し、removable=true のとき×ボタンで remove イベントを発火する。\n */\nexport default class UiPill extends LightningElement {\n    /** 表示テキスト */\n    @api label;\n    /** true で削除ボタンを表示 */\n    @api removable = false;\n\n    handleRemove() {\n        this.dispatchEvent(new CustomEvent('remove'));\n    }\n}\n",
        "css": ".ui-pill {\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    padding: 3px 4px 3px 10px;\n    border: 1px solid #c9c9c9;\n    border-radius: 14px;\n    background: #ffffff;\n    font-size: 0.78rem;\n    color: #181818;\n}\n\n.ui-pill__label {\n    line-height: 1.4;\n}\n\n.ui-pill__remove {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    width: 18px;\n    height: 18px;\n    border: none;\n    border-radius: 50%;\n    background: transparent;\n    color: #706e6b;\n    font-size: 1rem;\n    line-height: 1;\n    cursor: pointer;\n}\n\n.ui-pill__remove:hover {\n    background: #ececec;\n    color: #181818;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Pill</masterLabel>\n    <description>汎用ピル（タグ）。削除可能時に remove イベントを発火。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiAlert",
      "title": "UI Alert",
      "icon": "📢",
      "category": "フィードバック",
      "demo": "alert",
      "description": "バリアントに応じた色・アイコンでメッセージを表示するインラインアラート。",
      "props": [
        {
          "name": "variant",
          "type": "String",
          "def": "'info'",
          "desc": "info | success | warning | error"
        },
        {
          "name": "title",
          "type": "String",
          "def": "—",
          "desc": "見出し（任意）"
        },
        {
          "name": "closable",
          "type": "Boolean",
          "def": "false",
          "desc": "true で閉じるボタン表示"
        }
      ],
      "slots": [
        {
          "name": "(default)",
          "desc": "メッセージ本文"
        }
      ],
      "events": [
        {
          "name": "close",
          "desc": "閉じる操作時に発火"
        }
      ],
      "usage": "<c-ui-alert variant=\"success\" title=\"保存しました\" closable>\n    変更内容が保存されました。\n</c-ui-alert>",
      "ja": "アラート",
      "files": {
        "html": "<template>\n    <div lwc:if={isVisible} class={alertClass} role=\"alert\">\n        <span class=\"ui-alert__icon\">{iconChar}</span>\n        <div class=\"ui-alert__content\">\n            <strong lwc:if={title} class=\"ui-alert__title\">{title}</strong>\n            <div class=\"ui-alert__message\"><slot></slot></div>\n        </div>\n        <button\n            lwc:if={closable}\n            class=\"ui-alert__close\"\n            type=\"button\"\n            title=\"閉じる\"\n            onclick={handleClose}\n        >\n            &times;\n        </button>\n    </div>\n</template>\n",
        "js": "import { LightningElement, api, track } from 'lwc';\n\nconst ICONS = {\n    info: 'ℹ',\n    success: '✓',\n    warning: '!',\n    error: '✕'\n};\n\n/**\n * uiAlert — 汎用インラインアラート。\n * variant に応じた色とアイコンでメッセージ (default スロット) を表示する。\n * closable=true のとき×ボタンで閉じ、close イベントを発火する。\n */\nexport default class UiAlert extends LightningElement {\n    /** バリアント: info | success | warning | error */\n    @api variant = 'info';\n    /** 見出し（任意） */\n    @api title;\n    /** true で閉じるボタンを表示 */\n    @api closable = false;\n\n    @track closed = false;\n\n    get isVisible() {\n        return !this.closed;\n    }\n\n    get alertClass() {\n        const variant = ICONS[this.variant] ? this.variant : 'info';\n        return `ui-alert ui-alert_${variant}`;\n    }\n\n    get iconChar() {\n        return ICONS[this.variant] || ICONS.info;\n    }\n\n    handleClose() {\n        this.closed = true;\n        this.dispatchEvent(new CustomEvent('close'));\n    }\n}\n",
        "css": ".ui-alert {\n    display: flex;\n    align-items: flex-start;\n    gap: 10px;\n    padding: 12px 14px;\n    border-radius: 8px;\n    border: 1px solid transparent;\n    font-size: 0.85rem;\n    line-height: 1.5;\n}\n\n.ui-alert__icon {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    width: 20px;\n    height: 20px;\n    border-radius: 50%;\n    color: #ffffff;\n    font-weight: 700;\n    font-size: 0.8rem;\n    flex-shrink: 0;\n    margin-top: 1px;\n}\n\n.ui-alert__content {\n    flex: 1;\n}\n\n.ui-alert__title {\n    display: block;\n    margin-bottom: 2px;\n}\n\n.ui-alert__close {\n    border: none;\n    background: transparent;\n    font-size: 1.2rem;\n    line-height: 1;\n    cursor: pointer;\n    color: inherit;\n    opacity: 0.7;\n    padding: 0 2px;\n}\n.ui-alert__close:hover {\n    opacity: 1;\n}\n\n.ui-alert_info {\n    background: #eef4ff;\n    border-color: #cfe0fb;\n    color: #0b5cab;\n}\n.ui-alert_info .ui-alert__icon {\n    background: #0176d3;\n}\n\n.ui-alert_success {\n    background: #e6f4ea;\n    border-color: #c3e6cd;\n    color: #1d7a3f;\n}\n.ui-alert_success .ui-alert__icon {\n    background: #2e844a;\n}\n\n.ui-alert_warning {\n    background: #fef5e7;\n    border-color: #f7dba7;\n    color: #a86403;\n}\n.ui-alert_warning .ui-alert__icon {\n    background: #dd7a01;\n}\n\n.ui-alert_error {\n    background: #fdecea;\n    border-color: #f5c6c2;\n    color: #b3261e;\n}\n.ui-alert_error .ui-alert__icon {\n    background: #ba0517;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Alert</masterLabel>\n    <description>汎用インラインアラート。色・アイコン・閉じるボタンに対応。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiSpinner",
      "title": "UI Spinner",
      "icon": "⏳",
      "category": "フィードバック",
      "demo": "spinner",
      "description": "サイズ・色バリアントに対応した CSS アニメーションのローディングスピナー。",
      "props": [
        {
          "name": "size",
          "type": "String",
          "def": "'medium'",
          "desc": "small | medium | large"
        },
        {
          "name": "variant",
          "type": "String",
          "def": "'brand'",
          "desc": "brand | inverse"
        },
        {
          "name": "alternative-text",
          "type": "String",
          "def": "'読み込み中'",
          "desc": "スクリーンリーダー向け代替テキスト"
        }
      ],
      "events": [],
      "usage": "<c-ui-spinner size=\"large\"></c-ui-spinner>",
      "ja": "スピナー",
      "files": {
        "html": "<template>\n    <span class={spinnerClass} role=\"status\">\n        <span class=\"ui-spinner__circle\"></span>\n        <span class=\"ui-spinner__assistive\">{alternativeText}</span>\n    </span>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\nconst SIZES = ['small', 'medium', 'large'];\n\n/**\n * uiSpinner — 汎用ローディングスピナー。\n * サイズと色バリアントに対応した CSS アニメーションの円形スピナー。\n */\nexport default class UiSpinner extends LightningElement {\n    /** サイズ: small | medium | large */\n    @api size = 'medium';\n    /** バリアント: brand | inverse */\n    @api variant = 'brand';\n    /** スクリーンリーダー向けの代替テキスト */\n    @api alternativeText = '読み込み中';\n\n    get spinnerClass() {\n        const size = SIZES.includes(this.size) ? this.size : 'medium';\n        const variant = this.variant === 'inverse' ? 'inverse' : 'brand';\n        return `ui-spinner ui-spinner_${size} ui-spinner_${variant}`;\n    }\n}\n",
        "css": ".ui-spinner {\n    display: inline-flex;\n}\n\n.ui-spinner__circle {\n    display: block;\n    border-radius: 50%;\n    border-style: solid;\n    border-color: #d8d8d8;\n    border-top-color: #0176d3;\n    animation: ui-spinner-rotate 0.7s linear infinite;\n}\n\n.ui-spinner_inverse .ui-spinner__circle {\n    border-color: rgba(255, 255, 255, 0.4);\n    border-top-color: #ffffff;\n}\n\n.ui-spinner_small .ui-spinner__circle {\n    width: 16px;\n    height: 16px;\n    border-width: 2px;\n}\n.ui-spinner_medium .ui-spinner__circle {\n    width: 28px;\n    height: 28px;\n    border-width: 3px;\n}\n.ui-spinner_large .ui-spinner__circle {\n    width: 44px;\n    height: 44px;\n    border-width: 4px;\n}\n\n.ui-spinner__assistive {\n    position: absolute;\n    width: 1px;\n    height: 1px;\n    overflow: hidden;\n    clip: rect(0 0 0 0);\n    white-space: nowrap;\n}\n\n@keyframes ui-spinner-rotate {\n    from {\n        transform: rotate(0deg);\n    }\n    to {\n        transform: rotate(360deg);\n    }\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Spinner</masterLabel>\n    <description>汎用ローディングスピナー。サイズ・色バリアントに対応。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiToast",
      "title": "UI Toast",
      "icon": "🔔",
      "category": "フィードバック",
      "demo": "toast",
      "description": "show(message, variant) で表示し一定時間後に自動で閉じるトースト通知。",
      "props": [
        {
          "name": "variant",
          "type": "String",
          "def": "'info'",
          "desc": "既定バリアント info | success | warning | error"
        },
        {
          "name": "duration",
          "type": "Number",
          "def": "3000",
          "desc": "自動クローズまでの ms（0 で無効）"
        }
      ],
      "events": [
        {
          "name": "close",
          "desc": "閉じた時に発火"
        }
      ],
      "methods": [
        {
          "name": "show(message, variant)",
          "desc": "トーストを表示"
        },
        {
          "name": "close()",
          "desc": "トーストを閉じる"
        }
      ],
      "usage": "// 親コンポーネントから\nthis.template.querySelector('c-ui-toast').show('保存しました', 'success');",
      "ja": "トースト通知",
      "files": {
        "html": "<template>\n    <div lwc:if={isVisible} class={toastClass} role=\"status\" aria-live=\"polite\">\n        <span class=\"ui-toast__icon\">{iconChar}</span>\n        <span class=\"ui-toast__message\">{message}</span>\n        <button\n            class=\"ui-toast__close\"\n            type=\"button\"\n            title=\"閉じる\"\n            onclick={close}\n        >\n            &times;\n        </button>\n    </div>\n</template>\n",
        "js": "import { LightningElement, api, track } from 'lwc';\n\nconst ICONS = {\n    info: 'ℹ',\n    success: '✓',\n    warning: '!',\n    error: '✕'\n};\n\n/**\n * uiToast — 汎用トースト通知。\n * show(message, variant) で表示し、duration 経過後に自動で閉じる。\n * ×ボタンまたは自動クローズ時に close イベントを発火する。\n */\nexport default class UiToast extends LightningElement {\n    /** 既定バリアント: info | success | warning | error */\n    @api variant = 'info';\n    /** 自動クローズまでの ms（0 で自動クローズしない） */\n    @api duration = 3000;\n\n    @track _message = '';\n    @track _variant = 'info';\n    @track _visible = false;\n    _timer;\n\n    /** トーストを表示する */\n    @api\n    show(message, variant) {\n        this._message = message;\n        this._variant = ICONS[variant] ? variant : this.variant;\n        this._visible = true;\n        if (this._timer) {\n            clearTimeout(this._timer);\n        }\n        if (this.duration > 0) {\n            // eslint-disable-next-line @lwc/lwc/no-async-operation\n            this._timer = setTimeout(() => this.close(), this.duration);\n        }\n    }\n\n    /** トーストを閉じる */\n    @api\n    close() {\n        if (this._timer) {\n            clearTimeout(this._timer);\n        }\n        this._visible = false;\n        this.dispatchEvent(new CustomEvent('close'));\n    }\n\n    get isVisible() {\n        return this._visible;\n    }\n\n    get message() {\n        return this._message;\n    }\n\n    get toastClass() {\n        return `ui-toast ui-toast_${this._variant}`;\n    }\n\n    get iconChar() {\n        return ICONS[this._variant] || ICONS.info;\n    }\n}\n",
        "css": ".ui-toast {\n    display: inline-flex;\n    align-items: center;\n    gap: 10px;\n    padding: 12px 14px;\n    border-radius: 8px;\n    color: #ffffff;\n    font-size: 0.85rem;\n    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);\n    max-width: 420px;\n}\n\n.ui-toast__icon {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    width: 20px;\n    height: 20px;\n    border-radius: 50%;\n    background: rgba(255, 255, 255, 0.25);\n    font-weight: 700;\n    font-size: 0.8rem;\n    flex-shrink: 0;\n}\n\n.ui-toast__message {\n    flex: 1;\n    line-height: 1.4;\n}\n\n.ui-toast__close {\n    border: none;\n    background: transparent;\n    color: #ffffff;\n    font-size: 1.2rem;\n    line-height: 1;\n    cursor: pointer;\n    opacity: 0.8;\n    padding: 0 2px;\n}\n.ui-toast__close:hover {\n    opacity: 1;\n}\n\n.ui-toast_info {\n    background: #0176d3;\n}\n.ui-toast_success {\n    background: #2e844a;\n}\n.ui-toast_warning {\n    background: #dd7a01;\n}\n.ui-toast_error {\n    background: #ba0517;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Toast</masterLabel>\n    <description>汎用トースト通知。show() で表示し自動クローズ・close イベントに対応。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiPagination",
      "title": "UI Pagination",
      "icon": "⏬",
      "category": "ナビゲーション",
      "demo": "pagination",
      "description": "totalPages / currentPage を受け取りページ番号を表示。change イベントで遷移先を通知。",
      "props": [
        {
          "name": "total-pages",
          "type": "Number",
          "def": "1",
          "desc": "総ページ数"
        },
        {
          "name": "current-page",
          "type": "Number",
          "def": "1",
          "desc": "現在ページ（1 始まり）"
        }
      ],
      "events": [
        {
          "name": "change",
          "desc": "ページ変更時に発火（detail.page）"
        }
      ],
      "usage": "<c-ui-pagination total-pages=\"8\" current-page=\"1\" onchange={handlePage}></c-ui-pagination>",
      "ja": "ページネーション",
      "files": {
        "html": "<template>\n    <nav class=\"ui-pagination\" aria-label=\"ページネーション\">\n        <button\n            class=\"ui-pagination__nav\"\n            type=\"button\"\n            disabled={isFirst}\n            title=\"前へ\"\n            onclick={handlePrev}\n        >\n            ‹\n        </button>\n        <template for:each={pages} for:item=\"page\">\n            <button\n                key={page.num}\n                class={page.cssClass}\n                type=\"button\"\n                data-page={page.num}\n                onclick={handlePage}\n            >\n                {page.num}\n            </button>\n        </template>\n        <button\n            class=\"ui-pagination__nav\"\n            type=\"button\"\n            disabled={isLast}\n            title=\"次へ\"\n            onclick={handleNext}\n        >\n            ›\n        </button>\n    </nav>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\n/**\n * uiPagination — 汎用ページネーション。\n * totalPages と currentPage を受け取りページ番号を表示する。\n * ページ変更時に change イベント (detail.page) を発火する。\n */\nexport default class UiPagination extends LightningElement {\n    /** 総ページ数 */\n    @api totalPages = 1;\n    /** 現在ページ（1 始まり） */\n    @api currentPage = 1;\n\n    get pages() {\n        const total = Math.max(1, Number(this.totalPages) || 1);\n        const list = [];\n        for (let i = 1; i <= total; i += 1) {\n            list.push({\n                num: i,\n                cssClass:\n                    i === Number(this.currentPage)\n                        ? 'ui-pagination__page ui-pagination__page_active'\n                        : 'ui-pagination__page'\n            });\n        }\n        return list;\n    }\n\n    get isFirst() {\n        return Number(this.currentPage) <= 1;\n    }\n\n    get isLast() {\n        return Number(this.currentPage) >= Number(this.totalPages);\n    }\n\n    goTo(page) {\n        const target = Math.min(\n            Math.max(1, page),\n            Math.max(1, Number(this.totalPages) || 1)\n        );\n        if (target !== Number(this.currentPage)) {\n            this.currentPage = target;\n            this.dispatchEvent(\n                new CustomEvent('change', { detail: { page: target } })\n            );\n        }\n    }\n\n    handlePage(event) {\n        this.goTo(Number(event.currentTarget.dataset.page));\n    }\n\n    handlePrev() {\n        this.goTo(Number(this.currentPage) - 1);\n    }\n\n    handleNext() {\n        this.goTo(Number(this.currentPage) + 1);\n    }\n}\n",
        "css": ".ui-pagination {\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n}\n\n.ui-pagination__page,\n.ui-pagination__nav {\n    min-width: 32px;\n    height: 32px;\n    padding: 0 8px;\n    border: 1px solid #dddbda;\n    background: #ffffff;\n    color: #181818;\n    border-radius: 6px;\n    font-size: 0.82rem;\n    font-weight: 600;\n    cursor: pointer;\n    font-family: inherit;\n}\n\n.ui-pagination__page:hover,\n.ui-pagination__nav:not(:disabled):hover {\n    background: #f3f9ff;\n    border-color: #0176d3;\n    color: #0176d3;\n}\n\n.ui-pagination__page_active {\n    background: #0176d3;\n    border-color: #0176d3;\n    color: #ffffff;\n}\n.ui-pagination__page_active:hover {\n    background: #014486;\n    color: #ffffff;\n}\n\n.ui-pagination__nav:disabled {\n    opacity: 0.4;\n    cursor: not-allowed;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Pagination</masterLabel>\n    <description>汎用ページネーション。ページ変更時に change イベントを発火。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiSelect",
      "title": "UI Select",
      "icon": "🔽",
      "category": "フォーム",
      "demo": "select",
      "description": "options 配列を表示するドロップダウン。選択時に change イベント (detail.value) を発火。",
      "props": [
        {
          "name": "label",
          "type": "String",
          "def": "—",
          "desc": "ラベル"
        },
        {
          "name": "options",
          "type": "Array",
          "def": "[]",
          "desc": "[{ label, value }] の配列"
        },
        {
          "name": "value",
          "type": "String",
          "def": "''",
          "desc": "選択値"
        },
        {
          "name": "placeholder",
          "type": "String",
          "def": "'選択してください'",
          "desc": "未選択時の表示"
        },
        {
          "name": "disabled",
          "type": "Boolean",
          "def": "false",
          "desc": "true で無効化"
        }
      ],
      "events": [
        {
          "name": "change",
          "desc": "選択時に発火（detail.value）"
        }
      ],
      "usage": "<c-ui-select label=\"部署\" options={options} onchange={handleChange}></c-ui-select>",
      "ja": "セレクト",
      "files": {
        "html": "<template>\n    <div class=\"ui-select\">\n        <label lwc:if={label} class=\"ui-select__label\">{label}</label>\n        <select\n            class=\"ui-select__field\"\n            disabled={disabled}\n            onchange={handleChange}\n        >\n            <option value=\"\" selected={placeholderSelected}>{placeholder}</option>\n            <template for:each={computedOptions} for:item=\"opt\">\n                <option key={opt.value} value={opt.value} selected={opt.selected}>\n                    {opt.label}\n                </option>\n            </template>\n        </select>\n    </div>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\n/**\n * uiSelect — 汎用セレクト（ドロップダウン）。\n * options 配列 ([{ label, value }]) を表示し、選択時に change イベント\n * (detail.value) を発火する。\n */\nexport default class UiSelect extends LightningElement {\n    _options = [];\n\n    /** [{ label, value }] の配列 */\n    @api\n    get options() {\n        return this._options;\n    }\n    set options(value) {\n        this._options = Array.isArray(value) ? value : [];\n    }\n\n    /** ラベル */\n    @api label;\n    /** 選択値 */\n    @api value = '';\n    /** 未選択時のプレースホルダ */\n    @api placeholder = '選択してください';\n    /** true で無効化 */\n    @api disabled = false;\n\n    get computedOptions() {\n        return this._options.map((o) => ({\n            ...o,\n            selected: String(o.value) === String(this.value)\n        }));\n    }\n\n    get placeholderSelected() {\n        return !this.value;\n    }\n\n    handleChange(event) {\n        this.value = event.target.value;\n        this.dispatchEvent(\n            new CustomEvent('change', { detail: { value: this.value } })\n        );\n    }\n}\n",
        "css": ".ui-select {\n    display: flex;\n    flex-direction: column;\n    gap: 4px;\n    width: 100%;\n}\n\n.ui-select__label {\n    font-size: 0.78rem;\n    font-weight: 600;\n    color: #444444;\n}\n\n.ui-select__field {\n    width: 100%;\n    height: 34px;\n    padding: 0 32px 0 12px;\n    border: 1px solid #c9c9c9;\n    border-radius: 6px;\n    font-size: 0.875rem;\n    color: #181818;\n    background-color: #ffffff;\n    background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='%23706e6b' d='M8 11L3 6h10z'/%3E%3C/svg%3E\");\n    background-repeat: no-repeat;\n    background-position: right 10px center;\n    background-size: 14px;\n    -webkit-appearance: none;\n    -moz-appearance: none;\n    appearance: none;\n    font-family: inherit;\n    cursor: pointer;\n}\n\n.ui-select__field:focus {\n    outline: none;\n    border-color: #0176d3;\n    box-shadow: 0 0 0 2px rgba(1, 118, 211, 0.25);\n}\n\n.ui-select__field:disabled {\n    background-color: #f3f3f3;\n    color: #969492;\n    cursor: not-allowed;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Select</masterLabel>\n    <description>汎用セレクト。options配列を表示し change イベントを発火。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiCheckbox",
      "title": "UI Checkbox",
      "icon": "☑️",
      "category": "フォーム",
      "demo": "checkbox",
      "description": "ラベル付きチェックボックス。変更時に change イベント (detail.checked) を発火。",
      "props": [
        {
          "name": "label",
          "type": "String",
          "def": "—",
          "desc": "ラベル"
        },
        {
          "name": "checked",
          "type": "Boolean",
          "def": "false",
          "desc": "チェック状態"
        },
        {
          "name": "disabled",
          "type": "Boolean",
          "def": "false",
          "desc": "true で無効化"
        }
      ],
      "events": [
        {
          "name": "change",
          "desc": "変更時に発火（detail.checked）"
        }
      ],
      "usage": "<c-ui-checkbox label=\"利用規約に同意\" onchange={handleChange}></c-ui-checkbox>",
      "ja": "チェックボックス",
      "files": {
        "html": "<template>\n    <label class=\"ui-checkbox\">\n        <input\n            type=\"checkbox\"\n            class=\"ui-checkbox__input\"\n            checked={checked}\n            disabled={disabled}\n            onchange={handleChange}\n        />\n        <span class=\"ui-checkbox__box\"></span>\n        <span lwc:if={label} class=\"ui-checkbox__label\">{label}</span>\n    </label>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\n/**\n * uiCheckbox — 汎用チェックボックス。\n * ラベル付きのチェックボックスで、変更時に change イベント\n * (detail.checked) を発火する。\n */\nexport default class UiCheckbox extends LightningElement {\n    /** ラベル */\n    @api label;\n    /** チェック状態 */\n    @api checked = false;\n    /** true で無効化 */\n    @api disabled = false;\n\n    handleChange(event) {\n        this.checked = event.target.checked;\n        this.dispatchEvent(\n            new CustomEvent('change', { detail: { checked: this.checked } })\n        );\n    }\n}\n",
        "css": ".ui-checkbox {\n    display: inline-flex;\n    align-items: center;\n    gap: 8px;\n    cursor: pointer;\n    user-select: none;\n}\n\n.ui-checkbox__input {\n    position: absolute;\n    opacity: 0;\n    width: 0;\n    height: 0;\n}\n\n.ui-checkbox__box {\n    position: relative;\n    width: 18px;\n    height: 18px;\n    border: 1px solid #c9c9c9;\n    border-radius: 4px;\n    background: #ffffff;\n    flex-shrink: 0;\n    transition: background 0.12s ease, border-color 0.12s ease;\n}\n\n.ui-checkbox__box::after {\n    content: '';\n    position: absolute;\n    left: 5px;\n    top: 1px;\n    width: 5px;\n    height: 10px;\n    border: solid #ffffff;\n    border-width: 0 2px 2px 0;\n    transform: rotate(45deg) scale(0);\n    transition: transform 0.12s ease;\n}\n\n.ui-checkbox__input:checked ~ .ui-checkbox__box {\n    background: #0176d3;\n    border-color: #0176d3;\n}\n.ui-checkbox__input:checked ~ .ui-checkbox__box::after {\n    transform: rotate(45deg) scale(1);\n}\n\n.ui-checkbox__input:focus-visible ~ .ui-checkbox__box {\n    box-shadow: 0 0 0 2px rgba(1, 118, 211, 0.35);\n}\n\n.ui-checkbox__input:disabled ~ .ui-checkbox__box {\n    background: #f3f3f3;\n    border-color: #dddbda;\n}\n\n.ui-checkbox__label {\n    font-size: 0.85rem;\n    color: #181818;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Checkbox</masterLabel>\n    <description>汎用チェックボックス。ラベル付き、change イベントを発火。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiTextarea",
      "title": "UI Textarea",
      "icon": "📝",
      "category": "フォーム",
      "demo": "textarea",
      "description": "ラベル・行数に対応した複数行入力。入力時に change イベント (detail.value) を発火。",
      "props": [
        {
          "name": "label",
          "type": "String",
          "def": "—",
          "desc": "ラベル"
        },
        {
          "name": "value",
          "type": "String",
          "def": "''",
          "desc": "入力値"
        },
        {
          "name": "placeholder",
          "type": "String",
          "def": "''",
          "desc": "プレースホルダ"
        },
        {
          "name": "rows",
          "type": "Number",
          "def": "4",
          "desc": "表示行数"
        },
        {
          "name": "disabled",
          "type": "Boolean",
          "def": "false",
          "desc": "true で無効化"
        }
      ],
      "events": [
        {
          "name": "change",
          "desc": "入力時に発火（detail.value）"
        }
      ],
      "usage": "<c-ui-textarea label=\"備考\" rows=\"5\" onchange={handleChange}></c-ui-textarea>",
      "ja": "テキストエリア",
      "files": {
        "html": "<template>\n    <div class=\"ui-textarea\">\n        <label lwc:if={label} class=\"ui-textarea__label\">{label}</label>\n        <textarea\n            class=\"ui-textarea__field\"\n            rows={rows}\n            placeholder={placeholder}\n            disabled={disabled}\n            oninput={handleInput}\n        >{value}</textarea>\n    </div>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\n/**\n * uiTextarea — 汎用複数行テキスト入力。\n * ラベル・行数・プレースホルダに対応し、入力時に change イベント\n * (detail.value) を発火する。\n */\nexport default class UiTextarea extends LightningElement {\n    /** ラベル */\n    @api label;\n    /** 入力値 */\n    @api value = '';\n    /** プレースホルダ */\n    @api placeholder = '';\n    /** 表示行数 */\n    @api rows = 4;\n    /** true で無効化 */\n    @api disabled = false;\n\n    handleInput(event) {\n        this.value = event.target.value;\n        this.dispatchEvent(\n            new CustomEvent('change', { detail: { value: this.value } })\n        );\n    }\n}\n",
        "css": ".ui-textarea {\n    display: flex;\n    flex-direction: column;\n    gap: 4px;\n    width: 100%;\n}\n\n.ui-textarea__label {\n    font-size: 0.78rem;\n    font-weight: 600;\n    color: #444444;\n}\n\n.ui-textarea__field {\n    width: 100%;\n    padding: 8px 12px;\n    border: 1px solid #c9c9c9;\n    border-radius: 6px;\n    font-size: 0.875rem;\n    color: #181818;\n    background: #ffffff;\n    font-family: inherit;\n    line-height: 1.5;\n    resize: vertical;\n}\n\n.ui-textarea__field:focus {\n    outline: none;\n    border-color: #0176d3;\n    box-shadow: 0 0 0 2px rgba(1, 118, 211, 0.25);\n}\n\n.ui-textarea__field:disabled {\n    background: #f3f3f3;\n    color: #969492;\n    cursor: not-allowed;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Textarea</masterLabel>\n    <description>汎用複数行テキスト入力。ラベル・行数に対応し change イベントを発火。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiBreadcrumb",
      "title": "UI Breadcrumb",
      "icon": "🧭",
      "category": "ナビゲーション",
      "demo": "breadcrumb",
      "description": "items 配列をパンくず表示。末尾以外のリンククリックで navigate イベント (detail.value) を発火。",
      "props": [
        {
          "name": "items",
          "type": "Array",
          "def": "[]",
          "desc": "[{ label, value }] の配列"
        }
      ],
      "events": [
        {
          "name": "navigate",
          "desc": "リンク押下時に発火（detail.value）"
        }
      ],
      "usage": "<c-ui-breadcrumb items={items} onnavigate={handleNavigate}></c-ui-breadcrumb>",
      "ja": "パンくずリスト",
      "files": {
        "html": "<template>\n    <nav class=\"ui-breadcrumb\" aria-label=\"パンくず\">\n        <ol class=\"ui-breadcrumb__list\">\n            <template for:each={computedItems} for:item=\"item\">\n                <li key={item.label} class=\"ui-breadcrumb__item\">\n                    <a\n                        lwc:if={item.clickable}\n                        class=\"ui-breadcrumb__link\"\n                        href=\"#\"\n                        data-value={item.value}\n                        onclick={handleClick}\n                    >\n                        {item.label}\n                    </a>\n                    <span lwc:else class=\"ui-breadcrumb__current\" aria-current=\"page\">\n                        {item.label}\n                    </span>\n                    <span lwc:if={item.showSep} class=\"ui-breadcrumb__sep\">/</span>\n                </li>\n            </template>\n        </ol>\n    </nav>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\n/**\n * uiBreadcrumb — 汎用パンくずリスト。\n * items 配列 ([{ label, value }]) を「/」区切りで表示する。\n * 最後の項目以外はリンクとして navigate イベント (detail.value) を発火する。\n */\nexport default class UiBreadcrumb extends LightningElement {\n    _items = [];\n\n    /** [{ label, value }] の配列 */\n    @api\n    get items() {\n        return this._items;\n    }\n    set items(value) {\n        this._items = Array.isArray(value) ? value : [];\n    }\n\n    get computedItems() {\n        const last = this._items.length - 1;\n        return this._items.map((item, index) => ({\n            label: item.label,\n            value: item.value !== undefined ? item.value : item.label,\n            clickable: index !== last,\n            showSep: index !== last\n        }));\n    }\n\n    handleClick(event) {\n        event.preventDefault();\n        const value = event.currentTarget.dataset.value;\n        this.dispatchEvent(\n            new CustomEvent('navigate', { detail: { value } })\n        );\n    }\n}\n",
        "css": ".ui-breadcrumb__list {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: 6px;\n    margin: 0;\n    padding: 0;\n    list-style: none;\n}\n\n.ui-breadcrumb__item {\n    display: inline-flex;\n    align-items: center;\n    gap: 6px;\n    font-size: 0.82rem;\n}\n\n.ui-breadcrumb__link {\n    color: #0176d3;\n    text-decoration: none;\n}\n.ui-breadcrumb__link:hover {\n    text-decoration: underline;\n}\n\n.ui-breadcrumb__current {\n    color: #706e6b;\n    font-weight: 600;\n}\n\n.ui-breadcrumb__sep {\n    color: #c9c9c9;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Breadcrumb</masterLabel>\n    <description>汎用パンくずリスト。リンククリックで navigate イベントを発火。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiSteps",
      "title": "UI Steps",
      "icon": "🪜",
      "category": "ナビゲーション",
      "demo": "steps",
      "description": "steps 配列と current から、完了/現在/未到達を色分け表示するステップインジケータ。",
      "props": [
        {
          "name": "steps",
          "type": "Array",
          "def": "[]",
          "desc": "[{ label }] の配列"
        },
        {
          "name": "current",
          "type": "Number",
          "def": "1",
          "desc": "現在ステップ（1 始まり）"
        }
      ],
      "events": [],
      "usage": "<c-ui-steps steps={steps} current=\"2\"></c-ui-steps>",
      "ja": "ステップ",
      "files": {
        "html": "<template>\n    <ol class=\"ui-steps\">\n        <template for:each={computedSteps} for:item=\"step\">\n            <li key={step.label} class={step.cssClass}>\n                <span class=\"ui-steps__marker\">{step.marker}</span>\n                <span class=\"ui-steps__label\">{step.label}</span>\n            </li>\n        </template>\n    </ol>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\n/**\n * uiSteps — 汎用ステップインジケータ。\n * steps 配列 ([{ label }]) と current（1 始まりの現在ステップ）から、\n * 完了/進行中/未着手を色とマーカーで表示する。\n */\nexport default class UiSteps extends LightningElement {\n    _steps = [];\n\n    /** [{ label }] の配列 */\n    @api\n    get steps() {\n        return this._steps;\n    }\n    set steps(value) {\n        this._steps = Array.isArray(value) ? value : [];\n    }\n\n    /** 現在ステップ（1 始まり） */\n    @api current = 1;\n\n    get computedSteps() {\n        const cur = Number(this.current);\n        return this._steps.map((step, index) => {\n            const num = index + 1;\n            let state = 'upcoming';\n            if (num < cur) {\n                state = 'complete';\n            } else if (num === cur) {\n                state = 'active';\n            }\n            return {\n                label: step.label,\n                marker: state === 'complete' ? '✓' : String(num),\n                cssClass: `ui-steps__item ui-steps__item_${state}`\n            };\n        });\n    }\n}\n",
        "css": ".ui-steps {\n    display: flex;\n    margin: 0;\n    padding: 0;\n    list-style: none;\n    width: 100%;\n}\n\n.ui-steps__item {\n    position: relative;\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 6px;\n    text-align: center;\n}\n\n/* 接続線（左隣との間） */\n.ui-steps__item::before {\n    content: '';\n    position: absolute;\n    top: 13px;\n    right: 50%;\n    width: 100%;\n    height: 2px;\n    background: #dddbda;\n    z-index: 0;\n}\n.ui-steps__item:first-child::before {\n    display: none;\n}\n\n.ui-steps__marker {\n    position: relative;\n    z-index: 1;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    width: 28px;\n    height: 28px;\n    border-radius: 50%;\n    border: 2px solid #dddbda;\n    background: #ffffff;\n    color: #706e6b;\n    font-size: 0.8rem;\n    font-weight: 700;\n}\n\n.ui-steps__label {\n    font-size: 0.75rem;\n    color: #706e6b;\n    max-width: 110px;\n}\n\n.ui-steps__item_complete::before {\n    background: #2e844a;\n}\n.ui-steps__item_complete .ui-steps__marker {\n    border-color: #2e844a;\n    background: #2e844a;\n    color: #ffffff;\n}\n.ui-steps__item_complete .ui-steps__label {\n    color: #1d7a3f;\n}\n\n.ui-steps__item_active::before {\n    background: #2e844a;\n}\n.ui-steps__item_active .ui-steps__marker {\n    border-color: #0176d3;\n    color: #0176d3;\n    box-shadow: 0 0 0 3px rgba(1, 118, 211, 0.18);\n}\n.ui-steps__item_active .ui-steps__label {\n    color: #0176d3;\n    font-weight: 700;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Steps</masterLabel>\n    <description>汎用ステップインジケータ。完了/現在/未到達を色分け表示。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiRating",
      "title": "UI Rating",
      "icon": "⭐",
      "category": "表示",
      "demo": "rating",
      "description": "スター評価。クリックで値を変更し change イベント (detail.value) を発火。read-only で閲覧専用。",
      "props": [
        {
          "name": "value",
          "type": "Number",
          "def": "0",
          "desc": "現在の評価値"
        },
        {
          "name": "max",
          "type": "Number",
          "def": "5",
          "desc": "星の数"
        },
        {
          "name": "read-only",
          "type": "Boolean",
          "def": "false",
          "desc": "true で閲覧専用"
        }
      ],
      "events": [
        {
          "name": "change",
          "desc": "評価変更時に発火（detail.value）"
        }
      ],
      "usage": "<c-ui-rating value=\"3\" onchange={handleRate}></c-ui-rating>",
      "ja": "スター評価",
      "files": {
        "html": "<template>\n    <div class={rootClass} onmouseleave={handleLeave}>\n        <template for:each={stars} for:item=\"star\">\n            <button\n                key={star.index}\n                class={star.cssClass}\n                type=\"button\"\n                data-index={star.index}\n                onclick={handleClick}\n                onmouseenter={handleEnter}\n                aria-label={star.index}\n            >\n                {star.char}\n            </button>\n        </template>\n    </div>\n</template>\n",
        "js": "import { LightningElement, api, track } from 'lwc';\n\n/**\n * uiRating — 汎用スター評価。\n * value（現在値）と max（星の数）を表示し、クリックで評価を変更して\n * change イベント (detail.value) を発火する。readOnly で閲覧専用。\n */\nexport default class UiRating extends LightningElement {\n    /** 現在の評価値 */\n    @api value = 0;\n    /** 星の数 */\n    @api max = 5;\n    /** true で閲覧専用 */\n    @api readOnly = false;\n\n    @track hover = 0;\n\n    get stars() {\n        const total = Math.max(1, Number(this.max) || 5);\n        const filledTo = this.hover || Number(this.value) || 0;\n        const list = [];\n        for (let i = 1; i <= total; i += 1) {\n            list.push({\n                index: i,\n                char: i <= filledTo ? '★' : '☆',\n                cssClass:\n                    i <= filledTo\n                        ? 'ui-rating__star ui-rating__star_on'\n                        : 'ui-rating__star'\n            });\n        }\n        return list;\n    }\n\n    get rootClass() {\n        return this.readOnly ? 'ui-rating ui-rating_readonly' : 'ui-rating';\n    }\n\n    handleClick(event) {\n        if (this.readOnly) {\n            return;\n        }\n        this.value = Number(event.currentTarget.dataset.index);\n        this.dispatchEvent(\n            new CustomEvent('change', { detail: { value: this.value } })\n        );\n    }\n\n    handleEnter(event) {\n        if (this.readOnly) {\n            return;\n        }\n        this.hover = Number(event.currentTarget.dataset.index);\n    }\n\n    handleLeave() {\n        this.hover = 0;\n    }\n}\n",
        "css": ".ui-rating {\n    display: inline-flex;\n    gap: 2px;\n}\n\n.ui-rating__star {\n    border: none;\n    background: transparent;\n    padding: 0 1px;\n    font-size: 1.4rem;\n    line-height: 1;\n    color: #c9c9c9;\n    cursor: pointer;\n    transition: color 0.1s ease, transform 0.1s ease;\n}\n\n.ui-rating__star_on {\n    color: #f5a623;\n}\n\n.ui-rating:not(.ui-rating_readonly) .ui-rating__star:hover {\n    transform: scale(1.15);\n}\n\n.ui-rating_readonly .ui-rating__star {\n    cursor: default;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Rating</masterLabel>\n    <description>汎用スター評価。クリックで評価変更し change イベントを発火。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiStat",
      "title": "UI Stat",
      "icon": "🔢",
      "category": "表示",
      "demo": "stat",
      "description": "ラベル・大きな値・前期比（delta）を表示する KPI タイル。trend で増減色を切替え。",
      "props": [
        {
          "name": "label",
          "type": "String",
          "def": "—",
          "desc": "指標ラベル"
        },
        {
          "name": "value",
          "type": "String",
          "def": "—",
          "desc": "主要な値"
        },
        {
          "name": "delta",
          "type": "String",
          "def": "—",
          "desc": "差分テキスト"
        },
        {
          "name": "trend",
          "type": "String",
          "def": "'flat'",
          "desc": "up | down | flat"
        }
      ],
      "events": [],
      "usage": "<c-ui-stat label=\"今月の売上\" value=\"¥1,250,000\" delta=\"+12.5%\" trend=\"up\"></c-ui-stat>",
      "ja": "KPI表示",
      "files": {
        "html": "<template>\n    <div class=\"ui-stat\">\n        <span class=\"ui-stat__label\">{label}</span>\n        <span class=\"ui-stat__value\">{value}</span>\n        <span lwc:if={hasDelta} class={deltaClass}>\n            <span class=\"ui-stat__trend\">{trendIcon}</span>\n            {delta}\n        </span>\n    </div>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\nconst TRENDS = {\n    up: { icon: '▲', cls: 'up' },\n    down: { icon: '▼', cls: 'down' },\n    flat: { icon: '—', cls: 'flat' }\n};\n\n/**\n * uiStat — 汎用 KPI 表示タイル。\n * ラベル・大きな値・前期比（delta）を表示し、trend で増減色を切替える。\n */\nexport default class UiStat extends LightningElement {\n    /** 指標ラベル */\n    @api label;\n    /** 主要な値（例: ¥1,250,000） */\n    @api value;\n    /** 補足の差分テキスト（例: +12.5%） */\n    @api delta;\n    /** 増減: up | down | flat */\n    @api trend = 'flat';\n\n    get hasDelta() {\n        return this.delta !== undefined && this.delta !== null && this.delta !== '';\n    }\n\n    get trendIcon() {\n        return (TRENDS[this.trend] || TRENDS.flat).icon;\n    }\n\n    get deltaClass() {\n        const cls = (TRENDS[this.trend] || TRENDS.flat).cls;\n        return `ui-stat__delta ui-stat__delta_${cls}`;\n    }\n}\n",
        "css": ".ui-stat {\n    display: inline-flex;\n    flex-direction: column;\n    gap: 4px;\n    padding: 16px 18px;\n    border: 1px solid #e5e5e5;\n    border-radius: 8px;\n    background: #ffffff;\n    min-width: 160px;\n}\n\n.ui-stat__label {\n    font-size: 0.75rem;\n    color: #706e6b;\n    font-weight: 600;\n}\n\n.ui-stat__value {\n    font-size: 1.6rem;\n    font-weight: 700;\n    color: #181818;\n    line-height: 1.1;\n}\n\n.ui-stat__delta {\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    font-size: 0.78rem;\n    font-weight: 600;\n}\n\n.ui-stat__delta_up {\n    color: #2e844a;\n}\n.ui-stat__delta_down {\n    color: #ba0517;\n}\n.ui-stat__delta_flat {\n    color: #706e6b;\n}\n\n.ui-stat__trend {\n    font-size: 0.7rem;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Stat</masterLabel>\n    <description>汎用KPIタイル。ラベル・値・前期比を増減色付きで表示。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiDivider",
      "title": "UI Divider",
      "icon": "➖",
      "category": "レイアウト",
      "demo": "divider",
      "description": "ラベル付き／水平線の区切り。spacing で上下余白を調整する。",
      "props": [
        {
          "name": "label",
          "type": "String",
          "def": "—",
          "desc": "中央ラベル（任意）"
        },
        {
          "name": "spacing",
          "type": "String",
          "def": "'medium'",
          "desc": "small | medium | large"
        }
      ],
      "events": [],
      "usage": "<c-ui-divider label=\"または\"></c-ui-divider>",
      "ja": "区切り線",
      "files": {
        "html": "<template>\n    <div class={rootClass} role=\"separator\">\n        <template lwc:if={label}>\n            <span class=\"ui-divider__line\"></span>\n            <span class=\"ui-divider__label\">{label}</span>\n            <span class=\"ui-divider__line\"></span>\n        </template>\n        <template lwc:else>\n            <span class=\"ui-divider__line ui-divider__line_full\"></span>\n        </template>\n    </div>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\nconst SPACINGS = ['small', 'medium', 'large'];\n\n/**\n * uiDivider — 汎用区切り線。\n * label を指定すると中央にラベル付きの区切り、無指定なら水平線を表示する。\n */\nexport default class UiDivider extends LightningElement {\n    /** 中央に表示するラベル（任意） */\n    @api label;\n    /** 上下の余白: small | medium | large */\n    @api spacing = 'medium';\n\n    get rootClass() {\n        const spacing = SPACINGS.includes(this.spacing) ? this.spacing : 'medium';\n        return `ui-divider ui-divider_${spacing}`;\n    }\n}\n",
        "css": ".ui-divider {\n    display: flex;\n    align-items: center;\n    gap: 12px;\n    width: 100%;\n}\n\n.ui-divider_small {\n    margin: 8px 0;\n}\n.ui-divider_medium {\n    margin: 16px 0;\n}\n.ui-divider_large {\n    margin: 28px 0;\n}\n\n.ui-divider__line {\n    flex: 1;\n    height: 1px;\n    background: #e5e5e5;\n}\n\n.ui-divider__line_full {\n    width: 100%;\n}\n\n.ui-divider__label {\n    font-size: 0.78rem;\n    font-weight: 600;\n    color: #706e6b;\n    white-space: nowrap;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Divider</masterLabel>\n    <description>汎用区切り線。ラベル付き／水平線の2形態に対応。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiTooltip",
      "title": "UI Tooltip",
      "icon": "💬",
      "category": "オーバーレイ",
      "demo": "tooltip",
      "description": "スロット要素にホバー／フォーカスすると content を吹き出し表示する。",
      "props": [
        {
          "name": "content",
          "type": "String",
          "def": "—",
          "desc": "吹き出しテキスト"
        },
        {
          "name": "position",
          "type": "String",
          "def": "'top'",
          "desc": "top | bottom | left | right"
        }
      ],
      "slots": [
        {
          "name": "(default)",
          "desc": "ホバー対象の要素"
        }
      ],
      "events": [],
      "usage": "<c-ui-tooltip content=\"詳細はこちら\">\n    <c-ui-button label=\"?\"></c-ui-button>\n</c-ui-tooltip>",
      "ja": "ツールチップ",
      "files": {
        "html": "<template>\n    <span class={rootClass} tabindex=\"0\">\n        <slot></slot>\n        <span class=\"ui-tooltip__bubble\" role=\"tooltip\">{content}</span>\n    </span>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\nconst POSITIONS = ['top', 'bottom', 'left', 'right'];\n\n/**\n * uiTooltip — 汎用ツールチップ。\n * default スロットの要素にホバー／フォーカスすると content を吹き出し表示する。\n */\nexport default class UiTooltip extends LightningElement {\n    /** 吹き出しに表示するテキスト */\n    @api content;\n    /** 表示位置: top | bottom | left | right */\n    @api position = 'top';\n\n    get rootClass() {\n        const pos = POSITIONS.includes(this.position) ? this.position : 'top';\n        return `ui-tooltip ui-tooltip_${pos}`;\n    }\n}\n",
        "css": ".ui-tooltip {\n    position: relative;\n    display: inline-flex;\n    outline: none;\n}\n\n.ui-tooltip__bubble {\n    position: absolute;\n    z-index: 10;\n    background: #16191e;\n    color: #ffffff;\n    font-size: 0.72rem;\n    line-height: 1.4;\n    padding: 5px 9px;\n    border-radius: 6px;\n    white-space: nowrap;\n    opacity: 0;\n    pointer-events: none;\n    transition: opacity 0.12s ease;\n    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);\n}\n\n.ui-tooltip:hover .ui-tooltip__bubble,\n.ui-tooltip:focus-visible .ui-tooltip__bubble {\n    opacity: 1;\n}\n\n.ui-tooltip_top .ui-tooltip__bubble {\n    bottom: 100%;\n    left: 50%;\n    transform: translateX(-50%) translateY(-6px);\n}\n.ui-tooltip_bottom .ui-tooltip__bubble {\n    top: 100%;\n    left: 50%;\n    transform: translateX(-50%) translateY(6px);\n}\n.ui-tooltip_left .ui-tooltip__bubble {\n    right: 100%;\n    top: 50%;\n    transform: translateY(-50%) translateX(-6px);\n}\n.ui-tooltip_right .ui-tooltip__bubble {\n    left: 100%;\n    top: 50%;\n    transform: translateY(-50%) translateX(6px);\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Tooltip</masterLabel>\n    <description>汎用ツールチップ。スロット要素のホバーで吹き出し表示。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiEmptyState",
      "title": "UI Empty State",
      "icon": "🗒️",
      "category": "フィードバック",
      "demo": "emptystate",
      "description": "データ未登録・検索0件時のプレースホルダ。アイコン・見出し・アクションを中央表示。",
      "props": [
        {
          "name": "heading",
          "type": "String",
          "def": "—",
          "desc": "見出し"
        },
        {
          "name": "message",
          "type": "String",
          "def": "—",
          "desc": "補足メッセージ（任意）"
        },
        {
          "name": "icon",
          "type": "String",
          "def": "'📭'",
          "desc": "アイコン文字（絵文字可）"
        }
      ],
      "slots": [
        {
          "name": "(default)",
          "desc": "アクション（ボタン等）"
        }
      ],
      "events": [],
      "usage": "<c-ui-empty-state heading=\"データがありません\" message=\"新規作成してください\">\n    <c-ui-button label=\"新規作成\"></c-ui-button>\n</c-ui-empty-state>",
      "ja": "空状態",
      "files": {
        "html": "<template>\n    <div class=\"ui-empty\">\n        <div class=\"ui-empty__icon\">{icon}</div>\n        <h3 class=\"ui-empty__heading\">{heading}</h3>\n        <p lwc:if={message} class=\"ui-empty__message\">{message}</p>\n        <div class=\"ui-empty__action\">\n            <slot></slot>\n        </div>\n    </div>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\n/**\n * uiEmptyState — 汎用エンプティステート。\n * アイコン・見出し・説明と、任意のアクション（default スロット）を中央表示する。\n * データ未登録時や検索 0 件時のプレースホルダとして使う。\n */\nexport default class UiEmptyState extends LightningElement {\n    /** 見出し */\n    @api heading;\n    /** 補足メッセージ（任意） */\n    @api message;\n    /** アイコン文字（絵文字可） */\n    @api icon = '📭';\n}\n",
        "css": ".ui-empty {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    text-align: center;\n    gap: 6px;\n    padding: 32px 20px;\n}\n\n.ui-empty__icon {\n    font-size: 2.6rem;\n    line-height: 1;\n    margin-bottom: 4px;\n}\n\n.ui-empty__heading {\n    margin: 0;\n    font-size: 1rem;\n    font-weight: 700;\n    color: #181818;\n}\n\n.ui-empty__message {\n    margin: 0;\n    font-size: 0.85rem;\n    color: #706e6b;\n    max-width: 320px;\n}\n\n.ui-empty__action {\n    margin-top: 10px;\n}\n.ui-empty__action:empty {\n    display: none;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Empty State</masterLabel>\n    <description>汎用エンプティステート。アイコン・見出し・アクションを中央表示。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiRadioGroup",
      "title": "UI Radio Group",
      "icon": "🔘",
      "category": "フォーム",
      "demo": "radio",
      "description": "options 配列から単一選択のラジオボタンを生成。選択時に change イベント (detail.value) を発火。",
      "props": [
        {
          "name": "label",
          "type": "String",
          "def": "—",
          "desc": "グループ見出し"
        },
        {
          "name": "options",
          "type": "Array",
          "def": "[]",
          "desc": "[{ label, value }] の配列"
        },
        {
          "name": "value",
          "type": "String",
          "def": "—",
          "desc": "選択値"
        },
        {
          "name": "name",
          "type": "String",
          "def": "自動採番",
          "desc": "ラジオ name 属性"
        }
      ],
      "events": [
        {
          "name": "change",
          "desc": "選択時に発火（detail.value）"
        }
      ],
      "usage": "<c-ui-radio-group label=\"支払方法\" options={options} onchange={handleChange}></c-ui-radio-group>",
      "ja": "ラジオボタン",
      "files": {
        "html": "<template>\n    <fieldset class=\"ui-radio-group\">\n        <legend lwc:if={label} class=\"ui-radio-group__legend\">{label}</legend>\n        <template for:each={computedOptions} for:item=\"opt\">\n            <label key={opt.value} class=\"ui-radio\">\n                <input\n                    type=\"radio\"\n                    class=\"ui-radio__input\"\n                    name={computedName}\n                    value={opt.value}\n                    checked={opt.checked}\n                    onchange={handleChange}\n                />\n                <span class=\"ui-radio__dot\"></span>\n                <span class=\"ui-radio__label\">{opt.label}</span>\n            </label>\n        </template>\n    </fieldset>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\nlet GID = 0;\n\n/**\n * uiRadioGroup — 汎用ラジオボタングループ。\n * options 配列 ([{ label, value }]) から単一選択の UI を生成し、\n * 選択時に change イベント (detail.value) を発火する。\n */\nexport default class UiRadioGroup extends LightningElement {\n    _options = [];\n    groupName = `ui-radio-${GID++}`;\n\n    /** グループの見出し */\n    @api label;\n    /** 選択値 */\n    @api value;\n    /** ラジオ name 属性（未指定なら自動採番） */\n    @api name;\n\n    /** [{ label, value }] の配列 */\n    @api\n    get options() {\n        return this._options;\n    }\n    set options(value) {\n        this._options = Array.isArray(value) ? value : [];\n    }\n\n    get computedName() {\n        return this.name || this.groupName;\n    }\n\n    get computedOptions() {\n        return this._options.map((o) => ({\n            label: o.label,\n            value: o.value,\n            checked: String(o.value) === String(this.value)\n        }));\n    }\n\n    handleChange(event) {\n        this.value = event.target.value;\n        this.dispatchEvent(\n            new CustomEvent('change', { detail: { value: this.value } })\n        );\n    }\n}\n",
        "css": ".ui-radio-group {\n    border: none;\n    margin: 0;\n    padding: 0;\n    display: flex;\n    flex-direction: column;\n    gap: 8px;\n}\n\n.ui-radio-group__legend {\n    font-size: 0.78rem;\n    font-weight: 600;\n    color: #444444;\n    padding: 0;\n    margin-bottom: 2px;\n}\n\n.ui-radio {\n    display: inline-flex;\n    align-items: center;\n    gap: 8px;\n    cursor: pointer;\n    font-size: 0.85rem;\n    color: #181818;\n}\n\n.ui-radio__input {\n    position: absolute;\n    opacity: 0;\n    width: 0;\n    height: 0;\n}\n\n.ui-radio__dot {\n    position: relative;\n    width: 18px;\n    height: 18px;\n    border: 1px solid #c9c9c9;\n    border-radius: 50%;\n    background: #ffffff;\n    flex-shrink: 0;\n    transition: border-color 0.12s ease;\n}\n\n.ui-radio__dot::after {\n    content: '';\n    position: absolute;\n    inset: 4px;\n    border-radius: 50%;\n    background: #0176d3;\n    transform: scale(0);\n    transition: transform 0.12s ease;\n}\n\n.ui-radio__input:checked ~ .ui-radio__dot {\n    border-color: #0176d3;\n}\n.ui-radio__input:checked ~ .ui-radio__dot::after {\n    transform: scale(1);\n}\n\n.ui-radio__input:focus-visible ~ .ui-radio__dot {\n    box-shadow: 0 0 0 2px rgba(1, 118, 211, 0.35);\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Radio Group</masterLabel>\n    <description>汎用ラジオボタングループ。単一選択で change イベントを発火。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiSearchBox",
      "title": "UI Search Box",
      "icon": "🔎",
      "category": "フォーム",
      "demo": "searchbox",
      "description": "虫眼鏡アイコン付き検索ボックス。入力時に search イベント (detail.value) を発火、クリアボタン付き。",
      "props": [
        {
          "name": "value",
          "type": "String",
          "def": "''",
          "desc": "入力値"
        },
        {
          "name": "placeholder",
          "type": "String",
          "def": "'検索…'",
          "desc": "プレースホルダ"
        }
      ],
      "events": [
        {
          "name": "search",
          "desc": "入力／クリア時に発火（detail.value）"
        }
      ],
      "usage": "<c-ui-search-box onsearch={handleSearch}></c-ui-search-box>",
      "ja": "検索ボックス",
      "files": {
        "html": "<template>\n    <div class=\"ui-search\">\n        <span class=\"ui-search__icon\" aria-hidden=\"true\">🔍</span>\n        <input\n            type=\"search\"\n            class=\"ui-search__field\"\n            value={value}\n            placeholder={placeholder}\n            oninput={handleInput}\n        />\n        <button\n            lwc:if={hasValue}\n            class=\"ui-search__clear\"\n            type=\"button\"\n            title=\"クリア\"\n            onclick={handleClear}\n        >\n            &times;\n        </button>\n    </div>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\n/**\n * uiSearchBox — 汎用検索ボックス。\n * 虫眼鏡アイコン付きの入力で、入力時に search イベント (detail.value) を発火。\n * クリアボタンで入力を消去する。\n */\nexport default class UiSearchBox extends LightningElement {\n    /** 入力値 */\n    @api value = '';\n    /** プレースホルダ */\n    @api placeholder = '検索…';\n\n    get hasValue() {\n        return !!this.value;\n    }\n\n    handleInput(event) {\n        this.value = event.target.value;\n        this.dispatchEvent(\n            new CustomEvent('search', { detail: { value: this.value } })\n        );\n    }\n\n    handleClear() {\n        this.value = '';\n        this.dispatchEvent(new CustomEvent('search', { detail: { value: '' } }));\n    }\n}\n",
        "css": ".ui-search {\n    position: relative;\n    display: flex;\n    align-items: center;\n    width: 100%;\n}\n\n.ui-search__icon {\n    position: absolute;\n    left: 10px;\n    font-size: 0.85rem;\n    pointer-events: none;\n    opacity: 0.7;\n}\n\n.ui-search__field {\n    width: 100%;\n    height: 34px;\n    padding: 0 32px;\n    border: 1px solid #c9c9c9;\n    border-radius: 18px;\n    font-size: 0.875rem;\n    color: #181818;\n    background: #ffffff;\n    font-family: inherit;\n}\n\n.ui-search__field:focus {\n    outline: none;\n    border-color: #0176d3;\n    box-shadow: 0 0 0 2px rgba(1, 118, 211, 0.25);\n}\n\n.ui-search__field::-webkit-search-cancel-button {\n    display: none;\n}\n\n.ui-search__clear {\n    position: absolute;\n    right: 8px;\n    width: 20px;\n    height: 20px;\n    border: none;\n    border-radius: 50%;\n    background: #ececec;\n    color: #514f4d;\n    font-size: 1rem;\n    line-height: 1;\n    cursor: pointer;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n}\n.ui-search__clear:hover {\n    background: #dddbda;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Search Box</masterLabel>\n    <description>汎用検索ボックス。入力時に search イベントを発火、クリアボタン付き。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiSlider",
      "title": "UI Slider",
      "icon": "🎚️",
      "category": "フォーム",
      "demo": "slider",
      "description": "min/max/step の範囲で値を選ぶスライダー。変更時に change イベント (detail.value) を発火。",
      "props": [
        {
          "name": "label",
          "type": "String",
          "def": "—",
          "desc": "ラベル"
        },
        {
          "name": "min",
          "type": "Number",
          "def": "0",
          "desc": "最小値"
        },
        {
          "name": "max",
          "type": "Number",
          "def": "100",
          "desc": "最大値"
        },
        {
          "name": "step",
          "type": "Number",
          "def": "1",
          "desc": "刻み"
        },
        {
          "name": "value",
          "type": "Number",
          "def": "50",
          "desc": "現在値"
        },
        {
          "name": "show-value",
          "type": "Boolean",
          "def": "false",
          "desc": "true で現在値を併記"
        }
      ],
      "events": [
        {
          "name": "change",
          "desc": "変更時に発火（detail.value）"
        }
      ],
      "usage": "<c-ui-slider label=\"音量\" value=\"60\" show-value onchange={handleChange}></c-ui-slider>",
      "ja": "スライダー",
      "files": {
        "html": "<template>\n    <div class=\"ui-slider\">\n        <div lwc:if={label} class=\"ui-slider__header\">\n            <span class=\"ui-slider__label\">{label}</span>\n            <span lwc:if={showValue} class=\"ui-slider__value\">{value}</span>\n        </div>\n        <input\n            type=\"range\"\n            class=\"ui-slider__range\"\n            min={min}\n            max={max}\n            step={step}\n            value={value}\n            oninput={handleInput}\n        />\n    </div>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\n/**\n * uiSlider — 汎用スライダー（範囲入力）。\n * min/max/step の範囲で値を選び、変更時に change イベント (detail.value) を発火する。\n */\nexport default class UiSlider extends LightningElement {\n    /** ラベル */\n    @api label;\n    /** 最小値 */\n    @api min = 0;\n    /** 最大値 */\n    @api max = 100;\n    /** 刻み */\n    @api step = 1;\n    /** 現在値 */\n    @api value = 50;\n    /** true で現在値を併記 */\n    @api showValue = false;\n\n    handleInput(event) {\n        this.value = Number(event.target.value);\n        this.dispatchEvent(\n            new CustomEvent('change', { detail: { value: this.value } })\n        );\n    }\n}\n",
        "css": ".ui-slider {\n    width: 100%;\n    display: flex;\n    flex-direction: column;\n    gap: 6px;\n}\n\n.ui-slider__header {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    font-size: 0.78rem;\n}\n\n.ui-slider__label {\n    font-weight: 600;\n    color: #444444;\n}\n\n.ui-slider__value {\n    font-weight: 700;\n    color: #0176d3;\n}\n\n.ui-slider__range {\n    width: 100%;\n    height: 6px;\n    -webkit-appearance: none;\n    appearance: none;\n    background: #e5e5e5;\n    border-radius: 3px;\n    outline: none;\n    cursor: pointer;\n}\n\n.ui-slider__range::-webkit-slider-thumb {\n    -webkit-appearance: none;\n    appearance: none;\n    width: 18px;\n    height: 18px;\n    border-radius: 50%;\n    background: #0176d3;\n    border: 2px solid #ffffff;\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);\n    cursor: pointer;\n}\n\n.ui-slider__range::-moz-range-thumb {\n    width: 18px;\n    height: 18px;\n    border-radius: 50%;\n    background: #0176d3;\n    border: 2px solid #ffffff;\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);\n    cursor: pointer;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Slider</masterLabel>\n    <description>汎用スライダー。min/max/step で値を選び change イベントを発火。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiButtonGroup",
      "title": "UI Button Group",
      "icon": "🎛️",
      "category": "アクション",
      "demo": "buttongroup",
      "description": "buttons 配列を横並びにしたセグメンテッドコントロール。選択時に select イベント (detail.value) を発火。",
      "props": [
        {
          "name": "buttons",
          "type": "Array",
          "def": "[]",
          "desc": "[{ label, value }] の配列"
        },
        {
          "name": "active",
          "type": "String",
          "def": "—",
          "desc": "選択中の value"
        }
      ],
      "events": [
        {
          "name": "select",
          "desc": "選択時に発火（detail.value）"
        }
      ],
      "usage": "<c-ui-button-group buttons={views} active=\"list\" onselect={handleSelect}></c-ui-button-group>",
      "ja": "ボタングループ",
      "files": {
        "html": "<template>\n    <div class=\"ui-btngroup\" role=\"group\">\n        <template for:each={computedButtons} for:item=\"btn\">\n            <button\n                key={btn.value}\n                class={btn.cssClass}\n                type=\"button\"\n                data-value={btn.value}\n                onclick={handleClick}\n            >\n                {btn.label}\n            </button>\n        </template>\n    </div>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\n/**\n * uiButtonGroup — 汎用ボタングループ（セグメンテッドコントロール）。\n * buttons 配列 ([{ label, value }]) を横並びで表示し、選択時に\n * select イベント (detail.value) を発火する。\n */\nexport default class UiButtonGroup extends LightningElement {\n    _buttons = [];\n\n    /** [{ label, value }] の配列 */\n    @api\n    get buttons() {\n        return this._buttons;\n    }\n    set buttons(value) {\n        this._buttons = Array.isArray(value) ? value : [];\n    }\n\n    /** 選択中の value */\n    @api active;\n\n    get computedButtons() {\n        return this._buttons.map((b) => ({\n            label: b.label,\n            value: b.value,\n            cssClass:\n                String(b.value) === String(this.active)\n                    ? 'ui-btngroup__item ui-btngroup__item_active'\n                    : 'ui-btngroup__item'\n        }));\n    }\n\n    handleClick(event) {\n        this.active = event.currentTarget.dataset.value;\n        this.dispatchEvent(\n            new CustomEvent('select', { detail: { value: this.active } })\n        );\n    }\n}\n",
        "css": ".ui-btngroup {\n    display: inline-flex;\n    border: 1px solid #c9c9c9;\n    border-radius: 6px;\n    overflow: hidden;\n}\n\n.ui-btngroup__item {\n    border: none;\n    background: #ffffff;\n    color: #444444;\n    padding: 0 16px;\n    height: 32px;\n    font-size: 0.8125rem;\n    font-weight: 600;\n    cursor: pointer;\n    font-family: inherit;\n}\n\n.ui-btngroup__item + .ui-btngroup__item {\n    border-left: 1px solid #c9c9c9;\n}\n\n.ui-btngroup__item:hover {\n    background: #f3f3f3;\n}\n\n.ui-btngroup__item_active {\n    background: #0176d3;\n    color: #ffffff;\n}\n.ui-btngroup__item_active:hover {\n    background: #014486;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Button Group</masterLabel>\n    <description>汎用ボタングループ（セグメンテッド）。選択時に select イベントを発火。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiTimeline",
      "title": "UI Timeline",
      "icon": "📅",
      "category": "表示",
      "demo": "timeline",
      "description": "items 配列 ([{ title, time, description }]) を時系列で縦表示するタイムライン。",
      "props": [
        {
          "name": "items",
          "type": "Array",
          "def": "[]",
          "desc": "[{ title, time, description }] の配列"
        }
      ],
      "events": [],
      "usage": "<c-ui-timeline items={events}></c-ui-timeline>",
      "ja": "タイムライン",
      "files": {
        "html": "<template>\n    <ul class=\"ui-timeline\">\n        <template for:each={computedItems} for:item=\"item\">\n            <li key={item.key} class=\"ui-timeline__item\">\n                <span class=\"ui-timeline__marker\"></span>\n                <div class=\"ui-timeline__content\">\n                    <div class=\"ui-timeline__head\">\n                        <span class=\"ui-timeline__title\">{item.title}</span>\n                        <span class=\"ui-timeline__time\">{item.time}</span>\n                    </div>\n                    <p lwc:if={item.hasDescription} class=\"ui-timeline__desc\">\n                        {item.description}\n                    </p>\n                </div>\n            </li>\n        </template>\n    </ul>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\n/**\n * uiTimeline — 汎用タイムライン。\n * items 配列 ([{ title, time, description }]) を縦並びで時系列表示する。\n */\nexport default class UiTimeline extends LightningElement {\n    _items = [];\n\n    /** [{ title, time, description }] の配列 */\n    @api\n    get items() {\n        return this._items;\n    }\n    set items(value) {\n        this._items = Array.isArray(value) ? value : [];\n    }\n\n    get computedItems() {\n        return this._items.map((item, index) => ({\n            key: index,\n            title: item.title,\n            time: item.time,\n            description: item.description,\n            hasDescription: !!item.description\n        }));\n    }\n}\n",
        "css": ".ui-timeline {\n    list-style: none;\n    margin: 0;\n    padding: 0;\n}\n\n.ui-timeline__item {\n    position: relative;\n    padding: 0 0 18px 24px;\n}\n\n/* 縦線 */\n.ui-timeline__item::before {\n    content: '';\n    position: absolute;\n    left: 6px;\n    top: 4px;\n    bottom: -4px;\n    width: 2px;\n    background: #e5e5e5;\n}\n.ui-timeline__item:last-child::before {\n    display: none;\n}\n\n.ui-timeline__marker {\n    position: absolute;\n    left: 0;\n    top: 3px;\n    width: 14px;\n    height: 14px;\n    border-radius: 50%;\n    background: #ffffff;\n    border: 3px solid #0176d3;\n    z-index: 1;\n}\n\n.ui-timeline__head {\n    display: flex;\n    align-items: baseline;\n    justify-content: space-between;\n    gap: 12px;\n}\n\n.ui-timeline__title {\n    font-size: 0.875rem;\n    font-weight: 700;\n    color: #181818;\n}\n\n.ui-timeline__time {\n    font-size: 0.72rem;\n    color: #706e6b;\n    white-space: nowrap;\n}\n\n.ui-timeline__desc {\n    margin: 4px 0 0;\n    font-size: 0.8125rem;\n    color: #514f4d;\n    line-height: 1.5;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Timeline</masterLabel>\n    <description>汎用タイムライン。items を時系列で縦表示。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiStatusDot",
      "title": "UI Status Dot",
      "icon": "🟢",
      "category": "表示",
      "demo": "statusdot",
      "description": "online/offline/busy などの状態を色付きの丸とラベルで表示。pulse で点滅も可能。",
      "props": [
        {
          "name": "label",
          "type": "String",
          "def": "—",
          "desc": "ラベル（任意）"
        },
        {
          "name": "status",
          "type": "String",
          "def": "'neutral'",
          "desc": "online | offline | busy | away | neutral"
        },
        {
          "name": "pulse",
          "type": "Boolean",
          "def": "false",
          "desc": "true で点滅アニメーション"
        }
      ],
      "events": [],
      "usage": "<c-ui-status-dot label=\"オンライン\" status=\"online\" pulse></c-ui-status-dot>",
      "ja": "ステータスドット",
      "files": {
        "html": "<template>\n    <span class=\"ui-statusdot\">\n        <span class={dotClass}></span>\n        <span lwc:if={label} class=\"ui-statusdot__label\">{label}</span>\n    </span>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\nconst STATUSES = ['online', 'offline', 'busy', 'away', 'neutral'];\n\n/**\n * uiStatusDot — 汎用ステータスドット。\n * オンライン/離席などの状態を色付きの丸とラベルで表示する。\n */\nexport default class UiStatusDot extends LightningElement {\n    /** ラベル（任意） */\n    @api label;\n    /** 状態: online | offline | busy | away | neutral */\n    @api status = 'neutral';\n    /** true で点滅アニメーション */\n    @api pulse = false;\n\n    get dotClass() {\n        const status = STATUSES.includes(this.status) ? this.status : 'neutral';\n        return `ui-statusdot__dot ui-statusdot__dot_${status}${\n            this.pulse ? ' ui-statusdot__dot_pulse' : ''\n        }`;\n    }\n}\n",
        "css": ".ui-statusdot {\n    display: inline-flex;\n    align-items: center;\n    gap: 7px;\n    font-size: 0.82rem;\n    color: #181818;\n}\n\n.ui-statusdot__dot {\n    width: 10px;\n    height: 10px;\n    border-radius: 50%;\n    flex-shrink: 0;\n    background: #969492;\n}\n\n.ui-statusdot__dot_online {\n    background: #2e844a;\n}\n.ui-statusdot__dot_offline {\n    background: #969492;\n}\n.ui-statusdot__dot_busy {\n    background: #ba0517;\n}\n.ui-statusdot__dot_away {\n    background: #dd7a01;\n}\n.ui-statusdot__dot_neutral {\n    background: #c9c9c9;\n}\n\n.ui-statusdot__dot_pulse {\n    animation: ui-statusdot-pulse 1.4s ease-in-out infinite;\n}\n\n@keyframes ui-statusdot-pulse {\n    0% {\n        box-shadow: 0 0 0 0 rgba(46, 132, 74, 0.5);\n    }\n    70% {\n        box-shadow: 0 0 0 6px rgba(46, 132, 74, 0);\n    }\n    100% {\n        box-shadow: 0 0 0 0 rgba(46, 132, 74, 0);\n    }\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Status Dot</masterLabel>\n    <description>汎用ステータスドット。状態を色とラベルで表示、点滅対応。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiProgressRing",
      "title": "UI Progress Ring",
      "icon": "⭕",
      "category": "フィードバック",
      "demo": "progressring",
      "description": "0〜100 の進捗を SVG の円形リングで表示。任意で中央にパーセントを併記。",
      "props": [
        {
          "name": "value",
          "type": "Number",
          "def": "0",
          "desc": "進捗率 0〜100"
        },
        {
          "name": "size",
          "type": "String",
          "def": "'medium'",
          "desc": "small | medium | large"
        },
        {
          "name": "variant",
          "type": "String",
          "def": "'brand'",
          "desc": "brand | success | warning | error"
        },
        {
          "name": "show-label",
          "type": "Boolean",
          "def": "false",
          "desc": "true で中央にパーセント表示"
        }
      ],
      "events": [],
      "usage": "<c-ui-progress-ring value=\"72\" size=\"large\" show-label></c-ui-progress-ring>",
      "ja": "円形プログレス",
      "files": {
        "html": "<template>\n    <div class={rootClass}>\n        <svg class=\"ui-ring__svg\" viewBox=\"0 0 40 40\">\n            <circle class=\"ui-ring__track\" cx=\"20\" cy=\"20\" r=\"16\"></circle>\n            <circle class=\"ui-ring__bar\" cx=\"20\" cy=\"20\" r=\"16\" style={ringStyle}></circle>\n        </svg>\n        <span lwc:if={showLabel} class=\"ui-ring__label\">{labelText}</span>\n    </div>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\nconst SIZES = ['small', 'medium', 'large'];\nconst VARIANTS = ['brand', 'success', 'warning', 'error'];\nconst RADIUS = 16;\nconst CIRCUMFERENCE = 2 * Math.PI * RADIUS;\n\n/**\n * uiProgressRing — 汎用円形プログレス。\n * 0〜100 の値を SVG リングで表示し、任意で中央にパーセントを併記する。\n */\nexport default class UiProgressRing extends LightningElement {\n    /** 進捗率 0〜100 */\n    @api value = 0;\n    /** サイズ: small | medium | large */\n    @api size = 'medium';\n    /** 色: brand | success | warning | error */\n    @api variant = 'brand';\n    /** true で中央にパーセント表示 */\n    @api showLabel = false;\n\n    get clampedValue() {\n        const n = Number(this.value);\n        if (Number.isNaN(n)) {\n            return 0;\n        }\n        return Math.min(100, Math.max(0, n));\n    }\n\n    get rootClass() {\n        const size = SIZES.includes(this.size) ? this.size : 'medium';\n        const variant = VARIANTS.includes(this.variant) ? this.variant : 'brand';\n        return `ui-ring ui-ring_${size} ui-ring_${variant}`;\n    }\n\n    get ringStyle() {\n        const offset = CIRCUMFERENCE * (1 - this.clampedValue / 100);\n        return `stroke-dasharray: ${CIRCUMFERENCE}; stroke-dashoffset: ${offset};`;\n    }\n\n    get labelText() {\n        return `${Math.round(this.clampedValue)}%`;\n    }\n}\n",
        "css": ".ui-ring {\n    position: relative;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n}\n\n.ui-ring_small {\n    width: 36px;\n    height: 36px;\n}\n.ui-ring_medium {\n    width: 52px;\n    height: 52px;\n}\n.ui-ring_large {\n    width: 72px;\n    height: 72px;\n}\n\n.ui-ring__svg {\n    width: 100%;\n    height: 100%;\n    transform: rotate(-90deg);\n}\n\n.ui-ring__track {\n    fill: none;\n    stroke: #e5e5e5;\n    stroke-width: 4;\n}\n\n.ui-ring__bar {\n    fill: none;\n    stroke-width: 4;\n    stroke-linecap: round;\n    transition: stroke-dashoffset 0.35s ease;\n}\n\n.ui-ring_brand .ui-ring__bar {\n    stroke: #0176d3;\n}\n.ui-ring_success .ui-ring__bar {\n    stroke: #2e844a;\n}\n.ui-ring_warning .ui-ring__bar {\n    stroke: #dd7a01;\n}\n.ui-ring_error .ui-ring__bar {\n    stroke: #ba0517;\n}\n\n.ui-ring__label {\n    position: absolute;\n    font-size: 0.7rem;\n    font-weight: 700;\n    color: #181818;\n}\n.ui-ring_large .ui-ring__label {\n    font-size: 0.9rem;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Progress Ring</masterLabel>\n    <description>汎用円形プログレス。0〜100をSVGリングで表示。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiDropdownMenu",
      "title": "UI Dropdown Menu",
      "icon": "🔻",
      "category": "ナビゲーション",
      "demo": "dropdownmenu",
      "description": "トリガーで items を開閉するメニュー。項目選択で select イベント (detail.value) を発火し、外側クリックで閉じる。",
      "props": [
        {
          "name": "label",
          "type": "String",
          "def": "'メニュー'",
          "desc": "トリガーラベル"
        },
        {
          "name": "items",
          "type": "Array",
          "def": "[]",
          "desc": "[{ label, value }] の配列"
        }
      ],
      "events": [
        {
          "name": "select",
          "desc": "項目選択時に発火（detail.value）"
        }
      ],
      "usage": "<c-ui-dropdown-menu label=\"操作\" items={actions} onselect={handleSelect}></c-ui-dropdown-menu>",
      "ja": "ドロップダウンメニュー",
      "files": {
        "html": "<template>\n    <div class=\"ui-dropdown\" onfocusout={handleFocusOut}>\n        <button\n            class=\"ui-dropdown__trigger\"\n            type=\"button\"\n            aria-haspopup=\"true\"\n            aria-expanded={open}\n            onclick={handleToggle}\n        >\n            <span class=\"ui-dropdown__label\">{label}</span>\n            <span class=\"ui-dropdown__caret\">▾</span>\n        </button>\n        <ul lwc:if={open} class=\"ui-dropdown__menu\" role=\"menu\">\n            <template for:each={items} for:item=\"item\">\n                <li key={item.value} role=\"none\">\n                    <button\n                        class=\"ui-dropdown__item\"\n                        type=\"button\"\n                        role=\"menuitem\"\n                        data-value={item.value}\n                        onclick={handleSelect}\n                    >\n                        {item.label}\n                    </button>\n                </li>\n            </template>\n        </ul>\n    </div>\n</template>\n",
        "js": "import { LightningElement, api, track } from 'lwc';\n\n/**\n * uiDropdownMenu — 汎用ドロップダウンメニュー。\n * トリガーボタンで items 配列 ([{ label, value }]) を開閉し、\n * 項目選択時に select イベント (detail.value) を発火する。\n * メニュー外へフォーカスが外れると自動で閉じる。\n */\nexport default class UiDropdownMenu extends LightningElement {\n    _items = [];\n\n    /** トリガーのラベル */\n    @api label = 'メニュー';\n    /** [{ label, value }] の配列 */\n    @api\n    get items() {\n        return this._items;\n    }\n    set items(value) {\n        this._items = Array.isArray(value) ? value : [];\n    }\n\n    @track open = false;\n\n    handleToggle() {\n        this.open = !this.open;\n    }\n\n    handleSelect(event) {\n        const value = event.currentTarget.dataset.value;\n        this.open = false;\n        this.dispatchEvent(new CustomEvent('select', { detail: { value } }));\n    }\n\n    handleFocusOut(event) {\n        if (\n            this.open &&\n            (!event.relatedTarget ||\n                !event.currentTarget.contains(event.relatedTarget))\n        ) {\n            this.open = false;\n        }\n    }\n}\n",
        "css": ".ui-dropdown {\n    position: relative;\n    display: inline-block;\n}\n\n.ui-dropdown__trigger {\n    display: inline-flex;\n    align-items: center;\n    gap: 6px;\n    height: 32px;\n    padding: 0 12px;\n    border: 1px solid #c9c9c9;\n    border-radius: 6px;\n    background: #ffffff;\n    color: #181818;\n    font-size: 0.8125rem;\n    font-weight: 600;\n    cursor: pointer;\n    font-family: inherit;\n}\n.ui-dropdown__trigger:hover {\n    background: #f3f3f3;\n}\n\n.ui-dropdown__caret {\n    font-size: 0.7rem;\n    color: #706e6b;\n}\n\n.ui-dropdown__menu {\n    position: absolute;\n    top: calc(100% + 4px);\n    left: 0;\n    min-width: 180px;\n    margin: 0;\n    padding: 4px;\n    list-style: none;\n    background: #ffffff;\n    border: 1px solid #e5e5e5;\n    border-radius: 8px;\n    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);\n    z-index: 20;\n}\n\n.ui-dropdown__item {\n    display: block;\n    width: 100%;\n    text-align: left;\n    border: none;\n    background: transparent;\n    padding: 8px 12px;\n    font-size: 0.82rem;\n    color: #181818;\n    border-radius: 6px;\n    cursor: pointer;\n    font-family: inherit;\n}\n.ui-dropdown__item:hover {\n    background: #f3f9ff;\n    color: #0176d3;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Dropdown Menu</masterLabel>\n    <description>汎用ドロップダウンメニュー。項目選択で select イベントを発火。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiStepper",
      "title": "UI Stepper",
      "icon": "🔢",
      "category": "フォーム",
      "demo": "stepper",
      "description": "−/+ ボタンと数値入力で値を増減する数値ステッパー。変更時に change イベント (detail.value) を発火。",
      "props": [
        {
          "name": "label",
          "type": "String",
          "def": "—",
          "desc": "ラベル"
        },
        {
          "name": "value",
          "type": "Number",
          "def": "0",
          "desc": "現在値"
        },
        {
          "name": "min",
          "type": "Number",
          "def": "—",
          "desc": "最小値（任意）"
        },
        {
          "name": "max",
          "type": "Number",
          "def": "—",
          "desc": "最大値（任意）"
        },
        {
          "name": "step",
          "type": "Number",
          "def": "1",
          "desc": "刻み"
        }
      ],
      "events": [
        {
          "name": "change",
          "desc": "変更時に発火（detail.value）"
        }
      ],
      "usage": "<c-ui-stepper label=\"数量\" value=\"1\" min=\"0\" onchange={handleChange}></c-ui-stepper>",
      "ja": "数値ステッパー",
      "files": {
        "html": "<template>\n    <div class=\"ui-stepper\">\n        <label lwc:if={label} class=\"ui-stepper__label\">{label}</label>\n        <div class=\"ui-stepper__control\">\n            <button\n                class=\"ui-stepper__btn\"\n                type=\"button\"\n                aria-label=\"減らす\"\n                onclick={handleDecrement}\n            >\n                −\n            </button>\n            <input\n                class=\"ui-stepper__input\"\n                type=\"number\"\n                value={value}\n                oninput={handleInput}\n            />\n            <button\n                class=\"ui-stepper__btn\"\n                type=\"button\"\n                aria-label=\"増やす\"\n                onclick={handleIncrement}\n            >\n                +\n            </button>\n        </div>\n    </div>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\n/**\n * uiStepper — 汎用数値ステッパー。\n * −/+ ボタンと数値入力で値を増減し、変更時に change イベント\n * (detail.value) を発火する。min/max で範囲を制限できる。\n */\nexport default class UiStepper extends LightningElement {\n    /** ラベル */\n    @api label;\n    /** 現在値 */\n    @api value = 0;\n    /** 最小値（任意） */\n    @api min;\n    /** 最大値（任意） */\n    @api max;\n    /** 刻み */\n    @api step = 1;\n\n    get stepValue() {\n        return Number(this.step) || 1;\n    }\n\n    clamp(n) {\n        let v = n;\n        if (this.min !== undefined && this.min !== '' && this.min !== null) {\n            v = Math.max(Number(this.min), v);\n        }\n        if (this.max !== undefined && this.max !== '' && this.max !== null) {\n            v = Math.min(Number(this.max), v);\n        }\n        return v;\n    }\n\n    emit() {\n        this.dispatchEvent(\n            new CustomEvent('change', { detail: { value: this.value } })\n        );\n    }\n\n    handleDecrement() {\n        this.value = this.clamp(Number(this.value) - this.stepValue);\n        this.emit();\n    }\n\n    handleIncrement() {\n        this.value = this.clamp(Number(this.value) + this.stepValue);\n        this.emit();\n    }\n\n    handleInput(event) {\n        this.value = this.clamp(Number(event.target.value) || 0);\n        this.emit();\n    }\n}\n",
        "css": ".ui-stepper {\n    display: flex;\n    flex-direction: column;\n    gap: 4px;\n}\n\n.ui-stepper__label {\n    font-size: 0.78rem;\n    font-weight: 600;\n    color: #444444;\n}\n\n.ui-stepper__control {\n    display: inline-flex;\n    align-items: stretch;\n    border: 1px solid #c9c9c9;\n    border-radius: 6px;\n    overflow: hidden;\n    width: fit-content;\n}\n\n.ui-stepper__btn {\n    width: 32px;\n    border: none;\n    background: #f3f3f3;\n    color: #181818;\n    font-size: 1.1rem;\n    cursor: pointer;\n    line-height: 1;\n}\n.ui-stepper__btn:hover {\n    background: #e5e5e5;\n    color: #0176d3;\n}\n\n.ui-stepper__input {\n    width: 56px;\n    border: none;\n    border-left: 1px solid #c9c9c9;\n    border-right: 1px solid #c9c9c9;\n    text-align: center;\n    font-size: 0.875rem;\n    color: #181818;\n    font-family: inherit;\n    -moz-appearance: textfield;\n}\n.ui-stepper__input::-webkit-outer-spin-button,\n.ui-stepper__input::-webkit-inner-spin-button {\n    -webkit-appearance: none;\n    margin: 0;\n}\n.ui-stepper__input:focus {\n    outline: none;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Stepper</masterLabel>\n    <description>汎用数値ステッパー。−/+で増減し change イベントを発火。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiFileUpload",
      "title": "UI File Upload",
      "icon": "📤",
      "category": "フォーム",
      "demo": "fileupload",
      "description": "クリックまたはドラッグ＆ドロップでファイルを選択するドロップゾーン。選択時に upload イベント (detail.name) を発火。",
      "props": [
        {
          "name": "label",
          "type": "String",
          "def": "案内文",
          "desc": "案内テキスト"
        },
        {
          "name": "accept",
          "type": "String",
          "def": "—",
          "desc": "accept 属性（例: image/*）"
        }
      ],
      "events": [
        {
          "name": "upload",
          "desc": "ファイル選択時に発火（detail.name）"
        }
      ],
      "usage": "<c-ui-file-upload accept=\"image/*\" onupload={handleUpload}></c-ui-file-upload>",
      "ja": "ファイルアップロード",
      "files": {
        "html": "<template>\n    <div\n        class={rootClass}\n        onclick={handleClick}\n        ondragover={handleDragOver}\n        ondragleave={handleDragLeave}\n        ondrop={handleDrop}\n    >\n        <input\n            type=\"file\"\n            class=\"ui-upload__input\"\n            accept={accept}\n            onchange={handleChange}\n        />\n        <span class=\"ui-upload__icon\">📎</span>\n        <span lwc:if={hasFile} class=\"ui-upload__name\">{fileName}</span>\n        <span lwc:else class=\"ui-upload__text\">{label}</span>\n    </div>\n</template>\n",
        "js": "import { LightningElement, api, track } from 'lwc';\n\n/**\n * uiFileUpload — 汎用ファイルアップロード（ドロップゾーン）。\n * クリックまたはドラッグ＆ドロップでファイルを選択し、\n * upload イベント (detail.name) を発火する。\n */\nexport default class UiFileUpload extends LightningElement {\n    /** 案内テキスト */\n    @api label = 'ファイルをドラッグ、またはクリックして選択';\n    /** accept 属性（例: image/*） */\n    @api accept;\n\n    @track fileName = '';\n    @track dragging = false;\n\n    get hasFile() {\n        return !!this.fileName;\n    }\n\n    get rootClass() {\n        return this.dragging ? 'ui-upload ui-upload_drag' : 'ui-upload';\n    }\n\n    handleClick() {\n        this.template.querySelector('input').click();\n    }\n\n    handleChange(event) {\n        const file = event.target.files && event.target.files[0];\n        if (file) {\n            this.setFile(file.name);\n        }\n    }\n\n    handleDragOver(event) {\n        event.preventDefault();\n        this.dragging = true;\n    }\n\n    handleDragLeave() {\n        this.dragging = false;\n    }\n\n    handleDrop(event) {\n        event.preventDefault();\n        this.dragging = false;\n        const file = event.dataTransfer.files && event.dataTransfer.files[0];\n        if (file) {\n            this.setFile(file.name);\n        }\n    }\n\n    setFile(name) {\n        this.fileName = name;\n        this.dispatchEvent(new CustomEvent('upload', { detail: { name } }));\n    }\n}\n",
        "css": ".ui-upload {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    gap: 8px;\n    padding: 24px;\n    border: 2px dashed #c9c9c9;\n    border-radius: 10px;\n    background: #fafaf9;\n    color: #706e6b;\n    cursor: pointer;\n    text-align: center;\n    transition: border-color 0.12s ease, background 0.12s ease;\n}\n.ui-upload:hover {\n    border-color: #0176d3;\n    background: #f3f9ff;\n}\n\n.ui-upload_drag {\n    border-color: #0176d3;\n    background: #eef4ff;\n}\n\n.ui-upload__input {\n    display: none;\n}\n\n.ui-upload__icon {\n    font-size: 1.6rem;\n}\n\n.ui-upload__text {\n    font-size: 0.82rem;\n}\n\n.ui-upload__name {\n    font-size: 0.85rem;\n    font-weight: 600;\n    color: #0176d3;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI File Upload</masterLabel>\n    <description>汎用ファイルアップロード。クリック/D&Dで選択し upload イベントを発火。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiColorSwatch",
      "title": "UI Color Swatch",
      "icon": "🎨",
      "category": "フォーム",
      "demo": "colorswatch",
      "description": "色見本を並べて単一選択する。選択時に change イベント (detail.value) を発火。",
      "props": [
        {
          "name": "colors",
          "type": "Array",
          "def": "[]",
          "desc": "HEX 文字列または { value, label } の配列"
        },
        {
          "name": "value",
          "type": "String",
          "def": "—",
          "desc": "選択中の色"
        }
      ],
      "events": [
        {
          "name": "change",
          "desc": "選択時に発火（detail.value）"
        }
      ],
      "usage": "<c-ui-color-swatch colors={colors} value=\"#0176d3\" onchange={handleChange}></c-ui-color-swatch>",
      "ja": "カラースウォッチ",
      "files": {
        "html": "<template>\n    <div class=\"ui-swatches\">\n        <template for:each={swatches} for:item=\"swatch\">\n            <button\n                key={swatch.value}\n                class={swatch.cssClass}\n                type=\"button\"\n                style={swatch.style}\n                title={swatch.label}\n                data-value={swatch.value}\n                onclick={handleSelect}\n            ></button>\n        </template>\n    </div>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\n/**\n * uiColorSwatch — 汎用カラースウォッチ。\n * colors 配列（HEX 文字列 or [{ value, label }]）から色見本を並べ、\n * 選択時に change イベント (detail.value) を発火する。\n */\nexport default class UiColorSwatch extends LightningElement {\n    _colors = [];\n\n    /** 色の配列（'#0176d3' または { value, label }） */\n    @api\n    get colors() {\n        return this._colors;\n    }\n    set colors(value) {\n        this._colors = Array.isArray(value) ? value : [];\n    }\n\n    /** 選択中の色 */\n    @api value;\n\n    get swatches() {\n        return this._colors.map((c) => {\n            const val = typeof c === 'string' ? c : c.value;\n            const label = typeof c === 'string' ? c : c.label || c.value;\n            return {\n                value: val,\n                label,\n                style: `background:${val}`,\n                cssClass:\n                    String(val) === String(this.value)\n                        ? 'ui-swatch ui-swatch_selected'\n                        : 'ui-swatch'\n            };\n        });\n    }\n\n    handleSelect(event) {\n        this.value = event.currentTarget.dataset.value;\n        this.dispatchEvent(\n            new CustomEvent('change', { detail: { value: this.value } })\n        );\n    }\n}\n",
        "css": ".ui-swatches {\n    display: inline-flex;\n    flex-wrap: wrap;\n    gap: 8px;\n}\n\n.ui-swatch {\n    width: 28px;\n    height: 28px;\n    border-radius: 50%;\n    border: 2px solid #ffffff;\n    box-shadow: 0 0 0 1px #dddbda;\n    cursor: pointer;\n    padding: 0;\n    transition: transform 0.1s ease;\n}\n.ui-swatch:hover {\n    transform: scale(1.12);\n}\n\n.ui-swatch_selected {\n    box-shadow: 0 0 0 2px #0176d3;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Color Swatch</masterLabel>\n    <description>汎用カラースウォッチ。色見本を選択し change イベントを発火。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiPopover",
      "title": "UI Popover",
      "icon": "💭",
      "category": "オーバーレイ",
      "demo": "popover",
      "description": "トリガークリックでヘッダ付きの吹き出し（default スロット）を開閉。外側クリックで閉じる。",
      "props": [
        {
          "name": "trigger-label",
          "type": "String",
          "def": "'詳細'",
          "desc": "トリガーのラベル"
        },
        {
          "name": "header",
          "type": "String",
          "def": "—",
          "desc": "吹き出しの見出し（任意）"
        }
      ],
      "slots": [
        {
          "name": "(default)",
          "desc": "吹き出しの本文"
        }
      ],
      "events": [
        {
          "name": "close",
          "desc": "閉じる操作時に発火"
        }
      ],
      "usage": "<c-ui-popover trigger-label=\"ヘルプ\" header=\"使い方\">\n    ここに説明を表示します。\n</c-ui-popover>",
      "ja": "ポップオーバー",
      "files": {
        "html": "<template>\n    <div class=\"ui-popover\" onfocusout={handleFocusOut}>\n        <button\n            class=\"ui-popover__trigger\"\n            type=\"button\"\n            aria-haspopup=\"dialog\"\n            aria-expanded={open}\n            onclick={handleToggle}\n        >\n            {triggerLabel}\n        </button>\n        <div lwc:if={open} class=\"ui-popover__panel\" role=\"dialog\">\n            <header lwc:if={header} class=\"ui-popover__header\">\n                <span class=\"ui-popover__title\">{header}</span>\n                <button\n                    class=\"ui-popover__close\"\n                    type=\"button\"\n                    title=\"閉じる\"\n                    onclick={handleClose}\n                >\n                    &times;\n                </button>\n            </header>\n            <div class=\"ui-popover__body\">\n                <slot></slot>\n            </div>\n        </div>\n    </div>\n</template>\n",
        "js": "import { LightningElement, api, track } from 'lwc';\n\n/**\n * uiPopover — 汎用ポップオーバー。\n * トリガーボタンのクリックで、ヘッダ付きの吹き出し（default スロット）を\n * 開閉する。外側へフォーカスが外れると自動で閉じる。\n */\nexport default class UiPopover extends LightningElement {\n    /** トリガーのラベル */\n    @api triggerLabel = '詳細';\n    /** ポップオーバーの見出し（任意） */\n    @api header;\n\n    @track open = false;\n\n    handleToggle() {\n        this.open = !this.open;\n    }\n\n    handleClose() {\n        this.open = false;\n    }\n\n    handleFocusOut(event) {\n        if (\n            this.open &&\n            (!event.relatedTarget ||\n                !event.currentTarget.contains(event.relatedTarget))\n        ) {\n            this.open = false;\n        }\n    }\n}\n",
        "css": ".ui-popover {\n    position: relative;\n    display: inline-block;\n}\n\n.ui-popover__trigger {\n    height: 32px;\n    padding: 0 14px;\n    border: 1px solid #0176d3;\n    border-radius: 6px;\n    background: #ffffff;\n    color: #0176d3;\n    font-size: 0.8125rem;\n    font-weight: 600;\n    cursor: pointer;\n    font-family: inherit;\n}\n.ui-popover__trigger:hover {\n    background: #eef4ff;\n}\n\n.ui-popover__panel {\n    position: absolute;\n    top: calc(100% + 8px);\n    left: 0;\n    width: 260px;\n    background: #ffffff;\n    border: 1px solid #e5e5e5;\n    border-radius: 10px;\n    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);\n    z-index: 30;\n}\n\n.ui-popover__panel::before {\n    content: '';\n    position: absolute;\n    top: -6px;\n    left: 18px;\n    width: 12px;\n    height: 12px;\n    background: #ffffff;\n    border-left: 1px solid #e5e5e5;\n    border-top: 1px solid #e5e5e5;\n    transform: rotate(45deg);\n}\n\n.ui-popover__header {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    padding: 10px 14px;\n    border-bottom: 1px solid #ececec;\n}\n\n.ui-popover__title {\n    font-size: 0.85rem;\n    font-weight: 700;\n    color: #181818;\n}\n\n.ui-popover__close {\n    border: none;\n    background: transparent;\n    font-size: 1.1rem;\n    line-height: 1;\n    color: #706e6b;\n    cursor: pointer;\n}\n.ui-popover__close:hover {\n    color: #181818;\n}\n\n.ui-popover__body {\n    padding: 14px;\n    font-size: 0.82rem;\n    line-height: 1.6;\n    color: #444444;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Popover</masterLabel>\n    <description>汎用ポップオーバー。トリガーで吹き出しを開閉、外側クリックで閉じる。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiSkeleton",
      "title": "UI Skeleton",
      "icon": "⬜",
      "category": "フィードバック",
      "demo": "skeleton",
      "description": "読み込み中のプレースホルダ。シマーアニメーションの行を表示し、avatar で円形も表示。",
      "props": [
        {
          "name": "lines",
          "type": "Number",
          "def": "3",
          "desc": "行数"
        },
        {
          "name": "avatar",
          "type": "Boolean",
          "def": "false",
          "desc": "true で円形アバターを表示"
        }
      ],
      "events": [],
      "usage": "<c-ui-skeleton lines=\"3\" avatar></c-ui-skeleton>",
      "ja": "スケルトン",
      "files": {
        "html": "<template>\n    <div class=\"ui-skeleton\">\n        <div lwc:if={avatar} class=\"ui-skeleton__avatar\"></div>\n        <div class=\"ui-skeleton__lines\">\n            <template for:each={lineList} for:item=\"item\">\n                <div\n                    key={item.key}\n                    class=\"ui-skeleton__line\"\n                    style={item.style}\n                ></div>\n            </template>\n        </div>\n    </div>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\nconst WIDTHS = ['100%', '92%', '78%', '85%', '65%'];\n\n/**\n * uiSkeleton — 汎用スケルトン（読み込みプレースホルダ）。\n * lines 本のシマーアニメーションのプレースホルダ行を表示する。\n * avatar=true で先頭に円形のプレースホルダも表示する。\n */\nexport default class UiSkeleton extends LightningElement {\n    /** 行数 */\n    @api lines = 3;\n    /** true で円形アバターのプレースホルダを表示 */\n    @api avatar = false;\n\n    get lineList() {\n        const n = Math.max(1, Number(this.lines) || 1);\n        const list = [];\n        for (let i = 0; i < n; i += 1) {\n            const width = WIDTHS[i % WIDTHS.length];\n            list.push({\n                key: i,\n                style: `width:${width}`\n            });\n        }\n        return list;\n    }\n}\n",
        "css": ".ui-skeleton {\n    display: flex;\n    align-items: flex-start;\n    gap: 12px;\n    width: 100%;\n}\n\n.ui-skeleton__avatar {\n    width: 44px;\n    height: 44px;\n    border-radius: 50%;\n    flex-shrink: 0;\n    background: #e8e8e8;\n    overflow: hidden;\n    position: relative;\n}\n\n.ui-skeleton__lines {\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n    gap: 10px;\n    padding-top: 4px;\n}\n\n.ui-skeleton__line {\n    height: 12px;\n    border-radius: 6px;\n    background: #e8e8e8;\n    overflow: hidden;\n    position: relative;\n}\n\n.ui-skeleton__avatar::after,\n.ui-skeleton__line::after {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background: linear-gradient(\n        90deg,\n        rgba(255, 255, 255, 0) 0%,\n        rgba(255, 255, 255, 0.6) 50%,\n        rgba(255, 255, 255, 0) 100%\n    );\n    transform: translateX(-100%);\n    animation: ui-skeleton-shimmer 1.4s ease-in-out infinite;\n}\n\n@keyframes ui-skeleton-shimmer {\n    100% {\n        transform: translateX(100%);\n    }\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Skeleton</masterLabel>\n    <description>汎用スケルトン。読み込み中のプレースホルダをシマー表示。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiList",
      "title": "UI List",
      "icon": "📋",
      "category": "表示",
      "demo": "list",
      "description": "items 配列 ([{ title, meta, icon }]) をクリック可能な行で表示。行クリックで select イベント (detail.value) を発火。",
      "props": [
        {
          "name": "items",
          "type": "Array",
          "def": "[]",
          "desc": "[{ title, meta, icon }] の配列"
        }
      ],
      "events": [
        {
          "name": "select",
          "desc": "行クリック時に発火（detail.value）"
        }
      ],
      "usage": "<c-ui-list items={items} onselect={handleSelect}></c-ui-list>",
      "ja": "リスト",
      "files": {
        "html": "<template>\n    <ul class=\"ui-list\">\n        <template for:each={computedItems} for:item=\"item\">\n            <li key={item.key} class=\"ui-list__item\">\n                <button\n                    class=\"ui-list__button\"\n                    type=\"button\"\n                    data-value={item.value}\n                    onclick={handleSelect}\n                >\n                    <span lwc:if={item.hasIcon} class=\"ui-list__icon\"\n                        >{item.icon}</span\n                    >\n                    <span class=\"ui-list__title\">{item.title}</span>\n                    <span lwc:if={item.hasMeta} class=\"ui-list__meta\"\n                        >{item.meta}</span\n                    >\n                </button>\n            </li>\n        </template>\n    </ul>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\n/**\n * uiList — 汎用リスト。\n * items 配列 ([{ title, meta, icon }]) をクリック可能な行として表示し、\n * 行クリック時に select イベント (detail.value) を発火する。\n */\nexport default class UiList extends LightningElement {\n    _items = [];\n\n    /** [{ title, meta, icon }] の配列 */\n    @api\n    get items() {\n        return this._items;\n    }\n    set items(value) {\n        this._items = Array.isArray(value) ? value : [];\n    }\n\n    get computedItems() {\n        return this._items.map((item, index) => ({\n            key: index,\n            title: item.title,\n            meta: item.meta,\n            icon: item.icon,\n            hasIcon: !!item.icon,\n            hasMeta: !!item.meta,\n            value: item.title !== undefined ? item.title : index\n        }));\n    }\n\n    handleSelect(event) {\n        const value = event.currentTarget.dataset.value;\n        this.dispatchEvent(new CustomEvent('select', { detail: { value } }));\n    }\n}\n",
        "css": ".ui-list {\n    list-style: none;\n    margin: 0;\n    padding: 0;\n    border: 1px solid #e5e5e5;\n    border-radius: 8px;\n    overflow: hidden;\n    width: 100%;\n}\n\n.ui-list__item + .ui-list__item .ui-list__button {\n    border-top: 1px solid #ececec;\n}\n\n.ui-list__button {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    width: 100%;\n    padding: 10px 14px;\n    border: none;\n    background: #ffffff;\n    text-align: left;\n    cursor: pointer;\n    font-family: inherit;\n    font-size: 0.85rem;\n    color: #181818;\n}\n.ui-list__button:hover {\n    background: #f4f8ff;\n}\n\n.ui-list__icon {\n    font-size: 1.05rem;\n    line-height: 1;\n    flex-shrink: 0;\n}\n\n.ui-list__title {\n    flex: 1;\n}\n\n.ui-list__meta {\n    font-size: 0.78rem;\n    color: #706e6b;\n    flex-shrink: 0;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI List</masterLabel>\n    <description>汎用リスト。items をクリック可能な行で表示し select イベントを発火。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiVerticalNav",
      "title": "UI Vertical Nav",
      "icon": "🧱",
      "category": "ナビゲーション",
      "demo": "verticalnav",
      "description": "items 配列を縦並びで表示し active を強調する縦型ナビ。選択時に select イベント (detail.value) を発火。",
      "props": [
        {
          "name": "items",
          "type": "Array",
          "def": "[]",
          "desc": "[{ label, value, icon }] の配列"
        },
        {
          "name": "active",
          "type": "String",
          "def": "—",
          "desc": "選択中の value"
        }
      ],
      "events": [
        {
          "name": "select",
          "desc": "選択時に発火（detail.value）"
        }
      ],
      "usage": "<c-ui-vertical-nav items={items} active=\"home\" onselect={handleSelect}></c-ui-vertical-nav>",
      "ja": "縦ナビ",
      "files": {
        "html": "<template>\n    <nav class=\"ui-vnav\">\n        <template for:each={computedItems} for:item=\"item\">\n            <button\n                key={item.key}\n                class={item.itemClass}\n                type=\"button\"\n                data-value={item.value}\n                onclick={handleSelect}\n            >\n                <span lwc:if={item.hasIcon} class=\"ui-vnav__icon\"\n                    >{item.icon}</span\n                >\n                <span class=\"ui-vnav__label\">{item.label}</span>\n            </button>\n        </template>\n    </nav>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\n/**\n * uiVerticalNav — 汎用縦型ナビゲーション。\n * items 配列 ([{ label, value, icon }]) を縦並びのボタンで表示し、\n * active と一致する項目を強調する。クリック時に select イベント\n * (detail.value) を発火する。\n */\nexport default class UiVerticalNav extends LightningElement {\n    _items = [];\n\n    /** [{ label, value, icon }] の配列 */\n    @api\n    get items() {\n        return this._items;\n    }\n    set items(value) {\n        this._items = Array.isArray(value) ? value : [];\n    }\n\n    /** 選択中の value */\n    @api active;\n\n    get computedItems() {\n        return this._items.map((item, index) => {\n            const isActive = item.value === this.active;\n            return {\n                key: index,\n                label: item.label,\n                value: item.value,\n                icon: item.icon,\n                hasIcon: !!item.icon,\n                itemClass: `ui-vnav__item${\n                    isActive ? ' ui-vnav__item_active' : ''\n                }`\n            };\n        });\n    }\n\n    handleSelect(event) {\n        const value = event.currentTarget.dataset.value;\n        this.dispatchEvent(new CustomEvent('select', { detail: { value } }));\n    }\n}\n",
        "css": ".ui-vnav {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n    width: 100%;\n    max-width: 220px;\n}\n\n.ui-vnav__item {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    width: 100%;\n    padding: 9px 14px;\n    border: none;\n    border-left: 3px solid transparent;\n    background: transparent;\n    text-align: left;\n    cursor: pointer;\n    font-family: inherit;\n    font-size: 0.85rem;\n    color: #444444;\n    border-radius: 0 6px 6px 0;\n}\n.ui-vnav__item:hover {\n    background: #f4f8ff;\n    color: #181818;\n}\n\n.ui-vnav__item_active {\n    border-left-color: #0176d3;\n    background: #eef4ff;\n    color: #0176d3;\n    font-weight: 600;\n}\n\n.ui-vnav__icon {\n    font-size: 1.05rem;\n    line-height: 1;\n    flex-shrink: 0;\n}\n\n.ui-vnav__label {\n    flex: 1;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Vertical Nav</masterLabel>\n    <description>汎用縦型ナビゲーション。項目を縦並びで表示し select イベントを発火。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiBanner",
      "title": "UI Banner",
      "icon": "📣",
      "category": "フィードバック",
      "demo": "banner",
      "description": "variant に応じた色・アイコンで横長の通知を表示。default スロットにアクションを差し込め、closable で閉じられる。",
      "props": [
        {
          "name": "variant",
          "type": "String",
          "def": "'info'",
          "desc": "info | success | warning | error"
        },
        {
          "name": "message",
          "type": "String",
          "def": "—",
          "desc": "メッセージ本文"
        },
        {
          "name": "closable",
          "type": "Boolean",
          "def": "false",
          "desc": "true で閉じるボタンを表示"
        }
      ],
      "slots": [
        {
          "name": "(default)",
          "desc": "アクション（ボタン等）"
        }
      ],
      "events": [
        {
          "name": "close",
          "desc": "閉じる操作時に発火"
        }
      ],
      "usage": "<c-ui-banner variant=\"warning\" message=\"メンテナンス予定があります\" closable></c-ui-banner>",
      "ja": "バナー",
      "files": {
        "html": "<template>\n    <div lwc:if={isVisible} class={bannerClass} role=\"status\">\n        <span class=\"ui-banner__icon\">{iconChar}</span>\n        <span class=\"ui-banner__message\">{message}</span>\n        <span class=\"ui-banner__action\">\n            <slot></slot>\n        </span>\n        <button\n            lwc:if={closable}\n            class=\"ui-banner__close\"\n            type=\"button\"\n            title=\"閉じる\"\n            onclick={handleClose}\n        >\n            &times;\n        </button>\n    </div>\n</template>\n",
        "js": "import { LightningElement, api, track } from 'lwc';\n\nconst ICONS = {\n    info: 'ℹ',\n    success: '✓',\n    warning: '!',\n    error: '✕'\n};\n\n/**\n * uiBanner — 汎用バナー（横長の通知）。\n * variant に応じた色・アイコンでメッセージを横長に表示する。\n * closable=true で閉じるボタンを表示し、閉じると close イベントを発火する。\n * default スロットにアクション（ボタン等）を差し込める。\n */\nexport default class UiBanner extends LightningElement {\n    /** info | success | warning | error */\n    @api variant = 'info';\n    /** メッセージ本文 */\n    @api message;\n    /** true で閉じるボタンを表示 */\n    @api closable = false;\n\n    @track closed = false;\n\n    get isVisible() {\n        return !this.closed;\n    }\n\n    get iconChar() {\n        return ICONS[this.variant] || ICONS.info;\n    }\n\n    get bannerClass() {\n        return `ui-banner ui-banner_${this.variant}`;\n    }\n\n    handleClose() {\n        this.closed = true;\n        this.dispatchEvent(new CustomEvent('close'));\n    }\n}\n",
        "css": ".ui-banner {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    width: 100%;\n    padding: 10px 14px;\n    border-radius: 8px;\n    border-left: 4px solid #0176d3;\n    background: #eef4ff;\n    color: #181818;\n    font-size: 0.85rem;\n}\n\n.ui-banner_info {\n    border-left-color: #0176d3;\n    background: #eef4ff;\n}\n.ui-banner_success {\n    border-left-color: #2e844a;\n    background: #ebf7ee;\n}\n.ui-banner_warning {\n    border-left-color: #dd7a01;\n    background: #fff4e5;\n}\n.ui-banner_error {\n    border-left-color: #ba0517;\n    background: #fdeceb;\n}\n\n.ui-banner__icon {\n    flex-shrink: 0;\n    width: 20px;\n    height: 20px;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: 50%;\n    font-size: 0.78rem;\n    font-weight: 700;\n    color: #ffffff;\n    background: #0176d3;\n}\n.ui-banner_success .ui-banner__icon {\n    background: #2e844a;\n}\n.ui-banner_warning .ui-banner__icon {\n    background: #dd7a01;\n}\n.ui-banner_error .ui-banner__icon {\n    background: #ba0517;\n}\n\n.ui-banner__message {\n    flex: 1;\n    line-height: 1.4;\n}\n\n.ui-banner__action {\n    flex-shrink: 0;\n    display: inline-flex;\n    align-items: center;\n}\n\n.ui-banner__close {\n    flex-shrink: 0;\n    border: none;\n    background: transparent;\n    font-size: 1.1rem;\n    line-height: 1;\n    color: #706e6b;\n    cursor: pointer;\n}\n.ui-banner__close:hover {\n    color: #181818;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Banner</masterLabel>\n    <description>variant に応じた色・アイコンで横長に通知を表示するバナー。closable で閉じるボタンを表示。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiMeter",
      "title": "UI Meter",
      "icon": "🌡️",
      "category": "表示",
      "demo": "meter",
      "description": "value / max の割合をバーで表示。割合に応じて低（赤）/中（橙）/高（緑）に色が変わる。",
      "props": [
        {
          "name": "value",
          "type": "Number",
          "def": "0",
          "desc": "現在値"
        },
        {
          "name": "max",
          "type": "Number",
          "def": "100",
          "desc": "最大値"
        },
        {
          "name": "label",
          "type": "String",
          "def": "—",
          "desc": "ラベル"
        }
      ],
      "events": [],
      "usage": "<c-ui-meter label=\"ディスク使用量\" value=\"82\" max=\"100\"></c-ui-meter>",
      "ja": "メーター",
      "files": {
        "html": "<template>\n    <div class=\"ui-meter\">\n        <div class=\"ui-meter__head\">\n            <span lwc:if={label} class=\"ui-meter__label\">{label}</span>\n            <span class=\"ui-meter__value\">{valueText}</span>\n        </div>\n        <div class=\"ui-meter__track\">\n            <div class={fillClass} style={fillStyle}></div>\n        </div>\n    </div>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\n/**\n * uiMeter — 汎用メーター。\n * value / max の割合を色付きバーで表示する。割合に応じて\n * 低（赤）/中（橙）/高（緑）に色が変わる。\n */\nexport default class UiMeter extends LightningElement {\n    /** 現在値 */\n    @api value = 0;\n    /** 最大値 */\n    @api max = 100;\n    /** ラベル */\n    @api label;\n\n    get ratio() {\n        const max = Number(this.max) || 1;\n        const v = Number(this.value) || 0;\n        return Math.min(1, Math.max(0, v / max));\n    }\n\n    get fillClass() {\n        const r = this.ratio;\n        let level = 'high';\n        if (r < 0.34) {\n            level = 'low';\n        } else if (r < 0.67) {\n            level = 'mid';\n        }\n        return `ui-meter__fill ui-meter__fill_${level}`;\n    }\n\n    get fillStyle() {\n        return `width: ${Math.round(this.ratio * 100)}%`;\n    }\n\n    get valueText() {\n        return `${this.value} / ${this.max}`;\n    }\n}\n",
        "css": ".ui-meter {\n    width: 100%;\n    display: flex;\n    flex-direction: column;\n    gap: 5px;\n}\n\n.ui-meter__head {\n    display: flex;\n    justify-content: space-between;\n    align-items: baseline;\n    font-size: 0.78rem;\n}\n\n.ui-meter__label {\n    font-weight: 600;\n    color: #444444;\n}\n\n.ui-meter__value {\n    color: #706e6b;\n    font-variant-numeric: tabular-nums;\n}\n\n.ui-meter__track {\n    width: 100%;\n    height: 8px;\n    background: #e5e5e5;\n    border-radius: 4px;\n    overflow: hidden;\n}\n\n.ui-meter__fill {\n    height: 100%;\n    border-radius: 4px;\n    transition: width 0.3s ease, background 0.3s ease;\n}\n\n.ui-meter__fill_low {\n    background: #ba0517;\n}\n.ui-meter__fill_mid {\n    background: #dd7a01;\n}\n.ui-meter__fill_high {\n    background: #2e844a;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Meter</masterLabel>\n    <description>汎用メーター。value/max の割合を低中高で色分け表示。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiCountBadge",
      "title": "UI Count Badge",
      "icon": "🔴",
      "category": "表示",
      "demo": "countbadge",
      "description": "default スロットの要素の右上に件数バッジを重ねて表示。max 超過で「max+」、dot で点のみ表示。",
      "props": [
        {
          "name": "count",
          "type": "Number",
          "def": "0",
          "desc": "件数"
        },
        {
          "name": "max",
          "type": "Number",
          "def": "99",
          "desc": "表示上限（超過で max+）"
        },
        {
          "name": "dot",
          "type": "Boolean",
          "def": "false",
          "desc": "true で数字なしのドット表示"
        }
      ],
      "slots": [
        {
          "name": "(default)",
          "desc": "バッジを重ねる要素"
        }
      ],
      "events": [],
      "usage": "<c-ui-count-badge count=\"5\">\n    <span>🔔</span>\n</c-ui-count-badge>",
      "ja": "カウントバッジ",
      "files": {
        "html": "<template>\n    <span class=\"ui-countbadge\">\n        <slot></slot>\n        <span lwc:if={show} class={badgeClass}>\n            <span lwc:if={isDot}></span>\n            <span lwc:else>{display}</span>\n        </span>\n    </span>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\n/**\n * uiCountBadge — 汎用カウントバッジ。\n * default スロットの要素（アイコン等）の右上に件数バッジを重ねて表示する。\n * count が max を超えると「max+」と表示。dot=true で数字なしの点のみ表示する。\n */\nexport default class UiCountBadge extends LightningElement {\n    /** 件数 */\n    @api count = 0;\n    /** 表示上限（超過時は max+ 表示） */\n    @api max = 99;\n    /** true で数字なしのドット表示 */\n    @api dot = false;\n\n    get isDot() {\n        return this.dot;\n    }\n\n    get show() {\n        return this.dot || Number(this.count) > 0;\n    }\n\n    get display() {\n        const n = Number(this.count) || 0;\n        const max = Number(this.max) || 99;\n        return n > max ? `${max}+` : `${n}`;\n    }\n\n    get badgeClass() {\n        return this.dot\n            ? 'ui-countbadge__badge ui-countbadge__badge_dot'\n            : 'ui-countbadge__badge';\n    }\n}\n",
        "css": ".ui-countbadge {\n    position: relative;\n    display: inline-flex;\n}\n\n.ui-countbadge__badge {\n    position: absolute;\n    top: -6px;\n    right: -8px;\n    min-width: 18px;\n    height: 18px;\n    padding: 0 5px;\n    border-radius: 9px;\n    background: #ba0517;\n    color: #ffffff;\n    font-size: 0.68rem;\n    font-weight: 700;\n    line-height: 18px;\n    text-align: center;\n    box-shadow: 0 0 0 2px #ffffff;\n    box-sizing: border-box;\n}\n\n.ui-countbadge__badge_dot {\n    min-width: 10px;\n    width: 10px;\n    height: 10px;\n    padding: 0;\n    border-radius: 50%;\n    top: -2px;\n    right: -2px;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Count Badge</masterLabel>\n    <description>汎用カウントバッジ。スロット要素の右上に件数/ドットを重ねて表示。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiTag",
      "title": "UI Tag",
      "icon": "🏷️",
      "category": "表示",
      "demo": "tag",
      "description": "color に応じた淡い背景色でラベルを表示するタグ。6色のバリアントに対応。",
      "props": [
        {
          "name": "label",
          "type": "String",
          "def": "—",
          "desc": "表示テキスト"
        },
        {
          "name": "color",
          "type": "String",
          "def": "'neutral'",
          "desc": "neutral | blue | green | red | orange | purple"
        }
      ],
      "events": [],
      "usage": "<c-ui-tag label=\"新着\" color=\"blue\"></c-ui-tag>",
      "ja": "タグ",
      "files": {
        "html": "<template>\n    <span class={tagClass}>{label}</span>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\nconst COLORS = ['neutral', 'blue', 'green', 'red', 'orange', 'purple'];\n\n/**\n * uiTag — 汎用タグ（色ラベル）。\n * color に応じた淡い背景色でラベルを表示する純粋な表示コンポーネント。\n */\nexport default class UiTag extends LightningElement {\n    /** 表示テキスト */\n    @api label;\n    /** 色: neutral | blue | green | red | orange | purple */\n    @api color = 'neutral';\n\n    get tagClass() {\n        const color = COLORS.includes(this.color) ? this.color : 'neutral';\n        return `ui-tag ui-tag_${color}`;\n    }\n}\n",
        "css": ".ui-tag {\n    display: inline-flex;\n    align-items: center;\n    padding: 2px 9px;\n    border-radius: 5px;\n    font-size: 0.72rem;\n    font-weight: 600;\n    line-height: 1.5;\n    white-space: nowrap;\n}\n\n.ui-tag_neutral {\n    background: #ecebea;\n    color: #444444;\n}\n.ui-tag_blue {\n    background: #eef4ff;\n    color: #0b5cab;\n}\n.ui-tag_green {\n    background: #e6f4ea;\n    color: #1d7a3f;\n}\n.ui-tag_red {\n    background: #fdecea;\n    color: #b3261e;\n}\n.ui-tag_orange {\n    background: #fef0e2;\n    color: #a8540b;\n}\n.ui-tag_purple {\n    background: #f3edff;\n    color: #6b3fc0;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Tag</masterLabel>\n    <description>汎用タグ。6色の淡い背景でラベルを表示。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiIconButton",
      "title": "UI Icon Button",
      "icon": "🔣",
      "category": "アクション",
      "demo": "iconbutton",
      "description": "アイコンのみの正方形ボタン。click イベントを発火し、3 バリアントに対応。",
      "props": [
        {
          "name": "icon",
          "type": "String",
          "def": "—",
          "desc": "アイコン文字（絵文字可）"
        },
        {
          "name": "variant",
          "type": "String",
          "def": "'neutral'",
          "desc": "neutral | brand | ghost"
        },
        {
          "name": "title",
          "type": "String",
          "def": "—",
          "desc": "ツールチップ／代替名"
        },
        {
          "name": "disabled",
          "type": "Boolean",
          "def": "false",
          "desc": "true で無効化"
        }
      ],
      "events": [
        {
          "name": "click",
          "desc": "ボタン押下時に発火"
        }
      ],
      "usage": "<c-ui-icon-button icon=\"✏️\" title=\"編集\" onclick={handleEdit}></c-ui-icon-button>",
      "ja": "アイコンボタン",
      "files": {
        "html": "<template>\n    <button\n        class={buttonClass}\n        type=\"button\"\n        title={title}\n        aria-label={title}\n        disabled={disabled}\n        onclick={handleClick}\n    >\n        <span class=\"ui-iconbtn__icon\">{icon}</span>\n    </button>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\nconst VARIANTS = ['neutral', 'brand', 'ghost'];\n\n/**\n * uiIconButton — 汎用アイコンボタン。\n * アイコン（絵文字や文字）のみの正方形ボタン。click イベントを発火する。\n */\nexport default class UiIconButton extends LightningElement {\n    /** アイコン文字（絵文字可） */\n    @api icon;\n    /** バリアント: neutral | brand | ghost */\n    @api variant = 'neutral';\n    /** ツールチップ／アクセシブル名 */\n    @api title;\n    /** true で無効化 */\n    @api disabled = false;\n\n    get buttonClass() {\n        const variant = VARIANTS.includes(this.variant) ? this.variant : 'neutral';\n        return `ui-iconbtn ui-iconbtn_${variant}`;\n    }\n\n    handleClick() {\n        this.dispatchEvent(new CustomEvent('click'));\n    }\n}\n",
        "css": ".ui-iconbtn {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    width: 34px;\n    height: 34px;\n    border-radius: 7px;\n    border: 1px solid transparent;\n    cursor: pointer;\n    font-size: 1rem;\n    line-height: 1;\n    transition: background 0.12s ease;\n}\n\n.ui-iconbtn:disabled {\n    opacity: 0.45;\n    cursor: not-allowed;\n}\n\n.ui-iconbtn_neutral {\n    background: #ffffff;\n    border-color: #c9c9c9;\n    color: #444444;\n}\n.ui-iconbtn_neutral:not(:disabled):hover {\n    background: #f3f3f3;\n}\n\n.ui-iconbtn_brand {\n    background: #0176d3;\n    color: #ffffff;\n}\n.ui-iconbtn_brand:not(:disabled):hover {\n    background: #014486;\n}\n\n.ui-iconbtn_ghost {\n    background: transparent;\n    color: #514f4d;\n}\n.ui-iconbtn_ghost:not(:disabled):hover {\n    background: #f0f0f0;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Icon Button</masterLabel>\n    <description>汎用アイコンボタン。アイコンのみの正方形ボタンで click を発火。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiKbd",
      "title": "UI Kbd",
      "icon": "⌨️",
      "category": "表示",
      "demo": "kbd",
      "description": "keys 配列をキー風の見た目で表示。ショートカット表記に使う（例: Ctrl + S）。",
      "props": [
        {
          "name": "keys",
          "type": "Array",
          "def": "[]",
          "desc": "キー文字列の配列（例: ['Ctrl', 'S']）"
        }
      ],
      "events": [],
      "usage": "<c-ui-kbd keys={shortcut}></c-ui-kbd>",
      "ja": "キーボードキー",
      "files": {
        "html": "<template>\n    <span class=\"ui-kbd\">\n        <template for:each={computedKeys} for:item=\"k\">\n            <span key={k.idx} class=\"ui-kbd__group\">\n                <kbd class=\"ui-kbd__key\">{k.key}</kbd>\n                <span lwc:if={k.showPlus} class=\"ui-kbd__plus\">+</span>\n            </span>\n        </template>\n    </span>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\n/**\n * uiKbd — 汎用キーボードキー表示。\n * keys 配列（例: ['Ctrl', 'S']）を「Ctrl + S」のようにキー風の見た目で表示する。\n */\nexport default class UiKbd extends LightningElement {\n    /** キー文字列の配列 */\n    @api keys = [];\n\n    get computedKeys() {\n        const arr = Array.isArray(this.keys) ? this.keys : [];\n        return arr.map((k, i) => ({\n            idx: i,\n            key: k,\n            showPlus: i < arr.length - 1\n        }));\n    }\n}\n",
        "css": ".ui-kbd {\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n}\n\n.ui-kbd__group {\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n}\n\n.ui-kbd__key {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    min-width: 22px;\n    height: 22px;\n    padding: 0 6px;\n    border: 1px solid #c9c9c9;\n    border-bottom-width: 2px;\n    border-radius: 5px;\n    background: #fafaf9;\n    color: #444444;\n    font-family: 'SFMono-Regular', Consolas, monospace;\n    font-size: 0.72rem;\n    font-weight: 600;\n    line-height: 1;\n}\n\n.ui-kbd__plus {\n    color: #969492;\n    font-size: 0.72rem;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Kbd</masterLabel>\n    <description>汎用キーボードキー表示。ショートカットをキー風に表示。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiCopyButton",
      "title": "UI Copy Button",
      "icon": "📋",
      "category": "アクション",
      "demo": "copybutton",
      "description": "value をクリップボードにコピーし、一時的に「コピー済み」表示へ切替える。copy イベントを発火。",
      "props": [
        {
          "name": "value",
          "type": "String",
          "def": "''",
          "desc": "コピーするテキスト"
        },
        {
          "name": "label",
          "type": "String",
          "def": "'コピー'",
          "desc": "ボタンラベル"
        }
      ],
      "events": [
        {
          "name": "copy",
          "desc": "コピー時に発火（detail.value）"
        }
      ],
      "usage": "<c-ui-copy-button value=\"ABC-123\" oncopy={handleCopy}></c-ui-copy-button>",
      "ja": "コピーボタン",
      "files": {
        "html": "<template>\n    <button class={buttonClass} type=\"button\" onclick={handleCopy}>\n        <span class=\"ui-copybtn__icon\">{iconChar}</span>\n        <span class=\"ui-copybtn__label\">{displayLabel}</span>\n    </button>\n</template>\n",
        "js": "import { LightningElement, api, track } from 'lwc';\n\n/**\n * uiCopyButton — 汎用コピーボタン。\n * value のテキストをクリップボードにコピーし、一時的に「コピー済み」表示に切替える。\n * コピー時に copy イベント (detail.value) を発火する。\n */\nexport default class UiCopyButton extends LightningElement {\n    /** コピーするテキスト */\n    @api value = '';\n    /** ボタンラベル */\n    @api label = 'コピー';\n\n    @track copied = false;\n    _timer;\n\n    get displayLabel() {\n        return this.copied ? 'コピー済み' : this.label;\n    }\n\n    get iconChar() {\n        return this.copied ? '✓' : '📋';\n    }\n\n    get buttonClass() {\n        return this.copied ? 'ui-copybtn ui-copybtn_done' : 'ui-copybtn';\n    }\n\n    handleCopy() {\n        const text = this.value || '';\n        const done = () => {\n            this.copied = true;\n            this.dispatchEvent(\n                new CustomEvent('copy', { detail: { value: text } })\n            );\n            if (this._timer) {\n                clearTimeout(this._timer);\n            }\n            // eslint-disable-next-line @lwc/lwc/no-async-operation\n            this._timer = setTimeout(() => {\n                this.copied = false;\n            }, 1500);\n        };\n        if (navigator.clipboard && navigator.clipboard.writeText) {\n            navigator.clipboard.writeText(text).then(done, done);\n        } else {\n            done();\n        }\n    }\n}\n",
        "css": ".ui-copybtn {\n    display: inline-flex;\n    align-items: center;\n    gap: 6px;\n    height: 30px;\n    padding: 0 12px;\n    border: 1px solid #c9c9c9;\n    border-radius: 6px;\n    background: #ffffff;\n    color: #444444;\n    font-size: 0.8rem;\n    font-weight: 600;\n    cursor: pointer;\n    font-family: inherit;\n    transition: background 0.12s ease, color 0.12s ease, border-color 0.12s ease;\n}\n.ui-copybtn:hover {\n    background: #f3f3f3;\n}\n.ui-copybtn_done {\n    border-color: #2e844a;\n    color: #1d7a3f;\n    background: #e6f4ea;\n}\n.ui-copybtn__icon {\n    font-size: 0.85rem;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Copy Button</masterLabel>\n    <description>汎用コピーボタン。クリップボードへコピーし copy イベントを発火。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiSplitButton",
      "title": "UI Split Button",
      "icon": "🎛️",
      "category": "アクション",
      "demo": "splitbutton",
      "description": "主ボタン（click）と付随メニュー（items から生成、select）を持つ分割ボタン。外側クリックで閉じる。",
      "props": [
        {
          "name": "label",
          "type": "String",
          "def": "—",
          "desc": "主ボタンのラベル"
        },
        {
          "name": "items",
          "type": "Array",
          "def": "[]",
          "desc": "[{ label, value }] の配列"
        }
      ],
      "events": [
        {
          "name": "click",
          "desc": "主ボタン押下時に発火"
        },
        {
          "name": "select",
          "desc": "メニュー選択時に発火（detail.value）"
        }
      ],
      "usage": "<c-ui-split-button label=\"保存\" items={menu} onclick={handleSave} onselect={handleMenu}></c-ui-split-button>",
      "ja": "分割ボタン",
      "files": {
        "html": "<template>\n    <div class=\"ui-splitbtn\" onfocusout={handleFocusOut}>\n        <button class=\"ui-splitbtn__main\" type=\"button\" onclick={handleMain}>\n            {label}\n        </button>\n        <button\n            class=\"ui-splitbtn__toggle\"\n            type=\"button\"\n            aria-haspopup=\"true\"\n            aria-expanded={open}\n            onclick={handleToggle}\n        >\n            ▾\n        </button>\n        <ul lwc:if={open} class=\"ui-splitbtn__menu\" role=\"menu\">\n            <template for:each={items} for:item=\"item\">\n                <li key={item.value} role=\"none\">\n                    <button\n                        class=\"ui-splitbtn__item\"\n                        type=\"button\"\n                        role=\"menuitem\"\n                        data-value={item.value}\n                        onclick={handleSelect}\n                    >\n                        {item.label}\n                    </button>\n                </li>\n            </template>\n        </ul>\n    </div>\n</template>\n",
        "js": "import { LightningElement, api, track } from 'lwc';\n\n/**\n * uiSplitButton — 汎用分割ボタン。\n * 主ボタン（click イベント）と付随メニュー（items から生成、select イベント）を持つ。\n * 外側へフォーカスが外れるとメニューを閉じる。\n */\nexport default class UiSplitButton extends LightningElement {\n    _items = [];\n\n    /** 主ボタンのラベル */\n    @api label;\n    /** [{ label, value }] の配列 */\n    @api\n    get items() {\n        return this._items;\n    }\n    set items(value) {\n        this._items = Array.isArray(value) ? value : [];\n    }\n\n    @track open = false;\n\n    handleMain() {\n        this.dispatchEvent(new CustomEvent('click'));\n    }\n\n    handleToggle() {\n        this.open = !this.open;\n    }\n\n    handleSelect(event) {\n        const value = event.currentTarget.dataset.value;\n        this.open = false;\n        this.dispatchEvent(new CustomEvent('select', { detail: { value } }));\n    }\n\n    handleFocusOut(event) {\n        if (\n            this.open &&\n            (!event.relatedTarget ||\n                !event.currentTarget.contains(event.relatedTarget))\n        ) {\n            this.open = false;\n        }\n    }\n}\n",
        "css": ".ui-splitbtn {\n    position: relative;\n    display: inline-flex;\n}\n.ui-splitbtn__main {\n    height: 32px;\n    padding: 0 14px;\n    border: 1px solid #0176d3;\n    border-right: none;\n    border-radius: 6px 0 0 6px;\n    background: #0176d3;\n    color: #ffffff;\n    font-size: 0.8125rem;\n    font-weight: 600;\n    cursor: pointer;\n    font-family: inherit;\n}\n.ui-splitbtn__main:hover {\n    background: #014486;\n}\n.ui-splitbtn__toggle {\n    width: 30px;\n    height: 32px;\n    border: 1px solid #0176d3;\n    border-radius: 0 6px 6px 0;\n    background: #0176d3;\n    color: #ffffff;\n    cursor: pointer;\n    font-size: 0.7rem;\n    border-left: 1px solid rgba(255, 255, 255, 0.4);\n}\n.ui-splitbtn__toggle:hover {\n    background: #014486;\n}\n.ui-splitbtn__menu {\n    position: absolute;\n    top: calc(100% + 4px);\n    right: 0;\n    min-width: 170px;\n    margin: 0;\n    padding: 4px;\n    list-style: none;\n    background: #ffffff;\n    border: 1px solid #e5e5e5;\n    border-radius: 8px;\n    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);\n    z-index: 20;\n}\n.ui-splitbtn__item {\n    display: block;\n    width: 100%;\n    text-align: left;\n    border: none;\n    background: transparent;\n    padding: 8px 12px;\n    font-size: 0.82rem;\n    color: #181818;\n    border-radius: 6px;\n    cursor: pointer;\n    font-family: inherit;\n}\n.ui-splitbtn__item:hover {\n    background: #f3f9ff;\n    color: #0176d3;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Split Button</masterLabel>\n    <description>汎用分割ボタン。主アクション click と付随メニュー select を発火。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiRibbon",
      "title": "UI Ribbon",
      "icon": "🎀",
      "category": "表示",
      "demo": "ribbon",
      "description": "default スロットの要素の右上隅に斜めのリボンラベルを重ねる。4 色に対応。",
      "props": [
        {
          "name": "label",
          "type": "String",
          "def": "—",
          "desc": "リボンのテキスト"
        },
        {
          "name": "color",
          "type": "String",
          "def": "'brand'",
          "desc": "brand | success | warning | error"
        }
      ],
      "slots": [
        {
          "name": "(default)",
          "desc": "リボンを重ねる要素"
        }
      ],
      "events": [],
      "usage": "<c-ui-ribbon label=\"NEW\">\n    <c-ui-card title=\"商品\">...</c-ui-card>\n</c-ui-ribbon>",
      "ja": "リボン",
      "files": {
        "html": "<template>\n    <div class=\"ui-ribbon-wrap\">\n        <span class={ribbonClass}>{label}</span>\n        <slot></slot>\n    </div>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\nconst COLORS = ['brand', 'success', 'warning', 'error'];\n\n/**\n * uiRibbon — 汎用コーナーリボン。\n * default スロットの要素（カード等）の右上隅に斜めのリボンラベルを重ねる。\n */\nexport default class UiRibbon extends LightningElement {\n    /** リボンに表示するテキスト */\n    @api label;\n    /** 色: brand | success | warning | error */\n    @api color = 'brand';\n\n    get ribbonClass() {\n        const color = COLORS.includes(this.color) ? this.color : 'brand';\n        return `ui-ribbon ui-ribbon_${color}`;\n    }\n}\n",
        "css": ".ui-ribbon-wrap {\n    position: relative;\n    overflow: hidden;\n    display: inline-block;\n}\n.ui-ribbon {\n    position: absolute;\n    top: 12px;\n    right: -34px;\n    width: 130px;\n    transform: rotate(45deg);\n    text-align: center;\n    font-size: 0.68rem;\n    font-weight: 700;\n    color: #ffffff;\n    padding: 3px 0;\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);\n    z-index: 2;\n}\n.ui-ribbon_brand {\n    background: #0176d3;\n}\n.ui-ribbon_success {\n    background: #2e844a;\n}\n.ui-ribbon_warning {\n    background: #dd7a01;\n}\n.ui-ribbon_error {\n    background: #ba0517;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Ribbon</masterLabel>\n    <description>汎用コーナーリボン。スロット要素の隅に斜めラベルを重ねる。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiDateField",
      "title": "UI Date Field",
      "icon": "📆",
      "category": "フォーム",
      "demo": "datefield",
      "description": "ラベル付きの日付入力。変更時に change イベント (detail.value) を発火。",
      "props": [
        {
          "name": "label",
          "type": "String",
          "def": "—",
          "desc": "ラベル"
        },
        {
          "name": "value",
          "type": "String",
          "def": "''",
          "desc": "値（YYYY-MM-DD）"
        },
        {
          "name": "disabled",
          "type": "Boolean",
          "def": "false",
          "desc": "true で無効化"
        }
      ],
      "events": [
        {
          "name": "change",
          "desc": "変更時に発火（detail.value）"
        }
      ],
      "usage": "<c-ui-date-field label=\"締切日\" onchange={handleChange}></c-ui-date-field>",
      "ja": "日付フィールド",
      "files": {
        "html": "<template>\n    <div class=\"ui-datefield\">\n        <label lwc:if={label} class=\"ui-datefield__label\">{label}</label>\n        <input\n            type=\"date\"\n            class=\"ui-datefield__input\"\n            value={value}\n            disabled={disabled}\n            onchange={handleChange}\n        />\n    </div>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\n/**\n * uiDateField — 汎用日付フィールド。\n * ラベル付きの日付入力。変更時に change イベント (detail.value) を発火する。\n */\nexport default class UiDateField extends LightningElement {\n    /** ラベル */\n    @api label;\n    /** 値（YYYY-MM-DD） */\n    @api value = '';\n    /** true で無効化 */\n    @api disabled = false;\n\n    handleChange(event) {\n        this.value = event.target.value;\n        this.dispatchEvent(\n            new CustomEvent('change', { detail: { value: this.value } })\n        );\n    }\n}\n",
        "css": ".ui-datefield {\n    display: flex;\n    flex-direction: column;\n    gap: 4px;\n}\n.ui-datefield__label {\n    font-size: 0.78rem;\n    font-weight: 600;\n    color: #444444;\n}\n.ui-datefield__input {\n    height: 34px;\n    padding: 0 12px;\n    border: 1px solid #c9c9c9;\n    border-radius: 6px;\n    font-size: 0.875rem;\n    color: #181818;\n    background: #ffffff;\n    font-family: inherit;\n}\n.ui-datefield__input:focus {\n    outline: none;\n    border-color: #0176d3;\n    box-shadow: 0 0 0 2px rgba(1, 118, 211, 0.25);\n}\n.ui-datefield__input:disabled {\n    background: #f3f3f3;\n    color: #969492;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Date Field</masterLabel>\n    <description>汎用日付フィールド。ラベル付き日付入力で change イベントを発火。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiSegmentedProgress",
      "title": "UI Segmented Progress",
      "icon": "🔲",
      "category": "フィードバック",
      "demo": "segmentedprogress",
      "description": "total 個のセグメントのうち current 個を塗りつぶす段階的な進捗インジケータ。",
      "props": [
        {
          "name": "total",
          "type": "Number",
          "def": "5",
          "desc": "セグメント総数"
        },
        {
          "name": "current",
          "type": "Number",
          "def": "0",
          "desc": "塗りつぶす数"
        },
        {
          "name": "variant",
          "type": "String",
          "def": "'brand'",
          "desc": "brand | success | warning | error"
        }
      ],
      "events": [],
      "usage": "<c-ui-segmented-progress total=\"5\" current=\"3\"></c-ui-segmented-progress>",
      "ja": "セグメント進捗",
      "files": {
        "html": "<template>\n    <div class=\"ui-segprog\">\n        <template for:each={segments} for:item=\"seg\">\n            <span key={seg.key} class={seg.cssClass}></span>\n        </template>\n    </div>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\nconst VARIANTS = ['brand', 'success', 'warning', 'error'];\n\n/**\n * uiSegmentedProgress — 汎用セグメント進捗。\n * total 個のセグメントのうち current 個を塗りつぶして段階的な進捗を表す。\n */\nexport default class UiSegmentedProgress extends LightningElement {\n    /** セグメント総数 */\n    @api total = 5;\n    /** 塗りつぶす数 */\n    @api current = 0;\n    /** 色: brand | success | warning | error */\n    @api variant = 'brand';\n\n    get segments() {\n        const total = Math.max(1, Number(this.total) || 1);\n        const cur = Math.max(0, Number(this.current) || 0);\n        const variant = VARIANTS.includes(this.variant) ? this.variant : 'brand';\n        const list = [];\n        for (let i = 0; i < total; i += 1) {\n            const filled = i < cur;\n            list.push({\n                key: i,\n                cssClass: filled\n                    ? `ui-segprog__seg ui-segprog__seg_filled ui-segprog__seg_${variant}`\n                    : 'ui-segprog__seg'\n            });\n        }\n        return list;\n    }\n}\n",
        "css": ".ui-segprog {\n    display: flex;\n    gap: 5px;\n    width: 100%;\n}\n.ui-segprog__seg {\n    flex: 1;\n    height: 8px;\n    border-radius: 4px;\n    background: #e5e5e5;\n    transition: background 0.2s ease;\n}\n.ui-segprog__seg_brand {\n    background: #0176d3;\n}\n.ui-segprog__seg_success {\n    background: #2e844a;\n}\n.ui-segprog__seg_warning {\n    background: #dd7a01;\n}\n.ui-segprog__seg_error {\n    background: #ba0517;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Segmented Progress</masterLabel>\n    <description>汎用セグメント進捗。total中current個を塗りつぶし段階を表示。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiTree",
      "title": "UI Tree",
      "icon": "🌳",
      "category": "ナビゲーション",
      "demo": "tree",
      "description": "nodes 配列（親に children を持つ 2 階層）を折りたたみ表示。ノード選択で select イベント (detail.value) を発火。",
      "props": [
        {
          "name": "nodes",
          "type": "Array",
          "def": "[]",
          "desc": "[{ label, value, children: [{ label, value }] }] の配列"
        }
      ],
      "events": [
        {
          "name": "select",
          "desc": "ノード選択時に発火（detail.value）"
        }
      ],
      "usage": "<c-ui-tree nodes={tree} onselect={handleSelect}></c-ui-tree>",
      "ja": "ツリー",
      "files": {
        "html": "<template>\n    <ul class=\"ui-tree\">\n        <template for:each={computedNodes} for:item=\"node\">\n            <li key={node.key} class=\"ui-tree__item\">\n                <button\n                    class=\"ui-tree__node\"\n                    type=\"button\"\n                    data-value={node.value}\n                    onclick={handleParent}\n                >\n                    <span lwc:if={node.hasChildren} class=\"ui-tree__caret\">{node.caret}</span>\n                    <span lwc:else class=\"ui-tree__caret ui-tree__caret_leaf\">•</span>\n                    <span class=\"ui-tree__label\">{node.label}</span>\n                </button>\n                <ul lwc:if={node.isOpen} class=\"ui-tree__children\">\n                    <template for:each={node.children} for:item=\"child\">\n                        <li key={child.value} class=\"ui-tree__item\">\n                            <button\n                                class=\"ui-tree__node ui-tree__node_child\"\n                                type=\"button\"\n                                data-value={child.value}\n                                onclick={handleChild}\n                            >\n                                <span class=\"ui-tree__label\">{child.label}</span>\n                            </button>\n                        </li>\n                    </template>\n                </ul>\n            </li>\n        </template>\n    </ul>\n</template>\n",
        "js": "import { LightningElement, api, track } from 'lwc';\n\n/**\n * uiTree — 汎用ツリー（2 階層）。\n * nodes 配列 ([{ label, value, children: [{ label, value }] }]) を\n * 折りたたみ可能なツリーで表示し、ノード選択時に select イベント\n * (detail.value) を発火する。\n */\nexport default class UiTree extends LightningElement {\n    _nodes = [];\n\n    /** [{ label, value, children }] の配列 */\n    @api\n    get nodes() {\n        return this._nodes;\n    }\n    set nodes(value) {\n        this._nodes = Array.isArray(value) ? value : [];\n    }\n\n    @track expanded = [];\n\n    get computedNodes() {\n        return this._nodes.map((n, i) => {\n            const hasChildren = Array.isArray(n.children) && n.children.length > 0;\n            const isOpen = this.expanded.includes(n.value);\n            return {\n                key: i,\n                label: n.label,\n                value: n.value,\n                hasChildren,\n                isOpen,\n                caret: isOpen ? '▾' : '▸',\n                children: isOpen && hasChildren ? n.children : []\n            };\n        });\n    }\n\n    toggle(value) {\n        this.expanded = this.expanded.includes(value)\n            ? this.expanded.filter((v) => v !== value)\n            : [...this.expanded, value];\n    }\n\n    handleParent(event) {\n        const value = event.currentTarget.dataset.value;\n        const node = this._nodes.find((n) => n.value === value);\n        if (node && Array.isArray(node.children) && node.children.length) {\n            this.toggle(value);\n        }\n        this.dispatchEvent(new CustomEvent('select', { detail: { value } }));\n    }\n\n    handleChild(event) {\n        const value = event.currentTarget.dataset.value;\n        this.dispatchEvent(new CustomEvent('select', { detail: { value } }));\n    }\n}\n",
        "css": ".ui-tree {\n    list-style: none;\n    margin: 0;\n    padding: 0;\n    font-size: 0.85rem;\n}\n\n.ui-tree__children {\n    list-style: none;\n    margin: 0;\n    padding: 0 0 0 22px;\n}\n\n.ui-tree__node {\n    display: flex;\n    align-items: center;\n    gap: 6px;\n    width: 100%;\n    border: none;\n    background: transparent;\n    padding: 6px 8px;\n    border-radius: 6px;\n    cursor: pointer;\n    text-align: left;\n    color: #181818;\n    font-family: inherit;\n    font-size: inherit;\n}\n.ui-tree__node:hover {\n    background: #f3f9ff;\n    color: #0176d3;\n}\n\n.ui-tree__node_child {\n    color: #514f4d;\n}\n\n.ui-tree__caret {\n    display: inline-flex;\n    justify-content: center;\n    width: 14px;\n    font-size: 0.7rem;\n    color: #706e6b;\n}\n.ui-tree__caret_leaf {\n    color: #c9c9c9;\n}\n\n.ui-tree__label {\n    flex: 1;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Tree</masterLabel>\n    <description>汎用ツリー（2階層）。折りたたみ表示し select イベントを発火。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiCalendar",
      "title": "UI Calendar",
      "icon": "🗓️",
      "category": "表示",
      "demo": "calendar",
      "description": "year / month の月間カレンダー。日付クリックで select イベント (detail.{year,month,day}) を発火。省略時は今月。",
      "props": [
        {
          "name": "year",
          "type": "Number",
          "def": "今年",
          "desc": "表示する年"
        },
        {
          "name": "month",
          "type": "Number",
          "def": "今月",
          "desc": "表示する月（1〜12）"
        },
        {
          "name": "selected",
          "type": "Number",
          "def": "—",
          "desc": "選択中の日"
        }
      ],
      "events": [
        {
          "name": "select",
          "desc": "日付クリックで発火（detail.{year,month,day}）"
        }
      ],
      "usage": "<c-ui-calendar year=\"2026\" month=\"6\" onselect={handleSelect}></c-ui-calendar>",
      "ja": "カレンダー",
      "files": {
        "html": "<template>\n    <div class=\"ui-cal\">\n        <div class=\"ui-cal__header\">{title}</div>\n        <div class=\"ui-cal__grid\">\n            <template for:each={weekdays} for:item=\"wd\">\n                <span key={wd.key} class=\"ui-cal__wd\">{wd.label}</span>\n            </template>\n        </div>\n        <template for:each={weeks} for:item=\"week\">\n            <div key={week.key} class=\"ui-cal__grid\">\n                <template for:each={week.days} for:item=\"cell\">\n                    <span lwc:if={cell.blank} key={cell.key} class=\"ui-cal__blank\"></span>\n                    <button\n                        lwc:else\n                        key={cell.key}\n                        class={cell.cssClass}\n                        type=\"button\"\n                        data-day={cell.day}\n                        onclick={handleDay}\n                    >\n                        {cell.day}\n                    </button>\n                </template>\n            </div>\n        </template>\n    </div>\n</template>\n",
        "js": "import { LightningElement, api, track } from 'lwc';\n\nconst WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土'];\n\n/**\n * uiCalendar — 汎用月間カレンダー。\n * year / month（1〜12）の月を表示し、日付クリックで select イベント\n * (detail.{ year, month, day }) を発火する。省略時は現在の月を表示。\n */\nexport default class UiCalendar extends LightningElement {\n    /** 年（省略時は今年） */\n    @api year;\n    /** 月 1〜12（省略時は今月） */\n    @api month;\n\n    @track _selected;\n\n    /** 選択中の日 */\n    @api\n    get selected() {\n        return this._selected;\n    }\n    set selected(value) {\n        this._selected = value;\n    }\n\n    get computedYear() {\n        return Number(this.year) || new Date().getFullYear();\n    }\n\n    get computedMonth() {\n        return Number(this.month) || new Date().getMonth() + 1;\n    }\n\n    get title() {\n        return `${this.computedYear}年 ${this.computedMonth}月`;\n    }\n\n    get weekdays() {\n        return WEEKDAYS.map((d, i) => ({ key: i, label: d }));\n    }\n\n    get weeks() {\n        const y = this.computedYear;\n        const m = this.computedMonth;\n        const startDow = new Date(y, m - 1, 1).getDay();\n        const daysInMonth = new Date(y, m, 0).getDate();\n        const cells = [];\n        for (let i = 0; i < startDow; i += 1) {\n            cells.push({ key: `b${i}`, blank: true });\n        }\n        for (let d = 1; d <= daysInMonth; d += 1) {\n            const selected = Number(this._selected) === d;\n            cells.push({\n                key: `d${d}`,\n                blank: false,\n                day: d,\n                cssClass: selected\n                    ? 'ui-cal__day ui-cal__day_selected'\n                    : 'ui-cal__day'\n            });\n        }\n        while (cells.length % 7 !== 0) {\n            cells.push({ key: `e${cells.length}`, blank: true });\n        }\n        const weeks = [];\n        for (let i = 0; i < cells.length; i += 7) {\n            weeks.push({ key: i, days: cells.slice(i, i + 7) });\n        }\n        return weeks;\n    }\n\n    handleDay(event) {\n        const day = Number(event.currentTarget.dataset.day);\n        this._selected = day;\n        this.dispatchEvent(\n            new CustomEvent('select', {\n                detail: { year: this.computedYear, month: this.computedMonth, day }\n            })\n        );\n    }\n}\n",
        "css": ".ui-cal {\n    display: inline-block;\n    border: 1px solid #e5e5e5;\n    border-radius: 10px;\n    padding: 12px;\n    background: #ffffff;\n    width: 280px;\n}\n\n.ui-cal__header {\n    text-align: center;\n    font-weight: 700;\n    font-size: 0.9rem;\n    color: #181818;\n    margin-bottom: 10px;\n}\n\n.ui-cal__grid {\n    display: grid;\n    grid-template-columns: repeat(7, 1fr);\n    gap: 2px;\n}\n\n.ui-cal__wd {\n    text-align: center;\n    font-size: 0.7rem;\n    font-weight: 700;\n    color: #706e6b;\n    padding: 4px 0;\n}\n\n.ui-cal__blank {\n    aspect-ratio: 1;\n}\n\n.ui-cal__day {\n    aspect-ratio: 1;\n    border: none;\n    background: transparent;\n    border-radius: 6px;\n    font-size: 0.8rem;\n    color: #181818;\n    cursor: pointer;\n    font-family: inherit;\n}\n.ui-cal__day:hover {\n    background: #f3f9ff;\n    color: #0176d3;\n}\n\n.ui-cal__day_selected {\n    background: #0176d3;\n    color: #ffffff;\n    font-weight: 700;\n}\n.ui-cal__day_selected:hover {\n    background: #014486;\n    color: #ffffff;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Calendar</masterLabel>\n    <description>汎用月間カレンダー。日付クリックで select イベントを発火。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiCarousel",
      "title": "UI Carousel",
      "icon": "🎠",
      "category": "表示",
      "demo": "carousel",
      "description": "slides 配列 ([{ title, text }]) を 1 枚ずつ表示。前後ボタン／ドットで切替え、change イベント (detail.index) を発火。",
      "props": [
        {
          "name": "slides",
          "type": "Array",
          "def": "[]",
          "desc": "[{ title, text }] の配列"
        }
      ],
      "events": [
        {
          "name": "change",
          "desc": "切替時に発火（detail.index）"
        }
      ],
      "usage": "<c-ui-carousel slides={slides} onchange={handleChange}></c-ui-carousel>",
      "ja": "カルーセル",
      "files": {
        "html": "<template>\n    <div lwc:if={hasSlides} class=\"ui-carousel\">\n        <div class=\"ui-carousel__frame\">\n            <button\n                class=\"ui-carousel__nav ui-carousel__nav_prev\"\n                type=\"button\"\n                title=\"前へ\"\n                onclick={handlePrev}\n            >\n                ‹\n            </button>\n            <div class=\"ui-carousel__slide\">\n                <div class=\"ui-carousel__title\">{current.title}</div>\n                <div class=\"ui-carousel__text\">{current.text}</div>\n            </div>\n            <button\n                class=\"ui-carousel__nav ui-carousel__nav_next\"\n                type=\"button\"\n                title=\"次へ\"\n                onclick={handleNext}\n            >\n                ›\n            </button>\n        </div>\n        <div class=\"ui-carousel__dots\">\n            <template for:each={dots} for:item=\"dot\">\n                <button\n                    key={dot.key}\n                    class={dot.cssClass}\n                    type=\"button\"\n                    data-idx={dot.idx}\n                    onclick={handleDot}\n                ></button>\n            </template>\n        </div>\n    </div>\n</template>\n",
        "js": "import { LightningElement, api, track } from 'lwc';\n\n/**\n * uiCarousel — 汎用カルーセル。\n * slides 配列 ([{ title, text }]) を 1 枚ずつ表示し、前後ボタンと\n * ドットで切替える。切替時に change イベント (detail.index) を発火する。\n */\nexport default class UiCarousel extends LightningElement {\n    _slides = [];\n\n    /** [{ title, text }] の配列 */\n    @api\n    get slides() {\n        return this._slides;\n    }\n    set slides(value) {\n        this._slides = Array.isArray(value) ? value : [];\n    }\n\n    @track index = 0;\n\n    get current() {\n        return this._slides[this.index] || {};\n    }\n\n    get dots() {\n        return this._slides.map((s, i) => ({\n            key: i,\n            idx: i,\n            cssClass:\n                i === this.index\n                    ? 'ui-carousel__dot ui-carousel__dot_active'\n                    : 'ui-carousel__dot'\n        }));\n    }\n\n    get hasSlides() {\n        return this._slides.length > 0;\n    }\n\n    emit() {\n        this.dispatchEvent(\n            new CustomEvent('change', { detail: { index: this.index } })\n        );\n    }\n\n    handlePrev() {\n        const n = this._slides.length;\n        if (n) {\n            this.index = (this.index - 1 + n) % n;\n            this.emit();\n        }\n    }\n\n    handleNext() {\n        const n = this._slides.length;\n        if (n) {\n            this.index = (this.index + 1) % n;\n            this.emit();\n        }\n    }\n\n    handleDot(event) {\n        this.index = Number(event.currentTarget.dataset.idx);\n        this.emit();\n    }\n}\n",
        "css": ".ui-carousel {\n    width: 100%;\n    max-width: 420px;\n}\n\n.ui-carousel__frame {\n    display: flex;\n    align-items: stretch;\n    border: 1px solid #e5e5e5;\n    border-radius: 10px;\n    overflow: hidden;\n    background: #ffffff;\n}\n\n.ui-carousel__nav {\n    width: 40px;\n    border: none;\n    background: #fafaf9;\n    color: #514f4d;\n    font-size: 1.4rem;\n    cursor: pointer;\n    flex-shrink: 0;\n}\n.ui-carousel__nav:hover {\n    background: #eef4ff;\n    color: #0176d3;\n}\n\n.ui-carousel__slide {\n    flex: 1;\n    padding: 24px 18px;\n    text-align: center;\n    min-height: 96px;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    gap: 6px;\n}\n\n.ui-carousel__title {\n    font-size: 1rem;\n    font-weight: 700;\n    color: #181818;\n}\n\n.ui-carousel__text {\n    font-size: 0.85rem;\n    color: #514f4d;\n    line-height: 1.5;\n}\n\n.ui-carousel__dots {\n    display: flex;\n    justify-content: center;\n    gap: 6px;\n    margin-top: 10px;\n}\n\n.ui-carousel__dot {\n    width: 8px;\n    height: 8px;\n    border-radius: 50%;\n    border: none;\n    background: #c9c9c9;\n    cursor: pointer;\n    padding: 0;\n}\n.ui-carousel__dot_active {\n    background: #0176d3;\n    width: 20px;\n    border-radius: 4px;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Carousel</masterLabel>\n    <description>汎用カルーセル。スライドを前後ボタン/ドットで切替え change を発火。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiAvatarGroup",
      "title": "UI Avatar Group",
      "icon": "👥",
      "category": "表示",
      "demo": "avatargroup",
      "description": "people 配列を重ねて表示し、max を超える分を「+N」で集約するアバターグループ。",
      "props": [
        {
          "name": "people",
          "type": "Array",
          "def": "[]",
          "desc": "[{ name, src }] の配列"
        },
        {
          "name": "max",
          "type": "Number",
          "def": "4",
          "desc": "表示する最大人数"
        }
      ],
      "events": [],
      "usage": "<c-ui-avatar-group people={members} max=\"4\"></c-ui-avatar-group>",
      "ja": "アバターグループ",
      "files": {
        "html": "<template>\n    <div class=\"ui-avgroup\">\n        <template for:each={visible} for:item=\"person\">\n            <span key={person.key} class=\"ui-avgroup__item\" title={person.name}>\n                <img\n                    lwc:if={person.hasImage}\n                    src={person.src}\n                    alt={person.name}\n                    class=\"ui-avgroup__img\"\n                />\n                <span lwc:else class=\"ui-avgroup__initials\">{person.initials}</span>\n            </span>\n        </template>\n        <span lwc:if={hasOverflow} class=\"ui-avgroup__item ui-avgroup__more\">\n            {overflowText}\n        </span>\n    </div>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\nfunction toInitials(name) {\n    const t = (name || '').trim();\n    if (!t) {\n        return '?';\n    }\n    const p = t.split(/\\s+/);\n    return p.length === 1\n        ? p[0].slice(0, 2).toUpperCase()\n        : (p[0][0] + p[1][0]).toUpperCase();\n}\n\n/**\n * uiAvatarGroup — 汎用アバターグループ。\n * people 配列 ([{ name, src }]) を重ねて表示し、max を超える分は「+N」で集約する。\n */\nexport default class UiAvatarGroup extends LightningElement {\n    _people = [];\n\n    /** [{ name, src }] の配列 */\n    @api\n    get people() {\n        return this._people;\n    }\n    set people(value) {\n        this._people = Array.isArray(value) ? value : [];\n    }\n\n    /** 表示する最大人数 */\n    @api max = 4;\n\n    get visible() {\n        const max = Number(this.max) || 4;\n        return this._people.slice(0, max).map((p, i) => ({\n            key: i,\n            name: p.name,\n            src: p.src,\n            hasImage: !!p.src,\n            initials: toInitials(p.name)\n        }));\n    }\n\n    get overflow() {\n        const o = this._people.length - (Number(this.max) || 4);\n        return o > 0 ? o : 0;\n    }\n\n    get hasOverflow() {\n        return this.overflow > 0;\n    }\n\n    get overflowText() {\n        return `+${this.overflow}`;\n    }\n}\n",
        "css": ".ui-avgroup {\n    display: inline-flex;\n    align-items: center;\n}\n\n.ui-avgroup__item {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    width: 34px;\n    height: 34px;\n    border-radius: 50%;\n    background: #0176d3;\n    color: #ffffff;\n    font-size: 0.75rem;\n    font-weight: 700;\n    border: 2px solid #ffffff;\n    overflow: hidden;\n    flex-shrink: 0;\n}\n\n.ui-avgroup__item + .ui-avgroup__item {\n    margin-left: -10px;\n}\n\n.ui-avgroup__img {\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n}\n\n.ui-avgroup__more {\n    background: #e5e5e5;\n    color: #514f4d;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Avatar Group</masterLabel>\n    <description>汎用アバターグループ。複数アバターを重ね、超過分を+Nで集約。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiCodeBlock",
      "title": "UI Code Block",
      "icon": "💻",
      "category": "表示",
      "demo": "codeblock",
      "description": "コードを等幅で表示し、コピーボタンでクリップボードへコピーする。copy イベントを発火。",
      "props": [
        {
          "name": "code",
          "type": "String",
          "def": "''",
          "desc": "表示するコード"
        },
        {
          "name": "label",
          "type": "String",
          "def": "'CODE'",
          "desc": "言語ラベル"
        }
      ],
      "events": [
        {
          "name": "copy",
          "desc": "コピー時に発火"
        }
      ],
      "usage": "<c-ui-code-block code={snippet} label=\"JS\"></c-ui-code-block>",
      "ja": "コードブロック",
      "files": {
        "html": "<template>\n    <div class=\"ui-codeblock\">\n        <div class=\"ui-codeblock__bar\">\n            <span class=\"ui-codeblock__label\">{label}</span>\n            <button class=\"ui-codeblock__copy\" type=\"button\" onclick={handleCopy}>\n                {copyLabel}\n            </button>\n        </div>\n        <pre class=\"ui-codeblock__pre\"><code>{code}</code></pre>\n    </div>\n</template>\n",
        "js": "import { LightningElement, api, track } from 'lwc';\n\n/**\n * uiCodeBlock — 汎用コードブロック。\n * code をシンタックス色なしの等幅で表示し、コピーボタンでクリップボードへコピーする。\n * コピー時に copy イベントを発火する。\n */\nexport default class UiCodeBlock extends LightningElement {\n    /** 表示するコード */\n    @api code = '';\n    /** 言語ラベル（例: JS, Apex） */\n    @api label = 'CODE';\n\n    @track copied = false;\n    _timer;\n\n    get copyLabel() {\n        return this.copied ? '✓ コピー済み' : '📋 コピー';\n    }\n\n    handleCopy() {\n        const text = this.code || '';\n        const done = () => {\n            this.copied = true;\n            this.dispatchEvent(new CustomEvent('copy'));\n            if (this._timer) {\n                clearTimeout(this._timer);\n            }\n            // eslint-disable-next-line @lwc/lwc/no-async-operation\n            this._timer = setTimeout(() => {\n                this.copied = false;\n            }, 1500);\n        };\n        if (navigator.clipboard && navigator.clipboard.writeText) {\n            navigator.clipboard.writeText(text).then(done, done);\n        } else {\n            done();\n        }\n    }\n}\n",
        "css": ".ui-codeblock {\n    border-radius: 8px;\n    overflow: hidden;\n    background: #1b1f27;\n    width: 100%;\n}\n\n.ui-codeblock__bar {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    padding: 6px 10px;\n    background: rgba(255, 255, 255, 0.06);\n    border-bottom: 1px solid rgba(255, 255, 255, 0.08);\n}\n\n.ui-codeblock__label {\n    font-size: 0.7rem;\n    font-weight: 700;\n    letter-spacing: 0.05em;\n    color: #b8c0cc;\n}\n\n.ui-codeblock__copy {\n    border: 1px solid rgba(255, 255, 255, 0.18);\n    background: rgba(255, 255, 255, 0.06);\n    color: #e6edf3;\n    font-size: 0.72rem;\n    padding: 3px 9px;\n    border-radius: 6px;\n    cursor: pointer;\n    font-family: inherit;\n}\n.ui-codeblock__copy:hover {\n    background: rgba(255, 255, 255, 0.16);\n}\n\n.ui-codeblock__pre {\n    margin: 0;\n    padding: 12px 14px;\n    overflow-x: auto;\n    color: #e6edf3;\n    font-family: 'SFMono-Regular', Consolas, monospace;\n    font-size: 0.78rem;\n    line-height: 1.6;\n    white-space: pre;\n    tab-size: 4;\n}\n\n/* 内側の <code> は素のまま（地の background/padding を打ち消す） */\n.ui-codeblock__pre code {\n    background: transparent;\n    color: inherit;\n    padding: 0;\n    border-radius: 0;\n    font: inherit;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Code Block</masterLabel>\n    <description>汎用コードブロック。等幅表示とコピーボタン（copy イベント）を備える。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiVerticalSteps",
      "title": "UI Vertical Steps",
      "icon": "🪜",
      "category": "ナビゲーション",
      "demo": "verticalsteps",
      "description": "steps 配列 ([{ label, description }]) を縦並びで表示し、current までを色分けする。",
      "props": [
        {
          "name": "steps",
          "type": "Array",
          "def": "[]",
          "desc": "[{ label, description }] の配列"
        },
        {
          "name": "current",
          "type": "Number",
          "def": "1",
          "desc": "現在ステップ（1 始まり）"
        }
      ],
      "events": [],
      "usage": "<c-ui-vertical-steps steps={steps} current=\"2\"></c-ui-vertical-steps>",
      "ja": "縦ステップ",
      "files": {
        "html": "<template>\n    <ol class=\"ui-vsteps\">\n        <template for:each={computedSteps} for:item=\"step\">\n            <li key={step.key} class={step.itemClass}>\n                <span class=\"ui-vsteps__marker\">{step.marker}</span>\n                <div class=\"ui-vsteps__content\">\n                    <span class=\"ui-vsteps__label\">{step.label}</span>\n                    <span lwc:if={step.hasDescription} class=\"ui-vsteps__desc\">\n                        {step.description}\n                    </span>\n                </div>\n            </li>\n        </template>\n    </ol>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\n/**\n * uiVerticalSteps — 汎用縦型ステップ。\n * steps 配列 ([{ label, description }]) を縦並びで表示し、\n * current（1 始まり）までを完了/現在/未到達で色分けする。\n */\nexport default class UiVerticalSteps extends LightningElement {\n    _steps = [];\n\n    /** [{ label, description }] の配列 */\n    @api\n    get steps() {\n        return this._steps;\n    }\n    set steps(value) {\n        this._steps = Array.isArray(value) ? value : [];\n    }\n\n    /** 現在ステップ（1 始まり） */\n    @api current = 1;\n\n    get computedSteps() {\n        const cur = Number(this.current);\n        return this._steps.map((step, index) => {\n            const num = index + 1;\n            let state = 'upcoming';\n            if (num < cur) {\n                state = 'complete';\n            } else if (num === cur) {\n                state = 'active';\n            }\n            return {\n                key: index,\n                label: step.label,\n                description: step.description,\n                hasDescription: !!step.description,\n                marker: state === 'complete' ? '✓' : String(num),\n                itemClass: `ui-vsteps__item ui-vsteps__item_${state}`\n            };\n        });\n    }\n}\n",
        "css": ".ui-vsteps {\n    list-style: none;\n    margin: 0;\n    padding: 0;\n}\n\n.ui-vsteps__item {\n    position: relative;\n    display: flex;\n    gap: 12px;\n    padding: 0 0 18px 0;\n}\n\n/* 縦の接続線 */\n.ui-vsteps__item::before {\n    content: '';\n    position: absolute;\n    left: 13px;\n    top: 28px;\n    bottom: -4px;\n    width: 2px;\n    background: #dddbda;\n}\n.ui-vsteps__item:last-child::before {\n    display: none;\n}\n\n.ui-vsteps__marker {\n    position: relative;\n    z-index: 1;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    width: 28px;\n    height: 28px;\n    border-radius: 50%;\n    border: 2px solid #dddbda;\n    background: #ffffff;\n    color: #706e6b;\n    font-size: 0.8rem;\n    font-weight: 700;\n    flex-shrink: 0;\n}\n\n.ui-vsteps__content {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n    padding-top: 3px;\n}\n\n.ui-vsteps__label {\n    font-size: 0.875rem;\n    font-weight: 700;\n    color: #181818;\n}\n\n.ui-vsteps__desc {\n    font-size: 0.8rem;\n    color: #706e6b;\n    line-height: 1.5;\n}\n\n.ui-vsteps__item_complete::before {\n    background: #2e844a;\n}\n.ui-vsteps__item_complete .ui-vsteps__marker {\n    border-color: #2e844a;\n    background: #2e844a;\n    color: #ffffff;\n}\n\n.ui-vsteps__item_active .ui-vsteps__marker {\n    border-color: #0176d3;\n    color: #0176d3;\n    box-shadow: 0 0 0 3px rgba(1, 118, 211, 0.18);\n}\n.ui-vsteps__item_active .ui-vsteps__label {\n    color: #0176d3;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Vertical Steps</masterLabel>\n    <description>汎用縦型ステップ。説明付きで完了/現在/未到達を色分け表示。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiTagInput",
      "title": "UI Tag Input",
      "icon": "🔖",
      "category": "フォーム",
      "demo": "taginput",
      "description": "Enter でタグを追加し ×（または Backspace）で削除する入力。変更時に change イベント (detail.tags) を発火。",
      "props": [
        {
          "name": "tags",
          "type": "Array",
          "def": "[]",
          "desc": "タグ文字列の配列"
        },
        {
          "name": "placeholder",
          "type": "String",
          "def": "'タグを入力して Enter'",
          "desc": "プレースホルダ"
        }
      ],
      "events": [
        {
          "name": "change",
          "desc": "追加／削除時に発火（detail.tags）"
        }
      ],
      "usage": "<c-ui-tag-input tags={tags} onchange={handleChange}></c-ui-tag-input>",
      "ja": "タグ入力",
      "files": {
        "html": "<template>\n    <div class=\"ui-taginput\">\n        <template for:each={computedTags} for:item=\"tag\">\n            <span key={tag.key} class=\"ui-taginput__tag\">\n                <span class=\"ui-taginput__label\">{tag.label}</span>\n                <button\n                    class=\"ui-taginput__remove\"\n                    type=\"button\"\n                    title=\"削除\"\n                    data-index={tag.key}\n                    onclick={handleRemove}\n                >\n                    &times;\n                </button>\n            </span>\n        </template>\n        <input\n            class=\"ui-taginput__field\"\n            type=\"text\"\n            placeholder={placeholder}\n            onkeydown={handleKeydown}\n        />\n    </div>\n</template>\n",
        "js": "import { LightningElement, api, track } from 'lwc';\n\n/**\n * uiTagInput — 汎用タグ入力。\n * Enter で入力テキストをタグとして追加し、×で削除する。\n * 変更時に change イベント (detail.tags) を発火する。\n */\nexport default class UiTagInput extends LightningElement {\n    @track _tags = [];\n\n    /** タグ文字列の配列 */\n    @api\n    get tags() {\n        return this._tags;\n    }\n    set tags(value) {\n        this._tags = Array.isArray(value) ? [...value] : [];\n    }\n\n    /** プレースホルダ */\n    @api placeholder = 'タグを入力して Enter';\n\n    get computedTags() {\n        return this._tags.map((t, i) => ({ key: i, label: t }));\n    }\n\n    handleKeydown(event) {\n        if (event.key === 'Enter') {\n            event.preventDefault();\n            const value = event.target.value.trim();\n            if (value && !this._tags.includes(value)) {\n                this._tags = [...this._tags, value];\n                this.emit();\n            }\n            event.target.value = '';\n        } else if (\n            event.key === 'Backspace' &&\n            !event.target.value &&\n            this._tags.length\n        ) {\n            this._tags = this._tags.slice(0, -1);\n            this.emit();\n        }\n    }\n\n    handleRemove(event) {\n        const idx = Number(event.currentTarget.dataset.index);\n        this._tags = this._tags.filter((t, i) => i !== idx);\n        this.emit();\n    }\n\n    emit() {\n        this.dispatchEvent(\n            new CustomEvent('change', { detail: { tags: [...this._tags] } })\n        );\n    }\n}\n",
        "css": ".ui-taginput {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: 6px;\n    padding: 6px 8px;\n    border: 1px solid #c9c9c9;\n    border-radius: 6px;\n    background: #ffffff;\n    min-height: 38px;\n}\n.ui-taginput:focus-within {\n    border-color: #0176d3;\n    box-shadow: 0 0 0 2px rgba(1, 118, 211, 0.25);\n}\n\n.ui-taginput__tag {\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    padding: 2px 4px 2px 8px;\n    background: #eef4ff;\n    color: #0b5cab;\n    border-radius: 12px;\n    font-size: 0.78rem;\n    font-weight: 600;\n}\n\n.ui-taginput__remove {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    width: 16px;\n    height: 16px;\n    border: none;\n    border-radius: 50%;\n    background: transparent;\n    color: #0b5cab;\n    font-size: 0.9rem;\n    line-height: 1;\n    cursor: pointer;\n}\n.ui-taginput__remove:hover {\n    background: rgba(1, 92, 171, 0.15);\n}\n\n.ui-taginput__field {\n    flex: 1;\n    min-width: 120px;\n    border: none;\n    outline: none;\n    font-size: 0.85rem;\n    color: #181818;\n    font-family: inherit;\n    padding: 2px;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Tag Input</masterLabel>\n    <description>汎用タグ入力。Enterで追加・×で削除し change イベントを発火。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiSparkline",
      "title": "UI Sparkline",
      "icon": "📈",
      "category": "表示",
      "demo": "sparkline",
      "description": "values 配列の数値を小さな折れ線グラフ（SVG）で表示。末尾にドットを打つ。",
      "props": [
        {
          "name": "values",
          "type": "Array",
          "def": "[]",
          "desc": "数値の配列"
        },
        {
          "name": "color",
          "type": "String",
          "def": "'#0176d3'",
          "desc": "線の色"
        },
        {
          "name": "width",
          "type": "Number",
          "def": "120",
          "desc": "幅(px)"
        },
        {
          "name": "height",
          "type": "Number",
          "def": "36",
          "desc": "高さ(px)"
        }
      ],
      "events": [],
      "usage": "<c-ui-sparkline values={trend} color=\"#2e844a\"></c-ui-sparkline>",
      "ja": "スパークライン",
      "files": {
        "html": "<template>\n    <svg class=\"ui-sparkline\" viewBox={viewBox} width={width} height={height}>\n        <polyline\n            class=\"ui-sparkline__line\"\n            points={points}\n            stroke={color}\n            fill=\"none\"\n        ></polyline>\n        <circle\n            class=\"ui-sparkline__dot\"\n            cx={lastX}\n            cy={lastY}\n            r=\"2.5\"\n            fill={color}\n        ></circle>\n    </svg>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\n/**\n * uiSparkline — 汎用スパークライン。\n * values 配列の数値を小さな折れ線グラフ（SVG）で表示する純粋な表示コンポーネント。\n */\nexport default class UiSparkline extends LightningElement {\n    _values = [];\n\n    /** 数値の配列 */\n    @api\n    get values() {\n        return this._values;\n    }\n    set values(value) {\n        this._values = Array.isArray(value) ? value : [];\n    }\n\n    /** 線の色 */\n    @api color = '#0176d3';\n    /** 幅(px) */\n    @api width = 120;\n    /** 高さ(px) */\n    @api height = 36;\n\n    get coords() {\n        const vals = this._values.map(Number).filter((v) => !Number.isNaN(v));\n        if (!vals.length) {\n            return [];\n        }\n        const max = Math.max(...vals);\n        const min = Math.min(...vals);\n        const range = max - min || 1;\n        const w = Number(this.width) || 120;\n        const h = Number(this.height) || 36;\n        const pad = 3;\n        const denom = Math.max(1, vals.length - 1);\n        const step = (w - pad * 2) / denom;\n        return vals.map((v, i) => ({\n            x: Number((pad + i * step).toFixed(1)),\n            y: Number((pad + (h - pad * 2) * (1 - (v - min) / range)).toFixed(1))\n        }));\n    }\n\n    get points() {\n        return this.coords.map((c) => `${c.x},${c.y}`).join(' ');\n    }\n\n    get last() {\n        const c = this.coords;\n        return c.length ? c[c.length - 1] : { x: 0, y: 0 };\n    }\n\n    get lastX() {\n        return this.last.x;\n    }\n\n    get lastY() {\n        return this.last.y;\n    }\n\n    get viewBox() {\n        return `0 0 ${this.width} ${this.height}`;\n    }\n}\n",
        "css": ".ui-sparkline {\n    display: inline-block;\n    vertical-align: middle;\n}\n\n.ui-sparkline__line {\n    stroke-width: 2;\n    stroke-linecap: round;\n    stroke-linejoin: round;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Sparkline</masterLabel>\n    <description>汎用スパークライン。数値配列を小さな折れ線グラフで表示。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiBarChart",
      "title": "UI Bar Chart",
      "icon": "📊",
      "category": "表示",
      "demo": "barchart",
      "description": "data 配列 ([{ label, value }]) を最大値基準の横棒グラフで表示する。",
      "props": [
        {
          "name": "data",
          "type": "Array",
          "def": "[]",
          "desc": "[{ label, value }] の配列"
        },
        {
          "name": "color",
          "type": "String",
          "def": "'#0176d3'",
          "desc": "バーの色"
        }
      ],
      "events": [],
      "usage": "<c-ui-bar-chart data={sales}></c-ui-bar-chart>",
      "ja": "棒グラフ",
      "files": {
        "html": "<template>\n    <div class=\"ui-barchart\">\n        <template for:each={computedBars} for:item=\"bar\">\n            <div key={bar.key} class=\"ui-barchart__row\">\n                <span class=\"ui-barchart__label\">{bar.label}</span>\n                <div class=\"ui-barchart__track\">\n                    <div class=\"ui-barchart__bar\" style={bar.barStyle}></div>\n                </div>\n                <span class=\"ui-barchart__value\">{bar.value}</span>\n            </div>\n        </template>\n    </div>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\n/**\n * uiBarChart — 汎用横棒グラフ。\n * data 配列 ([{ label, value }]) を、最大値を基準にした横棒で表示する。\n */\nexport default class UiBarChart extends LightningElement {\n    _data = [];\n\n    /** [{ label, value }] の配列 */\n    @api\n    get data() {\n        return this._data;\n    }\n    set data(value) {\n        this._data = Array.isArray(value) ? value : [];\n    }\n\n    /** バーの色 */\n    @api color = '#0176d3';\n\n    get computedBars() {\n        const values = this._data.map((d) => Number(d.value) || 0);\n        const max = Math.max(1, ...values);\n        return this._data.map((d, i) => {\n            const value = Number(d.value) || 0;\n            return {\n                key: i,\n                label: d.label,\n                value,\n                barStyle: `width: ${Math.round((value / max) * 100)}%; background: ${this.color};`\n            };\n        });\n    }\n}\n",
        "css": ".ui-barchart {\n    display: flex;\n    flex-direction: column;\n    gap: 8px;\n    width: 100%;\n}\n\n.ui-barchart__row {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    font-size: 0.8rem;\n}\n\n.ui-barchart__label {\n    width: 84px;\n    flex-shrink: 0;\n    color: #444444;\n    text-align: right;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n\n.ui-barchart__track {\n    flex: 1;\n    height: 14px;\n    background: #f0f0f0;\n    border-radius: 7px;\n    overflow: hidden;\n}\n\n.ui-barchart__bar {\n    height: 100%;\n    border-radius: 7px;\n    transition: width 0.3s ease;\n    min-width: 2px;\n}\n\n.ui-barchart__value {\n    width: 48px;\n    flex-shrink: 0;\n    font-weight: 700;\n    color: #181818;\n    font-variant-numeric: tabular-nums;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Bar Chart</masterLabel>\n    <description>汎用横棒グラフ。data配列を最大値基準の横棒で表示。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiChoiceChips",
      "title": "UI Choice Chips",
      "icon": "🔘",
      "category": "フォーム",
      "demo": "choicechips",
      "description": "options 配列からチップ状の単一選択 UI を生成。選択時に change イベント (detail.value) を発火。",
      "props": [
        {
          "name": "options",
          "type": "Array",
          "def": "[]",
          "desc": "[{ label, value }] の配列"
        },
        {
          "name": "value",
          "type": "String",
          "def": "—",
          "desc": "選択値"
        }
      ],
      "events": [
        {
          "name": "change",
          "desc": "選択時に発火（detail.value）"
        }
      ],
      "usage": "<c-ui-choice-chips options={sizes} value=\"m\" onchange={handleChange}></c-ui-choice-chips>",
      "ja": "選択チップ",
      "files": {
        "html": "<template>\n    <div class=\"ui-chips\">\n        <template for:each={computedChips} for:item=\"chip\">\n            <button\n                key={chip.value}\n                class={chip.cssClass}\n                type=\"button\"\n                data-value={chip.value}\n                onclick={handleSelect}\n            >\n                {chip.label}\n            </button>\n        </template>\n    </div>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\n/**\n * uiChoiceChips — 汎用選択チップ。\n * options 配列 ([{ label, value }]) からチップ状の単一選択 UI を生成し、\n * 選択時に change イベント (detail.value) を発火する。\n */\nexport default class UiChoiceChips extends LightningElement {\n    _options = [];\n\n    /** [{ label, value }] の配列 */\n    @api\n    get options() {\n        return this._options;\n    }\n    set options(value) {\n        this._options = Array.isArray(value) ? value : [];\n    }\n\n    /** 選択値 */\n    @api value;\n\n    get computedChips() {\n        return this._options.map((o) => ({\n            label: o.label,\n            value: o.value,\n            cssClass:\n                String(o.value) === String(this.value)\n                    ? 'ui-chip ui-chip_selected'\n                    : 'ui-chip'\n        }));\n    }\n\n    handleSelect(event) {\n        this.value = event.currentTarget.dataset.value;\n        this.dispatchEvent(\n            new CustomEvent('change', { detail: { value: this.value } })\n        );\n    }\n}\n",
        "css": ".ui-chips {\n    display: inline-flex;\n    flex-wrap: wrap;\n    gap: 8px;\n}\n\n.ui-chip {\n    border: 1px solid #c9c9c9;\n    background: #ffffff;\n    color: #444444;\n    padding: 5px 14px;\n    border-radius: 16px;\n    font-size: 0.8rem;\n    font-weight: 600;\n    cursor: pointer;\n    font-family: inherit;\n    transition: background 0.12s ease, color 0.12s ease, border-color 0.12s ease;\n}\n.ui-chip:hover {\n    border-color: #0176d3;\n    color: #0176d3;\n}\n\n.ui-chip_selected {\n    background: #0176d3;\n    border-color: #0176d3;\n    color: #ffffff;\n}\n.ui-chip_selected:hover {\n    background: #014486;\n    color: #ffffff;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Choice Chips</masterLabel>\n    <description>汎用選択チップ。チップ状の単一選択で change イベントを発火。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiInlineEdit",
      "title": "UI Inline Edit",
      "icon": "✏️",
      "category": "フォーム",
      "demo": "inlineedit",
      "description": "テキストをクリックすると入力に切替わり、Enter／blur で確定、Esc で取消。確定時に change イベント (detail.value) を発火。",
      "props": [
        {
          "name": "value",
          "type": "String",
          "def": "''",
          "desc": "値"
        },
        {
          "name": "placeholder",
          "type": "String",
          "def": "'クリックして編集'",
          "desc": "未入力時の表示"
        }
      ],
      "events": [
        {
          "name": "change",
          "desc": "確定時に発火（detail.value）"
        }
      ],
      "usage": "<c-ui-inline-edit value=\"タイトル\" onchange={handleChange}></c-ui-inline-edit>",
      "ja": "インライン編集",
      "files": {
        "html": "<template>\n    <div class=\"ui-inlineedit\">\n        <input\n            lwc:if={editing}\n            class=\"ui-inlineedit__input\"\n            type=\"text\"\n            value={draft}\n            oninput={handleInput}\n            onkeydown={handleKeydown}\n            onblur={commit}\n        />\n        <button\n            lwc:else\n            class=\"ui-inlineedit__display\"\n            type=\"button\"\n            onclick={startEdit}\n        >\n            <span class={displayClass}>{displayValue}</span>\n            <span class=\"ui-inlineedit__icon\">✏️</span>\n        </button>\n    </div>\n</template>\n",
        "js": "import { LightningElement, api, track } from 'lwc';\n\n/**\n * uiInlineEdit — 汎用インライン編集。\n * 表示テキストをクリックすると入力に切替わり、Enter／フォーカスアウトで確定、\n * Esc で取消す。確定時に change イベント (detail.value) を発火する。\n */\nexport default class UiInlineEdit extends LightningElement {\n    /** 値 */\n    @api value = '';\n    /** 未入力時のプレースホルダ */\n    @api placeholder = 'クリックして編集';\n\n    @track editing = false;\n    @track draft = '';\n\n    get isEmpty() {\n        return !this.value;\n    }\n\n    get displayValue() {\n        return this.value || this.placeholder;\n    }\n\n    get displayClass() {\n        return this.isEmpty\n            ? 'ui-inlineedit__text ui-inlineedit__text_empty'\n            : 'ui-inlineedit__text';\n    }\n\n    startEdit() {\n        this.draft = this.value;\n        this.editing = true;\n    }\n\n    renderedCallback() {\n        if (this.editing) {\n            const input = this.template.querySelector('input');\n            if (input && document.activeElement !== input) {\n                input.focus();\n                input.select();\n            }\n        }\n    }\n\n    handleInput(event) {\n        this.draft = event.target.value;\n    }\n\n    commit() {\n        if (!this.editing) {\n            return;\n        }\n        this.value = this.draft;\n        this.editing = false;\n        this.dispatchEvent(\n            new CustomEvent('change', { detail: { value: this.value } })\n        );\n    }\n\n    cancel() {\n        this.editing = false;\n    }\n\n    handleKeydown(event) {\n        if (event.key === 'Enter') {\n            this.commit();\n        } else if (event.key === 'Escape') {\n            this.cancel();\n        }\n    }\n}\n",
        "css": ".ui-inlineedit {\n    display: inline-block;\n}\n\n.ui-inlineedit__display {\n    display: inline-flex;\n    align-items: center;\n    gap: 8px;\n    border: 1px solid transparent;\n    background: transparent;\n    padding: 5px 8px;\n    border-radius: 6px;\n    cursor: text;\n    font-size: 0.875rem;\n    color: #181818;\n    font-family: inherit;\n}\n.ui-inlineedit__display:hover {\n    background: #f3f3f3;\n    border-color: #e5e5e5;\n}\n\n.ui-inlineedit__text_empty {\n    color: #969492;\n}\n\n.ui-inlineedit__icon {\n    opacity: 0;\n    font-size: 0.8rem;\n    transition: opacity 0.12s ease;\n}\n.ui-inlineedit__display:hover .ui-inlineedit__icon {\n    opacity: 0.6;\n}\n\n.ui-inlineedit__input {\n    padding: 5px 8px;\n    border: 1px solid #0176d3;\n    border-radius: 6px;\n    font-size: 0.875rem;\n    color: #181818;\n    font-family: inherit;\n    outline: none;\n    box-shadow: 0 0 0 2px rgba(1, 118, 211, 0.25);\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Inline Edit</masterLabel>\n    <description>汎用インライン編集。クリックで編集、Enter/blurで確定し change を発火。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiOtpInput",
      "title": "UI OTP Input",
      "icon": "🔢",
      "category": "フォーム",
      "demo": "otpinput",
      "description": "length 桁の 1 文字マスに入力し自動フォーカス移動。全桁で complete、変更で change イベントを発火。",
      "props": [
        {
          "name": "length",
          "type": "Number",
          "def": "6",
          "desc": "桁数"
        }
      ],
      "events": [
        {
          "name": "change",
          "desc": "入力ごとに発火（detail.value）"
        },
        {
          "name": "complete",
          "desc": "全桁入力で発火（detail.value）"
        }
      ],
      "usage": "<c-ui-otp-input length=\"6\" oncomplete={handleComplete}></c-ui-otp-input>",
      "ja": "OTP入力",
      "files": {
        "html": "<template>\n    <div class=\"ui-otp\">\n        <template for:each={boxes} for:item=\"box\">\n            <input\n                key={box.key}\n                class=\"ui-otp__box\"\n                type=\"text\"\n                inputmode=\"numeric\"\n                maxlength=\"1\"\n                value={box.value}\n                data-index={box.index}\n                oninput={handleInput}\n                onkeydown={handleKeydown}\n            />\n        </template>\n    </div>\n</template>\n",
        "js": "import { LightningElement, api, track } from 'lwc';\n\n/**\n * uiOtpInput — 汎用 OTP（ワンタイムコード）入力。\n * length 桁の 1 文字ずつのマス目に入力し、自動で次のマスへフォーカス移動する。\n * 全桁そろうと complete イベント (detail.value)、変更ごとに change イベントを発火する。\n */\nexport default class UiOtpInput extends LightningElement {\n    /** 桁数 */\n    @api length = 6;\n\n    @track _digits = [];\n\n    connectedCallback() {\n        this._digits = Array.from({ length: Number(this.length) || 6 }, () => '');\n    }\n\n    get boxes() {\n        return this._digits.map((d, i) => ({ key: i, index: i, value: d }));\n    }\n\n    get value() {\n        return this._digits.join('');\n    }\n\n    handleInput(event) {\n        const i = Number(event.target.dataset.index);\n        const ch = (event.target.value || '').replace(/[^0-9]/g, '').slice(-1);\n        this._digits = this._digits.map((d, idx) => (idx === i ? ch : d));\n        event.target.value = ch;\n        if (ch && i < this._digits.length - 1) {\n            const next = this.template.querySelector(`input[data-index=\"${i + 1}\"]`);\n            if (next) {\n                next.focus();\n            }\n        }\n        this.dispatchEvent(new CustomEvent('change', { detail: { value: this.value } }));\n        if (this.value.length === this._digits.length && !this._digits.includes('')) {\n            this.dispatchEvent(new CustomEvent('complete', { detail: { value: this.value } }));\n        }\n    }\n\n    handleKeydown(event) {\n        const i = Number(event.target.dataset.index);\n        if (event.key === 'Backspace' && !event.target.value && i > 0) {\n            const prev = this.template.querySelector(`input[data-index=\"${i - 1}\"]`);\n            if (prev) {\n                prev.focus();\n            }\n        }\n    }\n}\n",
        "css": ".ui-otp {\n    display: inline-flex;\n    gap: 8px;\n}\n\n.ui-otp__box {\n    width: 40px;\n    height: 48px;\n    border: 1px solid #c9c9c9;\n    border-radius: 8px;\n    text-align: center;\n    font-size: 1.25rem;\n    font-weight: 700;\n    color: #181818;\n    background: #ffffff;\n    font-family: inherit;\n}\n\n.ui-otp__box:focus {\n    outline: none;\n    border-color: #0176d3;\n    box-shadow: 0 0 0 2px rgba(1, 118, 211, 0.25);\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI OTP Input</masterLabel>\n    <description>汎用OTP入力。桁ごとのマスで自動フォーカス移動し complete を発火。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiCurrencyInput",
      "title": "UI Currency Input",
      "icon": "💴",
      "category": "フォーム",
      "demo": "currencyinput",
      "description": "3 桁区切りで整形しながら金額を入力し、記号を前置する。変更時に change イベント (detail.value = 数値) を発火。",
      "props": [
        {
          "name": "label",
          "type": "String",
          "def": "—",
          "desc": "ラベル"
        },
        {
          "name": "value",
          "type": "Number",
          "def": "0",
          "desc": "数値の値"
        },
        {
          "name": "symbol",
          "type": "String",
          "def": "'¥'",
          "desc": "通貨記号"
        }
      ],
      "events": [
        {
          "name": "change",
          "desc": "変更時に発火（detail.value）"
        }
      ],
      "usage": "<c-ui-currency-input label=\"金額\" onchange={handleChange}></c-ui-currency-input>",
      "ja": "通貨入力",
      "files": {
        "html": "<template>\n    <div class=\"ui-currency\">\n        <label lwc:if={label} class=\"ui-currency__label\">{label}</label>\n        <div class=\"ui-currency__field\">\n            <span class=\"ui-currency__symbol\">{symbol}</span>\n            <input\n                class=\"ui-currency__input\"\n                type=\"text\"\n                inputmode=\"numeric\"\n                value={display}\n                oninput={handleInput}\n            />\n        </div>\n    </div>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\n/**\n * uiCurrencyInput — 汎用通貨入力。\n * 数値を 3 桁区切りで整形しながら入力し、記号を前置する。\n * 変更時に change イベント (detail.value = 数値) を発火する。\n */\nexport default class UiCurrencyInput extends LightningElement {\n    /** ラベル */\n    @api label;\n    /** 数値の値 */\n    @api value = 0;\n    /** 通貨記号 */\n    @api symbol = '¥';\n\n    get display() {\n        return Number(this.value || 0).toLocaleString('ja-JP');\n    }\n\n    handleInput(event) {\n        const raw = (event.target.value || '').replace(/[^0-9]/g, '');\n        this.value = raw ? Number(raw) : 0;\n        event.target.value = this.value.toLocaleString('ja-JP');\n        this.dispatchEvent(\n            new CustomEvent('change', { detail: { value: this.value } })\n        );\n    }\n}\n",
        "css": ".ui-currency {\n    display: flex;\n    flex-direction: column;\n    gap: 4px;\n}\n\n.ui-currency__label {\n    font-size: 0.78rem;\n    font-weight: 600;\n    color: #444444;\n}\n\n.ui-currency__field {\n    display: flex;\n    align-items: center;\n    height: 34px;\n    border: 1px solid #c9c9c9;\n    border-radius: 6px;\n    background: #ffffff;\n    overflow: hidden;\n}\n.ui-currency__field:focus-within {\n    border-color: #0176d3;\n    box-shadow: 0 0 0 2px rgba(1, 118, 211, 0.25);\n}\n\n.ui-currency__symbol {\n    padding: 0 8px 0 12px;\n    color: #706e6b;\n    font-weight: 600;\n}\n\n.ui-currency__input {\n    flex: 1;\n    border: none;\n    outline: none;\n    height: 100%;\n    padding: 0 12px 0 0;\n    font-size: 0.875rem;\n    color: #181818;\n    text-align: right;\n    font-family: inherit;\n    font-variant-numeric: tabular-nums;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Currency Input</masterLabel>\n    <description>汎用通貨入力。3桁区切りで整形し change イベントを発火。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiPhoneInput",
      "title": "UI Phone Input",
      "icon": "📞",
      "category": "フォーム",
      "demo": "phoneinput",
      "description": "数字のみ受け付け 3-4-4 のハイフン区切りに自動整形する電話番号入力。変更時に change イベント (detail.value) を発火。",
      "props": [
        {
          "name": "label",
          "type": "String",
          "def": "—",
          "desc": "ラベル"
        },
        {
          "name": "value",
          "type": "String",
          "def": "''",
          "desc": "整形済みの値"
        }
      ],
      "events": [
        {
          "name": "change",
          "desc": "変更時に発火（detail.value）"
        }
      ],
      "usage": "<c-ui-phone-input label=\"電話番号\" onchange={handleChange}></c-ui-phone-input>",
      "ja": "電話番号入力",
      "files": {
        "html": "<template>\n    <div class=\"ui-phone\">\n        <label lwc:if={label} class=\"ui-phone__label\">{label}</label>\n        <input\n            class=\"ui-phone__input\"\n            type=\"tel\"\n            inputmode=\"numeric\"\n            placeholder=\"090-1234-5678\"\n            value={value}\n            oninput={handleInput}\n        />\n    </div>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\n/**\n * uiPhoneInput — 汎用電話番号入力。\n * 数字のみ受け付け、3-4-4 のハイフン区切りに自動整形する（最大 11 桁）。\n * 変更時に change イベント (detail.value) を発火する。\n */\nexport default class UiPhoneInput extends LightningElement {\n    /** ラベル */\n    @api label;\n    /** 値（整形済みの文字列） */\n    @api value = '';\n\n    format(digits) {\n        const d = digits.slice(0, 11);\n        if (d.length > 7) {\n            return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`;\n        }\n        if (d.length > 3) {\n            return `${d.slice(0, 3)}-${d.slice(3)}`;\n        }\n        return d;\n    }\n\n    handleInput(event) {\n        const digits = (event.target.value || '').replace(/[^0-9]/g, '');\n        this.value = this.format(digits);\n        event.target.value = this.value;\n        this.dispatchEvent(\n            new CustomEvent('change', { detail: { value: this.value } })\n        );\n    }\n}\n",
        "css": ".ui-phone {\n    display: flex;\n    flex-direction: column;\n    gap: 4px;\n}\n\n.ui-phone__label {\n    font-size: 0.78rem;\n    font-weight: 600;\n    color: #444444;\n}\n\n.ui-phone__input {\n    height: 34px;\n    padding: 0 12px;\n    border: 1px solid #c9c9c9;\n    border-radius: 6px;\n    font-size: 0.875rem;\n    color: #181818;\n    background: #ffffff;\n    font-family: inherit;\n    letter-spacing: 0.03em;\n}\n\n.ui-phone__input:focus {\n    outline: none;\n    border-color: #0176d3;\n    box-shadow: 0 0 0 2px rgba(1, 118, 211, 0.25);\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Phone Input</masterLabel>\n    <description>汎用電話番号入力。3-4-4のハイフン区切りに自動整形し change を発火。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiLikert",
      "title": "UI Likert",
      "icon": "😊",
      "category": "フォーム",
      "demo": "likert",
      "description": "1〜5 の選択肢を丸で表示し両端にラベルを置くリッカート尺度。選択時に change イベント (detail.value) を発火。",
      "props": [
        {
          "name": "value",
          "type": "Number",
          "def": "—",
          "desc": "選択値（1〜5）"
        },
        {
          "name": "left-label",
          "type": "String",
          "def": "'不満'",
          "desc": "左端ラベル"
        },
        {
          "name": "right-label",
          "type": "String",
          "def": "'満足'",
          "desc": "右端ラベル"
        }
      ],
      "events": [
        {
          "name": "change",
          "desc": "選択時に発火（detail.value）"
        }
      ],
      "usage": "<c-ui-likert left-label=\"不満\" right-label=\"満足\" onchange={handleChange}></c-ui-likert>",
      "ja": "リッカート尺度",
      "files": {
        "html": "<template>\n    <div class=\"ui-likert\">\n        <span class=\"ui-likert__end\">{leftLabel}</span>\n        <div class=\"ui-likert__scale\">\n            <template for:each={points} for:item=\"pt\">\n                <button\n                    key={pt.key}\n                    class={pt.cssClass}\n                    type=\"button\"\n                    data-value={pt.value}\n                    onclick={handleSelect}\n                    aria-label={pt.value}\n                >\n                    {pt.value}\n                </button>\n            </template>\n        </div>\n        <span class=\"ui-likert__end\">{rightLabel}</span>\n    </div>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\n/**\n * uiLikert — 汎用リッカート尺度（5 段階）。\n * 1〜5 の選択肢を丸で表示し、両端にラベルを置く。\n * 選択時に change イベント (detail.value) を発火する。\n */\nexport default class UiLikert extends LightningElement {\n    /** 選択値（1〜5） */\n    @api value;\n    /** 左端ラベル */\n    @api leftLabel = '不満';\n    /** 右端ラベル */\n    @api rightLabel = '満足';\n\n    get points() {\n        return [1, 2, 3, 4, 5].map((n) => ({\n            key: n,\n            value: n,\n            cssClass:\n                Number(this.value) === n\n                    ? 'ui-likert__pt ui-likert__pt_on'\n                    : 'ui-likert__pt'\n        }));\n    }\n\n    handleSelect(event) {\n        this.value = Number(event.currentTarget.dataset.value);\n        this.dispatchEvent(\n            new CustomEvent('change', { detail: { value: this.value } })\n        );\n    }\n}\n",
        "css": ".ui-likert {\n    display: inline-flex;\n    align-items: center;\n    gap: 12px;\n}\n\n.ui-likert__end {\n    font-size: 0.78rem;\n    color: #706e6b;\n    white-space: nowrap;\n}\n\n.ui-likert__scale {\n    display: inline-flex;\n    gap: 8px;\n}\n\n.ui-likert__pt {\n    width: 34px;\n    height: 34px;\n    border-radius: 50%;\n    border: 1px solid #c9c9c9;\n    background: #ffffff;\n    color: #706e6b;\n    font-size: 0.85rem;\n    font-weight: 700;\n    cursor: pointer;\n    font-family: inherit;\n    transition: all 0.12s ease;\n}\n.ui-likert__pt:hover {\n    border-color: #0176d3;\n    color: #0176d3;\n}\n\n.ui-likert__pt_on {\n    background: #0176d3;\n    border-color: #0176d3;\n    color: #ffffff;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Likert</masterLabel>\n    <description>汎用リッカート尺度（5段階）。両端ラベル付きで change イベントを発火。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiDrawer",
      "title": "UI Drawer",
      "icon": "🗄️",
      "category": "オーバーレイ",
      "demo": "drawer",
      "description": "open で表示制御し画面端からスライドインするパネル。背景・×・Esc で close を発火。",
      "props": [
        {
          "name": "header",
          "type": "String",
          "def": "—",
          "desc": "ヘッダタイトル"
        },
        {
          "name": "open",
          "type": "Boolean",
          "def": "false",
          "desc": "true で表示"
        },
        {
          "name": "side",
          "type": "String",
          "def": "'right'",
          "desc": "right | left"
        }
      ],
      "slots": [
        {
          "name": "(default)",
          "desc": "本文"
        },
        {
          "name": "footer",
          "desc": "フッタ"
        }
      ],
      "events": [
        {
          "name": "close",
          "desc": "閉じる操作時に発火"
        }
      ],
      "usage": "<c-ui-drawer header=\"フィルタ\" open={isOpen} onclose={handleClose}>...</c-ui-drawer>",
      "ja": "ドロワー",
      "files": {
        "html": "<template>\n    <template lwc:if={open}>\n        <div\n            class=\"ui-drawer-backdrop\"\n            onclick={handleClose}\n            onkeydown={handleKeydown}\n        >\n            <aside\n                class={panelClass}\n                role=\"dialog\"\n                aria-modal=\"true\"\n                aria-label={header}\n                onclick={stopPropagation}\n            >\n                <header class=\"ui-drawer__header\">\n                    <h2 class=\"ui-drawer__title\">{header}</h2>\n                    <button\n                        class=\"ui-drawer__close\"\n                        type=\"button\"\n                        title=\"閉じる\"\n                        onclick={handleClose}\n                    >\n                        &times;\n                    </button>\n                </header>\n                <div class=\"ui-drawer__body\">\n                    <slot></slot>\n                </div>\n                <footer class=\"ui-drawer__footer\">\n                    <slot name=\"footer\"></slot>\n                </footer>\n            </aside>\n        </div>\n    </template>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\n/**\n * uiDrawer — 汎用ドロワー（スライドインパネル）。\n * open で表示制御し、画面端からスライドインする。背景・×・Esc で close を発火。\n * 本文は default スロット、フッタは footer スロットに置く。\n */\nexport default class UiDrawer extends LightningElement {\n    /** ヘッダタイトル */\n    @api header;\n    /** true で表示 */\n    @api open = false;\n    /** 表示する側: right | left */\n    @api side = 'right';\n\n    get panelClass() {\n        const side = this.side === 'left' ? 'left' : 'right';\n        return `ui-drawer__panel ui-drawer__panel_${side}`;\n    }\n\n    handleClose() {\n        this.dispatchEvent(new CustomEvent('close'));\n    }\n\n    handleKeydown(event) {\n        if (event.key === 'Escape') {\n            this.handleClose();\n        }\n    }\n\n    stopPropagation(event) {\n        event.stopPropagation();\n    }\n}\n",
        "css": ".ui-drawer-backdrop {\n    position: fixed;\n    inset: 0;\n    background: rgba(8, 7, 7, 0.45);\n    z-index: 9100;\n}\n\n.ui-drawer__panel {\n    position: fixed;\n    top: 0;\n    bottom: 0;\n    width: 340px;\n    max-width: 86vw;\n    background: #ffffff;\n    display: flex;\n    flex-direction: column;\n    box-shadow: 0 0 32px rgba(0, 0, 0, 0.25);\n    animation: ui-drawer-in 0.22s ease;\n}\n\n.ui-drawer__panel_right {\n    right: 0;\n}\n.ui-drawer__panel_left {\n    left: 0;\n}\n.ui-drawer__panel_left {\n    animation: ui-drawer-in-left 0.22s ease;\n}\n\n@keyframes ui-drawer-in {\n    from {\n        transform: translateX(100%);\n    }\n    to {\n        transform: translateX(0);\n    }\n}\n@keyframes ui-drawer-in-left {\n    from {\n        transform: translateX(-100%);\n    }\n    to {\n        transform: translateX(0);\n    }\n}\n\n.ui-drawer__header {\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    padding: 16px 18px;\n    border-bottom: 1px solid #ececec;\n}\n.ui-drawer__title {\n    flex: 1;\n    margin: 0;\n    font-size: 1rem;\n    font-weight: 700;\n    color: #181818;\n}\n.ui-drawer__close {\n    border: none;\n    background: transparent;\n    font-size: 1.4rem;\n    line-height: 1;\n    color: #706e6b;\n    cursor: pointer;\n}\n.ui-drawer__close:hover {\n    color: #181818;\n}\n\n.ui-drawer__body {\n    flex: 1;\n    padding: 18px;\n    overflow-y: auto;\n    font-size: 0.875rem;\n    color: #444444;\n    line-height: 1.6;\n}\n\n.ui-drawer__footer {\n    display: flex;\n    justify-content: flex-end;\n    gap: 8px;\n    padding: 12px 18px;\n    border-top: 1px solid #ececec;\n    background: #fafafa;\n}\n.ui-drawer__footer:empty {\n    display: none;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Drawer</masterLabel>\n    <description>汎用ドロワー。画面端からスライドインし背景/×/Escで close を発火。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiCallout",
      "title": "UI Callout",
      "icon": "🗯️",
      "category": "フィードバック",
      "demo": "callout",
      "description": "左罫線・見出し・アイコンで補足を強調するボックス。本文は default スロット。",
      "props": [
        {
          "name": "variant",
          "type": "String",
          "def": "'info'",
          "desc": "info | success | warning | error | tip"
        },
        {
          "name": "title",
          "type": "String",
          "def": "—",
          "desc": "見出し"
        }
      ],
      "slots": [
        {
          "name": "(default)",
          "desc": "本文"
        }
      ],
      "events": [],
      "usage": "<c-ui-callout variant=\"tip\" title=\"ヒント\">\n    便利な使い方を紹介します。\n</c-ui-callout>",
      "ja": "コールアウト",
      "files": {
        "html": "<template>\n    <div class={calloutClass}>\n        <span class=\"ui-callout__icon\">{iconChar}</span>\n        <div class=\"ui-callout__content\">\n            <strong lwc:if={title} class=\"ui-callout__title\">{title}</strong>\n            <div class=\"ui-callout__body\"><slot></slot></div>\n        </div>\n    </div>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\nconst ICONS = {\n    info: 'ℹ',\n    success: '✓',\n    warning: '!',\n    error: '✕',\n    tip: '💡'\n};\n\n/**\n * uiCallout — 汎用コールアウト。\n * 左罫線と見出し・アイコンで強調する補足ボックス。本文は default スロット。\n */\nexport default class UiCallout extends LightningElement {\n    /** バリアント: info | success | warning | error | tip */\n    @api variant = 'info';\n    /** 見出し */\n    @api title;\n\n    get calloutClass() {\n        const variant = ICONS[this.variant] ? this.variant : 'info';\n        return `ui-callout ui-callout_${variant}`;\n    }\n\n    get iconChar() {\n        return ICONS[this.variant] || ICONS.info;\n    }\n}\n",
        "css": ".ui-callout {\n    display: flex;\n    gap: 10px;\n    padding: 12px 14px;\n    border-radius: 8px;\n    border-left: 4px solid #0176d3;\n    background: #f4f8fd;\n    font-size: 0.85rem;\n    line-height: 1.6;\n}\n\n.ui-callout__icon {\n    flex-shrink: 0;\n    font-size: 0.95rem;\n    line-height: 1.6;\n}\n\n.ui-callout__title {\n    display: block;\n    margin-bottom: 2px;\n    color: #181818;\n}\n\n.ui-callout__body {\n    color: #444444;\n}\n\n.ui-callout_info {\n    border-left-color: #0176d3;\n    background: #f0f6fd;\n}\n.ui-callout_success {\n    border-left-color: #2e844a;\n    background: #f0f8f2;\n}\n.ui-callout_warning {\n    border-left-color: #dd7a01;\n    background: #fdf6ec;\n}\n.ui-callout_error {\n    border-left-color: #ba0517;\n    background: #fdf0ef;\n}\n.ui-callout_tip {\n    border-left-color: #7f56d9;\n    background: #f6f2fd;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Callout</masterLabel>\n    <description>汎用コールアウト。左罫線と見出し・アイコンで補足を強調表示。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiRatingSummary",
      "title": "UI Rating Summary",
      "icon": "🌟",
      "category": "表示",
      "demo": "ratingsummary",
      "description": "平均評価・件数・星分布（5★〜1★）をまとめて表示するレビューサマリー。",
      "props": [
        {
          "name": "average",
          "type": "Number",
          "def": "0",
          "desc": "平均評価（例: 4.3）"
        },
        {
          "name": "count",
          "type": "Number",
          "def": "0",
          "desc": "総件数"
        },
        {
          "name": "distribution",
          "type": "Array",
          "def": "[]",
          "desc": "5★→1★ の件数配列（長さ 5）"
        }
      ],
      "events": [],
      "usage": "<c-ui-rating-summary average=\"4.3\" count=\"128\" distribution={dist}></c-ui-rating-summary>",
      "ja": "評価サマリー",
      "files": {
        "html": "<template>\n    <div class=\"ui-rsummary\">\n        <div class=\"ui-rsummary__head\">\n            <div class=\"ui-rsummary__avg\">{averageText}</div>\n            <div class=\"ui-rsummary__meta\">\n                <div class=\"ui-rsummary__stars\">\n                    <template for:each={stars} for:item=\"s\">\n                        <span key={s.key} class=\"ui-rsummary__star\">{s.char}</span>\n                    </template>\n                </div>\n                <div class=\"ui-rsummary__count\">{count} 件のレビュー</div>\n            </div>\n        </div>\n        <div class=\"ui-rsummary__dist\">\n            <template for:each={rows} for:item=\"row\">\n                <div key={row.key} class=\"ui-rsummary__row\">\n                    <span class=\"ui-rsummary__rowlabel\">{row.star}★</span>\n                    <div class=\"ui-rsummary__track\">\n                        <div class=\"ui-rsummary__bar\" style={row.barStyle}></div>\n                    </div>\n                    <span class=\"ui-rsummary__rowval\">{row.value}</span>\n                </div>\n            </template>\n        </div>\n    </div>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\n/**\n * uiRatingSummary — 汎用評価サマリー。\n * 平均評価・件数・星分布（5★〜1★の件数）をまとめて表示する純粋な表示コンポーネント。\n */\nexport default class UiRatingSummary extends LightningElement {\n    /** 平均評価（例: 4.3） */\n    @api average = 0;\n    /** 総件数 */\n    @api count = 0;\n\n    _distribution = [];\n\n    /** 5★→1★ の件数配列（長さ 5） */\n    @api\n    get distribution() {\n        return this._distribution;\n    }\n    set distribution(value) {\n        this._distribution = Array.isArray(value) ? value : [];\n    }\n\n    get averageText() {\n        return (Number(this.average) || 0).toFixed(1);\n    }\n\n    get stars() {\n        const filled = Math.round(Number(this.average) || 0);\n        return [1, 2, 3, 4, 5].map((n) => ({\n            key: n,\n            char: n <= filled ? '★' : '☆'\n        }));\n    }\n\n    get rows() {\n        const total = this._distribution.reduce((a, b) => a + (Number(b) || 0), 0) || 1;\n        return this._distribution.map((c, i) => {\n            const star = 5 - i;\n            const value = Number(c) || 0;\n            return {\n                key: star,\n                star,\n                value,\n                barStyle: `width: ${Math.round((value / total) * 100)}%`\n            };\n        });\n    }\n}\n",
        "css": ".ui-rsummary {\n    display: flex;\n    flex-direction: column;\n    gap: 12px;\n    max-width: 320px;\n}\n\n.ui-rsummary__head {\n    display: flex;\n    align-items: center;\n    gap: 14px;\n}\n\n.ui-rsummary__avg {\n    font-size: 2.4rem;\n    font-weight: 800;\n    color: #181818;\n    line-height: 1;\n}\n\n.ui-rsummary__stars {\n    color: #f5a623;\n    font-size: 1rem;\n    letter-spacing: 1px;\n}\n\n.ui-rsummary__count {\n    font-size: 0.78rem;\n    color: #706e6b;\n    margin-top: 2px;\n}\n\n.ui-rsummary__row {\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    font-size: 0.78rem;\n}\n\n.ui-rsummary__rowlabel {\n    width: 28px;\n    color: #706e6b;\n    flex-shrink: 0;\n}\n\n.ui-rsummary__track {\n    flex: 1;\n    height: 8px;\n    background: #f0f0f0;\n    border-radius: 4px;\n    overflow: hidden;\n}\n\n.ui-rsummary__bar {\n    height: 100%;\n    background: #f5a623;\n    border-radius: 4px;\n}\n\n.ui-rsummary__rowval {\n    width: 28px;\n    text-align: right;\n    color: #444444;\n    flex-shrink: 0;\n    font-variant-numeric: tabular-nums;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Rating Summary</masterLabel>\n    <description>汎用評価サマリー。平均・件数・星分布をまとめて表示。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiToolbar",
      "title": "UI Toolbar",
      "icon": "🧰",
      "category": "レイアウト",
      "demo": "toolbar",
      "description": "左にタイトル、右にアクション（default スロット）を配置する横長のバー。",
      "props": [
        {
          "name": "title",
          "type": "String",
          "def": "—",
          "desc": "左側のタイトル"
        }
      ],
      "slots": [
        {
          "name": "(default)",
          "desc": "右側のアクション"
        }
      ],
      "events": [],
      "usage": "<c-ui-toolbar title=\"一覧\">\n    <c-ui-button label=\"追加\"></c-ui-button>\n</c-ui-toolbar>",
      "ja": "ツールバー",
      "files": {
        "html": "<template>\n    <div class=\"ui-toolbar\">\n        <span lwc:if={title} class=\"ui-toolbar__title\">{title}</span>\n        <div class=\"ui-toolbar__actions\">\n            <slot></slot>\n        </div>\n    </div>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\n/**\n * uiToolbar — 汎用ツールバー。\n * 左にタイトル、右にアクション（default スロット）を配置する横長のバー。\n */\nexport default class UiToolbar extends LightningElement {\n    /** 左側のタイトル */\n    @api title;\n}\n",
        "css": ".ui-toolbar {\n    display: flex;\n    align-items: center;\n    gap: 12px;\n    padding: 8px 12px;\n    background: #ffffff;\n    border: 1px solid #e5e5e5;\n    border-radius: 8px;\n}\n\n.ui-toolbar__title {\n    font-size: 0.9rem;\n    font-weight: 700;\n    color: #181818;\n}\n\n.ui-toolbar__actions {\n    margin-left: auto;\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    flex-wrap: wrap;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Toolbar</masterLabel>\n    <description>汎用ツールバー。左にタイトル、右にアクションを配置するバー。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiFab",
      "title": "UI Fab",
      "icon": "➕",
      "category": "アクション",
      "demo": "fab",
      "description": "アイコンの丸ボタン。label を指定すると横長の拡張 FAB になる。click を発火。",
      "props": [
        {
          "name": "icon",
          "type": "String",
          "def": "'＋'",
          "desc": "アイコン文字（絵文字可）"
        },
        {
          "name": "label",
          "type": "String",
          "def": "—",
          "desc": "ラベル（指定で拡張 FAB）"
        },
        {
          "name": "variant",
          "type": "String",
          "def": "'brand'",
          "desc": "brand | neutral | success"
        }
      ],
      "events": [
        {
          "name": "click",
          "desc": "ボタン押下時に発火"
        }
      ],
      "usage": "<c-ui-fab icon=\"＋\" label=\"新規\" onclick={handleAdd}></c-ui-fab>",
      "ja": "フローティングボタン",
      "files": {
        "html": "<template>\n    <button class={fabClass} type=\"button\" title={label} onclick={handleClick}>\n        <span class=\"ui-fab__icon\">{icon}</span>\n        <span lwc:if={hasLabel} class=\"ui-fab__label\">{label}</span>\n    </button>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\nconst VARIANTS = ['brand', 'neutral', 'success'];\n\n/**\n * uiFab — 汎用フローティングアクションボタン。\n * アイコンの丸ボタン。label を指定すると横長の拡張 FAB になる。click を発火する。\n */\nexport default class UiFab extends LightningElement {\n    /** アイコン文字（絵文字可） */\n    @api icon = '＋';\n    /** ラベル（指定で拡張 FAB） */\n    @api label;\n    /** バリアント: brand | neutral | success */\n    @api variant = 'brand';\n\n    get hasLabel() {\n        return !!this.label;\n    }\n\n    get fabClass() {\n        const variant = VARIANTS.includes(this.variant) ? this.variant : 'brand';\n        const ext = this.hasLabel ? ' ui-fab_extended' : '';\n        return `ui-fab ui-fab_${variant}${ext}`;\n    }\n\n    handleClick() {\n        this.dispatchEvent(new CustomEvent('click'));\n    }\n}\n",
        "css": ".ui-fab {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    gap: 8px;\n    width: 52px;\n    height: 52px;\n    border: none;\n    border-radius: 50%;\n    cursor: pointer;\n    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);\n    color: #ffffff;\n    transition: transform 0.12s ease, box-shadow 0.12s ease;\n}\n.ui-fab:hover {\n    transform: translateY(-1px);\n    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);\n}\n.ui-fab:active {\n    transform: translateY(0);\n}\n\n.ui-fab_extended {\n    width: auto;\n    border-radius: 26px;\n    padding: 0 20px;\n    height: 48px;\n}\n\n.ui-fab__icon {\n    font-size: 1.3rem;\n    line-height: 1;\n}\n\n.ui-fab__label {\n    font-size: 0.875rem;\n    font-weight: 700;\n}\n\n.ui-fab_brand {\n    background: #0176d3;\n}\n.ui-fab_brand:hover {\n    background: #014486;\n}\n.ui-fab_neutral {\n    background: #514f4d;\n}\n.ui-fab_neutral:hover {\n    background: #3a3937;\n}\n.ui-fab_success {\n    background: #2e844a;\n}\n.ui-fab_success:hover {\n    background: #1f6135;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Fab</masterLabel>\n    <description>汎用フローティングアクションボタン。丸/拡張FABで click を発火。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiButtonToggle",
      "title": "UI Button Toggle",
      "icon": "🔛",
      "category": "アクション",
      "demo": "buttontoggle",
      "description": "押下状態（pressed）を保持するボタン。切替時に change イベント (detail.pressed) を発火。",
      "props": [
        {
          "name": "label",
          "type": "String",
          "def": "—",
          "desc": "ラベル"
        },
        {
          "name": "icon",
          "type": "String",
          "def": "—",
          "desc": "アイコン文字（任意）"
        },
        {
          "name": "pressed",
          "type": "Boolean",
          "def": "false",
          "desc": "押下状態"
        }
      ],
      "events": [
        {
          "name": "change",
          "desc": "切替時に発火（detail.pressed）"
        }
      ],
      "usage": "<c-ui-button-toggle label=\"太字\" icon=\"B\" onchange={handleToggle}></c-ui-button-toggle>",
      "ja": "トグルボタン",
      "files": {
        "html": "<template>\n    <button\n        class={buttonClass}\n        type=\"button\"\n        aria-pressed={pressed}\n        onclick={handleClick}\n    >\n        <span lwc:if={icon} class=\"ui-btntoggle__icon\">{icon}</span>\n        <span class=\"ui-btntoggle__label\">{label}</span>\n    </button>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\n/**\n * uiButtonToggle — 汎用トグルボタン。\n * 押下状態（pressed）を保持するボタン。切替時に change イベント\n * (detail.pressed) を発火する。\n */\nexport default class UiButtonToggle extends LightningElement {\n    /** ラベル */\n    @api label;\n    /** アイコン文字（任意） */\n    @api icon;\n    /** 押下状態 */\n    @api pressed = false;\n\n    get buttonClass() {\n        return this.pressed\n            ? 'ui-btntoggle ui-btntoggle_on'\n            : 'ui-btntoggle';\n    }\n\n    handleClick() {\n        this.pressed = !this.pressed;\n        this.dispatchEvent(\n            new CustomEvent('change', { detail: { pressed: this.pressed } })\n        );\n    }\n}\n",
        "css": ".ui-btntoggle {\n    display: inline-flex;\n    align-items: center;\n    gap: 6px;\n    height: 32px;\n    padding: 0 14px;\n    border: 1px solid #c9c9c9;\n    border-radius: 6px;\n    background: #ffffff;\n    color: #514f4d;\n    font-size: 0.8125rem;\n    font-weight: 600;\n    cursor: pointer;\n    font-family: inherit;\n    transition: background 0.12s ease, color 0.12s ease, border-color 0.12s ease;\n}\n.ui-btntoggle:hover {\n    background: #f3f3f3;\n}\n\n.ui-btntoggle_on {\n    background: #eef4ff;\n    border-color: #0176d3;\n    color: #0176d3;\n    box-shadow: inset 0 0 0 1px #0176d3;\n}\n\n.ui-btntoggle__icon {\n    font-size: 0.95rem;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Button Toggle</masterLabel>\n    <description>汎用トグルボタン。押下状態を保持し change イベントを発火。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiKeyValue",
      "title": "UI Key Value",
      "icon": "🗂️",
      "category": "表示",
      "demo": "keyvalue",
      "description": "items 配列 ([{ label, value }]) をラベルと値のペアで整列表示する定義リスト。",
      "props": [
        {
          "name": "items",
          "type": "Array",
          "def": "[]",
          "desc": "[{ label, value }] の配列"
        }
      ],
      "events": [],
      "usage": "<c-ui-key-value items={details}></c-ui-key-value>",
      "ja": "定義リスト",
      "files": {
        "html": "<template>\n    <dl class=\"ui-kv\">\n        <template for:each={rows} for:item=\"row\">\n            <div key={row.key} class=\"ui-kv__row\">\n                <dt class=\"ui-kv__label\">{row.label}</dt>\n                <dd class=\"ui-kv__value\">{row.value}</dd>\n            </div>\n        </template>\n    </dl>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\n/**\n * uiKeyValue — 汎用定義リスト（キー・バリュー）。\n * items 配列 ([{ label, value }]) をラベルと値のペアで整列表示する。\n */\nexport default class UiKeyValue extends LightningElement {\n    _items = [];\n\n    /** [{ label, value }] の配列 */\n    @api\n    get items() {\n        return this._items;\n    }\n    set items(value) {\n        this._items = Array.isArray(value) ? value : [];\n    }\n\n    get rows() {\n        return this._items.map((it, i) => ({\n            key: i,\n            label: it.label,\n            value: it.value\n        }));\n    }\n}\n",
        "css": ".ui-kv {\n    margin: 0;\n    display: flex;\n    flex-direction: column;\n    gap: 1px;\n    background: #ececec;\n    border: 1px solid #ececec;\n    border-radius: 8px;\n    overflow: hidden;\n}\n\n.ui-kv__row {\n    display: grid;\n    grid-template-columns: 120px 1fr;\n    background: #ffffff;\n}\n\n.ui-kv__label {\n    margin: 0;\n    padding: 9px 12px;\n    background: #fafaf9;\n    font-size: 0.78rem;\n    font-weight: 600;\n    color: #706e6b;\n}\n\n.ui-kv__value {\n    margin: 0;\n    padding: 9px 12px;\n    font-size: 0.82rem;\n    color: #181818;\n}\n\n@media (max-width: 420px) {\n    .ui-kv__row {\n        grid-template-columns: 1fr;\n    }\n    .ui-kv__value {\n        padding-top: 0;\n    }\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Key Value</masterLabel>\n    <description>汎用定義リスト。ラベルと値のペアを整列表示。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiMediaObject",
      "title": "UI Media Object",
      "icon": "🖼️",
      "category": "レイアウト",
      "demo": "mediaobject",
      "description": "先頭にアイコン、右にタイトルと本文を並べる定番レイアウト。本文は text か default スロット。",
      "props": [
        {
          "name": "icon",
          "type": "String",
          "def": "—",
          "desc": "先頭アイコン（絵文字可）"
        },
        {
          "name": "title",
          "type": "String",
          "def": "—",
          "desc": "タイトル"
        },
        {
          "name": "text",
          "type": "String",
          "def": "—",
          "desc": "本文（スロット未使用時）"
        }
      ],
      "slots": [
        {
          "name": "(default)",
          "desc": "本文（text 未指定時）"
        }
      ],
      "events": [],
      "usage": "<c-ui-media-object icon=\"📦\" title=\"出荷\" text=\"本日12件を発送しました\"></c-ui-media-object>",
      "ja": "メディアオブジェクト",
      "files": {
        "html": "<template>\n    <div class=\"ui-media\">\n        <span lwc:if={icon} class=\"ui-media__figure\">{icon}</span>\n        <div class=\"ui-media__body\">\n            <div lwc:if={title} class=\"ui-media__title\">{title}</div>\n            <div class=\"ui-media__text\">\n                <template lwc:if={text}>{text}</template>\n                <slot></slot>\n            </div>\n        </div>\n    </div>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\n/**\n * uiMediaObject — 汎用メディアオブジェクト。\n * 先頭にアイコン（絵文字）、右にタイトルと本文を並べる定番レイアウト。\n * 本文は text プロパティまたは default スロットで指定できる。\n */\nexport default class UiMediaObject extends LightningElement {\n    /** 先頭アイコン（絵文字可） */\n    @api icon;\n    /** タイトル */\n    @api title;\n    /** 本文（スロット未使用時） */\n    @api text;\n}\n",
        "css": ".ui-media {\n    display: flex;\n    gap: 12px;\n    align-items: flex-start;\n}\n\n.ui-media__figure {\n    flex-shrink: 0;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    width: 42px;\n    height: 42px;\n    border-radius: 10px;\n    background: #eef4ff;\n    font-size: 1.3rem;\n}\n\n.ui-media__body {\n    flex: 1;\n    min-width: 0;\n}\n\n.ui-media__title {\n    font-size: 0.9rem;\n    font-weight: 700;\n    color: #181818;\n    margin-bottom: 2px;\n}\n\n.ui-media__text {\n    font-size: 0.82rem;\n    color: #514f4d;\n    line-height: 1.5;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Media Object</masterLabel>\n    <description>汎用メディアオブジェクト。アイコン＋タイトル・本文の定番レイアウト。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiGauge",
      "title": "UI Gauge",
      "icon": "🎚️",
      "category": "表示",
      "demo": "gauge",
      "description": "0〜100 の値を半円アーク（SVG）で表示し中央に数値を出す半円ゲージ。",
      "props": [
        {
          "name": "value",
          "type": "Number",
          "def": "0",
          "desc": "値 0〜100"
        },
        {
          "name": "label",
          "type": "String",
          "def": "—",
          "desc": "ラベル"
        },
        {
          "name": "unit",
          "type": "String",
          "def": "'%'",
          "desc": "単位"
        },
        {
          "name": "variant",
          "type": "String",
          "def": "'brand'",
          "desc": "brand | success | warning | error"
        }
      ],
      "events": [],
      "usage": "<c-ui-gauge value=\"68\" label=\"達成率\"></c-ui-gauge>",
      "ja": "ゲージ",
      "files": {
        "html": "<template>\n    <div class=\"ui-gauge\">\n        <svg class=\"ui-gauge__svg\" viewBox=\"0 0 100 58\">\n            <path\n                class=\"ui-gauge__track\"\n                d=\"M10 50 A40 40 0 0 1 90 50\"\n            ></path>\n            <path\n                class={barClass}\n                d=\"M10 50 A40 40 0 0 1 90 50\"\n                stroke-dasharray={dash}\n            ></path>\n        </svg>\n        <div class=\"ui-gauge__value\">{valueText}</div>\n        <div lwc:if={label} class=\"ui-gauge__label\">{label}</div>\n    </div>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\nconst RADIUS = 40;\nconst ARC_LEN = Math.PI * RADIUS;\nconst VARIANTS = ['brand', 'success', 'warning', 'error'];\n\n/**\n * uiGauge — 汎用半円ゲージ。\n * 0〜100 の値を半円アーク（SVG）で表示し、中央に数値を出す。\n */\nexport default class UiGauge extends LightningElement {\n    /** 値 0〜100 */\n    @api value = 0;\n    /** ラベル */\n    @api label;\n    /** 単位（既定は %） */\n    @api unit = '%';\n    /** 色: brand | success | warning | error */\n    @api variant = 'brand';\n\n    get clamped() {\n        const n = Number(this.value);\n        if (Number.isNaN(n)) {\n            return 0;\n        }\n        return Math.min(100, Math.max(0, n));\n    }\n\n    get dash() {\n        const filled = (this.clamped / 100) * ARC_LEN;\n        return `${filled.toFixed(2)} ${ARC_LEN.toFixed(2)}`;\n    }\n\n    get barClass() {\n        const variant = VARIANTS.includes(this.variant) ? this.variant : 'brand';\n        return `ui-gauge__bar ui-gauge__bar_${variant}`;\n    }\n\n    get valueText() {\n        return `${Math.round(this.clamped)}${this.unit}`;\n    }\n}\n",
        "css": ".ui-gauge {\n    display: inline-flex;\n    flex-direction: column;\n    align-items: center;\n    width: 140px;\n}\n\n.ui-gauge__svg {\n    width: 100%;\n    overflow: visible;\n}\n\n.ui-gauge__track {\n    fill: none;\n    stroke: #e5e5e5;\n    stroke-width: 8;\n    stroke-linecap: round;\n}\n\n.ui-gauge__bar {\n    fill: none;\n    stroke-width: 8;\n    stroke-linecap: round;\n    transition: stroke-dasharray 0.4s ease;\n}\n\n.ui-gauge__bar_brand {\n    stroke: #0176d3;\n}\n.ui-gauge__bar_success {\n    stroke: #2e844a;\n}\n.ui-gauge__bar_warning {\n    stroke: #dd7a01;\n}\n.ui-gauge__bar_error {\n    stroke: #ba0517;\n}\n\n.ui-gauge__value {\n    margin-top: -18px;\n    font-size: 1.3rem;\n    font-weight: 800;\n    color: #181818;\n}\n\n.ui-gauge__label {\n    font-size: 0.75rem;\n    color: #706e6b;\n    margin-top: 2px;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Gauge</masterLabel>\n    <description>汎用半円ゲージ。0〜100をSVGアークで表示し中央に数値。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiTrendBadge",
      "title": "UI Trend Badge",
      "icon": "📈",
      "category": "表示",
      "demo": "trendbadge",
      "description": "増減（trend）に応じた色・矢印で値（例: +12.5%）をコンパクトに表示するバッジ。",
      "props": [
        {
          "name": "value",
          "type": "String",
          "def": "—",
          "desc": "表示テキスト（例: +12.5%）"
        },
        {
          "name": "trend",
          "type": "String",
          "def": "'up'",
          "desc": "up | down | flat"
        }
      ],
      "events": [],
      "usage": "<c-ui-trend-badge value=\"+12.5%\" trend=\"up\"></c-ui-trend-badge>",
      "ja": "トレンドバッジ",
      "files": {
        "html": "<template>\n    <span class={badgeClass}>\n        <span class=\"ui-trend__icon\">{iconChar}</span>\n        <span class=\"ui-trend__value\">{value}</span>\n    </span>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\nconst TRENDS = {\n    up: { icon: '▲', cls: 'up' },\n    down: { icon: '▼', cls: 'down' },\n    flat: { icon: '▬', cls: 'flat' }\n};\n\n/**\n * uiTrendBadge — 汎用トレンドバッジ。\n * 増減（trend）に応じた色・矢印で値（例: +12.5%）をコンパクトに表示する。\n */\nexport default class UiTrendBadge extends LightningElement {\n    /** 表示テキスト（例: +12.5%） */\n    @api value;\n    /** 増減: up | down | flat */\n    @api trend = 'up';\n\n    get badgeClass() {\n        const cls = (TRENDS[this.trend] || TRENDS.flat).cls;\n        return `ui-trend ui-trend_${cls}`;\n    }\n\n    get iconChar() {\n        return (TRENDS[this.trend] || TRENDS.flat).icon;\n    }\n}\n",
        "css": ".ui-trend {\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    padding: 2px 8px;\n    border-radius: 5px;\n    font-size: 0.75rem;\n    font-weight: 700;\n    line-height: 1.5;\n}\n\n.ui-trend__icon {\n    font-size: 0.6rem;\n}\n\n.ui-trend_up {\n    background: #e6f4ea;\n    color: #1d7a3f;\n}\n.ui-trend_down {\n    background: #fdecea;\n    color: #b3261e;\n}\n.ui-trend_flat {\n    background: #ecebea;\n    color: #514f4d;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Trend Badge</masterLabel>\n    <description>汎用トレンドバッジ。増減に応じた色・矢印で値を表示。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiPagerDots",
      "title": "UI Pager Dots",
      "icon": "⚪",
      "category": "ナビゲーション",
      "demo": "pagerdots",
      "description": "total 個のドットを並べ current を強調するドットページャー。クリックで change イベント (detail.index) を発火。",
      "props": [
        {
          "name": "total",
          "type": "Number",
          "def": "3",
          "desc": "ドット総数"
        },
        {
          "name": "current",
          "type": "Number",
          "def": "1",
          "desc": "現在の位置（1 始まり）"
        }
      ],
      "events": [
        {
          "name": "change",
          "desc": "ドット選択時に発火（detail.index）"
        }
      ],
      "usage": "<c-ui-pager-dots total=\"5\" current=\"1\" onchange={handleChange}></c-ui-pager-dots>",
      "ja": "ドットページャー",
      "files": {
        "html": "<template>\n    <div class=\"ui-pagerdots\" role=\"tablist\">\n        <template for:each={dots} for:item=\"dot\">\n            <button\n                key={dot.key}\n                class={dot.cssClass}\n                type=\"button\"\n                data-index={dot.index}\n                aria-label={dot.index}\n                onclick={handleClick}\n            ></button>\n        </template>\n    </div>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\n/**\n * uiPagerDots — 汎用ドットページャー。\n * total 個のドットを並べ、current（1 始まり）を強調する。\n * ドットクリックで change イベント (detail.index) を発火する。\n */\nexport default class UiPagerDots extends LightningElement {\n    /** ドット総数 */\n    @api total = 3;\n    /** 現在の位置（1 始まり） */\n    @api current = 1;\n\n    get dots() {\n        const total = Math.max(1, Number(this.total) || 1);\n        const cur = Number(this.current) || 1;\n        const list = [];\n        for (let i = 1; i <= total; i += 1) {\n            list.push({\n                key: i,\n                index: i,\n                cssClass:\n                    i === cur\n                        ? 'ui-pagerdots__dot ui-pagerdots__dot_active'\n                        : 'ui-pagerdots__dot'\n            });\n        }\n        return list;\n    }\n\n    handleClick(event) {\n        const index = Number(event.currentTarget.dataset.index);\n        this.current = index;\n        this.dispatchEvent(new CustomEvent('change', { detail: { index } }));\n    }\n}\n",
        "css": ".ui-pagerdots {\n    display: inline-flex;\n    align-items: center;\n    gap: 8px;\n}\n\n.ui-pagerdots__dot {\n    width: 9px;\n    height: 9px;\n    border-radius: 50%;\n    border: none;\n    background: #c9c9c9;\n    cursor: pointer;\n    padding: 0;\n    transition: width 0.18s ease, background 0.18s ease;\n}\n.ui-pagerdots__dot:hover {\n    background: #a0a0a0;\n}\n\n.ui-pagerdots__dot_active {\n    width: 22px;\n    border-radius: 5px;\n    background: #0176d3;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Pager Dots</masterLabel>\n    <description>汎用ドットページャー。ドットクリックで change イベントを発火。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiLoadingDots",
      "title": "UI Loading Dots",
      "icon": "⏺️",
      "category": "フィードバック",
      "demo": "loadingdots",
      "description": "3 つのドットが順に弾む控えめなローディング表現。スピナーより軽い読み込み中表示。",
      "props": [
        {
          "name": "variant",
          "type": "String",
          "def": "'brand'",
          "desc": "brand | neutral"
        },
        {
          "name": "alternative-text",
          "type": "String",
          "def": "'読み込み中'",
          "desc": "スクリーンリーダー向けテキスト"
        }
      ],
      "events": [],
      "usage": "<c-ui-loading-dots></c-ui-loading-dots>",
      "ja": "ローディングドット",
      "files": {
        "html": "<template>\n    <span class={rootClass} role=\"status\">\n        <span class=\"ui-dots__dot\"></span>\n        <span class=\"ui-dots__dot\"></span>\n        <span class=\"ui-dots__dot\"></span>\n        <span class=\"ui-dots__assistive\">{alternativeText}</span>\n    </span>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\nconst VARIANTS = ['brand', 'neutral'];\n\n/**\n * uiLoadingDots — 汎用ローディングドット。\n * 3 つのドットが順に弾むローディング表現。スピナーより控えめな読み込み中表示。\n */\nexport default class UiLoadingDots extends LightningElement {\n    /** 色: brand | neutral */\n    @api variant = 'brand';\n    /** スクリーンリーダー向けテキスト */\n    @api alternativeText = '読み込み中';\n\n    get rootClass() {\n        const variant = VARIANTS.includes(this.variant) ? this.variant : 'brand';\n        return `ui-dots ui-dots_${variant}`;\n    }\n}\n",
        "css": ".ui-dots {\n    display: inline-flex;\n    align-items: center;\n    gap: 6px;\n}\n\n.ui-dots__dot {\n    width: 9px;\n    height: 9px;\n    border-radius: 50%;\n    background: #0176d3;\n    animation: ui-dots-bounce 1.2s ease-in-out infinite;\n}\n\n.ui-dots_neutral .ui-dots__dot {\n    background: #969492;\n}\n\n.ui-dots__dot:nth-child(2) {\n    animation-delay: 0.18s;\n}\n.ui-dots__dot:nth-child(3) {\n    animation-delay: 0.36s;\n}\n\n.ui-dots__assistive {\n    position: absolute;\n    width: 1px;\n    height: 1px;\n    overflow: hidden;\n    clip: rect(0 0 0 0);\n    white-space: nowrap;\n}\n\n@keyframes ui-dots-bounce {\n    0%,\n    80%,\n    100% {\n        transform: translateY(0);\n        opacity: 0.5;\n    }\n    40% {\n        transform: translateY(-7px);\n        opacity: 1;\n    }\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Loading Dots</masterLabel>\n    <description>汎用ローディングドット。3つのドットが順に弾む控えめな読み込み表示。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiPasswordInput",
      "title": "UI Password Input",
      "icon": "🔒",
      "category": "フォーム",
      "demo": "passwordinput",
      "description": "目アイコンで表示／非表示を切替えられるパスワード欄。変更時に change イベント (detail.value) を発火。",
      "props": [
        {
          "name": "label",
          "type": "String",
          "def": "—",
          "desc": "ラベル"
        },
        {
          "name": "value",
          "type": "String",
          "def": "''",
          "desc": "値"
        },
        {
          "name": "placeholder",
          "type": "String",
          "def": "''",
          "desc": "プレースホルダ"
        }
      ],
      "events": [
        {
          "name": "change",
          "desc": "変更時に発火（detail.value）"
        }
      ],
      "usage": "<c-ui-password-input label=\"パスワード\" onchange={handleChange}></c-ui-password-input>",
      "ja": "パスワード入力",
      "files": {
        "html": "<template>\n    <div class=\"ui-password\">\n        <label lwc:if={label} class=\"ui-password__label\">{label}</label>\n        <div class=\"ui-password__field\">\n            <input\n                class=\"ui-password__input\"\n                type={fieldType}\n                value={value}\n                placeholder={placeholder}\n                oninput={handleInput}\n            />\n            <button\n                class=\"ui-password__toggle\"\n                type=\"button\"\n                title=\"表示切替\"\n                onclick={toggle}\n            >\n                {toggleIcon}\n            </button>\n        </div>\n    </div>\n</template>\n",
        "js": "import { LightningElement, api, track } from 'lwc';\n\n/**\n * uiPasswordInput — 汎用パスワード入力。\n * 目アイコンで表示／非表示を切替えられるパスワード欄。変更時に change イベント\n * (detail.value) を発火する。\n */\nexport default class UiPasswordInput extends LightningElement {\n    /** ラベル */\n    @api label;\n    /** 値 */\n    @api value = '';\n    /** プレースホルダ */\n    @api placeholder = '';\n\n    @track shown = false;\n\n    get fieldType() {\n        return this.shown ? 'text' : 'password';\n    }\n\n    get toggleIcon() {\n        return this.shown ? '🙈' : '👁️';\n    }\n\n    handleInput(event) {\n        this.value = event.target.value;\n        this.dispatchEvent(\n            new CustomEvent('change', { detail: { value: this.value } })\n        );\n    }\n\n    toggle() {\n        this.shown = !this.shown;\n    }\n}\n",
        "css": ".ui-password {\n    display: flex;\n    flex-direction: column;\n    gap: 4px;\n}\n\n.ui-password__label {\n    font-size: 0.78rem;\n    font-weight: 600;\n    color: #444444;\n}\n\n.ui-password__field {\n    display: flex;\n    align-items: center;\n    height: 34px;\n    border: 1px solid #c9c9c9;\n    border-radius: 6px;\n    background: #ffffff;\n    overflow: hidden;\n}\n.ui-password__field:focus-within {\n    border-color: #0176d3;\n    box-shadow: 0 0 0 2px rgba(1, 118, 211, 0.25);\n}\n\n.ui-password__input {\n    flex: 1;\n    border: none;\n    outline: none;\n    height: 100%;\n    padding: 0 0 0 12px;\n    font-size: 0.875rem;\n    color: #181818;\n    font-family: inherit;\n    letter-spacing: 0.06em;\n}\n\n.ui-password__toggle {\n    border: none;\n    background: transparent;\n    cursor: pointer;\n    font-size: 0.95rem;\n    padding: 0 10px;\n    height: 100%;\n}\n.ui-password__toggle:hover {\n    background: #f3f3f3;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Password Input</masterLabel>\n    <description>汎用パスワード入力。目アイコンで表示/非表示を切替え change を発火。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiComboBox",
      "title": "UI Combo Box",
      "icon": "🔽",
      "category": "フォーム",
      "demo": "combobox",
      "description": "入力でリストを絞り込み選択する検索付きセレクト。選択時に change イベント (detail.value) を発火し外側クリックで閉じる。",
      "props": [
        {
          "name": "options",
          "type": "Array",
          "def": "[]",
          "desc": "文字列または { label, value } の配列"
        },
        {
          "name": "label",
          "type": "String",
          "def": "—",
          "desc": "ラベル"
        },
        {
          "name": "placeholder",
          "type": "String",
          "def": "'選択または入力'",
          "desc": "プレースホルダ"
        },
        {
          "name": "value",
          "type": "String",
          "def": "—",
          "desc": "選択値"
        }
      ],
      "events": [
        {
          "name": "change",
          "desc": "選択時に発火（detail.value）"
        }
      ],
      "usage": "<c-ui-combo-box label=\"都道府県\" options={prefs} onchange={handleChange}></c-ui-combo-box>",
      "ja": "コンボボックス",
      "files": {
        "html": "<template>\n    <div class=\"ui-combo\" onfocusout={handleFocusOut}>\n        <label lwc:if={label} class=\"ui-combo__label\">{label}</label>\n        <input\n            class=\"ui-combo__input\"\n            type=\"text\"\n            value={query}\n            placeholder={placeholder}\n            oninput={handleInput}\n            onfocus={handleFocus}\n        />\n        <ul lwc:if={open} class=\"ui-combo__menu\" role=\"listbox\">\n            <template for:each={filtered} for:item=\"opt\">\n                <li key={opt.value} role=\"none\">\n                    <button\n                        class=\"ui-combo__item\"\n                        type=\"button\"\n                        role=\"option\"\n                        data-value={opt.value}\n                        onclick={handleSelect}\n                    >\n                        {opt.label}\n                    </button>\n                </li>\n            </template>\n            <li lwc:if={isEmpty} class=\"ui-combo__empty\">該当なし</li>\n        </ul>\n    </div>\n</template>\n",
        "js": "import { LightningElement, api, track } from 'lwc';\n\n/**\n * uiComboBox — 汎用コンボボックス（検索付きセレクト）。\n * 入力でリストを絞り込み、選択すると change イベント (detail.value) を発火する。\n * 外側へフォーカスが外れるとリストを閉じる。\n */\nexport default class UiComboBox extends LightningElement {\n    _options = [];\n\n    /** 文字列または { label, value } の配列 */\n    @api\n    get options() {\n        return this._options;\n    }\n    set options(value) {\n        this._options = (Array.isArray(value) ? value : []).map((o) =>\n            typeof o === 'string' ? { label: o, value: o } : o\n        );\n    }\n\n    /** ラベル */\n    @api label;\n    /** プレースホルダ */\n    @api placeholder = '選択または入力';\n    /** 選択値 */\n    @api value;\n\n    @track open = false;\n    @track query = '';\n\n    get filtered() {\n        const q = (this.query || '').toLowerCase();\n        return this._options.filter((o) => o.label.toLowerCase().includes(q));\n    }\n\n    get isEmpty() {\n        return this.filtered.length === 0;\n    }\n\n    handleInput(event) {\n        this.query = event.target.value;\n        this.open = true;\n    }\n\n    handleFocus() {\n        this.open = true;\n    }\n\n    handleSelect(event) {\n        const v = event.currentTarget.dataset.value;\n        const option = this._options.find((o) => String(o.value) === v);\n        this.query = option ? option.label : '';\n        this.value = v;\n        this.open = false;\n        this.dispatchEvent(new CustomEvent('change', { detail: { value: v } }));\n    }\n\n    handleFocusOut(event) {\n        if (\n            this.open &&\n            (!event.relatedTarget ||\n                !event.currentTarget.contains(event.relatedTarget))\n        ) {\n            this.open = false;\n        }\n    }\n}\n",
        "css": ".ui-combo {\n    position: relative;\n    display: flex;\n    flex-direction: column;\n    gap: 4px;\n}\n\n.ui-combo__label {\n    font-size: 0.78rem;\n    font-weight: 600;\n    color: #444444;\n}\n\n.ui-combo__input {\n    height: 34px;\n    padding: 0 12px;\n    border: 1px solid #c9c9c9;\n    border-radius: 6px;\n    font-size: 0.875rem;\n    color: #181818;\n    background: #ffffff;\n    font-family: inherit;\n}\n.ui-combo__input:focus {\n    outline: none;\n    border-color: #0176d3;\n    box-shadow: 0 0 0 2px rgba(1, 118, 211, 0.25);\n}\n\n.ui-combo__menu {\n    position: absolute;\n    top: 100%;\n    left: 0;\n    right: 0;\n    margin: 4px 0 0;\n    padding: 4px;\n    list-style: none;\n    background: #ffffff;\n    border: 1px solid #e5e5e5;\n    border-radius: 8px;\n    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);\n    max-height: 200px;\n    overflow-y: auto;\n    z-index: 20;\n}\n\n.ui-combo__item {\n    display: block;\n    width: 100%;\n    text-align: left;\n    border: none;\n    background: transparent;\n    padding: 8px 12px;\n    font-size: 0.82rem;\n    color: #181818;\n    border-radius: 6px;\n    cursor: pointer;\n    font-family: inherit;\n}\n.ui-combo__item:hover {\n    background: #f3f9ff;\n    color: #0176d3;\n}\n\n.ui-combo__empty {\n    padding: 8px 12px;\n    font-size: 0.8rem;\n    color: #969492;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Combo Box</masterLabel>\n    <description>汎用コンボボックス。入力で絞り込み、選択で change イベントを発火。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiThermometer",
      "title": "UI Thermometer",
      "icon": "🌡️",
      "category": "表示",
      "demo": "thermometer",
      "description": "0〜100 の値を下から積み上がる縦バーで表示する縦型メーター。",
      "props": [
        {
          "name": "value",
          "type": "Number",
          "def": "0",
          "desc": "値 0〜100"
        },
        {
          "name": "label",
          "type": "String",
          "def": "—",
          "desc": "ラベル"
        },
        {
          "name": "variant",
          "type": "String",
          "def": "'brand'",
          "desc": "brand | success | warning | error"
        }
      ],
      "events": [],
      "usage": "<c-ui-thermometer value=\"72\" label=\"達成\"></c-ui-thermometer>",
      "ja": "サーモメーター",
      "files": {
        "html": "<template>\n    <div class=\"ui-thermo\">\n        <span class=\"ui-thermo__value\">{valueText}</span>\n        <div class=\"ui-thermo__track\">\n            <div class={fillClass} style={fillStyle}></div>\n        </div>\n        <span lwc:if={label} class=\"ui-thermo__label\">{label}</span>\n    </div>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\nconst VARIANTS = ['brand', 'success', 'warning', 'error'];\n\n/**\n * uiThermometer — 汎用サーモメーター（縦型メーター）。\n * 0〜100 の値を下から積み上がる縦バーで表示する。\n */\nexport default class UiThermometer extends LightningElement {\n    /** 値 0〜100 */\n    @api value = 0;\n    /** ラベル */\n    @api label;\n    /** 色: brand | success | warning | error */\n    @api variant = 'brand';\n\n    get clamped() {\n        const n = Number(this.value);\n        if (Number.isNaN(n)) {\n            return 0;\n        }\n        return Math.min(100, Math.max(0, n));\n    }\n\n    get fillStyle() {\n        return `height: ${this.clamped}%`;\n    }\n\n    get fillClass() {\n        const variant = VARIANTS.includes(this.variant) ? this.variant : 'brand';\n        return `ui-thermo__fill ui-thermo__fill_${variant}`;\n    }\n\n    get valueText() {\n        return `${Math.round(this.clamped)}%`;\n    }\n}\n",
        "css": ".ui-thermo {\n    display: inline-flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 6px;\n}\n\n.ui-thermo__value {\n    font-size: 0.8rem;\n    font-weight: 700;\n    color: #181818;\n}\n\n.ui-thermo__track {\n    position: relative;\n    width: 18px;\n    height: 120px;\n    background: #ececec;\n    border-radius: 9px;\n    overflow: hidden;\n    display: flex;\n    align-items: flex-end;\n}\n\n.ui-thermo__fill {\n    width: 100%;\n    border-radius: 9px;\n    transition: height 0.35s ease;\n}\n\n.ui-thermo__fill_brand {\n    background: #0176d3;\n}\n.ui-thermo__fill_success {\n    background: #2e844a;\n}\n.ui-thermo__fill_warning {\n    background: #dd7a01;\n}\n.ui-thermo__fill_error {\n    background: #ba0517;\n}\n\n.ui-thermo__label {\n    font-size: 0.72rem;\n    color: #706e6b;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Thermometer</masterLabel>\n    <description>汎用サーモメーター。0〜100を下から積み上がる縦バーで表示。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiConfirmDialog",
      "title": "UI Confirm Dialog",
      "icon": "❓",
      "category": "オーバーレイ",
      "demo": "confirmdialog",
      "description": "open で表示する確定／取消つきの小型モーダル。確定で confirm、取消・背景・Esc で cancel を発火。",
      "props": [
        {
          "name": "header",
          "type": "String",
          "def": "'確認'",
          "desc": "ヘッダ"
        },
        {
          "name": "message",
          "type": "String",
          "def": "—",
          "desc": "メッセージ本文"
        },
        {
          "name": "open",
          "type": "Boolean",
          "def": "false",
          "desc": "true で表示"
        },
        {
          "name": "variant",
          "type": "String",
          "def": "'brand'",
          "desc": "確定ボタン: brand | destructive"
        },
        {
          "name": "confirm-label",
          "type": "String",
          "def": "'OK'",
          "desc": "確定ラベル"
        },
        {
          "name": "cancel-label",
          "type": "String",
          "def": "'キャンセル'",
          "desc": "取消ラベル"
        }
      ],
      "events": [
        {
          "name": "confirm",
          "desc": "確定時に発火"
        },
        {
          "name": "cancel",
          "desc": "取消・背景・Esc で発火"
        }
      ],
      "usage": "<c-ui-confirm-dialog open={isOpen} message=\"削除しますか？\" variant=\"destructive\" onconfirm={handleOk} oncancel={handleCancel}></c-ui-confirm-dialog>",
      "ja": "確認ダイアログ",
      "files": {
        "html": "<template>\n    <template lwc:if={open}>\n        <div\n            class=\"ui-confirm-backdrop\"\n            onclick={handleCancel}\n            onkeydown={handleKeydown}\n        >\n            <section\n                class=\"ui-confirm\"\n                role=\"alertdialog\"\n                aria-modal=\"true\"\n                aria-label={header}\n                onclick={stopPropagation}\n            >\n                <h2 class=\"ui-confirm__header\">{header}</h2>\n                <p lwc:if={message} class=\"ui-confirm__message\">{message}</p>\n                <div class=\"ui-confirm__footer\">\n                    <button\n                        class=\"ui-confirm__btn ui-confirm__btn_cancel\"\n                        type=\"button\"\n                        onclick={handleCancel}\n                    >\n                        {cancelLabel}\n                    </button>\n                    <button\n                        class={confirmClass}\n                        type=\"button\"\n                        onclick={handleConfirm}\n                    >\n                        {confirmLabel}\n                    </button>\n                </div>\n            </section>\n        </div>\n    </template>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\n/**\n * uiConfirmDialog — 汎用確認ダイアログ。\n * open で表示制御し、確定／取消ボタンを持つ小型モーダル。\n * 確定で confirm、取消・背景・Esc で cancel イベントを発火する。\n */\nexport default class UiConfirmDialog extends LightningElement {\n    /** ヘッダ */\n    @api header = '確認';\n    /** メッセージ本文 */\n    @api message;\n    /** true で表示 */\n    @api open = false;\n    /** 確定ボタンの種別: brand | destructive */\n    @api variant = 'brand';\n    /** 確定ボタンのラベル */\n    @api confirmLabel = 'OK';\n    /** 取消ボタンのラベル */\n    @api cancelLabel = 'キャンセル';\n\n    get confirmClass() {\n        const v = this.variant === 'destructive' ? 'destructive' : 'brand';\n        return `ui-confirm__btn ui-confirm__btn_${v}`;\n    }\n\n    handleConfirm() {\n        this.dispatchEvent(new CustomEvent('confirm'));\n    }\n\n    handleCancel() {\n        this.dispatchEvent(new CustomEvent('cancel'));\n    }\n\n    handleKeydown(event) {\n        if (event.key === 'Escape') {\n            this.handleCancel();\n        }\n    }\n\n    stopPropagation(event) {\n        event.stopPropagation();\n    }\n}\n",
        "css": ".ui-confirm-backdrop {\n    position: fixed;\n    inset: 0;\n    background: rgba(8, 7, 7, 0.5);\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    padding: 16px;\n    z-index: 9200;\n}\n\n.ui-confirm {\n    width: 100%;\n    max-width: 380px;\n    background: #ffffff;\n    border-radius: 10px;\n    padding: 22px;\n    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.28);\n}\n\n.ui-confirm__header {\n    margin: 0 0 8px;\n    font-size: 1.05rem;\n    font-weight: 700;\n    color: #181818;\n}\n\n.ui-confirm__message {\n    margin: 0 0 18px;\n    font-size: 0.875rem;\n    color: #514f4d;\n    line-height: 1.6;\n}\n\n.ui-confirm__footer {\n    display: flex;\n    justify-content: flex-end;\n    gap: 8px;\n}\n\n.ui-confirm__btn {\n    height: 32px;\n    padding: 0 16px;\n    border-radius: 6px;\n    font-size: 0.8125rem;\n    font-weight: 600;\n    cursor: pointer;\n    font-family: inherit;\n    border: 1px solid transparent;\n}\n\n.ui-confirm__btn_cancel {\n    background: #ffffff;\n    border-color: #c9c9c9;\n    color: #514f4d;\n}\n.ui-confirm__btn_cancel:hover {\n    background: #f3f3f3;\n}\n\n.ui-confirm__btn_brand {\n    background: #0176d3;\n    color: #ffffff;\n}\n.ui-confirm__btn_brand:hover {\n    background: #014486;\n}\n\n.ui-confirm__btn_destructive {\n    background: #ba0517;\n    color: #ffffff;\n}\n.ui-confirm__btn_destructive:hover {\n    background: #8e030f;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Confirm Dialog</masterLabel>\n    <description>汎用確認ダイアログ。確定でconfirm、取消/背景/Escでcancelを発火。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiExpandableText",
      "title": "UI Expandable Text",
      "icon": "📄",
      "category": "表示",
      "demo": "expandabletext",
      "description": "長文を指定行数で省略表示し、「もっと見る／閉じる」で全文を開閉する。",
      "props": [
        {
          "name": "text",
          "type": "String",
          "def": "—",
          "desc": "本文"
        },
        {
          "name": "lines",
          "type": "Number",
          "def": "2",
          "desc": "省略時の表示行数"
        }
      ],
      "events": [],
      "usage": "<c-ui-expandable-text text={longText} lines=\"3\"></c-ui-expandable-text>",
      "ja": "開閉テキスト",
      "files": {
        "html": "<template>\n    <div class=\"ui-exptext\">\n        <div class={textClass} style={clampStyle}>{text}</div>\n        <button class=\"ui-exptext__toggle\" type=\"button\" onclick={toggle}>\n            {toggleLabel}\n        </button>\n    </div>\n</template>\n",
        "js": "import { LightningElement, api, track } from 'lwc';\n\n/**\n * uiExpandableText — 汎用開閉テキスト。\n * 長文を指定行数で省略表示し、「もっと見る／閉じる」で全文を開閉する。\n */\nexport default class UiExpandableText extends LightningElement {\n    /** 本文 */\n    @api text;\n    /** 省略時の表示行数 */\n    @api lines = 2;\n\n    @track expanded = false;\n\n    get textClass() {\n        return this.expanded\n            ? 'ui-exptext__body'\n            : 'ui-exptext__body ui-exptext__body_clamped';\n    }\n\n    get clampStyle() {\n        return this.expanded ? '' : `-webkit-line-clamp: ${this.lines}`;\n    }\n\n    get toggleLabel() {\n        return this.expanded ? '閉じる' : 'もっと見る';\n    }\n\n    toggle() {\n        this.expanded = !this.expanded;\n    }\n}\n",
        "css": ".ui-exptext {\n    font-size: 0.85rem;\n    line-height: 1.6;\n    color: #444444;\n}\n\n.ui-exptext__body_clamped {\n    display: -webkit-box;\n    -webkit-box-orient: vertical;\n    overflow: hidden;\n}\n\n.ui-exptext__toggle {\n    margin-top: 4px;\n    border: none;\n    background: transparent;\n    color: #0176d3;\n    font-size: 0.8rem;\n    font-weight: 600;\n    cursor: pointer;\n    padding: 0;\n    font-family: inherit;\n}\n.ui-exptext__toggle:hover {\n    text-decoration: underline;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Expandable Text</masterLabel>\n    <description>汎用開閉テキスト。指定行数で省略し、もっと見る/閉じるで開閉。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiGrid",
      "title": "UI Grid",
      "icon": "🔳",
      "category": "レイアウト",
      "demo": "grid",
      "description": "default スロットの子要素を auto-fill のグリッドで並べるレスポンシブ段組み。min-width 未満で自動的に段が減る。",
      "props": [
        {
          "name": "min-width",
          "type": "Number",
          "def": "160",
          "desc": "各セルの最小幅(px)"
        },
        {
          "name": "gap",
          "type": "Number",
          "def": "12",
          "desc": "セル間の余白(px)"
        }
      ],
      "slots": [
        {
          "name": "(default)",
          "desc": "グリッドに並べる子要素"
        }
      ],
      "events": [],
      "usage": "<c-ui-grid min-width=\"180\">\n    <c-ui-card>...</c-ui-card>\n</c-ui-grid>",
      "ja": "グリッド",
      "files": {
        "html": "<template>\n    <div class=\"ui-grid\" style={gridStyle}>\n        <slot></slot>\n    </div>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\n/**\n * uiGrid — 汎用レスポンシブグリッド。\n * default スロットの子要素を auto-fill のグリッドで並べる。\n * min-width 未満になると自動で段組みが減り、スマホでも崩れない。\n */\nexport default class UiGrid extends LightningElement {\n    /** 各セルの最小幅(px) */\n    @api minWidth = 160;\n    /** セル間の余白(px) */\n    @api gap = 12;\n\n    get gridStyle() {\n        const min = Number(this.minWidth) || 160;\n        const gap = Number(this.gap) || 12;\n        return `grid-template-columns: repeat(auto-fill, minmax(${min}px, 1fr)); gap: ${gap}px;`;\n    }\n}\n",
        "css": ".ui-grid {\n    display: grid;\n    width: 100%;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Grid</masterLabel>\n    <description>汎用レスポンシブグリッド。min-width基準でauto-fill段組み。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiPillToggleGroup",
      "title": "UI Pill Toggle Group",
      "icon": "🟦",
      "category": "フォーム",
      "demo": "pilltogglegroup",
      "description": "options 配列からピル状の複数選択 UI を生成。変更時に change イベント (detail.values) を発火。",
      "props": [
        {
          "name": "options",
          "type": "Array",
          "def": "[]",
          "desc": "[{ label, value }] の配列"
        },
        {
          "name": "values",
          "type": "Array",
          "def": "[]",
          "desc": "選択中の value 配列"
        }
      ],
      "events": [
        {
          "name": "change",
          "desc": "変更時に発火（detail.values）"
        }
      ],
      "usage": "<c-ui-pill-toggle-group options={tags} onchange={handleChange}></c-ui-pill-toggle-group>",
      "ja": "ピル複数選択",
      "files": {
        "html": "<template>\n    <div class=\"ui-pilltoggle-group\" role=\"group\">\n        <template for:each={computedPills} for:item=\"pill\">\n            <button\n                key={pill.value}\n                class={pill.cssClass}\n                type=\"button\"\n                aria-pressed={pill.selected}\n                data-value={pill.value}\n                onclick={handleToggle}\n            >\n                {pill.label}\n            </button>\n        </template>\n    </div>\n</template>\n",
        "js": "import { LightningElement, api, track } from 'lwc';\n\n/**\n * uiPillToggleGroup — 汎用ピル複数選択。\n * options 配列 ([{ label, value }]) からピル状の複数選択 UI を生成し、\n * 変更時に change イベント (detail.values) を発火する。\n */\nexport default class UiPillToggleGroup extends LightningElement {\n    _options = [];\n    @track _values = [];\n\n    /** [{ label, value }] の配列 */\n    @api\n    get options() {\n        return this._options;\n    }\n    set options(value) {\n        this._options = Array.isArray(value) ? value : [];\n    }\n\n    /** 選択中の value 配列 */\n    @api\n    get values() {\n        return this._values;\n    }\n    set values(value) {\n        this._values = Array.isArray(value) ? [...value] : [];\n    }\n\n    get computedPills() {\n        return this._options.map((o) => ({\n            label: o.label,\n            value: o.value,\n            cssClass: this._values.includes(o.value)\n                ? 'ui-pilltoggle ui-pilltoggle_on'\n                : 'ui-pilltoggle'\n        }));\n    }\n\n    handleToggle(event) {\n        const value = event.currentTarget.dataset.value;\n        this._values = this._values.includes(value)\n            ? this._values.filter((v) => v !== value)\n            : [...this._values, value];\n        this.dispatchEvent(\n            new CustomEvent('change', { detail: { values: [...this._values] } })\n        );\n    }\n}\n",
        "css": ".ui-pilltoggle-group {\n    display: inline-flex;\n    flex-wrap: wrap;\n    gap: 8px;\n}\n\n.ui-pilltoggle {\n    border: 1px solid #c9c9c9;\n    background: #ffffff;\n    color: #444444;\n    padding: 5px 14px;\n    border-radius: 16px;\n    font-size: 0.8rem;\n    font-weight: 600;\n    cursor: pointer;\n    font-family: inherit;\n    transition: background 0.12s ease, color 0.12s ease, border-color 0.12s ease;\n}\n.ui-pilltoggle:hover {\n    border-color: #0176d3;\n    color: #0176d3;\n}\n\n.ui-pilltoggle_on {\n    background: #eef4ff;\n    border-color: #0176d3;\n    color: #0b5cab;\n    box-shadow: inset 0 0 0 1px #0176d3;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Pill Toggle Group</masterLabel>\n    <description>汎用ピル複数選択。ピル状の複数選択で change イベント(values)を発火。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiTagCloud",
      "title": "UI Tag Cloud",
      "icon": "☁️",
      "category": "表示",
      "demo": "tagcloud",
      "description": "tags 配列 ([{ label, weight }]) を重みに応じた文字サイズ・濃さで表示。クリックで select イベント (detail.label) を発火。",
      "props": [
        {
          "name": "tags",
          "type": "Array",
          "def": "[]",
          "desc": "[{ label, weight }] の配列"
        }
      ],
      "events": [
        {
          "name": "select",
          "desc": "タグクリックで発火（detail.label）"
        }
      ],
      "usage": "<c-ui-tag-cloud tags={keywords} onselect={handleSelect}></c-ui-tag-cloud>",
      "ja": "タグクラウド",
      "files": {
        "html": "<template>\n    <div class=\"ui-tagcloud\">\n        <template for:each={computedTags} for:item=\"tag\">\n            <button\n                key={tag.key}\n                class=\"ui-tagcloud__tag\"\n                type=\"button\"\n                style={tag.style}\n                data-label={tag.label}\n                onclick={handleClick}\n            >\n                {tag.label}\n            </button>\n        </template>\n    </div>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\n/**\n * uiTagCloud — 汎用タグクラウド。\n * tags 配列 ([{ label, weight }]) を重みに応じた文字サイズ・濃さで表示する。\n * タグクリックで select イベント (detail.label) を発火する。\n */\nexport default class UiTagCloud extends LightningElement {\n    _tags = [];\n\n    /** [{ label, weight }] の配列 */\n    @api\n    get tags() {\n        return this._tags;\n    }\n    set tags(value) {\n        this._tags = Array.isArray(value) ? value : [];\n    }\n\n    get computedTags() {\n        const weights = this._tags.map((t) => Number(t.weight) || 1);\n        const max = Math.max(1, ...weights);\n        const min = Math.min(...weights, max);\n        const range = max - min || 1;\n        return this._tags.map((t, i) => {\n            const w = Number(t.weight) || 1;\n            const ratio = (w - min) / range;\n            const size = (0.75 + ratio * 0.95).toFixed(2);\n            const opacity = (0.55 + ratio * 0.45).toFixed(2);\n            return {\n                key: i,\n                label: t.label,\n                style: `font-size: ${size}rem; opacity: ${opacity};`\n            };\n        });\n    }\n\n    handleClick(event) {\n        const label = event.currentTarget.dataset.label;\n        this.dispatchEvent(new CustomEvent('select', { detail: { label } }));\n    }\n}\n",
        "css": ".ui-tagcloud {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: 6px 12px;\n    line-height: 1.4;\n}\n\n.ui-tagcloud__tag {\n    border: none;\n    background: transparent;\n    color: #0176d3;\n    cursor: pointer;\n    padding: 2px 2px;\n    font-family: inherit;\n    font-weight: 600;\n    transition: color 0.12s ease;\n}\n.ui-tagcloud__tag:hover {\n    color: #014486;\n    text-decoration: underline;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Tag Cloud</masterLabel>\n    <description>汎用タグクラウド。重みに応じた文字サイズで表示し select を発火。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiMetricCard",
      "title": "UI Metric Card",
      "icon": "📇",
      "category": "ダッシュボード",
      "demo": "metriccard",
      "description": "アイコン・ラベル・大きな値・前期比をまとめた KPI カード。ダッシュボードの定番部品。",
      "props": [
        {
          "name": "icon",
          "type": "String",
          "def": "—",
          "desc": "アイコン文字（絵文字可）"
        },
        {
          "name": "label",
          "type": "String",
          "def": "—",
          "desc": "指標ラベル"
        },
        {
          "name": "value",
          "type": "String",
          "def": "—",
          "desc": "主要な値"
        },
        {
          "name": "delta",
          "type": "String",
          "def": "—",
          "desc": "差分テキスト（例: +12.5%）"
        },
        {
          "name": "trend",
          "type": "String",
          "def": "'flat'",
          "desc": "up | down | flat"
        }
      ],
      "events": [],
      "usage": "<c-ui-metric-card icon=\"💰\" label=\"今月の売上\" value=\"¥1,250,000\" delta=\"+12.5%\" trend=\"up\"></c-ui-metric-card>",
      "ja": "指標カード",
      "files": {
        "html": "<template>\n    <div class=\"ui-metric\">\n        <span lwc:if={icon} class=\"ui-metric__icon\">{icon}</span>\n        <div class=\"ui-metric__body\">\n            <span class=\"ui-metric__label\">{label}</span>\n            <span class=\"ui-metric__value\">{value}</span>\n            <span lwc:if={hasDelta} class={deltaClass}>\n                <span class=\"ui-metric__trend\">{trendIcon}</span>\n                {delta}\n            </span>\n        </div>\n    </div>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\nconst TRENDS = {\n    up: { icon: '▲', cls: 'up' },\n    down: { icon: '▼', cls: 'down' },\n    flat: { icon: '▬', cls: 'flat' }\n};\n\n/**\n * uiMetricCard — 汎用指標カード（ダッシュボード KPI）。\n * アイコン・ラベル・大きな値・前期比をまとめた KPI カード。\n */\nexport default class UiMetricCard extends LightningElement {\n    /** アイコン文字（絵文字可） */\n    @api icon;\n    /** 指標ラベル */\n    @api label;\n    /** 主要な値 */\n    @api value;\n    /** 差分テキスト（例: +12.5%） */\n    @api delta;\n    /** 増減: up | down | flat */\n    @api trend = 'flat';\n\n    get hasDelta() {\n        return this.delta !== undefined && this.delta !== null && this.delta !== '';\n    }\n\n    get trendIcon() {\n        return (TRENDS[this.trend] || TRENDS.flat).icon;\n    }\n\n    get deltaClass() {\n        const cls = (TRENDS[this.trend] || TRENDS.flat).cls;\n        return `ui-metric__delta ui-metric__delta_${cls}`;\n    }\n}\n",
        "css": ".ui-metric {\n    display: flex;\n    align-items: center;\n    gap: 14px;\n    padding: 16px 18px;\n    background: #ffffff;\n    border: 1px solid #e5e5e5;\n    border-radius: 10px;\n    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);\n    min-width: 180px;\n}\n\n.ui-metric__icon {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    width: 46px;\n    height: 46px;\n    border-radius: 12px;\n    background: #eef4ff;\n    font-size: 1.5rem;\n    flex-shrink: 0;\n}\n\n.ui-metric__body {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n}\n\n.ui-metric__label {\n    font-size: 0.75rem;\n    color: #706e6b;\n    font-weight: 600;\n}\n\n.ui-metric__value {\n    font-size: 1.6rem;\n    font-weight: 800;\n    color: #181818;\n    line-height: 1.1;\n}\n\n.ui-metric__delta {\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    font-size: 0.75rem;\n    font-weight: 700;\n}\n.ui-metric__trend {\n    font-size: 0.6rem;\n}\n\n.ui-metric__delta_up {\n    color: #2e844a;\n}\n.ui-metric__delta_down {\n    color: #ba0517;\n}\n.ui-metric__delta_flat {\n    color: #706e6b;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Metric Card</masterLabel>\n    <description>汎用指標カード。アイコン・ラベル・値・前期比のKPIカード。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiDonutChart",
      "title": "UI Donut Chart",
      "icon": "🍩",
      "category": "ダッシュボード",
      "demo": "donutchart",
      "description": "segments 配列 ([{ label, value, color }]) を conic-gradient のドーナツと凡例で表示する構成比チャート。",
      "props": [
        {
          "name": "segments",
          "type": "Array",
          "def": "[]",
          "desc": "[{ label, value, color }] の配列"
        },
        {
          "name": "center-label",
          "type": "String",
          "def": "—",
          "desc": "中央の見出し（任意）"
        }
      ],
      "events": [],
      "usage": "<c-ui-donut-chart segments={data} center-label=\"売上\"></c-ui-donut-chart>",
      "ja": "ドーナツチャート",
      "files": {
        "html": "<template>\n    <div class=\"ui-donut-wrap\">\n        <div class=\"ui-donut\" style={backgroundStyle}>\n            <div class=\"ui-donut__hole\">\n                <span lwc:if={centerLabel} class=\"ui-donut__center\">{centerLabel}</span>\n            </div>\n        </div>\n        <ul class=\"ui-donut__legend\">\n            <template for:each={legend} for:item=\"item\">\n                <li key={item.key} class=\"ui-donut__item\">\n                    <span class=\"ui-donut__sw\" style={item.swatchStyle}></span>\n                    <span class=\"ui-donut__lbl\">{item.label}</span>\n                    <span class=\"ui-donut__pct\">{item.pct}%</span>\n                </li>\n            </template>\n        </ul>\n    </div>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\n/**\n * uiDonutChart — 汎用ドーナツチャート。\n * segments 配列 ([{ label, value, color }]) を conic-gradient のドーナツと\n * 凡例で表示する純粋な表示コンポーネント。\n */\nexport default class UiDonutChart extends LightningElement {\n    _segments = [];\n\n    /** [{ label, value, color }] の配列 */\n    @api\n    get segments() {\n        return this._segments;\n    }\n    set segments(value) {\n        this._segments = Array.isArray(value) ? value : [];\n    }\n\n    /** 中央に表示する見出し（任意） */\n    @api centerLabel;\n\n    get total() {\n        return (\n            this._segments.reduce((a, s) => a + (Number(s.value) || 0), 0) || 1\n        );\n    }\n\n    get backgroundStyle() {\n        let acc = 0;\n        const parts = this._segments.map((s) => {\n            const start = (acc / this.total) * 360;\n            acc += Number(s.value) || 0;\n            const end = (acc / this.total) * 360;\n            return `${s.color} ${start.toFixed(1)}deg ${end.toFixed(1)}deg`;\n        });\n        return `background: conic-gradient(${parts.join(', ')});`;\n    }\n\n    get legend() {\n        return this._segments.map((s, i) => ({\n            key: i,\n            label: s.label,\n            pct: Math.round(((Number(s.value) || 0) / this.total) * 100),\n            swatchStyle: `background: ${s.color}`\n        }));\n    }\n}\n",
        "css": ".ui-donut-wrap {\n    display: inline-flex;\n    align-items: center;\n    gap: 18px;\n}\n\n.ui-donut {\n    position: relative;\n    width: 108px;\n    height: 108px;\n    border-radius: 50%;\n    flex-shrink: 0;\n}\n\n.ui-donut__hole {\n    position: absolute;\n    inset: 24px;\n    background: #ffffff;\n    border-radius: 50%;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n\n.ui-donut__center {\n    font-size: 0.78rem;\n    font-weight: 700;\n    color: #181818;\n    text-align: center;\n}\n\n.ui-donut__legend {\n    list-style: none;\n    margin: 0;\n    padding: 0;\n    display: flex;\n    flex-direction: column;\n    gap: 6px;\n}\n\n.ui-donut__item {\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    font-size: 0.8rem;\n}\n\n.ui-donut__sw {\n    width: 11px;\n    height: 11px;\n    border-radius: 3px;\n    flex-shrink: 0;\n}\n\n.ui-donut__lbl {\n    color: #444444;\n    min-width: 66px;\n}\n\n.ui-donut__pct {\n    font-weight: 700;\n    color: #181818;\n    font-variant-numeric: tabular-nums;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Donut Chart</masterLabel>\n    <description>汎用ドーナツチャート。conic-gradientと凡例で構成比を表示。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiActivityFeed",
      "title": "UI Activity Feed",
      "icon": "📋",
      "category": "ダッシュボード",
      "demo": "activityfeed",
      "description": "items 配列 ([{ icon, text, time }]) を時系列の活動ログとして表示するフィード。",
      "props": [
        {
          "name": "items",
          "type": "Array",
          "def": "[]",
          "desc": "[{ icon, text, time }] の配列"
        }
      ],
      "events": [],
      "usage": "<c-ui-activity-feed items={activities}></c-ui-activity-feed>",
      "ja": "アクティビティフィード",
      "files": {
        "html": "<template>\n    <ul class=\"ui-feed\">\n        <template for:each={rows} for:item=\"row\">\n            <li key={row.key} class=\"ui-feed__item\">\n                <span class=\"ui-feed__icon\">{row.icon}</span>\n                <div class=\"ui-feed__content\">\n                    <span class=\"ui-feed__text\">{row.text}</span>\n                    <span class=\"ui-feed__time\">{row.time}</span>\n                </div>\n            </li>\n        </template>\n    </ul>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\n/**\n * uiActivityFeed — 汎用アクティビティフィード。\n * items 配列 ([{ icon, text, time }]) を時系列の活動ログとして表示する。\n */\nexport default class UiActivityFeed extends LightningElement {\n    _items = [];\n\n    /** [{ icon, text, time }] の配列 */\n    @api\n    get items() {\n        return this._items;\n    }\n    set items(value) {\n        this._items = Array.isArray(value) ? value : [];\n    }\n\n    get rows() {\n        return this._items.map((it, i) => ({\n            key: i,\n            icon: it.icon || '•',\n            text: it.text,\n            time: it.time\n        }));\n    }\n}\n",
        "css": ".ui-feed {\n    list-style: none;\n    margin: 0;\n    padding: 0;\n}\n\n.ui-feed__item {\n    display: flex;\n    gap: 10px;\n    padding: 10px 0;\n    border-bottom: 1px solid #f0f0f0;\n}\n.ui-feed__item:last-child {\n    border-bottom: none;\n}\n\n.ui-feed__icon {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    width: 30px;\n    height: 30px;\n    border-radius: 50%;\n    background: #f0f4f9;\n    font-size: 0.9rem;\n    flex-shrink: 0;\n}\n\n.ui-feed__content {\n    display: flex;\n    flex-direction: column;\n    gap: 1px;\n    min-width: 0;\n}\n\n.ui-feed__text {\n    font-size: 0.85rem;\n    color: #181818;\n    line-height: 1.4;\n}\n\n.ui-feed__time {\n    font-size: 0.72rem;\n    color: #969492;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Activity Feed</masterLabel>\n    <description>汎用アクティビティフィード。アイコン・テキスト・時刻の活動ログ。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiGoalProgress",
      "title": "UI Goal Progress",
      "icon": "🎯",
      "category": "ダッシュボード",
      "demo": "goalprogress",
      "description": "current / target の達成度をバーと割合で表示する目標プログレス。達成で色が変わる。",
      "props": [
        {
          "name": "label",
          "type": "String",
          "def": "—",
          "desc": "ラベル"
        },
        {
          "name": "current",
          "type": "Number",
          "def": "0",
          "desc": "現在値"
        },
        {
          "name": "target",
          "type": "Number",
          "def": "100",
          "desc": "目標値"
        }
      ],
      "events": [],
      "usage": "<c-ui-goal-progress label=\"月間目標\" current=\"820000\" target=\"1000000\"></c-ui-goal-progress>",
      "ja": "目標プログレス",
      "files": {
        "html": "<template>\n    <div class=\"ui-goal\">\n        <div class=\"ui-goal__head\">\n            <span class=\"ui-goal__label\">{label}</span>\n            <span class=\"ui-goal__pct\">{pctText}</span>\n        </div>\n        <div class=\"ui-goal__track\">\n            <div class={fillClass} style={barStyle}></div>\n        </div>\n        <div class=\"ui-goal__value\">{valueText}</div>\n    </div>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\n/**\n * uiGoalProgress — 汎用目標プログレス。\n * current / target の達成度をバーと割合で表示するダッシュボード向け部品。\n */\nexport default class UiGoalProgress extends LightningElement {\n    /** ラベル */\n    @api label;\n    /** 現在値 */\n    @api current = 0;\n    /** 目標値 */\n    @api target = 100;\n\n    get ratio() {\n        const target = Number(this.target) || 1;\n        const cur = Number(this.current) || 0;\n        return Math.min(1, Math.max(0, cur / target));\n    }\n\n    get pctText() {\n        return `${Math.round(this.ratio * 100)}%`;\n    }\n\n    get barStyle() {\n        return `width: ${Math.round(this.ratio * 100)}%`;\n    }\n\n    get fillClass() {\n        return this.ratio >= 1\n            ? 'ui-goal__fill ui-goal__fill_done'\n            : 'ui-goal__fill';\n    }\n\n    get valueText() {\n        const cur = Number(this.current) || 0;\n        const target = Number(this.target) || 0;\n        return `${cur.toLocaleString('ja-JP')} / ${target.toLocaleString('ja-JP')}`;\n    }\n}\n",
        "css": ".ui-goal {\n    display: flex;\n    flex-direction: column;\n    gap: 6px;\n    width: 100%;\n    max-width: 320px;\n}\n\n.ui-goal__head {\n    display: flex;\n    justify-content: space-between;\n    align-items: baseline;\n}\n\n.ui-goal__label {\n    font-size: 0.82rem;\n    font-weight: 600;\n    color: #444444;\n}\n\n.ui-goal__pct {\n    font-size: 1rem;\n    font-weight: 800;\n    color: #0176d3;\n}\n\n.ui-goal__track {\n    height: 10px;\n    background: #ececec;\n    border-radius: 5px;\n    overflow: hidden;\n}\n\n.ui-goal__fill {\n    height: 100%;\n    background: #0176d3;\n    border-radius: 5px;\n    transition: width 0.35s ease;\n}\n.ui-goal__fill_done {\n    background: #2e844a;\n}\n\n.ui-goal__value {\n    font-size: 0.75rem;\n    color: #706e6b;\n    text-align: right;\n    font-variant-numeric: tabular-nums;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Goal Progress</masterLabel>\n    <description>汎用目標プログレス。current/targetの達成度をバーと割合で表示。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiRecordCard",
      "title": "UI Record Card",
      "icon": "🪪",
      "category": "レコード",
      "demo": "recordcard",
      "description": "recordId・objectApiName・fields から getRecord ワイヤでレコードを取得し、アイコン付きカードにフィールドを並べる。Record ページ向け。（プレビューはサンプル値）",
      "props": [
        {
          "name": "record-id",
          "type": "String",
          "def": "—",
          "desc": "レコード Id"
        },
        {
          "name": "object-api-name",
          "type": "String",
          "def": "—",
          "desc": "オブジェクト API 名"
        },
        {
          "name": "fields",
          "type": "String",
          "def": "''",
          "desc": "カンマ区切りの修飾フィールド名（例: Account.Name,Account.Phone）"
        },
        {
          "name": "icon-name",
          "type": "String",
          "def": "'standard:record'",
          "desc": "ヘッダアイコン"
        },
        {
          "name": "title",
          "type": "String",
          "def": "—",
          "desc": "カードタイトル"
        }
      ],
      "events": [],
      "usage": "<c-ui-record-card record-id={recordId} object-api-name=\"Account\" title=\"取引先\" fields=\"Account.Name,Account.Phone,Account.Industry\"></c-ui-record-card>",
      "ja": "レコードカード",
      "files": {
        "html": "<template>\n    <article class=\"ui-reccard\">\n        <header class=\"ui-reccard__header\">\n            <lightning-icon\n                icon-name={iconName}\n                size=\"small\"\n                class=\"ui-reccard__icon\"\n            ></lightning-icon>\n            <h2 class=\"ui-reccard__title\">{title}</h2>\n        </header>\n        <div class=\"ui-reccard__body\">\n            <template lwc:if={hasData}>\n                <template for:each={rows} for:item=\"row\">\n                    <div key={row.key} class=\"ui-reccard__row\">\n                        <span class=\"ui-reccard__label\">{row.label}</span>\n                        <span class=\"ui-reccard__value\">{row.value}</span>\n                    </div>\n                </template>\n            </template>\n            <template lwc:else>\n                <div class=\"ui-reccard__empty\">レコードを読み込み中…</div>\n            </template>\n        </div>\n    </article>\n</template>\n",
        "js": "import { LightningElement, api, wire } from 'lwc';\nimport { getRecord, getFieldDisplayValue } from 'lightning/uiRecordApi';\n\n/**\n * uiRecordCard — レコードカード。\n * recordId と objectApiName、fields（カンマ区切りの修飾フィールド名）から\n * getRecord ワイヤでレコードを取得し、アイコン付きカードにフィールドを並べる。\n *\n * 例: fields=\"Account.Name,Account.Phone,Account.Industry\"\n */\nexport default class UiRecordCard extends LightningElement {\n    /** レコード Id */\n    @api recordId;\n    /** オブジェクト API 名（例: Account） */\n    @api objectApiName;\n    /** カンマ区切りの修飾フィールド名 */\n    @api fields = '';\n    /** ヘッダアイコン（lightning-icon 名） */\n    @api iconName = 'standard:record';\n    /** カードタイトル */\n    @api title;\n\n    get fieldList() {\n        return this.fields\n            ? this.fields.split(',').map((f) => f.trim()).filter((f) => f)\n            : [];\n    }\n\n    @wire(getRecord, { recordId: '$recordId', fields: '$fieldList' })\n    record;\n\n    get hasData() {\n        return !!(this.record && this.record.data);\n    }\n\n    get rows() {\n        if (!this.hasData) {\n            return [];\n        }\n        return this.fieldList.map((f) => {\n            const apiName = f.split('.').pop();\n            const label = apiName\n                .replace(/__c$/, '')\n                .replace(/_/g, ' ');\n            return {\n                key: f,\n                label,\n                value: getFieldDisplayValue(this.record.data, f)\n            };\n        });\n    }\n}\n",
        "css": ".ui-reccard {\n    background: #ffffff;\n    border: 1px solid #e5e5e5;\n    border-radius: 8px;\n    overflow: hidden;\n    min-width: 240px;\n}\n\n.ui-reccard__header {\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    padding: 12px 16px;\n    border-bottom: 1px solid #ececec;\n    background: #fafaf9;\n}\n\n.ui-reccard__title {\n    margin: 0;\n    font-size: 0.95rem;\n    font-weight: 700;\n    color: #181818;\n}\n\n.ui-reccard__body {\n    padding: 8px 16px 14px;\n}\n\n.ui-reccard__row {\n    display: flex;\n    flex-direction: column;\n    gap: 1px;\n    padding: 7px 0;\n    border-bottom: 1px solid #f3f3f3;\n}\n.ui-reccard__row:last-child {\n    border-bottom: none;\n}\n\n.ui-reccard__label {\n    font-size: 0.72rem;\n    color: #706e6b;\n    font-weight: 600;\n}\n\n.ui-reccard__value {\n    font-size: 0.875rem;\n    color: #181818;\n}\n\n.ui-reccard__empty {\n    padding: 12px 0;\n    font-size: 0.82rem;\n    color: #969492;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Record Card</masterLabel>\n    <description>レコードカード。getRecordワイヤでフィールドを取得しカード表示。</description>\n    <targets>\n        <target>lightning__RecordPage</target>\n        <target>lightning__AppPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiRecordView",
      "title": "UI Record View",
      "icon": "📑",
      "category": "レコード",
      "demo": "recordview",
      "description": "lightning-record-view-form で fields を読み取り専用のラベル付き列組みで表示する。（プレビューはサンプル値）",
      "props": [
        {
          "name": "record-id",
          "type": "String",
          "def": "—",
          "desc": "レコード Id"
        },
        {
          "name": "object-api-name",
          "type": "String",
          "def": "—",
          "desc": "オブジェクト API 名"
        },
        {
          "name": "fields",
          "type": "String",
          "def": "''",
          "desc": "カンマ区切りのフィールド API 名（例: Name,Phone,Industry）"
        },
        {
          "name": "title",
          "type": "String",
          "def": "—",
          "desc": "ヘッダタイトル"
        },
        {
          "name": "columns",
          "type": "Number",
          "def": "2",
          "desc": "列数"
        }
      ],
      "events": [],
      "usage": "<c-ui-record-view record-id={recordId} object-api-name=\"Account\" fields=\"Name,Phone,Industry,AnnualRevenue\"></c-ui-record-view>",
      "ja": "レコード表示",
      "files": {
        "html": "<template>\n    <div class=\"ui-recview\">\n        <header lwc:if={title} class=\"ui-recview__header\">{title}</header>\n        <lightning-record-view-form\n            record-id={recordId}\n            object-api-name={objectApiName}\n        >\n            <div class=\"ui-recview__grid\" style={gridStyle}>\n                <template for:each={fieldList} for:item=\"f\">\n                    <lightning-output-field\n                        key={f}\n                        field-name={f}\n                    ></lightning-output-field>\n                </template>\n            </div>\n        </lightning-record-view-form>\n    </div>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\n/**\n * uiRecordView — レコード表示フォーム。\n * lightning-record-view-form を使い、fields（カンマ区切り API 名）を\n * 読み取り専用のラベル付きで列組み表示する。\n *\n * 例: fields=\"Name,Phone,Industry,AnnualRevenue\"\n */\nexport default class UiRecordView extends LightningElement {\n    /** レコード Id */\n    @api recordId;\n    /** オブジェクト API 名 */\n    @api objectApiName;\n    /** カンマ区切りのフィールド API 名 */\n    @api fields = '';\n    /** ヘッダタイトル（任意） */\n    @api title;\n    /** 列数 */\n    @api columns = 2;\n\n    get fieldList() {\n        return this.fields\n            ? this.fields.split(',').map((f) => f.trim()).filter((f) => f)\n            : [];\n    }\n\n    get gridStyle() {\n        const cols = Number(this.columns) || 2;\n        return `grid-template-columns: repeat(${cols}, 1fr);`;\n    }\n}\n",
        "css": ".ui-recview {\n    background: #ffffff;\n    border: 1px solid #e5e5e5;\n    border-radius: 8px;\n    padding: 14px 16px;\n}\n\n.ui-recview__header {\n    font-size: 0.95rem;\n    font-weight: 700;\n    color: #181818;\n    margin-bottom: 10px;\n}\n\n.ui-recview__grid {\n    display: grid;\n    gap: 12px 20px;\n}\n\n/* ギャラリーのモック表示用 */\n.ui-recview__field {\n    display: flex;\n    flex-direction: column;\n    gap: 1px;\n}\n.ui-recview__flabel {\n    font-size: 0.72rem;\n    color: #706e6b;\n    font-weight: 600;\n}\n.ui-recview__fvalue {\n    font-size: 0.875rem;\n    color: #181818;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Record View</masterLabel>\n    <description>レコード表示フォーム。record-view-formでフィールドを読み取り表示。</description>\n    <targets>\n        <target>lightning__RecordPage</target>\n        <target>lightning__AppPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiRecordEdit",
      "title": "UI Record Edit",
      "icon": "✍️",
      "category": "レコード",
      "demo": "recordedit",
      "description": "lightning-record-edit-form で fields を編集・保存し、成功時に saved イベントとトーストを発火する。（プレビューはサンプル値）",
      "props": [
        {
          "name": "record-id",
          "type": "String",
          "def": "—",
          "desc": "レコード Id（新規時は省略）"
        },
        {
          "name": "object-api-name",
          "type": "String",
          "def": "—",
          "desc": "オブジェクト API 名"
        },
        {
          "name": "fields",
          "type": "String",
          "def": "''",
          "desc": "カンマ区切りのフィールド API 名"
        },
        {
          "name": "title",
          "type": "String",
          "def": "—",
          "desc": "ヘッダタイトル"
        }
      ],
      "events": [
        {
          "name": "saved",
          "desc": "保存成功時に発火（detail.recordId）"
        }
      ],
      "usage": "<c-ui-record-edit record-id={recordId} object-api-name=\"Account\" fields=\"Name,Phone,Industry\" onsaved={handleSaved}></c-ui-record-edit>",
      "ja": "レコード編集",
      "files": {
        "html": "<template>\n    <div class=\"ui-recedit\">\n        <header lwc:if={title} class=\"ui-recedit__header\">{title}</header>\n        <lightning-record-edit-form\n            record-id={recordId}\n            object-api-name={objectApiName}\n            onsuccess={handleSuccess}\n        >\n            <lightning-messages></lightning-messages>\n            <div class=\"ui-recedit__grid\">\n                <template for:each={fieldList} for:item=\"f\">\n                    <lightning-input-field\n                        key={f}\n                        field-name={f}\n                    ></lightning-input-field>\n                </template>\n            </div>\n            <div class=\"ui-recedit__actions\">\n                <lightning-button\n                    variant=\"brand\"\n                    type=\"submit\"\n                    label=\"保存\"\n                ></lightning-button>\n            </div>\n        </lightning-record-edit-form>\n    </div>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\nimport { ShowToastEvent } from 'lightning/platformShowToastEvent';\n\n/**\n * uiRecordEdit — レコード編集フォーム。\n * lightning-record-edit-form で fields（カンマ区切り API 名）を編集し、\n * 保存に成功すると saved イベント (detail.recordId) とトーストを発火する。\n *\n * 例: fields=\"Name,Phone,Industry\"\n */\nexport default class UiRecordEdit extends LightningElement {\n    /** レコード Id（新規作成時は省略） */\n    @api recordId;\n    /** オブジェクト API 名 */\n    @api objectApiName;\n    /** カンマ区切りのフィールド API 名 */\n    @api fields = '';\n    /** ヘッダタイトル（任意） */\n    @api title;\n\n    get fieldList() {\n        return this.fields\n            ? this.fields.split(',').map((f) => f.trim()).filter((f) => f)\n            : [];\n    }\n\n    handleSuccess(event) {\n        const id = event.detail.id;\n        this.dispatchEvent(\n            new ShowToastEvent({\n                title: '保存しました',\n                variant: 'success'\n            })\n        );\n        this.dispatchEvent(\n            new CustomEvent('saved', { detail: { recordId: id } })\n        );\n    }\n}\n",
        "css": ".ui-recedit {\n    background: #ffffff;\n    border: 1px solid #e5e5e5;\n    border-radius: 8px;\n    padding: 14px 16px;\n}\n\n.ui-recedit__header {\n    font-size: 0.95rem;\n    font-weight: 700;\n    color: #181818;\n    margin-bottom: 10px;\n}\n\n.ui-recedit__grid {\n    display: flex;\n    flex-direction: column;\n    gap: 8px;\n}\n\n.ui-recedit__actions {\n    display: flex;\n    justify-content: flex-end;\n    margin-top: 14px;\n}\n\n/* ギャラリーのモック表示用 */\n.ui-recedit__mockfield {\n    display: flex;\n    flex-direction: column;\n    gap: 3px;\n}\n.ui-recedit__mocklabel {\n    font-size: 0.72rem;\n    color: #706e6b;\n    font-weight: 600;\n}\n.ui-recedit__mockinput {\n    height: 32px;\n    border: 1px solid #c9c9c9;\n    border-radius: 4px;\n    padding: 0 10px;\n    font-size: 0.85rem;\n    color: #181818;\n    background: #ffffff;\n    font-family: inherit;\n}\n.ui-recedit__mockinput:focus {\n    outline: none;\n    border-color: #0176d3;\n    box-shadow: 0 0 0 2px rgba(1, 118, 211, 0.25);\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Record Edit</masterLabel>\n    <description>レコード編集フォーム。record-edit-formで編集・保存し saved を発火。</description>\n    <targets>\n        <target>lightning__RecordPage</target>\n        <target>lightning__AppPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiRecordPath",
      "title": "UI Record Path",
      "icon": "🛣️",
      "category": "レコード",
      "demo": "recordpath",
      "description": "steps と current から Salesforce Path 風のシェブロン表示を生成する。商談ステージや状況の可視化に。クリックで select イベントを発火。",
      "props": [
        {
          "name": "steps",
          "type": "String",
          "def": "''",
          "desc": "カンマ区切りのステップ名"
        },
        {
          "name": "current",
          "type": "String",
          "def": "—",
          "desc": "現在のステップ名"
        }
      ],
      "events": [
        {
          "name": "select",
          "desc": "ステップクリックで発火（detail.step）"
        }
      ],
      "usage": "<c-ui-record-path steps=\"見込,提案,交渉,受注\" current=\"提案\" onselect={handleSelect}></c-ui-record-path>",
      "ja": "レコードパス",
      "files": {
        "html": "<template>\n    <ol class=\"ui-path\">\n        <template for:each={computedSteps} for:item=\"step\">\n            <li\n                key={step.key}\n                class={step.cssClass}\n                data-step={step.label}\n                onclick={handleSelect}\n            >\n                <span class=\"ui-path__label\">{step.label}</span>\n            </li>\n        </template>\n    </ol>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\n/**\n * uiRecordPath — レコードパス（ステータスパス）。\n * steps（カンマ区切り）と current（現在のステップ名）から、Salesforce Path 風の\n * シェブロン表示を生成する。ステップクリックで select イベント (detail.step) を発火。\n * Record ページの商談ステージや状況の可視化に使う。\n */\nexport default class UiRecordPath extends LightningElement {\n    /** カンマ区切りのステップ名 */\n    @api steps = '';\n    /** 現在のステップ名 */\n    @api current;\n\n    get stepList() {\n        return this.steps\n            ? this.steps.split(',').map((s) => s.trim()).filter((s) => s)\n            : [];\n    }\n\n    get computedSteps() {\n        const list = this.stepList;\n        const curIndex = list.indexOf(this.current);\n        return list.map((label, i) => {\n            let state = 'upcoming';\n            if (curIndex >= 0 && i < curIndex) {\n                state = 'complete';\n            } else if (i === curIndex) {\n                state = 'current';\n            }\n            return {\n                key: label,\n                label,\n                cssClass: `ui-path__step ui-path__step_${state}`\n            };\n        });\n    }\n\n    handleSelect(event) {\n        const step = event.currentTarget.dataset.step;\n        this.dispatchEvent(new CustomEvent('select', { detail: { step } }));\n    }\n}\n",
        "css": ".ui-path {\n    display: flex;\n    margin: 0;\n    padding: 0;\n    list-style: none;\n    width: 100%;\n}\n\n.ui-path__step {\n    position: relative;\n    flex: 1;\n    height: 34px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background: #ececec;\n    color: #514f4d;\n    font-size: 0.78rem;\n    font-weight: 600;\n    cursor: pointer;\n    clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%, 12px 50%);\n    margin-left: -8px;\n    padding-left: 8px;\n}\n.ui-path__step:first-child {\n    margin-left: 0;\n    clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%);\n    padding-left: 0;\n}\n\n.ui-path__step:hover {\n    filter: brightness(0.96);\n}\n\n.ui-path__step_complete {\n    background: #c5e0c8;\n    color: #1d7a3f;\n}\n\n.ui-path__step_current {\n    background: #0176d3;\n    color: #ffffff;\n}\n\n.ui-path__label {\n    padding: 0 6px;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Record Path</masterLabel>\n    <description>レコードパス。商談ステージ等をSalesforce Path風シェブロンで表示。</description>\n    <targets>\n        <target>lightning__RecordPage</target>\n        <target>lightning__AppPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiRelatedList",
      "title": "UI Related List",
      "icon": "🗃️",
      "category": "レコード",
      "demo": "relatedlist",
      "description": "items 配列 ([{ title, subtitle, meta }]) を関連リスト風カードで表示。件数バッジ・新規ボタン付き。行クリックで select、新規で new を発火。",
      "props": [
        {
          "name": "items",
          "type": "Array",
          "def": "[]",
          "desc": "[{ title, subtitle, meta }] の配列"
        },
        {
          "name": "title",
          "type": "String",
          "def": "—",
          "desc": "ヘッダタイトル"
        },
        {
          "name": "icon-name",
          "type": "String",
          "def": "'standard:record'",
          "desc": "ヘッダアイコン"
        }
      ],
      "events": [
        {
          "name": "select",
          "desc": "行クリックで発火（detail.index）"
        },
        {
          "name": "new",
          "desc": "新規ボタンで発火"
        }
      ],
      "usage": "<c-ui-related-list title=\"商談\" items={opps} onselect={handleSelect} onnew={handleNew}></c-ui-related-list>",
      "ja": "関連リスト",
      "files": {
        "html": "<template>\n    <article class=\"ui-rellist\">\n        <header class=\"ui-rellist__header\">\n            <lightning-icon\n                icon-name={iconName}\n                size=\"small\"\n                class=\"ui-rellist__icon\"\n            ></lightning-icon>\n            <h2 class=\"ui-rellist__title\">{title}</h2>\n            <span class=\"ui-rellist__count\">{count}</span>\n            <button class=\"ui-rellist__new\" type=\"button\" onclick={handleNew}>\n                新規\n            </button>\n        </header>\n        <ul class=\"ui-rellist__items\">\n            <template for:each={rows} for:item=\"row\">\n                <li\n                    key={row.key}\n                    class=\"ui-rellist__item\"\n                    data-index={row.index}\n                    onclick={handleSelect}\n                >\n                    <span class=\"ui-rellist__item-title\">{row.title}</span>\n                    <span lwc:if={row.hasSubtitle} class=\"ui-rellist__item-sub\">\n                        {row.subtitle}\n                    </span>\n                    <span lwc:if={row.hasMeta} class=\"ui-rellist__item-meta\">\n                        {row.meta}\n                    </span>\n                </li>\n            </template>\n        </ul>\n    </article>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\n/**\n * uiRelatedList — 関連リスト。\n * items 配列 ([{ title, subtitle, meta }]) を Salesforce の関連リスト風カードで表示し、\n * 件数バッジと「新規」ボタンを持つ。行クリックで select、新規で new イベントを発火する。\n * 親で Apex 等から取得したレコード配列を渡して使う。\n */\nexport default class UiRelatedList extends LightningElement {\n    _items = [];\n\n    /** [{ title, subtitle, meta }] の配列 */\n    @api\n    get items() {\n        return this._items;\n    }\n    set items(value) {\n        this._items = Array.isArray(value) ? value : [];\n    }\n\n    /** ヘッダタイトル */\n    @api title;\n    /** ヘッダアイコン（lightning-icon 名） */\n    @api iconName = 'standard:record';\n\n    get count() {\n        return this._items.length;\n    }\n\n    get rows() {\n        return this._items.map((it, i) => ({\n            key: i,\n            index: i,\n            title: it.title,\n            subtitle: it.subtitle,\n            meta: it.meta,\n            hasSubtitle: !!it.subtitle,\n            hasMeta: !!it.meta\n        }));\n    }\n\n    handleSelect(event) {\n        this.dispatchEvent(\n            new CustomEvent('select', {\n                detail: { index: Number(event.currentTarget.dataset.index) }\n            })\n        );\n    }\n\n    handleNew() {\n        this.dispatchEvent(new CustomEvent('new'));\n    }\n}\n",
        "css": ".ui-rellist {\n    background: #ffffff;\n    border: 1px solid #e5e5e5;\n    border-radius: 8px;\n    overflow: hidden;\n    min-width: 260px;\n}\n\n.ui-rellist__header {\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    padding: 10px 14px;\n    border-bottom: 1px solid #ececec;\n    background: #fafaf9;\n}\n\n.ui-rellist__title {\n    margin: 0;\n    font-size: 0.9rem;\n    font-weight: 700;\n    color: #181818;\n}\n\n.ui-rellist__count {\n    font-size: 0.72rem;\n    font-weight: 700;\n    color: #514f4d;\n    background: #ececeb;\n    border-radius: 10px;\n    padding: 1px 8px;\n}\n\n.ui-rellist__new {\n    margin-left: auto;\n    border: 1px solid #c9c9c9;\n    background: #ffffff;\n    color: #0176d3;\n    font-size: 0.74rem;\n    font-weight: 600;\n    padding: 4px 10px;\n    border-radius: 5px;\n    cursor: pointer;\n    font-family: inherit;\n}\n.ui-rellist__new:hover {\n    background: #f3f9ff;\n}\n\n.ui-rellist__items {\n    list-style: none;\n    margin: 0;\n    padding: 0;\n}\n\n.ui-rellist__item {\n    display: grid;\n    grid-template-columns: 1fr auto;\n    grid-template-areas: 'title meta' 'sub meta';\n    gap: 0 8px;\n    padding: 10px 14px;\n    border-bottom: 1px solid #f3f3f3;\n    cursor: pointer;\n}\n.ui-rellist__item:last-child {\n    border-bottom: none;\n}\n.ui-rellist__item:hover {\n    background: #f3f9ff;\n}\n\n.ui-rellist__item-title {\n    grid-area: title;\n    font-size: 0.85rem;\n    font-weight: 600;\n    color: #0176d3;\n}\n\n.ui-rellist__item-sub {\n    grid-area: sub;\n    font-size: 0.75rem;\n    color: #706e6b;\n}\n\n.ui-rellist__item-meta {\n    grid-area: meta;\n    align-self: center;\n    font-size: 0.75rem;\n    color: #514f4d;\n    white-space: nowrap;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Related List</masterLabel>\n    <description>関連リスト。件数バッジ・新規ボタン付きでレコード配列を一覧表示。</description>\n    <targets>\n        <target>lightning__RecordPage</target>\n        <target>lightning__AppPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiLookupField",
      "title": "UI Lookup Field",
      "icon": "🔎",
      "category": "レコード",
      "demo": "lookupfield",
      "description": "入力で options を絞り込み、アイコン＋サブラベル付きの候補から選択するルックアップ。選択時に change イベント (detail.value) を発火。",
      "props": [
        {
          "name": "options",
          "type": "Array",
          "def": "[]",
          "desc": "[{ label, sublabel, icon, value }] の配列"
        },
        {
          "name": "label",
          "type": "String",
          "def": "—",
          "desc": "ラベル"
        },
        {
          "name": "placeholder",
          "type": "String",
          "def": "'検索…'",
          "desc": "プレースホルダ"
        }
      ],
      "events": [
        {
          "name": "change",
          "desc": "選択／クリア時に発火（detail.value）"
        }
      ],
      "usage": "<c-ui-lookup-field label=\"取引先\" options={results} onchange={handleChange}></c-ui-lookup-field>",
      "ja": "ルックアップ",
      "files": {
        "html": "<template>\n    <div class=\"ui-lookup\" onfocusout={handleFocusOut}>\n        <label lwc:if={label} class=\"ui-lookup__label\">{label}</label>\n\n        <div lwc:if={hasSelection} class=\"ui-lookup__selected\">\n            <span class=\"ui-lookup__sel-icon\">{selected.icon}</span>\n            <span class=\"ui-lookup__sel-label\">{selected.label}</span>\n            <button\n                class=\"ui-lookup__clear\"\n                type=\"button\"\n                title=\"クリア\"\n                onclick={handleClear}\n            >\n                &times;\n            </button>\n        </div>\n\n        <template lwc:else>\n            <input\n                class=\"ui-lookup__input\"\n                type=\"text\"\n                value={query}\n                placeholder={placeholder}\n                oninput={handleInput}\n                onfocus={handleFocus}\n            />\n            <ul lwc:if={open} class=\"ui-lookup__menu\" role=\"listbox\">\n                <template for:each={filtered} for:item=\"opt\">\n                    <li key={opt.value} role=\"none\">\n                        <button\n                            class=\"ui-lookup__item\"\n                            type=\"button\"\n                            role=\"option\"\n                            data-value={opt.value}\n                            onclick={handleSelect}\n                        >\n                            <span class=\"ui-lookup__item-icon\">{opt.icon}</span>\n                            <span class=\"ui-lookup__item-body\">\n                                <span class=\"ui-lookup__item-label\">{opt.label}</span>\n                                <span class=\"ui-lookup__item-sub\">{opt.sublabel}</span>\n                            </span>\n                        </button>\n                    </li>\n                </template>\n                <li lwc:if={isEmpty} class=\"ui-lookup__empty\">該当なし</li>\n            </ul>\n        </template>\n    </div>\n</template>\n",
        "js": "import { LightningElement, api, track } from 'lwc';\n\n/**\n * uiLookupField — ルックアップ検索フィールド。\n * 入力で options を絞り込み、アイコン＋サブラベル付きの候補から選択する。\n * 選択時に change イベント (detail.value)、クリアで change(null) を発火する。\n * options は親で Apex 検索結果などを渡す（[{ label, sublabel, icon, value }]）。\n */\nexport default class UiLookupField extends LightningElement {\n    _options = [];\n\n    /** [{ label, sublabel, icon, value }] の配列 */\n    @api\n    get options() {\n        return this._options;\n    }\n    set options(value) {\n        this._options = Array.isArray(value) ? value : [];\n    }\n\n    /** ラベル */\n    @api label;\n    /** プレースホルダ */\n    @api placeholder = '検索…';\n\n    @track query = '';\n    @track open = false;\n    @track selected = null;\n\n    get filtered() {\n        const q = (this.query || '').toLowerCase();\n        return this._options.filter((o) =>\n            (o.label || '').toLowerCase().includes(q)\n        );\n    }\n\n    get hasSelection() {\n        return !!this.selected;\n    }\n\n    get isEmpty() {\n        return this.filtered.length === 0;\n    }\n\n    handleInput(event) {\n        this.query = event.target.value;\n        this.open = true;\n    }\n\n    handleFocus() {\n        this.open = true;\n    }\n\n    handleSelect(event) {\n        const v = event.currentTarget.dataset.value;\n        this.selected = this._options.find((o) => String(o.value) === v) || null;\n        this.open = false;\n        this.query = '';\n        this.dispatchEvent(\n            new CustomEvent('change', { detail: { value: v } })\n        );\n    }\n\n    handleClear() {\n        this.selected = null;\n        this.dispatchEvent(new CustomEvent('change', { detail: { value: null } }));\n    }\n\n    handleFocusOut(event) {\n        if (\n            this.open &&\n            (!event.relatedTarget ||\n                !event.currentTarget.contains(event.relatedTarget))\n        ) {\n            this.open = false;\n        }\n    }\n}\n",
        "css": ".ui-lookup {\n    position: relative;\n    display: flex;\n    flex-direction: column;\n    gap: 4px;\n}\n\n.ui-lookup__label {\n    font-size: 0.78rem;\n    font-weight: 600;\n    color: #444444;\n}\n\n.ui-lookup__input {\n    height: 34px;\n    padding: 0 12px;\n    border: 1px solid #c9c9c9;\n    border-radius: 6px;\n    font-size: 0.875rem;\n    color: #181818;\n    background: #ffffff;\n    font-family: inherit;\n}\n.ui-lookup__input:focus {\n    outline: none;\n    border-color: #0176d3;\n    box-shadow: 0 0 0 2px rgba(1, 118, 211, 0.25);\n}\n\n.ui-lookup__selected {\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    height: 34px;\n    padding: 0 6px 0 10px;\n    border: 1px solid #0176d3;\n    border-radius: 6px;\n    background: #f3f9ff;\n}\n.ui-lookup__sel-icon {\n    font-size: 1rem;\n}\n.ui-lookup__sel-label {\n    flex: 1;\n    font-size: 0.85rem;\n    color: #181818;\n    font-weight: 600;\n}\n.ui-lookup__clear {\n    border: none;\n    background: transparent;\n    color: #706e6b;\n    font-size: 1.1rem;\n    line-height: 1;\n    cursor: pointer;\n    padding: 0 4px;\n}\n.ui-lookup__clear:hover {\n    color: #181818;\n}\n\n.ui-lookup__menu {\n    position: absolute;\n    top: 100%;\n    left: 0;\n    right: 0;\n    margin: 4px 0 0;\n    padding: 4px;\n    list-style: none;\n    background: #ffffff;\n    border: 1px solid #e5e5e5;\n    border-radius: 8px;\n    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);\n    z-index: 20;\n    max-height: 240px;\n    overflow-y: auto;\n}\n\n.ui-lookup__item {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    width: 100%;\n    text-align: left;\n    border: none;\n    background: transparent;\n    padding: 7px 10px;\n    border-radius: 6px;\n    cursor: pointer;\n    font-family: inherit;\n}\n.ui-lookup__item:hover {\n    background: #f3f9ff;\n}\n\n.ui-lookup__item-icon {\n    font-size: 1.1rem;\n    flex-shrink: 0;\n}\n\n.ui-lookup__item-body {\n    display: flex;\n    flex-direction: column;\n    min-width: 0;\n}\n.ui-lookup__item-label {\n    font-size: 0.85rem;\n    color: #181818;\n    font-weight: 600;\n}\n.ui-lookup__item-sub {\n    font-size: 0.72rem;\n    color: #706e6b;\n}\n\n.ui-lookup__empty {\n    padding: 8px 10px;\n    font-size: 0.8rem;\n    color: #969492;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Lookup Field</masterLabel>\n    <description>ルックアップ検索フィールド。候補をアイコン付きで絞り込み選択し change を発火。</description>\n    <targets>\n        <target>lightning__RecordPage</target>\n        <target>lightning__AppPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiRecordHighlights",
      "title": "UI Record Highlights",
      "icon": "⭐",
      "category": "レコード",
      "demo": "highlights",
      "description": "アイコン・タイトル・サブタイトルと主要フィールド ([{ label, value }]) を横並びで表示する Record ヘッダ向けパネル。",
      "props": [
        {
          "name": "icon",
          "type": "String",
          "def": "'🏢'",
          "desc": "先頭アイコン"
        },
        {
          "name": "title",
          "type": "String",
          "def": "—",
          "desc": "タイトル"
        },
        {
          "name": "subtitle",
          "type": "String",
          "def": "—",
          "desc": "サブタイトル"
        },
        {
          "name": "fields",
          "type": "Array",
          "def": "[]",
          "desc": "[{ label, value }] の配列"
        }
      ],
      "events": [],
      "usage": "<c-ui-record-highlights title=\"株式会社サンプル\" subtitle=\"製造業\" fields={highlights}></c-ui-record-highlights>",
      "ja": "ハイライトパネル",
      "files": {
        "html": "<template>\n    <div class=\"ui-highlights\">\n        <span class=\"ui-highlights__icon\">{icon}</span>\n        <div class=\"ui-highlights__head\">\n            <span class=\"ui-highlights__title\">{title}</span>\n            <span lwc:if={subtitle} class=\"ui-highlights__sub\">{subtitle}</span>\n        </div>\n        <div class=\"ui-highlights__fields\">\n            <template for:each={cells} for:item=\"cell\">\n                <div key={cell.key} class=\"ui-highlights__cell\">\n                    <span class=\"ui-highlights__flabel\">{cell.label}</span>\n                    <span class=\"ui-highlights__fvalue\">{cell.value}</span>\n                </div>\n            </template>\n        </div>\n    </div>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\n/**\n * uiRecordHighlights — ハイライトパネル。\n * アイコン・タイトル・サブタイトルと、主要フィールド（[{ label, value }]）を\n * 横並びで表示する Record ページのヘッダ向け部品。\n */\nexport default class UiRecordHighlights extends LightningElement {\n    /** 先頭アイコン（絵文字または lightning-icon は親で差し替え可） */\n    @api icon = '🏢';\n    /** タイトル（例: 取引先名） */\n    @api title;\n    /** サブタイトル（例: 業種・タイプ） */\n    @api subtitle;\n\n    _fields = [];\n\n    /** [{ label, value }] の配列 */\n    @api\n    get fields() {\n        return this._fields;\n    }\n    set fields(value) {\n        this._fields = Array.isArray(value) ? value : [];\n    }\n\n    get cells() {\n        return this._fields.map((f, i) => ({\n            key: i,\n            label: f.label,\n            value: f.value\n        }));\n    }\n}\n",
        "css": ".ui-highlights {\n    display: flex;\n    align-items: center;\n    gap: 16px;\n    padding: 14px 18px;\n    background: linear-gradient(180deg, #f3f8fd 0%, #ffffff 100%);\n    border: 1px solid #e5e5e5;\n    border-radius: 10px;\n    flex-wrap: wrap;\n}\n\n.ui-highlights__icon {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    width: 48px;\n    height: 48px;\n    border-radius: 12px;\n    background: #0176d3;\n    font-size: 1.5rem;\n    flex-shrink: 0;\n}\n\n.ui-highlights__head {\n    display: flex;\n    flex-direction: column;\n    gap: 1px;\n    margin-right: 8px;\n}\n\n.ui-highlights__title {\n    font-size: 1.05rem;\n    font-weight: 800;\n    color: #181818;\n}\n\n.ui-highlights__sub {\n    font-size: 0.78rem;\n    color: #706e6b;\n}\n\n.ui-highlights__fields {\n    display: flex;\n    gap: 24px;\n    flex-wrap: wrap;\n    padding-left: 16px;\n    border-left: 1px solid #e5e5e5;\n}\n\n.ui-highlights__cell {\n    display: flex;\n    flex-direction: column;\n    gap: 1px;\n}\n\n.ui-highlights__flabel {\n    font-size: 0.7rem;\n    color: #706e6b;\n    font-weight: 600;\n}\n\n.ui-highlights__fvalue {\n    font-size: 0.9rem;\n    font-weight: 700;\n    color: #181818;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Record Highlights</masterLabel>\n    <description>ハイライトパネル。アイコン・タイトル・主要フィールドを横並び表示。</description>\n    <targets>\n        <target>lightning__RecordPage</target>\n        <target>lightning__AppPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    },
    {
      "id": "uiTileSelect",
      "title": "UI Tile Select",
      "icon": "🔲",
      "category": "フォーム",
      "demo": "tileselect",
      "description": "options 配列 ([{ label, icon, value }]) をアイコン付きタイルで並べ単一選択する。選択時に change イベント (detail.value) を発火。",
      "props": [
        {
          "name": "options",
          "type": "Array",
          "def": "[]",
          "desc": "[{ label, icon, value }] の配列"
        },
        {
          "name": "value",
          "type": "String",
          "def": "—",
          "desc": "選択値"
        }
      ],
      "events": [
        {
          "name": "change",
          "desc": "選択時に発火（detail.value）"
        }
      ],
      "usage": "<c-ui-tile-select options={types} value=\"email\" onchange={handleChange}></c-ui-tile-select>",
      "ja": "タイル選択",
      "files": {
        "html": "<template>\n    <div class=\"ui-tiles\" role=\"radiogroup\">\n        <template for:each={tiles} for:item=\"tile\">\n            <button\n                key={tile.value}\n                class={tile.cssClass}\n                type=\"button\"\n                role=\"radio\"\n                data-value={tile.value}\n                onclick={handleSelect}\n            >\n                <span class=\"ui-tile__icon\">{tile.icon}</span>\n                <span class=\"ui-tile__label\">{tile.label}</span>\n            </button>\n        </template>\n    </div>\n</template>\n",
        "js": "import { LightningElement, api } from 'lwc';\n\n/**\n * uiTileSelect — タイル選択。\n * options 配列 ([{ label, icon, value }]) をアイコン付きタイルで並べ、\n * 単一選択する。選択時に change イベント (detail.value) を発火する。\n */\nexport default class UiTileSelect extends LightningElement {\n    _options = [];\n\n    /** [{ label, icon, value }] の配列 */\n    @api\n    get options() {\n        return this._options;\n    }\n    set options(value) {\n        this._options = Array.isArray(value) ? value : [];\n    }\n\n    /** 選択値 */\n    @api value;\n\n    get tiles() {\n        return this._options.map((o) => ({\n            label: o.label,\n            icon: o.icon,\n            value: o.value,\n            cssClass:\n                String(o.value) === String(this.value)\n                    ? 'ui-tile ui-tile_selected'\n                    : 'ui-tile'\n        }));\n    }\n\n    handleSelect(event) {\n        this.value = event.currentTarget.dataset.value;\n        this.dispatchEvent(\n            new CustomEvent('change', { detail: { value: this.value } })\n        );\n    }\n}\n",
        "css": ".ui-tiles {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 10px;\n}\n\n.ui-tile {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    gap: 6px;\n    width: 96px;\n    padding: 14px 8px;\n    border: 1px solid #c9c9c9;\n    border-radius: 10px;\n    background: #ffffff;\n    cursor: pointer;\n    font-family: inherit;\n    transition: border-color 0.12s ease, background 0.12s ease, box-shadow 0.12s ease;\n}\n.ui-tile:hover {\n    border-color: #0176d3;\n    background: #f7fbff;\n}\n\n.ui-tile__icon {\n    font-size: 1.6rem;\n    line-height: 1;\n}\n\n.ui-tile__label {\n    font-size: 0.78rem;\n    font-weight: 600;\n    color: #444444;\n    text-align: center;\n}\n\n.ui-tile_selected {\n    border-color: #0176d3;\n    background: #eef4ff;\n    box-shadow: inset 0 0 0 1px #0176d3;\n}\n.ui-tile_selected .ui-tile__label {\n    color: #0b5cab;\n}\n",
        "meta": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LightningComponentBundle xmlns=\"http://soap.sforce.com/2006/04/metadata\">\n    <apiVersion>59.0</apiVersion>\n    <isExposed>true</isExposed>\n    <masterLabel>UI Tile Select</masterLabel>\n    <description>タイル選択。アイコン付きタイルの単一選択で change を発火。</description>\n    <targets>\n        <target>lightning__AppPage</target>\n        <target>lightning__RecordPage</target>\n        <target>lightning__HomePage</target>\n    </targets>\n</LightningComponentBundle>\n"
      }
    }
  ]
};
