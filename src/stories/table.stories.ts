import type { Meta, StoryObj } from '@storybook/angular';
import { TableComponent, Tag } from '../app/shared/components';
import { Member, Column } from '../app/shared/types';
import { members } from '../app/shared/constants';

const columns: Column<Member>[] = [
  {
    name: 'ID',
    dataIndex: 'id',
    title: 'Identifier',
  },
  {
    name: 'Name',
    dataIndex: 'name',
    title: 'Full Name',
  },
  {
    name: 'Email',
    dataIndex: 'email',
    title: 'Email Address',
  },
  {
    name: 'Phone',
    dataIndex: 'phone',
    title: 'Phone Number',
  },
  {
    name: 'Active',
    dataIndex: 'active',
    title: 'Active Status',
    render: (value) => ({
      component: Tag,
      inputs: {
        text: value ? 'Active' : 'Inactive',
        color: value ? 'green' : 'red',
      },
    }),
  },
];
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<TableComponent<Member>> = {
  title: 'Table',
  component: TableComponent,
  tags: ['autodocs'],
  // argTypes: {
  //  columns: {

  // },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#story-args
  args: { data: [], columns },
};

export default meta;
type Story = StoryObj<TableComponent<Member>>;

export const Basic: Story = {
  args: {
    columns,
    data: members,
  },
};

export const Empty: Story = {
  args: { data: [] },
};
export const Loading: Story = {
  args: { data: [], isLoading: true },
};
