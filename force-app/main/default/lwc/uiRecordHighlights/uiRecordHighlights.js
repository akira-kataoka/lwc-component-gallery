import { LightningElement, api } from 'lwc';

/**
 * uiRecordHighlights — ハイライトパネル。
 * アイコン・タイトル・サブタイトルと、主要フィールド（[{ label, value }]）を
 * 横並びで表示する Record ページのヘッダ向け部品。
 */
export default class UiRecordHighlights extends LightningElement {
    /** 先頭アイコン（絵文字または lightning-icon は親で差し替え可） */
    @api icon = '🏢';
    /** タイトル（例: 取引先名） */
    @api title;
    /** サブタイトル（例: 業種・タイプ） */
    @api subtitle;

    _fields = [];

    /** [{ label, value }] の配列 */
    @api
    get fields() {
        return this._fields;
    }
    set fields(value) {
        this._fields = Array.isArray(value) ? value : [];
    }

    get cells() {
        return this._fields.map((f, i) => ({
            key: i,
            label: f.label,
            value: f.value
        }));
    }
}
