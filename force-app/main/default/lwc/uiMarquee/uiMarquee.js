import { LightningElement, api } from 'lwc';

/**
 * uiMarquee — 汎用マーキー（流れるテキスト）。
 * text を横方向にスクロール表示する。お知らせやティッカーに使う。
 * speed で 1 周の秒数、pause-on-hover でホバー時に一時停止する。
 */
export default class UiMarquee extends LightningElement {
    /** 表示テキスト */
    @api text;
    /** 1 周の秒数 */
    @api speed = 14;
    /** true でホバー時に一時停止 */
    @api pauseOnHover = false;

    get rootClass() {
        return this.pauseOnHover ? 'ui-marquee ui-marquee_pause' : 'ui-marquee';
    }

    get trackStyle() {
        return `animation-duration: ${Number(this.speed) || 14}s`;
    }
}
