import { LightningElement, api } from 'lwc';

/**
 * uiDateRangePicker — 汎用日付範囲ピッカー。
 * 開始日と終了日の 2 つの日付入力を「〜」で並べる。
 * いずれか変更時に change イベント (detail.{ start, end }) を発火する。
 */
export default class UiDateRangePicker extends LightningElement {
    /** ラベル */
    @api label;
    /** 開始日（YYYY-MM-DD） */
    @api start = '';
    /** 終了日（YYYY-MM-DD） */
    @api end = '';

    handleStart(event) {
        this.start = event.target.value;
        this.emit();
    }

    handleEnd(event) {
        this.end = event.target.value;
        this.emit();
    }

    emit() {
        this.dispatchEvent(
            new CustomEvent('change', {
                detail: { start: this.start, end: this.end }
            })
        );
    }
}
