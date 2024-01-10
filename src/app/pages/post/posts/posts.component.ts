import {
  Component,
  OnChanges,
  Signal,
  SimpleChanges,
  signal,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { IsPostLoading, getPosts } from '../../../state/blog/blog.state';
import { PostDto } from '../../../../services/post/Dto/post.dto';
import { AppState } from '../../../state/app/app.state';
import { RouterLink } from '@angular/router';
import { LoaderComponent } from '../../../components/loader/loader.component';
import { EmptyComponent } from '../../../components/empty/empty.component';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../../components/pagination/pagination.component';
import { LoadPosts } from '../../../state/blog/blog.action';
import { Subject } from 'rxjs';

@Component({
  selector: 'blog-posts',
  standalone: true,
  imports: [
    RouterLink,
    LoaderComponent,
    EmptyComponent,
    CommonModule,
    PaginationComponent,
  ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnChanges {
  posts$ = this.store.select(getPosts);
  posts!: Signal<PostDto[] | null>;
  isPostLoading$ = this.store.select(IsPostLoading);
  isPostLoading!: Signal<boolean>;
  currentPage = signal<number>(1);
  totalPages = signal<number>(0);
  public itemsPerPage = 10;
  public ngUnSubscribe = new Subject();

  constructor(private store: Store<AppState>) {
    this.isPostLoading = toSignal(this.isPostLoading$, { initialValue: false });
    this.posts = toSignal(this.posts$, { initialValue: null });
    this.totalPages.set(this.posts()?.length! - 1);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentPage']) {
      this.isPostLoading = toSignal(this.isPostLoading$, {
        initialValue: false,
      });
    }
  }

  ngOnDestroy(): void {
    this.ngUnSubscribe.complete();
  }

  onPageChanged(page: number) {
    console.log(page);
    this.currentPage.set(page);
    this.store.dispatch(
      LoadPosts({
        query: { page: page, limit: 10, keyword: '' },
        IsReFetch: true,
      })
    );
  }
}
