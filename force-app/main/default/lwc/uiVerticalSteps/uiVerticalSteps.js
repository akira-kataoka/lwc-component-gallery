import { LightningElement, api } from 'lwc';

/**
 * uiVerticalSteps — 汎用縦型ステップ。
 * steps 配列 ([{ label, description }]) を縦並びで表示し、
 * current（1 始まり）までを完了/現在/未到達で色分けする。
 */
export default class UiVerticalSteps extends LightningElement {
    _steps = [];

    /** [{ label, description }] の配列 */
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
                key: index,
                label: step.label,
                description: step.description,
                hasDescription: !!step.description,
                marker: state === 'complete' ? '✓' : String(num),
                itemClass: `ui-vsteps__item ui-vsteps__item_${state}`
            };
        });
    }
}
