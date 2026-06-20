import { LightningElement, api } from 'lwc';

/**
 * uiSteps — 汎用ステップインジケータ。
 * steps 配列 ([{ label }]) と current（1 始まりの現在ステップ）から、
 * 完了/進行中/未着手を色とマーカーで表示する。
 */
export default class UiSteps extends LightningElement {
    _steps = [];

    /** [{ label }] の配列 */
    @api
    get steps() {
        return this._steps;
    }
    set steps(value) {
        this._steps = Array.isArray(value) ? value : [];
    }

    /** 現在ステップ（1 始まり） */
    @api current = 1;

    get computedSteps() {
        const cur = Number(this.current);
        return this._steps.map((step, index) => {
            const num = index + 1;
            let state = 'upcoming';
            if (num < cur) {
                state = 'complete';
            } else if (num === cur) {
                state = 'active';
            }
            return {
                label: step.label,
                marker: state === 'complete' ? '✓' : String(num),
                cssClass: `ui-steps__item ui-steps__item_${state}`
            };
        });
    }
}
