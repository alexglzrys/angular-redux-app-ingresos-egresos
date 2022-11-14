import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {

  username: string | undefined;
  authSubs!: Subscription;

  constructor(private authService: AuthService,
              private router: Router,
              private store: Store<AppState>) { }

  ngOnInit(): void {
    // La primera vez se obtiene un usuario nulo, pues forestore aun no lo recupera
    // Sería interesante usar un filtro para asegurarnos que siempre se obtiene el nombre del usuario
    this.authSubs = this.store.select('auth').subscribe(({ user }) => this.username = user?.name );
  }

  ngOnDestroy(): void {
      this.authSubs.unsubscribe();
  }

  logout() {
    this.authService.logout().then((_) => {
      this.router.navigate(['/login']);
    }).catch(err => console.log(err));
  }

}
