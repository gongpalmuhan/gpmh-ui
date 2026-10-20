import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { Tabs, TabsContent, TabsList, TabsTrigger, type TabsProps } from './tabs';

const meta = {
  title: 'Navigation/Tabs',
  component: Tabs,
  subcomponents: { TabsList, TabsTrigger, TabsContent },
  tags: ['autodocs'],
  args: {
    value: 'overview',
    orientation: 'horizontal',
    children: <>
      <TabsList aria-label="프로젝트 정보">
        <TabsTrigger value="overview">개요</TabsTrigger>
        <TabsTrigger value="archived" disabled>보관함</TabsTrigger>
        <TabsTrigger value="activity">활동</TabsTrigger>
      </TabsList>
      <TabsContent value="overview"><p className="gpmh-story-note">프로젝트 개요를 확인하세요.</p></TabsContent>
      <TabsContent value="archived"><p className="gpmh-story-note">보관함은 준비 중입니다.</p></TabsContent>
      <TabsContent value="activity"><p className="gpmh-story-note">최근 활동이 여기에 표시됩니다.</p></TabsContent>
    </>
  },
  argTypes: {
    value: { control: 'inline-radio', options: ['overview', 'activity'] },
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
    children: { control: false },
    defaultValue: { control: false },
    onValueChange: { control: false }
  },
  parameters: {
    docs: { description: { component: 'Tab으로 선택된 탭에 진입한 뒤 방향키와 Home/End로 이동합니다. 비활성 탭은 건너뛰며, 세로 모드에서는 위/아래 방향키를 사용합니다.' } }
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs<TabsProps>();

    return <Tabs {...args} onValueChange={(value) => {
      args.onValueChange?.(value);
      updateArgs({ value });
    }} />;
  }
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const KeyboardNavigation: Story = {};
export const Vertical: Story = { args: { orientation: 'vertical' } };
