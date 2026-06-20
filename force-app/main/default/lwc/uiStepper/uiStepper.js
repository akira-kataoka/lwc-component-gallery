import { LightningElement, api } from 'lwc';

/**
 * uiStepper — 汎用数値ステッパー。
 * −/+ ボタンと数値入力で値を増減し、変更時に change イベント
 * (detail.value) を発火する。min/max で範囲を制限できる。
 */
export default class UiStepper extends LightningElement {
    /** ラベル */
    @api label;
    /** 現在値 */
    @api value = 0;
    /** 最小値（任意） */
    @api min;
    /** 最大値（任意） */
    @api max;
    /** 刻み */
    @api step = 1;

    get stepValue() {
        return Number(this.step) || 1;
    }

    clamp(n) {
        let v = n;
        if (this.min !== undefined && this.min !== '' && this.min !== null) {
            v = Math.max(Number(this.min), v);
        }
        if (this.max !== undefined && this.max !== '' && this.max !== null) {
            v = Math.min(Number(this.max), v);
        }
        return v;
    }

    emit() {
        this.dispatchEvent(
            new CustomEvent('change', { detail: { value: this.value } })
        );
    }

    handleDecrement() {
        this.value = this.clamp(Number(this.value) - this.stepValue);
        this.emit();
    }

    handleIncrement() {
        this.value = this.clamp(Number(this.value) + this.stepValue);
        this.emit();
    }

    handleInput(event) {
        this.value = this.clamp(Number(event.target.value) || 0);
        this.emit();
    }
}
