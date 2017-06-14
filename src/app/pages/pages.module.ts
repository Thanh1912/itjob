import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { routing }       from './pages.routing';
import { Pages } from './pages.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [CommonModule ,routing],
  declarations: [Pages, HomeComponent, LoginComponent, RegisterComponent, HeaderComponent, FooterComponent]
})
export class PagesModule {
}
