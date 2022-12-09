import { FormControl } from '@angular/forms';

export class DateFormControl extends FormControl {
  override setValue(value: string, options: any) {
    // if input in not a digit or "/" return current value (discard the change)
    if (value.match(/[^0-9\/]/gi)) {
      // current value of an input is automatically stored on FormControl class
      // and accessible via this.value
      super.setValue(this.value, { ...options, emitModelToViewChange: true });
      return;
    }
    // disable input above 5 characters, return current value
    if (value.length > 5) {
      super.setValue(this.value, { ...options, emitModelToViewChange: true });
      return;
    }
    // enable user deletion/edit when "NN/" alredy entered
    // return new value rather then current
    if (value.length === 2 && this.value.length === 3) {
      super.setValue(value, { ...options, emitModelToViewChange: true });
      return;
    }
    if (value.length === 2) {
      super.setValue(value + '/', { ...options, emitModelToViewChange: true });
      return;
    }
    super.setValue(value, { ...options, emitModelToViewChange: true });
  }
}
