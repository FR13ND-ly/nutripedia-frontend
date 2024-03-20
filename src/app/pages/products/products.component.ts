import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from '../../core/data-access/product.service';
import { MaterialModule } from '../../core/feature/material/material.module';
import { ProductComponent } from '../../core/ui/product/product.component';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject, Observable, filter, map, switchMap, tap } from 'rxjs';
import { FilterComponent } from './feature/filter/filter.component';
import { Store } from '@ngrx/store';
import { setLoading } from '../../store/loading/loading.actions';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductComponent, MaterialModule, AsyncPipe, FilterComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  productsService = inject(ProductService);
  store = inject(Store);

  filters$ = new BehaviorSubject<any>(null);

  products$: Observable<any> = this.filters$.pipe(
    switchMap((filters) =>
      this.productsSubject.pipe(
        filter((el: any) => el),
        map((product) => this.filter(product, filters))
      )
    )
  );

  productsSubject = new BehaviorSubject<any>(null);

  onFilter(filters: any) {
    this.filters$.next(filters);
  }

  ngOnInit(): void {
    this.store.dispatch(setLoading({ state: true }));
    this.productsService.getAllProducts().subscribe((res) => {
      this.store.dispatch(setLoading({ state: false }));
      this.productsSubject.next(res);
    });
  }

  filter(products: any, filters: any) {
    if (!filters) return products;
    let brands = this.getSelected(filters.brands);
    let categories = this.getSelected(filters.categories);
    let ingredients = this.getSelected(filters.ingredients);
    console.log(categories, ingredients);
    if (brands.length) {
      products = products.filter((el: any) => {
        return brands.includes(el.brand);
      });
    }
    if (categories.length) {
      products = products.filter((el: any) =>
        el.categories.some((item: any) => categories.includes(item.name))
      );
    }
    if (ingredients.length) {
      products = products.filter((el: any) =>
        el.ingredients.some((item: any) => ingredients.includes(item.name))
      );
    }
    return products;
  }

  getSelected(array: any) {
    return array.filter((el: any) => el.selected).map((el: any) => el.name);
  }
}
