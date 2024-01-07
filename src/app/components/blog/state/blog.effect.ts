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

  resetCourseErrorMessage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(postActions.PostFailure),
        tap((error) => {
          if (typeof error?.errorMessage == 'object') {
            const { message } = error.errorMessage;
            this.toastr.error(message);
          }
          if (typeof error?.errorMessage == 'string') {
            console.log(
              'errorMessage from string message',
              error?.errorMessage
            );
            this.toastr.error(`${error.errorMessage}`);
          }
          setTimeout(() => {
            this.store.dispatch(postActions.ResetPostFetchState());
          }, 6000);
        })
      ),
    { dispatch: false }
  );

  createPostRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postActions.CreatePost),
      exhaustMap((action) =>
        this.postService.createPost(action.post).pipe(
          map((res) => {
            return postActions.Success({ posts: res.data! });
          }),
          catchError((error) => {
            return of(postActions.PostFailure(error.error?.message));
          })
        )
      )
    )
  );

  updateCourseRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postActions.UpdatePost),
      exhaustMap((action) =>
        this.postService.UpdatePost(action.postId, action.post).pipe(
          map((res) => {
            return postActions.Success({ posts: res.data! });
          }),
          catchError((error) => {
            return of(postActions.PostFailure(error.error?.message));
          })
        )
      )
    )
  );
}
