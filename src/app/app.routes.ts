import { Routes } from '@angular/router';
import { logoutGuard } from './core/guards/logout.guard';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/landing-page/landing-page.module').then(
        (m) => m.LandingPageModule
      ),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/register/register.module').then((m) => m.RegisterModule),
    canActivate: [logoutGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
    canActivate: [logoutGuard],
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./core/ui/shell/shell.module').then((m) => m.ShellModule),
    canActivate: [authGuard],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./pages/admin/admin.module').then((m) => m.AdminModule),
    canActivate: [adminGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
