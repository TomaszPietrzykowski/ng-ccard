import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.scss'],
})
export class CardFormComponent {
  cardForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      // handle many cases for reusability
      // Validators.maxLength(5),
      // Validators.pattern(/\s/),
      // etc...
    ]),
  });
  constructor() {
    console.log(this.cardForm.get('name'));
  }
}
