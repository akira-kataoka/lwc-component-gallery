import { LightningElement, api, track } from 'lwc';

/**
 * uiPasswordInput — 汎用パスワード入力。
 * 目アイコンで表示／非表示を切替えられるパスワード欄。変更時に change イベント
 * (detail.value) を発火する。
 */
export default class UiPasswordInput extends LightningElement {
    /** ラベル */
    @api label;
    /** 値 */
    @api value = '';
    /** プレースホルダ */
    @api placeholder = '';

    @track shown = false;

    get fieldType() {
        return this.shown ? 'text' : 'password';
    }

    get toggleIcon() {
        return this.shown ? '🙈' : '👁️';
    }

    handleInput(event) {
        this.value = event.target.value;
        this.dispatchEvent(
            new CustomEvent('change', { detail: { value: this.value } })
        );
    }

    toggle() {
        this.shown = !this.shown;
    }
}
