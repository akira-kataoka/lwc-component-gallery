import { LightningElement, api } from 'lwc';

const VARIANTS = ['brand', 'neutral', 'success', 'destructive'];

/**
 * uiProgressButton — 汎用処理中ボタン。
 * loading=true でスピナーと処理中ラベルに切替わるボタン。click イベントを発火する。
 * 親で非同期処理中に loading を立てて二重押下を防ぐ用途。
 */
export default class UiProgressButton extends LightningElement {
    /** 通常ラベル */
    @api label;
    /** 処理中ラベル */
    @api loadingLabel = '処理中…';
    /** 色バリアント: brand | neutral | success | destructive */
    @api variant = 'brand';
    /** true でスピナー表示・無効化 */
    @api loading = false;

    get buttonClass() {
        const variant = VARIANTS.includes(this.variant) ? this.variant : 'brand';
        return `ui-pbtn ui-pbtn_${variant}`;
    }

    get displayLabel() {
        return this.loading ? this.loadingLabel : this.label;
    }

    handleClick() {
        if (this.loading) {
            return;
        }
        this.dispatchEvent(new CustomEvent('click'));
    }
}
