import { LightningElement, api } from 'lwc';

/**
 * uiMediaObject — 汎用メディアオブジェクト。
 * 先頭にアイコン（絵文字）、右にタイトルと本文を並べる定番レイアウト。
 * 本文は text プロパティまたは default スロットで指定できる。
 */
export default class UiMediaObject extends LightningElement {
    /** 先頭アイコン（絵文字可） */
    @api icon;
    /** タイトル */
    @api title;
    /** 本文（スロット未使用時） */
    @api text;
}
