import { LightningElement, api } from 'lwc';

const ICONS = {
    info: 'ℹ',
    success: '✓',
    warning: '!',
    error: '✕',
    tip: '💡'
};

/**
 * uiCallout — 汎用コールアウト。
 * 左罫線と見出し・アイコンで強調する補足ボックス。本文は default スロット。
 */
export default class UiCallout extends LightningElement {
    /** バリアント: info | success | warning | error | tip */
    @api variant = 'info';
    /** 見出し */
    @api title;

    get calloutClass() {
        const variant = ICONS[this.variant] ? this.variant : 'info';
        return `ui-callout ui-callout_${variant}`;
    }

    get iconChar() {
        return ICONS[this.variant] || ICONS.info;
    }
}
