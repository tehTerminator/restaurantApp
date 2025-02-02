import { FormControl, FormGroup, Validators } from '@angular/forms';

export class CategoryFormGroup extends FormGroup {
  constructor() {
    super({
      id: new FormControl<number>(0),
      title: new FormControl<string>('', Validators.required),
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
}
