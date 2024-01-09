import { AppState } from './../../state/app/app.state';
import { CommonModule } from '@angular/common';
import { Component, Signal, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoaderComponent, PostsComponent } from '../../components';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { Store } from '@ngrx/store';
import {
  IsPostLoading,
  getPosts,
} from '../../components/blog/state/blog.state';
import { toSignal } from '@angular/core/rxjs-interop';
import { PostDto } from '../../../services/post/Dto/post.dto';
import { LoadPosts } from '../../components/blog/state/blog.action';
import { Subject, takeUntil } from 'rxjs';
import { EmptyComponent } from '../../components/shared/empty/empty.component';

@Component({
  selector: 'blog-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    PostsComponent,
    LoaderComponent,
    SlickCarouselModule,
    EmptyComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  posts$ = this.store.select(getPosts);
  posts = signal<PostDto[] | null>(null);
  isPostLoading$ = this.store.select(IsPostLoading);
  isPostLoading!: Signal<boolean>;
  public ngUnSubscribe = new Subject();

  constructor(private store: Store<AppState>) {
    this.isPostLoading = toSignal(this.isPostLoading$, { initialValue: false });
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

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.ngUnSubscribe.complete();
  }

  sliderConfig = {
    dots: true,
    draggable: true,
    infinite: false,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
  };
}
