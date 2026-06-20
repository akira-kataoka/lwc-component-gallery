import { LightningElement, api, track } from 'lwc';

/**
 * uiTagInput — 汎用タグ入力。
 * Enter で入力テキストをタグとして追加し、×で削除する。
 * 変更時に change イベント (detail.tags) を発火する。
 */
export default class UiTagInput extends LightningElement {
    @track _tags = [];

    /** タグ文字列の配列 */
    @api
    get tags() {
        return this._tags;
    }
    set tags(value) {
        this._tags = Array.isArray(value) ? [...value] : [];
    }

    /** プレースホルダ */
    @api placeholder = 'タグを入力して Enter';

    get computedTags() {
        return this._tags.map((t, i) => ({ key: i, label: t }));
    }

    handleKeydown(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            const value = event.target.value.trim();
            if (value && !this._tags.includes(value)) {
                this._tags = [...this._tags, value];
                this.emit();
            }
            event.target.value = '';
        } else if (
            event.key === 'Backspace' &&
            !event.target.value &&
            this._tags.length
        ) {
            this._tags = this._tags.slice(0, -1);
            this.emit();
        }
    }

    handleRemove(event) {
        const idx = Number(event.currentTarget.dataset.index);
        this._tags = this._tags.filter((t, i) => i !== idx);
        this.emit();
    }

    emit() {
        this.dispatchEvent(
            new CustomEvent('change', { detail: { tags: [...this._tags] } })
        );
    }
}
