import { Component, Input, afterNextRender, inject } from '@angular/core';
import { ArticleComponent } from './feature/article/article.component';
import { BlogService } from '../../core/data-access/blog.service';
import { ArticleInputComponent } from './feature/article-input/article-input.component';
import { AsyncPipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Observable, map, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectUser } from '../../store/user/user.reducer';
import { MaterialModule } from '../../core/feature/material/material.module';
import { ArticleDialogComponent } from './feature/article-dialog/article-dialog.component';
import { GuidelinesDialogComponent } from './feature/guidelines-dialog/guidelines-dialog.component';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [ArticleComponent, ArticleInputComponent, AsyncPipe, MaterialModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent {
  @Input() set articleId(id: any) {
    if (!id) return;
    this.user$
      .pipe(
        switchMap((user) =>
          this.blogService.getArticle(id).pipe(
            map((el) => {
              return { ...el, userId: user.id };
            })
          )
        )
      )
      .subscribe((res: any) => {
        this.dialog.open(ArticleDialogComponent, {
          data: res,
        });
      });
  }

  constructor() {
    afterNextRender(() => {
      let accepted = localStorage.getItem('accepted') == 'true';
      if (!accepted) {
        let d = this.dialog.open(GuidelinesDialogComponent);
        d.afterClosed().subscribe(() => location.reload());
      }
    });
  }

  blogService = inject(BlogService);
  dialog = inject(MatDialog);
  store = inject(Store);
  user$ = this.store.select(selectUser).pipe(map((el: any) => el.user));

  articles$: Observable<any> = this.blogService.getArticles();
}
