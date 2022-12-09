import { FormControl } from '@angular/forms';

export class DateFormControl extends FormControl {
  override setValue(value: string | null, options: any) {
    // handle null from form.reset()
    if(!value) {
      super.setValue('', { ...options, emitModelToViewChange: true });
      return;
    }

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

    // after deleting "/" and entering number, add "/"  automatically
    if (value.length === 3 && value[2] !== '/' && this.value.length === 2) {
      super.setValue(this.value + '/' + value[2], {
        ...options,
        emitModelToViewChange: true,
      });
      return;
    }

    // disable entering "/" if no month number entered or "0" only
    if (
      this.value.length === 0 ||
      (this.value.length === 1 && this.value[0] === '0')
    ) {
      if (value[value.length - 1] === '/') {
        super.setValue(this.value, {
          ...options,
          emitModelToViewChange: true,
        });
        return;
      }
    }
    
    // when "/" entered after single digit add "0" at the front
    if (value.length === 2 && value[1] === '/' && this.value.length === 1) {
      super.setValue('0' + value, {
        ...options,
        emitModelToViewChange: true,
      });
      return;
    }
    if (value.length === 2) {
      super.setValue(value + '/', { ...options, emitModelToViewChange: true });
      return;
    }
    super.setValue(value, { ...options, emitModelToViewChange: true });
  }
}
