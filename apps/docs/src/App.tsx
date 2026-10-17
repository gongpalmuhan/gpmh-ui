import { useState } from 'react';
import { Button, type ButtonVariant } from '@gpmh/ui';

const neutrals = [
  ['0', '#FFFFFF'],
  ['50', '#F8F8F8'],
  ['100', '#F0F0F0'],
  ['200', '#DEDEDE'],
  ['300', '#C4C4C4'],
  ['500', '#6B6B6B'],
  ['700', '#303030'],
  ['900', '#111111']
] as const;

const variants: Array<{ variant: ButtonVariant; label: string; note: string }> = [
  { variant: 'primary', label: '저장하기', note: '주요 행동' },
  { variant: 'secondary', label: '미리보기', note: '보조 행동' },
  { variant: 'ghost', label: '나중에 하기', note: '낮은 우선순위' },
  { variant: 'danger', label: '삭제하기', note: '되돌리기 어려운 행동' }
];

function Mark() {
  return (
    <span className="mark" aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}

export function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('아직 저장하지 않았습니다.');

  function simulateSave() {
    setIsLoading(true);
    setMessage('저장 중입니다…');
    window.setTimeout(() => {
      setIsLoading(false);
      setMessage('변경 사항을 저장했습니다.');
    }, 900);
  }

  return (
    <main className="site-shell">
      <aside className="sidebar">
        <a className="brand" href="#top" aria-label="GPMH UI 처음으로">
          <Mark />
          <span>gpmh/ui</span>
        </a>

        <nav aria-label="문서 탐색">
          <p className="nav-label">FOUNDATIONS</p>
          <a href="#tokens">Color</a>
          <a href="#principles">Principles</a>
          <p className="nav-label nav-label--space">COMPONENTS</p>
          <a className="is-active" href="#button">Button <small>01</small></a>
          <a href="#coming">Input <small>02</small></a>
          <a href="#coming">Dialog <small>03</small></a>
        </nav>

        <p className="sidebar-foot">v0.1.0 · foundation</p>
      </aside>

      <section className="content" id="top">
        <header className="topbar">
          <p>GPMH DESIGN SYSTEM</p>
          <span>WEB / REACT</span>
        </header>

        <section className="hero" aria-labelledby="page-title">
          <p className="eyebrow">0.1 / FOUNDATION</p>
          <h1 id="page-title">Quiet structure<br />for independent projects.</h1>
          <p className="hero-copy">각 프로젝트의 로고와 이야기를 가리지 않고, 일관된 행동과 밀도를 제공하는 GPMH의 공통 UI 기반입니다.</p>
        </section>

        <section className="principles" id="principles" aria-label="디자인 원칙">
          <article>
            <span>01</span>
            <h2>Neutral by default</h2>
            <p>기본 컴포넌트는 무채색으로 시작합니다. 서비스 고유 색은 제품 레이어에서 다룹니다.</p>
          </article>
          <article>
            <span>02</span>
            <h2>Clear hierarchy</h2>
            <p>여백, 대비, 테두리로 우선순위를 드러냅니다. 장식은 기능을 앞서지 않습니다.</p>
          </article>
          <article>
            <span>03</span>
            <h2>Useful motion</h2>
            <p>상태 변화를 이해시키는 짧은 움직임만 사용하고, 모션 감소 설정을 존중합니다.</p>
          </article>
        </section>

        <section className="section" id="tokens" aria-labelledby="tokens-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">FOUNDATION / 01</p>
              <h2 id="tokens-title">Neutral scale</h2>
            </div>
            <p>색은 의미가 아닌 명도로 먼저 구분합니다.</p>
          </div>
          <div className="swatch-grid">
            {neutrals.map(([name, hex]) => (
              <article className="swatch" key={name}>
                <span style={{ background: hex }} />
                <div><strong>{name}</strong><small>{hex}</small></div>
              </article>
            ))}
          </div>
        </section>

        <section className="section component-section" id="button" aria-labelledby="button-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">COMPONENT / 01</p>
              <h2 id="button-title">Button</h2>
            </div>
            <code>@gpmh/ui</code>
          </div>

          <div className="component-stage">
            <div className="stage-copy">
              <p className="stage-label">VARIANTS</p>
              <h3>행동의 무게를<br />색이 아닌 구조로.</h3>
              <p>Primary는 거의 검정으로, 나머지는 표면과 테두리의 차이로 위계를 표현합니다.</p>
            </div>
            <div className="button-list">
              {variants.map(({ variant, label, note }) => (
                <div className="button-row" key={variant}>
                  <div><Button variant={variant}>{label}</Button><small>{note}</small></div>
                  <code>variant=&quot;{variant}&quot;</code>
                </div>
              ))}
            </div>
          </div>

          <div className="interactive-card">
            <div>
              <p className="stage-label">INTERACTION</p>
              <h3>로딩 상태</h3>
              <p aria-live="polite">{message}</p>
            </div>
            <Button isLoading={isLoading} loadingLabel="저장 중" onClick={simulateSave}>변경 사항 저장</Button>
          </div>
        </section>

        <section className="coming" id="coming">
          <span>UP NEXT</span>
          <h2>Input · Field · Dialog</h2>
          <p>실제 Mandalart와 다음 GPMH 프로젝트에서 필요한 순간부터 추가합니다.</p>
        </section>
      </section>
    </main>
  );
}
