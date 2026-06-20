import { LightningElement, api, track } from 'lwc';

/**
 * uiFileUpload — 汎用ファイルアップロード（ドロップゾーン）。
 * クリックまたはドラッグ＆ドロップでファイルを選択し、
 * upload イベント (detail.name) を発火する。
 */
export default class UiFileUpload extends LightningElement {
    /** 案内テキスト */
    @api label = 'ファイルをドラッグ、またはクリックして選択';
    /** accept 属性（例: image/*） */
    @api accept;

    @track fileName = '';
    @track dragging = false;

    get hasFile() {
        return !!this.fileName;
    }

    get rootClass() {
        return this.dragging ? 'ui-upload ui-upload_drag' : 'ui-upload';
    }

    handleClick() {
        this.template.querySelector('input').click();
    }

    handleChange(event) {
        const file = event.target.files && event.target.files[0];
        if (file) {
            this.setFile(file.name);
        }
    }

    handleDragOver(event) {
        event.preventDefault();
        this.dragging = true;
    }

    handleDragLeave() {
        this.dragging = false;
    }

    handleDrop(event) {
        event.preventDefault();
        this.dragging = false;
        const file = event.dataTransfer.files && event.dataTransfer.files[0];
        if (file) {
            this.setFile(file.name);
        }
    }

    setFile(name) {
        this.fileName = name;
        this.dispatchEvent(new CustomEvent('upload', { detail: { name } }));
    }
}
