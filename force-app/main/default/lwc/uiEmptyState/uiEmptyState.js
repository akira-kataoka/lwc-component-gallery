import { LightningElement, api } from 'lwc';

/**
 * uiEmptyState — 汎用エンプティステート。
 * アイコン・見出し・説明と、任意のアクション（default スロット）を中央表示する。
 * データ未登録時や検索 0 件時のプレースホルダとして使う。
 */
export default class UiEmptyState extends LightningElement {
    /** 見出し */
    @api heading;
    /** 補足メッセージ（任意） */
    @api message;
    /** アイコン文字（絵文字可） */
    @api icon = '📭';
}
