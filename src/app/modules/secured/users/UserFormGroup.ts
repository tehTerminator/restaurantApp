import { FormControl, FormGroup, Validators } from "@angular/forms";

export class UserFormGroup extends FormGroup {
    constructor() {
        super({
            id: new FormControl<number>(0, {validators: [Validators.required, Validators.min(0)], nonNullable: true}),
            name: new FormControl<string>('', {validators: [Validators.required, Validators.minLength(3)], nonNullable: true}),
            username: new FormControl<string>('', {validators: [Validators.required, Validators.minLength(3)], nonNullable: true}),
            mobile: new FormControl<string>('', {validators: [Validators.required, Validators.pattern('^[6-9][0-9]{9}$')], nonNullable: true}),
            password: new FormControl<string>('', {validators: [Validators.required, Validators.minLength(5)], nonNullable: true}),
            role: new FormControl<string>('', {validators: [Validators.required, Validators.min(1)], nonNullable: true}),
        })
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

    set id(value: number) {
        if (value > 0) {
            value = 0;
        } 
        this.idFormControl.setValue(value);
    }

    get nameFormControl(): FormControl<string> {
        return this.get('name') as FormControl<string>;
    }

    get name(): string {
        return this.nameFormControl.value;
    }

    set name(value: string) {
        this.nameFormControl.setValue(value);
    }


    get usernameFormControl(): FormControl<string> {
        return this.get('username') as FormControl<string>;
    }

    get username(): string {
        return this.usernameFormControl.value;
    }

    set username(value: string) {
        this.usernameFormControl.setValue(value);
    }

    get mobileFormControl(): FormControl<string> {
        return this.get('mobile') as FormControl<string>;
    }

    get mobile(): string {
        return this.mobileFormControl.value;
    }

    set mobile(value: string) {
        this.mobileFormControl.setValue(value);
    }

    get passwordFormControl(): FormControl<string> {
        return this.get('password') as FormControl<string>;
    }

    get password(): string {
        return this.passwordFormControl.value;
    }

    get roleFormControl(): FormControl<number> {
        return this.get('role') as FormControl<number>;
    }

    get role(): number {
        return this.roleFormControl.value;
    }

    set role(value: number) {
        this.roleFormControl.setValue(value);
    }
}