import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  exclude_array: string[] = ['/login', '/register', '/verifyEmail'];

  constructor(
    private authService: AuthService, 
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  toExclude(url: string): boolean {
    var length = this.exclude_array.length;
    for (var i = 0; i < length; i++) {
      if (url.search(this.exclude_array[i]) != -1)
        return true;
    }
    return false;
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.toExclude(request.url) && isPlatformBrowser(this.platformId)) {
      let jwt = this.authService.getToken();
      if (jwt && !this.authService.isTokenExpired()) {
        request = request.clone({
          setHeaders: { Authorization: "Bearer " + jwt }
        });
      } else {
        // Token is expired, logout and redirect to login
        this.authService.logout();
        this.router.navigate(['/login']);
      }
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && isPlatformBrowser(this.platformId)) {
          // Unauthorized error, logout and redirect to login
          this.authService.logout();
          this.router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  }
}