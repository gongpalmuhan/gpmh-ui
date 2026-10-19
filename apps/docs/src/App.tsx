import { useState } from 'react';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  Dialog,
  Input,
  Pagination,
  Select,
  Switch,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  ToastProvider,
  Tooltip,
  useToast,
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

const projects = [
  { name: '2027 만다라트', updated: '방금 전', owner: '해원', status: '작성 중', variant: 'warning' },
  { name: '독립 출판 노트', updated: '12분 전', owner: '혜진', status: '검토 필요', variant: 'info' },
  { name: 'GPMH Admin', updated: '어제', owner: '해원', status: '완료', variant: 'success' },
  { name: '우리 동네 지도', updated: '2일 전', owner: '민재', status: '초안', variant: 'neutral' },
  { name: '영화 기록장', updated: '3일 전', owner: '해원', status: '오류', variant: 'danger' },
  { name: '루틴 실험실', updated: '5일 전', owner: '소연', status: '검토 필요', variant: 'info' },
  { name: '포트폴리오 2027', updated: '6일 전', owner: '해원', status: '작성 중', variant: 'warning' },
  { name: '후보 아이디어', updated: '1주 전', owner: '해원', status: '초안', variant: 'neutral' }
] as const;

function Mark() {
  return (
    <span className="mark" aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}

function Documentation() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('아직 저장하지 않았습니다.');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();
  const pageSize = 3;
  const pagedProjects = projects.slice((currentPage - 1) * pageSize, currentPage * pageSize);

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
          <a href="#tabs">Tabs <small>05</small></a>
          <a href="#feedback">Toast / Tooltip <small>06</small></a>
          <a href="#data-display">Data display <small>07</small></a>
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

        <section className="section component-section" id="tabs" aria-labelledby="tabs-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">COMPONENT / 05</p>
              <h2 id="tabs-title">Tabs</h2>
            </div>
            <code>keyboard ready</code>
          </div>

          <div className="tabs-preview">
            <div className="tabs-copy">
              <p className="stage-label">SECTIONS</p>
              <h3>같은 맥락 안의<br />내용을 조용히 나누기.</h3>
              <p>Arrow key, Home, End로 탭 사이를 이동할 수 있고 선택된 패널만 보입니다.</p>
            </div>
            <Tabs defaultValue="overview">
              <TabsList aria-label="프로젝트 정보">
                <TabsTrigger value="overview">개요</TabsTrigger>
                <TabsTrigger value="activity">활동</TabsTrigger>
                <TabsTrigger value="members">멤버</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="tab-panel-demo">
                <strong>이번 주의 흐름</strong>
                <p>세 개의 목표가 진행 중이고, 한 개의 목표는 검토를 기다리고 있습니다.</p>
              </TabsContent>
              <TabsContent value="activity" className="tab-panel-demo">
                <strong>최근 변경</strong>
                <p>오늘 오전 10:42에 ‘핵심 만다라트’의 우선순위가 조정되었습니다.</p>
              </TabsContent>
              <TabsContent value="members" className="tab-panel-demo">
                <strong>함께하는 사람</strong>
                <p>해원, 혜진, 민재 세 명이 이 프로젝트를 편집할 수 있습니다.</p>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section className="section component-section" id="feedback" aria-labelledby="feedback-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">COMPONENT / 06</p>
              <h2 id="feedback-title">Toast &amp; Tooltip</h2>
            </div>
            <code>brief feedback</code>
          </div>

          <div className="feedback-grid">
            <article className="feedback-card">
              <p className="stage-label">TOAST</p>
              <h3>사라져도 되는<br />결과 알림.</h3>
              <p>작업 흐름을 가로막지 않고, 필요한 결과만 잠시 알려줍니다.</p>
              <Button onClick={() => toast({ title: '변경 사항을 저장했습니다.', description: '프로젝트 초안이 최신 상태입니다.', variant: 'success' })}>성공 Toast 보기</Button>
            </article>
            <article className="feedback-card">
              <p className="stage-label">TOOLTIP</p>
              <h3>공간을 차지하지 않는<br />짧은 설명.</h3>
              <p>hover와 keyboard focus에서만 드러나, 처음 보는 기능의 의도를 보완합니다.</p>
              <Tooltip content="공개 링크를 복사합니다." side="top">
                <Button variant="secondary">링크 복사 <span aria-hidden="true">↗</span></Button>
              </Tooltip>
            </article>
          </div>
        </section>

        <section className="section component-section" id="data-display" aria-labelledby="data-display-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">COMPONENT / 07</p>
              <h2 id="data-display-title">Card · Table · Pagination</h2>
            </div>
            <code>admin ready</code>
          </div>

          <div className="metric-grid">
            <Card>
              <CardHeader>
                <CardTitle>진행 중인 프로젝트</CardTitle>
                <CardDescription>이번 주에 수정된 항목</CardDescription>
              </CardHeader>
              <CardContent><p className="metric-value">12 <small>개</small></p></CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>검토가 필요한 항목</CardTitle>
                <CardDescription>다음 행동을 기다리는 목표</CardDescription>
              </CardHeader>
              <CardContent><p className="metric-value">04 <small>개</small></p></CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>이번 주 완료율</CardTitle>
                <CardDescription>계획한 18개 행동 기준</CardDescription>
              </CardHeader>
              <CardContent><p className="metric-value">72 <small>%</small></p></CardContent>
            </Card>
          </div>

          <div className="table-stage">
            <Table>
              <TableCaption>프로젝트 목록 {projects.length}개 중 {pagedProjects.length}개를 표시합니다.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>프로젝트</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead>수정</TableHead>
                  <TableHead>담당</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pagedProjects.map((project) => (
                  <TableRow key={project.name}>
                    <TableCell><strong>{project.name}</strong></TableCell>
                    <TableCell><Badge variant={project.variant}>{project.status}</Badge></TableCell>
                    <TableCell>{project.updated}</TableCell>
                    <TableCell>{project.owner}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Pagination page={currentPage} totalPages={Math.ceil(projects.length / pageSize)} onPageChange={setCurrentPage} />
          </div>
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

export function App() {
  return <ToastProvider><Documentation /></ToastProvider>;
}
