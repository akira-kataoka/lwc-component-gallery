import { LightningElement, api, track } from 'lwc';

/**
 * uiExpandableText — 汎用開閉テキスト。
 * 長文を指定行数で省略表示し、「もっと見る／閉じる」で全文を開閉する。
 */
export default class UiExpandableText extends LightningElement {
    /** 本文 */
    @api text;
    /** 省略時の表示行数 */
    @api lines = 2;

    @track expanded = false;

    get textClass() {
        return this.expanded
            ? 'ui-exptext__body'
            : 'ui-exptext__body ui-exptext__body_clamped';
    }

    get clampStyle() {
        return this.expanded ? '' : `-webkit-line-clamp: ${this.lines}`;
    }

    get toggleLabel() {
        return this.expanded ? '閉じる' : 'もっと見る';
    }

    toggle() {
        this.expanded = !this.expanded;
    }
}
