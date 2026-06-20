import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

/**
 * uiRecordEdit — レコード編集フォーム。
 * lightning-record-edit-form で fields（カンマ区切り API 名）を編集し、
 * 保存に成功すると saved イベント (detail.recordId) とトーストを発火する。
 *
 * 例: fields="Name,Phone,Industry"
 */
export default class UiRecordEdit extends LightningElement {
    /** レコード Id（新規作成時は省略） */
    @api recordId;
    /** オブジェクト API 名 */
    @api objectApiName;
    /** カンマ区切りのフィールド API 名 */
    @api fields = '';
    /** ヘッダタイトル（任意） */
    @api title;

    get fieldList() {
        return this.fields
            ? this.fields.split(',').map((f) => f.trim()).filter((f) => f)
            : [];
    }

    handleSuccess(event) {
        const id = event.detail.id;
        this.dispatchEvent(
            new ShowToastEvent({
                title: '保存しました',
                variant: 'success'
            })
        );
        this.dispatchEvent(
            new CustomEvent('saved', { detail: { recordId: id } })
        );
    }
}
