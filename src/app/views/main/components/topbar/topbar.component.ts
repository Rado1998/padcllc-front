import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    Renderer2,
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
    private _isNavbarOpen: boolean = false;
    @ViewChild('navbar')
    private _navbarElement: ElementRef<HTMLElement>;
    @ViewChild('toggleBtn')
    private _toggleBtnElement: ElementRef<HTMLElement>;


    public isNavbarOpenEvent: Subject<boolean> = new Subject<boolean>();

    constructor(
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _platformService: PlatformService,
        private _renderer2: Renderer2
    ) {
        if (this._platformService.isBrowser) {
            this._handleScrollEvent();
        }
    }

    ngOnInit() {
        this._handleRouteChanges();
        this._handleOutsideEvent();
    }

    private _handleOutsideEvent(): void {
        this._renderer2.listen('window', 'click', (e: Event) => {
            console.log(this._navbarElement.nativeElement, this._toggleBtnElement.nativeElement)
            console.log(e.target);
            if (e.target !== this._navbarElement.nativeElement && e.target !== this._toggleBtnElement.nativeElement) {
                this._closeNavbar();
            }
        });
    }

    private _closeNavbar(): void {
        this._isNavbarOpen = false;
        this.isNavbarOpenEvent.next(false);
    }

    private _handleRouteChanges(): void {
        this._router.events
            .pipe(
                filter((e) => e instanceof NavigationEnd),
                map(() => {
                    this._closeNavbar();
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
