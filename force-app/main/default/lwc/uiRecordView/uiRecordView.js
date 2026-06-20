import { LightningElement, api } from 'lwc';

/**
 * uiRecordView — レコード表示フォーム。
 * lightning-record-view-form を使い、fields（カンマ区切り API 名）を
 * 読み取り専用のラベル付きで列組み表示する。
 *
 * 例: fields="Name,Phone,Industry,AnnualRevenue"
 */
export default class UiRecordView extends LightningElement {
    /** レコード Id */
    @api recordId;
    /** オブジェクト API 名 */
    @api objectApiName;
    /** カンマ区切りのフィールド API 名 */
    @api fields = '';
    /** ヘッダタイトル（任意） */
    @api title;
    /** 列数 */
    @api columns = 2;

    get fieldList() {
        return this.fields
            ? this.fields.split(',').map((f) => f.trim()).filter((f) => f)
            : [];
    }

    get gridStyle() {
        const cols = Number(this.columns) || 2;
        return `grid-template-columns: repeat(${cols}, 1fr);`;
    }
}
