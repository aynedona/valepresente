import { Validator, NG_VALIDATORS, AbstractControl, ValidatorFn } from '@angular/forms';
import { ValidationErrors } from '@angular/forms';

export function CpfCnpjValidator(): ValidatorFn {
  const CPF_CNPJ_REGEXP = /(^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$)|(^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}$)/;

  return (control: AbstractControl): ValidationErrors | null => {
    const isValid = CPF_CNPJ_REGEXP.test(control.value);

    if (isValid) {
      if(control.value.length == 11) {
        const cpfValid: boolean = validateCPF(control.value);
        if(!cpfValid)
          return {
            CpfCnpjValidator: {
              valid: false,
            }
          };
      } else if(control.value.length == 14) {
        const cnpjValid: boolean = validateCNPJ(control.value);
        if(!cnpjValid)
          return {
            CpfCnpjValidator: {
              valid: false,
            }
          };
      }
      return null;
    } else {
      return {
        CpfCnpjValidator: {
          valid: false,
        },
      };
    }
  };
}

export const validateCNPJ = (cnpj: any): boolean => {
  cnpj = cnpj.replace(/[^\d]+/g,'');
  if (cnpj.length != 14) return false;
  if (cnpj == "00000000000000") return false;

  let size = cnpj.length - 2
  let numbers = cnpj.substring(0,size);
  let digit = cnpj.substring(size);
  let sum = 0;
  let pos = size - 7;

  for (let i = size; i >= 1; i--) {
    sum += numbers.charAt(size - i) * pos--;
    if (pos < 2) pos = 9;
  }

  let result = sum % 11 < 2 ? 0 : 11 - sum % 11;
  if (result != digit.charAt(0)) return false;

  size = size + 1;
  numbers = cnpj.substring(0,size);
  sum = 0;
  pos = size - 7;

  for (let i = size; i >= 1; i--) {
    sum += numbers.charAt(size - i) * pos--;
    if (pos < 2) pos = 9;
  }

  result = sum % 11 < 2 ? 0 : 11 - sum % 11;
  if (result != digit.charAt(1)) return false;
  return true;
}

export const validateCPF = (cpf: any): boolean => {
  if (typeof cpf !== "string") return false
  cpf = cpf.replace(/[\s.-]*/igm, '')
  if (
      !cpf ||
      cpf.length != 11 ||
      cpf == "00000000000" ||
      cpf == "11111111111" ||
      cpf == "22222222222" ||
      cpf == "33333333333" ||
      cpf == "44444444444" ||
      cpf == "55555555555" ||
      cpf == "66666666666" ||
      cpf == "77777777777" ||
      cpf == "88888888888" ||
      cpf == "99999999999"
  ) {
      return false
  }
  var soma = 0
  var resto
  for (var i = 1; i <= 9; i++)
      soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i)
  resto = (soma * 10) % 11
  if ((resto == 10) || (resto == 11))  resto = 0
  if (resto != parseInt(cpf.substring(9, 10)) ) return false
  soma = 0
  for (var i = 1; i <= 10; i++)
      soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i)
  resto = (soma * 10) % 11
  if ((resto == 10) || (resto == 11))  resto = 0
  if (resto != parseInt(cpf.substring(10, 11) ) ) return false
  return true
}


// export class CpfCnpjValidator implements Validator {

//     static cpfLength = 11;
//     static cnpjLength = 14;

//     /**
//      * Calcula o dígito verificador do CPF ou CNPJ.
//      */
//     static buildDigit(arr: number[]): number {

//         const isCpf = arr.length < CpfCnpjValidator.cpfLength;
//         const digit = arr
//                 .map((val, idx) => val * ((!isCpf ? idx % 8 : idx) + 2))
//                 .reduce((total, current) => total + current) % CpfCnpjValidator.cpfLength;

//         if (digit < 2 && isCpf) {
//             return 0;
//         }

//         return CpfCnpjValidator.cpfLength - digit;
//     }

//     /**
//      * Valida um CPF ou CNPJ de acordo com seu dígito verificador.
//      */
//     static validate(c: AbstractControl): ValidationErrors | null {

//         const cpfCnpj = c.value.replace(/\D/g, '');

//         // Verifica o size da string.
//         if ([CpfCnpjValidator.cpfLength, CpfCnpjValidator.cnpjLength].indexOf(cpfCnpj.length) < 0) {
//             return { length: true };
//         }

//         // Verifica se todos os dígitos são iguais.
//         if (/^([0-9])\1*$/.test(cpfCnpj)) {
//             return { equalDigits: true };
//         }

//         // A seguir é realizado o cálculo verificador.
//         const cpfCnpjArr: number[] = cpfCnpj.split('').reverse().slice(2);

//         cpfCnpjArr.unshift(CpfCnpjValidator.buildDigit(cpfCnpjArr));
//         cpfCnpjArr.unshift(CpfCnpjValidator.buildDigit(cpfCnpjArr));

//         if (cpfCnpj !== cpfCnpjArr.reverse().join('')) {
//             // Dígito verificador não é válido, resultando em falha.
//             return { digit: true };
//         }

//         return null;
//     }

//     /**
//      * Implementa a interface de um validator.
//      */
//     validate(c: AbstractControl): ValidationErrors | null {
//         return CpfCnpjValidator.validate(c);
//     }
// }
