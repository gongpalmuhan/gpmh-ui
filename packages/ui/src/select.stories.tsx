import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { Select, type SelectProps } from './select';

const meta = {
  title: 'Forms/Select',
  component: Select,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: 'min(100%, 360px)' }}><Story /></div>],
  args: {
    label: '프로젝트 역할',
    value: '',
    disabled: false,
    children: <>
      <option value="" disabled>역할을 선택하세요</option>
      <option value="viewer">뷰어</option>
      <option value="editor">편집자</option>
      <option value="admin">관리자</option>
    </>
  },
  argTypes: {
    label: { control: 'text' },
    description: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
    children: { control: false },
    value: { control: 'select', options: ['', 'viewer', 'editor', 'admin'] },
    defaultValue: { control: false },
    onChange: { control: false }
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs<SelectProps>();
    return <Select {...args} onChange={(event) => {
      args.onChange?.(event);
      updateArgs({ value: event.currentTarget.value });
    }} />;
  }
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithDescription: Story = { args: { description: '편집자는 프로젝트 내용을 수정할 수 있습니다.' } };
export const Error: Story = { args: { error: '역할을 하나 선택하세요.' } };
export const Disabled: Story = { args: { value: 'viewer', disabled: true } };
