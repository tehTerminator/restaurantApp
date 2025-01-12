import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Customer } from 'src/app/interface/customer';

export class CustomerFormGroup extends FormGroup {
  constructor() {
    super({
      id: new FormControl<number>(0, { nonNullable: true }),
      title: new FormControl<string>('', {
        validators: [Validators.required, Validators.maxLength(30)],
        nonNullable: true,
      }),
      mobile: new FormControl<string>('', {
        validators: [Validators.required, Validators.pattern('^[6-9]\\d{9}$')],
        nonNullable: true,
      }),
    });
  }

  get titleFC(): FormControl<string> {
    return this.get('title') as FormControl<string>;
  }

  get title(): string {
    return this.titleFC.value;
  }

  get mobileFC(): FormControl<string> {
    return this.get('mobile') as FormControl<string>;
  }

  get mobile(): string {
    return this.mobileFC.value;
  }

  get id(): number {
    return (this.get('id') as FormControl<number>).value;
  }

  get customer(): Customer {
    return {
      id: this.id,
      title: this.title,
      mobile: this.mobile,
    };
  }
}
