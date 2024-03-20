import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from '../../../../../core/data-access/product.service';
import { MaterialModule } from '../../../../../core/feature/material/material.module';
import { UtilsService } from '../../../../../core/data-access/utils.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { setLoading } from '../../../../../store/loading/loading.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-product-dialog',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-product-dialog.component.html',
  styleUrl: './add-product-dialog.component.scss',
})
export class AddProductDialogComponent {
  productService = inject(ProductService);
  utilsService = inject(UtilsService);
  dialogRef = inject(MatDialogRef);
  store = inject(Store);
  snackbar = inject(MatSnackBar);

  code = new FormControl('', Validators.required);

  onSubmit() {
    if (this.code.invalid) return;
    this.store.dispatch(setLoading({ state: true }));
    this.utilsService
      .getProductFromApi(this.code.value)
      .subscribe((res: any) => {
        let data: any = this.getProduct(res.product);
        this.productService.createProduct(data).subscribe((res) => {
          this.store.dispatch(setLoading({ state: false }));
          this.dialogRef.close(res);
          this.snackbar.open('Product added', '', { duration: 3000 });
        });
      });
  }

  getProduct(product: any) {
    return {
      code: this.code.value,
      brand: product.brands,
      name: product.product_name,
      imageUrl: product.image_url,
      weight: product.quantity,
      nutriments: this.getNutriments(product.nutriments),
      allergens: product.allergens_tags.map((item: any) =>
        item.replace(/[^:]*:/g, '')
      ),
      categories: product.categories_tags.map((item: any) =>
        item.replace(/[^:]*:/g, '')
      ),
      ingredients: product.ingredients_tags.map((item: any) =>
        item.replace(/[^:]*:/g, '')
      ),
    };
  }

  getNutriments(obj: any) {
    return Object.entries(obj).reduce((acc: any, [key, value]) => {
      const existingItem = acc.find((item: any) => item.name === key);
      const hasValueAndDefinedUnit =
        value !== null && obj[`${key}_unit`] !== undefined;

      if (!existingItem && hasValueAndDefinedUnit) {
        const unit = obj[`${key}_unit`];
        acc.push({ name: key, value, unit });
      }

      return acc;
    }, []);
  }
}
