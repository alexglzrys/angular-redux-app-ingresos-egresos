import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router, CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService,
              private router: Router) { }

  canLoad(): Observable<boolean> {
    // conectarme al servicio y verificar si el usuario esta autenticado
    return this.authService.isAuth().pipe(
      // Disparar un efecto secundario (redireccionar a otra ruta), si el usuario no esta logeado
      tap((userExist) => {
        if (!userExist) this.router.navigate(['/login'])
      })
    );
  }

  canActivate(): Observable<boolean> {
    // conectarme al servicio y verificar si el usuario esta autenticado
    return this.authService.isAuth().pipe(
      // Disparar un efecto secundario (redireccionar a otra ruta), si el usuario no esta logeado
      tap((userExist) => {
        if (!userExist) this.router.navigate(['/login'])
      })
    );
  }

}
