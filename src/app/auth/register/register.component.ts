import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    // Construir formulario reactivo
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  registrarUsuario() {
    if (this.registerForm.valid) {
      const {name, email, password} = this.registerForm.value;
      Swal.fire({
        title: 'Espere',
        text: 'Registrando nuevo usuario',
        timerProgressBar: true,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading(Swal.getDenyButton())
        }
      });
      // Llamar al servicio para registrar nuevo usuario en Firebase
      this.authService.createUser(name, email, password).then(user => {
         // Destruir cualquier instancia abierta de SweetAlert
         Swal.close();
        // Cuando se crea un usuario, Firebase automáticamente lo logea. Dicha información se obtiene a través del objeto devuelto
        // Navegar al dashboard
        this.router.navigate(['']);
      }).catch(err => {
        console.log(err);
        let message = 'Se ha presentado un error desconocido'
        switch (err.code) {
          case "auth/invalid-email":
            message = 'El correo electrónico no parece ser un dato válido';
            break;
          case "auth/weak-password":
            message = 'La contraseña debe tener al menos 6 caracteres';
            break;
        }
        Swal.fire({
          title: 'Lo sentimos',
          text: message,
          icon: 'error'
        });
      });
    }
  }
}
