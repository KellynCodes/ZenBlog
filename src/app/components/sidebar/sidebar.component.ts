import {
  Component,
  Input,
  OnChanges,
  Signal,
  SimpleChanges,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { PostDto } from '../../../services/post/Dto/post.dto';
import { toSignal } from '@angular/core/rxjs-interop';
import { IsPostLoading, getData } from '../../state/blog/blog.state';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app/app.state';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';
import { Gallery, GalleryItem, IframeItem } from 'ng-gallery';
import { LightboxModule } from 'ng-gallery/lightbox';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'blog-sidebar',
  standalone: true,
  imports: [RouterLink, CommonModule, LoaderComponent, LightboxModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnChanges {
  posts$ = this.store.select(getData);
  isPostLoading$ = this.store.select(IsPostLoading);
  isPostLoading!: Signal<boolean>;
  posts = signal<PostDto[] | null>(null);
  data = [
    {
      srcUrl: 'https://www.youtube.com/embed/V-D2sk_azcs',
    },
  ];

  items!: GalleryItem[];
  public ngUnSubscribe = new Subject();

  @Input({ required: false }) post!: PostDto;

  constructor(private store: Store<AppState>, public gallery: Gallery) {
    this.isPostLoading = toSignal(this.isPostLoading$, {
      initialValue: false,
    });
    this.posts$.pipe(takeUntil(this.ngUnSubscribe)).subscribe((res) => {
      this.posts.set(res?.data!);
    });
  }
  ngOnDestroy(): void {
    this.ngUnSubscribe.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['post']) {
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
