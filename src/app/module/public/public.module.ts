import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PublicRoutingModule } from './public-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ButtonComponent } from './components/shared/button/button.component';
import { BannerComponent } from './components/banner/banner.component';
import { TitleComponent } from './components/shared/title/title.component';
import { AppInstructionsComponent } from './components/shared/app-instructions/app-instructions.component';
import { SharedModule } from '../shared/shared.module';
import { CpfCnpjDirective } from './directives/cpf-cnpj/cpf-cnpj.directive';
import { FadeInDirective } from './directives/fade/fadeIn.directive';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    NotFoundComponent,
    ButtonComponent,
    BannerComponent,
    TitleComponent,
    AppInstructionsComponent,
    CpfCnpjDirective,
    FadeInDirective
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    SharedModule
  ]
})
export class PublicModule { }
