import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-ingreso-egreso-app';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Suscribirme para conocer el estado actual del usuario de Firebase en la aplicación
    this.authService.initAuthListener();
  }


}
