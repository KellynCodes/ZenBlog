import { Component, Signal, signal } from '@angular/core';
import { BrowserApiService } from '../../../services/utils/browser.api.service';
import { EmptyComponent } from '../empty/empty.component';
import { LoaderComponent } from '../loader/loader.component';
import { IsPostLoading, getData } from '../../state/blog/blog.state';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app/app.state';
import { PostDto } from '../../../services/post/Dto/post.dto';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'blog-footer',
  standalone: true,
  imports: [EmptyComponent, LoaderComponent, RouterLink, CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  data$ = this.store.select(getData);
  posts = signal<PostDto[] | null>(null);
  isPostLoading$ = this.store.select(IsPostLoading);
  postTags = signal<Array<string>>(['']);
  isPostLoading!: Signal<boolean>;
  public ngUnSubscribe = new Subject();

  constructor(
    private browserApi: BrowserApiService,
    private store: Store<AppState>
  ) {
    this.isPostLoading = toSignal(this.isPostLoading$, {
      initialValue: false,
    });
    this.data$.pipe(takeUntil(this.ngUnSubscribe)).subscribe((res) => {
      this.posts.set(res?.data?.slice(0, 6)!);
      res?.data?.forEach((post) => {
        this.postTags.set(post.tags.slice(0, 5));
      });
    });
  }

  ngOnDestroy(): void {
    this.ngUnSubscribe.complete();
  }

  year = new Date().getFullYear();
  scrollToTop(): void {
    if (this.browserApi.isBrowser) {
      window.scrollTo(0, 0);
    }
  }
}
