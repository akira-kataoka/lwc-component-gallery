import { LightningElement, api } from 'lwc';

/**
 * uiColorInput — 汎用カラー入力。
 * ネイティブのカラーピッカーと HEX 表示を組み合わせた入力。
 * 変更時に change イベント (detail.value) を発火する。
 */
export default class UiColorInput extends LightningElement {
    /** ラベル */
    @api label;
    /** 値（HEX） */
    @api value = '#0176d3';

    handleInput(event) {
        this.value = event.target.value;
        this.dispatchEvent(
            new CustomEvent('change', { detail: { value: this.value } })
        );
    }
}
