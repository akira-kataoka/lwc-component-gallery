import { LightningElement, api, track } from 'lwc';

/**
 * uiAccordion — 汎用アコーディオン。
 * sections 配列 ([{ label, value, content }]) を折りたたみ表示する。
 * allowMultiple=false (既定) では同時に1つだけ開く。
 * 開閉時に toggle イベントで開いている value 配列を通知する。
 */
export default class UiAccordion extends LightningElement {
    @track _sections = [];
    @track openValues = [];

    /** [{ label, value, content }] の配列 */
    @api
    get sections() {
        return this._sections;
    }
    set sections(value) {
        this._sections = Array.isArray(value) ? value : [];
    }

    /** true で複数同時オープンを許可 */
    @api allowMultiple = false;

    get computedSections() {
        return this._sections.map((s) => {
            const isOpen = this.openValues.includes(s.value);
            return {
                ...s,
                isOpen,
                cssClass: isOpen
                    ? 'ui-accordion__item ui-accordion__item_open'
                    : 'ui-accordion__item',
                iconChar: isOpen ? '−' : '+'
            };
        });
    }

    handleToggle(event) {
        const value = event.currentTarget.dataset.value;
        const isOpen = this.openValues.includes(value);
        if (this.allowMultiple) {
            this.openValues = isOpen
                ? this.openValues.filter((v) => v !== value)
                : [...this.openValues, value];
        } else {
            this.openValues = isOpen ? [] : [value];
        }
        this.dispatchEvent(
            new CustomEvent('toggle', { detail: { open: [...this.openValues] } })
        );
    }
}
