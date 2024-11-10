import { FormControl, FormGroup, Validators } from "@angular/forms";

export class ProductForm extends FormGroup {
    constructor(){
        super({
            'id': new FormControl<number>(0),
            'title': new FormControl<string>('', Validators.required),
            'rate': new FormControl<number>(0, Validators.required),
            'image_url': new FormControl<string>('', Validators.required)
        })
    }

    get idFormControl(): FormControl<number> {
        return this.get('id') as FormControl<number>;
    }

    get id(): number {
        return this.idFormControl.value;
    }

    get titleFormControl(): FormControl<string> {
        return this.get('title') as FormControl<string>;
    }

    get title(): string {
        return this.titleFormControl.value;
    }

    get rateFormControl(): FormControl<number> {
        return this.get('rate') as FormControl<number>;
    }

    get rate(): number {
        return this.rateFormControl.value;
    }

    get imageFormControl(): FormControl<string> {
        return this.get('image_url') as FormControl<string>;
    }

    get imageUrl(): string {
        return this.imageFormControl.value;
    }
}