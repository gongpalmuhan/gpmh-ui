import { useState } from 'react';
import {
  Badge,
  Button,
  Checkbox,
  Dialog,
  Input,
  Select,
  Switch,
  Textarea,
  type ButtonVariant
} from '@gpmh/ui';

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPublic, setIsPublic] = useState(false);

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
          <a href="#input">Input <small>02</small></a>
          <a href="#controls">Controls <small>03</small></a>
          <a href="#dialog">Dialog <small>04</small></a>
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

        <section className="section component-section" id="input" aria-labelledby="input-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">COMPONENT / 02</p>
              <h2 id="input-title">Input &amp; Textarea</h2>
            </div>
            <code>@gpmh/ui</code>
          </div>

          <div className="form-stage">
            <div className="stage-copy">
              <p className="stage-label">FIELD STATES</p>
              <h3>입력에 필요한<br />맥락을 함께.</h3>
              <p>Label, description, error를 컴포넌트에 함께 두어 연결 관계와 기본 간격을 일관되게 유지합니다.</p>
            </div>
            <div className="form-preview">
              <Input label="프로젝트 이름" placeholder="예: 2027 만다라트" description="나중에 대시보드에서 표시되는 이름입니다." />
              <Textarea label="한 줄 소개" placeholder="이 프로젝트를 어떤 목적으로 만들고 있나요?" description="최대 160자를 권장합니다." />
              <Input label="공개 링크" defaultValue="manda.gongpalmuhan.com" error="이미 사용 중인 링크입니다." />
            </div>
          </div>
        </section>

        <section className="section component-section" id="controls" aria-labelledby="controls-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">COMPONENT / 03</p>
              <h2 id="controls-title">Selection controls</h2>
            </div>
            <code>native first</code>
          </div>

          <div className="control-grid">
            <article className="control-card">
              <p className="stage-label">SELECT</p>
              <Select label="기본 보기" defaultValue="focus">
                <option value="focus">핵심 만다라트</option>
                <option value="full">전체 만다라트</option>
                <option value="recent">최근 수정한 항목</option>
              </Select>
            </article>
            <article className="control-card control-card--stack">
              <p className="stage-label">CHECKBOX</p>
              <Checkbox defaultChecked description="작성 중인 내용도 다른 사람에게 보입니다.">링크로 공개하기</Checkbox>
            </article>
            <article className="control-card control-card--stack">
              <p className="stage-label">SWITCH</p>
              <Switch checked={isPublic} onChange={(event) => setIsPublic(event.target.checked)} description={isPublic ? '현재 공개 상태입니다.' : '현재 비공개 상태입니다.'}>공개 프로필</Switch>
            </article>
          </div>

          <div className="badge-row" aria-label="Badge variants">
            <Badge>초안</Badge>
            <Badge variant="success">완료</Badge>
            <Badge variant="warning">검토 필요</Badge>
            <Badge variant="danger">오류</Badge>
            <Badge variant="info">새 소식</Badge>
          </div>
        </section>

        <section className="section component-section" id="dialog" aria-labelledby="dialog-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">COMPONENT / 04</p>
              <h2 id="dialog-title">Dialog</h2>
            </div>
            <code>focus managed</code>
          </div>

          <div className="dialog-preview">
            <div>
              <p className="stage-label">OVERLAY</p>
              <h3>멈추고 확인해야 할<br />순간을 위한 창.</h3>
              <p>ESC, 포커스 순환, 닫힌 뒤 원래 위치로의 포커스 복귀를 기본으로 다룹니다.</p>
            </div>
            <Button onClick={() => setIsDialogOpen(true)}>삭제 Dialog 열기</Button>
          </div>
        </section>

        <section className="coming" id="coming">
          <span>UP NEXT</span>
          <h2>Tabs · Toast · Tooltip</h2>
          <p>다음 실제 사용 사례를 기준으로 상호작용 컴포넌트를 확장합니다.</p>
        </section>
      </section>

      <Dialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        title="이 만다라트를 삭제할까요?"
        description="삭제한 내용은 복구할 수 없습니다."
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>취소</Button>
            <Button variant="danger" onClick={() => setIsDialogOpen(false)}>삭제하기</Button>
          </>
        }
      >
        <p className="dialog-body-copy">목표와 세부 목표, 연결된 기록이 모두 삭제됩니다.</p>
      </Dialog>
    </main>
  );
}
