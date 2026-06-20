import { LightningElement, api } from 'lwc';

/**
 * uiContactCard — 連絡先カード。
 * アバター（画像またはイニシャル）・氏名・役職と、メール／電話のアクションを表示する。
 * アクション押下で action イベント (detail.type) を発火する。
 */
export default class UiContactCard extends LightningElement {
    /** 氏名 */
    @api name = '';
    /** 役職・所属 */
    @api role;
    /** アバター画像 URL（任意） */
    @api avatarUrl;

    get hasImage() {
        return !!this.avatarUrl;
    }

    get initials() {
        const t = (this.name || '').trim();
        if (!t) {
            return '?';
        }
        const p = t.split(/\s+/);
        return p.length === 1
            ? p[0].slice(0, 2).toUpperCase()
            : (p[0][0] + p[1][0]).toUpperCase();
    }

    handleMail() {
        this.dispatchEvent(new CustomEvent('action', { detail: { type: 'mail' } }));
    }

    handlePhone() {
        this.dispatchEvent(new CustomEvent('action', { detail: { type: 'phone' } }));
    }
}
