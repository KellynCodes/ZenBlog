import { Component, OnInit, Signal, signal } from '@angular/core';
import { PostDto } from '../../../../services/post/Dto/post.dto';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IsPostLoading, getData } from '../../../state/blog/blog.state';
import { Subject, takeUntil } from 'rxjs';
import { BrowserApiService } from '../../../../services/utils/browser.api.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app/app.state';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../../components/pagination/pagination.component';
import { LoadPosts } from '../../../state/blog/blog.action';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { EmptyComponent } from '../../../components/empty/empty.component';
import { LoaderComponent } from '../../../components/loader/loader.component';

@Component({
  selector: 'blog-search-result',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    PaginationComponent,
    SidebarComponent,
    EmptyComponent,
    LoaderComponent,
  ],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.scss',
})
export class SearchResultComponent implements OnInit {
  search = signal<string | null>(null);
  data$ = this.store.select(getData);
  isPostLoading$ = this.store.select(IsPostLoading);
  posts = signal<PostDto[] | null>(null);
  isPostLoading!: Signal<boolean>;
  public ngUnSubscribe = new Subject();
  currentPage = signal<number>(1);
  totalPages = signal<number>(0);
  public itemsPerPage = 10;

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
    this.route.queryParamMap
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe((queryParams) => {
        const search = queryParams.get('search');
        this.search.set(search);
        this.searchPost(search ?? '');
      });
  }

  ngOnDestroy(): void {
    this.ngUnSubscribe.complete();
  }

  searchPost(searchKeyword: string): void {
    let filteredPosts;
    this.data$?.pipe(takeUntil(this.ngUnSubscribe)).subscribe((res) => {
      filteredPosts = res?.data?.filter((p) => {
        if (searchKeyword != null) {
          return p.text!.toLowerCase().includes(searchKeyword?.toLowerCase()!);
        }
        return null;
      });
      this.totalPages.set(res?.total!);
    });
    this.posts.set(filteredPosts!);
    if (this.browserApi.isBrowser) {
      window.scrollTo(0, 0);
    }
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
    this.searchPost(this.search()!);
  }
}
