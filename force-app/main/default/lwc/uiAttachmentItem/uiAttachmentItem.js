import { LightningElement, api } from 'lwc';

const ICONS = {
    pdf: '📕',
    doc: '📘',
    xls: '📗',
    ppt: '📙',
    img: '🖼️',
    zip: '🗜️',
    txt: '📄',
    file: '📎'
};

/**
 * uiAttachmentItem — 添付ファイル行。
 * 種別アイコン・ファイル名・サイズと、ダウンロードボタンを表示する。
 * ダウンロード押下で download イベント (detail.name) を発火する。
 */
export default class UiAttachmentItem extends LightningElement {
    /** ファイル名 */
    @api name;
    /** サイズ表記（例: 2.4 MB） */
    @api size;
    /** 種別: pdf | doc | xls | ppt | img | zip | txt | file */
    @api type = 'file';

    get iconChar() {
        return ICONS[this.type] || ICONS.file;
    }

    handleDownload() {
        this.dispatchEvent(
            new CustomEvent('download', { detail: { name: this.name } })
        );
    }
}
