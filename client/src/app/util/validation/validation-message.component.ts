import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationService } from './validation.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'aeb-validation-message, [aeb-validation-message]',
  template: `<div *ngIf="errorMessage !== null">{{errorMessage}}</div>`
})
export class ValidationMessageComponent {
  @Input() control: FormControl;

  constructor() {
  }

  get errorMessage(): string {
    for (const propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName)) {
        let message = ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
        if (!message) {
          message = 'Unexpected error';
          if (!environment.production) {
            message += `: ${propertyName} (${JSON.stringify(this.control.errors[propertyName])})`;
          }
        }
        return message;
      }
    }

    return null;
  }
}
