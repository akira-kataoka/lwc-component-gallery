import { LightningElement, api, track } from 'lwc';

/**
 * uiComboBox — 汎用コンボボックス（検索付きセレクト）。
 * 入力でリストを絞り込み、選択すると change イベント (detail.value) を発火する。
 * 外側へフォーカスが外れるとリストを閉じる。
 */
export default class UiComboBox extends LightningElement {
    _options = [];

    /** 文字列または { label, value } の配列 */
    @api
    get options() {
        return this._options;
    }
    set options(value) {
        this._options = (Array.isArray(value) ? value : []).map((o) =>
            typeof o === 'string' ? { label: o, value: o } : o
        );
    }

    /** ラベル */
    @api label;
    /** プレースホルダ */
    @api placeholder = '選択または入力';
    /** 選択値 */
    @api value;

    @track open = false;
    @track query = '';

    get filtered() {
        const q = (this.query || '').toLowerCase();
        return this._options.filter((o) => o.label.toLowerCase().includes(q));
    }

    get isEmpty() {
        return this.filtered.length === 0;
    }

    handleInput(event) {
        this.query = event.target.value;
        this.open = true;
    }

    handleFocus() {
        this.open = true;
    }

    handleSelect(event) {
        const v = event.currentTarget.dataset.value;
        const option = this._options.find((o) => String(o.value) === v);
        this.query = option ? option.label : '';
        this.value = v;
        this.open = false;
        this.dispatchEvent(new CustomEvent('change', { detail: { value: v } }));
    }

    handleFocusOut(event) {
        if (
            this.open &&
            (!event.relatedTarget ||
                !event.currentTarget.contains(event.relatedTarget))
        ) {
            this.open = false;
        }
    }
}
