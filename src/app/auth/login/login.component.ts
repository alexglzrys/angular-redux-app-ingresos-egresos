import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.valid) {
      const {email, password} = this.loginForm.value;
      Swal.fire({
        title: 'Espere',
        text: 'Validando credenciales de acceso',
        timerProgressBar: true,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading(Swal.getDenyButton())
        }
      });
      this.authService.loginUser(email, password).then(response => {
        console.log(response);
        // Destruir cualquier instancia abierta de SweetAlert
        Swal.close();
        this.router.navigate(['']);
      }).catch(err => {
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
