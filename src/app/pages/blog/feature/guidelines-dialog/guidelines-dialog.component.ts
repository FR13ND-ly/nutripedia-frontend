import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../../../core/feature/material/material.module';

@Component({
  selector: 'app-guidelines-dialog',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './guidelines-dialog.component.html',
  styleUrl: './guidelines-dialog.component.scss',
})
export class GuidelinesDialogComponent {
  dialogRef = inject(MatDialogRef);

  onAccept() {
    localStorage.setItem('accepted', 'true');
    this.dialogRef.close();
  }
}
