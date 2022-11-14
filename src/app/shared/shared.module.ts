import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

// ng g m shared/shared --flat

@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule, // Los componentes de este módulo hacen uso del router
  ],
  exports: [  // Los siguientes componentes se usan fuera de este módulo
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
  ]
})
export class SharedModule { }
