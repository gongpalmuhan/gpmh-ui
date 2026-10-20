import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './input';

const meta = {
  title: 'Forms/Input',
  component: Input,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: 'min(100%, 360px)' }}><Story /></div>],
  args: { label: '이메일', placeholder: 'name@example.com', type: 'email', disabled: false },
  argTypes: {
    label: { control: 'text' },
    description: { control: 'text' },
    error: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    hideLabel: { control: 'boolean' }
  }
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithDescription: Story = { args: { description: '프로젝트 알림을 받을 주소를 입력하세요.' } };
export const Error: Story = { args: { defaultValue: 'invalid-email', error: '올바른 이메일 주소를 입력하세요.' } };
export const Disabled: Story = { args: { defaultValue: 'member@example.com', disabled: true } };
