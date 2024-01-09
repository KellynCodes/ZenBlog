import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import * as postActions from './blog.action';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { AppState } from '../../../state/app/app.state';
import { PostService } from '../../../../services/post/post.service';

@Injectable({ providedIn: 'root' })
export class PostEffect {
  constructor(
    private actions$: Actions,
    private postService: PostService,
    private store: Store<AppState>,
    private toastr: ToastrService
  ) {}

  // Fetch Post request
  FetchPostRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postActions.LoadPosts),
      exhaustMap((action) =>
        this.postService.getPosts(action.query!).pipe(
          map((res) => {
            return postActions.Success({
              posts: res.data!,
              successMessage: '',
            });
          }),
          catchError((error) => {
            return of(
              postActions.PostFailure({
                IsLoading: false,
                errorMessage: error.error.message,
              })
            );
          })
        )
      )
    )
  );

  GetCourseRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postActions.GetCourse),
      exhaustMap((action) =>
        this.postService.getPost(action.postId).pipe(
          map((res) => {
            return postActions.GetCourseSuccess({
              post: res.data!,
            });
          }),
          catchError((error) => {
            return of(
              postActions.PostFailure({
                IsLoading: false,
                errorMessage: error.error,
              })
            );
          })
        )
      )
    )
  );

  createPostRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postActions.CreatePost),
      exhaustMap((action) =>
        this.postService.createPost(action.post).pipe(
          map((res) => {
            console.log(res);
            return postActions.Success({
              posts: res.data!,
              successMessage: 'Post created successfully',
            });
          }),
          catchError((error) => {
            return of(
              postActions.PostFailure({
                IsLoading: false,
                errorMessage: error,
              })
            );
          })
        )
      )
    )
  );

  updatePostRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postActions.UpdatePost),
      exhaustMap((action) =>
        this.postService.UpdatePost(action.postId, action.post).pipe(
          map((res) => {
            return postActions.Success({
              posts: res.data!,
              successMessage: 'Post updated Successfully.',
            });
          }),
          catchError((error) => {
            return of(
              postActions.PostFailure({
                IsLoading: false,
                errorMessage: error.error?.message,
              })
            );
          })
        )
      )
    )
  );

  deletePostRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postActions.DeletePost),
      exhaustMap((action) =>
        this.postService.deletePost(action.postId).pipe(
          map((res) => {
            return postActions.ResetPostFetchState();
          }),
          catchError((error) => {
            return of(
              postActions.PostFailure({
                IsLoading: false,
                errorMessage: error.error?.message,
              })
            );
          })
        )
      )
    )
  );

  resetCourseErrorMessage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(postActions.PostFailure),
        tap((error) => {
          if (error.errorMessage.length > 0) {
            this.toastr.error(error.errorMessage, 'Error');
            setTimeout(() => {
              this.store.dispatch(postActions.ResetPostFetchState());
              this.toastr.clear();
            }, 3000);
          }
        })
      ),
    { dispatch: false }
  );

  resetCourseSuccessMessage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(postActions.Success),
        tap((success) => {
          if (success.successMessage.length > 0) {
            this.toastr.success(success.successMessage, 'Success');
            setTimeout(() => {
              this.store.dispatch(postActions.ResetPostFetchState());
              this.toastr.clear();
            }, 3000);
          }
        })
      ),
    { dispatch: false }
  );
}
