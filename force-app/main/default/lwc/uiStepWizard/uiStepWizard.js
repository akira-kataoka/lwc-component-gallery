import { LightningElement, api, track } from 'lwc';

/**
 * uiStepWizard — ステップウィザード。
 * steps 配列 ([{ label, content }]) を番号インジケータ＋本文＋戻る/次へで進める。
 * ステップ変更で change、最終ステップの完了で complete イベントを発火する。
 */
export default class UiStepWizard extends LightningElement {
    @track _steps = [];
    @track index = 0;

    /** [{ label, content }] の配列 */
    @api
    get steps() {
        return this._steps;
    }
    set steps(value) {
        this._steps = Array.isArray(value) ? value : [];
    }

    get markers() {
        return this._steps.map((s, i) => {
            let state = 'upcoming';
            if (i < this.index) {
                state = 'complete';
            } else if (i === this.index) {
                state = 'current';
            }
            return {
                key: i,
                label: s.label,
                marker: i < this.index ? '✓' : String(i + 1),
                cssClass: `ui-wizard__step ui-wizard__step_${state}`
            };
        });
    }

    get activeContent() {
        const s = this._steps[this.index];
        return s ? s.content : '';
    }

    get isFirst() {
        return this.index === 0;
    }

    get isLast() {
        return this.index >= this._steps.length - 1;
    }

    get nextLabel() {
        return this.isLast ? '完了' : '次へ';
    }

    handlePrev() {
        if (this.index > 0) {
            this.index -= 1;
            this.emitChange();
        }
    }

    handleNext() {
        if (this.isLast) {
            this.dispatchEvent(new CustomEvent('complete'));
            return;
        }
        this.index += 1;
        this.emitChange();
    }

    emitChange() {
        this.dispatchEvent(
            new CustomEvent('change', { detail: { index: this.index } })
        );
    }
}
