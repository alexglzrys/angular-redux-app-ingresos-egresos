import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

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
      this.authService.loginUser(email, password).then(response => {
        console.log(response)
        this.router.navigate(['']);
      }).catch(err => console.log(err));
    }
  }

}
