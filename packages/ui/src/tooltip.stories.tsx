import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './button';
import { Tooltip } from './tooltip';

const meta = {
  title: 'Feedback/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  args: { content: '프로젝트 링크를 복사합니다.', side: 'bottom', children: <Button variant="secondary">링크 복사</Button> },
  argTypes: {
    content: { control: 'text' },
    side: { control: 'inline-radio', options: ['top', 'right', 'bottom', 'left'] },
    children: { control: false }
  },
  decorators: [(Story) => <div style={{ padding: '40px 80px' }}><Story /></div>],
  parameters: {
    docs: { description: { component: '버튼에 마우스를 올리거나 Tab 키로 포커스하면 설명이 표시됩니다. 포커스를 옮기면 사라집니다.' } }
  }
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const KeyboardFocus: Story = {
  play: async ({ canvasElement }) => {
    canvasElement.querySelector('button')?.focus();
  }
};
