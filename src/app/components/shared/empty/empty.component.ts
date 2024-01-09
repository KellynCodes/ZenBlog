import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'blog-empty',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './empty.component.html',
  styleUrl: './empty.component.scss',
})
export class EmptyComponent {
  @Input({ required: true })
  message: string = '';
}
