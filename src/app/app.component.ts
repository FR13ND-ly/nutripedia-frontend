import { Component, afterNextRender, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './core/data-access/theme.service';
import { MatProgressBar } from '@angular/material/progress-bar';
import { Store } from '@ngrx/store';
import { selectLoadingState } from './store/loading/loading.reducer';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatProgressBar, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  store = inject(Store);
  themeService = inject(ThemeService);

  loading$ = this.store.select(selectLoadingState);

  constructor() {
    afterNextRender(() => {
      this.themeService.setTheme();
    });
  }
}
