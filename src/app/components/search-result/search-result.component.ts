import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Signal,
  SimpleChanges,
  signal,
} from '@angular/core';
import { PostDto } from '../../../services/post/Dto/post.dto';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IsPostLoading, getPosts } from '../blog/state/blog.state';
import { Subject, takeUntil } from 'rxjs';
import { BrowserApiService } from '../../../services/utils/browser.api.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app/app.state';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../shared/pagination/pagination.component';
import { LoadPosts } from '../blog/state/blog.action';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { EmptyComponent } from '../shared/empty/empty.component';
import { LoaderComponent } from '../shared/loader/loader.component';

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
  posts$ = this.store.select(getPosts);
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
    this.posts$?.pipe(takeUntil(this.ngUnSubscribe)).subscribe((posts) => {
      filteredPosts = posts?.filter((p) => {
        if (searchKeyword != null) {
          return p.text!.toLowerCase().includes(searchKeyword?.toLowerCase()!);
        }
        return null;
      });
    });
    this.posts.set(filteredPosts!);
    if (this.posts()?.length! - 1 > 10) {
      const totalPages = this.currentPage() / this.itemsPerPage;
      this.totalPages.set(totalPages);
    }
    this.totalPages.set(this.posts()?.length! - 1);
    console.log(filteredPosts);
    if (this.browserApi.isBrowser) {
      window.scrollTo(0, 0);
    }
  }

  onPageChanged(page: number) {
    this.currentPage.set(page);
    LoadPosts({ query: { page: page, limit: 10, keyword: '' } });
    this.searchPost(this.search()!);
  }
}
