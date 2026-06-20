import { LightningElement, api } from 'lwc';

/**
 * uiKbd — 汎用キーボードキー表示。
 * keys 配列（例: ['Ctrl', 'S']）を「Ctrl + S」のようにキー風の見た目で表示する。
 */
export default class UiKbd extends LightningElement {
    /** キー文字列の配列 */
    @api keys = [];

    get computedKeys() {
        const arr = Array.isArray(this.keys) ? this.keys : [];
        return arr.map((k, i) => ({
            idx: i,
            key: k,
            showPlus: i < arr.length - 1
        }));
    }
}
