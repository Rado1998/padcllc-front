import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InlineSvgService {
    private _pathPrefix = '/assets/';

    constructor(private _httpClient: HttpClient) { }

    getSvg(svgName: string, path: string): Observable<string> {
        return this._httpClient.get(`${this._pathPrefix}${path}/${svgName}.svg`, { responseType: 'text' });
    }

}
