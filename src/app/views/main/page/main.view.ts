import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router, RouterEvent, RouterOutlet } from '@angular/router';
import { navigationSteps } from '@globals/navigation-steps';

import { Subject, timer } from 'rxjs';
import { delay, filter, takeUntil } from 'rxjs/operators';

import { navAnimations } from 'src/app/animations/animations';

@Component({
    selector: 'app-main-view',
    templateUrl: 'main.view.html',
    styleUrls: ['main.view.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [navAnimations],
})
export class MainViewComponent implements OnInit, AfterViewInit, OnDestroy {
    private _unsubscribe$: Subject<void> = new Subject<void>();
    private _isInProccess: boolean = false;
    @ViewChild('fullNavbar') private _fullNavbar: ElementRef<HTMLElement>;

    constructor(
        private _router: Router,
        private _renderer2: Renderer2
    ) { }

    ngOnInit() { }

    ngAfterViewInit() {
        this._checkNavbarState();
        this._handleRouterEvents();
    }

    private _handleRouterEvents(): void {
        this._router.events
            .pipe(
                takeUntil(this._unsubscribe$),
                filter((e) => e instanceof NavigationEnd)
            )
            .subscribe((event: RouterEvent) => {
                this._checkNavbarState();
            });
    }

    @HostListener('wheel', ['$event'])
    private _handleWheelEvent(event: WheelEvent): void {
        const navSteps = Object.assign([], navigationSteps);
        const { deltaY } = event;
        const currentUrl: string = this._router.url;

        console.log('callleddd');

        const stepIndex = navSteps.findIndex((e) => currentUrl.startsWith(e.url));

        let url: string;

        if (deltaY > 0) {
            if (stepIndex === navSteps.length - 1) {
                return;
            }
            url = navSteps[stepIndex + 1].url;
        }

        if (deltaY < 0) {
            if (stepIndex === 0) {
                return;
            }
            url = navSteps[stepIndex - 1].url;
        }
        timer(50)
            .pipe(
                delay(300)
            )
            .subscribe(() => {
                this._router.navigate([url]);
            });
    }

    private _checkNavbarState(): void {
        const element = this._fullNavbar.nativeElement.getElementsByClassName('nav-wrapper')[0];
        if (this._router.url?.startsWith('/home')) {
            this._renderer2.removeClass(element, 'show-navbar');
        }
        else {
            this._renderer2.addClass(element, 'show-navbar');
        }
    }

    public prepareRoute(outlet: RouterOutlet) {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
    }

    ngOnDestroy() { }
}
