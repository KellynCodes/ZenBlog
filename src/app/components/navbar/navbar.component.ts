import { Router, RouterLink } from '@angular/router';
import { Component, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'blog-navbar',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  public searchForm!: FormGroup;
  public isSending = signal<boolean>(false);

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      searchKeyword: ['', Validators.required],
    });
  }

  isInputValid(controlName: string, errorName: string): boolean {
    if (
      this.searchForm.controls[controlName]?.touched &&
      this.searchForm.controls[controlName]?.hasError(errorName)
    ) {
      return true;
    }
    return false;
  }

  onSubmit(): void {
    if (!this.searchForm.valid) {
      this.toastr.error('Please fill all the fields');
      return;
    }
    try {
      const searchKeyword: string = this.searchForm.value['searchKeyword'];
      this.searchForm.reset({});
      this.router.navigateByUrl(`/blog?search=${searchKeyword}`);
    } catch (error: any) {
      this.isSending.set(false);
      this.toastr.error('Something unexpected. Try again.');
      return;
    }
  }
}
