import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
  signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../../../core/feature/material/material.module';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../../store/user/user.reducer';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { BlogService } from '../../../../core/data-access/blog.service';
import { setLoading } from '../../../../store/loading/loading.actions';

@Component({
  selector: 'article-input',
  standalone: true,
  imports: [ReactiveFormsModule, MaterialModule],
  templateUrl: './article-input.component.html',
  styleUrl: './article-input.component.scss',
})
export class ArticleInputComponent {
  @Input() userId: any;
  @Output() add = new EventEmitter();
  blogService = inject(BlogService);
  article = new FormControl('', Validators.required);
  focused = signal(false);
  store = inject(Store);

  onPublish() {
    if (this.article.invalid) return;
    let data = {
      userId: this.userId,
      content: this.article.value,
    };
    this.store.dispatch(setLoading({ state: true }));
    this.blogService.createArticle(data).subscribe((article) => {
      this.article.reset();
      this.store.dispatch(setLoading({ state: false }));
      this.add.emit(article);
    });
  }
}
