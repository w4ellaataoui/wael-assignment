import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TableComponent, Tag } from './shared/components';
import { Column, Member } from './shared/types';
import { members as membersData } from './shared/constants';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TableComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  members = membersData;
  columns: Column<Member>[] = [
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
  ] as const;
}
