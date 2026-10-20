import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { Switch, type SwitchProps } from './switch';

const meta = {
  title: 'Forms/Switch',
  component: Switch,
  tags: ['autodocs'],
  args: { children: '이메일 알림', checked: false, disabled: false },
  argTypes: {
    children: { control: 'text' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    description: { control: 'text' },
    onChange: { control: false }
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs<SwitchProps>();
    return <Switch {...args} onChange={(event) => {
      args.onChange?.(event);
      updateArgs({ checked: event.currentTarget.checked });
    }} />;
  }
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unchecked: Story = {};
export const Checked: Story = { args: { checked: true } };
export const Disabled: Story = { args: { disabled: true } };
export const DisabledChecked: Story = { args: { checked: true, disabled: true } };
