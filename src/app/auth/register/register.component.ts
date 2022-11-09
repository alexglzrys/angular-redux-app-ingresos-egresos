import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  registrarUsuario() {
    if (this.registerForm.valid) {
      const {name, email, password} = this.registerForm.value;
      // Llamar al servicio para registrar nuevo usuario en Firebase
      this.authService.createUser(name, email, password).then(user => {
        console.log(user);
        // Cuando se crea un usuario, Firebase automáticamente lo logea. Dicha información se obtiene a través del objeto devuelto 
        // Navegar al dashboard
        this.router.navigate(['']);
      }).catch(err => console.error(err));
    }
  }
}
