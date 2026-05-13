import { Component, Input } from '@angular/core';

@Component({
  selector: 'tag-component',
  imports: [],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.scss',
})
export class Tag {
  @Input() text: string = '';
  @Input() color?: 'red' | 'green';
}
