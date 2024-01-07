import { Component, Input, Signal, signal } from '@angular/core';
import { PostDto } from '../../../services/post/Dto/post.dto';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IsPostLoading, getPosts } from '../blog/state/blog.state';
import { Subject, takeUntil } from 'rxjs';
import { BrowserApiService } from '../../../services/utils/browser.api.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app/app.state';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../pagination/pagination.component';
import { LoadPosts } from '../blog/state/blog.action';

@Component({
  selector: 'blog-search-result',
  standalone: true,
  imports: [CommonModule, RouterLink, PaginationComponent],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.scss',
})
export class SearchResultComponent {
  @Input({ required: false })
  searchInput = signal<PostDto[] | null>(null);
  search: string | null = '';
  posts$ = this.store.select(getPosts);
  isPostLoading$ = this.store.select(IsPostLoading);
  posts = signal<PostDto[] | null>(null);
  isPostLoading!: Signal<boolean>;
  public ngUnSubscribe = new Subject();
  currentPage = 1;
  totalPages = 5;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private browserApi: BrowserApiService
  ) {
    this.isPostLoading = toSignal(this.isPostLoading$, {
      initialValue: false,
    });
  }
  ngOnInit(): void {
    this.search = this.route.snapshot.queryParamMap.get('search');
    console.log(this.search);
    this.searchPost();
  }

  ngOnDestroy(): void {
    this.ngUnSubscribe.complete();
  }

  searchPost(): void {
    this.posts$?.pipe(takeUntil(this.ngUnSubscribe)).subscribe((posts) => {
      const filteredPosts = posts?.filter((p) => {
        if (this.search) {
          p.title.includes(this.search);
        }
      });
      this.posts.set(filteredPosts || null);
    });

    if (this.browserApi.isBrowser) {
      window.scrollTo(0, 0);
    }
  }

  onPageChanged(page: number) {
    debugger;
    this.currentPage = page;
    LoadPosts({ query: { page: page, limit: 10, keyword: '' } });
    this.searchPost();
    console.log('Current Page:', this.currentPage);
  }
}
