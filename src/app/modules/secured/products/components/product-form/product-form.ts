import { Product } from 'src/app/interface/product.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export class ProductForm extends FormGroup {
  constructor() {
    super({
      id: new FormControl<number>(0),
      title: new FormControl<string>('', Validators.required),
      rate: new FormControl<number>(0, Validators.required),
      image_url: new FormControl<string>('', Validators.required),
    });
  }

  get editMode(): boolean {
    return this.id > 0;
  }

  get idFormControl(): FormControl<number> {
    return this.get('id') as FormControl<number>;
  }

  get id(): number {
    return this.idFormControl.value;
  }

  set id(id: number) {
    if (id > 0) {
      this.idFormControl.setValue(id);
      return;
    }

    this.idFormControl.setValue(0);
  }

  get titleFormControl(): FormControl<string> {
    return this.get('title') as FormControl<string>;
  }

  get title(): string {
    return this.titleFormControl.value;
  }

  set title(title: string) {
    this.titleFormControl.setValue(title);
  }

  get rateFormControl(): FormControl<number> {
    return this.get('rate') as FormControl<number>;
  }

  get rate(): number {
    return this.rateFormControl.value;
  }

  set rate(rate: number) {
    if (rate <= 0) {
      rate = 0;
    }
    this.rateFormControl.setValue(rate);
  }

  get imageFormControl(): FormControl<string> {
    return this.get('image_url') as FormControl<string>;
  }

  get imageUrl(): string | boolean {
    if (this.imageFormControl.value.length > 0) {
      return this.imageFormControl.value;
    }
    return false;
  }

  set imageUrl(url: string) {
    this.imageFormControl.setValue(url);
  }
}
