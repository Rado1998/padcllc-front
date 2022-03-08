import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

import { IPlatformService } from '@models/platform';

@Injectable({
    providedIn: 'root'
})
export class PlatformService implements IPlatformService {
    constructor(@Inject(PLATFORM_ID) private platformId: string) { }

    public get isBrowser(): boolean {
        return isPlatformBrowser(this.platformId);
    }

    public get isServer(): boolean {
        return isPlatformServer(this.platformId);
    }
}
