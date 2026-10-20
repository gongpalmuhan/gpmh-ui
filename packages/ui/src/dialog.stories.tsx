import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { Button } from './button';
import { Dialog, type DialogProps } from './dialog';

const meta = {
  title: 'Feedback/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  args: {
    title: '변경 사항 저장',
    description: '프로젝트 설정을 저장합니다.',
    children: '저장한 설정은 팀원에게도 적용됩니다.',
    isOpen: false,
    isDismissable: true,
    size: 'md',
    onOpenChange: () => undefined
  },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    children: { control: 'text' },
    isOpen: { control: 'boolean' },
    isDismissable: { control: 'boolean' },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    footer: { control: false },
    onOpenChange: { control: false }
  },
  parameters: {
    docs: { description: { component: '열기 버튼으로 시작합니다. Tab으로 내부 포커스를 이동하고, Escape 또는 닫기 버튼으로 닫은 후 포커스가 돌아오는지 확인하세요.' } }
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs<DialogProps>();
    const setOpen = (isOpen: boolean) => {
      args.onOpenChange(isOpen);
      updateArgs({ isOpen });
    };

    return <>
      <Button onClick={() => setOpen(true)}>Dialog 열기</Button>
      <Dialog {...args} onOpenChange={setOpen} footer={<>
        <Button variant="secondary" onClick={() => setOpen(false)}>취소</Button>
        <Button onClick={() => setOpen(false)}>저장</Button>
      </>} />
    </>;
  }
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {};
export const Small: Story = { args: { size: 'sm' } };
export const Large: Story = { args: { size: 'lg' } };
