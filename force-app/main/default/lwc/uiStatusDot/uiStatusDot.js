import { LightningElement, api } from 'lwc';

const STATUSES = ['online', 'offline', 'busy', 'away', 'neutral'];

/**
 * uiStatusDot — 汎用ステータスドット。
 * オンライン/離席などの状態を色付きの丸とラベルで表示する。
 */
export default class UiStatusDot extends LightningElement {
    /** ラベル（任意） */
    @api label;
    /** 状態: online | offline | busy | away | neutral */
    @api status = 'neutral';
    /** true で点滅アニメーション */
    @api pulse = false;

    get dotClass() {
        const status = STATUSES.includes(this.status) ? this.status : 'neutral';
        return `ui-statusdot__dot ui-statusdot__dot_${status}${
            this.pulse ? ' ui-statusdot__dot_pulse' : ''
        }`;
    }
}
