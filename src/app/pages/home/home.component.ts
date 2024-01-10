import { AppState } from './../../state/app/app.state';
import { CommonModule } from '@angular/common';
import { Component, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoaderComponent } from '../../components';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { Store } from '@ngrx/store';
import { IsPostLoading, getPosts } from '../../state/blog/blog.state';
import { toSignal } from '@angular/core/rxjs-interop';
import { PostDto } from '../../../services/post/Dto/post.dto';
import { Subject } from 'rxjs';
import { EmptyComponent } from '../../components/empty/empty.component';
import { PostsComponent } from '../post/posts/posts.component';

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
  posts!: Signal<PostDto[] | null>;
  isPostLoading$ = this.store.select(IsPostLoading);
  isPostLoading!: Signal<boolean>;
  public ngUnSubscribe = new Subject();

  constructor(private store: Store<AppState>) {
    this.isPostLoading = toSignal(this.isPostLoading$, { initialValue: false });
    this.posts = toSignal(this.posts$, { initialValue: null });
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
