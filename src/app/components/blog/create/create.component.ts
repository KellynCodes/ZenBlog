import { errorMessage, successMessage } from './../state/blog.state';
import { CreatePostDto } from './../../../../services/post/Dto/post.dto';
import { Component, Signal, signal } from '@angular/core';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CreatePost } from '../state/blog.action';
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
  public isSending = signal<boolean>(false);
  private successMessage$ = this.store.select(successMessage);
  private errorMessage$ = this.store.select(errorMessage);
  private successMessage!: Signal<string | null>;
  private errorMessage!: Signal<string | null>;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.checkForErrorMessage();
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
    console.log(uuidv4());
    const post: CreatePostDto = {
      id: uuidv4(),
      image: this.createPostForm.value.image,
      tags: this.createPostForm.value.tags,
      likes: 0,
      text: this.createPostForm.value.content,
      owner: '60d0fe4f5311236168a109e7',
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
    this.isSending.set(false);
  }
}
