import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { setErrorMessage, resetErrorMessage } from "./shared.action";
import { tap } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "../app/app.state";

@Injectable()
export class SharedEffect {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>
  ) { }


  resetErrorMessage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(setErrorMessage),
        tap(() => {
          setTimeout(() => {
            this.store.dispatch(
              resetErrorMessage({
                isSuccessful: false,
                message: null,
              })
            );
          }, 6000);
        })
      ),
    { dispatch: false }
  );
}
