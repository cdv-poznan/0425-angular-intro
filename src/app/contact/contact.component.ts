import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

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
      email: [''],
      message: [''],
      street: [''],
      city: [''],
    });
  }

  ngOnInit(): void {
    // this.contact.setValue({
    //   email: 'asd',
    //   message: 'qwe',
    //   street: 'asd',
    //   city: 'asd',
    // });

    this.contact.patchValue({
      email: 'asd',
    });
  }

  public onSubmit($event: Event): void {
    console.log($event);
  }
}
