import { ApiResponse } from './../../../../data/shared/api.response';
import {
  Component,
  Input,
  Signal,
  booleanAttribute,
  signal,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { IsPostLoading, getData } from '../../../state/blog/blog.state';
import { PostDto } from '../../../../services/post/Dto/post.dto';
import { AppState } from '../../../state/app/app.state';
import { RouterLink } from '@angular/router';
import { LoaderComponent } from '../../../components/loader/loader.component';
import { EmptyComponent } from '../../../components/empty/empty.component';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../../components/pagination/pagination.component';
import { LoadPosts } from '../../../state/blog/blog.action';
import { BrowserApiService } from '../../../../services/utils/browser.api.service';
import { Subject, takeUntil } from 'rxjs';
import {
  Gallery,
  GalleryItem,
  GalleryModule,
  GalleryRef,
  ImageItem,
} from 'ng-gallery';

@Component({
  selector: 'blog-posts',
  standalone: true,
  imports: [
    RouterLink,
    LoaderComponent,
    EmptyComponent,
    CommonModule,
    PaginationComponent,
    CommonModule,
    GalleryModule,
  ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent {
  data$ = this.store.select(getData);
  data!: Signal<ApiResponse<PostDto[]> | null | undefined>;
  posts = signal<PostDto[] | null>(null);
  isPostLoading$ = this.store.select(IsPostLoading);
  isPostLoading!: Signal<boolean>;
  currentPage = signal<number>(1);
  totalPages = signal<number>(0);
  public itemsPerPage = 10;
  public ngUnSubscribe = new Subject();

  @Input({ required: true, transform: booleanAttribute })
  viewTrending: boolean = false;

  @Input({ required: true, transform: booleanAttribute })
  displayGallery: boolean = true;

  constructor(
    private store: Store<AppState>,
    private browserApi: BrowserApiService,
    private gallery: Gallery
  ) {
    this.isPostLoading = toSignal(this.isPostLoading$, { initialValue: false });
    this.data$.pipe(takeUntil(this.ngUnSubscribe)).subscribe((res) => {
      this.posts.set(res?.data!);
      this.loadGalleryImage(res?.data!);
      this.totalPages.set(res?.total!);
    });
  }
  images: GalleryItem[] = [];

  ngOnInit() {}

  loadGalleryImage(postsData: PostDto[]): void {
    const galleryRef: GalleryRef = this.gallery.ref('PROJECT_GALLERY');
    // Set items array
    this.images = [];
    postsData?.map((post: PostDto) => {
      this.images.push(
        new ImageItem({
          src: post.image,
          thumb: post.image,
          alt: post.text!,
          args: post.id as string,
        })
      );
    });
    galleryRef.load(this.images);
  }

  ngOnDestroy(): void {
    this.ngUnSubscribe.complete();
  }

  onPageChanged(page: number) {
    this.currentPage.set(page);
    this.store.dispatch(
      LoadPosts({
        query: { page: page, limit: 10, keyword: '' },
        IsReFetch: true,
      })
    );
    if (this.browserApi.isBrowser) {
      window.scrollTo(0, 0);
    }
  }
}
