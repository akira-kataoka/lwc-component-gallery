import { LightningElement, api } from 'lwc';

/**
 * uiChatBubble — 汎用チャットバブル。
 * text・author・time を吹き出しで表示する。side='right' で自分側（右寄せ・青）、
 * 'left' で相手側（左寄せ・グレー）になる。
 */
export default class UiChatBubble extends LightningElement {
    /** 本文 */
    @api text;
    /** 送信者名 */
    @api author;
    /** 時刻 */
    @api time;
    /** 表示側: left | right */
    @api side = 'left';

    get rootClass() {
        const side = this.side === 'right' ? 'right' : 'left';
        return `ui-chat ui-chat_${side}`;
    }

    get hasMeta() {
        return !!this.author || !!this.time;
    }
}
