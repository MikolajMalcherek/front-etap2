import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../../services/token.service';


export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService)
  const token = tokenService.getToken();

  // Sprawdzenie, czy zapytanie nie jest na endpoint /callback
  if (req.url.includes('/callback') || req.url.includes('/websocket')) {
    return next(req);  // Po prostu zwróć oryginalne zapytanie bez dodawania tokenu
  }

  // console.log("Token in interceptor:", token)

  if (token){
    const authReq = req.clone({
      setHeaders:{
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }

  return next(req);
};
