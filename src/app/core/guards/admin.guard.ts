import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUser } from '../../store/user/user.reducer';
import { filter, map } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  let store = inject(Store);

  let user$ = store.select(selectUser);
  return user$.pipe(
    map((res: any) => {
      if (res?.user.isAdmin) {
        return true;
      } else {
        if (res?.user) router.navigate(['home']);
        else router.navigate(['login']);

        return false;
      }
    })
  );
};
