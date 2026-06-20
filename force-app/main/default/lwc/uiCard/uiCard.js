import { LightningElement, api } from 'lwc';

/**
 * uiCard — 汎用カード。
 * タイトル・アイコンのヘッダ、本文 (default スロット)、
 * 任意のアクション (actions スロット) とフッタ (footer スロット) を持つ。
 */
export default class UiCard extends LightningElement {
    /** ヘッダタイトル */
    @api title;
    /** 任意の lightning-icon 名 (例: standard:account) */
    @api iconName;

    hasFooter = false;

    get hasHeader() {
        return !!this.title || !!this.iconName;
    }

    get footerClass() {
        return this.hasFooter
            ? 'ui-card__footer'
            : 'ui-card__footer ui-card__footer_empty';
    }

    handleFooterSlotChange(event) {
        this.hasFooter = event.target.assignedNodes().length > 0;
    }
}
