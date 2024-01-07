import { Component, Input } from '@angular/core';

@Component({
  selector: 'blog-loader',
  standalone: true,
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {
  @Input({ required: true })
  loadingText: string = '';
}
