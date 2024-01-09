import { Component, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  IsPostLoading,
  getPosts,
} from '../../components/blog/state/blog.state';
import { PostDto } from '../../../services/post/Dto/post.dto';
import { AppState } from '../../state/app/app.state';
import { RouterLink } from '@angular/router';
import { LoaderComponent } from '../../components/shared/loader/loader.component';
import { EmptyComponent } from '../../components/shared/empty/empty.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'blog-posts',
  standalone: true,
  imports: [RouterLink, LoaderComponent, EmptyComponent, CommonModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent {
  posts$ = this.store.select(getPosts);
  posts!: Signal<PostDto[] | null>;
  isPostLoading$ = this.store.select(IsPostLoading);
  isPostLoading!: Signal<boolean>;

  constructor(private store: Store<AppState>) {
    this.isPostLoading = toSignal(this.isPostLoading$, { initialValue: false });
    this.posts = toSignal(this.posts$, { initialValue: null });
  }
}
