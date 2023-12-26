import { Component, ErrorHandler, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CpfCnpjValidator } from '../../directives/cpf-cnpj/cpf-cnpj.validator';
import { SiteService } from '../../service/site.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'vp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public formContact!: FormGroup;
  public buttonEnable: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private siteService: SiteService,
    private errorHandler: ErrorHandler,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  enterMenu() {
    document.getElementById('formValePresente')?.scrollIntoView();
  }

  public createForm() {
    this.formContact = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
      ]],
      office: ['', Validators.required],
      phone: ['', [
        Validators.required,
        // Validators.pattern('(\\(?\d{2}\\)?\\s)?(\\d{4,5}-\\d{4})'), // erro na regex
        Validators.maxLength(11),
      ]],
      company: ['', Validators.required],
      companyFederalId: ['', [
        Validators.required,
        Validators.minLength(14),
        Validators.maxLength(14),
        CpfCnpjValidator(),
      ]],
      workersNumber: ['', Validators.required],
      message: [''],
      terms: ['', Validators.required]
    });
  }


  public sendMail() {
    if (!this.formContact.invalid) {
      let dataForm = this.formContact.value
      const data = {
        name: dataForm.name,
        email: dataForm.email,
        company: dataForm.company,
        customFields: {
          cargoSolicitante: dataForm.office,
          EnvieUmaMensagem: dataForm.message,
          CNPJ: dataForm.companyFederalId,
          QtdFuncionarios: dataForm.workersNumber,
          contato: dataForm.phone,
        },
      };


      this.siteService.sendForm(data).subscribe({
        next: (res: any) => {
          this.toastr.success('Os dados foram enviados com sucesso! Em breve um de nossos especialistas entrará em contato.');
        },
        error: () => {
          console.log('error')
          this.toastr.error('Não foi possível enviar os dados. Tente novamente mais tarde.');
        }
      });
    } else {
      this.toastr.error('Preencha os dados corretamente.');
      return;
    }

  }

  public checkTerms(event: any) {
    this.buttonEnable = event;
  }

  // @HostListener('window:scroll', ['$event'])
  // onWindowScroll(e: any) {
  //   const box = document.querySelector('.fadeInUp');
  //   if (window.pageYOffset < box.clientHeight ) {
  //     box.classList.add('colorChange');
  //   } else {
  //     box.classList.remove('colorChange');
  //   }
  // }

}
function tap(arg0: (res: any) => void): import("rxjs").OperatorFunction<any, unknown> {
  throw new Error('Function not implemented.');
}

