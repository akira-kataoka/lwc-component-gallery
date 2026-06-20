import { LightningElement, api, track } from 'lwc';

/**
 * uiInlineEdit — 汎用インライン編集。
 * 表示テキストをクリックすると入力に切替わり、Enter／フォーカスアウトで確定、
 * Esc で取消す。確定時に change イベント (detail.value) を発火する。
 */
export default class UiInlineEdit extends LightningElement {
    /** 値 */
    @api value = '';
    /** 未入力時のプレースホルダ */
    @api placeholder = 'クリックして編集';

    @track editing = false;
    @track draft = '';

    get isEmpty() {
        return !this.value;
    }

    get displayValue() {
        return this.value || this.placeholder;
    }

    get displayClass() {
        return this.isEmpty
            ? 'ui-inlineedit__text ui-inlineedit__text_empty'
            : 'ui-inlineedit__text';
    }

    startEdit() {
        this.draft = this.value;
        this.editing = true;
    }

    renderedCallback() {
        if (this.editing) {
            const input = this.template.querySelector('input');
            if (input && document.activeElement !== input) {
                input.focus();
                input.select();
            }
        }
    }

    handleInput(event) {
        this.draft = event.target.value;
    }

    commit() {
        if (!this.editing) {
            return;
        }
        this.value = this.draft;
        this.editing = false;
        this.dispatchEvent(
            new CustomEvent('change', { detail: { value: this.value } })
        );
    }

    cancel() {
        this.editing = false;
    }

    handleKeydown(event) {
        if (event.key === 'Enter') {
            this.commit();
        } else if (event.key === 'Escape') {
            this.cancel();
        }
    }
}
