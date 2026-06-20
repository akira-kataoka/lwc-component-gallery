import { LightningElement, api } from 'lwc';

const VARIANTS = ['brand', 'success', 'warning', 'error'];

/**
 * uiSegmentedProgress — 汎用セグメント進捗。
 * total 個のセグメントのうち current 個を塗りつぶして段階的な進捗を表す。
 */
export default class UiSegmentedProgress extends LightningElement {
    /** セグメント総数 */
    @api total = 5;
    /** 塗りつぶす数 */
    @api current = 0;
    /** 色: brand | success | warning | error */
    @api variant = 'brand';

    get segments() {
        const total = Math.max(1, Number(this.total) || 1);
        const cur = Math.max(0, Number(this.current) || 0);
        const variant = VARIANTS.includes(this.variant) ? this.variant : 'brand';
        const list = [];
        for (let i = 0; i < total; i += 1) {
            const filled = i < cur;
            list.push({
                key: i,
                cssClass: filled
                    ? `ui-segprog__seg ui-segprog__seg_filled ui-segprog__seg_${variant}`
                    : 'ui-segprog__seg'
            });
        }
        return list;
    }
}
