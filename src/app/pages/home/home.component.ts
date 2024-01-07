import { AppState } from './../../state/app/app.state';
import { CommonModule } from '@angular/common';
import { Component, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoaderComponent, PostsComponent } from '../../components';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { Store } from '@ngrx/store';
import {
  IsPostLoading,
  getCourses,
} from '../../components/blog/state/blog.state';
import { toSignal } from '@angular/core/rxjs-interop';
import { PostDto } from '../../../services/post/Dto/post.dto';
import { LoadPosts } from '../../components/blog/state/blog.action';

@Component({
  selector: 'blog-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    PostsComponent,
    LoaderComponent,
    SlickCarouselModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  posts$ = this.store.select(getCourses);
  posts!: Signal<PostDto[] | null>;
  isPostLoading$ = this.store.select(IsPostLoading);
  isPostLoading!: Signal<boolean>;
  constructor(private store: Store<AppState>) {
    this.store.dispatch(
      LoadPosts({ query: { page: 1, limit: 10, keyword: '' } })
    );
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

  ngOnInit(): void {}
}
