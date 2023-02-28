import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Subject, timer } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap, takeUntil } from 'rxjs/operators';

import { fadeAnimation } from 'src/app/core/animations';

@Component({
    selector: 'app-main-view',
    templateUrl: 'main.view.html',
    styleUrls: ['main.view.scss'],
    animations: [fadeAnimation],
    encapsulation: ViewEncapsulation.None
})
export class MainViewComponent implements OnInit, OnDestroy {
    private _unsubscribe$: Subject<void> = new Subject<void>();

    constructor(
        private _router: Router,
        private _titleService: Title
    ) {
        this._titleService.setTitle('Home - PADC, LLC');
        this._handleNavigationEndEvent();
    }

    ngOnInit() { }

    private _handleNavigationEndEvent(): void {
        this._router.events
            .pipe(
                filter((e) => e instanceof NavigationEnd),
                distinctUntilChanged((a: NavigationEnd, b: NavigationEnd) => {
                    let [firstUrl, secondUrl] = [a.url, b.url];
                    if (firstUrl.includes('?')) {
                        firstUrl = firstUrl.slice(0, firstUrl.indexOf('?'));
                    }
                    if (secondUrl.includes('?')) {
                        secondUrl = secondUrl.slice(0, secondUrl.indexOf('?'));
                    }
                    return firstUrl === secondUrl;
                }),
                switchMap(() => {
                    return timer(100)
                        .pipe(map(() => {
                            window.scrollTo(0, 0);
                        }));
                }),
                takeUntil(this._unsubscribe$)
            ).subscribe();
    }

    public getRouterOutletState(outlet: RouterOutlet): ActivatedRoute | '' {
        return outlet.isActivated ? outlet.activatedRoute : '';
    }

    ngOnDestroy() {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}
