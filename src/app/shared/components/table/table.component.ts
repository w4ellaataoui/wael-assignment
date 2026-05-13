import { CommonModule } from '@angular/common';
import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import { Column, RenderComponent } from '../../types';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'table-component',
  templateUrl: 'table.component.html',
  styleUrls: ['table.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class TableComponent<T extends object> implements OnInit {
  constructor() {}
  displayedRows: T[] = [];
  pageSize: number = 10;
  currentPage: number = 1;
  totalPages: number = 1;
  orderBy: keyof T | null = null;
  orderDirection: 'asc' | 'desc' = 'asc';
  pages: number[] = [];
  query: string = '';
  pageSizeOptions: number[] = [10, 25, 50];
  searchResultsCount: number = 0;

  @Input() columns: Column<T>[] = [];
  @Input() data: T[] = [];
  @Input() isLoading: boolean = false;

  ngOnInit() {
    this.displayData();
  }

  @ContentChild('loadingIcon')
  loadingIcon!: TemplateRef<any>;
  isRenderComponent(value: any): boolean {
    return value && typeof value === 'object' && 'component' in value;
  }
  asRenderComponent(value: string | RenderComponent): RenderComponent {
    return value as RenderComponent;
  }
  onPageChange(page: number) {
    this.currentPage = page;
    this.displayData(false);
  }
  onPageSizeChange() {
    this.displayData(false);
  }
  onSort(sort: { field: keyof T; direction: 'asc' | 'desc' }) {
    if (this.orderBy === sort.field) {
      this.orderDirection = this.orderDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.orderBy = sort.field;
      this.orderDirection = 'asc';
    }
    this.displayData(false);
  }
  sortData(data: T[]) {
    return data.sort((a, b) => {
      const aValue = a[this.orderBy!];
      const bValue = b[this.orderBy!];
      if (aValue < bValue) return this.orderDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return this.orderDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }
  onSearch() {
    this.displayData();
  }
  filterRows() {
    const filteredData = this.data.filter((row) => {
      const isMatch = Object.values(row).some((value) =>
        String(value).toLowerCase().includes(this.query.toLowerCase()),
      );
      return isMatch;
    });
    this.searchResultsCount = filteredData.length;
    return filteredData;
  }
  displayData(resetPage: boolean = true) {
    if (resetPage) {
      this.currentPage = 1;
    }

    let updatedData = this.query ? this.filterRows() : this.data;
    let sortedData = this.orderBy ? this.sortData(updatedData) : [...updatedData];
    const totalPages = Math.ceil(sortedData.length / this.pageSize);
    this.currentPage = Math.min(this.currentPage, Math.ceil(totalPages));
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.displayedRows = sortedData.slice(startIndex, startIndex + Number(this.pageSize));
    this.totalPages = totalPages;
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
