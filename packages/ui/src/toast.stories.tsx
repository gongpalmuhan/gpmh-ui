import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './button';
import { Toast, ToastProvider, useToast, type ToastProps } from './toast';

function ToastTrigger({ title, description, variant }: ToastProps) {
  const { toast } = useToast();

  return <div className="gpmh-story-stack">
    <p className="gpmh-story-note">버튼을 누르면 오른쪽 아래에 알림이 표시되고 5초 후 닫힙니다.</p>
    <div><Button onClick={() => toast({ title, description, variant })}>알림 표시</Button></div>
  </div>;
}

const meta = {
  title: 'Feedback/Toast',
  component: Toast,
  subcomponents: { ToastProvider },
  tags: ['autodocs'],
  args: { title: '변경 사항을 저장했습니다.', description: '팀원이 최신 내용을 확인할 수 있습니다.', variant: 'neutral' },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    variant: { control: 'select', options: ['neutral', 'success', 'warning', 'danger', 'info'] },
    onClose: { control: false }
  },
  decorators: [(Story) => <div style={{ maxWidth: 480 }}><Story /></div>]
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = {};
export const Success: Story = { args: { variant: 'success' } };
export const Warning: Story = { args: { variant: 'warning', title: '설정을 확인하세요.' } };
export const Danger: Story = { args: { variant: 'danger', title: '저장하지 못했습니다.', description: '잠시 후 다시 시도하세요.' } };
export const Info: Story = { args: { variant: 'info', title: '새로운 소식이 있습니다.' } };
export const WithProvider: Story = {
  args: { variant: 'success' },
  parameters: {
    docs: { description: { story: 'ToastProvider 안에서 useToast().toast()를 호출합니다. 알림의 닫기 버튼으로 즉시 닫을 수도 있습니다.' } }
  },
  render: (args) => <ToastProvider duration={5000}><ToastTrigger {...args} /></ToastProvider>
};
