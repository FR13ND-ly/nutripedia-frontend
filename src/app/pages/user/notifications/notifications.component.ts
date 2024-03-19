import { Component, inject } from '@angular/core';
import { BlogService } from '../../../core/data-access/blog.service';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../store/user/user.reducer';
import { Observable, map, switchMap } from 'rxjs';
import { MaterialModule } from '../../../core/feature/material/material.module';
import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [MaterialModule, AsyncPipe, DatePipe, NgIf],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
})
export class NotificationsComponent {
  blogService = inject(BlogService);
  store = inject(Store);
  snackbar = inject(MatSnackBar);

  user$ = this.store.select(selectUser).pipe(map((el: any) => el.user));
  notifications$: Observable<any> = this.user$.pipe(
    switchMap((user: any) => this.blogService.getNotificationsAll(user.id))
  );

  onDelete(notification: any, notifications: any, index: any) {
    this.blogService.deleteNotification(notification.id).subscribe(() => {
      notifications.splice(index, 1);
      this.snackbar.open('Notification deleted', '', { duration: 3000 });
    });
  }
}
