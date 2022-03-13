import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { PlatformService } from '@services/index';

import { fromEvent, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-topbar',
    templateUrl: 'topbar.component.html',
    styleUrls: ['topbar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopbarComponent implements OnInit, OnDestroy {
    private _unsubscribe$: Subject<void> = new Subject<void>();
    @ViewChild('navbar')
    private _navbarElement: ElementRef<HTMLElement>;
    private _isNavbarOpen: boolean = false;

    public isNavbarOpenEvent: Subject<boolean> = new Subject<boolean>();

    constructor(
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _platformService: PlatformService,
    ) {
        if (this._platformService.isBrowser) {
            this._handleScrollEvent();
        }
    }

    ngOnInit() {
        this._handleRouteChanges();
    }

    private _handleRouteChanges(): void {
        this._router.events
            .pipe(
                filter((e) => e instanceof NavigationEnd),
                map(() => {
                    this._isNavbarOpen = false;
                    this.isNavbarOpenEvent.next(false);
                })
            ).subscribe();
    }

    private _handleScrollEvent(): void {
        fromEvent(window, 'scroll', { capture: true })
            .pipe(
                takeUntil(this._unsubscribe$)
            )
            .subscribe(() => {
                this._setNavbarStyles();
            });
    }

    private _setNavbarStyles(): void {
        const { scrollY, innerHeight } = window;
        const fixedValue = 200;

        if (scrollY > innerHeight - fixedValue) {
            this._navbarElement.nativeElement.classList.replace('abs-top', 'fixed-top');
            this._navbarElement.nativeElement.classList.add('navbar-fixed');
        } else {
            this._navbarElement.nativeElement.classList.replace('fixed-top', 'abs-top');
            this._navbarElement.nativeElement.classList.remove('navbar-fixed');
        }
    }

    public checkIfItsActiveRoute(secId: string): boolean {
        let { sectionId } = this._activatedRoute.snapshot.queryParams;
        if (!sectionId && this._router.url.startsWith('/home')) {
            sectionId = '';
        }
        return secId === sectionId;
    }

    public onClickOpenNavbar(): void {
        this._isNavbarOpen = !this._isNavbarOpen;
        this.isNavbarOpenEvent.next(this._isNavbarOpen);
    }

    ngOnDestroy() {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}
