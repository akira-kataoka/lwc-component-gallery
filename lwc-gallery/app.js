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

        // プレビュー（PC / タブレット / スマホ 幅切替つき）
        const demoBox = el('div', { class: 'demo' });
        const controls = el('div', { class: 'demo__controls' });
        const stage = el('div', { class: 'demo-stage demo-stage_pc' }, [demoBox]);
        const toolbar = el('div', { class: 'demo-devices' });
        [['pc', '🖥️', 'PC'], ['tablet', '📱', 'タブレット'], ['phone', '📲', 'スマホ']].forEach((d, i) => {
            const b = el('button', { class: 'demo-device' + (i === 0 ? ' is-active' : ''), type: 'button' }, [
                el('span', { text: d[1] }),
                el('span', { class: 'demo-device__label', text: d[2] })
            ]);
            b.addEventListener('click', () => {
                toolbar.querySelectorAll('.demo-device').forEach((x) => x.classList.remove('is-active'));
                b.classList.add('is-active');
                stage.className = 'demo-stage demo-stage_' + d[0];
            });
            toolbar.appendChild(b);
        });
        const demoWrap = el('div', null, [
            toolbar,
            stage,
            controls,
            el('p', { class: 'demo__note', text: '※ プレビューは実 LWC の CSS を用いた再現です（lightning-icon は省略）。上のボタンで端末幅を切替えできます。' })
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
        },

        stepper(box, controls) {
            const out = el('span', { class: 'demo__out', text: '値: 1' });
            let value = 1;
            const input = el('input', { class: 'ui-stepper__input', type: 'number', value: '1' });
            function sync() {
                input.value = String(value);
                out.textContent = '値: ' + value;
            }
            const dec = el('button', { class: 'ui-stepper__btn', type: 'button', text: '−' });
            const inc = el('button', { class: 'ui-stepper__btn', type: 'button', text: '+' });
            dec.addEventListener('click', () => {
                value = Math.max(0, value - 1);
                sync();
            });
            inc.addEventListener('click', () => {
                value += 1;
                sync();
            });
            input.addEventListener('input', () => {
                value = Number(input.value) || 0;
                out.textContent = '値: ' + value;
            });
            box.appendChild(
                el('div', { class: 'ui-stepper' }, [
                    el('label', { class: 'ui-stepper__label', text: '数量' }),
                    el('div', { class: 'ui-stepper__control' }, [dec, input, inc])
                ])
            );
            controls.appendChild(out);
        },

        fileupload(box, controls) {
            const out = el('span', { class: 'demo__out', text: '未選択' });
            const text = el('span', { class: 'ui-upload__text', text: 'ファイルをドラッグ、またはクリックして選択' });
            const zone = el('div', { class: 'ui-upload', style: 'max-width:360px' }, [
                el('span', { class: 'ui-upload__icon', text: '📎' }),
                text
            ]);
            zone.addEventListener('dragover', (e) => {
                e.preventDefault();
                zone.classList.add('ui-upload_drag');
            });
            zone.addEventListener('dragleave', () => zone.classList.remove('ui-upload_drag'));
            zone.addEventListener('drop', (e) => {
                e.preventDefault();
                zone.classList.remove('ui-upload_drag');
                const f = e.dataTransfer.files && e.dataTransfer.files[0];
                if (f) {
                    text.className = 'ui-upload__name';
                    text.textContent = f.name;
                    out.textContent = '選択: ' + f.name;
                }
            });
            zone.addEventListener('click', () => {
                text.className = 'ui-upload__name';
                text.textContent = '提案書.pdf';
                out.textContent = '選択: 提案書.pdf（デモ）';
            });
            box.appendChild(zone);
            controls.appendChild(out);
        },

        colorswatch(box, controls) {
            const colors = ['#0176d3', '#2e844a', '#dd7a01', '#ba0517', '#7f56d9', '#181818'];
            let value = colors[0];
            const out = el('span', { class: 'demo__out', text: '選択: ' + value });
            const wrap = el('div', { class: 'ui-swatches' });
            function render() {
                wrap.innerHTML = '';
                colors.forEach((c) => {
                    const b = el('button', {
                        class: 'ui-swatch' + (c === value ? ' ui-swatch_selected' : ''),
                        type: 'button',
                        style: 'background:' + c,
                        title: c
                    });
                    b.addEventListener('click', () => {
                        value = c;
                        out.textContent = '選択: ' + c;
                        render();
                    });
                    wrap.appendChild(b);
                });
            }
            render();
            box.appendChild(wrap);
            controls.appendChild(out);
        },

        popover(box) {
            const closeBtn = el('button', { class: 'ui-popover__close', type: 'button', title: '閉じる', html: '&times;' });
            const panel = el('div', { class: 'ui-popover__panel', role: 'dialog', style: 'display:none' }, [
                el('header', { class: 'ui-popover__header' }, [
                    el('span', { class: 'ui-popover__title', text: '使い方' }),
                    closeBtn
                ]),
                el('div', { class: 'ui-popover__body' }, [
                    'トリガーをクリックするとこの吹き出しが開きます。外側クリックや × で閉じます。'
                ])
            ]);
            let open = false;
            const trigger = el('button', { class: 'ui-popover__trigger', type: 'button', text: '詳細' });
            const wrap = el('div', { class: 'ui-popover' }, [trigger, panel]);
            trigger.addEventListener('click', () => {
                open = !open;
                panel.style.display = open ? '' : 'none';
            });
            closeBtn.addEventListener('click', () => {
                open = false;
                panel.style.display = 'none';
            });
            wrap.addEventListener('focusout', (e) => {
                if (open && (!e.relatedTarget || !wrap.contains(e.relatedTarget))) {
                    open = false;
                    panel.style.display = 'none';
                }
            });
            box.appendChild(wrap);
        },

        skeleton(box) {
            const lines = el('div', { class: 'ui-skeleton__lines' });
            ['100%', '92%', '78%'].forEach((w) =>
                lines.appendChild(el('div', { class: 'ui-skeleton__line', style: 'width:' + w }))
            );
            box.appendChild(
                el('div', { class: 'ui-skeleton', style: 'width:100%;max-width:360px' }, [
                    el('div', { class: 'ui-skeleton__avatar' }),
                    lines
                ])
            );
        },

        list(box, controls) {
            const out = el('span', { class: 'demo__out', text: 'クリックで選択' });
            const data = [
                ['📄', '提案書.pdf', '2.4 MB'],
                ['📊', '売上レポート', '1日前'],
                ['🖼️', 'ロゴ.png', '320 KB']
            ];
            const ul = el('ul', { class: 'ui-list', style: 'width:100%;max-width:360px' });
            data.forEach((d) => {
                const btn = el('button', { class: 'ui-list__button', type: 'button' }, [
                    el('span', { class: 'ui-list__icon', text: d[0] }),
                    el('span', { class: 'ui-list__title', text: d[1] }),
                    el('span', { class: 'ui-list__meta', text: d[2] })
                ]);
                btn.addEventListener('click', () => {
                    out.textContent = '選択: ' + d[1];
                });
                ul.appendChild(el('li', { class: 'ui-list__item' }, [btn]));
            });
            box.appendChild(ul);
            controls.appendChild(out);
        },

        verticalnav(box, controls) {
            const out = el('span', { class: 'demo__out', text: '選択: ホーム' });
            const items = [
                ['🏠', 'ホーム', 'home'],
                ['📋', 'タスク', 'task'],
                ['📈', 'レポート', 'report'],
                ['⚙️', '設定', 'settings']
            ];
            let active = 'home';
            const nav = el('nav', { class: 'ui-vnav', style: 'min-width:170px' });
            function render() {
                nav.innerHTML = '';
                items.forEach((it) => {
                    const b = el('button', {
                        class: 'ui-vnav__item' + (it[2] === active ? ' ui-vnav__item_active' : ''),
                        type: 'button'
                    }, [
                        el('span', { class: 'ui-vnav__icon', text: it[0] }),
                        el('span', { class: 'ui-vnav__label', text: it[1] })
                    ]);
                    b.addEventListener('click', () => {
                        active = it[2];
                        out.textContent = '選択: ' + it[1];
                        render();
                    });
                    nav.appendChild(b);
                });
            }
            render();
            box.appendChild(nav);
            controls.appendChild(out);
        },

        banner(box) {
            const icons = { info: 'ℹ', success: '✓', warning: '!', error: '✕' };
            const col = el('div', { style: 'display:flex;flex-direction:column;gap:10px;width:100%;max-width:520px' });
            const actionBtn = el('button', { class: 'ui-button ui-button_brand' }, [
                el('span', { class: 'ui-button__label', text: '更新' })
            ]);
            col.appendChild(
                el('div', { class: 'ui-banner ui-banner_info', role: 'status' }, [
                    el('span', { class: 'ui-banner__icon', text: icons.info }),
                    el('span', { class: 'ui-banner__message', text: '新しいバージョンが利用可能です。' }),
                    el('span', { class: 'ui-banner__action' }, [actionBtn])
                ])
            );
            const wclose = el('button', { class: 'ui-banner__close', type: 'button', html: '&times;' });
            const wb = el('div', { class: 'ui-banner ui-banner_warning', role: 'status' }, [
                el('span', { class: 'ui-banner__icon', text: icons.warning }),
                el('span', { class: 'ui-banner__message', text: '近日メンテナンスを予定しています。' }),
                el('span', { class: 'ui-banner__action' }),
                wclose
            ]);
            wclose.addEventListener('click', () => wb.remove());
            col.appendChild(wb);
            box.appendChild(col);
        },

        meter(box, controls) {
            function level(r) {
                return r < 0.34 ? 'low' : r < 0.67 ? 'mid' : 'high';
            }
            const rows = [['CPU使用率', 28, 100], ['メモリ', 55, 100], ['ディスク', 88, 100]];
            const fills = [];
            const wrap = el('div', { style: 'display:flex;flex-direction:column;gap:12px;width:100%;max-width:360px' });
            rows.forEach((r) => {
                const ratio = r[1] / r[2];
                const fill = el('div', {
                    class: 'ui-meter__fill ui-meter__fill_' + level(ratio),
                    style: 'width:' + Math.round(ratio * 100) + '%'
                });
                const val = el('span', { class: 'ui-meter__value', text: r[1] + ' / ' + r[2] });
                wrap.appendChild(
                    el('div', { class: 'ui-meter' }, [
                        el('div', { class: 'ui-meter__head' }, [
                            el('span', { class: 'ui-meter__label', text: r[0] }),
                            val
                        ]),
                        el('div', { class: 'ui-meter__track' }, [fill])
                    ])
                );
                fills.push({ fill, val });
            });
            box.appendChild(wrap);
            const range = el('input', { type: 'range', min: '0', max: '100', value: '28' });
            range.addEventListener('input', () => {
                const v = Number(range.value);
                const ratio = v / 100;
                fills[0].fill.className = 'ui-meter__fill ui-meter__fill_' + level(ratio);
                fills[0].fill.style.width = Math.round(ratio * 100) + '%';
                fills[0].val.textContent = v + ' / 100';
            });
            controls.appendChild(el('span', { text: 'CPU:' }));
            controls.appendChild(range);
        },

        countbadge(box, controls) {
            let count = 5;
            const badge = el('span', { class: 'ui-countbadge__badge', text: '5' });
            const wrap = el('span', { class: 'ui-countbadge', style: 'font-size:1.9rem' }, [
                el('span', { text: '🔔' }),
                badge
            ]);
            function render() {
                if (count > 0) {
                    badge.style.display = '';
                    badge.textContent = count > 99 ? '99+' : String(count);
                } else {
                    badge.style.display = 'none';
                }
            }
            render();
            const dec = el('button', { class: 'ui-button ui-button_neutral' }, [
                el('span', { class: 'ui-button__label', text: '−' })
            ]);
            const inc = el('button', { class: 'ui-button ui-button_neutral' }, [
                el('span', { class: 'ui-button__label', text: '+' })
            ]);
            dec.addEventListener('click', () => {
                count = Math.max(0, count - 1);
                render();
            });
            inc.addEventListener('click', () => {
                count += 1;
                render();
            });
            box.appendChild(wrap);
            controls.appendChild(dec);
            controls.appendChild(inc);
        },

        tag(box) {
            [['提案', 'blue'], ['承認', 'green'], ['至急', 'red'], ['保留', 'orange'], ['VIP', 'purple'], ['下書き', 'neutral']].forEach((t) => {
                box.appendChild(el('span', { class: 'ui-tag ui-tag_' + t[1], text: t[0] }));
            });
        },

        iconbutton(box, controls) {
            let n = 0;
            const out = el('span', { class: 'demo__out', text: 'クリック: 0' });
            [['✏️', 'neutral', '編集'], ['＋', 'brand', '追加'], ['🗑️', 'ghost', '削除'], ['⚙️', 'neutral', '設定']].forEach((b) => {
                const btn = el('button', { class: 'ui-iconbtn ui-iconbtn_' + b[1], type: 'button', title: b[2] }, [
                    el('span', { class: 'ui-iconbtn__icon', text: b[0] })
                ]);
                btn.addEventListener('click', () => {
                    n += 1;
                    out.textContent = 'クリック: ' + n;
                });
                box.appendChild(btn);
            });
            controls.appendChild(out);
        },

        kbd(box) {
            [['Ctrl', 'S'], ['Ctrl', 'K'], ['Shift', 'Enter']].forEach((keys) => {
                const wrap = el('span', { class: 'ui-kbd' });
                keys.forEach((k, i) => {
                    const g = el('span', { class: 'ui-kbd__group' }, [el('kbd', { class: 'ui-kbd__key', text: k })]);
                    if (i < keys.length - 1) {
                        g.appendChild(el('span', { class: 'ui-kbd__plus', text: '+' }));
                    }
                    wrap.appendChild(g);
                });
                box.appendChild(wrap);
            });
        },

        copybutton(box, controls) {
            const out = el('span', { class: 'demo__out', text: '未コピー' });
            const value = 'ABC-12345';
            let timer;
            const icon = el('span', { class: 'ui-copybtn__icon', text: '📋' });
            const label = el('span', { class: 'ui-copybtn__label', text: 'コピー' });
            const btn = el('button', { class: 'ui-copybtn', type: 'button' }, [icon, label]);
            btn.addEventListener('click', () => {
                const done = () => {
                    btn.className = 'ui-copybtn ui-copybtn_done';
                    icon.textContent = '✓';
                    label.textContent = 'コピー済み';
                    out.textContent = 'コピー: ' + value;
                    clearTimeout(timer);
                    timer = setTimeout(() => {
                        btn.className = 'ui-copybtn';
                        icon.textContent = '📋';
                        label.textContent = 'コピー';
                    }, 1500);
                };
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(value).then(done, done);
                } else {
                    done();
                }
            });
            box.appendChild(btn);
            controls.appendChild(out);
            controls.appendChild(el('span', { text: '（値: ' + value + '）', style: 'color:#706e6b' }));
        },

        splitbutton(box, controls) {
            const out = el('span', { class: 'demo__out', text: '操作なし' });
            const items = [['名前を付けて保存', 'saveas'], ['コピーを保存', 'copy'], ['テンプレート保存', 'template']];
            let open = false;
            const menu = el('ul', { class: 'ui-splitbtn__menu', role: 'menu', style: 'display:none' });
            items.forEach((it) => {
                const b = el('button', { class: 'ui-splitbtn__item', type: 'button', role: 'menuitem', text: it[0] });
                b.addEventListener('click', () => {
                    open = false;
                    menu.style.display = 'none';
                    out.textContent = '選択: ' + it[0];
                });
                menu.appendChild(el('li', { role: 'none' }, [b]));
            });
            const main = el('button', { class: 'ui-splitbtn__main', type: 'button', text: '保存' });
            main.addEventListener('click', () => {
                out.textContent = '保存を実行';
            });
            const toggle = el('button', { class: 'ui-splitbtn__toggle', type: 'button', text: '▾' });
            const wrap = el('div', { class: 'ui-splitbtn' }, [main, toggle, menu]);
            toggle.addEventListener('click', () => {
                open = !open;
                menu.style.display = open ? '' : 'none';
            });
            wrap.addEventListener('focusout', (e) => {
                if (open && (!e.relatedTarget || !wrap.contains(e.relatedTarget))) {
                    open = false;
                    menu.style.display = 'none';
                }
            });
            box.appendChild(wrap);
            controls.appendChild(out);
        },

        ribbon(box) {
            const card = el('div', {
                style: 'width:220px;border:1px solid #e5e5e5;border-radius:8px;background:#fff;padding:18px;box-shadow:0 1px 2px rgba(0,0,0,0.06)'
            }, [
                el('div', { style: 'font-weight:700;margin-bottom:6px', text: 'プレミアムプラン' }),
                el('div', { style: 'color:#706e6b;font-size:0.82rem', text: '月額 ¥1,980 / すべての機能が使えます。' })
            ]);
            box.appendChild(
                el('div', { class: 'ui-ribbon-wrap' }, [
                    el('span', { class: 'ui-ribbon ui-ribbon_error', text: 'NEW' }),
                    card
                ])
            );
        },

        datefield(box, controls) {
            const out = el('span', { class: 'demo__out', text: '未選択' });
            const input = el('input', { type: 'date', class: 'ui-datefield__input' });
            input.addEventListener('change', () => {
                out.textContent = '選択: ' + (input.value || '未選択');
            });
            box.appendChild(
                el('div', { class: 'ui-datefield', style: 'max-width:220px' }, [
                    el('label', { class: 'ui-datefield__label', text: '締切日' }),
                    input
                ])
            );
            controls.appendChild(out);
        },

        segmentedprogress(box, controls) {
            const total = 5;
            let current = 3;
            const out = el('span', { class: 'demo__out', text: '3 / 5' });
            const wrap = el('div', { class: 'ui-segprog', style: 'max-width:320px' });
            function render() {
                wrap.innerHTML = '';
                for (let i = 0; i < total; i += 1) {
                    wrap.appendChild(
                        el('span', {
                            class: 'ui-segprog__seg' + (i < current ? ' ui-segprog__seg_filled ui-segprog__seg_brand' : '')
                        })
                    );
                }
                out.textContent = current + ' / ' + total;
            }
            render();
            box.appendChild(wrap);
            const dec = el('button', { class: 'ui-button ui-button_neutral' }, [
                el('span', { class: 'ui-button__label', text: '−' })
            ]);
            const inc = el('button', { class: 'ui-button ui-button_neutral' }, [
                el('span', { class: 'ui-button__label', text: '+' })
            ]);
            dec.addEventListener('click', () => {
                current = Math.max(0, current - 1);
                render();
            });
            inc.addEventListener('click', () => {
                current = Math.min(total, current + 1);
                render();
            });
            controls.appendChild(dec);
            controls.appendChild(inc);
        },

        tree(box, controls) {
            const out = el('span', { class: 'demo__out', text: 'クリックで選択' });
            const nodes = [
                { label: '営業部', value: 'sales', children: [{ label: '第1課', value: 'sales1' }, { label: '第2課', value: 'sales2' }] },
                { label: '開発部', value: 'dev', children: [{ label: 'フロントエンド', value: 'fe' }, { label: 'バックエンド', value: 'be' }] },
                { label: '管理部', value: 'admin', children: [] }
            ];
            let expanded = ['sales'];
            const ul = el('ul', { class: 'ui-tree', style: 'min-width:200px' });
            function render() {
                ul.innerHTML = '';
                nodes.forEach((n) => {
                    const has = n.children && n.children.length > 0;
                    const open = expanded.includes(n.value);
                    const node = el('button', { class: 'ui-tree__node', type: 'button' }, [
                        el('span', { class: 'ui-tree__caret' + (has ? '' : ' ui-tree__caret_leaf'), text: has ? (open ? '▾' : '▸') : '•' }),
                        el('span', { class: 'ui-tree__label', text: n.label })
                    ]);
                    node.addEventListener('click', () => {
                        if (has) {
                            expanded = open ? expanded.filter((v) => v !== n.value) : [...expanded, n.value];
                        }
                        out.textContent = '選択: ' + n.label;
                        render();
                    });
                    const li = el('li', { class: 'ui-tree__item' }, [node]);
                    if (open && has) {
                        const cul = el('ul', { class: 'ui-tree__children' });
                        n.children.forEach((c) => {
                            const cb = el('button', { class: 'ui-tree__node ui-tree__node_child', type: 'button' }, [
                                el('span', { class: 'ui-tree__label', text: c.label })
                            ]);
                            cb.addEventListener('click', () => {
                                out.textContent = '選択: ' + c.label;
                            });
                            cul.appendChild(el('li', { class: 'ui-tree__item' }, [cb]));
                        });
                        li.appendChild(cul);
                    }
                    ul.appendChild(li);
                });
            }
            render();
            box.appendChild(ul);
            controls.appendChild(out);
        },

        calendar(box, controls) {
            const out = el('span', { class: 'demo__out', text: '日付を選択' });
            const wd = ['日', '月', '火', '水', '木', '金', '土'];
            const y = 2026;
            const m = 6;
            let selected = 15;
            const cal = el('div', { class: 'ui-cal' });
            function render() {
                cal.innerHTML = '';
                cal.appendChild(el('div', { class: 'ui-cal__header', text: y + '年 ' + m + '月' }));
                const wdrow = el('div', { class: 'ui-cal__grid' });
                wd.forEach((d) => wdrow.appendChild(el('span', { class: 'ui-cal__wd', text: d })));
                cal.appendChild(wdrow);
                const startDow = new Date(y, m - 1, 1).getDay();
                const dim = new Date(y, m, 0).getDate();
                const cells = [];
                for (let i = 0; i < startDow; i += 1) cells.push(null);
                for (let d = 1; d <= dim; d += 1) cells.push(d);
                while (cells.length % 7 !== 0) cells.push(null);
                for (let i = 0; i < cells.length; i += 7) {
                    const row = el('div', { class: 'ui-cal__grid' });
                    cells.slice(i, i + 7).forEach((d) => {
                        if (d === null) {
                            row.appendChild(el('span', { class: 'ui-cal__blank' }));
                        } else {
                            const b = el('button', { class: 'ui-cal__day' + (d === selected ? ' ui-cal__day_selected' : ''), type: 'button', text: String(d) });
                            b.addEventListener('click', () => {
                                selected = d;
                                out.textContent = '選択: ' + y + '/' + m + '/' + d;
                                render();
                            });
                            row.appendChild(b);
                        }
                    });
                    cal.appendChild(row);
                }
            }
            render();
            box.appendChild(cal);
            controls.appendChild(out);
        },

        carousel(box) {
            const slides = [
                { title: 'ようこそ', text: 'このカルーセルは前後ボタンとドットで切替えできます。' },
                { title: '機能ハイライト', text: 'スライドごとにタイトルと本文を表示します。' },
                { title: 'はじめましょう', text: '下のドットからも直接ジャンプできます。' }
            ];
            let index = 0;
            const title = el('div', { class: 'ui-carousel__title' });
            const text = el('div', { class: 'ui-carousel__text' });
            const dots = el('div', { class: 'ui-carousel__dots' });
            function render() {
                title.textContent = slides[index].title;
                text.textContent = slides[index].text;
                dots.innerHTML = '';
                slides.forEach((s, i) => {
                    const d = el('button', { class: 'ui-carousel__dot' + (i === index ? ' ui-carousel__dot_active' : ''), type: 'button' });
                    d.addEventListener('click', () => {
                        index = i;
                        render();
                    });
                    dots.appendChild(d);
                });
            }
            const prev = el('button', { class: 'ui-carousel__nav ui-carousel__nav_prev', type: 'button', text: '‹' });
            const next = el('button', { class: 'ui-carousel__nav ui-carousel__nav_next', type: 'button', text: '›' });
            prev.addEventListener('click', () => {
                index = (index - 1 + slides.length) % slides.length;
                render();
            });
            next.addEventListener('click', () => {
                index = (index + 1) % slides.length;
                render();
            });
            const frame = el('div', { class: 'ui-carousel__frame' }, [
                prev,
                el('div', { class: 'ui-carousel__slide' }, [title, text]),
                next
            ]);
            render();
            box.appendChild(el('div', { class: 'ui-carousel' }, [frame, dots]));
        },

        avatargroup(box) {
            const names = ['田中 太郎', '佐藤 花子', '鈴木 一郎', '高橋 桜', '伊藤 健', '渡辺 みき'];
            const max = 4;
            const group = el('div', { class: 'ui-avgroup' });
            const ini = (n) => {
                const t = n.trim().split(/\s+/);
                return t.length === 1 ? t[0].slice(0, 2) : t[0][0] + t[1][0];
            };
            names.slice(0, max).forEach((n) => {
                group.appendChild(
                    el('span', { class: 'ui-avgroup__item', title: n }, [
                        el('span', { class: 'ui-avgroup__initials', text: ini(n) })
                    ])
                );
            });
            const o = names.length - max;
            if (o > 0) {
                group.appendChild(el('span', { class: 'ui-avgroup__item ui-avgroup__more', text: '+' + o }));
            }
            box.appendChild(group);
        },

        codeblock(box) {
            const code =
                "import { LightningElement } from 'lwc';\n\nexport default class Hello extends LightningElement {\n    greeting = 'こんにちは';\n}";
            const copyBtn = el('button', { class: 'ui-codeblock__copy', type: 'button', text: '📋 コピー' });
            copyBtn.addEventListener('click', () => {
                const done = () => {
                    copyBtn.textContent = '✓ コピー済み';
                    setTimeout(() => {
                        copyBtn.textContent = '📋 コピー';
                    }, 1500);
                };
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(code).then(done, done);
                } else {
                    done();
                }
            });
            const pre = el('pre', { class: 'ui-codeblock__pre' });
            pre.appendChild(el('code', { text: code }));
            box.appendChild(
                el('div', { class: 'ui-codeblock', style: 'max-width:420px' }, [
                    el('div', { class: 'ui-codeblock__bar' }, [
                        el('span', { class: 'ui-codeblock__label', text: 'JS' }),
                        copyBtn
                    ]),
                    pre
                ])
            );
        },

        verticalsteps(box, controls) {
            const steps = [
                ['注文受付', 'ご注文を受け付けました'],
                ['出荷準備', '商品を梱包しています'],
                ['発送', '配送業者へ引き渡し'],
                ['お届け', '配達完了']
            ];
            let current = 2;
            const ol = el('ol', { class: 'ui-vsteps', style: 'max-width:320px' });
            function render() {
                ol.innerHTML = '';
                steps.forEach((s, i) => {
                    const num = i + 1;
                    const state = num < current ? 'complete' : num === current ? 'active' : 'upcoming';
                    ol.appendChild(
                        el('li', { class: 'ui-vsteps__item ui-vsteps__item_' + state }, [
                            el('span', { class: 'ui-vsteps__marker', text: state === 'complete' ? '✓' : String(num) }),
                            el('div', { class: 'ui-vsteps__content' }, [
                                el('span', { class: 'ui-vsteps__label', text: s[0] }),
                                el('span', { class: 'ui-vsteps__desc', text: s[1] })
                            ])
                        ])
                    );
                });
            }
            render();
            box.appendChild(ol);
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
                if (current < steps.length) {
                    current += 1;
                    render();
                }
            });
            controls.appendChild(prev);
            controls.appendChild(next);
        },

        taginput(box, controls) {
            let tags = ['Salesforce', 'LWC'];
            const out = el('span', { class: 'demo__out' });
            const wrap = el('div', { class: 'ui-taginput', style: 'max-width:360px' });
            const field = el('input', { class: 'ui-taginput__field', type: 'text', placeholder: 'タグを入力して Enter' });
            function render() {
                wrap.innerHTML = '';
                tags.forEach((t, i) => {
                    const rm = el('button', { class: 'ui-taginput__remove', type: 'button', title: '削除', html: '&times;' });
                    rm.addEventListener('click', () => {
                        tags = tags.filter((x, j) => j !== i);
                        render();
                    });
                    wrap.appendChild(
                        el('span', { class: 'ui-taginput__tag' }, [
                            el('span', { class: 'ui-taginput__label', text: t }),
                            rm
                        ])
                    );
                });
                wrap.appendChild(field);
                out.textContent = 'タグ: ' + (tags.join(', ') || '（なし）');
            }
            field.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    const v = field.value.trim();
                    if (v && !tags.includes(v)) {
                        tags = [...tags, v];
                    }
                    field.value = '';
                    render();
                    field.focus();
                } else if (e.key === 'Backspace' && !field.value && tags.length) {
                    tags = tags.slice(0, -1);
                    render();
                    field.focus();
                }
            });
            render();
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
