import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../core/feature/material/material.module';
import { UserService } from '../../core/data-access/user.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { setLoading } from '../../store/loading/loading.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  userService = inject(UserService);
  fb = inject(FormBuilder);
  snackbar = inject(MatSnackBar);
  router = inject(Router);
  store = inject(Store);

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit() {
    if (this.loginForm.invalid) return;
    let data = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };
    this.store.dispatch(setLoading({ state: true }));
    this.userService.signIn(data).subscribe(() => {
      this.router.navigate(['home']);
      this.store.dispatch(setLoading({ state: false }));
    });
  }
}
