import {
  Component,
  Input,
  OnChanges,
  Signal,
  SimpleChanges,
} from '@angular/core';
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
export class SidebarComponent implements OnChanges {
  posts$ = this.store.select(getPosts);
  isPostLoading$ = this.store.select(IsPostLoading);
  isPostLoading!: Signal<boolean>;
  posts!: Signal<PostDto[] | null>;
  data = [
    {
      srcUrl: 'https://www.youtube.com/embed/V-D2sk_azcs',
    },
  ];

  items!: GalleryItem[];

  @Input({ required: false }) post!: PostDto;

  constructor(private store: Store<AppState>, public gallery: Gallery) {
    this.isPostLoading = toSignal(this.isPostLoading$, {
      initialValue: false,
    });
    this.posts = toSignal(this.posts$, {
      initialValue: null,
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['post'].currentValue) {
      const newValue = changes?.['post'].currentValue as PostDto;
      this.post = newValue;
      this.loadItems();
    }
  }

  ngOnInit() {
    this.loadItems();
  }

  loadItems(): void {
    this.items = this.data.map(
      (item) =>
        new IframeItem({
          src: item.srcUrl,
          thumb: this.post?.image,
        })
    );
    this.gallery.ref().load(this.items);
  }
}
