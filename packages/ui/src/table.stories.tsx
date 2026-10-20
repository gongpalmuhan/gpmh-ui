import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './badge';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './table';

const meta = {
  title: 'Data Display/Table',
  component: Table,
  subcomponents: { TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption },
  tags: ['autodocs'],
  argTypes: { children: { control: false } }
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <>
      <TableCaption>팀 프로젝트 목록 · 총 3개</TableCaption>
      <TableHeader><TableRow>
        <TableHead>프로젝트</TableHead><TableHead>담당 팀</TableHead><TableHead>상태</TableHead>
      </TableRow></TableHeader>
      <TableBody>
        <TableRow><TableCell>GPMH UI</TableCell><TableCell>디자인 시스템</TableCell><TableCell><Badge variant="success">진행 중</Badge></TableCell></TableRow>
        <TableRow><TableCell>문서 사이트</TableCell><TableCell>플랫폼</TableCell><TableCell><Badge variant="neutral">검토 대기</Badge></TableCell></TableRow>
        <TableRow><TableCell>토큰 정리</TableCell><TableCell>디자인 시스템</TableCell><TableCell><Badge variant="info">예정</Badge></TableCell></TableRow>
      </TableBody>
    </>
  }
};
