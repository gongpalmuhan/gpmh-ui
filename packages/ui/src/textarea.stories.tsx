import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from './textarea';

const meta = {
  title: 'Forms/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: 'min(100%, 420px)' }}><Story /></div>],
  args: { label: '프로젝트 설명', placeholder: '프로젝트를 소개해 주세요.', rows: 4, disabled: false },
  argTypes: {
    label: { control: 'text' },
    description: { control: 'text' },
    error: { control: 'text' },
    placeholder: { control: 'text' },
    rows: { control: { type: 'number', min: 2, max: 12 } },
    disabled: { control: 'boolean' }
  }
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithDescription: Story = { args: { description: '팀이 함께 확인할 수 있는 설명입니다.' } };
export const Error: Story = { args: { error: '프로젝트 설명을 입력하세요.' } };
export const Disabled: Story = { args: { defaultValue: '보관된 프로젝트입니다.', disabled: true } };
