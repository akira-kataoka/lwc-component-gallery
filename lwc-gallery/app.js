/* ===== LWC ギャラリー（配布ページ）アプリ ===== */
(function () {
    'use strict';

    const DATA = window.GALLERY_DATA || { components: [], generatedAt: '' };
    const FILE_META = [
        { key: 'html', label: 'HTML', ext: '.html' },
        { key: 'js', label: 'JS', ext: '.js' },
        { key: 'css', label: 'CSS', ext: '.css' },
        { key: 'meta', label: 'META', ext: '.js-meta.xml' }
    ];

    /* ---------- 小ヘルパ ---------- */
    function el(tag, attrs, children) {
        const node = document.createElement(tag);
        if (attrs) {
            Object.keys(attrs).forEach((k) => {
                if (k === 'class') node.className = attrs[k];
                else if (k === 'text') node.textContent = attrs[k];
                else if (k === 'html') node.innerHTML = attrs[k];
                else if (k.startsWith('on') && typeof attrs[k] === 'function')
                    node.addEventListener(k.slice(2), attrs[k]);
                else if (attrs[k] !== undefined && attrs[k] !== null)
                    node.setAttribute(k, attrs[k]);
            });
        }
        (children || []).forEach((c) => {
            if (c == null) return;
            node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
        });
        return node;
    }

    let toastTimer;
    function toast(msg) {
        const t = document.getElementById('toast');
        t.textContent = msg;
        t.classList.add('is-visible');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => t.classList.remove('is-visible'), 1800);
    }

    function copyText(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(
                () => toast('コピーしました'),
                () => fallbackCopy(text)
            );
        } else {
            fallbackCopy(text);
        }
    }
    function fallbackCopy(text) {
        const ta = el('textarea', { style: 'position:fixed;opacity:0' });
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        try {
            document.execCommand('copy');
            toast('コピーしました');
        } catch (e) {
            toast('コピーに失敗しました');
        }
        document.body.removeChild(ta);
    }

    function downloadFile(filename, text) {
        const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = el('a', { href: url, download: filename });
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    }

    /* ---------- ナビ生成 ---------- */
    function buildNav() {
        const nav = document.getElementById('nav');
        const groups = {};
        const order = [];
        DATA.components.forEach((c) => {
            if (!groups[c.category]) {
                groups[c.category] = [];
                order.push(c.category);
            }
            groups[c.category].push(c);
        });
        order.forEach((cat) => {
            const items = el('div', { class: 'nav-group__items' });
            groups[cat].forEach((c) => {
                items.appendChild(
                    el('a', { class: 'nav-link', href: '#' + c.id, 'data-id': c.id }, [
                        el('span', { class: 'nav-link__icon', text: c.icon }),
                        el('span', { class: 'nav-link__text' }, [
                            el('span', { class: 'nav-link__ja', text: c.ja || c.title }),
                            el('span', { class: 'nav-link__en', text: c.title })
                        ])
                    ])
                );
            });
            const title = el('button', { class: 'nav-group__title', type: 'button' }, [
                el('span', { class: 'nav-group__caret', text: '▼' }),
                el('span', { text: cat }),
                el('span', { class: 'nav-group__count', text: String(groups[cat].length) })
            ]);
            const group = el('div', { class: 'nav-group' }, [title, items]);
            title.addEventListener('click', () => group.classList.toggle('is-collapsed'));
            nav.appendChild(group);
        });
    }

    /* ---------- API テーブル ---------- */
    function apiTable(headers, rows, cellFns) {
        const thead = el('thead', null, [
            el('tr', null, headers.map((h) => el('th', { text: h })))
        ]);
        const tbody = el('tbody', null,
            rows.map((r) => el('tr', null, cellFns.map((fn) => fn(r))))
        );
        return el('table', { class: 'api-table' }, [thead, tbody]);
    }

    function codeCell(text) {
        const td = el('td');
        td.appendChild(el('code', { text }));
        return td;
    }

    /* ---------- ソースビューア ---------- */
    function buildSource(comp) {
        const available = FILE_META.filter((f) => comp.files[f.key] != null);
        const code = el('pre', { class: 'source__code' });
        const codeText = el('code');
        code.appendChild(codeText);

        const tabsRow = el('div', { class: 'source__tabs' });
        function show(fileMeta, btn) {
            tabsRow.querySelectorAll('.source__tab').forEach((b) =>
                b.classList.remove('is-active')
            );
            btn.classList.add('is-active');
            codeText.textContent = comp.files[fileMeta.key];
            code.dataset.current = fileMeta.key;
        }
        available.forEach((f, i) => {
            const btn = el('button', { class: 'source__tab', type: 'button', text: f.label });
            btn.addEventListener('click', () => show(f, btn));
            tabsRow.appendChild(btn);
            if (i === 0) show(f, btn);
        });

        const copyBtn = el('button', { class: 'mini-btn', type: 'button', text: '📋 コピー' });
        copyBtn.addEventListener('click', () => copyText(codeText.textContent));

        const dlBtn = el('button', { class: 'mini-btn', type: 'button', text: '⬇ このファイル' });
        dlBtn.addEventListener('click', () => {
            const key = code.dataset.current;
            const fm = FILE_META.find((f) => f.key === key);
            downloadFile(comp.id + fm.ext, comp.files[key]);
        });

        const dlAllBtn = el('button', { class: 'mini-btn', type: 'button', text: '⬇ 全ファイル' });
        dlAllBtn.addEventListener('click', () => {
            available.forEach((f, i) => {
                setTimeout(() => downloadFile(comp.id + f.ext, comp.files[f.key]), i * 250);
            });
            toast(available.length + ' ファイルをダウンロード');
        });

        const toolbar = el('div', { class: 'source__toolbar' }, [copyBtn, dlBtn, dlAllBtn]);
        const panel = el('div', { class: 'source__panel' }, [toolbar, code]);
        return el('div', null, [tabsRow, panel]);
    }

    /* ---------- コンポーネントカード ---------- */
    function section(labelText, body) {
        return el('section', { class: 'comp__section' }, [
            el('h3', { class: 'section-label', text: labelText }),
            body
        ]);
    }

    function buildCard(comp) {
        const card = el('section', { class: 'comp', id: comp.id });

        // ヘッダ
        const header = el('div', { class: 'comp__header' }, [
            el('div', { class: 'comp__title-row' }, [
                el('span', { class: 'comp__icon', text: comp.icon }),
                el('h2', { class: 'comp__title' }, [
                    el('span', { class: 'comp__title-ja', text: comp.ja || comp.title }),
                    el('span', { class: 'comp__title-en', text: comp.title })
                ]),
                el('span', { class: 'comp__tag', text: comp.category }),
                el('span', { class: 'comp__api', text: '<c-' + kebab(comp.id) + '>' })
            ]),
            el('p', { class: 'comp__desc', text: comp.description })
        ]);
        card.appendChild(header);

        // プレビュー
        const demoBox = el('div', { class: 'demo' });
        const controls = el('div', { class: 'demo__controls' });
        const demoWrap = el('div', null, [
            demoBox,
            controls,
            el('p', { class: 'demo__note', text: '※ プレビューは実 LWC の CSS を用いた再現です（lightning-icon は省略）。' })
        ]);
        card.appendChild(section('プレビュー', demoWrap));
        const renderer = DEMOS[comp.demo];
        if (renderer) renderer(demoBox, controls);

        // プロパティ
        if (comp.props && comp.props.length) {
            const table = apiTable(
                ['プロパティ', '型', '既定値', '説明'],
                comp.props,
                [
                    (p) => codeCell(p.name),
                    (p) => el('td', { text: p.type }),
                    (p) => codeCell(p.def),
                    (p) => el('td', { text: p.desc })
                ]
            );
            card.appendChild(section('プロパティ', table));
        }

        // スロット
        if (comp.slots && comp.slots.length) {
            const table = apiTable(
                ['スロット', '説明'],
                comp.slots,
                [(s) => codeCell(s.name), (s) => el('td', { text: s.desc })]
            );
            card.appendChild(section('スロット', table));
        }

        // イベント
        if (comp.events && comp.events.length) {
            const table = apiTable(
                ['イベント', '説明'],
                comp.events,
                [(e) => codeCell(e.name), (e) => el('td', { text: e.desc })]
            );
            card.appendChild(section('イベント', table));
        }

        // メソッド
        if (comp.methods && comp.methods.length) {
            const table = apiTable(
                ['メソッド', '説明'],
                comp.methods,
                [(m) => codeCell(m.name), (m) => el('td', { text: m.desc })]
            );
            card.appendChild(section('メソッド（@api）', table));
        }

        // 使い方
        if (comp.usage) {
            const pre = el('pre', { class: 'usage-code' });
            pre.appendChild(el('code', { text: comp.usage }));
            card.appendChild(section('使い方（テンプレート）', pre));
        }

        // ソース
        card.appendChild(section('ソース', buildSource(comp)));

        return card;
    }

    function kebab(id) {
        return id.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    }

    /* ---------- ライブデモ（実 LWC の CSS クラスを使用） ---------- */
    const DEMOS = {
        badge(box) {
            [
                ['neutral', '下書き'],
                ['info', '進行中'],
                ['success', '承認済み'],
                ['warning', '保留'],
                ['error', '却下']
            ].forEach(([v, label]) => {
                box.appendChild(
                    el('span', { class: 'ui-badge ui-badge_' + v }, [
                        el('span', { class: 'ui-badge__label', text: label })
                    ])
                );
            });
        },

        button(box, controls) {
            let count = 0;
            const out = el('span', { class: 'demo__out', text: 'クリック数: 0' });
            ['brand', 'neutral', 'outline', 'success', 'destructive'].forEach((v) => {
                const b = el('button', { class: 'ui-button ui-button_' + v }, [
                    el('span', { class: 'ui-button__label', text: v })
                ]);
                b.addEventListener('click', () => {
                    count += 1;
                    out.textContent = 'クリック数: ' + count;
                });
                box.appendChild(b);
            });
            const disabled = el('button', { class: 'ui-button ui-button_brand', disabled: 'true' }, [
                el('span', { class: 'ui-button__label', text: 'disabled' })
            ]);
            box.appendChild(disabled);
            controls.appendChild(out);
        },

        card(box) {
            const c = el('article', { class: 'ui-card', style: 'max-width:340px' }, [
                el('header', { class: 'ui-card__header' }, [
                    el('h2', { class: 'ui-card__title', text: '取引先' }),
                    el('div', { class: 'ui-card__actions' }, [
                        el('span', { class: 'ui-badge ui-badge_success' }, [
                            el('span', { class: 'ui-badge__label', text: '優良' })
                        ])
                    ])
                ]),
                el('div', { class: 'ui-card__body' }, [
                    '株式会社サンプル商事のカードです。本文・アクション・フッタのスロットを持ちます。'
                ]),
                el('footer', { class: 'ui-card__footer' }, [
                    el('button', { class: 'ui-button ui-button_neutral' }, [
                        el('span', { class: 'ui-button__label', text: '詳細を見る' })
                    ])
                ])
            ]);
            box.appendChild(c);
        },

        modal(box, controls) {
            const openBtn = el('button', { class: 'ui-button ui-button_brand' }, [
                el('span', { class: 'ui-button__label', text: 'モーダルを開く' })
            ]);
            box.appendChild(openBtn);

            let keyHandler;
            function close(overlay) {
                overlay.remove();
                if (keyHandler) document.removeEventListener('keydown', keyHandler);
            }
            openBtn.addEventListener('click', () => {
                const closeBtn = el('button', { class: 'ui-modal__close', type: 'button', html: '&times;' });
                const okBtn = el('button', { class: 'ui-button ui-button_brand' }, [
                    el('span', { class: 'ui-button__label', text: 'OK' })
                ]);
                const modal = el('section', { class: 'ui-modal ui-modal_small', role: 'dialog' }, [
                    el('header', { class: 'ui-modal__header' }, [
                        el('h2', { class: 'ui-modal__title', text: '確認' }),
                        closeBtn
                    ]),
                    el('div', { class: 'ui-modal__body' }, [
                        'これは uiModal のプレビューです。背景クリック・×ボタン・Esc キーで閉じます。'
                    ]),
                    el('footer', { class: 'ui-modal__footer' }, [okBtn])
                ]);
                const overlay = el('div', { class: 'ui-modal-backdrop' }, [modal]);
                modal.addEventListener('click', (e) => e.stopPropagation());
                overlay.addEventListener('click', () => close(overlay));
                closeBtn.addEventListener('click', () => close(overlay));
                okBtn.addEventListener('click', () => close(overlay));
                keyHandler = (e) => {
                    if (e.key === 'Escape') close(overlay);
                };
                document.addEventListener('keydown', keyHandler);
                document.body.appendChild(overlay);
            });
            controls.appendChild(el('span', { class: 'demo__out', text: 'open プロパティで表示制御' }));
        },

        tabs(box) {
            const tabs = [
                { label: '概要', value: 'overview', content: '概要タブの本文です。tabs 配列の content を表示します。' },
                { label: '詳細', value: 'detail', content: '詳細タブの本文です。ヘッダをクリックすると切替わります。' },
                { label: '履歴', value: 'history', content: '履歴タブの本文です。select イベントで選択値を通知します。' }
            ];
            let active = tabs[0].value;
            const nav = el('div', { class: 'ui-tabs__nav', role: 'tablist' });
            const panel = el('div', { class: 'ui-tabs__panel', role: 'tabpanel' });
            function render() {
                nav.innerHTML = '';
                tabs.forEach((t) => {
                    const b = el('button', {
                        class: 'ui-tab' + (t.value === active ? ' ui-tab_active' : ''),
                        type: 'button',
                        text: t.label
                    });
                    b.addEventListener('click', () => {
                        active = t.value;
                        render();
                    });
                    nav.appendChild(b);
                });
                const cur = tabs.find((t) => t.value === active);
                panel.textContent = cur ? cur.content : '';
            }
            render();
            box.appendChild(el('div', { class: 'ui-tabs', style: 'width:100%' }, [nav, panel]));
        },

        accordion(box) {
            const sections = [
                { label: '配送について', value: 's1', content: '通常 2〜4 営業日でお届けします。' },
                { label: '返品について', value: 's2', content: '到着後 7 日以内であれば返品可能です。' },
                { label: '保証について', value: 's3', content: '購入から 1 年間のメーカー保証付きです。' }
            ];
            let open = [];
            const wrap = el('div', { class: 'ui-accordion', style: 'width:100%' });
            function render() {
                wrap.innerHTML = '';
                sections.forEach((s) => {
                    const isOpen = open.includes(s.value);
                    const head = el('button', {
                        class: 'ui-accordion__header',
                        type: 'button'
                    }, [
                        el('span', { class: 'ui-accordion__icon', text: isOpen ? '−' : '+' }),
                        el('span', { class: 'ui-accordion__label', text: s.label })
                    ]);
                    head.addEventListener('click', () => {
                        open = isOpen ? [] : [s.value];
                        render();
                    });
                    const item = el('div', {
                        class: 'ui-accordion__item' + (isOpen ? ' ui-accordion__item_open' : '')
                    }, [head]);
                    if (isOpen) {
                        item.appendChild(el('div', { class: 'ui-accordion__body', text: s.content }));
                    }
                    wrap.appendChild(item);
                });
            }
            render();
            box.appendChild(wrap);
        },

        datatable(box, controls) {
            const columns = [
                { label: '名前', fieldName: 'name', sortable: true },
                { label: '部署', fieldName: 'dept', sortable: true },
                { label: '金額', fieldName: 'amount', sortable: true }
            ];
            const data = [
                { id: 1, name: '田中 太郎', dept: '営業1課', amount: 120000 },
                { id: 2, name: '佐藤 花子', dept: '営業2課', amount: 98000 },
                { id: 3, name: '鈴木 一郎', dept: '開発', amount: 156000 },
                { id: 4, name: '高橋 桜', dept: '営業1課', amount: 87000 }
            ];
            let sortBy = null;
            let dir = 'asc';
            const out = el('span', { class: 'demo__out', text: '行をクリックすると選択されます' });
            const table = el('table', { class: 'ui-dt', style: 'width:100%' });
            function render() {
                table.innerHTML = '';
                const trh = el('tr');
                columns.forEach((c) => {
                    let ind = '';
                    if (c.sortable && c.fieldName === sortBy) ind = dir === 'asc' ? ' ▲' : ' ▼';
                    const th = el('th', {
                        class: 'ui-dt__th' + (c.sortable ? ' ui-dt__th_sortable' : ''),
                        scope: 'col',
                        text: c.label + ind
                    });
                    if (c.sortable) {
                        th.addEventListener('click', () => {
                            if (sortBy === c.fieldName) dir = dir === 'asc' ? 'desc' : 'asc';
                            else {
                                sortBy = c.fieldName;
                                dir = 'asc';
                            }
                            render();
                        });
                    }
                    trh.appendChild(th);
                });
                table.appendChild(el('thead', null, [trh]));

                const rows = data.slice();
                if (sortBy) {
                    const d = dir === 'asc' ? 1 : -1;
                    rows.sort((a, b) => (a[sortBy] > b[sortBy] ? d : a[sortBy] < b[sortBy] ? -d : 0));
                }
                const tbody = el('tbody');
                rows.forEach((r) => {
                    const tr = el('tr', { class: 'ui-dt__row' },
                        columns.map((c) => el('td', { class: 'ui-dt__td', text: String(r[c.fieldName]) }))
                    );
                    tr.addEventListener('click', () => {
                        out.textContent = '選択: ' + r.name;
                    });
                    tbody.appendChild(tr);
                });
                table.appendChild(tbody);
            }
            render();
            box.appendChild(table);
            controls.appendChild(out);
        },

        progress(box, controls) {
            const variants = ['brand', 'success', 'warning', 'error'];
            const bars = {};
            variants.forEach((v) => {
                const fill = el('div', {
                    class: 'ui-progress__fill ui-progress__fill_' + v,
                    style: 'width:50%'
                });
                const label = el('span', { class: 'ui-progress__label', text: '50%' });
                const track = el('div', { class: 'ui-progress__track' }, [fill]);
                const row = el('div', { class: 'ui-progress', style: 'width:100%;max-width:360px' }, [
                    track,
                    label
                ]);
                bars[v] = { fill, label };
                box.appendChild(row);
            });
            const range = el('input', { type: 'range', min: '0', max: '100', value: '50' });
            range.addEventListener('input', () => {
                const val = range.value;
                variants.forEach((v) => {
                    bars[v].fill.style.width = val + '%';
                    bars[v].label.textContent = val + '%';
                });
            });
            controls.appendChild(el('span', { text: '値:' }));
            controls.appendChild(range);
        },

        input(box, controls) {
            const out = el('span', { class: 'demo__out', text: '入力値: （空）' });
            const field = el('input', {
                class: 'ui-input__field',
                type: 'text',
                placeholder: '山田 太郎'
            });
            field.addEventListener('input', () => {
                out.textContent = '入力値: ' + (field.value || '（空）');
            });
            const wrap = el('div', { class: 'ui-input', style: 'max-width:280px' }, [
                el('label', { class: 'ui-input__label' }, [
                    '氏名',
                    el('abbr', { class: 'ui-input__req', title: '必須' }, ['*'])
                ]),
                field
            ]);
            box.appendChild(wrap);
            controls.appendChild(out);
        },

        toggle(box, controls) {
            const out = el('span', { class: 'demo__out', text: 'OFF' });
            let on = false;
            const thumb = el('span', { class: 'ui-toggle__thumb' });
            const track = el('span', { class: 'ui-toggle__track' }, [thumb]);
            const btn = el('button', { class: 'ui-toggle', type: 'button', role: 'switch' }, [
                track,
                el('span', { class: 'ui-toggle__label', text: '通知を受け取る' })
            ]);
            btn.addEventListener('click', () => {
                on = !on;
                track.className = on
                    ? 'ui-toggle__track ui-toggle__track_on'
                    : 'ui-toggle__track';
                out.textContent = on ? 'ON' : 'OFF';
            });
            box.appendChild(btn);
            controls.appendChild(out);
        },

        avatar(box) {
            [
                ['田中 太郎', 'large', 'circle'],
                ['佐藤 花子', 'medium', 'circle'],
                ['鈴木', 'medium', 'square'],
                ['A B', 'small', 'circle']
            ].forEach((row) => {
                const name = row[0];
                const t = name.trim();
                const p = t.split(/\s+/);
                const initials =
                    p.length === 1
                        ? p[0].slice(0, 2).toUpperCase()
                        : (p[0][0] + p[1][0]).toUpperCase();
                box.appendChild(
                    el('span', { class: 'ui-avatar ui-avatar_' + row[1] + ' ui-avatar_' + row[2] }, [
                        el('span', { class: 'ui-avatar__initials', text: initials })
                    ])
                );
            });
        },

        pill(box, controls) {
            const out = el('span', { class: 'demo__out', text: '×で削除できます' });
            ['営業', '東京', '重要', 'フォロー'].forEach((label) => {
                const removeBtn = el('button', {
                    class: 'ui-pill__remove',
                    type: 'button',
                    title: '削除',
                    html: '&times;'
                });
                const pill = el('span', { class: 'ui-pill' }, [
                    el('span', { class: 'ui-pill__label', text: label }),
                    removeBtn
                ]);
                removeBtn.addEventListener('click', () => {
                    pill.remove();
                    out.textContent = '削除: ' + label;
                });
                box.appendChild(pill);
            });
            controls.appendChild(out);
        },

        alert(box) {
            const icons = { info: 'ℹ', success: '✓', warning: '!', error: '✕' };
            const col = el('div', {
                style: 'display:flex;flex-direction:column;gap:10px;width:100%;max-width:480px'
            });
            [
                ['info', 'お知らせ', '新しいバージョンが利用可能です。'],
                ['success', '保存しました', '変更内容が保存されました。'],
                ['warning', '確認', '未確定の入力項目があります。'],
                ['error', 'エラー', '保存に失敗しました。再度お試しください。']
            ].forEach((row) => {
                const closeBtn = el('button', {
                    class: 'ui-alert__close',
                    type: 'button',
                    title: '閉じる',
                    html: '&times;'
                });
                const al = el('div', { class: 'ui-alert ui-alert_' + row[0], role: 'alert' }, [
                    el('span', { class: 'ui-alert__icon', text: icons[row[0]] }),
                    el('div', { class: 'ui-alert__content' }, [
                        el('strong', { class: 'ui-alert__title', text: row[1] }),
                        el('div', { class: 'ui-alert__message', text: row[2] })
                    ]),
                    closeBtn
                ]);
                closeBtn.addEventListener('click', () => al.remove());
                col.appendChild(al);
            });
            box.appendChild(col);
        },

        spinner(box) {
            ['small', 'medium', 'large'].forEach((size) => {
                box.appendChild(
                    el('span', { class: 'ui-spinner ui-spinner_' + size + ' ui-spinner_brand', role: 'status' }, [
                        el('span', { class: 'ui-spinner__circle' })
                    ])
                );
            });
        },

        toast(box, controls) {
            const icons = { info: 'ℹ', success: '✓', warning: '!', error: '✕' };
            const msgs = {
                info: 'お知らせがあります',
                success: '保存しました',
                warning: '確認してください',
                error: 'エラーが発生しました'
            };
            ['info', 'success', 'warning', 'error'].forEach((v) => {
                const btn = el('button', { class: 'ui-button ui-button_neutral' }, [
                    el('span', { class: 'ui-button__label', text: v })
                ]);
                btn.addEventListener('click', () => {
                    const closeBtn = el('button', { class: 'ui-toast__close', type: 'button', html: '&times;' });
                    const toastEl = el('div', {
                        class: 'ui-toast ui-toast_' + v,
                        role: 'status',
                        style: 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);z-index:9998'
                    }, [
                        el('span', { class: 'ui-toast__icon', text: icons[v] }),
                        el('span', { class: 'ui-toast__message', text: msgs[v] }),
                        closeBtn
                    ]);
                    const remove = () => toastEl.remove();
                    closeBtn.addEventListener('click', remove);
                    document.body.appendChild(toastEl);
                    setTimeout(remove, 3000);
                });
                box.appendChild(btn);
            });
            controls.appendChild(
                el('span', { class: 'demo__out', text: 'ボタンでトースト表示（3秒で自動クローズ）' })
            );
        },

        pagination(box, controls) {
            const total = 6;
            let current = 1;
            const out = el('span', { class: 'demo__out', text: 'ページ 1' });
            const nav = el('nav', { class: 'ui-pagination' });
            function render() {
                nav.innerHTML = '';
                const prev = el('button', { class: 'ui-pagination__nav', type: 'button', text: '‹' });
                if (current <= 1) prev.setAttribute('disabled', 'true');
                prev.addEventListener('click', () => {
                    if (current > 1) {
                        current -= 1;
                        render();
                    }
                });
                nav.appendChild(prev);
                for (let i = 1; i <= total; i += 1) {
                    const b = el('button', {
                        class: 'ui-pagination__page' + (i === current ? ' ui-pagination__page_active' : ''),
                        type: 'button',
                        text: String(i)
                    });
                    b.addEventListener('click', ((n) => () => {
                        current = n;
                        render();
                    })(i));
                    nav.appendChild(b);
                }
                const next = el('button', { class: 'ui-pagination__nav', type: 'button', text: '›' });
                if (current >= total) next.setAttribute('disabled', 'true');
                next.addEventListener('click', () => {
                    if (current < total) {
                        current += 1;
                        render();
                    }
                });
                nav.appendChild(next);
                out.textContent = 'ページ ' + current;
            }
            render();
            box.appendChild(nav);
            controls.appendChild(out);
        },

        select(box, controls) {
            const out = el('span', { class: 'demo__out', text: '選択: （なし）' });
            const sel = el('select', { class: 'ui-select__field' });
            sel.appendChild(el('option', { value: '', text: '選択してください' }));
            [['営業部', 'sales'], ['開発部', 'dev'], ['管理部', 'admin']].forEach((o) =>
                sel.appendChild(el('option', { value: o[1], text: o[0] }))
            );
            sel.addEventListener('change', () => {
                const t = sel.options[sel.selectedIndex].text;
                out.textContent = '選択: ' + (sel.value ? t : '（なし）');
            });
            box.appendChild(
                el('div', { class: 'ui-select', style: 'max-width:240px' }, [
                    el('label', { class: 'ui-select__label', text: '部署' }),
                    sel
                ])
            );
            controls.appendChild(out);
        },

        checkbox(box, controls) {
            const out = el('span', { class: 'demo__out', text: '未チェック' });
            const input = el('input', { type: 'checkbox', class: 'ui-checkbox__input' });
            input.addEventListener('change', () => {
                out.textContent = input.checked ? 'チェック済み' : '未チェック';
            });
            box.appendChild(
                el('label', { class: 'ui-checkbox' }, [
                    input,
                    el('span', { class: 'ui-checkbox__box' }),
                    el('span', { class: 'ui-checkbox__label', text: '利用規約に同意する' })
                ])
            );
            controls.appendChild(out);
        },

        textarea(box, controls) {
            const out = el('span', { class: 'demo__out', text: '0 文字' });
            const ta = el('textarea', {
                class: 'ui-textarea__field',
                rows: '4',
                placeholder: '自由記述…'
            });
            ta.addEventListener('input', () => {
                out.textContent = ta.value.length + ' 文字';
            });
            box.appendChild(
                el('div', { class: 'ui-textarea', style: 'max-width:360px' }, [
                    el('label', { class: 'ui-textarea__label', text: '備考' }),
                    ta
                ])
            );
            controls.appendChild(out);
        },

        breadcrumb(box, controls) {
            const out = el('span', { class: 'demo__out', text: 'リンクをクリック' });
            const items = ['ホーム', '取引先', '株式会社サンプル'];
            const ol = el('ol', { class: 'ui-breadcrumb__list' });
            items.forEach((label, i) => {
                const last = i === items.length - 1;
                const li = el('li', { class: 'ui-breadcrumb__item' });
                if (!last) {
                    const a = el('a', { class: 'ui-breadcrumb__link', href: '#', text: label });
                    a.addEventListener('click', (e) => {
                        e.preventDefault();
                        out.textContent = '移動: ' + label;
                    });
                    li.appendChild(a);
                    li.appendChild(el('span', { class: 'ui-breadcrumb__sep', text: '/' }));
                } else {
                    li.appendChild(el('span', { class: 'ui-breadcrumb__current', text: label }));
                }
                ol.appendChild(li);
            });
            box.appendChild(el('nav', { class: 'ui-breadcrumb' }, [ol]));
            controls.appendChild(out);
        },

        steps(box, controls) {
            const labels = ['情報入力', '確認', '支払い', '完了'];
            let current = 2;
            const ol = el('ol', { class: 'ui-steps' });
            function render() {
                ol.innerHTML = '';
                labels.forEach((label, i) => {
                    const num = i + 1;
                    const state = num < current ? 'complete' : num === current ? 'active' : 'upcoming';
                    ol.appendChild(
                        el('li', { class: 'ui-steps__item ui-steps__item_' + state }, [
                            el('span', { class: 'ui-steps__marker', text: state === 'complete' ? '✓' : String(num) }),
                            el('span', { class: 'ui-steps__label', text: label })
                        ])
                    );
                });
            }
            render();
            box.appendChild(el('div', { style: 'width:100%;max-width:480px' }, [ol]));
            const prev = el('button', { class: 'ui-button ui-button_neutral' }, [
                el('span', { class: 'ui-button__label', text: '戻る' })
            ]);
            const next = el('button', { class: 'ui-button ui-button_brand' }, [
                el('span', { class: 'ui-button__label', text: '次へ' })
            ]);
            prev.addEventListener('click', () => {
                if (current > 1) {
                    current -= 1;
                    render();
                }
            });
            next.addEventListener('click', () => {
                if (current < labels.length) {
                    current += 1;
                    render();
                }
            });
            controls.appendChild(prev);
            controls.appendChild(next);
        },

        rating(box, controls) {
            const out = el('span', { class: 'demo__out', text: '評価: 3' });
            let value = 3;
            let hover = 0;
            const root = el('div', { class: 'ui-rating' });
            function render() {
                root.innerHTML = '';
                const filled = hover || value;
                for (let i = 1; i <= 5; i += 1) {
                    const b = el('button', {
                        class: 'ui-rating__star' + (i <= filled ? ' ui-rating__star_on' : ''),
                        type: 'button',
                        text: i <= filled ? '★' : '☆'
                    });
                    b.addEventListener('click', ((n) => () => {
                        value = n;
                        out.textContent = '評価: ' + value;
                        render();
                    })(i));
                    b.addEventListener('mouseenter', ((n) => () => {
                        hover = n;
                        render();
                    })(i));
                    root.appendChild(b);
                }
            }
            root.addEventListener('mouseleave', () => {
                hover = 0;
                render();
            });
            render();
            box.appendChild(root);
            controls.appendChild(out);
        },

        stat(box) {
            const icons = { up: '▲', down: '▼', flat: '—' };
            [
                ['今月の売上', '¥1,250,000', '+12.5%', 'up'],
                ['新規リード', '86', '+3', 'up'],
                ['解約率', '2.4%', '-0.5%', 'down']
            ].forEach((s) => {
                box.appendChild(
                    el('div', { class: 'ui-stat' }, [
                        el('span', { class: 'ui-stat__label', text: s[0] }),
                        el('span', { class: 'ui-stat__value', text: s[1] }),
                        el('span', { class: 'ui-stat__delta ui-stat__delta_' + s[3] }, [
                            el('span', { class: 'ui-stat__trend', text: icons[s[3]] }),
                            ' ' + s[2]
                        ])
                    ])
                );
            });
        },

        divider(box) {
            box.appendChild(
                el('div', { style: 'width:100%;max-width:420px' }, [
                    el('div', { text: '上のコンテンツ', style: 'color:#706e6b;font-size:0.85rem' }),
                    el('div', { class: 'ui-divider ui-divider_medium' }, [
                        el('span', { class: 'ui-divider__line' }),
                        el('span', { class: 'ui-divider__label', text: 'または' }),
                        el('span', { class: 'ui-divider__line' })
                    ]),
                    el('div', { class: 'ui-divider ui-divider_medium' }, [
                        el('span', { class: 'ui-divider__line ui-divider__line_full' })
                    ]),
                    el('div', { text: '下のコンテンツ', style: 'color:#706e6b;font-size:0.85rem' })
                ])
            );
        },

        tooltip(box) {
            [['top', '上に表示'], ['bottom', '下に表示'], ['right', '右に表示']].forEach((p) => {
                const btn = el('button', { class: 'ui-button ui-button_neutral' }, [
                    el('span', { class: 'ui-button__label', text: p[0] })
                ]);
                box.appendChild(
                    el('span', { class: 'ui-tooltip ui-tooltip_' + p[0], tabindex: '0' }, [
                        btn,
                        el('span', { class: 'ui-tooltip__bubble', role: 'tooltip', text: p[1] })
                    ])
                );
            });
        },

        emptystate(box) {
            const action = el('button', { class: 'ui-button ui-button_brand' }, [
                el('span', { class: 'ui-button__label', text: '新規作成' })
            ]);
            box.appendChild(
                el('div', { class: 'ui-empty', style: 'width:100%' }, [
                    el('div', { class: 'ui-empty__icon', text: '📭' }),
                    el('h3', { class: 'ui-empty__heading', text: 'データがありません' }),
                    el('p', { class: 'ui-empty__message', text: 'まだ登録されたレコードがありません。新しく作成しましょう。' }),
                    el('div', { class: 'ui-empty__action' }, [action])
                ])
            );
        },

        radio(box, controls) {
            const out = el('span', { class: 'demo__out', text: '選択: （なし）' });
            let value = '';
            const opts = [['クレジットカード', 'card'], ['銀行振込', 'bank'], ['代金引換', 'cod']];
            const fs = el('fieldset', { class: 'ui-radio-group' }, [
                el('legend', { class: 'ui-radio-group__legend', text: '支払方法' })
            ]);
            opts.forEach((o) => {
                const input = el('input', { type: 'radio', class: 'ui-radio__input', name: 'demo-radio', value: o[1] });
                input.addEventListener('change', () => {
                    value = o[1];
                    out.textContent = '選択: ' + o[0];
                });
                fs.appendChild(
                    el('label', { class: 'ui-radio' }, [
                        input,
                        el('span', { class: 'ui-radio__dot' }),
                        el('span', { class: 'ui-radio__label', text: o[0] })
                    ])
                );
            });
            box.appendChild(fs);
            controls.appendChild(out);
        },

        searchbox(box, controls) {
            const out = el('span', { class: 'demo__out', text: 'クエリ: （空）' });
            const field = el('input', { type: 'search', class: 'ui-search__field', placeholder: '検索…' });
            const clear = el('button', { class: 'ui-search__clear', type: 'button', title: 'クリア', html: '&times;', style: 'display:none' });
            field.addEventListener('input', () => {
                out.textContent = 'クエリ: ' + (field.value || '（空）');
                clear.style.display = field.value ? '' : 'none';
            });
            clear.addEventListener('click', () => {
                field.value = '';
                out.textContent = 'クエリ: （空）';
                clear.style.display = 'none';
            });
            box.appendChild(
                el('div', { class: 'ui-search', style: 'max-width:280px' }, [
                    el('span', { class: 'ui-search__icon', text: '🔍' }),
                    field,
                    clear
                ])
            );
            controls.appendChild(out);
        },

        slider(box, controls) {
            const out = el('span', { class: 'demo__out', text: '値: 60' });
            const valSpan = el('span', { class: 'ui-slider__value', text: '60' });
            const range = el('input', { type: 'range', class: 'ui-slider__range', min: '0', max: '100', value: '60' });
            range.addEventListener('input', () => {
                valSpan.textContent = range.value;
                out.textContent = '値: ' + range.value;
            });
            box.appendChild(
                el('div', { class: 'ui-slider', style: 'max-width:320px' }, [
                    el('div', { class: 'ui-slider__header' }, [
                        el('span', { class: 'ui-slider__label', text: '音量' }),
                        valSpan
                    ]),
                    range
                ])
            );
            controls.appendChild(out);
        },

        buttongroup(box, controls) {
            const out = el('span', { class: 'demo__out', text: '表示: リスト' });
            const opts = [['リスト', 'list'], ['カード', 'card'], ['表', 'table']];
            let active = 'list';
            const group = el('div', { class: 'ui-btngroup', role: 'group' });
            function render() {
                group.innerHTML = '';
                opts.forEach((o) => {
                    const b = el('button', {
                        class: 'ui-btngroup__item' + (o[1] === active ? ' ui-btngroup__item_active' : ''),
                        type: 'button',
                        text: o[0]
                    });
                    b.addEventListener('click', () => {
                        active = o[1];
                        out.textContent = '表示: ' + o[0];
                        render();
                    });
                    group.appendChild(b);
                });
            }
            render();
            box.appendChild(group);
            controls.appendChild(out);
        },

        timeline(box) {
            const items = [
                ['注文を受付', '10:24', 'ご注文ありがとうございます。'],
                ['出荷準備', '12:40', '倉庫で梱包を開始しました。'],
                ['発送完了', '15:10', '配送業者へ引き渡しました。'],
                ['お届け', '翌日', '配達が完了しました。']
            ];
            const ul = el('ul', { class: 'ui-timeline', style: 'width:100%;max-width:420px' });
            items.forEach((it) => {
                ul.appendChild(
                    el('li', { class: 'ui-timeline__item' }, [
                        el('span', { class: 'ui-timeline__marker' }),
                        el('div', { class: 'ui-timeline__content' }, [
                            el('div', { class: 'ui-timeline__head' }, [
                                el('span', { class: 'ui-timeline__title', text: it[0] }),
                                el('span', { class: 'ui-timeline__time', text: it[1] })
                            ]),
                            el('p', { class: 'ui-timeline__desc', text: it[2] })
                        ])
                    ])
                );
            });
            box.appendChild(ul);
        },

        statusdot(box) {
            [
                ['online', 'オンライン'],
                ['busy', '取り込み中'],
                ['away', '離席中'],
                ['offline', 'オフライン']
            ].forEach((s) => {
                box.appendChild(
                    el('span', { class: 'ui-statusdot' }, [
                        el('span', { class: 'ui-statusdot__dot ui-statusdot__dot_' + s[0] + (s[0] === 'online' ? ' ui-statusdot__dot_pulse' : '') }),
                        el('span', { class: 'ui-statusdot__label', text: s[1] })
                    ])
                );
            });
        },

        progressring(box, controls) {
            const circ = 2 * Math.PI * 16;
            const variants = ['brand', 'success', 'warning'];
            const bars = [];
            variants.forEach((v, i) => {
                const val = [72, 45, 90][i];
                const bar = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                bar.setAttribute('class', 'ui-ring__bar');
                bar.setAttribute('cx', '20');
                bar.setAttribute('cy', '20');
                bar.setAttribute('r', '16');
                bar.setAttribute('style', `stroke-dasharray:${circ};stroke-dashoffset:${circ * (1 - val / 100)}`);
                const track = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                track.setAttribute('class', 'ui-ring__track');
                track.setAttribute('cx', '20');
                track.setAttribute('cy', '20');
                track.setAttribute('r', '16');
                const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                svg.setAttribute('class', 'ui-ring__svg');
                svg.setAttribute('viewBox', '0 0 40 40');
                svg.appendChild(track);
                svg.appendChild(bar);
                const label = el('span', { class: 'ui-ring__label', text: val + '%' });
                const ring = el('div', { class: 'ui-ring ui-ring_large ui-ring_' + v });
                ring.appendChild(svg);
                ring.appendChild(label);
                box.appendChild(ring);
                bars.push({ bar, label });
            });
            const range = el('input', { type: 'range', min: '0', max: '100', value: '72' });
            range.addEventListener('input', () => {
                const val = Number(range.value);
                bars.forEach((b) => {
                    b.bar.setAttribute('style', `stroke-dasharray:${circ};stroke-dashoffset:${circ * (1 - val / 100)}`);
                    b.label.textContent = val + '%';
                });
            });
            controls.appendChild(el('span', { text: '値:' }));
            controls.appendChild(range);
        },

        dropdownmenu(box, controls) {
            const out = el('span', { class: 'demo__out', text: '選択: （なし）' });
            const items = [['編集', 'edit'], ['複製', 'clone'], ['削除', 'delete']];
            const menu = el('ul', { class: 'ui-dropdown__menu', role: 'menu', style: 'display:none' });
            let open = false;
            const caret = el('span', { class: 'ui-dropdown__caret', text: '▾' });
            const trigger = el('button', { class: 'ui-dropdown__trigger', type: 'button' }, [
                el('span', { class: 'ui-dropdown__label', text: '操作' }),
                caret
            ]);
            items.forEach((it) => {
                const b = el('button', { class: 'ui-dropdown__item', type: 'button', role: 'menuitem', text: it[0] });
                b.addEventListener('click', () => {
                    out.textContent = '選択: ' + it[0];
                    open = false;
                    menu.style.display = 'none';
                });
                menu.appendChild(el('li', { role: 'none' }, [b]));
            });
            trigger.addEventListener('click', () => {
                open = !open;
                menu.style.display = open ? '' : 'none';
            });
            const wrap = el('div', { class: 'ui-dropdown' }, [trigger, menu]);
            wrap.addEventListener('focusout', (e) => {
                if (open && (!e.relatedTarget || !wrap.contains(e.relatedTarget))) {
                    open = false;
                    menu.style.display = 'none';
                }
            });
            box.appendChild(wrap);
            controls.appendChild(out);
        }
    };

    /* ---------- 検索 ---------- */
    function setupSearch() {
        const input = document.getElementById('search');
        input.addEventListener('input', () => {
            const q = input.value.trim().toLowerCase();
            DATA.components.forEach((c) => {
                const hit =
                    !q ||
                    c.title.toLowerCase().includes(q) ||
                    (c.ja && c.ja.toLowerCase().includes(q)) ||
                    c.id.toLowerCase().includes(q) ||
                    c.description.toLowerCase().includes(q) ||
                    c.category.toLowerCase().includes(q);
                const card = document.getElementById(c.id);
                const link = document.querySelector('.nav-link[data-id="' + c.id + '"]');
                if (card) card.style.display = hit ? '' : 'none';
                if (link) link.style.display = hit ? '' : 'none';
            });
            // 検索中はヒットを含むグループを自動展開
            document.querySelectorAll('.nav-group').forEach((g) => {
                const anyVisible = Array.prototype.some.call(
                    g.querySelectorAll('.nav-link'),
                    (l) => l.style.display !== 'none'
                );
                if (q && anyVisible) g.classList.remove('is-collapsed');
            });
        });
    }

    /* ---------- スクロールスパイ ---------- */
    function setupScrollSpy() {
        const links = Array.prototype.slice.call(document.querySelectorAll('.nav-link'));
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        links.forEach((l) => l.classList.remove('is-active'));
                        const active = document.querySelector(
                            '.nav-link[data-id="' + entry.target.id + '"]'
                        );
                        if (active) active.classList.add('is-active');
                    }
                });
            },
            { rootMargin: '-80px 0px -70% 0px' }
        );
        DATA.components.forEach((c) => {
            const card = document.getElementById(c.id);
            if (card) observer.observe(card);
        });
    }

    /* ---------- テーマ ---------- */
    function setupTheme() {
        const btn = document.getElementById('theme-toggle');
        const saved = localStorage.getItem('lwc-gallery-theme');
        if (saved === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            btn.textContent = '☀️';
        }
        btn.addEventListener('click', () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            if (isDark) {
                document.documentElement.removeAttribute('data-theme');
                btn.textContent = '🌙';
                localStorage.setItem('lwc-gallery-theme', 'light');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                btn.textContent = '☀️';
                localStorage.setItem('lwc-gallery-theme', 'dark');
            }
        });
    }

    /* ---------- 初期化 ---------- */
    function init() {
        document.getElementById('comp-count').textContent =
            DATA.components.length + ' コンポーネント';
        if (DATA.generatedAt) {
            const d = new Date(DATA.generatedAt);
            document.getElementById('generated-at').textContent =
                '生成: ' + (isNaN(d) ? DATA.generatedAt : d.toLocaleString('ja-JP'));
        }
        buildNav();
        const container = document.getElementById('components');
        DATA.components.forEach((c) => container.appendChild(buildCard(c)));
        setupSearch();
        setupScrollSpy();
        setupTheme();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
