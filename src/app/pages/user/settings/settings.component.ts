import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserService } from '../../../core/data-access/user.service';
import { MaterialModule } from '../../../core/feature/material/material.module';
import { ChipsComponent } from '../../../core/feature/chips/chips.component';
import { selectUser } from '../../../store/user/user.reducer';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { Observable, switchMap, tap } from 'rxjs';
import { FileService } from '../../../core/data-access/file.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [MaterialModule, ChipsComponent, AsyncPipe, NgIf],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  store = inject(Store);
  userService = inject(UserService);
  fileService = inject(FileService);
  snackbar = inject(MatSnackBar);

  allergens = [];
  dietaryPrefs = [];

  user$: Observable<any> = this.store.select(selectUser).pipe(
    switchMap((user: any) => this.userService.getUser(user.user.id)),
    tap((res: any) => {
      this.allergens = res.allergens.map((el: any) => {
        return { name: el };
      });
      this.dietaryPrefs = res.dietaryPrefs.map((el: any) => {
        return { name: el };
      });
    })
  );

  onSetPreferences(user: any) {
    let data = {
      allergens: this.allergens.map((el: any) => el.name),
      dietaryPrefs: this.dietaryPrefs.map((el: any) => el.name),
    };
    this.userService.setPreferences(user.id, data).subscribe(() => {
      this.snackbar.open('Suggestion modified', '', { duration: 3000 });
    });
  }

  onChangeAvatar(e: any, user: any) {
    this.fileService
      .addFile(e)
      .pipe(
        switchMap((res: any) => {
          let data = {
            imageId: res,
          };
          return this.userService.updateUser(user.id, data);
        })
      )
      .subscribe((res) => {
        this.snackbar.open('Profile image modified', '', { duration: 3000 });
        user.imageUrl = res;
      });
  }
}
