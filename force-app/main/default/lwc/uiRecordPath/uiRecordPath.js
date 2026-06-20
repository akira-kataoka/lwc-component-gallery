import { LightningElement, api } from 'lwc';

/**
 * uiRecordPath — レコードパス（ステータスパス）。
 * steps（カンマ区切り）と current（現在のステップ名）から、Salesforce Path 風の
 * シェブロン表示を生成する。ステップクリックで select イベント (detail.step) を発火。
 * Record ページの商談ステージや状況の可視化に使う。
 */
export default class UiRecordPath extends LightningElement {
    /** カンマ区切りのステップ名 */
    @api steps = '';
    /** 現在のステップ名 */
    @api current;

    get stepList() {
        return this.steps
            ? this.steps.split(',').map((s) => s.trim()).filter((s) => s)
            : [];
    }

    get computedSteps() {
        const list = this.stepList;
        const curIndex = list.indexOf(this.current);
        return list.map((label, i) => {
            let state = 'upcoming';
            if (curIndex >= 0 && i < curIndex) {
                state = 'complete';
            } else if (i === curIndex) {
                state = 'current';
            }
            return {
                key: label,
                label,
                cssClass: `ui-path__step ui-path__step_${state}`
            };
        });
    }

    handleSelect(event) {
        const step = event.currentTarget.dataset.step;
        this.dispatchEvent(new CustomEvent('select', { detail: { step } }));
    }
}
