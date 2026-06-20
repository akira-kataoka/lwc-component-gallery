import { LightningElement, api } from 'lwc';

/**
 * uiSearchBox — 汎用検索ボックス。
 * 虫眼鏡アイコン付きの入力で、入力時に search イベント (detail.value) を発火。
 * クリアボタンで入力を消去する。
 */
export default class UiSearchBox extends LightningElement {
    /** 入力値 */
    @api value = '';
    /** プレースホルダ */
    @api placeholder = '検索…';

    get hasValue() {
        return !!this.value;
    }

    handleInput(event) {
        this.value = event.target.value;
        this.dispatchEvent(
            new CustomEvent('search', { detail: { value: this.value } })
        );
    }

    handleClear() {
        this.value = '';
        this.dispatchEvent(new CustomEvent('search', { detail: { value: '' } }));
    }
}
