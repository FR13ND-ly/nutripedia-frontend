import { DatePipe, JsonPipe, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { BlogService } from '../../../../core/data-access/blog.service';
import { MatDialog } from '@angular/material/dialog';
import { ArticleDialogComponent } from '../article-dialog/article-dialog.component';
import { MaterialModule } from '../../../../core/feature/material/material.module';
import { UserComponent } from '../../../../core/ui/user/user.component';
import { LikedPipe } from '../../../../core/pipes/liked.pipe';
import { Store } from '@ngrx/store';
import { setLoading } from '../../../../store/loading/loading.actions';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [DatePipe, MaterialModule, NgIf, UserComponent, LikedPipe],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
})
export class ArticleComponent {
  @Input() article: any;
  @Input() userId: any;
  @Output() delete = new EventEmitter();
  blogService = inject(BlogService);
  dialog = inject(MatDialog);
  store = inject(Store);

  onLike() {
    let data = {
      articleId: this.article.id,
      userId: this.userId,
    };
    this.blogService.like(data).subscribe((res) => (this.article.likes = res));
  }

  onOpenArticleDialog() {
    this.dialog.open(ArticleDialogComponent, {
      data: {
        ...this.article,
        userId: this.userId,
      },
    });
  }

  onEdit() {
    this.dialog.open(ArticleDialogComponent, {
      data: {
        ...this.article,
        userId: this.userId,
        edit: true,
      },
    });
  }

  onDeleteArticle() {
    this.store.dispatch(setLoading({ state: true }));
    this.blogService.deleteArticle(this.article.id).subscribe(() => {
      this.delete.emit();
      this.store.dispatch(setLoading({ state: false }));
    });
  }
}
