import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { Pagination, type PaginationProps } from './pagination';

const meta = {
  title: 'Navigation/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  args: { page: 1, totalPages: 12, siblingCount: 1, previousLabel: '이전', nextLabel: '다음', onPageChange: () => undefined },
  argTypes: {
    page: { control: { type: 'number', min: 1, step: 1 } },
    totalPages: { control: { type: 'number', min: 2, step: 1 } },
    siblingCount: { control: { type: 'number', min: 0, max: 3, step: 1 } },
    previousLabel: { control: 'text' },
    nextLabel: { control: 'text' },
    onPageChange: { control: false }
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs<PaginationProps>();
    const currentPage = Math.min(Math.max(1, args.page), args.totalPages);

    return <div className="gpmh-story-stack">
      <Pagination {...args} onPageChange={(page) => {
        args.onPageChange(page);
        updateArgs({ page });
      }} />
      <p className="gpmh-story-note" aria-live="polite">현재 {currentPage} / {args.totalPages}페이지</p>
    </div>;
  }
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {};
export const MiddlePage: Story = { args: { page: 6 } };
export const LastPage: Story = { args: { page: 12 } };
