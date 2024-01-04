import { Component, Input } from '@angular/core';
import { PostDto } from '../../../../types/post';

@Component({
  selector: 'blog-post',
  standalone: true,
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  @Input({ required: true })
  posts!: PostDto[];
}
