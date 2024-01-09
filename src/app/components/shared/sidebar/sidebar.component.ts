import { Component, Input, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PostDto } from '../../../../services/post/Dto/post.dto';
import { LoadPosts } from '../../blog/state/blog.action';
import { toSignal } from '@angular/core/rxjs-interop';
import { IsPostLoading, getPosts } from '../../blog/state/blog.state';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app/app.state';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';
import { Gallery, GalleryItem, IframeItem, YoutubeItem } from 'ng-gallery';
import { LightboxModule } from 'ng-gallery/lightbox';

@Component({
  selector: 'blog-sidebar',
  standalone: true,
  imports: [RouterLink, CommonModule, LoaderComponent, LightboxModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  posts$ = this.store.select(getPosts);
  isPostLoading$ = this.store.select(IsPostLoading);
  isPostLoading!: Signal<boolean>;
  data = [
    {
      srcUrl: 'https://www.youtube.com/embed/V-D2sk_azcs',
    },
  ];

  items!: GalleryItem[];

  @Input({ required: true }) post!: PostDto;

  constructor(private store: Store<AppState>, public gallery: Gallery) {
    this.isPostLoading = toSignal(this.isPostLoading$, {
      initialValue: false,
    });
  }

  ngOnInit() {
    this.items = this.data.map(
      (item) =>
        new IframeItem({
          src: item.srcUrl,
          thumb: this.post?.image,
        })
    );
    this.gallery.ref().load(this.items);
  }

  loadCourse(): void {
    this.store.dispatch(
      LoadPosts({ query: { page: 1, limit: 5, keyword: '' } })
    );
  }
}
