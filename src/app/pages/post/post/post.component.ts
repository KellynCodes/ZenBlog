import { Component, Signal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { IsPostLoading, getData } from '../../../state/blog/blog.state';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app/app.state';
import { PostDto } from '../../../../services/post/Dto/post.dto';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { LoaderComponent } from '../../../components/loader/loader.component';
import { DeletePost, LoadPosts } from '../../../state/blog/blog.action';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { EmptyComponent } from '../../../components/empty/empty.component';
import { BrowserApiService } from '../../../../services/utils/browser.api.service';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'blog-post',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LoaderComponent,
    EmptyComponent,
    SidebarComponent,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  posts$ = this.store.select(getData);
  post!: PostDto | undefined;
  postId!: string;
  postDescriptionFirstCharacter!: string;
  isPostLoading$ = this.store.select(IsPostLoading);
  posts = signal<PostDto[] | null>(null);
  isPostLoading!: Signal<boolean>;
  public ngUnSubscribe = new Subject();

  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private browserApi: BrowserApiService,
    private toastrService: ToastrService
  ) {
    this.postId = this.activatedRoute.snapshot.params['id'];
    this.isPostLoading = toSignal(this.isPostLoading$, {
      initialValue: false,
    });
    this.getPost(this.postId);
    if (this.post == undefined || this.post == null) {
      this.loadCourse();
    }
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe((params: ParamMap) => {
        const postId = params.get('id');
        if (postId != null) {
          this.getPost(postId);
        }
      });
  }

  ngOnDestroy(): void {
    this.ngUnSubscribe.complete();
  }

  getPost(postId: string): void {
    this.posts$?.pipe(takeUntil(this.ngUnSubscribe)).subscribe((res) => {
      this.post = res?.data?.find((x) => x.id == postId);
    });
    this.postDescriptionFirstCharacter = this.post?.text![0]!;
    if (this.browserApi.isBrowser) {
      window.scrollTo(0, 0);
    }
  }

  loadCourse(): void {
    this.store.dispatch(
      LoadPosts({
        query: { page: 1, limit: 10, keyword: '' },
        IsReFetch: false,
      })
    );
  }

  deletePost(postId: string): void {
    this.store.dispatch(DeletePost({ postId: postId, isDeleting: true }));
    if (this.browserApi.isBrowser) {
      window.scrollTo(0, 0);
    }
  }
}
