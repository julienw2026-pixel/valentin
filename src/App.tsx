import { useEffect, useMemo, useRef, useState } from 'react';
import './styles.css';
import { defaultLetter, moments } from './data';

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 880px)');
    const on = () => setMobile(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return mobile;
}

export default function App() {
  const isMobile = useIsMobile();

  const [idx, setIdx] = useState(0);
  const [letter, setLetter] = useState(() => {
    const saved = localStorage.getItem('val_letter');
    return saved ?? defaultLetter;
  });
  const [revealed, setRevealed] = useState(() => localStorage.getItem('val_revealed') === '1');

  const active = moments[idx];
  const total = moments.length;

  useEffect(() => {
    localStorage.setItem('val_letter', letter);
  }, [letter]);

  useEffect(() => {
    localStorage.setItem('val_revealed', revealed ? '1' : '0');
  }, [revealed]);

  const accent = useMemo(() => {
    return active.accent === 'green' ? 'var(--accent2)' : 'var(--accent)';
  }, [active.accent]);

  const deckRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = deckRef.current;
    if (!el) return;

    let startX = 0;
    let startY = 0;
    let moved = false;

    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      startX = t.clientX;
      startY = t.clientY;
      moved = false;
    };

    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      const dx = t.clientX - startX;
      const dy = t.clientY - startY;
      if (Math.abs(dx) > 8) moved = true;
      if (Math.abs(dx) > Math.abs(dy)) {
        // allow horizontal swipe, prevent page scroll jitter
        e.preventDefault();
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (!moved) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - startX;
      if (dx > 55) setIdx((v) => clamp(v - 1, 0, total - 1));
      if (dx < -55) setIdx((v) => clamp(v + 1, 0, total - 1));
    };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, [total]);

  const copyShareText = async () => {
    const share = [
      '情人节快乐。',
      `${active.title} — ${active.text}`,
      '',
      '（打开网页继续看我们的时间线）'
    ].join('\n');

    try {
      await navigator.clipboard.writeText(share);
      alert('已复制一段分享文案');
    } catch {
      alert('复制失败：请手动选择文字复制');
    }
  };

  const printLetter = () => {
    // Simple print: letter + title
    const html = `<!doctype html><html><head><meta charset="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <title>Letter</title>
      <style>
        body{ font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif; margin:42px; color:#1b1a17; }
        h1{ font-size:22px; margin:0 0 12px; }
        pre{ white-space:pre-wrap; font-size:15px; line-height:1.7; }
        .meta{ font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; color:#5b5148; font-size:12px; margin:0 0 18px; }
      </style></head><body>
      <h1>给你的一封信</h1>
      <p class="meta">Valentine — ${new Date().toLocaleString()}</p>
      <pre>${letter.replace(/</g, '&lt;')}</pre>
      </body></html>`;

    const w = window.open('', '_blank', 'noopener,noreferrer');
    if (!w) return alert('弹窗被拦截了：请允许打开新窗口');
    w.document.open();
    w.document.write(html);
    w.document.close();
    w.focus();
    w.print();
  };

  return (
    <div className="vApp">
      <div className="vShell">
        <header className="vTop">
          <div>
            <h1 className="vTitle">8 年，仍然选择你</h1>
            <p className="vSubtitle">timeline + letter • swipe / arrows • 保存于本机</p>
          </div>

          <div className="vPills">
            <span className="vPill"><span className="vPillDot" style={{ background: accent }} />结婚 8 年</span>
            <span className="vPill"><span className="vPillDot" style={{ background: 'var(--accent2)' }} />两个小孩：一男一女</span>
            <span className="vPill"><span className="vPillDot" style={{ background: 'var(--ink)' }} />{isMobile ? '手机模式' : '桌面模式'}</span>
          </div>
        </header>

        <main className="vGrid">
          <section className="vCard">
            <div className="vCardInner">
              <div className="vTimelineHeader">
                <h2>我们的时间线</h2>
                <div className="vNav">
                  <button className="vBtn" onClick={() => setIdx((v) => clamp(v - 1, 0, total - 1))} disabled={idx === 0}>
                    ← 上一页
                  </button>
                  <button className="vBtn" onClick={() => setIdx((v) => clamp(v + 1, 0, total - 1))} disabled={idx === total - 1}>
                    下一页 →
                  </button>
                </div>
              </div>

              <div className="vDeck" ref={deckRef} aria-label="timeline deck">
                <article className="vSlide" style={{ outlineColor: accent }}>
                  <div className="vSlideMedia">
                    <span className="vTag">
                      <b>{active.title}</b>
                      <span style={{ width: 8, height: 8, borderRadius: 99, background: accent, display: 'inline-block' }} />
                      <span>{active.place ?? '—'}</span>
                    </span>
                    <span className="vYear">{active.yearLabel} • {idx + 1}/{total}</span>
                  </div>

                  <div className="vSlideBody">
                    <h3 className="vSlideTitle">{active.title}</h3>
                    <p className="vSlideText">{active.text}</p>
                    {active.quote ? <div className="vQuote">{active.quote}</div> : null}

                    <div className="vActions">
                      <button className="vBtn vBtnGhost" onClick={copyShareText}>复制这一页文案</button>
                      <button className="vBtn vBtnGhost" onClick={() => setRevealed(true)}>
                        {revealed ? '情书已解锁' : '解锁情书'}
                      </button>
                    </div>

                    <div className="vDots" aria-label="dots">
                      {moments.map((m, i) => (
                        <span
                          key={m.id}
                          className={`vDot ${i === idx ? 'vDotActive' : ''}`}
                          onClick={() => setIdx(i)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => { if (e.key === 'Enter') setIdx(i); }}
                          aria-label={`go ${i + 1}`}
                          style={i === idx ? { background: accent } : undefined}
                        />
                      ))}
                    </div>

                    <p className="vSmall">提示：手机左右滑动；也可以点小圆点跳转。</p>
                  </div>
                </article>
              </div>
            </div>
          </section>

          <aside className="vRight">
            <section className="vCard vLetter">
              <div className="vLetterHead">
                <div>
                  <h2>一封信</h2>
                  <div className="vSmall">你可以先写好；到时候只给她看最终页面。</div>
                </div>
                <div className="vLetterMeta">
                  <div>本地保存</div>
                  <div>不上传到服务器</div>
                </div>
              </div>

              {revealed ? (
                <>
                  <textarea
                    className="vTextarea"
                    value={letter}
                    onChange={(e) => setLetter(e.target.value)}
                    spellCheck={false}
                  />
                  <div className="vActions">
                    <button className="vBtn vBtnPrimary" onClick={printLetter}>打印 / 保存 PDF</button>
                    <button className="vBtn" onClick={() => { setLetter(defaultLetter); }}>
                      重置为模板
                    </button>
                    <button className="vBtn" onClick={() => { localStorage.removeItem('val_letter'); localStorage.removeItem('val_revealed'); setLetter(defaultLetter); setRevealed(false); }}>
                      清空本机记录
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="vCardInner" style={{ padding: 0 }}>
                    <div style={{ padding: 16, color: 'var(--muted)', lineHeight: 1.7 }}>
                      这封信默认是“锁住”的。你可以在时间线里点「解锁情书」，或者直接点下面按钮。
                    </div>
                    <div className="vActions" style={{ padding: '0 16px 16px' }}>
                      <button className="vBtn vBtnPrimary" onClick={() => setRevealed(true)}>现在解锁</button>
                    </div>
                  </div>
                </>
              )}
            </section>

            <section className="vCard">
              <div className="vCardInner">
                <h2 style={{ margin: 0, fontSize: 16 }}>快速改内容</h2>
                <p className="vSlideText" style={{ marginTop: 8 }}>
                  你只需要编辑 <span style={{ fontFamily: 'var(--mono)' }}>src/data.ts</span> 里每张卡片的标题、地点和文字，替换成你们真实的故事。
                </p>
                <p className="vSmall">如果你给我 6-10 个真实瞬间关键词，我可以帮你直接把时间线文案写得更贴脸。</p>
              </div>
            </section>
          </aside>
        </main>
      </div>
    </div>
  );
}
