import { AppState } from './../../state/app/app.state';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, Signal, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoaderComponent } from '../../components';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { Store } from '@ngrx/store';
import { IsPostLoading, getData } from '../../state/blog/blog.state';
import { toSignal } from '@angular/core/rxjs-interop';
import { PostDto } from '../../../services/post/Dto/post.dto';
import { Subject, takeUntil } from 'rxjs';
import { EmptyComponent } from '../../components/empty/empty.component';
import { PostsComponent } from '../post/posts/posts.component';
import { ApiResponse } from '../../../data/shared/api.response';

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
export class HomeComponent implements OnInit, OnDestroy {
  data$ = this.store.select(getData);
  data!: Signal<ApiResponse<PostDto[]> | null>;
  posts = signal<any>(null);
  isPostLoading$ = this.store.select(IsPostLoading);
  isPostLoading!: Signal<boolean>;
  public ngUnSubscribe = new Subject();

  constructor(private store: Store<AppState>) {
    this.isPostLoading = toSignal(this.isPostLoading$, { initialValue: false });
    this.data$.pipe(takeUntil(this.ngUnSubscribe)).subscribe((res) => {
      this.posts.set(res?.data);
    });
  }
  ngOnDestroy(): void {
    this.ngUnSubscribe.complete();
  }

  ngOnInit(): void {}

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
