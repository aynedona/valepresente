import { Directive } from '@angular/core';
import { Validator, NG_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';

import { CpfCnpjValidator } from './cpf-cnpj.validator';

@Directive({
    selector: '[cpfCnpjValidate]',
    providers: [{
      provide: NG_VALIDATORS,
      useExisting: CpfCnpjDirective,
      multi: true
    }]
})
export class CpfCnpjDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return CpfCnpjValidator()(control);
  }
  registerOnValidatorChange?(fn: () => void): void {
    throw new Error('Method not implemented.');
  }
}
