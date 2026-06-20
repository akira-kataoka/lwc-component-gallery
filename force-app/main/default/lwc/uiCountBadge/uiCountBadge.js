import { LightningElement, api } from 'lwc';

/**
 * uiCountBadge — 汎用カウントバッジ。
 * default スロットの要素（アイコン等）の右上に件数バッジを重ねて表示する。
 * count が max を超えると「max+」と表示。dot=true で数字なしの点のみ表示する。
 */
export default class UiCountBadge extends LightningElement {
    /** 件数 */
    @api count = 0;
    /** 表示上限（超過時は max+ 表示） */
    @api max = 99;
    /** true で数字なしのドット表示 */
    @api dot = false;

    get isDot() {
        return this.dot;
    }

    get show() {
        return this.dot || Number(this.count) > 0;
    }

    get display() {
        const n = Number(this.count) || 0;
        const max = Number(this.max) || 99;
        return n > max ? `${max}+` : `${n}`;
    }

    get badgeClass() {
        return this.dot
            ? 'ui-countbadge__badge ui-countbadge__badge_dot'
            : 'ui-countbadge__badge';
    }
}
