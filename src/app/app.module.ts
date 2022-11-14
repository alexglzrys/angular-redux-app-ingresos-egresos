import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

// Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

// Redux
import { StoreModule } from '@ngrx/store';
import { appReducers } from './app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// bg2-charts
import { NgChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';

import { IngresoEgresoComponent } from './ingreso-egreso/ingreso-egreso.component';
import { DetalleComponent } from './ingreso-egreso/detalle/detalle.component';
import { EstadisticaComponent } from './ingreso-egreso/estadistica/estadistica.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';
import { OrdenarIngresosEgresosPipe } from './pipes/ordenar-ingresos-egresos.pipe';

// Módulos de aplicación
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    IngresoEgresoComponent,
    DetalleComponent,
    EstadisticaComponent,
    OrdenarIngresosEgresosPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    // Declarar el reducer principal de la aplicación
    StoreModule.forRoot(appReducers),
    // Declarar módulo para inspeccionar el estado a través de las Redux DevTools
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    NgChartsModule,
    // Módulos de aplicación
    AuthModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
