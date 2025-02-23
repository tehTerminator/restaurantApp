import {
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

export class UserForm extends FormGroup {
  constructor() {
    super({
      id: new FormControl(0, [Validators.required, Validators.min(0)]),
      name: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3)],
        nonNullable: true,
      }),
      mobile: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern(''),
        ],
      }),
      password: new FormControl('', { validators: [Validators.required] }),
    });
  }

  // Getters and setters for individual form controls
  get nameFC(): FormControl<string>{
    return this.get('name') as FormControl<string>;
  }

  get mobileFC(): FormControl<string>{
    return this.get('mobile') as FormControl<string>;
  }

  get passwordFC(): FormControl<string>{
    return this.get('password') as FormControl<string>;
  }
}
