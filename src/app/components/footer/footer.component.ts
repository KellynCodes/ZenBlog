import { Component, Signal, signal } from '@angular/core';
import { BrowserApiService } from '../../../services/utils/browser.api.service';
import { EmptyComponent } from '../empty/empty.component';
import { LoaderComponent } from '../loader/loader.component';
import { IsPostLoading, getPosts } from '../../state/blog/blog.state';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app/app.state';
import { PostDto } from '../../../services/post/Dto/post.dto';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'blog-footer',
  standalone: true,
  imports: [EmptyComponent, LoaderComponent, RouterLink, CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  posts$ = this.store.select(getPosts);
  posts = signal<PostDto[] | null>(null);
  isPostLoading$ = this.store.select(IsPostLoading);
  isPostLoading!: Signal<boolean>;

  constructor(
    private browserApi: BrowserApiService,
    private store: Store<AppState>
  ) {
    this.isPostLoading = toSignal(this.isPostLoading$, {
      initialValue: false,
    });
    const posts: PostDto[] = toSignal(this.posts$, {
      initialValue: null,
    })()?.slice(0, 5)!;
    this.posts.set(posts);
  }

  year = new Date().getFullYear();
  scrollToTop(): void {
    if (this.browserApi.isBrowser) {
      window.scrollTo(0, 0);
    }
  }
}
