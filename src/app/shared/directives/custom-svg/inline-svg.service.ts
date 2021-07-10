import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InlineSvgService {
    private _iconsPath: string = '/assets/icons/';

    constructor(private _httpClient: HttpClient) { }

    getSvg(svgName: string): Observable<string> {
        return this._httpClient.get(`${this._iconsPath}${svgName}.svg`, { responseType: 'text' });
    }

}
