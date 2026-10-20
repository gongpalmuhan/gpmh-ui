import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge, type BadgeVariant } from './badge';

const variants: BadgeVariant[] = ['neutral', 'success', 'warning', 'danger', 'info'];

const meta = {
  title: 'Feedback/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: { children: '대기', variant: 'neutral' },
  argTypes: {
    children: { control: 'text' },
    variant: { control: 'select', options: variants }
  }
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = {};
export const Success: Story = { args: { variant: 'success', children: '완료' } };
export const Warning: Story = { args: { variant: 'warning', children: '확인 필요' } };
export const Danger: Story = { args: { variant: 'danger', children: '오류' } };
export const Info: Story = { args: { variant: 'info', children: '안내' } };
export const AllVariants: Story = {
  render: (args) => <div className="gpmh-story-row">
    {variants.map((variant) => <Badge {...args} key={variant} variant={variant}>{variant}</Badge>)}
  </div>
};
