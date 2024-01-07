import { Component, Signal, computed } from '@angular/core';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { IsPostLoading, getCourses } from '../state/blog.state';
import { PostDto } from '../../../../services/post/Dto/post.dto';
import { LoadPosts } from '../state/blog.action';
import { AppState } from '../../../state/app/app.state';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'blog-posts',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent {
  posts$ = this.store.select(getCourses);
  posts!: Signal<PostDto[] | null>;
  isPostLoading$ = this.store.select(IsPostLoading);
  isPostLoading!: Signal<boolean>;
  constructor(private store: Store<AppState>) {
    this.isPostLoading = toSignal(this.isPostLoading$, { initialValue: false });
    this.posts = toSignal(this.posts$, { initialValue: null });
  }
}
