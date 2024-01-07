import { Component, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { IsPostLoading, getCourses } from '../state/blog.state';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app/app.state';
import { PostDto } from '../../../../services/post/Dto/post.dto';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LoaderComponent } from '../../loader/loader.component';
import { LoadPosts } from '../state/blog.action';

@Component({
  selector: 'blog-post',
  standalone: true,
  imports: [RouterLink, LoaderComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  posts$ = this.store.select(getCourses);
  post!: PostDto | undefined;
  postId!: string;
  postDescriptionFirstCharacter!: string;
  isPostLoading$ = this.store.select(IsPostLoading);
  isPostLoading!: Signal<boolean>;
  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute
  ) {
    debugger;
    this.postId = this.activatedRoute.snapshot.params['id'];
    this.isPostLoading = toSignal(this.isPostLoading$, { initialValue: false });
    let posts = toSignal(this.posts$, { initialValue: null });
    if (posts() == null) {
      this.store.dispatch(
        LoadPosts({ query: { page: 1, limit: 10, keyword: '' } })
      );
    }
    this.post = toSignal(this.posts$, { initialValue: null })()?.find(
      (x) => x.id == this.postId
    );
    this.postDescriptionFirstCharacter = this.post?.text![0]!;
    console.log(this.post);
  }
}
