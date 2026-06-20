import { LightningElement, api } from 'lwc';

/**
 * uiNumberFormat — 汎用数値フォーマット表示。
 * value を format（decimal / currency / percent / compact）に従って整形表示する。
 * prefix / suffix を前後に付けられる純粋な表示コンポーネント。
 */
export default class UiNumberFormat extends LightningElement {
    /** 値 */
    @api value = 0;
    /** 形式: decimal | currency | percent | compact */
    @api format = 'decimal';
    /** 通貨コード（currency 時） */
    @api currency = 'JPY';
    /** 接頭辞 */
    @api prefix = '';
    /** 接尾辞 */
    @api suffix = '';

    get formatted() {
        const n = Number(this.value) || 0;
        let s;
        try {
            if (this.format === 'currency') {
                s = new Intl.NumberFormat('ja-JP', {
                    style: 'currency',
                    currency: this.currency
                }).format(n);
            } else if (this.format === 'percent') {
                s = new Intl.NumberFormat('ja-JP', {
                    style: 'percent',
                    maximumFractionDigits: 1
                }).format(n / 100);
            } else if (this.format === 'compact') {
                s = new Intl.NumberFormat('ja-JP', {
                    notation: 'compact'
                }).format(n);
            } else {
                s = n.toLocaleString('ja-JP');
            }
        } catch (e) {
            s = String(n);
        }
        return `${this.prefix}${s}${this.suffix}`;
    }
}
