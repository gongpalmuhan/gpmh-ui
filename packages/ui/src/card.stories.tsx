import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';

const meta = {
  title: 'Layout/Card',
  component: Card,
  subcomponents: { CardHeader, CardTitle, CardDescription, CardContent, CardFooter },
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ maxWidth: 420 }}><Story /></div>],
  argTypes: { children: { control: false } }
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Composition: Story = {
  args: {
    children: <>
      <CardHeader>
        <CardTitle>프로젝트 설정</CardTitle>
        <CardDescription>팀과 공유하는 프로젝트 정보입니다.</CardDescription>
      </CardHeader>
      <CardContent><p className="gpmh-story-note">일관된 토큰과 컴포넌트로 화면을 구성합니다.</p></CardContent>
      <CardFooter><Button variant="secondary" size="sm">자세히 보기</Button></CardFooter>
    </>
  }
};
