import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SuggestionService } from '../../../core/data-access/suggestion.service';
import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { MaterialModule } from '../../../core/feature/material/material.module';
import { SuggestionDetailsDialogComponent } from './suggestion-details-dialog/suggestion-details-dialog.component';
import { UserComponent } from '../../../core/ui/user/user.component';
import { Store } from '@ngrx/store';
import { setLoading } from '../../../store/loading/loading.actions';

@Component({
  selector: 'app-suggestions',
  standalone: true,
  imports: [MaterialModule, AsyncPipe, NgIf, UserComponent, DatePipe],
  templateUrl: './suggestions.component.html',
  styleUrl: './suggestions.component.scss',
})
export class SuggestionsComponent {
  dialog = inject(MatDialog);
  suggestionsService = inject(SuggestionService);
  store = inject(Store);
  suggestions$: Observable<any> = this.suggestionsService.getWaiting();

  onSeeDetails(suggestion: any) {
    let d = this.dialog.open(SuggestionDetailsDialogComponent, {
      data: suggestion,
    });
    d.afterClosed().subscribe(
      () => (this.suggestions$ = this.suggestionsService.getWaiting())
    );
  }

  onDelete(suggestion: any, suggestions: any, index: any) {
    if (!confirm('Are you sure?')) return;
    this.store.dispatch(setLoading({ state: true }));
    this.suggestionsService.delete(suggestion.id).subscribe(() => {
      suggestions.splice(index, 1);
      this.store.dispatch(setLoading({ state: false }));
    });
  }
}
