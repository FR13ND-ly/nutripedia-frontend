import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const userActions = createActionGroup({
  source: 'USER',
  events: {
    login: props<{ user: any }>(),
    logout: emptyProps,
    loginSuccess: props<{ user: any }>(),
  },
});
