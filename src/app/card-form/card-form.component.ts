import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.scss'],
})
export class CardFormComponent {
  cardForm = new FormGroup({
    name: new FormControl(''),
  });
}