import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

export function cdvEmailValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    const error = !String(control.value).endsWith('@cdv.pl');
    return error ? { cdv: true } : null;
  };
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  public email: string = '';
  public message: string = '';

  public contact: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.contact = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, cdvEmailValidator()]],
      message: [''],
      street: [''],
      city: [''],
    });
  }

  ngOnInit(): void {
    // this.contact.valueChanges.subscribe(value => {
    //   console.log(this.contact.valid);
    // });

    const emailControl = this.contact.get('email');

    emailControl.valueChanges.subscribe(value => {
      console.log(emailControl.errors);
    });

    // this.contact.setValue({
    //   email: 'asd',
    //   message: 'qwe',
    //   street: 'asd',
    //   city: 'asd',
    // });

    this.contact.patchValue({
      email: '',
    });
  }

  public onSubmit($event: Event): void {
    console.log($event);
  }
}
