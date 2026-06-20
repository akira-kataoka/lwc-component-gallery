import { LightningElement, api, track } from 'lwc';

/**
 * uiCarousel — 汎用カルーセル。
 * slides 配列 ([{ title, text }]) を 1 枚ずつ表示し、前後ボタンと
 * ドットで切替える。切替時に change イベント (detail.index) を発火する。
 */
export default class UiCarousel extends LightningElement {
    _slides = [];

    /** [{ title, text }] の配列 */
    @api
    get slides() {
        return this._slides;
    }
    set slides(value) {
        this._slides = Array.isArray(value) ? value : [];
    }

    @track index = 0;

    get current() {
        return this._slides[this.index] || {};
    }

    get dots() {
        return this._slides.map((s, i) => ({
            key: i,
            idx: i,
            cssClass:
                i === this.index
                    ? 'ui-carousel__dot ui-carousel__dot_active'
                    : 'ui-carousel__dot'
        }));
    }

    get hasSlides() {
        return this._slides.length > 0;
    }

    emit() {
        this.dispatchEvent(
            new CustomEvent('change', { detail: { index: this.index } })
        );
    }

    handlePrev() {
        const n = this._slides.length;
        if (n) {
            this.index = (this.index - 1 + n) % n;
            this.emit();
        }
    }

    handleNext() {
        const n = this._slides.length;
        if (n) {
            this.index = (this.index + 1) % n;
            this.emit();
        }
    }

    handleDot(event) {
        this.index = Number(event.currentTarget.dataset.idx);
        this.emit();
    }
}
