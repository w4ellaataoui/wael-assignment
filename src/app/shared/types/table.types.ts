import { Type } from '@angular/core';

export interface Column<T> {
  dataIndex: keyof T;
  name: string;
  title?: string;
  render?: (value: T[keyof T], record: T) => RenderComponent | string;
}

export interface RenderComponent {
  component: Type<any>;
  inputs?: Record<string, any>;
}
