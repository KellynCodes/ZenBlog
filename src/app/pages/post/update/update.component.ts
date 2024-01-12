import {
  IsPostLoading,
  errorMessage,
  getData,
  successMessage,
} from '../../../state/blog/blog.state';
import { OwnerDto, PostDto } from '../../../../services/post/Dto/post.dto';
import { Component, Signal, signal } from '@angular/core';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {
  DeletePost,
  LoadPosts,
  UpdatePost,
} from '../../../state/blog/blog.action';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app/app.state';
import { toSignal } from '@angular/core/rxjs-interop';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BrowserApiService } from '../../../../services/utils/browser.api.service';
import { LoaderComponent } from '../../../components/loader/loader.component';
import { EmptyComponent } from '../../../components/empty/empty.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'blog-update',
  standalone: true,
  imports: [
    SidebarComponent,
    FormsModule,
    ReactiveFormsModule,
    LoaderComponent,
    EmptyComponent,
    CommonModule,
  ],
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss',
})
export class UpdateComponent {
  public createPostForm!: FormGroup;
  public isSending = signal<boolean>(false);
  private successMessage$ = this.store.select(successMessage);
  private errorMessage$ = this.store.select(errorMessage);
  private successMessage!: Signal<string | null>;
  private errorMessage!: Signal<string | null>;
  data$ = this.store.select(getData);
  post!: PostDto | undefined;
  postId!: string;
  postDescriptionFirstCharacter!: string;
  isPostLoading$ = this.store.select(IsPostLoading);
  posts = signal<PostDto[] | null>(null);
  isPostLoading!: Signal<boolean>;
  public ngUnSubscribe = new Subject();

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private browserApi: BrowserApiService
  ) {
    this.checkForErrorMessage();
    this.postId = this.activatedRoute.snapshot.params['id'];
    this.isPostLoading = toSignal(this.isPostLoading$, {
      initialValue: false,
    });
    this.getPost(this.postId);
    if (this.post == undefined || this.post == null) {
      this.loadCourse();
    }
  }
  ngOnInit(): void {
    this.createPostForm = this.fb.group({
      image: [this.post?.image, Validators.required],
      tags: [[]],
      title: [
        this.post?.text,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(500),
        ],
      ],
      content: [
        this.post?.text,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(5000),
        ],
      ],
    });

    this.activatedRoute.paramMap
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe((params: ParamMap) => {
        const postId = params.get('id');
        if (postId != null) {
          this.getPost(postId);
        }
      });
  }

  ngOnDestroy(): void {
    this.ngUnSubscribe.complete();
  }

  getPost(postId: string): void {
    this.data$?.pipe(takeUntil(this.ngUnSubscribe)).subscribe((res) => {
      this.post = res?.data?.find((x) => x.id == postId);
    });
    this.postDescriptionFirstCharacter = this.post?.text![0]!;
    if (this.browserApi.isBrowser) {
      window.scrollTo(0, 0);
    }
  }

  loadCourse(): void {
    this.store.dispatch(
      LoadPosts({
        query: { page: 1, limit: 10, keyword: '' },
        IsReFetch: false,
      })
    );
  }

  deletePost(postId: string): void {
    this.store.dispatch(DeletePost({ postId: postId, isDeleting: true }));
    if (this.browserApi.isBrowser) {
      window.scrollTo(0, 0);
    }
  }

  isInputValid(controlName: string, errorName: string): boolean {
    if (
      this.createPostForm.controls[controlName]?.touched &&
      this.createPostForm.controls[controlName]?.hasError(errorName)
    ) {
      return true;
    }
    return false;
  }

  checkForErrorMessage(): void {
    this.successMessage = toSignal(this.successMessage$, {
      initialValue: null,
    });
    this.errorMessage = toSignal(this.errorMessage$, { initialValue: null });
    if (this.successMessage()) {
      this.toastr.success(this.successMessage()!, 'Post');
    }
    if (this.errorMessage()) {
      this.toastr.error(this.errorMessage()!, 'Post');
    }
  }

  onSubmit(): void {
    this.isSending.set(true);
    if (!this.createPostForm.valid) {
      console.log(this.createPostForm.errors);
      this.toastr.error('Please fill all the fields');
      this.isSending.set(false);
      return;
    }
    const post: PostDto = {
      id: this.post?.id!,
      image: this.createPostForm.value.image,
      tags: this.createPostForm.value.tags,
      likes: 0,
      text: this.createPostForm.value.content,
      owner: { ...this.post?.owner } as OwnerDto,
      // firstName: this.createPostForm.value.ownerFirstName,
      // lastName: this.createPostForm.value.ownerLastName,
      // picture: this.createPostForm.value.ownerPicture,
      // title: this.createPostForm.value.ownerTitle,
      publishDate: new Date().toISOString(),
      title: this.createPostForm.value.title,
      body: this.createPostForm.value.content,
      updated: new Date().toISOString(),
    };
    this.store.dispatch(
      UpdatePost({ postId: post?.id, post: post, IsPostLoading: true })
    );
    this.isSending.set(false);
  }
}
