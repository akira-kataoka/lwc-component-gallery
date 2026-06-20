import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldDisplayValue } from 'lightning/uiRecordApi';

/**
 * uiRecordCard — レコードカード。
 * recordId と objectApiName、fields（カンマ区切りの修飾フィールド名）から
 * getRecord ワイヤでレコードを取得し、アイコン付きカードにフィールドを並べる。
 *
 * 例: fields="Account.Name,Account.Phone,Account.Industry"
 */
export default class UiRecordCard extends LightningElement {
    /** レコード Id */
    @api recordId;
    /** オブジェクト API 名（例: Account） */
    @api objectApiName;
    /** カンマ区切りの修飾フィールド名 */
    @api fields = '';
    /** ヘッダアイコン（lightning-icon 名） */
    @api iconName = 'standard:record';
    /** カードタイトル */
    @api title;

    get fieldList() {
        return this.fields
            ? this.fields.split(',').map((f) => f.trim()).filter((f) => f)
            : [];
    }

    @wire(getRecord, { recordId: '$recordId', fields: '$fieldList' })
    record;

    get hasData() {
        return !!(this.record && this.record.data);
    }

    get rows() {
        if (!this.hasData) {
            return [];
        }
        return this.fieldList.map((f) => {
            const apiName = f.split('.').pop();
            const label = apiName
                .replace(/__c$/, '')
                .replace(/_/g, ' ');
            return {
                key: f,
                label,
                value: getFieldDisplayValue(this.record.data, f)
            };
        });
    }
}
