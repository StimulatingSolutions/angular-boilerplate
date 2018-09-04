import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';

export class ValidationService {
  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    let config = {
      'required': 'Please enter a value',
      'invalidCreditCard': 'Credit card number is invalid',
      'invalidEmailAddress': 'Email address is invalid',
      //'invalidPassword': 'Invalid password. Password must be at least 8 characters long, and contain a number.',
      'minlength': `Minimum length is ${validatorValue.requiredLength}`,
      'maxlength': `Maximum length is ${validatorValue.requiredLength}`,
      'min': `Minimum value is ${validatorValue.min}`
    };

    return config[validatorName];
  }

  static creditCardValidator(control: AbstractControl) {
    // Visa, MasterCard, American Express, Diners Club, Discover, JCB
    if (control.value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)) {
      return null;
    } else {
      return {'invalidCreditCard': true};
    }
  }

  static emailValidator(control: AbstractControl) {
    // RFC 2822 compliant regex
    if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      return null;
    } else {
      return {'invalidEmailAddress': true};
    }
  }

  static validateForm(formGroup: FormGroup | FormArray) {
    for (let field of Object.keys(formGroup.controls)) {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched();
      } else if (control instanceof FormGroup || control instanceof FormArray) {
        this.validateForm(control);
      }
    }
  }
}
