import { Component, Signal, computed, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  IsPostLoading,
  getPosts,
} from '../../components/blog/state/blog.state';
import { PostDto } from '../../../services/post/Dto/post.dto';
import { AppState } from '../../state/app/app.state';
import { RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { LoadPosts } from '../../components/blog/state/blog.action';
import { LoaderComponent } from '../../components/shared/loader/loader.component';
import { EmptyComponent } from '../../components/shared/empty/empty.component';

@Component({
  selector: 'blog-posts',
  standalone: true,
  imports: [RouterLink, LoaderComponent, EmptyComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent {
  posts$ = this.store.select(getPosts);
  posts = signal<PostDto[] | null>(null);
  isPostLoading$ = this.store.select(IsPostLoading);
  isPostLoading!: Signal<boolean>;
  public ngUnSubscribe = new Subject();

  constructor(private store: Store<AppState>) {
    this.isPostLoading = toSignal(this.isPostLoading$, { initialValue: false });
  }

  ngOnInit(): void {
    this.posts$.pipe(takeUntil(this.ngUnSubscribe)).subscribe((posts) => {
      if (posts == null) {
        this.store.dispatch(
          LoadPosts({ query: { page: 1, limit: 10, keyword: '' } })
        );
        this.posts.set(posts);
        return;
      }
      this.posts.set(posts);
    });
  }

  ngOnDestroy(): void {
    this.ngUnSubscribe.complete();
  }
}
