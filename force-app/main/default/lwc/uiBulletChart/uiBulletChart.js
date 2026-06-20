import { LightningElement, api } from 'lwc';

/**
 * uiBulletChart — 汎用ブレットチャート。
 * value（実績）・target（目標マーカー）・max を、定性レンジ（ranges）の帯の上に表示する。
 * KPI の達成度を 1 行でコンパクトに可視化する。
 */
export default class UiBulletChart extends LightningElement {
    /** ラベル */
    @api label;
    /** 実績値 */
    @api value = 0;
    /** 目標値（マーカー） */
    @api target;
    /** 最大値 */
    @api max = 100;

    _ranges = [];

    /** 定性レンジの区切り値（小→大、例: [40, 70]） */
    @api
    get ranges() {
        return this._ranges;
    }
    set ranges(value) {
        this._ranges = Array.isArray(value) ? value : [];
    }

    get maxValue() {
        return Number(this.max) || 100;
    }

    get bands() {
        const shades = ['#e8e8e8', '#d2d2d2', '#bcbcbc', '#a6a6a6'];
        const stops = [0, ...this._ranges.map((r) => Number(r) || 0), this.maxValue];
        const bands = [];
        for (let i = 0; i < stops.length - 1; i += 1) {
            const w = ((stops[i + 1] - stops[i]) / this.maxValue) * 100;
            bands.push({
                key: i,
                style: `width: ${w}%; background: ${shades[i % shades.length]};`
            });
        }
        return bands;
    }

    get valueStyle() {
        const w = Math.min(100, Math.max(0, ((Number(this.value) || 0) / this.maxValue) * 100));
        return `width: ${w}%`;
    }

    get hasTarget() {
        return this.target !== undefined && this.target !== null && this.target !== '';
    }

    get targetStyle() {
        const left = Math.min(100, Math.max(0, ((Number(this.target) || 0) / this.maxValue) * 100));
        return `left: ${left}%`;
    }
}
