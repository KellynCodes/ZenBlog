import {
  IsPostLoading,
  errorMessage,
  successMessage,
} from '../../../state/blog/blog.state';
import { CreatePostDto } from '../../../../services/post/Dto/post.dto';
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
import { CreatePost } from '../../../state/blog/blog.action';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app/app.state';
import { v4 as uuidv4 } from 'uuid';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'blog-create',
  standalone: true,
  imports: [SidebarComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent {
  public createPostForm!: FormGroup;
  private IsPostLoading$ = this.store.select(IsPostLoading);
  public isSending: Signal<boolean>;
  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.isSending = toSignal(this.IsPostLoading$, { initialValue: false });
  }
  ngOnInit(): void {
    this.createPostForm = this.fb.group({
      image: ['', Validators.required],
      tags: [['Business', 'Education', 'Animal', 'Engineering', 'Health']],
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(500),
        ],
      ],
      content: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(5000),
        ],
      ],
    });
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

  onSubmit(): void {
    if (!this.createPostForm.valid) {
      this.toastr.error('Please fill all the fields');
      return;
    }
    const post: CreatePostDto = {
      id: uuidv4(),
      image: this.createPostForm.value.image,
      tags: this.createPostForm.value.tags,
      likes: 0,
      text: this.createPostForm.value.content,
      owner: '60d0fe4f5311236168a10a07',
      // firstName: this.createPostForm.value.ownerFirstName,
      // lastName: this.createPostForm.value.ownerLastName,
      // picture: this.createPostForm.value.ownerPicture,
      // title: this.createPostForm.value.ownerTitle,
      publishDate: new Date().toISOString(),
      title: this.createPostForm.value.title,
      content: this.createPostForm.value.content,
      updated: new Date().toISOString(),
    };
    this.store.dispatch(CreatePost({ post: post, IsPostLoading: true }));
  }
}
