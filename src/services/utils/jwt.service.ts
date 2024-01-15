import { jwtDecode } from 'jwt-decode';
import { Injectable } from '@angular/core';
import { Store, createAction, props } from '@ngrx/store';
import { AppState } from '../../app/state/app/app.state';
import { setErrorMessage } from '../../app/state/shared/shared.action';
import { BrowserApiService } from './browser.api.service';
import { UserDto } from '../user/Dto/user.dto';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  private user: any | null = this.browserApiService.getItem('authUser');
  constructor(
    private browserApiService: BrowserApiService,
    private store: Store<AppState>
  ) {}

  public getUser(): UserDto {
    const authUser: LoginSuccessDto = JSON.parse(this.user);
    return authUser?.user!;
  }

  public CheckUser(): UserDto | undefined {
    const authUser: LoginSuccessDto = JSON.parse(this.user);
    this.store.dispatch(GetUserSuccess(authUser));
    return authUser?.user!;
  }

  public decodeJwtToken(loginSuccess: LoginSuccessDto): UserDto | null {
    try {
      const decodedToken: UserDto = jwtDecode(loginSuccess.accessToken!);
      const userSession: LoginSuccessDto = {
        accessToken: loginSuccess.accessToken,
        refreshToken: loginSuccess.refreshToken,
        expiryTimeStamp: loginSuccess.expiryTimeStamp,
        user: decodedToken,
      };
      const authUser: string = JSON.stringify(userSession);
      this.browserApiService.setItem('authUser', authUser);
      return decodedToken;
    } catch (error) {
      setTimeout(() => {
        this.store.dispatch(
          setErrorMessage({
            message:
              'Something unexpected happened while saving your session please try again.',
            isSuccessful: false,
          })
        );
      }, 3000);
      // todo log the error to a file.
      return null;
    }
  }
}

export interface LoginSuccessDto {
  user: any;
  accessToken: string;
  refreshToken: string;
  expiryTimeStamp: string;
}

export const GetUserSuccess = createAction(
  '[AUTH] Get User Success',
  props<LoginSuccessDto>()
);
