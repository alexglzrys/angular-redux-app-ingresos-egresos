import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';

// Redux
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import * as ui from '../../shared/ui.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm!: FormGroup;
  uiSubscription!: Subscription;
  isLoading: boolean = false;

  // Redux: Inyectar el servicio de Store para hacer uso del patrón Redux
  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private store: Store<AppState>) { }

  ngOnInit(): void {
    // Construir formulario reactivo
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    // Redux: Suscribirme a los cambios del ui y guardar una referencia de la suscripción para cancelarla al abandonar el componente
    this.uiSubscription = this.store.select('ui').subscribe(ui => {
      console.log('Subscripción al ui');
      this.isLoading = ui.isLoading;
    })
  }

  ngOnDestroy(): void {
      // Redux: Cancelar la suscripción al estado de la ui de la aplicación
      this.uiSubscription.unsubscribe();
  }

  login() {
    if (this.loginForm.valid) {
      const {email, password} = this.loginForm.value;
      /*Swal.fire({
        title: 'Espere',
        text: 'Validando credenciales de acceso',
        timerProgressBar: true,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading(Swal.getDenyButton())
        }
      });*/

      // Redux: Despachar acción para cambiar el estado del loading de la aplicación
      this.store.dispatch( ui.isLoading() );

      this.authService.loginUser(email, password).then(response => {
        console.log(response);
        // Destruir cualquier instancia abierta de SweetAlert
        // Swal.close();

        // Redux: Despachar acción para cambiar el loading a falso
        this.store.dispatch( ui.stopLoading() );
        this.router.navigate(['']);
      }).catch(err => {
        // Redux: Despachar acción para cambiar el loading a falso
        this.store.dispatch( ui.stopLoading() );

        switch (err.code) {
          case "auth/invalid-email":
          case "auth/wrong-password":
          case "auth/user-not-found":
            Swal.fire({
              title: 'Lo sentimos',
              text: 'Las credenciales de acceso son incorrectas, verifiquelas nuevamente',
              icon: 'error'
            });
            break;
        }
      });
    }
  }

}
