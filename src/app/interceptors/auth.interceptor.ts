// import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { TokenService } from '../../services/token.service';

// export function authInterceptor(tokenService: TokenService) {
//   return (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> => {
//     const accessToken = tokenService.getToken(); // Pobierz token z localStorage
//     console.log("Inside interceptor:", accessToken);
    
//     if (accessToken) {
//       const clonedRequest = req.clone({
//         setHeaders: {
//           Authorization: `Bearer ${accessToken}`
//         }
//       });
//       return next.handle(clonedRequest);
//     }

//     return next.handle(req);
//   };
// }