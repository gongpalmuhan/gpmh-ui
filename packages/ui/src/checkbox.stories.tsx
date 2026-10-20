import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { Checkbox, type CheckboxProps } from './checkbox';

const meta = {
  title: 'Forms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: { children: '프로젝트 소식 받기', checked: false, disabled: false },
  argTypes: {
    children: { control: 'text' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    description: { control: 'text' },
    error: { control: 'text' },
    onChange: { control: false }
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs<CheckboxProps>();
    return <Checkbox {...args} onChange={(event) => {
      args.onChange?.(event);
      updateArgs({ checked: event.currentTarget.checked });
    }} />;
  }
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unchecked: Story = {};
export const Checked: Story = { args: { checked: true } };
export const Disabled: Story = { args: { disabled: true } };
export const DisabledChecked: Story = { args: { checked: true, disabled: true } };
