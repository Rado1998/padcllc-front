import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MainInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let url = req.url;
        if (!(url.startsWith('http://') || url.startsWith('https://'))) {
            url = `${environment.apiUrl}${req.url}`;
        }
        const clonedReq = req.clone({
            url
        });
        return next.handle(clonedReq);
    }
}
