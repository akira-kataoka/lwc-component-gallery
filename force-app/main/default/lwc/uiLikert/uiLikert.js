import { LightningElement, api } from 'lwc';

/**
 * uiLikert — 汎用リッカート尺度（5 段階）。
 * 1〜5 の選択肢を丸で表示し、両端にラベルを置く。
 * 選択時に change イベント (detail.value) を発火する。
 */
export default class UiLikert extends LightningElement {
    /** 選択値（1〜5） */
    @api value;
    /** 左端ラベル */
    @api leftLabel = '不満';
    /** 右端ラベル */
    @api rightLabel = '満足';

    get points() {
        return [1, 2, 3, 4, 5].map((n) => ({
            key: n,
            value: n,
            cssClass:
                Number(this.value) === n
                    ? 'ui-likert__pt ui-likert__pt_on'
                    : 'ui-likert__pt'
        }));
    }

    handleSelect(event) {
        this.value = Number(event.currentTarget.dataset.value);
        this.dispatchEvent(
            new CustomEvent('change', { detail: { value: this.value } })
        );
    }
}
